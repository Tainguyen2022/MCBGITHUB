import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DocumentTextIcon,
  LightBulbIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
  MapPinIcon,
  TrophyIcon,
  PlusIcon,
  MinusIcon,
  ChartBarIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { toeicPart6Test1_2025, Part6Passage, Part6Question } from '../data/toeic-part6-test1-2025-data';
import SuperGrandBananaCelebration from '../components/SuperGrandBananaCelebration';
import { useAuth } from '../contexts/AuthContext';
import { addBananasForUser, rewardBananaForTest } from '../services/userService';

// Extract passage2 (questions 135-138) from toeicPart6Test1_2025
const card135_138_Passage = toeicPart6Test1_2025.passages.find(p => p.id === 'toeic-part6-test1-2025-passage2');

const TOEICPart6Test1_2025_Card135_138: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useAuth();
  
  // Use only passage2 (questions 135-138)
  const selectedPassage = card135_138_Passage;
  
  // Collect questions from passage2 only
  const allQuestions = useMemo(() => {
    if (!selectedPassage) return [];
    const questions: Array<{ question: Part6Question; passage: Part6Passage; questionIndex: number; passageIndex: number }> = [];
    selectedPassage.questions.forEach((q, qIdx) => {
      questions.push({ question: q, passage: selectedPassage, questionIndex: qIdx, passageIndex: 0 });
    });
    return questions;
  }, [selectedPassage]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestionData = allQuestions[currentQuestionIndex];
  
  if (!selectedPassage || !currentQuestionData || allQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No passage data available.</p>
          <button
            onClick={() => navigate('/toeic-part6-test1-2025')}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
          >
            Quay lại Part 6
          </button>
        </div>
      </div>
    );
  }
  
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: 'a' | 'b' | 'c' | 'd' }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedVocabulary, setSelectedVocabulary] = useState<string | null>(null);
  const [highlightAnswer, setHighlightAnswer] = useState(false);
  const [showTranslationModal, setShowTranslationModal] = useState(false);
  const [showMatchingGame, setShowMatchingGame] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [wrongMatch, setWrongMatch] = useState<string | null>(null);
  const [matchingGameScore, setMatchingGameScore] = useState(0);
  const [matchingGameBananaRewarded, setMatchingGameBananaRewarded] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showReviewMode, setShowReviewMode] = useState(false);
  const [showBananaReward, setShowBananaReward] = useState(false);
  const [bananaReward, setBananaReward] = useState<{ courseId: string; lessonId: string; earned: boolean; earnedAt: string; score: number; totalQuestions: number; percentage: number } | null>(null);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const startValueRef = useRef(0);
  const leftColumnRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rightColumnRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const matchingGameScrollContainerRef = useRef<HTMLDivElement | null>(null);
  
  // Fullscreen and font size states
  const [fullscreenColumn, setFullscreenColumn] = useState<'vocab' | 'passage' | 'questions' | null>(null);
  const [fontSizeVocab, setFontSizeVocab] = useState(100);
  const [fontSizePassage, setFontSizePassage] = useState(100);
  const [fontSizeQuestions, setFontSizeQuestions] = useState(100);
  
  // Resizable columns state
  const [colWidths, setColWidths] = useState({ vocab: 1, passage: 2, questions: 2 });
  const [isResizing, setIsResizing] = useState<'vocab-passage' | 'passage-questions' | null>(null);
  
  // Resize handlers
  const handleMouseDown = (divider: 'vocab-passage' | 'passage-questions') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(divider);
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = document.querySelector('.resizable-container');
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerWidth = rect.width;
      const mouseX = e.clientX - rect.left;
      const percentage = mouseX / containerWidth;

      if (isResizing === 'vocab-passage') {
        const newVocabWidth = Math.max(0.5, Math.min(2, percentage * 5));
        const remaining = 5 - newVocabWidth;
        const passageRatio = colWidths.passage / (colWidths.passage + colWidths.questions);
        const newPassageWidth = remaining * passageRatio;
        const newQuestionsWidth = remaining * (1 - passageRatio);
        
        setColWidths({
          vocab: newVocabWidth,
          passage: newPassageWidth,
          questions: newQuestionsWidth
        });
      } else if (isResizing === 'passage-questions') {
        const newPassageWidth = Math.max(0.5, Math.min(3.5, percentage * 5 - colWidths.vocab));
        const newQuestionsWidth = 5 - colWidths.vocab - newPassageWidth;
        
        if (newQuestionsWidth >= 0.5) {
          setColWidths({
            vocab: colWidths.vocab,
            passage: newPassageWidth,
            questions: newQuestionsWidth
          });
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, colWidths]);

  const currentQuestion = currentQuestionData.question;
  const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;
  const selectedAnswer = selectedAnswers[currentQuestion.id];
  const isCorrect = selectedAnswer !== undefined && selectedAnswer === currentQuestion.correctAnswer;

  // Use vocabulary from data file
  const uniqueVocabulary = useMemo(() => {
    if (!selectedPassage.vocabulary) return [];
    const seen = new Set<string>();
    const result: Array<{
      word: string;
      definition: string;
      definition_vi: string;
      meaning: string;
      location: string;
      level?: string;
      pos?: string;
      ipa?: string;
      synonyms: string[];
    }> = [];
    
    selectedPassage.vocabulary.forEach((v) => {
      const key = v.word.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        result.push({
          word: v.word,
          definition: v.definition,
          definition_vi: v.definition_vi,
          meaning: v.definition_vi, // Map definition_vi to meaning
          location: v.location,
          level: v.level,
          pos: v.pos,
          ipa: v.ipa,
          synonyms: Array.isArray(v.synonyms) ? v.synonyms : []
        });
      }
    });
    
    return result;
  }, [selectedPassage]);

  // Highlight vocabulary and blanks in passage
  const highlightPassage = useCallback((text: string, highlightAnswers: boolean = false) => {
    let highlighted = text;
    
    // First, highlight vocabulary words (only the first 25, matching column 1)
    const vocabToProcess = highlightAnswers
      ? uniqueVocabulary.slice(0, 25).filter(v => v.word === selectedVocabulary)
      : uniqueVocabulary.slice(0, 25);

    vocabToProcess.forEach(vocab => {
      const escapedWord = vocab.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Handle words with hyphens (like "plant-based") - also match "Plant Based" (capitalized, no hyphen)
      const hasHyphen = vocab.word.includes('-');
      let regex: RegExp;
      
      if (hasHyphen) {
        // For hyphenated words, also try matching without hyphen and with spaces
        const wordWithoutHyphen = vocab.word.replace(/-/g, ' ');
        const escapedWordWithoutHyphen = wordWithoutHyphen.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Match both "plant-based" and "Plant Based" (case insensitive)
        regex = new RegExp(`(^|[^\\w-])(${escapedWord}|${escapedWordWithoutHyphen})(?![\\w-])`, 'gi');
      } else {
        // For regular words, use word boundary - be more flexible to catch all occurrences
        // Try both word boundary and non-word character approach
        regex = new RegExp(`(^|[^\\w])(${escapedWord})(?![\\w])`, 'gi');
      }
      
      const isSelected = selectedVocabulary === vocab.word;
      let matchFound = false;
      
      highlighted = highlighted.replace(regex, (match, prefix, wordMatch) => {
        matchFound = true;
        // prefix is the character before the word (or empty string at start)
        // wordMatch is the actual word matched (could be hyphenated or spaced version)
        if (isSelected) {
          return `${prefix || ''}<span class="vocab-word cursor-pointer text-white font-bold underline decoration-2 decoration-white bg-blue-600 px-1.5 py-0.5 rounded shadow-lg border-2 border-blue-700" data-word="${vocab.word}" style="opacity: 1 !important; filter: none !important;">${wordMatch}</span>`;
        }
        return `${prefix || ''}<span class="vocab-word cursor-pointer text-blue-600 font-semibold underline decoration-2 decoration-blue-400 hover:bg-blue-100 px-1 rounded" data-word="${vocab.word}">${wordMatch}</span>`;
      });
      
      // If word not found in passage, it might be in questions/options - skip for now
      // (We only highlight words that appear in the passage content)
    });
    
    // Then, highlight blanks
    // Sort questions by blankNumber to ensure correct order
    const sortedQuestions = [...selectedPassage.questions].sort((a, b) => a.blankNumber - b.blankNumber);
    
    sortedQuestions.forEach((q) => {
      const blankPattern = `............`;
      const escapedPattern = blankPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const isCurrentBlank = q.id === currentQuestion.id;
      const userAnswer = selectedAnswers[q.id];
      const isCorrectAnswer = userAnswer !== undefined && userAnswer === q.correctAnswer;
      
      // Use non-global regex to replace only the first occurrence (the blank for this question)
      const regex = new RegExp(escapedPattern);
      
      if (highlightAnswers && userAnswer !== undefined) {
        const answerText = q.options.find(opt => opt.value === userAnswer)?.text || '';
        const isCurrent = q.id === currentQuestion.id;
        const colorClass = isCorrectAnswer 
          ? `bg-green-600 border-4 border-green-800 text-white ring-4 ring-green-400 shadow-2xl` 
          : `bg-red-600 border-4 border-red-800 text-white ring-4 ring-red-400 shadow-2xl`;
        // Add prominent shadow effect for correct answers (no animation, no scale to avoid covering text)
        const glowStyle = isCorrectAnswer
          ? 'box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.4), 0 4px 12px rgba(0,0,0,0.3);'
          : 'box-shadow: 0 0 20px rgba(220, 38, 38, 0.6), 0 0 40px rgba(220, 38, 38, 0.4), 0 4px 12px rgba(0,0,0,0.3);';
        // Make correct answers super prominent with bold styling but no scale to preserve text flow
        highlighted = highlighted.replace(
          regex,
          `<span class="blank-highlight ${colorClass} font-extrabold px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 inline-block" data-question-id="${q.id}" style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif; font-size: 1.1em; font-weight: 900; text-shadow: 0 2px 4px rgba(0,0,0,0.6); ${glowStyle} margin: 2px 4px; vertical-align: baseline;">[${q.blankNumber}] ${answerText}</span>`
        );
      } else if (isCurrentBlank) {
        highlighted = highlighted.replace(
          regex,
          `<span class="blank-highlight bg-blue-100/80 border-blue-500/50 text-blue-900 font-semibold px-3 py-1.5 rounded-xl border shadow-sm cursor-pointer ring-2 ring-blue-200/50" data-question-id="${q.id}" style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;">[${q.blankNumber}]</span>`
        );
      } else {
        highlighted = highlighted.replace(
          regex,
          `<span class="blank-highlight bg-yellow-100/60 border-yellow-400/50 text-yellow-900 font-semibold px-3 py-1.5 rounded-xl border cursor-pointer transition-all duration-200 hover:bg-yellow-100/80 hover:scale-105" data-question-id="${q.id}" style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;">[${q.blankNumber}]</span>`
        );
      }
    });
    
    return highlighted;
  }, [selectedPassage, currentQuestion, selectedAnswers, uniqueVocabulary, selectedVocabulary]);

  const handleVocabularyClick = (word: string) => {
    setSelectedVocabulary(selectedVocabulary === word ? null : word);
    
    // Scroll to vocabulary word in passage
    if (passageRef.current) {
      const wordElement = passageRef.current.querySelector(`[data-word="${word}"]`);
      if (wordElement) {
        wordElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const passageRef = useRef<HTMLDivElement>(null);
  const vocabSidebarRef = useRef<HTMLDivElement>(null);

  // Scroll to blank when question changes
  useEffect(() => {
    if (passageRef.current && currentQuestion) {
      const blankElement = passageRef.current.querySelector(`[data-question-id="${currentQuestion.id}"]`);
      if (blankElement) {
        setTimeout(() => {
          blankElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [currentQuestionIndex, currentQuestion]);

  // Tự động hiển thị giải thích nếu đã có đáp án
  useEffect(() => {
    if (isAnswered && !showExplanation) {
      setShowExplanation(true);
    }
  }, [isAnswered, showExplanation]);

  // Handle click on blank to navigate to question
  useEffect(() => {
    const handleBlankClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const blankElement = target.closest('[data-question-id]');
      if (blankElement) {
        const questionId = parseInt(blankElement.getAttribute('data-question-id') || '0');
        const questionIndex = allQuestions.findIndex(({ question: q }) => q.id === questionId);
        if (questionIndex >= 0) {
          setCurrentQuestionIndex(questionIndex);
        }
      }
    };

    if (passageRef.current) {
      passageRef.current.addEventListener('click', handleBlankClick);
      return () => {
        if (passageRef.current) {
          passageRef.current.removeEventListener('click', handleBlankClick);
        }
      };
    }
  }, [allQuestions]);

  // Scroll to answer location
  const scrollToAnswer = () => {
    setHighlightAnswer(true);
    setTimeout(() => {
      if (passageRef.current) {
        const answerElement = passageRef.current.querySelector('.blank-highlight');
        if (answerElement) {
          answerElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 100);
  };

  // Calculate score
  useEffect(() => {
    let newScore = 0;
    allQuestions.forEach(({ question: q }) => {
      const answer = selectedAnswers[q.id];
      if (answer !== undefined && answer === q.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
  }, [selectedAnswers, allQuestions]);

  const percentage = Math.round((score / allQuestions.length) * 100);
  
  // Animate percentage smoothly
  useEffect(() => {
    const duration = 800; // Animation duration in ms
    const endValue = percentage;
    
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
  }, [percentage, animatedPercentage]);

  // Handle answer selection
  const handleAnswerSelect = useCallback((value: 'a' | 'b' | 'c' | 'd') => {
    if (gameOver || showReviewMode) return;
    const isCorrect = value === currentQuestion.correctAnswer;
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value
    }));
    setShowExplanation(true);
    
    // If answer is correct, automatically highlight and scroll to answer in passage
    if (isCorrect) {
      setHighlightAnswer(true);
      // Scroll to answer location after a short delay to allow DOM update
      setTimeout(() => {
        if (passageRef.current) {
          const answerElement = passageRef.current.querySelector(`[data-question-id="${currentQuestion.id}"]`);
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
    }
  }, [currentQuestion.id, currentQuestion.correctAnswer, gameOver, showReviewMode]);

  return (
    <div 
      className="bg-gradient-to-br from-gray-50 via-white to-gray-50 -m-8 p-8 pt-12 min-h-screen" 
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif' }}
    >
      {/* Banana Reward Celebration */}
      {showBananaReward && bananaReward && (
        <SuperGrandBananaCelebration
          isOpen={showBananaReward}
          onClose={() => setShowBananaReward(false)}
          course="toeic"
          lessonId="part6-test1-2025-card135-138"
          score={bananaReward.score}
          totalQuestions={bananaReward.totalQuestions}
          percentage={bananaReward.percentage}
          isNewReward={bananaReward.earned}
        />
      )}

      {/* Header - Compact Design with Integrated Banana Reward */}
      <div className="sticky top-[96px] z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200/50 shadow-sm mb-4 -mx-8 px-6 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left: Back button + Title */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              onClick={() => navigate('/toeic-part6-test1-2025')}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-all duration-200 active:scale-95 flex-shrink-0"
              title="Quay lại"
              aria-label="Quay lại"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight truncate">
                Thẻ Luyện Tập 135-138
              </h1>
              <p className="text-xs text-gray-500 truncate">
                Questions 135-138 refer to the following letter.
              </p>
            </div>
          </div>

          {/* Center: Compact Banana Progress Bar */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-50/80 via-orange-50/80 to-yellow-50/80 rounded-lg border border-yellow-200/50 flex-shrink-0">
            <span className="text-sm">🍌</span>
            <div className="flex items-center gap-1.5">
              <div className="w-20 relative">
                <div className="bg-gray-200 rounded-full h-1.5 shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                      animatedPercentage >= 80
                        ? 'bg-gradient-to-r from-orange-400 to-red-500'
                        : animatedPercentage >= 60
                        ? 'bg-gradient-to-r from-orange-300 to-red-400'
                        : 'bg-gradient-to-r from-orange-200 to-orange-400'
                    }`}
                    style={{ width: `${Math.min(animatedPercentage, 100)}%` }}
                  />
                </div>
              </div>
              <span className="text-xs font-bold text-orange-600 min-w-[35px]">{animatedPercentage}%</span>
              {animatedPercentage >= 80 ? (
                <span className="text-[10px] text-green-600 font-semibold">✓</span>
              ) : (
                <span className="text-[10px] text-gray-500">{80 - animatedPercentage}%</span>
              )}
            </div>
          </div>

          {/* Right: Score + Complete Button */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-gray-200/50 shadow-sm">
              <TrophyIcon className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-gray-900">{score}/{allQuestions.length}</span>
            </div>
            <button
              onClick={handleComplete}
              disabled={!allQuestions.every(({ question: q }) => selectedAnswers[q.id] !== undefined)}
              className="px-4 py-1.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm disabled:shadow-none whitespace-nowrap"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
            >
              Hoàn thành
            </button>
          </div>
        </div>
      </div>

        <div className="resizable-container flex gap-0">
          {/* Vocabulary Sidebar - Column 1 - Apple 2025 Style */}
          <div 
            ref={vocabSidebarRef}
            className={`${fullscreenColumn === 'vocab' ? 'fixed inset-0 z-50' : 'hidden lg:block sticky top-[200px] h-[calc(100vh-220px)]'} bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-5 pb-12 overflow-y-auto hide-scrollbar`}
            style={{ 
              fontSize: `${fontSizeVocab}%`,
              flex: fullscreenColumn ? undefined : `${colWidths.vocab} 1 0%`,
              minWidth: fullscreenColumn ? undefined : '200px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
            }}
          >
            
            {/* Matching Game Toggle */}
            <div className="mb-4 pb-4 border-b border-gray-200/50">
              <button
                onClick={() => setShowMatchingGame(!showMatchingGame)}
                className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
              >
                {showMatchingGame ? 'Ẩn Matching Game' : 'Matching Game (25 từ)'}
              </button>
            </div>
            
            <div className="space-y-2.5">
              {uniqueVocabulary.slice(0, 25).map((vocab, idx) => (
                <div
                  key={`${vocab.word}-${idx}`}
                  data-sidebar-word={vocab.word}
                  onClick={() => {
                    // When clicking word in sidebar (column 1), highlight it in passage (column 2)
                    handleVocabularyClick(vocab.word);
                  }}
                  className={`group cursor-pointer p-3.5 rounded-2xl border transition-all duration-200 active:scale-[0.98] ${
                    selectedVocabulary === vocab.word
                      ? 'bg-green-50 border-green-400 shadow-md ring-2 ring-green-300'
                      : 'border-gray-200/50 bg-white/50 hover:bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <p className="font-semibold text-gray-900 tracking-tight flex items-center gap-2.5">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                        {idx + 1}
                      </span>
                      <span>{vocab.word}</span>
                      {vocab.pos && (
                        <span className="text-xs text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded">
                          {vocab.pos}
                        </span>
                      )}
                    </p>
                    {vocab.level && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${
                        vocab.level === 'A2' ? 'bg-green-100 text-green-700 border-green-200' :
                        vocab.level === 'B1' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                        vocab.level === 'B2' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                        vocab.level === 'C1' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                        'bg-red-100 text-red-700 border-red-200'
                      }`}>
                        {vocab.level}
                      </span>
                    )}
                  </div>
                  
                  {/* IPA */}
                  {vocab.ipa && (
                    <div className="mb-1 text-xs text-gray-500 font-mono">
                      /{vocab.ipa.replace(/\//g, '')}/
                    </div>
                  )}
                  
                  {/* Vietnamese Definition */}
                  <div className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                    {vocab.meaning}
                  </div>
                  
                  {/* Synonyms */}
                  {vocab.synonyms && vocab.synonyms.length > 0 && (
                    <div className="mt-1.5 text-xs text-gray-500 italic">
                      ≈ {vocab.synonyms.slice(0, 3).join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Matching Game Modal */}
          {showMatchingGame && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">Matching Game - 25 Từ</h2>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                      Đã match: {Object.keys(matchedPairs).length} / 25
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      Điểm: {matchingGameScore} / 25
                    </span>
                    <button
                      onClick={resetMatchingGame}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Làm lại
                    </button>
                    <button
                      onClick={() => setShowMatchingGame(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <XCircleIcon className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <div 
                  ref={matchingGameScrollContainerRef}
                  className="flex-1 overflow-y-auto p-6"
                >
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left Column - Words */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-700 mb-4">Cột 1: Từ vựng</h3>
                      {matchingWords.map((item, idx) => {
                        const isMatched = matchedPairs.hasOwnProperty(item.id) && matchedPairs[item.id] !== undefined;
                        const isSelected = selectedLeft === item.id;
                        
                        return (
                          <div
                            key={item.id}
                            ref={(el) => { leftColumnRefs.current[item.id] = el; }}
                            onClick={() => !isMatched && handleLeftClick(item.id)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              isMatched
                                ? 'cursor-not-allowed'
                                : isSelected
                                ? 'bg-gray-100 border-gray-500 ring-2 ring-gray-300 cursor-pointer'
                                : 'bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50 cursor-pointer'
                            }`}
                            style={isMatched ? { 
                              backgroundColor: '#22c55e', 
                              borderColor: '#16a34a',
                              color: '#ffffff',
                              opacity: 1
                            } : {}}
                          >
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                                  isMatched ? 'bg-white text-green-600' : 'bg-gray-200 text-gray-700'
                                }`}>
                                  {idx + 1}
                                </span>
                                <span className={`font-semibold ${isMatched ? 'text-white' : 'text-gray-800'}`}>
                                  {item.word}
                                </span>
                                {item.pos && (
                                  <span className={`text-xs font-medium ${isMatched ? 'text-white/80' : 'text-gray-500'}`}>
                                    {item.pos}
                                  </span>
                                )}
                                {isMatched && (
                                  <CheckCircleIcon className="w-5 h-5 text-white ml-auto" />
                                )}
                              </div>
                              
                              {item.ipa && (
                                <div className={`ml-8 text-sm ${isMatched ? 'text-white/90' : 'text-gray-700'}`}>
                                  <span className={`mr-2 font-mono text-xs ${isMatched ? 'text-white/80' : 'text-gray-500'}`}>
                                    /{item.ipa.replace(/\//g, '')}/
                                  </span>
                                </div>
                              )}
                              
                              {isMatched && item.meaning && (
                                <div className="ml-8 text-sm text-white/90 mt-1">
                                  {item.meaning}
                                </div>
                              )}
                              
                              {item.synonyms && item.synonyms.length > 0 && (
                                <div className={`ml-8 mt-0.5 text-xs ${isMatched ? 'text-white/80' : 'text-gray-600'}`}>
                                  ≈ {item.synonyms.slice(0, 3).join(', ')}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Right Column - Definitions */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-700 mb-4">Cột 2: Định nghĩa</h3>
                      {shuffledDefinitions.map((item, idx) => {
                        const isMatched = Object.values(matchedPairs).includes(item.id);
                        const isSelected = selectedRight === item.id;
                        const isWrong = wrongMatch === item.id;
                        
                        return (
                          <div
                            key={`${item.id}-${idx}`}
                            ref={(el) => { rightColumnRefs.current[item.id] = el; }}
                            onClick={() => !isMatched && handleRightClick(item.id)}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              isMatched
                                ? 'bg-green-100 border-green-500 opacity-60 cursor-not-allowed'
                                : isWrong
                                ? 'bg-red-100 border-red-500 ring-2 ring-red-300'
                                : isSelected
                                ? 'bg-gray-100 border-gray-500 ring-2 ring-gray-300'
                                : 'bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs font-bold">
                                {idx + 1}
                              </span>
                              <span className="text-gray-700">{item.definition}</span>
                              {isMatched && (
                                <CheckCircleIcon className="w-5 h-5 text-green-600 ml-auto" />
                              )}
                              {isWrong && (
                                <XCircleIcon className="w-5 h-5 text-red-600 ml-auto" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resize Handle 1: Between Vocab and Passage - Apple 2025 Style */}
          {!fullscreenColumn && (
            <div
              className="hidden lg:flex items-center justify-center w-2 cursor-col-resize bg-gray-200/50 hover:bg-gray-300/50 transition-all duration-200 relative group"
              onMouseDown={handleMouseDown('vocab-passage')}
              style={{ userSelect: 'none' }}
            >
              <div className="absolute inset-y-0 w-0.5 bg-gray-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
              <div className="absolute top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600 text-xs font-semibold">⋮</div>
            </div>
          )}

          {/* Passage Display - Column 2 - Apple 2025 Style */}
          <div 
            ref={passageRef}
            className={`${fullscreenColumn === 'passage' ? 'fixed inset-0 z-50' : 'hidden lg:block sticky top-[200px] lg:h-[calc(100vh-220px)]'} bg-white/80 backdrop-blur-xl shadow-lg border border-gray-200/50 rounded-2xl p-6 pb-12 space-y-4 lg:overflow-y-auto overflow-x-hidden hide-scrollbar`}
            style={{ 
              fontSize: `${fontSizePassage}%`,
              flex: fullscreenColumn ? undefined : `${colWidths.passage} 1 0%`,
              minWidth: fullscreenColumn ? undefined : '300px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-4 sticky top-0 bg-white/80 backdrop-blur-sm pb-3 z-10 border-b border-gray-200/50">
              <div className="flex items-center gap-2.5">
                <DocumentTextIcon className="w-5 h-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900 tracking-tight">{selectedPassage.title}</h2>
              </div>
              {/* Passage Metadata - Apple 2025 Style */}
            {selectedPassage.metadata && (
              <div className="mb-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-200/50 whitespace-pre-line backdrop-blur-sm">
                {selectedPassage.type === 'email' && (
                  <>
                    {selectedPassage.metadata.to && (
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                        <span className="font-semibold text-gray-900">To:</span> {selectedPassage.metadata.to}
                      </p>
                    )}
                    {selectedPassage.metadata.from && (
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                        <span className="font-semibold text-gray-900">From:</span> {selectedPassage.metadata.from}
                      </p>
                    )}
                    {selectedPassage.metadata.date && (
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                        <span className="font-semibold text-gray-900">Date:</span> {selectedPassage.metadata.date}
                      </p>
                    )}
                    {selectedPassage.metadata.subject && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-900">Subject:</span> {selectedPassage.metadata.subject}
                      </p>
                    )}
                  </>
                )}
                {selectedPassage.type === 'letter' && (
                  <>
                    {selectedPassage.metadata.date && (
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                        <span className="font-semibold text-gray-900">Date:</span> {selectedPassage.metadata.date}
                      </p>
                    )}
                    {selectedPassage.metadata.to && (
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                        <span className="font-semibold text-gray-900">To:</span> {selectedPassage.metadata.to}
                      </p>
                    )}
                    {selectedPassage.metadata.from && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-900">From:</span> {selectedPassage.metadata.from}
                      </p>
                    )}
                  </>
                )}
                {selectedPassage.type === 'article' && selectedPassage.metadata.date && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-900">Date:</span> {selectedPassage.metadata.date}
                  </p>
                )}
              </div>
            )}

            {/* Passage Body - Apple 2025 Style */}
            <div 
              className="mt-4 text-sm text-gray-900 leading-relaxed whitespace-pre-wrap rounded-2xl p-5 bg-white/50 border border-gray-200/50 shadow-sm"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
              dangerouslySetInnerHTML={{ __html: highlightPassage(selectedPassage.content, highlightAnswer) }}
            />
          </div>

          {/* Resize Handle 2: Between Passage and Questions - Apple 2025 Style */}
          {!fullscreenColumn && (
            <div
              className="hidden lg:flex items-center justify-center w-2 cursor-col-resize bg-gray-200/50 hover:bg-gray-300/50 transition-all duration-200 relative group"
              onMouseDown={handleMouseDown('passage-questions')}
              style={{ userSelect: 'none' }}
            >
              <div className="absolute inset-y-0 w-0.5 bg-gray-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
              <div className="absolute top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600 text-xs font-semibold">⋮</div>
            </div>
          )}

          {/* Questions - Column 3 - Apple 2025 Style */}
          <div 
            className={`${fullscreenColumn === 'questions' ? 'fixed inset-0 z-50 overflow-y-auto' : 'hidden lg:block sticky top-[200px] h-[calc(100vh-220px)] overflow-y-auto overflow-x-hidden'} bg-white/80 backdrop-blur-xl rounded-r-2xl shadow-lg border border-gray-200/50 p-6 pb-12 space-y-1 hide-scrollbar`}
            style={{ 
              fontSize: `${fontSizeQuestions}%`,
              flex: fullscreenColumn ? undefined : `${colWidths.questions} 1 0%`,
              minWidth: fullscreenColumn ? undefined : '300px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
            }}
          >
            <div className="flex items-center justify-between mb-4 sticky top-0 bg-white/80 backdrop-blur-sm pb-3 z-10 border-b border-gray-200/50">
              <div className="flex items-center gap-2.5">
                <LightBulbIcon className="w-5 h-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Questions</h2>
                <div className="text-sm text-gray-500 font-medium">
                  {currentQuestionIndex + 1} / {allQuestions.length}
                </div>
              </div>
              
            </div>

            {/* Answer Location Toggle - Apple 2025 Style */}
            <div className="mb-4 flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-200/50 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-gray-700" />
                <div>
                  <span className="text-sm font-semibold text-gray-900 block tracking-tight">Định vị đáp án</span>
                  <span className="text-xs text-gray-500 mt-0.5">Bật để highlight vị trí đáp án trong passage</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setHighlightAnswer(!highlightAnswer);
                  if (!highlightAnswer) {
                    scrollToAnswer();
                  }
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ${
                  highlightAnswer ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
                    highlightAnswer ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Question - Apple 2025 Style */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white text-sm font-semibold shadow-sm">
                  {currentQuestion.id}
                </span>
                <p className="text-lg font-semibold text-gray-900 tracking-tight">
                  Question {currentQuestion.id}
                </p>
              </div>
            </div>

            {/* Answer Options - Apple 2025 Style */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = selectedAnswer === option.value;
                const isCorrectOption = option.value === currentQuestion.correctAnswer;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleAnswerSelect(option.value)}
                    disabled={gameOver || showReviewMode}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 active:scale-[0.98] ${
                      isSelected && isCorrectOption
                        ? 'bg-green-50/50 border-green-500/50 ring-2 ring-green-200/50 shadow-sm'
                        : isSelected && !isCorrectOption
                        ? 'bg-red-50/50 border-red-500/50 ring-2 ring-red-200/50 shadow-sm'
                        : isAnswered && isCorrectOption
                        ? 'bg-green-50/30 border-green-300/50'
                        : 'bg-white/50 border-gray-200/50 hover:border-gray-300 hover:bg-white hover:shadow-sm'
                    } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-semibold text-base tracking-tight ${
                        isSelected && isCorrectOption ? 'text-green-700' :
                        isSelected && !isCorrectOption ? 'text-red-700' :
                        isAnswered && isCorrectOption ? 'text-green-600' :
                        'text-gray-700'
                      }`}>
                        {option.value.toUpperCase()}
                      </span>
                      <div className="flex-1">
                        <p className={`font-medium leading-relaxed ${
                          isSelected && isCorrectOption ? 'text-green-900' :
                          isSelected && !isCorrectOption ? 'text-red-900' :
                          isAnswered && isCorrectOption ? 'text-green-800' :
                          'text-gray-900'
                        }`}>
                          {option.text}
                        </p>
                      </div>
                      {isAnswered && (
                        <>
                          {isCorrectOption && (
                            <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                          )}
                          {isSelected && !isCorrectOption && (
                            <XCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                          )}
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation - Apple 2025 Style */}
            {showExplanation && isAnswered && (
              <div className="mt-4 space-y-4">
                {/* Explanation for selected option */}
                {selectedAnswer !== undefined && currentQuestion.options.find(opt => opt.value === selectedAnswer)?.explanation_vi && (
                  <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-200/50 backdrop-blur-sm">
                    <p className="text-sm font-semibold text-blue-900 mb-2 tracking-tight">Giải thích cho đáp án đã chọn:</p>
                    <p className="text-sm text-blue-700 leading-relaxed italic">
                      {currentQuestion.options.find(opt => opt.value === selectedAnswer)?.explanation_vi}
                    </p>
                  </div>
                )}

                {/* Correct Answer Highlight */}
                {selectedAnswer !== undefined && (
                  <div className={`p-4 rounded-2xl border backdrop-blur-sm ${
                    isCorrect 
                      ? 'bg-green-50/50 border-green-200/50' 
                      : 'bg-red-50/50 border-red-200/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {isCorrect ? (
                        <>
                          <CheckCircleIcon className="w-5 h-5 text-green-600" />
                          <p className="text-sm font-semibold text-green-900 tracking-tight">Đáp án đúng!</p>
                        </>
                      ) : (
                        <>
                          <XCircleIcon className="w-5 h-5 text-red-600" />
                          <p className="text-sm font-semibold text-red-900 tracking-tight">Đáp án sai</p>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-semibold">Đáp án đúng:</span>{' '}
                      <span className="font-bold text-green-700">
                        {currentQuestion.options.find(opt => opt.value === currentQuestion.correctAnswer)?.value.toUpperCase()}
                      </span>
                      {' - '}
                      {currentQuestion.options.find(opt => opt.value === currentQuestion.correctAnswer)?.text}
                    </p>
                    {currentQuestion.options.find(opt => opt.value === currentQuestion.correctAnswer)?.text_vi && (
                      <p className="text-sm text-gray-600 italic mb-2">
                        {currentQuestion.options.find(opt => opt.value === currentQuestion.correctAnswer)?.text_vi}
                      </p>
                    )}
                    {currentQuestion.explanation_vi && (
                      <p className="text-sm text-gray-700 leading-relaxed italic mt-1">
                        <span className="font-semibold">Giải thích:</span> {currentQuestion.explanation_vi}
                      </p>
                    )}
                  </div>
                )}

              </div>
            )}

            {/* Navigation - Apple 2025 Style */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200/50">
              <button
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm disabled:shadow-none"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentQuestionIndex(Math.min(allQuestions.length - 1, currentQuestionIndex + 1))}
                disabled={currentQuestionIndex === allQuestions.length - 1}
                className="px-5 py-2.5 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm disabled:shadow-none"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TOEICPart6Test1_2025_Card135_138;

