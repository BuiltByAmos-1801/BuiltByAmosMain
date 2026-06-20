@echo off
setlocal
cd /d "%~dp0"

set DOMAIN=builtbyamos.in

call :validate_cname "CNAME" || exit /b 1
call :validate_cname "public\CNAME" || exit /b 1

if not exist dist mkdir dist
copy /Y CNAME dist\CNAME >nul
type nul > dist\.nojekyll
call :validate_cname "dist\CNAME" || exit /b 1

echo CNAME validation passed before deploy.
git add .
git commit -m "Preserve GitHub Pages custom domain"
git push origin main
exit /b %ERRORLEVEL%

:validate_cname
if not exist %~1 (
  echo Missing %~1
  exit /b 1
)
set /p VALUE=<%~1
if not "%VALUE%"=="%DOMAIN%" (
  echo Invalid %~1. Expected %DOMAIN% but found %VALUE%
  exit /b 1
)
echo %~1 contains %DOMAIN%
exit /b 0
