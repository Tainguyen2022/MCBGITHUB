import React, { useState } from 'react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../services/userService';

const ProfilePage: React.FC = () => {
    const { currentUser, updateUser } = useAuth();
    const navigate = useNavigate();
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if not logged in
    if (!currentUser) {
        navigate('/login');
        return null;
    }

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!currentPassword) {
            setError('Vui lòng nhập mật khẩu hiện tại');
            return;
        }

        if (!newPassword) {
            setError('Vui lòng nhập mật khẩu mới');
            return;
        }

        if (newPassword.length < 5) {
            setError('Mật khẩu mới phải có ít nhất 5 ký tự');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        if (newPassword === currentPassword) {
            setError('Mật khẩu mới phải khác mật khẩu hiện tại');
            return;
        }

        try {
            setIsLoading(true);
            
            // ✅ FIX: Verify current password by attempting login
            // This ensures user knows their current password
            const loginResponse = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: currentUser.email,
                    password: currentPassword,
                    deviceType: 'laptop',
                    browserFingerprint: localStorage.getItem('browserFingerprint') || 'change_password',
                    isIncognito: false,
                    userAgent: navigator.userAgent
                })
            });

            if (!loginResponse.ok) {
                setError('Mật khẩu hiện tại không đúng');
                setIsLoading(false);
                return;
            }

            // Update password
            const updatedUser = await updateUserProfile({
                ...currentUser,
                password: newPassword
            });

            // Update auth context
            await updateUser(updatedUser);

            // Clear form
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            
            setSuccess('Đổi mật khẩu thành công!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message || 'Không thể đổi mật khẩu. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Hồ Sơ Của Tôi
                        </h1>
                        <p className="text-gray-600">
                            Quản lý thông tin tài khoản và mật khẩu
                        </p>
                    </div>

                    {/* User Info */}
                    <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Thông Tin Tài Khoản</h2>
                        <div className="space-y-3">
                            <div>
                                <span className="text-sm font-medium text-gray-500">Tên:</span>
                                <p className="text-lg text-gray-900">{currentUser.name}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500">Email:</span>
                                <p className="text-lg text-gray-900">{currentUser.email}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500">Vai trò:</span>
                                <p className="text-lg text-gray-900">{currentUser.role}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500">Banana Points:</span>
                                <p className="text-lg text-green-600 font-semibold">{currentUser.bananaBalance || 0}</p>
                            </div>
                        </div>
                    </div>

                    {/* Change Password Form */}
                    <div className="border-t border-gray-200 pt-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Đổi Mật Khẩu</h2>
                        
                        <form onSubmit={handleChangePassword} className="space-y-6">
                            <div>
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mật khẩu hiện tại
                                </label>
                                <input
                                    id="currentPassword"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                                    placeholder="Nhập mật khẩu hiện tại"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mật khẩu mới
                                </label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                                    placeholder="Nhập mật khẩu mới (tối thiểu 5 ký tự)"
                                    required
                                    minLength={5}
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Xác nhận mật khẩu mới
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                                    placeholder="Nhập lại mật khẩu mới"
                                    required
                                    minLength={5}
                                />
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            {success && (
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-sm text-green-600">{success}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? 'Đang xử lý...' : 'Đổi Mật Khẩu'}
                            </button>
                        </form>
                    </div>

                    {/* Back Button */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-green-600 hover:text-green-700 font-medium"
                        >
                            ← Quay lại
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

