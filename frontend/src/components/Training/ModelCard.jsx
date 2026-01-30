import React from 'react';
import { Download, Trash2, CheckCircle, Clock, XCircle, Loader } from 'lucide-react';

const ModelCard = ({ model, onDelete }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-4 h-4 text-emerald-400" />;
            case 'running':
                return <Loader className="w-4 h-4 text-blue-400 animate-spin" />;
            case 'failed':
                return <XCircle className="w-4 h-4 text-red-400" />;
            default:
                return <Clock className="w-4 h-4 text-gray-400" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'running':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'failed':
                return 'bg-red-500/10 text-red-400 border-red-500/20';
            default:
                return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-1 truncate">{model.name}</h4>
                    <p className="text-sm text-gray-400">{formatDate(model.created_at)}</p>
                </div>

                {model.status && (
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(model.status)}`}>
                        {getStatusIcon(model.status)}
                        <span className="capitalize">{model.status}</span>
                    </div>
                )}
            </div>

            {/* Model Info */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Size</span>
                    <span className="text-white font-medium">{model.size_mb} MB</span>
                </div>

                {model.metrics && (
                    <>
                        {model.metrics.loss && (
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Final Loss</span>
                                <span className="text-white font-medium">{model.metrics.loss.toFixed(4)}</span>
                            </div>
                        )}
                        {model.metrics.accuracy && (
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Accuracy</span>
                                <span className="text-white font-medium">{(model.metrics.accuracy * 100).toFixed(1)}%</span>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                <button
                    onClick={() => {
                        // Copy model name to clipboard for deployment
                        navigator.clipboard.writeText(model.name);
                        alert(`Model name "${model.name}" copied to clipboard!`);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-emerald-400 transition-colors text-sm font-medium"
                >
                    <Download className="w-4 h-4" />
                    Copy Name
                </button>

                <button
                    onClick={() => onDelete(model.id)}
                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default ModelCard;
