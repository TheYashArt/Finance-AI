import React, { useState, useEffect, useRef } from 'react';

const FinanceGraph = () => {
    const [animationProgress, setAnimationProgress] = useState(0);
    const animationFrameRef = useRef(null);
    const startTimeRef = useRef(null);

    // Sample financial data points (income and expense trends)
    const dataPoints = [
        { income: 50, expense: 10 },
        { income: 45, expense: 25 },
        { income: 35, expense: 25 },
        { income: 60, expense: 45 },
        { income: 50, expense: 45 },
        { income: 70, expense: 35 },
        { income: 65, expense: 50 },
        { income: 80, expense: 45 },
        { income: 60, expense: 40 },
        { income: 50, expense: 45 },
        { income: 70, expense: 35 },
        { income: 65, expense: 50 },
        { income: 80, expense: 45 },
        { income: 60, expense: 40 },
        { income: 50, expense: 45 },
        { income: 70, expense: 35 },
        { income: 65, expense: 50 },
        { income: 80, expense: 45 },
        { income: 60, expense: 40 },
        { income: 50, expense: 45 },
        { income: 70, expense: 35 },
        { income: 65, expense: 50 },
        { income: 80, expense: 45 },
        { income: 60, expense: 40 },
        { income: 50, expense: 45 }
    ];

    // SVG dimensions
    const width = 400;
    const height = 200;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Easing function for smooth animation
    const easeInOutQuadratic = (t) => {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };

    // Calculate points for the path with smooth interpolation
    const getPath = (data, key, progress = 1) => {
        const maxValue = 100;
        const points = data.map((point, index) => {
            const x = padding + (index / (dataPoints.length - 1)) * chartWidth;
            const y = height - padding - (point[key] / maxValue) * chartHeight;
            return { x, y };
        });

        // Apply progress to the last segment for smooth drawing
        if (progress < 1 && points.length > 1) {
            const lastIndex = points.length - 1;
            const prevPoint = points[lastIndex - 1];
            const lastPoint = points[lastIndex];
            points[lastIndex] = {
                x: prevPoint.x + (lastPoint.x - prevPoint.x) * progress,
                y: prevPoint.y + (lastPoint.y - prevPoint.y) * progress,
            };
        }

        const pathString = points.map((p, i) =>
            i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`
        ).join(' ');

        return pathString;
    };

    // Smooth animation using requestAnimationFrame
    useEffect(() => {
        const duration = 8000; // 4 seconds for full animation
        const pauseDuration = 2000; // 1 second pause before restart

        const animate = (timestamp) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp;
            }

            const elapsed = timestamp - startTimeRef.current;
            const totalCycleDuration = duration + pauseDuration;
            const cycleProgress = (elapsed % totalCycleDuration) / totalCycleDuration;

            if (cycleProgress < duration / totalCycleDuration) {
                // Animation phase
                const animProgress = (cycleProgress * totalCycleDuration) / duration;
                const easedProgress = easeInOutQuadratic(animProgress);
                setAnimationProgress(easedProgress * 100);
            } else {
                // Pause phase - keep at 100%
                setAnimationProgress(100);
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    // Calculate visible data points based on animation progress
    const totalPoints = dataPoints.length;
    const progressRatio = animationProgress / 100;
    const visiblePointsFloat = 2 + (totalPoints - 2) * progressRatio;
    const visiblePointsCount = Math.floor(visiblePointsFloat);
    const partialProgress = visiblePointsFloat - visiblePointsCount;

    const visibleData = dataPoints.slice(0, Math.min(visiblePointsCount + 1, totalPoints));

    return (
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden opacity-10 h-[200px]">
            <svg
                width={width}
                height={height}
                className="transform scale-110 transition-all duration-300"
                style={{ filter: 'blur(0.5px)' }}
            >
                {/* Grid lines */}
                <g className="opacity-20">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <line
                            key={`h-${i}`}
                            x1={padding}
                            y1={padding + (i * chartHeight) / 4}
                            x2={width - padding}
                            y2={padding + (i * chartHeight) / 4}
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-emerald-500"
                        />
                    ))}
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <line
                            key={`v-${i}`}
                            x1={padding + (i * chartWidth) / 7}
                            y1={padding}
                            x2={padding + (i * chartWidth) / 7}
                            y2={height - padding}
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-emerald-500"
                        />
                    ))}
                </g>

                {/* Gradient definitions */}
                <defs>
                    <linearGradient id="incomeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(52, 211, 153)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="rgb(52, 211, 153)" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Gradient fill under income line */}
                {visibleData.length > 1 && (
                    <path
                        d={`${getPath(visibleData, 'income', partialProgress)} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`}
                        fill="url(#incomeGradient)"
                        style={{ transition: 'all 0.05s ease-out' }}
                    />
                )}

                {/* Income line (green) */}
                <path
                    d={getPath(visibleData, 'income', partialProgress)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-emerald-400"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transition: 'all 1s ease-out' }}
                />

                {/* Income data points */}
                {visibleData.slice(0, -1).map((point, index) => {
                    const x = padding + (index / (dataPoints.length - 1)) * chartWidth;
                    const y = height - padding - (point.income / 100) * chartHeight;
                    return (
                        <circle
                            key={`income-${index}`}
                            cx={x}
                            cy={y}
                            r="3"
                            fill="currentColor"
                            className="text-emerald-400"
                            style={{ transition: 'all 0.3s ease-out' }}
                        >
                            <animate
                                attributeName="r"
                                values="3;4;3"
                                dur="2s"
                                repeatCount="indefinite"
                            />
                        </circle>
                    );
                })}
            </svg>
        </div>
    );
};

export default FinanceGraph;
