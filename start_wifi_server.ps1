$port = 8080
$folder = Split-Path -Parent $MyInvocation.MyCommand.Definition
if (-not $folder) { $folder = Get-Location }
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://*:$port/")
try {
  $listener.Start()
  $ip = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias 'Wi-Fi*','Ethernet*' | Where-Object { $_.IPAddress -notlike '169.*' -and $_.IPAddress -notlike '127.*' } | Select-Object -First 1).IPAddress
  Write-Host ""
  Write-Host "=========================================================" -ForegroundColor Cyan
  Write-Host "  🍰 SUGAR CUBES POS - MOBILE WI-FI SERVER ACTIVE!       " -ForegroundColor Green
  Write-Host "=========================================================" -ForegroundColor Cyan
  Write-Host ""
  Write-Host "  Open this link on your Mobile Phone (connected to Wi-Fi):" -ForegroundColor Yellow
  Write-Host "  >>> http://${ip}:${port}/standalone.html <<<" -ForegroundColor White
  Write-Host ""
  Write-Host "  (Press Ctrl + C to stop the server anytime)" -ForegroundColor Gray
  Write-Host "=========================================================" -ForegroundColor Cyan
  Write-Host ""
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $reqPath = $context.Request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrEmpty($reqPath) -or $reqPath -eq '/') { $reqPath = "standalone.html" }
    $filePath = Join-Path $folder $reqPath
    if (Test-Path $filePath -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
      $contentType = switch ($ext) {
        ".html" { "text/html; charset=utf-8" }
        ".css"  { "text/css; charset=utf-8" }
        ".js"   { "application/javascript; charset=utf-8" }
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
