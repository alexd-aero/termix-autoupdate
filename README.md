# termix-autoupdate

Keeps a Docker [Termix](https://github.com/Termix-SSH/Termix), its **BG Shell** and **Termix Updater** plugins, and [Aegis × Burrow](https://github.com/alexd-aero/aegis-burrow) up to date — by themselves.

## Just Termix: plugins + auto-update

```bash
curl -fsSL https://raw.githubusercontent.com/alexd-aero/termix-autoupdate/main/install.sh | bash
```

Finds every Termix on the machine by what it is, not what it is called: the official image names, the image's source label (mirrors and retags), or Termix's own package inside a renamed or self-built image. It prints where each one runs (container, port, data folder), installs the plugins into that Termix's plugin manager (its real `DATA_DIR`), grants their permissions and enables them, adds the dashboard's "Update now" button, and sets up the daily auto-update for Termix and the plugins. Aegis × Burrow is left alone. Add `bash -s -- --check` to only look.

- **BG Shell:** right-click a terminal tab → *Move to BG Shell*; it keeps running and opens from any device, with the terminal's own toolbar (image upload/paste, Share, Files, host tools).
- **Termix Updater:** an "Update now" card on the dashboard and a notice when a new Termix is out.

## Termix + Aegis × Burrow

```bash
curl -fsSL https://raw.githubusercontent.com/alexd-aero/termix-autoupdate/main/update.sh | bash
```

The first run asks for sudo and, once, for a Termix admin login. The login is only used to create an API key named `termix-autoupdate` (kept in `/etc/termix-autoupdate`, root only); the password is not saved. After that nothing needs a person:

- **Termix:** backs up the data folder to `~/termix-backups` (keeps 5), pulls the newest image, recreates the container only when the image changed (docker compose or docker run), keeps the old image as `…:rollback-<version>`.
- **Plugins** (`plugins/`): installs or updates BG Shell (move a terminal tab to the background and pick it up from any device) and Termix Updater (an "Update now" button on the dashboard). New plugins need one Termix restart; updates reload in place.
- **Update button:** a small root service per Termix container that only listens on a Unix socket inside Termix's data folder.
- **Aegis × Burrow:** upgrades to the newest version (config, login and tunnels are kept) and turns on its built-in auto-update.
- **Daily timer** (~04:17, `systemctl list-timers termix-autoupdate.timer`): downloads the newest version of this script and runs it. Log: `journalctl -u termix-autoupdate`.

Options (after `bash -s --`): `--check` report only · `--no-auto` no timer · `--uninstall-auto` · `--termix` Termix and plugins with the timer (what install.sh runs) · `--termix-only` · `--aegis-only`
Env: `TERMIX_CONTAINERS=name` only that container · `TERMIX_ADMIN_USER` / `TERMIX_ADMIN_PASS` one-time setup without a prompt.

Updating Termix restarts it, which closes open terminal sessions (BG Shell sessions too).
