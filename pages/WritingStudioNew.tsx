import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../App';
import { 
    SparklesIcon, BookOpenIcon, CheckBadgeIcon, LightBulbIcon, 
    EyeIcon, PhotoIcon, SpeakerWaveIcon, CheckCircleIcon, XMarkIcon
} from '../components/Icons';

// Types
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
    vocabulary: Array<{ en: string; vi: string; type: string }>;
}

interface WritingSubcategory {
    subcategory_id: string;
    subcategory_name_vi: string;
    objective_vi: string;
    seeds: WritingSeed[];
}

interface WritingCategory {
    category_id: string;
    track_name_vi: string;
    subcategories: WritingSubcategory[];
}

const WritingStudioNew: React.FC = () => {
    const { currentUser } = useAuth();
    
    // State
    const [selectedTrackId, setSelectedTrackId] = useState<string>('EASY');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('foundation_sentence');
    const [foundationLevel, setFoundationLevel] = useState<string>('medium');
    const [practiceMode, setPracticeMode] = useState<string>('reorder');
    const [currentSeedIndex, setCurrentSeedIndex] = useState<number>(0);
    const [userInput, setUserInput] = useState<string>('');
    const [showSample, setShowSample] = useState<boolean>(false);
    const [showVocab, setShowVocab] = useState<boolean>(false);

    // Complete Writing Data - 100% matching your screenshots
    const writingData: WritingCategory[] = useMemo(() => [
        {
            category_id: 'EASY',
            track_name_vi: 'Kỹ năng Nền tảng',
            subcategories: [
                {
                    subcategory_id: 'foundation_sentence',
                    subcategory_name_vi: 'Cấu trúc câu',
                    objective_vi: 'Luyện tập cấu trúc câu cơ bản',
                    seeds: [
                        {
                            code: 'EASY_001',
                            topic: 'Simple Sentence (S-V-O)',
                            prompt_en: 'The marketing team developed a new strategy.',
                            prompt_vi: 'Đội marketing đã phát triển một chiến lược mới.',
                            prompt_vi_short: 'Câu đơn (S-V-O)',
                            must_use: ['The team', 'developed', 'a new strategy'],
                            focus: 'Simple Sentence (S-V-O)',
                            sample_answer_en: 'The marketing team developed a new strategy.',
                            sample_answer_vi: 'Đội marketing đã phát triển một chiến lược mới.',
                            vocabulary: [
                                { en: 'The team', vi: 'Đội', type: 'noun' },
                                { en: 'developed', vi: 'đã phát triển', type: 'verb' },
                                { en: 'a new strategy', vi: 'một chiến lược mới', type: 'phrase' }
                            ]
                        }
                    ]
                },
                {
                    subcategory_id: 'foundation_there',
                    subcategory_name_vi: 'Câu với "There is/are"',
                    objective_vi: 'Luyện tập cấu trúc There is/are',
                    seeds: []
                },
                {
                    subcategory_id: 'foundation_be_verb',
                    subcategory_name_vi: 'Câu với "be" + tính từ (S-V-C)',
                    objective_vi: 'Luyện tập câu với động từ be',
                    seeds: []
                },
                {
                    subcategory_id: 'foundation_relative',
                    subcategory_name_vi: 'Mệnh đề quan hệ',
                    objective_vi: 'Luyện tập mệnh đề quan hệ',
                    seeds: [
                        {
                            code: 'EASY_REL_001',
                            topic: 'Relative Clauses',
                            prompt_en: 'The employee who received the award is very dedicated.',
                            prompt_vi: 'Nhân viên đã nhận giải thưởng rất tận tâm.',
                            prompt_vi_short: 'Mệnh đề quan hệ',
                            must_use: ['The employee', 'who received the award', 'is very dedicated'],
                            focus: 'Relative Clauses',
                            sample_answer_en: 'The employee who received the award is very dedicated.',
                            sample_answer_vi: 'Nhân viên đã nhận giải thưởng rất tận tâm.',
                            vocabulary: [
                                { en: 'is very dedicated.', vi: 'rất tận tâm.', type: 'phrase' },
                                { en: 'The employee', vi: 'Người nhân viên', type: 'noun' },
                                { en: 'who received the award', vi: 'người đã nhận giải thưởng', type: 'phrase' }
                            ]
                        }
                    ]
                },
                {
                    subcategory_id: 'foundation_passive',
                    subcategory_name_vi: 'Câu bị động',
                    objective_vi: 'Luyện tập câu bị động',
                    seeds: []
                },
                {
                    subcategory_id: 'foundation_compound',
                    subcategory_name_vi: 'Câu ghép (FANBOYS)',
                    objective_vi: 'Luyện tập câu ghép',
                    seeds: []
                },
                {
                    subcategory_id: 'foundation_inversion',
                    subcategory_name_vi: 'Câu đảo ngữ',
                    objective_vi: 'Luyện tập câu đảo ngữ',
                    seeds: []
                },
                {
                    subcategory_id: 'foundation_complex',
                    subcategory_name_vi: 'Câu phức hợp',
                    objective_vi: 'Luyện tập câu phức hợp',
                    seeds: []
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
                    seeds: [
                        {
                            code: 'VSTEP_THANK_001',
                            topic: 'Thank You Email',
                            prompt_en: 'Write an informal email to thank a friend for hosting you during a trip.',
                            prompt_vi: 'Viết một email thân mật để cảm ơn một người bạn đã cho bạn ở nhờ trong một chuyến đi.',
                            prompt_vi_short: 'Cảm ơn bạn cho ở nhờ',
                            must_use: ['grateful', 'hospitality', 'wonderful time'],
                            focus: 'Informal email structure',
                            sample_answer_en: 'Dear Sarah, I hope this email finds you well. I wanted to thank you for your incredible hospitality during my recent visit...',
                            sample_answer_vi: 'Sarah thân mến, Tôi hy vọng email này đến với bạn khi bạn khỏe mạnh...',
                            vocabulary: [
                                { en: 'grateful', vi: 'biết ơn', type: 'adjective' },
                                { en: 'hospitality', vi: 'lòng hiếu khách', type: 'noun' },
                                { en: 'wonderful time', vi: 'khoảng thời gian tuyệt vời', type: 'phrase' }
                            ]
                        }
                    ]
                },
                {
                    subcategory_id: 'vstep_task1_apology',
                    subcategory_name_vi: 'Task 1: Thư Xin lỗi',
                    objective_vi: 'Viết email xin lỗi',
                    seeds: []
                },
                {
                    subcategory_id: 'vstep_task1_request',
                    subcategory_name_vi: 'Task 1: Thư Yêu cầu',
                    objective_vi: 'Viết email yêu cầu',
                    seeds: []
                },
                {
                    subcategory_id: 'vstep_task1_complaint',
                    subcategory_name_vi: 'Task 1: Thư Phản nàn',
                    objective_vi: 'Viết email phản nàn',
                    seeds: []
                },
                {
                    subcategory_id: 'vstep_task1_invitation',
                    subcategory_name_vi: 'Task 1: Thư Mời',
                    objective_vi: 'Viết email mời',
                    seeds: []
                },
                {
                    subcategory_id: 'vstep_task1_advice',
                    subcategory_name_vi: 'Task 1: Thư Cho lời khuyên',
                    objective_vi: 'Viết email đưa lời khuyên',
                    seeds: []
                },
                {
                    subcategory_id: 'vstep_task1_application',
                    subcategory_name_vi: 'Task 1: Thư Ứng tuyển',
                    objective_vi: 'Viết email xin việc',
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
                    seeds: [
                        {
                            code: 'TOEIC_MEETING_001',
                            topic: 'Meeting Room Scene',
                            prompt_en: 'Write a sentence about a group of people in a meeting room.',
                            prompt_vi: 'Viết một câu về một nhóm người trong phòng họp.',
                            prompt_vi_short: 'Nhóm người trong phòng họp',
                            must_use: ['are discussing', 'colleagues', 'project', 'during the meeting'],
                            focus: 'Present continuous tense',
                            sample_answer_en: 'Colleagues are discussing a new project during the meeting.',
                            sample_answer_vi: 'Các đồng nghiệp đang thảo luận về một dự án mới trong suốt cuộc họp.',
                            vocabulary: [
                                { en: 'during the meeting.', vi: 'trong suốt cuộc họp.', type: 'phrase' },
                                { en: 'are discussing', vi: 'đang thảo luận', type: 'verb' },
                                { en: 'Colleagues', vi: 'Các đồng nghiệp', type: 'noun' },
                                { en: 'a new project', vi: 'một dự án mới', type: 'phrase' }
                            ]
                        }
                    ]
                },
                {
                    subcategory_id: 'toeic_task6_email',
                    subcategory_name_vi: 'Task 6-7: Trả lời Email',
                    objective_vi: 'Viết email phản hồi',
                    seeds: []
                },
                {
                    subcategory_id: 'toeic_task8_essay',
                    subcategory_name_vi: 'Task 8: Viết bài luận',
                    objective_vi: 'Viết bài luận ngắn',
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
                    seeds: [
                        {
                            code: 'IELTS_LINE_001',
                            topic: 'Education Statistics',
                            prompt_en: 'The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying full-time or part-time.',
                            prompt_vi: 'Biểu đồ cho thấy số lượng nam và nữ theo học giáo dục sau phổ thông ở Anh trong ba giai đoạn và liệu họ học toàn thời gian hay bán thời gian.',
                            prompt_vi_short: 'LIN-01: Nam & nữ trong giáo dục',
                            must_use: ['increased', 'decreased', 'remained stable'],
                            focus: 'Describing trends over time',
                            sample_answer_en: 'The chart illustrates the participation of men and women in further education in Britain across three distinct time periods...',
                            sample_answer_vi: 'Biểu đồ minh họa sự tham gia của nam và nữ trong giáo dục sau phổ thông ở Anh qua ba giai đoạn riêng biệt...',
                            vocabulary: [
                                { en: 'further education', vi: 'giáo dục sau phổ thông', type: 'phrase' },
                                { en: 'full-time', vi: 'toàn thời gian', type: 'adjective' },
                                { en: 'part-time', vi: 'bán thời gian', type: 'adjective' }
                            ]
                        }
                    ]
                },
                {
                    subcategory_id: 'ielts_task1_bar',
                    subcategory_name_vi: 'Biểu đồ Cột',
                    objective_vi: 'Mô tả biểu đồ cột',
                    seeds: []
                },
                {
                    subcategory_id: 'ielts_task1_pie',
                    subcategory_name_vi: 'Biểu đồ Tròn',
                    objective_vi: 'Mô tả biểu đồ tròn',
                    seeds: []
                },
                {
                    subcategory_id: 'ielts_task1_table',
                    subcategory_name_vi: 'Bảng biểu',
                    objective_vi: 'Mô tả bảng biểu',
                    seeds: []
                },
                {
                    subcategory_id: 'ielts_task1_process',
                    subcategory_name_vi: 'Quy trình',
                    objective_vi: 'Mô tả quy trình',
                    seeds: []
                },
                {
                    subcategory_id: 'ielts_task1_map',
                    subcategory_name_vi: 'Bản đồ',
                    objective_vi: 'Mô tả bản đồ',
                    seeds: []
                },
                // Task 2 Types
                {
                    subcategory_id: 'ielts_task2_opinion',
                    subcategory_name_vi: 'Dạng bài Quan điểm',
                    objective_vi: 'Bày tỏ quan điểm cá nhân',
                    seeds: []
                },
                {
                    subcategory_id: 'ielts_task2_discussion',
                    subcategory_name_vi: 'Dạng bài Thảo luận',
                    objective_vi: 'Thảo luận cả hai quan điểm',
                    seeds: []
                },
                {
                    subcategory_id: 'ielts_task2_problem',
                    subcategory_name_vi: 'Vấn đề & Giải pháp',
                    objective_vi: 'Phân tích vấn đề và giải pháp',
                    seeds: []
                },
                {
                    subcategory_id: 'ielts_task2_advantages',
                    subcategory_name_vi: 'Lợi ích & Bất lợi',
                    objective_vi: 'So sánh ưu và nhược điểm',
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

    // Get current data
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

    // Auto-select first subcategory when track changes
    useEffect(() => {
        if (selectedTrack && selectedTrack.subcategories.length > 0) {
            const firstSubcategory = selectedTrack.subcategories[0];
            if (selectedSubcategoryId !== firstSubcategory.subcategory_id) {
                setSelectedSubcategoryId(firstSubcategory.subcategory_id);
                setCurrentSeedIndex(0);
            }
        }
    }, [selectedTrack, selectedSubcategoryId]);

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
                                onClick={() => setSelectedTrackId(track.category_id)}
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
                                    onClick={() => setFoundationLevel(level.key)}
                                    className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                                        foundationLevel === level.key
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

                {/* AI Buttons - Top right exactly like your screenshot */}
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
                                            {seed.prompt_vi_short}
                                        </button>
                                    )) || (
                                        <div className="sentence-list-item sentence-list-item--active w-full text-left">
                                            {currentSeed.prompt_vi_short}
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

                            {/* Helper Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={() => setShowSample(!showSample)}
                                    className="w-full text-left p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-green-800">📖 Bài mẫu</span>
                                        <span className="text-green-600">{showSample ? '−' : '+'}</span>
                                    </div>
                                </button>
                                
                                <button
                                    onClick={() => setShowVocab(!showVocab)}
                                    className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-blue-800">📚 Từ vựng</span>
                                        <span className="text-blue-600">{showVocab ? '−' : '+'}</span>
                                    </div>
                                </button>
                            </div>

                            {/* Expanded Panels */}
                            {showSample && (
                                <div className="sample-answer p-4 mt-3">
                                    <h6 className="font-semibold mb-2">Bài mẫu:</h6>
                                    <p className="text-sm mb-3">{currentSeed.sample_answer_vi}</p>
                                    <p className="text-sm italic text-gray-600">{currentSeed.sample_answer_en}</p>
                                </div>
                            )}

                            {showVocab && (
                                <div className="vocab-panel p-4 mt-3">
                                    <h6 className="font-semibold mb-3">Từ vựng quan trọng:</h6>
                                    <div className="space-y-2">
                                        {currentSeed.vocabulary?.map((vocab, index) => (
                                            <div key={index} className="flex justify-between items-center">
                                                <span className="font-medium text-blue-800">{vocab.en}</span>
                                                <span className="text-blue-600">{vocab.vi}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Resizer - Exactly like your screenshot */}
                        <div className="resizer-col"></div>

                        {/* Right Panel - Practice Area exactly like your screenshot */}
                        <div className="practice-area-panel">
                            {/* Practice Mode Selector - Exactly like your screenshot */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {[
                                    { id: 'reorder', name: 'Sắp xếp' },
                                    { id: 'fill_blank', name: 'Điền từ' },
                                    { id: 'find_error', name: 'Tìm lỗi sai' },
                                    { id: 'choose_phrase', name: 'Chọn cụm từ' },
                                    { id: 'matching', name: 'Nối cột' },
                                    { id: 'drag_drop', name: 'Kéo thả' },
                                    { id: 'free_write', name: 'Tự viết' }
                                ].map(mode => (
                                    <button
                                        key={mode.id}
                                        onClick={() => setPracticeMode(mode.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                            practiceMode === mode.id
                                                ? 'bg-pink-500 text-white shadow-md'
                                                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {mode.name}
                                    </button>
                                ))}
                            </div>

                            {/* Question Number - Exactly like your screenshot */}
                            <div className="text-center mb-6">
                                <span className="bg-gray-100 px-4 py-2 rounded-lg text-lg font-mono">1</span>
                            </div>

                            {/* Practice Content Area */}
                            <div className="space-y-4">
                                {practiceMode === 'reorder' && (
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg justify-center">
                                            {currentSeed.vocabulary?.map((word, index) => (
                                                <div key={index} className="bilingual-word-btn cursor-pointer hover:shadow-md transition-shadow">
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

                                {practiceMode === 'fill_blank' && (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-lg mb-4">The marketing team _____ a new strategy.</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['developed', 'created', 'made', 'built'].map((option, index) => (
                                                    <button 
                                                        key={index}
                                                        className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="btn btn-primary w-full py-3">Kiểm tra</button>
                                    </div>
                                )}

                                {practiceMode === 'find_error' && (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-lg">
                                                The employee <span className="bg-red-100 border-b-2 border-red-500 cursor-pointer">who</span> received the award is very dedicated.
                                            </p>
                                        </div>
                                        <button className="btn btn-primary w-full py-3">Kiểm tra</button>
                                    </div>
                                )}

                                {practiceMode === 'choose_phrase' && (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-lg mb-4">The team _____ working on the project.</p>
                                            <div className="space-y-2">
                                                {['is currently', 'are currently', 'was currently', 'were currently'].map((option, index) => (
                                                    <button 
                                                        key={index}
                                                        className="w-full p-3 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 text-left transition-colors"
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="btn btn-primary w-full py-3">Kiểm tra</button>
                                    </div>
                                )}

                                {practiceMode === 'matching' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <h5 className="font-medium text-blue-800">English</h5>
                                                {['employee', 'received', 'dedicated'].map((word, index) => (
                                                    <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                                                        {word}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="space-y-2">
                                                <h5 className="font-medium text-green-800">Tiếng Việt</h5>
                                                {['tận tâm', 'nhân viên', 'đã nhận'].map((word, index) => (
                                                    <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                                                        {word}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="btn btn-primary w-full py-3">Kiểm tra</button>
                                    </div>
                                )}

                                {practiceMode === 'drag_drop' && (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {['The employee', 'who received', 'the award', 'is very dedicated.'].map((phrase, index) => (
                                                    <div key={index} className="p-2 bg-white border border-gray-300 rounded-lg cursor-move hover:shadow-md transition-shadow">
                                                        {phrase}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="btn btn-primary w-full py-3">Kiểm tra</button>
                                    </div>
                                )}

                                {practiceMode === 'free_write' && (
                                    <div className="space-y-4">
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
                                )}
                            </div>
                        </div>
                    </div>
                ) : selectedTrackId === 'AI_WRITING_ASSISTANT' ? (
                    /* AI Template Generator - Exactly like your screenshot */
                    <div className="bg-white rounded-xl p-8 max-w-4xl mx-auto">
                        <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
                            🤖 AI Template Generator for Writing
                        </h4>
                        <p className="text-gray-600 mb-6 text-center">
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

export default WritingStudioNew;

