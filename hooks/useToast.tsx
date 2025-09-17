import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircleIcon, XMarkIcon } from '../components/Icons';
import { playCorrectSound, playIncorrectSound, playMilestoneSound, playBananaBonusSound, playAchievementSound } from './useSound';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info', duration?: number, scoreData?: any) => void;
  showSuccess: (message: string, scoreData?: any) => void;
  showError: (message: string, scoreData?: any) => void;
  showCelebration: (message: string, scoreData: any) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) => {
    const id = Math.random().toString(36).slice(2);
    const toast: Toast = { id, type, message, duration };
    
    console.log('🔔 TOAST CREATED:', { id, type, message, duration });
    
    setToasts(prev => {
      const newToasts = [...prev, toast];
      console.log('🔔 TOASTS STATE:', newToasts);
      return newToasts;
    });
    
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
  }, [removeToast]);

  const showSuccess = useCallback((message: string, scoreData?: any) => {
    playCorrectSound();
    if (scoreData) {
      (window as any).currentScore = scoreData;
    }
    
    // Fallback: Show browser notification if available
    if (Notification.permission === 'granted') {
      new Notification('✅ Thành công!', { body: message, icon: '/favicon.ico' });
    }
    
    showToast(message, 'success', 4000);
  }, [showToast]);

  const showError = useCallback((message: string, scoreData?: any) => {
    playIncorrectSound();
    if (scoreData) {
      (window as any).currentScore = scoreData;
    }
    showToast(message, 'error', 5000);
  }, [showToast]);

  const showCelebration = useCallback((message: string, scoreData: any) => {
    // Choose appropriate sound based on message content
    if (message.includes('🍌') || message.includes('Bonus chuối')) {
      playBananaBonusSound();
    } else if (message.includes('🏆') || message.includes('điểm')) {
      playAchievementSound();
    } else {
      playMilestoneSound();
    }
    
    (window as any).currentScore = scoreData;
    showToast(message, 'success', 6000);
  }, [showToast]);

  const contextValue: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showCelebration
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      
      {/* Celebration Popup - Center of screen */}
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto"
          >
            <div
              className={`toast-notification ${
                toast.type === 'success' 
                  ? 'toast-notification--success' :
                toast.type === 'error' 
                  ? 'toast-notification--error' :
                'toast-notification--celebration'
              } relative px-6 py-6 md:px-8 md:py-8 max-w-sm md:max-w-md mx-4 text-center text-white bg-gradient-to-br ${
                toast.type === 'success'
                  ? 'from-emerald-500 to-teal-600'
                  : toast.type === 'error'
                  ? 'from-rose-500 to-red-600'
                  : 'from-indigo-500 to-fuchsia-600'
              } backdrop-blur-sm shadow-2xl border border-white/10 rounded-2xl`}
              style={{
                zIndex: 10000,
                position: 'relative',
                display: 'block',
                visibility: 'visible',
                opacity: 1
              }}
            >
              {/* Enhanced celebration particles */}
              {toast.type === 'success' && (
                <>
                  <div className="celebration-particle celebration-particle--sparkle absolute -top-3 -right-3">🌟</div>
                  <div className="celebration-particle celebration-particle--bounce absolute -top-2 -left-3">🎉</div>
                  <div className="celebration-particle absolute -bottom-2 -right-2">✨</div>
                </>
              )}
              {toast.type === 'error' && (
                <>
                  <div className="celebration-particle celebration-particle--bounce absolute -top-2 -right-2">💡</div>
                  <div className="celebration-particle absolute -bottom-2 -left-2">🤔</div>
                </>
              )}
              
              <div className="toast-content flex flex-col items-center gap-4">
                {toast.type === 'success' && (
                  <div className="relative toast-icon">
                    <CheckCircleIcon className="w-20 h-20 md:w-24 md:h-24 text-white drop-shadow-xl animate-pulse" />
                    <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/25 animate-ping"></div>
                  </div>
                )}
                {toast.type === 'error' && (
                  <div className="relative toast-icon">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-white/25 rounded-full flex items-center justify-center">
                      <span className="text-5xl md:text-6xl">⚠️</span>
                    </div>
                  </div>
                )}
                {toast.type === 'info' && (
                  <div className="relative toast-icon">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-5xl md:text-6xl">✨</span>
                    </div>
                  </div>
                )}
                
                <div className="toast-message text-xl md:text-2xl font-semibold leading-snug tracking-wide">{toast.message}</div>
                
                {/* Enhanced score display with Apple design */}
                {(toast.type === 'success' || toast.type === 'info') && (
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-3">
                    <div className="toast-score-display px-4 py-2 text-white font-bold text-lg">
                      📊 Điểm: {(window as any).currentScore?.totalScore || 0}
                    </div>
                    <div className="toast-score-display px-4 py-2 text-white font-bold text-lg">
                      ✅ Đúng: {(window as any).currentScore?.totalCorrect || 0}
                    </div>
                    <div className="toast-score-display px-4 py-2 text-white font-bold text-lg">
                      🍌 Chuối: {(window as any).currentScore?.credits || 0}
                    </div>
                  </div>
                )}
                
                {/* Additional celebration for milestones */}
                {toast.type === 'success' && toast.message.includes('Milestone') && (
                  <div className="mt-4 text-6xl animate-bounce">🏆</div>
                )}
              </div>
              
              <button
                onClick={() => removeToast(toast.id)}
                className="absolute top-2 right-2 text-white hover:text-gray-200 p-1 rounded-full hover:bg-white hover:bg-opacity-20"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
