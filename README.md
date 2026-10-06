# termix-autoupdate

Keeps a Docker [Termix](https://github.com/Termix-SSH/Termix), its **BG Shell** and **Termix Updater** plugins, and [Aegis × Burrow](https://github.com/alexd-aero/aegis-burrow) up to date — by themselves.

```bash
curl -fsSL https://raw.githubusercontent.com/alexd-aero/termix-autoupdate/main/update.sh | bash
```

The first run asks for sudo and, once, for a Termix admin login. The login is only used to create an API key named `termix-autoupdate` (kept in `/etc/termix-autoupdate`, root only); the password is not saved. After that nothing needs a person:

- **Termix:** backs up the data folder to `~/termix-backups` (keeps 5), pulls the newest image, recreates the container only when the image changed (docker compose or docker run), keeps the old image as `…:rollback-<version>`.
- **Plugins** (`plugins/`): installs or updates BG Shell (move a terminal tab to the background and pick it up from any device) and Termix Updater (an "Update now" button on the dashboard). New plugins need one Termix restart; updates reload in place.
- **Update button:** a small root service per Termix container that only listens on a Unix socket inside Termix's data folder.
- **Aegis × Burrow:** upgrades to the newest version (config, login and tunnels are kept) and turns on its built-in auto-update.
- **Daily timer** (~04:17, `systemctl list-timers termix-autoupdate.timer`): downloads the newest version of this script and runs it. Log: `journalctl -u termix-autoupdate`.

Options (after `bash -s --`): `--check` report only · `--no-auto` no timer · `--uninstall-auto` · `--termix-only` · `--aegis-only`
Env: `TERMIX_CONTAINERS=name` only that container · `TERMIX_ADMIN_USER` / `TERMIX_ADMIN_PASS` one-time setup without a prompt.

Updating Termix restarts it, which closes open terminal sessions (BG Shell sessions too).
