import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { useToast } from '../hooks/useToast';
import { 
    SparklesIcon, BookOpenIcon, CheckBadgeIcon, LightBulbIcon, 
    EyeIcon, MagicWandIcon, CheckCircleIcon, XMarkIcon, PencilIcon, PhotoIcon, SpeakerWaveIcon,
    AcademicCapIcon, ListBulletIcon, ChevronDownIcon, CheckIcon, HeartIcon
} from '../components/Icons';
import { generateMorePracticeQuestions, checkGrammar, suggestImprovements, rewriteText } from '../services/aiService';

// Complete Types
interface FoundationTopic {
    id: string;
    name_vi: string;
    name_en: string;
    sentence: string;
    level: 'easy' | 'medium' | 'advanced';
    category: string;
    practice?: {
        reorder?: any[];
        fill_blank?: any[];
        find_error?: any[];
        choose_phrase?: any[];
        matching?: any[];
        drag_drop?: any[];
    };
    vocabulary?: any[];
    sample_answer_en?: string;
    sample_answer_vi?: string;
    sample_outline_en?: string;
    sample_outline_vi?: string;
}

interface WritingSubcategory {
    subcategory_id: string;
    subcategory_name_vi: string;
    task_type: string;
    seeds: any[];
}

interface WritingCategory {
    category_id: string;
    track_name_vi: string;
    subcategories: WritingSubcategory[];
}

const WritingPageUltimate: React.FC = () => {
    const { currentUser, updateUser, guestBananaBalance, useGuestBanana } = useAuth();
    const { showSuccess, showError } = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Core state
    const [selectedTrackId, setSelectedTrackId] = useState<string>('EASY');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);
    const [foundationLevelFilter, setFoundationLevelFilter] = useState<'all' | 'easy' | 'medium' | 'advanced'>('all');
    const [practiceMode, setPracticeMode] = useState<string>('reorder');
    const [currentTopicId, setCurrentTopicId] = useState<string>('FT-EASY-S-01');
    
    // AI and interaction state
    const [isGeneratingItem, setIsGeneratingItem] = useState(false);
    const [generatingMode, setGeneratingMode] = useState<string | null>(null);
    const [aiError, setAIError] = useState('');
    
    // Free write state
    const [freeWriteInput, setFreeWriteInput] = useState<string>('');
    const [liveFeedback, setLiveFeedback] = useState<any>(null);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState<any>(null);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [modalError, setModalError] = useState<string | null>(null);
    
    // Sample content modal state
    const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
    const [sampleModalTitle, setSampleModalTitle] = useState('');
    const [sampleModalContent, setSampleModalContent] = useState<any>(null);
    
    // Practice answers state
    const [reorderAnswers, setReorderAnswers] = useState<Record<string, any[]>>({});
    const [fillBlankAnswers, setFillBlankAnswers] = useState<Record<string, string>>({});
    const [findErrorAnswers, setFindErrorAnswers] = useState<Record<string, string>>({});
    const [choosePhraseAnswers, setChoosePhraseAnswers] = useState<Record<string, string>>({});
    const [matchingAnswers, setMatchingAnswers] = useState<Record<string, any[]>>({});
    const [dragDropAnswers, setDragDropAnswers] = useState<Record<string, any[]>>({});
    
    // Pagination state (for find_error mode only)
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
    
    // Complete Foundation Data
    const foundationData: FoundationTopic[] = useMemo(() => [
        // Easy Level
        {
            id: 'FT-EASY-S-01',
            name_vi: 'Câu đơn (S-V-O)',
            name_en: 'Simple Sentence (S-V-O)',
            level: 'easy',
            category: 'Cấu trúc câu',
            sentence: 'The marketing team developed a new strategy.',
            practice: {
                reorder: [
                    { words: [{ en: 'The team', vi: 'Đội' }, { en: 'developed', vi: 'đã phát triển' }, { en: 'a new strategy.', vi: 'một chiến lược mới.' }], answer: 'The team developed a new strategy.' },
                    { words: [{ en: 'She', vi: 'Cô ấy' }, { en: 'wrote', vi: 'đã viết' }, { en: 'a detailed report.', vi: 'một báo cáo chi tiết.' }], answer: 'She wrote a detailed report.' }
                ],
                fill_blank: [
                    { sentence: { en: 'She ____ a detailed report.', vi: 'Cô ấy ____ một báo cáo chi tiết.' }, missing_word: 'wrote', options: ['wrote', 'writes', 'writing', 'written'] },
                    { sentence: { en: 'The marketing team ____ a new strategy.', vi: 'Đội marketing ____ một chiến lược mới.' }, missing_word: 'developed', options: ['developed', 'develops', 'developing', 'development'] }
                ],
                find_error: [
                    { sentence: { en: 'The employee who received the award are very dedicated.', vi: 'Nhân viên đã nhận giải thưởng rất tận tâm.' }, error_word: 'are', correct_word: 'is' },
                    { sentence: { en: 'She have completed three projects this month.', vi: 'Cô ấy đã hoàn thành ba dự án trong tháng này.' }, error_word: 'have', correct_word: 'has' },
                    { sentence: { en: 'The team are working on a important project.', vi: 'Đội đang làm việc trên một dự án quan trọng.' }, error_word: 'a', correct_word: 'an' },
                    // AI Generated exercises (4-13)
                    { sentence: { en: 'AI help students learns more effectively.', vi: 'AI giúp học sinh học hiệu quả hơn.' }, error_word: 'learns', correct_word: 'learn' },
                    { sentence: { en: 'These exercise are very useful for practice.', vi: 'Những bài tập này rất hữu ích cho việc thực hành.' }, error_word: 'exercise', correct_word: 'exercises' },
                    { sentence: { en: 'The student have completed their homework.', vi: 'Học sinh đã hoàn thành bài tập về nhà.' }, error_word: 'have', correct_word: 'has' },
                    { sentence: { en: 'Learning new language require practice.', vi: 'Học ngôn ngữ mới đòi hỏi thực hành.' }, error_word: 'require', correct_word: 'requires' },
                    { sentence: { en: 'Technology are changing education.', vi: 'Công nghệ đang thay đổi giáo dục.' }, error_word: 'are', correct_word: 'is' },
                    { sentence: { en: 'Modern tools helps students learn better.', vi: 'Công cụ hiện đại giúp học sinh học tốt hơn.' }, error_word: 'helps', correct_word: 'help' },
                    { sentence: { en: 'The system work perfectly for everyone.', vi: 'Hệ thống hoạt động hoàn hảo cho mọi người.' }, error_word: 'work', correct_word: 'works' },
                    { sentence: { en: 'Students learns faster with AI assistance.', vi: 'Học sinh học nhanh hơn với sự hỗ trợ của AI.' }, error_word: 'learns', correct_word: 'learn' },
                    { sentence: { en: 'The method provide excellent results.', vi: 'Phương pháp này cung cấp kết quả xuất sắc.' }, error_word: 'provide', correct_word: 'provides' },
                    { sentence: { en: 'Education improve lives significantly.', vi: 'Giáo dục cải thiện cuộc sống đáng kể.' }, error_word: 'improve', correct_word: 'improves' }
                ],
                choose_phrase: [
                    { question: { en: 'Complete: The team _____ yesterday.', vi: 'Hoàn thành: Đội _____ hôm qua.' }, options: [{ en: 'worked hard', vi: 'đã làm việc chăm chỉ' }, { en: 'working hard', vi: 'đang làm việc chăm chỉ' }, { en: 'will work hard', vi: 'sẽ làm việc chăm chỉ' }, { en: 'works hard', vi: 'làm việc chăm chỉ' }], correct: 0 }
                ],
                matching: [
                    { col_a: [{ en: 'The team', vi: 'Đội' }, { en: 'She', vi: 'Cô ấy' }, { en: 'They', vi: 'Họ' }], col_b: [{ en: 'wrote reports', vi: 'đã viết báo cáo' }, { en: 'developed strategies', vi: 'đã phát triển chiến lược' }, { en: 'completed projects', vi: 'đã hoàn thành dự án' }, { en: 'extra distractor', vi: 'từ gây nhiễu' }] }
                ],
                drag_drop: [
                    { sentence_parts: [{ en: 'developed', vi: 'đã phát triển' }, { en: 'The marketing team', vi: 'Đội marketing' }, { en: 'a new strategy.', vi: 'một chiến lược mới.' }], correct_order: 'The marketing team developed a new strategy.' }
                ]
            },
            vocabulary: [
                { word: 'strategy', ipa: '/ˈstrætədʒi/', pos: 'n.', vi: 'chiến lược' },
                { word: 'develop', ipa: '/dɪˈveləp/', pos: 'v.', vi: 'phát triển' },
                { word: 'marketing', ipa: '/ˈmɑːrkɪtɪŋ/', pos: 'n.', vi: 'tiếp thị' },
                { word: 'team', ipa: '/tiːm/', pos: 'n.', vi: 'đội, nhóm' }
            ],
            sample_answer_en: "The marketing team developed a new strategy. This sentence demonstrates the basic Subject-Verb-Object structure that forms the foundation of English grammar. The subject 'marketing team' performs the action 'developed' on the object 'new strategy'.",
            sample_answer_vi: "Đội marketing đã phát triển một chiến lược mới. Câu này thể hiện cấu trúc cơ bản Chủ ngữ-Động từ-Tân ngữ tạo nên nền tảng của ngữ pháp tiếng Anh. Chủ ngữ 'đội marketing' thực hiện hành động 'phát triển' lên tân ngữ 'chiến lược mới'.",
            sample_outline_en: "1. Subject: The marketing team (who performs the action)\n2. Verb: developed (past tense action)\n3. Object: a new strategy (what was developed)\n4. Structure: S + V + O (basic sentence pattern)",
            sample_outline_vi: "1. Chủ ngữ: Đội marketing (ai thực hiện hành động)\n2. Động từ: developed (hành động ở quá khứ)\n3. Tân ngữ: một chiến lược mới (cái gì được phát triển)\n4. Cấu trúc: S + V + O (mẫu câu cơ bản)"
        },
        {
            id: 'FT-EASY-S-02',
            name_vi: 'Câu với "There is/are"',
            name_en: 'Sentences with "There is/are"',
            level: 'easy',
            category: 'Cấu trúc câu',
            sentence: 'There is a meeting in the main conference room.',
            practice: {
                reorder: [
                    { words: [{ en: 'There is', vi: 'Có' }, { en: 'a meeting', vi: 'một cuộc họp' }, { en: 'in the conference room.', vi: 'trong phòng họp.' }], answer: 'There is a meeting in the conference room.' }
                ],
                fill_blank: [
                    { sentence: { en: 'There ____ several issues to discuss.', vi: 'Có ____ vài vấn đề cần thảo luận.' }, missing_word: 'are', options: ['is', 'are', 'be', 'were'] }
                ],
                find_error: [
                    { sentence: { en: 'There is many students in the class.', vi: 'Có nhiều học sinh trong lớp.' }, error_word: 'is', correct_word: 'are' }
                ]
            }
        },
        {
            id: 'FT-EASY-S-03',
            name_vi: 'Câu với "be" + tính từ (S-V-C)',
            name_en: 'Sentence with "be" + Adjective (S-V-C)',
            level: 'easy',
            category: 'Cấu trúc câu',
            sentence: 'The new design is very modern.',
            practice: {
                reorder: [
                    { words: [{ en: 'The design', vi: 'Thiết kế' }, { en: 'is', vi: 'thì' }, { en: 'very modern.', vi: 'rất hiện đại.' }], answer: 'The new design is very modern.' }
                ],
                find_error: [
                    { sentence: { en: 'These products is popular.', vi: 'Những sản phẩm này thì phổ biến.' }, error_word: 'is', correct_word: 'are' }
                ]
            }
        }
    ], []);

    // Writing categories data
    const writingData: WritingCategory[] = useMemo(() => [
        {
            category_id: 'EASY',
            track_name_vi: 'Kỹ năng Nền tảng',
            subcategories: []
        },
        {
            category_id: 'IELTS_WRITING',
            track_name_vi: 'Luyện thi IELTS',
            subcategories: [
                {
                    subcategory_id: 'IELTS-T1',
                    subcategory_name_vi: 'Task 1',
                    task_type: 'Task 1',
                    seeds: []
                },
                {
                    subcategory_id: 'IELTS-T2', 
                    subcategory_name_vi: 'Task 2',
                    task_type: 'Task 2',
                    seeds: []
                }
            ]
        },
        {
            category_id: 'TOEIC_WRITING',
            track_name_vi: 'Luyện thi TOEIC',
            subcategories: [
                {
                    subcategory_id: 'TOEIC-T8',
                    subcategory_name_vi: 'Task 8',
                    task_type: 'Task 8',
                    seeds: []
                }
            ]
        },
        {
            category_id: 'VSTEP_WRITING',
            track_name_vi: 'Luyện thi VSTEP',
            subcategories: [
                {
                    subcategory_id: 'VSTEP-T1',
                    subcategory_name_vi: 'Task 1',
                    task_type: 'Task 1', 
                    seeds: []
                },
                {
                    subcategory_id: 'VSTEP-T2',
                    subcategory_name_vi: 'Task 2',
                    task_type: 'Task 2',
                    seeds: []
                }
            ]
        },
        {
            category_id: 'AI_WRITING_ASSISTANT',
            track_name_vi: 'Trợ lý Viết AI',
            subcategories: []
        }
    ], []);

    // Practice modes
    const modes = [
        { id: 'reorder', label: 'Sắp xếp' },
        { id: 'fill_blank', label: 'Điền từ' },
        { id: 'find_error', label: 'Tìm lỗi sai' },
        { id: 'choose_phrase', label: 'Chọn cụm từ' },
        { id: 'matching', label: 'Nối cột' },
        { id: 'drag_drop', label: 'Kéo thả' },
        { id: 'free_write', label: 'Tự viết' }
    ];

    // Current topic and practice data
    const currentTopic = foundationData.find(t => t.id === currentTopicId) || foundationData[0];
    const currentPracticeData = currentTopic?.practice || {};

    // Banana check
    const handleBananaCheck = () => {
        const balance = currentUser ? currentUser.bananaBalance : guestBananaBalance;
        if (balance <= 0) {
            showError('Không đủ chuối để sử dụng AI! 🍌');
            return false;
        }
        return true;
    };

    // AI transaction
    const handleAITransaction = (promise: Promise<any>) => {
        promise.then(() => {
            if (currentUser) {
                updateUser({ ...currentUser, bananaBalance: currentUser.bananaBalance - 1 });
            } else {
                useGuestBanana();
            }
        }).catch(console.error);
    };

    // AI Grammar Check
    const handleCheckClick = async (action: 'grammar' | 'suggestions') => {
        if (!freeWriteInput.trim() || !handleBananaCheck()) return;
        
        setIsModalLoading(true);
        setModalError(null);
        setModalContent(null);
        setLiveFeedback(null);

        try {
            if (action === 'grammar') {
                const promise = checkGrammar(freeWriteInput, currentTopic);
                handleAITransaction(promise);
                const result = await promise;
                setLiveFeedback(result);
                showSuccess('✅ Kiểm tra ngữ pháp hoàn thành!');
            } else {
                setModalTitle('Gợi ý Cải thiện');
                setIsFeedbackModalOpen(true);
                const promise = suggestImprovements(freeWriteInput, currentTopic);
                handleAITransaction(promise);
                const result = await promise;
                setModalContent(result);
                showSuccess('💡 Gợi ý cải thiện đã sẵn sàng!');
            }
        } catch (err) {
            setModalError('Đã xảy ra lỗi khi nhận phản hồi từ AI. Vui lòng thử lại.');
            showError('Lỗi AI processing');
        } finally {
            setIsModalLoading(false);
        }
    };

    // Sample content handler
    const handleSampleClick = (type: 'vocab' | 'outline' | 'essay') => {
        if (!currentTopic) return;
        let title = '';
        let content: string | any[] | null = null;

        if (type === 'vocab' && currentTopic.vocabulary) {
            title = 'Từ vựng mẫu';
            content = currentTopic.vocabulary;
        } else if (type === 'outline' && currentTopic.sample_outline_en) {
            title = 'Dàn ý mẫu';
            content = `Tiếng Việt:\n${currentTopic.sample_outline_vi}\n\nEnglish:\n${currentTopic.sample_outline_en}`;
        } else if (type === 'essay' && currentTopic.sample_answer_en) {
            title = 'Bài viết mẫu';
            content = `Tiếng Việt:\n${currentTopic.sample_answer_vi}\n\nEnglish:\n${currentTopic.sample_answer_en}`;
        }

        if (content) {
            setSampleModalTitle(title);
            setSampleModalContent(content);
            setIsSampleModalOpen(true);
        }
    };

    // AI Generation for more exercises
    const handleGenerateMoreExercises = async (mode: string) => {
        if (!handleBananaCheck()) return;
        
        setGeneratingMode(mode);
        showSuccess(`🤖 AI đang tạo thêm bài tập cho chế độ "${modes.find(m => m.id === mode)?.label}"...`);
        
        try {
            const promise = generateMorePracticeQuestions(currentTopic, mode);
            handleAITransaction(promise);
            const newQuestions = await promise;
            
            if (newQuestions && newQuestions.length > 0) {
                // Update the current topic's practice data
                currentTopic.practice = {
                    ...currentTopic.practice,
                    [mode]: [...(currentTopic.practice?.[mode as keyof typeof currentTopic.practice] || []), ...newQuestions]
                };
                
                showSuccess(`✨ AI đã tạo thêm ${newQuestions.length} bài tập!`);
            }
        } catch (error) {
            showError('Lỗi khi tạo bài tập AI');
        } finally {
            setGeneratingMode(null);
        }
    };

    return (
        <div className="writing-studio bg-gray-50/50 -m-2 px-2 pt-2 min-h-screen">
            {/* Track Selection */}
            <div className="flex flex-wrap justify-center mb-3 p-1 bg-gray-200/70 rounded-full gap-0.5">
                {writingData.map(track => (
                    <button 
                        key={track.category_id} 
                        onClick={() => setSelectedTrackId(track.category_id)} 
                        className={`px-4 py-2 text-base font-semibold rounded-full transition-all duration-200 ease-in-out focus:outline-none ${
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
                {/* Foundation Level Filters */}
                {selectedTrackId === 'EASY' && (
                    <div className="flex flex-wrap justify-center gap-2 mb-3">
                        {[
                            { id: 'all', label: 'Tất cả' },
                            { id: 'easy', label: 'Căn bản' },
                            { id: 'medium', label: 'Trung bình' },
                            { id: 'advanced', label: 'Nâng cao' }
                        ].map(filter => (
                            <button 
                                key={filter.id} 
                                onClick={() => setFoundationLevelFilter(filter.id as any)} 
                                className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-colors ${
                                    foundationLevelFilter === filter.id 
                                        ? 'bg-green-600 text-white border-green-500 shadow-lg' 
                                        : 'bg-white text-green-700 border-green-600 hover:bg-green-50'
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[75vh]">
                    {/* Left Sidebar - Topic List */}
                    <div className="lg:col-span-1 bg-white rounded-xl p-4 shadow-lg overflow-y-auto">
                        <h3 className="font-bold text-lg text-center mb-4 border-b pb-2">Đề thi</h3>
                        <div className="space-y-2">
                            {foundationData
                                .filter(topic => foundationLevelFilter === 'all' || topic.level === foundationLevelFilter)
                                .map(topic => (
                                    <button 
                                        key={topic.id} 
                                        onClick={() => {
                                            setCurrentTopicId(topic.id);
                                            setCurrentExerciseIndex(0);
                                        }}
                                        className={`w-full text-left p-3 rounded-lg transition-all ${
                                            currentTopicId === topic.id 
                                                ? 'bg-pink-500 text-white shadow-md' 
                                                : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                    >
                                        <div className="font-semibold">{topic.name_vi}</div>
                                        <div className="text-sm opacity-75">{topic.name_en}</div>
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-lg overflow-y-auto">
                        {/* Topic Display */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-xl border-l-4 border-green-500">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{currentTopic.name_vi}</h2>
                            <p className="text-gray-600 italic mb-2">"{currentTopic.name_en}"</p>
                            <p className="text-gray-800"><strong>Câu đúng:</strong> {currentTopic.sentence}</p>
                        </div>

                        {/* Mode Selection */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {modes.map(mode => (
                                <div key={mode.id} className="flex items-center gap-1">
                                    <button 
                                        onClick={() => {
                                            setPracticeMode(mode.id);
                                            setCurrentExerciseIndex(0);
                                        }}
                                        className={`px-4 py-2 rounded-full font-semibold transition-all ${
                                            practiceMode === mode.id 
                                                ? 'bg-pink-500 text-white shadow-md' 
                                                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {mode.label}
                                    </button>
                                    {mode.id !== 'free_write' && (
                                        <button 
                                            onClick={() => handleGenerateMoreExercises(mode.id)} 
                                            disabled={generatingMode === mode.id}
                                            className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center hover:bg-purple-600 disabled:opacity-50 transition-all"
                                            title={`AI tạo thêm bài tập ${mode.label}`}
                                        >
                                            {generatingMode === mode.id ? (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <SparklesIcon className="w-4 h-4" />
                                            )}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Practice Content */}
                        <div className="space-y-6">
                            {/* Find Error Mode with Pagination */}
                            {practiceMode === 'find_error' && (
                                <div className="space-y-6">
                                    {/* Circular Pagination Navigation */}
                                    <div className="flex flex-wrap justify-center gap-3 mb-8 p-6 bg-white rounded-2xl shadow-lg">
                                        <div className="text-center w-full mb-6">
                                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                                🔍 Tìm lỗi sai - Tổng cộng: {currentPracticeData.find_error?.length || 0} câu
                                            </h3>
                                            <p className="text-sm text-gray-600">Click vào số để chuyển đến câu đó</p>
                                        </div>
                                        {(currentPracticeData.find_error || []).map((_, index) => {
                                            const isAIGenerated = index >= 3;
                                            const isActive = currentExerciseIndex === index;
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentExerciseIndex(index)}
                                                    className={`relative w-14 h-14 rounded-full font-bold text-lg transition-all duration-300 ${
                                                        isActive 
                                                            ? (isAIGenerated 
                                                                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-2xl transform scale-125 ring-4 ring-purple-200' 
                                                                : 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-2xl transform scale-125 ring-4 ring-pink-200')
                                                            : (isAIGenerated 
                                                                ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-3 border-purple-300 hover:scale-110 shadow-lg' 
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-3 border-gray-300 hover:scale-110 shadow-lg')
                                                    }`}
                                                    title={isAIGenerated ? `✨ AI Generated Exercise ${index + 1}` : `📝 Original Exercise ${index + 1}`}
                                                >
                                                    {index + 1}
                                                    {isAIGenerated && (
                                                        <span className="absolute -top-1 -right-1 text-xs bg-yellow-400 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center font-bold">✨</span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Current Exercise Display */}
                                    {currentPracticeData.find_error?.[currentExerciseIndex] && (() => {
                                        const exercise = currentPracticeData.find_error[currentExerciseIndex];
                                        const exerciseKey = `find_error_${currentExerciseIndex}`;
                                        const selectedWord = findErrorAnswers[exerciseKey];
                                        const isAIGenerated = currentExerciseIndex >= 3;

                                        return (
                                            <div className="space-y-6">
                                                {isAIGenerated && (
                                                    <div className="text-center">
                                                        <span className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
                                                            ✨ AI Generated Exercise #{currentExerciseIndex - 2}
                                                        </span>
                                                    </div>
                                                )}
                                                
                                                <div className="text-center mb-6">
                                                    <span className={`px-8 py-4 rounded-full text-3xl font-black shadow-lg ${
                                                        isAIGenerated 
                                                            ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-4 border-purple-300' 
                                                            : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-4 border-gray-300'
                                                    }`}>
                                                        Câu {currentExerciseIndex + 1}
                                                    </span>
                                                </div>
                                                
                                                <div className={`p-8 rounded-3xl shadow-2xl ${
                                                    isAIGenerated 
                                                        ? 'bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 border-4 border-purple-200' 
                                                        : 'bg-gradient-to-br from-red-50 via-pink-50 to-red-50 border-4 border-red-200'
                                                }`}>
                                                    <div className="text-center mb-8">
                                                        <h4 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                                                            🔍 Tìm lỗi sai trong câu
                                                        </h4>
                                                        <p className="text-xl text-gray-600 font-semibold mb-8">{exercise.sentence.vi}</p>
                                                    </div>
                                                    
                                                    <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-gray-100 mb-8">
                                                        <div className="flex flex-wrap gap-4 justify-center leading-relaxed">
                                                            {exercise.sentence.en.split(' ').map((word: string, wordIdx: number) => {
                                                                const isSelected = selectedWord === word;
                                                                
                                                                return (
                                                                    <button
                                                                        key={wordIdx}
                                                                        onClick={() => setFindErrorAnswers(prev => ({
                                                                            ...prev,
                                                                            [exerciseKey]: word
                                                                        }))}
                                                                        className={`px-6 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-4 shadow-lg ${
                                                                            isSelected
                                                                                ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-2xl shadow-red-500/50 border-red-400 ring-4 ring-red-200'
                                                                                : 'bg-white text-gray-800 border-gray-300 hover:border-red-400 hover:shadow-2xl hover:bg-red-50 hover:shadow-red-200/30'
                                                                        }`}
                                                                    >
                                                                        {word}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                    
                                                    {selectedWord && (
                                                        <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-6 border-4 border-blue-300 mb-6 shadow-lg">
                                                            <div className="flex items-center justify-center gap-3">
                                                                <CheckCircleIcon className="w-8 h-8 text-blue-600" />
                                                                <p className="text-2xl font-bold text-blue-800">
                                                                    Bạn đã chọn: "<span className="text-red-600 bg-red-100 px-3 py-1 rounded-full">{selectedWord}</span>"
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className="flex gap-6 justify-center mt-8">
                                                    <button 
                                                        onClick={() => setCurrentExerciseIndex(Math.max(0, currentExerciseIndex - 1))}
                                                        disabled={currentExerciseIndex === 0}
                                                        className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg"
                                                    >
                                                        ← Câu trước
                                                    </button>
                                                    
                                                    <button 
                                                        onClick={() => {
                                                            if (selectedWord === exercise.error_word) {
                                                                showSuccess('🎉 Chính xác! Bạn đã tìm thấy lỗi!');
                                                            } else {
                                                                showError('❌ Chưa đúng. Hãy thử lại!');
                                                            }
                                                        }}
                                                        disabled={!selectedWord}
                                                        className="px-12 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-black text-xl hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 shadow-2xl"
                                                    >
                                                        ✅ Kiểm tra
                                                    </button>
                                                    
                                                    <button 
                                                        onClick={() => setCurrentExerciseIndex(Math.min((currentPracticeData.find_error?.length || 1) - 1, currentExerciseIndex + 1))}
                                                        disabled={currentExerciseIndex === (currentPracticeData.find_error?.length || 1) - 1}
                                                        className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg"
                                                    >
                                                        Câu sau →
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            )}

                            {/* Other Practice Modes (Standard Display) */}
                            {practiceMode === 'reorder' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-center text-gray-800">🔄 Sắp xếp câu</h3>
                                    {(currentPracticeData.reorder || []).map((exercise: any, index: number) => (
                                        <div key={index} className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                                            <div className="text-center mb-4">
                                                <span className="bg-blue-100 px-4 py-2 rounded-lg text-lg font-bold">Câu {index + 1}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-3 justify-center">
                                                {exercise.words.map((word: any, wordIdx: number) => (
                                                    <button
                                                        key={wordIdx}
                                                        className="px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:bg-blue-50 hover:border-blue-300 transition-all"
                                                    >
                                                        <div className="font-bold">{word.en}</div>
                                                        <div className="text-sm text-gray-600">{word.vi}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {practiceMode === 'fill_blank' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-center text-gray-800">✏️ Điền từ</h3>
                                    {(currentPracticeData.fill_blank || []).map((exercise: any, index: number) => (
                                        <div key={index} className="p-6 bg-green-50 rounded-xl border border-green-200">
                                            <div className="text-center mb-4">
                                                <span className="bg-green-100 px-4 py-2 rounded-lg text-lg font-bold">Câu {index + 1}</span>
                                            </div>
                                            <div className="text-center mb-6">
                                                <p className="text-xl font-medium text-gray-900 mb-2">{exercise.sentence.en}</p>
                                                <p className="text-gray-600">{exercise.sentence.vi}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                {exercise.options.map((option: string, optIdx: number) => (
                                                    <button
                                                        key={optIdx}
                                                        className="px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all"
                                                    >
                                                        {String.fromCharCode(65 + optIdx)}. {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Free Write Mode */}
                            {practiceMode === 'free_write' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-center text-gray-800">✍️ Tự viết</h3>
                                    <textarea
                                        value={freeWriteInput}
                                        onChange={(e) => setFreeWriteInput(e.target.value)}
                                        className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                                        placeholder="Bắt đầu viết bài của bạn ở đây..."
                                    />
                                    
                                    {/* AI Writing Tools */}
                                    <div className="flex flex-wrap gap-3 justify-center">
                                        <button 
                                            onClick={() => handleCheckClick('grammar')}
                                            disabled={!freeWriteInput.trim()}
                                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 transition-all shadow-lg"
                                        >
                                            <CheckBadgeIcon className="w-5 h-5 mr-2" />
                                            🤖 Kiểm tra Ngữ pháp (-1🍌)
                                        </button>
                                        
                                        <button 
                                            onClick={() => handleCheckClick('suggestions')}
                                            disabled={!freeWriteInput.trim()}
                                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-bold hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 transition-all shadow-lg"
                                        >
                                            <LightBulbIcon className="w-5 h-5 mr-2" />
                                            💡 Gợi ý Cải thiện (-1🍌)
                                        </button>
                                        
                                        <button 
                                            onClick={() => handleSampleClick('vocab')}
                                            disabled={!currentTopic.vocabulary}
                                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full font-bold hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 transition-all shadow-lg"
                                        >
                                            <AcademicCapIcon className="w-5 h-5 mr-2" />
                                            📚 Từ vựng Song ngữ
                                        </button>
                                        
                                        <button 
                                            onClick={() => handleSampleClick('outline')}
                                            disabled={!currentTopic.sample_outline_en}
                                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 transition-all shadow-lg"
                                        >
                                            <ListBulletIcon className="w-5 h-5 mr-2" />
                                            📝 Dàn ý Song ngữ
                                        </button>
                                        
                                        <button 
                                            onClick={() => handleSampleClick('essay')}
                                            disabled={!currentTopic.sample_answer_en}
                                            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full font-bold hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-50 transition-all shadow-lg"
                                        >
                                            <BookOpenIcon className="w-5 h-5 mr-2" />
                                            ✍️ Bài mẫu Song ngữ
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Other modes placeholder */}
                            {!['find_error', 'reorder', 'fill_blank', 'free_write'].includes(practiceMode) && (
                                <div className="text-center py-12">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                        {modes.find(m => m.id === practiceMode)?.label}
                                    </h3>
                                    <p className="text-gray-600 mb-6">Chế độ này đang được phát triển</p>
                                    <button 
                                        onClick={() => handleGenerateMoreExercises(practiceMode)}
                                        className="px-6 py-3 bg-purple-500 text-white rounded-full font-bold hover:bg-purple-600 transition-all"
                                    >
                                        🤖 AI Tạo bài tập cho chế độ này
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* AI Feedback Modal */}
                {isFeedbackModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-bold text-gray-800">{modalTitle}</h3>
                                <button 
                                    onClick={() => setIsFeedbackModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-all"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>
                            {isModalLoading ? (
                                <div className="text-center py-8">
                                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    <p>AI đang phân tích...</p>
                                </div>
                            ) : modalError ? (
                                <div className="text-red-600 text-center py-4">{modalError}</div>
                            ) : modalContent ? (
                                <div className="space-y-4">
                                    <p className="text-gray-800">{modalContent.general_feedback_vi}</p>
                                    {modalContent.suggestions?.map((suggestion: any, idx: number) => (
                                        <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-bold text-gray-800">{suggestion.suggestion_type}</h4>
                                            <p className="text-gray-600">{suggestion.explanation_vi}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                )}

                {/* Sample Content Modal */}
                {isSampleModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4 rounded-xl">
                                <h3 className="text-2xl font-black uppercase tracking-wide">✨ {sampleModalTitle}</h3>
                                <button 
                                    onClick={() => setIsSampleModalOpen(false)}
                                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="space-y-6">
                                {typeof sampleModalContent === 'string' ? (
                                    <div className="space-y-6">
                                        {sampleModalContent.split('\n\n').map((section, index) => {
                                            if (section.startsWith('Tiếng Việt:')) {
                                                const viContent = section.replace('Tiếng Việt:', '').trim();
                                                return (
                                                    <div key={index} className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-500">
                                                        <h4 className="font-black text-blue-800 text-lg mb-3 flex items-center">
                                                            🇻🇳 <span className="ml-2 uppercase tracking-wide">TIẾNG VIỆT</span>
                                                        </h4>
                                                        <div className="text-blue-900 font-semibold leading-relaxed whitespace-pre-wrap text-lg">
                                                            {viContent}
                                                        </div>
                                                    </div>
                                                );
                                            } else if (section.startsWith('English:')) {
                                                const enContent = section.replace('English:', '').trim();
                                                return (
                                                    <div key={index} className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-green-500">
                                                        <h4 className="font-black text-green-800 text-lg mb-3 flex items-center">
                                                            🇺🇸 <span className="ml-2 uppercase tracking-wide">ENGLISH</span>
                                                        </h4>
                                                        <div className="text-green-900 font-semibold leading-relaxed whitespace-pre-wrap text-lg italic">
                                                            {enContent}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                ) : Array.isArray(sampleModalContent) ? (
                                    <div className="space-y-4">
                                        <div className="text-center mb-6">
                                            <h4 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                                                📚 TỪ VỰNG QUAN TRỌNG
                                            </h4>
                                        </div>
                                        {sampleModalContent.map((item: any, index: number) => (
                                            <div key={index} className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 p-5 rounded-xl border border-purple-200 hover:shadow-lg transition-all">
                                                <div className="flex flex-col space-y-2">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-2xl font-black text-purple-800 bg-purple-200 px-3 py-1 rounded-full">
                                                            {item.word}
                                                        </span>
                                                        <span className="font-mono text-purple-600 bg-purple-100 px-2 py-1 rounded text-sm">
                                                            /{item.ipa}/
                                                        </span>
                                                        <span className="text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 rounded-full uppercase">
                                                            {item.pos}
                                                        </span>
                                                    </div>
                                                    <div className="bg-white p-3 rounded-lg border-l-4 border-pink-400">
                                                        <span className="text-lg font-bold text-pink-800">
                                                            🇻🇳 {item.vi}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default WritingPageUltimate;

