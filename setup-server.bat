@echo off
echo Initializing Backend Setup...
cd server
call npm.cmd install
if %ERRORLEVEL% NEQ 0 (
    echo Error during npm install.
    pause
    exit /b %ERRORLEVEL%
)
echo Generating Prisma Client...
call npx.cmd prisma generate
echo Running migrations...
call npx.cmd prisma migrate dev --name init
echo Backend setup complete! Starting dev server...
call npm.cmd run dev
pause
