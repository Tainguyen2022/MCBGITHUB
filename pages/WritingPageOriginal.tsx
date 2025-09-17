import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
// Import base data
import { writingPracticeData as defaultWritingData } from '../data/writingPracticeData';
import { foundationPracticeData as defaultFoundationData } from '../data/foundationPracticeData';
// Import types
import { WritingCategory, WritingSubcategory, WritingSeed, PracticeMode, FoundationTopic, FoundationPracticeData, AIGeneratedTopic, AIGrammarFeedback, AISuggestionsFeedback, AIGeneratedTemplate, RewriteAction, AIRewriteResponse, WritingVocabItem, AIGrammarError, BilingualWord, BilingualText } from '../types';
import { generateNewPracticeItem, generateMorePracticeQuestions, generateWritingTemplate, checkGrammar, suggestImprovements, rewriteText } from '../services/aiService';
import { loadOrInitializeData, saveData } from '../services/dataService';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { 
    AcademicCapIcon, SparklesIcon, MagicWandIcon, BookOpenIcon, ListBulletIcon, EyeIcon, LightBulbIcon, CheckBadgeIcon, XMarkIcon, ChevronDownIcon, CheckCircleIcon
} from '../components/Icons';
import GcsImage from '../components/GcsImage';
import { getWritingPageState, saveWritingPageState } from '../services/userStateService';
import { useAuth } from '../App';

// --- Helper Types ---
interface PracticeItem {
    id: string;
    shortLabel: string;
    longPrompt: React.ReactNode;
    practiceData?: Partial<FoundationPracticeData>;
    originalSeed: WritingSeed | FoundationTopic;
    sample_answer_en?: string;
    sample_answer_vi?: string;
    sample_outline_en?: string;
    sample_outline_vi?: string;
    vocabulary?: any[];
}

// Simple UnifiedPracticeView component
const UnifiedPracticeView: React.FC<{
    items: PracticeItem[];
    subcategory: WritingSubcategory | null;
    onItemsUpdate: () => void;
    isFoundation: boolean;
    selectedTrackId: string;
}> = ({ items, subcategory, onItemsUpdate, isFoundation, selectedTrackId }) => {
    const [currentItem, setCurrentItem] = useState<PracticeItem | null>(null);
    const [practiceMode, setPracticeMode] = useState<PracticeMode>('reorder');
    const [freeWriteInput, setFreeWriteInput] = useState('');

    useEffect(() => {
        if (items.length > 0 && (!currentItem || !items.some(item => item.id === currentItem.id))) {
            setCurrentItem(items[0]);
        }
    }, [items, currentItem]);

    const modes: { id: PracticeMode; label: string }[] = [
        { id: 'reorder', label: 'Sắp xếp' },
        { id: 'fill_blank', label: 'Điền từ' },
        { id: 'find_error', label: 'Tìm lỗi sai' },
        { id: 'choose_phrase', label: 'Chọn cụm từ' },
        { id: 'matching', label: 'Nối cột' },
        { id: 'drag_drop', label: 'Kéo thả' },
        { id: 'free_write', label: 'Tự viết' }
    ];

    const renderPracticeArea = () => {
        if (!currentItem) return <div className="p-4 text-center text-gray-500">Vui lòng chọn một tình huống hoặc cấu trúc.</div>;

        if (practiceMode === 'free_write') {
            return (
                <div className="space-y-4">
                    <textarea
                        value={freeWriteInput}
                        onChange={(e) => setFreeWriteInput(e.target.value)}
                        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                        placeholder="Bắt đầu viết bài của bạn ở đây..."
                    />
                    <div className="flex gap-2 flex-wrap">
                        <button className="btn btn-primary flex items-center gap-2">
                            <SparklesIcon className="w-4 h-4" />
                            Kiểm tra ngữ pháp
                        </button>
                        <button className="btn btn-secondary flex items-center gap-2">
                            <LightBulbIcon className="w-4 h-4" />
                            Gợi ý cải thiện
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="text-center py-8">
                <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    {modes.find(m => m.id === practiceMode)?.label}
                </h4>
                <p className="text-gray-600">
                    Tính năng đang được phát triển
                </p>
            </div>
        );
    };

    return (
        <div>
            <div className="practice-studio-grid">
                <div className="practice-list-panel flex flex-col">
                    <h3 className="font-bold text-lg text-center mb-2 border-b pb-2 flex-shrink-0">Đề thi</h3>
                    <div className="flex-grow overflow-y-auto pr-2 -mr-2 max-h-[65vh] space-y-1">
                        {isFoundation ? (
                            // Group foundation items by category
                            Object.entries(items.reduce((acc, item) => {
                                const topic = item.originalSeed as FoundationTopic;
                                const category = topic.category || 'Other';
                                if (!acc[category]) acc[category] = [];
                                acc[category].push(item);
                                return acc;
                            }, {} as Record<string, PracticeItem[]>)).map(([category, categoryItems]) => (
                                <div key={category}>
                                    <h4 className="font-bold text-gray-500 mt-4 mb-1 px-1">{category}</h4>
                                    {categoryItems.map((item) => (
                                        <button 
                                            key={item.id} 
                                            onClick={() => setCurrentItem(item)} 
                                            className={`w-full text-left p-3 rounded-lg transition-all font-medium mb-1 ${
                                                currentItem?.id === item.id 
                                                    ? 'bg-pink-500 text-white shadow-md' 
                                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                            }`}
                                        >
                                            <span className="truncate">{item.shortLabel}</span>
                                        </button>
                                    ))}
                                </div>
                            ))
                        ) : (
                            items.map((item) => (
                                <button 
                                    key={item.id} 
                                    onClick={() => setCurrentItem(item)} 
                                    className={`w-full text-left p-3 rounded-lg transition-all font-medium mb-2 ${
                                        currentItem?.id === item.id 
                                            ? 'bg-pink-500 text-white shadow-md' 
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                    }`}
                                >
                                    <span className="truncate">{item.shortLabel}</span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
                
                <div className="resizer-col"></div>
                
                <div className="practice-area-panel">
                    {currentItem ? (
                        <>
                            <div className="prompt-display-area">
                                {/* Image for IELTS Task 1 */}
                                {selectedTrackId === 'IELTS' && subcategory?.task_type === 'Task 1' && (
                                    <div className="mb-4">
                                        <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                            <div className="text-center">
                                                <EyeIcon className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                                                <p className="text-gray-500 font-medium">Image Placeholder</p>
                                                <p className="text-sm text-gray-400 mt-1">
                                                    ({subcategory?.subcategory_name_vi} chart will appear here)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {currentItem.longPrompt}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                {modes.map(mode => (
                                    <div key={mode.id} className="mode-selector-container">
                                        <button 
                                            onClick={() => setPracticeMode(mode.id)} 
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                                practiceMode === mode.id 
                                                    ? 'bg-pink-500 text-white shadow-md' 
                                                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {mode.label}
                                        </button>
                                        {mode.id !== 'free_write' && (
                                            <button 
                                                className="btn-ai-generate-exercise ml-1" 
                                                title={`AI tạo thêm bài tập ${mode.label}`}
                                            >
                                                <SparklesIcon className="w-4 h-4"/>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex-grow flex flex-col">
                                {renderPracticeArea()}
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-gray-500 py-10">
                            Chọn một bài thực hành từ danh sách bên trái để bắt đầu.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const WritingPageOriginal: React.FC = () => {
    const location = useLocation();
    const navState = location.state as { track_id: string; subcategory_id: string } | null;

    const savedState = getWritingPageState();
    const [selectedTrackId, setSelectedTrackId] = useState<string>(navState?.track_id ?? savedState?.selectedTrackId ?? 'EASY');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(navState?.subcategory_id ?? savedState?.selectedSubcategoryId ?? null);
    const [foundationLevelFilter, setFoundationLevelFilter] = useState<'all' | 'easy' | 'medium' | 'advanced'>(savedState?.foundationLevelFilter ?? 'all');

    // Load base data with fallbacks
    const baseWritingData = useMemo(() => {
        try {
            return loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_DATA, defaultWritingData);
        } catch (error) {
            return defaultWritingData;
        }
    }, []);

    const [foundationData, setFoundationData] = useState<FoundationTopic[]>(() => {
        try {
            return loadOrInitializeData(LOCAL_STORAGE_KEYS.FOUNDATION_DATA, defaultFoundationData);
        } catch (error) {
            return defaultFoundationData;
        }
    });

    // Create simplified writing data structure
    const writingData = useMemo<WritingCategory[]>(() => {
        return baseWritingData;
    }, [baseWritingData]);

    const allTracks = useMemo(() => {
        const examTracks = writingData.filter(t => !['EASY', 'AI_WRITING_ASSISTANT'].includes(t.category_id));
        return [
            { category_id: 'EASY', track_name_vi: 'Kỹ năng Nền tảng', subcategories: [] },
            ...examTracks,
            { category_id: 'AI_WRITING_ASSISTANT', track_name_vi: 'Trợ lý Viết AI', subcategories: [] }
        ];
    }, [writingData]);

    const selectedTrack = useMemo(() => allTracks.find(t => t.category_id === selectedTrackId), [allTracks, selectedTrackId]);
    const selectedSubcategory = useMemo(() => {
        const track = writingData.find(t => t.category_id === selectedTrackId);
        return track?.subcategories.find(s => s.subcategory_id === selectedSubcategoryId) || null;
    }, [writingData, selectedTrackId, selectedSubcategoryId]);

    // Auto-select first subcategory when track changes
    useEffect(() => {
        if (selectedTrack && selectedTrack.subcategories.length > 0) {
            const currentSubcategoryExists = selectedTrack.subcategories.some(s => s.subcategory_id === selectedSubcategoryId);
            if (!currentSubcategoryExists) {
                setSelectedSubcategoryId(selectedTrack.subcategories[0].subcategory_id);
            }
        } else if (selectedTrackId !== 'EASY' && selectedTrackId !== 'AI_WRITING_ASSISTANT') {
            setSelectedSubcategoryId(null);
        }
    }, [selectedTrack, selectedSubcategoryId, selectedTrackId]);

    // Save state
    useEffect(() => {
        const stateToSave = {
            selectedTrackId,
            selectedSubcategoryId,
            foundationLevelFilter
        };
        saveWritingPageState(stateToSave);
    }, [selectedTrackId, selectedSubcategoryId, foundationLevelFilter]);

    const currentPracticeItems = useMemo<PracticeItem[]>(() => {
        if (selectedTrackId === 'EASY') {
            const filteredData = foundationLevelFilter === 'all' 
                ? foundationData 
                : foundationData.filter(topic => topic.level === foundationLevelFilter);
                
            return filteredData.map(topic => ({
                id: topic.id, 
                shortLabel: topic.name_vi,
                longPrompt: (
                    <div>
                        <h4 className="font-bold text-gray-800 text-base leading-tight">{topic.name_vi}</h4>
                        <p className="text-gray-500 text-sm italic mt-1">"{topic.name_en}"</p>
                        <p className="text-sm text-gray-800 mt-2"><b>Câu đúng:</b> {topic.sentence}</p>
                    </div>
                ),
                practiceData: topic.practice, 
                originalSeed: topic
            }));
        }
        if (selectedSubcategory) {
            return selectedSubcategory.seeds.map(seed => ({
                id: seed.code, 
                shortLabel: seed.prompt_vi_short || seed.prompt_vi,
                longPrompt: (
                     <div>
                        <h4 className="font-bold text-gray-800 text-base leading-tight">{seed.prompt_vi}</h4>
                        <p className="text-gray-500 text-sm italic mt-1">"{seed.prompt_en}"</p>
                    </div>
                ),
                practiceData: seed.practice, 
                originalSeed: seed,
                sample_answer_en: seed.sample_answer_en,
                sample_answer_vi: seed.sample_answer_vi,
                sample_outline_en: seed.sample_outline_en,
                sample_outline_vi: seed.sample_outline_vi,
                vocabulary: seed.vocabulary,
            }));
        }
        return [];
    }, [selectedTrackId, selectedSubcategory, foundationData, foundationLevelFilter]);

    const renderContent = () => {
        if (selectedTrackId === 'AI_WRITING_ASSISTANT') {
            return (
                <div className="text-center py-16">
                    <SparklesIcon className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Template Generator</h3>
                    <p className="text-gray-600">Tính năng đang được cập nhật</p>
                </div>
            );
        }

        if (currentPracticeItems.length > 0 || (selectedTrack && selectedTrack.subcategories.length > 0) || selectedTrackId === 'EASY') {
            return (
                <UnifiedPracticeView 
                    items={currentPracticeItems} 
                    subcategory={selectedSubcategory}
                    onItemsUpdate={() => {}} // Simplified
                    isFoundation={selectedTrackId === 'EASY'}
                    selectedTrackId={selectedTrackId}
                />
            );
        }

        return <div className="text-center text-gray-500 py-10">Select a category to begin.</div>;
    };

    const levelFilters: { id: 'all' | 'easy' | 'medium' | 'advanced'; label: string }[] = [
        { id: 'all', label: 'Tất cả' },
        { id: 'easy', label: 'Căn bản' },
        { id: 'medium', label: 'Trung bình' },
        { id: 'advanced', label: 'Nâng cao' },
    ];
    
    const trackForSubcategories = writingData.find(t => t.category_id === selectedTrackId);

    return (
        <div className="writing-studio bg-gray-50/50 -m-8 p-8 min-h-screen">
            <div className="flex flex-wrap justify-center mb-10 p-2 bg-gray-200/70 rounded-full gap-1">
                {allTracks.map(track => (
                    <button 
                        key={track.category_id} 
                        onClick={() => setSelectedTrackId(track.category_id)} 
                        className={`px-6 py-3 text-base font-semibold rounded-full transition-all duration-200 ease-in-out focus:outline-none ${
                            selectedTrackId === track.category_id 
                                ? 'bg-white text-green-700 shadow-md' 
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        {track.track_name_vi}
                    </button>
                ))}
            </div>

            <main>
                {selectedTrackId === 'EASY' && (
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {levelFilters.map(filter => (
                            <button 
                                key={filter.id} 
                                onClick={() => setFoundationLevelFilter(filter.id)} 
                                className={`level-filter-btn ${
                                    foundationLevelFilter === filter.id ? 'level-filter-btn--active' : ''
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                )}
                
                {trackForSubcategories && trackForSubcategories.subcategories.length > 0 && selectedTrackId !== 'AI_WRITING_ASSISTANT' && (
                    <div className="mb-8">
                        {selectedTrackId === 'IELTS' ? (
                            // Special layout for IELTS: Task 1 on top, Task 2 on bottom
                            <div className="space-y-4">
                                {/* Task 1 Row */}
                                <div className="flex flex-wrap justify-center gap-2">
                                    {trackForSubcategories.subcategories
                                        .filter(sub => sub.task_type === 'Task 1')
                                        .map(sub => (
                                            <button 
                                                key={sub.subcategory_id} 
                                                onClick={() => setSelectedSubcategoryId(sub.subcategory_id)} 
                                                className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-colors ${
                                                    selectedSubcategoryId === sub.subcategory_id 
                                                        ? 'bg-green-600 text-white border-transparent' 
                                                        : 'bg-white text-green-700 border-green-600 hover:bg-green-50'
                                                }`}
                                            >
                                                {sub.subcategory_name_vi}
                                            </button>
                                        ))}
                                </div>
                                
                                {/* Task 2 Row */}
                                <div className="flex flex-wrap justify-center gap-2">
                                    {trackForSubcategories.subcategories
                                        .filter(sub => sub.task_type === 'Task 2')
                                        .map(sub => (
                                            <button 
                                                key={sub.subcategory_id} 
                                                onClick={() => setSelectedSubcategoryId(sub.subcategory_id)} 
                                                className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-colors ${
                                                    selectedSubcategoryId === sub.subcategory_id 
                                                        ? 'bg-green-600 text-white border-transparent' 
                                                        : 'bg-white text-green-700 border-green-600 hover:bg-green-50'
                                                }`}
                                            >
                                                {sub.subcategory_name_vi}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        ) : (
                            // Normal single row layout for other exams
                            <div className="flex flex-wrap justify-center gap-2">
                                {trackForSubcategories.subcategories.map(sub => (
                                    <button 
                                        key={sub.subcategory_id} 
                                        onClick={() => setSelectedSubcategoryId(sub.subcategory_id)} 
                                        className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-colors ${
                                            selectedSubcategoryId === sub.subcategory_id 
                                                ? 'bg-green-600 text-white border-transparent' 
                                                : 'bg-white text-green-700 border-green-600 hover:bg-green-50'
                                        }`}
                                    >
                                        {sub.subcategory_name_vi}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                
                {renderContent()}
            </main>
        </div>
    );
};

export default WritingPageOriginal;
