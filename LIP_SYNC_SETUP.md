# Lip Sync Model Setup Guide

This project uses a lip-syncing model driven by text-to-speech (TTS) and phoneme recognition. To make it work on a new PC, you need to install a few system dependencies in addition to the Python packages.

## 1. Python Dependencies

First, ensure you have installed the Python requirements:

```powershell
cd backend
pip install -r requirements.txt
```

This installs `phonemizer`, `edge-tts`, `gTTS` (fallback TTS), `allosaurus`, and `pydub`.

## 2. System Dependencies (Windows)

The backend relies on two external tools: **eSpeak NG** (for text-to-phoneme conversion) and **FFmpeg** (for audio processing).

### A. Install eSpeak NG
The `phonemizer` library requires the `espeak-ng` shared library.

1.  Download the MSI installer for **eSpeak NG** from the official releases:  
    [https://github.com/espeak-ng/espeak-ng/releases/download/1.51/espeak-ng-X64.msi](https://github.com/espeak-ng/espeak-ng/releases/download/1.51/espeak-ng-X64.msi)
2.  Run the installer.
3.  **IMPORTANT:** Install it to the default location: `C:\Program Files\eSpeak NG`.
    *   The backend code automatically looks in this folder.
    *   If you install it elsewhere, you must add the installation folder to your system `PATH` manually.

### B. Install FFmpeg
The `pydub` and `allosaurus` libraries require FFmpeg to process audio files. 
> [!IMPORTANT]
> If you are using **Python 3.13+**, FFmpeg is **MANDATORY** because `pydub`'s built-in audio handling works differently. The backend will automatically fall back to using FFmpeg directly if `pydub` fails.


**Option 1: Using Winget (Recommended)**
Open PowerShell as Administrator and run:
```powershell
winget install "FFmpeg (Essentials Build)"
```
Restart your terminal after installation.

**Option 2: Manual Install**
1.  Download a build from [gyan.dev](https://www.gyan.dev/ffmpeg/builds/).
2.  Extract the zip file to `C:\ffmpeg`.
3.  Add `C:\ffmpeg\bin` to your System Environment Variables `PATH`.
    *   Search "Environment Variables" in Windows Start.
    *   Click "Environment Variables".
    *   Select `Path` in "System variables" and click "Edit".
    *   Click "New" and add `C:\ffmpeg\bin`.

## 3. Verify Installation

To check if everything is working:

1.  **Check eSpeak NG:**
    Open PowerShell and run:
    ```powershell
    espeak-ng --version
    ```
    If recognized, it's installed correctly.

2.  **Check FFmpeg:**
    Run:
    ```powershell
    ffmpeg -version
    ```

3.  **Run the Backend:**
    Start your backend server. You should see logs indicating it found the libraries:
    ```text
    ✅ Found eSpeak-ng at: C:\Program Files\eSpeak NG
    ✅ Found and added FFmpeg to PATH: ...
    ```

## 4. Troubleshooting

*   **"eSpeak-ng is not installed"**: Ensure `C:\Program Files\eSpeak NG\libespeak-ng.dll` exists. If not, reinstall eSpeak NG.
*   **Audio processing errors**: Ensure `ffmpeg` command works in your terminal.
*   **Allosaurus model download**: On the first run, the system will download the Allosaurus model. This might take a minute.
