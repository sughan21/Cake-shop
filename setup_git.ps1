 = 'https://github.com/git-for-windows/git/releases/download/v2.44.0.windows.1/MinGit-2.44.0-64-bit.zip'
 = Join-Path C:\Users\SUGHAN~1\AppData\Local\Temp 'mingit.zip'
 = 'C:\Users\SUGHAN RITHVIK K\.mingit'
if (-not (Test-Path "\cmd\git.exe")) {
    Write-Host "Downloading MinGit..."
    Invoke-WebRequest -Uri  -OutFile  -UseBasicParsing
    Write-Host "Extracting MinGit..."
    Expand-Archive -Path  -DestinationPath  -Force
    Remove-Item  -Force -ErrorAction SilentlyContinue
}
& "\cmd\git.exe" --version
