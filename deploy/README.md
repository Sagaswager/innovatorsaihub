# Hostinger VPS deployment

The website is a static React/Vite build served by Nginx. Existing UI files are unchanged. Nginx preserves direct React route visits, the canonical apex-to-www redirect, legacy route redirects, and the external /WhatsAppautomaton proxy defined in vercel.json.

## Bootstrap validation (before DNS changes)

In Hostinger Docker Manager, choose Compose from URL and application name `innovatorsaihub-website`:

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
