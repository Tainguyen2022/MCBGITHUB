import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toeicPart5Data, ToeicPart5Question } from '../data/toeicPart5Data';
import { ArrowUturnLeftIcon, TrophyIcon, CheckCircleIcon, XCircleIcon, LightBulbIcon } from '../components/Icons';
import { useAuth } from '../App';

const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const TimerCircle: React.FC<{ duration: number, timeLeft: number }> = ({ duration, timeLeft }) => {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (timeLeft / duration) * circumference;

    return (
        <div className="relative w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 60 60">
                <circle
                    className="text-gray-200"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="30"
                    cy="30"
                />
                <circle
                    className="text-blue-500"
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="30"
                    cy="30"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s linear' }}
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-700">
                {timeLeft}
            </span>
        </div>
    );
};

const ToeicPart5Page: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser, updateUser, addGuestBanana } = useAuth();
    const [questions, setQuestions] = useState(() => shuffleArray(toeicPart5Data));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20);
    const [rewardGiven, setRewardGiven] = useState(false);

    const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
    const totalQuestions = useMemo(() => questions.length, [questions]);

    useEffect(() => {
        if (isFinished && !rewardGiven) {
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
    }, [isFinished, score, totalQuestions, currentUser, updateUser, addGuestBanana, rewardGiven]);

    const handleNext = useCallback(() => {
        setShowFeedback(false);
        setUserAnswer(null);
        setTimeLeft(20);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    }, [currentQuestionIndex, questions.length]);

    useEffect(() => {
        if (isFinished || showFeedback) return;
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            setShowFeedback(true); // Times up, show feedback for unanswered question
        }
    }, [timeLeft, isFinished, showFeedback, handleNext]);

    const handleAnswer = (optionKey: string) => {
        if (showFeedback) return;
        setUserAnswer(optionKey);
        setShowFeedback(true);
        if (optionKey === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const handleRestart = () => {
        setQuestions(shuffleArray(toeicPart5Data));
        setCurrentQuestionIndex(0);
        setUserAnswer(null);
        setShowFeedback(false);
        setScore(0);
        setIsFinished(false);
        setTimeLeft(20);
        setRewardGiven(false);
    };

    if (isFinished) {
        return (
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto text-center animate-fade-in mt-10">
                <TrophyIcon className="w-24 h-24 text-amber-500 mx-auto" />
                <h2 className="text-4xl font-bold mt-4">Hoàn thành!</h2>
                <p className="text-xl text-gray-600 mt-2">Bạn đã hoàn thành bài luyện tập Part 5.</p>
                <div className="mt-8 text-lg">
                    Điểm số của bạn: <span className="text-5xl font-bold text-blue-600">{score} / {questions.length}</span>
                </div>
                 {rewardGiven && (
                    <p className="text-lg text-green-600 font-semibold mt-4 animate-bounce">
                        🍌 +1 Chuối! Bạn đã được thưởng vì làm bài xuất sắc! 🍌
                    </p>
                )}
                <div className="flex gap-4 mt-10">
                    <button onClick={handleRestart} className="btn btn-primary w-full text-lg py-3">Làm lại</button>
                    <button onClick={() => navigate('/exam-hub', { state: { selectedExam: 'TOEIC' } })} className="btn btn-secondary w-full text-lg py-3">
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
        <div className="bg-slate-50 px-4 pt-20 pb-12 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <header className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-800">TOEIC Reading: Part 5</h1>
                        <p className="text-lg text-gray-600">Hoàn thành câu</p>
                    </div>
                    <div className="text-right">
                         <p className="font-semibold text-gray-700">Câu {currentQuestionIndex + 1} / {questions.length}</p>
                         <p className="font-bold text-blue-600 text-2xl">Điểm: {score}</p>
                    </div>
                </header>
                
                <div className="card-base bg-white border p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <p className="text-lg text-gray-800 leading-relaxed pr-4">
                            <b>{currentQuestion.id}.</b> {currentQuestion.question}
                        </p>
                        <TimerCircle duration={20} timeLeft={timeLeft} />
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
                                <button 
                                    key={option.key}
                                    onClick={() => handleAnswer(option.key)}
                                    disabled={showFeedback}
                                    className={`w-full text-left p-4 rounded-lg border-2 flex items-center text-lg transition-colors duration-200 disabled:cursor-not-allowed`}
                                >
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full mr-4 flex items-center justify-center font-bold border-2 ${stateClasses}`}>
                                        {option.key}
                                    </div>
                                    <span className="flex-grow">{option.text}</span>
                                    {icon}
                                </button>
                            );
                        })}
                    </div>

                    {showFeedback && (
                        <div className="mt-6 space-y-6 animate-fade-in">
                            {isCorrect ? (
                                <p className="text-center font-bold text-green-600 text-xl">Chính xác! Tuyệt vời!</p>
                            ) : (
                                <p className="text-center font-bold text-red-600 text-xl">Không sao, thử lại câu tiếp theo nhé!</p>
                            )}

                            <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg space-y-2">
                                <h4 className="font-bold text-amber-800 flex items-center gap-2"><LightBulbIcon className="w-5 h-5"/> Giải thích:</h4>
                                <p className="text-gray-800">{currentQuestion.explanation_vi}</p>
                            </div>
                            <div className="text-center">
                                <button onClick={handleNext} className="btn btn-writing w-full md:w-auto text-lg px-12 py-3">
                                    {currentQuestionIndex === questions.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ToeicPart5Page;