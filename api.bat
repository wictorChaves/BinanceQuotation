SET mypath=%~dp0
start "" "c:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:/Chrome dev session" --disable-web-security "%mypath%index.html"