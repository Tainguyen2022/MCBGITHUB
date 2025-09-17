import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import HeaderScore from './HeaderScore';
import { HeartIcon } from './Icons';

const Header: React.FC = () => {
    const { currentUser, logout, guestBananaBalance } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);


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
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `block px-4 py-3 text-lg font-semibold rounded-lg ${
            isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`;
        
    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `header-nav-item ${isActive ? 'active' : ''}`;
        
    const aioNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `header-nav-item header-nav-item--aio ${isActive ? 'active' : ''}`;

    const aiTestNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `header-nav-item header-nav-item--ai-test ${isActive ? 'active' : ''}`;

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

    const UserAvatar: React.FC<{isMobile?: boolean}> = ({ isMobile = false }) => {
        const sizeClass = isMobile ? "w-8 h-8 text-base" : "w-11 h-11 text-xl";
        return currentUser?.avatar ? (
            <img src={currentUser.avatar} alt="avatar" className={`rounded-full object-cover ring-2 ring-white ${isMobile ? 'w-8 h-8' : 'w-11 h-11'}`} />
         ) : (
            <div className={`rounded-full bg-blue-600 text-white flex items-center justify-center font-bold ring-2 ring-white ${sizeClass}`}>
                {currentUser?.name.charAt(0).toUpperCase()}
            </div>
         )
    };
        
    const BalanceDisplay: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
        const [displayBalance, setDisplayBalance] = useState(currentUser ? currentUser.bananaBalance : guestBananaBalance);
        
        // Update display balance when user or guest balance changes
        useEffect(() => {
            const newBalance = currentUser ? currentUser.bananaBalance : guestBananaBalance;
            console.log('🍌 BalanceDisplay updating:', newBalance);
            setDisplayBalance(newBalance);
        }, [currentUser, guestBananaBalance, currentUser?.bananaBalance]);

        const baseClasses = "flex items-center gap-2 bg-yellow-100 text-yellow-700 font-bold rounded-full transition-transform hover:scale-105 cursor-pointer";
        const mobileClasses = "text-sm px-2.5 py-1 gap-1.5";
        const desktopClasses = "text-base px-3 py-1.5";
        const finalClasses = `${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`;

        const content = (
            <>
                <span>🍌</span>
                <span className="leading-none">{displayBalance || 0}</span>
            </>
        );
        
        if (currentUser) {
            return (
                <NavLink to="/add-bananas" className={finalClasses} title="AI Credits / Nạp Tim">
                    {content}
                </NavLink>
            );
        }

        return (
            <div onClick={() => navigate('/login')} className={finalClasses} title="AI Credits / Nạp Tim">
                {content}
            </div>
        );
    };

    return (
        <header className="app-header apple-theme enhanced-header sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex items-center justify-between h-16">
                    <NavLink to="/grammar" className="logo-container flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="relative">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" fill="currentColor" fillOpacity="0.3"/>
                                <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z" fill="currentColor"/>
                            </svg>
                            <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20 animate-ping"></div>
                        </div>
                        <span className="text-xl font-bold text-gray-800 tracking-tight">
                            Mat<span className="text-blue-600">can</span>ban
                        </span>
                    </NavLink>
                    <div className="hidden md:flex items-center gap-1">
                        <NavLink to="/grammar" className={navLinkClasses}>iGrammar</NavLink>
                        {/* Writing Studio removed; redirect now handled */}
                        <NavLink to="/i-write" className={navLinkClasses}>iWrite</NavLink>
                        <NavLink to="/i-speak" className={navLinkClasses}>iSpeak</NavLink>
                        <NavLink to="/tips" className={navLinkClasses}>iTips</NavLink>
                        <NavLink to="/exam-hub" className={navLinkClasses}>iTest</NavLink>
                        {currentUser?.role === 'Admin' && (
                            <>
                                <NavLink to="/admin" className="header-nav-item bg-red-500 text-white">Admin</NavLink>
                                <NavLink to="/aio" className="header-nav-item bg-purple-500 text-white">AIO</NavLink>
                            </>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Score Display */}
                        <div className="hidden md:block">
                            <HeaderScore />
                        </div>
                        
                        {/* Desktop User/Login Section */}
                        <div className="hidden md:flex items-center gap-2">
                            {currentUser ? (
                                <div ref={userMenuRef} className="relative">
                                    <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="user-profile-button">
                                        <div className="text-right pl-2">
                                            <div className="font-bold text-gray-800 text-base leading-tight">{currentUser.name}</div>
                                            <div className="text-sm text-gray-600 leading-tight">{currentUser.role}</div>
                                        </div>
                                        <div className="user-profile-avatar">{currentUser.name.charAt(0).toUpperCase()}</div>
                                        <BalanceDisplay />
                                    </button>
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Đăng xuất
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <BalanceDisplay />
                                    <NavLink to="/login" className="header-nav-item header-nav-item--login">
                                        Đăng nhập
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        {/* Mobile Hamburger Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                aria-expanded={isMobileMenuOpen}
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
                    <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg border-t border-gray-200" id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <NavLink to="/grammar" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>iGrammar</NavLink>
                            {/* Writing Studio removed; redirect now handled */}
                            <NavLink to="/i-speak" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>iSpeak</NavLink>
                            <NavLink to="/i-write" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>iWrite</NavLink>
                            <NavLink to="/tips" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>iTips</NavLink>
                            <NavLink to="/exam-hub" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>iTest</NavLink>
                             {currentUser?.role === 'Admin' && (
                                <NavLink to="/admin-hub" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Super Admin</NavLink>
                            )}
                        </div>
                        <div className="pt-4 pb-3 border-t border-green-700">
                             {currentUser ? (
                                <div className="flex items-center justify-between px-4">
                                     <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0"><UserAvatar isMobile={true}/></div>
                                        <div>
                                            <div className="text-base font-bold text-white">{currentUser.name}</div>
                                            <div className="text-sm text-green-200">{currentUser.role}</div>
                                        </div>
                                    </div>
                                    <BalanceDisplay isMobile={true} />
                                </div>
                             ) : (
                                 <div className="flex items-center justify-between px-4">
                                    <span className="text-base font-medium text-white">Chào mừng bạn!</span>
                                    <BalanceDisplay isMobile={true} />
                                </div>
                             ) }
                             <div className="mt-3 px-2 space-y-1">
                                 {currentUser ? (
                                     <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
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
        </header>
    );
};

export default Header;