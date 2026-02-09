import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { textToVisemes, textToVisemesAPI, audioToVisemesAPI, textToAudioVisemesAPI, getVisemeMorphTargets } from "../utils/visemeUtils";
import { speakText, stopSpeaking } from "../utils/ttsUtils";

function Avatar({ model, handpos, ischatting, text, audioFile, speakTrigger, onSpeechStart, emotions }) {
    const { scene } = useGLTF(model);
    const groupRef = useRef();
    const avtargroup = useRef()
    const rightArm = useRef(null);
    const leftArm = useRef(null);
    const rightForeArm = useRef(null);
    const leftForeArm = useRef(null);
    const head = useRef(null);
    const spine = useRef(null);
    const meshes = useRef([]);
    const time = useRef(0);
    const leftindex4 = useRef(null);
    const leftmiddle4 = useRef(null);
    const leftring4 = useRef(null);
    const leftpinky4 = useRef(null);

    const rightindex4 = useRef(null);
    const rightmiddle4 = useRef(null);
    const rightring4 = useRef(null);
    const rightpinky4 = useRef(null);

    // List of Bone Points names can be used for animation
    const bones = [
        "Spine",
        "Spine1",
        "Spine2",
        "Neck",
        "Head",
        "HeadTop_End",
        "LeftEye",
        "RightEye",

        "LeftShoulder",
        "LeftArm",
        "LeftForeArm",
        "LeftHand",
        "LeftHandThumb1",
        "LeftHandThumb2",
        "LeftHandThumb3",
        "LeftHandThumb4",
        "LeftHandIndex1",
        "LeftHandIndex2",
        "LeftHandIndex3",
        "LeftHandIndex4",
        "LeftHandMiddle1",
        "LeftHandMiddle2",
        "LeftHandMiddle3",
        "LeftHandMiddle4",
        "LeftHandRing1",
        "LeftHandRing2",
        "LeftHandRing3",
        "LeftHandRing4",
        "LeftHandPinky1",
        "LeftHandPinky2",
        "LeftHandPinky3",
        "LeftHandPinky4",

        "RightShoulder",
        "RightArm",
        "RightForeArm",
        "RightHand",
        "RightHandThumb1",
        "RightHandThumb2",
        "RightHandThumb3",
        "RightHandThumb4",
        "RightHandIndex1",
        "RightHandIndex2",
        "RightHandIndex3",
        "RightHandIndex4",
        "RightHandMiddle1",
        "RightHandMiddle2",
        "RightHandMiddle3",
        "RightHandMiddle4",
        "RightHandRing1",
        "RightHandRing2",
        "RightHandRing3",
        "RightHandRing4",
        "RightHandPinky1",
        "RightHandPinky2",
        "RightHandPinky3",
        "RightHandPinky4",

        "LeftUpLeg",
        "LeftLeg",
        "LeftFoot",
        "LeftToeBase",
        "LeftToe_End",

        "RightUpLeg",
        "RightLeg",
        "RightFoot",
        "RightToeBase",
        "RightToe_End"
    ];

    // List of mesh points names can be used for animation 
    const mesh = [
        "Scene",
        "Armature",
        "EyeLeft",
        "EyeRight",
        "Wolf3D_Body",
        "Wolf3D_Glasses",
        "Wolf3D_Hair",
        "Wolf3D_Head",
        "Wolf3D_Outfit_Bottom",
        "Wolf3D_Outfit_Footwear",
        "Wolf3D_Outfit_Top",
        "Wolf3D_Teeth",

        "Hips",
        "Spine",
        "Spine1",
        "Spine2",
        "Neck",
        "Head",
        "HeadTop_End",

        "LeftEye",
        "RightEye",

        "LeftShoulder",
        "LeftArm",
        "LeftForeArm",
        "LeftHand",
        "LeftHandThumb1",
        "LeftHandThumb2",
        "LeftHandThumb3",
        "LeftHandThumb4",
        "LeftHandIndex1",
        "LeftHandIndex2",
        "LeftHandIndex3",
        "LeftHandIndex4",
        "LeftHandMiddle1",
        "LeftHandMiddle2",
        "LeftHandMiddle3",
        "LeftHandMiddle4",
        "LeftHandRing1",
        "LeftHandRing2",
        "LeftHandRing3",
        "LeftHandRing4",
        "LeftHandPinky1",
        "LeftHandPinky2",
        "LeftHandPinky3",
        "LeftHandPinky4",

        "RightShoulder",
        "RightArm",
        "RightForeArm",
        "RightHand",
        "RightHandThumb1",
        "RightHandThumb2",
        "RightHandThumb3",
        "RightHandThumb4",
        "RightHandIndex1",
        "RightHandIndex2",
        "RightHandIndex3",
        "RightHandIndex4",
        "RightHandMiddle1",
        "RightHandMiddle2",
        "RightHandMiddle3",
        "RightHandMiddle4",
        "RightHandRing1",
        "RightHandRing2",
        "RightHandRing3",
        "RightHandRing4",
        "RightHandPinky1",
        "RightHandPinky2",
        "RightHandPinky3",
        "RightHandPinky4",

        "LeftUpLeg",
        "LeftLeg",
        "LeftFoot",
        "LeftToeBase",
        "LeftToe_End",

        "RightUpLeg",
        "RightLeg",
        "RightFoot",
        "RightToeBase",
        "RightToe_End",

        "neutral_bone"
    ];


    const headMesh = useRef(null);
    const teethMesh = useRef(null);
    const eyelidright = useRef(null);
    const eyelidleft = useRef(null);

    // ============================================
    // VISEME LIP SYNC STATE
    // ============================================
    // visemeSequence: Array of {viseme, start, duration} objects generated from text
    // isPlayingVisemes: Boolean flag to control when viseme animation is active
    // visemePlaybackTime: Tracks elapsed time during viseme playback
    // currentVisemeIndex: Index of the currently playing viseme in the sequence
    const [visemeSequence, setVisemeSequence] = useState([]);
    const [isPlayingVisemes, setIsPlayingVisemes] = useState(false);
    const visemePlaybackTime = useRef(0);
    const currentVisemeIndex = useRef(0);
    const durationRatio = useRef(1); // Ratio to scale viseme timing to audio duration

    const eyeLidBone = useRef(null);
    const blinkTime = useRef(0);
    const nextBlinkTime = useRef(Math.random() * 0 + 2); // First blink in 2-5 seconds

    // Emotion system
    const leftEye = useRef(null);
    const rightEye = useRef(null);
    const thinkingTime = useRef(0);
    const thinkingPhase = useRef(0); // 0: idle, 1: moving, 2: holding, 3: returning

    // Emotion configurations
    const emotionConfigs = {
        happy: {
            gestureAmplitude: 1.3,
            gestureSpeed: 1.2,
            headTilt: 0.05,
            headNodSpeed: 1.0,
            smileIntensity: 0.3
        },
        sad: {
            gestureAmplitude: 0.5,
            gestureSpeed: 0.6,
            headTilt: -0.15,
            headNodSpeed: 0.5,
            smileIntensity: 0
        },
        neutral: {
            gestureAmplitude: 1.0,
            gestureSpeed: 1.0,
            headTilt: 0,
            headNodSpeed: 0.8,
            smileIntensity: 0
        },
        explain1: {
            gestureAmplitude: 0.7,
            gestureSpeed: 0.9,
            headTilt: 0,
            headNodSpeed: 0.8,
            smileIntensity: 0,
            armFoldAngle: Math.PI / 4 // 45 degrees
        },
        explain2: {
            gestureAmplitude: 1.5,
            gestureSpeed: 1.3,
            headTilt: 0,
            headNodSpeed: 1.0,
            smileIntensity: 0,
            armFoldAngle: Math.PI / 2, // 90 degrees
            customHandPath: true // Enable custom path animation
        },
        listen: {
            gestureAmplitude: 0.3,
            gestureSpeed: 0.5,
            headTilt: 0,
            headNodSpeed: 2.0, // Faster nodding
            nodAmplitude: 0.08, // Larger nods
            smileIntensity: 0
        },
        think: {
            gestureAmplitude: 0.4,
            gestureSpeed: 0.6,
            headTilt: 0.1,
            headNodSpeed: 0.3,
            smileIntensity: 0,
            eyeRoll: true
        }
    };

    const currentEmotion = emotionConfigs[emotions?.toLowerCase()] || emotionConfigs.neutral;


    useEffect(() => {
        scene.traverse((obj) => {
            if (obj.isMesh) {
                console.log("Mesh: ", obj.name)
            }
            if (obj.isBone) {
                console.log("Bone: ", obj.name)
            }
            if (obj.isMesh && obj.morphTargetDictionary) {

                if (obj.name === "Wolf3D_Head") {
                    headMesh.current = obj;
                    // obj.visible = false;
                }
                if (obj.name === "Wolf3D_Teeth") {
                    teethMesh.current = obj;
                }
            }
            // Capture the specific bone for eyelids
            if (obj.isBone && obj.name === "EyeLids") {
                eyeLidBone.current = obj;
                console.log("✅ Found EyeLids bone for blinking animation");
            }
            // Capture eye bones for thinking animation (prioritize bones over meshes)
            if (obj.isBone && obj.name === "LeftEye") {
                leftEye.current = obj;
                console.log("✅ Found LeftEye bone for eye roll");
            }
            if (obj.isBone && obj.name === "RightEye") {
                rightEye.current = obj;
                console.log("✅ Found RightEye bone for eye roll");
            }
            if (obj.isBone && obj.name === "RightHandIndex4") {
                rightindex4.current = obj;
            }
            if (obj.isBone && obj.name === "RightHandMiddle4") {
                rightmiddle4.current = obj;
            }
            if (obj.isBone && obj.name === "RightHandRing4") {
                rightring4.current = obj;
            }
            if (obj.isBone && obj.name === "RightHandPinky4") {
                rightpinky4.current = obj;
            }
            if (obj.isBone && obj.name === "LeftHandIndex4") {
                leftindex4.current = obj;
            }
            if (obj.isBone && obj.name === "LeftHandMiddle4") {
                leftmiddle4.current = obj;
            }
            if (obj.isBone && obj.name === "LeftHandRing4") {
                leftring4.current = obj;
            }
            if (obj.isBone && obj.name === "LeftHandPinky4") {
                leftpinky4.current = obj;
            }
        });

        // Verify what we captured after traversal
        console.log("Eye capture verification:", {
            leftEye: leftEye.current ? leftEye.current.name : "NOT FOUND",
            rightEye: rightEye.current ? rightEye.current.name : "NOT FOUND"
        });
    }, [scene]);

    // ============================================
    // BLINK ANIMATION
    // ============================================
    useFrame((state, delta) => {
        if (!eyeLidBone.current) return;

        blinkTime.current += delta;

        if (blinkTime.current >= nextBlinkTime.current) {
            const blinkDuration = 0.2; // Faster blink
            const timeSinceBlinkStart = blinkTime.current - nextBlinkTime.current;

            if (timeSinceBlinkStart <= blinkDuration) {
                // Smooth blink animation using sine wave
                const blinkProgress = timeSinceBlinkStart / blinkDuration;
                const blinkValue = Math.sin(blinkProgress * Math.PI);

                // Move eyelids forward on Z-axis to close over eyes
                // eyeLidBone.current.position.y = 1
                eyeLidBone.current.rotation.x = blinkValue * 2;
                eyeLidBone.current.position.z = blinkValue * 0.12; // Move forward
            } else {
                // Blink finished - reset to original position
                eyeLidBone.current.position.z = 0;
                blinkTime.current = 0;
                nextBlinkTime.current = Math.random() * 3 + 2; // Next blink in 2-5s
            }
        }
    });

    // ============================================
    // TEXT TO VISEME CONVERSION + AUDIO PLAYBACK
    // ============================================
    // This effect runs when the speakTrigger changes (when user clicks Speak button)
    // It converts the text into a timed sequence of viseme shapes AND plays audio
    // ============================================
    // TEXT/AUDIO TO VISEME CONVERSION + PLAYBACK
    // ============================================
    useEffect(() => {
        if (speakTrigger > 0) {
            // STOP previous audio if any
            stopSpeaking();

            // Clean up previous audio object URL if it exists
            if (window.currentAudio) {
                window.currentAudio.pause();
                window.currentAudio = null;
            }

            // CASE 1: AUDIO FILE UPLOADED
            if (audioFile) {
                console.log("🎤 Processing audio file:", audioFile.name);

                audioToVisemesAPI(audioFile).then(visemes => {
                    console.log("📊 Generated audio visemes:", visemes);

                    setVisemeSequence(visemes);
                    currentVisemeIndex.current = 0;

                    // Create object URL and play audio
                    const audioUrl = URL.createObjectURL(audioFile);
                    const audio = new Audio(audioUrl);
                    window.currentAudio = audio; // Track current audio

                    audio.onplay = () => {
                        setIsPlayingVisemes(true); // START VISUALS NOW
                        visemePlaybackTime.current = 0;
                        if (onSpeechStart) onSpeechStart(); // Trigger callback
                    };

                    audio.onended = () => {
                        URL.revokeObjectURL(audioUrl); // Cleanup
                        window.currentAudio = null;
                        // setIsPlayingVisemes(false); // Let the loop finish gracefully
                    };

                    audio.play().catch(e => console.error("Error playing audio:", e));

                }).catch(error => {
                    console.error("Error processing audio:", error);
                });
            }
            // CASE 2: TEXT INPUT (Backend TTS)
            else if (text && text.trim() !== '') {

                // Use new Backend TTS API
                textToAudioVisemesAPI(text).then(data => {
                    const { audio_url, visemes } = data;

                    setVisemeSequence(visemes);
                    currentVisemeIndex.current = 0; // Initialize index here
                    // Play returned audio URL with cache busting to handle single-file overwrite
                    const audio = new Audio(`${audio_url}?t=${new Date().getTime()}`);
                    window.currentAudio = audio; // Track current audio

                    audio.onloadedmetadata = () => {
                        console.log("Audio Loaded. Duration:", audio.duration);
                        if (visemes.length > 0 && audio.duration && audio.duration !== Infinity) {
                            const lastViseme = visemes[visemes.length - 1];
                            const visemeDuration = lastViseme.start + lastViseme.duration;

                            // Calculate scaling ratio
                            durationRatio.current = visemeDuration / audio.duration;
                            console.log(`⏱️ Syncing: Audio ${audio.duration.toFixed(2)}s vs Visemes ${visemeDuration.toFixed(2)}s (Ratio: ${durationRatio.current.toFixed(2)})`);
                        } else {
                            durationRatio.current = 1;
                        }
                    };

                    audio.onplay = () => {
                        setIsPlayingVisemes(true); // START VISUALS NOW
                        visemePlaybackTime.current = 0;
                        if (onSpeechStart) onSpeechStart(); // Trigger callback
                    };

                    audio.onended = () => {
                        window.currentAudio = null;
                    };

                    audio.play().catch(e => console.error("Error playing TTS audio:", e));

                }).catch(error => {
                    console.error("Error converting text to visemes:", error);
                });
            }
        }

        // Cleanup function for component unmount
        return () => {
            if (window.currentAudio) {
                window.currentAudio.pause();
                window.currentAudio = null;
            }
        };

    }, [speakTrigger, audioFile]); // Added audioFile to dependencies

    // Stop visemes and audio when text is cleared
    useEffect(() => {
        if (!text || text.trim() === '') {
            setIsPlayingVisemes(false);
            setVisemeSequence([]);
            stopSpeaking(); // Stop any ongoing audio
        }
    }, [text]);


    // This Function Contorls how The model is adjusted when he is talking
    useFrame((_, delta) => {
        if (!avtargroup.current) return

        // Base scale: normal view showing full body
        const basescale = 1.2
        // Talking scale: zoomed in to show upper body (chest and above)
        const talkingscale = 3

        // When ischatting is true, zoom in; otherwise show full body
        const targetscale = ischatting ? talkingscale : basescale

        const speed = 5

        //position of the model
        const currentpos = avtargroup.current.position.y
        const targetpos = ischatting ? -4.5 : -1

        // rotation of the model
        const currentrot = avtargroup.current.rotation.x
        const targetrot = ischatting ? -0.2 : 0

        // Scale of the model
        const currentscale = avtargroup.current.scale.x
        const nextscale = currentscale + (targetscale - currentscale) * speed * delta

        // ANimation Applied for all the targets
        avtargroup.current.scale.set(nextscale, nextscale, nextscale)
        avtargroup.current.position.y = currentpos + (targetpos - currentpos) * speed * delta
        avtargroup.current.rotation.x = currentrot + (targetrot - currentrot) * speed * delta
    })




    // ============================================
    // VISEME-DRIVEN LIP SYNC ANIMATION
    // ============================================
    // This useFrame runs every frame (~60fps) to update mouth morph targets
    useFrame((_, delta) => {
        if (!headMesh.current || !teethMesh.current) return;

        time.current += delta;

        // Get morph target dictionaries and influences arrays
        const hDict = headMesh.current.morphTargetDictionary; // Maps morph target names to indices
        const hInfl = headMesh.current.morphTargetInfluences; // Array of current morph values (0-1)
        const tDict = teethMesh.current.morphTargetDictionary;
        const tInfl = teethMesh.current.morphTargetInfluences;

        // ============================================
        // VISEME PLAYBACK (when speaking)
        // ============================================
        if (isPlayingVisemes && visemeSequence.length > 0) {
            // ============================================
            // SYNC WITH AUDIO TIMESTAMP
            // ============================================
            const AUDIO_LATENCY = 0.0; // Adjust if lips are ahead (positive number delays visuals)

            // Use precise audio time if available, otherwise fallback to delta accumulation
            if (window.currentAudio && !window.currentAudio.paused) {
                // We subtract a small offset because audio hardware has latency.
                // Scale the audio time to match the viseme timeline
                // If audio is shorter than visemes, ratio > 1 (slow down visemes)
                // If audio is longer than visemes, ratio < 1 (speed up visemes)
                const scaledTime = (window.currentAudio.currentTime - AUDIO_LATENCY) * durationRatio.current;
                visemePlaybackTime.current = Math.max(0, scaledTime);
            } else {
                visemePlaybackTime.current += delta;
            }

            // Get current viseme from sequence
            let currentViseme = visemeSequence[currentVisemeIndex.current];

            // ============================================
            // ADVANCE TO NEXT VISEME
            // ============================================
            // Find the correct viseme for the current timestamp
            // Instead of just checking next, we scan from current position
            // This handles skips or lags gracefully

            // 1. If current viseme is finished (time > start + duration), move forward
            while (
                currentVisemeIndex.current < visemeSequence.length - 1 &&
                visemePlaybackTime.current >= visemeSequence[currentVisemeIndex.current + 1].start
            ) {
                currentVisemeIndex.current++;
                currentViseme = visemeSequence[currentVisemeIndex.current];
            }

            // 2. If we somehow jumped HEAD of the audio (rewind), move backward
            while (
                currentVisemeIndex.current > 0 &&
                visemePlaybackTime.current < visemeSequence[currentVisemeIndex.current].start
            ) {
                currentVisemeIndex.current--;
                currentViseme = visemeSequence[currentVisemeIndex.current];
            }

            // ============================================
            // CHECK IF PLAYBACK COMPLETE
            // ============================================
            // If we're on the last viseme and past its end time, stop playback
            if (currentVisemeIndex.current === visemeSequence.length - 1) {
                const lastViseme = visemeSequence[visemeSequence.length - 1];
                if (visemePlaybackTime.current >= lastViseme.start + lastViseme.duration + 0.5) { // +0.5 buffer to clear mouth
                    setIsPlayingVisemes(false);
                    visemePlaybackTime.current = 0;
                    currentVisemeIndex.current = 0;
                }
            }

            // Get morph target values for current viseme
            const morphTargets = getVisemeMorphTargets(currentViseme.viseme);

            // Calculate progress through current viseme (0 to 1)
            const visemeProgress = (visemePlaybackTime.current - currentViseme.start) / currentViseme.duration;

            // Smooth blending factor - controls transition speed
            // Lower = smoother but slower, Higher = faster but more abrupt
            const blendSpeed = 0.10;

            // Helper function to smoothly interpolate
            const lerp = (current, target, factor) => current + (target - current) * factor;

            // ============================================
            // APPLY MORPH TARGETS TO MOUTH
            // ============================================
            // Each morph target controls a different aspect of mouth shape
            // Values range from 0 (no effect) to 1 (full effect)

            // MOUTH OPEN - Controls how wide the mouth opens vertically
            if (hDict.mouthOpen !== undefined) {
                const targetValue = morphTargets.mouthOpen * 2; // Intensified by 40% (2.2 -> 3.0)
                const newValue = lerp(hInfl[hDict.mouthOpen], targetValue, blendSpeed);
                hInfl[hDict.mouthOpen] = newValue;

                // Apply same value to teeth mesh if it exists
                if (tDict.mouthOpen !== undefined) {
                    tInfl[tDict.mouthOpen] = newValue + 1;
                }
            }

            // MOUTH SMILE - Controls smile/grin shape
            if (hDict.mouthSmile !== undefined) {
                const targetValue = morphTargets.mouthSmile * 0.6; // Intensified by 40% (1.2 -> 1.7)
                const newValue = lerp(hInfl[hDict.mouthSmile], targetValue, blendSpeed);
                hInfl[hDict.mouthSmile] = newValue;
                if (tDict.mouthSmile !== undefined) {
                    tInfl[tDict.mouthSmile] = newValue;
                }
            }

            // MOUTH FUNNEL - Creates "O" shape (like saying "ooh")
            if (hDict.mouthFunnel !== undefined) {
                const targetValue = morphTargets.mouthFunnel * 2.2; // Intensified by 40% (2.3 -> 3.2)
                const newValue = lerp(hInfl[hDict.mouthFunnel], targetValue, blendSpeed);
                hInfl[hDict.mouthFunnel] = newValue;
            }

            // MOUTH PUCKER - Pushes lips forward (like kissing or "oo" sound)
            if (hDict.mouthPucker !== undefined) {
                const targetValue = morphTargets.mouthPucker * 2.6; // Intensified by 40% (2.3 -> 3.2)
                const newValue = lerp(hInfl[hDict.mouthPucker], targetValue, blendSpeed);
                hInfl[hDict.mouthPucker] = newValue;
            }

            // JAW OPEN - Controls jaw drop for wide mouth shapes
            if (hDict.jawOpen !== undefined) {
                const targetValue = morphTargets.jawOpen * 2.0; // Intensified by 40% (2.5 -> 3.5)
                const newValue = lerp(hInfl[hDict.jawOpen], targetValue, blendSpeed);
                hInfl[hDict.jawOpen] = newValue;
            }

            // ============================================
            // FORCE MESH UPDATE
            // ============================================
            // Create new arrays to trigger React Three Fiber's change detection
            // Without this, the mesh won't re-render even though values changed
            headMesh.current.morphTargetInfluences = [...hInfl];
            teethMesh.current.morphTargetInfluences = [...tInfl];

        } else {
            // ============================================
            // RESET TO NEUTRAL (when not speaking)
            // ============================================
            // Set all morph targets back to neutral/rest position
            if (hDict.mouthOpen !== undefined) {
                hInfl[hDict.mouthOpen] = 0.05; // Slightly open for natural look
                if (tDict.mouthOpen !== undefined) {
                    tInfl[tDict.mouthOpen] = 0.05;
                }
            }
            if (hDict.mouthSmile !== undefined) {
                hInfl[hDict.mouthSmile] = 0; // No smile
                if (tDict.mouthSmile !== undefined) {
                    tInfl[tDict.mouthSmile] = 0;
                }
            }
            // Reset all other morph targets to 0
            if (hDict.mouthFunnel !== undefined) hInfl[hDict.mouthFunnel] = 0;
            if (hDict.mouthPucker !== undefined) hInfl[hDict.mouthPucker] = 0;
            if (hDict.jawOpen !== undefined) hInfl[hDict.jawOpen] = 0;
        }
    });

    // This Function targets Arms for animation
    useEffect(() => {

        scene.traverse((obj) => {
            // Collect skinned meshes
            if (obj.isSkinnedMesh) {
                meshes.current.push(obj);
            }

            // Find bones for animation
            if (obj.isBone) {
                switch (obj.name) {
                    case "RightArm":
                        rightArm.current = obj;
                        break;
                    case "LeftArm":
                        leftArm.current = obj;
                        break;
                    case "RightForeArm":
                        rightForeArm.current = obj;
                        break;
                    case "LeftForeArm":
                        leftForeArm.current = obj;
                        break;
                    case "Head":
                        head.current = obj;
                        break;
                    case "Spine2":
                        spine.current = obj;
                        break;
                }
            }
        });

    }, [scene]);




    useFrame((state, delta) => {
        time.current += delta;

        // ========================================
        //Happy animation 
        if (currentEmotion.name === "happy") {
            
        }



        // ========================================
        // RIGHT ARM ANIMATION (Emotion-aware)
        // ========================================
        if (rightArm.current) {
            const gesture1 = Math.sin(time.current * 1.2 * currentEmotion.gestureSpeed) * 0.05 * currentEmotion.gestureAmplitude;
            const gesture2 = Math.sin(time.current * 2 + 1) * 0.01 * currentEmotion.gestureAmplitude;

            rightArm.current.rotation.z = gesture1;
            rightArm.current.rotation.x = handpos + gesture2;

        }

        // Right forearm
        if (rightForeArm.current) {
            const emphasis = Math.sin(time.current * 0.5 + 0.5) * 0.06 * currentEmotion.gestureAmplitude;
            const emphasis8 = Math.sin((time.current * 0.5 + 0.5) * 0.5) * 0.06 * currentEmotion.gestureAmplitude;
            const baseFold = -currentEmotion.armFoldAngle || 0; // Add fold angle if defined

            rightForeArm.current.rotation.z = emphasis + baseFold;
            rightForeArm.current.rotation.y = emphasis8;
            rightForeArm.current.rotation.x = 0.1 + emphasis + emphasis8;
        }
        // ========================================
        // LEFT ARM ANIMATION (Emotion-aware)
        // ========================================
        if (leftArm.current) {
            const gesture3 = Math.sin(time.current * 1.1 * currentEmotion.gestureSpeed + 2) * 0.05 * currentEmotion.gestureAmplitude;
            const gesture4 = Math.sin(time.current * 0.9 + 3) * 0.01 * currentEmotion.gestureAmplitude;
            leftArm.current.rotation.z = 0 + gesture3;
            leftArm.current.rotation.x = handpos + gesture4;
        }

        // Left forearm
        if (leftForeArm.current) {
            const complement = Math.sin(time.current * 0.8 + 1.5) * 0.08 * currentEmotion.gestureAmplitude;
            const complement8 = Math.sin((time.current * 0.8 + 1.5) * 2) * 0.15 * currentEmotion.gestureAmplitude;
            const baseFold = -currentEmotion.armFoldAngle || 0; // Add fold angle if defined
            leftForeArm.current.rotation.z = 0 + complement - baseFold; // Negative for left arm symmetry
            leftForeArm.current.rotation.y = -complement8
            leftForeArm.current.rotation.x = 0.1 + complement;

        }

        // ========================================
        // HEAD ANIMATION (Emotion-aware)
        // ========================================
        if (head.current) {
            const nodAmplitude = currentEmotion.nodAmplitude || 0.02;
            const nod = Math.sin(time.current * 0.8 * currentEmotion.headNodSpeed + 2) * nodAmplitude;
            const tilt = Math.sin(time.current * 0.5) * 0.02;

            head.current.rotation.x = -0.2 + currentEmotion.headTilt + nod;
            head.current.rotation.z = tilt;
        }

        // ========================================
        // THINKING ANIMATION (Eye Roll)
        // ========================================
        if (currentEmotion.eyeRoll && leftEye.current && rightEye.current) {
            thinkingTime.current += delta;

            if (thinkingPhase.current === 0 && thinkingTime.current > 1.0) {
                thinkingPhase.current = 1; // Start moving
                thinkingTime.current = 0;
                console.log("👁️ Starting eye roll animation");
            } else if (thinkingPhase.current === 1) {
                // Move eyes to the right
                const progress = Math.min(thinkingTime.current / 0.5, 1);
                const angle = progress * 0.2; // Increased angle for more visible movement
                leftEye.current.rotation.y = angle;
                rightEye.current.rotation.y = angle;
                head.current.rotation.y = angle;
                if (progress >= 1) {
                    thinkingPhase.current = 2;
                    thinkingTime.current = 0;
                    console.log("👁️ Eyes moved to side, holding...");
                }
            } else if (thinkingPhase.current === 2 && thinkingTime.current > 1.5) {
                thinkingPhase.current = 3; // Start returning
                thinkingTime.current = 0;
                console.log("👁️ Returning eyes to center");
            } else if (thinkingPhase.current === 3) {
                // Return eyes to center
                const progress = Math.min(thinkingTime.current / 0.5, 1);
                const angle = 0.2 * (1 - progress);
                leftEye.current.rotation.y = angle;
                rightEye.current.rotation.y = angle;
                head.current.rotation.y = angle;
                if (progress >= 1) {
                    thinkingPhase.current = 0;
                    thinkingTime.current = 0;
                    console.log("👁️ Eyes returned to center");
                }
            }
        } else if (leftEye.current && rightEye.current) {
            // Reset eyes for other emotions
            leftEye.current.rotation.y = 0;
            rightEye.current.rotation.y = 0;
            thinkingPhase.current = 0;
            thinkingTime.current = 0;
        }

        // Update all skinned meshes
        meshes.current.forEach(mesh => {
            if (mesh.skeleton) {
                mesh.skeleton.update();
            }
        });
    });

    return (
        <group ref={groupRef}>
            <primitive
                ref={avtargroup}
                object={scene}
                scale={1.2}
                rotation={[0, 0, 0]}
                position={[0, -1, 0]}
            />
        </group>
    );
}

export default Avatar;


