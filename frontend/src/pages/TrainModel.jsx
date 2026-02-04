import React, { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Sparkles, History, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundAnimation from '../components/BackgroundAnimation';
import DatasetUpload from '../components/Training/DatasetUpload';
import EmbeddingStatus from '../components/Training/EmbeddingStatus';
import TrainingMonitor from '../components/Training/TrainingMonitor';


const TrainModel = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [config, setConfig] = useState({
        embedding: true,
        embeddingProgress: 0
    });

    const [trainingJobs, setTrainingJobs] = useState([
        { id: 1, name: 'Demo Training Job', status: 'running' }
    ]);
    const [activeTab, setActiveTab] = useState('create'); // create, history, models
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (file) => {
        setUploadedFile(file);
        if (file === null) {
            setConfig({
                embedding: true,
                embeddingProgress: 0,
                status: 'idle'
            });
        }
    };

    return (
        <div className="min-h-screen text-white p-6 md:p-12 relative overflow-hidden">
            <BackgroundAnimation />
            <div className="absolute inset-0 pointer-events-none">
                {/* Left green glow */}
                <div className="absolute top-[5%] left-[2%] w-[320px] h-[320px] 
    bg-emerald-400/25 rounded-full blur-[150px] " />
                <div className="absolute top-[65%] left-[15%] w-[450px] h-[300px] 
    bg-emerald-400/30 rounded-full blur-[150px]" />
                <div className="absolute top-[55%] right-[30%] w-[450px] h-[300px] 
    bg-blue-400/30 rounded-full blur-[150px]" />
                {/* Center lime glow */}
                <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] 
    bg-emerald-400/30 rounded-full blur-[90px]" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/menu"
                            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                                {/* <Brain className="w-8 h-8 text-emerald-400" /> */}
                                <div className=''>
                                    <span className='text-[#33A8A1] text-4xl'>Fin</span><span className='text-4xl'>Wise</span>
                                    <br />
                                    <span className='text-2xl font-light'>
                                        Train
                                    </span>
                                </div>
                            </h1>
                            {/* <p className="text-gray-400">Fine-tune AI models with your financial data</p> */}
                        </div>
                    </div>

                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 bg-white/[0.02] border border-white/10 rounded-2xl p-2">
                    <button
                        onClick={() => setActiveTab('create')}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'create'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Sparkles className="w-4 h-4" />
                        Create Training
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'history'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <History className="w-4 h-4" />
                        Training History
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'create' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Dataset Upload */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-4">Upload Dataset</h2>
                            <DatasetUpload
                                onUploadComplete={(result) => setUploadedFile({
                                    name: result.filename,
                                    size: 0,
                                    path: result.filepath,
                                    validation: result.validation
                                })}
                                uploadedFile={uploadedFile}
                                setUploadedFile={handleFileChange}
                            />


                        </div>

                        {/* Right Column - Configuration */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                            <EmbeddingStatus
                                config={config}
                                setConfig={setConfig}
                                disabled={!uploadedFile || loading}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="space-y-4">
                        <TrainingMonitor />
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrainModel;