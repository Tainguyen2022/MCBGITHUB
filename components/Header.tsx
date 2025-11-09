
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { BananaIcon } from './Icons';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const [isSpeakingDropdownOpen, setIsSpeakingDropdownOpen] = useState(false);
	const [isWritingDropdownOpen, setIsWritingDropdownOpen] = useState(false);
	const [isVocaHubDropdownOpen, setIsVocaHubDropdownOpen] = useState(false);
	const [isIReadDropdownOpen, setIsIReadDropdownOpen] = useState(false);
	const [showBananaPopup, setShowBananaPopup] = useState(false);
	const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);
	const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);
	const userMenuRef = useRef<HTMLDivElement>(null);
	const speakingDropdownRef = useRef<HTMLDivElement>(null);
	const writingDropdownRef = useRef<HTMLDivElement>(null);
	const vocaHubDropdownRef = useRef<HTMLDivElement>(null);
	const iReadDropdownRef = useRef<HTMLDivElement>(null);
	// Removed isDense state - not needed

	// Removed density useEffect - not needed

	// Removed toggleDensity function - not needed


	const handleLogout = () => {
		logout();
		setIsMobileMenuOpen(false);
		setIsUserMenuOpen(false);
		navigate('/grammar');
	};
	
 	 useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
				setIsUserMenuOpen(false);
			}
		if (speakingDropdownRef.current && !speakingDropdownRef.current.contains(event.target as Node)) {
			setIsSpeakingDropdownOpen(false);
		}
		if (writingDropdownRef.current && !writingDropdownRef.current.contains(event.target as Node)) {
			setIsWritingDropdownOpen(false);
		}
		if (vocaHubDropdownRef.current && !vocaHubDropdownRef.current.contains(event.target as Node)) {
			setIsVocaHubDropdownOpen(false);
		}
		if (iReadDropdownRef.current && !iReadDropdownRef.current.contains(event.target as Node)) {
			setIsIReadDropdownOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
		`block px-4 py-3 text-lg font-semibold rounded-lg ${
			isActive ? 'bg-green-700 text-white' : 'text-green-100 hover:bg-green-700'
		}`;
		
	const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
		`header-nav-item ${isActive ? 'active' : ''}`;
		
	const aioNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
		`header-nav-item header-nav-item--aio ${isActive ? 'active' : ''}`;

	const CloseIcon = () => (
		<svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
		</svg>
	);

	const HamburgerIcon = () => (
		 <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	);

	// Get user level/title based on banana balance
	const getUserLevel = (bananaBalance: number, role: string): { title: string; color: string; gradient: string } => {
		if (role === 'Admin' || role === 'Super Admin') {
			return {
				title: '👑 Quản trị viên',
				color: 'text-purple-600',
				gradient: 'from-purple-500 to-pink-600'
			};
		}
		
		if (bananaBalance >= 10000) {
			return {
				title: '🌟 Huyền thoại',
				color: 'text-yellow-600',
				gradient: 'from-yellow-500 via-amber-500 to-orange-500'
			};
		} else if (bananaBalance >= 5000) {
			return {
				title: '💎 Bậc thầy',
				color: 'text-blue-600',
				gradient: 'from-blue-500 to-indigo-600'
			};
		} else if (bananaBalance >= 2000) {
			return {
				title: '🏆 Chuyên gia',
				color: 'text-green-600',
				gradient: 'from-green-500 to-emerald-600'
			};
		} else if (bananaBalance >= 1000) {
			return {
				title: '⭐ Nâng cao',
				color: 'text-teal-600',
				gradient: 'from-teal-500 to-cyan-600'
			};
		} else if (bananaBalance >= 500) {
			return {
				title: '🎯 Trung cấp',
				color: 'text-orange-600',
				gradient: 'from-orange-500 to-red-500'
			};
		} else if (bananaBalance >= 100) {
			return {
				title: '🌱 Sơ cấp',
				color: 'text-lime-600',
				gradient: 'from-lime-500 to-green-500'
			};
		} else {
			return {
				title: '🌿 Người mới',
				color: 'text-gray-600',
				gradient: 'from-gray-400 to-gray-600'
			};
		}
	};

	const handleAvatarClick = () => {
		if (currentUser) {
			setShowBananaPopup(true);
			// Generate hundreds of hearts and stars for celebration effect
			const newHearts: Array<{ id: number; x: number; y: number; size: number; delay: number }> = [];
			const newStars: Array<{ id: number; x: number; y: number; size: number; delay: number }> = [];
			
			// Generate 50-80 hearts
			const heartCount = 50 + Math.floor(Math.random() * 30);
			for (let i = 0; i < heartCount; i++) {
				newHearts.push({
					id: Date.now() + i,
					x: Math.random() * 100,
					y: Math.random() * 100,
					size: 1 + Math.random() * 0.5, // Random size between 1x and 1.5x
					delay: Math.random() * 0.8
				});
			}
			
			// Generate 60-100 stars
			const starCount = 60 + Math.floor(Math.random() * 40);
			for (let i = 0; i < starCount; i++) {
				newStars.push({
					id: Date.now() + i + 10000,
					x: Math.random() * 100,
					y: Math.random() * 100,
					size: 0.8 + Math.random() * 0.7, // Random size between 0.8x and 1.5x
					delay: Math.random() * 0.8
				});
			}
			
			setHearts(newHearts);
			setStars(newStars);
			// Auto close after 4 seconds (longer to enjoy the effect)
			setTimeout(() => {
				setShowBananaPopup(false);
				setHearts([]);
				setStars([]);
			}, 4000);
		}
	};

	const UserAvatar: React.FC<{isMobile?: boolean}> = ({ isMobile = false }) => {
		const sizeClass = isMobile ? "w-10 h-10 text-lg" : "w-11 h-11 text-xl";
		return currentUser?.avatar ? (
			<img 
				src={currentUser.avatar} 
				alt="avatar" 
				className={`rounded-full object-cover ring-2 ring-white cursor-pointer transition-transform hover:scale-110 ${isMobile ? 'w-10 h-10' : 'w-11 h-11'}`}
				onClick={handleAvatarClick}
			/>
		 ) : (
			<div 
				className={`rounded-full bg-green-700 text-white flex items-center justify-center font-bold ring-2 ring-white cursor-pointer transition-transform hover:scale-110 ${sizeClass}`}
				onClick={handleAvatarClick}
			>
				{currentUser?.name.charAt(0).toUpperCase()}
			</div>
		 )
	};
		
	// FIX: Refactored component to use conditional rendering (if/else) instead of a dynamic Wrapper component.
	// This resolves a TypeScript error where the `props` object couldn't be correctly assigned to both NavLink and div types.
	const BananaBalanceDisplay: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
		// Use bananaBalance as the source of truth - consistent with BananaAchievements page
		const balance = currentUser ? currentUser.bananaBalance : 0;

		const baseClasses = "flex items-center gap-2 bg-green-400/80 text-yellow-900 font-bold rounded-full transition-transform hover:scale-105 cursor-pointer";
		const mobileClasses = "text-sm px-2.5 py-1 gap-1.5";
		const desktopClasses = "text-base px-3 py-1.5";
		const finalClasses = `${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`;

		const content = (
			<>
				<BananaIcon className={`text-yellow-500 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
				<span className="leading-none">{balance}</span>
			</>
		);
		
		if (currentUser) {
			return (
				<NavLink to="/banana-achievements" className={finalClasses} title="Thành tích chuối / Banana Achievements">
					{content}
				</NavLink>
			);
		}

		return (
			<div onClick={() => navigate('/login')} className={finalClasses} title="AI Credits / Add Bananas">
				{content}
			</div>
		);
	};

	return (
		<header className="app-header sticky top-0 z-50">
			<nav className="container mx-auto px-2 sm:px-4 lg:px-6 relative">
				<div className="flex items-center justify-between h-16">
					<NavLink to="/grammar" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
						<div className="relative">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white drop-shadow-sm group-hover:scale-105 transition-all duration-300">
								<defs>
									<linearGradient id="mcbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
										<stop offset="0%" stopColor="#3b82f6" />
										<stop offset="50%" stopColor="#8b5cf6" />
										<stop offset="100%" stopColor="#ec4899" />
									</linearGradient>
								</defs>
								<circle cx="12" cy="12" r="10" fill="url(#mcbGradient)" opacity="0.8"/>
								<path d="M8 8h8v2H8V8zm0 4h8v2H8v-2zm0 4h6v2H8v-2z" fill="white" opacity="0.9"/>
								<circle cx="12" cy="12" r="2" fill="white" opacity="0.7"/>
							</svg>
							<div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-sm opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
						</div>
						<div className="relative">
							<span className="text-sm font-bold text-white tracking-wide drop-shadow-sm group-hover:scale-105 transition-all duration-300" 
									style={{ 
										textShadow: '0 0 6px rgba(59, 130, 246, 0.3), 0 0 12px rgba(139, 92, 246, 0.2)',
										filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.2))'
									}}>
								MCB
							</span>
						</div>
					</NavLink>
					<div className="hidden md:flex items-center gap-2">
						<NavLink to="/grammar" className={navLinkClasses}>Ngữ pháp</NavLink>
                        <NavLink to="/mtest" className={navLinkClasses}>Test Hub</NavLink>
                        {/* Voca Hub Dropdown */}
                        <div className="relative" ref={vocaHubDropdownRef}>
                            <button
                                onClick={() => setIsVocaHubDropdownOpen(!isVocaHubDropdownOpen)}
                                className={`${navLinkClasses({ isActive: false })} flex items-center gap-1 transition-all duration-200 rounded-lg px-3 py-2`}
                            >
                                Voca Hub
                                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isVocaHubDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isVocaHubDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 backdrop-blur-sm max-h-96 overflow-y-auto">
                                    <NavLink 
                                        to="/voca-hub" 
                                        className="flex items-center px-6 py-4 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
                                        onClick={() => setIsVocaHubDropdownOpen(false)}
                                    >
                                        <span className="text-2xl mr-4">🇬🇧</span>
                                        <div>
                                            <div className="font-semibold text-gray-800">IELTS Vocabulary</div>
                                            <div className="text-sm text-gray-600">Academic vocabulary for IELTS</div>
                                        </div>
                                    </NavLink>
                                    
                                    <NavLink 
                                        to="/voca-hub" 
                                        className="flex items-center px-6 py-4 hover:bg-red-50 cursor-pointer transition-colors duration-200"
                                        onClick={() => setIsVocaHubDropdownOpen(false)}
                                    >
                                        <span className="text-2xl mr-4">🇺🇸</span>
                                        <div>
                                            <div className="font-semibold text-gray-800">TOEIC Vocabulary</div>
                                            <div className="text-sm text-gray-600">Business vocabulary for TOEIC</div>
                                        </div>
                                    </NavLink>
                                    
                                    <NavLink 
                                        to="/voca-hub" 
                                        className="flex items-center px-6 py-4 hover:bg-green-50 cursor-pointer transition-colors duration-200"
                                        onClick={() => setIsVocaHubDropdownOpen(false)}
                                    >
                                        <span className="text-2xl mr-4">🇻🇳</span>
                                        <div>
                                            <div className="font-semibold text-gray-800">VSTEP Vocabulary</div>
                                            <div className="text-sm text-gray-600">Academic vocabulary for VSTEP</div>
                                        </div>
                                    </NavLink>
                                    
                                    <NavLink 
                                        to="/voca-hub" 
                                        className="flex items-center px-6 py-4 hover:bg-purple-50 cursor-pointer transition-colors duration-200"
                                        onClick={() => setIsVocaHubDropdownOpen(false)}
                                    >
                                        <span className="text-2xl mr-4">💬</span>
                                        <div>
                                            <div className="font-semibold text-gray-800">Giao Tiếp Vocabulary</div>
                                            <div className="text-sm text-gray-600">Từ vựng giao tiếp hàng ngày</div>
                                        </div>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        {/* Young Hub Direct Link */}
                        <NavLink to="/young-hub" className={navLinkClasses}>
                            Young Hub
                        </NavLink>
                        
                        {/* Giao Tiếp Direct Link */}
        <NavLink to="/giao-tiep" className={navLinkClasses}>
            Giao Tiếp
        </NavLink>
                        
                        {/* Read Hub Dropdown */}
                        <div className="relative" ref={iReadDropdownRef}>
                            <button
                                onClick={() => setIsIReadDropdownOpen(!isIReadDropdownOpen)}
                                className={`${navLinkClasses({ isActive: false })} flex items-center gap-1 transition-all duration-200 rounded-lg px-3 py-2`}
                            >
                                Read Hub
                                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isIReadDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isIReadDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 backdrop-blur-sm max-h-96 overflow-y-auto">
                                    <NavLink 
                                        to="/iread" 
                                        className="flex items-center px-6 py-4 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
                                        onClick={() => setIsIReadDropdownOpen(false)}
                                    >
                                        <span className="text-2xl mr-4">📚</span>
                                        <div>
                                            <div className="font-semibold text-gray-800">Bilingual Reading Warehouse</div>
                                            <div className="text-sm text-gray-600">Kho đọc song ngữ Việt-Anh</div>
                                        </div>
                                    </NavLink>
                                    
                                    <NavLink 
                                        to="/iread" 
                                        className="flex items-center px-6 py-4 hover:bg-green-50 cursor-pointer transition-colors duration-200"
                                        onClick={() => setIsIReadDropdownOpen(false)}
                                    >
                                        <span className="text-2xl mr-4">📖</span>
                                        <div>
                                            <div className="font-semibold text-gray-800">Self-Study Articles</div>
                                            <div className="text-sm text-gray-600">Bài viết về tự học</div>
                                        </div>
                                    </NavLink>
                                    
                                    <NavLink 
                                        to="/iread" 
                                        className="flex items-center px-6 py-4 hover:bg-purple-50 cursor-pointer transition-colors duration-200"
                                        onClick={() => setIsIReadDropdownOpen(false)}
                                    >
                                        <span className="text-2xl mr-4">🎯</span>
                                        <div>
                                            <div className="font-semibold text-gray-800">Academic Reading</div>
                                            <div className="text-sm text-gray-600">Đọc hiểu học thuật</div>
                                        </div>
                                    </NavLink>
                                    
                                    <NavLink 
                                        to="/iread" 
                                        className="flex items-center px-6 py-4 hover:bg-orange-50 cursor-pointer transition-colors duration-200"
                                        onClick={() => setIsIReadDropdownOpen(false)}
                                    >
                                        <span className="text-2xl mr-4">🚀</span>
                                        <div>
                                            <div className="font-semibold text-gray-800">Coming Soon</div>
                                            <div className="text-sm text-gray-600">Nâng cấp trong tương lai</div>
                                        </div>
                                    </NavLink>
                                    
                                    <div className="border-t border-gray-200 my-2"></div>
                                    
                                    <NavLink 
                                        to="/tips" 
                                        className="flex items-center px-6 py-4 hover:bg-yellow-50 cursor-pointer transition-colors duration-200"
                                        onClick={() => setIsIReadDropdownOpen(false)}
                                    >
                                        <span className="text-2xl mr-4">💡</span>
                                        <div>
                                            <div className="font-semibold text-gray-800">Tip Hub</div>
                                            <div className="text-sm text-gray-600">Mẹo học tập hiệu quả</div>
                                        </div>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        
                        {/* Speaking Hub Dropdown */}
                        <div className="relative" ref={speakingDropdownRef}>
                            <button
                                onClick={() => setIsSpeakingDropdownOpen(!isSpeakingDropdownOpen)}
                                className={`${navLinkClasses({ isActive: false })} flex items-center gap-1 transition-all duration-200 rounded-lg px-3 py-2`}
                            >
                                Speaking
                                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isSpeakingDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isSpeakingDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 backdrop-blur-sm max-h-96 overflow-y-auto">
                                    <div className="px-3 py-1.5 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 mb-2">
                                        IELTS Speaking
                                    </div>
                                    <NavLink to="/ielts-speaking" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsSpeakingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Complete Test
                                    </NavLink>
                                    <NavLink to="/ielts-speaking-part1" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsSpeakingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Part 1 - Introduction
                                    </NavLink>
                                    <NavLink to="/ielts-speaking-part2" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsSpeakingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Part 2 - Long Turn
                                    </NavLink>
                                    <NavLink to="/ielts-speaking-part3" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsSpeakingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Part 3 - Discussion
                                    </NavLink>
                                    
                                    <div className="px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 mb-2 mt-3">
                                        TOEIC Speaking
                                    </div>
                                    <NavLink to="/toeic-speaking" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsSpeakingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Complete Test
                                    </NavLink>
                                    <NavLink to="/toeic-speaking-questions1-2" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsSpeakingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Q1-2 - Read Aloud
                                    </NavLink>
                                    <NavLink to="/toeic-speaking-questions3-4" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsSpeakingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Q3-4 - Describe Picture
                                    </NavLink>
                                    <NavLink to="/toeic-speaking-questions5-7" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsSpeakingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Q5-7 - Respond Questions
                                    </NavLink>
                                    <NavLink to="/toeic-speaking-questions8-10" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsSpeakingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Q8-10 - Use Information
                                    </NavLink>
                                    <NavLink to="/toeic-speaking-question11" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsSpeakingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Q11 - Express Opinion
                                    </NavLink>
                                    
                                    <div className="px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 mb-2 mt-3">
                                        VSTEP Speaking
                                    </div>
                                    <NavLink to="/vstep-speaking" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsSpeakingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Complete Test
                                    </NavLink>
                                    <NavLink to="/vstep-speaking-part1" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsSpeakingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Part 1 - Social Interaction
                                    </NavLink>
                                    <NavLink to="/vstep-speaking-part2" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsSpeakingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Part 2 - Solution Discussion
                                    </NavLink>
                                    <NavLink to="/vstep-speaking-part3" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsSpeakingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Part 3 - Topic Development
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        {/* Writing Dropdown */}
                        <div className="relative" ref={writingDropdownRef}>
                            <button
                                onClick={() => setIsWritingDropdownOpen(!isWritingDropdownOpen)}
                                className={`${navLinkClasses({ isActive: false })} flex items-center gap-1 transition-all duration-200 rounded-lg px-3 py-2`}
                            >
                                Writing
                                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isWritingDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isWritingDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-3 z-50 border border-gray-100 backdrop-blur-sm">
                                    <div className="px-3 py-1.5 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 mb-2">
                                        IELTS Writing
                                    </div>
                                    <NavLink to="/ielts-writing-task1" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsWritingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Task 1 - Academic Writing
                                    </NavLink>
                                    <NavLink to="/ielts-writing-task2" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsWritingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Task 2 - Essay Writing
                                    </NavLink>
                                    
                                    <div className="px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 mb-2 mt-3">
                                        VSTEP Writing
                                    </div>
                                    <NavLink to="/vstep-writing-task1" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsWritingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Task 1 - Guided Writing
                                    </NavLink>
                                    <NavLink to="/vstep-writing-task2" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsWritingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                        Task 2 - Extended Writing
                                    </NavLink>
                                    
                                    <div className="px-4 py-2 text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-blue-100 mb-2 mt-3">
                                        TOEIC Writing
                                    </div>
                                    <NavLink to="/toeic-writing-task1" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsWritingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                        Task 1 - Picture Description
                                    </NavLink>
                                    <NavLink to="/toeic-writing-task2" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsWritingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                        Task 2 - Email Response
                                    </NavLink>
                                    <NavLink to="/toeic-writing-task3" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 rounded-lg mx-2" onClick={() => setIsWritingDropdownOpen(false)}>
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                        Task 3 - Opinion Essay
                                    </NavLink>
                                </div>
                            )}
                        </div>

						<>
							{currentUser?.role === 'Admin' && (
							<NavLink to="/admin" className={aioNavLinkClasses}>Admin</NavLink>
							)}
						</>
					</div>
					<div className="flex items-center">
						{/* Desktop User/Login Section */}
						<div className="hidden md:flex items-center gap-4">
							{currentUser ? (
								<div ref={userMenuRef} className="relative">
									<button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="user-profile-button">
										<div className="text-right pl-2">
											<div className="font-bold text-white text-sm leading-tight">
												{currentUser.name} · {currentUser.role === 'Super Admin' ? 'SA' : currentUser.role === 'Admin' ? 'A' : currentUser.role}
											</div>
										</div>
										<div 
											className="user-profile-avatar cursor-pointer transition-transform hover:scale-110"
											onClick={(e) => {
												e.stopPropagation();
												handleAvatarClick();
											}}
										>
											{currentUser.name.charAt(0).toUpperCase()}
										</div>
										<BananaBalanceDisplay />
									</button>
									{isUserMenuOpen && (
										<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
											<NavLink
												to="/profile"
												onClick={() => setIsUserMenuOpen(false)}
												className="block w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
											>
												Hồ Sơ / Đổi Mật Khẩu
											</NavLink>
											<button
												onClick={handleLogout}
												className="block w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
											>
												Đăng xuất
											</button>
										</div>
									)}
								</div>
							) : (
								<div className="flex items-center gap-4">
									<BananaBalanceDisplay />
									<NavLink to="/login" className="header-nav-item header-nav-item--login">
										Đăng nhập
									</NavLink>
								</div>
							)}
						</div>

						{/* Removed Density Toggle - not needed */}

						{/* Mobile Hamburger Button */}
						<div className="md:hidden flex items-center">
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="inline-flex items-center justify-center p-2 rounded-full text-green-100 hover:text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
								aria-expanded={isMobileMenuOpen.toString()}
								aria-controls="mobile-menu"
							>
								<span className="sr-only">Open main menu</span>
								{isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden bg-green-600 absolute top-full left-0 right-0 shadow-lg border-t border-green-700" id="mobile-menu">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							<NavLink to="/grammar" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Ngữ pháp</NavLink>
							<NavLink to="/mtest" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Test Hub</NavLink>
							{/* Voca Hub Section */}
							<div className="px-3 py-1.5">
								<div className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2">Voca Hub</div>
								<div className="pl-4 space-y-1">
									<NavLink to="/voca-hub" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>🇬🇧 IELTS Vocabulary</NavLink>
									<NavLink to="/voca-hub" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>🇺🇸 TOEIC Vocabulary</NavLink>
									<NavLink to="/voca-hub" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>🇻🇳 VSTEP Vocabulary</NavLink>
									<NavLink to="/voca-hub" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>💬 Giao Tiếp Vocabulary</NavLink>
								</div>
							</div>
							{/* Young Hub Section */}
							<div className="px-3 py-1.5">
								<div className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2">Young Hub</div>
								<div className="pl-4 space-y-1">
									<NavLink to="/young-hub" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>🌟 Young Hub</NavLink>
								</div>
							</div>
							
        <NavLink to="/giao-tiep" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Giao Tiếp</NavLink>
							
							{/* Read Hub Section */}
							<div className="px-3 py-1.5">
								<div className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2">Read Hub</div>
								<div className="pl-4 space-y-1">
									<NavLink to="/iread" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>📚 Bilingual Reading</NavLink>
									<NavLink to="/iread" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>📖 Self-Study Articles</NavLink>
									<NavLink to="/iread" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>🎯 Academic Reading</NavLink>
									<NavLink to="/iread" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>🚀 Coming Soon</NavLink>
									<div className="border-t border-green-500 my-2"></div>
									<NavLink to="/tips" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>💡 Tip Hub</NavLink>
								</div>
							</div>
							
							{/* Speaking Hub Section */}
							<div className="px-3 py-1.5">
								<div className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2">Speaking Hub</div>
								<div className="pl-4 space-y-1">
									<div className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-1 mt-2">IELTS</div>
									<NavLink to="/ielts-speaking" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Complete Test</NavLink>
									<NavLink to="/ielts-speaking-part1" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Part 1 - Introduction</NavLink>
									<NavLink to="/ielts-speaking-part2" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Part 2 - Long Turn</NavLink>
									<NavLink to="/ielts-speaking-part3" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Part 3 - Discussion</NavLink>
									
									<div className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-1 mt-3">TOEIC</div>
									<NavLink to="/toeic-speaking" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Complete Test</NavLink>
									<NavLink to="/toeic-speaking-questions1-2" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Q1-2 - Read Aloud</NavLink>
									<NavLink to="/toeic-speaking-questions3-4" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Q3-4 - Describe Picture</NavLink>
									<NavLink to="/toeic-speaking-questions5-7" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Q5-7 - Respond</NavLink>
									<NavLink to="/toeic-speaking-questions8-10" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Q8-10 - Use Info</NavLink>
									<NavLink to="/toeic-speaking-question11" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Q11 - Opinion</NavLink>
									
									<div className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-1 mt-3">VSTEP</div>
									<NavLink to="/vstep-speaking" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Complete Test</NavLink>
									<NavLink to="/vstep-speaking-part1" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Part 1 - Social</NavLink>
									<NavLink to="/vstep-speaking-part2" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Part 2 - Solution</NavLink>
									<NavLink to="/vstep-speaking-part3" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Part 3 - Topic</NavLink>
								</div>
							</div>
							
							{/* Writing Section */}
							<div className="px-3 py-1.5">
								<div className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2">IELTS Writing</div>
								<div className="pl-4 space-y-1">
                            <NavLink to="/ielts-writing-task1" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Task 1 - Academic Writing</NavLink>
                            <NavLink to="/ielts-writing-task2" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Task 2 - Essay Writing</NavLink>
								</div>
							</div>
							
							{/* VSTEP Writing Section */}
							<div className="px-3 py-1.5">
								<div className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2">VSTEP Writing</div>
								<div className="pl-4 space-y-1">
                            <NavLink to="/vstep-writing-task1" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Task 1 - Guided Writing</NavLink>
                            <NavLink to="/vstep-writing-task2" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Task 2 - Extended Writing</NavLink>
								</div>
							</div>
							
							{/* TOEIC Writing Section */}
							<div className="px-3 py-1.5">
								<div className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2">TOEIC Writing</div>
								<div className="pl-4 space-y-1">
                            <NavLink to="/toeic-writing-task1" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Task 1 - Picture Description</NavLink>
                            <NavLink to="/toeic-writing-task2" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Task 2 - Email Response</NavLink>
                            <NavLink to="/toeic-writing-task3" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Task 3 - Opinion Essay</NavLink>
								</div>
							</div>
							
							<>
								{currentUser?.role === 'Admin' && (
								<NavLink to="/admin" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Admin</NavLink>
								)}
							</>
						</div>
						<div className="pt-4 pb-3 border-t border-green-700">
							 {currentUser ? (
								<div className="flex items-center justify-between px-4">
									 <div className="flex items-center gap-3">
										<div className="flex-shrink-0"><UserAvatar isMobile={true}/></div>
										<div>
											<div className="text-sm font-bold text-white">
												{currentUser.name} · {currentUser.role === 'Super Admin' ? 'SA' : currentUser.role === 'Admin' ? 'A' : currentUser.role}
											</div>
										</div>
									</div>
									<BananaBalanceDisplay isMobile={true} />
								</div>
							 ) : (
								 <div className="flex items-center justify-between px-4">
									<span className="text-base font-medium text-white">Chào mừng bạn!</span>
									<BananaBalanceDisplay isMobile={true} />
								</div>
							 ) }
							 <div className="mt-3 px-2 space-y-1">
								 {currentUser ? (
									 <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-green-100 hover:bg-green-700 hover:text-white">
										Đăng xuất
									</button>
								 ) : (
									 <NavLink to="/login" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
										Đăng nhập
									</NavLink>
								 )}
							 </div>
						</div>
					</div>
				)}
			</nav>
			
			{/* Banana Balance Popup with Hearts and Stars Animation */}
			{showBananaPopup && currentUser && (
				<div 
					className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
					onClick={() => {
						setShowBananaPopup(false);
						setHearts([]);
						setStars([]);
					}}
				>
					{/* Backdrop */}
					<div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto"></div>
					
					{/* Popup Content */}
					<div 
						className="relative bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-yellow-400 pointer-events-auto animate-[scaleIn_0.3s_ease-out] min-w-[320px] max-w-[500px]"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close Button */}
						<button
							onClick={() => {
								setShowBananaPopup(false);
								setHearts([]);
								setStars([]);
							}}
							className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 transition-colors shadow-lg z-20"
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
						
						{/* Main Content */}
						<div className="text-center relative z-10">
							{/* User Name - Super Prominent */}
							<div className="mb-6">
								<h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent drop-shadow-lg animate-[pulse_2s_ease-in-out_infinite]">
									{currentUser.name}
								</h2>
							</div>
							
							{/* User Level/Title - Below Name */}
							{(() => {
								const userLevel = getUserLevel(currentUser.bananaBalance || 0, currentUser.role || 'Free');
								return (
									<div className="mb-6">
										<div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${userLevel.gradient} text-white font-bold text-lg md:text-xl shadow-lg animate-[pulse_2s_ease-in-out_infinite]`}>
											{userLevel.title}
										</div>
									</div>
								);
							})()}
							
							{/* Banana Icon */}
							<div className="mb-4 flex justify-center">
								<div className="relative">
									<BananaIcon className="w-20 h-20 md:w-24 md:h-24 text-yellow-500 animate-bounce" />
									<div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
								</div>
							</div>
							
							{/* Balance Text - Super Prominent */}
							<div className="mb-2">
								<p className="text-sm md:text-base font-semibold text-gray-600 mb-3">Số chuối hiện tại</p>
								<div className="flex items-center justify-center gap-3">
									<span className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent drop-shadow-2xl animate-[pulse_2s_ease-in-out_infinite]">
										{currentUser.bananaBalance || 0}
									</span>
									<span className="text-4xl md:text-6xl animate-bounce">🍌</span>
								</div>
							</div>
						</div>
						
						{/* Floating Hearts */}
						{hearts.map((heart) => (
							<div
								key={heart.id}
								className="absolute animate-[floatUp_4s_ease-out_forwards] pointer-events-none"
								style={{
									left: `${heart.x}%`,
									top: `${heart.y}%`,
									animationDelay: `${heart.delay}s`,
									transform: `scale(${heart.size})`,
									fontSize: '1.5rem'
								}}
							>
								❤️
							</div>
						))}
						
						{/* Floating Stars */}
						{stars.map((star) => (
							<div
								key={star.id}
								className="absolute animate-[floatUp_4s_ease-out_forwards] pointer-events-none"
								style={{
									left: `${star.x}%`,
									top: `${star.y}%`,
									animationDelay: `${star.delay}s`,
									transform: `scale(${star.size})`,
									fontSize: '1.25rem'
								}}
							>
								⭐
							</div>
						))}
					</div>
					
					{/* CSS Animations */}
					<style>{`
						@keyframes scaleIn {
							from {
								transform: scale(0.8);
								opacity: 0;
							}
							to {
								transform: scale(1);
								opacity: 1;
							}
						}
						
						@keyframes floatUp {
							0% {
								transform: translateY(0) scale(1) rotate(0deg);
								opacity: 1;
							}
							50% {
								opacity: 0.8;
							}
							100% {
								transform: translateY(-300px) scale(0.3) rotate(720deg);
								opacity: 0;
							}
						}
					`}</style>
				</div>
			)}
		</header>
	);
};

export default Header;