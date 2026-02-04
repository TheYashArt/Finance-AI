# Set eSpeak-ng environment variable before starting the server
# This tells Phonemizer where to find eSpeak-ng

$env:ESPEAK_LIBRARY = "C:\Program Files\eSpeak NG\libespeak-ng.dll"
$env:PATH = "C:\Program Files\eSpeak NG;" + $env:PATH

Write-Host "✅ eSpeak-ng environment variables set"
Write-Host "ESPEAK_LIBRARY: $env:ESPEAK_LIBRARY"
Write-Host ""
Write-Host "Starting backend server..."
Write-Host ""

# Activate virtual environment and start server
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
