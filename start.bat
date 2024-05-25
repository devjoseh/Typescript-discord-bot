echo off
color 1
cls
:a
npm run build && npm run start:prod
goto a
