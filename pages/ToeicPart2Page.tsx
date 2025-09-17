import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toeicPart2Data } from '../data/toeicPart2Data';
import { ArrowUturnLeftIcon, SpeakerWaveIcon, LightBulbIcon, CheckCircleIcon, XCircleIcon, TrophyIcon } from '../components/Icons';
import { useAuth } from '../App';

const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const ToeicPart2Page: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser, updateUser, addGuestBanana } = useAuth();
    const [questions, setQuestions] = useState(() => shuffleArray(toeicPart2Data));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
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

    const handleAnswer = (option: string) => {
        if (showFeedback) return;
        setUserAnswer(option);
        setShowFeedback(true);
        if (option === currentQuestion.correctOption) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setUserAnswer(null);
            setShowFeedback(false);
        } else {
            setIsFinished(true);
        }
    };

    const handleRestart = () => {
        setQuestions(shuffleArray(toeicPart2Data));
        setCurrentQuestionIndex(0);
        setUserAnswer(null);
        setShowFeedback(false);
        setScore(0);
        setIsFinished(false);
        setRewardGiven(false);
    };

    const playAudio = () => {
        if (isPlaying) return;
        setIsPlaying(true);
        // Simulate audio playback time before enabling answers
        setTimeout(() => {
            setIsPlaying(false);
        }, 1500); // Simulate a 1.5 second audio clip
    };

    useEffect(() => {
        playAudio();
    }, [currentQuestionIndex]);
    
    if (isFinished) {
        return (
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto text-center animate-fade-in mt-10">
                <TrophyIcon className="w-24 h-24 text-amber-500 mx-auto" />
                <h2 className="text-4xl font-bold mt-4">Hoàn thành!</h2>
                <p className="text-xl text-gray-600 mt-2">Bạn đã hoàn thành bài luyện tập Part 2.</p>
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

    return (
        <div className="bg-slate-50 -m-8 px-4 pt-20 pb-12 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <header className="mb-6">
                    <h1 className="text-4xl font-extrabold text-gray-800 text-center">TOEIC Listening: Part 2</h1>
                    <p className="text-center text-lg text-gray-600 mt-1">Hỏi - Đáp</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
                    </div>
                    <p className="text-center font-semibold text-gray-700 mt-2">Câu {currentQuestionIndex + 1} / {questions.length}</p>
                </header>

                <div className="card-base bg-white border p-6 md:p-8">
                    <div className="text-center">
                        <p className="font-semibold text-lg text-gray-700 mb-4">Nghe câu hỏi và chọn câu trả lời đúng nhất.</p>
                        <button onClick={playAudio} disabled={isPlaying || showFeedback} className="btn btn-primary !rounded-full !p-4 disabled:bg-gray-300">
                            {isPlaying ? 
                                <div className="ai-spinner !w-8 !h-8"></div> :
                                <SpeakerWaveIcon className="w-8 h-8" />
                            }
                        </button>
                    </div>

                    <div className="mt-8 space-y-4">
                        {currentQuestion.options.map((option, index) => {
                            const label = String.fromCharCode(65 + index); // A, B, C
                            let stateClasses = "bg-white hover:bg-gray-100 border-gray-300";
                            if (showFeedback) {
                                if (option.text === currentQuestion.correctOption) {
                                    stateClasses = "bg-green-100 border-green-500 text-green-800 font-bold";
                                } else if (option.text === userAnswer) {
                                    stateClasses = "bg-red-100 border-red-500 text-red-800";
                                } else {
                                     stateClasses = "bg-gray-100 border-gray-200 text-gray-500";
                                }
                            }
                            
                            return (
                                <button 
                                    key={index}
                                    onClick={() => handleAnswer(option.text)}
                                    disabled={showFeedback || isPlaying}
                                    className={`w-full text-left p-4 rounded-lg border-2 flex items-center text-lg transition-colors duration-200 disabled:cursor-not-allowed`}
                                >
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full mr-4 flex items-center justify-center font-bold border-2 ${stateClasses}`}>
                                        {label}
                                    </div>
                                    <span>{showFeedback ? option.text : "..."}</span>
                                </button>
                            );
                        })}
                    </div>

                    {showFeedback && (
                        <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg space-y-4 animate-fade-in">
                            <div>
                                <h4 className="font-bold text-amber-800">Transcript:</h4>
                                <p className="italic text-gray-700"><b>Q:</b> {currentQuestion.transcript}</p>
                                {currentQuestion.options.map((opt, i) => (
                                    <p key={i} className="italic text-gray-700"><b>({String.fromCharCode(65 + i)}):</b> {opt.text}</p>
                                ))}
                            </div>
                            <div>
                                <h4 className="font-bold text-amber-800 flex items-center gap-2"><LightBulbIcon className="w-5 h-5"/> Mẹo Chiến thuật:</h4>
                                {/* FIX: Corrected property from .explanation to .explanation_vi */}
                                <p className="text-gray-800">{currentQuestion.explanation_vi}</p>
                            </div>
                        </div>
                    )}
                    
                    <div className="mt-8 text-center">
                        <button 
                            onClick={handleNext} 
                            disabled={!showFeedback}
                            className="btn btn-writing w-full md:w-auto text-lg px-12 py-3 disabled:bg-gray-300"
                        >
                            {currentQuestionIndex === questions.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToeicPart2Page;