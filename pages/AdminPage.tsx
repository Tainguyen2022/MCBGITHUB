import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { getUsers, updateUserOnServer, getAllTestResults, TestResult, registerUser, deleteUser } from '../services/userService';
import { testRegistry, TestInfo } from '../data/testRegistry';
import { CheckCircleIcon } from '../components/Icons';
import CloudStorageUploader from '../components/CloudStorageUploader';
import EnhancedCloudUploader from '../components/EnhancedCloudUploader';
// Removed ExamQuestionManager - not needed for end users
// Removed LiveTemplateManager - not needed for end users
// Removed SuperAdminContentManager - not needed for end users
import FilesBrowserPage from './FilesBrowserPage';
import { useAuth } from '../App';

// Removed AIO Components for Developer Tools - not needed for end users

// Removed Default Data imports - not needed for end users

// Removed dataSections - not needed for end users

type Status = 'disconnected' | 'connected' | 'syncing';

const ConnectionStatusPanel: React.FC = () => {
    const [sqlStatus, setSqlStatus] = useState<Status>('disconnected');
    const [storageStatus, setStorageStatus] = useState<Status>('disconnected');
    const [sqlError, setSqlError] = useState<string>('');

    const statusConfig: Record<Status, { text: string; color: string; animation: string }> = {
        disconnected: { text: 'Disconnected', color: 'bg-red-500', animation: '' },
        connected: { text: 'Connected', color: 'bg-green-500', animation: 'animate-pulse-green' },
        syncing: { text: 'Syncing...', color: 'bg-amber-500', animation: 'animate-pulse-amber' },
    };

    const checkSqlStatus = async () => {
        try {
            // ✅ FIX: Use VITE_ADMIN_KEY from environment, no hardcoded fallback
            const adminKey = (import.meta as any).env?.VITE_ADMIN_KEY;
            if (!adminKey) {
                setSqlStatus('disconnected');
                setSqlError('VITE_ADMIN_KEY chưa được cấu hình. Thêm VITE_ADMIN_KEY vào .env file.');
                console.error('❌ VITE_ADMIN_KEY not found in environment variables');
                return;
            }
            const controller = new AbortController();
            const timeoutId = window.setTimeout(() => controller.abort(), 8000);
            const response = await fetch('/api/users', {
                headers: { 'X-Admin-Key': adminKey },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            
            if (response.ok) {
                setSqlStatus('connected');
                setSqlError('');
            } else {
                const errorText = await response.text();
                let errorMsg = '';
                if (response.status === 403) {
                    errorMsg = 'Admin key không đúng. Kiểm tra ADMIN_KEY trên Cloud Run và VITE_ADMIN_KEY khi build.';
                } else if (response.status === 503) {
                    errorMsg = 'Database chưa sẵn sàng. Đang kết nối...';
                } else {
                    errorMsg = `Lỗi ${response.status}: ${errorText || 'Unknown error'}`;
                }
                setSqlStatus('disconnected');
                setSqlError(errorMsg);
                console.error('❌ SQL Status Check Failed:', response.status, errorMsg);
            }
        } catch (error: any) {
            setSqlStatus('disconnected');
            if (error.name === 'AbortError') {
                setSqlError('Request timeout. Kiểm tra kết nối mạng.');
            } else {
                setSqlError(error.message || 'Không thể kết nối đến server.');
            }
            console.error('❌ SQL Status Check Error:', error);
        }
    };

    const checkStorageStatus = async () => {
        try {
            const response = await fetch('/api/ping/storage');
            if (response.ok) {
                setStorageStatus('connected');
            } else {
                throw new Error('Server responded with an error');
            }
        } catch (error) {
            setStorageStatus('disconnected');
        }
    };

    useEffect(() => {
        checkSqlStatus();
        checkStorageStatus();
        
        // Auto-refresh SQL status every 30 seconds
        const sqlInterval = setInterval(() => {
            checkSqlStatus();
        }, 30000);
        
        // Auto-refresh Storage status every 30 seconds
        const storageInterval = setInterval(() => {
            checkStorageStatus();
        }, 30000);
        
        return () => {
            clearInterval(sqlInterval);
            clearInterval(storageInterval);
        };
    }, []);

    const handleTestSync = () => {
        const originalSql = sqlStatus;
        const originalStorage = storageStatus;

        setSqlStatus('syncing');
        setStorageStatus('syncing');
        
        // Simulate a 3-second sync process
        setTimeout(() => {
            setSqlStatus(originalSql);
            setStorageStatus(originalStorage);
        }, 3000);
    };

    const StatusIndicator: React.FC<{ status: Status, label: string, error?: string }> = ({ status, label, error }) => {
        const { text, color, animation } = statusConfig[status];
        return (
            <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full ${color} ${animation}`}></div>
                <div className="flex-1">
                    <p className="font-bold text-lg text-gray-700">{label}</p>
                    <p className="text-sm font-medium text-gray-500">{text}</p>
                    {error && status === 'disconnected' && (
                        <p className="text-xs text-red-600 mt-1 max-w-xs">{error}</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="card-base bg-white border border-gray-200 p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <StatusIndicator status={sqlStatus} label="Cloud SQL Database" error={sqlError} />
                <StatusIndicator status={storageStatus} label="Cloud Storage" />
                <button 
                    onClick={handleTestSync}
                    className="btn btn-secondary justify-center text-base"
                    disabled={sqlStatus === 'syncing'}
                >
                    Test Sync Animation
                </button>
            </div>
        </div>
    );
};

// Removed DevToolsTabs component - not needed for end users

const AdminPage: React.FC = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
    const [showAddUser, setShowAddUser] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'Free' as 'Free' | 'Premium' | 'Admin', bananaBalance: 0 });
    const [creatingUser, setCreatingUser] = useState(false);
    const [activeTab, setActiveTab] = useState<'users' | 'storage' | 'questions' | 'templates' | 'content' | 'devtools' | 'files' | 'system' | 'test-results' | 'test-management' | 'banana-transactions' | 'student-progress'>('users');
    const [testResults, setTestResults] = useState<TestResult[]>([]);
    const [testResultsLoading, setTestResultsLoading] = useState(false);
    const [testResultsError, setTestResultsError] = useState('');
    const [testResultsFilters, setTestResultsFilters] = useState({ userId: '', testType: '', testId: '' });
    const [selectedTestResult, setSelectedTestResult] = useState<TestResult | null>(null);
    
    // Test Management states
    const [selectedTestInfo, setSelectedTestInfo] = useState<TestInfo | null>(null);
    const [testQuestions, setTestQuestions] = useState<any[]>([]);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<any | null>(null);
    
    // User Management states
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'name' | 'email' | 'role' | 'bananaBalance' | 'registered_at'>('registered_at');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [viewingUserDetails, setViewingUserDetails] = useState(false);
    const [resettingPassword, setResettingPassword] = useState<User | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetting, setResetting] = useState(false);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);
    const [deleting, setDeleting] = useState(false);
    
    // Banana Transactions states
    const [bananaTransactions, setBananaTransactions] = useState<any[]>([]);
    const [transactionsLoading, setTransactionsLoading] = useState(false);
    const [transactionsError, setTransactionsError] = useState('');
    const [transactionsFilters, setTransactionsFilters] = useState({ userId: '', transactionType: '' });
    
    // Student Progress states
    const [studentProgress, setStudentProgress] = useState<any[]>([]);
    const [progressLoading, setProgressLoading] = useState(false);
    const [progressError, setProgressError] = useState('');
    const [progressSummary, setProgressSummary] = useState<any>(null);
    const [progressFilters, setProgressFilters] = useState({ userId: '', courseType: '' });

    // Security check - redirect non-admin users
    useEffect(() => {
        if (!currentUser || currentUser.role !== 'Admin') {
            navigate('/grammar');
            return;
        }
    }, [currentUser, navigate]);

    // ❌ REMOVED: Auto-reload was causing infinite reload loop
    // Users reported: "đang nhập nó đẩy ra đẩy vào" (reload while typing)
    // Instead, we'll refresh data only, not the entire page
    useEffect(() => {
        if (!currentUser || currentUser.role !== 'Admin') return;

        // Refresh data every 30 seconds instead of reloading page
        const refreshTimer = window.setInterval(() => {
            // Only refresh data, not the entire page
            fetchUsers();
            // You can add other data refresh calls here
        }, 30000); // Refresh data every 30 seconds

        return () => {
            window.clearInterval(refreshTimer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]); // fetchUsers is stable, no need to include

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const userList = await getUsers();
            setUsers(userList);
        } catch (err) {
            setError('Failed to fetch user data from the server.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Only fetch users if user is admin
        if (currentUser && currentUser.role === 'Admin') {
            fetchUsers();
            
            // 🔄 Auto-refresh users every 30 seconds to see real-time updates
            const interval = setInterval(() => {
                fetchUsers();
            }, 30000); // Refresh every 30 seconds
            
            return () => clearInterval(interval);
        }
    }, [currentUser]);

    const adminKey = import.meta.env.VITE_ADMIN_KEY || '01111110';

    const fetchTestResults = async () => {
        if (!currentUser || currentUser.role !== 'Admin') return;
        
        try {
            setTestResultsLoading(true);
            setTestResultsError('');
            const results = await getAllTestResults(adminKey, testResultsFilters);
            setTestResults(results);
        } catch (err: any) {
            setTestResultsError(err.message || 'Failed to fetch test results');
        } finally {
            setTestResultsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'test-results' && currentUser && currentUser.role === 'Admin') {
            fetchTestResults();
        }
    }, [activeTab, testResultsFilters, currentUser]);
    
    // Fetch banana transactions
    const fetchBananaTransactions = async () => {
        if (!currentUser || currentUser.role !== 'Admin') return;
        
        try {
            setTransactionsLoading(true);
            setTransactionsError('');
            const params = new URLSearchParams();
            if (transactionsFilters.userId) params.append('userId', transactionsFilters.userId);
            if (transactionsFilters.transactionType) params.append('transactionType', transactionsFilters.transactionType);
            params.append('limit', '100');
            params.append('offset', '0');
            
            const response = await fetch(`/api/banana-transactions?${params.toString()}`, {
                headers: {
                    'X-Admin-Key': adminKey
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch transactions');
            }
            
            const data = await response.json();
            setBananaTransactions(data.transactions || []);
        } catch (err: any) {
            setTransactionsError(err.message || 'Failed to fetch banana transactions');
        } finally {
            setTransactionsLoading(false);
        }
    };
    
    useEffect(() => {
        if (activeTab === 'banana-transactions' && currentUser && currentUser.role === 'Admin') {
            fetchBananaTransactions();
        }
    }, [activeTab, transactionsFilters, currentUser]);

    // Fetch student progress summary
    const fetchStudentProgress = async () => {
        if (!currentUser || currentUser.role !== 'Admin') return;
        
        try {
            setProgressLoading(true);
            setProgressError('');
            const params = new URLSearchParams();
            if (progressFilters.userId) params.append('userId', progressFilters.userId);
            if (progressFilters.courseType) params.append('courseType', progressFilters.courseType);
            
            // Fetch summary
            const summaryResponse = await fetch(`/api/user-progress/summary?${params.toString()}`, {
                headers: {
                    'X-Admin-Key': adminKey,
                },
            });
            if (!summaryResponse.ok) throw new Error('Failed to fetch student summary');
            const summaryData = await summaryResponse.json();
            setProgressSummary(summaryData);
            
            // Fetch detailed progress
            const progressResponse = await fetch(`/api/user-progress?${params.toString()}`, {
                headers: {
                    'X-Admin-Key': adminKey,
                },
            });
            if (!progressResponse.ok) throw new Error('Failed to fetch student progress');
            const progressData = await progressResponse.json();
            setStudentProgress(progressData.progress || []);
        } catch (err: any) {
            setProgressError(err.message || 'Failed to fetch student progress');
        } finally {
            setProgressLoading(false);
        }
    };
    
    useEffect(() => {
        if (activeTab === 'student-progress' && currentUser && currentUser.role === 'Admin') {
            fetchStudentProgress();
        }
    }, [activeTab, progressFilters, currentUser]);

    const loadTestQuestions = async (testInfo: TestInfo) => {
        try {
            setLoadingQuestions(true);
            const response = await fetch(`/api/test-questions/${testInfo.id}`);
            if (!response.ok) {
                throw new Error('Failed to load test questions');
            }
            const data = await response.json();
            setTestQuestions(data.questions || []);
            setSelectedTestInfo(testInfo);
        } catch (error: any) {
            console.error('Failed to load test questions:', error);
            alert(`Failed to load test questions: ${error.message}`);
        } finally {
            setLoadingQuestions(false);
        }
    };

    const handleSaveQuestion = async (question: any) => {
        if (!selectedTestInfo) return;
        
        try {
            const response = await fetch(`/api/test-questions/${selectedTestInfo.id}/${question.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    explanation: question.explanation,
                    rule: question.rule
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to save question');
            }
            
            // Update local state
            setTestQuestions(prev => prev.map(q => q.id === question.id ? question : q));
            setEditingQuestion(null);
            alert('Question updated successfully!');
        } catch (error: any) {
            console.error('Failed to save question:', error);
            alert(`Failed to save question: ${error.message}`);
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser({ ...user });
    };

    const handleCancel = () => {
        setEditingUser(null);
    };

    const handleSave = async () => {
        if (!editingUser) return;
        
        // Validate name
        if (!editingUser.name || editingUser.name.trim() === '') {
            alert('Tên không được để trống. Vui lòng nhập tên user.');
            return;
        }
        
        // Validate email format
        if (editingUser.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editingUser.email)) {
            alert('Email không hợp lệ. Vui lòng nhập địa chỉ email đúng định dạng.');
            return;
        }
        
        try {
            console.log('🟢 [AdminPage] Saving user:', { id: editingUser.id, name: editingUser.name, email: editingUser.email, role: editingUser.role, bananaBalance: editingUser.bananaBalance });
            const updatedUser = await updateUserOnServer(editingUser);
            console.log('✅ [AdminPage] User saved successfully:', updatedUser);
            // Refresh the whole list to get the latest state
            await fetchUsers();
            setSaveSuccess(updatedUser.id);
            setTimeout(() => setSaveSuccess(null), 2000);
            alert('Cập nhật thông tin user thành công!');
        } catch (err: any) {
            console.error('❌ [AdminPage] Error saving user:', err);
            if (err.message.includes('already exists') || err.message.includes('409')) {
                alert('Email này đã được sử dụng bởi user khác. Vui lòng chọn email khác.');
            } else {
                alert(`Không thể lưu thông tin user: ${err.message}`);
            }
        } finally {
            setEditingUser(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!editingUser) return;
        const { name, value } = e.target;
        setEditingUser({
            ...editingUser,
            [name]: name === 'bananaBalance' ? parseInt(value, 10) || 0 : value
        });
    };

    const handleNewUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: name === 'bananaBalance' ? parseInt(value, 10) || 0 : value
        });
    };

    const handleCreateUser = async () => {
        if (!newUser.name || !newUser.email || !newUser.password) {
            alert('Vui lòng điền đầy đủ thông tin: Tên, Email và Mật khẩu');
            return;
        }

        try {
            setCreatingUser(true);
            // Create user with registerUser
            const createdUser = await registerUser(newUser.name, newUser.email, newUser.password);
            
            // Update role and bananaBalance if needed (registerUser creates with default values)
            if (createdUser.role !== newUser.role || createdUser.bananaBalance !== newUser.bananaBalance) {
                const updatedUser = await updateUserOnServer({
                    ...createdUser,
                    role: newUser.role,
                    bananaBalance: newUser.bananaBalance
                });
                await fetchUsers();
                setSaveSuccess(updatedUser.id);
            } else {
                await fetchUsers();
                setSaveSuccess(createdUser.id);
            }
            
            // Reset form
            setNewUser({ name: '', email: '', password: '', role: 'Free', bananaBalance: 0 });
            setShowAddUser(false);
            setTimeout(() => setSaveSuccess(null), 2000);
        } catch (err: any) {
            alert(`Không thể tạo user: ${err.message}`);
        } finally {
            setCreatingUser(false);
        }
    };

    const handleCancelAddUser = () => {
        setShowAddUser(false);
        setNewUser({ name: '', email: '', password: '', role: 'Free', bananaBalance: 0 });
    };
    
    const handleResetPassword = async () => {
        if (!resettingPassword) return;
        
        if (!newPassword || !confirmPassword) {
            alert('Vui lòng nhập mật khẩu mới và xác nhận mật khẩu');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp');
            return;
        }
        
        if (newPassword.length < 5) {
            alert('Mật khẩu phải có ít nhất 5 ký tự');
            return;
        }
        
        try {
            setResetting(true);
            const updatedUser = await updateUserOnServer({
                ...resettingPassword,
                password: newPassword
            });
            
            // Refresh user list
            await fetchUsers();
            
            // Reset form
            setResettingPassword(null);
            setNewPassword('');
            setConfirmPassword('');
            setSaveSuccess(updatedUser.id);
            setTimeout(() => setSaveSuccess(null), 2000);
            
            alert('Đặt lại mật khẩu thành công!');
        } catch (err: any) {
            alert(`Không thể đặt lại mật khẩu: ${err.message}`);
        } finally {
            setResetting(false);
        }
    };
    
    const handleCancelResetPassword = () => {
        setResettingPassword(null);
        setNewPassword('');
        setConfirmPassword('');
    };
    
    const handleDeleteUser = async () => {
        if (!deletingUser) return;
        
        try {
            setDeleting(true);
            await deleteUser(deletingUser.id);
            
            // Refresh user list
            await fetchUsers();
            
            // Reset state
            setDeletingUser(null);
            setSaveSuccess(deletingUser.id);
            setTimeout(() => setSaveSuccess(null), 2000);
            
            alert('Xóa user thành công!');
        } catch (err: any) {
            alert(`Không thể xóa user: ${err.message}`);
        } finally {
            setDeleting(false);
        }
    };
    
    const handleCancelDeleteUser = () => {
        setDeletingUser(null);
    };
    
    // Filter and sort users
    const filteredAndSortedUsers = React.useMemo(() => {
        let filtered = users;
        
        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(user => 
                user.name.toLowerCase().includes(query) || 
                user.email.toLowerCase().includes(query)
            );
        }
        
        // Role filter
        if (roleFilter !== 'all') {
            filtered = filtered.filter(user => user.role === roleFilter);
        }
        
        // Sort
        filtered = [...filtered].sort((a, b) => {
            let aValue: any;
            let bValue: any;
            
            switch (sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'email':
                    aValue = a.email.toLowerCase();
                    bValue = b.email.toLowerCase();
                    break;
                case 'role':
                    aValue = a.role;
                    bValue = b.role;
                    break;
                case 'bananaBalance':
                    aValue = a.bananaBalance || 0;
                    bValue = b.bananaBalance || 0;
                    break;
                case 'registered_at':
                    aValue = (a as any).registered_at || '';
                    bValue = (b as any).registered_at || '';
                    break;
                default:
                    return 0;
            }
            
            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        
        return filtered;
    }, [users, searchQuery, roleFilter, sortBy, sortOrder]);
    
    // User statistics
    const userStats = React.useMemo(() => {
        const total = users.length;
        const free = users.filter(u => u.role === 'Free').length;
        const premium = users.filter(u => u.role === 'Premium').length;
        const admin = users.filter(u => u.role === 'Admin').length;
        const totalBananas = users.reduce((sum, u) => sum + (u.bananaBalance || 0), 0);
        
        return { total, free, premium, admin, totalBananas };
    }, [users]);
    
    // Don't render anything if user is not admin
    if (!currentUser || currentUser.role !== 'Admin') {
        return null;
    }

    if (loading) return <div className="text-center p-10">Loading users from Cloud SQL...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <header className="text-center mb-10">
                 <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
                    Admin Dashboard
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    Manage service status, user data, cloud storage, and system files.
                </p>
            </header>

            <ConnectionStatusPanel />

            {/* 🎯 ADMIN TABS */}
            <div className="mb-8">
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                            activeTab === 'users'
                                ? 'bg-white text-blue-700 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        👥 User Management
                    </button>
                    <button
                        onClick={() => setActiveTab('storage')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                            activeTab === 'storage'
                                ? 'bg-white text-blue-700 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        ☁️ Cloud Storage
                    </button>
                    {/* Removed Exam Questions tab - not needed for end users */}
                    {/* Removed Live Templates tab - not needed for end users */}
                    {/* Removed Super Content tab - not needed for end users */}
                    {/* Removed Dev Tools tab - not needed for end users */}
                    <button
                        onClick={() => setActiveTab('files')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                            activeTab === 'files'
                                ? 'bg-white text-green-700 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        📁 Files
                    </button>
                    <button
                        onClick={() => setActiveTab('test-results')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                            activeTab === 'test-results'
                                ? 'bg-white text-purple-700 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        📊 Test Results
                    </button>
                    <button
                        onClick={() => setActiveTab('test-management')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                            activeTab === 'test-management'
                                ? 'bg-white text-indigo-700 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        📝 Test Management
                    </button>
                    <button
                        onClick={() => setActiveTab('banana-transactions')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                            activeTab === 'banana-transactions'
                                ? 'bg-white text-amber-700 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        🍌 Banana Transactions
                    </button>
                    <button
                        onClick={() => setActiveTab('student-progress')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                            activeTab === 'student-progress'
                                ? 'bg-white text-green-700 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        📈 Student Progress
                    </button>
                    <button
                        onClick={() => setActiveTab('system')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                            activeTab === 'system'
                                ? 'bg-white text-blue-700 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        ⚙️ System Status
                    </button>
                </div>
            </div>

            {/* 📋 TAB CONTENT */}
            {activeTab === 'users' && (
                <div className="space-y-6">
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 text-white">
                            <div className="text-sm font-medium opacity-90">Total Users</div>
                            <div className="text-3xl font-bold mt-1">{userStats.total}</div>
                        </div>
                        <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl shadow-lg p-4 text-white">
                            <div className="text-sm font-medium opacity-90">Free Users</div>
                            <div className="text-3xl font-bold mt-1">{userStats.free}</div>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-4 text-white">
                            <div className="text-sm font-medium opacity-90">Premium Users</div>
                            <div className="text-3xl font-bold mt-1">{userStats.premium}</div>
                        </div>
                        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg p-4 text-white">
                            <div className="text-sm font-medium opacity-90">Admin Users</div>
                            <div className="text-3xl font-bold mt-1">{userStats.admin}</div>
                        </div>
                        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-lg p-4 text-white">
                            <div className="text-sm font-medium opacity-90">Total Bananas</div>
                            <div className="text-3xl font-bold mt-1">{userStats.totalBananas.toLocaleString()} 🍌</div>
                        </div>
                    </div>

                    {/* User Management Panel */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="p-4 bg-gray-50/50 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold text-gray-700">User Management (Cloud SQL)</h2>
                                <span className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded-full">
                                    🔄 Auto-refresh: 30s
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={fetchUsers}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
                                    title="Refresh data from server"
                                >
                                    🔄 Refresh
                                </button>
                                <button
                                    onClick={() => setShowAddUser(true)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                                >
                                    + Add User
                                </button>
                            </div>
                        </div>

                        {/* Filters and Search */}
                        <div className="p-4 bg-gray-50 border-b">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by name or email..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Role</label>
                                    <select
                                        value={roleFilter}
                                        onChange={(e) => setRoleFilter(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    >
                                        <option value="all">All Roles</option>
                                        <option value="Free">Free</option>
                                        <option value="Premium">Premium</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as any)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    >
                                        <option value="registered_at">Registration Date</option>
                                        <option value="name">Name</option>
                                        <option value="email">Email</option>
                                        <option value="role">Role</option>
                                        <option value="bananaBalance">Banana Balance</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                                    <select
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    >
                                        <option value="desc">Descending</option>
                                        <option value="asc">Ascending</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-3 text-sm text-gray-600">
                                Showing <span className="font-semibold">{filteredAndSortedUsers.length}</span> of <span className="font-semibold">{users.length}</span> users
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => { setSortBy('name'); setSortOrder(sortBy === 'name' && sortOrder === 'asc' ? 'desc' : 'asc'); }}>Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => { setSortBy('email'); setSortOrder(sortBy === 'email' && sortOrder === 'asc' ? 'desc' : 'asc'); }}>Email</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => { setSortBy('role'); setSortOrder(sortBy === 'role' && sortOrder === 'asc' ? 'desc' : 'asc'); }}>Role</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => { setSortBy('bananaBalance'); setSortOrder(sortBy === 'bananaBalance' && sortOrder === 'asc' ? 'desc' : 'asc'); }}>Banana Balance</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredAndSortedUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                                No users found matching your criteria.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredAndSortedUsers.map(user => (
                                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {editingUser?.id === user.id ? (
                                                        <input 
                                                            type="text" 
                                                            name="name" 
                                                            value={editingUser.name} 
                                                            onChange={handleInputChange}
                                                            className="form-input !py-1 !px-2 w-48"
                                                            placeholder="Enter name"
                                                        />
                                                    ) : (
                                                        user.name
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {editingUser?.id === user.id ? (
                                                        <input 
                                                            type="email" 
                                                            name="email" 
                                                            value={editingUser.email} 
                                                            onChange={handleInputChange}
                                                            className="form-input !py-1 !px-2 w-48"
                                                            placeholder="Enter email"
                                                        />
                                                    ) : (
                                                        user.email
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {editingUser?.id === user.id ? (
                                                        <select name="role" value={editingUser.role} onChange={handleInputChange} className="form-input !py-1 !px-2">
                                                            <option value="Free">Free</option>
                                                            <option value="Premium">Premium</option>
                                                            <option value="Admin">Admin</option>
                                                        </select>
                                                    ) : (
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Admin' ? 'bg-red-100 text-red-800' : user.role === 'Premium' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                            {user.role}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {editingUser?.id === user.id ? (
                                                        <input 
                                                            type="number" 
                                                            name="bananaBalance" 
                                                            value={editingUser.bananaBalance} 
                                                            onChange={handleInputChange}
                                                            className="form-input !py-1 !px-2 w-24"
                                                        />
                                                    ) : (
                                                        <span className="font-semibold text-amber-600">{user.bananaBalance || 0} 🍌</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {(user as any).registered_at 
                                                        ? new Date((user as any).registered_at).toLocaleDateString('vi-VN')
                                                        : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    {editingUser?.id === user.id ? (
                                                        <div className="flex gap-2">
                                                            <button onClick={handleSave} className="text-green-600 hover:text-green-900 font-medium">Save</button>
                                                            <button onClick={handleCancel} className="text-gray-600 hover:text-gray-900 font-medium">Cancel</button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <button 
                                                                onClick={() => { setSelectedUser(user); setViewingUserDetails(true); }} 
                                                                className="text-blue-600 hover:text-blue-900 font-medium"
                                                            >
                                                                View
                                                            </button>
                                                            <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900 font-medium">Edit</button>
                                                            <button 
                                                                onClick={() => {
                                                                    setResettingPassword(user);
                                                                    setNewPassword('12345');
                                                                    setConfirmPassword('12345');
                                                                }} 
                                                                className="text-orange-600 hover:text-orange-900 font-medium"
                                                            >
                                                                Reset Pass
                                                            </button>
                                                            <button 
                                                                onClick={() => setDeletingUser(user)} 
                                                                className="text-red-600 hover:text-red-900 font-medium"
                                                            >
                                                                Delete
                                                            </button>
                                                            {saveSuccess === user.id && <CheckCircleIcon className="w-5 h-5 text-green-500" />}
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Add User Modal */}
            {showAddUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">Create New User</h3>
                            <button
                                onClick={handleCancelAddUser}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newUser.name}
                                    onChange={handleNewUserInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    placeholder="Enter user name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={newUser.email}
                                    onChange={handleNewUserInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    placeholder="Enter email address"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={newUser.password}
                                    onChange={handleNewUserInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    placeholder="Enter password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    name="role"
                                    value={newUser.role}
                                    onChange={handleNewUserInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                >
                                    <option value="Free">Free</option>
                                    <option value="Premium">Premium</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Banana Balance</label>
                                <input
                                    type="number"
                                    name="bananaBalance"
                                    value={newUser.bananaBalance}
                                    onChange={handleNewUserInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleCancelAddUser}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateUser}
                                disabled={creatingUser || !newUser.name || !newUser.email || !newUser.password}
                                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {creatingUser ? 'Creating...' : 'Create User'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ☁️ CLOUD STORAGE TAB */}
            {activeTab === 'storage' && (
                <div>
                    {/* 🚀 ENHANCED UPLOADER */}
                        <EnhancedCloudUploader 
                            onImageUploaded={(image) => {
                                console.log('New image uploaded via Enhanced Uploader:', image);
                                // You can add logic here to update the IELTS Writing Studio
                            }}
                            onAudioUploaded={(audio) => {
                                console.log('New audio uploaded via Enhanced Uploader:', audio);
                                // You can add logic here to update the Speaking Studio or other audio content
                            }}
                            onVideoUploaded={(video) => {
                                console.log('New video uploaded via Enhanced Uploader:', video);
                                // You can add logic here to update the Speaking Studio or other video content
                            }}
                        />
                    
                    {/* 📋 LEGACY UPLOADER (for compatibility) */}
                    <div style={{ marginTop: '40px', padding: '20px', background: '#f8f9fa', borderRadius: '15px' }}>
                        <h3 style={{ margin: '0 0 20px 0', color: '#6c757d', fontSize: '18px' }}>
                            📋 Legacy Cloud Storage Manager
                        </h3>
                        <CloudStorageUploader 
                            onImageUploaded={(image) => {
                                console.log('New image uploaded via Legacy Uploader:', image);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Removed Exam Questions tab content - not needed for end users */}

            {/* Removed Live Templates tab content - not needed for end users */}

            {/* Removed Super Content tab content - not needed for end users */}

            {/* Removed Developer Tools tab content - not needed for end users */}

            {/* 📁 FILES TAB */}
            {activeTab === 'files' && (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-4 bg-gray-50/50 border-b">
                        <h2 className="text-xl font-bold text-gray-700">📁 Files Browser & Management</h2>
                        <p className="text-sm text-gray-600 mt-1">Browse and manage uploaded files from Google Cloud Storage</p>
                    </div>
                    <div className="p-6">
                        <FilesBrowserPage />
                    </div>
                </div>
            )}

            {/* 📊 TEST RESULTS TAB */}
            {activeTab === 'test-results' && (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-4 bg-gray-50/50 border-b">
                        <h2 className="text-xl font-bold text-gray-700">Test Results & User Activity</h2>
                        <p className="text-sm text-gray-600 mt-1">View all test attempts and track user activity</p>
                    </div>
                    
                    {/* Filters */}
                    <div className="p-4 bg-gray-50 border-b">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                                <input
                                    type="text"
                                    value={testResultsFilters.userId}
                                    onChange={(e) => setTestResultsFilters({ ...testResultsFilters, userId: e.target.value })}
                                    placeholder="Filter by user ID"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Test Type</label>
                                <input
                                    type="text"
                                    value={testResultsFilters.testType}
                                    onChange={(e) => setTestResultsFilters({ ...testResultsFilters, testType: e.target.value })}
                                    placeholder="e.g., toeic"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Test ID</label>
                                <input
                                    type="text"
                                    value={testResultsFilters.testId}
                                    onChange={(e) => setTestResultsFilters({ ...testResultsFilters, testId: e.target.value })}
                                    placeholder="e.g., test-1-2020"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={fetchTestResults}
                                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
                                >
                                    🔍 Filter
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Table */}
                    <div className="overflow-x-auto">
                        {testResultsLoading ? (
                            <div className="p-8 text-center text-gray-500">Loading test results...</div>
                        ) : testResultsError ? (
                            <div className="p-8 text-center text-red-500">{testResultsError}</div>
                        ) : testResults.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No test results found</div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Spent</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed At</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {testResults.map((result) => (
                                        <tr key={result.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{result.user_name || result.user_id}</div>
                                                <div className="text-sm text-gray-500">{result.user_email || ''}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{result.test_name || `${result.test_type} - ${result.test_id}`}</div>
                                                <div className="text-sm text-gray-500">{result.test_type} / {result.test_id}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {result.score} / {result.total_questions}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    Number(result.percentage) >= 80 ? 'bg-green-100 text-green-800' :
                                                    Number(result.percentage) >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {Number(result.percentage).toFixed(1)}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {result.time_spent ? `${Math.floor(result.time_spent / 60)}m ${result.time_spent % 60}s` : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {result.completed_at ? new Date(result.completed_at).toLocaleString() : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => setSelectedTestResult(result)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}

            {/* Reset Password Modal */}
            {resettingPassword && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">Reset Password</h3>
                            <button
                                onClick={handleCancelResetPassword}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">User:</div>
                            <div className="font-semibold text-gray-900">{resettingPassword.name}</div>
                            <div className="text-sm text-gray-500">{resettingPassword.email}</div>
                        </div>
                        
                        <div className="mb-4">
                            <button
                                onClick={() => {
                                    setNewPassword('12345');
                                    setConfirmPassword('12345');
                                }}
                                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium mb-3"
                            >
                                Use Default Password (12345)
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password *</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    placeholder="Enter new password (min 5 characters)"
                                    minLength={5}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    placeholder="Confirm new password"
                                    minLength={5}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleCancelResetPassword}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleResetPassword}
                                disabled={resetting || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {resetting ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete User Modal */}
            {deletingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold text-red-600">Delete User</h3>
                            <button
                                onClick={handleCancelDeleteUser}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                <p className="text-sm text-red-800 font-semibold mb-2">⚠️ Warning: This action cannot be undone!</p>
                                <p className="text-sm text-red-700">
                                    You are about to delete user: <strong>{deletingUser.email}</strong>
                                </p>
                                <p className="text-sm text-red-700 mt-2">
                                    This will also delete all related data:
                                </p>
                                <ul className="text-sm text-red-700 mt-1 ml-4 list-disc">
                                    <li>Test results</li>
                                    <li>Gift rewards</li>
                                    <li>Banana transactions</li>
                                </ul>
                            </div>
                            
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-600 mb-2">User Details:</div>
                                <div className="text-sm font-medium text-gray-900">Name: {deletingUser.name}</div>
                                <div className="text-sm font-medium text-gray-900">Email: {deletingUser.email}</div>
                                <div className="text-sm font-medium text-gray-900">Role: {deletingUser.role}</div>
                                <div className="text-sm font-medium text-gray-900">Banana Balance: {deletingUser.bananaBalance || 0} 🍌</div>
                            </div>
                            
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={handleCancelDeleteUser}
                                    disabled={deleting}
                                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteUser}
                                    disabled={deleting}
                                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {deleting ? 'Deleting...' : 'Delete User'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* User Details Modal */}
            {viewingUserDetails && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">User Details</h3>
                            <button
                                onClick={() => { setViewingUserDetails(false); setSelectedUser(null); }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">User ID</div>
                                    <div className="font-semibold text-gray-900">{selectedUser.id}</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">Name</div>
                                    <div className="font-semibold text-gray-900">{selectedUser.name}</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">Email</div>
                                    <div className="font-semibold text-gray-900">{selectedUser.email}</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">Role</div>
                                    <div>
                                        <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                                            selectedUser.role === 'Admin' ? 'bg-red-100 text-red-800' : 
                                            selectedUser.role === 'Premium' ? 'bg-green-100 text-green-800' : 
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {selectedUser.role}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">Banana Balance</div>
                                    <div className="font-semibold text-amber-600 text-xl">{selectedUser.bananaBalance || 0} 🍌</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-500 mb-1">Registered At</div>
                                    <div className="font-semibold text-gray-900">
                                        {(selectedUser as any).registered_at 
                                            ? new Date((selectedUser as any).registered_at).toLocaleString('vi-VN')
                                            : 'N/A'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => { setViewingUserDetails(false); handleEdit(selectedUser); }}
                                    className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium"
                                >
                                    Edit User
                                </button>
                                <button
                                    onClick={() => {
                                        setViewingUserDetails(false);
                                        setResettingPassword(selectedUser);
                                        setNewPassword('12345');
                                        setConfirmPassword('12345');
                                    }}
                                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                                >
                                    Reset Password
                                </button>
                                <button
                                    onClick={() => { setViewingUserDetails(false); setSelectedUser(null); }}
                                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Test Result Details Modal */}
            {selectedTestResult && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Test Result Details</h3>
                            <button
                                onClick={() => setSelectedTestResult(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Summary */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <div className="text-sm text-gray-500">User</div>
                                    <div className="font-semibold">{selectedTestResult.user_name || selectedTestResult.user_id}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Test</div>
                                    <div className="font-semibold">{selectedTestResult.test_name || `${selectedTestResult.test_type} - ${selectedTestResult.test_id}`}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Score</div>
                                    <div className="font-semibold">{selectedTestResult.score} / {selectedTestResult.total_questions}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Percentage</div>
                                    <div className={`font-semibold ${
                                        Number(selectedTestResult.percentage) >= 80 ? 'text-green-600' :
                                        Number(selectedTestResult.percentage) >= 60 ? 'text-yellow-600' :
                                        'text-red-600'
                                    }`}>
                                        {Number(selectedTestResult.percentage).toFixed(1)}%
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Question Answers */}
                        {selectedTestResult.question_answers && selectedTestResult.question_answers.length > 0 && (
                            <div>
                                <h4 className="text-lg font-bold text-gray-800 mb-4">Question Answers</h4>
                                <div className="space-y-3">
                                    {selectedTestResult.question_answers.map((qa, index) => (
                                        <div
                                            key={index}
                                            className={`p-4 rounded-lg border-l-4 ${
                                                qa.isCorrect
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-red-500 bg-red-50'
                                            }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                                    qa.isCorrect ? 'bg-green-500' : 'bg-red-500'
                                                }`}>
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium text-gray-800 mb-2">
                                                        Question {qa.questionId}
                                                    </div>
                                                    {qa.questionText && (
                                                        <div className="text-sm text-gray-600 mb-2">
                                                            {qa.questionText}
                                                        </div>
                                                    )}
                                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                                        <div className={`p-2 rounded text-sm ${
                                                            qa.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                                                        }`}>
                                                            <strong>Selected:</strong> {qa.selectedText || `Option ${qa.selectedOption + 1}`}
                                                            {!qa.isCorrect && ' ❌'}
                                                        </div>
                                                        <div className={`p-2 rounded text-sm ${
                                                            qa.isCorrect ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                                                        }`}>
                                                            <strong>Correct:</strong> {qa.correctText || `Option ${qa.correctOption + 1}`}
                                                            {qa.isCorrect && ' ✅'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 📝 TEST MANAGEMENT TAB */}
            {activeTab === 'test-management' && (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-4 bg-gray-50/50 border-b">
                        <h2 className="text-xl font-bold text-gray-700">Test Management</h2>
                        <p className="text-sm text-gray-600 mt-1">View and update test questions, explanations, and rules</p>
                    </div>

                    {!selectedTestInfo ? (
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select a Test</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {testRegistry.map((test) => (
                                    <div
                                        key={test.id}
                                        onClick={() => loadTestQuestions(test)}
                                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <div className="font-semibold text-gray-800">{test.name}</div>
                                        <div className="text-sm text-gray-500 mt-1">{test.year} • {test.type}</div>
                                        <div className="text-sm text-gray-400 mt-1">{test.questionCount} questions</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{selectedTestInfo.name}</h3>
                                    <p className="text-sm text-gray-500">{selectedTestInfo.questionCount} questions</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedTestInfo(null);
                                        setTestQuestions([]);
                                        setEditingQuestion(null);
                                    }}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                                >
                                    ← Back to Test List
                                </button>
                            </div>

                            {loadingQuestions ? (
                                <div className="p-8 text-center text-gray-500">Loading questions...</div>
                            ) : testQuestions.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">No questions found</div>
                            ) : (
                                <div className="space-y-4">
                                    {testQuestions.map((question, index) => (
                                        <div
                                            key={question.id || index}
                                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                                        >
                                            {editingQuestion?.id === question.id ? (
                                                <div className="space-y-4">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-700 mb-2">
                                                            Question {question.id}
                                                        </div>
                                                        <div className="text-sm text-gray-600 mb-2">
                                                            {question.question_en}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Explanation
                                                        </label>
                                                        <textarea
                                                            value={editingQuestion.explanation || ''}
                                                            onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm min-h-[100px]"
                                                            placeholder="Enter explanation..."
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Rule (Công thức ngắn gọn)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={editingQuestion.rule || ''}
                                                            onChange={(e) => setEditingQuestion({ ...editingQuestion, rule: e.target.value })}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                                            placeholder="e.g., adj + N"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleSaveQuestion(editingQuestion)}
                                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingQuestion(null)}
                                                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-700 mb-1">
                                                                Question {question.id}
                                                            </div>
                                                            <div className="text-sm text-gray-600 mb-2">
                                                                {question.question_en}
                                                            </div>
                                                            {question.question_vi && (
                                                                <div className="text-sm text-gray-500 mb-2">
                                                                    {question.question_vi}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={() => setEditingQuestion({ ...question })}
                                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm ml-4"
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                    <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                                                        <div className="font-medium text-gray-700 mb-1">Rule:</div>
                                                        <div className="text-gray-600">{question.rule || 'Not set'}</div>
                                                    </div>
                                                    <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                                                        <div className="font-medium text-gray-700 mb-1">Explanation:</div>
                                                        <div className="text-gray-600">{question.explanation || 'Not set'}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* ⚙️ SYSTEM STATUS TAB */}
            {activeTab === 'system' && (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-6">System Status</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-50 rounded-lg p-4">
                            <h3 className="font-semibold text-green-800 mb-2">🌐 Google Cloud Storage</h3>
                            <p className="text-sm text-green-700">Bucket: matcanban-media</p>
                            <p className="text-sm text-green-700">Status: Connected</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-800 mb-2">📊 IELTS Writing Studio</h3>
                            <p className="text-sm text-blue-700">Templates: Active</p>
                            <p className="text-sm text-blue-700">Images: Cloud Hosted</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                            <h3 className="font-semibold text-purple-800 mb-2">🗄️ Database</h3>
                            <p className="text-sm text-purple-700">Cloud SQL: Connected</p>
                            <p className="text-sm text-purple-700">Users: {users.length} active</p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-4">
                            <h3 className="font-semibold text-yellow-800 mb-2">🚀 Performance</h3>
                            <p className="text-sm text-yellow-700">CDN: Global delivery</p>
                            <p className="text-sm text-yellow-700">Load time: Optimized</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 🍌 BANANA TRANSACTIONS TAB */}
            {activeTab === 'banana-transactions' && (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-4 bg-gray-50/50 border-b">
                        <h2 className="text-xl font-bold text-gray-700">Banana Transactions History</h2>
                        <p className="text-sm text-gray-600 mt-1">Lịch sử mua và trừ chuối để tránh hack</p>
                    </div>
                    
                    {/* Filters */}
                    <div className="p-4 bg-gray-50 border-b">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                                <input
                                    type="text"
                                    value={transactionsFilters.userId}
                                    onChange={(e) => setTransactionsFilters({ ...transactionsFilters, userId: e.target.value })}
                                    placeholder="Filter by user ID"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                                <select
                                    value={transactionsFilters.transactionType}
                                    onChange={(e) => setTransactionsFilters({ ...transactionsFilters, transactionType: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                >
                                    <option value="">All Types</option>
                                    <option value="add">Add</option>
                                    <option value="deduct">Deduct</option>
                                    <option value="admin_adjust">Admin Adjust</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={fetchBananaTransactions}
                                    className="w-full px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors text-sm font-medium"
                                >
                                    🔍 Filter
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Transactions Table */}
                    <div className="overflow-x-auto">
                        {transactionsLoading ? (
                            <div className="p-8 text-center text-gray-500">Loading transactions...</div>
                        ) : transactionsError ? (
                            <div className="p-8 text-center text-red-500">{transactionsError}</div>
                        ) : bananaTransactions.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No transactions found</div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Before</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance After</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bananaTransactions.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{transaction.user_name || transaction.user_id}</div>
                                                <div className="text-sm text-gray-500">{transaction.user_email || ''}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    transaction.transaction_type === 'add' ? 'bg-green-100 text-green-800' :
                                                    transaction.transaction_type === 'deduct' ? 'bg-red-100 text-red-800' :
                                                    'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {transaction.transaction_type === 'add' ? '➕ Add' :
                                                     transaction.transaction_type === 'deduct' ? '➖ Deduct' :
                                                     '⚙️ Admin Adjust'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-amber-600">
                                                {transaction.transaction_type === 'add' ? '+' : '-'}{transaction.amount} 🍌
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.balance_before} 🍌</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{transaction.balance_after} 🍌</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.reason || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.source || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {transaction.created_at ? (
                                                    <div>
                                                        <div className="font-medium">{new Date(transaction.created_at).toLocaleString('vi-VN', { 
                                                            year: 'numeric', 
                                                            month: '2-digit', 
                                                            day: '2-digit',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit'
                                                        })}</div>
                                                        <div className="text-xs text-gray-400">{new Date(transaction.created_at).toLocaleTimeString('vi-VN')}</div>
                                                    </div>
                                                ) : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'student-progress' && (
                <div className="space-y-6">
                    {/* Summary Statistics */}
                    {progressSummary && progressSummary.statistics && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Tổng sinh viên</p>
                                        <h3 className="text-3xl font-bold text-blue-600">{progressSummary.statistics.totalStudents}</h3>
                                    </div>
                                    <div className="text-4xl">👥</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg border border-red-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Sinh viên lười</p>
                                        <h3 className="text-3xl font-bold text-red-600">{progressSummary.statistics.lazyStudents}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{progressSummary.statistics.lazyPercentage}%</p>
                                    </div>
                                    <div className="text-4xl">😴</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg border border-green-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Hoạt động tốt</p>
                                        <h3 className="text-3xl font-bold text-green-600">{progressSummary.statistics.activeStudents}</h3>
                                    </div>
                                    <div className="text-4xl">✅</div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg border border-yellow-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Ít hoạt động</p>
                                        <h3 className="text-3xl font-bold text-yellow-600">{progressSummary.statistics.inactiveStudents}</h3>
                                    </div>
                                    <div className="text-4xl">⚠️</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Filters */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                                <input
                                    type="text"
                                    value={progressFilters.userId}
                                    onChange={(e) => setProgressFilters({ ...progressFilters, userId: e.target.value })}
                                    placeholder="Filter by user ID"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Course Type</label>
                                <select
                                    value={progressFilters.courseType}
                                    onChange={(e) => setProgressFilters({ ...progressFilters, courseType: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                >
                                    <option value="">All Courses</option>
                                    <option value="toeic">TOEIC</option>
                                    <option value="ielts">IELTS</option>
                                    <option value="vstep">VSTEP</option>
                                    <option value="grammar">Grammar</option>
                                    <option value="young">Young</option>
                                    <option value="giao-tiep">Giao Tiếp</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={fetchStudentProgress}
                                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm font-medium"
                                >
                                    🔍 Filter
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Student Summary Table */}
                    {progressSummary && progressSummary.summary && (
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                            <div className="p-4 bg-gray-50/50 border-b">
                                <h2 className="text-xl font-bold text-gray-700">📊 Student Activity Summary</h2>
                                <p className="text-sm text-gray-600 mt-1">Theo dõi sinh viên lười hay không</p>
                            </div>
                            
                            <div className="overflow-x-auto">
                                {progressLoading ? (
                                    <div className="p-8 text-center text-gray-500">Loading student progress...</div>
                                ) : progressError ? (
                                    <div className="p-8 text-center text-red-500">{progressError}</div>
                                ) : progressSummary.summary.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">No student data found</div>
                                ) : (
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Courses</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tests Completed</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average %</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Time</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Activity</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {progressSummary.summary.map((student: any) => (
                                                <tr key={student.id} className={`hover:bg-gray-50 ${
                                                    student.activity_status.includes('Lười') || student.activity_status === 'Chưa làm bài' 
                                                        ? 'bg-red-50' 
                                                        : student.activity_status === 'Ít hoạt động'
                                                        ? 'bg-yellow-50'
                                                        : ''
                                                }`}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                        <div className="text-sm text-gray-500">{student.email}</div>
                                                        <div className="text-xs text-gray-400">{student.role}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            student.activity_status === 'Hoạt động tốt' ? 'bg-green-100 text-green-800' :
                                                            student.activity_status === 'Ít hoạt động (3-7 ngày)' ? 'bg-yellow-100 text-yellow-800' :
                                                            student.activity_status.includes('Lười') ? 'bg-red-100 text-red-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {student.activity_status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.active_courses || 0}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.total_tests_completed || 0}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`text-sm font-semibold ${
                                                            (student.overall_average || 0) >= 80 ? 'text-green-600' :
                                                            (student.overall_average || 0) >= 60 ? 'text-yellow-600' :
                                                            'text-red-600'
                                                        }`}>
                                                            {student.overall_average ? Math.round(student.overall_average) : 0}%
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {student.total_time_spent ? `${Math.round(student.total_time_spent / 60)} phút` : '0 phút'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {student.last_activity_date ? new Date(student.last_activity_date).toLocaleDateString('vi-VN') : 'Chưa có'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {student.first_activity_date ? new Date(student.first_activity_date).toLocaleDateString('vi-VN') : 'Chưa có'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Detailed Progress by Course */}
                    {studentProgress.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                            <div className="p-4 bg-gray-50/50 border-b">
                                <h2 className="text-xl font-bold text-gray-700">📚 Detailed Progress by Course</h2>
                                <p className="text-sm text-gray-600 mt-1">Chi tiết điểm số từng phần</p>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average %</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {studentProgress.map((progress: any) => (
                                            <tr key={progress.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{progress.user_name}</div>
                                                    <div className="text-sm text-gray-500">{progress.user_email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{progress.course_name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{progress.part_name || '-'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {progress.completed_tests} / {progress.total_tests || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`text-sm font-semibold ${
                                                        (progress.average_percentage || 0) >= 80 ? 'text-green-600' :
                                                        (progress.average_percentage || 0) >= 60 ? 'text-yellow-600' :
                                                        'text-red-600'
                                                    }`}>
                                                        {progress.average_percentage ? Math.round(progress.average_percentage) : 0}%
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {progress.last_activity_date ? new Date(progress.last_activity_date).toLocaleDateString('vi-VN') : 'Chưa có'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPage;