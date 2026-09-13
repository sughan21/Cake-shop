@echo off
title Sugar Cubes Mobile POS Server
powershell -ExecutionPolicy Bypass -File "%~dp0backend\start_wifi_server.ps1"
pause
