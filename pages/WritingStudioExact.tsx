import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useAuth } from '../App';
import { 
    SparklesIcon, BookOpenIcon, CheckBadgeIcon, LightBulbIcon, 
    EyeIcon, PhotoIcon, SpeakerWaveIcon
} from '../components/Icons';

interface WritingSeed {
    code: string;
    topic: string;
    prompt_en: string;
    prompt_vi: string;
    prompt_vi_short: string;
    must_use: string[];
    focus: string;
    sample_answer_en: string;
    sample_answer_vi: string;
    sample_outline_en?: string;
    sample_outline_vi?: string;
    vocabulary: Array<{ en: string; vi: string; type: string }>;
    practice: any;
}

interface WritingSubcategory {
    subcategory_id: string;
    subcategory_name_vi: string;
    objective_vi: string;
    task_type: string;
    track_id: string;
    level: string;
    test_tags: string[];
    seeds: WritingSeed[];
}

interface WritingCategory {
    category_id: string;
    track_name_vi: string;
    subcategories: WritingSubcategory[];
}

const WritingStudioExact: React.FC = () => {
    const { currentUser } = useAuth();
    
    // State exactly matching your screenshots
    const [selectedTrackId, setSelectedTrackId] = useState<string>('EASY');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>('foundation_sentence');
    const [foundationLevelFilter, setFoundationLevelFilter] = useState<string>('medium');
    const [practiceMode, setPracticeMode] = useState<string>('reorder');
    const [currentSeedIndex, setCurrentSeedIndex] = useState<number>(0);

    // Complete data structure matching your screenshots
    const writingData: WritingCategory[] = useMemo(() => [
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
                            practice: {}
                        },
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
                            practice: {}
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
                    objective_vi: 'Viết email thân mật để cảm ơn một người bạn',
                    task_type: 'Task 1',
                    track_id: 'VSTEP',
                    level: 'B2',
                    test_tags: ['VSTEP'],
                    seeds: [
                        {
                            code: 'VSTEP_THANK_001',
                            topic: 'Thank You Email',
                            prompt_en: 'Write an informal email to thank a friend for hosting you during a trip.',
                            prompt_vi: 'Viết một email thân mật để cảm ơn một người bạn đã cho bạn ở nhờ trong một chuyến đi.',
                            prompt_vi_short: 'Cảm ơn bạn cho ở nhờ',
                            must_use: ['grateful', 'hospitality', 'wonderful time'],
                            focus: 'Informal email structure',
                            sample_answer_en: 'Dear Sarah, I hope this email finds you well...',
                            sample_answer_vi: 'Sarah thân mến, Tôi hy vọng email này đến với bạn...',
                            vocabulary: [
                                { en: 'grateful', vi: 'biết ơn', type: 'adjective' },
                                { en: 'hospitality', vi: 'lòng hiếu khách', type: 'noun' }
                            ],
                            practice: {}
                        }
                    ]
                },
                {
                    subcategory_id: 'vstep_task1_apology',
                    subcategory_name_vi: 'Task 1: Thư Xin lỗi',
                    objective_vi: 'Viết email xin lỗi',
                    task_type: 'Task 1',
                    track_id: 'VSTEP',
                    level: 'B2',
                    test_tags: ['VSTEP'],
                    seeds: []
                },
                {
                    subcategory_id: 'vstep_task1_request',
                    subcategory_name_vi: 'Task 1: Thư Yêu cầu',
                    objective_vi: 'Viết email yêu cầu thông tin',
                    task_type: 'Task 1',
                    track_id: 'VSTEP',
                    level: 'B2',
                    test_tags: ['VSTEP'],
                    seeds: []
                },
                {
                    subcategory_id: 'vstep_task1_complaint',
                    subcategory_name_vi: 'Task 1: Thư Phản nàn',
                    objective_vi: 'Viết email phản nàn',
                    task_type: 'Task 1',
                    track_id: 'VSTEP',
                    level: 'B2',
                    test_tags: ['VSTEP'],
                    seeds: []
                },
                {
                    subcategory_id: 'vstep_task1_invitation',
                    subcategory_name_vi: 'Task 1: Thư Mời',
                    objective_vi: 'Viết email mời',
                    task_type: 'Task 1',
                    track_id: 'VSTEP',
                    level: 'B2',
                    test_tags: ['VSTEP'],
                    seeds: []
                },
                {
                    subcategory_id: 'vstep_task1_advice',
                    subcategory_name_vi: 'Task 1: Thư Cho lời khuyên',
                    objective_vi: 'Viết email đưa ra lời khuyên',
                    task_type: 'Task 1',
                    track_id: 'VSTEP',
                    level: 'B2',
                    test_tags: ['VSTEP'],
                    seeds: []
                },
                {
                    subcategory_id: 'vstep_task1_application',
                    subcategory_name_vi: 'Task 1: Thư Ứng tuyển',
                    objective_vi: 'Viết email xin việc',
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
                    objective_vi: 'Viết câu mô tả hình ảnh',
                    task_type: 'Task 1-5',
                    track_id: 'TOEIC',
                    level: 'B1',
                    test_tags: ['TOEIC'],
                    seeds: [
                        {
                            code: 'TOEIC_MEETING_001',
                            topic: 'Meeting Room Scene',
                            prompt_en: 'Write a sentence about a group of people in a meeting room.',
                            prompt_vi: 'Viết một câu về một nhóm người trong phòng họp.',
                            prompt_vi_short: 'Nhóm người trong phòng họp',
                            must_use: ['are discussing', 'colleagues', 'project'],
                            focus: 'Present continuous tense',
                            sample_answer_en: 'Colleagues are discussing a new project during the meeting.',
                            sample_answer_vi: 'Các đồng nghiệp đang thảo luận về một dự án mới trong suốt cuộc họp.',
                            vocabulary: [
                                { en: 'colleagues', vi: 'đồng nghiệp', type: 'noun' },
                                { en: 'discussing', vi: 'thảo luận', type: 'verb' }
                            ],
                            practice: {}
                        }
                    ]
                },
                {
                    subcategory_id: 'toeic_task6_email',
                    subcategory_name_vi: 'Task 6-7: Trả lời Email',
                    objective_vi: 'Viết email phản hồi',
                    task_type: 'Task 6-7',
                    track_id: 'TOEIC',
                    level: 'B1',
                    test_tags: ['TOEIC'],
                    seeds: []
                },
                {
                    subcategory_id: 'toeic_task8_essay',
                    subcategory_name_vi: 'Task 8: Viết bài luận',
                    objective_vi: 'Viết bài luận ngắn',
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
                // Task 1 subcategories
                {
                    subcategory_id: 'ielts_task1_line',
                    subcategory_name_vi: 'Biểu đồ Đường',
                    objective_vi: 'Mô tả biểu đồ đường',
                    task_type: 'Task 1',
                    track_id: 'IELTS',
                    level: 'B2',
                    test_tags: ['IELTS'],
                    seeds: [
                        {
                            code: 'IELTS_LINE_001',
                            topic: 'Education Statistics',
                            prompt_en: 'The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying full-time or part-time.',
                            prompt_vi: 'Biểu đồ cho thấy số lượng nam và nữ theo học giáo dục sau phổ thông ở Anh trong ba giai đoạn và liệu họ học toàn thời gian hay bán thời gian.',
                            prompt_vi_short: 'LIN-01: Nam & nữ trong giáo dục',
                            must_use: ['increased', 'decreased', 'remained stable'],
                            focus: 'Describing trends over time',
                            sample_answer_en: 'The chart illustrates the participation of men and women in further education...',
                            sample_answer_vi: 'Biểu đồ minh họa sự tham gia của nam và nữ trong giáo dục...',
                            vocabulary: [
                                { en: 'further education', vi: 'giáo dục sau phổ thông', type: 'phrase' },
                                { en: 'full-time', vi: 'toàn thời gian', type: 'adjective' }
                            ],
                            practice: {}
                        }
                    ]
                },
                {
                    subcategory_id: 'ielts_task1_bar',
                    subcategory_name_vi: 'Biểu đồ Cột',
                    objective_vi: 'Mô tả biểu đồ cột',
                    task_type: 'Task 1',
                    track_id: 'IELTS',
                    level: 'B2',
                    test_tags: ['IELTS'],
                    seeds: []
                },
                {
                    subcategory_id: 'ielts_task1_pie',
                    subcategory_name_vi: 'Biểu đồ Tròn',
                    objective_vi: 'Mô tả biểu đồ tròn',
                    task_type: 'Task 1',
                    track_id: 'IELTS',
                    level: 'B2',
                    test_tags: ['IELTS'],
                    seeds: []
                },
                {
                    subcategory_id: 'ielts_task1_table',
                    subcategory_name_vi: 'Bảng biểu',
                    objective_vi: 'Mô tả bảng biểu',
                    task_type: 'Task 1',
                    track_id: 'IELTS',
                    level: 'B2',
                    test_tags: ['IELTS'],
                    seeds: []
                },
                {
                    subcategory_id: 'ielts_task1_process',
                    subcategory_name_vi: 'Quy trình',
                    objective_vi: 'Mô tả quy trình',
                    task_type: 'Task 1',
                    track_id: 'IELTS',
                    level: 'B2',
                    test_tags: ['IELTS'],
                    seeds: []
                },
                {
                    subcategory_id: 'ielts_task1_map',
                    subcategory_name_vi: 'Bản đồ',
                    objective_vi: 'Mô tả bản đồ',
                    task_type: 'Task 1',
                    track_id: 'IELTS',
                    level: 'B2',
                    test_tags: ['IELTS'],
                    seeds: []
                },
                // Task 2 subcategories
                {
                    subcategory_id: 'ielts_task2_opinion',
                    subcategory_name_vi: 'Dạng bài Quan điểm',
                    objective_vi: 'Bày tỏ quan điểm cá nhân',
                    task_type: 'Task 2',
                    track_id: 'IELTS',
                    level: 'B2',
                    test_tags: ['IELTS'],
                    seeds: []
                },
                {
                    subcategory_id: 'ielts_task2_discussion',
                    subcategory_name_vi: 'Dạng bài Thảo luận',
                    objective_vi: 'Thảo luận cả hai quan điểm',
                    task_type: 'Task 2',
                    track_id: 'IELTS',
                    level: 'B2',
                    test_tags: ['IELTS'],
                    seeds: []
                },
                {
                    subcategory_id: 'ielts_task2_problem',
                    subcategory_name_vi: 'Vấn đề & Giải pháp',
                    objective_vi: 'Phân tích vấn đề và giải pháp',
                    task_type: 'Task 2',
                    track_id: 'IELTS',
                    level: 'B2',
                    test_tags: ['IELTS'],
                    seeds: []
                },
                {
                    subcategory_id: 'ielts_task2_advantages',
                    subcategory_name_vi: 'Lợi ích & Bất lợi',
                    objective_vi: 'So sánh ưu và nhược điểm',
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
    ], []);

    const selectedTrack = useMemo(() => 
        writingData.find(t => t.category_id === selectedTrackId), 
        [writingData, selectedTrackId]
    );

    const selectedSubcategory = useMemo(() => 
        selectedTrack?.subcategories.find(s => s.subcategory_id === selectedSubcategoryId) || null,
        [selectedTrack, selectedSubcategoryId]
    );

    const currentSeed = useMemo(() => 
        selectedSubcategory?.seeds?.[currentSeedIndex] || null,
        [selectedSubcategory, currentSeedIndex]
    );

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

                {/* Track Selection - Exactly like your screenshot */}
                <div className="flex justify-center mb-8">
                    <div className="flex bg-white rounded-xl p-2 shadow-lg flex-wrap gap-2">
                        {writingData.map(track => (
                            <button
                                key={track.category_id}
                                onClick={() => {
                                    setSelectedTrackId(track.category_id);
                                    setSelectedSubcategoryId(null);
                                    setCurrentSeedIndex(0);
                                }}
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

                {/* Foundation Level Filter - Only for EASY track */}
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
                                    onClick={() => setFoundationLevelFilter(level.key)}
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

                {/* Subcategory Selection - Exactly like your screenshot */}
                {selectedTrack && selectedTrack.subcategories.length > 0 && (
                    <div className="mb-8">
                        <div className="flex flex-wrap justify-center gap-3">
                            {selectedTrack.subcategories.map(subcategory => (
                                <button
                                    key={subcategory.subcategory_id}
                                    onClick={() => {
                                        setSelectedSubcategoryId(subcategory.subcategory_id);
                                        setCurrentSeedIndex(0);
                                    }}
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

                {/* AI Buttons - Exactly positioned like your screenshot */}
                <div className="flex justify-end gap-4 mb-8">
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

                {/* Main Practice Area - 2 Panel Layout exactly like your screenshot */}
                {currentSeed ? (
                    <div className="practice-studio-grid">
                        {/* Left Panel - Exactly like your screenshot */}
                        <div className="practice-list-panel">
                            <div className="mb-6">
                                <h4 className="font-bold text-gray-800 mb-3">Đề thi</h4>
                                <div className="space-y-2">
                                    {selectedSubcategory?.seeds?.map((seed, index) => (
                                        <button
                                            key={seed.code}
                                            onClick={() => setCurrentSeedIndex(index)}
                                            className={`sentence-list-item w-full text-left ${
                                                currentSeedIndex === index ? 'sentence-list-item--active' : ''
                                            }`}
                                        >
                                            {seed.prompt_vi_short || seed.topic}
                                        </button>
                                    )) || (
                                        <div className="sentence-list-item sentence-list-item--active w-full text-left">
                                            {currentSeed.prompt_vi_short || currentSeed.topic}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Prompt Display - Green border exactly like screenshot */}
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
                        </div>

                        {/* Resizer - Exactly like your screenshot */}
                        <div className="resizer-col"></div>

                        {/* Right Panel - Practice Area exactly like your screenshot */}
                        <div className="practice-area-panel">
                            {/* Practice Mode Selector - Exactly like your screenshot */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {[
                                    { id: 'reorder', name: 'Sắp xếp', active: practiceMode === 'reorder' },
                                    { id: 'fill_blank', name: 'Điền từ', active: practiceMode === 'fill_blank' },
                                    { id: 'find_error', name: 'Tìm lỗi sai', active: practiceMode === 'find_error' },
                                    { id: 'choose_phrase', name: 'Chọn cụm từ', active: practiceMode === 'choose_phrase' },
                                    { id: 'matching', name: 'Nối cột', active: practiceMode === 'matching' },
                                    { id: 'drag_drop', name: 'Kéo thả', active: practiceMode === 'drag_drop' },
                                    { id: 'free_write', name: 'Tự viết', active: practiceMode === 'free_write' }
                                ].map(mode => (
                                    <button
                                        key={mode.id}
                                        onClick={() => setPracticeMode(mode.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                            mode.active
                                                ? 'bg-pink-500 text-white shadow-md'
                                                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {mode.name}
                                    </button>
                                ))}
                            </div>

                            {/* Practice Content Area */}
                            <div className="space-y-4">
                                {/* Question Number - Exactly like your screenshot */}
                                <div className="text-center mb-4">
                                    <span className="bg-gray-100 px-4 py-2 rounded-lg text-lg font-mono">1</span>
                                </div>

                                {/* Practice Area based on mode */}
                                {practiceMode === 'reorder' && (
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg justify-center">
                                            {currentSeed.vocabulary?.map((word, index) => (
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
                                )}

                                {practiceMode === 'free_write' && (
                                    <div className="space-y-4">
                                        <textarea
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
                                )}

                                {practiceMode !== 'reorder' && practiceMode !== 'free_write' && (
                                    <div className="text-center py-8">
                                        <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                        <h4 className="text-lg font-semibold text-gray-700 mb-2">
                                            {practiceMode}
                                        </h4>
                                        <p className="text-gray-600">
                                            Tính năng đang được phát triển
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Chọn dạng bài để bắt đầu luyện tập
                        </h3>
                        <p className="text-gray-600">
                            Chọn kỳ thi và dạng bài từ các tùy chọn phía trên
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WritingStudioExact;

