import React, { useState, useCallback, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, DocumentCheckIcon, ArrowPathIcon, ExclamationTriangleIcon } from '../Icons';

export interface DataSectionProps {
    title: string;
    storageKey: string;
    defaultData: any;
}

const DataSectionEditor: React.FC<DataSectionProps> = ({ title, storageKey, defaultData }) => {
    const [jsonData, setJsonData] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    const handleLoad = useCallback(() => {
        setMessage(null);
        try {
            const data = localStorage.getItem(storageKey);
            if (data) {
                setJsonData(JSON.stringify(JSON.parse(data), null, 2));
            } else {
                setJsonData(JSON.stringify(defaultData, null, 2));
            }
        } catch (e) {
            setJsonData(JSON.stringify(defaultData, null, 2));
            setMessage({ text: 'Could not parse stored data. Loaded default instead.', type: 'error' });
        }
    }, [storageKey, defaultData]);

    useEffect(() => {
        if (isOpen) {
            handleLoad();
        }
    }, [isOpen, handleLoad]);

    const handleSave = () => {
        setMessage(null);
        try {
            const parsed = JSON.parse(jsonData);
            localStorage.setItem(storageKey, JSON.stringify(parsed));
            setMessage({ text: 'Saved successfully!', type: 'success' });
        } catch (e) {
            setMessage({ text: 'Error: Invalid JSON format. Cannot save.', type: 'error' });
        }
        setTimeout(() => setMessage(null), 3000);
    };

    const handleReset = () => {
        if (window.confirm(`Are you sure you want to reset "${title}" to its default state? This cannot be undone.`)) {
            const defaultJson = JSON.stringify(defaultData, null, 2);
            localStorage.setItem(storageKey, defaultJson);
            setJsonData(defaultJson);
            setMessage({ text: 'Reset to default successfully!', type: 'success' });
             setTimeout(() => setMessage(null), 3000);
        }
    };

    return (
        <div className="card-base bg-white border border-gray-200">
            <header onClick={() => setIsOpen(!isOpen)} className="aio-card-header">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <p className="font-mono text-sm text-gray-500">{storageKey}</p>
                </div>
                {isOpen ? <ChevronUpIcon className="w-6 h-6 text-gray-500"/> : <ChevronDownIcon className="w-6 h-6 text-gray-500"/>}
            </header>
            {isOpen && (
                <div className="aio-card-body">
                     {message && (
                        <div className={`p-2 rounded-md text-center text-sm font-semibold mb-3 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {message.text}
                        </div>
                    )}
                    <textarea
                        value={jsonData}
                        onChange={(e) => setJsonData(e.target.value)}
                        className="aio-json-editor w-full"
                        aria-label={`JSON editor for ${title}`}
                    />
                    <div className="aio-card-actions">
                        <button onClick={handleSave} className="btn btn-writing"><DocumentCheckIcon className="w-5 h-5"/>Save</button>
                        <button onClick={handleLoad} className="btn btn-secondary"><ArrowPathIcon className="w-5 h-5"/>Reload</button>
                        <button onClick={handleReset} className="btn btn-secondary !bg-red-100 !text-red-700 hover:!bg-red-200"><ExclamationTriangleIcon className="w-5 h-5"/>Reset</button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default DataSectionEditor;