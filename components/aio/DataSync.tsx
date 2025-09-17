// components/aio/DataSync.tsx
import React, { useState } from 'react';
import { LOCAL_STORAGE_KEYS } from '../../constants';
import { RocketLaunchIcon } from '../Icons';

const DataSync: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [log, setLog] = useState<string[]>([]);
    const [adminKey, setAdminKey] = useState('');
    
    const addLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setLog(prev => [`[${timestamp}] ${message}`, ...prev]);
    };

    const handleSync = async () => {
        if (!adminKey) {
            alert('Please enter the Admin Key to perform a sync operation.');
            return;
        }

        if (!window.confirm('This will push your current local data to the Cloud SQL database using a non-destructive UPSERT. Are you sure you want to proceed?')) {
            return;
        }

        setIsLoading(true);
        setLog([]);
        addLog('Starting data sync...');

        try {
            const dataToSync: Record<string, any> = {};
            
            const keysToSync = Object.values(LOCAL_STORAGE_KEYS);

            for (const storageKey of keysToSync) {
                // User data is managed via registration/admin page, not synced from a single admin's browser.
                if (storageKey === LOCAL_STORAGE_KEYS.USERS) {
                    addLog(`- Skipping user data sync (managed separately).`);
                    continue;
                }
                const data = localStorage.getItem(storageKey);
                if (data) {
                    try {
                        dataToSync[storageKey] = JSON.parse(data);
                        addLog(`📦 Packed data for: ${storageKey}`);
                    } catch {
                        addLog(`⚠️ Could not parse JSON for: ${storageKey}. Skipping.`);
                    }
                } else {
                     addLog(`- No data found for: ${storageKey}. Skipping.`);
                }
            }

            if (Object.keys(dataToSync).length === 0) {
                addLog('No local content data found to sync.');
                setIsLoading(false);
                return;
            }

            addLog('🚀 Sending data to server for synchronization...');

            const response = await fetch('/api/sync-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Admin-Key': adminKey,
                },
                body: JSON.stringify(dataToSync),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Sync failed with an unknown error.');
            }

            addLog(`✅ SUCCESS: ${result.message}`);

        } catch (err: any) {
            addLog(`❌ ERROR: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card-base bg-white border border-gray-200">
            <header className="aio-card-header !bg-sky-50 border-b-2 border-sky-200">
                <div>
                    <h3 className="text-xl font-bold text-sky-800">Data Synchronization</h3>
                    <p className="text-sm text-sky-600">Push all local content data from the browser to the live Cloud SQL database.</p>
                </div>
            </header>
            <div className="aio-card-body space-y-4">
                <div className="p-4 border-l-4 border-amber-400 bg-amber-50 text-amber-800 rounded-r-lg">
                    <p className="font-bold">Warning!</p>
                    <p className="text-sm">This is a powerful operation. It will UPSERT (update or insert) the content from your browser's local storage into the cloud database. Use this to deploy your curated content.</p>
                </div>
                <div>
                    <label htmlFor="admin-key" className="font-semibold text-gray-700 block mb-1">Admin Key</label>
                    <input
                        id="admin-key"
                        type="password"
                        value={adminKey}
                        onChange={(e) => setAdminKey(e.target.value)}
                        placeholder="Enter your secret admin key (e.g., 01111110)..."
                        className="form-input w-full"
                    />
                </div>
                <button onClick={handleSync} disabled={isLoading} className="btn w-full text-lg py-3 !bg-sky-600 hover:!bg-sky-700 text-white">
                     {isLoading ? <div className="ai-spinner mr-2"></div> : <RocketLaunchIcon className="w-6 h-6 mr-2"/>}
                    {isLoading ? `Syncing...` : `Sync Local Data to Cloud SQL`}
                </button>
                 {log.length > 0 && (
                    <div>
                        <h4 className="font-bold text-gray-700 mb-2">Sync Log:</h4>
                        <div className="w-full h-48 bg-gray-900 text-white font-mono text-xs rounded-lg p-3 overflow-y-auto">
                            {log.map((entry, index) => <p key={index} className={entry.includes('❌') ? 'text-red-400' : entry.includes('✅') ? 'text-green-400' : ''}>{entry}</p>)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataSync;
