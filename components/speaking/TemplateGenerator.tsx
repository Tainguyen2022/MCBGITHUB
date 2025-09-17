
import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../App';
import { loadOrInitializeData } from '../../services/dataService';
import { LOCAL_STORAGE_KEYS } from '../../constants';
// FIX: Corrected imports to use named exports with aliases, resolving module resolution errors.
import { vstepPart1Tasks as defaultVstepP1Tasks } from '../../data/vstep/part1Tasks';
import { vstepPart2Tasks as defaultVstepP2Tasks } from '../../data/vstep/part2Tasks';
import { vstepPart3Tasks as defaultVstepP3Tasks } from '../../data/vstep/part3Tasks';
import { toeicPart1Tasks as defaultToeicP1Tasks } from '../../data/toeic/part1Tasks';
import { toeicPart2Tasks as defaultToeicP2Tasks } from '../../data/toeic/part2Tasks';
import { toeicPart3Tasks as defaultToeicP3Tasks } from '../../data/toeic/part3Tasks';
import { toeicPart4Tasks as defaultToeicP4Tasks } from '../../data/toeic/part4Tasks';
import { toeicPart5Tasks as defaultToeicP5Tasks } from '../../data/toeic/part5Tasks';
// FIX: Import types and functions needed for writing templates
import { ExamData, IeltsTask, AIGeneratedTemplate, AITemplatePart, WritingCategory } from '../../types';
import { generateSpeakingTemplate, generateWritingTemplate } from '../../services/aiService';
import { SparklesIcon } from '../Icons';
import { useNavigate } from 'react-router-dom';

// FIX: Update props to be generic for both speaking and writing
interface TemplateGeneratorProps {
    ieltsData?: ExamData<IeltsTask>; // For speaking
    writingData?: WritingCategory[]; // For writing
    type: 'speaking' | 'writing';
}

const TemplateSection: React.FC<{title: string, part: AITemplatePart}> = ({title, part}) => (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="text-xl font-semibold text-gray-700 mb-3">{title}</h4>
        <div className="grid md:grid-cols-2 gap-4">
            <div>
                <h5 className="font-bold text-gray-600 mb-1">Tiếng Việt</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-800">
                    {part.vi.map((phrase, i) => <li key={i}>{phrase}</li>)}
                </ul>
            </div>
            <div>
                <h5 className="font-bold text-gray-600 mb-1">English</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-800">
                     {part.en.map((phrase, i) => <li key={i}>{phrase}</li>)}
                </ul>
            </div>
        </div>
    </div>
);

// FIX: Refactor component to handle both speaking and writing template generation
// and add missing return statement with JSX to fix component type error.
const TemplateGenerator: React.FC<TemplateGeneratorProps> = ({ ieltsData, writingData, type }) => {
    const { currentUser, updateUser, guestBananaBalance, useGuestBanana } = useAuth();
    const navigate = useNavigate();
    // Load speaking data (only needed if type is speaking)
    const vstepP1Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_VSTEP_P1_TASKS, defaultVstepP1Tasks), []);
    const vstepP2Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_VSTEP_P2_TASKS, defaultVstepP2Tasks), []);
    const vstepP3Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_VSTEP_P3_TASKS, defaultVstepP3Tasks), []);
    const toeicP1Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_TOEIC_P1_TASKS, defaultToeicP1Tasks), []);
    const toeicP2Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_TOEIC_P2_TASKS, defaultToeicP2Tasks), []);
    const toeicP3Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_TOEIC_P3_TASKS, defaultToeicP3Tasks), []);
    const toeicP4Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_TOEIC_P4_TASKS, defaultToeicP4Tasks), []);
    const toeicP5Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_TOEIC_P5_TASKS, defaultToeicP5Tasks), []);

    const vstepSpeakingDataForGenerator = useMemo(() => ({
        "VSTEP_P1_SocialInteraction": { id: "VSTEP_P1_SocialInteraction", vi: "Phần 1: Tương tác xã hội", tasks: vstepP1Tasks },
        "VSTEP_P2_SituationResponse": { id: "VSTEP_P2_SituationResponse", vi: "Phần 2: Thảo luận giải pháp", tasks: vstepP2Tasks },
        "VSTEP_P3_TopicDevelopment": { id: "VSTEP_P3_TopicDevelopment", vi: "Phần 3: Phát triển chủ đề", tasks: vstepP3Tasks }
    }), [vstepP1Tasks, vstepP2Tasks, vstepP3Tasks]);

    const toeicSpeakingDataForGenerator = useMemo(() => ({
        "TOEIC_SPK_Q1_2_ReadAloud": { id: "TOEIC_SPK_Q1_2_ReadAloud", vi: "Q1–Q2: Đọc thành tiếng một đoạn văn", tasks: toeicP1Tasks },
        "TOEIC_SPK_Q3_4_DescribePicture": { id: "TOEIC_SPK_Q3_4_DescribePicture", vi: "Q3–Q4: Miêu tả một bức tranh", tasks: toeicP2Tasks },
        "TOEIC_SPK_Q5_7_RespondQuestions": { id: "TOEIC_SPK_Q5_7_RespondQuestions", vi: "Q5–Q7: Trả lời câu hỏi", tasks: toeicP3Tasks },
        "TOEIC_SPK_Q8_10_InfoResponse": { id: "TOEIC_SPK_Q8_10_InfoResponse", vi: "Q8–Q10: Trả lời câu hỏi sử dụng thông tin cho sẵn", tasks: toeicP4Tasks },
        "TOEIC_SPK_Q11_Opinion": { id: "TOEIC_SPK_Q11_Opinion", vi: "Q11: Trình bày quan điểm", tasks: toeicP5Tasks }
    }), [toeicP1Tasks, toeicP2Tasks, toeicP3Tasks, toeicP4Tasks, toeicP5Tasks]);


    const templateOptions = useMemo(() => {
        if (type === 'writing' && writingData) {
            return writingData
                .filter(cat => cat.category_id !== 'EASY' && cat.category_id !== 'AI_WRITING_ASSISTANT')
                .map(cat => ({
                    id: cat.category_id,
                    name: cat.track_name_vi,
                    tasks: cat.subcategories.reduce((acc, sub) => {
                        let task = acc.find(t => t.name === sub.task_type);
                        if (!task) {
                            task = { name: sub.task_type, subTypes: [] };
                            acc.push(task);
                        }
                        task.subTypes.push({ id: sub.subcategory_id, name: sub.subcategory_name_vi });
                        return acc;
                    }, [] as { name: string; subTypes: { id: string; name: string }[] }[])
                }));
        }

        if (type === 'speaking' && ieltsData) {
            return [
                {
                    id: 'IELTS',
                    name: 'Luyện thi IELTS',
                    tasks: Object.values(ieltsData).map(part => ({
                        name: part.vi,
                        subTypes: part.tasks.map(task => ({ id: task.id, name: task.title }))
                    }))
                },
                {
                    id: 'TOEIC',
                    name: 'Luyện thi TOEIC',
                    tasks: Object.values(toeicSpeakingDataForGenerator).map(part => ({
                        name: part.vi,
                        subTypes: part.tasks.map(task => ({ id: task.id, name: task.title }))
                    }))
                },
                {
                    id: 'VSTEP',
                    name: 'Luyện thi VSTEP',
                    tasks: Object.values(vstepSpeakingDataForGenerator).map(part => ({
                        name: part.vi,
                        subTypes: part.tasks.map(task => ({ id: task.id, name: task.title }))
                    }))
                }
            ];
        }
        return [];
    }, [type, ieltsData, writingData, toeicSpeakingDataForGenerator, vstepSpeakingDataForGenerator]);

    const [selectedExam, setSelectedExam] = useState(templateOptions[0]?.id || '');
    const [selectedTask, setSelectedTask] = useState(templateOptions[0]?.tasks[0]?.name || '');
    const [selectedSubType, setSelectedSubType] = useState(templateOptions[0]?.tasks[0]?.subTypes[0]?.id || '');
    
    const [template, setTemplate] = useState<AIGeneratedTemplate | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const currentExamData = useMemo(() => templateOptions.find(e => e.id === selectedExam), [selectedExam, templateOptions]);
    const currentTaskData = useMemo(() => currentExamData?.tasks.find(t => t.name === selectedTask), [selectedTask, currentExamData]);

    useEffect(() => {
        if (currentExamData) {
            const firstTask = currentExamData.tasks[0];
            if (firstTask) {
                setSelectedTask(firstTask.name);
            } else {
                 setSelectedTask('');
            }
        }
    }, [selectedExam, currentExamData]);
    
    useEffect(() => {
        if (currentTaskData) {
             const firstSubType = currentTaskData.subTypes[0];
             if (firstSubType) {
                setSelectedSubType(firstSubType.id);
             } else {
                setSelectedSubType('');
             }
        }
    }, [selectedTask, currentTaskData]);
    
    const handleBananaCheck = () => {
        if (currentUser) {
            if (currentUser.bananaBalance <= 0) {
                alert('Bạn đã hết chuối! 🍌 Vui lòng nạp thêm để tiếp tục sử dụng tính năng AI.');
                return false;
            }
        } else {
            if (guestBananaBalance <= 0) {
                alert('Bạn đã dùng hết chuối miễn phí cho khách. Vui lòng đăng nhập hoặc đăng ký để tiếp tục sử dụng tính năng AI.');
                navigate('/login');
                return false;
            }
        }
        return true;
    };
    
    const handleAITransaction = (promise: Promise<any>) => {
        promise.then(() => {
            if (currentUser) {
                updateUser({ ...currentUser, bananaBalance: currentUser.bananaBalance - 1 });
            } else {
                useGuestBanana();
            }
        }).catch(console.error);
    };

    const handleGenerateTemplate = async () => {
        if (!selectedExam || !selectedTask || !selectedSubType) {
            setError('Please make a selection for all fields.');
            return;
        }

        if (!handleBananaCheck()) return;

        setIsLoading(true);
        setError('');
        setTemplate(null);

        const subTypeName = currentTaskData?.subTypes.find(st => st.id === selectedSubType)?.name || '';
        const promise = type === 'speaking'
            ? generateSpeakingTemplate(selectedExam, selectedTask, subTypeName)
            : generateWritingTemplate(selectedExam, selectedTask, subTypeName);
        
        handleAITransaction(promise);

        try {
            const result = await promise;
            setTemplate(result);
        } catch (err) {
            console.error(err);
            setError('Failed to generate template. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card-base bg-white p-6 space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">AI Template Generator for {type === 'speaking' ? 'Speaking' : 'Writing'}</h3>
            <p className="text-gray-600">
                Select an exam, task, and subtype to generate a bilingual template with useful phrases and structures.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="exam-select" className="form-label">Exam</label>
                    <select id="exam-select" value={selectedExam} onChange={e => setSelectedExam(e.target.value)} className="form-input">
                        {templateOptions.map(exam => (
                            <option key={exam.id} value={exam.id}>{exam.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="task-select" className="form-label">Task / Part</label>
                    <select id="task-select" value={selectedTask} onChange={e => setSelectedTask(e.target.value)} className="form-input" disabled={!currentExamData}>
                        {currentExamData?.tasks.map(task => (
                            <option key={task.name} value={task.name}>{task.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="subtype-select" className="form-label">Sub-type</label>
                    <select id="subtype-select" value={selectedSubType} onChange={e => setSelectedSubType(e.target.value)} className="form-input" disabled={!currentTaskData}>
                        {currentTaskData?.subTypes.map(subType => (
                            <option key={subType.id} value={subType.id}>{subType.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button onClick={handleGenerateTemplate} disabled={isLoading || !selectedSubType} className="btn btn-ai-assistant w-full text-lg py-3">
                {isLoading ? <div className="ai-spinner mr-2"></div> : <SparklesIcon className="w-6 h-6 mr-2" />}
                {isLoading ? 'Generating...' : 'Generate Template'}
            </button>

            {error && <div className="p-3 bg-red-100 text-red-800 rounded-md text-center font-semibold">{error}</div>}

            {template && (
                <div className="mt-6 space-y-4 border-t pt-6 animate-fade-in">
                    <h3 className="text-2xl font-bold text-center text-gray-800">{template.title_vi}</h3>
                    <h4 className="text-lg font-semibold text-center text-gray-600 -mt-2 mb-4">{template.title_en}</h4>
                    <TemplateSection title="Introduction / Mở bài" part={template.introduction} />
                    {template.overview && <TemplateSection title="Overview / Tổng quan" part={template.overview} />}
                    {template.body_paragraphs.map((part, index) => (
                        <TemplateSection key={index} title={`Body Paragraph ${index + 1} / Thân bài ${index + 1}`} part={part} />
                    ))}
                    {template.conclusion && <TemplateSection title="Conclusion / Kết bài" part={template.conclusion} />}
                </div>
            )}
        </div>
    );
};

export default TemplateGenerator;
