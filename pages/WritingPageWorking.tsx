import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../App';
import { 
    SparklesIcon, BookOpenIcon, CheckBadgeIcon, LightBulbIcon, 
    EyeIcon, MagicWandIcon
} from '../components/Icons';

// Simplified types matching your design
interface FoundationTopic {
    id: string;
    name_vi: string;
    name_en: string;
    sentence: string;
    level: 'easy' | 'medium' | 'advanced';
    category: string;
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

const WritingPageWorking: React.FC = () => {
    const { currentUser } = useAuth();
    
    // State exactly matching your screenshots
    const [selectedTrackId, setSelectedTrackId] = useState<string>('EASY');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);
    const [foundationLevelFilter, setFoundationLevelFilter] = useState<'all' | 'easy' | 'medium' | 'advanced'>('all');
    const [practiceMode, setPracticeMode] = useState<string>('reorder');
    const [currentTopicId, setCurrentTopicId] = useState<string>('F001');
    const [freeWriteInput, setFreeWriteInput] = useState<string>('');

    // Complete Foundation Data exactly matching your screenshots
    const foundationData: FoundationTopic[] = useMemo(() => [
        // Cấu trúc câu - Easy
        { id: 'F001', name_vi: 'Câu đơn (S-V-O)', name_en: 'Simple Sentence (S-V-O)', sentence: 'The marketing team developed a new strategy.', level: 'easy', category: 'Cấu trúc câu' },
        { id: 'F002', name_vi: 'Câu với "There is/are"', name_en: 'There is/are constructions', sentence: 'There are many opportunities here.', level: 'easy', category: 'Cấu trúc câu' },
        { id: 'F003', name_vi: 'Câu với "be" + tính từ (S-V-C)', name_en: 'SVC with be + adjective', sentence: 'The presentation was excellent.', level: 'easy', category: 'Cấu trúc câu' },
        { id: 'F004', name_vi: 'Mệnh đề quan hệ', name_en: 'Relative Clauses', sentence: 'The employee who received the award is very dedicated.', level: 'medium', category: 'Cấu trúc câu' },
        { id: 'F005', name_vi: 'Câu bị động', name_en: 'Passive Voice', sentence: 'The report was completed by the team.', level: 'medium', category: 'Cấu trúc câu' },
        { id: 'F006', name_vi: 'Câu ghép (FANBOYS)', name_en: 'Compound Sentences', sentence: 'The project is challenging, but it is rewarding.', level: 'medium', category: 'Cấu trúc câu' },
        { id: 'F007', name_vi: 'Câu đảo ngữ', name_en: 'Inversion', sentence: 'Never have we seen such impressive results.', level: 'advanced', category: 'Cấu trúc câu' },
        { id: 'F008', name_vi: 'Câu phức hợp', name_en: 'Complex Sentences', sentence: 'Although the task was difficult, we completed it successfully.', level: 'advanced', category: 'Cấu trúc câu' },
        
        // Thì (Tenses)
        { id: 'F009', name_vi: 'Hiện tại đơn', name_en: 'Simple Present', sentence: 'The team meets every Monday.', level: 'easy', category: 'Thì (Tenses)' },
        { id: 'F010', name_vi: 'Hiện tại tiếp diễn', name_en: 'Present Continuous', sentence: 'We are working on a new project.', level: 'easy', category: 'Thì (Tenses)' },
        { id: 'F011', name_vi: 'Quá khứ đơn', name_en: 'Simple Past', sentence: 'The conference ended successfully.', level: 'easy', category: 'Thì (Tenses)' },
        { id: 'F012', name_vi: 'Tương lai đơn – will', name_en: 'Simple Future', sentence: 'The results will be announced tomorrow.', level: 'easy', category: 'Thì (Tenses)' },
        { id: 'F013', name_vi: 'Tương lai gần – be going to', name_en: 'Near Future', sentence: 'We are going to launch the product next month.', level: 'easy', category: 'Thì (Tenses)' },
        { id: 'F014', name_vi: 'Hiện tại hoàn thành', name_en: 'Present Perfect', sentence: 'The team has completed three projects this month.', level: 'medium', category: 'Thì (Tenses)' },
        { id: 'F015', name_vi: 'Quá khứ hoàn thành', name_en: 'Past Perfect', sentence: 'By the time we arrived, the meeting had started.', level: 'medium', category: 'Thì (Tenses)' }
    ], []);

    // Complete Writing Categories exactly matching your screenshots
    const writingData: WritingCategory[] = useMemo(() => [
        {
            category_id: 'VSTEP',
            track_name_vi: 'Luyện thi VSTEP',
            subcategories: [
                { subcategory_id: 'vstep_task1_thank', subcategory_name_vi: 'Task 1: Thư Cảm ơn', task_type: 'Task 1', seeds: [] },
                { subcategory_id: 'vstep_task1_apology', subcategory_name_vi: 'Task 1: Thư Xin lỗi', task_type: 'Task 1', seeds: [] },
                { subcategory_id: 'vstep_task1_request', subcategory_name_vi: 'Task 1: Thư Yêu cầu', task_type: 'Task 1', seeds: [] },
                { subcategory_id: 'vstep_task1_complaint', subcategory_name_vi: 'Task 1: Thư Phản nàn', task_type: 'Task 1', seeds: [] },
                { subcategory_id: 'vstep_task1_invitation', subcategory_name_vi: 'Task 1: Thư Mời', task_type: 'Task 1', seeds: [] },
                { subcategory_id: 'vstep_task1_advice', subcategory_name_vi: 'Task 1: Thư Cho lời khuyên', task_type: 'Task 1', seeds: [] },
                { subcategory_id: 'vstep_task1_application', subcategory_name_vi: 'Task 1: Thư Ứng tuyển', task_type: 'Task 1', seeds: [] }
            ]
        },
        {
            category_id: 'TOEIC',
            track_name_vi: 'Luyện thi TOEIC',
            subcategories: [
                { subcategory_id: 'toeic_task1', subcategory_name_vi: 'Task 1-5: Miêu tả Tranh', task_type: 'Task 1-5', seeds: [] },
                { subcategory_id: 'toeic_task6', subcategory_name_vi: 'Task 6-7: Trả lời Email', task_type: 'Task 6-7', seeds: [] },
                { subcategory_id: 'toeic_task8', subcategory_name_vi: 'Task 8: Viết bài luận', task_type: 'Task 8', seeds: [] }
            ]
        },
        {
            category_id: 'IELTS',
            track_name_vi: 'Luyện thi IELTS',
            subcategories: [
                // Task 1
                { subcategory_id: 'ielts_task1_line', subcategory_name_vi: 'Biểu đồ Đường', task_type: 'Task 1', seeds: [] },
                { subcategory_id: 'ielts_task1_bar', subcategory_name_vi: 'Biểu đồ Cột', task_type: 'Task 1', seeds: [] },
                { subcategory_id: 'ielts_task1_pie', subcategory_name_vi: 'Biểu đồ Tròn', task_type: 'Task 1', seeds: [] },
                { subcategory_id: 'ielts_task1_table', subcategory_name_vi: 'Bảng biểu', task_type: 'Task 1', seeds: [] },
                { subcategory_id: 'ielts_task1_process', subcategory_name_vi: 'Quy trình', task_type: 'Task 1', seeds: [] },
                { subcategory_id: 'ielts_task1_map', subcategory_name_vi: 'Bản đồ', task_type: 'Task 1', seeds: [] },
                { subcategory_id: 'ielts_task1_mix', subcategory_name_vi: 'Mix', task_type: 'Task 1', seeds: [] },
                // Task 2
                { subcategory_id: 'ielts_task2_opinion', subcategory_name_vi: 'Dạng bài Quan điểm', task_type: 'Task 2', seeds: [] },
                { subcategory_id: 'ielts_task2_discussion', subcategory_name_vi: 'Dạng bài Thảo luận', task_type: 'Task 2', seeds: [] },
                { subcategory_id: 'ielts_task2_problem', subcategory_name_vi: 'Vấn đề & Giải pháp', task_type: 'Task 2', seeds: [] },
                { subcategory_id: 'ielts_task2_advantages', subcategory_name_vi: 'Lợi ích & Bất lợi', task_type: 'Task 2', seeds: [] }
            ]
        }
    ], []);

    const allTracks = useMemo(() => [
        { category_id: 'EASY', track_name_vi: 'Kỹ năng Nền tảng', subcategories: [] },
        ...writingData,
        { category_id: 'AI_WRITING_ASSISTANT', track_name_vi: 'Trợ lý Viết AI', subcategories: [] }
    ], [writingData]);

    const selectedTrack = useMemo(() => 
        allTracks.find(t => t.category_id === selectedTrackId), 
        [allTracks, selectedTrackId]
    );

    const selectedSubcategory = useMemo(() => 
        selectedTrack?.subcategories.find(s => s.subcategory_id === selectedSubcategoryId) || null,
        [selectedTrack, selectedSubcategoryId]
    );

    const filteredFoundationData = useMemo(() => 
        foundationLevelFilter === 'all' 
            ? foundationData 
            : foundationData.filter(topic => topic.level === foundationLevelFilter),
        [foundationData, foundationLevelFilter]
    );

    const currentTopic = useMemo(() => 
        foundationData.find(t => t.id === currentTopicId) || foundationData[0],
        [foundationData, currentTopicId]
    );

    const practiceModesConfig = [
        { id: 'reorder', name: 'Sắp xếp' },
        { id: 'fill_blank', name: 'Điền từ' },
        { id: 'find_error', name: 'Tìm lỗi sai' },
        { id: 'choose_phrase', name: 'Chọn cụm từ' },
        { id: 'matching', name: 'Nối cột' },
        { id: 'drag_drop', name: 'Kéo thả' },
        { id: 'free_write', name: 'Tự viết' }
    ];

    const renderPracticeArea = () => {
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
                        <button className="btn btn-secondary flex items-center gap-2">
                            <CheckBadgeIcon className="w-4 h-4" />
                            Chấm điểm
                        </button>
                    </div>
                </div>
            );
        }

        if (practiceMode === 'reorder' && selectedTrackId === 'EASY' && currentTopic) {
            // Sample bilingual words for reorder practice
            const sampleWords = [
                { en: 'The team', vi: 'Đội' },
                { en: 'developed', vi: 'đã phát triển' },
                { en: 'a new strategy.', vi: 'một chiến lược mới.' }
            ];

            return (
                <div className="space-y-4">
                    <div className="text-center mb-4">
                        <span className="bg-gray-100 px-4 py-2 rounded-lg text-lg font-mono">1</span>
                    </div>
                    <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg justify-center">
                        {sampleWords.map((word, index) => (
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
    };

    return (
        <div className="writing-studio bg-gray-50/50 -m-8 p-8 min-h-screen">
            {/* Track Selection - Exactly like your screenshot */}
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
                {/* Foundation Level Filter */}
                {selectedTrackId === 'EASY' && (
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {[
                            { id: 'all', label: 'Tất cả' },
                            { id: 'easy', label: 'Căn bản' },
                            { id: 'medium', label: 'Trung bình' },
                            { id: 'advanced', label: 'Nâng cao' }
                        ].map(filter => (
                            <button
                                key={filter.id}
                                onClick={() => setFoundationLevelFilter(filter.id as any)}
                                className={`level-filter-btn ${
                                    foundationLevelFilter === filter.id ? 'level-filter-btn--active' : ''
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* IELTS Subcategory Selection - 2 rows like your screenshot */}
                {selectedTrackId === 'IELTS' && (
                    <div className="mb-8 space-y-4">
                        {/* Task 1 Row */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {selectedTrack?.subcategories
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
                            {selectedTrack?.subcategories
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
                )}

                {/* Other exam subcategories - single row */}
                {selectedTrack && selectedTrack.subcategories.length > 0 && selectedTrackId !== 'IELTS' && selectedTrackId !== 'EASY' && selectedTrackId !== 'AI_WRITING_ASSISTANT' && (
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {selectedTrack.subcategories.map(sub => (
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

                {/* AI Buttons - Top right positioning */}
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

                {/* Main Practice Area - 2 Panel Layout */}
                {(selectedTrackId === 'EASY' || selectedSubcategoryId) ? (
                    <div className="practice-studio-grid">
                        {/* Left Panel */}
                        <div className="practice-list-panel flex flex-col">
                            <h3 className="font-bold text-lg text-center mb-2 border-b pb-2 flex-shrink-0">
                                Đề thi
                            </h3>
                            <div className="flex-grow overflow-y-auto pr-2 -mr-2 max-h-[65vh] space-y-1">
                                {selectedTrackId === 'EASY' ? (
                                    // Foundation topics grouped by category
                                    Object.entries(filteredFoundationData.reduce((acc, topic) => {
                                        if (!acc[topic.category]) acc[topic.category] = [];
                                        acc[topic.category].push(topic);
                                        return acc;
                                    }, {} as Record<string, FoundationTopic[]>)).map(([category, topics]) => (
                                        <div key={category}>
                                            <h4 className="font-bold text-gray-500 mt-4 mb-1 px-1">{category}</h4>
                                            {topics.map((topic) => (
                                                <button
                                                    key={topic.id}
                                                    onClick={() => setCurrentTopicId(topic.id)}
                                                    className={`w-full text-left p-3 rounded-lg transition-all font-medium mb-1 ${
                                                        currentTopicId === topic.id
                                                            ? 'bg-pink-500 text-white shadow-md'
                                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                    }`}
                                                >
                                                    <span className="truncate">{topic.name_vi}</span>
                                                </button>
                                            ))}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-gray-500">
                                        Chọn subcategory để xem topics
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Resizer */}
                        <div className="resizer-col"></div>

                        {/* Right Panel */}
                        <div className="practice-area-panel">
                            {selectedTrackId === 'EASY' && currentTopic ? (
                                <>
                                    <div className="prompt-display-area mb-4">
                                        <h4 className="font-bold text-gray-800 text-base leading-tight mb-2">
                                            {currentTopic.name_vi}
                                        </h4>
                                        <p className="text-gray-500 text-sm italic mb-2">
                                            "{currentTopic.name_en}"
                                        </p>
                                        <p className="text-sm text-gray-800">
                                            <b>Câu đúng:</b> {currentTopic.sentence}
                                        </p>
                                    </div>

                                    {/* Practice Mode Selector */}
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        {practiceModesConfig.map(mode => (
                                            <div key={mode.id} className="mode-selector-container">
                                                <button
                                                    onClick={() => setPracticeMode(mode.id)}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                                        practiceMode === mode.id
                                                            ? 'bg-pink-500 text-white shadow-md'
                                                            : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {mode.name}
                                                </button>
                                                {mode.id !== 'free_write' && (
                                                    <button
                                                        className="btn-ai-generate-exercise ml-1"
                                                        title={`AI tạo thêm bài tập ${mode.name}`}
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
                            ) : selectedTrackId === 'IELTS' && selectedSubcategory ? (
                                <>
                                    <div className="prompt-display-area mb-4">
                                        {/* Image placeholder for IELTS Task 1 */}
                                        {selectedSubcategory.task_type === 'Task 1' && (
                                            <div className="mb-4">
                                                <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                                    <div className="text-center">
                                                        <EyeIcon className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                                                        <p className="text-gray-500 font-medium">Image Placeholder</p>
                                                        <p className="text-sm text-gray-400 mt-1">
                                                            ({selectedSubcategory.subcategory_name_vi} sẽ hiển thị ở đây)
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <h4 className="font-bold text-gray-800 text-base leading-tight mb-2">
                                            {selectedSubcategory.subcategory_name_vi}
                                        </h4>
                                        <p className="text-gray-500 text-sm italic mb-2">
                                            "IELTS {selectedSubcategory.task_type}"
                                        </p>
                                        <p className="text-sm text-gray-800">
                                            Viết bài mô tả {selectedSubcategory.subcategory_name_vi.toLowerCase()}
                                        </p>
                                    </div>

                                    {/* Practice Mode Selector */}
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        {practiceModesConfig.map(mode => (
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

                                    <div className="mt-4 flex-grow flex flex-col">
                                        {renderPracticeArea()}
                                    </div>
                                </>
                            ) : selectedTrackId === 'AI_WRITING_ASSISTANT' ? (
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
                )}
            </main>
        </div>
    );
};

export default WritingPageWorking;
