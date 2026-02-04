import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, Users, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            icon: Database,
            title: "Local Data Storage",
            content: [
                {
                    subtitle: "100% Local Storage",
                    text: "All your data is stored exclusively on your local device. We do not collect, transmit, or store any of your personal information, financial data, or usage information on external servers or cloud services."
                },
                {
                    subtitle: "Financial Data",
                    text: "Your transaction data, income information, financial goals, spending categories, and all other financial information remain entirely on your device. This data never leaves your computer."
                },
                {
                    subtitle: "AI Conversations",
                    text: "All conversations with our AI assistant are processed locally using Ollama. Your chat history, questions, and AI responses are stored only on your device and are never transmitted to external servers."
                },
                {
                    subtitle: "No Account Required",
                    text: "Since all data is stored locally, you don't need to create an account or provide any personal information like email addresses or authentication credentials to use FinWise."
                }
            ]
        },
        {
            icon: Lock,
            title: "How Your Data is Used",
            content: [
                {
                    subtitle: "Local Processing Only",
                    text: "All data processing happens locally on your device. The AI-powered financial advice, personalized insights, expense tracking, and goal management are all computed on your machine using the locally-installed Ollama AI model."
                },
                {
                    subtitle: "No Data Collection",
                    text: "Since we don't collect any data, we cannot and do not use your information for analytics, model training, or any other purposes. Your privacy is absolute."
                },
                {
                    subtitle: "No Communication",
                    text: "We do not send emails, notifications, or any form of communication since we don't collect contact information. All updates and information are provided within the application itself."
                }
            ]
        },
        {
            icon: Shield,
            title: "Data Security",
            content: [
                {
                    subtitle: "Local Security",
                    text: "Your data security is entirely in your hands. Since all data is stored locally on your device, it is protected by your device's security measures, including your operating system's encryption, user account controls, and any additional security software you use."
                },
                {
                    subtitle: "No Network Transmission",
                    text: "There is no data transmission to external servers, eliminating the risk of data interception, man-in-the-middle attacks, or server breaches. Your data never travels over the internet."
                },
                {
                    subtitle: "Local AI Model",
                    text: "The AI model runs entirely on your device through Ollama. No AI queries, prompts, or responses are sent to external AI services or cloud providers, ensuring complete privacy of your financial questions and insights."
                }
            ]
        },
        {
            icon: Users,
            title: "Data Sharing",
            content: [
                {
                    subtitle: "Zero Data Sharing",
                    text: "We do not and cannot share your data with anyone because we never collect or have access to your data in the first place. All your information stays exclusively on your device."
                },
                {
                    subtitle: "No Third-Party Services",
                    text: "FinWise does not use any third-party analytics, cloud hosting, or external AI services. The application runs entirely on your local machine, and the AI model is hosted locally through Ollama."
                },
                {
                    subtitle: "No Legal Disclosure Risk",
                    text: "Since we don't collect or store your data on our servers, we cannot be compelled to disclose your information through legal requests, court orders, or government demands."
                }
            ]
        },
        {
            icon: Eye,
            title: "Your Rights and Control",
            content: [
                {
                    subtitle: "Complete Ownership",
                    text: "You have complete ownership and control over all your data since it resides entirely on your device. You can access, modify, export, or delete your data at any time without needing our permission or assistance."
                },
                {
                    subtitle: "Data Portability",
                    text: "Your data is stored in standard formats on your local device, making it easy to backup, transfer, or migrate to other systems whenever you choose."
                },
                {
                    subtitle: "Instant Deletion",
                    text: "You can delete your data instantly by removing the application or clearing its local storage. There are no remote copies to worry about or deletion requests to submit."
                }
            ]
        },
        {
            icon: Mail,
            title: "Questions and Support",
            content: [
                {
                    subtitle: "Privacy Questions",
                    text: "If you have any questions about this Privacy Policy or how FinWise handles data locally, please feel free to reach out through our support channels or community forums."
                },
                {
                    subtitle: "Open Source Transparency",
                    text: "FinWise is committed to transparency. You can review our source code to verify that no data is transmitted externally and that all processing happens locally on your device."
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#030303] text-white">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">Back to Home</span>
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative py-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-emerald-500/5 via-transparent to-transparent" />
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
                        <Shield className="w-4 h-4" />
                        <span>Your Privacy Matters</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Your privacy is guaranteed. All data is stored locally on your device, and nothing is ever transmitted online.
                    </p>
                    <p className="text-gray-500 text-sm mt-4">
                        Last Updated: January 27, 2026
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 pb-20">
                <div className="space-y-12">
                    {sections.map((section, index) => {
                        const Icon = section.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-all"
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                        <Icon className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mt-2">
                                        {section.title}
                                    </h2>
                                </div>

                                <div className="space-y-6 ml-16">
                                    {section.content.map((item, idx) => (
                                        <div key={idx}>
                                            <h3 className="text-lg font-semibold text-white mb-2">
                                                {item.subtitle}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Information */}
                <div className="mt-12 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-3">Changes to This Policy</h3>
                    <p className="text-gray-400 leading-relaxed">
                        We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
                        We will notify you of any material changes by posting the new Privacy Policy on this page and updating the
                        "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                    </p>
                </div>

                {/* Local Storage Notice */}
                <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-3">Local Storage and Cookies</h3>
                    <p className="text-gray-400 leading-relaxed">
                        FinWise uses browser local storage to save your financial data on your device. We do not use cookies for tracking,
                        analytics, or advertising. All data remains on your device and is never transmitted to external servers.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
