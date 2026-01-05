
import React, { useState, useMemo } from 'react';
import { useAuth } from '../../App';
import { SparklesIcon } from '../Icons';
import { generateBulkFoundationExercises, generateBulkWritingSeeds, generateBulkSpeakingTasks, generateBulkTips, generateBulkCambridgeTasks } from '../../services/aiService';
import { accumulatePracticeData, accumulateListData } from '../../services/dataAccumulationService';
import { foundationContent as defaultFoundationData } from '../../data/writing_foundation/content';
import { tips1to2 as defaultTipsData } from '../../data/tips/tips1-2';
import { defaultStartersData } from '../../data/cambridge/startersData';
import { LOCAL_STORAGE_KEYS } from '../../constants';
import { WritingSubcategory, ExamPart, Tip, CambridgeTestPart } from '../../types';

// Import all granular data sources to build the selection menus
// IELTS Writing
import { ieltsTask1LineTasks } from '../../data/ielts_writing/task1LineGraphTasks';
import { ieltsTask1BarTasks } from '../../data/ielts_writing/task1BarChartTasks';
import { ieltsTask1PieTasks } from '../../data/ielts_writing/task1PieChartTasks';
import { ieltsTask1TableTasks } from '../../data/ielts_writing/task1TableTasks';
import { ieltsTask1ProcessTasks } from '../../data/ielts_writing/task1ProcessTasks';
import { ieltsTask1MapTasks } from '../../data/ielts_writing/task1MapTasks';
import { ieltsTask2OpinionTasks } from '../../data/ielts_writing/task2OpinionTasks';
import { ieltsTask2DiscussionTasks } from '../../data/ielts_writing/task2DiscussionTasks';
import { ieltsTask2ProblemSolutionTasks } from '../../data/ielts_writing/task2ProblemSolutionTasks';
import { ieltsTask2AdvDisTasks } from '../../data/ielts_writing/task2AdvDisTasks';
// TOEIC Writing
import { toeicTask1Subcategories } from '../../data/toeic_writing/part1Subcategories';
import { toeicTask2Subcategories } from '../../data/toeic_writing/part2Subcategories';
import { toeicTask3Subcategories } from '../../data/toeic_writing/part3Subcategories';
// VSTEP Writing
import { vstepTask1Subcategories } from '../../data/vstep_writing/task1Subcategories';
import { vstepTask2Subcategories } from '../../data/vstep_writing/task2Subcategories';
// IELTS Speaking
import { ieltsPart1Tasks } from '../../data/ielts/part1Tasks';
import { ieltsPart2Tasks } from '../../data/ielts/part2Tasks';
import { ieltsPart3Tasks } from '../../data/ielts/part3Tasks';
// TOEIC Speaking
import { toeicPart1Tasks } from '../../data/toeic/part1Tasks';
import { toeicPart2Tasks } from '../../data/toeic/part2Tasks';
import { toeicPart3Tasks } from '../../data/toeic/part3Tasks';
import { toeicPart4Tasks } from '../../data/toeic/part4Tasks';
import { toeicPart5Tasks } from '../../data/toeic/part5Tasks';
// VSTEP Speaking
import { vstepPart1Tasks } from '../../data/vstep/part1Tasks';
import { vstepPart2Tasks } from '../../data/vstep/part2Tasks';
import { vstepPart3Tasks } from '../../data/vstep/part3Tasks';

type GenerationMode = 'foundation' | 'writing' | 'speaking' | 'tips' | 'cambridge';

const AIContentBulkFactory: React.FC = () => {
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [log, setLog] = useState<string[]>([]);
    const [mode, setMode] = useState<GenerationMode>('foundation');

    // State for different modes
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [quantity, setQuantity] = useState(3);
    const [writingSubcategoryId, setWritingSubcategoryId] = useState('IELTS-T1-Line');
    const [speakingPartId, setSpeakingPartId] = useState('IELTS_P1_Interview');
    const [tipsTopic, setTipsTopic] = useState('giving personal opinions');
    const [cambridgePartId, setCambridgePartId] = useState('part1');

    const addLog = (message: string) => setLog(prev => [message, ...prev]);

    const allWritingOptions = useMemo(() => {
        const ieltsT1Subcategories: WritingSubcategory[] = [
            { track_id: 'IELTS', task_type: 'Task 1', subcategory_id: 'IELTS-T1-Line', subcategory_name_vi: 'Biểu đồ Đường', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài mô tả biểu đồ đường.', seeds: ieltsTask1LineTasks },
            { track_id: 'IELTS', task_type: 'Task 1', subcategory_id: 'IELTS-T1-Bar', subcategory_name_vi: 'Biểu đồ Cột', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài mô tả biểu đồ cột.', seeds: ieltsTask1BarTasks },
            { track_id: 'IELTS', task_type: 'Task 1', subcategory_id: 'IELTS-T1-Pie', subcategory_name_vi: 'Biểu đồ Tròn', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài mô tả biểu đồ tròn.', seeds: ieltsTask1PieTasks },
            { track_id: 'IELTS', task_type: 'Task 1', subcategory_id: 'IELTS-T1-Table', subcategory_name_vi: 'Bảng biểu', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài mô tả bảng biểu.', seeds: ieltsTask1TableTasks },
            { track_id: 'IELTS', task_type: 'Task 1', subcategory_id: 'IELTS-T1-Process', subcategory_name_vi: 'Quy trình', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài mô tả quy trình.', seeds: ieltsTask1ProcessTasks },
            { track_id: 'IELTS', task_type: 'Task 1', subcategory_id: 'IELTS-T1-Map', subcategory_name_vi: 'Bản đồ', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài mô tả bản đồ.', seeds: ieltsTask1MapTasks },
        ];
        const ieltsT2Subcategories: WritingSubcategory[] = [
            { track_id: 'IELTS', task_type: 'Task 2', subcategory_id: 'IELTS-T2-Opinion', subcategory_name_vi: 'Dạng bài Quan điểm', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài luận bày tỏ quan điểm.', seeds: ieltsTask2OpinionTasks },
            { track_id: 'IELTS', task_type: 'Task 2', subcategory_id: 'IELTS-T2-Discussion', subcategory_name_vi: 'Dạng bài Thảo luận', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài luận thảo luận hai quan điểm.', seeds: ieltsTask2DiscussionTasks },
            { track_id: 'IELTS', task_type: 'Task 2', subcategory_id: 'IELTS-T2-ProblemSolution', subcategory_name_vi: 'Vấn đề & Giải pháp', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài luận về nguyên nhân và giải pháp.', seeds: ieltsTask2ProblemSolutionTasks },
            { track_id: 'IELTS', task_type: 'Task 2', subcategory_id: 'IELTS-T2-AdvDis', subcategory_name_vi: 'Lợi ích & Bất lợi', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài luận về ưu và nhược điểm.', seeds: ieltsTask2AdvDisTasks },
        ];

        return [
            { label: 'IELTS', options: [...ieltsT1Subcategories, ...ieltsT2Subcategories] },
            { label: 'VSTEP', options: [...vstepTask1Subcategories, ...vstepTask2Subcategories] },
            { label: 'TOEIC', options: [...toeicTask1Subcategories, ...toeicTask2Subcategories, ...toeicTask3Subcategories] },
        ];
    }, []);

    const allSpeakingOptions = useMemo(() => {
        const ieltsData: ExamPart<any>[] = [
            { id: 'IELTS_P1_Interview', vi: 'IELTS Part 1', en: '', skills: [], tasks: ieltsPart1Tasks },
            { id: 'IELTS_P2_LongTurn', vi: 'IELTS Part 2', en: '', skills: [], tasks: ieltsPart2Tasks },
            { id: 'IELTS_P3_Discussion', vi: 'IELTS Part 3', en: '', skills: [], tasks: ieltsPart3Tasks },
        ];
        const vstepData: ExamPart<any>[] = [
            { id: 'VSTEP_P1_SocialInteraction', vi: 'VSTEP Part 1', en: '', skills: [], tasks: vstepPart1Tasks },
            { id: 'VSTEP_P2_SituationResponse', vi: 'VSTEP Part 2', en: '', skills: [], tasks: vstepPart2Tasks },
            { id: 'VSTEP_P3_TopicDevelopment', vi: 'VSTEP Part 3', en: '', skills: [], tasks: vstepPart3Tasks },
        ];
        const toeicData: ExamPart<any>[] = [
            { id: 'TOEIC_SPK_Q1_2_ReadAloud', vi: 'TOEIC Q1-2', en: '', skills: [], tasks: toeicPart1Tasks },
            { id: 'TOEIC_SPK_Q3_4_DescribePicture', vi: 'TOEIC Q3-4', en: '', skills: [], tasks: toeicPart2Tasks },
            { id: 'TOEIC_SPK_Q5_7_RespondQuestions', vi: 'TOEIC Q5-7', en: '', skills: [], tasks: toeicPart3Tasks },
            { id: 'TOEIC_SPK_Q8_10_InfoResponse', vi: 'TOEIC Q8-10', en: '', skills: [], tasks: toeicPart4Tasks },
            { id: 'TOEIC_SPK_Q11_Opinion', vi: 'TOEIC Q11', en: '', skills: [], tasks: toeicPart5Tasks },
        ];
        return [
            { label: 'IELTS', options: ieltsData },
            { label: 'VSTEP', options: vstepData },
            { label: 'TOEIC', options: toeicData }
        ];
    }, []);


    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedItems(defaultFoundationData.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleItemSelect = (id: string, isChecked: boolean) => {
        if (isChecked) {
            setSelectedItems(prev => [...prev, id]);
        } else {
            setSelectedItems(prev => prev.filter(item => item !== id));
        }
    };

    const handleGenerate = async () => {
        setIsLoading(true);
        setLog([]);
        addLog(`Starting bulk generation for mode: ${mode}...`);
        try {
            switch (mode) {
                case 'foundation': await handleGenerateFoundation(); break;
                case 'writing': await handleGenerateWriting(); break;
                case 'speaking': await handleGenerateSpeaking(); break;
                case 'tips': await handleGenerateTips(); break;
                case 'cambridge': await handleGenerateCambridge(); break;
            }
            addLog('✅ Bulk generation completed successfully!');
        } catch (err: any) {
            addLog(`❌ ERROR: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateFoundation = async () => {
        if (selectedItems.length === 0) throw new Error('No foundation items selected.');
        for (const itemId of selectedItems) {
            const item = defaultFoundationData.find(i => i.id === itemId);
            if (!item) continue;
            addLog(`--- Generating for: ${item.name_vi} ---`);
            const practiceModes = Object.keys(item.practice) as (keyof typeof item.practice)[];
            for (const pMode of practiceModes) {
                try {
                    addLog(`  -> Generating ${quantity} exercises for mode: ${pMode}...`);
                    const newExercises = await generateBulkFoundationExercises(item, pMode, quantity);
                    const stats = accumulatePracticeData(LOCAL_STORAGE_KEYS.WRITING_FOUNDATION_CONTENT, itemId, pMode, newExercises);
                    addLog(`  ✅ Success! Added ${stats.newItemCount} exercises. Total now: ${stats.totalItemCount}.`);
                } catch (e: any) { addLog(`  ❌ Failed to generate for ${pMode}: ${e.message}`); }
            }
        }
    };

    const handleGenerateWriting = async () => {
        const subcategory = allWritingOptions.flatMap(g => g.options).find(s => s.subcategory_id === writingSubcategoryId);
        if (!subcategory) throw new Error("Selected writing subcategory not found.");

        addLog(`--- Generating ${quantity} seeds for: ${subcategory.subcategory_name_vi} ---`);
        const existingPrompts = subcategory.seeds.map(s => s.prompt_en);
        const newSeeds = await generateBulkWritingSeeds(subcategory, quantity, existingPrompts);
        
        addLog(`✅ Generated ${newSeeds.length} new seeds. Saving logic needs to be implemented per data source.`);
        console.log("Generated Writing Seeds for", subcategory.subcategory_id, newSeeds);
    };

    const handleGenerateSpeaking = async () => {
        const part = allSpeakingOptions.flatMap(g => g.options).find(p => p.id === speakingPartId);
        if (!part) throw new Error("Selected speaking part not found.");
        addLog(`--- Generating ${quantity} tasks for: ${part.vi} ---`);
        const existingPrompts = part.tasks.map(t => t.prompt);
        const newTasks = await generateBulkSpeakingTasks(part, quantity, existingPrompts);
        addLog(`✅ Generated ${newTasks.length} new tasks. Saving logic needs to be implemented per data source.`);
        console.log("Generated Speaking Tasks for", part.id, newTasks);
    };

    const handleGenerateTips = async () => {
        addLog(`--- Generating ${quantity} tips for topic: ${tipsTopic} ---`);
        const existingTips = defaultTipsData.map(t => t.title);
        const newTips = await generateBulkTips(tipsTopic, quantity, existingTips);
        const stats = accumulateListData(LOCAL_STORAGE_KEYS.TIPS_1_2, null, null, null, newTips, 'id');
        addLog(`✅ Success! Added ${stats.newItemCount} tips. Total now: ${stats.totalItemCount}.`);
    };

    const handleGenerateCambridge = async () => {
        const examData = defaultStartersData[0];
        const part = examData.parts.find(p => p.partId === cambridgePartId);
        if (!part) throw new Error("Selected Cambridge part not found.");
        addLog(`--- Generating ${quantity} questions for: Starters ${part.title} ---`);
        const existingQuestions = part.questions.map(q => q.questionText.en);
        const newQuestions = await generateBulkCambridgeTasks('Starters', part, quantity, existingQuestions);
        addLog(`✅ Generated ${newQuestions.length} new questions. Saving logic needs to be implemented per data source.`);
        console.log("Generated Cambridge Questions for", part.partId, newQuestions);
    };

    return (
        <div className="card-base bg-white border border-gray-200">
            <header className="aio-card-header !bg-teal-50 border-b-2 border-teal-200">
                <div>
                    <h3 className="text-xl font-bold text-teal-800">AI Content Bulk Factory</h3>
                    <p className="text-sm text-teal-600">Generate and accumulate large amounts of practice data for the entire app.</p>
                </div>
            </header>
            <div className="aio-card-body space-y-4">
                <div>
                    <label className="font-semibold text-gray-700 block mb-1">Select Content Type:</label>
                    <select value={mode} onChange={(e) => setMode(e.target.value as GenerationMode)} className="form-input w-full">
                        <option value="foundation">Ngữ pháp Nền tảng (Foundation)</option>
                        <option value="writing">Writing Studio</option>
                        <option value="speaking">Speaking Studio</option>
                        <option value="tips">Mẹo Thi (Tips)</option>
                        <option value="cambridge">Luyện Thi Cambridge</option>
                    </select>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50/50 space-y-4">
                    {mode === 'foundation' && (
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="font-semibold text-gray-700">Select Foundation Items:</label>
                                <label className="flex items-center text-sm">
                                    <input type="checkbox" onChange={handleSelectAll} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <span className="ml-2">Select All</span>
                                </label>
                            </div>
                            <div className="max-h-60 overflow-y-auto border rounded-md p-2 bg-white grid grid-cols-2 gap-2">
                                {defaultFoundationData.map(item => (
                                    <label key={item.id} className="flex items-center p-2 rounded hover:bg-gray-100">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedItems.includes(item.id)}
                                            onChange={(e) => handleItemSelect(item.id, e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-3 text-sm">{item.name_vi}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    {mode === 'writing' && (
                         <div>
                            <label className="font-semibold text-gray-700 block mb-1">Select Writing Subcategory:</label>
                            <select value={writingSubcategoryId} onChange={e => setWritingSubcategoryId(e.target.value)} className="form-input w-full">
                                {allWritingOptions.map(group => (
                                    <optgroup key={group.label} label={group.label}>
                                        {group.options.map(sub => <option key={sub.subcategory_id} value={sub.subcategory_id}>{sub.task_type} - {sub.subcategory_name_vi}</option>)}
                                    </optgroup>
                                ))}
                            </select>
                        </div>
                    )}
                     {mode === 'speaking' && (
                         <div>
                            <label className="font-semibold text-gray-700 block mb-1">Select Speaking Part:</label>
                            <select value={speakingPartId} onChange={e => setSpeakingPartId(e.target.value)} className="form-input w-full">
                                {allSpeakingOptions.map(group => (
                                    <optgroup key={group.label} label={group.label}>
                                        {group.options.map(part => <option key={part.id} value={part.id}>{part.vi}</option>)}
                                    </optgroup>
                                ))}
                            </select>
                        </div>
                    )}
                     {mode === 'tips' && (
                         <div>
                            <label className="font-semibold text-gray-700 block mb-1">Tip Topic / Problem:</label>
                            <input type="text" value={tipsTopic} onChange={e => setTipsTopic(e.target.value)} className="form-input w-full" placeholder="e.g., how to extend answers"/>
                        </div>
                    )}
                    {mode === 'cambridge' && (
                         <div>
                            <label className="font-semibold text-gray-700 block mb-1">Select Cambridge Part (Starters):</label>
                            <select value={cambridgePartId} onChange={e => setCambridgePartId(e.target.value)} className="form-input w-full">
                                {defaultStartersData[0].parts.map(part => <option key={part.partId} value={part.partId}>{part.title}</option>)}
                            </select>
                        </div>
                    )}
                    <div>
                        <label className="font-semibold text-gray-700 block mb-1">Number of new items to generate:</label>
                        <input 
                            type="number" 
                            value={quantity} 
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className="form-input w-full"
                        />
                    </div>
                </div>
                <button onClick={handleGenerate} disabled={isLoading} className="btn btn-ai-creator w-full text-lg py-3 !bg-teal-600 hover:!bg-teal-700">
                     {isLoading ? <div className="ai-spinner mr-2"></div> : <SparklesIcon className="w-6 h-6 mr-2"/>}
                    {isLoading ? `Generating...` : `Generate & Accumulate Data`}
                </button>
                {log.length > 0 && (
                    <div>
                        <h4 className="font-bold text-gray-700 mb-2">Generation Log:</h4>
                        <div className="w-full h-48 bg-gray-900 text-white font-mono text-xs rounded-lg p-3 overflow-y-auto">
                            {log.map((entry, index) => <p key={index} className={entry.startsWith('❌') ? 'text-red-400' : entry.startsWith('✅') ? 'text-green-400' : ''}>{`> ${entry}`}</p>)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIContentBulkFactory;
