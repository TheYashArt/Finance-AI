// AICube.jsx
import React from 'react';

export default function AICube() {
  return (
    <div className="relative flex h-[320px] w-[320px] items-center justify-center [perspective:1000px]">
      {/* Cube container */}
      <div className="relative h-full w-full transform-style-preserve-3d animate-rotate-cube">
        {/* 6 faces of the cube */}
        {[
          { name: 'front', transform: 'translateZ(160px)' },
          { name: 'back', transform: 'rotateY(180deg) translateZ(160px)' },
          { name: 'right', transform: 'rotateY(90deg) translateZ(160px)' },
          { name: 'left', transform: 'rotateY(-90deg) translateZ(160px)' },
          { name: 'top', transform: 'rotateX(90deg) translateZ(160px)' },
          { name: 'bottom', transform: 'rotateX(-90deg) translateZ(160px)' },
        ].map((face) => (
          <div
            key={face.name}
            className={`
              absolute inset-0 flex h-full w-full 
              items-center justify-center rounded-xl
              border border-cyan-400/50 bg-gradient-to-br 
              from-cyan-600/70 via-purple-700/70 to-indigo-700/70
              text-9xl font-black text-white tracking-wider
              shadow-[0_0_40px_rgba(0,255,255,0.5),inset_0_0_30px_rgba(0,0,0,0.4)]
              backdrop-blur-sm
              transition-all duration-500
              hover:shadow-[0_0_70px_rgba(0,255,255,0.8),0_0_100px_rgba(139,92,246,0.6)]
              ${face.name === 'front' || face.name === 'back'
                ? "before:content-['AI'] before:absolute before:inset-0 before:flex before:items-center before:justify-center"
                : ''
              }
            `}
            style={{ transform: face.transform }}
          />
        ))}
      </div>
    </div>
  );
}