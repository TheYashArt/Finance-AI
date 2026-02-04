import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'Is my financial data safe?',
            answer: 'Yes. We use bank-level 256-bit encryption for all data transfers. Your data is stored securely and you can delete it anytime. We never sell your data to third parties.'
        },
        {
            question: 'Can you really understand Indian tax rules?',
            answer: 'Our AI is trained on Indian tax law, SEBI regulations, RBI guidelines, and financial products. It understands concepts like 80C, 80D, NPS, ELSS, and can explain them in simple terms with examples in ₹.'
        },
        {
            question: 'Does this replace my CA or advisor?',
            answer: 'No. RuAI Finance is an AI assistant that helps you understand your finances better. For complex tax filing, legal matters, or certified investment advice, always consult a qualified professional.'
        },
        {
            question: 'Can I use it without connecting bank accounts?',
            answer: 'Absolutely! You can manually add transactions, set goals, and use the AI chat without connecting any accounts. Bank linking is optional for automatic expense tracking.'
        },
        {
            question: 'Is there a free plan?',
            answer: 'Yes! You can use the AI chat, basic expense tracking, and goal setting for free. Premium features like advanced analytics, unlimited history, and priority support are available with our paid plans.'
        },
        {
            question: 'What languages does the AI support?',
            answer: 'Currently, the AI supports English and Hinglish (Hindi-English mix). We are working on adding support for more Indian languages soon.'
        }
    ];

    return (
        <section id="faq" className="relative py-24 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#050505] to-[#030303]" />

            <div className="relative z-10 max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Frequently Asked{' '}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h2>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/20 transition-colors"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="text-white font-medium pr-4">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
