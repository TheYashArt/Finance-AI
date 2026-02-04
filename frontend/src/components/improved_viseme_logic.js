// Easing function for smooth transitions
// Ease-in-out cubic for natural acceleration/deceleration
const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Helper function to smoothly interpolate morph targets
const lerpMorphTarget = (current, target, factor) => {
    return current + (target - current) * factor;
};

// In the viseme playback section (around line 341-396), replace the morph target application with this:

// Get morph target values for current viseme
const morphTargets = getVisemeMorphTargets(currentViseme.viseme);

// Calculate progress through current viseme (0 to 1)
const visemeProgress = (visemePlaybackTime.current - currentViseme.start) / currentViseme.duration;

// Apply easing for smoother transitions
const easedProgress = easeInOutCubic(Math.min(1, visemeProgress));

// Smooth blending factor - controls transition speed
const blendSpeed = 0.25; // Lower = smoother but slower, Higher = faster but more abrupt

// MOUTH OPEN - Controls how wide the mouth opens vertically
if (hDict.mouthOpen !== undefined) {
    const targetValue = morphTargets.mouthOpen * 1.2; // Amplify slightly for visibility
    const newValue = lerpMorphTarget(hInfl[hDict.mouthOpen], targetValue, blendSpeed);
    hInfl[hDict.mouthOpen] = newValue;

    if (tDict.mouthOpen !== undefined) {
        tInfl[tDict.mouthOpen] = newValue;
    }
}

// MOUTH SMILE - Controls smile/grin shape
if (hDict.mouthSmile !== undefined) {
    const targetValue = morphTargets.mouthSmile * 0.9;
    const newValue = lerpMorphTarget(hInfl[hDict.mouthSmile], targetValue, blendSpeed);
    hInfl[hDict.mouthSmile] = newValue;

    if (tDict.mouthSmile !== undefined) {
        tInfl[tDict.mouthSmile] = newValue;
    }
}

// MOUTH FUNNEL - Creates "O" shape
if (hDict.mouthFunnel !== undefined) {
    const targetValue = morphTargets.mouthFunnel;
    const newValue = lerpMorphTarget(hInfl[hDict.mouthFunnel], targetValue, blendSpeed);
    hInfl[hDict.mouthFunnel] = newValue;
}

// MOUTH PUCKER - Pushes lips forward
if (hDict.mouthPucker !== undefined) {
    const targetValue = morphTargets.mouthPucker;
    const newValue = lerpMorphTarget(hInfl[hDict.mouthPucker], targetValue, blendSpeed);
    hInfl[hDict.mouthPucker] = newValue;
}

// JAW OPEN - Controls jaw drop
if (hDict.jawOpen !== undefined) {
    const targetValue = morphTargets.jawOpen;
    const newValue = lerpMorphTarget(hInfl[hDict.jawOpen], targetValue, blendSpeed);
    hInfl[hDict.jawOpen] = newValue;
}
