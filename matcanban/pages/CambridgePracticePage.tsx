import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CambridgeTest, CambridgeQuestion } from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { loadOrInitializeData } from '../services/dataService';
import { defaultStartersData } from '../data/cambridge/startersData';
import { defaultMoversData } from '../data/cambridge/moversData';
import { defaultFlyersData } from '../data/cambridge/flyersData';
import { ClockIcon, XMarkIcon, CheckCircleIcon, XCircleIcon, LightBulbSolidIcon, TrophyIcon, ArrowUturnLeftIcon, SparklesIcon } from '../components/Icons';
import GcsImage from '../components/GcsImage';
import { useAuth } from '../App';
import { generateCambridgeImage } from '../services/aiService';

type Feedback = { type: 'correct' | 'incorrect'; message: string; emoji: string } | null;

const FeedbackModal: React.FC<{ feedback: Feedback, onClose: () => void }> = ({ feedback, onClose }) => {
    if (!feedback) return null;
    
    useEffect(() => {
        const timer = setTimeout(onClose, 1500);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="feedback-modal-overlay">
            <div className="feedback-modal-content">
                <span className={`text-7xl mb-4 inline-block ${feedback.type === 'correct' ? 'animate-checkmark-pop' : ''}`}>{feedback.emoji}</span>
                <p className={`text-3xl font-bold ${feedback.type === 'correct' ? 'text-green-600' : 'text-red-600'}`}>{feedback.message}</p>
            </div>
        </div>
    );
};

const CambridgePracticePage: React.FC = () => {
    const { exam, partId } = useParams<{ exam: string, partId: string }>();
    const navigate = useNavigate();
    const { currentUser, updateUser, addGuestBanana, guestBananaBalance, useGuestBanana } = useAuth();
    const isAdmin = currentUser?.role === 'Admin';

    const testData = useMemo(() => {
        if (exam === 'starters') return loadOrInitializeData<CambridgeTest[]>(LOCAL_STORAGE_KEYS.CAMBRIDGE_STARTERS_DATA, defaultStartersData)[0];
        if (exam === 'movers') return loadOrInitializeData<CambridgeTest[]>(LOCAL_STORAGE_KEYS.CAMBRIDGE_MOVERS_DATA, defaultMoversData)[0];
        if (exam === 'flyers') return loadOrInitializeData<CambridgeTest[]>(LOCAL_STORAGE_KEYS.CAMBRIDGE_FLYERS_DATA, defaultFlyersData)[0];
        return null;
    }, [exam]);

    const testPart = useMemo(() => testData?.parts.find(p => p.partId === partId), [testData, partId]);
    const totalQuestions = useMemo(() => testPart?.questions.length || 0, [testPart]);
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(testPart?.durationSeconds || 0);
    const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
    const [feedback, setFeedback] = useState<Feedback>(null);
    const [showHint, setShowHint] = useState(false);
    const [isTestFinished, setIsTestFinished] = useState(false);
    const [rewardGiven, setRewardGiven] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);

    const handleFeedbackClose = useCallback(() => setFeedback(null), []);

    const resetQuestionState = useCallback(() => {
        setUserAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[currentQuestionIndex] = null;
            return newAnswers;
        });
        setFeedback(null);
        setShowHint(false);
        setGeneratedImage(null);
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (testPart) {
            setTimeLeft(testPart.durationSeconds);
            setUserAnswers(Array(testPart.questions.length).fill(null));
        }
        resetQuestionState();
    }, [testPart, resetQuestionState]);
    
     useEffect(() => {
        resetQuestionState();
    }, [currentQuestionIndex, resetQuestionState]);
    
    useEffect(() => {
        if (isTestFinished || !testPart) return;
        if (timeLeft <= 0) {
            setIsTestFinished(true);
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, isTestFinished, testPart]);
    
    useEffect(() => {
        if (isTestFinished && !rewardGiven && totalQuestions > 0) {
            const percentage = (score / totalQuestions) * 100;
            if (percentage >= 95) {
                if (currentUser) updateUser({ ...currentUser, bananaBalance: currentUser.bananaBalance + 1 });
                else addGuestBanana?.(1);
                setRewardGiven(true);
            }
        }
    }, [isTestFinished, score, totalQuestions, currentUser, updateUser, addGuestBanana, rewardGiven]);

    const handleAnswerSelect = (selectedOption: string) => {
        if (userAnswers[currentQuestionIndex] !== null) return; 

        const currentQuestion = testPart?.questions[currentQuestionIndex];
        if (!currentQuestion) return;

        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = selectedOption;
        setUserAnswers(newAnswers);

        if (selectedOption === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
            setFeedback({ type: 'correct', message: 'Tuyệt vời!', emoji: '✅' });
        } else {
            setFeedback({ type: 'incorrect', message: 'Cố lên nào!', emoji: '😊' });
        }
    };
    
    const handleNextQuestion = () => {
        if (!testPart) return;
        if (currentQuestionIndex < testPart.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setIsTestFinished(true);
        }
    };
    
    const handleBananaCheck = () => {
        const balance = currentUser ? currentUser.bananaBalance : guestBananaBalance;
        if (balance <= 0) {
            alert(currentUser ? 'Bạn đã hết chuối!' : 'Bạn đã hết chuối miễn phí. Vui lòng đăng nhập.');
            if (!currentUser) navigate('/login');
            return false;
        }
        return true;
    };

    const handleAITransaction = (promise: Promise<any>) => {
        promise.then(() => {
            if (currentUser) updateUser({ ...currentUser, bananaBalance: currentUser.bananaBalance - 1 });
            else useGuestBanana();
        }).catch(console.error);
    };

    const handleGenerateImage = async () => {
        const currentQuestion = testPart?.questions[currentQuestionIndex];
        if (!currentQuestion || !handleBananaCheck()) return;

        setIsGeneratingImage(true);
        const promise = generateCambridgeImage(currentQuestion.questionText.en);
        handleAITransaction(promise);

        try {
            const imageB64 = await promise;
            setGeneratedImage(imageB64);
        } catch (error) {
            console.error("Image generation failed:", error);
            alert("Sorry, the AI couldn't generate an image. Please try again.");
        } finally {
            setIsGeneratingImage(false);
        }
    };
    
    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimeLeft(testPart?.durationSeconds || 0);
        setIsTestFinished(false);
        setRewardGiven(false);
    };

    if (!testPart) return <div className="text-center p-10">Không tìm thấy bài thi. Vui lòng quay lại.</div>;
    
    const currentQuestion = testPart.questions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];
    const progress = ((currentQuestionIndex + (userAnswer ? 1 : 0)) / testPart.questions.length) * 100;
    
    const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

    if (isTestFinished) {
        return (
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto text-center">
                <TrophyIcon className="w-24 h-24 text-amber-500 mx-auto" />
                <h2 className="text-4xl font-bold mt-4">Hoàn thành!</h2>
                <p className="text-xl text-gray-600 mt-2">Bạn đã làm xong bài luyện tập.</p>
                <div className="mt-8 text-5xl font-bold text-blue-600">{score} điểm</div>
                {rewardGiven && <p className="text-lg text-green-600 font-semibold mt-4 animate-bounce">🍌 +1 Chuối! Bạn đã được thưởng vì làm bài xuất sắc! 🍌</p>}
                <div className="flex gap-4 mt-10">
                    <button onClick={handleRestart} className="btn btn-primary w-full text-lg py-3">Làm lại</button>
                    <button onClick={() => navigate('/exam-hub')} className="btn btn-secondary w-full text-lg py-3">Quay lại</button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-sky-50 -m-8 px-4 pt-20 pb-12 min-h-screen">
            <FeedbackModal feedback={feedback} onClose={handleFeedbackClose} />
            <div className="max-w-4xl mx-auto">
                <header className="cambridge-practice-header mb-6">
                    <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{exam?.toUpperCase()} - {testPart.title}</h2>
                        <p className="text-sm md:text-base text-gray-500">{testPart.instructions_vi}</p>
                    </div>
                    <div className="text-center mx-4">
                        <div className="text-sm font-semibold text-gray-500">Điểm số</div>
                        <div className="text-4xl font-bold text-blue-600">{score}</div>
                    </div>
                    <div className="text-center">
                         <div className="text-sm font-semibold text-gray-500">Thời gian</div>
                        <div className="text-3xl font-bold text-gray-700 flex items-center gap-2">
                            <ClockIcon className="w-7 h-7" /> {formatTime(timeLeft)}
                        </div>
                    </div>
                </header>

                <div className="cambridge-progress-bar-bg mb-8">
                    <div className="cambridge-progress-bar-fg h-full rounded-full" style={{ width: `${progress}%` }}></div>
                </div>

                <div className="card-base bg-white border p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="relative">
                            <GcsImage imageSeed={currentQuestion.imageSeed!} examType={exam!} altText={currentQuestion.questionText.en} base64Image={generatedImage} />
                            {isAdmin && (
                                <button onClick={handleGenerateImage} disabled={isGeneratingImage} className="btn btn-ai-green absolute top-2 right-2 flex items-center shadow-lg">
                                    {isGeneratingImage ? <div className="ai-spinner !w-5 !h-5"/> : <SparklesIcon className="w-5 h-5"/>}
                                    <span className="ml-2 hidden sm:inline">AI Generate Image</span>
                                </button>
                            )}
                        </div>
                        <div className="space-y-4">
                            <div className="text-center">
                                <p className="text-2xl md:text-3xl font-bold text-gray-800">{currentQuestion.questionText.en}</p>
                                <p className="text-lg md:text-xl text-gray-500 mt-1">{currentQuestion.questionText.vi}</p>
                            </div>
                            <div className="space-y-3 pt-4">
                                {currentQuestion.options.map(option => {
                                    const isCorrect = option.en === currentQuestion.correctAnswer;
                                    const isSelected = userAnswer === option.en;
                                    let stateClasses = "border-gray-300 bg-white hover:border-blue-500";
                                    if(userAnswer) {
                                        if (isCorrect) stateClasses = "border-green-500 bg-green-100 text-green-800 font-bold";
                                        else if (isSelected) stateClasses = "border-red-500 bg-red-100 text-red-800";
                                        else stateClasses = "border-gray-200 bg-gray-100 text-gray-500 opacity-70";
                                    }
                                    return (
                                        <button key={option.en} onClick={() => handleAnswerSelect(option.en)} disabled={!!userAnswer} className={`cambridge-answer-option ${stateClasses}`}>
                                            {option.en}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    
                    {userAnswer && (
                        <div className="mt-6 flex flex-col md:flex-row items-center gap-4 animate-fade-in">
                            <div className="flex-1 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                                <h4 className="font-bold text-amber-800 flex items-center gap-2"><LightBulbSolidIcon className="w-6 h-6"/> Giải thích:</h4>
                                <p className="text-gray-800 mt-1">{currentQuestion.explanation_vi}</p>
                            </div>
                            <button onClick={handleNextQuestion} className="btn btn-writing text-lg px-12 py-3 w-full md:w-auto">
                                {currentQuestionIndex === totalQuestions - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CambridgePracticePage;