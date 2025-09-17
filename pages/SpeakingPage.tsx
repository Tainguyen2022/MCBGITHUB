
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Import modular TOEIC data
import { toeicPart1Tasks as defaultToeicP1Tasks } from '../data/toeic/part1Tasks';
import { toeicPart1Content as defaultToeicP1Content } from '../data/toeic/part1Content';
import { toeicPart2Tasks as defaultToeicP2Tasks } from '../data/toeic/part2Tasks';
import { toeicPart2Content as defaultToeicP2Content } from '../data/toeic/part2Content';
import { toeicPart3Tasks as defaultToeicP3Tasks } from '../data/toeic/part3Tasks';
import { toeicPart3Content as defaultToeicP3Content } from '../data/toeic/part3Content';
import { toeicPart4Tasks as defaultToeicP4Tasks } from '../data/toeic/part4Tasks';
import { toeicPart4Content as defaultToeicP4Content } from '../data/toeic/part4Content';
import { toeicPart5Tasks as defaultToeicP5Tasks } from '../data/toeic/part5Tasks';
import { toeicPart5Content as defaultToeicP5Content } from '../data/toeic/part5Content';
// NEW: Import modular IELTS data
import { ieltsPart1Tasks as defaultIeltsP1Tasks } from '../data/ielts/part1Tasks';
import { ieltsPart1Content as defaultIeltsP1Content } from '../data/ielts/part1Content';
import { ieltsPart2Tasks as defaultIeltsP2Tasks } from '../data/ielts/part2Tasks';
import { ieltsPart2Content as defaultIeltsP2Content } from '../data/ielts/part2Content';
import { ieltsPart3Tasks as defaultIeltsP3Tasks } from '../data/ielts/part3Tasks';
import { ieltsPart3Content as defaultIeltsP3Content } from '../data/ielts/part3Content';
// Import modular VSTEP data
import { vstepPart1Tasks as defaultVstepP1Tasks } from '../data/vstep/part1Tasks';
import { vstepPart1Content as defaultVstepP1Content } from '../data/vstep/part1Content';
import { vstepPart2Tasks as defaultVstepP2Tasks } from '../data/vstep/part2Tasks';
import { vstepPart2Content as defaultVstepP2Content } from '../data/vstep/part2Content';
import { vstepPart3Tasks as defaultVstepP3Tasks } from '../data/vstep/part3Tasks';
import { vstepPart3Content as defaultVstepP3Content } from '../data/vstep/part3Content';
// NEW: Import modular Scenarios Data
import { speakingScenariosContent as defaultScenariosData } from '../data/speaking_scenarios/content';
import { Scenario, ExamData, ExamPart, ExamTask, VstepTask, WritingVocabItem, IeltsTask, ToeicTask, AIGeneratedVstepAnswer } from '../types';
import { loadOrInitializeData } from '../services/dataService';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { XMarkIcon, BookOpenIcon, ListBulletIcon, AcademicCapIcon, CheckIcon, LightBulbIcon } from '../components/Icons';
import { generateVstepSampleAnswer } from '../services/aiService';
import GcsImage from '../components/GcsImage';
import { getSpeakingPageState, saveSpeakingPageState } from '../services/userStateService';
import { useAuth } from '../App';
import TemplateGenerator from '../components/speaking/TemplateGenerator';

type Tab = 'scenarios' | 'toeic' | 'ielts' | 'vstep' | 'ai_assistant';

// --- Helper Types for Modular Data ---
type VstepTaskContent = Pick<VstepTask, 'sampleAnswer_en' | 'sampleAnswer_vi' | 'outline_en' | 'outline_vi' | 'vocabulary'>;
type VstepContentMap = Record<string, VstepTaskContent>;
type ToeicTaskContent = Pick<ToeicTask, 'sampleAnswer_en' | 'sampleAnswer_vi' | 'outline_en' | 'outline_vi' | 'vocabulary'>;
type ToeicContentMap = Record<string, ToeicTaskContent>;
type IeltsTaskContent = Pick<IeltsTask, 'sampleAnswer_en' | 'sampleAnswer_vi' | 'outline_en' | 'outline_vi' | 'vocabulary'>;
type IeltsContentMap = Record<string, IeltsTaskContent>;

const ContentModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    type: 'bilingual' | 'vocab' | 'loading' | null;
    content: { en?: string; vi?: string } | WritingVocabItem[] | null;
}> = ({ isOpen, onClose, title, type, content }) => {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsCopied(false);
        }
    }, [isOpen]);

    const handleCopy = () => {
        if (type === 'bilingual' && content && 'en' in content && content.en && content.vi) {
            const textToCopy = `English:\n\n${content.en}\n\n---\n\nTiếng Việt:\n\n${content.vi}`;
            navigator.clipboard.writeText(textToCopy).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            });
        }
    };

    if (!isOpen) return null;

    const renderModalContent = () => {
        if (type === 'loading') {
            return (
                <div className="flex flex-col items-center justify-center h-40">
                    <div className="ai-spinner !w-8 !h-8 mb-4"></div>
                    <p className="text-gray-600">AI is generating the sample answer...</p>
                </div>
            );
        }

        if (!content) return <p className="text-center text-gray-500">Nội dung không có sẵn.</p>;

        if (type === 'bilingual' && 'en' in content && 'vi' in content) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">English</h4>
                        <div className="whitespace-pre-wrap font-serif text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.en || '' }} />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">Tiếng Việt</h4>
                        <div className="whitespace-pre-wrap font-serif text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.vi || '' }} />
                    </div>
                </div>
            );
        }

        if (type === 'vocab' && Array.isArray(content)) {
            return (
                <ul className="space-y-3">
                    {content.map((item, index) => (
                        <li key={index} className="border-b pb-2">
                            <p className="font-bold text-gray-800">{item.word} <span className="font-normal text-gray-500 ipa-font">/{item.ipa}/</span> <i className="text-sm font-medium text-blue-600">({item.pos})</i></p>
                            <p className="text-gray-700">{item.vi}</p>
                        </li>
                    ))}
                </ul>
            );
        }
        return <p className="text-center text-gray-500">Nội dung không hợp lệ.</p>;
    };

    return (
        <div className="ai-feedback-modal-overlay" onClick={onClose}>
            <div className="ai-feedback-modal-content !max-w-4xl" onClick={e => e.stopPropagation()}>
                <header className="ai-feedback-modal-header">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XMarkIcon /></button>
                </header>
                <div className="ai-feedback-modal-body">{renderModalContent()}</div>
                <footer className="pt-4 mt-4 border-t border-gray-200 flex justify-end">
                    {type === 'bilingual' && content && 'en' in content && (
                        <button
                            onClick={handleCopy}
                            className={`btn transition-colors duration-200 flex items-center ${isCopied ? '!bg-green-600 text-white' : 'btn-secondary'}`}
                            disabled={isCopied}
                        >
                            {isCopied ? (
                                <>
                                    <CheckIcon className="w-5 h-5 mr-2" />
                                    Copied!
                                </>
                            ) : (
                                'Copy Text'
                            )}
                        </button>
                    )}
                </footer>
            </div>
        </div>
    );
};

const SpeakingPage: React.FC = () => {
    const { currentUser, updateUser, guestBananaBalance, useGuestBanana } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const navState = location.state as { track_id: Tab } | null;

    // Load data from localStorage or defaults
    const scenariosData = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_SCENARIOS_CONTENT, defaultScenariosData), []);
    
    // Load modular VSTEP data
    const vstepP1Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_VSTEP_P1_TASKS, defaultVstepP1Tasks), []);
    const vstepP1Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_VSTEP_P1_CONTENT, defaultVstepP1Content), []);
    const vstepP2Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_VSTEP_P2_TASKS, defaultVstepP2Tasks), []);
    const vstepP2Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_VSTEP_P2_CONTENT, defaultVstepP2Content), []);
    const vstepP3Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_VSTEP_P3_TASKS, defaultVstepP3Tasks), []);
    const vstepP3Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_VSTEP_P3_CONTENT, defaultVstepP3Content), []);

    // Load modular TOEIC data
    const toeicP1Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_TOEIC_P1_TASKS, defaultToeicP1Tasks), []);
    const toeicP1Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_TOEIC_P1_CONTENT, defaultToeicP1Content), []);
    const toeicP2Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_TOEIC_P2_TASKS, defaultToeicP2Tasks), []);
    const toeicP2Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_TOEIC_P2_CONTENT, defaultToeicP2Content), []);
    const toeicP3Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_TOEIC_P3_TASKS, defaultToeicP3Tasks), []);
    const toeicP3Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_TOEIC_P3_CONTENT, defaultToeicP3Content), []);
    const toeicP4Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_TOEIC_P4_TASKS, defaultToeicP4Tasks), []);
    const toeicP4Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_TOEIC_P4_CONTENT, defaultToeicP4Content), []);
    const toeicP5Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_TOEIC_P5_TASKS, defaultToeicP5Tasks), []);
    const toeicP5Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_TOEIC_P5_CONTENT, defaultToeicP5Content), []);
    
    // NEW: Load modular IELTS data
    const ieltsP1Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_IELTS_P1_TASKS, defaultIeltsP1Tasks), []);
    const ieltsP1Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_IELTS_P1_CONTENT, defaultIeltsP1Content), []);
    const ieltsP2Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_IELTS_P2_TASKS, defaultIeltsP2Tasks), []);
    const ieltsP2Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_IELTS_P2_CONTENT, defaultIeltsP2Content), []);
    const ieltsP3Tasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_IELTS_P3_TASKS, defaultIeltsP3Tasks), []);
    const ieltsP3Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.SPEAKING_IELTS_P3_CONTENT, defaultIeltsP3Content), []);


    // Merge VSTEP data at runtime
    const vstepSpeakingData = useMemo<ExamData<VstepTask>>(() => {
        const mergeContent = (tasks: Omit<VstepTask, keyof VstepTaskContent>[], contentMap: VstepContentMap): VstepTask[] => {
            return tasks.map(task => ({ ...task, ...(contentMap[task.id] || {}) }));
        };
        return {
            "VSTEP_P1_SocialInteraction": { id: "VSTEP_P1_SocialInteraction", vi: "Phần 1: Tương tác xã hội", en: "Part 1: Social Interaction", skills: ["Fluency", "Coherence", "Personal Vocabulary", "Basic Grammar"], tasks: mergeContent(vstepP1Tasks, vstepP1Content) },
            "VSTEP_P2_SituationResponse": { id: "VSTEP_P2_SituationResponse", vi: "Phần 2: Thảo luận giải pháp", en: "Part 2: Solution Discussion", skills: ["Justification", "Comparison", "Opinion", "Cohesion"], tasks: mergeContent(vstepP2Tasks, vstepP2Content) },
            "VSTEP_P3_TopicDevelopment": { id: "VSTEP_P3_TopicDevelopment", vi: "Phần 3: Phát triển chủ đề", en: "Part 3: Topic Development", skills: ["Topic Development", "Organization", "Lexical Resource", "Grammatical Range"], tasks: mergeContent(vstepP3Tasks, vstepP3Content) }
        };
    }, [vstepP1Tasks, vstepP1Content, vstepP2Tasks, vstepP2Content, vstepP3Tasks, vstepP3Content]);

    // Merge TOEIC data at runtime
    const toeicSpeakingData = useMemo<ExamData<ToeicTask>>(() => {
        const mergeContent = (tasks: Omit<ToeicTask, keyof ToeicTaskContent>[], contentMap: ToeicContentMap): ToeicTask[] => {
            return tasks.map(task => ({ ...task, ...(contentMap[task.id] || {}) }));
        };
        return {
            "TOEIC_SPK_Q1_2_ReadAloud": { id: "TOEIC_SPK_Q1_2_ReadAloud", vi: "Q1–Q2: Đọc thành tiếng một đoạn văn", en: "Q1-Q2: Read a text aloud", skills: ["Pronunciation", "Intonation & Stress", "Pace", "Pausing"], tasks: mergeContent(toeicP1Tasks, toeicP1Content) },
            "TOEIC_SPK_Q3_4_DescribePicture": { id: "TOEIC_SPK_Q3_4_DescribePicture", vi: "Q3–Q4: Miêu tả một bức tranh", en: "Q3-Q4: Describe a picture", skills: ["Description", "Present Continuous", "Prepositions", "Cohesion"], tasks: mergeContent(toeicP2Tasks, toeicP2Content) },
            "TOEIC_SPK_Q5_7_RespondQuestions": { id: "TOEIC_SPK_Q5_7_RespondQuestions", vi: "Q5–Q7: Trả lời câu hỏi", en: "Q5-Q7: Respond to questions", skills: ["Comprehension", "Relevance", "Fluency", "Grammar", "Vocabulary"], tasks: mergeContent(toeicP3Tasks, toeicP3Content) },
            "TOEIC_SPK_Q8_10_InfoResponse": { id: "TOEIC_SPK_Q8_10_InfoResponse", vi: "Q8–Q10: Trả lời câu hỏi sử dụng thông tin cho sẵn", en: "Q8-Q10: Respond to questions using information provided", skills: ["Locate Info", "Summarize", "Accuracy", "Coherence"], tasks: mergeContent(toeicP4Tasks, toeicP4Content) },
            "TOEIC_SPK_Q11_Opinion": { id: "TOEIC_SPK_Q11_Opinion", vi: "Q11: Trình bày quan điểm", en: "Q11: Express an Opinion", skills: ["Opinion", "Reasons", "Examples", "Organization"], tasks: mergeContent(toeicP5Tasks, toeicP5Content) }
        };
    }, [toeicP1Tasks, toeicP1Content, toeicP2Tasks, toeicP2Content, toeicP3Tasks, toeicP3Content, toeicP4Tasks, toeicP4Content, toeicP5Tasks, toeicP5Content]);
    
    // NEW: Merge IELTS data at runtime
    const ieltsSpeakingData = useMemo<ExamData<IeltsTask>>(() => {
        const mergeContent = (tasks: Omit<IeltsTask, keyof IeltsTaskContent>[], contentMap: IeltsContentMap): IeltsTask[] => {
            return tasks.map(task => ({ ...task, ...(contentMap[task.id] || {}) }));
        };
        return {
            "IELTS_P1_Interview": { id: "IELTS_P1_Interview", vi: "Phần 1: Giới thiệu & Phỏng vấn (4-5 phút)", en: "Part 1: Introduction & Interview (4-5 mins)", skills: ["Fluency & Coherence", "Lexical Resource", "Grammatical Range & Accuracy", "Pronunciation"], tasks: mergeContent(ieltsP1Tasks, ieltsP1Content) },
            "IELTS_P2_LongTurn": { id: "IELTS_P2_LongTurn", vi: "Phần 2: Nói theo chủ đề (3-4 phút)", en: "Part 2: Individual Long Turn (3-4 mins)", skills: ["Topic Development", "Fluency", "Cohesion", "Lexical Resource"], tasks: mergeContent(ieltsP2Tasks, ieltsP2Content) },
            "IELTS_P3_Discussion": { id: "IELTS_P3_Discussion", vi: "Phần 3: Thảo luận (4-5 phút)", en: "Part 3: Two-way Discussion (4-5 mins)", skills: ["Abstract Thinking", "Justification", "Analysis", "Speculation"], tasks: mergeContent(ieltsP3Tasks, ieltsP3Content) }
        };
    }, [ieltsP1Tasks, ieltsP1Content, ieltsP2Tasks, ieltsP2Content, ieltsP3Tasks, ieltsP3Content]);


    const examDataMap: Record<Exclude<Tab, 'scenarios' | 'ai_assistant'>, ExamData<any>> = useMemo(() => ({
        toeic: toeicSpeakingData,
        ielts: ieltsSpeakingData,
        vstep: vstepSpeakingData,
    }), [toeicSpeakingData, ieltsSpeakingData, vstepSpeakingData]);
    
    // State Initialization
    const savedState = getSpeakingPageState();

    const [activeTab, setActiveTab] = useState<Tab>(navState?.track_id ?? savedState?.activeTab ?? 'scenarios');
    const [scenarioLevelFilter, setScenarioLevelFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>(savedState?.scenarioLevelFilter ?? 'all');
    
    const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(() => {
        if (savedState?.activeTab === 'scenarios' && savedState?.selectedScenarioId) {
            return scenariosData.find(s => s.id === savedState.selectedScenarioId) || null;
        }
        return activeTab === 'scenarios' ? scenariosData[0] : null;
    });

    const [selectedExamPart, setSelectedExamPart] = useState<ExamPart<any> | null>(() => {
        const tab: Tab | undefined = navState?.track_id ?? savedState?.activeTab;
        if (tab && tab !== 'scenarios' && tab !== 'ai_assistant' && savedState?.selectedExamPartId) {
            const parts = Object.values(examDataMap[tab]);
            return parts.find(p => p.id === savedState.selectedExamPartId) || null;
        }
        return null;
    });
    
    const [selectedTask, setSelectedTask] = useState<ExamTask | null>(() => {
        const tab: Tab | undefined = navState?.track_id ?? savedState?.activeTab;
        if (tab && tab !== 'scenarios' && tab !== 'ai_assistant' && savedState?.selectedExamPartId && savedState?.selectedTaskId) {
            const parts = Object.values(examDataMap[tab]);
            const part = parts.find(p => p.id === savedState.selectedExamPartId);
            return part?.tasks.find(t => t.id === savedState.selectedTaskId) || null;
        }
        return null;
    });
    
    const [isContentModalOpen, setIsContentModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState<any>(null);
    const [modalType, setModalType] = useState<'bilingual' | 'vocab' | 'loading' | null>(null);
    const [isGeneratingAiSample, setIsGeneratingAiSample] = useState(false);

    // Save state to localStorage
    useEffect(() => {
        const stateToSave = {
            activeTab,
            scenarioLevelFilter,
            selectedScenarioId: selectedScenario?.id,
            selectedExamPartId: selectedExamPart?.id,
            selectedTaskId: selectedTask?.id,
        };
        saveSpeakingPageState(stateToSave);
    }, [activeTab, scenarioLevelFilter, selectedScenario, selectedExamPart, selectedTask]);
    
    // NEW: Effect to handle incoming navigation state and clear it
    useEffect(() => {
        if (navState?.track_id) {
            setActiveTab(navState.track_id);
            // Clear state after using it to prevent re-triggering on unrelated re-renders
            window.history.replaceState({}, document.title)
        }
    }, [navState]);
    
    // Effect to set default states on initial load if not restored
    useEffect(() => {
        if (!selectedExamPart && activeTab !== 'scenarios' && activeTab !== 'ai_assistant') {
            const currentExamData = examDataMap[activeTab];
            if (currentExamData) {
                const firstPart = Object.values(currentExamData)[0];
                if (firstPart) {
                    setSelectedExamPart(firstPart);
                    if (firstPart.tasks.length > 0) {
                        setSelectedTask(firstPart.tasks[0]);
                    }
                }
            }
        }
    }, [activeTab, selectedExamPart, examDataMap]);

    useEffect(() => {
        const filteredScenarios = scenarioLevelFilter === 'all'
            ? scenariosData
            : scenariosData.filter(scenario => scenario.level === scenarioLevelFilter);
        
        const isSelectedVisible = filteredScenarios.some(s => s.id === selectedScenario?.id);
        
        if ((!isSelectedVisible || !selectedScenario) && filteredScenarios.length > 0) {
            setSelectedScenario(filteredScenarios[0]);
        } else if (filteredScenarios.length === 0) {
            setSelectedScenario(null);
        }
    }, [scenarioLevelFilter, scenariosData, selectedScenario]);

    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
        if (tab === 'scenarios') {
            const filtered = scenariosData.filter(s => scenarioLevelFilter === 'all' || s.level === scenarioLevelFilter);
            setSelectedScenario(filtered[0] || null);
            setSelectedExamPart(null);
            setSelectedTask(null);
        } else if (tab !== 'ai_assistant') {
            const currentExamData = examDataMap[tab];
            const firstPart = Object.values(currentExamData)[0];
            setSelectedExamPart(firstPart);
            setSelectedTask(firstPart.tasks[0]);
            setSelectedScenario(null);
        } else {
             setSelectedScenario(null);
             setSelectedExamPart(null);
             setSelectedTask(null);
        }
    };
    
    const handlePartSelect = (part: ExamPart<any>) => {
        setSelectedExamPart(part);
        setSelectedTask(part.tasks[0]);
    };

    const handleShowContent = (type: 'sample' | 'outline' | 'vocab') => {
        if (!selectedTask) return;
        let title = '';
        let content: any = null;
        let modalType: 'bilingual' | 'vocab' | null = null;
        
        const task = selectedTask as VstepTask | IeltsTask | ToeicTask;

        switch (type) {
            case 'sample':
                if (task.sampleAnswer_en && task.sampleAnswer_vi) {
                    title = 'Bài nói mẫu';
                    content = { en: task.sampleAnswer_en, vi: task.sampleAnswer_vi };
                    modalType = 'bilingual';
                }
                break;
            case 'outline':
                if (task.outline_en && task.outline_vi) {
                    title = 'Dàn ý gợi ý';
                    content = { en: task.outline_en, vi: task.outline_vi };
                    modalType = 'bilingual';
                }
                break;
            case 'vocab':
                if (task.vocabulary) {
                    title = 'Từ vựng gợi ý';
                    content = task.vocabulary;
                    modalType = 'vocab';
                }
                break;
        }
        
        if (content) {
            setModalTitle(title);
            setModalContent(content);
            setModalType(modalType);
            setIsContentModalOpen(true);
        }
    };

    const handleGenerateAiSample = async () => {
        if (!selectedTask) return;

        let canProceed = false;
        if (currentUser) {
            if (currentUser.bananaBalance > 0) {
                canProceed = true;
            }
        } else {
            if (guestBananaBalance > 0) {
                canProceed = true;
            }
        }

        if (!canProceed) {
            const message = currentUser 
                ? 'Bạn đã hết chuối! 🍌 Vui lòng nạp thêm để tiếp tục sử dụng tính năng AI.'
                : 'Bạn đã dùng hết chuối miễn phí cho khách. Vui lòng đăng nhập hoặc đăng ký để tiếp tục sử dụng tính năng AI.';
            alert(message);
            if (!currentUser) {
                navigate('/login');
            }
            return;
        }

        setIsGeneratingAiSample(true);
        setModalTitle('Đang tạo bài mẫu AI...');
        setModalContent(null);
        setModalType('loading');
        setIsContentModalOpen(true);

        try {
            const result = await generateVstepSampleAnswer(selectedTask.prompt);
            setModalTitle('Bài mẫu do AI tạo');
            setModalContent({ en: result.sample_answer_en, vi: result.sample_answer_vi });
            setModalType('bilingual');
            // Deduct banana on success
            if (currentUser) {
                const updatedUser = { ...currentUser, bananaBalance: currentUser.bananaBalance - 1 };
                updateUser(updatedUser);
            } else {
                useGuestBanana();
            }
        } catch (err) {
            console.error(err);
            setModalTitle('Lỗi');
            setModalContent({ en: 'Failed to generate a sample answer. Please try again.', vi: 'Không thể tạo bài mẫu. Vui lòng thử lại.' });
            setModalType('bilingual');
        } finally {
            setIsGeneratingAiSample(false);
        }
    };

    const groupedScenarios = useMemo(() => {
        const filteredScenarios = scenarioLevelFilter === 'all'
            ? scenariosData
            : scenariosData.filter(scenario => scenario.level === scenarioLevelFilter);
        
        return filteredScenarios.reduce((acc, scenario) => {
            const group = scenario.categoryGroup;
            if (!acc[group]) {
                acc[group] = [];
            }
            acc[group].push(scenario);
            return acc;
        }, {} as Record<string, Scenario[]>);
    }, [scenariosData, scenarioLevelFilter]);

    const renderContent = () => {
        if (activeTab === 'ai_assistant') {
            return <TemplateGenerator ieltsData={ieltsSpeakingData} type="speaking" />;
        }
        if (activeTab === 'scenarios') {
            const levelFilters: { id: 'all' | 'Beginner' | 'Intermediate' | 'Advanced'; label: string }[] = [
                { id: 'all', label: 'Tất cả' },
                { id: 'Beginner', label: 'Căn bản' },
                { id: 'Intermediate', label: 'Trung bình' },
                { id: 'Advanced', label: 'Nâng cao' },
            ];

            return (
                <div>
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {levelFilters.map(filter => (
                            <button key={filter.id} onClick={() => setScenarioLevelFilter(filter.id)} className={`level-filter-btn ${scenarioLevelFilter === filter.id ? 'level-filter-btn--active' : ''}`}>
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
                        {/* Scenario List */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-[75vh] flex flex-col">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Tình huống Giao tiếp</h3>
                            <div className="overflow-y-auto flex-grow pr-2 -mr-2">
                            {Object.keys(groupedScenarios).length > 0 ? (
                                Object.entries(groupedScenarios).map(([groupName, scenariosInGroup]) => (
                                    <div key={groupName}>
                                        <h4 className="font-bold text-gray-500 mt-4 mb-1 px-1 sticky top-0 bg-white/80 backdrop-blur-sm py-1">{groupName}</h4>
                                        {scenariosInGroup.map(scenario => (
                                            <button key={scenario.id} onClick={() => setSelectedScenario(scenario)} className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${selectedScenario?.id === scenario.id ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}>
                                                <p className="font-semibold">{scenario.title}</p>
                                                <p className="text-sm text-gray-500">{scenario.description}</p>
                                            </button>
                                        ))}
                                    </div>
                            ))
                            ) : (
                                <div className="text-center text-gray-500 pt-10">Không có tình huống nào phù hợp.</div>
                            )}
                            </div>
                        </div>
                        {/* Selected Scenario Details */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-[75vh] overflow-y-auto">
                            {selectedScenario ? (
                                <>
                                    <h2 className="text-3xl font-bold text-gray-900">{selectedScenario.title}</h2>
                                    <p className="text-md text-gray-500 mt-1">{selectedScenario.description}</p>
                                    <div className="mt-6">
                                        <h4 className="font-bold text-lg text-gray-800 mb-2">Hội thoại mẫu</h4>
                                        <div className="space-y-4">
                                            {selectedScenario.dialogue.map((turn, index) => (
                                                <div key={index} className={`p-4 rounded-lg ${turn.speaker === 'Bạn' ? 'bg-green-50' : 'bg-gray-50'}`}>
                                                    <p className="font-bold text-gray-800">{turn.speaker}</p>
                                                    <p className="text-lg text-gray-900">{turn.en}</p>
                                                    <p className="text-gray-500">{turn.ipa}</p>
                                                    <p className="text-sm text-blue-600 italic mt-1">{turn.vi}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <h4 className="font-bold text-lg text-gray-800 mb-2">Từ vựng</h4>
                                        <ul className="space-y-2">
                                            {selectedScenario.vocabulary.map((vocab, index) => (
                                                <li key={index} className="flex items-center justify-between">
                                                    <span className="font-semibold">{vocab.word || vocab.base} <i className="text-sm text-gray-500">({vocab.pos})</i></span>
                                                    <span className="text-gray-700">{vocab.vi}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    <p>Vui lòng chọn một tình huống từ danh sách.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        } else {
            const currentExamData = examDataMap[activeTab];
            const taskActionButtons = (
                <>
                    <button onClick={() => handleShowContent('sample')} disabled={!(selectedTask as VstepTask | IeltsTask | ToeicTask)?.sampleAnswer_en} className="btn btn-secondary flex items-center justify-center text-base"><BookOpenIcon className="w-5 h-5 mr-2" />Bài mẫu</button>
                    <button onClick={() => handleShowContent('outline')} disabled={!(selectedTask as VstepTask | IeltsTask | ToeicTask)?.outline_en} className="btn btn-secondary flex items-center justify-center text-base"><ListBulletIcon className="w-5 h-5 mr-2" />Dàn ý</button>
                    <button onClick={() => handleShowContent('vocab')} disabled={!(selectedTask as VstepTask | IeltsTask | ToeicTask)?.vocabulary || (selectedTask as VstepTask | IeltsTask | ToeicTask).vocabulary?.length === 0} className="btn btn-secondary flex items-center justify-center text-base"><AcademicCapIcon className="w-5 h-5 mr-2" />Từ vựng</button>
                    {activeTab === 'vstep' && (
                        <button onClick={handleGenerateAiSample} disabled={isGeneratingAiSample} className="btn btn-ai-assistant flex items-center justify-center text-base">
                            {isGeneratingAiSample ? <div className="ai-spinner !w-5 !h-5 mr-2"></div> : <LightBulbIcon className="w-5 h-5 mr-2" />}
                            AI Sample
                        </button>
                    )}
                </>
            );
            return (
                 <>
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {Object.values(currentExamData).map(part => (
                            <button 
                                key={part.id} 
                                onClick={() => handlePartSelect(part)} 
                                className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-colors ${selectedExamPart?.id === part.id ? 'bg-green-600 text-white border-transparent' : 'bg-white text-green-700 border-green-600 hover:bg-green-50'}`}>
                                {part.vi}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
                        {/* Task List */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-[75vh] flex flex-col">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{selectedExamPart?.vi}</h3>
                            <div className="overflow-y-auto flex-grow pr-2 -mr-2">
                                {selectedExamPart?.tasks.map(task => (
                                    <button key={task.id} onClick={() => setSelectedTask(task)} className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${selectedTask?.id === task.id ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}>
                                        <p className="font-semibold">{task.title}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Selected Task Details */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-[75vh] overflow-y-auto flex flex-col">
                            {selectedTask ? (
                                <div className="flex-grow flex flex-col">
                                    <h2 className="text-3xl font-bold text-gray-900">{selectedTask.title}</h2>
                                    { (selectedTask as ToeicTask)?.imageSeed && 
                                        <div className="my-4">
                                            <GcsImage imageSeed={(selectedTask as ToeicTask).imageSeed!} examType={activeTab} altText={selectedTask.prompt} />
                                        </div>
                                    }
                                    <p className="text-lg text-gray-700 whitespace-pre-wrap mt-4">{selectedTask.prompt}</p>
                                    <div className="mt-auto pt-6 flex flex-wrap gap-3">
                                        {taskActionButtons}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    <p>Vui lòng chọn một bài tập từ danh sách.</p>
                                </div>
                            )}
                        </div>
                    </div>
                 </>
            );
        }
    };

    const TABS: { id: Tab, label: string }[] = [
        { id: 'scenarios', label: 'Tình huống Giao tiếp' },
        { id: 'vstep', label: 'Luyện thi VSTEP' },
        { id: 'toeic', label: 'Luyện thi TOEIC' },
        { id: 'ielts', label: 'Luyện thi IELTS' },
        { id: 'ai_assistant', label: 'Trợ lý AI' },
    ];

    return (
        <div className="speaking-studio bg-gray-50/50 -m-8 px-8 pt-8 min-h-screen">
            <ContentModal
                isOpen={isContentModalOpen}
                onClose={() => setIsContentModalOpen(false)}
                title={modalTitle}
                type={modalType}
                content={modalContent}
            />
            <div className="flex flex-wrap justify-center mb-10 p-2 bg-gray-200/70 rounded-full gap-1">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`px-6 py-3 text-base font-semibold rounded-full transition-all duration-200 ease-in-out focus:outline-none ${activeTab === tab.id ? 'bg-white text-green-700 shadow-md' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            
            <main>
                {renderContent()}
            </main>
        </div>
    );
};

export default SpeakingPage;
