#!/usr/bin/env bash
# Update Termix (Docker) and Aegis × Burrow, and keep them updated.
#
#   curl -fsSL https://raw.githubusercontent.com/alexd-aero/termix-autoupdate/main/update.sh | bash
#
# What it does:
#   1. Termix: backs up the data folder, pulls the newest image and recreates
#      the container only when the image changed. The old image is kept as
#      <repo>:rollback-<version>. Works for docker compose and docker run.
#   2. Aegis × Burrow: upgrades to the newest GitHub version (config and data
#      are kept) and turns on its own auto-update.
#   3. Installs a daily cron job (04:17) that runs this again.
#
# Options: --check (report only)  --no-auto (skip the cron job)  --uninstall-auto
#          --termix-only  --aegis-only
set -uo pipefail

SCRIPT_URL="https://raw.githubusercontent.com/alexd-aero/termix-autoupdate/main/update.sh"
AEGIS_REPO="alexd-aero/aegis-burrow"
LOCAL_COPY="$HOME/.local/bin/termix-aegis-update"
LOG_DIR="$HOME/.local/state/termix-aegis-update"
BACKUP_DIR="$HOME/termix-backups"
KEEP_BACKUPS=5

auto=1; do_termix=1; do_aegis=1; cron_run=0; check=0
for arg in "$@"; do
  case "$arg" in
    --no-auto) auto=0 ;;
    --check) check=1; auto=0 ;;
    --uninstall-auto) crontab -l 2>/dev/null | grep -v "termix-aegis-update" | crontab -; echo "auto-update removed"; exit 0 ;;
    --termix-only) do_aegis=0 ;;
    --aegis-only) do_termix=0 ;;
    --cron) cron_run=1; auto=0 ;;
    *) echo "unknown option: $arg"; exit 2 ;;
  esac
done

if [ -t 1 ]; then G=$'\e[32m'; Y=$'\e[33m'; R=$'\e[31m'; D=$'\e[2m'; N=$'\e[0m'; else G=; Y=; R=; D=; N=; fi
ok()   { echo "  ${G}✓${N} $*"; }
info() { echo "  ${D}·${N} $*"; }
warn() { echo "  ${Y}!${N} $*"; }
fail() { echo "  ${R}✗${N} $*"; }
[ "$cron_run" = 1 ] && echo "=== $(date -u '+%F %T UTC')"

# sudo only when needed (and never prompt from cron)
SUDO=""
if [ "$(id -u)" != 0 ] && command -v sudo >/dev/null 2>&1; then
  if [ "$cron_run" = 1 ]; then SUDO="sudo -n"; else SUDO="sudo"; fi
fi

# ------------------------------------------------------------------ Termix
DOCKER="docker"
docker_ready() {
  command -v docker >/dev/null 2>&1 || return 1
  docker info >/dev/null 2>&1 && return 0
  $SUDO docker info >/dev/null 2>&1 && DOCKER="$SUDO docker" && return 0
  return 1
}

termix_version() { $DOCKER exec "$1" node -p "require('/app/package.json').version" 2>/dev/null || echo "?"; }

backup_termix() {  # $1 container
  local src vol stamp out
  src="$($DOCKER inspect -f '{{range .Mounts}}{{if eq .Destination "/app/data"}}{{.Type}}|{{.Source}}|{{.Name}}{{end}}{{end}}' "$1")"
  [ -n "$src" ] || { warn "no /app/data mount found, skipping the backup"; return 0; }
  mkdir -p "$BACKUP_DIR"; stamp="$(date +%Y%m%d-%H%M%S)"; out="$BACKUP_DIR/termix-$1-$stamp.tgz"
  local type="${src%%|*}" rest="${src#*|}"; local path="${rest%%|*}" name="${rest#*|}"
  vol="$path"; [ "$type" = volume ] && vol="$name"
  # tar from inside a container: works for bind mounts and named volumes, no root needed on the host
  if $DOCKER run --rm --entrypoint tar -v "$vol":/data:ro -v "$BACKUP_DIR":/backup \
       "$($DOCKER inspect -f '{{.Image}}' "$1")" czf "/backup/$(basename "$out")" -C / data >/dev/null 2>&1; then
    ok "backup: $out"
  else
    warn "backup failed; continuing without one"
  fi
  ls -1t "$BACKUP_DIR"/termix-"$1"-*.tgz 2>/dev/null | tail -n +$((KEEP_BACKUPS + 1)) | xargs -r rm -f
}

recreate_plain() {  # docker run install: rebuild the same container on the new image
  local c="$1" image="$2" args=() line
  local old_image_env; old_image_env="$($DOCKER image inspect -f '{{range .Config.Env}}{{println .}}{{end}}' "$($DOCKER inspect -f '{{.Image}}' "$c")")"
  while IFS= read -r line; do [ -n "$line" ] && ! grep -qxF "$line" <<<"$old_image_env" && args+=(-e "$line"); done \
    < <($DOCKER inspect -f '{{range .Config.Env}}{{println .}}{{end}}' "$c")
  while IFS= read -r line; do [ -n "$line" ] && args+=(-p "$line"); done \
    < <($DOCKER inspect -f '{{range $p, $b := .HostConfig.PortBindings}}{{range $b}}{{if .HostIp}}{{.HostIp}}:{{end}}{{.HostPort}}:{{$p}}{{println}}{{end}}{{end}}' "$c")
  while IFS= read -r line; do [ -n "$line" ] && args+=(-v "$line"); done \
    < <($DOCKER inspect -f '{{range .Mounts}}{{if eq .Type "volume"}}{{.Name}}{{else}}{{.Source}}{{end}}:{{.Destination}}{{if not .RW}}:ro{{end}}{{println}}{{end}}' "$c")
  local restart net
  restart="$($DOCKER inspect -f '{{.HostConfig.RestartPolicy.Name}}' "$c")"; [ -n "$restart" ] && [ "$restart" != no ] && args+=(--restart "$restart")
  net="$($DOCKER inspect -f '{{.HostConfig.NetworkMode}}' "$c")"; [ -n "$net" ] && [ "$net" != default ] && args+=(--network "$net")
  $DOCKER rename "$c" "$c-old" >/dev/null && $DOCKER stop "$c-old" >/dev/null || return 1
  if $DOCKER run -d --name "$c" "${args[@]}" "$image" >/dev/null; then
    $DOCKER rm "$c-old" >/dev/null; return 0
  fi
  fail "could not start the new container; restoring the old one"
  $DOCKER rm -f "$c" >/dev/null 2>&1; $DOCKER rename "$c-old" "$c" && $DOCKER start "$c" >/dev/null
  return 1
}

update_termix() {
  echo; echo "  Termix"
  if ! docker_ready; then warn "Docker is not available here, skipping Termix"; return 0; fi
  local containers; containers="$($DOCKER ps -a --format '{{.Names}}\t{{.Image}}' | awk -F'\t' 'tolower($2) ~ /termix/ && $2 !~ /rollback/ {print $1}')"
  [ -n "$containers" ] || { info "no Termix container found"; return 0; }
  local c
  for c in $containers; do
    local image before after old_ver new_ver wd files service
    image="$($DOCKER inspect -f '{{.Config.Image}}' "$c")"
    before="$($DOCKER inspect -f '{{.Image}}' "$c")"
    old_ver="$(termix_version "$c")"
    info "$c: Termix $old_ver ($image)"
    if [ "$check" = 1 ]; then info "$c: --check, not pulling"; continue; fi
    if ! $DOCKER pull -q "$image" >/dev/null 2>&1; then fail "$c: could not pull $image"; continue; fi
    after="$($DOCKER image inspect -f '{{.Id}}' "$image")"
    if [ "$before" = "$after" ]; then ok "$c: already up to date"; continue; fi
    backup_termix "$c"
    $DOCKER tag "$before" "${image%:*}:rollback-$old_ver" >/dev/null 2>&1 && info "old image kept as ${image%:*}:rollback-$old_ver"
    wd="$($DOCKER inspect -f '{{index .Config.Labels "com.docker.compose.project.working_dir"}}' "$c" 2>/dev/null)"
    files="$($DOCKER inspect -f '{{index .Config.Labels "com.docker.compose.project.config_files"}}' "$c" 2>/dev/null)"
    service="$($DOCKER inspect -f '{{index .Config.Labels "com.docker.compose.service"}}' "$c" 2>/dev/null)"
    if [ -n "$wd" ] && [ -n "$files" ] && [ -n "$service" ] && [ -f "${files%%,*}" ]; then
      local fargs=(); IFS=',' read -ra fl <<<"$files"; for f in "${fl[@]}"; do fargs+=(-f "$f"); done
      $DOCKER compose --project-directory "$wd" "${fargs[@]}" up -d "$service" >/dev/null 2>&1 \
        || { fail "$c: docker compose up failed"; continue; }
    else
      recreate_plain "$c" "$image" || continue
    fi
    for _ in $(seq 1 60); do new_ver="$(termix_version "$c")"; [ "$new_ver" != "?" ] && break; sleep 2; done
    ok "$c: Termix $old_ver → $new_ver"
  done
}

# ------------------------------------------------------------------ Aegis × Burrow
# Where it is installed: the discovery file each version writes, then running
# services, then the default location.
find_aegis_homes() {
  local f h
  for f in "$HOME/.config/aegis/aegis.json" /home/*/.config/aegis/aegis.json /root/.config/aegis/aegis.json; do
    [ -r "$f" ] || continue
    h="$(sed -n 's/.*"home": *"\([^"]*\)".*/\1/p' "$f" | head -1)"; [ -n "$h" ] && echo "$h"
  done
  for f in /etc/systemd/system/*.service "$HOME"/.config/systemd/user/*.service /home/*/.config/systemd/user/*.service; do
    [ -r "$f" ] || continue
    grep -q "server.mjs" "$f" || continue
    h="$(sed -n 's/^Environment="\{0,1\}AEGIS_HOME=\([^"]*\)"\{0,1\}$/\1/p' "$f" | head -1)"
    [ -z "$h" ] && h="$(sed -n 's#^ExecStart=.* \(/[^ ]*\)/app/\(aegis\|server\)/server.mjs.*#\1#p' "$f" | head -1)"
    [ -n "$h" ] && echo "$h"
  done
  for h in "$HOME/.local/share/aegis" /home/*/.local/share/aegis; do [ -d "$h/app" ] && echo "$h"; done
}

ver_lt() { [ "$1" != "$2" ] && [ "$(printf '%s\n%s\n' "$1" "$2" | sort -V | head -1)" = "$1" ]; }

update_aegis() {
  echo; echo "  Aegis × Burrow"
  local homes; homes="$(find_aegis_homes | awk '!seen[$0]++')"
  [ -n "$homes" ] || { info "not installed here"; return 0; }
  local latest; latest="$(curl -fsSL "https://raw.githubusercontent.com/$AEGIS_REPO/main/package.json" | sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' | head -1)"
  [ -n "$latest" ] || { fail "could not reach GitHub"; return 0; }
  local home
  while IFS= read -r home; do
    [ -f "$home/app/package.json" ] || continue
    local cur owner as=()
    cur="$(sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' "$home/app/package.json" | head -1)"
    owner="$(stat -c %U "$home")"
    if [ "$owner" != "$(id -un)" ]; then
      if [ "$(id -u)" = 0 ]; then as=(runuser -u "$owner" --); else as=($SUDO -u "$owner" -H); fi
    fi
    info "$home: v${cur:-?} (owner $owner)"
    if [ -n "$cur" ] && ! ver_lt "$cur" "$latest"; then ok "already up to date (v$cur)"
    elif [ "$check" = 1 ]; then warn "update available: v${cur:-?} → v$latest"; continue; else
      local tmp src; tmp="$(mktemp -d)"; chmod 755 "$tmp"
      if ! curl -fsSL "https://codeload.github.com/$AEGIS_REPO/tar.gz/refs/heads/main" | tar -xz -C "$tmp"; then
        fail "download failed"; rm -rf "$tmp"; continue
      fi
      src="$(ls -d "$tmp"/*/ | head -1)"; chmod -R a+rX "$tmp"
      if ${as[@]+"${as[@]}"} env AEGIS_HOME="$home" "$src/bin/aegis" upgrade --setup browser </dev/null; then
        ok "Aegis × Burrow v${cur:-?} → v$latest"
      else
        fail "upgrade failed (backups of the old code stay in $home)"
      fi
      rm -rf "$tmp"
    fi
    [ "$check" = 1 ] && continue
    # the built-in updater keeps it current from now on (2.4+)
    ${as[@]+"${as[@]}"} env AEGIS_HOME="$home" "$home/app/bin/aegis" update auto on >/dev/null 2>&1 \
      && ok "Aegis built-in auto-update is on"
  done <<<"$homes"
}

# ------------------------------------------------------------------ auto-update
install_auto() {
  mkdir -p "$(dirname "$LOCAL_COPY")" "$LOG_DIR"
  if curl -fsSL "$SCRIPT_URL" -o "$LOCAL_COPY.tmp" 2>/dev/null; then mv "$LOCAL_COPY.tmp" "$LOCAL_COPY"
  elif [ -f "${BASH_SOURCE[0]:-}" ]; then cp "${BASH_SOURCE[0]}" "$LOCAL_COPY"; fi
  chmod +x "$LOCAL_COPY" 2>/dev/null || { warn "could not save a local copy, no auto-update"; return; }
  local line="17 4 * * * $LOCAL_COPY --cron >> $LOG_DIR/update.log 2>&1 # termix-aegis-update"
  ( crontab -l 2>/dev/null | grep -v "termix-aegis-update"; echo "$line" ) | crontab - \
    && ok "auto-update: daily at 04:17 (log: $LOG_DIR/update.log, remove: $LOCAL_COPY --uninstall-auto)"
}

echo; echo "  Termix + Aegis × Burrow updater"
[ "$do_termix" = 1 ] && update_termix
[ "$do_aegis" = 1 ] && update_aegis
if [ "$auto" = 1 ]; then echo; install_auto; fi
echo
