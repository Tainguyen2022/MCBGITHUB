
import React, { useState } from 'react';
import { LOCAL_STORAGE_KEYS } from '../constants';

// Import AIO Components
import DataSectionEditor from '../components/aio/DataSectionEditor';
import AISingleContentFactory from '../components/aio/AIContentFactory';
import AIContentBulkFactory from '../components/aio/AIContentBulkFactory';
import DataSync from '../components/aio/DataSync'; // NEW: Import DataSync component

// Import Default Data for DataSectionEditor from their new locations
import { defaultUsers } from '../data/users';
import { defaultPrompts } from '../data/prompts';
import { speakingScenariosContent as defaultScenarios } from '../data/speaking_scenarios/content';
import { tips1to2 as defaultTipsData } from '../data/tips/tips1-2';
import { defaultCustomVocab } from '../data/customVocab';
import { defaultPracticeTests } from '../data/practiceTestData';
import { defaultStartersData } from '../data/cambridge/startersData';
import { foundationContent as defaultFoundationData } from '../data/writing_foundation/content';


const dataSections = [
    { title: 'Users', storageKey: LOCAL_STORAGE_KEYS.USERS, defaultData: defaultUsers },
    { title: 'AI Prompts', storageKey: LOCAL_STORAGE_KEYS.PROMPTS, defaultData: defaultPrompts },
    { title: 'Custom Vocab', storageKey: LOCAL_STORAGE_KEYS.CUSTOM_VOCAB, defaultData: defaultCustomVocab },
    { title: 'Practice Tests', storageKey: LOCAL_STORAGE_KEYS.PRACTICE_TESTS, defaultData: defaultPracticeTests },
    { title: 'Tips Data', storageKey: LOCAL_STORAGE_KEYS.TIPS_DATA, defaultData: defaultTipsData },
    // FIX: Corrected the storage key from FOUNDATION_DATA to WRITING_FOUNDATION_CONTENT.
    { title: 'Foundation Practice Data', storageKey: LOCAL_STORAGE_KEYS.WRITING_FOUNDATION_CONTENT, defaultData: defaultFoundationData },
    { title: 'Speaking Scenarios', storageKey: LOCAL_STORAGE_KEYS.SPEAKING_SCENARIOS_CONTENT, defaultData: defaultScenarios },
    { title: 'Cambridge: Starters', storageKey: LOCAL_STORAGE_KEYS.CAMBRIDGE_STARTERS_DATA, defaultData: defaultStartersData },
    // More keys can be added here
];


const AIOPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'sync' | 'ai' | 'data'>('sync');

    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <header className="text-center mb-10">
                <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
                    AIO Super Admin Panel
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    Tools for managing application data and generating content.
                </p>
            </header>

            <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex justify-center space-x-8" aria-label="Tabs">
                     <button
                        onClick={() => setActiveTab('sync')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
                            activeTab === 'sync' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Sync to Cloud
                    </button>
                    <button
                        onClick={() => setActiveTab('ai')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
                            activeTab === 'ai' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        AI Content Factory
                    </button>
                    <button
                        onClick={() => setActiveTab('data')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
                            activeTab === 'data' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Local Data Editor
                    </button>
                </nav>
            </div>
            
            {activeTab === 'sync' && (
                <DataSync />
            )}
            
            {activeTab === 'ai' && (
                <div className="space-y-12">
                   <AIContentBulkFactory />
                   <AISingleContentFactory />
                </div>
            )}

            {activeTab === 'data' && (
                <div className="space-y-6">
                    {dataSections.map(section => (
                        <DataSectionEditor key={section.storageKey} {...section} />
                    ))}
                </div>
            )}

        </div>
    );
};

export default AIOPage;