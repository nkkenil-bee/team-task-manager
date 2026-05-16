@echo off
echo [1/4] Adding all changes...
git add .
if %errorlevel% neq 0 (
    echo Error: Failed to add files.
    pause
    exit /b %errorlevel%
)

echo [2/4] Committing changes...
git commit -m "Final deployment prep from Antigravity"
if %errorlevel% neq 0 (
    echo No changes to commit or commit failed. Continuing...
)

echo [3/4] Ensuring remote URL is correct...
git remote set-url origin https://github.com/nkkenil-bee/team-task-manager.git

echo [4/4] Pushing to GitHub...
:: Try pushing to main, then master if main fails
git push origin main
if %errorlevel% neq 0 (
    echo main branch push failed, trying master...
    git push origin master
)

if %errorlevel% neq 0 (
    echo Error: Push failed. Please check your internet connection or GitHub permissions.
    pause
    exit /b %errorlevel%
)

echo.
echo ==========================================
echo DEPLOYMENT TRIGGERED!
echo ==========================================
echo Your changes are now on GitHub. 
echo If your Railway project is connected to this repo, 
echo it will start building automatically.
echo.
pause
