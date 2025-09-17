import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadOrInitializeData } from '../services/dataService';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { 
    AcademicCapIcon, SparklesIcon, BookOpenIcon, CheckBadgeIcon, XMarkIcon, 
    CheckCircleIcon, LightBulbIcon, PencilIcon, EyeIcon
} from '../components/Icons';
import { useAuth } from '../App';

// Import types
import { WritingCategory, WritingSubcategory, WritingSeed, PracticeMode } from '../types';

// Complete Writing Data exactly matching your screenshots
const fullWritingData: WritingCategory[] = [
    {
        category_id: 'EASY',
        track_name_vi: 'Kỹ năng Nền tảng',
        subcategories: [
            {
                subcategory_id: 'foundation_sentence',
                subcategory_name_vi: 'Cấu trúc câu',
                objective_vi: 'Luyện tập cấu trúc câu cơ bản',
                task_type: 'Foundation',
                track_id: 'EASY',
                level: 'A1',
                test_tags: ['Foundation'],
                seeds: [
                    {
                        code: 'EASY_SENTENCE_001',
                        topic: 'Simple Sentence (S-V-O)',
                        prompt_en: 'The marketing team developed a new strategy.',
                        prompt_vi: 'Đội marketing đã phát triển một chiến lược mới.',
                        prompt_vi_short: 'Câu đơn (S-V-O)',
                        must_use: ['team', 'developed', 'strategy'],
                        focus: 'Subject-Verb-Object structure',
                        sample_answer_en: 'The marketing team developed a new strategy.',
                        sample_answer_vi: 'Đội marketing đã phát triển một chiến lược mới.',
                        vocabulary: [
                            { en: 'The team', vi: 'Đội', type: 'noun' },
                            { en: 'developed', vi: 'đã phát triển', type: 'verb' },
                            { en: 'a new strategy', vi: 'một chiến lược mới', type: 'phrase' }
                        ],
                        practice: {
                            reorder: [
                                { words: [
                                    { en: 'The team', vi: 'Đội' },
                                    { en: 'developed', vi: 'đã phát triển' },
                                    { en: 'a new strategy.', vi: 'một chiến lược mới.' }
                                ], answer: 'The team developed a new strategy.' }
                            ]
                        }
                    }
                ]
            },
            {
                subcategory_id: 'foundation_relative',
                subcategory_name_vi: 'Mệnh đề quan hệ',
                objective_vi: 'Luyện tập mệnh đề quan hệ với who, which, that',
                task_type: 'Foundation',
                track_id: 'EASY',
                level: 'A2',
                test_tags: ['Foundation'],
                seeds: [
                    {
                        code: 'EASY_RELATIVE_001',
                        topic: 'Relative Clauses',
                        prompt_en: 'The employee who received the award is very dedicated.',
                        prompt_vi: 'Nhân viên đã nhận giải thưởng rất tận tâm.',
                        prompt_vi_short: 'Mệnh đề quan hệ',
                        must_use: ['who', 'received', 'dedicated'],
                        focus: 'Relative clauses with who',
                        sample_answer_en: 'The employee who received the award is very dedicated.',
                        sample_answer_vi: 'Nhân viên đã nhận giải thưởng rất tận tâm.',
                        vocabulary: [
                            { en: 'employee', vi: 'nhân viên', type: 'noun' },
                            { en: 'received', vi: 'đã nhận', type: 'verb' },
                            { en: 'dedicated', vi: 'tận tâm', type: 'adjective' }
                        ],
                        practice: {
                            reorder: [
                                { words: [
                                    { en: 'is very dedicated.', vi: 'rất tận tâm.' },
                                    { en: 'The employee', vi: 'Người nhân viên' },
                                    { en: 'who received the award', vi: 'người đã nhận giải thưởng' }
                                ], answer: 'The employee who received the award is very dedicated.' }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    {
        category_id: 'VSTEP',
        track_name_vi: 'Luyện thi VSTEP',
        subcategories: [
            {
                subcategory_id: 'vstep_task1_thank',
                subcategory_name_vi: 'Task 1: Thư Cảm ơn',
                objective_vi: 'Viết email thân mật để cảm ơn một người bạn đã cho bạn ở nhờ trong một chuyến đi',
                task_type: 'Task 1',
                track_id: 'VSTEP',
                level: 'B2',
                test_tags: ['VSTEP'],
                seeds: [
                    {
                        code: 'VSTEP_T1_THANK_001',
                        topic: 'Thank You Email',
                        prompt_en: 'Write an informal email to thank a friend for hosting you during a trip.',
                        prompt_vi: 'Viết một email thân mật để cảm ơn một người bạn đã cho bạn ở nhờ trong một chuyến đi.',
                        prompt_vi_short: 'Cảm ơn bạn cho ở nhờ',
                        must_use: ['grateful', 'hospitality', 'wonderful time'],
                        focus: 'Informal email structure',
                        sample_answer_en: 'Dear Sarah, I hope this email finds you well. I wanted to thank you for your incredible hospitality during my recent visit to your city. I had such a wonderful time staying at your place, and I am truly grateful for everything you did to make me feel welcome.',
                        sample_answer_vi: 'Sarah thân mến, Tôi hy vọng email này đến với bạn khi bạn khỏe mạnh. Tôi muốn cảm ơn bạn vì lòng hiếu khách tuyệt vời trong chuyến thăm gần đây của tôi đến thành phố của bạn.',
                        vocabulary: [
                            { en: 'grateful', vi: 'biết ơn', type: 'adjective' },
                            { en: 'hospitality', vi: 'lòng hiếu khách', type: 'noun' },
                            { en: 'wonderful time', vi: 'khoảng thời gian tuyệt vời', type: 'phrase' }
                        ],
                        practice: {
                            reorder: [
                                { words: [
                                    { en: 'had', vi: 'đã có' },
                                    { en: 'time.', vi: 'khoảng thời gian.' },
                                    { en: 'wonderful', vi: 'tuyệt vời' },
                                    { en: 'a', vi: 'một' },
                                    { en: 'I', vi: 'Mình' }
                                ], answer: 'I had a wonderful time.' }
                            ]
                        }
                    }
                ]
            },
            {
                subcategory_id: 'vstep_task1_apology',
                subcategory_name_vi: 'Task 1: Thư Xin lỗi',
                objective_vi: 'Viết email xin lỗi và giải thích lý do',
                task_type: 'Task 1',
                track_id: 'VSTEP',
                level: 'B2',
                test_tags: ['VSTEP'],
                seeds: []
            },
            {
                subcategory_id: 'vstep_task1_request',
                subcategory_name_vi: 'Task 1: Thư Yêu cầu',
                objective_vi: 'Viết email yêu cầu thông tin hoặc giúp đỡ',
                task_type: 'Task 1',
                track_id: 'VSTEP',
                level: 'B2',
                test_tags: ['VSTEP'],
                seeds: []
            },
            {
                subcategory_id: 'vstep_task1_complaint',
                subcategory_name_vi: 'Task 1: Thư Phản nàn',
                objective_vi: 'Viết email phản nàn về dịch vụ hoặc sản phẩm',
                task_type: 'Task 1',
                track_id: 'VSTEP',
                level: 'B2',
                test_tags: ['VSTEP'],
                seeds: []
            },
            {
                subcategory_id: 'vstep_task1_invitation',
                subcategory_name_vi: 'Task 1: Thư Mời',
                objective_vi: 'Viết email mời tham gia sự kiện',
                task_type: 'Task 1',
                track_id: 'VSTEP',
                level: 'B2',
                test_tags: ['VSTEP'],
                seeds: []
            },
            {
                subcategory_id: 'vstep_task1_advice',
                subcategory_name_vi: 'Task 1: Thư Cho lời khuyên',
                objective_vi: 'Viết email đưa ra lời khuyên cho bạn bè',
                task_type: 'Task 1',
                track_id: 'VSTEP',
                level: 'B2',
                test_tags: ['VSTEP'],
                seeds: []
            },
            {
                subcategory_id: 'vstep_task1_application',
                subcategory_name_vi: 'Task 1: Thư Ứng tuyển',
                objective_vi: 'Viết email xin việc chính thức',
                task_type: 'Task 1',
                track_id: 'VSTEP',
                level: 'B2',
                test_tags: ['VSTEP'],
                seeds: []
            }
        ]
    },
    {
        category_id: 'TOEIC',
        track_name_vi: 'Luyện thi TOEIC',
        subcategories: [
            {
                subcategory_id: 'toeic_task1_picture',
                subcategory_name_vi: 'Task 1-5: Miêu tả Tranh',
                objective_vi: 'Viết một câu về một nhóm người trong phòng họp',
                task_type: 'Task 1-5',
                track_id: 'TOEIC',
                level: 'B1',
                test_tags: ['TOEIC'],
                seeds: [
                    {
                        code: 'TOEIC_T1_MEETING_001',
                        topic: 'Meeting Room Scene',
                        prompt_en: 'Write a sentence about a group of people in a meeting room.',
                        prompt_vi: 'Viết một câu về một nhóm người trong phòng họp.',
                        prompt_vi_short: 'Nhóm người trong phòng họp',
                        must_use: ['are discussing', 'colleagues', 'project', 'during the meeting'],
                        focus: 'Present continuous tense',
                        sample_answer_en: 'Colleagues are discussing a new project during the meeting.',
                        sample_answer_vi: 'Các đồng nghiệp đang thảo luận về một dự án mới trong suốt cuộc họp.',
                        vocabulary: [
                            { en: 'colleagues', vi: 'các đồng nghiệp', type: 'noun' },
                            { en: 'are discussing', vi: 'đang thảo luận', type: 'verb' },
                            { en: 'a new project', vi: 'một dự án mới', type: 'phrase' },
                            { en: 'during the meeting', vi: 'trong suốt cuộc họp', type: 'phrase' }
                        ],
                        practice: {
                            reorder: [
                                { words: [
                                    { en: 'during the meeting.', vi: 'trong suốt cuộc họp.' },
                                    { en: 'are discussing', vi: 'đang thảo luận' },
                                    { en: 'Colleagues', vi: 'Các đồng nghiệp' },
                                    { en: 'a new project', vi: 'một dự án mới' }
                                ], answer: 'Colleagues are discussing a new project during the meeting.' }
                            ]
                        }
                    }
                ]
            },
            {
                subcategory_id: 'toeic_task6_email',
                subcategory_name_vi: 'Task 6-7: Trả lời Email',
                objective_vi: 'Viết email phản hồi trong môi trường công việc',
                task_type: 'Task 6-7',
                track_id: 'TOEIC',
                level: 'B1',
                test_tags: ['TOEIC'],
                seeds: []
            },
            {
                subcategory_id: 'toeic_task8_essay',
                subcategory_name_vi: 'Task 8: Viết bài luận',
                objective_vi: 'Viết bài luận ngắn về chủ đề kinh doanh',
                task_type: 'Task 8',
                track_id: 'TOEIC',
                level: 'B2',
                test_tags: ['TOEIC'],
                seeds: []
            }
        ]
    },
    {
        category_id: 'IELTS',
        track_name_vi: 'Luyện thi IELTS',
        subcategories: [
            // Task 1 Types
            {
                subcategory_id: 'ielts_task1_line',
                subcategory_name_vi: 'Biểu đồ Đường',
                objective_vi: 'Biểu đồ cho thấy số lượng nam và nữ theo học giáo dục sau phổ thông ở Anh trong ba giai đoạn và liệu họ học toàn thời gian hay bán thời gian.',
                task_type: 'Task 1',
                track_id: 'IELTS',
                level: 'B2',
                test_tags: ['IELTS'],
                seeds: [
                    {
                        code: 'IELTS_T1_LINE_001',
                        topic: 'Education Statistics',
                        prompt_en: 'The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying full-time or part-time.',
                        prompt_vi: 'Biểu đồ cho thấy số lượng nam và nữ theo học giáo dục sau phổ thông ở Anh trong ba giai đoạn và liệu họ học toàn thời gian hay bán thời gian.',
                        prompt_vi_short: 'LIN-01: Nam & nữ trong giáo dục',
                        must_use: ['increased', 'decreased', 'remained stable', 'full-time', 'part-time'],
                        focus: 'Describing trends over time periods',
                        sample_answer_en: 'The chart illustrates the participation of men and women in further education in Britain across three distinct time periods, showing whether students pursued full-time or part-time studies.',
                        sample_answer_vi: 'Biểu đồ minh họa sự tham gia của nam và nữ trong giáo dục sau phổ thông ở Anh qua ba giai đoạn riêng biệt, cho thấy liệu sinh viên theo học toàn thời gian hay bán thời gian.',
                        vocabulary: [
                            { en: 'further education', vi: 'giáo dục sau phổ thông', type: 'phrase' },
                            { en: 'full-time', vi: 'toàn thời gian', type: 'adjective' },
                            { en: 'part-time', vi: 'bán thời gian', type: 'adjective' },
                            { en: 'participation', vi: 'sự tham gia', type: 'noun' }
                        ],
                        practice: {}
                    }
                ]
            },
            {
                subcategory_id: 'ielts_task1_bar',
                subcategory_name_vi: 'Biểu đồ Cột',
                objective_vi: 'Mô tả và so sánh dữ liệu theo categories',
                task_type: 'Task 1',
                track_id: 'IELTS',
                level: 'B2',
                test_tags: ['IELTS'],
                seeds: []
            },
            {
                subcategory_id: 'ielts_task1_pie',
                subcategory_name_vi: 'Biểu đồ Tròn',
                objective_vi: 'Mô tả tỷ lệ phần trăm và phân bố',
                task_type: 'Task 1',
                track_id: 'IELTS',
                level: 'B2',
                test_tags: ['IELTS'],
                seeds: []
            },
            {
                subcategory_id: 'ielts_task1_table',
                subcategory_name_vi: 'Bảng biểu',
                objective_vi: 'Mô tả thông tin trong bảng số liệu',
                task_type: 'Task 1',
                track_id: 'IELTS',
                level: 'B2',
                test_tags: ['IELTS'],
                seeds: []
            },
            {
                subcategory_id: 'ielts_task1_process',
                subcategory_name_vi: 'Quy trình',
                objective_vi: 'Mô tả các bước trong quy trình sản xuất',
                task_type: 'Task 1',
                track_id: 'IELTS',
                level: 'B2',
                test_tags: ['IELTS'],
                seeds: []
            },
            {
                subcategory_id: 'ielts_task1_map',
                subcategory_name_vi: 'Bản đồ',
                objective_vi: 'Mô tả sự thay đổi địa lý qua thời gian',
                task_type: 'Task 1',
                track_id: 'IELTS',
                level: 'B2',
                test_tags: ['IELTS'],
                seeds: []
            },
            // Task 2 Types
            {
                subcategory_id: 'ielts_task2_opinion',
                subcategory_name_vi: 'Dạng bài Quan điểm',
                objective_vi: 'Bày tỏ quan điểm cá nhân với lập luận rõ ràng',
                task_type: 'Task 2',
                track_id: 'IELTS',
                level: 'B2',
                test_tags: ['IELTS'],
                seeds: []
            },
            {
                subcategory_id: 'ielts_task2_discussion',
                subcategory_name_vi: 'Dạng bài Thảo luận',
                objective_vi: 'Thảo luận cả hai quan điểm và đưa ra ý kiến',
                task_type: 'Task 2',
                track_id: 'IELTS',
                level: 'B2',
                test_tags: ['IELTS'],
                seeds: []
            },
            {
                subcategory_id: 'ielts_task2_problem',
                subcategory_name_vi: 'Vấn đề & Giải pháp',
                objective_vi: 'Phân tích vấn đề và đưa ra giải pháp khả thi',
                task_type: 'Task 2',
                track_id: 'IELTS',
                level: 'B2',
                test_tags: ['IELTS'],
                seeds: []
            },
            {
                subcategory_id: 'ielts_task2_advantages',
                subcategory_name_vi: 'Lợi ích & Bất lợi',
                objective_vi: 'So sánh ưu và nhược điểm một cách cân bằng',
                task_type: 'Task 2',
                track_id: 'IELTS',
                level: 'B2',
                test_tags: ['IELTS'],
                seeds: []
            }
        ]
    },
    {
        category_id: 'AI_WRITING_ASSISTANT',
        track_name_vi: 'Trợ lý Viết AI',
        subcategories: []
    }
];

const WritingPageFull: React.FC = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    
    const [selectedTrackId, setSelectedTrackId] = useState<string>('EASY');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);
    const [foundationLevelFilter, setFoundationLevelFilter] = useState<'all' | 'easy' | 'medium' | 'advanced'>('all');
    const [practiceMode, setPracticeMode] = useState<PracticeMode>('reorder');
    const [currentSeed, setCurrentSeed] = useState<WritingSeed | null>(null);
    const [userInput, setUserInput] = useState('');
    const [showSampleAnswer, setShowSampleAnswer] = useState(false);
    const [showOutline, setShowOutline] = useState(false);
    const [showVocabulary, setShowVocabulary] = useState(false);

    // Load data with fallback
    const writingData = useMemo(() => {
        try {
            const savedData = loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_DATA, fullWritingData);
            return savedData.length > 0 ? savedData : fullWritingData;
        } catch (error) {
            console.warn('Using default writing data:', error);
            return fullWritingData;
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

    const practiceModesConfig = [
        { id: 'reorder', name: 'Sắp xếp', icon: '🔄', description: 'Sắp xếp từ thành câu đúng' },
        { id: 'fill_blank', name: 'Điền từ', icon: '📝', description: 'Điền từ vào chỗ trống' },
        { id: 'find_error', name: 'Tìm lỗi sai', icon: '🔍', description: 'Tìm và sửa lỗi trong câu' },
        { id: 'choose_phrase', name: 'Chọn cụm từ', icon: '✏️', description: 'Chọn cụm từ phù hợp' },
        { id: 'matching', name: 'Nối cột', icon: '🔗', description: 'Nối từ tiếng Anh với tiếng Việt' },
        { id: 'drag_drop', name: 'Kéo thả', icon: '👆', description: 'Kéo thả để sắp xếp' },
        { id: 'free_write', name: 'Tự viết', icon: '✍️', description: 'Viết tự do với AI feedback' }
    ];

    const PracticeModeSelector = () => (
        <div className="flex flex-wrap gap-2 mb-6">
            {practiceModesConfig.map(mode => (
                <button
                    key={mode.id}
                    onClick={() => setPracticeMode(mode.id as PracticeMode)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        practiceMode === mode.id
                            ? 'bg-pink-500 text-white shadow-md'
                            : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                    }`}
                    title={mode.description}
                >
                    <span>{mode.icon}</span>
                    <span>{mode.name}</span>
                </button>
            ))}
        </div>
    );

    const PracticeArea = () => {
        if (!currentSeed) return null;

        const practiceData = currentSeed.practice?.[practiceMode];

        switch (practiceMode) {
            case 'reorder':
                if (practiceData && practiceData.length > 0) {
                    const exercise = practiceData[0];
                    return (
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-800">🔄 Sắp xếp các từ sau thành câu đúng:</h4>
                            <div className="text-center mb-4">
                                <span className="bg-gray-100 px-4 py-2 rounded-lg text-lg font-mono">1</span>
                            </div>
                            <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg justify-center">
                                {exercise.words.map((word: any, index: number) => (
                                    <div key={index} className="bilingual-word-btn cursor-pointer hover:shadow-md">
                                        <div className="bilingual-word-en">{word.en}</div>
                                        <div className="bilingual-word-vi">{word.vi}</div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-primary w-full py-3 text-lg font-semibold">
                                Kiểm tra
                            </button>
                        </div>
                    );
                }
                break;

            case 'fill_blank':
                return (
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">📝 Điền từ vào chỗ trống:</h4>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-lg mb-4">The marketing team _____ a new strategy.</p>
                            <div className="grid grid-cols-2 gap-2">
                                {['developed', 'created', 'made', 'built'].map((option: string, index: number) => (
                                    <button 
                                        key={index}
                                        className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button className="btn btn-primary w-full">Kiểm tra</button>
                    </div>
                );

            case 'find_error':
                return (
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">🔍 Tìm lỗi sai trong câu:</h4>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-lg">The employee <span className="bg-red-100 border-b-2 border-red-500 cursor-pointer">who</span> received the award is very dedicated.</p>
                        </div>
                        <button className="btn btn-primary w-full">Kiểm tra</button>
                    </div>
                );

            case 'choose_phrase':
                return (
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">✏️ Chọn cụm từ phù hợp:</h4>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-lg mb-4">The team _____ working on the project.</p>
                            <div className="grid grid-cols-1 gap-2">
                                {['is currently', 'are currently', 'was currently', 'were currently'].map((option: string, index: number) => (
                                    <button 
                                        key={index}
                                        className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 text-left transition-colors"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button className="btn btn-primary w-full">Kiểm tra</button>
                    </div>
                );

            case 'matching':
                return (
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">🔗 Nối cột tiếng Anh với tiếng Việt:</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <h5 className="font-medium text-blue-800">English</h5>
                                {['employee', 'received', 'dedicated'].map((word, index) => (
                                    <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100">
                                        {word}
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <h5 className="font-medium text-green-800">Tiếng Việt</h5>
                                {['tận tâm', 'nhân viên', 'đã nhận'].map((word, index) => (
                                    <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg cursor-pointer hover:bg-green-100">
                                        {word}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="btn btn-primary w-full">Kiểm tra</button>
                    </div>
                );

            case 'drag_drop':
                return (
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">👆 Kéo thả để sắp xếp:</h4>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {['The employee', 'who received', 'the award', 'is very dedicated.'].map((phrase, index) => (
                                    <div key={index} className="p-2 bg-white border border-gray-300 rounded-lg cursor-move hover:shadow-md">
                                        {phrase}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="btn btn-primary w-full">Kiểm tra</button>
                    </div>
                );

            case 'free_write':
                return (
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">✍️ Viết bài của bạn:</h4>
                        <textarea
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
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
                            <button className="btn btn-secondary flex items-center gap-2">
                                <CheckBadgeIcon className="w-4 h-4" />
                                Chấm điểm
                            </button>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="text-center py-8">
                        <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">
                            {practiceModesConfig.find(m => m.id === practiceMode)?.name}
                        </h4>
                        <p className="text-gray-600">
                            Tính năng đang được phát triển
                        </p>
                    </div>
                );
        }
    };

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
                    <div className="flex bg-white rounded-xl p-2 shadow-lg flex-wrap gap-2">
                        {writingData.map(track => (
                            <button
                                key={track.category_id}
                                onClick={() => handleTrackChange(track.category_id)}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
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

                {/* Foundation Level Filter */}
                {selectedTrackId === 'EASY' && (
                    <div className="flex justify-center mb-8">
                        <div className="flex bg-white rounded-lg p-1 shadow-sm">
                            {[
                                { key: 'all', label: 'Tất cả' },
                                { key: 'easy', label: 'Cơ bản' },
                                { key: 'medium', label: 'Trung bình' },
                                { key: 'advanced', label: 'Nâng cao' }
                            ].map(level => (
                                <button
                                    key={level.key}
                                    onClick={() => setFoundationLevelFilter(level.key as any)}
                                    className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                                        foundationLevelFilter === level.key
                                            ? 'bg-green-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {level.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Subcategory Selection */}
                {selectedTrack && selectedTrack.subcategories.length > 0 && (
                    <div className="mb-8">
                        <div className="flex flex-wrap justify-center gap-3">
                            {selectedTrack.subcategories.map(subcategory => (
                                <button
                                    key={subcategory.subcategory_id}
                                    onClick={() => handleSubcategoryChange(subcategory.subcategory_id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        selectedSubcategoryId === subcategory.subcategory_id
                                            ? 'bg-green-600 text-white shadow-md'
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {subcategory.subcategory_name_vi}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* AI Buttons */}
                <div className="flex justify-center gap-4 mb-8">
                    <button className="btn-ai-pink px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
                        🎨 AI Gen Text
                    </button>
                    <button className="btn-ai-green px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
                        🖼️ AI Gen Image
                    </button>
                    <button className="btn-ai-blue px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
                        🔊 AI Gen Audio
                    </button>
                </div>

                {/* Main Practice Area */}
                {currentSeed ? (
                    <div className="practice-studio-grid">
                        {/* Left Panel - Prompt & Navigation */}
                        <div className="practice-list-panel">
                            <div className="mb-6">
                                <h4 className="font-bold text-gray-800 mb-3">Đề thi</h4>
                                <div className="space-y-2">
                                    {availableSeeds.map(seed => (
                                        <button
                                            key={seed.code}
                                            onClick={() => setCurrentSeed(seed)}
                                            className={`sentence-list-item w-full text-left ${
                                                currentSeed?.code === seed.code ? 'sentence-list-item--active' : ''
                                            }`}
                                        >
                                            {seed.prompt_vi_short || seed.topic}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Prompt Display */}
                            <div className="prompt-display-area mb-6">
                                <h5 className="font-semibold text-green-800 mb-2">
                                    {currentSeed.topic}
                                </h5>
                                <p className="text-sm text-gray-600 italic mb-2">
                                    "{currentSeed.focus}"
                                </p>
                                <p className="font-medium text-gray-800 mb-3">
                                    Câu đúng: {currentSeed.sample_answer_en}
                                </p>
                                <p className="text-gray-700 mb-3">
                                    {currentSeed.prompt_vi}
                                </p>
                                <p className="text-sm text-gray-600 italic">
                                    "{currentSeed.prompt_en}"
                                </p>
                            </div>

                            {/* Helper Panels */}
                            <div className="space-y-3">
                                {currentSeed.sample_answer_vi && (
                                    <button
                                        onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                                        className="w-full text-left p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-green-800">📖 Bài mẫu</span>
                                            <span className="text-green-600">{showSampleAnswer ? '−' : '+'}</span>
                                        </div>
                                    </button>
                                )}
                                
                                {currentSeed.vocabulary && currentSeed.vocabulary.length > 0 && (
                                    <button
                                        onClick={() => setShowVocabulary(!showVocabulary)}
                                        className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-blue-800">📚 Từ vựng</span>
                                            <span className="text-blue-600">{showVocabulary ? '−' : '+'}</span>
                                        </div>
                                    </button>
                                )}
                            </div>

                            {/* Expanded Panels */}
                            {showSampleAnswer && currentSeed.sample_answer_vi && (
                                <div className="sample-answer p-4 mt-3">
                                    <h6 className="font-semibold mb-2">Bài mẫu:</h6>
                                    <p className="text-sm mb-3">{currentSeed.sample_answer_vi}</p>
                                    <p className="text-sm italic text-gray-600">{currentSeed.sample_answer_en}</p>
                                </div>
                            )}

                            {showVocabulary && currentSeed.vocabulary && (
                                <div className="vocab-panel p-4 mt-3">
                                    <h6 className="font-semibold mb-3">Từ vựng quan trọng:</h6>
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

                        {/* Resizer */}
                        <div className="resizer-col"></div>

                        {/* Right Panel - Practice Area */}
                        <div className="practice-area-panel">
                            <PracticeModeSelector />
                            <PracticeArea />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <AcademicCapIcon className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Chọn dạng bài để bắt đầu luyện tập
                        </h3>
                        <p className="text-gray-600 mb-8">
                            Chọn kỳ thi và dạng bài từ các tùy chọn phía trên
                        </p>
                        
                        {selectedTrackId === 'AI_WRITING_ASSISTANT' && (
                            <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto">
                                <h4 className="text-xl font-bold text-gray-800 mb-4">🤖 AI Template Generator for Writing</h4>
                                <p className="text-gray-600 mb-6">
                                    Select an exam, task, and subtype to generate a bilingual template with useful phrases and structures.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Exam</label>
                                        <select className="form-input w-full">
                                            <option>Luyện thi VSTEP</option>
                                            <option>Luyện thi TOEIC</option>
                                            <option>Luyện thi IELTS</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Task / Part</label>
                                        <select className="form-input w-full">
                                            <option>Task 1</option>
                                            <option>Task 2</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Sub-type</label>
                                        <select className="form-input w-full">
                                            <option>Task 1: Thư Cảm ơn</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <button className="btn btn-ai-assistant w-full py-4 text-lg">
                                    ✨ Generate Template
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WritingPageFull;

