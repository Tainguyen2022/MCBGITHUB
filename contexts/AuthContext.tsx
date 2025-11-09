import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { updateUserOnServer, updateUserProfile } from '../services/userService';

export interface AuthContextType {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updatedUser: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = (): AuthContextType => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    const authToken = localStorage.getItem('authToken');
    
    if (stored) {
      try { 
        const user = JSON.parse(stored);
        setCurrentUser(user);
        
        // ✅ FIX: Only sync with database if we have auth token
        // Don't logout if sync fails - keep user logged in with cached data
        if (user?.id && authToken) {
          fetch(`/api/users/${user.id}`, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
          })
            .then(res => {
              if (res.ok) {
                return res.json();
              } else if (res.status === 401 || res.status === 403) {
                // Token expired or invalid - clear auth but keep user data
                console.warn('⚠️ Auth token expired, clearing auth tokens');
                localStorage.removeItem('authToken');
                localStorage.removeItem('sessionToken');
                // Don't logout - user can still use cached data
                return null;
              } else {
                // Other errors - just log, don't logout
                console.warn('⚠️ Failed to sync user from server:', res.status);
                return null;
              }
            })
            .then(serverUser => {
              if (serverUser) {
                setCurrentUser(serverUser);
                localStorage.setItem('currentUser', JSON.stringify(serverUser));
              }
              // ✅ FIX: Don't logout if sync fails - keep cached user data
            })
            .catch(err => {
              // ✅ FIX: Don't logout on network errors - keep user logged in
              console.warn('⚠️ Failed to sync user from server (network error):', err);
              // Keep user logged in with cached data
            });
        }
      } catch (err) {
        console.warn('⚠️ Failed to parse stored user:', err);
        // ✅ FIX: Don't clear everything on parse error - might be recoverable
      }
    }
  }, []);

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken'); // 🔒 SECURITY: Remove JWT token on logout
    localStorage.removeItem('sessionToken'); // 🔒 SECURITY: Remove session token on logout
    localStorage.removeItem('deviceType');
    localStorage.removeItem('browserFingerprint');
  };

  const updateUser = async (updatedUser: User) => {
    try {
      // Sync with database first - use profile endpoint (no admin key required)
      const syncedUser = await updateUserProfile(updatedUser);
      setCurrentUser(syncedUser);
      localStorage.setItem('currentUser', JSON.stringify(syncedUser));
    } catch (error) {
      console.error('Failed to update user on server:', error);
      // Fallback: still update local state
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};



