import React, { useEffect, useRef } from 'react';
import { Trash2, Edit } from 'lucide-react';

export default function MoreOptionsModel({ sessionId, onClose, onDelete, onEdit }) {
    const modalRef = useRef(null);

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div
            ref={modalRef}
            className="bg-black/40 border border-white/10 rounded-xl shadow-2xl py-1 min-w-[150px]"
        >
            <button
                onClick={(e) => {
                    onDelete(e);
                    onClose();
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-2"
            >
                <Trash2 size={14} />
                <span>Delete Chat</span>
            </button>
            <button
                onClick={(e) => {
                    onEdit(e);
                    onClose();
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-emerald-400 hover:bg-emerald-500/10 transition-all flex items-center gap-2"
            >
                <Edit size={14} />
                <span>Edit Title</span>
            </button>
        </div>
    );
}
