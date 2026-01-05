
import React, { useState, useMemo } from 'react';
import { useAuth } from '../../App';
import { SparklesIcon } from '../Icons';
import { generateBulkFoundationExercises } from '../../services/aiService';
import { accumulatePracticeData } from '../../services/dataAccumulationService';
import { foundationContent as defaultFoundationData } from '../../data/writing_foundation/content';
import { LOCAL_STORAGE_KEYS } from '../../constants';
import { PracticeMode } from '../../types';

const AISingleContentFactory: React.FC = () => {
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [log, setLog] = useState<string>('');
    const [error, setError] = useState('');

    // State for single item generation
    const [selectedItemId, setSelectedItemId] = useState<string>(defaultFoundationData[0]?.id || '');
    const [selectedPracticeMode, setSelectedPracticeMode] = useState<Exclude<PracticeMode, 'free_write'>>('reorder');
    const [quantity, setQuantity] = useState(3);

    const availablePracticeModes = useMemo(() => {
        const item = defaultFoundationData.find(i => i.id === selectedItemId);
        if (!item) return [];
        return Object.keys(item.practice).filter(m => m !== 'free_write') as Exclude<PracticeMode, 'free_write'>[];
    }, [selectedItemId]);

    const handleGenerate = async () => {
        if (!selectedItemId || !selectedPracticeMode) {
            setError('Please select an item and a practice mode.');
            return;
        }

        setIsLoading(true);
        setError('');
        setLog('');

        const item = defaultFoundationData.find(i => i.id === selectedItemId);
        if (!item) {
            setError('Selected item not found.');
            setIsLoading(false);
            return;
        }
        
        try {
            const newExercises = await generateBulkFoundationExercises(item, selectedPracticeMode, quantity);
            const stats = accumulatePracticeData(LOCAL_STORAGE_KEYS.WRITING_FOUNDATION_CONTENT, selectedItemId, selectedPracticeMode, newExercises);
            setLog(`Success! Added ${stats.newItemCount} new exercises. '${selectedPracticeMode}' now has ${stats.totalItemCount} total exercises.`);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="card-base bg-white border border-gray-200">
            <header className="aio-card-header !bg-indigo-50 border-b-2 border-indigo-200">
                <div>
                    <h3 className="text-xl font-bold text-indigo-800">AI Content Factory (Single Item)</h3>
                    <p className="text-sm text-indigo-600">Generate and accumulate exercises for a single specific subcategory.</p>
                </div>
            </header>
            <div className="aio-card-body space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-gray-50/50">
                    <div>
                        <label className="font-semibold text-gray-700 block mb-1">Data Source</label>
                        <select value="foundation" className="form-input w-full bg-gray-200" disabled>
                            <option value="foundation">Foundation Practice</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700 block mb-1">Data Item</label>
                        <select value={selectedItemId} onChange={e => setSelectedItemId(e.target.value)} className="form-input w-full">
                            {defaultFoundationData.map(item => <option key={item.id} value={item.id}>{item.name_vi}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="font-semibold text-gray-700 block mb-1">Practice Mode</label>
                        <select value={selectedPracticeMode} onChange={e => setSelectedPracticeMode(e.target.value as any)} className="form-input w-full">
                            {availablePracticeModes.map(mode => <option key={mode} value={mode}>{mode}</option>)}
                        </select>
                    </div>
                </div>
                 <button onClick={handleGenerate} disabled={isLoading} className="btn btn-ai-creator w-full text-lg py-3">
                     {isLoading ? <div className="ai-spinner mr-2"></div> : <SparklesIcon className="w-6 h-6 mr-2"/>}
                    {isLoading ? 'Generating...' : `Generate '${selectedPracticeMode}' Exercises`}
                </button>
                
                {error && <div className="p-3 bg-red-100 text-red-800 rounded-md text-center font-semibold">{error}</div>}
                {log && <div className="p-3 bg-green-100 text-green-800 rounded-md text-center font-semibold">{log}</div>}
            </div>
        </div>
    );
};

export default AISingleContentFactory;
