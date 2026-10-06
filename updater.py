#!/usr/bin/env python3
"""Host side of the Termix Updater plugin's "Update now" button.

Listens on a Unix socket inside Termix's data folder, so only the Termix
server can reach it; nothing is exposed on the network. An update runs the
same update.sh the daily timer runs.

GET  /status  -> running version, latest release, job state
POST /update  -> runs update.sh --termix-only (backup, pull, recreate, plugins)
"""
import json
import os
import socket
import subprocess
import threading
import time
import urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer

SOCKET_PATH = os.environ["UPDATER_SOCKET"]
CONTAINER = os.environ.get("TERMIX_CONTAINER", "termix")
UPDATE_SCRIPT = os.environ.get("UPDATE_SCRIPT", "/usr/local/lib/termix-autoupdate/update.sh")
SOCKET_OWNER = os.environ.get("SOCKET_OWNER", "")  # "uid:gid" of the container's user
RELEASES_URL = "https://api.github.com/repos/Termix-SSH/Termix/releases/latest"

lock = threading.Lock()
job = {"state": "idle", "log": [], "startedAt": None, "finishedAt": None, "error": None}
latest_cache = {"at": 0, "value": None}


def running_version():
    try:
        out = subprocess.run(
            ["docker", "exec", CONTAINER, "node", "-p", "require('/app/package.json').version"],
            capture_output=True, text=True, timeout=30)
        return out.stdout.strip() or None
    except Exception:
        return None


def latest_release():
    now = time.time()
    if latest_cache["value"] and now - latest_cache["at"] < 600:
        return latest_cache["value"]
    try:
        req = urllib.request.Request(RELEASES_URL, headers={"User-Agent": "termix-autoupdate"})
        with urllib.request.urlopen(req, timeout=15) as res:
            data = json.load(res)
        version = data.get("tag_name", "").replace("release-", "").replace("-tag", "")
        value = {"version": version, "name": data.get("name"), "url": data.get("html_url"),
                 "publishedAt": data.get("published_at")}
        latest_cache.update(at=now, value=value)
        return value
    except Exception as exc:
        return latest_cache["value"] or {"version": None, "error": str(exc)}


def do_update():
    try:
        proc = subprocess.Popen(
            ["bash", UPDATE_SCRIPT, "--termix-only", "--service"],
            stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True,
            env={**os.environ, "NO_COLOR": "1", "UPDATER_CHILD": "1", "TERMIX_CONTAINERS": CONTAINER}, start_new_session=True)
        for line in proc.stdout:
            line = line.rstrip()
            if line:
                job["log"].append(f"{time.strftime('%H:%M:%S')} {line.strip()}")
                job["log"] = job["log"][-200:]
        code = proc.wait()
        job["state"] = "done" if code == 0 else "failed"
        if code != 0:
            job["error"] = f"update.sh exited with {code}"
        latest_cache["at"] = 0
    except Exception as exc:
        job["state"] = "failed"
        job["error"] = str(exc)
    finally:
        job["finishedAt"] = time.time()


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, body):
        raw = json.dumps(body).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self):
        if self.path != "/status":
            return self._send(404, {"error": "not found"})
        latest = latest_release()
        current = running_version()
        self._send(200, {
            "current": current,
            "latest": latest,
            "updateAvailable": bool(current and latest.get("version") and latest["version"] != current),
            "job": job,
        })

    def do_POST(self):
        if self.path != "/update":
            return self._send(404, {"error": "not found"})
        with lock:
            if job["state"] == "running":
                return self._send(409, {"error": "An update is already running", "job": job})
            job.update(state="running", log=[], startedAt=time.time(), finishedAt=None, error=None)
            threading.Thread(target=do_update, daemon=True).start()
        self._send(202, {"job": job})

    def log_message(self, *args):
        pass


class UnixHTTPServer(HTTPServer):
    address_family = socket.AF_UNIX

    def server_bind(self):
        self.socket.bind(self.server_address)

    def get_request(self):
        request, _ = self.socket.accept()
        return request, ("unix", 0)


def main():
    os.makedirs(os.path.dirname(SOCKET_PATH), exist_ok=True)
    if os.path.exists(SOCKET_PATH):
        os.remove(SOCKET_PATH)
    server = UnixHTTPServer(SOCKET_PATH, Handler)
    if SOCKET_OWNER:
        uid, gid = (int(x) for x in SOCKET_OWNER.split(":"))
        os.chown(SOCKET_PATH, uid, gid)
        os.chown(os.path.dirname(SOCKET_PATH), uid, gid)
    os.chmod(SOCKET_PATH, 0o660)
    server.serve_forever()


if __name__ == "__main__":
    main()
