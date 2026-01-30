import React, { useEffect, useState } from 'react';
import { File, Trash2 } from 'lucide-react';

const TrainingMonitor = () => {
    const [progress, setProgress] = useState(null);
    const [eventSource, setEventSource] = useState(null);
    const [embeddings, setEmbeddings] = useState([
        {
            "id": 1,
            "name": "File 1",
            "status": "completed",
            "progress": 100
        },
        {
            "id": 2,
            "name": "File 2",
            "status": "completed",
            "progress": 100
        },
        {
            "id": 3,
            "name": "File 3",
            "status": "completed",
            "progress": 100
        },
        {
            "id": 4,
            "name": "File 4",
            "status": "completed",
            "progress": 100
        },
        {
            "id": 5,
            "name": "File 5",
            "status": "completed",
            "progress": 100
        }
    ])
    const handleDelete = (id) => {
        setEmbeddings(embeddings.filter((emb) => emb.id !== id));
    }
    return (
        <div className=" flex flex-col gap-5">
            {embeddings.map((emb) => {
                return (
                    <div className='bg-white/[0.02] border border-white/10 rounded-2xl py-6 px-6 flex justify-between'>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                    <File className="w-5 h-5 text-emerald-400 animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{emb.name}</h3>
                                    <p className="text-sm text-gray-400 capitalize">Status: {emb.status}</p>
                                </div>
                            </div>


                        </div>
                        <div className='flex gap-5 items-center cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors'>
                            <Trash2 className="w-6 h-6 text-red-400" onClick={() => handleDelete(emb.id)} />
                        </div>
                    </div>
                )
            })
            }
        </div>
    );
};

export default TrainingMonitor;
