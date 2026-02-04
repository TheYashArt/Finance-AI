import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, UserCheck, AlertCircle, Scale, Ban, RefreshCw } from 'lucide-react';

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            icon: FileText,
            title: "Acceptance of Terms",
            content: [
                {
                    subtitle: "Agreement to Terms",
                    text: "By accessing and using FinWise (the 'Service'), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service."
                },
                {
                    subtitle: "Eligibility",
                    text: "You must be at least 18 years old to use this Service. By using the Service, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms."
                },
                {
                    subtitle: "Local Application",
                    text: "FinWise is a local application that runs entirely on your device. No account creation or registration is required. All data remains on your device and is never transmitted to external servers."
                }
            ]
        },
        {
            icon: UserCheck,
            title: "Service Description",
            content: [
                {
                    subtitle: "Local AI-Powered Financial Tools",
                    text: "FinWise provides AI-powered financial advice, expense tracking, goal management, and chat interactions. All features run entirely on your local device using the Ollama AI model. No data is sent to external servers or cloud services."
                },
                {
                    subtitle: "No Financial Advice Guarantee",
                    text: "While we strive to provide accurate and helpful financial insights, our AI-generated advice should not be considered as professional financial, investment, or tax advice. Always consult with qualified professionals for important financial decisions."
                },
                {
                    subtitle: "Service Availability",
                    text: "Since the Service runs locally on your device, availability depends on your device's functionality and the proper installation of required dependencies (such as Ollama). We do not control or guarantee the availability of third-party local dependencies."
                },
                {
                    subtitle: "Privacy-First Design",
                    text: "FinWise is designed with privacy as the top priority. All your financial data, AI conversations, and personal information remain exclusively on your device. We have no access to your data."
                }
            ]
        },
        {
            icon: UserCheck,
            title: "User Responsibilities",
            content: [
                {
                    subtitle: "Data Security",
                    text: "Since all data is stored locally on your device, you are responsible for maintaining the security of your device, including using strong passwords, keeping your operating system updated, and protecting against malware and unauthorized access."
                },
                {
                    subtitle: "Accurate Information",
                    text: "You agree to provide accurate financial data when using our Service. Inaccurate financial data may result in incorrect insights and recommendations from the AI."
                },
                {
                    subtitle: "Lawful Use",
                    text: "You agree to use the Service only for lawful purposes and in accordance with these Terms. You will not use the Service in any way that violates applicable laws or regulations."
                },
                {
                    subtitle: "Backup Responsibility",
                    text: "You are solely responsible for backing up your data. Since all data is stored locally, we cannot recover your data if it is lost due to device failure, accidental deletion, or other causes."
                }
            ]
        },
        {
            icon: Ban,
            title: "Prohibited Activities",
            content: [
                {
                    subtitle: "Unauthorized Access",
                    text: "You may not attempt to gain unauthorized access to any part of the Service, other users' accounts, or computer systems connected to the Service through hacking, password mining, or any other means."
                },
                {
                    subtitle: "Misuse of Service",
                    text: "You may not use the Service to transmit viruses, malware, or any harmful code; interfere with or disrupt the Service; or attempt to reverse engineer, decompile, or extract source code from our platform."
                },
                {
                    subtitle: "Data Scraping",
                    text: "Automated scraping, data mining, or extraction of content from the Service without our explicit written permission is strictly prohibited."
                }
            ]
        },
        {
            icon: Scale,
            title: "Intellectual Property",
            content: [
                {
                    subtitle: "Our Rights",
                    text: "All content, features, and functionality of the Service, including but not limited to text, graphics, logos, and software, are owned by FinWise and protected by copyright, trademark, and other intellectual property laws."
                },
                {
                    subtitle: "Your Data",
                    text: "You retain complete ownership of all financial data and personal information stored on your device. Since we never access or collect your data, we make no claims to it whatsoever."
                },
                {
                    subtitle: "Open Source Components",
                    text: "FinWise may use open-source components, including the Ollama AI model. These components are subject to their respective licenses. We respect and comply with all open-source licenses."
                },
                {
                    subtitle: "Feedback",
                    text: "Any feedback, suggestions, or ideas you provide about the Service may be used by us without any obligation to compensate you."
                }
            ]
        },
        {
            icon: AlertCircle,
            title: "Disclaimers and Limitations",
            content: [
                {
                    subtitle: "No Warranties",
                    text: "The Service is provided 'as is' and 'as available' without warranties of any kind, either express or implied. We do not warrant that the Service will be error-free, secure, or uninterrupted."
                },
                {
                    subtitle: "Limitation of Liability",
                    text: "To the maximum extent permitted by law, FinWise shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses resulting from your use of the Service."
                },
                {
                    subtitle: "AI Accuracy",
                    text: "While our AI models are trained on extensive data, they may occasionally provide inaccurate or incomplete information. You acknowledge that AI-generated content should be verified independently for critical decisions."
                }
            ]
        },
        {
            icon: RefreshCw,
            title: "Discontinuation of Use",
            content: [
                {
                    subtitle: "Your Right to Stop Using",
                    text: "You may stop using FinWise at any time by uninstalling the application from your device. Your data will remain on your device until you manually delete it."
                },
                {
                    subtitle: "No Account Termination Process",
                    text: "Since FinWise does not require account creation and operates entirely locally, there is no account termination process. Simply uninstall the application when you no longer wish to use it."
                },
                {
                    subtitle: "Data Removal",
                    text: "To completely remove all data, you should clear the application's local storage or delete the application data folder from your device after uninstalling."
                }
            ]
        },
        {
            icon: FileText,
            title: "Modifications and Governing Law",
            content: [
                {
                    subtitle: "Changes to Terms",
                    text: "We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through the Service. Your continued use after such modifications constitutes acceptance of the updated Terms."
                },
                {
                    subtitle: "Governing Law",
                    text: "These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions."
                },
                {
                    subtitle: "Dispute Resolution",
                    text: "Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration in accordance with Indian arbitration laws, except where prohibited by law."
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
                        <Scale className="w-4 h-4" />
                        <span>Legal Agreement</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                        Terms of Service
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Please read these terms carefully before using FinWise. This application runs entirely on your device with complete privacy.
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

                {/* Contact Section */}
                <div className="mt-12 p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-3">Questions About These Terms?</h3>
                    <p className="text-gray-400 leading-relaxed">
                        If you have any questions about these Terms of Service, please reach out through our support channels
                        or community forums. We're here to help clarify any concerns you may have.
                    </p>
                </div>

                {/* Acknowledgment */}
                <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-3">Acknowledgment</h3>
                    <p className="text-gray-400 leading-relaxed">
                        By using FinWise, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service
                        and our Privacy Policy. These documents constitute the entire agreement between you and FinWise regarding your use of the Service.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
