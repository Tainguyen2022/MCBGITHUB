import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowRightIcon, ChatBubbleLeftRightIcon, AcademicCapIcon, DocumentTextIcon, MegaphoneIcon, StarIcon, DevicePhoneMobileIcon, ComputerDesktopIcon, EnvelopeIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { BananaRewardService } from '../services/bananaRewardService';

interface VocabularyItem {
  word: string;
  partOfSpeech: string;
  ipa: string;
  vietnamese: string;
  synonyms: string[];
}

interface GrammarPoint {
  id: string;
  title: string;
  rule: string;
  example: {
    english: string;
    vietnamese: string;
  };
  frequency: 'high' | 'medium' | 'low';
}

const Mtest: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('');
  const [viewMode, setViewMode] = useState<'mobile' | 'pc'>('pc');
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationUntil, setCelebrationUntil] = useState<number | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; scale: number; delay: number; emoji: string; rotate: number; duration: number; createdAt: number }>>([]);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; scale: number; delay: number; duration: number; opacity: number }>>([]);

  const location = useLocation();
  const categoryParam = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('category');
  }, [location.search]);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      // slight delay to ensure section renders
      const timeoutId = setTimeout(() => {
        const el = document.getElementById('warehouses-grid');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [categoryParam]);

  // Trigger celebration if a new banana was earned recently
  useEffect(() => {
    try {
      const recent = BananaRewardService.getRecentRewards();
      if (!recent.length) return;
      const latest = recent[0];
      const earnedAt = new Date(latest.earnedAt).getTime();
      const lastShown = parseInt(localStorage.getItem('banana_last_celebrated_at') || '0', 10);
      const now = Date.now();
      if (earnedAt > lastShown && now - earnedAt < 5 * 60 * 1000) { // within 5 minutes
        localStorage.setItem('banana_last_celebrated_at', String(earnedAt));
        triggerCelebration();
      }
    } catch {}
  }, []);

  const triggerCelebration = () => {
    const EMOJIS = ['💖', '✨', '⭐️', '💫', '❤️', '🌟'];
    const first: Array<{ id: number; x: number; y: number; scale: number; delay: number; emoji: string; rotate: number; duration: number; createdAt: number }> = [];
    for (let i = 0; i < 300; i++) {
      first.push({
        id: i,
        x: Math.random() * 100,
        y: 60 + Math.random() * 40,
        scale: 0.6 + Math.random() * 1.6,
        delay: Math.random() * 0.8,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        rotate: (Math.random() - 0.5) * 90,
        duration: 1.6 + Math.random() * 1.4,
        createdAt: Date.now(),
      });
    }
    setParticles(first);
    const starList: Array<{ id: number; x: number; y: number; scale: number; delay: number; duration: number; opacity: number }> = [];
    for (let i = 0; i < 800; i++) {
      starList.push({ id: i, x: Math.random() * 100, y: Math.random() * 100, scale: Math.random() * 0.8 + 0.2, delay: Math.random() * 2, duration: 1 + Math.random() * 2.5, opacity: 0.4 + Math.random() * 0.6 });
    }
    setStars(starList);
    setCelebrationUntil(Date.now() + 30000);
    setShowCelebration(true);
  };

  useEffect(() => {
    if (!showCelebration) {
      // Clear particles and stars when celebration ends
      setParticles([]);
      setStars([]);
      return;
    }
    const EMOJIS = ['💖', '✨', '⭐️', '💫', '❤️', '🌟'];
    let spawnInterval: NodeJS.Timeout;
    let lastSpawnTime = Date.now();
    
    // Spawn particles less frequently to reduce re-renders
    spawnInterval = setInterval(() => {
      const now = Date.now();
      // Only spawn new particles every 800ms to reduce re-renders
      if (now - lastSpawnTime >= 800) {
      setParticles(prev => {
        const now = Date.now();
        const next = [...prev];
          // Reduce particle count from 120 to 60
          for (let i = 0; i < 60; i++) {
          next.push({ id: now + i, x: Math.random() * 100, y: 60 + Math.random() * 40, scale: 0.6 + Math.random() * 1.6, delay: Math.random() * 0.8, emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)], rotate: (Math.random() - 0.5) * 90, duration: 1.6 + Math.random() * 1.4, createdAt: now });
        }
          // Limit to 1000 particles max
          return next.filter(p => now - p.createdAt < 5000).slice(-1000);
      });
        lastSpawnTime = now;
      }
    }, 800);
    
    const timer = setInterval(() => {
      if (celebrationUntil && Date.now() >= celebrationUntil) {
        setShowCelebration(false);
        setCelebrationUntil(null);
        setParticles([]);
        setStars([]);
      }
    }, 1000);
    
    return () => {
      clearInterval(spawnInterval);
      clearInterval(timer);
    };
  }, [showCelebration, celebrationUntil]);

  // Điểm ngữ pháp cho TOEIC Part 5 Practice - Test 1
  const toeicPart5GrammarPoints: GrammarPoint[] = [
    { id: "1", title: "Present Perfect", rule: "S + have/has + V3", example: { english: "I have worked here for 5 years.", vietnamese: "Tôi đã làm việc ở đây được 5 năm." }, frequency: "high" },
    { id: "2", title: "Past Simple", rule: "S + V2", example: { english: "She visited Paris last year.", vietnamese: "Cô ấy đã thăm Paris năm ngoái." }, frequency: "high" },
    { id: "3", title: "Future Simple", rule: "S + will + V", example: { english: "We will meet tomorrow.", vietnamese: "Chúng tôi sẽ gặp nhau ngày mai." }, frequency: "high" },
    { id: "4", title: "Present Continuous", rule: "S + am/is/are + V-ing", example: { english: "He is working now.", vietnamese: "Anh ấy đang làm việc bây giờ." }, frequency: "high" },
    { id: "5", title: "Past Continuous", rule: "S + was/were + V-ing", example: { english: "They were studying when I called.", vietnamese: "Họ đang học khi tôi gọi." }, frequency: "medium" },
    { id: "6", title: "Present Perfect Continuous", rule: "S + have/has + been + V-ing", example: { english: "I have been waiting for 2 hours.", vietnamese: "Tôi đã chờ đợi được 2 giờ." }, frequency: "medium" },
    { id: "7", title: "Passive Voice", rule: "S + be + V3", example: { english: "The book was written by him.", vietnamese: "Cuốn sách được viết bởi anh ấy." }, frequency: "high" },
    { id: "8", title: "Conditional Type 1", rule: "If + S + V(s/es), S + will + V", example: { english: "If it rains, we will stay home.", vietnamese: "Nếu trời mưa, chúng tôi sẽ ở nhà." }, frequency: "high" },
    { id: "9", title: "Conditional Type 2", rule: "If + S + V2, S + would + V", example: { english: "If I had money, I would buy a car.", vietnamese: "Nếu tôi có tiền, tôi sẽ mua xe hơi." }, frequency: "medium" },
    { id: "10", title: "Modal Verbs", rule: "S + can/could/may/might + V", example: { english: "You can speak English well.", vietnamese: "Bạn có thể nói tiếng Anh tốt." }, frequency: "high" },
    { id: "11", title: "Gerund", rule: "V-ing (as noun)", example: { english: "Swimming is good for health.", vietnamese: "Bơi lội tốt cho sức khỏe." }, frequency: "high" },
    { id: "12", title: "Infinitive", rule: "to + V", example: { english: "I want to learn English.", vietnamese: "Tôi muốn học tiếng Anh." }, frequency: "high" },
    { id: "13", title: "Relative Clauses", rule: "S + who/which/that + V", example: { english: "The man who is tall is my brother.", vietnamese: "Người đàn ông cao là anh trai tôi." }, frequency: "medium" },
    { id: "14", title: "Reported Speech", rule: "S + said + (that) + S + V", example: { english: "He said he was tired.", vietnamese: "Anh ấy nói anh ấy mệt." }, frequency: "medium" },
    { id: "15", title: "Articles", rule: "a/an/the", example: { english: "I have a car. The car is red.", vietnamese: "Tôi có một chiếc xe. Chiếc xe màu đỏ." }, frequency: "high" },
    { id: "16", title: "Prepositions", rule: "in/on/at/for/by", example: { english: "I live in Ho Chi Minh City.", vietnamese: "Tôi sống ở Thành phố Hồ Chí Minh." }, frequency: "high" },
    { id: "17", title: "Comparatives", rule: "adj + -er + than", example: { english: "This book is better than that one.", vietnamese: "Cuốn sách này tốt hơn cuốn kia." }, frequency: "high" },
    { id: "18", title: "Superlatives", rule: "the + adj + -est", example: { english: "This is the best restaurant.", vietnamese: "Đây là nhà hàng tốt nhất." }, frequency: "high" },
    { id: "19", title: "Countable/Uncountable", rule: "many/much + N", example: { english: "I have many books but little time.", vietnamese: "Tôi có nhiều sách nhưng ít thời gian." }, frequency: "high" },
    { id: "20", title: "Tag Questions", rule: "S + V, don't/doesn't + S?", example: { english: "You like coffee, don't you?", vietnamese: "Bạn thích cà phê, phải không?" }, frequency: "medium" },
    { id: "21", title: "Indirect Questions", rule: "Could you tell me + wh- + S + V?", example: { english: "Could you tell me where the bank is?", vietnamese: "Bạn có thể cho tôi biết ngân hàng ở đâu không?" }, frequency: "medium" },
    { id: "22", title: "Wish/If Only", rule: "S + wish + S + V2", example: { english: "I wish I had more time.", vietnamese: "Tôi ước tôi có nhiều thời gian hơn." }, frequency: "low" },
    { id: "23", title: "Used to", rule: "S + used to + V", example: { english: "I used to smoke but I quit.", vietnamese: "Tôi từng hút thuốc nhưng đã bỏ." }, frequency: "medium" },
    { id: "24", title: "Be used to", rule: "S + be used to + V-ing", example: { english: "I am used to getting up early.", vietnamese: "Tôi quen với việc dậy sớm." }, frequency: "medium" },
    { id: "25", title: "Would rather", rule: "S + would rather + V", example: { english: "I would rather stay home.", vietnamese: "Tôi thà ở nhà." }, frequency: "low" },
    { id: "26", title: "Had better", rule: "S + had better + V", example: { english: "You had better study hard.", vietnamese: "Bạn nên học chăm chỉ." }, frequency: "medium" },
    { id: "27", title: "So/Neither", rule: "So + aux + S / Neither + aux + S", example: { english: "I like coffee. So do I.", vietnamese: "Tôi thích cà phê. Tôi cũng vậy." }, frequency: "low" },
    { id: "28", title: "Either/Neither", rule: "either...or / neither...nor", example: { english: "Either you or I am wrong.", vietnamese: "Hoặc bạn hoặc tôi sai." }, frequency: "medium" },
    { id: "29", title: "Both/All", rule: "both...and / all + N", example: { english: "Both Tom and Mary are students.", vietnamese: "Cả Tom và Mary đều là sinh viên." }, frequency: "medium" },
    { id: "30", title: "Each/Every", rule: "each + N / every + N", example: { english: "Each student has a book.", vietnamese: "Mỗi học sinh có một cuốn sách." }, frequency: "medium" }
  ];

  // Từ vựng khó cho TOEIC Part 5 Practice - Test 1
  const toeicPart5Vocabulary: VocabularyItem[] = [
    { word: "comprehensive", partOfSpeech: "adj", ipa: "/ˌkɒmprɪˈhensɪv/", vietnamese: "toàn diện, bao quát", synonyms: ["complete", "thorough", "extensive"] },
    { word: "substantial", partOfSpeech: "adj", ipa: "/səbˈstænʃəl/", vietnamese: "đáng kể, lớn lao", synonyms: ["significant", "considerable", "major"] },
    { word: "implement", partOfSpeech: "v", ipa: "/ˈɪmplɪment/", vietnamese: "thực hiện, triển khai", synonyms: ["execute", "carry out", "enforce"] },
    { word: "accomplish", partOfSpeech: "v", ipa: "/əˈkʌmplɪʃ/", vietnamese: "hoàn thành, đạt được", synonyms: ["achieve", "complete", "fulfill"] },
    { word: "efficient", partOfSpeech: "adj", ipa: "/ɪˈfɪʃənt/", vietnamese: "hiệu quả, có năng suất", synonyms: ["productive", "effective", "streamlined"] },
    { word: "maintain", partOfSpeech: "v", ipa: "/meɪnˈteɪn/", vietnamese: "duy trì, bảo trì", synonyms: ["preserve", "sustain", "keep"] },
    { word: "establish", partOfSpeech: "v", ipa: "/ɪˈstæblɪʃ/", vietnamese: "thành lập, thiết lập", synonyms: ["found", "create", "set up"] },
    { word: "significant", partOfSpeech: "adj", ipa: "/sɪɡˈnɪfɪkənt/", vietnamese: "quan trọng, đáng kể", synonyms: ["important", "notable", "meaningful"] },
    { word: "appropriate", partOfSpeech: "adj", ipa: "/əˈprəʊpriət/", vietnamese: "phù hợp, thích hợp", synonyms: ["suitable", "fitting", "proper"] },
    { word: "consequently", partOfSpeech: "adv", ipa: "/ˈkɒnsɪkwəntli/", vietnamese: "do đó, kết quả là", synonyms: ["therefore", "thus", "as a result"] },
    { word: "nevertheless", partOfSpeech: "adv", ipa: "/ˌnevəðəˈles/", vietnamese: "tuy nhiên, dù vậy", synonyms: ["however", "nonetheless", "still"] },
    { word: "furthermore", partOfSpeech: "adv", ipa: "/ˌfɜːðəˈmɔː/", vietnamese: "hơn nữa, thêm vào đó", synonyms: ["moreover", "additionally", "besides"] },
    { word: "nevertheless", partOfSpeech: "adv", ipa: "/ˌnevəðəˈles/", vietnamese: "tuy nhiên, dù vậy", synonyms: ["however", "nonetheless", "still"] },
    { word: "consequently", partOfSpeech: "adv", ipa: "/ˈkɒnsɪkwəntli/", vietnamese: "do đó, kết quả là", synonyms: ["therefore", "thus", "as a result"] },
    { word: "substantial", partOfSpeech: "adj", ipa: "/səbˈstænʃəl/", vietnamese: "đáng kể, lớn lao", synonyms: ["significant", "considerable", "major"] },
    { word: "consequently", partOfSpeech: "adv", ipa: "/ˈkɒnsɪkwəntli/", vietnamese: "do đó, kết quả là", synonyms: ["therefore", "thus", "as a result"] },
    { word: "nevertheless", partOfSpeech: "adv", ipa: "/ˌnevəðəˈles/", vietnamese: "tuy nhiên, dù vậy", synonyms: ["however", "nonetheless", "still"] },
    { word: "furthermore", partOfSpeech: "adv", ipa: "/ˌfɜːðəˈmɔː/", vietnamese: "hơn nữa, thêm vào đó", synonyms: ["moreover", "additionally", "besides"] },
    { word: "nevertheless", partOfSpeech: "adv", ipa: "/ˌnevəðəˈles/", vietnamese: "tuy nhiên, dù vậy", synonyms: ["however", "nonetheless", "still"] },
    { word: "consequently", partOfSpeech: "adv", ipa: "/ˈkɒnsɪkwəntli/", vietnamese: "do đó, kết quả là", synonyms: ["therefore", "thus", "as a result"] }
  ];

  const renderGrammarColumn = () => {
    if (selectedWarehouse === 'giaipart5') {
      return (
        <div className="relative bg-gradient-to-br from-blue-100/90 to-cyan-100/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2 border-blue-200/50">
          {/* Pill Shape Effect */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-lg"></div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-lg"></div>
          
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
              <span className="text-2xl">💊</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-800">Ngữ pháp</h3>
              <p className="text-blue-600 font-medium text-sm">30 điểm chính</p>
            </div>
          </div>
          
          <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
            {toeicPart5GrammarPoints.map((grammar, index) => (
              <div key={index} className="group bg-gradient-to-r from-blue-50/80 to-cyan-50/80 p-4 rounded-xl border border-blue-100/50 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-blue-800 text-sm">
                    {grammar.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold shadow-sm ${
                    grammar.frequency === 'high' ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white' :
                    grammar.frequency === 'medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                    'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                  }`}>
                    {grammar.frequency}
                  </span>
                </div>
                
                <p className="text-blue-600 font-mono text-xs mb-2 bg-white/50 px-2 py-1 rounded-lg border border-blue-200/50">
                  {grammar.rule}
                </p>
                
                <div className="space-y-1">
                  <p className="text-gray-700 text-xs leading-relaxed">
                    <span className="font-medium">EN:</span> {grammar.example.english}
                  </p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    <span className="font-medium">VN:</span> {grammar.example.vietnamese}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderVocabularyColumn = () => {
    if (selectedWarehouse === 'giaipart5') {
      return (
        <div className="relative bg-gradient-to-br from-purple-100/90 to-pink-100/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2 border-purple-200/50">
          {/* Pill Shape Effect */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-lg"></div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-lg"></div>
          
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
              <span className="text-2xl">💊</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-800">Từ vựng khó</h3>
              <p className="text-purple-600 font-medium text-sm">20 từ quan trọng</p>
            </div>
          </div>
          
          <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100">
            {toeicPart5Vocabulary.map((vocab, index) => (
              <div key={index} className="group bg-gradient-to-r from-purple-50/80 to-pink-50/80 p-4 rounded-xl border border-purple-100/50 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-purple-800 text-sm">
                    {vocab.word}
                  </h4>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                    {vocab.partOfSpeech}
                  </span>
                </div>
                
                <p className="text-purple-600 font-mono text-xs mb-2 bg-white/50 px-2 py-1 rounded-lg border border-purple-200/50">
                  {vocab.ipa}
                </p>
                
                <p className="text-gray-700 mb-3 text-xs leading-relaxed">
                  {vocab.vietnamese}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {vocab.synonyms.slice(0, 2).map((synonym, synIndex) => (
                    <span key={synIndex} className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium border border-pink-200/50">
                      {synonym}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const testCategories = [
    {
      id: 'toeic',
      name: 'TOEIC',
      icon: '🏢',
      color: 'from-blue-500 to-indigo-600',
      warehouses: [
        {
          id: 'toeic-part5-by-year',
          name: 'ETS PART 5',
          icon: '📅',
          color: 'from-indigo-500 to-purple-600',
          badge: 'ORGANIZED',
          tests: [
            { name: '2025', path: '/toeic-part5-by-year', icon: <DocumentTextIcon className="w-5 h-5 text-red-500" />, stats: '10 Tests' },
            { name: '2024', path: '/toeic-part5-by-year', icon: <DocumentTextIcon className="w-5 h-5 text-orange-500" />, stats: '10 Tests' },
            { name: '2023', path: '/toeic-part5-by-year', icon: <DocumentTextIcon className="w-5 h-5 text-yellow-500" />, stats: '10 Tests' },
            { name: '2022', path: '/toeic-part5-by-year', icon: <DocumentTextIcon className="w-5 h-5 text-lime-500" />, stats: '10 Tests' },
            { name: '2021', path: '/toeic-part5-by-year', icon: <DocumentTextIcon className="w-5 h-5 text-green-500" />, stats: '5 Tests' },
            { name: '2020', path: '/toeic-part5-by-year', icon: <DocumentTextIcon className="w-5 h-5 text-teal-500" />, stats: '10 Tests' },
            { name: '2019', path: '/toeic-part5-by-year', icon: <DocumentTextIcon className="w-5 h-5 text-cyan-500" />, stats: '10 Tests' },
            { name: '2018', path: '/toeic-part5-by-year', icon: <DocumentTextIcon className="w-5 h-5 text-blue-500" />, stats: '3 Tests' },
            { name: 'YBM VOL 1', path: '/toeic-part5-by-year', icon: <DocumentTextIcon className="w-5 h-5 text-green-500" />, stats: '10 Tests' },
            { name: 'YBM VOL 2', path: '/toeic-part5-by-year', icon: <DocumentTextIcon className="w-5 h-5 text-blue-500" />, stats: '10 Tests' },
            { name: 'YBM VOL 3', path: '/toeic-part5-by-year', icon: <DocumentTextIcon className="w-5 h-5 text-purple-500" />, stats: '10 Tests' },
          ],
        },
        {
          id: 'toeic-part6-by-year',
          name: 'ETS PART 6',
          icon: '📝',
          color: 'from-rose-500 to-fuchsia-600',
          badge: 'ORGANIZED',
          tests: [
            { name: '2025', path: '/toeic-part6-by-year?year=2025', icon: <DocumentTextIcon className="w-5 h-5 text-rose-400" />, stats: '10 Tests' },
            { name: '2024', path: '/toeic-part6-by-year?year=2024', icon: <DocumentTextIcon className="w-5 h-5 text-orange-400" />, stats: 'Coming Soon' },
            { name: '2023', path: '/toeic-part6-by-year?year=2023', icon: <DocumentTextIcon className="w-5 h-5 text-amber-400" />, stats: 'Coming Soon' },
            { name: '2022', path: '/toeic-part6-by-year?year=2022', icon: <DocumentTextIcon className="w-5 h-5 text-lime-400" />, stats: 'Coming Soon' },
            { name: '2021', path: '/toeic-part6-by-year?year=2021', icon: <DocumentTextIcon className="w-5 h-5 text-green-400" />, stats: 'Coming Soon' },
            { name: '2020', path: '/toeic-part6-by-year?year=2020', icon: <DocumentTextIcon className="w-5 h-5 text-teal-400" />, stats: 'Coming Soon' },
            { name: '2019', path: '/toeic-part6-by-year?year=2019', icon: <DocumentTextIcon className="w-5 h-5 text-sky-400" />, stats: 'Coming Soon' },
            { name: '2018', path: '/toeic-part6-by-year?year=2018', icon: <DocumentTextIcon className="w-5 h-5 text-indigo-400" />, stats: 'Coming Soon' },
            { name: 'YBM Vol 1', path: '/toeic-part6-by-year?year=ybm-vol1', icon: <DocumentTextIcon className="w-5 h-5 text-blue-400" />, stats: 'Coming Soon' },
            { name: 'YBM Vol 2', path: '/toeic-part6-by-year?year=ybm-vol2', icon: <DocumentTextIcon className="w-5 h-5 text-purple-400" />, stats: 'Coming Soon' },
            { name: 'YBM Vol 3', path: '/toeic-part6-by-year?year=ybm-vol3', icon: <DocumentTextIcon className="w-5 h-5 text-fuchsia-400" />, stats: 'Coming Soon' },
            { name: 'HACKER Vol 3', path: '/toeic-part6-by-year?year=hacker-vol3', icon: <DocumentTextIcon className="w-5 h-5 text-red-400" />, stats: 'Coming Soon' },
          ],
        },
        {
          id: 'toeic-part7-by-year',
          name: 'ETS PART 7',
          icon: '📰',
          color: 'from-rose-500 to-fuchsia-600',
          badge: 'ORGANIZED',
          tests: [
            { name: '2025', path: '/toeic-part7-by-year?year=2025', icon: <DocumentTextIcon className="w-5 h-5 text-rose-400" />, stats: '10 Tests' },
            { name: '2024', path: '/toeic-part7-by-year?year=2024', icon: <DocumentTextIcon className="w-5 h-5 text-orange-400" />, stats: 'Coming Soon' },
            { name: '2023', path: '/toeic-part7-by-year?year=2023', icon: <DocumentTextIcon className="w-5 h-5 text-amber-400" />, stats: 'Coming Soon' },
            { name: '2022', path: '/toeic-part7-by-year?year=2022', icon: <DocumentTextIcon className="w-5 h-5 text-lime-400" />, stats: 'Coming Soon' },
            { name: '2021', path: '/toeic-part7-by-year?year=2021', icon: <DocumentTextIcon className="w-5 h-5 text-green-400" />, stats: 'Coming Soon' },
            { name: '2020', path: '/toeic-part7-by-year?year=2020', icon: <DocumentTextIcon className="w-5 h-5 text-teal-400" />, stats: 'Coming Soon' },
            { name: '2019', path: '/toeic-part7-by-year?year=2019', icon: <DocumentTextIcon className="w-5 h-5 text-sky-400" />, stats: 'Coming Soon' },
            { name: '2018', path: '/toeic-part7-by-year?year=2018', icon: <DocumentTextIcon className="w-5 h-5 text-indigo-400" />, stats: 'Coming Soon' },
            { name: 'INVO Mini Series', path: '/toeic-part7-by-year?year=invo', icon: <DocumentTextIcon className="w-5 h-5 text-fuchsia-400" />, stats: '5 Mini Tests' },
          ],
        },
        {
          id: 'toeic-part7-email',
          name: 'TOEIC Part 7 - Email Reading',
          icon: '📧',
          color: 'from-emerald-500 to-teal-600',
          badge: 'INTERACTIVE',
          tests: [
            { name: 'Email Reading Practice', path: '/toeic-part7-email-list', icon: <EnvelopeIcon className="w-5 h-5 text-emerald-400" />, stats: 'Interactive Analysis' },
            { name: 'Double Passage (Website + Email)', path: '/toeic-part7-double-list', icon: <EnvelopeIcon className="w-5 h-5 text-emerald-500" />, stats: 'Compare two texts' },
          ],
        },
        {
          id: 'toeic-part7-2025',
          name: 'TOEIC Part 7 2025',
          icon: '📘',
          color: 'from-violet-500 to-fuchsia-600',
          badge: '2025',
          tests: [
            { name: 'Test 1 Part 7 2025', path: '/toeic-part7-2025-test-1', icon: <DocumentTextIcon className="w-5 h-5 text-violet-400" />, stats: '54 Questions, 75 Minutes' },
            { name: 'Test 2 Part 7 2025', path: '/toeic-part7-2025-test-2', icon: <DocumentTextIcon className="w-5 h-5 text-violet-500" />, stats: '54 Questions, 75 Minutes' },
            { name: 'Test 3 Part 7 2025', path: '/toeic-part7-2025-test-3', icon: <DocumentTextIcon className="w-5 h-5 text-fuchsia-400" />, stats: '54 Questions, 75 Minutes' },
            { name: 'Test 4 Part 7 2025', path: '/toeic-part7-2025-test-4', icon: <DocumentTextIcon className="w-5 h-5 text-fuchsia-500" />, stats: '54 Questions, 75 Minutes' },
            { name: 'Test 5 Part 7 2025', path: '/toeic-part7-2025-test-5', icon: <DocumentTextIcon className="w-5 h-5 text-purple-400" />, stats: '54 Questions, 75 Minutes' },
            { name: 'Test 6 Part 7 2025', path: '/toeic-part7-2025-test-6', icon: <DocumentTextIcon className="w-5 h-5 text-purple-500" />, stats: '54 Questions, 75 Minutes' },
            { name: 'Test 7 Part 7 2025', path: '/toeic-part7-2025-test-7', icon: <DocumentTextIcon className="w-5 h-5 text-indigo-400" />, stats: '54 Questions, 75 Minutes' },
            { name: 'Test 8 Part 7 2025', path: '/toeic-part7-2025-test-8', icon: <DocumentTextIcon className="w-5 h-5 text-indigo-500" />, stats: '54 Questions, 75 Minutes' },
            { name: 'Test 9 Part 7 2025', path: '/toeic-part7-2025-test-9', icon: <DocumentTextIcon className="w-5 h-5 text-blue-400" />, stats: '54 Questions, 75 Minutes' },
            { name: 'Test 10 Part 7 2025', path: '/toeic-part7-2025-test-10', icon: <DocumentTextIcon className="w-5 h-5 text-blue-500" />, stats: '54 Questions, 75 Minutes' },
          ],
        },
        {
          id: 'toeic-speaking',
          name: 'TOEIC Speaking',
          icon: '🗣️',
          color: 'from-cyan-500 to-blue-600',
          badge: 'FUN',
          tests: [
            { name: 'TOEIC Speaking Test 1', path: '/toeic-speaking-test-1', icon: <ChatBubbleLeftRightIcon className="w-5 h-5 text-cyan-400" />, stats: '11 Tasks, 20 Minutes' },
            { name: 'TOEIC Speaking Test 2', path: '/toeic-speaking-test-2', icon: <ChatBubbleLeftRightIcon className="w-5 h-5 text-cyan-500" />, stats: '11 Tasks, 20 Minutes' },
            { name: 'TOEIC Speaking Test 3', path: '/toeic-speaking-test-3', icon: <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-400" />, stats: '11 Tasks, 20 Minutes' },
          ],
        },
        {
          id: 'giaipart5',
          name: 'PART THEO CHỦ ĐỀ',
          icon: '💊',
          color: 'from-purple-500 to-pink-600',
          badge: 'HOT',
          tests: [
            { name: 'TOEIC Part 5 Practice - Test 1', path: '/toeic-part5-test-1', icon: <DocumentTextIcon className="w-5 h-5 text-purple-400" />, stats: '50 Questions' },
            { name: 'TOEIC Part 5 Practice - Test 2', path: '/toeic-part5-test-2', icon: <DocumentTextIcon className="w-5 h-5 text-purple-500" />, stats: '30 Questions' },
            { name: 'TOEIC Part 5 Practice - Test 3', path: '/toeic-part5-test-3', icon: <DocumentTextIcon className="w-5 h-5 text-pink-400" />, stats: '30 Questions' },
            { name: 'TOEIC Part 5 Practice - Test 4', path: '/toeic-part5-test-4', icon: <DocumentTextIcon className="w-5 h-5 text-pink-500" />, stats: '30 Questions' },
            { name: 'TOEIC Part 5 Practice - Test 5', path: '/toeic-part5-test-5', icon: <DocumentTextIcon className="w-5 h-5 text-rose-400" />, stats: '30 Questions' },
            { name: 'TOEIC Part 5 Practice - Test 6', path: '/toeic-part5-test-6', icon: <DocumentTextIcon className="w-5 h-5 text-rose-500" />, stats: '30 Questions' },
            { name: 'TOEIC Part 5 Practice - Test 7', path: '/toeic-part5-test-7', icon: <DocumentTextIcon className="w-5 h-5 text-red-400" />, stats: '30 Questions' },
            { name: 'TOEIC Part 5 Practice - Test 8', path: '/toeic-part5-test-8', icon: <DocumentTextIcon className="w-5 h-5 text-red-500" />, stats: '30 Questions' },
            { name: 'TOEIC Part 5 Practice - Test 9', path: '/toeic-part5-test-9', icon: <DocumentTextIcon className="w-5 h-5 text-red-600" />, stats: '30 Questions' },
            { name: 'TOEIC Part 5 Practice - Test 10', path: '/toeic-part5-test-10', icon: <DocumentTextIcon className="w-5 h-5 text-orange-400" />, stats: '30 Questions' },
            { name: 'TOEIC Part 5 Practice - Test 11', path: '/toeic-part5-test-11', icon: <DocumentTextIcon className="w-5 h-5 text-orange-500" />, stats: '50 Questions' },
            { name: 'TOEIC Part 5 Practice - Test 12', path: '/toeic-part5-test-12', icon: <DocumentTextIcon className="w-5 h-5 text-yellow-400" />, stats: '50 Questions' },
            { name: 'TOEIC Part 5 Practice - Test 13', path: '/toeic-part5-test-13', icon: <DocumentTextIcon className="w-5 h-5 text-yellow-500" />, stats: '50 Questions' },
            { name: 'TOEIC Part 5 Practice - Test 14', path: '/toeic-part5-test-14', icon: <DocumentTextIcon className="w-5 h-5 text-green-400" />, stats: '50 Questions' },
            { name: 'TOEIC Part 5 Practice - Test 15', path: '/toeic-part5-test-15', icon: <DocumentTextIcon className="w-5 h-5 text-green-500" />, stats: '50 Questions' },
          ],
        },
        {
          id: 'toeic-reading',
          name: 'PART 5 TƯƠNG TÁC',
          icon: '📖',
          color: 'from-green-500 to-teal-600',
          badge: 'NEW',
          tests: [
            { name: 'INVO Mini 1 (Q147-152)', path: '/toeic-part7-2025-test1-invo-mini1', icon: <DocumentTextIcon className="w-5 h-5 text-emerald-400" />, stats: '3 Đoạn, Tương Tác' },
            { name: 'INVO Mini 2 (Q153-160)', path: '/toeic-part7-2025-test1-invo-mini2', icon: <DocumentTextIcon className="w-5 h-5 text-emerald-500" />, stats: '3 Đoạn, Tương Tác' },
            { name: 'INVO Mini 3 (Q161-171)', path: '/toeic-part7-2025-test1-invo-mini3', icon: <DocumentTextIcon className="w-5 h-5 text-teal-400" />, stats: '3 Đoạn, Tương Tác' },
            { name: 'INVO Mini 4 (Q172-185)', path: '/toeic-part7-2025-test1-invo-mini4', icon: <DocumentTextIcon className="w-5 h-5 text-teal-500" />, stats: '3 Đoạn, Tương Tác' },
            { name: 'INVO Mini 5 (Q186-200)', path: '/toeic-part7-2025-test1-invo-mini5', icon: <DocumentTextIcon className="w-5 h-5 text-cyan-400" />, stats: '3 Đoạn, Tương Tác' },
          ],
        }
      ],
    },
    {
      id: 'ielts',
      name: 'IELTS',
      icon: '🎓',
      color: 'from-indigo-500 to-purple-600',
      warehouses: [
        {
          id: 'ielts-reading',
          name: 'IELTS Reading',
          icon: '📖',
          color: 'from-purple-500 to-pink-600',
          badge: 'NEW',
          tests: [
            {
              name: 'TRUE/FALSE/NOT GIVEN (Mini)',
              path: '/ielts-reading-mini-tfng',
              icon: <DocumentTextIcon className="w-5 h-5 text-blue-400" />,
              stats: 'Bài mini: 100 từ, 2 câu - Digital Photography'
            },
            {
              name: 'TRUE/FALSE/NOT GIVEN (Mini Scoring)',
              path: '/ielts-reading-mini-scoring-1',
              icon: <DocumentTextIcon className="w-5 h-5 text-green-400" />,
              stats: 'Bài mini: 100 từ, 3 câu - Healthy Eating Habits | Có tính điểm'
            },
            {
              name: 'TRUE/FALSE/NOT GIVEN (Mini Scoring 2)',
              path: '/ielts-reading-mini-scoring-2',
              icon: <DocumentTextIcon className="w-5 h-5 text-teal-400" />,
              stats: 'Bài mini: 100 từ, 3 câu - The Benefits of Sleep | Có tính điểm'
            },
            {
              name: 'TRUE/FALSE/NOT GIVEN',
              path: '/ielts-reading-passage1',
              icon: <DocumentTextIcon className="w-5 h-5 text-purple-400" />,
              stats: 'Passage 1: How tennis rackets have changed'
            },
            {
              name: 'TRUE/FALSE/NOT GIVEN (Có tính điểm)',
              path: '/ielts-reading-passage1-scoring',
              icon: <DocumentTextIcon className="w-5 h-5 text-purple-500" />,
              stats: 'Đúng +1, Sai -0.5 | Đúng 80% = +1 🍌'
            },
          ],
        },
        {
          id: 'ielts-speaking',
          name: 'IELTS Speaking',
          icon: '🗣️',
          color: 'from-blue-500 to-cyan-600',
          badge: 'NEW',
          tests: [
            {
              name: 'Good Service - Dịch Vụ Tốt',
              path: '/ielts-speaking-part1-good-service',
              icon: <MegaphoneIcon className="w-5 h-5 text-blue-400" />,
              stats: 'IELTS Speaking Part 1 - Interactive Vocabulary Practice'
            },
          ],
        },
        {
          id: 'ielts-academic',
          name: 'IELTS Academic',
          icon: '📚',
          color: 'from-indigo-500 to-blue-600',
          badge: 'ACADEMIC',
          tests: [
            { name: 'IELTS Academic Test 1', path: '/ielts-academic-test-1', icon: <AcademicCapIcon className="w-5 h-5 text-indigo-400" />, stats: '4 Sections, 2h 45min' },
            { name: 'IELTS Academic Test 2', path: '/ielts-academic-test-2', icon: <AcademicCapIcon className="w-5 h-5 text-indigo-500" />, stats: '4 Sections, 2h 45min' },
          ],
        }
      ],
    },
    {
      id: 'vstep',
      name: 'VSTEP',
      icon: '🇻🇳',
      color: 'from-red-500 to-orange-600',
      warehouses: [
        {
          id: 'vstep-levels',
          name: 'VSTEP Levels',
          icon: '📊',
          color: 'from-red-500 to-pink-600',
          badge: 'NATIONAL',
          tests: [
            { name: 'VSTEP B1 Test', path: '/vstep-b1-test', icon: <StarIcon className="w-5 h-5 text-red-400" />, stats: '4 Skills, 3h 30min' },
            { name: 'VSTEP B2 Test', path: '/vstep-b2-test', icon: <StarIcon className="w-5 h-5 text-red-500" />, stats: '4 Skills, 3h 30min' },
            { name: 'VSTEP C1 Test', path: '/vstep-c1-test', icon: <StarIcon className="w-5 h-5 text-pink-400" />, stats: '4 Skills, 3h 30min' },
          ],
        },
        {
          id: 'vstep-reading',
          name: 'VSTEP Reading',
          icon: '📖',
          color: 'from-orange-500 to-red-600',
          badge: 'NEW',
          tests: [
            { name: 'Loại Câu Hỏi Ý Chính', path: '/vstep-reading-main-idea', icon: <DocumentTextIcon className="w-5 h-5 text-orange-400" />, stats: 'Main Idea Questions' },
            { name: 'Loại Câu Hỏi Từ Vựng', path: '/vstep-reading-vocabulary', icon: <DocumentTextIcon className="w-5 h-5 text-orange-500" />, stats: 'Vocabulary Questions' },
            { name: 'Loại Câu Hỏi Thông Tin Chi Tiết', path: '/vstep-reading-detail', icon: <DocumentTextIcon className="w-5 h-5 text-red-400" />, stats: 'Detail Information Questions' },
            { name: 'Loại Câu Hỏi Thông Tin Suy Ra', path: '/vstep-reading-inference', icon: <DocumentTextIcon className="w-5 h-5 text-red-500" />, stats: 'Inference Questions' },
            { name: 'Loại Câu Hỏi Tổng Hợp', path: '/vstep-reading-synthesis', icon: <DocumentTextIcon className="w-5 h-5 text-pink-400" />, stats: 'Synthesis Questions' },
            { name: 'Loại Câu Hỏi Khác', path: '/vstep-reading-other', icon: <DocumentTextIcon className="w-5 h-5 text-pink-500" />, stats: 'Other Question Types' },
          ],
        }
      ],
    },
    {
      id: 'basic',
      name: 'Căn bản',
      icon: '📚',
      color: 'from-emerald-500 to-teal-600',
      warehouses: [
        {
          id: 'basic-grammar',
          name: 'Ngữ pháp căn bản',
          icon: '✏️',
          color: 'from-emerald-500 to-teal-600',
          badge: 'BASIC',
          tests: [
            { name: 'A/An và Plurals', path: '/test-hub-basic-a-an-plurals', icon: <AcademicCapIcon className="w-5 h-5 text-emerald-400" />, stats: 'Mạo từ và số nhiều' },
            { name: 'So/Such', path: '/test-hub-basic-so-such', icon: <AcademicCapIcon className="w-5 h-5 text-teal-400" />, stats: 'So và Such' },
            { name: 'Question Words', path: '/test-hub-basic-question-words', icon: <AcademicCapIcon className="w-5 h-5 text-indigo-400" />, stats: 'Từ để hỏi' },
          ],
        },
        {
          id: 'advanced-grammar',
          name: 'Ngữ pháp nâng cao',
          icon: '🚀',
          color: 'from-purple-500 to-pink-600',
          badge: 'ADVANCED',
          tests: [
            { name: 'Ngữ pháp nâng cao - 40 Models', path: '/test-hub-basic-advanced-grammar', icon: <AcademicCapIcon className="w-5 h-5 text-purple-400" />, stats: '40 Models với metadata thông minh' },
            { name: '40 Bài Grammar Thực Hành', path: '/grammar-lessons', icon: <AcademicCapIcon className="w-5 h-5 text-indigo-400" />, stats: '40 bài × 30 câu, Mindmap, +1/-0.5 điểm' },
          ],
        }
      ],
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-5xl font-bold text-gray-900">
              Test Hub
            </h1>
            <NavLink
              to="/leaderboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105"
            >
              <TrophyIcon className="w-6 h-6" />
              <span>Vinh Danh Hàng Tuần</span>
            </NavLink>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chọn loại bài test phù hợp với mục tiêu học tập của bạn. Từ TOEIC, IELTS đến VSTEP - tất cả đều có sẵn!
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/30">
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('mobile')}
                title="Mobile View"
                className={`px-4 py-2 rounded-xl ${
                  viewMode === 'mobile'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600'
                }`}
              >
                <DevicePhoneMobileIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('pc')}
                title="Desktop View"
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                  viewMode === 'pc'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ComputerDesktopIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid - Compact Pill Design */}
        <div className="flex justify-center gap-4 mb-8">
          {testCategories.map((category) => (
            <div
              key={category.id}
              className={`relative bg-gradient-to-br ${category.color} backdrop-blur-xl rounded-full shadow-lg overflow-hidden
                          border-2 border-white/30 ${
                            selectedCategory === category.id ? 'ring-4 ring-white shadow-2xl scale-110' : ''
                          }`}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
            >
              {/* Pill Shape Effect */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-white/40 rounded-full"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-white/40 rounded-full"></div>
              
              <div className="relative px-6 py-4 min-w-[120px]">
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div className="text-center">
                    <h2 className="font-bold text-white text-lg">{category.name}</h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Warehouses Grid - Show when category is selected */}
        {selectedCategory && (
          <div id="warehouses-grid" className="mt-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {testCategories.find(cat => cat.id === selectedCategory)?.name} Warehouses
              </h2>
              <p className="text-gray-600">
                Chọn kho để xem chi tiết các bài test
              </p>
            </div>
            
            {/* Three Column Layout for Giải Part 5 */}
            {selectedWarehouse === 'giaipart5' ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Grammar Column (1/4) */}
                <div className="lg:col-span-1">
                  {renderGrammarColumn()}
                </div>

                {/* Main Content Column (2/4) */}
                <div className="lg:col-span-2">
                  <div className={`grid gap-4 ${
                    viewMode === 'mobile' 
                      ? 'grid-cols-1 max-w-md mx-auto' 
                      : 'grid-cols-1'
                  }`}>
                    {testCategories.find(cat => cat.id === selectedCategory)?.warehouses.map((warehouse) => (
                      <div
                        key={warehouse.id}
                        className={`relative bg-gradient-to-br from-purple-100/90 to-pink-100/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden
                                    border-2 border-purple-200/50 ${
                                      viewMode === 'mobile' ? 'w-full' : ''
                                    }`}
                        onClick={() => setSelectedWarehouse(selectedWarehouse === warehouse.id ? '' : warehouse.id)}
                      >
                        {/* Pill Shape Effect */}
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-lg"></div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-lg"></div>
                        <div className={`absolute inset-0 bg-gradient-to-br ${warehouse.color} opacity-15`}></div>
                        <div className={`relative ${viewMode === 'mobile' ? 'p-4' : 'p-8'}`}>
                          <div className={`flex items-center justify-between mb-6 ${
                            viewMode === 'mobile' ? 'flex-col space-y-3' : ''
                          }`}>
                            <div className={`flex items-center ${viewMode === 'mobile' ? 'flex-col text-center' : ''}`}>
                              {warehouse.id === 'giaipart5' ? (
                                <div className="relative">
                                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl">
                                    <span className="text-4xl">💊</span>
                                  </div>
                                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white text-xs font-bold">!</span>
                                  </div>
                                </div>
                              ) : (
                                <span className={`${viewMode === 'mobile' ? 'text-6xl mb-3' : 'text-6xl mr-6'}`}>{warehouse.icon}</span>
                              )}
                              <div>
                                <h2 className={`font-bold text-gray-900 ${viewMode === 'mobile' ? 'text-2xl' : 'text-4xl'}`}>{warehouse.name}</h2>
                              </div>
                            </div>
                            <div className={`px-4 py-2 rounded-full text-xl font-bold shadow-lg ${
                              warehouse.badge === 'NEW' ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                              warehouse.badge === 'POPULAR' ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white' :
                              warehouse.badge === 'FUN' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                              warehouse.badge === 'HOT' ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white' :
                              warehouse.badge === 'BASIC' ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white' :
                              'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                            }`}>
                              {warehouse.badge}
                            </div>
                          </div>

                          <div className="space-y-2 mb-6">
                            {warehouse.tests.map((test, index) => (
                              <NavLink
                                key={index}
                                to={test.path}
                                className={`relative flex items-center justify-between p-2 bg-gradient-to-r from-white/80 to-purple-50/80 rounded-xl group border border-purple-200/50 ${
                                  viewMode === 'mobile' ? 'flex-col space-y-1 text-center' : ''
                                }`}
                              >
                                <div className={`flex items-center ${viewMode === 'mobile' ? 'flex-col space-y-1' : ''}`}>
                                  {warehouse.id === 'giaipart5' ? (
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-md mr-3">
                                      <span className="text-sm">💊</span>
                                    </div>
                                  ) : (
                                    <div className="w-8 h-8 flex items-center justify-center mr-3">
                                      {test.icon}
                                    </div>
                                  )}
                                  <span className={`font-medium text-purple-800 ${
                                    viewMode === 'mobile' ? 'ml-0 text-sm' : 'ml-2 text-base'
                                  }`}>{test.name}</span>
                                </div>
                                <div className="flex flex-col items-start">
                                  <span className={`text-xs text-purple-600 flex items-center ${
                                    viewMode === 'mobile' ? 'justify-center' : ''
                                  }`}>
                                    {test.stats} <ArrowRightIcon className="w-4 h-4 ml-1 text-purple-500" />
                                  </span>
                                </div>
                              </NavLink>
                            ))}
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vocabulary Column (1/4) */}
                <div className="lg:col-span-1">
                  {renderVocabularyColumn()}
                </div>
              </div>
            ) : (
              <div className={`grid gap-4 ${
                viewMode === 'mobile' 
                  ? 'grid-cols-1 max-w-md mx-auto' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {testCategories.find(cat => cat.id === selectedCategory)?.warehouses.map((warehouse) => {
                  // Always show tests for TOEIC category, otherwise check selectedWarehouse
                  const isExpanded = selectedCategory === 'toeic' || selectedWarehouse === warehouse.id;
                  
                  return (
                  <div
                    key={warehouse.id}
                      className={`relative bg-white rounded-2xl border border-gray-300 shadow-sm ${
                                  viewMode === 'mobile' ? 'w-full' : ''
                                }`}
                      onClick={() => selectedCategory !== 'toeic' && setSelectedWarehouse(selectedWarehouse === warehouse.id ? '' : warehouse.id)}
                  >
                      <div className={`relative ${viewMode === 'mobile' ? 'p-5' : 'p-6'}`}>
                      <div className={`flex items-center justify-between mb-4 ${
                        viewMode === 'mobile' ? 'flex-col space-y-3' : ''
                      }`}>
                        <div className={`flex items-center ${viewMode === 'mobile' ? 'flex-col text-center' : ''}`}>
                            <span className={`${viewMode === 'mobile' ? 'text-4xl mb-2' : 'text-3xl mr-3'}`}>{warehouse.icon}</span>
                          <div>
                              <h2 className={`font-bold text-gray-900 ${viewMode === 'mobile' ? 'text-xl' : 'text-2xl'}`}>{warehouse.name}</h2>
                          </div>
                        </div>
                          <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          warehouse.badge === 'NEW' ? 'bg-green-100 text-green-800' :
                          warehouse.badge === 'POPULAR' ? 'bg-blue-100 text-blue-800' :
                          warehouse.badge === 'FUN' ? 'bg-yellow-100 text-yellow-800' :
                          warehouse.badge === 'HOT' ? 'bg-red-100 text-red-800' :
                          warehouse.badge === 'BASIC' ? 'bg-emerald-100 text-emerald-800' :
                            warehouse.badge === 'ORGANIZED' ? 'bg-indigo-100 text-indigo-800' :
                            warehouse.badge === 'INTERACTIVE' ? 'bg-emerald-100 text-emerald-800' :
                            warehouse.badge === '2025' ? 'bg-violet-100 text-violet-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {warehouse.badge}
                        </div>
                      </div>

                        {isExpanded && (
                          <div className={`grid gap-2.5 ${
                            ['toeic-part5-by-year', 'toeic-part6-by-year', 'toeic-part7-by-year'].includes(warehouse.id) 
                              ? 'grid-cols-3' 
                              : 'grid-cols-1'
                          } ${viewMode === 'mobile' ? 'grid-cols-1' : ''}`}>
                            {warehouse.tests.map((test, index) => {
                              const getGradientColor = (warehouseId: string, name: string) => {
                                if (warehouseId === 'toeic-part5-by-year') {
                                  if (name === '2025') return 'from-red-500 to-pink-600';
                                  if (name === '2024') return 'from-orange-500 to-red-600';
                                  if (name === '2023') return 'from-yellow-500 to-orange-600';
                                  if (name === '2022') return 'from-lime-500 to-yellow-600';
                                  if (name === '2021') return 'from-green-500 to-lime-600';
                                  if (name === '2020') return 'from-teal-500 to-green-600';
                                  if (name === '2019') return 'from-cyan-500 to-teal-600';
                                  if (name === '2018') return 'from-blue-500 to-cyan-600';
                                  if (name === 'YBM VOL 1') return 'from-green-500 to-teal-600';
                                  if (name === 'YBM VOL 2') return 'from-blue-500 to-indigo-600';
                                  if (name === 'YBM VOL 3') return 'from-purple-500 to-indigo-600';
                                  return null;
                                }

                                if (warehouseId === 'toeic-part6-by-year') {
                                  if (name === '2025') return 'from-rose-500 to-fuchsia-600';
                                  if (name === '2024') return 'from-orange-500 to-rose-600';
                                  if (name === '2023') return 'from-amber-500 to-orange-600';
                                  if (name === '2022') return 'from-yellow-500 to-amber-600';
                                  if (name === '2021') return 'from-lime-500 to-green-600';
                                  if (name === '2020') return 'from-teal-500 to-cyan-600';
                                  if (name === '2019') return 'from-sky-500 to-cyan-600';
                                  if (name === '2018') return 'from-indigo-500 to-blue-600';
                                  if (name === 'YBM Vol 1') return 'from-blue-500 to-indigo-600';
                                  if (name === 'YBM Vol 2') return 'from-purple-500 to-indigo-600';
                                  if (name === 'YBM Vol 3') return 'from-fuchsia-500 to-purple-600';
                                  if (name === 'HACKER Vol 3') return 'from-red-500 to-pink-600';
                                  return null;
                                }

                                if (warehouseId === 'toeic-part7-by-year') {
                                  if (name === '2025') return 'from-rose-500 to-fuchsia-600';
                                  if (name === '2024') return 'from-orange-500 to-rose-600';
                                  if (name === '2023') return 'from-amber-500 to-orange-600';
                                  if (name === '2022') return 'from-yellow-500 to-amber-600';
                                  if (name === '2021') return 'from-lime-500 to-green-600';
                                  if (name === '2020') return 'from-teal-500 to-cyan-600';
                                  if (name === '2019') return 'from-sky-500 to-cyan-600';
                                  if (name === '2018') return 'from-indigo-500 to-blue-600';
                                  if (name === 'INVO Mini Series') return 'from-fuchsia-500 to-purple-600';
                                  return null;
                                }

                                return null;
                              };

                              const gradientColor = getGradientColor(warehouse.id, test.name);
                              const hasGradient = gradientColor !== null;

                              return (
                          <NavLink
                            key={index}
                            to={test.path}
                                  onClick={(e) => e.stopPropagation()}
                                  className={`flex items-center justify-between p-4 rounded-lg shadow-sm ${
                                    hasGradient 
                                      ? `bg-gradient-to-r ${gradientColor}`
                                      : 'bg-gradient-to-r from-emerald-400 to-teal-500'
                                  } ${
                                    viewMode === 'mobile' ? 'flex-col space-y-2 text-center' : ''
                                  }`}
                                >
                                  <div className={`flex-1 min-w-0 ${viewMode === 'mobile' ? 'text-center' : ''}`}>
                                    <span className={`font-bold text-white block text-base break-words ${
                                      viewMode === 'mobile' ? 'mb-1' : 'mb-0.5'
                                }`}>{test.name}</span>
                                    <span className={`text-xs text-white/90 block ${
                                      viewMode === 'mobile' ? '' : ''
                                }`}>
                                  {test.stats}
                                </span>
                            </div>
                            
                                  <div className={`flex-shrink-0 ${viewMode === 'mobile' ? 'mt-1' : 'ml-2'}`}>
                                    <ArrowRightIcon className={`text-white ${
                                      viewMode === 'mobile' ? 'w-5 h-5 mx-auto' : 'w-4 h-4'
                              }`} />
                            </div>
                          </NavLink>
                              );
                            })}
                      </div>
                        )}

                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600">
            Bắt đầu hành trình luyện thi của bạn ngay bây giờ và đạt được mục tiêu tiếng Anh của bạn!
          </p>
          <NavLink
            to="/grammar"
            className="mt-6 inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-700"
          >
            Khám phá thêm các công cụ học tập khác
            <ArrowRightIcon className="ml-3 -mr-1 h-5 w-5" />
          </NavLink>
        </div>
      </div>
      {showCelebration && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ willChange: 'transform' }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ willChange: 'transform' }}>
            {stars.slice(0, 200).map(s => (
              <div key={`s-${s.id}`} style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, transform: `translate(-50%, -50%) scale(${s.scale})`, animation: `gt-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`, opacity: s.opacity, color: '#fff', fontSize: '10px', willChange: 'transform, opacity' }}>✦</div>
            ))}
            {particles.slice(0, 1000).map(p => (
              <div key={p.id} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: `translate(-50%, -50%) rotate(${p.rotate}deg) scale(${p.scale})`, animation: `gt-float-up ${p.duration}s ease-out ${p.delay}s forwards`, opacity: 0.9, fontSize: '18px', willChange: 'transform, opacity' }}>{p.emoji}</div>
            ))}
          </div>
          <div className="relative z-[61] flex flex-col items-center gap-3 pointer-events-auto">
            <div className="w-[360px] h-[360px] rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 flex items-center justify-center shadow-2xl ring-8 ring-yellow-200/60 animate-[gt-pop_800ms_ease-out]">
              <div className="text-[220px] drop-shadow">🍌</div>
            </div>
            <div className="text-white text-2xl font-extrabold drop-shadow-lg animate-[gt-fadein_900ms_ease-out]">Chúc mừng! Bạn vừa đạt &gt; 80% 🎉</div>
          </div>
          <style>{`
            @keyframes gt-pop { 0% { transform: scale(0.2); opacity: 0; } 60% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); } }
            @keyframes gt-fadein { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }
            @keyframes gt-float-up { 0% { transform: translate(-50%, 10vh) scale(0.6); opacity: 0; } 20% { opacity: 1; } 100% { transform: translate(-50%, -90vh) scale(1.1); opacity: 0; } }
            @keyframes gt-twinkle { 0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.2; } 50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; } }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default Mtest;