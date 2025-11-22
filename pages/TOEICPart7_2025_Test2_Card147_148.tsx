import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DocumentTextIcon,
  LightBulbIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
  InformationCircleIcon,
  MapPinIcon,
  TrophyIcon,
  ChartBarIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  PlusIcon,
  MinusIcon,
  EnvelopeIcon,
  UserIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { passage1_Test2 } from '../data/toeic-part7-2025-test2-card147-148-data';
import { EmailReadingData } from '../data/toeic-part7-email-data';
import { BananaRewardService } from '../services/bananaRewardService';
import SuperGrandBananaCelebration from '../components/SuperGrandBananaCelebration';
import { useAuth } from '../contexts/AuthContext';
import { addBananasForUser } from '../services/userService';

const TOEICPart7_2025_Test2_Card147_148: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useAuth();
  
  // Use passage1_Test2 (questions 147-148)
  const selectedPassage = passage1_Test2;
  
  // Collect questions from passage1_Test2 only
  const allQuestions = useMemo(() => {
    if (!selectedPassage) return [];
    const questions: Array<{ question: any; passage: EmailReadingData; questionIndex: number; passageIndex: number }> = [];
    selectedPassage.questions.forEach((q, qIdx) => {
      questions.push({ question: q, passage: selectedPassage, questionIndex: qIdx, passageIndex: 0 });
    });
    return questions;
  }, [selectedPassage]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestionData = allQuestions[currentQuestionIndex];
  
  if (!selectedPassage || !currentQuestionData || allQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No passage data available.</p>
          <button
            onClick={() => navigate('/toeic-part7-2025-test-2')}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Quay lại Test 2
          </button>
        </div>
      </div>
    );
  }
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [showSentenceAnalysis, setShowSentenceAnalysis] = useState(false);
  const [selectedVocabulary, setSelectedVocabulary] = useState<string | null>(null);
  const [highlightAnswer, setHighlightAnswer] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showParaphrase, setShowParaphrase] = useState(false);
  const [showVocabularyList, setShowVocabularyList] = useState(false);
  const [showAnswerTips, setShowAnswerTips] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showReviewMode, setShowReviewMode] = useState(false);
  const [showMatchingGame, setShowMatchingGame] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [wrongMatch, setWrongMatch] = useState<string | null>(null);
  const [matchingGameScore, setMatchingGameScore] = useState(0);
  const [showBananaReward, setShowBananaReward] = useState(false);
  const [bananaReward, setBananaReward] = useState<{ courseId: string; lessonId: string; earned: boolean; earnedAt: string; score: number; totalQuestions: number; percentage: number } | null>(null);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const startValueRef = useRef(0);
  const [showTranslationModal, setShowTranslationModal] = useState(false);
  const [isResizing, setIsResizing] = useState<'vocab-passage' | 'passage-questions' | null>(null);
  const leftColumnRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rightColumnRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const matchingGameScrollContainerRef = useRef<HTMLDivElement | null>(null);
  const leftColumnContainerRef = useRef<HTMLDivElement | null>(null);
  
  const passageRef = useRef<HTMLDivElement>(null);
  const vocabSidebarRef = useRef<HTMLDivElement>(null);
  const answerLocationRef = useRef<HTMLDivElement>(null);
  const translationRef = useRef<HTMLDivElement>(null);
  
  // Fullscreen and font size states
  const [fullscreenColumn, setFullscreenColumn] = useState<'vocab' | 'passage' | 'questions' | null>(null);
  const [fontSizeVocab, setFontSizeVocab] = useState(100);
  const [fontSizePassage, setFontSizePassage] = useState(100);
  const [fontSizeQuestions, setFontSizeQuestions] = useState(100);
  
  // Resizable columns state
  const [colWidths, setColWidths] = useState({ vocab: 1, passage: 2, questions: 2 });

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
        // Adjust vocab and passage widths
        const newVocabWidth = Math.max(0.5, Math.min(2, percentage * 5)); // 10% - 40%
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
        // Adjust passage and questions widths
        const vocabPlusPassageWidth = (colWidths.vocab + colWidths.passage) / 5;
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
  const isCorrect = selectedAnswer !== undefined && currentQuestion.options[selectedAnswer].correct;

  // Deduplicate vocabulary - Clean implementation
  const uniqueVocabulary = useMemo(() => {
    const seen = new Set<string>();
    const result: Array<{
      word: string;
      definition: string;
      definition_vi: string;
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
        const vocabItem = v as any;
        result.push({
          word: v.word,
          definition: v.definition,
          definition_vi: v.definition_vi,
          location: v.location,
          level: v.level,
          pos: v.pos,
          ipa: v.ipa,
          synonyms: Array.isArray(vocabItem.synonyms) ? vocabItem.synonyms : []
        });
      }
    });
    
    return result;
  }, [selectedPassage]);

  // Highlight vocabulary and answer phrases
  const highlightVocabulary = (text: string, highlightAnswers: boolean = false) => {
    // First, clean markdown formatting
    let highlighted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    highlighted = highlighted.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');

    // Highlight answer phrases
    if (highlightAnswers && currentQuestion.comparison) {
      const phrases = currentQuestion.comparison.emailPhrases || [];
      const colorClass: Record<string, string> = {
        green: 'bg-green-200 border-green-500',
        orange: 'bg-orange-200 border-orange-500',
        blue: 'bg-blue-200 border-blue-500',
        purple: 'bg-purple-200 border-purple-500',
        red: 'bg-red-200 border-red-500'
      };
      phrases.forEach(p => {
        const cleanPhraseText = p.text.replace(/\*\*/g, ''); // Clean markdown from phrase
        const escaped = cleanPhraseText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, 'gi');
        highlighted = highlighted.replace(regex, (match) => {
          const cls = p.color ? colorClass[p.color] : 'bg-yellow-300 border-yellow-500';
          return `<span class="answer-highlight ${cls} font-semibold px-1 rounded border-2">${match}</span>`;
        });
      });
    }

    // Highlight vocabulary words
    const vocabToProcess = highlightAnswers
      ? uniqueVocabulary.filter(v => v.word === selectedVocabulary)
      : uniqueVocabulary;

    vocabToProcess.forEach(vocab => {
      const escapedWord = vocab.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
      const isSelected = selectedVocabulary === vocab.word;
      highlighted = highlighted.replace(regex, (match) => {
        if (isSelected) {
          return `<span class="vocab-word cursor-pointer text-white font-bold underline decoration-2 decoration-white bg-blue-600 px-1.5 py-0.5 rounded shadow-lg border-2 border-blue-700" data-word="${vocab.word}" style="opacity: 1 !important; filter: none !important;">${match}</span>`;
        }
        return `<span class="vocab-word cursor-pointer text-blue-600 font-semibold underline decoration-2 decoration-blue-400 hover:bg-blue-100 px-1 rounded" data-word="${vocab.word}">${match}</span>`;
      });
    });

    return highlighted;
  };

  const handleVocabularyClick = (word: string) => {
    setSelectedVocabulary(selectedVocabulary === word ? null : word);
  };

  // Strict phrase match helpers for Comparison (no cheating)
  const passagePlainText = useMemo(() => (selectedPassage.email?.body || '').toLowerCase(), [selectedPassage]);

  const phraseExistsInPassage = useCallback((phrase: string): boolean => {
    if (!phrase) return false;
    return passagePlainText.includes(phrase.toLowerCase());
  }, [passagePlainText]);

  const clearComparisonHighlights = useCallback(() => {
    if (!passageRef.current) return;
    const marks = passageRef.current.querySelectorAll('.comparison-highlight');
    marks.forEach(mark => {
      const parent = mark.parentNode;
      while (mark.firstChild) parent?.insertBefore(mark.firstChild, mark);
      parent?.removeChild(mark);
    });
  }, []);

  const highlightPassagePhraseOnce = useCallback((phrase: string) => {
    if (!passageRef.current || !phrase) return false;
    clearComparisonHighlights();
    const root = passageRef.current;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const target = phrase.toLowerCase();
    let node = walker.nextNode();
    while (node) {
      const text = (node.nodeValue || '').toLowerCase();
      const idx = text.indexOf(target);
      if (idx >= 0) {
        try {
          const range = document.createRange();
          range.setStart(node, idx);
          range.setEnd(node, idx + phrase.length);
          const span = document.createElement('span');
          span.className = 'comparison-highlight bg-amber-200 font-semibold px-1 rounded border border-amber-400';
          range.surroundContents(span);
          span.scrollIntoView({ behavior: 'smooth', block: 'center' });
          span.classList.add('animate-pulse');
          setTimeout(() => span.classList.remove('animate-pulse'), 1500);
          return true;
        } catch (_) {
          // If range.surroundContents fails due to partial node split, skip
        }
      }
      node = walker.nextNode();
    }
    return false;
  }, [clearComparisonHighlights]);

  const getAnswerPhrasesFromComparison = useCallback(() => {
    if (!currentQuestion.comparison) return [];
    if (currentQuestion.comparison.phraseComparisons && currentQuestion.comparison.phraseComparisons.length > 0) {
      return currentQuestion.comparison.phraseComparisons.map(pc => ({
        text: pc.emailPhrase,
        color: pc.color || 'yellow'
      }));
    }
    return currentQuestion.comparison.emailPhrases || [];
  }, [currentQuestion]);

  // Highlight ALL comparison phrases at once (for the current question)
  const highlightAllComparisonPhrases = useCallback(() => {
    if (!passageRef.current) return false;
    clearComparisonHighlights();
    const phrases = getAnswerPhrasesFromComparison().map(p => p.text).filter(Boolean);
    if (phrases.length === 0) return false;

    const root = passageRef.current;
    const highlightFirstMatch = (phrase: string) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const target = phrase.toLowerCase();
      let node = walker.nextNode();
      while (node) {
        const text = (node.nodeValue || '').toLowerCase();
        const idx = text.indexOf(target);
        if (idx >= 0) {
          try {
            const range = document.createRange();
            range.setStart(node, idx);
            range.setEnd(node, idx + phrase.length);
            const span = document.createElement('span');
            span.className = 'comparison-highlight bg-amber-200 font-semibold px-1 rounded border border-amber-400';
            range.surroundContents(span);
            return span as HTMLElement;
          } catch (_) {
            return null;
          }
        }
        node = walker.nextNode();
      }
      return null;
    };

    const created: HTMLElement[] = [];
    phrases.forEach(p => {
      const el = highlightFirstMatch(p);
      if (el) created.push(el);
    });

    if (created.length > 0) {
      created[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      created[0].classList.add('animate-pulse');
      setTimeout(() => created[0].classList.remove('animate-pulse'), 1500);
      return true;
    }
    return false;
  }, [clearComparisonHighlights, getAnswerPhrasesFromComparison]);

  // Scroll to answer location
  const scrollToAnswer = () => {
    setHighlightAnswer(true);
    setTimeout(() => {
      if (!highlightAllComparisonPhrases()) {
        if (passageRef.current) {
          const answerElement = passageRef.current.querySelector('.answer-highlight');
          if (answerElement) {
            answerElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    }, 100);
  };

  // Handle complete test
  const handleComplete = useCallback(async () => {
    setGameOver(true);
    
    // Calculate score directly from selectedAnswers
    let currentScore = 0;
    allQuestions.forEach(({ question: q }) => {
      const answer = selectedAnswers[q.id];
      if (answer !== undefined && q.options[answer].correct) {
        currentScore++;
      }
    });
    
    const percentage = Math.round((currentScore / allQuestions.length) * 100);
    const earned = BananaRewardService.checkBananaReward('toeic', 'part7-2025-test2-card147-148', currentScore, allQuestions.length);
    
    if (earned && percentage >= 80) {
      // Add banana to user balance if logged in
      if (currentUser) {
        try {
          const updatedUser = await addBananasForUser(currentUser.id, 1, undefined, undefined, currentUser);
          if (updatedUser) {
            updateUser(updatedUser);
          }
        } catch (error) {
          console.error('Failed to add banana to user balance:', error);
        }
      }
      setBananaReward({ 
        courseId: 'toeic', 
        lessonId: 'part7-2025-test2-card147-148', 
        earned: true, 
        earnedAt: new Date().toISOString(), 
        score: currentScore, 
        totalQuestions: allQuestions.length, 
        percentage 
      });
      setShowBananaReward(true);
    }
  }, [selectedAnswers, allQuestions.length, currentUser, updateUser]);

  // Matching game logic - Clean implementation
  const matchingWords = useMemo(() => {
    return uniqueVocabulary.slice(0, 20).map((v) => ({
      word: v.word,
      definition: v.definition_vi || v.definition || '',
      id: v.word.toLowerCase(),
      synonyms: v.synonyms || [],
      pos: v.pos || '',
      ipa: v.ipa || '',
      definition_vi: v.definition_vi || ''
    }));
  }, [uniqueVocabulary]);

  const shuffledDefinitions = useMemo(() => {
    return [...matchingWords]
      .sort(() => Math.random() - 0.5)
      .map(v => ({
        word: v.word,
        definition: v.definition,
        id: v.id,
        synonyms: v.synonyms || [] // Preserve synonyms
      }));
  }, [matchingWords]);

  const handleLeftClick = (wordId: string) => {
    if (matchedPairs[wordId]) return; // Already matched
    
    // Scroll to corresponding definition in right column
    const rightDefElement = rightColumnRefs.current[wordId];
    const scrollContainer = matchingGameScrollContainerRef.current;
    
    if (rightDefElement && scrollContainer) {
      // Calculate scroll position relative to scroll container
      const containerRect = scrollContainer.getBoundingClientRect();
      const elementRect = rightDefElement.getBoundingClientRect();
      const scrollTop = scrollContainer.scrollTop;
      const elementTop = elementRect.top - containerRect.top + scrollTop;
      const centerPosition = elementTop - (containerRect.height / 2) + (elementRect.height / 2);
      
      // Smooth scroll
      scrollContainer.scrollTo({
        top: Math.max(0, centerPosition),
        behavior: 'smooth'
      });
    } else if (rightDefElement) {
      // Fallback to scrollIntoView
      setTimeout(() => {
        rightDefElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      }, 50);
    }
    
    if (selectedLeft === wordId) {
      setSelectedLeft(null);
    } else if (selectedRight) {
      // Try to match
      const leftWord = matchingWords.find(w => w.id === wordId);
      const rightWord = shuffledDefinitions.find(w => w.id === selectedRight);
      
      if (leftWord && rightWord && leftWord.id === rightWord.id) {
        // Correct match
        setMatchedPairs(prev => ({ ...prev, [wordId]: selectedRight }));
        setMatchingGameScore(prev => prev + 1); // Tăng điểm khi match đúng
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        // Wrong match
        setSelectedLeft(wordId);
        setSelectedRight(null);
      }
    } else {
      setSelectedLeft(wordId);
    }
  };

  const handleRightClick = (wordId: string) => {
    if (Object.values(matchedPairs).includes(wordId)) return; // Already matched
    
    // Scroll to corresponding word in left column
    const leftWordElement = leftColumnRefs.current[wordId];
    const scrollContainer = matchingGameScrollContainerRef.current;
    
    if (leftWordElement && scrollContainer) {
      // Calculate scroll position relative to scroll container
      const containerRect = scrollContainer.getBoundingClientRect();
      const elementRect = leftWordElement.getBoundingClientRect();
      const scrollTop = scrollContainer.scrollTop;
      const elementTop = elementRect.top - containerRect.top + scrollTop;
      const centerPosition = elementTop - (containerRect.height / 2) + (elementRect.height / 2);
      
      // Smooth scroll
      scrollContainer.scrollTo({
        top: Math.max(0, centerPosition),
        behavior: 'smooth'
      });
    } else if (leftWordElement) {
      // Fallback to scrollIntoView
      setTimeout(() => {
        leftWordElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      }, 50);
    }
    
    if (selectedRight === wordId) {
      setSelectedRight(null);
    } else if (selectedLeft) {
      // Try to match
      const leftWord = matchingWords.find(w => w.id === selectedLeft);
      const rightWord = shuffledDefinitions.find(w => w.id === wordId);
      
      if (leftWord && rightWord && leftWord.id === rightWord.id) {
        // Correct match
        setMatchedPairs(prev => ({ ...prev, [selectedLeft]: wordId }));
        setMatchingGameScore(prev => prev + 1); // Tăng điểm khi match đúng
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongMatch(null);
      } else {
        // Wrong match - show red color
        setSelectedRight(wordId);
        setSelectedLeft(null);
        setWrongMatch(wordId);
        // Clear wrong match after 1 second
        setTimeout(() => setWrongMatch(null), 1000);
      }
    } else {
      setSelectedRight(wordId);
    }
  };

  const resetMatchingGame = () => {
    setMatchedPairs({});
    setMatchingGameScore(0); // Reset điểm khi làm lại
    setSelectedLeft(null);
    setSelectedRight(null);
    setWrongMatch(null);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: optionIndex
    });
    setShowExplanation(true);
  };

  // Update passage content when vocabulary or answer highlighting changes
  useEffect(() => {
    const passageElement = document.querySelector('[data-passage-body]') as HTMLElement;
    if (passageElement) {
      passageElement.innerHTML = highlightVocabulary(selectedPassage.email?.body || '', highlightAnswer);
      
      const vocabWords = passageElement.querySelectorAll('.vocab-word');
      vocabWords.forEach(word => {
        word.addEventListener('click', (e) => {
          e.stopPropagation();
          const wordText = (e.target as HTMLElement).getAttribute('data-word');
          if (wordText) {
            handleVocabularyClick(wordText);
          }
        });
      });
    }

    // Scroll to and highlight selected vocabulary word in Passage (middle column)
    if (selectedVocabulary) {
      setTimeout(() => {
        const passageElement = document.querySelector('[data-passage-body]') as HTMLElement;
        const targetWords = passageElement?.querySelectorAll(`[data-word="${selectedVocabulary}"]`);
        if (targetWords && targetWords.length > 0) {
          const firstWord = targetWords[0] as HTMLElement;
          firstWord.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Remove any blur/opacity effects and ensure clear visibility
          firstWord.style.opacity = '1';
          firstWord.style.filter = 'none';
          firstWord.style.backdropFilter = 'none';
          firstWord.classList.add('ring-2', 'ring-blue-600', 'shadow-lg');
          setTimeout(() => {
            firstWord.classList.remove('ring-2', 'ring-blue-600', 'shadow-lg');
          }, 2000);
        }
      }, 100);
    }

    // Scroll corresponding item into view in the Vocabulary Sidebar (left column)
    if (vocabSidebarRef.current && selectedVocabulary) {
      const container = vocabSidebarRef.current;
      const item = container.querySelector(`[data-sidebar-word="${selectedVocabulary}"]`) as HTMLElement | null;
      if (item) {
        const scrollTop = item.offsetTop - container.clientHeight / 2 + item.clientHeight / 2;
        container.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' });
        item.classList.add('bg-blue-50');
        setTimeout(() => {
          item.classList.remove('bg-blue-50');
        }, 1200);
      }
    }
  }, [selectedPassage, selectedVocabulary, highlightAnswer, currentQuestion, handleVocabularyClick]);

  // Calculate score
  useEffect(() => {
    let newScore = 0;
    allQuestions.forEach(({ question: q }) => {
      const answer = selectedAnswers[q.id];
      if (answer !== undefined && q.options[answer].correct) {
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
  
  // Check if user has already earned reward for this lesson
  const hasEarnedReward = BananaRewardService.hasEarnedReward('toeic', 'part7-2025-test2-card147-148');

  const selectedVocab = uniqueVocabulary.find(v => v.word === selectedVocabulary);

  // Game Over / Review Mode
  if (gameOver || showReviewMode) {
    // Calculate accuracy by question type
    const accuracyByType: { [key: string]: { correct: number; total: number } } = {};
    allQuestions.forEach(({ question: q }) => {
      const answer = selectedAnswers[q.id];
      if (answer !== undefined) {
        if (!accuracyByType[q.questionType || 'general']) {
          accuracyByType[q.questionType || 'general'] = { correct: 0, total: 0 };
        }
        accuracyByType[q.questionType || 'general'].total++;
        if (q.options[answer].correct) {
          accuracyByType[q.questionType || 'general'].correct++;
        }
      }
    });

    return (
      <>
        <SuperGrandBananaCelebration
          isOpen={showBananaReward}
          onClose={() => { setShowBananaReward(false); setBananaReward(null); }}
          course="toeic"
          lessonId="part7-2025-test1"
          score={bananaReward?.score || score}
          totalQuestions={bananaReward?.totalQuestions || allQuestions.length}
          percentage={bananaReward?.percentage || percentage}
        />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/toeic-part7-2025-test-2')}
                className="p-2 hover:bg-white rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Review Results
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Xem lại tất cả câu hỏi và đáp án
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedAnswers({});
                setCurrentQuestionIndex(0);
                setScore(0);
                setGameOver(false);
                setShowReviewMode(false);
              }}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Làm lại bài
            </button>
          </div>

          {/* Review Questions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tất cả câu hỏi</h2>
            <div className="space-y-6">
              {allQuestions.map(({ question: q }, idx) => {
                const userAnswer = selectedAnswers[q.id];
                const correctAnswerIndex = q.options.findIndex(o => o.correct);
                const isCorrectAnswer = userAnswer !== undefined && q.options[userAnswer].correct;
                
                return (
                  <div key={q.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        isCorrectAnswer ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {q.id}
                      </span>
                      {isCorrectAnswer ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircleIcon className="w-5 h-5 text-red-600" />
                      )}
                      <p className="text-lg font-semibold text-gray-800">{q.question}</p>
                    </div>
                    <p className="text-sm text-gray-600 italic mb-4">{q.question_vi}</p>
                    
                    <div className="space-y-2">
                      {q.options.map((option, optIdx) => {
                        const isUserChoice = userAnswer === optIdx;
                        const isCorrectOption = option.correct;
                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-lg border-2 ${
                              isCorrectOption
                                ? 'bg-green-50 border-green-500'
                                : isUserChoice && !isCorrectOption
                                ? 'bg-red-50 border-red-500'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${isCorrectOption ? 'text-green-700' : isUserChoice ? 'text-red-700' : 'text-gray-700'}`}>
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span className={isCorrectOption ? 'text-green-800 font-semibold' : isUserChoice ? 'text-red-800' : 'text-gray-700'}>
                                {option.text}
                              </span>
                              {isCorrectOption && (
                                <CheckCircleIcon className="w-5 h-5 text-green-600 ml-auto" />
                              )}
                              {isUserChoice && !isCorrectOption && (
                                <XCircleIcon className="w-5 h-5 text-red-600 ml-auto" />
                              )}
                            </div>
                            {option.text_vi && (
                              <p className="text-sm text-gray-600 italic mt-1 ml-6">{option.text_vi}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    
                    {userAnswer !== undefined && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-semibold text-blue-800 mb-1">Giải thích:</p>
                        <p className="text-sm text-blue-700">{q.options[userAnswer].explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="w-full">
                {/* Banana Reward Progress Bar */}
        <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50 rounded-xl shadow-lg border border-yellow-300/50 p-2 mb-2 mx-4 mt-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1.5">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-base">🍌</span>
                <span className="text-xs font-semibold text-gray-700">
                  Phần thưởng Chuối
                </span>
                {hasEarnedReward && (
                  <span className="inline-flex items-center px-1 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-300">
                    ✅ Đã nhận thưởng
                  </span>
                )}
                {!hasEarnedReward && animatedPercentage >= 80 && (
                  <span className="inline-flex items-center px-1 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-300">
                    🎁 Chưa nhận thưởng
                  </span>
                )}
                <div className="flex items-center gap-0.5 ml-auto">
                  <span className="text-yellow-600 font-semibold">💡</span>
                  <span className="text-[10px] text-gray-600">Hãy làm đúng 80% để nhận thưởng chuối!</span>
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
        
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4 px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/toeic-part7-2025-test-2')}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Thẻ Luyện Tập 147-148 (Test 2)
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Questions 147-148 refer to the following brochure.
              </p>
            </div>
          </div>
          
          {/* Score */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
              <TrophyIcon className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-green-600 font-semibold">Score</p>
                <p className="text-lg font-bold text-green-700">{score}/{allQuestions.length}</p>
              </div>
            </div>
            <button
              onClick={() => {
                const allAnswered = allQuestions.every(({ question: q }) => selectedAnswers[q.id] !== undefined);
                if (allAnswered) {
                  handleComplete();
                }
              }}
              disabled={!allQuestions.every(q => selectedAnswers[q.question.id] !== undefined)}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Hoàn thành bài làm
            </button>
          </div>
        </div>

        <div className="resizable-container flex gap-0 px-4 pb-6">
          {/* Vocabulary Sidebar */}
          <div 
            ref={vocabSidebarRef}
            className={`${fullscreenColumn === 'vocab' ? 'fixed inset-0 z-50' : 'hidden lg:block sticky top-24 h-[calc(100vh-140px)]'} bg-white rounded-l-xl shadow-lg p-4 pb-0 overflow-y-auto`}
            style={{ 
              fontSize: `${fontSizeVocab}%`,
              flex: fullscreenColumn ? undefined : `${colWidths.vocab} 1 0%`,
              minWidth: fullscreenColumn ? undefined : '200px'
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-3 sticky top-0 bg-white pb-2 z-10">
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5 text-violet-600" />
                <h3 className="text-lg font-bold text-gray-800">Vocabulary</h3>
              </div>
              <div className="flex items-center gap-0.5 bg-gray-50 rounded-lg p-0.5">
                <button
                  onClick={() => setFontSizeVocab(Math.max(50, fontSizeVocab - 10))}
                  className="p-1 hover:bg-white rounded transition-colors border border-gray-300 bg-white shadow-sm"
                >
                  <MinusIcon className="w-3 h-3 text-gray-700" />
                </button>
                <select
                  value={fontSizeVocab}
                  onChange={(e) => setFontSizeVocab(Number(e.target.value))}
                  className="text-xs text-gray-700 font-semibold px-1.5 py-0.5 border border-gray-300 rounded bg-white"
                >
                  <option value={100}>100%</option>
                  <option value={125}>125%</option>
                  <option value={150}>150%</option>
                  <option value={200}>200%</option>
                </select>
                <button
                  onClick={() => setFontSizeVocab(Math.min(1000, fontSizeVocab + 10))}
                  className="p-1 hover:bg-white rounded transition-colors border border-gray-300 bg-white shadow-sm"
                >
                  <PlusIcon className="w-3 h-3 text-gray-700" />
                </button>
              </div>
            </div>
            
            {/* Matching Game Toggle - Moved to top */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <button
                onClick={() => setShowMatchingGame(!showMatchingGame)}
                className="w-full px-4 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-600 hover:to-purple-700 transition-colors shadow-md hover:shadow-lg"
              >
                {showMatchingGame ? 'Ẩn Matching Game' : 'Matching Game (20 từ)'}
              </button>
            </div>
            
            <div className="space-y-2">
              {uniqueVocabulary
                .slice()
                .sort((a, b) => a.word.localeCompare(b.word))
                .map((vocab, idx) => {
                  const isSelected = selectedVocabulary === vocab.word;
                  const vocabWithSynonyms = vocab as any;
                  const synonyms = vocabWithSynonyms.synonyms || [];
                  
                  return (
                    <div
                      key={`${vocab.word}-${idx}`}
                      onClick={() => handleVocabularyClick(vocab.word)}
                      data-sidebar-word={vocab.word}
                      className={`group cursor-pointer p-3 rounded-lg border ${isSelected ? 'border-violet-400 ring-2 ring-violet-200' : 'border-gray-200'} hover:bg-violet-50`}
                    >
                      {/* SST + English + Part of Speech */}
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-gray-800 flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs font-bold">
                            {idx + 1}
                          </span>
                          {vocab.word}
                          {vocab.pos && (
                            <span className="ml-2 text-xs text-gray-500 font-medium">{vocab.pos}</span>
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
                      
                      {/* IPA + Vietnamese */}
                      {(vocab.ipa || vocab.definition_vi) && (
                        <div className="mt-1 text-sm text-gray-700">
                          {vocab.ipa && (
                            <span className="mr-2 text-gray-500 font-mono">/{vocab.ipa.replace(/\//g, '')}/</span>
                          )}
                          {vocab.definition_vi}
                        </div>
                      )}
                      
                      {/* Synonyms */}
                      {Array.isArray(synonyms) && synonyms.length > 0 && (
                        <div className="mt-1 text-xs text-gray-600">
                          ≈ {synonyms.slice(0, 3).join(', ')}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Matching Game Modal */}
          {showMatchingGame && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">Matching Game - 20 Từ</h2>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                      Đã match: {Object.keys(matchedPairs).length} / 20
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      Điểm: {matchingGameScore} / 20
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
                      <h3 className="text-lg font-bold text-violet-700 mb-4">Cột 1: Từ vựng</h3>
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
                                ? 'bg-violet-100 border-violet-500 ring-2 ring-violet-300 cursor-pointer'
                                : 'bg-white border-gray-300 hover:border-violet-400 hover:bg-violet-50 cursor-pointer'
                            }`}
                            style={isMatched ? { 
                              backgroundColor: '#22c55e', 
                              borderColor: '#16a34a',
                              color: '#ffffff',
                              opacity: 1
                            } : {}}
                          >
                            <div className="flex flex-col gap-1.5">
                              {/* SST + English + Part of Speech */}
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
                              
                              {/* IPA - Always show */}
                              {item.ipa && (
                                <div className={`ml-8 text-sm ${isMatched ? 'text-white/90' : 'text-gray-700'}`}>
                                  <span className={`mr-2 font-mono text-xs ${isMatched ? 'text-white/80' : 'text-gray-500'}`}>
                                    /{item.ipa.replace(/\//g, '')}/
                                  </span>
                                </div>
                              )}
                              
                              {/* Vietnamese Definition - Only show when matched */}
                              {isMatched && item.definition_vi && (
                                <div className="ml-8 text-sm text-white/90 mt-1">
                                  {item.definition_vi}
                                </div>
                              )}
                              
                              {/* Synonyms - Always show if exists */}
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
                      <h3 className="text-lg font-bold text-purple-700 mb-4">Cột 2: Định nghĩa</h3>
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
                                ? 'bg-purple-100 border-purple-500 ring-2 ring-purple-300'
                                : 'bg-white border-gray-300 hover:border-purple-400 hover:bg-purple-50'
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

          {/* Resize Handle 1: Between Vocab and Passage */}
          {!fullscreenColumn && (
            <div
              className="hidden lg:flex items-center justify-center w-2 cursor-col-resize bg-gray-200 hover:bg-violet-400 transition-colors relative group"
              onMouseDown={handleMouseDown('vocab-passage')}
              style={{ userSelect: 'none' }}
            >
              <div className="absolute inset-y-0 w-1 bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-violet-700 text-xs font-bold">⋮</div>
            </div>
          )}

          {/* Passage Display - Column 2 */}
          <div 
            className={`${fullscreenColumn === 'passage' ? 'fixed inset-0 z-50' : 'lg:h-[calc(100vh-140px)]'} bg-white shadow-lg p-6 pb-0 space-y-4 lg:overflow-y-auto`}
            style={{ 
              fontSize: `${fontSizePassage}%`,
              flex: fullscreenColumn ? undefined : `${colWidths.passage} 1 0%`,
              minWidth: fullscreenColumn ? undefined : '300px'
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-4 sticky top-0 bg-white pb-2 z-10">
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="w-6 h-6 text-violet-600" />
                <h2 className="text-xl font-bold text-gray-800">Deftlee</h2>
              </div>
              <div className="flex items-center gap-0.5 bg-gray-50 rounded-lg p-0.5">
                <button
                  onClick={() => setFontSizePassage(Math.max(50, fontSizePassage - 10))}
                  className="p-1 hover:bg-white rounded transition-colors border border-gray-300 bg-white shadow-sm"
                >
                  <MinusIcon className="w-3 h-3 text-gray-700" />
                </button>
                <select
                  value={fontSizePassage}
                  onChange={(e) => setFontSizePassage(Number(e.target.value))}
                  className="text-xs text-gray-700 font-semibold px-1.5 py-0.5 border border-gray-300 rounded bg-white"
                >
                  <option value={100}>100%</option>
                  <option value={125}>125%</option>
                  <option value={150}>150%</option>
                  <option value={200}>200%</option>
                </select>
                <button
                  onClick={() => setFontSizePassage(Math.min(1000, fontSizePassage + 10))}
                  className="p-1 hover:bg-white rounded transition-colors border border-gray-300 bg-white shadow-sm"
                >
                  <PlusIcon className="w-3 h-3 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Passage Body */}
            <div 
              data-passage-body
              className="mt-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: highlightVocabulary(selectedPassage.email?.body || '', highlightAnswer) }}
            />

            {/* Vietnamese Translation */}
            {selectedPassage.email.body_vi && (
              <div className="mt-4">
                <details>
                  <summary className="flex items-center justify-between gap-3 cursor-pointer text-sm text-violet-600 font-semibold hover:text-violet-700">
                    <span>Xem bản dịch tiếng Việt</span>
                  </summary>
                  <div 
                    className="mt-2 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 p-3 rounded"
                    dangerouslySetInnerHTML={{ 
                      __html: selectedPassage.email.body_vi.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
                    }}
                  />
                </details>
              </div>
            )}

            {/* Vocabulary Popup */}
            {selectedVocab && (
              <div className="mt-4 p-4 bg-violet-50 border-l-4 border-violet-500 rounded-r-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-violet-900 text-lg">{selectedVocab.word}</h3>
                      {selectedVocab.level && (
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          selectedVocab.level === 'A2' ? 'bg-green-500 text-white' :
                          selectedVocab.level === 'B1' ? 'bg-blue-500 text-white' :
                          selectedVocab.level === 'B2' ? 'bg-purple-500 text-white' :
                          selectedVocab.level === 'C1' ? 'bg-orange-500 text-white' :
                          'bg-red-500 text-white'
                        }`}>
                          {selectedVocab.level}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{selectedVocab.definition}</p>
                    <p className="text-sm text-violet-700 mt-1 italic">{selectedVocab.definition_vi}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      <span className="font-semibold">Location:</span> {selectedVocab.location}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedVocabulary(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircleIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Resize Handle 2: Between Passage and Questions */}
          {!fullscreenColumn && (
            <div
              className="hidden lg:flex items-center justify-center w-2 cursor-col-resize bg-gray-200 hover:bg-violet-400 transition-colors relative group"
              onMouseDown={handleMouseDown('passage-questions')}
              style={{ userSelect: 'none' }}
            >
              <div className="absolute inset-y-0 w-1 bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-violet-700 text-xs font-bold">⋮</div>
            </div>
          )}

          {/* Questions - Column 3 */}
          <div 
            className={`${fullscreenColumn === 'questions' ? 'fixed inset-0 z-50 overflow-y-auto' : 'lg:h-[calc(100vh-140px)]'} bg-white rounded-r-xl shadow-lg p-6 space-y-4 lg:overflow-y-auto`}
            style={{ 
              fontSize: `${fontSizeQuestions}%`,
              flex: fullscreenColumn ? undefined : `${colWidths.questions} 1 0%`,
              minWidth: fullscreenColumn ? undefined : '300px'
            }}
          >
            <div className="flex items-center justify-between mb-4 sticky top-0 bg-white pb-2 z-10">
              <div className="flex items-center gap-2">
                <LightBulbIcon className="w-6 h-6 text-yellow-600" />
                <h2 className="text-xl font-bold text-gray-800">Questions</h2>
                <div className="text-sm text-gray-600">
                  {currentQuestionIndex + 1} / {allQuestions.length}
                </div>
              </div>
              <div className="flex items-center gap-0.5 bg-gray-50 rounded-lg p-0.5">
                <button
                  onClick={() => setFontSizeQuestions(Math.max(50, fontSizeQuestions - 10))}
                  className="p-1 hover:bg-white rounded transition-colors border border-gray-300 bg-white shadow-sm"
                >
                  <MinusIcon className="w-3 h-3 text-gray-700" />
                </button>
                <select
                  value={fontSizeQuestions}
                  onChange={(e) => setFontSizeQuestions(Number(e.target.value))}
                  className="text-xs text-gray-700 font-semibold px-1.5 py-0.5 border border-gray-300 rounded bg-white"
                >
                  <option value={100}>100%</option>
                  <option value={125}>125%</option>
                  <option value={150}>150%</option>
                  <option value={200}>200%</option>
                </select>
                <button
                  onClick={() => setFontSizeQuestions(Math.min(1000, fontSizeQuestions + 10))}
                  className="p-1 hover:bg-white rounded transition-colors border border-gray-300 bg-white shadow-sm"
                >
                  <PlusIcon className="w-3 h-3 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Answer Location Toggle */}
            <div className="mb-4 flex items-center justify-between p-3 bg-violet-50 rounded-lg border-2 border-violet-300 shadow-sm">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-violet-600" />
                <div>
                  <span className="text-sm font-bold text-violet-700 block">Định vị đáp án</span>
                  <span className="text-xs text-violet-600">Bật để highlight vị trí đáp án trong notice</span>
                </div>
              </div>
              <button
                onClick={() => setHighlightAnswer(!highlightAnswer)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  highlightAnswer ? 'bg-violet-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    highlightAnswer ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Question */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-violet-600 text-white text-sm font-bold">
                  {currentQuestion.id}
                </span>
                <p className="text-lg font-semibold text-gray-800">
                  {currentQuestion.question}
                </p>
              </div>
              <p className="text-sm text-gray-600 italic">
                {currentQuestion.question_vi}
              </p>
            </div>

            {/* Comparison Section */}
            {currentQuestion.comparison && (
              <div className="mb-4">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="w-full flex items-center justify-between p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors mb-2"
                >
                  <span className="text-sm font-semibold text-orange-700">
                    {showComparison ? 'Ẩn' : 'Hiển thị'} So sánh thông tin
                  </span>
                  <InformationCircleIcon className="w-5 h-5 text-orange-600" />
                </button>
                
                {showComparison && (() => {
                  // Get correct answer option
                  const correctAnswerOption = currentQuestion.options.find(opt => opt.correct);
                  const correctAnswerText = correctAnswerOption?.text || '';
                  const correctAnswerTextVi = correctAnswerOption?.text_vi || '';
                  
                  // Use phraseComparisons if available, otherwise use emailPhrases
                  const comparisons = currentQuestion.comparison.phraseComparisons && currentQuestion.comparison.phraseComparisons.length > 0
                    ? currentQuestion.comparison.phraseComparisons.map(pc => ({
                        questionPhrase: pc.questionPhrase,
                        questionPhrase_vi: pc.questionPhrase_vi,
                        emailPhrase: pc.emailPhrase,
                        emailPhrase_vi: pc.emailPhrase_vi,
                        color: pc.color,
                        relationship: pc.relationship
                      }))
                    : currentQuestion.comparison.emailPhrases?.map((phrase, idx) => ({
                        questionPhrase: correctAnswerText,
                        questionPhrase_vi: correctAnswerTextVi,
                        emailPhrase: phrase.text,
                        emailPhrase_vi: phrase.text_vi,
                        color: phrase.color,
                        relationship: 'equals' as const
                      })) || [];
                  
                  return (
                    <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border-2 border-orange-200">
                      <div className="space-y-4">
                        {comparisons.map((comp, idx) => (
                          <div key={idx} className="flex items-center gap-3 flex-wrap">
                            {/* Left: Correct Answer Option */}
                            <div className="px-4 py-2 rounded-lg border-2 shadow-sm bg-violet-500 border-violet-600 text-white">
                              <p className="text-xs mb-1 italic text-center text-white/80">
                                {comp.questionPhrase_vi || 'Đáp án đúng'}
                              </p>
                              <p className="text-sm font-semibold text-center">
                                "{comp.questionPhrase || correctAnswerText}"
                              </p>
                            </div>
                            {/* Equals sign */}
                            <span className="text-2xl font-bold text-gray-700">
                              {comp.relationship === 'equals' ? '=' : comp.relationship === 'refers_to' ? '→' : '→'}
                            </span>
                            {/* Right: Email Phrase in Passage */}
                            <div className={`px-4 py-2 rounded-lg border-2 shadow-sm ${
                              comp.color === 'green' ? 'bg-green-500 border-green-600 text-white' :
                              comp.color === 'orange' ? 'bg-orange-500 border-orange-600 text-white' :
                              comp.color === 'blue' ? 'bg-blue-500 border-blue-600 text-white' :
                              comp.color === 'purple' ? 'bg-purple-500 border-purple-600 text-white' :
                              'bg-red-500 border-red-600 text-white'
                            }`}>
                              <p className="text-xs mb-1 italic text-center text-white/80">
                                {comp.emailPhrase_vi}
                              </p>
                              <p className="text-sm font-semibold text-center">
                                "{comp.emailPhrase}"
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = selectedAnswer === optIdx;
                const isCorrectOption = option.correct;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleAnswerSelect(optIdx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      isSelected && isCorrectOption
                        ? 'bg-green-50 border-green-500 ring-2 ring-green-300'
                        : isSelected && !isCorrectOption
                        ? 'bg-red-50 border-red-500 ring-2 ring-red-300'
                        : isAnswered && isCorrectOption
                        ? 'bg-green-50 border-green-300'
                        : 'bg-white border-gray-300 hover:border-violet-400 hover:bg-violet-50'
                    } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-bold text-lg ${
                        isSelected && isCorrectOption ? 'text-green-700' :
                        isSelected && !isCorrectOption ? 'text-red-700' :
                        isAnswered && isCorrectOption ? 'text-green-600' :
                        'text-gray-700'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          isSelected && isCorrectOption ? 'text-green-800' :
                          isSelected && !isCorrectOption ? 'text-red-800' :
                          isAnswered && isCorrectOption ? 'text-green-700' :
                          'text-gray-800'
                        }`}>
                          {option.text}
                        </p>
                        {option.text_vi && (
                          <p className="text-sm text-gray-600 italic mt-1">{option.text_vi}</p>
                        )}
                      </div>
                      {isAnswered && (
                        <>
                          {isCorrectOption && (
                            <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
                          )}
                          {isSelected && !isCorrectOption && (
                            <XCircleIcon className="w-6 h-6 text-red-600 flex-shrink-0" />
                          )}
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && isAnswered && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-blue-800 mb-2">Giải thích:</p>
                <p className="text-sm text-blue-700">{currentQuestion.options[selectedAnswer || 0].explanation}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentQuestionIndex(Math.min(allQuestions.length - 1, currentQuestionIndex + 1))}
                disabled={currentQuestionIndex === allQuestions.length - 1}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

export default TOEICPart7_2025_Test2_Card147_148;
