
import React, { useState, useMemo } from 'react';
import { loadOrInitializeData } from '../services/dataService';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { tips1to2 } from '../data/tips/tips1-2';
import { tips3to4 } from '../data/tips/tips3-4';
import { tips5to6 } from '../data/tips/tips5-6';
import { tips7to8 } from '../data/tips/tips7-8';
import { tips9to10 } from '../data/tips/tips9-10';
import { tips11to30 } from '../data/tips/tips11-30';
import { Tip, TipExampleItem, TipBilingualContent, CompactTip } from '../types';
import { SpeakerWaveIcon, XMarkIcon } from '../components/Icons';

const FullSampleModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    content: TipBilingualContent | null;
}> = ({ isOpen, onClose, content }) => {
    if (!isOpen || !content) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={onClose}>
            <div 
                className="card-base w-full max-w-2xl max-h-[85vh] flex flex-col bg-white"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
                    <h3 className="text-xl font-bold text-gray-800">Bài nói mẫu đầy đủ</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors p-1 rounded-full">
                        <XMarkIcon className="w-7 h-7"/>
                    </button>
                </header>
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                     <div>
                        <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">English</h4>
                        <div className="whitespace-pre-wrap font-serif text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.en }} />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">Tiếng Việt</h4>
                         <div className="whitespace-pre-wrap font-serif text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.vi }} />
                    </div>
                </div>
            </div>
        </div>
    );
};


const ExampleButton: React.FC<{
    item: TipExampleItem;
    onToggleShortSample: () => void;
    onViewFullSample: () => void;
    isActive: boolean;
    number: number;
}> = ({ item, onToggleShortSample, onViewFullSample, isActive, number }) => {
    return (
        <div className={`w-full text-left rounded-lg border-2 transition-all duration-200 flex items-stretch ${
                isActive
                    ? 'bg-green-600 border-green-700 text-white shadow-lg transform -translate-y-1'
                    : 'bg-white border-gray-200 text-gray-800 hover:border-green-400 hover:shadow-sm'
            }`}>
            <div className={`flex-shrink-0 w-12 flex items-center justify-center text-lg font-bold transition-colors ${isActive ? 'text-green-200' : 'text-gray-400'}`}>
                {number}
            </div>
            <button onClick={onToggleShortSample} className={`flex-grow p-3 text-left border-l-2 transition-colors ${isActive ? 'border-green-500' : 'border-gray-200'}`}>
                <p className="font-semibold">{item.phrase.en}</p>
                <p className="text-sm opacity-80">{item.phrase.vi}</p>
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); onViewFullSample(); }} 
                className={`flex-shrink-0 px-3 border-l-2 flex items-center justify-center text-xs font-semibold uppercase tracking-wider transition-colors ${isActive ? 'border-green-500 hover:bg-green-700 text-green-100' : 'border-gray-200 hover:bg-gray-100 text-gray-500'}`}
                title="Xem bài nói mẫu đầy đủ"
            >
                Xem Mẫu
            </button>
        </div>
    );
};


const SampleSpeechDisplay: React.FC<{ item: TipExampleItem }> = ({ item }) => (
    <div className="mt-4 p-5 bg-green-50/50 border border-green-200 rounded-xl space-y-3 animate-fade-in">
        <div>
            <h5 className="font-bold text-green-800 text-base mb-1 flex items-center">
                <SpeakerWaveIcon className="w-5 h-5 mr-2" />
                Sample Application (EN)
            </h5>
            <p className="text-gray-800 font-serif leading-relaxed pl-1">{item.sampleSpeech.en}</p>
        </div>
        <div>
            <h5 className="font-bold text-green-700 text-base mb-1">Áp dụng mẫu (VI)</h5>
            <p className="text-gray-600 font-serif leading-relaxed pl-1">{item.sampleSpeech.vi}</p>
        </div>
    </div>
);


const SituationCard: React.FC<{ data: Tip }> = ({ data }) => {
    const [activeExample65, setActiveExample65] = useState<TipExampleItem | null>(null);
    const [activeExample75, setActiveExample75] = useState<TipExampleItem | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<TipBilingualContent | null>(null);

    const handleViewFullSample = (content: TipBilingualContent) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    return (
        <div className="card-base p-6 lg:p-8 mb-8">
            <FullSampleModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                content={modalContent}
            />

            <h3 className="text-2xl font-bold text-gray-900 mb-2">{data.id}. {data.title}</h3>
            <div className="text-lg text-gray-600 italic mb-6 p-4 bg-gray-100 rounded-xl border border-gray-200">
                <strong>Tình huống:</strong> <span dangerouslySetInnerHTML={{ __html: data.situation }} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Band 6.5 */}
                <div className="bg-white rounded-xl p-5 border-l-4 border-sky-400 shadow-sm">
                    <div className="mb-4">
                        <h4 className="font-extrabold text-sky-700 text-xl">Band 6.5</h4>
                        <div className="text-sky-900 mt-1">
                            <p className="font-semibold">{data.solution65.en}</p>
                            <p className="text-sm text-gray-500 pl-2">– {data.solution65.vi}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {data.examples65.map((ex, index) => (
                            <ExampleButton 
                                key={index} 
                                number={index + 1}
                                item={ex} 
                                onToggleShortSample={() => setActiveExample65(ex === activeExample65 ? null : ex)}
                                onViewFullSample={() => handleViewFullSample(ex.fullSampleSpeech)}
                                isActive={activeExample65 === ex}
                            />
                        ))}
                    </div>
                    {activeExample65 && <SampleSpeechDisplay item={activeExample65} />}
                </div>

                {/* Band 7.5+ */}
                <div className="bg-white rounded-xl p-5 border-l-4 border-emerald-400 shadow-sm">
                     <div className="mb-4">
                        <h4 className="font-extrabold text-emerald-700 text-xl">Band 7.5+</h4>
                        <div className="text-emerald-900 mt-1">
                            <p className="font-semibold">{data.solution75.en}</p>
                            <p className="text-sm text-gray-500 pl-2">– {data.solution75.vi}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {data.examples75.map((ex, index) => (
                             <ExampleButton 
                                key={index} 
                                number={index + 1}
                                item={ex} 
                                onToggleShortSample={() => setActiveExample75(ex === activeExample75 ? null : ex)}
                                onViewFullSample={() => handleViewFullSample(ex.fullSampleSpeech)}
                                isActive={activeExample75 === ex}
                            />
                        ))}
                    </div>
                    {activeExample75 && <SampleSpeechDisplay item={activeExample75} />}
                </div>
            </div>
        </div>
    );
};

const CompactTipRow: React.FC<{ tip: CompactTip }> = ({ tip }) => (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 py-3 border-b border-gray-200 last:border-b-0">
        <div className="font-bold text-gray-800">{tip.id}. {tip.problem}</div>
        <div className="text-gray-600">{tip.solution}</div>
    </div>
);


const removeDiacritics = (str: string): string => {
  if (!str) return '';
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};


const TipsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const tipsData = useMemo(() => {
        const t1 = loadOrInitializeData<Tip[]>(LOCAL_STORAGE_KEYS.TIPS_1_2, tips1to2);
        const t2 = loadOrInitializeData<Tip[]>(LOCAL_STORAGE_KEYS.TIPS_3_4, tips3to4);
        const t3 = loadOrInitializeData<Tip[]>(LOCAL_STORAGE_KEYS.TIPS_5_6, tips5to6);
        const t4 = loadOrInitializeData<Tip[]>(LOCAL_STORAGE_KEYS.TIPS_7_8, tips7to8);
        const t5 = loadOrInitializeData<Tip[]>(LOCAL_STORAGE_KEYS.TIPS_9_10, tips9to10);
        return [...t1, ...t2, ...t3, ...t4, ...t5];
    }, []);

    const compactTipsData = useMemo(() => loadOrInitializeData<CompactTip[]>(LOCAL_STORAGE_KEYS.TIPS_11_30, tips11to30), []);

    const filteredTips = useMemo(() => {
        if (!searchQuery.trim()) return tipsData;
        const normalizedQuery = removeDiacritics(searchQuery);
        return tipsData.filter(tip => {
            const content = [
                tip.title, 
                tip.situation, 
                tip.solution65.en, 
                tip.solution65.vi, 
                tip.solution75.en, 
                tip.solution75.vi, 
                ...tip.examples65.flatMap(ex => [ex.phrase.en, ex.phrase.vi, ex.sampleSpeech.en, ex.sampleSpeech.vi, ex.fullSampleSpeech.en, ex.fullSampleSpeech.vi]), 
                ...tip.examples75.flatMap(ex => [ex.phrase.en, ex.phrase.vi, ex.sampleSpeech.en, ex.sampleSpeech.vi, ex.fullSampleSpeech.en, ex.fullSampleSpeech.vi])
            ].join(' ').toLowerCase();
            const normalizedContent = removeDiacritics(content);
            return normalizedContent.includes(normalizedQuery);
        });
    }, [searchQuery, tipsData]);
    
    const filteredCompactTips = useMemo(() => {
        if (!searchQuery.trim()) return compactTipsData;
        const normalizedQuery = removeDiacritics(searchQuery);
         return compactTipsData.filter(tip => {
            const content = [tip.problem, tip.solution].join(' ').toLowerCase();
            const normalizedContent = removeDiacritics(content);
            return normalizedContent.includes(normalizedQuery);
        });
    }, [searchQuery, compactTipsData]);

    const showCompactTips = filteredCompactTips.length > 0 || !searchQuery.trim();

    return (
        <div className="bg-gray-50/50 pt-12 pb-12 min-h-screen">
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>
            <div className="mb-12 w-full px-4 sticky top-[96px] z-40">
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Tìm kiếm tuyệt kỹ, tình huống, giải pháp..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="form-input text-lg pl-12 py-3 shadow-lg"
                        aria-label="Search tips"
                    />
                     <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
            </div>
            
            <main>
                {filteredTips.length > 0 ? (
                    filteredTips.map(tip => (
                        <SituationCard key={tip.id} data={tip} />
                    ))
                ) : (
                     <div className="text-center py-8">
                        <p className="text-lg font-semibold text-gray-600">Không tìm thấy mẹo nào phù hợp trong các tình huống chi tiết.</p>
                    </div>
                )}

                {showCompactTips && (
                    <div className="card-base p-6 lg:p-8 mb-8 mt-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Mẹo Nhanh Bổ Sung</h3>
                        <div className="bg-white rounded-xl p-5 border border-gray-200">
                             {filteredCompactTips.map(tip => (
                                <CompactTipRow key={tip.id} tip={tip} />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TipsPage;
