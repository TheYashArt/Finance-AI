import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function Avatar({ model, handpos, ischatting }) {
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

    const headMesh = useRef(null);
    const teethMesh = useRef(null);

    useEffect(() => {
        scene.traverse((obj) => {
            if (obj.isMesh && obj.morphTargetDictionary) {
                if (obj.name === "Wolf3D_Head") {
                    headMesh.current = obj;
                    console.log("✅ Head mesh bound");
                }
                if (obj.name === "Wolf3D_Teeth") {
                    teethMesh.current = obj;
                    console.log("✅ Teeth mesh bound");
                }
            }
        });
    }, [scene]);


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


    // This function defines the Talking animation of the model
    useFrame((_, delta) => {
        if (!headMesh.current || !teethMesh.current) return;

        time.current += delta;

        // define INSIDE useFrame
        // Handles Lip Movement
        const hDict = headMesh.current.morphTargetDictionary;
        const hInfl = headMesh.current.morphTargetInfluences;

        // Handles Teeth Movement
        const tDict = teethMesh.current.morphTargetDictionary;
        const tInfl = teethMesh.current.morphTargetInfluences;

        // Lip Movement
        const open = (Math.sin(time.current * 4) + 1) / 2 * 0.8;
        // Smile Movement
        const smile = 0.5;

        if (hDict.mouthOpen !== undefined) {
            hInfl[hDict.mouthOpen] = 0.2 + open;
            tInfl[tDict.mouthOpen] = 0.2 + open;
        }

        if (hDict.mouthSmile !== undefined) {
            hInfl[hDict.mouthSmile] = 0.2 + smile;
            tInfl[tDict.mouthSmile] = 0.2 +smile;
        }
    });

    // This Function targets Arms for animation
    useEffect(() => {
        console.log("🔍 Setting up explaining animation...");

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
                        console.log("✅ RightArm found");
                        break;
                    case "LeftArm":
                        leftArm.current = obj;
                        console.log("✅ LeftArm found");
                        break;
                    case "RightForeArm":
                        rightForeArm.current = obj;
                        console.log("✅ RightForeArm found");
                        break;
                    case "LeftForeArm":
                        leftForeArm.current = obj;
                        console.log("✅ LeftForeArm found");
                        break;
                    case "Head":
                        head.current = obj;
                        console.log("✅ Head found");
                        break;
                    case "Spine2":
                        spine.current = obj;
                        console.log("✅ Spine2 found");
                        break;
                }
            }
        });

        console.log(`Total skinned meshes: ${meshes.current.length}`);
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
            // - Amplitude 0.2 = how far the arm moves side to side
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


