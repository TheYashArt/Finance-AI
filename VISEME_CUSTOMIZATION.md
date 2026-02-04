# Viseme Lip Sync - Customization Guide

## 🎯 Quick Reference: What to Modify

### 1. **Animation Speed** (How fast mouth moves between shapes)
**File:** `avatar.jsx` line ~318
```javascript
const smoothFactor = Math.min(1, visemeProgress * 3);
```
- **Increase** `3` → `5` for **faster** transitions (snappier)
- **Decrease** `3` → `1.5` for **slower** transitions (smoother)

---

### 2. **Animation Intensity** (How much mouth opens/moves)
**File:** `avatar.jsx` lines ~325, ~332
```javascript
// MOUTH OPEN intensity
const newValue = hInfl[hDict.mouthOpen] * (1 - smoothFactor * 0.5) + targetValue * smoothFactor * 0.5;
```
- **Increase** `0.5` → `0.8` or `1.0` for **more pronounced** mouth movements
- **Decrease** `0.5` → `0.3` for **more subtle** movements

---

### 3. **Viseme Duration** (How long each sound lasts)
**File:** `visemeUtils.js` lines ~143-154
```javascript
function getVisemeDuration(viseme) {
    if (consonants.includes(viseme)) {
        return 0.08; // 80ms for consonants
    } else if (vowels.includes(viseme)) {
        return 0.12; // 120ms for vowels
    }
}
```
- **Increase** values for **slower** speech (0.08 → 0.12, 0.12 → 0.18)
- **Decrease** values for **faster** speech (0.08 → 0.05, 0.12 → 0.08)

---

### 4. **Mouth Shapes** (Customize how each viseme looks)
**File:** `visemeUtils.js` lines ~187-289
```javascript
case 'aa':
    morphTargets.mouthOpen = 0.8;  // How wide mouth opens (0-1)
    morphTargets.jawOpen = 0.6;    // How much jaw drops (0-1)
    break;
```
**Adjust values (0-1) for each viseme:**
- `mouthOpen`: Vertical mouth opening
- `mouthSmile`: Smile/grin amount
- `mouthFunnel`: "O" shape roundness
- `mouthPucker`: Lips pushed forward
- `jawOpen`: Jaw drop amount

---

### 5. **Neutral/Rest Position** (Mouth when not speaking)
**File:** `avatar.jsx` lines ~363-366
```javascript
hInfl[hDict.mouthOpen] = 0.05; // Slightly open
```
- **Increase** `0.05` → `0.1` for **more open** resting mouth
- **Decrease** `0.05` → `0.0` for **fully closed** resting mouth

---

## 📝 Common Customizations

### Make Mouth Movements MORE Dramatic
1. Increase animation intensity: `0.5` → `0.8` (lines 325, 332)
2. Increase viseme morph values in `visemeUtils.js`:
   ```javascript
   case 'aa':
       morphTargets.mouthOpen = 1.0;  // Was 0.8
       morphTargets.jawOpen = 0.8;    // Was 0.6
   ```

### Make Speech Faster
1. Decrease viseme durations in `visemeUtils.js`:
   ```javascript
   return 0.05; // Was 0.08 for consonants
   return 0.08; // Was 0.12 for vowels
   ```

### Make Transitions Smoother
1. Decrease transition speed: `* 3` → `* 1.5` (line 318)
2. Decrease animation intensity: `0.5` → `0.3` (lines 325, 332)

---

## 🔧 Advanced: Add New Visemes

To add a custom viseme shape:

1. **Add to viseme types** (`visemeUtils.js` line 8):
   ```javascript
   export const VISEME_TYPES = {
       // ... existing
       CUSTOM: 'CUSTOM'  // Your new viseme
   };
   ```

2. **Map phonemes to it** (line 26):
   ```javascript
   const PHONEME_TO_VISEME = {
       // ... existing
       'x': 'CUSTOM'  // Map sound to your viseme
   };
   ```

3. **Define morph targets** (line 187):
   ```javascript
   case 'CUSTOM':
       morphTargets.mouthOpen = 0.5;
       morphTargets.mouthSmile = 0.3;
       // ... etc
       break;
   ```

---

## 🐛 Troubleshooting

**Mouth not moving enough?**
- Increase intensity multiplier (0.5 → 0.8)
- Increase morph target values in `getVisemeMorphTargets()`

**Movements too jerky?**
- Decrease transition speed (3 → 1.5)
- Increase viseme durations

**Speech too slow/fast?**
- Adjust durations in `getVisemeDuration()`

**Want different phoneme mapping?**
- Edit `PHONEME_TO_VISEME` in `visemeUtils.js`
- Add words to `WORD_PATTERNS` for better accuracy
