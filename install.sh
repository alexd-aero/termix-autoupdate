#!/usr/bin/env bash
# Put BG Shell and Termix Updater into every Termix on this machine, and keep
# Termix up to date by itself from now on.
#
#   curl -fsSL https://raw.githubusercontent.com/alexd-aero/termix-autoupdate/main/install.sh | bash
#
# Finds each Termix container by what it is (official image, the image's
# source label, or Termix's own package inside a renamed or self-built
# image), reads its real data folder, drops the plugins into Termix's plugin
# manager there, grants their permissions and enables them. Then a daily
# timer keeps Termix and the plugins current, and the dashboard gets an
# "Update now" button. The first run asks for sudo and, once, a Termix admin
# login (to create an API key; the password is not stored).
#
# Same options as update.sh, e.g. `bash -s -- --check` to only look.
set -euo pipefail
url="https://raw.githubusercontent.com/alexd-aero/termix-autoupdate/main/update.sh"
script="$(mktemp)"
trap 'rm -f "$script"' EXIT
curl -fsSL "$url" -o "$script"
bash "$script" --termix "$@"
