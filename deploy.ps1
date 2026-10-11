#Requires -Version 5.1
<#
.SYNOPSIS
Deploy Innovators AI Hub to its existing Hostinger VPS with readiness checks and rollback.
.EXAMPLE
powershell -NoProfile -ExecutionPolicy Bypass -File .\deploy.ps1 -DryRun
.EXAMPLE
.\deploy.ps1 -NonInteractive -IdentityFile "$env:USERPROFILE\.ssh\iah_deploy" -KnownHostsFile "$env:USERPROFILE\.ssh\known_hosts"
.NOTES
Deploys committed code from the branch configured in the VPS Compose file.
Credentials remain outside the repository.
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

    [string]$KnownHostsFile,

    [switch]$NonInteractive,

    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$remoteScriptPath = Join-Path $scriptRoot 'deploy\remote-deploy.sh'
if (-not (Test-Path -LiteralPath $remoteScriptPath -PathType Leaf)) {
    throw "Remote deployment script not found: $remoteScriptPath"
}

$remoteScriptBase64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($remoteScriptPath))
$remoteCommand = "printf '%s' '$remoteScriptBase64' | base64 -d | bash -se"
$target = "${SshUser}@${VpsHost}"

if ($DryRun) {
    Write-Host "SSH target: $target (port $SshPort)"
    Write-Host "Remote script: $remoteScriptPath"
    Write-Host 'Checks readiness, rebuilds only website, validates local/public health, and restores the prior image on post-build failure.'
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
    $sshArguments += @(
        '-i', (Resolve-Path -LiteralPath $IdentityFile).Path,
        '-o', 'IdentitiesOnly=yes'
    )
}
if ($KnownHostsFile) {
    if (-not (Test-Path -LiteralPath $KnownHostsFile -PathType Leaf)) {
        throw "Known-hosts file not found: $KnownHostsFile"
    }
    $sshArguments += @(
        '-o', 'StrictHostKeyChecking=yes',
        '-o', "UserKnownHostsFile=$((Resolve-Path -LiteralPath $KnownHostsFile).Path)"
    )
}
if ($NonInteractive) {
    if (-not $IdentityFile -or -not $KnownHostsFile) {
        throw '-NonInteractive requires both -IdentityFile and -KnownHostsFile.'
    }
    $sshArguments += @('-o', 'BatchMode=yes')
}

Write-Host "Deploying committed website code to $target..."
if (-not $NonInteractive) {
    Write-Host 'SSH may ask for the VPS password or key passphrase. Enter it in this terminal.'
}
& $sshCommand.Source @sshArguments $target $remoteCommand
if ($LASTEXITCODE -ne 0) {
    throw "Deployment or verification failed (SSH exit code $LASTEXITCODE). Read the error above."
}

Write-Host 'Deployment completed; readiness, container health and public HTTPS checks passed.' -ForegroundColor Green
Write-Host 'Open https://www.innovatorsaihub.com/ and press Ctrl+Shift+R to inspect the change.'
