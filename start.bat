echo off
color 2
cls
:a
npm run build && npm run start:prod
goto a
