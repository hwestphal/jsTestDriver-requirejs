@echo off
set FIREFOX=C:\Program Files (x86)\Mozilla Firefox\firefox.exe
cmd /c ""%JAVA_HOME%\bin\java.exe" -jar JsTestDriver-1.3.4.b.jar --port 4224 --browser "%FIREFOX%""
pause
