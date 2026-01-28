import React, { useEffect, useState } from "react";

function TypingText({ texts = ["Your AI CFO for Indian Money", "FinWise"], speed = 100, pauseDuration = 2000, eraseDuration = 50 }) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const currentText = texts[currentTextIndex];

        if (isTyping) {
            // Typing phase
            if (charIndex < currentText.length) {
                const timeout = setTimeout(() => {
                    setDisplayedText((prev) => prev + currentText[charIndex]);
                    setCharIndex(charIndex + 1);
                }, speed);
                return () => clearTimeout(timeout);
            } else {
                // Finished typing, pause before erasing
                const timeout = setTimeout(() => {
                    setIsTyping(false);
                }, pauseDuration);
                return () => clearTimeout(timeout);
            }
        } else {
            // Erasing phase
            if (charIndex > 0) {
                const timeout = setTimeout(() => {
                    setDisplayedText((prev) => prev.slice(0, -1));
                    setCharIndex(charIndex - 1);
                }, eraseDuration);
                return () => clearTimeout(timeout);
            } else {
                // Finished erasing, move to next text
                setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                setIsTyping(true);
            }
        }
    }, [charIndex, isTyping, currentTextIndex, texts, speed, pauseDuration, eraseDuration]);

    // Split the text to apply gradient to "AI CFO" or "FinWise"
    const renderStyledText = () => {
        const currentText = texts[currentTextIndex];

        // Check if we're currently on the FinWise text
        if (currentText === "FinWise") {
            const parts = displayedText.split(/(Fin|Wise)/);
            return parts.map((part, idx) => {
                if (part === "Fin") {
                    return (
                        <React.Fragment key={idx}>
                            <span className="text-[#299189] font-light text-[140px]">
                                {part}
                            </span>
                        </React.Fragment>
                    );
                }
                else if (part.startsWith("W")) {
                    return (
                        <React.Fragment key={idx}>
                            <span className="text-white font-light text-[140px]">
                                {part}
                            </span>
                        </React.Fragment>
                    );
                }
                // For partial text like "F", "Fi", "FinW", etc.
                return <span key={idx} className="text-[#299189] font-light text-[140px]">{part}</span>;
            });
        }
        // Check if current text contains "AI CFO"
        else if (currentText.includes("AI CFO")) {
            const parts = displayedText.split(/(AI CFO)/);
            return parts.map((part, idx) => {
                if (part.startsWith("A")) {
                    return (
                        <React.Fragment key={idx}>
                            <span className="bg-linear-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent">
                                {part}
                            </span>
                            <br />
                        </React.Fragment>
                    );
                }
                return <span key={idx} className="text-white">{part}</span>;
            });
        }
        // Default styling
        return <span className="text-white">{displayedText}</span>;
    };

    return (
        <>
            {renderStyledText()}
            {/* <span className="animate-pulse text-emerald-400">|</span> */}
        </>
    );
}

export default TypingText;
