import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../App';
import { getUsers } from '../services/userService';

const GoogleLoginPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    // In a real application, this would trigger the Google OAuth flow.
    // For this simulation, we'll log in a default user (e.g., the admin)
    // to demonstrate the flow after a successful Google sign-in.
    // FIX: Made the function async and added await for the getUsers() call.
    // Also added loading and error handling for better UX.
    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError('');
        try {
            const users = await getUsers();
            // Simulate logging in the admin user upon clicking the Google button.
            const adminUser = users.find(u => u.role === 'Admin');
            if (adminUser) {
                login(adminUser);
                navigate('/');
            } else {
                setError('Could not find a default user to log in.');
            }
        } catch (e) {
            setError('Failed to load user data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-2xl shadow-xl border border-slate-200">
                <div>
                    <h2 className="text-center text-4xl font-extrabold text-gray-900">
                        Sign in to Matcanban
                    </h2>
                     <p className="mt-2 text-center text-lg text-gray-600">
                        Use your Google Account to continue
                    </p>
                </div>
                
                {error && <p className="text-red-500 text-base text-center">{error}</p>}

                <div className="mt-8">
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="group relative w-full flex justify-center items-center gap-3 py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 border-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="ai-spinner !w-6 !h-6"></div>
                        ) : (
                            <svg className="w-6 h-6" viewBox="0 0 48 48">
                                <path fill="#4285F4" d="M24 9.5c3.9 0 6.8 1.6 8.4 3.2l6.5-6.5C34.6 2.3 29.8 0 24 0 14.9 0 7.3 5.4 4.5 12.9l7.8 6C14.2 13.5 18.6 9.5 24 9.5z"></path>
                                <path fill="#34A853" d="M46.2 25.4c0-1.7-.2-3.4-.5-5H24v9.3h12.5c-.5 3-2.1 5.6-4.6 7.3l7.6 5.9c4.4-4.1 7-10.1 7-17.5z"></path>
                                <path fill="#FBBC05" d="M12.3 28.9c-.4-1.2-.6-2.5-.6-3.9s.2-2.7.6-3.9l-7.8-6C1.7 18.5 0 22.1 0 26s1.7 7.5 4.5 10.9l7.8-6z"></path>
                                <path fill="#EA4335" d="M24 48c5.8 0 10.6-1.9 14.1-5.2l-7.6-5.9c-1.9 1.3-4.4 2.1-7.5 2.1-5.4 0-9.8-3.9-11.7-9.2l-7.8 6C7.3 42.6 14.9 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                        )}
                        {isLoading ? 'Connecting...' : 'Sign in with Google'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GoogleLoginPage;