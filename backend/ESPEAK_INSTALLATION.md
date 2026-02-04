# eSpeak-NG Installation Guide for Windows

## What is eSpeak-NG?

eSpeak-NG (Next Generation) is an open-source text-to-speech synthesizer that the Phonemizer library uses to convert text into accurate phonetic representations (IPA - International Phonetic Alphabet).

**Why do we need it?**
- Provides professional-grade phoneme conversion for 100+ languages
- Much more accurate than our basic JavaScript letter-to-phoneme mapping
- Industry-standard tool used by linguists and speech synthesis applications

---

## Installation Steps for Windows

### Option 1: Download Pre-built Installer (Recommended)

1. **Download the latest release:**
   - Go to: https://github.com/espeak-ng/espeak-ng/releases
   - Download the Windows installer (`.msi` file)
   - Example: `espeak-ng-X64.msi` for 64-bit Windows

2. **Run the installer:**
   - Double-click the downloaded `.msi` file
   - Follow the installation wizard
   - **Important:** Note the installation directory (usually `C:\Program Files\eSpeak NG\`)

3. **Add to System PATH:**
   - Open "Environment Variables":
     - Press `Win + X` → Select "System"
     - Click "Advanced system settings"
     - Click "Environment Variables"
   - Under "System variables", find and select `Path`
   - Click "Edit"
   - Click "New"
   - Add: `C:\Program Files\eSpeak NG\`
   - Click "OK" on all dialogs

4. **Verify installation:**
   - Open a **new** PowerShell window (important - must be new to load updated PATH)
   - Run: `espeak-ng --version`
   - You should see version information

---

### Option 2: Using Chocolatey (Package Manager)

If you have Chocolatey installed:

```powershell
choco install espeak-ng
```

---

### Option 3: Using Scoop (Package Manager)

If you have Scoop installed:

```powershell
scoop install espeak-ng
```

---

## Testing the Installation

### 1. Test eSpeak-NG directly:
```powershell
espeak-ng "Hello world"
```
You should hear synthesized speech.

### 2. Test the Phonemizer API:

**Option A: Using PowerShell (Invoke-WebRequest)**
```powershell
$body = @{
    text = "hello world"
    language = "en-us"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8000/api/v1/phoneme/text-to-visemes" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

**Option B: Using Browser**
1. Open your browser
2. Navigate to: `http://localhost:8000/docs`
3. Find the `/api/v1/phoneme/text-to-visemes` endpoint
4. Click "Try it out"
5. Enter test data:
   ```json
   {
     "text": "hello world",
     "language": "en-us"
   }
   ```
6. Click "Execute"
7. You should see a response with IPA phonemes and viseme sequence

**Expected Response:**
```json
{
  "text": "hello world",
  "phonemes": "həˈloʊ wɜːrld",
  "visemes": [
    {"viseme": "sil", "start": 0, "duration": 0.08},
    {"viseme": "RR", "start": 0.08, "duration": 0.12},
    ...
  ],
  "total_duration": 1.2
}
```

---

## Troubleshooting

### Error: "espeak-ng not found"
**Solution:** Make sure you've added eSpeak-NG to your PATH and opened a **new** terminal window.

### Error: "The system cannot find the path specified"
**Solution:** Check that the installation directory is correct. It might be:
- `C:\Program Files\eSpeak NG\`
- `C:\Program Files (x86)\eSpeak NG\`

### Phonemizer API returns 500 error
**Solution:** 
1. Check backend logs for detailed error message
2. Verify eSpeak-NG is accessible from Python:
   ```python
   from phonemizer import phonemize
   print(phonemize("test", language='en-us', backend='espeak'))
   ```

### Backend server won't restart
**Solution:** 
- The backend should auto-reload when you save files
- If not, manually restart: `Ctrl+C` then `python -m uvicorn app.main:app --reload`

---

## What Happens After Installation?

Once eSpeak-NG is installed:

1. ✅ The backend Phonemizer API will work correctly
2. ✅ Avatar will use professional-grade phoneme conversion
3. ✅ Lip sync accuracy will dramatically improve for ALL words
4. ✅ Complex words like "opportunity", "phonemizer", "supercalifragilisticexpialidocious" will work perfectly

**If eSpeak-NG is NOT installed:**
- The API will fail gracefully
- Frontend will automatically fall back to the local JavaScript conversion
- Avatar will still work, but with less accurate phonemes

---

## Next Steps

After installing eSpeak-NG:

1. Restart your backend server (if running)
2. Test the API endpoint (see "Testing the Installation" above)
3. Go to the Avatar page in your app
4. Try these test phrases:
   - "Hi my name is Yash"
   - "Wow amazing opportunity"
   - "Phonemizer provides accurate pronunciation"
   - "Supercalifragilisticexpialidocious"

You should see in the browser console:
```
✅ Using Phonemizer API for accurate phonemes
IPA Phonemes: [phonetic representation]
Viseme count: [number]
```

If you see:
```
⚠️ Phonemizer API error, falling back to local conversion
```
Then eSpeak-NG is not properly installed or accessible.

---

## Additional Resources

- **eSpeak-NG GitHub:** https://github.com/espeak-ng/espeak-ng
- **Phonemizer Documentation:** https://github.com/bootphon/phonemizer
- **IPA Chart:** https://www.internationalphoneticassociation.org/content/ipa-chart
