# Hostinger VPS deployment

The website is a static React/Vite build served by Nginx. Existing UI files are unchanged. Nginx preserves direct React route visits, the canonical apex-to-www redirect, legacy route redirects, and the external /WhatsAppautomaton proxy defined in vercel.json.

## Bootstrap validation (before DNS changes)

In Hostinger Docker Manager, choose Compose from URL and application name `innovatorsaihub`:

`https://github.com/Sagaswager/innovatorsaihub/blob/hostinger-vps/docker-compose.yml`

This builds from the explicit Git branch rather than assuming the dashboard downloads the entire repo. It binds HTTP to VPS loopback port 8088 only. Check that this port is free; set WEBSITE_PORT to another free port if necessary. Keep existing containers running.

After deployment, use the VPS console:

```sh
curl -I http://127.0.0.1:8088/
curl -I http://127.0.0.1:8088/linkedin-ai-agent
curl -I http://127.0.0.1:8088/whatsapp-ai-agent
curl http://127.0.0.1:8088/healthz
```

This phase does not make the domain live and does not publish a public HTTP port.

## Production routing: confirm first

Inspect the existing Traefik network mode, Docker provider, shared network, HTTP/HTTPS entrypoints and certificate resolver. A blank PORTS column in docker ps does not establish that ports 80/443 are free; Traefik may use host networking. Do not create a second proxy on those ports.

For an existing shared bridge network, the standalone candidate is `deploy/compose.traefik.yml`. Populate these Hostinger Environment fields using verified existing values:

- TRAEFIK_NETWORK
- TRAEFIK_HTTP_ENTRYPOINT
- TRAEFIK_HTTPS_ENTRYPOINT
- TRAEFIK_CERT_RESOLVER

These variables are required deliberately; guessed names must not produce a misleading successful deployment. Confirm the proxy can discover this new service. A host-network or file-provider configuration requires adapting the candidate before deployment.

Once the website works behind the proxy, update only the relevant root and www DNS records at the actual authoritative DNS provider to target the VPS. Verify existing A/AAAA/CNAME records, nameservers and any CAA restrictions before changing them. Preserve email records and unrelated subdomains. Validate HTTPS for both names and canonical redirects before retiring the previous hosting.

## Builds and updates

- Build with npm ci and npm run build.
- Optional public analytics build arguments: VITE_GA_MEASUREMENT_ID and VITE_META_PIXEL_ID. Frontend configuration is baked into the built files; rebuilding is required for changes.
- Secret environment files are excluded from the Docker context. Never provide a private Gemini key as a frontend build argument.
- Compose URL deployment alone does not automatically redeploy on Git pushes. Redeploy/rebuild through Hostinger when the chosen branch changes, or add a separate authenticated deployment workflow later.
- Rollback: keep previous hosting available until HTTPS verification. If cutover fails, restore the old website DNS targets and redeploy a known-good website revision. Do not stop unrelated VPS applications.

## Validation limits

Run container build/config and HTTP checks on the VPS if Docker is unavailable in the preparation environment. The existing external WhatsApp backend must also be reachable from that VPS; test its proxy after deployment.

## Verified server configuration — 5 October 2026

Traefik container `traefik-traefik-1` uses host networking and the Docker provider. Startup arguments confirm `web=:80`, `websecure=:443`, resolver `letsencrypt` with HTTP challenge on `web`, and a global web-to-websecure HTTPS redirect. Bootstrap returned HTTP 200 on 127.0.0.1:8088.

For this server, use the standalone `deploy/compose.host-traefik.yml` in the existing Hostinger application `innovatorsaihub`. Replace/import the saved Compose definition before redeploying; a Git push alone does not update a dashboard-stored definition. Do not create a duplicate application or deploy the generic shared-network candidate.

The website retains its single default bridge network and loopback debug port. Host-network Traefik can reach the bridge container IP on this Linux host; the Docker provider discovers the website via labels and forwards to internal port 80. No external proxy network is required for this setup. Verify actual reachability after redeployment. The HTTPS router matches apex and www and uses the confirmed resolver; the existing global entrypoint redirect handles HTTP.

Before DNS cutover, test routing locally with SNI:

```sh
curl -kI --resolve www.innovatorsaihub.com:443:127.0.0.1 https://www.innovatorsaihub.com
```

This temporary test skips certificate verification because DNS still points to the previous host; it must not be treated as proof of valid HTTPS. Expect website HTTP 200. A 404 suggests router discovery problems; 502 suggests backend reachability problems. Check Traefik logs if needed.

DNS is currently delegated from Namecheap to Vercel. Inspect Vercel's root/www A, AAAA, CNAME and CAA records before updating website targets to 187.127.187.153. The configured HTTP challenge cannot obtain a certificate until public DNS and port 80 reach this VPS. After cutover, test without `-k`, verify both hostnames, canonical redirects, SPA deep links and the WhatsApp proxy. Keep previous hosting available for rollback.

## Deploy from a Windows PC

The root `deploy.ps1` script runs the proven website rebuild/start steps over SSH, then waits for container health and checks loopback health plus public HTTPS. It uses the existing server Compose file at `/docker/innovatorsaihub/docker-compose.yml`. That file builds committed code from `hostinger-vps`; local edits are not uploaded.

Download `deploy.ps1` from the `hostinger-vps` branch once. In PowerShell, open the folder containing it and run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\deploy.ps1
```

The execution-policy option applies only to this PowerShell process. Windows OpenSSH Client must be installed, and your PC must be able to connect to `root@187.127.187.153` on SSH port 22. The script prompts through SSH for your VPS password or key passphrase when needed; never put either in the repository. On the first connection, verify the server host-key fingerprint against the VPS before accepting it. Key authentication can avoid repeated VPS password entry; a passphrase-protected key may use ssh-agent.

Optional commands:

```powershell
.\deploy.ps1 -DryRun
.\deploy.ps1 -IdentityFile "$env:USERPROFILE\.ssh\id_ed25519"
.\deploy.ps1 -SshPort 2222
```

The script stops on failure. A failed build does not replace the running website; a failure after container replacement can require recovery. It starts only the website service and does not restart shared Traefik or other applications. A short interruption can occur when the website container is replaced. A successful result confirms health/HTTPS, not every page or the requested visual change; inspect the website after a hard refresh.

Running this file is manual deployment from your PC. Git pushes alone still do not trigger deployment. No live SSH run has been performed in the preparation environment; test the first connection on the user's PC. Use `-DryRun` to inspect the remote command without connecting.
