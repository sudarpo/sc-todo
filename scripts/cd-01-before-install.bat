REM Install Internet Information Server (IIS).
c:\Windows\Sysnative\WindowsPowerShell\v1.0\powershell.exe -Command Import-Module -Name ServerManager
c:\Windows\Sysnative\WindowsPowerShell\v1.0\powershell.exe -Command Install-WindowsFeature Web-Server

REM
del /F /S C:\inetpub\wwwroot\iistart.*
del /F /S C:\inetpub\wwwroot\index.html
