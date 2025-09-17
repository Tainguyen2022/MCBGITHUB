
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Import base data
import { writingPracticeData as defaultWritingData } from '../data/writingPracticeData';
import { foundationPracticeData as defaultFoundationData } from '../data/foundationPracticeData';
// NEW: Import modular IELTS WRITING data (granular)
import { ieltsTask1LineTasks as defaultIeltsT1LineTasks } from '../data/ielts_writing/task1LineGraphTasks';
import { ieltsTask1LineContent as defaultIeltsT1LineContent } from '../data/ielts_writing/task1LineGraphContent';
import { ieltsTask1BarTasks as defaultIeltsT1BarTasks } from '../data/ielts_writing/task1BarChartTasks';
import { ieltsTask1BarContent as defaultIeltsT1BarContent } from '../data/ielts_writing/task1BarChartContent';
import { ieltsTask1PieTasks as defaultIeltsT1PieTasks } from '../data/ielts_writing/task1PieChartTasks';
import { ieltsTask1PieContent as defaultIeltsT1PieContent } from '../data/ielts_writing/task1PieChartContent';
import { ieltsTask1TableTasks as defaultIeltsT1TableTasks } from '../data/ielts_writing/task1TableTasks';
import { ieltsTask1TableContent as defaultIeltsT1TableContent } from '../data/ielts_writing/task1TableContent';
import { ieltsTask1ProcessTasks as defaultIeltsT1ProcessTasks } from '../data/ielts_writing/task1ProcessTasks';
import { ieltsTask1ProcessContent as defaultIeltsT1ProcessContent } from '../data/ielts_writing/task1ProcessContent';
import { ieltsTask1MapTasks as defaultIeltsT1MapTasks } from '../data/ielts_writing/task1MapTasks';
import { ieltsTask1MapContent as defaultIeltsT1MapContent } from '../data/ielts_writing/task1MapContent';
import { ieltsTask1MixTasks as defaultIeltsT1MixTasks } from '../data/ielts_writing/task1MixTasks';
import { ieltsTask1MixContent as defaultIeltsT1MixContent } from '../data/ielts_writing/task1MixContent';
import { ieltsTask2OpinionTasks as defaultIeltsT2OpinionTasks } from '../data/ielts_writing/task2OpinionTasks';
import { ieltsTask2OpinionContent as defaultIeltsT2OpinionContent } from '../data/ielts_writing/task2OpinionContent';
import { ieltsTask2DiscussionTasks as defaultIeltsT2DiscussionTasks } from '../data/ielts_writing/task2DiscussionTasks';
import { ieltsTask2DiscussionContent as defaultIeltsT2DiscussionContent } from '../data/ielts_writing/task2DiscussionContent';
import { ieltsTask2ProblemSolutionTasks as defaultIeltsT2ProblemSolutionTasks } from '../data/ielts_writing/task2ProblemSolutionTasks';
import { ieltsTask2ProblemSolutionContent as defaultIeltsT2ProblemSolutionContent } from '../data/ielts_writing/task2ProblemSolutionContent';
import { ieltsTask2AdvDisTasks as defaultIeltsT2AdvDisTasks } from '../data/ielts_writing/task2AdvDisTasks';
import { ieltsTask2AdvDisContent as defaultIeltsT2AdvDisContent } from '../data/ielts_writing/task2AdvDisContent';
// Import modular TOEIC data
import { toeicTask1Subcategories as defaultToeicT1Subcategories } from '../data/toeic_writing/part1Subcategories';
import { toeicTask1Content as defaultToeicT1Content } from '../data/toeic_writing/part1Content';
import { toeicTask2Subcategories as defaultToeicT2Subcategories } from '../data/toeic_writing/part2Subcategories';
import { toeicTask2Content as defaultToeicT2Content } from '../data/toeic_writing/part2Content';
import { toeicTask3Subcategories as defaultToeicT3Subcategories } from '../data/toeic_writing/part3Subcategories';
import { toeicTask3Content as defaultToeicT3Content } from '../data/toeic_writing/part3Content';
// NEW: Import modular VSTEP data
import { vstepTask1Subcategories as defaultVstepT1Subcategories } from '../data/vstep_writing/task1Subcategories';
import { vstepTask1Content as defaultVstepT1Content } from '../data/vstep_writing/task1Content';
import { vstepTask2Subcategories as defaultVstepT2Subcategories } from '../data/vstep_writing/task2Subcategories';
import { vstepTask2Content as defaultVstepT2Content } from '../data/vstep_writing/task2Content';
// Import types
import { WritingCategory, WritingSubcategory, WritingSeed, PracticeMode, FoundationTopic, FoundationPracticeData, AIGeneratedTopic, AIGrammarFeedback, AISuggestionsFeedback, AIGeneratedTemplate, RewriteAction, AIRewriteResponse, WritingVocabItem, AIGrammarError, BilingualWord, BilingualText, WritingProgress } from '../types';
import { generateNewPracticeItem, generateMorePracticeQuestions, generateWritingTemplate, checkGrammar, suggestImprovements, rewriteText, generateNewSeed, generateTestImage, generateTestText, speechToText, textToSpeech } from '../services/aiService';
import { loadOrInitializeData, saveData } from '../services/dataService';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { useScoring } from '../hooks/useScoring';
import { useToast } from '../hooks/useToast';
import { 
    AcademicCapIcon, SparklesIcon, MagicWandIcon, BookOpenIcon, ListBulletIcon, EyeIcon, LightBulbIcon, CheckBadgeIcon, XMarkIcon, ChevronDownIcon, CheckIcon, PencilIcon, PhotoIcon, SpeakerWaveIcon
} from '../components/Icons';
import GcsImage from '../components/GcsImage';
import { getWritingPageState, saveWritingPageState } from '../services/userStateService';
// Safe utilities inline to avoid import issues
const safeInitState = (defaultValue: any): any => {
    try {
        return defaultValue;
    } catch (error) {
        console.warn('Safe state init failed:', error);
        return defaultValue;
    }
};

const safeUpdateObject = (obj: any, updates: any): any => {
    return { ...obj, ...updates };
};

const safeLocalStorageSet = (key: string, value: any): boolean => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn('Failed to save to localStorage:', key, error);
        return false;
    }
};

const recoverFromError = (error: Error, context: string) => {
    console.error(`Error in ${context}:`, error);
};
import { useAuth } from '../App';
import TemplateGenerator from '../components/speaking/TemplateGenerator';
import { getWritingProgress, saveWritingProgress } from '../services/writingProgressService';


// --- Helper Types for Modular Data ---
type WritingSeedContent = Pick<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;
type WritingContentMap = Record<string, WritingSeedContent>;


// --- Helper Functions ---
const getIconForTrack = (trackId: string) => {
    const baseClass = "w-5 h-5 text-gray-400 flex-shrink-0";
    if (trackId.includes('EASY')) return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={baseClass}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>;
    if (trackId.includes('AI_WRITING_ASSISTANT')) return <SparklesIcon className={baseClass} />;
    return <AcademicCapIcon className={baseClass} />;
};

// --- Reusable Components ---

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

interface DraggablePart extends BilingualWord { id: number; }

// --- AI Components ---

const AIFeedbackModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    isLoading: boolean;
    error: string | null;
    content: AISuggestionsFeedback | AIRewriteResponse | null;
}> = ({ isOpen, onClose, title, isLoading, error, content }) => {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsCopied(false);
        }
    }, [isOpen]);
    
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        });
    };

    if (!isOpen) return null;
    
    const renderContent = () => {
        if (isLoading) {
            return <div className="flex flex-col items-center justify-center h-48"><div className="ai-spinner !w-8 !h-8 mb-4"></div><p className="text-gray-600">AI is analyzing...</p></div>;
        }
        if (error) {
            return <div className="p-4 bg-red-50 text-red-700 rounded-lg text-center">{error}</div>;
        }
        if (!content) return null;

        if ('rewritten_text' in content) {
            const rewriteContent = content as AIRewriteResponse;
            return (
                <div className="space-y-2">
                    <p className="font-bold text-gray-800">Đây là phiên bản được viết lại:</p>
                    <div className="p-4 bg-gray-100 rounded-lg whitespace-pre-wrap font-serif text-gray-800 max-h-64 overflow-y-auto">
                        {rewriteContent.rewritten_text}
                    </div>
                    <button
                        onClick={() => handleCopy(rewriteContent.rewritten_text)}
                        className={`btn w-full !text-base !py-2.5 transition-colors duration-200 flex items-center justify-center ${
                            isCopied
                                ? '!bg-green-600 text-white'
                                : 'btn-secondary'
                        }`}
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
                </div>
            );
        }
        
        if ('suggestions' in content) { // AISuggestionsFeedback
            const feedback = content as AISuggestionsFeedback;
             return (
                <div className="space-y-2">
                    <p className="font-semibold text-gray-700">{feedback.general_feedback_vi}</p>
                    {feedback.suggestions.map((sugg, i) => (
                         <div key={i} className="p-3 bg-blue-50/50 border-l-4 border-blue-400 rounded-r-lg">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">{sugg.suggestion_type}</span>
                            <p className="mt-2">Thay vì: "<span className="text-gray-600 italic">{sugg.original_text}</span>"</p>
                            <p>Thử: "<span className="font-semibold text-blue-700">{sugg.suggested_text}</span>"</p>
                            <p className="text-sm text-gray-600 mt-1"><i>Lý do: {sugg.explanation_vi}</i></p>
                        </div>
                    ))}
                </div>
            );
        }

        return null;
    };

    return (
        <div className="ai-feedback-modal-overlay" onClick={onClose}>
            <div className="ai-feedback-modal-content" onClick={e => e.stopPropagation()}>
                <header className="ai-feedback-modal-header">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XMarkIcon /></button>
                </header>
                <div className="ai-feedback-modal-body">{renderContent()}</div>
            </div>
        </div>
    );
};

// Enhanced error boundary for Writing Studio
class WritingErrorBoundary extends React.Component<
    { children: React.ReactNode }, 
    { hasError: boolean; errorMsg: string; errorStack?: string }
>{
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, errorMsg: '', errorStack: undefined };
    }

    static getDerivedStateFromError(error: any) {
        return { 
            hasError: true, 
            errorMsg: (error && (error.message || String(error))) || 'Unknown error',
            errorStack: error?.stack
        };
    }

    componentDidCatch(error: any, info: any) {
        console.error('Writing Studio crashed:', error, info);
        recoverFromError(error, 'WritingStudio');
        
        // Try to save current state before crash
        try {
            const currentState = {
                timestamp: new Date().toISOString(),
                error: error.message,
                componentStack: info.componentStack
            };
            safeLocalStorageSet('WRITING_CRASH_LOG', currentState);
        } catch (e) {
            console.warn('Failed to save crash log:', e);
        }
    }

    handleRetry = () => {
        this.setState({ hasError: false, errorMsg: '', errorStack: undefined });
    }

    handleClearData = () => {
        try {
            // Clear potentially corrupted data
            const writingKeys = Object.values(LOCAL_STORAGE_KEYS).filter(key => 
                key.includes('WRITING') || key.includes('FOUNDATION')
            );
            writingKeys.forEach(key => localStorage.removeItem(key));
            
            // Reload page
            window.location.reload();
        } catch (e) {
            console.error('Failed to clear data:', e);
            window.location.reload();
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="apple-theme container mx-auto p-6">
                    <div className="max-w-2xl mx-auto p-8 bg-red-50 border-2 border-red-200 rounded-2xl text-center shadow-lg">
                        <div className="text-6xl mb-4">😅</div>
                        <h2 className="text-2xl font-bold text-red-700 mb-3">Oops! Có lỗi xảy ra</h2>
                        <p className="text-red-600 mb-4 text-lg">{this.state.errorMsg}</p>
                        <p className="text-gray-600 mb-6">Đừng lo! Chúng tôi có thể khắc phục điều này.</p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button 
                                onClick={this.handleRetry}
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                            >
                                🔄 Thử lại
                            </button>
                            <button 
                                onClick={this.handleClearData}
                                className="px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors"
                            >
                                🧹 Xóa dữ liệu & Reload
                            </button>
                            <button 
                                onClick={() => window.location.href = '#/'}
                                className="px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                            >
                                🏠 Về trang chủ
                            </button>
                        </div>
                        
                        {/* Developer info (only in development) */}
                        {process.env.NODE_ENV === 'development' && this.state.errorStack && (
                            <details className="mt-6 text-left">
                                <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                                    🔧 Chi tiết lỗi (Developer)
                                </summary>
                                <pre className="mt-2 p-4 bg-gray-100 rounded-lg text-xs overflow-auto max-h-40 text-gray-700">
                                    {this.state.errorStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }
        return this.props.children as any;
    }
}

const SampleContentModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string | WritingVocabItem[] | null;
}> = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    const renderContent = () => {
        if (!content) return <p>No content available.</p>;
        if (typeof content === 'string') {
            return <div className="whitespace-pre-wrap text-gray-800 font-serif leading-relaxed">{content}</div>;
        }
        if (Array.isArray(content)) {
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
        return null;
    };

    return (
        <div className="sample-content-modal-overlay" onClick={onClose}>
            <div className="sample-content-modal-content" onClick={e => e.stopPropagation()}>
                <header className="sample-content-modal-header">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XMarkIcon /></button>
                </header>
                <div className="sample-content-modal-body">{renderContent()}</div>
            </div>
        </div>
    );
};

const FreeWriteFooter: React.FC<{
    currentItem: PracticeItem | null;
    userInput: string;
    onCheckClick: (action: 'grammar' | 'suggestions') => void;
    onSampleClick: (type: 'vocab' | 'outline' | 'essay') => void;
    onRewriteClick: (action: RewriteAction) => void;
    onClearFeedback: () => void;
    hasLiveFeedback: boolean;
}> = ({ currentItem, userInput, onCheckClick, onSampleClick, onRewriteClick, onClearFeedback, hasLiveFeedback }) => {
    const [isCheckMenuOpen, setIsCheckMenuOpen] = useState(false);
    const [isRewriteMenuOpen, setIsRewriteMenuOpen] = useState(false);
    const checkRef = useRef<HTMLDivElement>(null);
    const rewriteRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (checkRef.current && !checkRef.current.contains(event.target as Node)) setIsCheckMenuOpen(false);
            if (rewriteRef.current && !rewriteRef.current.contains(event.target as Node)) setIsRewriteMenuOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const rewriteActions: { id: RewriteAction, label: string }[] = [
        { id: 'make it longer', label: 'Dài hơn' },
        { id: 'make it shorter', label: 'Ngắn hơn' },
        { id: 'make it simpler', label: 'Dễ hơn' },
        { id: 'make it more complex', label: 'Khó hơn' },
        { id: 'rewrite it completely', label: 'Viết lại' },
    ];
    
    return (
        <div className="enhanced-free-write-footer">
            {/* Primary Action Bar */}
            <div className="action-bar-primary">
                {/* Grammar & Suggestions Group */}
                <div className="action-group">
            <div ref={checkRef} className="relative">
                <button 
                    onClick={() => setIsCheckMenuOpen(p => !p)} 
                            className="action-btn action-btn--success"
                    disabled={!userInput.trim()}
                            title="Kiểm tra ngữ pháp và gợi ý cải thiện"
                >
                    <CheckBadgeIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">Kiểm tra</span>
                    <ChevronDownIcon className="w-4 h-4"/>
                </button>
                {isCheckMenuOpen && (
                            <div className="dropdown-menu">
                                <button 
                                    onClick={() => { onCheckClick('grammar'); setIsCheckMenuOpen(false); }}
                                    className="dropdown-item"
                                >
                                    <CheckBadgeIcon className="w-4 h-4" />
                                    <div>
                                        <div className="font-medium">Kiểm tra Ngữ pháp</div>
                                        <div className="text-xs text-gray-500">Highlight lỗi trực tiếp trong văn bản</div>
                                    </div>
                                </button>
                                <button 
                                    onClick={() => { onCheckClick('suggestions'); setIsCheckMenuOpen(false); }}
                                    className="dropdown-item"
                                >
                                    <LightBulbIcon className="w-4 h-4" />
                                    <div>
                                        <div className="font-medium">Gợi ý Cải thiện</div>
                                        <div className="text-xs text-gray-500">Đề xuất cải thiện từ vựng và cấu trúc</div>
                                    </div>
                                </button>
                    </div>
                )}
                    </div>
            </div>
            
                {/* Sample Content Group */}
                <div className="action-group">
                    <button 
                        onClick={() => onSampleClick('vocab')} 
                        className="action-btn action-btn--info" 
                        disabled={!currentItem?.vocabulary || currentItem.vocabulary.length === 0}
                        title="Xem từ vựng mẫu cho chủ đề này"
                    >
                        <AcademicCapIcon className="w-5 h-5"/>
                        <span className="hidden md:inline">Từ vựng</span>
                    </button>
                    <button 
                        onClick={() => onSampleClick('outline')} 
                        className="action-btn action-btn--info" 
                        disabled={!currentItem?.sample_outline_en}
                        title="Xem dàn ý mẫu"
                    >
                        <ListBulletIcon className="w-5 h-5"/>
                        <span className="hidden md:inline">Dàn ý</span>
                    </button>
                    <button 
                        onClick={() => onSampleClick('essay')} 
                        className="action-btn action-btn--info" 
                        disabled={!currentItem?.sample_answer_en}
                        title="Xem bài viết mẫu"
                    >
                        <BookOpenIcon className="w-5 h-5"/>
                        <span className="hidden md:inline">Bài mẫu</span>
                    </button>
                </div>

                {/* Clear Feedback */}
            {hasLiveFeedback && (
                    <button 
                        onClick={onClearFeedback} 
                        className="action-btn action-btn--warning"
                        title="Xóa feedback hiện tại"
                    >
                    <XMarkIcon className="w-5 h-5" />
                        <span className="hidden sm:inline">Clear</span>
                </button>
            )}

                {/* AI Rewrite Group */}
                <div className="action-group ml-auto">
                    <div ref={rewriteRef} className="relative">
                 <button 
                    onClick={() => setIsRewriteMenuOpen(p => !p)} 
                            className="action-btn action-btn--primary"
                    disabled={!userInput.trim()}
                            title="AI viết lại văn bản với nhiều phong cách khác nhau"
                >
                    <SparklesIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">AI Rewrite</span>
                    <ChevronDownIcon className="w-4 h-4"/>
                </button>
                {isRewriteMenuOpen && (
                            <div className="dropdown-menu dropdown-menu--right">
                                <div className="dropdown-header">
                                    <SparklesIcon className="w-4 h-4" />
                                    <span className="font-semibold">AI Rewrite Options</span>
                                </div>
                        {rewriteActions.map(action => (
                                    <button 
                                        key={action.id} 
                                        onClick={() => { onRewriteClick(action.id); setIsRewriteMenuOpen(false); }}
                                        className="dropdown-item"
                                    >
                                        <div className="font-medium">{action.label}</div>
                                    </button>
                        ))}
                    </div>
                )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- NEW LIVE EDITOR COMPONENT ---
interface LiveEditorAreaProps {
    userInput: string;
    setUserInput: (value: string) => void;
    liveFeedback: AIGrammarFeedback | null;
    onCorrection: (newText: string) => void;
}

const LiveEditorArea: React.FC<LiveEditorAreaProps> = ({ userInput, setUserInput, liveFeedback, onCorrection }) => {
    const editorRef = useRef<HTMLTextAreaElement>(null);
    const feedbackDisplayRef = useRef<HTMLDivElement>(null);
    const [activeError, setActiveError] = useState<AIGrammarError | null>(null);
    const [popoverPosition, setPopoverPosition] = useState<{ top: number, left: number } | null>(null);
    
    const isReviewing = !!liveFeedback;

    const handleErrorClick = (error: AIGrammarError, e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveError(error);
        const target = e.target as HTMLElement;
        const editorDiv = feedbackDisplayRef.current;
        if (!editorDiv) return;

        const targetRect = target.getBoundingClientRect();
        const editorRect = editorDiv.getBoundingClientRect();
        
        setPopoverPosition({
            top: targetRect.top - editorRect.top + editorDiv.scrollTop - 10,
            left: targetRect.left - editorRect.left + targetRect.width / 2,
        });
    };
    
    const handleCorrection = (error: AIGrammarError) => {
        const newText = userInput.replace(error.error_text, error.correction);
        onCorrection(newText);
        setActiveError(null);
    };

    const renderFeedbackContent = () => {
        if (!liveFeedback || liveFeedback.errors.length === 0) {
            return userInput;
        }
        
        let lastIndex = 0;
        const parts: Array<string | React.ReactNode> = [];
        const sortedErrors = [...liveFeedback.errors].sort((a, b) => userInput.indexOf(a.error_text) - userInput.indexOf(b.error_text));

        sortedErrors.forEach((error, i) => {
            const index = userInput.indexOf(error.error_text, lastIndex);
            if (index !== -1) {
                parts.push(userInput.substring(lastIndex, index));
                parts.push(
                    <span key={i} className="error-highlight" onClick={(e) => handleErrorClick(error, e)}>
                        {error.error_text}
                    </span>
                );
                lastIndex = index + error.error_text.length;
            }
        });
        parts.push(userInput.substring(lastIndex));
        
        return parts;
    };
    
     useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (feedbackDisplayRef.current && !feedbackDisplayRef.current.contains(event.target as Node)) {
                setActiveError(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="enhanced-writing-area">
            {/* Writing Header */}
            <div className="writing-header">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
                    <PencilIcon className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-800">Khung soạn thảo</h4>
                    <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
                        <span>{userInput.length} từ</span>
                        {isReviewing && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                <CheckBadgeIcon className="w-3 h-3" />
                                Đã kiểm tra
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Writing Content */}
            <div className="relative flex-grow">
            {isReviewing ? (
                    <div ref={feedbackDisplayRef} className="writing-feedback-display">
                    {renderFeedbackContent()}
                </div>
            ) : (
                <textarea
                    ref={editorRef}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                        className="writing-textarea"
                        placeholder="Bắt đầu viết bài của bạn tại đây... 

💡 Gợi ý: 
• Sử dụng các từ vựng gợi ý (nếu có)
• Tham khảo dàn ý mẫu để có cấu trúc tốt
• Viết ít nhất 150 từ cho Task 1, 250 từ cho Task 2
• Sử dụng AI Rewrite để cải thiện bài viết"
                    />
                )}
                
                {/* Grammar Error Popover */}
            {activeError && popoverPosition && (
                <div 
                    className="suggestion-popover"
                    style={{ 
                        top: `${popoverPosition.top}px`, 
                        left: `${popoverPosition.left}px`,
                        transform: 'translate(-50%, -100%)'
                    }}
                >
                        <button 
                            onClick={() => handleCorrection(activeError)} 
                            className="w-full text-left p-3 rounded-lg bg-green-100 hover:bg-green-200 font-semibold text-green-800 mb-2 transition-colors"
                        >
                            ✅ {activeError.correction}
                    </button>
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{activeError.explanation_vi}</p>
                        <button 
                            onClick={() => setActiveError(null)} 
                            className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
                        >
                        <XMarkIcon className="w-4 h-4"/>
                    </button>
                </div>
            )}
            </div>
        </div>
    );
};

// --- NEW Interactive Components ---
interface BilingualWordWithId extends BilingualWord {
    id: number;
}

const ReorderPracticeArea: React.FC<{ 
    practice: { words: BilingualWord[], answer: string };
    onCompleted?: (isCorrect: boolean) => void;
}> = ({ practice, onCompleted }) => {
    const [shuffled, setShuffled] = useState<BilingualWordWithId[]>([]);
    const [answer, setAnswer] = useState<BilingualWordWithId[]>([]);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

    useEffect(() => {
        const initialWords = practice.words.map((word, index) => ({ ...word, id: index }));
        setShuffled([...initialWords].sort(() => Math.random() - 0.5));
        setAnswer([]);
        setFeedback(null);
    }, [practice]);

    const handleWordClick = (wordObj: BilingualWordWithId, from: 'shuffled' | 'answer') => {
        if (from === 'shuffled') {
            setAnswer([...answer, wordObj]);
            setShuffled(shuffled.filter(w => w.id !== wordObj.id));
        } else {
            setShuffled([...shuffled, wordObj]);
            setAnswer(answer.filter(w => w.id !== wordObj.id));
        }
    };

    const checkAnswer = () => {
        const userAnswer = answer.map(w => w.en).join(' ').trim();
        const correctAnswer = practice.answer.trim();
        
        const normalizedUserAnswer = userAnswer.toLowerCase().replace(/[.,!?;]$/, '');
        const normalizedCorrectAnswer = correctAnswer.toLowerCase().replace(/[.,!?;]$/, '');

        const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
        setFeedback(isCorrect ? 'correct' : 'incorrect');
        
        // Always call onCompleted with result (for scoring)
        if (onCompleted) {
            setTimeout(() => onCompleted(isCorrect), 1500); // Pass correct/incorrect
        }
    };

    return (
        <div className="space-y-4 reorder-compact">
            <div className="p-3 border border-gray-200 rounded-xl min-h-[56px] bg-white flex flex-wrap gap-2">
                {answer.map((wordObj) => (
                    <button key={wordObj.id} onClick={() => handleWordClick(wordObj, 'answer')} className="bilingual-word-btn bilingual-word-btn--answered rounded-full border-2 px-4 py-2 shadow-sm">
                        <span className="bilingual-word-en">{wordObj.en}</span>
                        <span className="bilingual-word-vi">{wordObj.vi}</span>
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                 {shuffled.map((wordObj) => (
                    <button key={wordObj.id} onClick={() => handleWordClick(wordObj, 'shuffled')} className="bilingual-word-btn rounded-full border-2 border-gray-300 bg-white hover:border-indigo-500 hover:bg-indigo-50 px-4 py-2 shadow-sm transition-colors">
                        <span className="bilingual-word-en">{wordObj.en}</span>
                        <span className="bilingual-word-vi">{wordObj.vi}</span>
                    </button>
                ))}
            </div>
             {feedback === null ? (
                <button onClick={checkAnswer} disabled={shuffled.length > 0} className="btn btn-writing w-full">Kiểm tra</button>
            ) : feedback === 'correct' ? (
                <div className="p-3 text-center bg-green-100 text-green-800 rounded-lg font-semibold">Chính xác!</div>
            ) : (
                <div className="p-3 bg-red-100 text-red-800 rounded-lg">Chưa đúng. Đáp án đúng là: "{practice.answer}"</div>
            )}
        </div>
    );
};

const FillBlankPracticeArea: React.FC<{ 
    practice: { sentence: BilingualText, missing_word: string, options: string[] };
    onCompleted?: (isCorrect: boolean) => void;
}> = ({ practice, onCompleted }) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    // Ensure we have exactly 4 options (1 correct + 3 distractors)
    const normalizedOptions = useMemo(() => {
        const opts = [...practice.options];
        // Ensure correct answer is included
        if (!opts.includes(practice.missing_word)) {
            opts[0] = practice.missing_word;
        }
        // Pad to 4 options if needed
        while (opts.length < 4) {
            opts.push(`Option ${opts.length + 1}`);
        }
        // Take only first 4 options
        return opts.slice(0, 4).sort(() => Math.random() - 0.5); // Shuffle for randomness
    }, [practice.options, practice.missing_word]);

    useEffect(() => {
        setSelected(null);
        setIsCorrect(null);
    }, [practice]);

    const handleSelect = (option: string) => {
        if (selected) return; // Prevent multiple selections
        setSelected(option);
        const correct = option === practice.missing_word;
        setIsCorrect(correct);
        
        // Always call onCompleted with result (for scoring)
        if (onCompleted) {
            setTimeout(() => onCompleted(correct), 1000); // Pass correct/incorrect
        }
    };

    const getButtonClass = (option: string) => {
        const base = 'pill-button px-6 py-3 border-2 shadow-sm transition-all duration-200 font-medium rounded-full';
        if (!selected) {
            return `${base} bg-white border-gray-300 text-gray-800 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transform hover:-translate-y-0.5`;
        }
        if (option === practice.missing_word) {
            return `${base} bg-green-500 border-green-600 text-white shadow-lg`;
        }
        if (option === selected && !isCorrect) {
            return `${base} bg-red-500 border-red-600 text-white shadow-lg`;
        }
        return `${base} bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed`;
    };

    const blank = '<span class="font-bold border-b-2 border-dashed border-blue-400 px-2 py-1 bg-blue-50 rounded">____</span>';

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h4 className="text-gray-700 font-medium mb-3">Chọn từ phù hợp để điền vào chỗ trống:</h4>
            </div>
            <div className="text-center practice-bilingual-sentence">
                <p className="en text-xl leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: practice.sentence.en.replace('____', blank) }} />
                <p className="vi text-gray-600 text-base">{practice.sentence.vi.replace('____', '____')}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {normalizedOptions.map((option, idx) => (
                    <button 
                        key={`${option}-${idx}`} 
                        onClick={() => handleSelect(option)} 
                        disabled={!!selected} 
                        className={getButtonClass(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            
            {/* Enhanced feedback */}
            {selected && isCorrect === true && (
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-3 bg-green-100 border border-green-300 rounded-lg text-green-700 font-semibold">
                        <span className="text-xl">✅</span>
                        <span>Chính xác! "{practice.missing_word}" là đáp án đúng.</span>
                    </div>
                </div>
            )}
            {selected && isCorrect === false && (
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-3 bg-red-100 border border-red-300 rounded-lg text-red-700 font-semibold">
                        <span className="text-xl">❌</span>
                        <span>Đáp án đúng là: "{practice.missing_word}"</span>
                    </div>
                </div>
            )}
        </div>
    );
};

const FindErrorPracticeArea: React.FC<{ 
    practice: { sentence: BilingualText, error_word: string, correct_word: string };
    onCompleted?: (isCorrect: boolean) => void;
}> = ({ practice, onCompleted }) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        setSelected(null);
        setIsCorrect(null);
        setShowFeedback(false);
    }, [practice]);
    
    const handleSelect = (word: string) => {
        if (selected) return; // Prevent multiple selections
        
        const cleanWord = word.replace(/[.,!?;]$/, '');
        const cleanErrorWord = practice.error_word.replace(/[.,!?;]$/, '');
        const correct = cleanWord === cleanErrorWord;
        
        setSelected(word);
        setIsCorrect(correct);
        
        // Show feedback after a brief delay for better UX
        setTimeout(() => setShowFeedback(true), 300);
        
        // Always call onCompleted with result (for scoring)
        if (onCompleted) {
            setTimeout(() => onCompleted(correct), 1200); // Pass correct/incorrect
        }
    };

    return (
        <div className="space-y-4">
            <div className="text-center">
                <h4 className="text-gray-700 font-medium mb-3">Tìm từ sai trong câu sau:</h4>
            </div>
             <div className="text-center practice-bilingual-sentence">
                <div className="en text-lg flex flex-wrap gap-x-2 gap-y-1 justify-center">
                    {practice.sentence.en.split(' ').map((word, i) => {
                        const isSelected = selected === word;
                        
                        return (
                        <span 
                            key={i} 
                            onClick={() => handleSelect(word)} 
                                className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${
                                    isSelected
                                        ? (isCorrect 
                                            ? 'bg-green-500 text-white font-semibold shadow-lg transform scale-105' 
                                            : 'bg-red-500 text-white font-semibold shadow-lg transform scale-105'
                                        )
                                        : selected
                                            ? 'text-gray-400 cursor-not-allowed' // Disable other words after selection
                                            : 'hover:bg-blue-100 hover:text-blue-800 hover:shadow-md border-2 border-transparent hover:border-blue-200'
                                }`}
                                style={{ 
                                    pointerEvents: selected && !isSelected ? 'none' : 'auto'
                                }}
                        >
                            {word}
                        </span>
                        );
                    })}
                </div>
                <div className="vi text-gray-600 mt-3 text-base">{practice.sentence.vi}</div>
            </div>
            
            {/* Enhanced Feedback - Only show after selection and delay */}
            {showFeedback && isCorrect === true && (
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-3 bg-green-100 border border-green-300 rounded-lg text-green-700 font-semibold">
                        <span className="text-xl">✅</span>
                        <span>Chính xác! Bạn đã tìm đúng lỗi sai.</span>
                    </div>
                </div>
            )}
            {showFeedback && isCorrect === false && (
                <div className="text-center">
                    <div className="inline-flex flex-col items-center gap-2 px-4 py-3 bg-red-100 border border-red-300 rounded-lg text-red-700">
                        <div className="flex items-center gap-2 font-semibold">
                            <span className="text-xl">❌</span>
                            <span>Chưa đúng!</span>
                        </div>
                        <div className="text-sm">
                            Lỗi sai là "<span className="font-bold text-red-800">{practice.error_word}</span>", nên sửa thành "<span className="font-bold text-green-700">{practice.correct_word}</span>"
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ChoosePhrasePracticeArea: React.FC<{ 
    practice: any;
    onCompleted?: (isCorrect: boolean) => void;
}> = ({ practice, onCompleted }) => {
    const question: BilingualText = (practice?.sentence || practice?.question || { en: '', vi: '' });
    const rawOptions = Array.isArray(practice?.options) ? practice.options : [];
    const options: { en: string; vi?: string }[] = rawOptions.map((opt: any) =>
        typeof opt === 'string' ? { en: opt } : (opt && typeof opt === 'object' && 'en' in opt ? opt : { en: String(opt) })
    );

    const computedCorrectIndex = typeof practice?.correct === 'number'
        ? practice.correct
        : (typeof practice?.correct_phrase === 'string'
            ? options.findIndex(o => o.en === practice.correct_phrase)
            : -1);

    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        setSelectedIdx(null);
        setIsCorrect(null);
    }, [practice]);

    const handleSelect = (idx: number) => {
        if (selectedIdx !== null) return;
        setSelectedIdx(idx);
        const correct = idx === computedCorrectIndex;
        setIsCorrect(correct);
        
        // Always call onCompleted with result (for scoring)
        if (onCompleted) {
            setTimeout(() => onCompleted(correct), 1000); // Pass correct/incorrect
        }
    };

    const getButtonClass = (idx: number) => {
        const base = 'pill-button px-4 py-3 border-2 shadow-sm transition-all duration-200 w-full text-left flex items-center gap-3 rounded-xl';
        if (selectedIdx === null) {
            return base + ' bg-white border-gray-300 text-gray-800 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transform hover:-translate-y-0.5';
        }
        if (idx === computedCorrectIndex) {
            return base + ' bg-green-500 border-green-600 text-white shadow-lg';
        }
        if (idx === selectedIdx && !isCorrect) {
            return base + ' bg-red-500 border-red-600 text-white shadow-lg';
        }
        return base + ' bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed';
    };

    const getLabelClass = (idx: number) => {
        const base = 'inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border-2';
        if (selectedIdx === null) {
            return base + ' bg-blue-100 border-blue-300 text-blue-700';
        }
        if (idx === computedCorrectIndex) {
            return base + ' bg-white border-white text-green-500';
        }
        if (idx === selectedIdx && !isCorrect) {
            return base + ' bg-white border-white text-red-500';
        }
        return base + ' bg-gray-200 border-gray-300 text-gray-500';
    };

    const blank = '<span class="font-bold border-b-2 border-dashed p-1">_____</span>';

    return (
        <div className="space-y-4">
            <div className="text-center practice-bilingual-sentence">
                <p className="en text-lg" dangerouslySetInnerHTML={{ __html: (question.en || '').replace('_____', blank) }} />
                <p className="vi">{(question.vi || '').replace('_____', '_____')}</p>
            </div>
            <div className="flex flex-col gap-3">
                {options.map((opt, idx) => (
                    <button 
                        key={'option-' + idx} 
                        onClick={() => handleSelect(idx)} 
                        disabled={selectedIdx !== null} 
                        className={getButtonClass(idx)}
                    >
                        <span className={getLabelClass(idx)}>
                            {'ABCD'[idx] || '?'}
                        </span>
                        <div className="flex-1">
                            <span className="bilingual-word-en font-medium">{opt.en}</span>
                            {opt.vi && <span className="bilingual-word-vi text-sm opacity-80 block mt-1">{opt.vi}</span>}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

const MatchingPracticeArea: React.FC<{ 
    practice: { col_a: BilingualWord[], col_b: BilingualWord[], correct_pairs: {key: string; value: string}[] };
    onCompleted?: (isCorrect: boolean) => void;
}> = ({ practice, onCompleted }) => {
    const [colA, setColA] = useState<BilingualWord[]>([]);
    const [colB, setColB] = useState<BilingualWord[]>([]);
    const [selectedA, setSelectedA] = useState<string | null>(null);
    const [selectedB, setSelectedB] = useState<string | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<[BilingualWord, BilingualWord][]>([]);
    const [feedback, setFeedback] = useState<string | null>(null);

    // Enhanced initialization with distractors and proper shuffling
    useEffect(() => {
        // Keep col_a in original order (or slight shuffle to avoid obvious pattern)
        const shuffledColA = [...practice.col_a].sort(() => Math.random() - 0.3); // Light shuffle
        
        // Add distractors to col_b and heavily shuffle to avoid order matching
        const colBWithDistractors = [...practice.col_b];
        
        // Add 1-2 distractor items if we have space
        if (colBWithDistractors.length < 6) {
            const distractors = [
                { en: 'distractor item', vi: 'từ gây nhiễu' },
                { en: 'extra option', vi: 'lựa chọn thừa' }
            ];
            colBWithDistractors.push(...distractors.slice(0, 6 - colBWithDistractors.length));
        }
        
        // Heavy shuffle for col_b to prevent order matching
        const heavilyShuffledColB = colBWithDistractors.sort(() => Math.random() - 0.5);
        
        setColA(shuffledColA);
        setColB(heavilyShuffledColB);
        setSelectedA(null); 
        setSelectedB(null); 
        setMatchedPairs([]); 
        setFeedback(null);
    }, [practice]);

    useEffect(() => {
        if (selectedA && selectedB) {
            const pairA = practice.col_a.find(item => item.en === selectedA);
            const pairB = practice.col_b.find(item => item.en === selectedB);
            
            // Check if it's a correct match
            const isCorrectMatch = practice.correct_pairs?.some(p => 
                (p.key === selectedA && p.value === selectedB) || 
                (p.key === selectedB && p.value === selectedA)
            ) || (pairA?.vi === pairB?.vi); // Fallback: match by Vietnamese meaning
            
            if (pairA && pairB) {
                setMatchedPairs(prev => [...prev, [pairA, pairB]]);
                setColA(prev => prev.filter(item => item.en !== selectedA));
                setColB(prev => prev.filter(item => item.en !== selectedB));
                
                // Show immediate feedback for this pair
                if (isCorrectMatch) {
                    setFeedback(`✅ Đúng: "${selectedA}" - "${selectedB}"`);
                } else {
                    setFeedback(`❌ Sai: "${selectedA}" không khớp với "${selectedB}"`);
                }
            }
            
            // Clear feedback after 2 seconds
            setTimeout(() => setFeedback(null), 2000);
            
            setSelectedA(null);
            setSelectedB(null);
        }
    }, [selectedA, selectedB, practice]);
    
    const checkAnswer = () => {
        let correctCount = 0;
        matchedPairs.forEach(([a, b]) => {
            if (practice.correct_pairs.some(p => (p.key === a.en && p.value === b.en) || (p.key === b.en && p.value === a.en))) {
                correctCount++;
            }
        });
        const isFullyCorrect = correctCount === practice.correct_pairs.length;
        if (isFullyCorrect) {
            setFeedback('Chính xác!');
        } else {
            setFeedback(`Bạn đã đúng ${correctCount}/${practice.correct_pairs.length}.`);
        }
        
        // Always call onCompleted with result (for scoring)
        if (onCompleted) {
            setTimeout(() => onCompleted(isFullyCorrect), 1500);
        }
    };

    const BilingualButtonA: React.FC<{ item: BilingualWord, onClick: () => void, isSelected: boolean }> = ({ item, onClick, isSelected }) => (
        <button 
            onClick={onClick} 
            className={`w-full text-left px-4 py-3 rounded-xl border-2 shadow-sm transition-all duration-200 ${
                isSelected 
                    ? 'bg-blue-600 text-white border-blue-700 shadow-lg transform scale-105' 
                    : 'bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md'
            }`}
        >
            <span className="bilingual-word-en font-medium block">{item.en}</span>
            <span className="bilingual-word-vi text-sm opacity-75 block mt-1">{item.vi}</span>
        </button>
    );

    const BilingualButtonB: React.FC<{ 
        item: BilingualWord, 
        onClick: () => void, 
        isSelected: boolean,
        isMatched: boolean 
    }> = ({ item, onClick, isSelected, isMatched }) => (
        <button 
            onClick={onClick} 
            className={`w-full text-left px-4 py-3 rounded-xl border-2 shadow-sm transition-all duration-200 ${
                isSelected 
                    ? 'bg-green-600 text-white border-green-700 shadow-lg transform scale-105' 
                    : isMatched
                        ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white border-gray-300 hover:border-green-500 hover:bg-green-50 hover:shadow-md'
            }`}
            disabled={isMatched}
        >
            <span className="bilingual-word-en font-medium block">{item.en}</span>
            {/* Only show Vietnamese when correctly matched */}
            {isMatched && (
                <span className="bilingual-word-vi text-sm opacity-75 block mt-1 text-green-600 font-medium">
                    → {item.vi}
                </span>
            )}
        </button>
    );

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h4 className="text-gray-700 font-medium mb-3">Nối từ tiếng Anh (trái) với nghĩa tiếng Việt tương ứng (phải):</h4>
                </div>
            
            <div className="grid grid-cols-2 gap-6">
                {/* Column A - English with Vietnamese shown */}
                <div className="space-y-3">
                    <h5 className="text-center font-semibold text-blue-700 mb-3">English</h5>
                    {colA.map(item => (
                        <BilingualButtonA 
                            key={item.en} 
                            item={item} 
                            onClick={() => setSelectedA(item.en)} 
                            isSelected={selectedA === item.en} 
                        />
                    ))}
                </div>
                
                {/* Column B - English only, Vietnamese shown after correct match */}
                <div className="space-y-3">
                    <h5 className="text-center font-semibold text-green-700 mb-3">Match with</h5>
                    {colB.map(item => {
                        const isMatched = matchedPairs.some(([a, b]) => b.en === item.en);
                        return (
                            <BilingualButtonB 
                                key={item.en} 
                                item={item} 
                                onClick={() => setSelectedB(item.en)} 
                                isSelected={selectedB === item.en}
                                isMatched={isMatched}
                            />
                        );
                    })}
            </div>
            </div>
            
            {/* Matched pairs display */}
            {matchedPairs.length > 0 && (
            <div className="space-y-2">
                    <h5 className="text-center font-semibold text-gray-700 mb-3">Các cặp đã nối:</h5>
                {matchedPairs.map(([a, b], i) => 
                        <div key={i} className="flex items-center justify-center p-3 bg-green-50 border border-green-200 rounded-lg">
                            <span className="font-semibold text-blue-700">{a.en}</span>
                            <span className="mx-3 text-gray-500">↔</span>
                            <span className="font-semibold text-green-700">{b.en}</span>
                            <span className="ml-2 text-sm text-gray-600">({b.vi})</span>
                    </div>
                )}
            </div>
            )}
            
            {/* Action button */}
            {colA.length === 0 && !feedback && (
                <button onClick={checkAnswer} className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                    Kiểm tra kết quả
                </button>
            )}
            
            {/* Feedback */}
            {feedback && (
                <div className={`p-4 text-center rounded-lg font-semibold ${
                    feedback.includes('✅') 
                        ? 'bg-green-100 text-green-800 border border-green-300' 
                        : feedback.includes('❌')
                            ? 'bg-red-100 text-red-800 border border-red-300'
                            : 'bg-blue-100 text-blue-800 border border-blue-300'
                }`}>
                    {feedback}
                </div>
            )}
        </div>
    );
};


const DragDropPracticeArea: React.FC<{ 
    practice: { sentence_parts: BilingualWord[]; correct_order: string[] };
    onCompleted?: (isCorrect: boolean) => void;
}> = ({ practice, onCompleted }) => {
    const [sourceParts, setSourceParts] = useState<DraggablePart[]>([]);
    const [targetParts, setTargetParts] = useState<DraggablePart[]>([]);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const draggedItem = useRef<{ item: DraggablePart, source: 'source' | 'target' } | null>(null);

    const reset = useCallback(() => {
        const initialParts = (practice.sentence_parts || []).map((item, id) => ({ ...item, id }));
        setSourceParts(initialParts.sort(() => Math.random() - 0.5));
        setTargetParts([]);
        setFeedback(null);
    }, [practice]);

    useEffect(() => { reset(); }, [reset]);

    const handleDragStart = (item: DraggablePart, source: 'source' | 'target') => { draggedItem.current = { item, source }; };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); };

    const handleDropOnTarget = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!draggedItem.current || draggedItem.current.source !== 'source') return;
        const { item } = draggedItem.current;
        setTargetParts(prev => [...prev, item]);
        setSourceParts(prev => prev.filter(p => p.id !== item.id));
        draggedItem.current = null;
    };
    
    const handleDropOnSource = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!draggedItem.current || draggedItem.current.source !== 'target') return;
        const { item } = draggedItem.current;
        setSourceParts(prev => [...prev, item]);
        setTargetParts(prev => prev.filter(p => p.id !== item.id));
        draggedItem.current = null;
    };

    const checkAnswer = () => {
        const droppedOrder = targetParts.map(p => p.en);
        const isCorrect = JSON.stringify(droppedOrder) === JSON.stringify(practice.correct_order);
        setFeedback(isCorrect ? 'correct' : 'incorrect');
        
        // Always call onCompleted with result (for scoring)
        if (onCompleted) {
            setTimeout(() => onCompleted(isCorrect), 1500); // Pass correct/incorrect
        }
    };

    const BilingualDraggable: React.FC<{ item: DraggablePart, onDragStart: () => void, className?: string }> = ({ item, onDragStart, className }) => (
        <div draggable onDragStart={onDragStart} className={`cursor-grab active:cursor-grabbing rounded-full border-2 border-gray-300 bg-white hover:border-indigo-500 hover:bg-indigo-50 px-4 py-2 shadow-sm transition-colors ${className || ''}`}>
            <span className="bilingual-word-en">{item.en}</span>
            <span className="bilingual-word-vi">{item.vi}</span>
        </div>
    );

    return (
        <div className="space-y-4">
            <div onDragOver={handleDragOver} onDrop={handleDropOnSource} className="p-4 bg-gray-100 rounded-lg min-h-[60px] flex flex-wrap gap-2 items-center">
                {sourceParts.map((item) => (
                    <BilingualDraggable key={item.id} item={item} onDragStart={() => handleDragStart(item, 'source')} />
                ))}
            </div>
            <div onDragOver={handleDragOver} onDrop={handleDropOnTarget} className="p-4 border-2 border-dashed border-gray-300 rounded-lg min-h-[100px] flex flex-wrap gap-2 items-center">
                {targetParts.map((item) => (
                     <BilingualDraggable key={item.id} item={item} onDragStart={() => handleDragStart(item, 'target')} className="bilingual-word-btn--answered" />
                ))}
            </div>
            {feedback === null ? (
                <button onClick={checkAnswer} className="btn btn-writing w-full" disabled={sourceParts.length > 0}>{sourceParts.length > 0 ? 'Hoàn thành kéo thả' : 'Kiểm tra'}</button>
            ) : feedback === 'correct' ? (
                 <div className="p-3 text-center bg-green-100 text-green-800 rounded-lg font-semibold">Chính xác!</div>
            ) : (
                <div className="text-center space-y-2">
                    <p className="p-3 bg-red-100 text-red-800 rounded-lg">Chưa đúng. Đáp án đúng là: "{practice.correct_order.join(' ')}"</p>
                    <button onClick={reset} className="btn btn-secondary">Thử lại</button>
                </div>
            )}
        </div>
    );
};

// --- Main View Component ---

const UnifiedPracticeView: React.FC<{
    items: PracticeItem[],
    subcategory: WritingSubcategory | null,
    onItemsUpdate: (newItems: (WritingSeed | FoundationTopic)[]) => void,
    isFoundation: boolean,
    selectedTrackId: string
}> = ({ items, subcategory, onItemsUpdate, isFoundation, selectedTrackId }) => {
    const { currentUser, updateUser, guestBananaBalance, useGuestBanana } = useAuth();
    const { submitScore, getAttemptCount, isFirstAttempt } = useScoring();
    const { showSuccess, showError, showCelebration } = useToast();
    const navigate = useNavigate();
    const [currentItem, setCurrentItem] = useState<PracticeItem | null>(null);
    const [practiceMode, setPracticeMode] = useState<PracticeMode>('reorder');
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
    const [isGeneratingItem, setIsGeneratingItem] = useState(false);
    const [generatingMode, setGeneratingMode] = useState<PracticeMode | null>(null);
    const [generatingImage, setGeneratingImage] = useState(false);
    const [aiError, setAIError] = useState('');
    const [forceUpdate, setForceUpdate] = useState(0);
    const practiceContainerRef = useRef<HTMLDivElement>(null);
    
    // Badge color per track
    const getBadgeClass = useCallback(() => {
        if (selectedTrackId === 'TOEIC') return 'bg-green-600';
        if (selectedTrackId === 'VSTEP') return 'bg-blue-600';
        if (selectedTrackId === 'IELTS') return 'bg-teal-600';
        if (isFoundation || selectedTrackId === 'EASY') return 'bg-emerald-600';
        return 'bg-indigo-600';
    }, [isFoundation, selectedTrackId]);

    // Primary solid button color per track
    const getPrimarySolidClass = useCallback(() => {
        if (selectedTrackId === 'TOEIC') return 'bg-green-600 hover:bg-green-700';
        if (selectedTrackId === 'VSTEP') return 'bg-blue-600 hover:bg-blue-700';
        if (selectedTrackId === 'IELTS') return 'bg-teal-600 hover:bg-teal-700';
        if (isFoundation || selectedTrackId === 'EASY') return 'bg-emerald-600 hover:bg-emerald-700';
        return 'bg-indigo-600 hover:bg-indigo-700';
    }, [isFoundation, selectedTrackId]);

    // Primary gradient button color per track
    const getPrimaryGradientClass = useCallback(() => {
        if (selectedTrackId === 'TOEIC') return 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700';
        if (selectedTrackId === 'VSTEP') return 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700';
        if (selectedTrackId === 'IELTS') return 'from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700';
        if (isFoundation || selectedTrackId === 'EASY') return 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700';
        return 'from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700';
    }, [isFoundation, selectedTrackId]);
    
    // Runtime AI feature toggle (URL: ?ai=off / ?ai=on or localStorage MATCANBAN_AI_ENABLED)
    const aiEnabled = useMemo(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const param = params.get('ai');
            if (param === 'off') return false;
            if (param === 'on') return true;
            const stored = localStorage.getItem('MATCANBAN_AI_ENABLED');
            if (stored === 'false' || stored === '0') return false;
            return true;
        } catch (e) {
            return true;
        }
    }, []);
    
    // Track completed exercises for each mode - with safe initialization
    const [completedExercises, setCompletedExercises] = useState<Record<string, Set<number>>>(() => 
        safeInitState({}, 'WRITING_COMPLETED_EXERCISES')
    );
    
    // Force re-render when currentItem changes
    useEffect(() => {
        console.log('🔄 currentItem changed, forceUpdate:', forceUpdate);
        if (currentItem) {
            console.log('🔄 currentItem details:', {
                id: currentItem.id,
                hasPracticeData: !!currentItem.practiceData,
                hasPractice: !!(currentItem as any).practice,
                practiceKeys: currentItem.practiceData ? Object.keys(currentItem.practiceData) : (currentItem as any).practice ? Object.keys((currentItem as any).practice) : 'NO PRACTICE',
                practiceModeData: currentItem.practiceData?.[practiceMode as keyof FoundationPracticeData] || (currentItem as any).practice?.[practiceMode as keyof FoundationPracticeData],
                practiceModeDataLength: (currentItem.practiceData?.[practiceMode as keyof FoundationPracticeData] || (currentItem as any).practice?.[practiceMode as keyof FoundationPracticeData])?.length || 0
            });
        }
    }, [currentItem, forceUpdate, practiceMode]);
    
    // Track items changes
    useEffect(() => {
        console.log('🔄 items changed:', {
            itemsLength: items.length,
            itemsIds: items.map(item => item.id)
        });
        
        // Debug practice data for current item
        if (currentItem) {
            const currentItemInItems = items.find(item => item.id === currentItem.id);
            if (currentItemInItems) {
                const practiceData = currentItemInItems.practiceData || (currentItemInItems as any).practice;
                console.log('🔄 Current item in items:', {
                    id: currentItemInItems.id,
                    hasPracticeData: !!currentItemInItems.practiceData,
                    hasPractice: !!(currentItemInItems as any).practice,
                    practiceKeys: practiceData ? Object.keys(practiceData) : 'NO PRACTICE',
                    practiceModeData: practiceData?.[practiceMode as keyof FoundationPracticeData],
                    practiceModeDataLength: practiceData?.[practiceMode as keyof FoundationPracticeData]?.length || 0
                });
            }
        }
    }, [items, currentItem, practiceMode]);
    
    // Sync currentItem with items when items change
    useEffect(() => {
        if (currentItem && items.length > 0) {
            const updatedItem = items.find(item => item.id === currentItem.id);
            if (updatedItem) {
                // Check if practice data has changed
                // For VSTEP/IELTS/TOEIC, data is in originalSeed.practice
                const currentPractice = currentItem.practiceData || (currentItem as any).practice || currentItem.originalSeed?.practice;
                const updatedPractice = updatedItem.practiceData || (updatedItem as any).practice || updatedItem.originalSeed?.practice;
                
                console.log('🔄 Checking if currentItem needs sync:', {
                    currentItemId: currentItem.id,
                    hasUpdatedItem: !!updatedItem,
                    currentPracticeLength: currentPractice?.[practiceMode as keyof FoundationPracticeData]?.length || 0,
                    updatedPracticeLength: updatedPractice?.[practiceMode as keyof FoundationPracticeData]?.length || 0,
                    needsSync: (currentPractice?.[practiceMode as keyof FoundationPracticeData]?.length || 0) !== (updatedPractice?.[practiceMode as keyof FoundationPracticeData]?.length || 0),
                    currentOriginalSeedPractice: currentItem.originalSeed?.practice?.[practiceMode]?.length || 0,
                    updatedOriginalSeedPractice: updatedItem.originalSeed?.practice?.[practiceMode]?.length || 0
                });
                
                // Check if practice data has changed in any of the data sources
                const currentLength = currentPractice?.[practiceMode as keyof FoundationPracticeData]?.length || 0;
                const updatedLength = updatedPractice?.[practiceMode as keyof FoundationPracticeData]?.length || 0;
                const currentOriginalLength = currentItem.originalSeed?.practice?.[practiceMode]?.length || 0;
                const updatedOriginalLength = updatedItem.originalSeed?.practice?.[practiceMode]?.length || 0;
                
                const needsSync = (currentLength !== updatedLength) || (currentOriginalLength !== updatedOriginalLength);
                
                if (needsSync) {
                    console.log('🔄 Syncing currentItem with updated items...');
                    setCurrentItem(updatedItem);
                    // Force re-render
                    setForceUpdate(prev => prev + 1);
                }
            }
        }
    }, [items, currentItem, practiceMode]);
    
    // Force update currentItem when items change (additional safety)
    useEffect(() => {
        if (currentItem && items.length > 0) {
            const updatedItem = items.find(item => item.id === currentItem.id);
            if (updatedItem) {
                const currentPractice = currentItem.practiceData || (currentItem as any).practice;
                const updatedPractice = updatedItem.practiceData || (updatedItem as any).practice;
                
                // Check if any practice mode has more questions
                const hasMoreQuestions = Object.keys(updatedPractice || {}).some(mode => {
                    const currentLength = currentPractice?.[mode as keyof FoundationPracticeData]?.length || 0;
                    const updatedLength = updatedPractice?.[mode as keyof FoundationPracticeData]?.length || 0;
                    return updatedLength > currentLength;
                });
                
                console.log('🔍 Checking for more questions:', {
                    currentItemId: currentItem.id,
                    hasUpdatedItem: !!updatedItem,
                    currentPractice: currentPractice,
                    updatedPractice: updatedPractice,
                    hasMoreQuestions
                });
                
                if (hasMoreQuestions) {
                    console.log('🔄 Force updating currentItem due to more questions...');
                    setCurrentItem(updatedItem);
                    setForceUpdate(prev => prev + 1);
                }
            }
        }
    }, [items, currentItem]);
    
    // Mark exercise as completed and handle scoring
    const markExerciseCompleted = async (mode: PracticeMode, exerciseIndex: number, isCorrect: boolean = true) => {
        if (!currentItem) return;
        
        const key = `${currentItem.id}-${mode}`;
        setCompletedExercises(prev => {
            try {
                const newCompleted = safeUpdateObject(prev, {});
                if (!newCompleted[key]) {
                    newCompleted[key] = new Set();
                }
                newCompleted[key].add(exerciseIndex);
                
                // Persist to localStorage safely
                const persistData = Object.fromEntries(
                    Object.entries(newCompleted).map(([k, v]) => [k, Array.from(v)])
                );
                safeLocalStorageSet('WRITING_COMPLETED_EXERCISES', persistData);
                
                return newCompleted;
            } catch (error) {
                recoverFromError(error as Error, 'markExerciseCompleted');
                return prev;
            }
        });

        // Submit score with anti-cheat protection
        try {
            const exerciseItemId = `${currentItem.id}-${mode}-${exerciseIndex}`;
            const result = await submitScore(
                mode,
                currentItem.id,
                exerciseItemId,
                isCorrect
            );

            if (result && result.counted) {
                const isFirst = isFirstAttempt(currentItem.id, exerciseItemId);
                
                // Enhanced notifications with score data
                const scoreData = {
                    totalScore: result.totalScore,
                    totalCorrect: result.totalCorrect,
                    credits: result.credits,
                    delta: result.delta,
                    isFirstAttempt: isFirst
                };

                if (isCorrect) {
                    if (isFirst) {
                        // First correct - celebration with score
                        showSuccess(`+${result.delta} điểm! 🎉`, scoreData);
                    } else {
                        // Subsequent correct - simple success
                        showSuccess('Đúng rồi! 👍', scoreData);
                    }
                } else {
                    if (isFirst) {
                        // First incorrect - show penalty
                        showError(`${result.delta} điểm 😔 Thử lại!`, scoreData);
                    } else {
                        // Subsequent incorrect - encouragement
                        showError('Thử lại! 💪', scoreData);
                    }
                }
                
                // Check for milestone celebrations
                if (isCorrect) {
                    // Banana bonus every 50 correct answers
                    if (result.totalCorrect % 50 === 0) {
                        if (currentUser) {
                            updateUser({
                                ...currentUser,
                                bananaBalance: (currentUser.bananaBalance || 0) + 1
                            });
                        }
                        showCelebration(`🍌 Milestone ${result.totalCorrect}! Bonus chuối!`, scoreData);
                    }
                    
                    // Score milestones
                    else if (result.totalScore > 0 && result.totalScore % 25 === 0) {
                        showCelebration(`🏆 ${result.totalScore} điểm! Tuyệt vời!`, scoreData);
                    }
                }
            }
        } catch (error) {
            console.error('Scoring error:', error);
        }
    };
    
    // Check if exercise is completed
    const isExerciseCompleted = (mode: PracticeMode, exerciseIndex: number): boolean => {
        if (!currentItem) return false;
        const key = `${currentItem.id}-${mode}`;
        return completedExercises[key]?.has(exerciseIndex) || false;
    };

    // Safe wrapper for onItemsUpdate to prevent crashes
    const safeItemsUpdate = (newItems: (WritingSeed | FoundationTopic)[]) => {
        try {
            // Validate newItems array
            if (!Array.isArray(newItems)) {
                console.warn('Invalid newItems provided to onItemsUpdate:', newItems);
                return;
            }
            
            console.log('🔍 safeItemsUpdate called with:', {
                newItemsLength: newItems.length,
                newItemsIds: newItems.map(item => 'code' in item ? item.code : item.id)
            });
            
            // Ensure immutable update
            const safeItems = newItems.map(item => ({ ...item }));
            console.log('🔍 Calling onItemsUpdate with safeItems...');
            onItemsUpdate(safeItems);
            console.log('✅ onItemsUpdate called successfully');
        } catch (error) {
            recoverFromError(error as Error, 'onItemsUpdate');
            console.error('Failed to update items safely:', error);
        }
    };
    
    const [freeWriteInput, setFreeWriteInput] = useState('');
    const [liveFeedback, setLiveFeedback] = useState<AIGrammarFeedback | null>(null);

    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState<AISuggestionsFeedback | AIRewriteResponse | null>(null);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [modalError, setModalError] = useState<string | null>(null);

    const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
    const [sampleModalTitle, setSampleModalTitle] = useState('');
    const [sampleModalContent, setSampleModalContent] = useState<string | WritingVocabItem[] | null>(null);

    // Import seeds (bulk) for current subcategory
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [importText, setImportText] = useState('');
    const [importError, setImportError] = useState<string | null>(null);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const grid = practiceContainerRef.current;
        if (!grid) return;
        
        const startX = e.clientX;
        const leftPanel = grid.children[0] as HTMLElement;

        if (!leftPanel) return;

        const startLeftWidth = leftPanel.offsetWidth;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const dx = moveEvent.clientX - startX;
            const newLeftWidth = startLeftWidth + dx;
            
            if (newLeftWidth > 280 && grid.offsetWidth - newLeftWidth - 10 > 400) {
                 grid.style.gridTemplateColumns = `${newLeftWidth}px 10px 1fr`;
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }, []);

    useEffect(() => {
        if (items.length > 0 && (!currentItem || !items.some(item => item.id === currentItem.id))) {
            setCurrentItem(items[0]);
        } else if (items.length === 0) {
            setCurrentItem(null);
        }
        setPracticeMode('reorder');
        setCurrentExerciseIndex(0);
        setLiveFeedback(null);
    }, [items, currentItem?.id]);

    useEffect(() => {
        if (!currentItem) return;
        const updatedItem = items.find(item => item.id === currentItem.id);
        if (updatedItem && updatedItem !== currentItem) {
            setCurrentItem(updatedItem);
        }
    }, [items, currentItem]);

    // Load progress when current item or user changes
    useEffect(() => {
        if (currentItem && currentUser) {
            const progress = getWritingProgress(currentUser.id);
            setFreeWriteInput(progress[currentItem.id] || '');
        } else {
            // Clear input for guest users or when no item is selected
            setFreeWriteInput('');
        }
    }, [currentItem, currentUser]);

    // Save progress with a debounce effect
    useEffect(() => {
        // Only save when in free_write mode and a user is logged in
        if (practiceMode === 'free_write' && currentItem && currentUser) {
            const handler = setTimeout(() => {
                saveWritingProgress(currentUser.id, currentItem.id, freeWriteInput);
            }, 500); // 500ms debounce

            return () => {
                clearTimeout(handler);
            };
        }
    }, [freeWriteInput, currentItem, practiceMode, currentUser]);


    const handleBananaCheck = () => {
        if (currentUser) {
            if (typeof currentUser.bananaBalance !== 'number' || currentUser.bananaBalance <= 0) {
                alert('Bạn đã hết chuối! 🍌 Vui lòng nạp thêm để tiếp tục sử dụng tính năng AI.');
                return false;
            }
        } else { // Guest user
            if (guestBananaBalance <= 0) {
                alert('Bạn đã dùng hết chuối miễn phí cho khách. Vui lòng đăng nhập hoặc đăng ký để tiếp tục sử dụng tính năng AI.');
                navigate('/login'); // Redirect to login
                return false;
            }
        }
        return true;
    };

    const handleAITransaction = (promise: Promise<any>) => {
        promise.then(() => {
            if (currentUser && typeof currentUser.bananaBalance === 'number') {
                const updatedUser = { ...currentUser, bananaBalance: currentUser.bananaBalance - 1 };
                updateUser(updatedUser);
            } else if (!currentUser) {
                useGuestBanana();
            }
        }).catch(console.error);
    };

    const handleGenerateItem = async (options: { withImage?: boolean } = {}) => {
        if (!subcategory || !handleBananaCheck()) return;

        setIsGeneratingItem(true);
        setAIError('');
        
        // Use the new generateNewSeed function
        const categoryKey = `${subcategory.track_id}-${subcategory.task_type?.replace(' ', '')}`;
        const promise = generateNewSeed(categoryKey, subcategory.task_type, options.withImage);
        
        handleAITransaction(promise);

        try {
            const newItemSeed = await promise;
            const aiItemsCount = items.filter(item => item.id.startsWith('AI-')).length;
            newItemSeed.prompt_vi_short = `[AI Đề ${aiItemsCount + 1}] ${newItemSeed.prompt_vi_short}`;
            const currentSeeds = items.map(i => i.originalSeed);
            onItemsUpdate([...currentSeeds, newItemSeed]);
        } catch (error) {
            console.error(error);
            setAIError(`Failed to generate a new practice item. Please try again.`);
        } finally {
            setIsGeneratingItem(false);
        }
    };
    
    const handleGenerateMoreExercises = async (mode: PracticeMode) => {
        console.log('🔥 handleGenerateMoreExercises called:', { mode, currentItem: !!currentItem, practiceMode });
        
        if (!currentItem) {
            console.log('❌ No currentItem');
            showError('Chưa chọn bài tập!');
            return;
        }
        
        if (mode === 'free_write') {
            console.log('❌ Free write mode not supported');
            return;
        }
        
        if (!handleBananaCheck()) {
            console.log('❌ Banana check failed');
            return;
        }
        
        try {
            console.log('✅ Starting AI generation for current mode only...');
        setGeneratingMode(mode);
        setAIError('');
            
            // Generate new questions for CURRENT mode only
            console.log(`🤖 Generating questions for mode: ${mode}`);
        const promise = generateMorePracticeQuestions(currentItem.originalSeed, mode);
            const newQuestions = await promise;
            
            if (!Array.isArray(newQuestions) || newQuestions.length === 0) {
                console.log('❌ No new questions generated for current mode');
                showError('Không thể tạo bài tập mới. Vui lòng thử lại.');
                return;
            }
            
            console.log(`✅ Generated ${newQuestions.length} questions for ${mode}`);
            
            console.log('✅ Valid newQuestions received, updating practice data for current mode...');
            
            const currentSeeds = items.map(i => i.originalSeed);
            
            let nextIndex = 0;
            const updatedSeeds = currentSeeds.map(seed => {
                const seedId = 'code' in seed ? seed.code : seed.id;
                if (seedId !== currentItem.id) return seed;
                
                console.log('🔍 Updating seed for current mode:', { 
                    seedId, 
                    mode,
                    newQuestionsLength: newQuestions.length
                });
                
                // Safe deep copy without JSON.parse/stringify to avoid circular refs
                const updatedSeed = safeUpdateObject(seed, {});
                if (!updatedSeed.practice) updatedSeed.practice = {};
                
                // Update CURRENT mode with new questions
                const currentQuestions = updatedSeed.practice[mode] || [];
                console.log(`🔍 Updating ${mode}:`, {
                    currentLength: currentQuestions.length,
                    newLength: newQuestions.length,
                    totalLength: currentQuestions.length + newQuestions.length
                });
                
                updatedSeed.practice = safeUpdateObject(updatedSeed.practice, {
                    [mode]: [...currentQuestions, ...newQuestions]
                });
                
                // Set nextIndex to the newest exercise in the current mode
                nextIndex = updatedSeed.practice[mode].length - 1;
                
                console.log('🔍 Updated seed practice for current mode:', { 
                    mode,
                    updatedSeedPractice: updatedSeed.practice,
                    nextIndex
                });
                
                return updatedSeed;
            });

            console.log('🔍 Calling safeItemsUpdate with updatedSeeds...');
            safeItemsUpdate(updatedSeeds);
            
            // CRITICAL: Update currentItem to reflect the new practice data
            const updatedCurrentItem = updatedSeeds.find(seed => {
                const seedId = 'code' in seed ? seed.code : seed.id;
                return seedId === currentItem.id;
            });
            
            if (updatedCurrentItem) {
                console.log('🔍 Updating currentItem with new practice data...', {
                    mode,
                    updatedPracticeData: updatedCurrentItem.practice?.[mode]
                });
                
                // Force update currentItem with new practice data
                // updatedCurrentItem is a WritingSeed, so we need to create a PracticeItem from it
                const newCurrentItem = {
                    ...currentItem,
                    originalSeed: updatedCurrentItem,
                    // Also update the practice data directly for immediate UI update
                    practice: updatedCurrentItem.practice
                };
                
                console.log('🔍 New currentItem:', {
                    id: newCurrentItem.id,
                    practiceData: newCurrentItem.practiceData,
                    practice: newCurrentItem.practice,
                    originalSeedPractice: newCurrentItem.originalSeed?.practice,
                    modeData: newCurrentItem.practice?.[mode],
                    modeDataLength: newCurrentItem.practice?.[mode]?.length || 0,
                    originalSeedModeData: newCurrentItem.originalSeed?.practice?.[mode],
                    originalSeedModeDataLength: newCurrentItem.originalSeed?.practice?.[mode]?.length || 0
                });
                
                setCurrentItem(newCurrentItem);
                
                // Force re-render by updating a dummy state
                setForceUpdate(prev => prev + 1);
            } else {
                console.log('❌ Could not find updatedCurrentItem!', {
                    currentItemId: currentItem.id,
                    updatedSeedsIds: updatedSeeds.map(s => 'code' in s ? s.code : s.id)
                });
            }
            
            // Move pagination to the newest exercise and scroll it into view
            setCurrentExerciseIndex(nextIndex);
            const btnId = `${currentItem.id}-${mode}-btn-${nextIndex}`;
            setTimeout(() => {
                const el = document.getElementById(btnId);
                if (el && 'scrollIntoView' in el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' } as ScrollIntoViewOptions);
                }
            }, 120);
            
            console.log('🎉 SUCCESS: All updates completed for current mode!');
            
            // Show success notification for current mode
            showSuccess(`✨ Đã tạo ${newQuestions.length} bài tập mới cho chế độ ${mode}!`);
        } catch (error) {
            console.error(error);
            setAIError('Failed to generate more exercises. Please try again.');
        } finally {
            setGeneratingMode(null);
        }
    };
    
    const handleCorrectionAndFeedbackUpdate = (newText: string) => {
        setFreeWriteInput(newText);
        // After a correction is made, re-check the grammar to update highlights
        handleCheckClick('grammar', newText);
    };

    const handleCheckClick = async (action: 'grammar' | 'suggestions', textToCheck?: string) => {
        const input = textToCheck ?? freeWriteInput;
        if (!input.trim() || !currentItem || !handleBananaCheck()) return;
        
        setIsModalLoading(true);
        setModalError(null);
        setModalContent(null);
        setLiveFeedback(null);

        try {
            if (action === 'grammar') {
                const promise = checkGrammar(input, currentItem.originalSeed);
                handleAITransaction(promise);
                const result = await promise;
                setLiveFeedback(result);
            } else { // suggestions
                setModalTitle('Gợi ý Cải thiện');
                setIsFeedbackModalOpen(true);
                const promise = suggestImprovements(input, currentItem.originalSeed);
                handleAITransaction(promise);
                const result = await promise;
                setModalContent(result);
            }
        } catch (err) {
            setModalError('Đã xảy ra lỗi khi nhận phản hồi từ AI. Vui lòng thử lại.');
             if(action === 'suggestions') { setIsFeedbackModalOpen(true); }
        } finally {
            setIsModalLoading(false);
        }
    };
    
    const handleRewriteClick = async (action: RewriteAction) => {
        if (!freeWriteInput.trim() || !handleBananaCheck()) return;
        
        setIsFeedbackModalOpen(true);
        setIsModalLoading(true);
        setModalError(null);
        setModalContent(null);
        setModalTitle('Nâng cấp bài viết');

        const promise = rewriteText(freeWriteInput, action);
        handleAITransaction(promise);

        try {
            const result = await promise;
            setModalContent(result);
        } catch (err) {
            setModalError('Đã xảy ra lỗi khi viết lại văn bản. Vui lòng thử lại.');
        } finally {
            setIsModalLoading(false);
        }
    };

    const handleGenerateImage = async () => {
        if (!currentItem || !handleBananaCheck()) return;
        
        setGeneratingImage(true);
        
        try {
            // Simulate AI image generation
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Update the current item with a new imageSeed
            const newImageSeed = `${currentItem.originalSeed.code?.toLowerCase()}-generated-${Date.now()}`;
            const updatedSeed = { ...currentItem.originalSeed, imageSeed: newImageSeed };
            const updatedItem = { ...currentItem, originalSeed: updatedSeed };
            
            setCurrentItem(updatedItem);
            
            // Update the items array to persist the change
            const updatedItems = items.map(item => 
                item.id === currentItem.id ? updatedItem : item
            );
            
            // Call the parent update function
            safeItemsUpdate(updatedItems.map(item => item.originalSeed));
            
            showSuccess('🖼️ Ảnh đã được tạo thành công!');
        } catch (err) {
            showError('Lỗi khi tạo ảnh. Vui lòng thử lại.');
        } finally {
            setGeneratingImage(false);
        }
    };

    const handleSampleClick = (type: 'vocab' | 'outline' | 'essay') => {
        if (!currentItem) return;
        let title = '';
        let content: string | WritingVocabItem[] | null = null;

        if (type === 'vocab' && currentItem.vocabulary) {
            title = 'Từ vựng mẫu';
            content = currentItem.vocabulary;
        } else if (type === 'outline' && currentItem.sample_outline_en) {
            title = 'Dàn ý mẫu';
            content = `Tiếng Việt:\n${currentItem.sample_outline_vi}\n\nEnglish:\n${currentItem.sample_outline_en}`;
        } else if (type === 'essay' && currentItem.sample_answer_en) {
            title = 'Bài viết mẫu';
            content = `Tiếng Việt:\n${currentItem.sample_answer_vi}\n\nEnglish:\n${currentItem.sample_answer_en}`;
        }

        if (content) {
            setSampleModalTitle(title);
            setSampleModalContent(content);
            setIsSampleModalOpen(true);
        }
    };

    const isModeAvailable = (mode: PracticeMode) => {
        if (mode === 'free_write') return true;
        if (!currentItem) return false;
        
        // Check both practiceData (Foundation) and practice (VSTEP/IELTS/TOEIC)
        const practiceData = currentItem.practiceData || (currentItem as any).practice;
        
        if (!practiceData) return false;
        
        const practiceForMode = practiceData[mode as keyof FoundationPracticeData];
        const hasExercises = Array.isArray(practiceForMode) && practiceForMode.length > 0;
        console.log('🔍 Practice for mode:', { 
            mode, 
            practiceForMode, 
            hasExercises, 
            forceUpdate,
            currentItemId: currentItem.id,
            practiceData: currentItem.practiceData || (currentItem as any).practice,
            practiceDataKeys: (currentItem.practiceData || (currentItem as any).practice) ? Object.keys(currentItem.practiceData || (currentItem as any).practice) : 'NO DATA'
        });
        
        return hasExercises;
    };
    
    const renderPracticeArea = useMemo(() => {
        // Force re-render when forceUpdate changes
        console.log('🔄 renderPracticeArea called, forceUpdate:', forceUpdate);
        
        if (!currentItem) return <div className="p-4 text-center text-gray-500">Vui lòng chọn một tình huống hoặc cấu trúc.</div>;

        if (practiceMode === 'free_write') {
            return (
                <>
                    <LiveEditorArea 
                        userInput={freeWriteInput}
                        setUserInput={(value) => {
                            setLiveFeedback(null); // Clear feedback on new input
                            setFreeWriteInput(value);
                        }}
                        liveFeedback={liveFeedback}
                        onCorrection={handleCorrectionAndFeedbackUpdate}
                    />
                    <FreeWriteFooter 
                        currentItem={currentItem} 
                        userInput={freeWriteInput}
                        onCheckClick={(action) => handleCheckClick(action)}
                        onSampleClick={handleSampleClick}
                        onRewriteClick={handleRewriteClick}
                        onClearFeedback={() => setLiveFeedback(null)}
                        hasLiveFeedback={!!liveFeedback}
                    />
                </>
            );
        }

        // Check both practiceData (Foundation) and practice (VSTEP/IELTS/TOEIC)
        // For VSTEP/IELTS/TOEIC, data is in originalSeed.practice
        const allPracticeData = currentItem.practiceData || (currentItem as any).practice || currentItem.originalSeed?.practice;
        const questionsForMode = allPracticeData?.[practiceMode as keyof FoundationPracticeData];
        
        console.log('🔍 allPracticeData DEBUG:', {
            practiceMode,
            currentItemId: currentItem.id,
            hasPracticeData: !!currentItem.practiceData,
            hasPractice: !!(currentItem as any).practice,
            hasOriginalSeedPractice: !!currentItem.originalSeed?.practice,
            allPracticeData,
            allPracticeDataKeys: allPracticeData ? Object.keys(allPracticeData) : 'NO DATA',
            practiceModeData: allPracticeData?.[practiceMode as keyof FoundationPracticeData],
            practiceModeDataLength: allPracticeData?.[practiceMode as keyof FoundationPracticeData]?.length || 0,
            originalSeedPracticeMode: currentItem.originalSeed?.practice?.[practiceMode],
            originalSeedPracticeModeLength: currentItem.originalSeed?.practice?.[practiceMode]?.length || 0
        });
        
        console.log('🔍 renderPracticeArea DEBUG:', {
            practiceMode,
            currentItemId: currentItem.id,
            hasAllPracticeData: !!allPracticeData,
            allPracticeDataKeys: allPracticeData ? Object.keys(allPracticeData) : 'NO DATA',
            questionsForMode,
            questionsLength: questionsForMode?.length || 0,
            forceUpdate,
            currentItemPractice: currentItem.originalSeed?.practice,
            currentItemPracticeMode: currentItem.originalSeed?.practice?.[practiceMode]
        });
        
        if (!Array.isArray(questionsForMode) || questionsForMode.length === 0) {
            return (
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 rounded-xl text-center">
                    <div className="text-4xl mb-3">🤖</div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Chưa có bài tập cho chế độ này</h4>
                    <p className="text-gray-600 mb-1">Chưa có bài tập cho chế độ này.</p>
                    <p className="text-gray-500">Vui lòng chọn bài khác hoặc quay lại sau.</p>
                </div>
            );
        }
        const total = questionsForMode.length;
        const clampedIndex = Math.max(0, Math.min(currentExerciseIndex, total - 1));
        const visiblePractice = questionsForMode[clampedIndex];
        
        console.log('🔍 Pagination DEBUG:', {
            practiceMode,
            total,
            currentExerciseIndex,
            clampedIndex,
            visiblePractice: !!visiblePractice,
            questionsForMode: questionsForMode.length
        });

        // Pick component
        const PracticeComponent = {
            reorder: ReorderPracticeArea,
            fill_blank: FillBlankPracticeArea,
            find_error: FindErrorPracticeArea,
            choose_phrase: ChoosePhrasePracticeArea,
            matching: MatchingPracticeArea,
            drag_drop: DragDropPracticeArea,
        }[practiceMode];

        return (
            <div className="space-y-4 practice-item-list">
                {/* Enhanced Circular Pagination with Progress */}
                <div className="pagination-circular">
                    {questionsForMode.map((_, i) => {
                        const isActive = i === clampedIndex;
                        const isCompleted = isExerciseCompleted(practiceMode, i);
                        
                        console.log('🔍 Pagination button:', {
                            i,
                            isActive,
                            isCompleted,
                            total: questionsForMode.length,
                            clampedIndex
                        });
                        
                        return (
                        <button
                            key={`${currentItem.id}-${practiceMode}-btn-${i}`}
                            id={`${currentItem.id}-${practiceMode}-btn-${i}`}
                            onClick={() => setCurrentExerciseIndex(i)}
                                className={`pagination-btn ${
                                    isActive 
                                        ? 'pagination-btn--active' 
                                        : isCompleted 
                                            ? 'pagination-btn--completed'
                                            : ''
                                }`}
                                title={`Bài ${i + 1}${isCompleted ? ' (Đã hoàn thành)' : ''}`}
                            >
                                {isCompleted && !isActive ? '✓' : i + 1}
                        </button>
                        );
                    })}
                    
                    {/* Progress indicator */}
                    <div className="ml-4 flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">
                            {Object.values(completedExercises[`${currentItem.id}-${practiceMode}`] || new Set()).length}/{questionsForMode.length}
                        </span>
                        <span className="text-gray-400">hoàn thành</span>
                    </div>
                </div>

                {/* Single practice render */}
                <div className="practice-item ml-4">
                    {PracticeComponent && (
                        <PracticeComponent 
                            practice={visiblePractice as any} 
                            onCompleted={(isCorrect: boolean) => markExerciseCompleted(practiceMode, clampedIndex, isCorrect)}
                        />
                    )}
                </div>
            </div>
        );
    }, [currentItem, practiceMode, forceUpdate, generatingMode, currentExerciseIndex, completedExercises, freeWriteInput, liveFeedback, isSampleModalOpen, sampleModalContent, isFeedbackModalOpen, modalContent, aiError]);

    const modes: { id: PracticeMode; label: string }[] = [ { id: 'reorder', label: 'Sắp xếp' }, { id: 'fill_blank', label: 'Điền từ' }, { id: 'find_error', label: 'Tìm lỗi sai' }, { id: 'choose_phrase', label: 'Chọn cụm từ' }, { id: 'matching', label: 'Nối cột' }, { id: 'drag_drop', label: 'Kéo thả' }, { id: 'free_write', label: 'Tự viết' } ];
    
    const groupedFoundationItems = useMemo(() => {
        if (!isFoundation) return null;
        return items.reduce((acc, item) => {
            const topic = item.originalSeed as FoundationTopic;
            const category = topic.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(item);
            return acc;
        }, {} as Record<string, PracticeItem[]>);
    }, [items, isFoundation]);


    return (
        <div>
            <AIFeedbackModal
                isOpen={isFeedbackModalOpen}
                onClose={() => setIsFeedbackModalOpen(false)}
                title={modalTitle}
                isLoading={isModalLoading}
                error={modalError}
                content={modalContent}
            />
            <SampleContentModal
                isOpen={isSampleModalOpen}
                onClose={() => setIsSampleModalOpen(false)}
                title={sampleModalTitle}
                content={sampleModalContent}
            />
            {/* Top AI action bar removed */}
            

            {aiError && <p className="text-red-500 text-center mb-4">{aiError}</p>}
            {isImportOpen && (
                <div className="ai-feedback-modal-overlay" onClick={() => setIsImportOpen(false)}>
                    <div className="ai-feedback-modal-content enhanced-import-modal" onClick={e => e.stopPropagation()}>
                        <header className="ai-feedback-modal-header">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    📥
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Import JSON Seeds</h3>
                                    <p className="text-sm text-gray-600">Nhập loạt đề vào {subcategory?.subcategory_name_vi}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsImportOpen(false)} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 transition-colors">
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </header>
                        <div className="ai-feedback-modal-body space-y-4">
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h4 className="font-semibold text-blue-800 mb-2">📋 Format JSON mong đợi:</h4>
                                <div className="text-sm text-blue-700 space-y-1">
                                    <p><strong>Bắt buộc:</strong> code, prompt_en, prompt_vi</p>
                                    <p><strong>Tùy chọn:</strong> prompt_vi_short, must_use[], focus, imageSeed</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    📝 Dán JSON Array:
                                </label>
                            <textarea
                                    className="w-full h-48 p-4 border-2 border-gray-300 rounded-xl font-mono text-sm focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                value={importText}
                                onChange={(e) => setImportText(e.target.value)}
                                    placeholder={`[
  {
    "code": "IELTS-T1-NEW-01",
    "prompt_en": "The chart shows changes in renewable energy usage...",
    "prompt_vi": "Biểu đồ cho thấy sự thay đổi trong việc sử dụng năng lượng tái tạo...",
    "prompt_vi_short": "NEW-01: Năng lượng tái tạo",
    "must_use": ["Overall", "significant increase", "in contrast"],
    "focus": "Describing trends and comparisons",
    "imageSeed": "renewable-energy-chart-2024"
  }
]`}
                                />
                                
                                {/* Validation status */}
                                <div className="flex items-center gap-2 text-sm">
                                    {importText.trim() && (
                                        <div className="flex items-center gap-1">
                                            {(() => {
                                                try {
                                                    const parsed = JSON.parse(importText);
                                                    if (Array.isArray(parsed) && parsed.length > 0) {
                                                        return (
                                                            <>
                                                                <span className="text-green-600">✅</span>
                                                                <span className="text-green-700 font-medium">
                                                                    {parsed.length} đề hợp lệ
                                                                </span>
                                                            </>
                                                        );
                                                    }
                                                    return <span className="text-orange-600">⚠️ Mảng rỗng</span>;
                                                } catch {
                                                    return <span className="text-red-600">❌ JSON không hợp lệ</span>;
                                                }
                                            })()}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {importError && (
                                <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
                                    <div className="flex items-center gap-2 text-red-800">
                                        <span className="text-lg">❌</span>
                                        <span className="font-semibold">Lỗi:</span>
                                    </div>
                                    <p className="text-red-700 mt-1">{importError}</p>
                                </div>
                            )}
                            
                            <div className="flex gap-3">
                            <button
                                    className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                                    onClick={() => {
                                        setIsImportOpen(false);
                                        setImportText('');
                                        setImportError(null);
                                    }}
                                >
                                    Hủy
                                </button>
                                <button
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    disabled={!importText.trim()}
                                onClick={() => {
                                    try {
                                        setImportError(null);
                                            
                                            // Enhanced validation
                                        const parsed = JSON.parse(importText);
                                            if (!Array.isArray(parsed)) {
                                                throw new Error('JSON phải là một mảng (array)');
                                            }
                                            if (parsed.length === 0) {
                                                throw new Error('Mảng không được rỗng');
                                            }
                                            if (parsed.length > 50) {
                                                throw new Error('Tối đa 50 đề mỗi lần import');
                                            }
                                            
                                            const normalized = parsed.map((item: any, index: number) => {
                                                if (!item || typeof item !== 'object') {
                                                    throw new Error(`Phần tử ${index + 1}: Phải là object`);
                                                }
                                                if (!item.code || !item.prompt_en || !item.prompt_vi) {
                                                    throw new Error(`Phần tử ${index + 1}: Thiếu code/prompt_en/prompt_vi`);
                                                }
                                                
                                            return {
                                                    code: String(item.code),
                                                    topic: item.topic || subcategory?.subcategory_name_vi || 'Writing',
                                                    prompt_en: String(item.prompt_en),
                                                    prompt_vi: String(item.prompt_vi),
                                                    prompt_vi_short: item.prompt_vi_short ? String(item.prompt_vi_short) : String(item.prompt_vi).slice(0, 50),
                                                    must_use: Array.isArray(item.must_use) ? item.must_use : [],
                                                    focus: item.focus ? String(item.focus) : '',
                                                    imageSeed: item.imageSeed ? String(item.imageSeed) : undefined,
                                            } as any;
                                        });
                                            
                                            // Safe update using our new utilities
                                        const currentSeeds = items.map(i => i.originalSeed);
                                            safeItemsUpdate([...currentSeeds, ...normalized]);
                                            
                                            // Success feedback
                                            showSuccess(`✅ Đã import ${normalized.length} đề thành công!`);
                                        setIsImportOpen(false);
                                        setImportText('');
                                            setImportError(null);
                                    } catch (e: any) {
                                        setImportError(e?.message || 'JSON không hợp lệ');
                                    }
                                }}
                            >
                                    📥 Import {(() => {
                                        try {
                                            const parsed = JSON.parse(importText);
                                            return Array.isArray(parsed) ? `(${parsed.length} đề)` : '';
                                        } catch {
                                            return '';
                                        }
                                    })()} 
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="practice-studio-grid" ref={practiceContainerRef}>
                <div className="practice-list-panel flex flex-col">
                    <h3 className="font-bold text-lg text-center mb-2 border-b pb-2 flex-shrink-0">{isFoundation ? 'Loại Câu' : 'Đề thi'}</h3>
                    <div className="flex-grow overflow-y-auto pr-2 -mr-2 max-h-[65vh] space-y-1">
                        {isFoundation && groupedFoundationItems ? (
                            Object.entries(groupedFoundationItems).map(([category, categoryItems]) => (
                                <div key={category}>
                                    <h4 className="font-bold text-gray-500 mt-4 mb-1 px-1">{category}</h4>
                                    {categoryItems.map((item, idx) => (
                                        <button key={item.id} onClick={() => setCurrentItem(item)} className={`sentence-list-item ${currentItem?.id === item.id ? 'sentence-list-item--active' : 'hover:bg-gray-50'}`}>
                                            <span className={`mr-2 inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ${getBadgeClass()}`}>{idx + 1}</span>
                                            <span className="truncate">{item.shortLabel}</span>
                                        </button>
                                    ))}
                                </div>
                            ))
                        ) : (
                            items.map((item, idx) => (
                                <button key={item.id} onClick={() => setCurrentItem(item)} className={`sentence-list-item ${currentItem?.id === item.id ? 'sentence-list-item--active' : 'hover:bg-gray-50'}`}>
                                    <span className={`mr-2 inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ${getBadgeClass()}`}>{idx + 1}</span>
                                    <span className="truncate">{item.shortLabel}</span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
                <div className="resizer-col" onMouseDown={onMouseDown}></div>
                <div className="practice-area-panel">
                    {currentItem ? (
                        <>
                            <div className="prompt-display-area">
                                {/* Enhanced Image Section for IELTS Task 1 */}
                                {selectedTrackId === 'IELTS' && subcategory?.task_type === 'Task 1' && (
                                    <div className="mb-6">
                                        <div className="relative">
                                            {/* Main Image Container */}
                                            <div className="w-full h-80 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center shadow-sm">
                                                {currentItem.originalSeed.imageSeed ? (
                                                    <GcsImage 
                                                        imageSeed={currentItem.originalSeed.imageSeed}
                                                        className="max-w-full max-h-full object-contain rounded-lg"
                                                        alt={`${subcategory.subcategory_name_vi} chart`}
                                                    />
                                                ) : (
                                                    <div className="text-center p-6">
                                                        <EyeIcon className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                                                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                                                            {subcategory.subcategory_name_vi}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 mb-4">
                                                            Biểu đồ sẽ hiển thị tại đây để hỗ trợ bài viết Task 1
                                                        </p>
                                                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                                            <button 
                                                                onClick={() => handleGenerateImage()}
                                                                disabled={generatingImage}
                                                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                                                            >
                                                                {generatingImage ? (
                                                                    <div className="ai-spinner !w-4 !h-4"></div>
                                                                ) : (
                                                                    <PhotoIcon className="w-4 h-4" />
                                                                )}
                                                                AI Generate Image
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Image Controls */}
                                            {currentItem.originalSeed.imageSeed && (
                                                <div className="absolute top-3 right-3 flex gap-2">
                                                    <button 
                                                        onClick={() => handleGenerateImage()}
                                                        disabled={generatingImage}
                                                        className="p-2 bg-white/90 hover:bg-white text-gray-700 rounded-lg shadow-sm transition-colors disabled:opacity-50"
                                                        title="Generate new image"
                                                    >
                                                        {generatingImage ? (
                                                            <div className="ai-spinner !w-4 !h-4"></div>
                                                        ) : (
                                                            <PhotoIcon className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Prompt Text */}
                                <div className="prose prose-gray max-w-none">
                                {currentItem.longPrompt}
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                {modes.map(mode => (
                                    <div key={mode.id} className="mode-selector-container">
                                        <button onClick={() => { setPracticeMode(mode.id); setCurrentExerciseIndex(0); }} className={`mode-selector-btn ${practiceMode === mode.id ? 'mode-selector-btn--active' : ''}`} disabled={!isModeAvailable(mode.id) && mode.id !== 'free_write'}>
                                            {mode.label}
                                        </button>
                                        {/* Per-mode AI button - clean action */}
                                        {aiEnabled && mode.id !== 'free_write' && (
                                            <button
                                                onClick={() => {
                                                    console.log('⚡ Per-mode AI generate clicked', { mode: mode.id });
                                                    handleGenerateMoreExercises(mode.id);
                                                }}
                                                disabled={generatingMode === mode.id}
                                                className="btn-ai-generate-exercise"
                                                title={`AI tạo thêm 6 bài tập ${mode.label}`}
                                            >
                                                {generatingMode === mode.id ? <div className="ai-spinner !w-4 !h-4"></div> : <MagicWandIcon className="w-4 h-4"/>}
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {/* Single current-mode action bar */}
                            {aiEnabled && practiceMode !== 'free_write' && (
                                <div className="flex justify-end mb-3">
                                    <button
                                        onClick={() => handleGenerateMoreExercises(practiceMode)}
                                        disabled={generatingMode === practiceMode}
                                        className={`px-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-r ${getPrimaryGradientClass()} shadow-md disabled:opacity-50`}
                                    >
                                        {generatingMode === practiceMode ? 'Đang tạo +6…' : 'Tạo thêm +6 câu'}
                                    </button>
                                </div>
                            )}
                            <div className="mt-4 flex-grow flex flex-col" key={`practice-${currentItem?.id}-${practiceMode}-${forceUpdate}`}>{renderPracticeArea}</div>
                        </>
                    ) : (
                        <div className="text-center text-gray-500 py-10">Chọn một bài thực hành từ danh sách bên trái để bắt đầu.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const WritingPage: React.FC = () => {
    const location = useLocation();
    const navState = location.state as { track_id: string; subcategory_id: string } | null;
    const [refreshKey, setRefreshKey] = useState(0);

    const savedState = getWritingPageState();
    const [selectedTrackId, setSelectedTrackId] = useState<string>(navState?.track_id ?? savedState?.selectedTrackId ?? 'EASY');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(navState?.subcategory_id ?? savedState?.selectedSubcategoryId ?? null);
    const [foundationLevelFilter, setFoundationLevelFilter] = useState<'all' | 'easy' | 'medium' | 'advanced'>(savedState?.foundationLevelFilter ?? 'all');

    // Effect to handle incoming navigation state
    useEffect(() => {
        if (navState) {
            setSelectedTrackId(navState.track_id);
            setSelectedSubcategoryId(navState.subcategory_id);
            // Clear state after using it to prevent re-triggering on unrelated re-renders
            window.history.replaceState({}, document.title)
        }
    }, [navState]);


    // Load base data (without IELTS, TOEIC, VSTEP)
    const baseWritingData = useMemo(() => {
        try {
            return loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_DATA, defaultWritingData);
        } catch (error) {
            recoverFromError(error as Error, 'baseWritingData');
            return defaultWritingData;
        }
    }, [refreshKey]);
    
    const foundationData = useMemo(() => {
        try {
            return loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_FOUNDATION_CONTENT, defaultFoundationData);
        } catch (error) {
            recoverFromError(error as Error, 'foundationData');
            return defaultFoundationData;
        }
    }, [refreshKey]);

    // Load modular IELTS WRITING data (granular)
    const ieltsT1LineTasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_LINE_TASKS, defaultIeltsT1LineTasks), [refreshKey]);
    const ieltsT1LineContent = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_LINE_CONTENT, defaultIeltsT1LineContent), [refreshKey]);
    const ieltsT1BarTasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_BAR_TASKS, defaultIeltsT1BarTasks), [refreshKey]);
    const ieltsT1BarContent = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_BAR_CONTENT, defaultIeltsT1BarContent), [refreshKey]);
    const ieltsT1PieTasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_PIE_TASKS, defaultIeltsT1PieTasks), [refreshKey]);
    const ieltsT1PieContent = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_PIE_CONTENT, defaultIeltsT1PieContent), [refreshKey]);
    const ieltsT1TableTasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_TABLE_TASKS, defaultIeltsT1TableTasks), [refreshKey]);
    const ieltsT1TableContent = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_TABLE_CONTENT, defaultIeltsT1TableContent), [refreshKey]);
    const ieltsT1ProcessTasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_PROCESS_TASKS, defaultIeltsT1ProcessTasks), [refreshKey]);
    const ieltsT1ProcessContent = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_PROCESS_CONTENT, defaultIeltsT1ProcessContent), [refreshKey]);
    const ieltsT1MapTasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_MAP_TASKS, defaultIeltsT1MapTasks), [refreshKey]);
    const ieltsT1MapContent = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_MAP_CONTENT, defaultIeltsT1MapContent), [refreshKey]);
    const ieltsT1MixTasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_MIX_TASKS, defaultIeltsT1MixTasks), [refreshKey]);
    const ieltsT1MixContent = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_MIX_CONTENT, defaultIeltsT1MixContent), [refreshKey]);

    // Load modular IELTS Writing data - Task 2
    const ieltsT2OpinionTasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T2_OPINION_TASKS, defaultIeltsT2OpinionTasks), [refreshKey]);
    const ieltsT2OpinionContent = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T2_OPINION_CONTENT, defaultIeltsT2OpinionContent), [refreshKey]);
    const ieltsT2DiscussionTasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T2_DISCUSSION_TASKS, defaultIeltsT2DiscussionTasks), [refreshKey]);
    const ieltsT2DiscussionContent = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T2_DISCUSSION_CONTENT, defaultIeltsT2DiscussionContent), [refreshKey]);
    const ieltsT2ProblemSolutionTasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T2_PROBLEMSOLUTION_TASKS, defaultIeltsT2ProblemSolutionTasks), [refreshKey]);
    const ieltsT2ProblemSolutionContent = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T2_PROBLEMSOLUTION_CONTENT, defaultIeltsT2ProblemSolutionContent), [refreshKey]);
    const ieltsT2AdvDisTasks = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T2_ADVDIS_TASKS, defaultIeltsT2AdvDisTasks), [refreshKey]);
    const ieltsT2AdvDisContent = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_IELTS_T2_ADVDIS_CONTENT, defaultIeltsT2AdvDisContent), [refreshKey]);

    // Load modular TOEIC Writing data
    const toeicT1Subcategories = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.TOEIC_WRITING_P1_SUBCATEGORIES, defaultToeicT1Subcategories), [refreshKey]);
    const toeicT1Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.TOEIC_WRITING_P1_CONTENT, defaultToeicT1Content), [refreshKey]);
    const toeicT2Subcategories = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.TOEIC_WRITING_P2_SUBCATEGORIES, defaultToeicT2Subcategories), [refreshKey]);
    const toeicT2Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.TOEIC_WRITING_P2_CONTENT, defaultToeicT2Content), [refreshKey]);
    const toeicT3Subcategories = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.TOEIC_WRITING_P3_SUBCATEGORIES, defaultToeicT3Subcategories), [refreshKey]);
    const toeicT3Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.TOEIC_WRITING_P3_CONTENT, defaultToeicT3Content), [refreshKey]);
    
    // NEW: Load modular VSTEP Writing data
    const vstepT1Subcategories = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.VSTEP_WRITING_T1_SUBCATEGORIES, defaultVstepT1Subcategories), [refreshKey]);
    const vstepT1Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.VSTEP_WRITING_T1_CONTENT, defaultVstepT1Content), [refreshKey]);
    const vstepT2Subcategories = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.VSTEP_WRITING_T2_SUBCATEGORIES, defaultVstepT2Subcategories), [refreshKey]);
    const vstepT2Content = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.VSTEP_WRITING_T2_CONTENT, defaultVstepT2Content), [refreshKey]);


    // Merge all data sources at runtime
    const writingData = useMemo<WritingCategory[]>(() => {
        const mergeContent = (subcategories: WritingSubcategory[], contentMap: WritingContentMap): WritingSubcategory[] => {
            return subcategories.map(sub => ({
                ...sub,
                seeds: (sub.seeds || []).map(seed => {
                    const mergedSeed = {
                    ...seed,
                    ...(contentMap[seed.code] || {})
                    };
                    console.log('🔍 Merging seed:', { code: seed.code, hasContent: !!(contentMap[seed.code]), hasPractice: !!(contentMap[seed.code]?.practice) });
                    if (seed.code === 'VSTEP-T1-THX-01') {
                        console.log('🎯 VSTEP-T1-THX-01 DEBUG:', { 
                            seed, 
                            content: contentMap[seed.code], 
                            merged: { ...seed, ...(contentMap[seed.code] || {}) }
                        });
                    }
                    return mergedSeed;
                })
            }));
        };

        // FIX: Reconstruct IELTS subcategories and content from granular data sources
        // to resolve "Cannot find name" errors.
        const ieltsT1Subcategories: WritingSubcategory[] = [
            { track_id: 'IELTS', task_type: 'Task 1', subcategory_id: 'IELTS-T1-Line', subcategory_name_vi: 'Biểu đồ Đường', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài mô tả biểu đồ đường.', seeds: ieltsT1LineTasks },
            { track_id: 'IELTS', task_type: 'Task 1', subcategory_id: 'IELTS-T1-Bar', subcategory_name_vi: 'Biểu đồ Cột', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài mô tả biểu đồ cột.', seeds: ieltsT1BarTasks },
            { track_id: 'IELTS', task_type: 'Task 1', subcategory_id: 'IELTS-T1-Pie', subcategory_name_vi: 'Biểu đồ Tròn', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài mô tả biểu đồ tròn.', seeds: ieltsT1PieTasks },
            { track_id: 'IELTS', task_type: 'Task 1', subcategory_id: 'IELTS-T1-Table', subcategory_name_vi: 'Bảng biểu', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài mô tả bảng biểu.', seeds: ieltsT1TableTasks },
            { track_id: 'IELTS', task_type: 'Task 1', subcategory_id: 'IELTS-T1-Process', subcategory_name_vi: 'Quy trình', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài mô tả quy trình.', seeds: ieltsT1ProcessTasks },
            { track_id: 'IELTS', task_type: 'Task 1', subcategory_id: 'IELTS-T1-Map', subcategory_name_vi: 'Bản đồ', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài mô tả bản đồ.', seeds: ieltsT1MapTasks },
            { track_id: 'IELTS', task_type: 'Task 1', subcategory_id: 'IELTS-T1-Mix', subcategory_name_vi: 'Biểu đồ Hỗn hợp', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài mô tả biểu đồ hỗn hợp.', seeds: ieltsT1MixTasks },
        ];
        const ieltsT1Content: WritingContentMap = {
            ...ieltsT1LineContent, ...ieltsT1BarContent, ...ieltsT1PieContent,
            ...ieltsT1TableContent, ...ieltsT1ProcessContent, ...ieltsT1MapContent, ...ieltsT1MixContent
        };
        const ieltsT2Subcategories: WritingSubcategory[] = [
            { track_id: 'IELTS', task_type: 'Task 2', subcategory_id: 'IELTS-T2-Opinion', subcategory_name_vi: 'Dạng bài Quan điểm', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài luận bày tỏ quan điểm.', seeds: ieltsT2OpinionTasks },
            { track_id: 'IELTS', task_type: 'Task 2', subcategory_id: 'IELTS-T2-Discussion', subcategory_name_vi: 'Dạng bài Thảo luận', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài luận thảo luận hai quan điểm.', seeds: ieltsT2DiscussionTasks },
            { track_id: 'IELTS', task_type: 'Task 2', subcategory_id: 'IELTS-T2-ProblemSolution', subcategory_name_vi: 'Vấn đề & Giải pháp', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài luận về nguyên nhân và giải pháp.', seeds: ieltsT2ProblemSolutionTasks },
            { track_id: 'IELTS', task_type: 'Task 2', subcategory_id: 'IELTS-T2-AdvDis', subcategory_name_vi: 'Lợi ích & Bất lợi', level: 'B2', test_tags: ["IELTS"], objective_vi: 'Viết bài luận về ưu và nhược điểm.', seeds: ieltsT2AdvDisTasks },
        ];
        const ieltsT2Content: WritingContentMap = {
            ...ieltsT2OpinionContent, ...ieltsT2DiscussionContent,
            ...ieltsT2ProblemSolutionContent, ...ieltsT2AdvDisContent,
        };

        // Merge IELTS Data
        const mergedIeltsT1 = mergeContent(ieltsT1Subcategories, ieltsT1Content);
        const mergedIeltsT2 = mergeContent(ieltsT2Subcategories, ieltsT2Content);
        const ieltsCategory: WritingCategory = {
            category_id: 'IELTS',
            track_name_vi: 'IELTS',
            subcategories: [...mergedIeltsT1, ...mergedIeltsT2],
        };

        // Merge TOEIC Data
        const mergedToeicT1 = mergeContent(toeicT1Subcategories, toeicT1Content);
        const mergedToeicT2 = mergeContent(toeicT2Subcategories, toeicT2Content);
        const mergedToeicT3 = mergeContent(toeicT3Subcategories, toeicT3Content);
        const toeicCategory: WritingCategory = {
            category_id: 'TOEIC',
            track_name_vi: 'TOEIC',
            subcategories: [...mergedToeicT1, ...mergedToeicT2, ...mergedToeicT3],
        };
        
        // NEW: Merge VSTEP Data
        const mergedVstepT1 = mergeContent(vstepT1Subcategories, vstepT1Content);
        const mergedVstepT2 = mergeContent(vstepT2Subcategories, vstepT2Content);
        const vstepCategory: WritingCategory = {
            category_id: 'VSTEP',
            track_name_vi: 'VSTEP',
            subcategories: [...mergedVstepT1, ...mergedVstepT2],
        };
        
        // Combine all data sources
        return [...baseWritingData, vstepCategory, toeicCategory, ieltsCategory];

    }, [baseWritingData,
        // FIX: Update dependency array to use the granular data variables, resolving "Cannot find name" errors.
        ieltsT1LineTasks, ieltsT1LineContent, ieltsT1BarTasks, ieltsT1BarContent, ieltsT1PieTasks, ieltsT1PieContent, ieltsT1TableTasks, ieltsT1TableContent, ieltsT1ProcessTasks, ieltsT1ProcessContent, ieltsT1MapTasks, ieltsT1MapContent,
        ieltsT2OpinionTasks, ieltsT2OpinionContent, ieltsT2DiscussionTasks, ieltsT2DiscussionContent, ieltsT2ProblemSolutionTasks, ieltsT2ProblemSolutionContent, ieltsT2AdvDisTasks, ieltsT2AdvDisContent,
        toeicT1Subcategories, toeicT1Content, toeicT2Subcategories, toeicT2Content, toeicT3Subcategories, toeicT3Content,
        vstepT1Subcategories, vstepT1Content, vstepT2Subcategories, vstepT2Content
    ]);

    // Save state to localStorage on change
    useEffect(() => {
        const stateToSave = {
            selectedTrackId,
            selectedSubcategoryId,
            foundationLevelFilter
        };
        saveWritingPageState(stateToSave);
    }, [selectedTrackId, selectedSubcategoryId, foundationLevelFilter]);


    const allTracks = useMemo(() => {
        const examTracks = writingData.filter(t => !['EASY', 'AI_WRITING_ASSISTANT'].includes(t.category_id));
        return [
            { category_id: 'EASY', track_name_vi: 'PreWrite', subcategories: [] },
            ...examTracks,
            { category_id: 'AI_WRITING_ASSISTANT', track_name_vi: 'Trợ lý Viết AI', subcategories: [] }
        ];
    }, [writingData]);

    const selectedTrack = useMemo(() => allTracks.find(t => t.category_id === selectedTrackId), [allTracks, selectedTrackId]);
    const selectedSubcategory = useMemo(() => {
        const track = writingData.find(t => t.category_id === selectedTrackId);
        return track?.subcategories.find(s => s.subcategory_id === selectedSubcategoryId) || null;
    }, [writingData, selectedTrackId, selectedSubcategoryId]);

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

    const handleItemsUpdate = (newItems: (WritingSeed | FoundationTopic)[]) => {
        if (selectedTrackId === 'EASY') {
            saveData(LOCAL_STORAGE_KEYS.WRITING_FOUNDATION_CONTENT, newItems);
            setRefreshKey(prev => prev + 1);
        } else if (selectedSubcategoryId) {
            const newSeeds = newItems as WritingSeed[];
            const subId = selectedSubcategoryId;
            let storageKey: string | null = null;
            let isGranular = false;

            if (subId.startsWith('IELTS-T1')) {
                const type = subId.split('-')[2];
                storageKey = LOCAL_STORAGE_KEYS[`WRITING_IELTS_T1_${type}_TASKS` as keyof typeof LOCAL_STORAGE_KEYS];
                isGranular = true;
            } else if (subId.startsWith('IELTS-T2')) {
                const type = subId.split('-')[2];
                storageKey = LOCAL_STORAGE_KEYS[`WRITING_IELTS_T2_${type}_TASKS` as keyof typeof LOCAL_STORAGE_KEYS];
                isGranular = true;
            } else if (subId.startsWith('TOEIC-P1')) {
                storageKey = LOCAL_STORAGE_KEYS.TOEIC_WRITING_P1_SUBCATEGORIES;
            } else if (subId.startsWith('TOEIC-P2')) {
                storageKey = LOCAL_STORAGE_KEYS.TOEIC_WRITING_P2_SUBCATEGORIES;
            } else if (subId.startsWith('TOEIC-P3')) {
                storageKey = LOCAL_STORAGE_KEYS.TOEIC_WRITING_P3_SUBCATEGORIES;
            } else if (subId.startsWith('VSTEP-T1')) {
                storageKey = LOCAL_STORAGE_KEYS.VSTEP_WRITING_T1_SUBCATEGORIES;
            } else if (subId.startsWith('VSTEP-T2')) {
                storageKey = LOCAL_STORAGE_KEYS.VSTEP_WRITING_T2_SUBCATEGORIES;
            }

            if (storageKey) {
                if (isGranular) {
                    saveData(storageKey, newSeeds);
                } else {
                    const allSubcategories = loadOrInitializeData<WritingSubcategory[]>(storageKey, []);
                    const subIndex = allSubcategories.findIndex(s => s.subcategory_id === subId);
                    if (subIndex > -1) {
                        const updatedSubcategories = JSON.parse(JSON.stringify(allSubcategories));
                        updatedSubcategories[subIndex].seeds = newSeeds;
                        saveData(storageKey, updatedSubcategories);
                    }
                }
                setRefreshKey(prev => prev + 1);
            }
        }
    };

    const currentPracticeItems = useMemo<PracticeItem[]>(() => {
        if (selectedTrackId === 'EASY') {
            const filteredData = foundationLevelFilter === 'all' 
                ? foundationData 
                : foundationData.filter(topic => topic.level === foundationLevelFilter);
                
            return filteredData.map(topic => ({
                id: topic.id, shortLabel: topic.name_vi,
                longPrompt: (
                    <div>
                        <h4 className="font-bold text-gray-800 text-base leading-tight">{topic.name_vi}</h4>
                        <p className="text-gray-500 text-sm italic mt-1">"{topic.name_en}"</p>
                        <p className="text-sm text-gray-800 mt-2"><b>Câu đúng:</b> {topic.sentence}</p>
                    </div>
                ),
                practiceData: topic.practice, originalSeed: topic
            }));
        }
        if (selectedSubcategory) {
            return selectedSubcategory.seeds.map(seed => ({
                id: seed.code, shortLabel: seed.prompt_vi_short || seed.prompt_vi,
                longPrompt: (
                     <div>
                        {seed.imageSeed && (
                            <div className="mb-4">
                                <GcsImage
                                    imageSeed={seed.imageSeed}
                                    examType={selectedTrackId}
                                    altText={seed.prompt_en}
                                />
                            </div>
                        )}
                        <h4 className="font-bold text-gray-800 text-base leading-tight">{seed.prompt_vi}</h4>
                        <p className="text-gray-500 text-sm italic mt-1">"{seed.prompt_en}"</p>
                    </div>
                ),
                practiceData: (() => {
                    console.log('🔍 Creating PracticeItem for VSTEP:', { code: seed.code, hasPractice: !!seed.practice, practice: seed.practice });
                    if (seed.code === 'VSTEP-T1-THX-01') {
                        console.log('🎯 VSTEP-T1-THX-01 PracticeItem DEBUG:', { 
                            seed, 
                            practice: seed.practice,
                            practiceKeys: seed.practice ? Object.keys(seed.practice) : 'NO PRACTICE'
                        });
                    }
                    return seed.practice;
                })(), originalSeed: seed,
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
            return <TemplateGenerator writingData={writingData} type="writing" />;
        }

        if (currentPracticeItems.length > 0 || (selectedTrack && selectedTrack.subcategories.length > 0) || selectedTrackId === 'EASY') {
            const track = writingData.find(t => t.category_id === selectedTrackId);
            return (
                <UnifiedPracticeView 
                    items={currentPracticeItems} 
                    subcategory={selectedSubcategory}
                    onItemsUpdate={handleItemsUpdate}
                    isFoundation={selectedTrackId === 'EASY'}
                    selectedTrackId={selectedTrackId}
                />
            );
        }

        return <div className="text-center text-gray-500 py-10">Select a category to begin.</div>;
    };

    const levelFilters: { id: 'all' | 'easy' | 'medium' | 'advanced'; label: string }[] = [
        { id: 'all', label: 'Tất cả' },
        { id: 'easy', label: 'Sơ cấp' },
        { id: 'medium', label: 'Trung Cấp' },
        { id: 'advanced', label: 'Cao Cấp' },
    ];
    
    const trackForSubcategories = writingData.find(t => t.category_id === selectedTrackId);

    return (
        <WritingErrorBoundary>
        <div className="apple-theme writing-studio enhanced-writing-studio -m-2 px-2 pt-2 min-h-screen">
            <div className="enhanced-track-selector">
                {allTracks.map((track, index) => {
                    const isActive = selectedTrackId === track.category_id;
                    const trackColors = {
                        'EASY': 'track-btn--foundation',
                        'IELTS': 'track-btn--ielts', 
                        'TOEIC': 'track-btn--toeic',
                        'VSTEP': 'track-btn--vstep',
                        'AI_WRITING_ASSISTANT': 'track-btn--ai'
                    };
                    const colorClass = trackColors[track.category_id as keyof typeof trackColors] || 'track-btn--default';
                    
                    return (
                        <button 
                            key={track.category_id} 
                            onClick={() => setSelectedTrackId(track.category_id)} 
                            className={`track-btn ${colorClass} ${isActive ? 'track-btn--active' : ''}`}
                        >
                            <span className="track-btn-text">{track.track_name_vi}</span>
                    </button>
                    );
                })}
            </div>

            <main>
                {selectedTrackId === 'EASY' && (
                    <div className="flex flex-wrap justify-center gap-2 mb-3">
                        {levelFilters.map(filter => (
                            <button key={filter.id} onClick={() => setFoundationLevelFilter(filter.id)} className={`level-filter-btn ${foundationLevelFilter === filter.id ? 'level-filter-btn--active' : ''}`}>
                                {filter.label}
                            </button>
                        ))}
                    </div>
                )}
                {trackForSubcategories && trackForSubcategories.subcategories.length > 0 && selectedTrackId !== 'AI_WRITING_ASSISTANT' && (
                    <div className="flex flex-wrap justify-center gap-2 mb-3">
                        {trackForSubcategories.subcategories.map(sub => (
                            <button key={sub.subcategory_id} onClick={() => setSelectedSubcategoryId(sub.subcategory_id)} className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-colors ${selectedSubcategoryId === sub.subcategory_id ? 'bg-green-600 text-white border-transparent' : 'bg-white text-green-700 border-green-600 hover:bg-green-50'}`}>
                                {sub.subcategory_name_vi}
                            </button>
                        ))}
                    </div>
                )}
                
                {renderContent()}
            </main>
        </div>
        </WritingErrorBoundary>
    );
};

export default WritingPage;
