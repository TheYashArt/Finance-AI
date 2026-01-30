import React from 'react';
import { Settings, Zap } from 'lucide-react';

const EmbeddingStatus = ({ config, setConfig, disabled }) => {

    const status = config.status || 'idle'; // idle, embedding, completed, failed
    const progress = config.embeddingProgress || 0;

    const handleGenerateEmbeddings = async () => {
        // Boilerplate for backend integration
        /*
        try {
             // 1. Call backend to start embedding job
             const response = await api.post('/api/v1/embeddings/start', { 
                 file_path: uploadedFile.path 
             });
             const jobId = response.data.job_id;

             // 2. Poll for status or use WebSocket
             const pollInterval = setInterval(async () => {
                 const statusRes = await api.get(`/api/v1/embeddings/status/${jobId}`);
                 setConfig(prev => ({
                     ...prev,
                     status: 'embedding',
                     embeddingProgress: statusRes.data.progress
                 }));
                 
                 if (statusRes.data.status === 'completed') {
                     clearInterval(pollInterval);
                     setConfig(prev => ({ ...prev, status: 'completed' }));
                 }
             }, 1000);
         } catch (error) {
             console.error('Embedding failed:', error);
             setConfig(prev => ({ ...prev, status: 'failed' }));
         }
         */

        // Simulation for UI demonstration
        setConfig(prev => ({
            ...prev,
            status: 'embedding',
            embeddingProgress: 0,
            isEmbedding: true
        }));

        // Simulate progress
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 5;
            if (currentProgress >= 100) {
                clearInterval(interval);
                setConfig(prev => ({
                    ...prev,
                    embeddingProgress: 100,
                    status: 'completed'
                }));
                if (onSubmit) {
                    // Optionally trigger something, but maybe wait for user to click "Create Job"? 
                    // For now just mark as completed.
                }
            } else {
                setConfig(prev => ({
                    ...prev,
                    embeddingProgress: currentProgress
                }));
            }
        }, 300);
    };

    if (status === 'idle') {
        return (
            <div
                onClick={!disabled ? handleGenerateEmbeddings : undefined}
                className={`text-center py-4 rounded-xl border-2 border-dashed transition-all ${disabled
                    ? 'border-gray-700 text-gray-600 bg-white/[0.02] cursor-not-allowed'
                    : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 cursor-pointer'
                    }`}
            >
                <div className="flex flex-col items-center gap-2">
                    <Zap className={`w-6 h-6 ${disabled ? 'text-gray-600' : 'text-emerald-400'}`} />
                    <span className="font-medium">Generate Embeddings</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-blue-50/5 border border-blue-500/20 rounded-lg p-4 animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-blue-400 font-medium">
                        {status === 'completed' ? (
                            <>
                                <Settings className="w-4 h-4" />
                                <span>Embeddings Generated</span>
                            </>
                        ) : (
                            <>
                                <Zap className="w-4 h-4 animate-pulse" />
                                <span>Generating Embeddings...</span>
                            </>
                        )}
                    </div>
                    <span className="text-sm font-bold text-blue-400">
                        {progress}%
                    </span>
                </div>

                <div className="w-full bg-blue-900/20 rounded-full h-2.5 overflow-hidden">
                    <div
                        className="bg-blue-500 h-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <p className="mt-2 text-xs text-blue-300/60">
                    {status === 'completed'
                        ? 'Vector embeddings are ready for training.'
                        : 'Processing document chunks and creating vector representations.'}
                </p>
            </div>
        </div>
    );
};

export default EmbeddingStatus;
