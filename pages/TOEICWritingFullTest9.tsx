import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toeicWritingFullTest9, WritingQuestion, ModelAnswer } from '../data/toeic-writing-full-test9';

const TOEICWritingFullTest9: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const currentQuestion: WritingQuestion | null = toeicWritingFullTest9.questions[currentQuestionIndex] || null;
  const totalQuestions = toeicWritingFullTest9.questions.length;

  // Find model answer for current question
  const currentModelAnswer: ModelAnswer | null = currentQuestion && toeicWritingFullTest9.modelAnswers
    ? toeicWritingFullTest9.modelAnswers.find(ma => {
        const questionNum = currentQuestion.id.replace('test9-q', '');
        const answerNum = ma.id.replace('ma', '');
        return questionNum === answerNum;
      }) || null
    : null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (minutes: number) => {
    setTimeRemaining(minutes * 60); // Convert to seconds
    setIsTimerRunning(true);
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const nextQuestion = () => {
    stopTimer();
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowModelAnswer(false);
      // Auto-start timer for next question
      const nextQ = toeicWritingFullTest9.questions[currentQuestionIndex + 1];
      if (nextQ) {
        startTimer(nextQ.timeLimit);
      }
    } else {
      setTestCompleted(true);
    }
  };

  const prevQuestion = () => {
    stopTimer();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowModelAnswer(false);
      // Auto-start timer for previous question
      const prevQ = toeicWritingFullTest9.questions[currentQuestionIndex - 1];
      if (prevQ) {
        startTimer(prevQ.timeLimit);
      }
    }
  };

  const handleAnswerChange = (value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const restartTest = () => {
    setTestStarted(false);
    setTestCompleted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowModelAnswer(false);
    stopTimer();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (testStarted && currentQuestion) {
      startTimer(currentQuestion.timeLimit);
    }
    return () => {
      stopTimer();
    };
  }, [testStarted, currentQuestionIndex]);

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white text-center">
                TOEIC® Writing Test 9
              </h1>
              <p className="text-blue-100 text-center mt-2">Full Official Format Test</p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Directions</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This is the TOEIC® Writing test. This test includes eight questions that measure different aspects of your writing ability. The test lasts approximately one hour.
                </p>
              </div>

              {/* Test Structure Table */}
              <div className="mb-8 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Question</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Task</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Evaluation Criteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">1-5</td>
                      <td className="border border-gray-300 px-4 py-3">Write a sentence based on a picture</td>
                      <td className="border border-gray-300 px-4 py-3">
                        • grammar<br />
                        • relevance of the sentences to the pictures
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">6-7</td>
                      <td className="border border-gray-300 px-4 py-3">Respond to a written request</td>
                      <td className="border border-gray-300 px-4 py-3">
                        • quality and variety of your sentences<br />
                        • vocabulary<br />
                        • organization
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">8</td>
                      <td className="border border-gray-300 px-4 py-3">Write an opinion essay</td>
                      <td className="border border-gray-300 px-4 py-3">
                        • whether your opinion is supported with reasons and/or examples<br />
                        • grammar<br />
                        • vocabulary<br />
                        • organization
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <p className="text-gray-700 leading-relaxed">
                  For each type of question, you will be given specific directions, including the time allowed for writing.
                </p>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setTestStarted(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Start Test →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (testCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white text-center">
                Test Completed! 🎉
              </h1>
            </div>
            <div className="p-8 text-center">
              <p className="text-xl text-gray-700 mb-8">
                Congratulations! You have completed the TOEIC Writing Test 9.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={restartTest}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
                >
                  Restart Test
                </button>
                <button
                  onClick={() => navigate('/toeic-writing')}
                  className="bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200 shadow-lg"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const currentAnswer = userAnswers[currentQuestion.id] || '';
  const wordCount = getWordCount(currentAnswer);

  const getQuestionTypeTitle = () => {
    if (currentQuestionIndex < 5) return 'Questions 1-5: Write a sentence based on the picture';
    if (currentQuestionIndex < 7) return 'Questions 6-7: Respond to a written request';
    return 'Question 8: Write an opinion essay';
  };

  const getQuestionTypeDirections = () => {
    if (currentQuestionIndex < 5) {
      return 'In this part of the test, you will write ONE sentence that is based on a picture. With each picture, you will be given TWO words or phrases that you must use in your sentence. You can change the forms of the words and you can use the words in any order. Your sentences will be scored on the appropriate use of grammar and the relevance of the sentence to the picture.';
    }
    if (currentQuestionIndex < 7) {
      return 'In this part of the test, you will show how well you can write a response to an e-mail. Your response will be scored on the quality and variety of your sentences, vocabulary, and organization. You will have 10 minutes to read and answer each e-mail.';
    }
    return 'In this part of the test, you will write an essay in response to a question that asks you to state, explain, and support your opinion on an issue. Typically, an effective essay will contain a minimum of 300 words. Your response will be scored on whether your opinion is supported with reasons and/or examples, grammar, vocabulary, and organization. You will have 30 minutes to plan, write, and revise your essay.';
  };

  const showDirections = currentQuestionIndex === 0 || currentQuestionIndex === 5 || currentQuestionIndex === 7;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">
                TOEIC® Writing Test 9
              </h1>
              <span className="text-white text-sm bg-white/20 px-4 py-2 rounded-full">
                Question {currentQuestionIndex + 1} of 8
              </span>
            </div>
          </div>

          {/* Question Type Banner */}
          <div className="bg-blue-50 px-6 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {getQuestionTypeTitle()}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Time Limit: {currentQuestion.timeLimit} minutes
            </p>
          </div>

          {/* Directions */}
          {showDirections && (
            <div className="bg-yellow-50 px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Directions:</h3>
              <p className="text-gray-700 text-sm">
                {getQuestionTypeDirections()}
              </p>
            </div>
          )}

          {/* Question Content */}
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Question {currentQuestionIndex + 1}
              </h3>

              {/* Image for Questions 1-5 */}
              {currentQuestion.type === 'picture_sentence' && currentQuestion.imageUrl && (
                <div className="mb-6">
                  <img
                    src={currentQuestion.imageUrl}
                    alt={`Question ${currentQuestionIndex + 1}`}
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                  {currentQuestion.requiredWords && (
                    <p className="text-center text-lg font-semibold text-gray-700 mt-4">
                      {currentQuestion.requiredWords.join(' / ')}
                    </p>
                  )}
                </div>
              )}

              {/* Email Content for Questions 6-7 */}
              {currentQuestion.type === 'email_response' && currentQuestion.emailContent && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
                  <p className="font-semibold text-gray-800 mb-4">Directions: Read the e-mail.</p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>FROM</strong> {currentQuestion.emailContent.from}</p>
                    <p><strong>TO</strong> {currentQuestion.emailContent.to}</p>
                    <p><strong>SUBJECT</strong> {currentQuestion.emailContent.subject}</p>
                    <p><strong>SENT</strong> {currentQuestion.emailContent.sent}</p>
                    <div className="mt-4 p-4 bg-white rounded border border-gray-300 whitespace-pre-line">
                      {currentQuestion.emailContent.body}
                    </div>
                  </div>
                  {currentQuestion.requirements && (
                    <p className="font-semibold text-gray-800 mt-4">
                      Directions: {currentQuestion.requirements.join(' ')}
                    </p>
                  )}
                  <p className="text-gray-600 mt-2 italic">Response time: 10 minutes</p>
                </div>
              )}

              {/* Prompt for Question 8 */}
              {currentQuestion.type === 'opinion_essay' && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
                  <p className="font-semibold text-gray-800 mb-4">
                    Directions: Read the question below. You have 30 minutes to plan, write, and revise your essay. Typically, an effective response will contain a minimum of 300 words.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line mb-4">
                    {currentQuestion.prompt}
                  </p>
                  {currentQuestion.options && currentQuestion.options.length > 0 && (
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {currentQuestion.options.map((option, index) => (
                        <li key={index} className="text-lg">• {option}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Question Text */}
              {currentQuestion.type !== 'email_response' && currentQuestion.type !== 'opinion_essay' && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {currentQuestion.question}
                  </p>
                </div>
              )}
            </div>

            {/* Timer and Word Count */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
                <div className="text-sm text-red-600 mb-1">Time Remaining</div>
                <div className="text-2xl font-bold text-red-800">
                  {formatTime(timeRemaining)}
                </div>
              </div>
              {currentQuestion.wordCount && (
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                  <div className="text-sm text-blue-600 mb-1">Word Count</div>
                  <div className="text-2xl font-bold text-blue-800">
                    {wordCount} <span className="text-base font-normal text-gray-600">/ {currentQuestion.wordCount}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Text Editor */}
            <div className="mb-6">
              <textarea
                ref={textareaRef}
                value={currentAnswer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-800 text-lg leading-relaxed"
              />
            </div>

            {/* Show Model Answer Button */}
            <div className="mb-6 text-center">
              <button
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {showModelAnswer ? '📝 Hide Model Answer' : '📝 Show Model Answer'}
              </button>
            </div>

            {/* Model Answer */}
            {showModelAnswer && currentModelAnswer && (
              <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border-2 border-purple-200">
                <h4 className="text-xl font-bold text-purple-900 mb-4">📝 Model Answer</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Answer:</h5>
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                      {currentModelAnswer.answer}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Translation:</h5>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {currentModelAnswer.answerTranslation}
                    </p>
                  </div>
                  {currentModelAnswer.keyPoints && currentModelAnswer.keyPoints.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Key Points:</h5>
                      <ul className="list-disc list-inside space-y-1">
                        {currentModelAnswer.keyPoints.map((point, index) => (
                          <li key={index} className="text-gray-700">{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {currentModelAnswer.wordCount && (
                    <div className="text-sm text-gray-600">
                      <strong>Word Count:</strong> {currentModelAnswer.wordCount} words
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 rounded-lg font-semibold bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <button
              onClick={nextQuestion}
              className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Finish Test' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TOEICWritingFullTest9;

