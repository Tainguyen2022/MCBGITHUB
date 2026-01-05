import React, { useState, useEffect, useCallback } from 'react';
import { KidsGameItem } from '../types';

// --- SVG Components for the game ---
const CatSVG = () => <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 20 C 40 5, 60 5, 50 20 M50 20 Q 30 40, 20 20 Q 30 45, 40 40 M50 20 Q 70 40, 80 20 Q 70 45, 60 40 M35 55 a 5 5 0 1 1 0 -0.01 z M65 55 a 5 5 0 1 1 0 -0.01 z M40 70 Q 50 80, 60 70 M20 60 Q 50 95, 80 60 C 95 80, 80 100, 50 90 C 20 100, 5 80, 20 60" fill="none" stroke="#4a5568" strokeWidth="3" strokeLinecap="round"/></svg>;
const DogSVG = () => <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 30 C 40 10, 60 10, 50 30 M30 30 C 15 40, 20 60, 30 50 M70 30 C 85 40, 80 60, 70 50 M35 60 a 5 5 0 1 1 0 -0.01 z M65 60 a 5 5 0 1 1 0 -0.01 z M45 75 Q 50 85, 55 75 M25 55 Q 50 90, 75 55 C 90 70, 85 90, 50 85 C 15 90, 10 70, 25 55" fill="none" stroke="#795548" strokeWidth="3" strokeLinecap="round"/></svg>;
const SunSVG = () => <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="25" fill="#facc15"/><g stroke="#facc15" strokeWidth="5" strokeLinecap="round"><path d="M50 15 V5"/><path d="M50 85 V95"/><path d="M15 50 H5"/><path d="M85 50 H95"/><path d="M25 25 L18 18"/><path d="M75 75 L82 82"/><path d="M25 75 L18 82"/><path d="M75 25 L82 18"/></g></svg>;
const BallSVG = () => <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#ef4444"/><path d="M11.5 44 C 35 25, 65 25, 88.5 44 M11.5 56 C 35 75, 65 75, 88.5 56" fill="none" stroke="white" strokeWidth="3"/></svg>;
const TreeSVG = () => <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="42" y="60" width="16" height="35" fill="#8d6e63" rx="4"/><path d="M50 10 L 20 40 L 35 40 L 25 65 L 75 65 L 65 40 L 80 40 Z" fill="#4ade80"/></svg>;
const CarSVG = () => <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10 60 H 90 L 85 40 H 70 L 60 25 H 40 L 30 40 H 15 Z" fill="#3b82f6"/><circle cx="25" cy="65" r="10" fill="#4b5563" stroke="white" strokeWidth="2"/><circle cx="75" cy="65" r="10" fill="#4b5563" stroke="white" strokeWidth="2"/></svg>;

const initialGameData: KidsGameItem[] = [
  { id: 'cat', word: 'Cat', svg: <CatSVG /> },
  { id: 'dog', word: 'Dog', svg: <DogSVG /> },
  { id: 'sun', word: 'Sun', svg: <SunSVG /> },
  { id: 'ball', word: 'Ball', svg: <BallSVG /> },
  { id: 'tree', word: 'Tree', svg: <TreeSVG /> },
  { id: 'car', word: 'Car', svg: <CarSVG /> },
];

const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const KidsCornerPage: React.FC = () => {
  const [pictures, setPictures] = useState<KidsGameItem[]>([]);
  const [words, setWords] = useState<KidsGameItem[]>([]);
  const [selectedPicture, setSelectedPicture] = useState<KidsGameItem | null>(null);
  const [selectedWord, setSelectedWord] = useState<KidsGameItem | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [incorrectGuess, setIncorrectGuess] = useState<[string, string] | null>(null);

  const setupGame = useCallback(() => {
    setPictures(shuffleArray(initialGameData));
    setWords(shuffleArray(initialGameData));
    setSelectedPicture(null);
    setSelectedWord(null);
    setMatchedPairs([]);
    setIncorrectGuess(null);
  }, []);

  useEffect(() => {
    setupGame();
  }, [setupGame]);

  useEffect(() => {
    if (selectedPicture && selectedWord) {
      if (selectedPicture.id === selectedWord.id) {
        // Correct match
        setMatchedPairs(prev => [...prev, selectedPicture.id]);
      } else {
        // Incorrect match
        setIncorrectGuess([selectedPicture.id, selectedWord.id]);
        setTimeout(() => {
          setIncorrectGuess(null);
        }, 500);
      }
      // Reset selections after a short delay
      setTimeout(() => {
        setSelectedPicture(null);
        setSelectedWord(null);
      }, 500);
    }
  }, [selectedPicture, selectedWord]);

  const handlePictureSelect = (pic: KidsGameItem) => {
    if (matchedPairs.includes(pic.id) || selectedPicture) return;
    setSelectedPicture(pic);
  };

  const handleWordSelect = (word: KidsGameItem) => {
    if (matchedPairs.includes(word.id) || selectedWord) return;
    setSelectedWord(word);
  };
  
  const isGameWon = matchedPairs.length === initialGameData.length;

  const getCardClasses = (item: KidsGameItem, type: 'picture' | 'word') => {
    const isMatched = matchedPairs.includes(item.id);
    const isSelected = (type === 'picture' && selectedPicture?.id === item.id) || (type === 'word' && selectedWord?.id === item.id);
    const isIncorrect = incorrectGuess && (incorrectGuess[0] === item.id || incorrectGuess[1] === item.id);

    let classes = 'border-4 rounded-2xl transition-all duration-200 ease-in-out cursor-pointer';
    if (isMatched) {
      classes += ' border-green-500 bg-green-100 opacity-50 cursor-default';
    } else if (isSelected) {
      classes += ' border-blue-500 transform -translate-y-2 shadow-xl';
    } else {
      classes += ' border-gray-200 bg-white hover:border-blue-400 hover:shadow-lg';
    }
    
    if (isIncorrect) {
      classes += ' shake-error';
    }
    
    return classes;
  };
  
  return (
    <div className="bg-yellow-50/50 -m-8 p-8 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-amber-600">🧸 Góc Của Bé</h1>
        <p className="text-2xl text-gray-600 mt-2">Ghép Hình với Chữ nhé!</p>
      </div>

      {isGameWon ? (
        <div className="text-center p-10 bg-white rounded-2xl shadow-xl">
          <h2 className="text-4xl font-bold text-green-600">🎉 Chúc mừng con! 🎉</h2>
          <p className="text-xl text-gray-700 mt-4">Con đã ghép đúng tất cả các hình rồi. Giỏi quá!</p>
          <button onClick={setupGame} className="btn btn-primary mt-8 text-xl px-8 py-4">Chơi Lại</button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Pictures Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {pictures.map(pic => (
              <div key={`pic-${pic.id}`} onClick={() => handlePictureSelect(pic)} className={`p-4 aspect-square flex items-center justify-center ${getCardClasses(pic, 'picture')}`}>
                <div className="w-full h-full">{pic.svg}</div>
              </div>
            ))}
          </div>

          {/* Words Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {words.map(word => (
              <div key={`word-${word.id}`} onClick={() => handleWordSelect(word)} className={`p-6 flex items-center justify-center ${getCardClasses(word, 'word')}`}>
                <span className="text-4xl font-bold text-gray-700">{word.word}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KidsCornerPage;