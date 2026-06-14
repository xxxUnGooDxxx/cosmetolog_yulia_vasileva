@echo off
chcp 65001 >nul
title Сайт Юлия Васильева — локальный сервер
cd /d "%~dp0"

echo ============================================
echo   Запуск сайта косметолога (локально)
echo   Закройте это окно, чтобы остановить сервер
echo ============================================
echo.

if not exist "node_modules" (
  echo Первый запуск: устанавливаю зависимости...
  call npm install
  echo.
)

start "" http://localhost:5173/
call npm run dev
pause
