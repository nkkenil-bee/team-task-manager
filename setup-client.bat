@echo off
echo Initializing Frontend Setup...
cd client
call npm.cmd install
if %ERRORLEVEL% NEQ 0 (
    echo Error during npm install.
    pause
    exit /b %ERRORLEVEL%
)
echo Frontend setup complete! Starting dev server...
call npm.cmd run dev
pause
