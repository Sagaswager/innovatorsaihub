#Requires -Version 5.1
<#
.SYNOPSIS
Rebuild and deploy Innovators AI Hub on its existing Hostinger VPS over SSH.
.EXAMPLE
powershell -NoProfile -ExecutionPolicy Bypass -File .\deploy.ps1
.EXAMPLE
.\deploy.ps1 -IdentityFile "$env:USERPROFILE\.ssh\id_ed25519"
.NOTES
Deploys the branch in the VPS Compose file (currently hostinger-vps), not local
uncommitted files. SSH credentials stay on your PC; no credentials belong here.
#>
[CmdletBinding()]
param(
    [ValidatePattern('^[A-Za-z0-9][A-Za-z0-9.-]*$')]
    [string]$VpsHost = '187.127.187.153',

    [ValidatePattern('^[a-z_][a-z0-9_-]*$')]
    [string]$SshUser = 'root',

    [ValidateRange(1, 65535)]
    [int]$SshPort = 22,

    [string]$IdentityFile,

    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

# A single remote shell command avoids Windows/Linux stdin line-ending issues.
# Each step must succeed before the next; a failed build leaves the running
# website in place. Only the website service is recreated.
$remoteSteps = @(
    'set -eu',
    'cd /docker/innovatorsaihub',
    'docker compose -f docker-compose.yml config --quiet',
    'docker compose -f docker-compose.yml build --no-cache website',
    'docker compose -f docker-compose.yml up -d --no-deps --wait --wait-timeout 60 website',
    'curl --fail --silent --show-error --max-time 15 --output /dev/null http://127.0.0.1:8088/healthz',
    'curl --fail --silent --show-error --location --max-time 30 --retry 3 --retry-delay 2 --output /dev/null https://www.innovatorsaihub.com/'
)
$remoteCommand = $remoteSteps -join '; '
$target = "${SshUser}@${VpsHost}"

if ($DryRun) {
    Write-Host "SSH target: $target (port $SshPort)"
    Write-Host $remoteCommand
    Write-Host 'Dry run only. No connection or deployment performed.'
    exit 0
}

$sshCommand = Get-Command ssh -CommandType Application -ErrorAction SilentlyContinue
if (-not $sshCommand) {
    throw 'OpenSSH Client is missing. Install it from Windows Optional Features, then retry.'
}

$sshArguments = @(
    '-p', "$SshPort",
    '-o', 'ConnectTimeout=15',
    '-o', 'ServerAliveInterval=15',
    '-o', 'ServerAliveCountMax=3'
)
if ($IdentityFile) {
    if (-not (Test-Path -LiteralPath $IdentityFile -PathType Leaf)) {
        throw "SSH key file not found: $IdentityFile"
    }
    $sshArguments += @('-i', (Resolve-Path -LiteralPath $IdentityFile).Path, '-o', 'IdentitiesOnly=yes')
}

Write-Host "Deploying committed website code to $target..."
Write-Host 'SSH may ask for the VPS password or key passphrase. Enter it in this terminal.'
& $sshCommand.Source @sshArguments $target $remoteCommand
if ($LASTEXITCODE -ne 0) {
    throw "Deployment or verification failed (SSH exit code $LASTEXITCODE). Read the error above."
}

Write-Host 'Deployment completed; container health and public HTTPS checks passed.' -ForegroundColor Green
Write-Host 'Open https://www.innovatorsaihub.com/ and press Ctrl+Shift+R to inspect the change.'
