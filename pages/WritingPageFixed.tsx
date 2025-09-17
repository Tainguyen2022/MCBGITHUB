import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadOrInitializeData, saveData } from '../services/dataService';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { 
    AcademicCapIcon, SparklesIcon, BookOpenIcon, CheckBadgeIcon, XMarkIcon, CheckCircleIcon
} from '../components/Icons';
import { useAuth } from '../App';

// Import types
import { WritingCategory, WritingSubcategory, WritingSeed, PracticeMode, FoundationTopic } from '../types';

// Import data with fallbacks
const defaultWritingData: WritingCategory[] = [
    {
        category_id: 'IELTS',
        track_name_vi: 'Luyện thi IELTS',
        subcategories: [
            {
                subcategory_id: 'task1_line',
                subcategory_name_vi: 'Task 1 - Line Graph',
                objective_vi: 'Mô tả biểu đồ đường',
                task_type: 'Task 1',
                track_id: 'IELTS',
                seeds: [
                    {
                        code: 'IELTS_T1_LINE_001',
                        topic: 'Population Growth',
                        prompt_en: 'The line graph shows population growth in three cities from 2000 to 2020.',
                        prompt_vi: 'Biểu đồ đường thể hiện sự tăng trưởng dân số ở ba thành phố từ 2000 đến 2020.',
                        prompt_vi_short: 'Mô tả biểu đồ tăng trưởng dân số',
                        must_use: ['increased', 'decreased', 'remained stable'],
                        focus: 'Describing trends and changes over time',
                        sample_answer_en: 'The line graph illustrates population changes in three major cities over a 20-year period...',
                        sample_answer_vi: 'Biểu đồ đường minh họa sự thay đổi dân số ở ba thành phố lớn trong khoảng thời gian 20 năm...',
                        sample_outline_en: '1. Introduction\n2. Overview\n3. Body paragraph 1\n4. Body paragraph 2',
                        sample_outline_vi: '1. Giới thiệu\n2. Tổng quan\n3. Đoạn thân bài 1\n4. Đoạn thân bài 2',
                        vocabulary: [
                            { en: 'increased', vi: 'tăng', type: 'verb' },
                            { en: 'decreased', vi: 'giảm', type: 'verb' },
                            { en: 'remained stable', vi: 'ổn định', type: 'phrase' }
                        ],
                        practice: {}
                    }
                ]
            },
            {
                subcategory_id: 'task2_opinion',
                subcategory_name_vi: 'Task 2 - Opinion Essay',
                objective_vi: 'Viết bài luận bày tỏ quan điểm',
                task_type: 'Task 2',
                track_id: 'IELTS',
                seeds: [
                    {
                        code: 'IELTS_T2_OPINION_001',
                        topic: 'Technology and Education',
                        prompt_en: 'Some people think that technology has made learning easier. To what extent do you agree or disagree?',
                        prompt_vi: 'Một số người cho rằng công nghệ đã làm cho việc học tập dễ dàng hơn. Bạn đồng ý hay không đồng ý ở mức độ nào?',
                        prompt_vi_short: 'Công nghệ và giáo dục',
                        must_use: ['in my opinion', 'furthermore', 'however'],
                        focus: 'Expressing personal opinion with clear arguments',
                        sample_answer_en: 'In my opinion, technology has significantly improved the learning experience...',
                        sample_answer_vi: 'Theo quan điểm của tôi, công nghệ đã cải thiện đáng kể trải nghiệm học tập...',
                        sample_outline_en: '1. Introduction with thesis\n2. Body paragraph 1 - Advantages\n3. Body paragraph 2 - Counter-argument\n4. Conclusion',
                        sample_outline_vi: '1. Giới thiệu với luận điểm\n2. Đoạn thân bài 1 - Ưu điểm\n3. Đoạn thân bài 2 - Phản biện\n4. Kết luận',
                        vocabulary: [
                            { en: 'significantly', vi: 'đáng kể', type: 'adverb' },
                            { en: 'furthermore', vi: 'hơn nữa', type: 'connector' },
                            { en: 'however', vi: 'tuy nhiên', type: 'connector' }
                        ],
                        practice: {}
                    }
                ]
            }
        ]
    },
    {
        category_id: 'TOEIC',
        track_name_vi: 'Luyện thi TOEIC',
        subcategories: [
            {
                subcategory_id: 'part1_picture',
                subcategory_name_vi: 'Part 1 - Picture Description',
                objective_vi: 'Mô tả hình ảnh trong 30 giây',
                task_type: 'Part 1',
                track_id: 'TOEIC',
                seeds: [
                    {
                        code: 'TOEIC_P1_001',
                        topic: 'Office Scene',
                        prompt_en: 'Describe what you see in the office picture.',
                        prompt_vi: 'Mô tả những gì bạn thấy trong hình văn phòng.',
                        prompt_vi_short: 'Mô tả cảnh văn phòng',
                        must_use: ['people are', 'there is', 'in the background'],
                        focus: 'Present continuous and present simple',
                        sample_answer_en: 'In the picture, there are several people working in an office...',
                        sample_answer_vi: 'Trong hình, có nhiều người đang làm việc trong văn phòng...',
                        vocabulary: [
                            { en: 'office', vi: 'văn phòng', type: 'noun' },
                            { en: 'computer', vi: 'máy tính', type: 'noun' },
                            { en: 'meeting', vi: 'cuộc họp', type: 'noun' }
                        ],
                        practice: {}
                    }
                ]
            }
        ]
    }
];

const WritingPageFixed: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    
    const [selectedTrackId, setSelectedTrackId] = useState<string>('IELTS');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);
    const [practiceMode, setPracticeMode] = useState<PracticeMode>('free_write');
    const [currentSeed, setCurrentSeed] = useState<WritingSeed | null>(null);
    const [userInput, setUserInput] = useState('');
    const [showSampleAnswer, setShowSampleAnswer] = useState(false);
    const [showOutline, setShowOutline] = useState(false);
    const [showVocabulary, setShowVocabulary] = useState(false);

    // Load writing data with fallback
    const writingData = useMemo(() => {
        try {
            return loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_DATA, defaultWritingData);
        } catch (error) {
            console.warn('Using default writing data due to load error:', error);
            return defaultWritingData;
        }
    }, []);

    const selectedTrack = useMemo(() => 
        writingData.find(t => t.category_id === selectedTrackId), 
        [writingData, selectedTrackId]
    );

    const selectedSubcategory = useMemo(() => 
        selectedTrack?.subcategories.find(s => s.subcategory_id === selectedSubcategoryId) || null,
        [selectedTrack, selectedSubcategoryId]
    );

    const availableSeeds = useMemo(() => 
        selectedSubcategory?.seeds || [],
        [selectedSubcategory]
    );

    useEffect(() => {
        if (selectedSubcategory && availableSeeds.length > 0 && !currentSeed) {
            setCurrentSeed(availableSeeds[0]);
        }
    }, [selectedSubcategory, availableSeeds, currentSeed]);

    const handleTrackChange = useCallback((trackId: string) => {
        setSelectedTrackId(trackId);
        setSelectedSubcategoryId(null);
        setCurrentSeed(null);
        setUserInput('');
    }, []);

    const handleSubcategoryChange = useCallback((subcategoryId: string) => {
        setSelectedSubcategoryId(subcategoryId);
        setCurrentSeed(null);
        setUserInput('');
    }, []);

    const handleSeedChange = useCallback((seed: WritingSeed) => {
        setCurrentSeed(seed);
        setUserInput('');
        setShowSampleAnswer(false);
        setShowOutline(false);
        setShowVocabulary(false);
    }, []);

    return (
        <div className="writing-studio bg-slate-50 -m-8 px-4 pt-20 pb-12 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="text-center mb-10">
                    <h1 className="header-title text-5xl font-extrabold tracking-tight mb-4">
                        ✍️ Writing Studio
                    </h1>
                    <p className="header-subtitle text-xl mb-8">
                        Luyện viết IELTS, TOEIC, VSTEP với AI feedback thông minh
                    </p>
                </header>

                {/* Track Selection */}
                <div className="flex justify-center mb-8">
                    <div className="flex bg-white rounded-xl p-2 shadow-lg">
                        {writingData.map(track => (
                            <button
                                key={track.category_id}
                                onClick={() => handleTrackChange(track.category_id)}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                    selectedTrackId === track.category_id
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {track.track_name_vi}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Subcategory Selection */}
                {selectedTrack && (
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                            Chọn dạng bài {selectedTrack.track_name_vi}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {selectedTrack.subcategories.map(subcategory => (
                                <button
                                    key={subcategory.subcategory_id}
                                    onClick={() => handleSubcategoryChange(subcategory.subcategory_id)}
                                    className={`track-card p-6 text-left transition-all ${
                                        selectedSubcategoryId === subcategory.subcategory_id
                                            ? 'border-green-500 bg-green-50'
                                            : 'hover:border-green-300'
                                    }`}
                                >
                                    <h4 className="font-bold text-gray-800 mb-2">
                                        {subcategory.subcategory_name_vi}
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {subcategory.objective_vi}
                                    </p>
                                    <div className="text-xs text-green-600 font-medium">
                                        {subcategory.seeds?.length || 0} bài tập
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Practice Area */}
                {currentSeed && (
                    <div className="practice-studio-grid">
                        {/* Left Panel - Prompt */}
                        <div className="practice-list-panel">
                            <div className="mb-4">
                                <h4 className="font-bold text-gray-800 mb-2">📝 Đề bài</h4>
                                <div className="prompt-display-area">
                                    <h5 className="font-semibold text-green-800 mb-2">
                                        {currentSeed.topic}
                                    </h5>
                                    <p className="text-gray-700 mb-3">
                                        {currentSeed.prompt_vi}
                                    </p>
                                    <p className="text-sm text-gray-600 italic">
                                        {currentSeed.prompt_en}
                                    </p>
                                </div>
                            </div>

                            {/* Seed Selection */}
                            <div className="mb-4">
                                <h5 className="font-semibold text-gray-700 mb-2">Chọn đề khác:</h5>
                                <div className="space-y-2">
                                    {availableSeeds.map(seed => (
                                        <button
                                            key={seed.code}
                                            onClick={() => handleSeedChange(seed)}
                                            className={`sentence-list-item w-full ${
                                                currentSeed.code === seed.code ? 'sentence-list-item--active' : ''
                                            }`}
                                        >
                                            <div className="font-medium">{seed.topic}</div>
                                            <div className="text-sm opacity-80">{seed.prompt_vi_short}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Helper Panels */}
                            <div className="space-y-4">
                                <button
                                    onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                                    className="w-full text-left p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-green-800">📖 Bài mẫu</span>
                                        <span className="text-green-600">{showSampleAnswer ? '−' : '+'}</span>
                                    </div>
                                </button>
                                
                                {showSampleAnswer && currentSeed.sample_answer_vi && (
                                    <div className="sample-answer p-4">
                                        <h6 className="font-semibold mb-2">Bài mẫu tiếng Việt:</h6>
                                        <p className="text-sm mb-3">{currentSeed.sample_answer_vi}</p>
                                        <h6 className="font-semibold mb-2">Sample Answer English:</h6>
                                        <p className="text-sm">{currentSeed.sample_answer_en}</p>
                                    </div>
                                )}

                                <button
                                    onClick={() => setShowOutline(!showOutline)}
                                    className="w-full text-left p-3 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-amber-800">📋 Dàn bài</span>
                                        <span className="text-amber-600">{showOutline ? '−' : '+'}</span>
                                    </div>
                                </button>
                                
                                {showOutline && currentSeed.sample_outline_vi && (
                                    <div className="outline-panel p-4">
                                        <h6 className="font-semibold mb-2">Dàn bài:</h6>
                                        <pre className="text-sm whitespace-pre-wrap">{currentSeed.sample_outline_vi}</pre>
                                    </div>
                                )}

                                <button
                                    onClick={() => setShowVocabulary(!showVocabulary)}
                                    className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-blue-800">📚 Từ vựng</span>
                                        <span className="text-blue-600">{showVocabulary ? '−' : '+'}</span>
                                    </div>
                                </button>
                                
                                {showVocabulary && currentSeed.vocabulary && (
                                    <div className="vocab-panel p-4">
                                        <div className="space-y-2">
                                            {currentSeed.vocabulary.map((vocab, index) => (
                                                <div key={index} className="flex justify-between items-center">
                                                    <span className="font-medium text-blue-800">{vocab.en}</span>
                                                    <span className="text-blue-600">{vocab.vi}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Resizer */}
                        <div className="resizer-col"></div>

                        {/* Right Panel - Practice Area */}
                        <div className="practice-area-panel">
                            <div className="mb-4">
                                <h4 className="font-bold text-gray-800 mb-3">✍️ Khu vực luyện tập</h4>
                                
                                {/* Practice Mode Selector */}
                                <div className="mode-selector-container mb-4">
                                    <button
                                        onClick={() => setPracticeMode('free_write')}
                                        className={`mode-selector-btn ${
                                            practiceMode === 'free_write' ? 'mode-selector-btn--active' : ''
                                        }`}
                                    >
                                        📝 Viết tự do
                                    </button>
                                    <button
                                        onClick={() => setPracticeMode('reorder')}
                                        className={`mode-selector-btn ${
                                            practiceMode === 'reorder' ? 'mode-selector-btn--active' : ''
                                        }`}
                                    >
                                        🔄 Sắp xếp từ
                                    </button>
                                    <button
                                        onClick={() => setPracticeMode('fill_blank')}
                                        className={`mode-selector-btn ${
                                            practiceMode === 'fill_blank' ? 'mode-selector-btn--active' : ''
                                        }`}
                                    >
                                        📝 Điền từ
                                    </button>
                                </div>

                                {/* Writing Area */}
                                {practiceMode === 'free_write' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Viết bài của bạn:
                                        </label>
                                        <textarea
                                            value={userInput}
                                            onChange={(e) => setUserInput(e.target.value)}
                                            className="live-editor"
                                            placeholder="Bắt đầu viết bài của bạn ở đây..."
                                            rows={12}
                                        />
                                        
                                        {/* Action Buttons */}
                                        <div className="free-write-footer">
                                            <button className="footer-btn">
                                                <SparklesIcon className="w-4 h-4" />
                                                Kiểm tra ngữ pháp
                                            </button>
                                            <button className="footer-btn">
                                                <BookOpenIcon className="w-4 h-4" />
                                                Gợi ý cải thiện
                                            </button>
                                            <button className="footer-btn">
                                                <CheckBadgeIcon className="w-4 h-4" />
                                                Chấm điểm
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {practiceMode === 'reorder' && (
                                    <div className="text-center py-8">
                                        <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                        <h4 className="text-lg font-semibold text-gray-700 mb-2">
                                            Sắp xếp từ
                                        </h4>
                                        <p className="text-gray-600">
                                            Tính năng đang được phát triển
                                        </p>
                                    </div>
                                )}

                                {practiceMode === 'fill_blank' && (
                                    <div className="text-center py-8">
                                        <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                        <h4 className="text-lg font-semibold text-gray-700 mb-2">
                                            Điền từ vào chỗ trống
                                        </h4>
                                        <p className="text-gray-600">
                                            Tính năng đang được phát triển
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* No Selection State */}
                {!currentSeed && (
                    <div className="text-center py-16">
                        <AcademicCapIcon className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Chọn dạng bài để bắt đầu luyện tập
                        </h3>
                        <p className="text-gray-600 mb-8">
                            Chọn kỳ thi và dạng bài từ các tùy chọn phía trên
                        </p>
                        
                        {!selectedTrack && (
                            <div className="bg-white rounded-xl p-6 max-w-md mx-auto">
                                <h4 className="font-semibold text-gray-800 mb-3">🚀 Bắt đầu với:</h4>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleTrackChange('IELTS')}
                                        className="w-full text-left p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100"
                                    >
                                        <div className="font-medium text-purple-800">IELTS Writing</div>
                                        <div className="text-sm text-purple-600">Task 1 & Task 2</div>
                                    </button>
                                    <button
                                        onClick={() => handleTrackChange('TOEIC')}
                                        className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
                                    >
                                        <div className="font-medium text-blue-800">TOEIC Writing</div>
                                        <div className="text-sm text-blue-600">Part 1, 2, 3</div>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WritingPageFixed;

