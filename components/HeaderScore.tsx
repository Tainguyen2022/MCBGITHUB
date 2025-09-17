import React, { useEffect, useState } from 'react';
import { getScoreSummary } from '../src/api/score';
import { ScoreSummary } from '../src/types/score';
import { useAuth } from '../App';

const HeaderScore: React.FC = () => {
  const { currentUser, guestBananaBalance } = useAuth();
  const [summary, setSummary] = useState<ScoreSummary>({ 
    totalScore: 0, 
    totalCorrect: 0, 
    credits: 0 
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Get actual banana balance from user data, not score API
  const actualBananaBalance = currentUser ? currentUser.bananaBalance : guestBananaBalance;

  const refreshScore = async () => {
    try {
      setIsLoading(true);
      const newSummary = await getScoreSummary();
      setSummary(newSummary);
    } catch (error) {
      console.error('Failed to refresh score:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshScore();
    // Refresh every 5 seconds
    const interval = setInterval(refreshScore, 5000);
    return () => clearInterval(interval);
  }, []);

  // Global event listener for score updates
  useEffect(() => {
    const handleScoreUpdate = (event: CustomEvent) => {
      const { totalScore, totalCorrect, credits } = event.detail;
      setSummary({ totalScore, totalCorrect, credits });
    };

    window.addEventListener('scoreUpdate' as any, handleScoreUpdate);
    return () => window.removeEventListener('scoreUpdate' as any, handleScoreUpdate);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-pink-100 text-pink-700 font-semibold">
        <span>📊</span>
        <span>Điểm: {summary.totalScore}</span>
      </div>
      
      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
        <span>✅</span>
        <span>Đúng: {summary.totalCorrect}</span>
      </div>
      
      {/* Banana balance is now handled by BalanceDisplay in Header.tsx */}
    </div>
  );
};

export default HeaderScore;
