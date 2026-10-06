#!/usr/bin/env bash
# Keep Termix (Docker), its BG Shell + Termix Updater plugins, and
# Aegis × Burrow up to date, by themselves.
#
#   curl -fsSL https://raw.githubusercontent.com/alexd-aero/termix-autoupdate/main/update.sh | bash
#
# The first run asks for sudo, and once for a Termix admin login (used only to
# create an API key named "termix-autoupdate"; the password is not stored).
# After that a daily systemd timer runs everything with no one involved:
#   1. Termix: back up the data folder, pull the newest image, recreate the
#      container only when the image changed (old image kept as …:rollback-<v>).
#   2. Plugins: install / update BG Shell and Termix Updater, grant and enable them.
#   3. The host service behind the Termix Updater "Update now" button.
#   4. Aegis × Burrow: upgrade to the newest version, built-in auto-update on.
#   5. This script itself: the timer fetches the newest version before each run.
#
# Options: --check (report only)  --no-auto (no timer)  --uninstall-auto
#          --termix (Termix + plugins only, with the timer)  --termix-only  --aegis-only
# Env:     TERMIX_CONTAINERS=name[,name]  only these containers
#          TERMIX_ADMIN_USER / TERMIX_ADMIN_PASS  one-time setup without a prompt
set -uo pipefail

REPO="alexd-aero/termix-autoupdate"
SCRIPT_URL="https://raw.githubusercontent.com/$REPO/main/update.sh"
AEGIS_REPO="alexd-aero/aegis-burrow"
LIB="/usr/local/lib/termix-autoupdate"
ETC="/etc/termix-autoupdate"
KEEP_BACKUPS=5

args=("$@")
auto=1; do_termix=1; do_aegis=1; check=0; service=0; scope=""
for arg in "$@"; do
  case "$arg" in
    --no-auto) auto=0 ;;
    --check) check=1; auto=0 ;;
    --termix-only) do_aegis=0; auto=0 ;;
    --termix) do_aegis=0; scope=--termix ;;  # Termix and plugins, timer included (install.sh)
    --aegis-only) do_termix=0; auto=0 ;;
    --service) service=1; auto=0 ;;
    --uninstall-auto) ;;
    *) echo "unknown option: $arg"; exit 2 ;;
  esac
done

if [ -t 1 ] && [ -z "${NO_COLOR:-}" ]; then G=$'\e[32m'; Y=$'\e[33m'; R=$'\e[31m'; D=$'\e[2m'; N=$'\e[0m'; else G=; Y=; R=; D=; N=; fi
ok()   { echo "  ${G}✓${N} $*"; }
info() { echo "  ${D}·${N} $*"; }
warn() { echo "  ${Y}!${N} $*"; }
fail() { echo "  ${R}✗${N} $*"; }

# ------------------------------------------------------------------ run as root
# Docker, systemd and the plugin files all need it. From `curl | bash` there is
# no file to re-run, so the script is fetched again for sudo.
if [ "$(id -u)" != 0 ]; then
  command -v sudo >/dev/null 2>&1 || { fail "please run as root"; exit 1; }
  self="$(mktemp)"
  if [ -f "${BASH_SOURCE[0]:-}" ]; then cp "${BASH_SOURCE[0]}" "$self"; else curl -fsSL "$SCRIPT_URL" -o "$self" || { fail "download failed"; exit 1; }; fi
  echo "  ${D}·${N} asking for sudo…"
  sudo INVOKING_USER="$(id -un)" INVOKING_HOME="$HOME" bash "$self" ${args[@]+"${args[@]}"}
  code=$?; rm -f "$self"; exit $code
fi
INVOKING_USER="${INVOKING_USER:-${SUDO_USER:-root}}"
INVOKING_HOME="${INVOKING_HOME:-$(getent passwd "$INVOKING_USER" | cut -d: -f6)}"
BACKUP_DIR="${INVOKING_HOME:-/root}/termix-backups"

if [[ " ${args[*]:-} " == *" --uninstall-auto "* ]]; then
  systemctl disable --now termix-autoupdate.timer 2>/dev/null
  for u in /etc/systemd/system/termix-autoupdate-updater-*.service; do [ -e "$u" ] && systemctl disable --now "$(basename "$u")" 2>/dev/null; done
  rm -f /etc/systemd/system/termix-autoupdate.{timer,service} /etc/systemd/system/termix-autoupdate-updater-*.service
  systemctl daemon-reload; echo "  auto-update removed (plugins stay installed)"; exit 0
fi

# The timer runs the newest published script, not whatever was saved last time.
if [ "$service" = 1 ] && [ -z "${TAU_FRESH:-}" ]; then
  fresh="$(mktemp)"
  if curl -fsSL "$SCRIPT_URL" -o "$fresh" 2>/dev/null && bash -n "$fresh" 2>/dev/null; then
    if ! cmp -s "$fresh" "$LIB/update.sh"; then install -m 755 "$fresh" "$LIB/update.sh"; fi
    rm -f "$fresh"; TAU_FRESH=1 exec bash "$LIB/update.sh" ${args[@]+"${args[@]}"}
  fi
  rm -f "$fresh"
fi
[ "$service" = 1 ] && echo "=== $(date -u '+%F %T UTC')"

WORK="$(mktemp -d)"; trap 'rm -rf "$WORK"' EXIT
fetch_repo() {  # plugins + updater.py, once per run
  [ -d "$WORK/repo" ] && return 0
  mkdir -p "$WORK/repo"
  if [ -n "${TAU_SOURCE_DIR:-}" ]; then cp -r "$TAU_SOURCE_DIR"/. "$WORK/repo/"; return; fi  # testing a checkout
  curl -fsSL "https://codeload.github.com/$REPO/tar.gz/refs/heads/main" | tar -xz -C "$WORK/repo" --strip-components=1
}

# ------------------------------------------------------------------ Termix
docker_ready() { command -v docker >/dev/null 2>&1 && docker info >/dev/null 2>&1; }
# Termix is found by what it is, not what its image is called: the official
# image names, the image's source label (mirrors, retags), and finally any
# other running container that carries Termix's own /app/package.json.
is_termix() { [ "$(docker exec "$1" node -p "require('/app/package.json').name" 2>/dev/null)" = termix ]; }
termix_containers() {
  [ -n "${TERMIX_CONTAINERS:-}" ] && { tr ', ' '\n\n' <<<"$TERMIX_CONTAINERS" | sed '/^$/d'; return; }
  local name image src state env
  while IFS=$'\t' read -r name image src state; do
    [[ "$image" == *rollback-* ]] && continue
    if [[ "${image,,}" =~ (lukegus|termix-ssh)/termix ]] || [[ "${src,,}" == *github.com/termix-ssh/termix* ]]; then
      echo "$name"; continue
    fi
    [ "$state" = running ] || continue
    env="$(docker inspect -f '{{range .Config.Env}}{{println .}}{{end}}' "$name" 2>/dev/null)"
    grep -q '^DATA_DIR=' <<<"$env" && is_termix "$name" && echo "$name"
  done < <(docker ps -a --format '{{.Names}}\t{{.Image}}\t{{.Label "org.opencontainers.image.source"}}\t{{.State}}')
}
termix_version() { docker exec "$1" node -p "require('/app/package.json').version" 2>/dev/null || echo "?"; }
wait_termix() {  # until the backend answers inside the container
  local _
  for _ in $(seq 1 90); do
    docker exec "$1" node -e "fetch('http://127.0.0.1:30001/').then(()=>process.exit(0)).catch(()=>process.exit(1))" >/dev/null 2>&1 && return 0
    sleep 2
  done
  return 1
}
declare -A DATA_DIRS=()
data_dir() {  # Termix's data folder inside the container (DATA_DIR, normally /app/data)
  if [ -z "${DATA_DIRS[$1]:-}" ]; then
    DATA_DIRS[$1]="$(docker inspect -f '{{range .Config.Env}}{{println .}}{{end}}' "$1" | sed -n 's/^DATA_DIR=//p' | tail -1)"
    DATA_DIRS[$1]="${DATA_DIRS[$1]:-/app/data}"
  fi
  echo "${DATA_DIRS[$1]}"
}
data_owner() { docker exec -e D="$(data_dir "$1")" "$1" node -e "const s=require('fs').statSync(process.env.D);console.log(s.uid+':'+s.gid)"; }
data_mount() {  # $1 container, $2 Go template for the mount whose Destination is the data folder
  docker inspect -f "{{range .Mounts}}{{if eq .Destination \"$(data_dir "$1")\"}}$2{{end}}{{end}}" "$1"
}
data_host_path() {  # where the data folder lives on the host
  data_mount "$1" '{{.Source}}'
}

backup_termix() {
  local src out
  src="$(data_mount "$1" '{{if eq .Type "volume"}}{{.Name}}{{else}}{{.Source}}{{end}}')"
  [ -n "$src" ] || { warn "no mounted data folder found, skipping the backup"; return 0; }
  mkdir -p "$BACKUP_DIR"; out="termix-$1-$(date +%Y%m%d-%H%M%S).tgz"
  docker run --rm --entrypoint tar -v "$src":/data:ro -v "$BACKUP_DIR":/backup \
    "$(docker inspect -f '{{.Image}}' "$1")" czf "/backup/$out" -C / --exclude='data/host-updater' data >/dev/null 2>&1
  local code=$?
  chown "$INVOKING_USER": "$BACKUP_DIR" "$BACKUP_DIR/$out" 2>/dev/null
  # tar exits 1 when a file changed while it was read (Termix was running): still a full archive
  if [ "$code" -le 1 ] && [ -s "$BACKUP_DIR/$out" ]; then ok "backup: $BACKUP_DIR/$out"
  else rm -f "$BACKUP_DIR/$out"; warn "backup failed; continuing without one"; fi
  ls -1t "$BACKUP_DIR"/termix-"$1"-*.tgz 2>/dev/null | tail -n +$((KEEP_BACKUPS + 1)) | xargs -r rm -f
}

recreate_plain() {  # a `docker run` install: the same container on the new image
  local c="$1" image="$2" args=() line old_env
  old_env="$(docker image inspect -f '{{range .Config.Env}}{{println .}}{{end}}' "$(docker inspect -f '{{.Image}}' "$c")")"
  while IFS= read -r line; do [ -n "$line" ] && ! grep -qxF "$line" <<<"$old_env" && args+=(-e "$line"); done \
    < <(docker inspect -f '{{range .Config.Env}}{{println .}}{{end}}' "$c")
  while IFS= read -r line; do [ -n "$line" ] && args+=(-p "$line"); done \
    < <(docker inspect -f '{{range $p, $b := .HostConfig.PortBindings}}{{range $b}}{{if .HostIp}}{{.HostIp}}:{{end}}{{.HostPort}}:{{$p}}{{println}}{{end}}{{end}}' "$c")
  while IFS= read -r line; do [ -n "$line" ] && args+=(-v "$line"); done \
    < <(docker inspect -f '{{range .Mounts}}{{if eq .Type "volume"}}{{.Name}}{{else}}{{.Source}}{{end}}:{{.Destination}}{{if not .RW}}:ro{{end}}{{println}}{{end}}' "$c")
  local restart net
  restart="$(docker inspect -f '{{.HostConfig.RestartPolicy.Name}}' "$c")"; [ -n "$restart" ] && [ "$restart" != no ] && args+=(--restart "$restart")
  net="$(docker inspect -f '{{.HostConfig.NetworkMode}}' "$c")"; [ -n "$net" ] && [ "$net" != default ] && args+=(--network "$net")
  docker rename "$c" "$c-old" >/dev/null && docker stop "$c-old" >/dev/null || return 1
  if docker run -d --name "$c" "${args[@]}" "$image" >/dev/null; then docker rm "$c-old" >/dev/null; return 0; fi
  fail "could not start the new container; restoring the old one"
  docker rm -f "$c" >/dev/null 2>&1; docker rename "$c-old" "$c" && docker start "$c" >/dev/null
  return 1
}

declare -A RECREATED=()
update_termix_image() {  # $1 container
  local c="$1" image before after old_ver new_ver wd files service
  image="$(docker inspect -f '{{.Config.Image}}' "$c")"
  before="$(docker inspect -f '{{.Image}}' "$c")"
  old_ver="$(termix_version "$c")"
  info "$c: Termix $old_ver ($image)"
  [ "$check" = 1 ] && { info "$c: --check, not pulling"; return 0; }
  docker pull -q "$image" >/dev/null 2>&1 || { warn "$c: could not pull $image (a local build?), leaving the image as it is"; return 1; }
  after="$(docker image inspect -f '{{.Id}}' "$image")"
  [ "$before" = "$after" ] && { ok "$c: Termix is up to date"; return 0; }
  backup_termix "$c"
  docker tag "$before" "${image%:*}:rollback-$old_ver" >/dev/null 2>&1 && info "old image kept as ${image%:*}:rollback-$old_ver"
  wd="$(docker inspect -f '{{index .Config.Labels "com.docker.compose.project.working_dir"}}' "$c" 2>/dev/null)"
  files="$(docker inspect -f '{{index .Config.Labels "com.docker.compose.project.config_files"}}' "$c" 2>/dev/null)"
  service="$(docker inspect -f '{{index .Config.Labels "com.docker.compose.service"}}' "$c" 2>/dev/null)"
  if [ -n "$wd" ] && [ -n "$files" ] && [ -n "$service" ] && [ -f "${files%%,*}" ]; then
    local fargs=() fl f; IFS=',' read -ra fl <<<"$files"; for f in "${fl[@]}"; do fargs+=(-f "$f"); done
    docker compose --project-directory "$wd" "${fargs[@]}" up -d "$service" >/dev/null 2>&1 || { fail "$c: docker compose up failed"; return 1; }
  else
    recreate_plain "$c" "$image" || return 1
  fi
  RECREATED[$c]=1
  wait_termix "$c"; new_ver="$(termix_version "$c")"
  ok "$c: Termix $old_ver → $new_ver"
}

# ---- Termix admin API, called from inside the container (no URL/TLS guessing)
api() {  # $1 container, $2 method, $3 path, [$4 json body]; prints "status body"
  local key; key="$(cat "$ETC/api-key-$1" 2>/dev/null)"
  docker exec -e K="$key" -e M="$2" -e P="$3" -e B="${4:-}" "$1" node -e '
    const h = { "Content-Type": "application/json" };
    if (process.env.K) h.Authorization = "Bearer " + process.env.K;
    fetch("http://127.0.0.1:30001" + process.env.P, { method: process.env.M, headers: h, body: process.env.B || undefined })
      .then(async (r) => console.log(r.status, (await r.text()).slice(0, 300)))
      .catch((e) => console.log(0, e.message));' 2>/dev/null
}

ensure_api_key() {  # one-time: log in as an admin, create an API key, keep only the key
  local c="$1" st
  if [ -s "$ETC/api-key-$c" ]; then
    st="$(api "$c" GET /plugins | cut -d' ' -f1)"; [ "$st" = 200 ] && return 0
    warn "the saved Termix API key no longer works"
  fi
  local interactive=1
  [ -n "${TERMIX_ADMIN_USER:-}" ] && [ -n "${TERMIX_ADMIN_PASS:-}" ] && interactive=0
  if [ "$interactive" = 1 ] && { [ "$service" = 1 ] || ! (exec </dev/tty) 2>/dev/null; }; then
    warn "no Termix admin key yet: run the one-liner once in a terminal to set it up"; return 1
  fi
  echo; echo "  One-time setup: a Termix admin login, to create an API key for the updater."
  echo "  ${D}(the password is only used now and is not saved)${N}"
  local user pass out
  for _ in 1 2 3; do
    if [ "$interactive" = 1 ]; then
      read -r -p "  Termix admin username: " user </dev/tty
      read -r -s -p "  Termix admin password: " pass </dev/tty; echo
    else user="$TERMIX_ADMIN_USER"; pass="$TERMIX_ADMIN_PASS"; fi
    out="$(docker exec -i -e U="$user" -e PW="$pass" "$c" node -e '
      const base = "http://127.0.0.1:30001", j = { "Content-Type": "application/json" };
      const jwtOf = (r) => ((r.headers.getSetCookie?.() || []).join(";").match(/jwt=([^;]+)/) || [])[1];
      const ask = () => new Promise((res) => { process.stderr.write("  2FA code: "); process.stdin.once("data", (d) => res(String(d).trim())); });
      (async () => {
        let r = await fetch(base + "/users/login", { method: "POST", headers: j, body: JSON.stringify({ username: process.env.U, password: process.env.PW }) });
        let body = await r.json().catch(() => ({}));
        let jwt = jwtOf(r);
        if (body.requires_totp) {
          const code = await ask();
          r = await fetch(base + "/users/totp/verify-login", { method: "POST", headers: j, body: JSON.stringify({ temp_token: body.temp_token, totp_code: code }) });
          body = await r.json().catch(() => ({})); jwt = jwtOf(r);
        }
        if (!jwt || !body.is_admin) { console.log("ERR " + (body.error || (jwt ? "not an admin account" : "login failed"))); return; }
        const k = await fetch(base + "/users/api-keys", { method: "POST", headers: { ...j, Cookie: "jwt=" + jwt }, body: JSON.stringify({ name: "termix-autoupdate", userId: body.userId }) });
        const kb = await k.json().catch(() => ({}));
        console.log(kb.token ? "KEY " + kb.token : "ERR " + (kb.error || "could not create the API key"));
      })().catch((e) => console.log("ERR " + e.message)).finally(() => process.stdin.pause());' < "$( [ "$interactive" = 1 ] && echo /dev/tty || echo /dev/null )")"
    if [[ "$out" == KEY\ * ]]; then
      install -d -m 700 "$ETC"; (umask 077; echo "${out#KEY }" > "$ETC/api-key-$c"); ok "API key created and saved in $ETC (root only)"; return 0
    fi
    fail "${out#ERR }"
    [ "$interactive" = 0 ] && return 1
  done
  return 1
}

install_plugins() {  # $1 container
  local c="$1" p id new cur changed=() fresh=() owner pd
  fetch_repo || { fail "could not download the plugins"; return 1; }
  owner="$(data_owner "$c")"; pd="$(data_dir "$c")/plugins"
  for p in "$WORK/repo/plugins"/*/; do
    id="$(basename "$p")"
    new="$(sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' "$p/manifest.json" | head -1)"
    cur="$(docker exec "$c" sh -c "sed -n 's/.*\"version\": *\"\\([^\"]*\\)\".*/\\1/p' $pd/$id/manifest.json 2>/dev/null | head -1")"
    if [ -n "$cur" ] && [ "$cur" = "$new" ] && [ "$(docker exec "$c" sh -c "cat $pd/$id/dist/*.js" 2>/dev/null | sha256sum)" = "$(cat "$p"dist/*.js | sha256sum)" ]; then
      ok "plugin $id $cur is current"; continue
    fi
    [ "$check" = 1 ] && { warn "plugin $id: ${cur:-not installed} → $new"; continue; }
    docker exec -u 0 "$c" sh -c "rm -rf $pd/.$id.new && mkdir -p $pd/.$id.new" &&
    docker cp "$p." "$c:$pd/.$id.new" >/dev/null &&
    docker exec -u 0 "$c" sh -c "chown -R $owner $pd/.$id.new $pd && rm -rf $pd/$id && mv $pd/.$id.new $pd/$id" \
      || { fail "could not install plugin $id"; continue; }
    if [ -z "$cur" ]; then fresh+=("$id"); ok "plugin $id $new installed"; else changed+=("$id"); ok "plugin $id $cur → $new"; fi
  done
  [ "$check" = 1 ] && return 0

  # Termix only discovers a new plugin folder when it starts.
  if [ ${#fresh[@]} -gt 0 ]; then
    info "restarting Termix once so it sees the new plugins…"
    docker restart "$c" >/dev/null && wait_termix "$c"
    changed=()   # a fresh start loads the new code of the others too
  fi

  ensure_api_key "$c" || return 1
  local cap st
  for p in "$WORK/repo/plugins"/*/; do
    id="$(basename "$p")"
    for cap in $(tr -d '\n ' < "$p/manifest.json" | sed -n 's/.*"capabilities":\[\([^]]*\)\].*/\1/p' | tr -d '"' | tr ',' ' '); do
      api "$c" POST "/plugins/$id/grants" "{\"capability\":\"$cap\"}" >/dev/null
    done
    if [[ " ${changed[*]:-} " == *" $id "* ]]; then  # new code without a restart: reload just this plugin
      api "$c" PATCH "/plugins/$id/state" '{"enabled":false}' >/dev/null
    fi
    st="$(api "$c" PATCH "/plugins/$id/state" '{"enabled":true}')"
    [ "${st%% *}" = 200 ] && ok "plugin $id enabled" || fail "could not enable $id: ${st#* }"
  done
}

install_host_updater() {  # $1 container: the service behind the "Update now" button
  local c="$1" data owner unit name
  name="termix-autoupdate-updater-$(tr -c 'A-Za-z0-9_.-' '_' <<<"$c" | sed 's/_$//').service"
  data="$(data_host_path "$c")"; [ -n "$data" ] || { warn "no data folder for $c; the Update button will not work"; return 1; }
  fetch_repo || return 1
  install -d "$LIB"
  local changed=0
  cmp -s "$WORK/repo/updater.py" "$LIB/updater.py" || { install -m 755 "$WORK/repo/updater.py" "$LIB/updater.py"; changed=1; }
  cmp -s "$WORK/repo/update.sh" "$LIB/update.sh" || install -m 755 "$WORK/repo/update.sh" "$LIB/update.sh"
  # an earlier hand-made updater on the same socket would fight this one
  local old_unit=/etc/systemd/system/termix-updater.service old_home
  old_home="$(getent passwd "$(sed -n 's/^User=//p' "$old_unit" 2>/dev/null)" | cut -d: -f6)"
  if [ -f "$old_unit" ] && grep -q "termix-updater.py" "$old_unit" && [ -n "$old_home" ] && [ "$(realpath -m "$old_home/termix/data")" = "$(realpath -m "$data")" ]; then
    systemctl disable --now termix-updater.service >/dev/null 2>&1; info "retired the old termix-updater.service"; changed=1
  fi
  owner="$(data_owner "$c")"
  unit="[Unit]
Description=Termix Updater host service (Unix socket for the termix-updater plugin)
After=docker.service
Requires=docker.service

[Service]
Environment=UPDATER_SOCKET=$data/host-updater/updater.sock
Environment=TERMIX_CONTAINER=$c
Environment=SOCKET_OWNER=$owner
Environment=UPDATE_SCRIPT=$LIB/update.sh
Environment=INVOKING_USER=$INVOKING_USER
Environment=INVOKING_HOME=$INVOKING_HOME
ExecStart=/usr/bin/python3 $LIB/updater.py
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target"
  if [ "$(cat "/etc/systemd/system/$name" 2>/dev/null)" != "$unit" ]; then
    echo "$unit" > "/etc/systemd/system/$name"
    systemctl daemon-reload; changed=1
  fi
  systemctl enable "$name" >/dev/null 2>&1
  if [ "$changed" = 1 ] || ! systemctl is-active -q "$name"; then
    systemctl restart "$name"
  fi
  systemctl is-active -q "$name" && ok "Update button service running" || fail "Update button service did not start"
}

update_termix() {
  echo; echo "  Termix"
  if ! docker_ready; then
    if command -v podman >/dev/null 2>&1; then warn "only Podman here; this needs Docker, skipping Termix"
    else warn "Docker is not available here, skipping Termix"; fi
    return 0
  fi
  local cs c ports where; cs="$(termix_containers)"
  [ -n "$cs" ] || { info "no Termix container found"; return 0; }
  for c in $cs; do
    ports="$(docker port "$c" 2>/dev/null | sed 's/.*://' | sort -un | paste -sd ' ')"
    where="$(data_mount "$c" '{{if eq .Type "volume"}}volume {{.Name}}{{else}}{{.Source}}{{end}}')"
    ok "found Termix: container $c${ports:+, port $ports}${where:+, data in $where}"
    update_termix_image "$c"
    docker ps --format '{{.Names}}' | grep -qx "$c" || { warn "$c is not running; skipping its plugins"; continue; }
    install_plugins "$c"
    # never from inside the button's own service: restarting it would kill this run
    [ "$check" = 1 ] || [ -n "${UPDATER_CHILD:-}" ] || install_host_updater "$c"
  done
}

# ------------------------------------------------------------------ Aegis × Burrow
find_aegis_homes() {
  local f h
  for f in "${INVOKING_HOME:-/root}/.config/aegis/aegis.json" /home/*/.config/aegis/aegis.json /root/.config/aegis/aegis.json; do
    [ -r "$f" ] || continue
    h="$(sed -n 's/.*"home": *"\([^"]*\)".*/\1/p' "$f" | head -1)"; [ -n "$h" ] && echo "$h"
  done
  for f in /etc/systemd/system/*.service /home/*/.config/systemd/user/*.service; do
    [ -r "$f" ] || continue
    grep -q "server.mjs" "$f" || continue
    h="$(sed -n 's/^Environment="\{0,1\}AEGIS_HOME=\([^"]*\)"\{0,1\}$/\1/p' "$f" | head -1)"
    [ -z "$h" ] && h="$(sed -n 's#^ExecStart=.* \(/[^ ]*\)/app/\(aegis\|server\)/server.mjs.*#\1#p' "$f" | head -1)"
    [ -n "$h" ] && echo "$h"
  done
  for h in /home/*/.local/share/aegis /root/.local/share/aegis; do [ -d "$h/app" ] && echo "$h"; done
}
ver_lt() { [ "$1" != "$2" ] && [ "$(printf '%s\n%s\n' "$1" "$2" | sort -V | head -1)" = "$1" ]; }

update_aegis() {
  echo; echo "  Aegis × Burrow"
  local homes latest home; homes="$(find_aegis_homes | awk '!seen[$0]++')"
  [ -n "$homes" ] || { info "not installed here"; return 0; }
  latest="$(curl -fsSL "https://raw.githubusercontent.com/$AEGIS_REPO/main/package.json" | sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' | head -1)"
  [ -n "$latest" ] || { fail "could not reach GitHub"; return 0; }
  while IFS= read -r home; do
    [ -f "$home/app/package.json" ] || continue
    local cur owner as=()
    cur="$(sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' "$home/app/package.json" | head -1)"
    owner="$(stat -c %U "$home")"
    [ "$owner" != root ] && as=(runuser -u "$owner" --)
    info "$home: v${cur:-?} (owner $owner)"
    if [ -n "$cur" ] && ! ver_lt "$cur" "$latest"; then ok "Aegis is up to date (v$cur)"
    elif [ "$check" = 1 ]; then warn "update available: v${cur:-?} → v$latest"; continue
    else
      local tmp src; tmp="$(mktemp -d)"; chmod 755 "$tmp"
      if curl -fsSL "https://codeload.github.com/$AEGIS_REPO/tar.gz/refs/heads/main" | tar -xz -C "$tmp"; then
        src="$(ls -d "$tmp"/*/ | head -1)"; chmod -R a+rX "$tmp"
        if ${as[@]+"${as[@]}"} env HOME="$(getent passwd "$owner" | cut -d: -f6)" AEGIS_HOME="$home" "$src/bin/aegis" upgrade --setup browser </dev/null; then
          ok "Aegis × Burrow v${cur:-?} → v$latest"
        else fail "upgrade failed (the old code is kept in $home)"; fi
      else fail "download failed"; fi
      rm -rf "$tmp"
    fi
    [ "$check" = 1 ] && continue
    ${as[@]+"${as[@]}"} env HOME="$(getent passwd "$owner" | cut -d: -f6)" AEGIS_HOME="$home" "$home/app/bin/aegis" update auto on >/dev/null 2>&1 \
      && ok "Aegis built-in auto-update is on"
  done <<<"$homes"
}

# ------------------------------------------------------------------ the daily timer
install_timer() {
  fetch_repo || return 1
  # install.sh's timer leaves Aegis alone, unless a full timer was already set up
  local timer_scope="${scope:+ $scope}"
  if [ -n "$timer_scope" ] && [ -f /etc/systemd/system/termix-autoupdate.service ] \
    && ! grep -q -- '--termix' /etc/systemd/system/termix-autoupdate.service; then timer_scope=""; fi
  install -d "$LIB"; install -m 755 "$WORK/repo/update.sh" "$LIB/update.sh"
  cat > /etc/systemd/system/termix-autoupdate.service <<EOF
[Unit]
Description=Update Termix and its plugins (and Aegis × Burrow when present)
After=network-online.target docker.service
Wants=network-online.target

[Service]
Type=oneshot
Environment=INVOKING_USER=$INVOKING_USER
Environment=INVOKING_HOME=$INVOKING_HOME
ExecStart=/bin/bash $LIB/update.sh --service$timer_scope
EOF
  cat > /etc/systemd/system/termix-autoupdate.timer <<'EOF'
[Unit]
Description=Daily Termix auto-update

[Timer]
OnCalendar=*-*-* 04:17
RandomizedDelaySec=20m
Persistent=true

[Install]
WantedBy=timers.target
EOF
  systemctl daemon-reload && systemctl enable --now termix-autoupdate.timer >/dev/null 2>&1 \
    && ok "auto-update: daily ~04:17 (log: journalctl -u termix-autoupdate)"
  # the first version used a crontab line and a copy in ~/.local/bin
  if [ "$INVOKING_USER" != root ]; then
    runuser -u "$INVOKING_USER" -- sh -c 'crontab -l 2>/dev/null | grep -v termix-aegis-update | crontab - 2>/dev/null; rm -f "$HOME/.local/bin/termix-aegis-update"' 2>/dev/null
  fi
}

if [ "$do_aegis" = 1 ]; then echo; echo "  Termix + Aegis × Burrow updater"; else echo; echo "  Termix plugins + auto-update"; fi
[ "$do_termix" = 1 ] && update_termix
[ "$do_aegis" = 1 ] && update_aegis
if [ "$auto" = 1 ]; then echo; install_timer; fi
echo
