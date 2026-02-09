# Lip Sync System Documentation

This document explains how the lip-syncing system works in this project and provides a guide on how to tune it for better accuracy.

## 1. System Architecture

The lip sync system operates in a pipeline:

1.  **Text Input** → **Text-to-Speech (TTS)**
    *   Generates audio using `edge-tts` (Microsoft Edge Neural Voice).
2.  **Audio Analysis** (or Text Analysis)
    *   **Text-Based**: Uses `phonemizer` (backed by eSpeak NG) to convert text to IPA phonemes.
    *   **Audio-Based (More Accurate)**: Uses `allosaurus` to recognize phonemes directly from the generated audio with precise timestamps.
3.  **Phoneme to Viseme Mapping**
    *   Maps International Phonetic Alphabet (IPA) symbols to *Visemes* (visual mouth shapes).
    *   We use the **Oculus/Meta Viseme Standard** (15 standard shapes like `sil`, `PP`, `FF`, `aa`, `O`).
4.  **Frontend Animation**
    *   The React frontend receives the list of visemes with start times and durations.
    *   It interpolates between mouth shapes (morph targets) on the 3D Avatar (Ready Player Me).

---

## 2. Key Files

*   **Backend**: `backend/app/services/phoneme_service.py`
    *   Contains the core logic for conversion, mapping, and duration calculation.
*   **Frontend**: `frontend/src/utils/visemeUtils.js`
    *   Defines the morph target values for each viseme (how wide the mouth opens, etc.).
    *   Handles the animation loop.

---

## 3. How to Tune for Accuracy

You can adjust three main areas to improve the lip sync: **Timing**, **Smoothness**, and **Shape**.

### A. Tuning Duration (Timing)
*   **File**: `backend/app/services/phoneme_service.py`
*   **Function**: `get_viseme_duration(viseme)`

This function defines how long a mouth shape is held if we are not using the audio-based timestamping (i.e., when using text-only mode).

```python
def get_viseme_duration(viseme: str) -> float:
    # Adjust these values to make speech faster or slower
    if viseme in consonants:
        return 0.1  # Current: 200ms
    elif viseme in vowels:
        return 0.2  # Current: 100ms
```

**To make speech look faster:** Reduce these values.
**To make speech look more distinct:** Increase values, especially for consonants.

### B. Tuning Smoothness (Merging)
*   **File**: `backend/app/services/phoneme_service.py`
*   **Function**: `merge_visemes(viseme_sequence)`

Raw phoneme streams can be too jittery (e.g., trying to show 5 shapes in 0.1 seconds). This function merges similar shapes.

**Tuning Options in `merge_visemes`:**
1.  **Strictness**: You can loosen the `VISUAL_GROUPS` to merge more dissimilar shapes if the mouth is moving too fast.
2.  **Minimum Duration**: Look for the filter logic at the end of the function:
    ```python
    # Filtering weak shapes if they are too short
    if duration >= 0.08: keep = True  # Increase to 0.10 to catch more twitching
    ```

### C. Tuning Mouth Shapes (Visuals)
*   **File**: `frontend/src/utils/visemeUtils.js`
*   **Function**: `getVisemeMorphTargets(viseme)`

This defines exactly which morph targets are triggered for a shape like "O" or "aa".

**Example:**
If the "O" sound doesn't look round enough:
```javascript
case 'O':
    // Increase mouthFunnel for a rounder shape
    morphTargets.mouthOpen = 1.0;
    morphTargets.mouthFunnel = 1.0; // Current
    morphTargets.jawOpen = 0.8;
    break;
```

**Common Morph Targets (Ready Player Me):**
*   `mouthOpen`: Jaw drops.
*   `mouthSmile`: Corners go up.
*   `mouthPucker`: Lips push forward (kiss face).
*   `mouthFunnel`: Lips make an 'O' shape.
*   `jawOpen`: Jaw drops (sometimes separate from mouthOpen).

---

## 4. Debugging

### Enable Backend Logging
In `backend/app/api/v1/routes/phoneme.py`, you can uncomment print statements to see the exact IPA sequence generated:

```python
# phonemes = text_to_phonemes(request.text)
# print(f"IPA: {phonemes}")
```

### Visual Debugging
Look at the browser console (F12). The frontend logs the number of visemes received:
`✅ TTS & Visemes received`
`Viseme count: 42`

If the count is very low for a long sentence, your `merge_visemes` logic might be too aggressive.
