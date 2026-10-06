# termix-autoupdate

Updates a Docker [Termix](https://github.com/Termix-SSH/Termix) install and [Aegis × Burrow](https://github.com/alexd-aero/aegis-burrow), then keeps both updated.

```bash
curl -fsSL https://raw.githubusercontent.com/alexd-aero/termix-autoupdate/main/update.sh | bash
```

- **Termix:** backs up the data folder to `~/termix-backups` (keeps 5), pulls the newest image, recreates the container only if the image changed (docker compose or plain docker run), and keeps the old image as `…:rollback-<version>`.
- **Aegis × Burrow:** upgrades to the newest version (config, login and tunnels are kept) and turns on its built-in auto-update.
- **Auto-update:** a daily cron job at 04:17 runs it again. Log: `~/.local/state/termix-aegis-update/update.log`.

Options (after `bash -s --`): `--check` report only · `--no-auto` no cron job · `--uninstall-auto` remove the cron job · `--termix-only` · `--aegis-only`

Updating Termix restarts it, which closes open terminal sessions.
