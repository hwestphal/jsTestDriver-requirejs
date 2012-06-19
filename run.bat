@echo off
:loop
cmd /c "%JAVA_HOME%\bin\java.exe" -jar JsTestDriver-1.3.4.b.jar --reset --tests all --testOutput test-results
pause
goto loop
