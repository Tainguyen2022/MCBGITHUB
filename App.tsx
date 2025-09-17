import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { User } from './types';

// Import Pages
import GrammarPage from './pages/GrammarPage';
import SpeakingPage from './pages/SpeakingPage';
import WritingPage from './pages/WritingPage';
import TipsPage from './pages/TipsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AIOPage from './pages/AIOPage';
import ExamPracticePage from './pages/ExamPracticePage';
import Header from './components/Header';
import CambridgePracticePage from './pages/CambridgePracticePage';
import AdminPage from './pages/AdminPage'; // NEW: Admin Page
import AdminHubPage from './pages/AdminHubPage'; // NEW: Admin Hub Page
import AssetBrowserPage from './pages/AssetBrowserPage'; // NEW: Asset Browser Page
import AddBananasPage from './pages/AddBananasPage'; // NEW: Add Bananas Page
import AITestPage from './pages/AITestPage'; // NEW: AI Test Page
import ToeicPart1TheoryPage from './pages/ToeicPart1TheoryPage'; // NEW: Import TOEIC Part 1 Theory Page
import ToeicPart2Page from './pages/ToeicPart2Page';
import ToeicPart5Page from './pages/ToeicPart5Page';
import ToeicPart7Page from './pages/ToeicPart7Page';
import IeltsPart1TheoryPage from './pages/IeltsPart1TheoryPage';
import IeltsPart1WritingTheoryPage from './pages/IeltsPart1WritingTheoryPage';
import IeltsPart2TheoryPage from './pages/IeltsPart2TheoryPage';
import IeltsPart2WritingTheoryPage from './pages/IeltsPart2WritingTheoryPage';
import IeltsPart2WritingAdvancedTheoryPage from './pages/IeltsPart2WritingAdvancedTheoryPage'; // NEW
import IeltsListeningTheoryPage from './pages/IeltsListeningTheoryPage';
import IeltsReadingTheoryPage from './pages/IeltsReadingTheoryPage'; // NEW: Import IELTS Reading Theory Page
import CambridgeMoversTheoryPage from './pages/CambridgeMoversTheoryPage'; // NEW
import CambridgeFlyersTheoryPage from './pages/CambridgeFlyersTheoryPage'; // NEW
import { initializeAppContent } from './services/dataService';
import ToeicHubPage from './pages/ToeicHubPage';
import IeltsHubPage from './pages/IeltsHubPage';
import VstepHubPage from './pages/VstepHubPage';
import CambridgeHubPage from './pages/CambridgeHubPage';
import TestListPage from './pages/TestListPage';

// --- NEW: Daily Reward Constants ---
const GUEST_SESSION_KEY = 'MATCANBAN_GUEST_SESSION';
const DAILY_BONUS_GUEST = 10;
const DAILY_BONUS_USER = 30;
const BONUS_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

// --- NEW: Guest Session Type ---
interface GuestSession {
    balance: number;
    lastBonusDate: string;
}

// Auth Context
interface AuthContextType {
    currentUser: User | null;
    login: (user: User) => void;
    logout: () => void;
    updateUser: (updatedUser: User) => void;
    guestBananaBalance: number;
    useGuestBanana: () => void;
    addGuestBanana: (amount: number) => void;
}
const AuthContext = createContext<AuthContextType>(null!);
export const useAuth = () => useContext(AuthContext);


const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [guestBananaBalance, setGuestBananaBalance] = useState<number>(0);

    const useGuestBanana = () => {
        if (!currentUser) { // Double check it's a guest
            const guestSessionData = localStorage.getItem(GUEST_SESSION_KEY);
            const guestSession: GuestSession = guestSessionData ? JSON.parse(guestSessionData) : { balance: 0, lastBonusDate: new Date().toISOString() };
            
            const newBalance = Math.max(0, guestSession.balance - 1);
            guestSession.balance = newBalance;
            
            setGuestBananaBalance(newBalance);
            localStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(guestSession));
        }
    };
    
    const addGuestBanana = (amount: number) => {
        if (!currentUser) { // Double check it's a guest
            const guestSessionData = localStorage.getItem(GUEST_SESSION_KEY);
            const guestSession: GuestSession = guestSessionData ? JSON.parse(guestSessionData) : { balance: 0, lastBonusDate: new Date().toISOString() };
            
            const newBalance = guestSession.balance + amount;
            guestSession.balance = newBalance;
            
            setGuestBananaBalance(newBalance);
            localStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(guestSession));
        }
    };

    const updateUser = (updatedUser: User) => {
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    };

    useEffect(() => {
        // This effect runs once on app load to check for and award daily bonuses.
        // It's the core of the new banana reward system.
        const now = new Date();

        const checkAndAwardBonus = () => {
            // Check for logged-in user first
            const storedUserJson = localStorage.getItem('currentUser');
            if (storedUserJson) {
                const user: User = JSON.parse(storedUserJson);
                const lastBonus = user.lastDailyBonus ? new Date(user.lastDailyBonus) : new Date(0);
                
                if (now.getTime() - lastBonus.getTime() > BONUS_COOLDOWN_MS) {
                    console.log(`Awarding daily bonus of ${DAILY_BONUS_USER} to user ${user.name}`);
                    const updatedUser = {
                        ...user,
                        bananaBalance: (user.bananaBalance || 0) + DAILY_BONUS_USER,
                        lastDailyBonus: now.toISOString()
                    };
                    updateUser(updatedUser); // This updates both state and localStorage
                } else {
                    setCurrentUser(user); // Ensure state is synced with storage
                }
                // Logged-in user bonus handled, so we're done.
                return;
            }

            // If no logged-in user, handle guest session
            const guestSessionData = localStorage.getItem(GUEST_SESSION_KEY);
            let guestSession: GuestSession;

            if (guestSessionData) {
                guestSession = JSON.parse(guestSessionData);
                const lastBonus = new Date(guestSession.lastBonusDate);

                if (now.getTime() - lastBonus.getTime() > BONUS_COOLDOWN_MS) {
                     console.log(`Awarding daily bonus of ${DAILY_BONUS_GUEST} to guest.`);
                    guestSession.balance += DAILY_BONUS_GUEST;
                    guestSession.lastBonusDate = now.toISOString();
                    localStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(guestSession));
                }
            } else {
                // First time guest visit
                console.log(`Initializing guest session with ${DAILY_BONUS_GUEST} bananas.`);
                guestSession = { balance: DAILY_BONUS_GUEST, lastBonusDate: now.toISOString() };
                localStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(guestSession));
            }
            setGuestBananaBalance(guestSession.balance);
        };
        
        checkAndAwardBonus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run only once on initial app load

    const login = (user: User) => {
        // Immediately check and award bonus upon login if eligible
        const now = new Date();
        const lastBonus = user.lastDailyBonus ? new Date(user.lastDailyBonus) : new Date(0);
        let userToLogin = user;

        if (now.getTime() - lastBonus.getTime() > BONUS_COOLDOWN_MS) {
             console.log(`Awarding login bonus of ${DAILY_BONUS_USER} to user ${user.name}`);
            userToLogin = {
                ...user,
                bananaBalance: (user.bananaBalance || 0) + DAILY_BONUS_USER,
                lastDailyBonus: now.toISOString()
            };
        }
        
        updateUser(userToLogin); // This updates both state and localStorage
        localStorage.removeItem(GUEST_SESSION_KEY);
        setGuestBananaBalance(0);
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        // A new guest session will be created automatically on next load/reload by the useEffect
        setGuestBananaBalance(DAILY_BONUS_GUEST); // Provide an initial value for immediate display
        const guestSession = { balance: DAILY_BONUS_GUEST, lastBonusDate: new Date().toISOString() };
        localStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(guestSession));
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, updateUser, guestBananaBalance, useGuestBanana, addGuestBanana }}>
            {children}
        </AuthContext.Provider>
    );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser } = useAuth();
    const location = useLocation();

    if (!currentUser || currentUser.role !== 'Admin') {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This allows us to send them along to that page after they login,
        // which is a nicer user experience than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};


const AppLayout: React.FC = () => {
    const location = useLocation();
    const fullWidthPages = [
        '/grammar', '/tips', '/writing', '/speaking', '/aio', '/exam-hub', '/cambridge-practice', '/admin', '/admin-hub', '/add-bananas', '/asset-browser', '/ai-test',
        '/toeic-part1-theory', '/toeic-part2-practice', '/toeic-part5-practice', '/toeic-part7-practice', 
        '/ielts-part1-theory', '/ielts-part1-writing-theory', '/ielts-part2-theory', '/ielts-part2-writing-theory', '/ielts-part2-writing-advanced-theory', '/ielts-listening-theory', '/ielts-reading-theory', 
        '/toeic-hub', '/ielts-hub', '/vstep-hub', '/cambridge-hub', '/tests',
        '/cambridge-movers-theory', '/cambridge-flyers-theory' // NEW
    ];
    const isFullWidthPage = fullWidthPages.some(path => location.pathname.startsWith(path));

    const mainClasses = `${isFullWidthPage ? "w-full" : "container"} mx-auto px-2 sm:px-3 lg:px-4`;

    return (
        <>
            <ScrollToTop />
            <Header />
            <main className={mainClasses}>
                <Routes>
                    <Route path="/" element={<Navigate to="/grammar" replace />} />
                    <Route path="/grammar" element={<GrammarPage />} />
                    <Route path="/writing" element={<WritingPage />} />
                    <Route path="/speaking" element={<SpeakingPage />} />
                    <Route path="/tips" element={<TipsPage />} />
                    <Route path="/exam-hub" element={<ExamPracticePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/ai-test" element={<AITestPage />} />
                    
                    <Route path="/toeic-hub" element={<ToeicHubPage />} />
                    <Route path="/ielts-hub" element={<IeltsHubPage />} />
                    <Route path="/vstep-hub" element={<VstepHubPage />} />
                    <Route path="/cambridge-hub/:level" element={<CambridgeHubPage />} />
                    <Route path="/tests/:exam/:part" element={<TestListPage />} />

                    <Route 
                        path="/aio" 
                        element={
                            <ProtectedRoute>
                                <AIOPage />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="/cambridge-practice/:exam/:partId" element={<CambridgePracticePage />} />
                    <Route path="/toeic-part1-theory" element={<ToeicPart1TheoryPage />} />
                    <Route path="/toeic-part2-practice" element={<ToeicPart2Page />} />
                    <Route path="/toeic-part5-practice" element={<ToeicPart5Page />} />
                    <Route path="/toeic-part7-practice" element={<ToeicPart7Page />} />
                    <Route path="/ielts-part1-theory" element={<IeltsPart1TheoryPage />} />
                    <Route path="/ielts-part1-writing-theory" element={<IeltsPart1WritingTheoryPage />} />
                    <Route path="/ielts-part2-theory" element={<IeltsPart2TheoryPage />} />
                    <Route path="/ielts-part2-writing-theory" element={<IeltsPart2WritingTheoryPage />} />
                    <Route path="/ielts-part2-writing-advanced-theory" element={<IeltsPart2WritingAdvancedTheoryPage />} />
                    <Route path="/ielts-listening-theory" element={<IeltsListeningTheoryPage />} />
                    <Route path="/ielts-reading-theory" element={<IeltsReadingTheoryPage />} />
                    {/* NEW ROUTES */}
                    <Route path="/cambridge-movers-theory" element={<CambridgeMoversTheoryPage />} />
                    <Route path="/cambridge-flyers-theory" element={<CambridgeFlyersTheoryPage />} />
                    <Route 
                        path="/add-bananas" 
                        element={
                            <ProtectedRoute>
                                <AddBananasPage />
                            </ProtectedRoute>
                        } 
                    />
                     <Route 
                        path="/admin-hub" 
                        element={
                            <ProtectedRoute>
                                <AdminHubPage />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/admin" 
                        element={
                            <ProtectedRoute>
                                <AdminPage />
                            </ProtectedRoute>
                        } 
                    />
                     <Route 
                        path="/asset-browser" 
                        element={
                            <ProtectedRoute>
                                <AssetBrowserPage />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="*" element={<Navigate to="/grammar" replace />} />
                </Routes>
            </main>
        </>
    );
};

const LoadingScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-600 mb-4">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" fill="currentColor" fillOpacity="0.3"/>
            <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z" fill="currentColor"/>
        </svg>
        <div className="ai-spinner !w-10 !h-10 my-4"></div>
        <p className="text-xl font-semibold text-gray-700">Đang tải dữ liệu từ cloud...</p>
        <p className="text-gray-500">Vui lòng chờ trong giây lát.</p>
    </div>
);


const App: React.FC = () => {
    const [isDataLoading, setIsDataLoading] = useState(true);
    
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // This function will fetch from the server and populate localStorage if needed.
                await initializeAppContent();
            } catch (error) {
                console.error("Failed to initialize app content:", error);
                // The app will fall back to default data, but we can stop the loading screen.
            } finally {
                setIsDataLoading(false);
            }
        };
        
        loadInitialData();
    }, []);

    if (isDataLoading) {
        return <LoadingScreen />;
    }

    return (
        <AuthProvider>
            <HashRouter>
                <AppLayout />
            </HashRouter>
        </AuthProvider>
    );
};

export default App;