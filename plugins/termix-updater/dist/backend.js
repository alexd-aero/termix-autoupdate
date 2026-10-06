import { createRequire as __termixCreateRequire } from 'node:module'; const require = __termixCreateRequire(import.meta.url);

// src/backend/index.ts
import http from "node:http";
import path from "node:path";
function socketPath() {
  return path.join(process.env.DATA_DIR || "/app/data", "host-updater", "updater.sock");
}
function callHost(method, route) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { socketPath: socketPath(), path: route, method, timeout: 3e4 },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => raw += chunk);
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode ?? 500, body: JSON.parse(raw) });
          } catch {
            resolve({ status: 502, body: { error: "Bad response from updater" } });
          }
        });
      }
    );
    req.on("timeout", () => req.destroy(new Error("Updater timed out")));
    req.on("error", reject);
    req.end();
  });
}
async function activate(ctx) {
  const router = ctx.http.router();
  router.use(ctx.rbac.require("update"));
  const forward = (method, route) => async (_req, res) => {
    try {
      const { status, body } = await callHost(method, route);
      res.status(status).json(body);
    } catch {
      res.status(503).json({ error: "unavailable" });
    }
  };
  router.get("/status", forward("GET", "/status"));
  router.post("/update", async (req, res) => {
    ctx.log.info(`Termix update requested by ${ctx.currentActor() ?? "unknown"}`);
    return forward("POST", "/update")(req, res);
  });
}
async function deactivate() {
}
export {
  activate,
  deactivate
};
//# sourceMappingURL=backend.js.map
