import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GrandBananaRewardModal from '../components/GrandBananaRewardModal';
import { useAuth } from '../App';
import { addBananasForUser, rewardBananaForTest } from '../services/userService';
import { 
    toeicPart5Test1_2025_Questions, 
    toeicPart5Test1_2025_GrammarPoints, 
    toeicPart5Test1_2025_Vocabulary,
    Question,
    GrammarPoint,
    VocabularyItem,
    Option
} from '../data/toeic-part5-test1-2025-data';

interface QuestionState {
    id: number;
    answered: boolean;
    isCorrect: boolean;
    selectedOption: number;
}

const questions = toeicPart5Test1_2025_Questions;
const grammarPoints = toeicPart5Test1_2025_GrammarPoints;
const vocabularyItems = toeicPart5Test1_2025_Vocabulary;

const TOEICPart5Test1_2025: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [questionsState, setQuestionsState] = useState<QuestionState[]>([]);
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
    const [gameOver, setGameOver] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [timerEnabled, setTimerEnabled] = useState(true);
    const [showBananaReward, setShowBananaReward] = useState(false);
    const [bananaReward, setBananaReward] = useState<{ courseId: string; lessonId: string; earned: boolean; earnedAt: string; score: number; totalQuestions: number; percentage: number } | null>(null);
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const animationFrameRef = useRef<number | null>(null);
    const startValueRef = useRef(0);
    const [highlightAnswer, setHighlightAnswer] = useState(false);
    const questionRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { currentUser, updateUser } = useAuth();

    const currentQuestion = questions[currentQuestionIndex];
    const currentGrammarIds = currentQuestion?.grammarIds || [];
    const currentVocabularyIds = currentQuestion?.vocabularyIds || [];

    const currentGrammarPoints = grammarPoints.filter(gp => currentGrammarIds.includes(gp.id));
    const currentVocabularyItems = vocabularyItems.filter(vi => currentVocabularyIds.includes(vi.id));

    const loadQuestion = useCallback(() => {
        if (currentQuestionIndex < questions.length && currentQuestion) {
            const questionState = questionsState.find(q => q.id === currentQuestion.id);
            if (!questionState) {
                setQuestionsState(prev => [...prev, {
                    id: currentQuestion.id,
                    answered: false,
                    isCorrect: false,
                    selectedOption: -1
                }]);
            }
        }
    }, [currentQuestionIndex, currentQuestion, questionsState]);

    useEffect(() => {
        loadQuestion();
        setHighlightAnswer(false);
    }, [loadQuestion, currentQuestionIndex]);

    useEffect(() => {
        if (!timerEnabled) return;
        
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameOver(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timerEnabled]);

    const handleTimeOut = useCallback(() => {
        setGameOver(true);
    }, []);

    const checkAnswer = useCallback((selectedOption: number) => {
        if (!currentQuestion) return;
        
        const correct = currentQuestion.options[selectedOption].correct;
        setIsCorrect(correct);
        
        if (correct) {
            setScore(prev => prev + 1);
            setFeedbackMessage('🎉 Chính xác! Tuyệt vời!');
            // Auto highlight answer in question if correct
            setHighlightAnswer(true);
            setTimeout(() => {
                if (questionRef.current) {
                    const answerElement = questionRef.current.querySelector('.highlighted-answer');
                    if (answerElement) {
                        answerElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // Add bounce animation
                        answerElement.classList.add('animate-bounce');
                        setTimeout(() => {
                            answerElement.classList.remove('animate-bounce');
                        }, 2000);
                    }
                }
            }, 100);
        } else {
            setFeedbackMessage('❌ Sai rồi! Hãy xem giải thích bên dưới.');
        }

        setQuestionsState(prev => prev.map(q => 
            q.id === currentQuestion.id 
                ? { ...q, answered: true, isCorrect: correct, selectedOption }
                : q
        ));

        setShowFeedback(true);
    }, [currentQuestion]);

    const showFeedbackModal = useCallback(() => {
        setShowFeedback(true);
    }, []);

    const handleComplete = useCallback(async () => {
        setGameOver(true);
        const percentage = Math.round((score / questions.length) * 100);
        // ✅ SIMPLIFIED: Only reward banana if >= 80%, no score tracking
        if (percentage >= 80 && currentUser) {
            try {
                const updatedUser = await rewardBananaForTest(
                    currentUser.id,
                    score,
                    questions.length,
                    currentUser
                );
                if (updatedUser) {
          updateUser(updatedUser);
        }
                setBananaReward({ courseId: 'toeic', lessonId: 'test-1-2025', earned: true, earnedAt: new Date().toISOString(), score, totalQuestions: questions.length, percentage });
                setShowBananaReward(true);
            } catch (error) {
                console.error('Failed to add banana to user balance:', error);
            }
        }
    }, [score, currentUser, updateUser, questions.length]);

    const goToPreviousQuestion = useCallback(() => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            setShowFeedback(false);
            setHighlightAnswer(false);
        }
    }, [currentQuestionIndex]);
    
    const goToNextQuestion = useCallback(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setShowFeedback(false);
            setHighlightAnswer(false);
        } else {
            handleComplete();
        }
    }, [currentQuestionIndex, questions.length, handleComplete]);
    
    // Highlight question text with answer
    const highlightQuestion = useCallback((text: string) => {
        if (!currentQuestion) {
            return text.replace(/_{10,}/g, '<span class="text-blue-600 font-semibold">__________</span>');
        }
        
        const questionState = questionsState.find(q => q.id === currentQuestion.id);
        if (!questionState?.answered) {
            // Show blank if not answered
            return text.replace(/_{10,}/g, '<span class="text-blue-600 font-semibold">__________</span>');
        }
        
        const selectedOption = currentQuestion.options[questionState.selectedOption];
        const correctOption = currentQuestion.options.find(opt => opt.correct);
        
        if (!selectedOption || !correctOption) {
            return text.replace(/_{10,}/g, '<span class="text-blue-600 font-semibold">__________</span>');
        }
        
        // Replace blank with highlighted answer
        // LOGIC MÀU CHUẨN: Luôn hiển thị đáp án ĐÚNG với màu XANH LÁ để tránh nhầm lẫn
        // - Xanh lá = Đáp án đúng (dù chọn đúng hay sai)
        // - Màu đỏ chỉ dùng cho option buttons khi chọn sai
        const blankPattern = /_{10,}/g;
        const isCorrect = selectedOption.correct;
        const answerText = correctOption.text; // Luôn hiển thị đáp án đúng
        
        // Luôn dùng màu xanh lá cho đáp án đúng trong câu hỏi
        const colorClass = 'bg-green-600 border-4 border-green-800 text-white ring-4 ring-green-400 shadow-2xl';
        const glowStyle = 'box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.4), 0 4px 12px rgba(0,0,0,0.3);';
        
        return text.replace(blankPattern, (match) => {
            return `<span class="highlighted-answer ${colorClass} font-extrabold px-4 py-2 rounded-xl inline-block" style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif; font-size: 1.1em; font-weight: 900; text-shadow: 0 2px 4px rgba(0,0,0,0.6); ${glowStyle} margin: 2px 4px; vertical-align: baseline;">${answerText}</span>`;
        });
    }, [currentQuestion, questionsState]);

    // Calculate current percentage based on answered questions
    const currentPercentage = Math.round((score / questions.length) * 100);
    
    // Animate percentage smoothly
    useEffect(() => {
        const duration = 800; // Animation duration in ms
        const endValue = currentPercentage;
        
        // Cancel previous animation if exists
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        
        startValueRef.current = animatedPercentage;
        const startValue = startValueRef.current;
        const difference = endValue - startValue;
        
        if (difference === 0) return;
        
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing function for smooth animation
            const easeOutQuad = 1 - (1 - progress) * (1 - progress);
            const currentValue = Math.round(startValue + difference * easeOutQuad);
            
            setAnimatedPercentage(currentValue);
            
            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                setAnimatedPercentage(endValue);
                animationFrameRef.current = null;
            }
        };
        
        animationFrameRef.current = requestAnimationFrame(animate);
        
        // Cleanup function
        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        };
    }, [currentPercentage, animatedPercentage]);


    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const renderGrammarColumn = () => (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-3 md:p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm md:text-base font-bold text-gray-800">📚 Grammar Points</h3>
                <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded-full">
                    {currentGrammarPoints.length} points
                </span>
            </div>
            
            <div className="space-y-2 max-h-32 md:max-h-60 overflow-y-auto">
                {currentGrammarPoints.map((grammar, index) => (
                    <div key={grammar.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-2 md:p-3 border border-blue-200/50">
                        <div className="flex items-start justify-between mb-1">
                            <span className="text-xs font-mono text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">
                                {grammar.id}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                                grammar.frequency === 'high' ? 'bg-green-100 text-green-700' :
                                grammar.frequency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                            }`}>
                                {grammar.frequency}
                            </span>
                        </div>
                        <h4 className="text-xs md:text-sm font-semibold text-gray-800 mb-1">
                            {grammar.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">{grammar.rule}</p>
                        <div className="bg-white/60 rounded-lg p-2">
                            <p className="text-xs text-gray-700 mb-1">
                                <span className="font-medium">EN:</span> {grammar.example.english}
                            </p>
                            <p className="text-xs text-gray-600">
                                <span className="font-medium">VI:</span> {grammar.example.vietnamese}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderVocabularyColumn = () => (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-3 md:p-4">
            
            
            <div className="space-y-2 max-h-32 md:max-h-60 overflow-y-auto">
                {currentVocabularyItems.map((vocab, index) => (
                    <div key={vocab.id} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-2 md:p-3 border border-green-200/50">
                        <div className="flex items-start justify-between mb-1">
                            <span className="text-xs font-mono text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                                {vocab.id}
                            </span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                {vocab.partOfSpeech}
                            </span>
                        </div>
                        <h4 className="text-xs md:text-sm font-bold text-gray-800 mb-1">
                            {vocab.word}
                        </h4>
                        <p className="text-xs text-gray-500 font-mono mb-1" style={{ color: '#6B7280' }}>
                            {vocab.ipa}
                        </p>
                        <p className="text-xs text-gray-700 mb-2">{vocab.vietnamese}</p>
                        <div className="flex flex-wrap gap-1">
                            {vocab.synonyms.slice(0, 2).map((synonym, idx) => (
                                <span key={idx} className="text-xs bg-white/60 text-gray-600 px-1.5 py-0.5 rounded">
                                    {synonym}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            {gameOver ? (
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 -m-8 p-8 min-h-screen flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 max-w-md w-full mx-4">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🎯</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Test Hoàn Thành!</h2>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
                                <div className="text-3xl font-bold text-blue-600 mb-2">{score}/{questions.length}</div>
                                <div className="text-gray-600">Điểm số của bạn</div>
                                <div className={`text-lg font-bold mt-3 ${
                                    Math.round((score / questions.length) * 100) >= 80 
                                        ? 'text-green-600' 
                                        : 'text-orange-600'
                                }`}>
                                    Tỷ lệ: {Math.round((score / questions.length) * 100)}%
                                </div>
                                {Math.round((score / questions.length) * 100) >= 80 ? (
                                    <div className="mt-4 p-3 bg-green-100 border-2 border-green-400 rounded-xl">
                                        <div className="flex items-center gap-2 text-green-700 font-semibold">
                                            <span className="text-xl">🎉</span>
                                            <span>Chúc mừng! Bạn đã đạt &gt;= 80% và nhận được 1 chuối!</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-4 p-3 bg-orange-100 border-2 border-orange-400 rounded-xl">
                                        <div className="flex items-center gap-2 text-orange-700 font-semibold">
                                            <span className="text-xl">💪</span>
                                            <span>Bạn cần đạt &gt;= 80% để nhận thưởng 1 chuối. Hãy làm lại nhé!</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-3">
                                <button
                                    onClick={() => {
                                        setCurrentQuestionIndex(0);
                                        setScore(0);
                                        setQuestionsState([]);
                                        setTimeLeft(1800);
                                        setGameOver(false);
                                        setShowFeedback(false);
                                        setTimerEnabled(true);
                                    }}
                                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    🔄 Làm Lại Test
                                </button>
                                <button
                                    onClick={() => navigate('/toeic-part5-by-year')}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    📚 Quay Lại Danh Sách Luyện Tập
                                </button>
                                <button
                                    onClick={() => navigate('/toeic-part5-by-year')}
                                    className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    🏠 Về Trang Chủ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 -m-8 p-8 min-h-screen">
                    <div className="max-w-none mx-auto">
                        {/* Banana Reward Progress Bar */}
                <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50 rounded-xl shadow-lg border border-yellow-300/50 p-2 mb-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1.5">
                        <div className="flex-1">
                            <div className="flex items-center gap-1 mb-1">
                                <span className="text-base">🍌</span>
                                <span className="text-xs font-semibold text-gray-700">
                                    Phần thưởng Chuối
                                </span>
                                {bananaReward?.earned && (
                                    <span className="inline-flex items-center px-1 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-300">
                                        ✅ Đã nhận thưởng
                                    </span>
                                )}
                                {!bananaReward?.earned && animatedPercentage >= 80 && (
                                    <span className="inline-flex items-center px-1 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-300">
                                        🎁 Chưa nhận thưởng
                                    </span>
                                )}
                                <div className="flex items-center gap-0.5 ml-auto">
                                    <span className="text-yellow-600 font-semibold">💡</span>
                                    <span className="text-[10px] text-gray-600">Làm đúng &gt;= 80% → Nhận 1 chuối!</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                                {/* Hiển thị phần trăm thời gian thực */}
                                <div className="text-xs font-bold text-gray-700 min-w-[40px] text-right">
                                    <span className="text-orange-600">{animatedPercentage}%</span>
                                </div>
                                <div className="flex-1 relative py-2">
                                    {/* Progress bar */}
                                    <div className="bg-gray-200 rounded-full h-1.5 shadow-inner relative overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full transition-all duration-500 ease-out ${
                                                animatedPercentage >= 80 
                                                    ? 'bg-gradient-to-r from-orange-400 via-red-500 via-orange-600 to-red-600' 
                                                    : animatedPercentage >= 60
                                                    ? 'bg-gradient-to-r from-orange-400 via-red-500 to-red-600'
                                                    : 'bg-gradient-to-r from-orange-300 via-orange-500 to-red-500'
                                            }`}
                                            style={{ width: `${Math.min(animatedPercentage, 100)}%` }}
                                        />
                                    </div>
                                    {/* Nút chỉ thị % di chuyển theo thanh tiến độ */}
                                    <div 
                                        className="absolute top-0 transition-all duration-500 ease-out flex items-start justify-center"
                                        style={{ 
                                            left: `calc(${Math.min(Math.max(animatedPercentage, 0), 100)}% - 16px)`,
                                            willChange: 'left'
                                        }}
                                    >
                                        <div className="relative -translate-y-1">
                                            {/* Nút tròn với phần trăm */}
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 transition-all duration-500 ${
                                                animatedPercentage >= 80
                                                    ? 'bg-gradient-to-br from-orange-400 to-red-500 border-white'
                                                    : animatedPercentage >= 60
                                                    ? 'bg-gradient-to-br from-orange-300 to-red-400 border-white'
                                                    : 'bg-gradient-to-br from-orange-200 to-orange-400 border-white'
                                            }`}>
                                                <span className="text-[9px] font-bold text-white drop-shadow-md">
                                                    {animatedPercentage}%
                                                </span>
                                            </div>
                                            {/* Đuôi chỉ thị trỏ xuống progress bar */}
                                            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent transition-all duration-500 ${
                                                animatedPercentage >= 80
                                                    ? 'border-t-orange-500'
                                                    : animatedPercentage >= 60
                                                    ? 'border-t-orange-400'
                                                    : 'border-t-orange-300'
                                            }`}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs font-semibold text-gray-700 min-w-[100px] text-right">
                                    {animatedPercentage >= 80 ? (
                                        <span className="text-green-600">🎉 Đạt yêu cầu!</span>
                                    ) : (
                                        <span className="text-gray-600">
                                            Cần {80 - animatedPercentage}% nữa
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                        {/* Header */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-4 mb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                                TOEIC Part 5 - Test 1 (2025)
                            </h1>
                            <p className="text-sm text-gray-600">
                                Câu {currentQuestionIndex + 1} / {questions.length}
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/toeic-part5-by-year')}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                            >
                                📚 Danh Sách Luyện Tập
                            </button>
                            
                            <div className="text-right">
                                <div className="text-sm font-semibold text-gray-700">Điểm: {score}</div>
                                <div className="text-xs text-gray-500">Đã trả lời: {questionsState.filter(q => q.answered).length}</div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <div className="text-sm font-semibold text-gray-700">
                                    {formatTime(timeLeft)}
                                </div>
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-1000"
                                        style={{ width: `${(timeLeft / 1800) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Three Column Layout (1-2-1) */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                    {/* Grammar Column (1/4) */}
                    <div className="lg:col-span-1">
                        {renderGrammarColumn()}
                    </div>
                    
                    {/* Main Content Column (2/4) */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-4 md:p-6">
                            {currentQuestion && (
                                <>
                                    {/* Question Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                                {currentQuestion.id}
                                            </div>
                                            <div className="text-xs text-gray-500 font-mono">
                                                ID: P{currentQuestion.id.toString().padStart(6, '0')}
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {currentQuestion.rule}
                                        </div>
                                    </div>

                                    {/* Question Text */}
                                    <div className="mb-6" ref={questionRef}>
                                        <p 
                                            className="text-sm md:text-base text-gray-800 mb-3 leading-relaxed"
                                            dangerouslySetInnerHTML={{ 
                                                __html: currentQuestion ? highlightQuestion(currentQuestion.question_en) : ''
                                            }}
                                        />
                                        <p className="text-sm text-gray-600 italic">
                                            {currentQuestion?.question_vi}
                                        </p>
                                    </div>

                                    {/* Options */}
                                    <div className="space-y-2 mb-6">
                                        {currentQuestion.options.map((option, index) => {
                                            const questionState = questionsState.find(q => q.id === currentQuestion.id);
                                            const isSelected = questionState?.selectedOption === index;
                                            const isCorrectOption = option.correct;
                                            const showResult = questionState?.answered;

                                            let optionClass = "w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ";
                            
                                            if (showResult) {
                                                if (isCorrectOption) {
                                                    optionClass += "bg-green-50 border-green-300 text-green-800";
                                                } else if (isSelected && !isCorrectOption) {
                                                    optionClass += "bg-red-50 border-red-300 text-red-800";
                                                } else {
                                                    optionClass += "bg-gray-50 border-gray-200 text-gray-600";
                                                }
                                            } else {
                                                if (isSelected) {
                                                    optionClass += "bg-blue-50 border-blue-300 text-blue-800";
                                                } else {
                                                    optionClass += "bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50";
                                                }
                                            }

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => checkAnswer(index)}
                                                    className={optionClass}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                                                                showResult 
                                                                    ? isCorrectOption 
                                                                        ? "bg-green-500 border-green-500 text-white" 
                                                                        : isSelected 
                                                                            ? "bg-red-500 border-red-500 text-white"
                                                                            : "bg-gray-200 border-gray-300 text-gray-500"
                                                                    : isSelected 
                                                                        ? "bg-blue-500 border-blue-500 text-white" 
                                                                        : "bg-white border-gray-300 text-gray-500"
                                                            }`}>
                                                                {String.fromCharCode(65 + index)}
                                                            </div>
                                                            <span className="text-sm md:text-base">{option.text}</span>
                                                        </div>
                                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                            {option.type}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Explanation */}
                                    {questionsState.find(q => q.id === currentQuestion.id)?.answered && (
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200/50">
                                            <h4 className="font-semibold text-blue-800 mb-2">💡 Giải thích:</h4>
                                            <p className="text-sm text-blue-700">{currentQuestion.explanation}</p>
                                        </div>
                                    )}
                                    {/* Navigation */}
                                    <div className="flex justify-between items-center mt-6">
                                        <button
                                            onClick={goToPreviousQuestion}
                                            disabled={currentQuestionIndex === 0}
                                            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            ← Trước
                                        </button>
                                        
                                        <button
                                            onClick={goToNextQuestion}
                                            disabled={currentQuestionIndex === questions.length - 1}
                                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            Sau →
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    
                    {/* Vocabulary Column (1/4) */}
                    <div className="lg:col-span-1">
                        {renderVocabularyColumn()}
                    </div>
                </div>
                    </div>
                    
                    <GrandBananaRewardModal isOpen={showBananaReward} onClose={() => { setShowBananaReward(false); setBananaReward(null); }} reward={bananaReward} />

                    {/* Feedback Modal */}
                    {showFeedback && currentQuestion && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className={`rounded-xl shadow-2xl max-w-lg w-full p-5 max-h-[90vh] overflow-y-auto ${
                        isCorrect ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-400' : 'bg-gradient-to-br from-red-50 to-pink-50 border-4 border-red-400'
                    }`}>
                        <div className="text-center">
                            {/* Icon & Title */}
                            <div className="text-4xl mb-3 animate-bounce">
                                {isCorrect ? '🎉' : '❌'}
                            </div>
                            <h3 className={`text-xl font-black mb-3 ${
                                isCorrect ? 'text-green-700' : 'text-red-700'
                            }`}>
                                {isCorrect ? '✅ ĐÚNG RỒI!' : '❌ SAI RỒI!'}
                            </h3>
                            
                            {/* Rule/Formula - Siêu nổi bật */}
                            <div className="bg-white rounded-xl p-3 mb-3 shadow-lg border-4 border-yellow-400 transform scale-100">
                                <div className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">
                                    📚 Công Thức:
                                </div>
                                <div className="text-2xl font-black text-purple-700 mb-1 tracking-tight">
                                    {currentQuestion.rule}
                                </div>
                            </div>

                            {/* Explanation */}
                            <div className={`rounded-xl p-4 mb-4 ${
                                isCorrect ? 'bg-green-100 border-2 border-green-300' : 'bg-red-100 border-2 border-red-300'
                            }`}>
                                <div className="text-sm font-bold text-gray-700 mb-1">
                                    💡 Giải thích:
                                </div>
                                <p className="text-sm text-gray-800 leading-relaxed">
                                    {currentQuestion.explanation}
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={() => setShowFeedback(false)}
                                    className={`w-full py-3 px-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                                        isCorrect 
                                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700' 
                                            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
                                    }`}
                                >
                                    {isCorrect ? '🎯 Tiếp tục' : '📖 Hiểu rồi'}
                                </button>
                                {currentQuestionIndex < questions.length - 1 && (
                                    <button
                                        onClick={() => {
                                            setShowFeedback(false);
                                            goToNextQuestion();
                                        }}
                                        className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                    >
                                        ➡️ Câu tiếp theo
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                    )}
                </div>
            )}
        </>
    );
};

export default TOEICPart5Test1_2025;