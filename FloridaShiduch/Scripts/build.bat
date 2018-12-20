call echo MINIFYING main.min.js
call cd %~dp0
call node.exe node_modules\requirejs\bin\r.js -o app.build.js
call cd %~dp0\