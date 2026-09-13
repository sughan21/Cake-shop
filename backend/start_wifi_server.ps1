$port = 8080
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
if (-not $scriptDir) { $scriptDir = Get-Location }

# Locate the frontend directory (robust check for both root and backend subfolder)
$frontendDir = Join-Path $scriptDir "frontend"
if (-not (Test-Path $frontendDir)) {
  $parentDir = Split-Path -Parent $scriptDir
  $frontendDir = Join-Path $parentDir "frontend"
}
if (-not (Test-Path $frontendDir)) {
  $frontendDir = $scriptDir
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://*:$port/")
try {
  $listener.Start()
  $ip = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias 'Wi-Fi*','Ethernet*' | Where-Object { $_.IPAddress -notlike '169.*' -and $_.IPAddress -notlike '127.*' } | Select-Object -First 1).IPAddress
  if (-not $ip) { $ip = "localhost" }
  
  Write-Host ""
  Write-Host "=========================================================" -ForegroundColor Cyan
  Write-Host "  🍰 SUGAR CUBES POS - MOBILE WI-FI SERVER ACTIVE!       " -ForegroundColor Green
  Write-Host "=========================================================" -ForegroundColor Cyan
  Write-Host ""
  Write-Host "  Frontend Root Directory: $frontendDir" -ForegroundColor Gray
  Write-Host ""
  Write-Host "  Open on your Phone / Tablet (connected to same Wi-Fi):" -ForegroundColor Yellow
  Write-Host "  >>> http://${ip}:${port}/index.html <<<" -ForegroundColor White
  Write-Host "  >>> http://${ip}:${port}/standalone.html <<< (Offline Version)" -ForegroundColor Gray
  Write-Host ""
  Write-Host "  (Press Ctrl + C to stop the server anytime)" -ForegroundColor DarkGray
  Write-Host "=========================================================" -ForegroundColor Cyan
  Write-Host ""

  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $reqPath = $context.Request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrEmpty($reqPath) -or $reqPath -eq '/') { $reqPath = "index.html" }
    
    $filePath = Join-Path $frontendDir $reqPath
    if (Test-Path $filePath -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
      $contentType = switch ($ext) {
        ".html" { "text/html; charset=utf-8" }
        ".css"  { "text/css; charset=utf-8" }
        ".js"   { "application/javascript; charset=utf-8" }
        ".json" { "application/json; charset=utf-8" }
        ".svg"  { "image/svg+xml" }
        ".png"  { "image/png" }
        ".jpg"  { "image/jpeg" }
        ".jpeg" { "image/jpeg" }
        ".ico"  { "image/x-icon" }
        Default { "application/octet-stream" }
      }
      $context.Response.ContentType = $contentType
      $context.Response.ContentLength64 = $bytes.Length
      $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $context.Response.StatusCode = 404
    }
    $context.Response.Close()
  }
} catch {
  Write-Host "Note: If prompted, please click 'Allow access' in Windows Firewall." -ForegroundColor Yellow
  Write-Host "Error details: $_" -ForegroundColor Red
} finally {
  $listener.Stop()
}
