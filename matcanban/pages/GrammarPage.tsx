
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
// FIX: Moved CustomVocabData import from customVocabService to types, as it is defined and exported there.
import { Unit, Group, GrammarState, Subject, Flags, Lemma, VocabItem, VocabPack, CustomVocabData } from '../types';
import { units as defaultUnits } from '../data/units';
import { groups as defaultGroups } from '../data/groups';
// FIX: Use the INITIAL_LEMMA constant for cleaner state initialization.
import { INITIAL_LEMMA, LOCAL_STORAGE_KEYS } from '../constants';
import { generateSentence, getFlagsForUnit } from '../services/grammarService';
import CoreHost from '../components/CoreHost';
import { vocab as defaultVocab } from '../data/vocab';
import { useLocation } from 'react-router-dom';
import { getCustomPacksForUser } from '../services/customVocabService';
import { ArrowsPointingOutIcon, XMarkIcon, PlusCircleIcon, TrashIcon, ChevronDownIcon } from '../components/Icons';
import { loadOrInitializeData } from '../services/dataService';
import { useAuth } from '../App';
import { getGrammarPageState, saveGrammarPageState } from '../services/userStateService';


// --- Re-styled & New Components ---

const FullScreenSentence: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    enHtml: string;
    vi: string;
}> = ({ isOpen, onClose, enHtml, vi }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-[100] p-4" onClick={onClose}>
            <div className="text-center">
                <p 
                    className="text-6xl lg:text-8xl font-extrabold text-white break-words tracking-tight"
                    dangerouslySetInnerHTML={{ __html: enHtml }} 
                />
                <p className="text-3xl lg:text-4xl text-gray-300 mt-6">{vi}</p>
            </div>
            <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 rounded-full bg-black/20">
                <XMarkIcon className="w-8 h-8"/>
            </button>
        </div>
    );
};

const VocabModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    wordType: string;
    vocabPack: VocabItem[];
    onSelect: (item: VocabItem) => void;
}> = ({ isOpen, onClose, wordType, vocabPack, onSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (isOpen) {
            setSearchQuery(''); // Reset search when modal opens
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const filteredVocab = vocabPack.filter(item => {
        const searchTerm = searchQuery.toLowerCase();
        const english = (item.base || item.word || '').toLowerCase();
        const vietnamese = (item.vi || '').toLowerCase();
        return english.includes(searchTerm) || vietnamese.includes(searchTerm);
    });
    

    const handleSelect = (item: VocabItem) => {
        onSelect(item);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4" onClick={onClose}>
            <div 
                className="card-base w-full max-w-md max-h-[80vh] flex flex-col bg-gray-50"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <header className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-gray-50 rounded-t-2xl">
                    <h3 className="text-xl font-bold text-gray-800">Chọn {wordType}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors p-1 rounded-full">
                        <XMarkIcon className="w-7 h-7"/>
                    </button>
                </header>
                <div className="p-4">
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Tìm kiếm từ..."
                        className="form-input text-base"
                        autoFocus
                    />
                </div>
                <div className="flex-grow overflow-y-auto p-4 pt-0">
                    <ul className="space-y-1">
                        {filteredVocab.map((item, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleSelect(item)}
                                    className="w-full text-left p-3 rounded-xl hover:bg-white transition-colors flex justify-between items-center"
                                >
                                    <span className="font-semibold text-gray-800 text-lg">{item.base || item.word}</span>
                                    <span className="text-base text-gray-500">{item.vi}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const TopBar: React.FC<{
    onButtonClick: (type: string) => void;
    activeType: string | null;
    customPacks: CustomVocabData;
}> = ({ onButtonClick, activeType, customPacks }) => {
    const [isVocaMenuOpen, setIsVocaMenuOpen] = useState(false);
    const vocaMenuRef = useRef<HTMLDivElement>(null);

    const wordTypes = ['Động từ', 'Động từ BQT', 'Tính từ', 'Trạng từ', 'Danh từ', 'Giới từ', 'Liên từ'];
    const allButtons = [
        ...wordTypes.map(type => ({ name: type, isCustom: false })),
        ...Object.keys(customPacks).map(packName => ({ name: packName, isCustom: true }))
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (vocaMenuRef.current && !vocaMenuRef.current.contains(event.target as Node)) {
                setIsVocaMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getButtonClass = (type: string, isCustom = false) => {
        let base = "px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap";
        if (type === activeType) {
            return isCustom 
                ? `${base} bg-teal-600 text-white shadow-sm ring-teal-400`
                : `${base} bg-gray-800 text-white shadow-sm ring-gray-400`;
        }
        return isCustom
            ? `${base} bg-teal-50 text-teal-800 hover:bg-teal-100`
            : `${base} bg-gray-100 text-gray-800 hover:bg-gray-200`;
    };
    
    const handleDropdownClick = (type: string) => {
        onButtonClick(type);
        setIsVocaMenuOpen(false);
    };

    return (
        <div className="relative" ref={vocaMenuRef}>
            {/* Desktop View */}
            <div className="hidden md:flex items-center flex-wrap gap-1">
                {allButtons.map(btn => (
                    <button key={btn.name} className={getButtonClass(btn.name, btn.isCustom)} onClick={() => onButtonClick(btn.name)}>
                        {btn.name}
                    </button>
                ))}
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsVocaMenuOpen(prev => !prev)}
                    className="px-4 py-2 rounded-full font-semibold transition-colors flex items-center gap-2 bg-white border border-gray-300 text-gray-800 shadow-sm"
                >
                    Voca
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 transition-transform ${isVocaMenuOpen ? 'rotate-180' : ''}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
                {isVocaMenuOpen && (
                    <div className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-lg p-2 z-20 border border-gray-200">
                        <ul className="space-y-1">
                            {allButtons.map(btn => (
                                <li key={btn.name}>
                                    <button 
                                      className={`w-full text-left p-2 rounded-lg font-medium text-sm transition-colors ${activeType === btn.name ? (btn.isCustom ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-900') : 'hover:bg-gray-50'}`}
                                      onClick={() => handleDropdownClick(btn.name)}
                                    >
                                        {btn.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

const SubjectVerbSelector: React.FC<{
    subject: Subject;
    onSubjectChange: (s: Subject) => void;
    lemma: Lemma;
    onLemmaChange: (l: Lemma) => void;
}> = ({ subject, onSubjectChange, lemma, onLemmaChange }) => {
    const subjects: Subject[] = ['I', 'you', 'we', 'they', 'he', 'she', 'it', 'N (số nhiều)', 'danh từ số ít'];
    const subjectMap = {
        'I': 'I (Tôi)', 'you': 'You (Bạn)', 'we': 'We (Chúng tôi)', 'they': 'They (Họ)', 'he': 'He (Anh ấy)', 'she': 'She (Cô ấy)', 'it': 'It (Nó)', 'N (số nhiều)': 'N (số nhiều)', 'danh từ số ít': 'N (số ít)'
    }
    
    const getLemmaLabel = () => {
        switch(lemma.type) {
            case 'adj': return 'TÍNH TỪ';
            case 'adv': return 'TRẠNG TỪ';
            case 'noun': return 'DANH TỪ';
            case 'prep': return 'GIỚI TỪ';
            case 'conj': return 'LIÊN TỪ';
            case 'verb':
            default:
                return 'ĐỘNG TỪ';
        }
    };

    return (
        <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">CHỦ NGỮ</label>
                <select 
                    value={subject} 
                    onChange={(e) => onSubjectChange(e.target.value as Subject)}
                    className="h-11 px-4 rounded-xl border-gray-300 bg-white text-base shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                    {subjects.map(s => <option key={s} value={s}>{subjectMap[s] || s}</option>)}
                </select>
             </div>
             <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">{getLemmaLabel()}</label>
                <input 
                    type="text" 
                    value={lemma.text}
                    onChange={(e) => onLemmaChange({ ...lemma, text: e.target.value, base: e.target.value, vi: undefined })}
                    className="h-11 w-40 px-4 rounded-xl border-gray-300 bg-white text-base shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                />
             </div>
        </div>
    );
};


const HeroZone: React.FC<{ enHtml: string; vi: string; error: string | null; onToggleFullScreen: () => void; }> = ({ enHtml, vi, error, onToggleFullScreen }) => {
    const containerClasses = "relative text-center p-6 rounded-2xl min-h-[180px] flex flex-col justify-center items-center card-base bg-white shadow-lg";

    if (error) {
        return (
             <div className={containerClasses}>
                <div className="px-5 py-3 bg-yellow-100 text-yellow-800 rounded-xl border border-yellow-300">
                    <p className="font-bold text-lg">{error}</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className={containerClasses}>
            <button onClick={onToggleFullScreen} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100" title="View Full Screen">
                <ArrowsPointingOutIcon className="w-6 h-6"/>
            </button>
            <p 
                className="text-4xl md:text-6xl font-extrabold text-gray-800 break-words tracking-tight" 
                dangerouslySetInnerHTML={{ __html: enHtml }} 
            />
            <p className="text-xl text-gray-600 mt-2">{vi}</p>
        </div>
    );
};

const Controls: React.FC<{
    flags: Flags;
    onFlagChange: <K extends keyof Flags>(key: K, value: Flags[K]) => void;
    shortForm: boolean;
    setShortForm: React.Dispatch<React.SetStateAction<boolean>>;
    compact: boolean;
    setCompact: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ flags, onFlagChange, shortForm, setShortForm, compact, setCompact }) => {
    
    const getBtnClass = (isActive: boolean, group: 'tense' | 'aspect' | 'polarity' | 'voice' | 'other') => {
        const base = `px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ease-in-out whitespace-nowrap leading-none focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm border`;
    
        const themes = {
            present: { // Green theme
                tense:    { active: 'bg-green-600 text-white border-green-700 focus:ring-green-400',    inactive: 'bg-green-50 text-green-800 border-green-200 hover:bg-green-100 focus:ring-green-400' },
                aspect:   { active: 'bg-emerald-600 text-white border-emerald-700 focus:ring-emerald-400', inactive: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 focus:ring-emerald-400' },
                polarity: { active: 'bg-teal-600 text-white border-teal-700 focus:ring-teal-400',       inactive: 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100 focus:ring-teal-400' },
                voice:    { active: 'bg-cyan-600 text-white border-cyan-700 focus:ring-cyan-400',        inactive: 'bg-cyan-50 text-cyan-800 border-cyan-200 hover:bg-cyan-100 focus:ring-cyan-400' },
                other:    { active: 'bg-cyan-600 text-white border-cyan-700 focus:ring-cyan-400',        inactive: 'bg-cyan-50 text-cyan-800 border-cyan-200 hover:bg-cyan-100 focus:ring-cyan-400' },
            },
            past: { // Blue theme
                tense:    { active: 'bg-blue-600 text-white border-blue-700 focus:ring-blue-400',    inactive: 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100 focus:ring-blue-400' },
                aspect:   { active: 'bg-sky-600 text-white border-sky-700 focus:ring-sky-400',       inactive: 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100 focus:ring-sky-400' },
                polarity: { active: 'bg-indigo-600 text-white border-indigo-700 focus:ring-indigo-400', inactive: 'bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100 focus:ring-indigo-400' },
                voice:    { active: 'bg-violet-600 text-white border-violet-700 focus:ring-violet-400', inactive: 'bg-violet-50 text-violet-800 border-violet-200 hover:bg-violet-100 focus:ring-violet-400' },
                other:    { active: 'bg-violet-600 text-white border-violet-700 focus:ring-violet-400', inactive: 'bg-violet-50 text-violet-800 border-violet-200 hover:bg-violet-100 focus:ring-violet-400' },
            },
            future: { // Purple/Pink theme
                tense:    { active: 'bg-purple-600 text-white border-purple-700 focus:ring-purple-400',    inactive: 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100 focus:ring-purple-400' },
                aspect:   { active: 'bg-fuchsia-600 text-white border-fuchsia-700 focus:ring-fuchsia-400', inactive: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200 hover:bg-fuchsia-100 focus:ring-fuchsia-400' },
                polarity: { active: 'bg-pink-600 text-white border-pink-700 focus:ring-pink-400',         inactive: 'bg-pink-50 text-pink-800 border-pink-200 hover:bg-pink-100 focus:ring-pink-400' },
                voice:    { active: 'bg-rose-600 text-white border-rose-700 focus:ring-rose-400',          inactive: 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100 focus:ring-rose-400' },
                other:    { active: 'bg-rose-600 text-white border-rose-700 focus:ring-rose-400',          inactive: 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100 focus:ring-rose-400' },
            },
        };
        const colors = themes[flags.tense][group];
        return isActive ? `${base} ${colors.active}` : `${base} ${colors.inactive}`;
    };
    
    const divider = <span className={`w-px h-4 inline-block mx-1 ${ {present: 'bg-green-200', past: 'bg-blue-200', future: 'bg-purple-200'}[flags.tense] }`} />;

    return (
        <div className="p-2 rounded-2xl bg-white/70 border border-gray-200 shadow-sm">
            <div className="flex flex-nowrap items-center gap-1 overflow-x-auto pb-2">
                <button className={getBtnClass(flags.tense === 'present', 'tense')} onClick={() => onFlagChange('tense', 'present')}>Hiện tại</button>
                <button className={getBtnClass(flags.tense === 'past', 'tense')} onClick={() => onFlagChange('tense', 'past')}>Quá khứ</button>
                <button className={getBtnClass(flags.tense === 'future', 'tense')} onClick={() => onFlagChange('tense', 'future')}>Tương lai</button>
                {divider}
                <button className={getBtnClass(flags.aspect === 'simple', 'aspect')} onClick={() => onFlagChange('aspect', 'simple')}>Đơn</button>
                <button className={getBtnClass(flags.aspect === 'progressive', 'aspect')} onClick={() => onFlagChange('aspect', 'progressive')}>Tiếp diễn</button>
                <button className={getBtnClass(flags.aspect === 'perfect', 'aspect')} onClick={() => onFlagChange('aspect', 'perfect')}>Hoàn thành</button>
                <button className={getBtnClass(flags.aspect === 'perfect_progressive', 'aspect')} onClick={() => onFlagChange('aspect', 'perfect_progressive')}>HTTD</button>
                {divider}
                <button className={getBtnClass(flags.polarity === 'affirmative', 'polarity')} onClick={() => onFlagChange('polarity', 'affirmative')}>Khẳng định</button>
                <button className={getBtnClass(flags.polarity === 'negative', 'polarity')} onClick={() => onFlagChange('polarity', 'negative')}>Phủ định</button>
                <button className={getBtnClass(flags.polarity === 'interrogative', 'polarity')} onClick={() => onFlagChange('polarity', 'interrogative')}>Nghi vấn</button>
                {divider}
                <button className={getBtnClass(flags.voice === 'active', 'voice')} onClick={() => onFlagChange('voice', 'active')}>Chủ động</button>
                <button className={getBtnClass(flags.voice === 'passive', 'voice')} onClick={() => onFlagChange('voice', 'passive')}>Bị động</button>
                {divider}
                <button className={getBtnClass(flags.near_future, 'other')} onClick={() => onFlagChange('near_future', !flags.near_future)}>Dự định</button>
                <button className={getBtnClass(shortForm, 'other')} onClick={() => setShortForm(v => !v)}>Câu ngắn</button>
                <button className={getBtnClass(compact, 'other')} onClick={() => setCompact(v => !v)}>Thu gọn</button>
            </div>
        </div>
    );
};

const ColumnCard: React.FC<{ title: string; count: number; children: React.ReactNode }> = ({ title, count, children }) => (
    <div className="card-base p-3 h-full flex flex-col bg-white">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
            {count > 0 && <span className="bg-green-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">{count}</span>}
        </div>
        <div className="flex-grow overflow-y-auto pr-2 -mr-2">
             {children}
        </div>
    </div>
);

const GroupsColumn: React.FC<{ groups: Group[], onSelect: (groupId: number) => void; selectedId: number | null }> = ({ groups, onSelect, selectedId }) => (
    <ColumnCard title="Nhóm Ngữ pháp" count={groups.length}>
        <ul className="space-y-1">
            {groups.map((g) => ( 
                <li key={g.id}>
                    <button
                        onClick={() => onSelect(g.id)}
                        className={`w-full text-left p-2.5 rounded-xl transition-colors text-base flex flex-col ${selectedId === g.id ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}>
                        <span className="font-semibold">{g.vi}</span>
                        <span className="text-sm text-gray-500">{g.en}</span>
                    </button>
                </li>
            ))}
        </ul>
    </ColumnCard>
);

const UnitsColumn: React.FC<{ units: Unit[], selectedGroupId: number | null; onSelect: (unit: Unit) => void; selectedId: string | null }> = ({ units, selectedGroupId, onSelect, selectedId }) => {
    const filteredUnits = selectedGroupId ? units.filter(u => u.group_id === selectedGroupId) : [];
    return (
        <ColumnCard title="Đơn vị Ngữ pháp" count={filteredUnits.length}>
            <ul className="space-y-1">
                {filteredUnits.map((u) => (
                    <li key={u.id}>
                        <button
                            onClick={() => onSelect(u)}
                            className={`w-full text-left p-2.5 rounded-xl transition-colors text-base flex flex-col ${selectedId === u.id ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}>
                            <span className="font-semibold">{u.vi}</span>
                            <span className="text-sm text-gray-500">{u.en}</span>
                        </button>
                    </li>
                ))}
            </ul>
    </ColumnCard>
    )
};

const CoreKnowledgeColumn: React.FC<{ 
    unit: Unit | null;
    fontSize: number;
    setFontSize: React.Dispatch<React.SetStateAction<number>>;
    onToggleFullScreen: () => void;
    scrollRef: React.RefObject<HTMLDivElement>;
}> = ({ unit, fontSize, setFontSize, onToggleFullScreen, scrollRef }) => {
    const onIncrease = () => setFontSize(size => Math.min(40, size + 1));
    const onDecrease = () => setFontSize(size => Math.max(12, size - 1));

    const controls = (
        <div className="flex items-center space-x-1">
            <button onClick={onDecrease} className="w-8 h-8 flex items-center justify-center text-xl rounded-md hover:bg-gray-200 transition-colors">-</button>
            <span className="font-semibold text-sm w-8 text-center">{fontSize}px</span>
            <button onClick={onIncrease} className="w-8 h-8 flex items-center justify-center text-xl rounded-md hover:bg-gray-200 transition-colors">+</button>
            <button onClick={onToggleFullScreen} className="p-1 rounded-md hover:bg-gray-200 transition-colors ml-2" title="Full Screen">
                <ArrowsPointingOutIcon className="w-6 h-6 text-gray-600" />
            </button>
        </div>
    );
    
    return (
        <div className="card-base p-3 h-full flex flex-col bg-white">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-800">Kiến Thức Cốt Lõi</h2>
                {controls}
            </div>
            <div 
                ref={scrollRef}
                className="flex-grow overflow-y-auto pr-4 -mr-4 text-gray-800" 
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
            >
                {!unit ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-4"><path d="M20 12h-8"/><path d="M12 4v16"/><path d="M20 12l-4 4"/><path d="M20 12l-4-4"/><path d="M4 4v16"/></svg>
                        <h3 className="font-bold text-lg text-gray-700">Chưa chọn đơn vị ngữ pháp</h3>
                        <p className="text-base">Chọn một đơn vị từ cột bên cạnh để xem.</p>
                    </div>
                ) : (
                    <CoreHost canonKey={unit?.canonKey} />
                )}
            </div>
        </div>
    );
};

const FullScreenCoreKnowledge: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    unit: Unit | null;
    fontSize: number;
    setFontSize: React.Dispatch<React.SetStateAction<number>>;
    scrollRef: React.RefObject<HTMLDivElement>;
}> = ({ isOpen, onClose, unit, fontSize, setFontSize, scrollRef }) => {
    if (!isOpen) return null;

    const onIncrease = () => setFontSize(size => Math.min(40, size + 1));
    const onDecrease = () => setFontSize(size => Math.max(12, size - 1));

    const controls = (
        <div className="flex items-center space-x-2">
            <button onClick={onDecrease} className="w-9 h-9 flex items-center justify-center text-xl rounded-md hover:bg-gray-200 transition-colors">-</button>
            <span className="font-semibold text-base w-10 text-center">{fontSize}px</span>
            <button onClick={onIncrease} className="w-9 h-9 flex items-center justify-center text-xl rounded-md hover:bg-gray-200 transition-colors">+</button>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-gray-50 z-[60] p-4 sm:p-6 lg:p-8 flex flex-col">
            <header className="flex-shrink-0 flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">{unit?.vi || 'Kiến Thức Cốt Lõi'}</h2>
                <div className="flex items-center gap-4">
                    {controls}
                    <button onClick={onClose} className="btn btn-secondary flex items-center gap-2 text-base">
                        <XMarkIcon className="w-5 h-5" />
                        Thu gọn
                    </button>
                </div>
            </header>
            <div 
                ref={scrollRef}
                className="flex-grow overflow-y-auto pr-4 -mr-4" 
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
            >
                <CoreHost canonKey={unit?.canonKey} />
            </div>
        </div>
    );
};

// NEW: Mobile Navigation Component
const MobileGrammarNav: React.FC<{
    groups: Group[];
    units: Unit[];
    selectedGroupId: number | null;
    selectedUnitId: string | null;
    onGroupSelect: (groupId: number) => void;
    onUnitSelect: (unit: Unit) => void;
    onCoreKnowledgeClick: () => void;
}> = ({ groups, units, selectedGroupId, selectedUnitId, onGroupSelect, onUnitSelect, onCoreKnowledgeClick }) => {
    return (
        <div className="card-base p-4 bg-white space-y-2">
            <h2 className="text-lg font-bold text-gray-800 text-center mb-2">Danh mục Ngữ pháp</h2>
            {groups.map(group => {
                const isGroupSelected = selectedGroupId === group.id;
                const filteredUnits = units.filter(u => u.group_id === group.id);

                return (
                    <div key={group.id} className="border-b border-gray-200 last:border-b-0">
                        {/* Cấp 1: Nhóm Ngữ pháp */}
                        <button
                            onClick={() => onGroupSelect(group.id)}
                            className="w-full text-left p-3 rounded-lg transition-colors flex justify-between items-center text-base font-semibold text-gray-800 hover:bg-gray-100"
                        >
                            <span>{group.vi}</span>
                            <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isGroupSelected ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Cấp 2: Đơn vị Ngữ pháp */}
                        {isGroupSelected && (
                            <div className="pl-4 py-2 space-y-1">
                                {filteredUnits.map(unit => {
                                    const isUnitSelected = selectedUnitId === unit.id;
                                    return (
                                        <div key={unit.id}>
                                            <button
                                                onClick={() => onUnitSelect(unit)}
                                                className={`w-full text-left p-2 rounded-md transition-colors text-sm ${isUnitSelected ? 'bg-green-100 text-green-800 font-semibold' : 'hover:bg-gray-50'}`}
                                            >
                                                <span className="block">{unit.vi}</span>
                                                <span className="block text-xs text-gray-500">{unit.en}</span>
                                            </button>

                                            {/* Cấp 3: Kiến Thức Cốt Lõi */}
                                            {isUnitSelected && (
                                                <div className="pl-4 pt-1 pb-2">
                                                    <button
                                                        onClick={onCoreKnowledgeClick}
                                                        className="w-full text-left p-2 rounded-md text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                                                    >
                                                        Xem Kiến Thức Cốt Lõi
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};


// --- Main Page ---
const GrammarPage: React.FC = () => {
    // Load data from localStorage or initialize with defaults
    const units = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.GRAMMAR_UNITS, defaultUnits), []);
    const groups = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.GRAMMAR_GROUPS, defaultGroups), []);
    const vocab = useMemo(() => loadOrInitializeData(LOCAL_STORAGE_KEYS.GRAMMAR_VOCAB, defaultVocab), []);
    
    const { currentUser } = useAuth();
    
    // Load state from localStorage or use defaults
    const initialGrammarState = getGrammarPageState();

    const [_state, _setState] = useState<GrammarState>(initialGrammarState?._state ?? {
        subject: 'I',
        lemma: INITIAL_LEMMA,
        flags: {
            tense: 'present',
            aspect: 'simple',
            voice: 'active',
            polarity: 'affirmative',
            near_future: false,
            short_answer: false,
            contractions: true,
        },
        unitId: '1-1',
    });

    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(initialGrammarState?.selectedGroupId ?? 1);
    const [shortForm, setShortForm] = useState(initialGrammarState?.shortForm ?? false);
    const [compact, setCompact] = useState(initialGrammarState?.compact ?? false);
    const [coreFontSize, setCoreFontSize] = useState(initialGrammarState?.coreFontSize ?? 21);
    const [activeVocabType, setActiveVocabType] = useState<string | null>(initialGrammarState?.activeVocabType ?? null);
    
    const [isVocabModalOpen, setIsVocabModalOpen] = useState(false);
    const [isCoreFullScreen, setIsCoreFullScreen] = useState(false);
    const [isSentenceFullScreen, setIsSentenceFullScreen] = useState(false);
    const [customPacks, setCustomPacks] = useState<CustomVocabData>({});

    const coreContentRef = useRef<HTMLDivElement>(null);
    const coreContentFsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCustomPacks(getCustomPacksForUser(currentUser?.id));
    }, [currentUser]);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        const stateToSave = {
            selectedGroupId,
            shortForm,
            compact,
            coreFontSize,
            activeVocabType,
            _state,
        };
        saveGrammarPageState(stateToSave);
    }, [selectedGroupId, shortForm, compact, coreFontSize, activeVocabType, _state]);

    const [hero, setHero] = useState({ en: '', enHtml: '', vi: '', error: null as string | null });
    
    const location = useLocation();

    useEffect(() => {
        const { en, enHtml, vi, error } = generateSentence(_state, shortForm);
        setHero({ en, enHtml, vi, error });
    }, [_state, shortForm]);

    const handleUnitSelect = useCallback((unit: Unit) => {
        const newFlags = getFlagsForUnit(unit, _state.flags);
        _setState(prev => ({ ...prev, unitId: unit.id, flags: newFlags }));

        // Smooth scroll CoreKnowledgeColumn to top using refs
        if (coreContentRef.current) {
            coreContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (coreContentFsRef.current) {
            coreContentFsRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [_state.flags]);

    const topRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const unitKeyFromUrl = params.get('unit');
        if (unitKeyFromUrl) {
            const unitToSelect = units.find(u => u.canonKey === unitKeyFromUrl);
            if (unitToSelect) {
                const group = groups.find(g => g.id === unitToSelect.group_id);
                if (group) {
                    setSelectedGroupId(group.id);
                }
                handleUnitSelect(unitToSelect);
                topRef.current?.scrollIntoView({behavior: 'smooth'});
            }
        }
    }, [location, handleUnitSelect, units, groups]);


    const handleFlagChange = <K extends keyof Flags>(key: K, value: Flags[K]) => {
        _setState(prev => ({ ...prev, flags: { ...prev.flags, [key]: value } }));
    };
    
    const handleSubjectChange = (subject: Subject) => _setState(prev => ({ ...prev, subject }));
    const handleLemmaChange = (lemma: Lemma) => _setState(prev => ({ ...prev, lemma }));
    
    const handleGroupSelect = (groupId: number) => {
        setSelectedGroupId(groupId);
        const firstUnit = units.find(u => u.group_id === groupId);
        if (firstUnit) handleUnitSelect(firstUnit);
        else _setState(prev => ({ ...prev, unitId: null }));
    }

    const handleMobileGroupSelect = (groupId: number) => {
        setSelectedGroupId(prevId => (prevId === groupId ? null : groupId));
    };

    const handleVocabButtonClick = (type: string) => {
        setActiveVocabType(type);
        setIsVocabModalOpen(true);
    };

    const handleVocabSelect = (item: VocabItem) => {
        let newLemma: Lemma;
        const typeMap: Record<string, Lemma['type']> = {
            'Động từ': 'verb', 'Động từ BQT': 'verb', 'Tính từ': 'adj', 
            'Trạng từ': 'adv', 'Danh từ': 'noun', 'Giới từ': 'prep', 'Liên từ': 'conj',
        };
        const lemmaType = typeMap[activeVocabType || ''] || 'verb';

        newLemma = { 
            type: lemmaType,
            text: item.word || item.base || '',
            base: item.base,
            past: item.past,
            pp: item.pp,
            ing: item.ing,
            vi: item.vi,
            article: item.article,
        };
        _setState(prev => ({ ...prev, lemma: newLemma }));
    };

    const getVocabPack = () => {
        const typeMap: Record<string, keyof VocabPack> = {
            'Động từ': 'verb', 'Động từ BQT': 'irregular', 'Tính từ': 'adj', 'Trạng từ': 'adv',
            'Danh từ': 'noun_sg', 'Giới từ': 'prep', 'Liên từ': 'conj',
        };
        const key = activeVocabType ? typeMap[activeVocabType] : null;

        if (key && vocab.packs[key]) return vocab.packs[key];
        if (activeVocabType && customPacks[activeVocabType]) return customPacks[activeVocabType];
        return [];
    };

    const selectedUnit = units.find(u => u.id === _state.unitId);

    return (
        <div ref={topRef} id="top" className="space-y-2">
            <FullScreenSentence
                isOpen={isSentenceFullScreen}
                onClose={() => setIsSentenceFullScreen(false)}
                enHtml={hero.enHtml}
                vi={hero.vi}
            />
            <VocabModal
                isOpen={isVocabModalOpen}
                onClose={() => setIsVocabModalOpen(false)}
                wordType={activeVocabType || ''}
                vocabPack={getVocabPack()}
                onSelect={handleVocabSelect}
            />
            
            <FullScreenCoreKnowledge
                isOpen={isCoreFullScreen}
                onClose={() => setIsCoreFullScreen(false)}
                unit={selectedUnit || null}
                fontSize={coreFontSize}
                setFontSize={setCoreFontSize}
                scrollRef={coreContentFsRef}
            />
            
            {/* Top section */}
            <div className="space-y-2">
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-2 items-center">
                    <TopBar 
                        onButtonClick={handleVocabButtonClick} 
                        activeType={activeVocabType} 
                        customPacks={customPacks}
                    />
                    <SubjectVerbSelector 
                        subject={_state.subject} 
                        onSubjectChange={handleSubjectChange}
                        lemma={_state.lemma}
                        onLemmaChange={handleLemmaChange}
                    />
                </div>

                <HeroZone 
                    enHtml={hero.enHtml} 
                    vi={hero.vi} 
                    error={hero.error}
                    onToggleFullScreen={() => setIsSentenceFullScreen(true)}
                />
                <Controls
                    flags={_state.flags}
                    onFlagChange={handleFlagChange}
                    shortForm={shortForm}
                    setShortForm={setShortForm}
                    compact={compact}
                    setCompact={setCompact}
                />
            </div>

            {/* Bottom section with responsive layout */}
            <div className="min-h-0">
                 {/* DESKTOP VIEW */}
                <div className={`hidden lg:grid ${compact ? 'lg:grid-cols-2' : 'lg:grid-cols-[1fr_1fr_2fr]'} gap-2 h-[calc(100vh-24rem)]`}>
                    <div className="lg:col-span-1 min-h-0">
                        <GroupsColumn groups={groups} onSelect={handleGroupSelect} selectedId={selectedGroupId} />
                    </div>
                    <div className="lg:col-span-1 min-h-0">
                        <UnitsColumn units={units} selectedGroupId={selectedGroupId} onSelect={handleUnitSelect} selectedId={_state.unitId} />
                    </div>
                    {!compact && (
                        <div className="lg:col-span-1 min-h-0">
                            <CoreKnowledgeColumn 
                                unit={selectedUnit || null}
                                fontSize={coreFontSize}
                                setFontSize={setCoreFontSize}
                                onToggleFullScreen={() => setIsCoreFullScreen(true)}
                                scrollRef={coreContentRef}
                            />
                        </div>
                    )}
                </div>

                {/* MOBILE VIEW */}
                <div className="block lg:hidden">
                    <MobileGrammarNav
                        groups={groups}
                        units={units}
                        selectedGroupId={selectedGroupId}
                        selectedUnitId={_state.unitId}
                        onGroupSelect={handleMobileGroupSelect}
                        onUnitSelect={handleUnitSelect}
                        onCoreKnowledgeClick={() => setIsCoreFullScreen(true)}
                    />
                </div>
            </div>
        </div>
    );
};

export default GrammarPage;