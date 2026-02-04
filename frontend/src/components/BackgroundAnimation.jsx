import React, { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const particles = [];
        const financeElements = ['₹', '$', '€', '↑', '↓', '%', '📈', '📊', '80C', 'NSE', 'SIP'];

        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'finance-particle';
            particle.textContent = financeElements[Math.floor(Math.random() * financeElements.length)];
            particle.style.cssText = `
                position: absolute;
                font-size: ${10 + Math.random() * 14}px;
                color: rgba(16, 185, 129, ${0.1 + Math.random() * 0.2});
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${8 + Math.random() * 12}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
                font-family: monospace;
                z-index: 0;
            `;
            container.appendChild(particle);
            particles.push(particle);
        }

        return () => particles.forEach(p => p.remove());
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Background Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#030303] via-[#050505] to-[#030303]" />

            {/* 3D Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [perspective:1000px]" />

            {/* Glow Effects */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[150px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[200px]" />

            {/* Animations Styles */}
            <style>{`
                @keyframes floatParticle {
                    0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.3; }
                    25% { transform: translateY(-15px) translateX(10px) rotate(5deg); opacity: 0.5; }
                    50% { transform: translateY(-25px) translateX(-5px) rotate(-3deg); opacity: 0.6; }
                    75% { transform: translateY(-10px) translateX(-10px) rotate(3deg); opacity: 0.4; }
                }
            `}</style>
        </div>
    );
};

export default BackgroundAnimation;
