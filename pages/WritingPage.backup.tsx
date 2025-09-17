
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Import base data
import { writingPracticeData as defaultWritingData } from '../data/writingPracticeData';
import { foundationContent as defaultFoundationData } from '../data/writing_foundation/content';
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
import { generateNewPracticeItem, generateMorePracticeQuestions, generateWritingTemplate, checkGrammar, suggestImprovements, rewriteText } from '../services/aiService';
import { loadOrInitializeData, saveData } from '../services/dataService';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { 
    AcademicCapIcon, SparklesIcon, MagicWandIcon, BookOpenIcon, ListBulletIcon, EyeIcon, LightBulbIcon, CheckBadgeIcon, XMarkIcon, ChevronDownIcon, CheckIcon, PencilIcon, PhotoIcon, SpeakerWaveIcon
} from '../components/Icons';
import GcsImage from '../components/GcsImage';
import { getWritingPageState, saveWritingPageState } from '../services/userStateService';
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
        <div className="free-write-footer">
            <div ref={checkRef} className="relative">
                <button 
                    onClick={() => setIsCheckMenuOpen(p => !p)} 
                    className="footer-btn !bg-green-600 !text-white !border-green-700 hover:!bg-green-700" 
                    disabled={!userInput.trim()}
                >
                    <CheckBadgeIcon className="w-5 h-5" />
                    <span>Kiểm tra</span>
                    <ChevronDownIcon className="w-4 h-4"/>
                </button>
                {isCheckMenuOpen && (
                     <div className="rewrite-menu">
                        <button onClick={() => { onCheckClick('grammar'); setIsCheckMenuOpen(false); }}>Kiểm tra Ngữ pháp (Inline)</button>
                        <button onClick={() => { onCheckClick('suggestions'); setIsCheckMenuOpen(false); }}>Gợi ý Cải thiện (Modal)</button>
                    </div>
                )}
            </div>
            
            <button onClick={() => onSampleClick('vocab')} className="footer-btn" disabled={!currentItem?.vocabulary || currentItem.vocabulary.length === 0}><AcademicCapIcon className="w-5 h-5"/>Từ vựng mẫu</button>
            <button onClick={() => onSampleClick('outline')} className="footer-btn" disabled={!currentItem?.sample_outline_en}><ListBulletIcon className="w-5 h-5"/>Dàn ý mẫu</button>
            <button onClick={() => onSampleClick('essay')} className="footer-btn" disabled={!currentItem?.sample_answer_en}><BookOpenIcon className="w-5 h-5"/>Bài viết mẫu</button>

            {hasLiveFeedback && (
                <button onClick={onClearFeedback} className="footer-btn !bg-yellow-100 !text-yellow-800 !border-yellow-200 hover:!bg-yellow-200">
                    <XMarkIcon className="w-5 h-5" />
                    Clear Feedback
                </button>
            )}

            <div ref={rewriteRef} className="relative ml-auto">
                 <button 
                    onClick={() => setIsRewriteMenuOpen(p => !p)} 
                    className="footer-btn !bg-purple-600 !text-white !border-purple-700 hover:!bg-purple-700"
                    disabled={!userInput.trim()}
                >
                    <SparklesIcon className="w-5 h-5" />
                    <span>AI Rewrite Options</span>
                    <ChevronDownIcon className="w-4 h-4"/>
                </button>
                {isRewriteMenuOpen && (
                     <div className="rewrite-menu">
                        {rewriteActions.map(action => (
                            <button key={action.id} onClick={() => { onRewriteClick(action.id); setIsRewriteMenuOpen(false); }}>{action.label}</button>
                        ))}
                    </div>
                )}
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
        const parts: (string | JSX.Element)[] = [];
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
        <div className="relative flex-grow w-full">
            {isReviewing ? (
                <div ref={feedbackDisplayRef} className="live-editor">
                    {renderFeedbackContent()}
                </div>
            ) : (
                <textarea
                    ref={editorRef}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="live-editor"
                    placeholder="Viết câu của bạn vào đây..."
                />
            )}
            {activeError && popoverPosition && (
                <div 
                    className="suggestion-popover"
                    style={{ 
                        top: `${popoverPosition.top}px`, 
                        left: `${popoverPosition.left}px`,
                        transform: 'translate(-50%, -100%)'
                    }}
                >
                    <button onClick={() => handleCorrection(activeError)} className="w-full text-left p-2 rounded-md bg-green-100 hover:bg-green-200 font-bold text-green-800">
                       {activeError.correction}
                    </button>
                    <p className="text-sm text-gray-600 mt-2">{activeError.explanation_vi}</p>
                     <button onClick={() => setActiveError(null)} className="absolute top-1 right-1 p-1 rounded-full text-gray-400 hover:bg-gray-100">
                        <XMarkIcon className="w-4 h-4"/>
                    </button>
                </div>
            )}
        </div>
    );
};

// --- NEW Interactive Components ---
interface BilingualWordWithId extends BilingualWord {
    id: number;
}

const ReorderPracticeArea: React.FC<{ practice: { words: BilingualWord[], answer: string } }> = ({ practice }) => {
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

        setFeedback(normalizedUserAnswer === normalizedCorrectAnswer ? 'correct' : 'incorrect');
    };

    return (
        <div className="space-y-4">
            <div className="p-4 border-2 border-dashed rounded-lg min-h-[60px] bg-gray-50 flex flex-wrap gap-2">
                {answer.map((wordObj) => (
                    <button key={wordObj.id} onClick={() => handleWordClick(wordObj, 'answer')} className="bilingual-word-btn bilingual-word-btn--answered">
                        <span className="bilingual-word-en">{wordObj.en}</span>
                        <span className="bilingual-word-vi">{wordObj.vi}</span>
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                 {shuffled.map((wordObj) => (
                    <button key={wordObj.id} onClick={() => handleWordClick(wordObj, 'shuffled')} className="bilingual-word-btn">
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

const FillBlankPracticeArea: React.FC<{ practice: { sentence: BilingualText, missing_word: string, options: string[] } }> = ({ practice }) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        setSelected(null);
        setIsCorrect(null);
    }, [practice]);

    const handleSelect = (option: string) => {
        if (selected) return;
        setSelected(option);
        setIsCorrect(option === practice.missing_word);
    };

    const getButtonClass = (option: string) => {
        if (!selected) return 'bg-white border-gray-300 hover:border-blue-400';
        if (option === practice.missing_word) return 'bg-green-500 border-green-600 text-white';
        if (option === selected && !isCorrect) return 'bg-red-500 border-red-600 text-white';
        return 'bg-gray-100 border-gray-200 text-gray-500';
    };

    const blank = '<span class="font-bold border-b-2 border-dashed p-1">___</span>';

    return (
        <div className="space-y-4">
            <div className="text-center practice-bilingual-sentence">
                <p className="en text-lg" dangerouslySetInnerHTML={{ __html: practice.sentence.en.replace('___', blank) }} />
                <p className="vi">{practice.sentence.vi.replace('___', '___')}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {practice.options.map(option => (
                    <button key={option} onClick={() => handleSelect(option)} disabled={!!selected} className={`p-3 rounded-lg border-2 font-semibold transition-colors ${getButtonClass(option)}`}>{option}</button>
                ))}
            </div>
        </div>
    );
};

const FindErrorPracticeArea: React.FC<{ practice: { sentence: BilingualText, error_word: string, correct_word: string } }> = ({ practice }) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        setSelected(null);
        setIsCorrect(null);
    }, [practice]);
    
    const handleSelect = (word: string) => {
        if (selected) return;
        setSelected(word);
        setIsCorrect(word.replace(/[.,!?;]$/, '') === practice.error_word.replace(/[.,!?;]$/, ''));
    };

    return (
        <div className="space-y-4">
             <div className="text-center practice-bilingual-sentence">
                <div className="en text-lg flex flex-wrap gap-x-2 gap-y-1 justify-center">
                    {practice.sentence.en.split(' ').map((word, i) => (
                        <span 
                            key={i} 
                            onClick={() => handleSelect(word)} 
                            className={`px-2 py-1 rounded-md cursor-pointer transition-colors ${
                                !selected ? 'hover:bg-gray-200' : 
                                word.replace(/[.,!?;]$/, '') === practice.error_word.replace(/[.,!?;]$/, '') ? 'bg-green-500 text-white' : 
                                word === selected ? 'bg-red-500 text-white' : ''
                            }`}
                        >
                            {word}
                        </span>
                    ))}
                </div>
                <p className="vi">{practice.sentence.vi}</p>
            </div>
            {isCorrect === false && <p className="text-center text-red-600">Lỗi sai là "{practice.error_word}", nên sửa thành "{practice.correct_word}".</p>}
        </div>
    );
};

const ChoosePhrasePracticeArea: React.FC<{ practice: { sentence: BilingualText, correct_phrase: string, options: string[] } }> = ({ practice }) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
     
    useEffect(() => {
        setSelected(null);
        setIsCorrect(null);
    }, [practice]);

    const handleSelect = (option: string) => {
        if (selected) return;
        setSelected(option);
        setIsCorrect(option === practice.correct_phrase);
    };

    const getButtonClass = (option: string) => {
        if (!selected) return 'bg-white border-gray-300 hover:border-blue-400';
        if (option === practice.correct_phrase) return 'bg-green-500 border-green-600 text-white';
        if (option === selected && !isCorrect) return 'bg-red-500 border-red-600 text-white';
        return 'bg-gray-100 border-gray-200 text-gray-500';
    };

    const blank = '<span class="font-bold border-b-2 border-dashed p-1">_____</span>';

    return (
        <div className="space-y-4">
            <div className="text-center practice-bilingual-sentence">
                <p className="en text-lg" dangerouslySetInnerHTML={{ __html: practice.sentence.en.replace('_____', blank) }} />
                <p className="vi">{practice.sentence.vi.replace('_____', '_____')}</p>
            </div>
            <div className="flex flex-col gap-3">
                {practice.options.map(option => (
                    <button key={option} onClick={() => handleSelect(option)} disabled={!!selected} className={`p-3 rounded-lg border-2 font-semibold transition-colors w-full text-left ${getButtonClass(option)}`}>{option}</button>
                ))}
            </div>
        </div>
    );
};

const MatchingPracticeArea: React.FC<{ practice: { col_a: BilingualWord[], col_b: BilingualWord[], correct_pairs: {key: string; value: string}[] } }> = ({ practice }) => {
    const [colA, setColA] = useState<BilingualWord[]>([]);
    const [colB, setColB] = useState<BilingualWord[]>([]);
    const [selectedA, setSelectedA] = useState<string | null>(null);
    const [selectedB, setSelectedB] = useState<string | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<[BilingualWord, BilingualWord][]>([]);
    const [feedback, setFeedback] = useState<string | null>(null);

    useEffect(() => {
        setColA([...practice.col_a].sort(() => Math.random() - 0.5));
        setColB([...practice.col_b].sort(() => Math.random() - 0.5));
        setSelectedA(null); setSelectedB(null); setMatchedPairs([]); setFeedback(null);
    }, [practice]);

    useEffect(() => {
        if (selectedA && selectedB) {
            const pairA = practice.col_a.find(item => item.en === selectedA);
            const pairB = practice.col_b.find(item => item.en === selectedB);
            if (pairA && pairB) {
                setMatchedPairs(prev => [...prev, [pairA, pairB]]);
                setColA(prev => prev.filter(item => item.en !== selectedA));
                setColB(prev => prev.filter(item => item.en !== selectedB));
            }
            setSelectedA(null);
            setSelectedB(null);
        }
    }, [selectedA, selectedB, practice.col_a, practice.col_b]);
    
    const checkAnswer = () => {
        let correctCount = 0;
        matchedPairs.forEach(([a, b]) => {
            if (practice.correct_pairs.some(p => (p.key === a.en && p.value === b.en) || (p.key === b.en && p.value === a.en))) {
                correctCount++;
            }
        });
        if (correctCount === practice.correct_pairs.length) {
            setFeedback('Chính xác!');
        } else {
            setFeedback(`Bạn đã đúng ${correctCount}/${practice.correct_pairs.length}.`);
        }
    };

    const BilingualButton: React.FC<{ item: BilingualWord, onClick: () => void, isSelected: boolean }> = ({ item, onClick, isSelected }) => (
        <button onClick={onClick} className={`bilingual-word-btn w-full !items-start !text-left !p-3 ${isSelected ? '!bg-blue-500 !text-white !border-blue-600' : ''}`}>
            <span className="bilingual-word-en">{item.en}</span>
            <span className="bilingual-word-vi">{item.vi}</span>
        </button>
    );

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    {colA.map(item => <BilingualButton key={item.en} item={item} onClick={() => setSelectedA(item.en)} isSelected={selectedA === item.en} />)}
                </div>
                <div className="space-y-2">
                    {colB.map(item => <BilingualButton key={item.en} item={item} onClick={() => setSelectedB(item.en)} isSelected={selectedB === item.en} />)}
                </div>
            </div>
            <div className="space-y-2">
                {matchedPairs.map(([a, b], i) => 
                    <div key={i} className="p-2 bg-gray-100 rounded-md text-center">
                        <span className="font-semibold">{a.en}</span> ({a.vi}) ↔ <span className="font-semibold">{b.en}</span> ({b.vi})
                    </div>
                )}
            </div>
            {colA.length === 0 && !feedback && <button onClick={checkAnswer} className="btn btn-writing w-full">Kiểm tra</button>}
            {feedback && <div className="p-3 text-center bg-green-100 text-green-800 rounded-lg font-semibold">{feedback}</div>}
        </div>
    );
};


const DragDropPracticeArea: React.FC<{ practice: { sentence_parts: BilingualWord[]; correct_order: string[] } }> = ({ practice }) => {
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
        setFeedback(JSON.stringify(droppedOrder) === JSON.stringify(practice.correct_order) ? 'correct' : 'incorrect');
    };

    const BilingualDraggable: React.FC<{ item: DraggablePart, onDragStart: () => void, className?: string }> = ({ item, onDragStart, className }) => (
        <div draggable onDragStart={onDragStart} className={`bilingual-word-btn cursor-grab active:cursor-grabbing ${className}`}>
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
    const navigate = useNavigate();
    const [currentItem, setCurrentItem] = useState<PracticeItem | null>(null);
    const [practiceMode, setPracticeMode] = useState<PracticeMode>('reorder');
    const [isGeneratingItem, setIsGeneratingItem] = useState(false);
    const [generatingMode, setGeneratingMode] = useState<PracticeMode | null>(null);
    const [aiError, setAIError] = useState('');
    const practiceContainerRef = useRef<HTMLDivElement>(null);
    
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
        setLiveFeedback(null);
    }, [items, currentItem?.id]);

    useEffect(() => {
        if (currentItem) {
            const updatedItem = items.find(item => item.id === currentItem.id);
            if (updatedItem && JSON.stringify(updatedItem) !== JSON.stringify(currentItem)) {
                setCurrentItem(updatedItem);
            }
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
        const promise = generateNewPracticeItem(
            subcategory, 
            items.map(item => 'prompt_en' in item.originalSeed ? item.originalSeed.prompt_en : item.originalSeed.name_en), 
            options
        );
        
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
        if (!currentItem || mode === 'free_write' || !handleBananaCheck()) return;
        
        setGeneratingMode(mode);
        setAIError('');
        const promise = generateMorePracticeQuestions(currentItem.originalSeed, mode);

        handleAITransaction(promise);

        try {
            const newQuestions = await promise;
            const currentSeeds = items.map(i => i.originalSeed);
            
            const updatedSeeds = currentSeeds.map(seed => {
                const seedId = 'code' in seed ? seed.code : seed.id;
                if (seedId !== currentItem.id) return seed;
                
                const updatedSeed = JSON.parse(JSON.stringify(seed));
                if (!updatedSeed.practice) updatedSeed.practice = {};
                
                const currentQuestions = updatedSeed.practice[mode] || [];
                updatedSeed.practice[mode] = [...currentQuestions, ...newQuestions];
                
                return updatedSeed;
            });

            onItemsUpdate(updatedSeeds);
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
        if (!currentItem?.practiceData) return false;
        const practiceForMode = currentItem.practiceData[mode as keyof FoundationPracticeData];
        return Array.isArray(practiceForMode) && practiceForMode.length > 0;
    };
    
    const renderPracticeArea = () => {
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

        const questionsForMode = currentItem.practiceData?.[practiceMode as keyof FoundationPracticeData];
        if (!Array.isArray(questionsForMode) || questionsForMode.length === 0) {
            return <div className="p-4 bg-gray-100 rounded-lg text-center">Chưa có bài tập cho chế độ này. Hãy dùng AI để tạo!</div>;
        }
        
        const PracticeComponent = {
            reorder: ReorderPracticeArea,
            fill_blank: FillBlankPracticeArea,
            find_error: FindErrorPracticeArea,
            choose_phrase: ChoosePhrasePracticeArea,
            matching: MatchingPracticeArea,
            drag_drop: DragDropPracticeArea,
        }[practiceMode];

        return (
            <div className="space-y-6 practice-item-list">
                {questionsForMode.map((practice, index) => {
                    const key = `${currentItem.id}-${practiceMode}-${index}`;
                    return (
                        <div key={key} className="practice-item ml-4">
                            {PracticeComponent && <PracticeComponent practice={practice as any} />}
                        </div>
                    )
                })}
            </div>
        );
    };

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
            {!isFoundation && (
                 <div className="flex justify-end items-center mb-4 gap-2">
                    <button 
                        onClick={() => handleGenerateItem({ withImage: false })} 
                        disabled={isGeneratingItem} 
                        className="btn btn-ai-pink flex-shrink-0"
                        title="AI Tạo đề bài mới (chỉ văn bản)"
                    >
                        {isGeneratingItem ? <div className="ai-spinner !w-5 !h-5 mr-2"></div> : <PencilIcon className="w-5 h-5 mr-2"/>}
                        AI Gen Text
                    </button>
                    
                    <button 
                        onClick={() => handleGenerateItem({ withImage: true })} 
                        disabled={isGeneratingItem} 
                        className="btn btn-ai-green flex-shrink-0"
                        title="AI Tạo đề bài mới với hình ảnh"
                    >
                        {isGeneratingItem ? <div className="ai-spinner !w-5 !h-5 mr-2"></div> : <PhotoIcon className="w-5 h-5 mr-2"/>}
                        AI Gen Image
                    </button>
            
                    <button 
                        onClick={() => alert('AI Audio Generation feature is under development.')} 
                        className="btn btn-ai-blue flex-shrink-0 opacity-50 cursor-not-allowed"
                        title="AI Tạo âm thanh cho bài học (đang phát triển)"
                    >
                        <SpeakerWaveIcon className="w-5 h-5 mr-2"/>
                        AI Gen Audio
                    </button>
                </div>
            )}
            

            {aiError && <p className="text-red-500 text-center mb-4">{aiError}</p>}
            <div className="practice-studio-grid" ref={practiceContainerRef}>
                <div className="practice-list-panel flex flex-col">
                    <h3 className="font-bold text-lg text-center mb-2 border-b pb-2 flex-shrink-0">Tình huống / Cấu trúc</h3>
                    <div className="flex-grow overflow-y-auto pr-2 -mr-2 max-h-[65vh] space-y-1">
                        {isFoundation && groupedFoundationItems ? (
                            Object.entries(groupedFoundationItems).map(([category, categoryItems]) => (
                                <div key={category}>
                                    <h4 className="font-bold text-gray-500 mt-4 mb-1 px-1">{category}</h4>
                                    {categoryItems.map((item, idx) => (
                                        <button key={item.id} onClick={() => setCurrentItem(item)} className={`sentence-list-item ${currentItem?.id === item.id ? 'sentence-list-item--active' : 'hover:bg-gray-50'}`}>
                                            <span className="truncate">{idx + 1}. {item.shortLabel}</span>
                                        </button>
                                    ))}
                                </div>
                            ))
                        ) : (
                            items.map((item, idx) => (
                                <button key={item.id} onClick={() => setCurrentItem(item)} className={`sentence-list-item ${currentItem?.id === item.id ? 'sentence-list-item--active' : 'hover:bg-gray-50'}`}>
                                    <span className="truncate">{idx + 1}. {item.shortLabel}</span>
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
                                {currentItem.longPrompt}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                {modes.map(mode => (
                                    <div key={mode.id} className="mode-selector-container">
                                        <button onClick={() => setPracticeMode(mode.id)} className={`mode-selector-btn ${practiceMode === mode.id ? 'mode-selector-btn--active' : ''}`} disabled={!isModeAvailable(mode.id) && mode.id !== 'free_write'}>
                                            {mode.label}
                                        </button>
                                        {mode.id !== 'free_write' && (
                                            <button onClick={() => handleGenerateMoreExercises(mode.id)} disabled={generatingMode === mode.id} className="btn-ai-generate-exercise" title={`AI tạo thêm bài tập ${mode.label}`}>
                                                {generatingMode === mode.id ? <div className="ai-spinner !w-4 !h-4"></div> : <MagicWandIcon className="w-4 h-4"/>}
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex-grow flex flex-col">{renderPracticeArea()}</div>
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
    const baseWritingData = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_DATA, defaultWritingData), [refreshKey]);
    const foundationData = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.WRITING_FOUNDATION_CONTENT, defaultFoundationData), [refreshKey]);

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
                seeds: (sub.seeds || []).map(seed => ({
                    ...seed,
                    ...(contentMap[seed.code] || {})
                }))
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
        ];
        const ieltsT1Content: WritingContentMap = {
            ...ieltsT1LineContent, ...ieltsT1BarContent, ...ieltsT1PieContent,
            ...ieltsT1TableContent, ...ieltsT1ProcessContent, ...ieltsT1MapContent,
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
            track_name_vi: 'Luyện thi IELTS',
            subcategories: [...mergedIeltsT1, ...mergedIeltsT2],
        };

        // Merge TOEIC Data
        const mergedToeicT1 = mergeContent(toeicT1Subcategories, toeicT1Content);
        const mergedToeicT2 = mergeContent(toeicT2Subcategories, toeicT2Content);
        const mergedToeicT3 = mergeContent(toeicT3Subcategories, toeicT3Content);
        const toeicCategory: WritingCategory = {
            category_id: 'TOEIC',
            track_name_vi: 'Luyện thi TOEIC',
            subcategories: [...mergedToeicT1, ...mergedToeicT2, ...mergedToeicT3],
        };
        
        // NEW: Merge VSTEP Data
        const mergedVstepT1 = mergeContent(vstepT1Subcategories, vstepT1Content);
        const mergedVstepT2 = mergeContent(vstepT2Subcategories, vstepT2Content);
        const vstepCategory: WritingCategory = {
            category_id: 'VSTEP',
            track_name_vi: 'Luyện thi VSTEP',
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
            { category_id: 'EASY', track_name_vi: 'Kỹ năng Nền tảng', subcategories: [] },
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
                practiceData: seed.practice, originalSeed: seed,
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
        { id: 'easy', label: 'Căn bản' },
        { id: 'medium', label: 'Trung bình' },
        { id: 'advanced', label: 'Nâng cao' },
    ];
    
    const trackForSubcategories = writingData.find(t => t.category_id === selectedTrackId);

    return (
        <div className="writing-studio bg-gray-50/50 -m-2 px-2 pt-2 min-h-screen">
            <div className="flex flex-wrap justify-center mb-3 p-1 bg-gray-200/70 rounded-full gap-0.5">
                {allTracks.map(track => (
                    <button key={track.category_id} onClick={() => setSelectedTrackId(track.category_id)} className={`px-4 py-2 text-base font-semibold rounded-full transition-all duration-200 ease-in-out focus:outline-none ${selectedTrackId === track.category_id ? 'bg-white text-green-700 shadow-md' : 'text-gray-600 hover:text-gray-900'}`}>
                        {track.track_name_vi}
                    </button>
                ))}
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
    );
};

export default WritingPage;
