import React from 'react';
import Navbar from '../components/Landing/Navbar';
import HeroNew from '../components/Landing/HeroNew';
import ThreePillars from '../components/Landing/ThreePillars';
import AIChatSection from '../components/Landing/AIChatSection';
import VoiceAvatarSection from '../components/Landing/VoiceAvatarSection';
import ExpenseTrackerSection from '../components/Landing/ExpenseTrackerSection';
import HowItWorks from '../components/Landing/HowItWorks';
import SecuritySection from '../components/Landing/SecuritySection';
import FinalCTA from '../components/Landing/FinalCTA';
import FAQSection from '../components/Landing/FAQSection';
import FooterNew from '../components/Landing/FooterNew';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#030303] text-white font-sans antialiased overflow-x-hidden">
            <Navbar />
            <HeroNew />
            <ThreePillars />
            <AIChatSection />
            <VoiceAvatarSection />
            <ExpenseTrackerSection />
            <HowItWorks />
            <SecuritySection />
            <FinalCTA />
            <FAQSection />
            <FooterNew />
        </div>
    );
};

export default LandingPage;
