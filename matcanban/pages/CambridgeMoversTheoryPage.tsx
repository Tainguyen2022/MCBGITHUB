import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { cambridgeMoversTheoryData } from '../data/cambridgeMoversTheoryData';
import { CambridgeMoversTheoryQuestion } from '../types';
import { ArrowUturnLeftIcon, TrophyIcon, CheckCircleIcon, XCircleIcon, LightBulbIcon, ClockIcon } from '../components/Icons';
import { useAuth } from '../App';

const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const TimerCircle: React.FC<{ isTimerless: boolean; duration: number; timeLeft: number }> = ({ isTimerless, duration, timeLeft }) => {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = isTimerless ? 0 : circumference - (timeLeft / duration) * circumference;
    const timeColor = timeLeft <= 5 ? 'text-red-500' : 'text-blue-500';

    return (
        <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-full h-full" viewBox="0 0 60 60">
                <circle className="text-gray-200" strokeWidth="4" stroke="currentColor" fill="transparent" r={radius} cx="30" cy="30" />
                <circle
                    className={isTimerless ? 'text-gray-400' : timeColor}
                    strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="30" cy="30"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s linear' }}
                />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${isTimerless ? 'text-gray-400' : timeColor}`}>
                {isTimerless ? '∞' : timeLeft}
            </span>
        </div>
    );
};

const CambridgeMoversTheoryPage: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser, updateUser, addGuestBanana } = useAuth();
    const totalQuestions = useMemo(() => cambridgeMoversTheoryData.length, []);
    const storageKey = `cambridge_movers_theory_attempt_${currentUser?.id || 'guest'}`;

    const [questionQueue, setQuestionQueue] = useState<CambridgeMoversTheoryQuestion[]>([]);
    const [skippedQueue, setSkippedQueue] = useState<CambridgeMoversTheoryQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<CambridgeMoversTheoryQuestion | null>(null);

    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isTimerlessMode, setIsTimerlessMode] = useState(false);
    const [rewardGiven, setRewardGiven] = useState(false);
    
    const [attemptHistory, setAttemptHistory] = useState(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            return saved ? JSON.parse(saved) : null;
        } catch { return null; }
    });

    const startQuiz = useCallback(() => {
        const shuffled = shuffleArray(cambridgeMoversTheoryData);
        setQuestionQueue(shuffled.slice(1));
        setCurrentQuestion(shuffled[0]);
        setSkippedQueue([]);
        setUserAnswer(null);
        setShowFeedback(false);
        setScore(0);
        setIsFinished(false);
        setTimeLeft(30);
        setRewardGiven(false);
    }, []);

    useEffect(() => {
        startQuiz();
    }, [startQuiz]);

    const handleAnswer = useCallback((optionKey: string) => {
        if (showFeedback || !currentQuestion) return;
        
        setUserAnswer(optionKey);
        setShowFeedback(true);
        if (optionKey === currentQuestion.correctAnswer && !attemptHistory) {
            setScore(prev => prev + 1);
        }
    }, [showFeedback, currentQuestion, attemptHistory]);
    
    const handleNext = useCallback(() => {
        if (questionQueue.length > 0) {
            setCurrentQuestion(questionQueue[0]);
            setQuestionQueue(questionQueue.slice(1));
        } else if (skippedQueue.length > 0) {
            const nextSkipped = shuffleArray(skippedQueue);
            setCurrentQuestion(nextSkipped[0]);
            setQuestionQueue(nextSkipped.slice(1));
            setSkippedQueue([]);
        } else {
            setIsFinished(true);
        }
        setUserAnswer(null);
        setShowFeedback(false);
        setTimeLeft(30);
    }, [questionQueue, skippedQueue]);
    
    useEffect(() => {
        if (isFinished && !attemptHistory && !rewardGiven) {
            const newAttempt = { score, date: new Date().toISOString() };
            localStorage.setItem(storageKey, JSON.stringify(newAttempt));
            setAttemptHistory(newAttempt);
            
            const percentage = (score / totalQuestions) * 100;
            if (percentage >= 95) {
                if (currentUser) {
                    const updatedUser = { ...currentUser, bananaBalance: currentUser.bananaBalance + 1 };
                    updateUser(updatedUser);
                } else {
                    addGuestBanana?.(1);
                }
                setRewardGiven(true);
            }
        }
    }, [isFinished, score, totalQuestions, currentUser, updateUser, addGuestBanana, rewardGiven, attemptHistory, storageKey]);

    const handleSkip = useCallback(() => {
        if (showFeedback || !currentQuestion) return;
        setSkippedQueue(prev => [...prev, currentQuestion]);
        handleNext();
    }, [showFeedback, currentQuestion, handleNext]);

    useEffect(() => {
        if (isFinished || showFeedback || isTimerlessMode) return;
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            handleAnswer(''); 
        }
    }, [timeLeft, isFinished, showFeedback, isTimerlessMode, handleAnswer]);
    
    const answeredCount = totalQuestions - questionQueue.length - skippedQueue.length;
    const progress = (answeredCount / totalQuestions) * 100;

    if (isFinished) {
        return (
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto text-center animate-fade-in mt-10">
                <TrophyIcon className="w-24 h-24 text-amber-500 mx-auto" />
                <h2 className="text-4xl font-bold mt-4">Hoàn thành!</h2>
                <p className="text-xl text-gray-600 mt-2">Bạn đã hoàn thành bài quiz lý thuyết Movers.</p>
                <div className="mt-8 text-lg">
                    Điểm số của bạn: <span className="text-5xl font-bold text-blue-600">{score} / {totalQuestions}</span>
                </div>
                {rewardGiven && (
                    <p className="text-lg text-green-600 font-semibold mt-4 animate-bounce">
                        🍌 +1 Chuối! Bạn đã được thưởng vì làm bài xuất sắc! 🍌
                    </p>
                )}
                {attemptHistory && !rewardGiven && <p className="text-sm text-gray-500 mt-2">(Đây là lần làm lại, điểm không được ghi nhận)</p>}
                <div className="flex gap-4 mt-10">
                    <button onClick={startQuiz} className="btn btn-primary w-full text-lg py-3">Làm lại</button>
                    <button onClick={() => navigate('/cambridge-hub/movers')} className="btn btn-secondary w-full text-lg py-3">
                        <ArrowUturnLeftIcon className="w-5 h-5 mr-2" />
                        Quay lại
                    </button>
                </div>
            </div>
        );
    }
    
    if (!currentQuestion) return null;

    const isCorrect = userAnswer === currentQuestion.correctAnswer;
    
    return (
        <div className="bg-slate-50 -m-8 px-4 pt-20 pb-12 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <header className="mb-6">
                    <h1 className="text-4xl font-extrabold text-gray-800 text-center">Cambridge Movers: Theory Quiz</h1>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                     <p className="text-center font-semibold text-gray-700 mt-2">Câu {answeredCount} / {totalQuestions} | Điểm: {score}</p>
                </header>

                <div className="card-base bg-white border p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <p className="text-xl text-gray-800 leading-relaxed pr-4">
                            <b>Câu hỏi.</b> {currentQuestion.question}
                        </p>
                        <TimerCircle isTimerless={isTimerlessMode} duration={30} timeLeft={timeLeft} />
                    </div>

                    <div className="mt-6 space-y-3">
                        {currentQuestion.options.map(option => {
                            let stateClasses = "bg-white hover:bg-gray-100 border-gray-300";
                            let icon = null;
                            if (showFeedback) {
                                if (option.key === currentQuestion.correctAnswer) {
                                    stateClasses = "bg-green-100 border-green-500 text-green-800 font-bold";
                                    icon = <CheckCircleIcon className="w-6 h-6 text-green-600 animate-checkmark-pop" />;
                                } else if (option.key === userAnswer) {
                                    stateClasses = "bg-red-100 border-red-500 text-red-800";
                                    icon = <XCircleIcon className="w-6 h-6 text-red-600" />;
                                } else {
                                     stateClasses = "bg-gray-100 border-gray-200 text-gray-500";
                                }
                            }
                            return (
                                <button key={option.key} onClick={() => handleAnswer(option.key)} disabled={showFeedback} className={`w-full text-left p-4 rounded-lg border-2 flex items-center text-lg transition-colors duration-200 disabled:cursor-not-allowed`}>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full mr-4 flex items-center justify-center font-bold border-2 ${stateClasses}`}>{option.key}</div>
                                    <span className="flex-grow">{option.text}</span>
                                    {icon}
                                </button>
                            );
                        })}
                    </div>
                    
                    {showFeedback && (
                        <div className="mt-6 space-y-4 animate-fade-in">
                             {userAnswer === '' ? (<p className="text-center font-bold text-amber-600 text-xl">Hết giờ!</p>) : isCorrect ? (<p className="text-center font-bold text-green-600 text-xl">Tuyệt vời! Chính xác!</p>) : (<p className="text-center font-bold text-red-600 text-xl">Cố lên nào, ghi nhớ chiến thuật này nhé!</p>)}
                            <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg space-y-2 text-left">
                                <h4 className="font-bold text-amber-800 flex items-center gap-2"><LightBulbIcon className="w-5 h-5"/> Giải thích chiến thuật:</h4>
                                <p className="text-gray-800">{currentQuestion.explanation_vi}</p>
                            </div>
                        </div>
                    )}
                    
                    <div className="mt-8 flex justify-between items-center">
                        <button onClick={() => setIsTimerlessMode(!isTimerlessMode)} className={`btn btn-secondary !rounded-full flex items-center gap-2 ${isTimerlessMode ? '!bg-blue-100 !text-blue-700' : ''}`}>
                            <ClockIcon className="w-5 h-5"/>
                            {isTimerlessMode ? 'Tắt chế độ' : 'Không tính giờ'}
                        </button>
                        <div className="flex gap-4">
                            <button onClick={handleSkip} className="btn btn-secondary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed" disabled={showFeedback || (questionQueue.length === 0 && skippedQueue.length === 0)}>
                                Bỏ qua
                            </button>
                            <button onClick={handleNext} disabled={!showFeedback} className="btn btn-writing text-lg px-8 py-3 disabled:bg-gray-300">
                                Câu tiếp theo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CambridgeMoversTheoryPage;