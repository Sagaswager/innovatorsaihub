# Website deployment safety

The shared deployment engine is `deploy/remote-deploy.sh`. Both GitHub Actions
and `deploy.ps1` execute this same script so readiness and rollback behavior do
not drift.

Before mutation it verifies:

- Docker, Compose and curl are available.
- Only one website deployment holds the lock.
- the saved Compose file parses.
- an existing website container is running.
- its image still exists locally for rollback.
- loopback `/healthz` and public HTTPS are healthy.

It then builds the website without cache, replaces only the `website` service,
and repeats both health checks. If starting the replacement or either post-
deployment health check fails, it retags the previous image, recreates only the
website service, and verifies the restored release.

The script refuses a first deployment with no prior website container because
there is no safe rollback baseline. Bootstrap remains a separate, supervised
operation.

## Non-interactive execution

GitHub Actions requires these existing repository secrets:

- `VPS_SSH_PRIVATE_KEY`
- `VPS_KNOWN_HOSTS`

Windows PowerShell can use the same fail-closed mode:

```powershell
.\deploy.ps1 -NonInteractive `
  -IdentityFile "$env:USERPROFILE\.ssh\iah_deploy" `
  -KnownHostsFile "$env:USERPROFILE\.ssh\known_hosts"
```

Do not put private keys, passwords or host-key contents in the repository.
The dedicated SSH key should be limited to this website deployment path where
the VPS SSH configuration supports command restrictions.

## Validation

```sh
bash -n deploy/remote-deploy.sh
bash deploy/remote-deploy.test.sh
```

The test suite covers success, pre-mutation build failure, start failure with
rollback, and post-deployment health failure with rollback. These are mock
tests; the first real SSH run and rollback remain blocked until authorized VPS
access and repository secrets are independently verified.
