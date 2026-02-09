import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment, Float } from '@react-three/drei';

const Blob = () => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            // Subtle rotation
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere args={[1, 64, 64]} scale={1.5} ref={meshRef}>
                <MeshDistortMaterial
                    color="#000000" // Pure black
                    emissive="#10b981" // Emerald glow
                    emissiveIntensity={0.1}
                    roughness={0}
                    metalness={0.9} // Slight reduction for better light interaction
                    distort={0.5} // High distortion for deep curves
                    speed={1} // Fast movement
                />
            </Sphere>
        </Float>
    );
};

const VenomBlob = ({ className }) => {
    return (
        <div className={className}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }}>
                <ambientLight intensity={100} />
                <directionalLight position={[1, 2, 10]} intensity={50} />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#059669" />

                {/* Environment for better metallic reflections */}
                <Environment preset="city" intensity={1} blur={1} rotation={[8, 1, 0]} />

                <Blob />
            </Canvas>
        </div>
    );
};

export default VenomBlob;
