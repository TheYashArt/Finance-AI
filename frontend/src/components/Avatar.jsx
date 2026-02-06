import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { textToVisemes, textToVisemesAPI, audioToVisemesAPI, textToAudioVisemesAPI, getVisemeMorphTargets } from "../utils/visemeUtils";
import { speakText, stopSpeaking } from "../utils/ttsUtils";

function Avatar({ model, handpos, ischatting, text, audioFile, speakTrigger }) {
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

    const eyeLidBone = useRef(null);
    const blinkTime = useRef(0);
    const nextBlinkTime = useRef(Math.random() * 3 + 2); // First blink in 2-5 seconds

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
            if (obj.isBone && obj.name === "Bone") {
                eyeLidBone.current = obj;
            }
        });
    }, [scene]);

    // ============================================
    // BLINK ANIMATION
    // ============================================
    useFrame((state, delta) => {
        if (!eyeLidBone.current) return;

        blinkTime.current += delta;

        if (blinkTime.current >= nextBlinkTime.current) {
            // Blink duration is approx 0.15s - 0.2s
            const blinkDuration = 0.1;
            const timeSinceBlinkStart = blinkTime.current - nextBlinkTime.current;

            if (timeSinceBlinkStart <= blinkDuration) {
                // 0 to 1 (closed) back to 0 (open)
                // Sine wave from 0 to PI covers roughly "open -> closed -> open"
                // Using sin(T * PI / Duration)
                const blinkValue = Math.sin((timeSinceBlinkStart / blinkDuration) * Math.PI / 2);
                // Adjust max rotation. Assuming Rotation roughly around X axis.
                // Need to test direction. Let's assume negative X is down/closed.
                // The user had -12 previously, which is huge (approx 4 * PI). 
                // Usually eyelids are 0 to ~1.0 radians. Let's try -1.5 (approx 90 deg) or similar.
                // User said "added bone to eyelids", usually a single bone for both or one for each?
                // "name of the bone is Bone" implies singular.
                eyeLidBone.current.rotation.x = blinkValue * 0.8; // Testing value, likely need adjustment
            } else {
                // Blink finished
                eyeLidBone.current.rotation.x = 0;
                blinkTime.current = 0;
                nextBlinkTime.current = Math.random() * 4 + 2; // Next blink in 2-6s
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

                    audio.onplay = () => {
                        setIsPlayingVisemes(true); // START VISUALS NOW
                        visemePlaybackTime.current = 0;
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
                // If lips are "ahead", it means we are seeing the visual at T=0.2 but 
                // the sound for T=0.2 hasn't come out of the speaker yet.
                // So we use a slightly "past" time for the visual to match the delayed sound.
                visemePlaybackTime.current = Math.max(0, window.currentAudio.currentTime - AUDIO_LATENCY);
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
                const targetValue = morphTargets.mouthOpen * 2.4; // Intensified by 40% (2.2 -> 3.0)
                const newValue = lerp(hInfl[hDict.mouthOpen], targetValue, blendSpeed);
                hInfl[hDict.mouthOpen] = newValue;

                // Apply same value to teeth mesh if it exists
                if (tDict.mouthOpen !== undefined) {
                    tInfl[tDict.mouthOpen] = newValue;
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
        // RIGHT ARM ANIMATION
        // ========================================
        // Right arm - primary gesturing (larger movements)
        if (rightArm.current) {
            // gesture1: Controls side-to-side movement (Z-axis rotation)
            // - Math.sin(time * speed) creates oscillation
            // - Speed 1.2 = how fast the gesture repeats
            // - Amplitude 0.05 = how far the arm moves side to side
            const gesture1 = Math.sin(time.current * 1.2) * 0.05;

            // gesture2: Controls forward/backward movement (X-axis rotation)
            // - Speed 2 = faster oscillation for natural variation
            // - Amplitude 0.1 = subtle forward/back motion
            const gesture2 = Math.sin(time.current * 2 + 1) * 0.01;

            // Apply rotations:
            // rotation.z: Side-to-side (0.3 = base position, gesture1 = animation)
            rightArm.current.rotation.z = gesture1;
            // rotation.x: Up/down angle (1.3 = arm pointing down, gesture2 = subtle movement)
            rightArm.current.rotation.x = handpos + gesture2;
        }

        // Right forearm - adds emphasis to gestures
        if (rightForeArm.current) {
            // emphasis: Bends the forearm for more expressive gestures
            // - Speed 1.5 = slightly faster than upper arm
            // - Amplitude 0.2 = moderate bend amount
            const emphasis = Math.sin(time.current * 0.5 + 0.5) * 0.06;
            rightForeArm.current.rotation.z = emphasis;
            rightForeArm.current.rotation.x = 0.1 + emphasis;
        }

        // ========================================
        // LEFT ARM ANIMATION
        // ========================================
        // Left arm - secondary gesturing (offset timing for natural look)
        if (leftArm.current) {
            // gesture3: Left arm side-to-side movement
            // - Speed 1.1 = slightly different from right arm (more natural)
            // - Phase shift +2 = starts at different point in cycle
            const gesture3 = Math.sin(time.current * 1.1 + 2) * 0.05;

            // gesture4: Left arm forward/backward movement
            // - Speed 0.9 = slower than right arm for variation
            const gesture4 = Math.sin(time.current * 0.9 + 3) * 0.01;

            // Apply rotations (negative Z for opposite direction):
            leftArm.current.rotation.z = 0 + gesture3; // Negative base = arms symmetric
            leftArm.current.rotation.x = handpos + gesture4; // Same down angle as right
        }

        // Left forearm - complementary movement
        if (leftForeArm.current) {
            // complement: Forearm bend with different timing
            // - Speed 1.4 = unique rhythm
            // - Phase shift +1.5 = offset from right forearm
            const complement = Math.sin(time.current * 0.8 + 1.5) * 0.08
                ;
            leftForeArm.current.rotation.z = 0 + complement; // Negative for symmetry
            leftForeArm.current.rotation.x = 0.1 + complement;
        }

        // ========================================
        // HEAD ANIMATION
        // ========================================
        // Head - subtle nodding and tilting for engagement
        if (head.current) {
            // nod: Up/down head movement (like saying "yes")
            // - Speed 0.8 = slow, thoughtful nodding
            // - Amplitude 0.02 = subtle movement
            const nod = Math.sin(time.current * 0.8 + 2) * 0.02;

            // tilt: Side-to-side head tilt (adds personality)
            // - Speed 0.5 = very slow, gentle tilt
            // - Amplitude 0.02 = very subtle
            const tilt = Math.sin(time.current * 0.5) * 0.02;

            head.current.rotation.x = -0.2 + nod;  // X-axis = nod up/down
            head.current.rotation.z = tilt; // Z-axis = tilt left/right
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


