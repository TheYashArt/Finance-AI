# Avatar Animation System Documentation

## Overview
The Avatar system provides an interactive 3D character with realistic animations including hand gestures, facial expressions, and dynamic zoom/positioning based on conversation state.

---

## Table of Contents
1. [Architecture](#architecture)
2. [Component Structure](#component-structure)
3. [Animation System](#animation-system)
4. [Customization Guide](#customization-guide)
5. [Troubleshooting](#troubleshooting)
6. [API Reference](#api-reference)

---

## Architecture

### File Structure
```
frontend/src/
├── components/
│   └── avatar.jsx          # Main avatar component
├── pages/
│   └── AvatarPage.jsx      # Page containing avatar + chat interface
└── public/
    └── models/
        ├── SkinMale.glb    # Male avatar model
        └── WhiteFemale.glb # Female avatar model
```

### Dependencies
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **three** - 3D graphics library
- **three-stdlib** - Additional Three.js utilities

---

## Component Structure

### Avatar Component Props

```javascript
<Avatar 
  model="/models/SkinMale.glb"  // Path to GLB model file
  handpos={1.3}                  // Arm down angle (higher = lower hands)
  ischatting={false}             // Zoom/talking mode toggle
/>
```

#### Prop Details

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `model` | string | required | Path to GLB model with skinned mesh |
| `handpos` | number | 1.3 | X-axis rotation for arm angle (1.15-1.5 range) |
| `ischatting` | boolean | false | Toggles between full body and zoomed talking view |

---

## Animation System

### 1. Zoom & Position Animation

**Location:** Lines 110-137 in `avatar.jsx`

Controls how the avatar scales and positions when switching between normal and talking modes.

```javascript
// Scale values
const basescale = 1.2      // Normal view - full body
const talkingscale = 3     // Talking view - upper body only

// Position values
const targetpos = ischatting ? -4.5 : -1  // Y position
// -1 = full body visible
// -4.5 = centered on upper body

// Rotation values
const targetrot = ischatting ? -0.2 : 0   // X rotation
// 0 = straight
// -0.2 = slight tilt forward

// Animation speed
const speed = 5  // Higher = faster transition
```

**To Customize:**
- **Zoom more/less**: Change `talkingscale` (2-4 recommended)
- **Reposition**: Adjust `targetpos` Y value (-6 to 0)
- **Tilt angle**: Modify `targetrot` (-0.5 to 0.5)
- **Speed**: Change `speed` (1-10)

---

### 2. Facial Animation (Talking)

**Location:** Lines 140-164 in `avatar.jsx`

Controls mouth movement and facial expressions using morph targets.

```javascript
// Mouth opening (lip sync simulation)
const open = (Math.sin(time.current * 4) + 1) / 2 * 0.8;
// time * 4 = speed of mouth movement
// * 0.8 = maximum mouth opening

// Smile amount
const smile = 0.5;  // 0-1 range

// Applied values (with base offset)
hInfl[hDict.mouthOpen] = 0.2 + open;   // 0.2 = minimum opening
hInfl[hDict.mouthSmile] = 0.2 + smile; // 0.2 = base smile
```

**To Customize:**
- **Talk faster**: Increase multiplier in `time.current * 4` (try 6-8)
- **Wider mouth**: Increase `* 0.8` to `* 1.0`
- **More/less smile**: Change `smile` value (0-1)
- **Base expression**: Adjust `0.2 +` offset values

---

### 3. Hand Gesture Animation

**Location:** Lines 200-280 in `avatar.jsx`

Creates natural explaining gestures with both arms.

#### Right Arm Animation

```javascript
// Side-to-side movement (Z-axis)
const gesture1 = Math.sin(time.current * 1.2) * 0.05;
// 1.2 = speed of gesture
// 0.05 = amplitude (how far arm moves)

// Forward/backward movement (X-axis)
const gesture2 = Math.sin(time.current * 2 + 1) * 0.01;
// 2 = faster variation
// +1 = phase offset

// Apply to arm
rightArm.current.rotation.z = gesture1;
rightArm.current.rotation.x = handpos + gesture2;
```

#### Left Arm Animation

```javascript
const gesture3 = Math.sin(time.current * 1.1 + 2) * 0.05;
const gesture4 = Math.sin(time.current * 0.9 + 3) * 0.01;

leftArm.current.rotation.z = 0 + gesture3;
leftArm.current.rotation.x = handpos + gesture4;
```

**Animation Parameters Explained:**

| Parameter | What it controls | Typical Range |
|-----------|------------------|---------------|
| `time * speed` | How fast gesture repeats | 0.5 - 3.0 |
| `* amplitude` | How far arm moves | 0.01 - 0.3 |
| `+ phase` | Timing offset between arms | 0 - 6 |
| `handpos` | Base arm position | 1.0 - 1.5 |

**To Customize:**
- **Faster gestures**: Increase speed multiplier (1.2 → 2.0)
- **Bigger movements**: Increase amplitude (0.05 → 0.2)
- **Sync arms**: Use same phase offset
- **Desync arms**: Use different phase offsets

---

### 4. Forearm Animation

**Location:** Lines 226-231, 256-261 in `avatar.jsx`

Adds emphasis to gestures by bending forearms.

```javascript
// Right forearm
const emphasis = Math.sin(time.current * 0.5 + 0.5) * 0.06;
rightForeArm.current.rotation.z = emphasis;
rightForeArm.current.rotation.x = 0.1 + emphasis;

// Left forearm
const complement = Math.sin(time.current * 0.8 + 1.5) * 0.08;
leftForeArm.current.rotation.z = 0 + complement;
leftForeArm.current.rotation.x = 0.1 + complement;
```

**To Customize:**
- **More expressive**: Increase amplitude (0.06 → 0.15)
- **Slower movement**: Decrease speed (0.5 → 0.3)

---

### 5. Head Animation

**Location:** Lines 267-278 in `avatar.jsx`

Subtle head movements for natural engagement.

```javascript
// Nodding (up/down)
const nod = Math.sin(time.current * 0.8 + 2) * 0.02;

// Tilting (side to side)
const tilt = Math.sin(time.current * 0.5) * 0.02;

head.current.rotation.x = -0.2 + nod;  // -0.2 = base tilt
head.current.rotation.z = tilt;
```

**To Customize:**
- **More nodding**: Increase nod amplitude (0.02 → 0.08)
- **Faster nods**: Increase speed (0.8 → 1.5)
- **Head angle**: Change base value (-0.2)

---

## Customization Guide

### Adding New Animations

#### Step 1: Find the Bone
All available bones are listed in the `bones` array (lines 16-86):

```javascript
const bones = [
  "Spine", "Spine1", "Spine2",
  "Neck", "Head",
  "LeftArm", "RightArm",
  "LeftForeArm", "RightForeArm",
  // ... etc
];
```

#### Step 2: Create a Ref
```javascript
const myBone = useRef(null);
```

#### Step 3: Bind the Bone
In the `useEffect` (around line 168):

```javascript
if (obj.isBone && obj.name === "Spine") {
    myBone.current = obj;
    console.log("✅ Spine found");
}
```

#### Step 4: Animate in useFrame
```javascript
if (myBone.current) {
    const movement = Math.sin(time.current * speed) * amplitude;
    myBone.current.rotation.y = movement;
}
```

---

### Rotation Axes Guide

Understanding 3D rotations:

```
X-axis (rotation.x): 
  - Positive = tilt forward
  - Negative = tilt backward
  - Use for: Nodding, arm up/down

Y-axis (rotation.y):
  - Positive = turn right
  - Negative = turn left  
  - Use for: Head turning, torso twist

Z-axis (rotation.z):
  - Positive = tilt right
  - Negative = tilt left
  - Use for: Arm waving, head tilt
```

---

### Model Requirements

For the avatar to work properly, your GLB model must have:

1. **Skinned Meshes** - Geometry bound to skeleton
2. **Named Bones** - Following standard naming (RightArm, LeftArm, etc.)
3. **Morph Targets** (for facial animation):
   - `mouthOpen` - For talking
   - `mouthSmile` - For expressions

#### Exporting from Ready Player Me
1. Go to readyplayer.me
2. Create/customize avatar
3. Download with these settings:
   - ✅ Include skeleton
   - ✅ Include morph targets
   - Format: GLB
   - Quality: High

---

## Troubleshooting

### Avatar Not Animating

**Check 1: Skinned Mesh**
```javascript
// Look in console for:
"✅ Found skinned mesh: Wolf3D_Body"
```
If you see "⚠️ No SkinnedMesh found", re-export model with skeleton.

**Check 2: Bones Found**
```javascript
// Should see:
"✅ RightArm found"
"✅ LeftArm found"
```
If missing, check bone names in your GLB file.

**Check 3: Scale Value**
```javascript
// In return statement, should be:
scale={1.2}  // NOT scale={52} or other large number
```

---

### Hands Too High/Low

Adjust the `handpos` prop:

```javascript
// Lower hands (more down)
<Avatar handpos={1.5} />

// Higher hands (more up)  
<Avatar handpos={1.0} />

// Default
<Avatar handpos={1.3} />
```

---

### Mouth Not Moving

**Check 1: Morph Targets Exist**
```javascript
// In console, should see:
"✅ Head mesh bound"
"✅ Teeth mesh bound"
```

**Check 2: Morph Target Names**
Your model needs these exact names:
- `mouthOpen`
- `mouthSmile`

Check in Blender or model viewer.

---

### Zoom Not Working

**Check 1: State Prop**
```javascript
// In AvatarPage.jsx:
<Avatar ischatting={ischatting} />  // ✅ Correct

// NOT:
<Avatar istalking={istalking} />   // ❌ Wrong prop name
```

**Check 2: Initial Scale**
```javascript
// In avatar.jsx return:
scale={1.2}  // ✅ Correct
scale={52}   // ❌ Wrong
```

---

## API Reference

### Animation Speed Formula

```javascript
Math.sin(time.current * speed + phase) * amplitude
```

- **time.current**: Auto-incrementing time value
- **speed**: How fast animation cycles (higher = faster)
- **phase**: Offset in radians (0-6.28)
- **amplitude**: Maximum movement amount

### Common Speed Values

| Speed | Effect |
|-------|--------|
| 0.5 | Very slow, subtle |
| 1.0 | Slow, natural |
| 2.0 | Medium, noticeable |
| 4.0 | Fast, energetic |
| 8.0 | Very fast, talking |

### Common Amplitude Values

| Amplitude | Effect |
|-----------|--------|
| 0.01-0.05 | Subtle micro-movements |
| 0.05-0.15 | Natural gestures |
| 0.15-0.3 | Expressive movements |
| 0.3+ | Exaggerated animation |

---

## Performance Tips

1. **Limit useFrame calls**: Combine related animations in same useFrame
2. **Conditional updates**: Only update when needed
   ```javascript
   if (ischatting && headMesh.current) {
       // Only animate when talking
   }
   ```
3. **Optimize morph targets**: Don't update every frame if not needed

---

## Advanced Customization

### Adding Idle Breathing

```javascript
useFrame((_, delta) => {
    if (groupRef.current && !ischatting) {
        const breathe = Math.sin(time.current * 1.5) * 0.015;
        groupRef.current.position.y = breathe;
    }
});
```

### Adding Eye Blinking

```javascript
// In facial animation section:
const blink = Math.random() < 0.02 ? 1 : 0; // 2% chance per frame

if (hDict.eyesClosed !== undefined) {
    hInfl[hDict.eyesClosed] = blink;
}
```

### Emotion System

```javascript
const emotions = {
    happy: { smile: 0.8, mouthOpen: 0.2 },
    sad: { smile: -0.3, mouthOpen: 0.1 },
    surprised: { smile: 0.1, mouthOpen: 0.9 }
};

const currentEmotion = emotions.happy;
hInfl[hDict.mouthSmile] = currentEmotion.smile;
```

---

## Example: Adding Shoulder Shrug

```javascript
// 1. Add refs
const leftShoulder = useRef(null);
const rightShoulder = useRef(null);

// 2. Bind bones
if (obj.name === "LeftShoulder") leftShoulder.current = obj;
if (obj.name === "RightShoulder") rightShoulder.current = obj;

// 3. Animate
useFrame(() => {
    const shrug = Math.sin(time.current * 0.5) * 0.1;
    
    if (leftShoulder.current) {
        leftShoulder.current.rotation.z = shrug;
    }
    if (rightShoulder.current) {
        rightShoulder.current.rotation.z = -shrug;
    }
});
```

---

## Credits & Resources

- **Three.js Documentation**: https://threejs.org/docs/
- **React Three Fiber**: https://docs.pmnd.rs/react-three-fiber/
- **Ready Player Me**: https://readyplayer.me/
- **GLB Viewer**: https://gltf-viewer.donmccurdy.com/

---

## Version History

- **v1.0** - Initial avatar system with hand gestures
- **v1.1** - Added facial animation and talking mode
- **v1.2** - Added zoom/position animation for chat mode
- **v1.3** - Improved documentation and customization options

---

**Last Updated**: January 30, 2026
**Maintained By**: FinWise AI Team
