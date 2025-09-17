import { useState, useCallback } from 'react';
import { submitAttempt } from '../src/api/score';
import { Verdict } from '../src/types/score';

interface ScoringState {
  exerciseAttempts: Record<string, number>; // Track attempt count per exercise
  totalScore: number;
  totalCorrect: number;
  credits: number;
}

export const useScoring = () => {
  const [scoringState, setScoringState] = useState<ScoringState>({
    exerciseAttempts: {},
    totalScore: 0,
    totalCorrect: 0,
    credits: 0
  });

  const submitScore = useCallback(async (
    mode: string,
    exerciseId: string,
    exerciseItemId: string,
    isCorrect: boolean
  ) => {
    const attemptKey = `${exerciseId}-${exerciseItemId}`;
    const currentAttempts = scoringState.exerciseAttempts[attemptKey] || 0;
    
    // Scoring logic: +1 first correct, -0.5 first incorrect, 0 subsequent attempts
    let verdict: Verdict;
    let expectedDelta = 0;
    
    if (currentAttempts === 0) {
      // First attempt
      if (isCorrect) {
        verdict = 'first_correct';
        expectedDelta = 1;
      } else {
        verdict = 'first_incorrect';
        expectedDelta = -0.5;
      }
    } else {
      // Subsequent attempts
      if (isCorrect) {
        verdict = 'subsequent_correct';
        expectedDelta = 0;
      } else {
        verdict = 'subsequent_incorrect';
        expectedDelta = 0;
      }
    }

    try {
      // Submit to server with anti-cheat protection
      const result = await submitAttempt({
        mode,
        exerciseId,
        exerciseItemId,
        verdict
      });

      // Update local state
      setScoringState(prev => ({
        ...prev,
        exerciseAttempts: {
          ...prev.exerciseAttempts,
          [attemptKey]: currentAttempts + 1
        },
        totalScore: result.totalScore,
        totalCorrect: result.totalCorrect,
        credits: result.credits
      }));

      // Dispatch global score update event for HeaderScore
      const scoreUpdateEvent = new CustomEvent('scoreUpdate', {
        detail: {
          totalScore: result.totalScore,
          totalCorrect: result.totalCorrect,
          credits: result.credits,
          delta: result.delta,
          isCorrect,
          isFirstAttempt: currentAttempts === 0
        }
      });
      window.dispatchEvent(scoreUpdateEvent);

      return result;
    } catch (error) {
      console.error('Scoring error:', error);
      return null;
    }
  }, [scoringState]);

  const getAttemptCount = useCallback((exerciseId: string, exerciseItemId: string): number => {
    const attemptKey = `${exerciseId}-${exerciseItemId}`;
    return scoringState.exerciseAttempts[attemptKey] || 0;
  }, [scoringState]);

  const isFirstAttempt = useCallback((exerciseId: string, exerciseItemId: string): boolean => {
    return getAttemptCount(exerciseId, exerciseItemId) === 0;
  }, [getAttemptCount]);

  return {
    submitScore,
    getAttemptCount,
    isFirstAttempt,
    scoringState
  };
};
