// services/userService.ts
import { User } from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { defaultUsers } from '../data/users';
import { loadOrInitializeData, saveData } from './dataService';

/**
 * Check if we should use API (production) or localStorage (development)
 * Production: Always try API first
 * Development: Try API if server is available, fallback to localStorage
 */
const shouldUseAPI = (): boolean => {
    // In production, always use API
    if (import.meta.env.PROD) {
        return true;
    }
    
    // In development, check if API_URL is set or use localStorage
    const apiUrl = import.meta.env.VITE_USE_API;
    if (apiUrl === 'true' || apiUrl === '1') {
        return true;
    }
    
    // Default: Try API first, but allow fallback
    return true; // Still try API, but will fallback if not available
};

/**
 * Helper function to verify if JWT token is valid (not expired)
 */
const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;
    
    try {
        // Decode JWT token without verification (just to check expiration)
        const parts = token.split('.');
        if (parts.length !== 3) return false;
        
        const payload = JSON.parse(atob(parts[1]));
        const exp = payload.exp;
        
        if (!exp) return false; // No expiration claim
        
        // Check if token is expired (with 5 minute buffer)
        const now = Math.floor(Date.now() / 1000);
        return exp > (now + 300); // Token is valid if expires more than 5 minutes from now
    } catch (e) {
        console.warn('[isTokenValid] Failed to parse token:', e);
        return false;
    }
};

/**
 * Helper function to call API with fallback to localStorage
 */
const callAPI = async <T>(url: string, options?: RequestInit): Promise<{ data: T | null; error: string | null }> => {
    try {
        // 🔒 SECURITY: Get JWT token from localStorage
        const token = localStorage.getItem('authToken');
        
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options?.headers,
        };
        
        // Add Authorization header if token exists
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        // ✅ FIX: Use proper API base URL
        // In development, Vite proxy will handle /api/* requests to localhost:3000
        // In production, use full URL or relative (same origin)
        const apiBaseUrl = import.meta.env.VITE_API_URL || '';
        const fullUrl = url.startsWith('http') ? url : `${apiBaseUrl}${url}`;
        
        // 🔍 DEBUG: Log API calls in development
        if (import.meta.env.DEV) {
            console.log('🔍 [API] Calling:', fullUrl, { method: options?.method || 'GET' });
        }
        
        // Add a timeout so UI never hangs indefinitely
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 10000); // 10s timeout
        let response: Response;
        try {
            response = await fetch(fullUrl, {
                ...options,
                headers,
                signal: controller.signal,
            });
        } finally {
            clearTimeout(timeoutId);
        }
        
        // Handle 204 No Content responses
        if (response.status === 204) {
            if (!response.ok) {
                return { data: null, error: `HTTP ${response.status}` };
            }
            return { data: null, error: null };
        }
        
        // Try to parse JSON, handle empty or invalid responses
        try {
            const text = await response.text();
            
            // Empty response
            if (!text || text.trim() === '') {
                if (!response.ok) {
                    return { data: null, error: `HTTP ${response.status}` };
                }
                return { data: null, error: null };
            }
            
            // Parse JSON
            let responseData;
            try {
                responseData = JSON.parse(text);
            } catch (parseError) {
                console.warn(`Failed to parse JSON response from ${url}:`, parseError);
                if (!response.ok) {
                    return { data: null, error: `HTTP ${response.status}: Invalid JSON response` };
                }
                return { data: null, error: 'Invalid JSON response' };
            }
            
            if (!response.ok) {
                return { data: null, error: responseData.error || `HTTP ${response.status}` };
            }
            
            return { data: responseData, error: null };
        } catch (textError) {
            // Error reading response body
            console.warn(`Failed to read response body from ${url}:`, textError);
            if (!response.ok) {
                return { data: null, error: `HTTP ${response.status}` };
            }
            return { data: null, error: 'Failed to read response' };
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Network error';
        // Normalize aborts/timeouts to a clear label for UI logic
        const normalized = message.includes('AbortError') ? 'Request timeout' : message;
        console.warn(`API call to ${url} failed, falling back to localStorage:`, normalized);
        return { data: null, error: normalized };
    }
};

/**
 * Fetches the list of users. Tries API first, falls back to localStorage.
 * @returns A promise that resolves to an array of all users.
 */
export const getUsers = async (adminKey?: string): Promise<User[]> => {
    // 🔒 SECURITY: Get admin key from environment or use provided key
    // ❌ REMOVED: Hardcoded fallback '01111110' - security risk!
    const adminKeyToUse = adminKey || import.meta.env.VITE_ADMIN_KEY;
    
    // ✅ FIX: Only call API if admin key is provided
    // If no admin key, skip API call and use localStorage fallback
    // This allows regular users to login without admin key
    if (adminKeyToUse) {
        try {
            const { data: apiUsers, error } = await callAPI<User[]>('/api/users', {
                headers: {
                    'X-Admin-Key': adminKeyToUse,
                },
            });
            if (!error && apiUsers && Array.isArray(apiUsers)) {
                // Cache in localStorage for offline access
                saveData(LOCAL_STORAGE_KEYS.USERS, apiUsers);
                return apiUsers;
            }
        } catch (error) {
            console.warn('Failed to fetch users from API, using localStorage:', error);
        }
    } else {
        // No admin key provided - skip API call, use localStorage only
        console.log('No admin key provided, using localStorage fallback');
    }
    
    // Fallback to localStorage (works for regular users without admin key)
    return loadOrInitializeData(LOCAL_STORAGE_KEYS.USERS, defaultUsers);
};

/**
 * Logs in a user. Tries API first, falls back to localStorage.
 * @param email User's email
 * @param password User's password
 * @returns The logged-in user object.
 * @throws Will throw an error if login fails.
 */
// Helper function to detect device type
const detectDeviceType = (): 'laptop' | 'mobile' => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    return isMobile ? 'mobile' : 'laptop';
};

// Helper function to detect incognito/private mode
const detectIncognito = async (): Promise<boolean> => {
    try {
        // Method 1: Check localStorage quota (most reliable)
        const testKey = '__incognito_test__';
        try {
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
        } catch (e) {
            return true; // localStorage is disabled in incognito
        }

        // Method 2: Check if FileSystem API is available (Chrome)
        if ('webkitRequestFileSystem' in window) {
            return new Promise((resolve) => {
                (window as any).webkitRequestFileSystem(0, 0, () => resolve(false), () => resolve(true));
            });
        }

        // Method 3: Check if indexedDB is available (Firefox)
        if ('indexedDB' in window) {
            try {
                const db = await new Promise((resolve, reject) => {
                    const request = indexedDB.open('__incognito_test__');
                    request.onerror = () => reject(true);
                    request.onsuccess = () => {
                        request.result.close();
                        resolve(false);
                    };
                });
                return false;
            } catch (e) {
                return true;
            }
        }

        return false;
    } catch (e) {
        return false; // Assume not incognito if detection fails
    }
};

// Helper function to generate browser fingerprint
const generateBrowserFingerprint = (): string => {
    const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || 'unknown-platform';
    const timeZone = (() => {
        try {
            return Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        } catch (e) {
            return '';
        }
    })();

    const fingerprint = [
        platform,
        navigator.language || '',
        screen.width + 'x' + screen.height,
        screen.colorDepth || '',
        window.devicePixelRatio || '',
        new Date().getTimezoneOffset(),
        timeZone,
        navigator.hardwareConcurrency || '',
        navigator.deviceMemory || ''
    ].join('|');

    // Simple hash function
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
        const char = fingerprint.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    return Math.abs(hash).toString(36);
};

export const loginUser = async (email?: string, password?: string): Promise<User> => {
    if (!email || !password) {
        throw new Error('Email and password are required.');
    }

    // 🔒 SECURITY: Detect incognito mode
    const isIncognito = await detectIncognito();
    if (isIncognito) {
        throw new Error('Không thể đăng nhập ở chế độ ẩn danh. Vui lòng tắt chế độ ẩn danh và thử lại.');
    }

    // 🔒 SECURITY: Detect device type and generate browser fingerprint
    const deviceType = detectDeviceType();
    const browserFingerprint = generateBrowserFingerprint();
    const userAgent = navigator.userAgent;

    // Try API first
    try {
        const { data: apiUser, error: apiError } = await callAPI<User>('/api/login', {
            method: 'POST',
            body: JSON.stringify({ 
                email, 
                password,
                deviceType,
                browserFingerprint,
                isIncognito: false, // Already checked above
                userAgent
            }),
        });
        
        if (!apiError && apiUser) {
            // 🔒 SECURITY: Store JWT token and session token separately
            if ((apiUser as any).token) {
                localStorage.setItem('authToken', (apiUser as any).token);
            }
            if ((apiUser as any).sessionToken) {
                localStorage.setItem('sessionToken', (apiUser as any).sessionToken);
            }
            if (deviceType) {
                localStorage.setItem('deviceType', deviceType);
            }
            if (browserFingerprint) {
                localStorage.setItem('browserFingerprint', browserFingerprint);
            }
            
            // Remove tokens from user object before storing
            const { token, sessionToken, deviceType: _, browserFingerprint: __, ...userWithoutTokens } = apiUser as any;
            const finalUser = userWithoutTokens as User;
            
            // Update localStorage cache
            const users = await getUsers();
            const existingIndex = users.findIndex(u => u.id === finalUser.id);
            if (existingIndex >= 0) {
                users[existingIndex] = finalUser;
            } else {
                users.push(finalUser);
            }
            saveData(LOCAL_STORAGE_KEYS.USERS, users);
            return finalUser;
        }
        
        // If API returned an error (e.g., 401), try localStorage fallback
        // This allows login to work when database user doesn't exist but localStorage user does
        if (apiError && (apiError.includes('401') || apiError.includes('Invalid'))) {
            console.warn('API login failed (user not found in database), trying localStorage fallback:', apiError);
            // Continue to localStorage fallback below
        }
    } catch (error) {
        // If it's a validation error from API, try localStorage fallback
        if (error instanceof Error && (error.message.includes('Invalid') || error.message.includes('401'))) {
            console.warn('API login failed (user not found in database), trying localStorage fallback:', error.message);
            // Continue to localStorage fallback below
        } else {
            console.warn('API login failed, trying localStorage:', error);
        }
    }

    // Fallback to localStorage (works in development or when database user doesn't exist)
    const users = await getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        return user;
    } else {
        // Add a small delay to simulate network roundtrip and prevent brute-force timing attacks
        await new Promise(resolve => setTimeout(resolve, 500));
        throw new Error('Invalid email or password.');
    }
};

/**
 * Registers a new user. Tries API first, falls back to localStorage.
 * @param name User's name
 * @param email User's email
 * @param password User's password
 * @returns The newly created user object.
 * @throws Will throw an error if registration fails.
 */
export const registerUser = async (name?: string, email?: string, password?: string): Promise<User> => {
    if (!name || !email || !password) {
        throw new Error('Name, email, and password are required.');
    }

    // Try API first
    try {
        const { data: apiUser, error: apiError } = await callAPI<User>('/api/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });
        
        if (!apiError && apiUser) {
            // Update localStorage cache
            const users = await getUsers();
            users.push(apiUser);
            saveData(LOCAL_STORAGE_KEYS.USERS, users);
            return apiUser;
        }
        
        // If API returned an error (e.g., email already exists), throw it
        if (apiError) {
            throw new Error(apiError);
        }
    } catch (error) {
        // If it's a validation error from API, rethrow it
        if (error instanceof Error && (error.message.includes('already exists') || error.message.includes('409') || error.message.includes('400'))) {
            throw error;
        }
        console.warn('API registration failed, trying localStorage:', error);
    }

    // Fallback to localStorage
    const users = await getUsers();
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        throw new Error('An account with this email already exists.');
    }

    const newUser: User = {
        id: `user_${Date.now()}`,
        name: name || 'New User',
        email: email || '',
        password: password,
        role: 'Free',
        packages: [],
        activated: true,
        mobileLogin: false,
        joinDate: new Date().toLocaleDateString('en-GB'),
        expiryDate: '-',
        registered_at: new Date().toISOString(),
        bananaBalance: 30,
    };
    
    const updatedUsers = [...users, newUser];
    saveData(LOCAL_STORAGE_KEYS.USERS, updatedUsers);
    
    return newUser;
};

/**
 * Updates a user's own profile (name, email, password). Tries API first, falls back to localStorage.
 * (For User profile update - no admin key required)
 * @param user The user object with updated profile data (name, email, password).
 * @returns The updated user object.
 */
export const updateUserProfile = async (userToUpdate: User): Promise<User> => {
    console.log('[updateUserProfile] Start:', { id: userToUpdate.id, name: userToUpdate.name, email: userToUpdate.email, bananaBalance: userToUpdate.bananaBalance });
    
    // Build update data object (profile fields: name, email, password, bananaBalance)
    const updateData: any = {};
    if (userToUpdate.name !== undefined) updateData.name = userToUpdate.name;
    if (userToUpdate.email !== undefined) updateData.email = userToUpdate.email;
    if (userToUpdate.password !== undefined) updateData.password = userToUpdate.password;
    if (userToUpdate.bananaBalance !== undefined) updateData.bananaBalance = userToUpdate.bananaBalance;
    
    console.log('🟢 [userService] updateUserProfile - updateData:', updateData);
    
    // Try API first - use profile endpoint (no admin key required)
    try {
        const { data: apiUser, error: apiError } = await callAPI<User>(`/api/users/profile/${userToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
        });
        
        if (!apiError && apiUser) {
            // Update localStorage cache
            const users = await getUsers();
            const userIndex = users.findIndex(u => u.id === apiUser.id);
            if (userIndex >= 0) {
                users[userIndex] = apiUser;
                saveData(LOCAL_STORAGE_KEYS.USERS, users);
            }
            return apiUser;
        }
        
        if (apiError) {
            throw new Error(apiError);
        }
    } catch (error) {
        console.warn('[updateUserProfile] API update failed, trying localStorage:', error);
        if (error instanceof Error && (error.message.includes('404') || error.message.includes('not found'))) {
            throw error;
        }
    }
    
    // Fallback to localStorage
    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === userToUpdate.id);
    
    if (userIndex === -1) {
        throw new Error('User not found in local storage.');
    }
    
    const updatedUser = { ...users[userIndex], ...updateData };
    users[userIndex] = updatedUser;
    saveData(LOCAL_STORAGE_KEYS.USERS, users);
    console.log('[updateUserProfile] localStorage updated successfully:', { bananaBalance: updatedUser.bananaBalance });
    return updatedUser;
};

/**
 * Updates a user's data. Tries API first, falls back to localStorage.
 * (For Admin page - can update role, bananaBalance, name, email, password)
 * @param user The user object with updated data.
 * @returns The updated user object.
 */
export const updateUserOnServer = async (userToUpdate: User, adminKey?: string): Promise<User> => {
    // 🔒 SECURITY: Get admin key from environment or use provided key
    // ❌ REMOVED: Hardcoded fallback '01111110' - security risk!
    const adminKeyToUse = adminKey || import.meta.env.VITE_ADMIN_KEY;
    
    if (!adminKeyToUse) {
        throw new Error('Admin authentication required. Please provide admin key.');
    }
    
    // Try API first
    try {
        const updateData: any = { 
            bananaBalance: userToUpdate.bananaBalance,
            role: userToUpdate.role 
        };
        
        // Always include name when updating - name is always present in user object
        // This ensures name changes are always sent to the server
        updateData.name = userToUpdate.name || '';
        
        // Include password if it's being updated
        if (userToUpdate.password) {
            updateData.password = userToUpdate.password;
        }
        
        // Always include email when updating - email is always present in user object
        // This ensures email changes are always sent to the server
        updateData.email = userToUpdate.email || '';
        
        console.log('🟢 [userService] updateUserOnServer - updateData:', updateData);
        
        const { data: apiUser, error: apiError } = await callAPI<User>(`/api/users/${userToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'X-Admin-Key': adminKeyToUse,
            },
            body: JSON.stringify(updateData),
        });
        
        if (!apiError && apiUser) {
            // Update localStorage cache
            const users = await getUsers(adminKeyToUse);
            const userIndex = users.findIndex(u => u.id === apiUser.id);
            if (userIndex >= 0) {
                users[userIndex] = apiUser;
                saveData(LOCAL_STORAGE_KEYS.USERS, users);
            }
            return apiUser;
        }
        
        // If API returned an error, throw it (don't fallback to localStorage in production)
        if (apiError) {
            console.error('❌ [userService] updateUserOnServer API error:', apiError);
            throw new Error(apiError);
        }
    } catch (error) {
        // If it's a validation error or known error, rethrow it
        if (error instanceof Error && (
            error.message.includes('already exists') || 
            error.message.includes('409') || 
            error.message.includes('403') ||
            error.message.includes('400') ||
            error.message.includes('500') ||
            error.message.includes('503')
        )) {
            throw error;
        }
        
        // Only fallback to localStorage in development mode or if it's a network error
        const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost';
        if (!isDevelopment) {
            // In production, don't fallback - throw the error
            console.error('❌ [userService] updateUserOnServer failed in production:', error);
            throw error instanceof Error ? error : new Error('Failed to update user on server.');
        }
        
        console.warn('⚠️ [userService] API update user failed, trying localStorage fallback (dev mode):', error);
    }

    // Fallback to localStorage (only in development)
    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === userToUpdate.id);

    if (userIndex === -1) {
        throw new Error('User not found.');
    }

    const updatedUsers = [...users];
    // Only update specific fields to match original backend intent
    updatedUsers[userIndex].bananaBalance = userToUpdate.bananaBalance;
    updatedUsers[userIndex].role = userToUpdate.role;
    
    saveData(LOCAL_STORAGE_KEYS.USERS, updatedUsers);
    
    return updatedUsers[userIndex];
};

/**
 * Adds bananas for a user. Tries API first, falls back to localStorage.
 * @param userId The ID of the user.
 * @param amount The amount of bananas to add.
 * @returns The updated user object.
 */
export const addBananasForUser = async (userId: string, amount: number, reason?: string, source?: string, currentUser?: User): Promise<User | null> => {
    // Get current user first
    const users = await getUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return null;
    }

    // 🔒 SECURITY: Get current user credentials for authentication
    // If currentUser is provided, use it; otherwise try to get from localStorage
    let authUser = currentUser;
    if (!authUser) {
        try {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                authUser = JSON.parse(storedUser);
            }
        } catch (e) {
            console.warn('[addBananasForUser] Failed to get current user from localStorage');
        }
    }
    
    // 🔒 SECURITY: Verify user can only modify their own balance
    if (!authUser || authUser.id !== userId) {
        console.warn('⚠️ [SECURITY] User attempted to modify balance of another user:', { 
            currentUserId: authUser?.id, 
            targetUserId: userId 
        });
        throw new Error('You can only modify your own balance.');
    }
    
    // 🔒 SECURITY: Verify we have JWT token
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.warn('⚠️ [SECURITY] Missing authentication token for user:', userId);
        throw new Error('Authentication required. Please login again.');
    }

    // Try API first - use transaction endpoint for better tracking
    // JWT token will be automatically added by callAPI function
    try {
        const { data: transactionData, error: apiError } = await callAPI<any>('/api/banana-transactions', {
            method: 'POST',
            body: JSON.stringify({ 
                userId, 
                transactionType: 'add', 
                amount, 
                reason: reason || 'System reward',
                source: source || 'system'
            }),
        });
        
        if (!apiError && transactionData && transactionData.newBalance !== undefined) {
            // Update localStorage cache
            const userIndex = users.findIndex(u => u.id === userId);
            if (userIndex >= 0) {
                users[userIndex].bananaBalance = transactionData.newBalance;
                saveData(LOCAL_STORAGE_KEYS.USERS, users);
            }
            // Return updated user
            const updatedUser = { ...user, bananaBalance: transactionData.newBalance };
            return updatedUser;
        }
    } catch (error) {
        console.warn('API add bananas failed, trying fallback:', error);
    }

    // Fallback: Use direct update (will log transaction in backend)
    try {
        const newBalance = user.bananaBalance + amount;
        const { data: apiUser, error: apiError } = await callAPI<User>(`/api/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({ bananaBalance: newBalance }),
        });
        
        if (!apiError && apiUser) {
            // Update localStorage cache
            const userIndex = users.findIndex(u => u.id === userId);
            if (userIndex >= 0) {
                users[userIndex] = apiUser;
                saveData(LOCAL_STORAGE_KEYS.USERS, users);
            }
            return apiUser;
        }
    } catch (error) {
        console.warn('API add bananas fallback failed, trying localStorage:', error);
    }

    // Final fallback to localStorage (no transaction logging)
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const updatedUsers = JSON.parse(JSON.stringify(users)); // Deep copy
        updatedUsers[userIndex].bananaBalance = user.bananaBalance + amount;
        saveData(LOCAL_STORAGE_KEYS.USERS, updatedUsers);
        return updatedUsers[userIndex];
    }
    
    return null;
};

/**
 * Deducts bananas from a user. Tries API first, falls back to localStorage.
 * @param userId The ID of the user.
 * @param amount The amount of bananas to deduct (positive number).
 * @returns The updated user object, or null if insufficient balance or user not found.
 */
export const deductBananasForUser = async (userId: string, amount: number, reason?: string, source?: string, currentUser?: User): Promise<User | null> => {
    console.log('[deductBananasForUser] Start:', { userId, amount });
    
    // Get current user first
    const users = await getUsers();
    let user = users.find(u => u.id === userId);
    
    // If user not found in API, check localStorage directly
    if (!user) {
        console.warn('[deductBananasForUser] User not found in API response, using localStorage directly...');
        const localUsers = loadOrInitializeData(LOCAL_STORAGE_KEYS.USERS, []);
        user = localUsers.find(u => u.id === userId);
        
        if (!user) {
            console.error('[deductBananasForUser] User not found in localStorage either:', userId);
            return null;
        }
        console.log('[deductBananasForUser] User found in localStorage, will use localStorage mode');
    }

    console.log('[deductBananasForUser] Current balance:', user.bananaBalance);

    // Check if user has enough bananas
    if (user.bananaBalance < amount) {
        console.warn('[deductBananasForUser] Insufficient banana balance:', { current: user.bananaBalance, required: amount });
        return null;
    }
    
    // 🔒 SECURITY: Verify user can only modify their own balance
    // Get current user from localStorage if not provided
    let authUser = currentUser;
    if (!authUser) {
        try {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                authUser = JSON.parse(storedUser);
            }
        } catch (e) {
            console.warn('[deductBananasForUser] Failed to get current user from localStorage');
        }
    }
    
    // 🔒 SECURITY: Verify user can only modify their own balance
    if (!authUser || authUser.id !== userId) {
        console.warn('⚠️ [SECURITY] User attempted to modify balance of another user:', { 
            currentUserId: authUser?.id, 
            targetUserId: userId 
        });
        throw new Error('You can only modify your own balance.');
    }
    
    // 🔒 SECURITY: Verify we have JWT token
    const token = localStorage.getItem('authToken');
    let hasValidToken = !!token;
    
    if (!token) {
        console.warn('⚠️ [SECURITY] Missing authentication token for user:', userId);
        // Don't throw error immediately - try to proceed with fallback
        // But we'll log this as a warning
    }

    // Try API first - use transaction endpoint for better tracking and security
    // JWT token will be automatically added by callAPI function
    if (hasValidToken) {
        try {
            console.log('[deductBananasForUser] Calling transaction API...');
            const { data: transactionData, error: apiError } = await callAPI<any>('/api/banana-transactions', {
                method: 'POST',
                body: JSON.stringify({ 
                    userId, 
                    transactionType: 'deduct', 
                    amount, 
                    reason: reason || 'Lesson purchase',
                    source: source || 'lesson-purchase'
                }),
            });
            
            if (!apiError && transactionData && transactionData.newBalance !== undefined) {
                console.log('[deductBananasForUser] Transaction API success, updating cache');
                // Update localStorage cache
                const userIndex = users.findIndex(u => u.id === userId);
                if (userIndex >= 0) {
                    users[userIndex].bananaBalance = transactionData.newBalance;
                    saveData(LOCAL_STORAGE_KEYS.USERS, users);
                }
                // Return updated user
                const updatedUser = { ...user, bananaBalance: transactionData.newBalance };
                return updatedUser;
            } else {
                console.warn('[deductBananasForUser] Transaction API error:', apiError);
                // If error is 401/403 (auth error), mark token as invalid
                if (apiError && (apiError.includes('401') || apiError.includes('403') || apiError.includes('Authentication'))) {
                    hasValidToken = false;
                    console.warn('[deductBananasForUser] Token invalid, will try fallback');
                }
            }
        } catch (error: any) {
            console.warn('[deductBananasForUser] Transaction API failed, trying fallback:', error);
            // If error is 401/403 (auth error), mark token as invalid
            if (error?.message && (error.message.includes('401') || error.message.includes('403') || error.message.includes('Authentication'))) {
                hasValidToken = false;
                console.warn('[deductBananasForUser] Token invalid, will try fallback');
            }
        }
    }

    // Fallback: Try public transaction endpoint (no JWT required, but needs email + password)
    // This allows users without JWT token to still log transactions to database
    try {
        console.log('[deductBananasForUser] Trying public transaction API...');
        // Get user email and password from localStorage or currentUser
        const userEmail = authUser?.email || user.email;
        const userPassword = authUser?.password || user.password;
        
        if (userEmail && userPassword) {
            const { data: transactionData, error: apiError } = await callAPI<any>('/api/banana-transactions/public', {
                method: 'POST',
                body: JSON.stringify({ 
                    userId, 
                    transactionType: 'deduct', 
                    amount, 
                    reason: reason || 'Lesson purchase',
                    source: source || 'lesson-purchase',
                    userEmail,
                    userPassword
                }),
            });
            
            if (!apiError && transactionData && transactionData.newBalance !== undefined) {
                console.log('[deductBananasForUser] Public transaction API success, updating cache');
                // Update localStorage cache
                const userIndex = users.findIndex(u => u.id === userId);
                if (userIndex >= 0) {
                    users[userIndex].bananaBalance = transactionData.newBalance;
                    saveData(LOCAL_STORAGE_KEYS.USERS, users);
                }
                // Return updated user
                const updatedUser = { ...user, bananaBalance: transactionData.newBalance };
                return updatedUser;
            } else {
                console.warn('[deductBananasForUser] Public transaction API error:', apiError);
            }
        } else {
            console.warn('[deductBananasForUser] Missing email or password for public transaction');
        }
    } catch (error) {
        console.warn('[deductBananasForUser] Public transaction API failed, trying localStorage:', error);
    }

    // Final fallback to localStorage (no transaction logging)
    // ⚠️ WARNING: This will update localStorage but NOT the database
    // Transaction will NOT appear in Admin panel
    console.warn('⚠️ [deductBananasForUser] Falling back to localStorage - transaction will NOT be logged in database!');
    console.warn('⚠️ [deductBananasForUser] User should login again to sync with database');
    const newBalance = user.bananaBalance - amount;
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const updatedUsers = JSON.parse(JSON.stringify(users)); // Deep copy
        updatedUsers[userIndex].bananaBalance = newBalance;
        saveData(LOCAL_STORAGE_KEYS.USERS, updatedUsers);
        console.log('[deductBananasForUser] localStorage updated successfully (but NOT synced to database)');
        return updatedUsers[userIndex];
    }
    
    console.error('[deductBananasForUser] Failed to update - user not found in localStorage');
    return null;
};

/**
 * Deletes a user. Tries API first, falls back to localStorage.
 * @param userId The ID of the user to delete.
 * @returns True if deletion was successful, false otherwise.
 */
export const deleteUser = async (userId: string, adminKey?: string): Promise<boolean> => {
    console.log('[deleteUser] Start:', { userId });
    
    // 🔒 SECURITY: Get admin key from environment or use provided key
    // ❌ REMOVED: Hardcoded fallback '01111110' - security risk!
    const adminKeyToUse = adminKey || import.meta.env.VITE_ADMIN_KEY;
    
    if (!adminKeyToUse) {
        throw new Error('Admin authentication required. Please provide admin key.');
    }
    
    // Try API first
    try {
        const { data, error } = await callAPI<any>(`/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'X-Admin-Key': adminKeyToUse,
            },
        });
        
        if (!error && data && data.success) {
            console.log('[deleteUser] API success');
            // Update localStorage cache
            const users = await getUsers(adminKeyToUse);
            const updatedUsers = users.filter(u => u.id !== userId);
            saveData(LOCAL_STORAGE_KEYS.USERS, updatedUsers);
            return true;
        }
        
        if (error) {
            throw new Error(error);
        }
    } catch (error) {
        console.warn('[deleteUser] API delete failed, trying localStorage:', error);
        if (error instanceof Error && (error.message.includes('404') || error.message.includes('not found'))) {
            throw error;
        }
    }
    
    // Fallback to localStorage
    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        throw new Error('User not found in local storage.');
    }
    
    const updatedUsers = users.filter(u => u.id !== userId);
    saveData(LOCAL_STORAGE_KEYS.USERS, updatedUsers);
    console.log('[deleteUser] localStorage updated successfully');
    return true;
};

// --- Test Results Interface ---
export interface TestResult {
    id?: number;
    user_id: string;
    test_type: string;
    test_id: string;
    test_name?: string;
    score: number;
    total_questions: number;
    percentage: number;
    completed_at?: string;
    time_spent?: number;
    question_answers?: Array<{
        questionId: number;
        selectedOption: number;
        correctOption: number;
        isCorrect: boolean;
        questionText?: string;
        selectedText?: string;
        correctText?: string;
    }>;
    created_at?: string;
    user_name?: string;
    user_email?: string;
}

export interface TestStats {
    total_tests: number;
    tests_passed: number;
    average_percentage: number;
    best_score: number;
    worst_score: number;
    total_time_spent: number;
    test_types_count: number;
    unique_tests_count: number;
}

/**
 * Save test result
 */
export const saveTestResult = async (testResult: TestResult): Promise<TestResult | null> => {
    try {
        const { data, error } = await callAPI<TestResult>('/api/test-results', {
            method: 'POST',
            body: JSON.stringify(testResult),
        });

        if (error || !data) {
            console.warn('Failed to save test result:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error saving test result:', error);
        return null;
    }
};

/**
 * Get test results for a user
 */
export const getUserTestResults = async (userId: string, limit = 50, offset = 0): Promise<TestResult[]> => {
    try {
        const { data, error } = await callAPI<TestResult[]>(`/api/test-results/user/${userId}?limit=${limit}&offset=${offset}`);

        if (error || !data) {
            console.warn('Failed to get user test results:', error);
            return [];
        }

        return data;
    } catch (error) {
        console.error('Error getting user test results:', error);
        return [];
    }
};

/**
 * Get test statistics for a user
 */
export const getUserTestStats = async (userId: string): Promise<TestStats | null> => {
    try {
        const { data, error } = await callAPI<TestStats>(`/api/test-results/stats/${userId}`);

        if (error || !data) {
            console.warn('Failed to get user test stats:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error getting user test stats:', error);
        return null;
    }
};

/**
 * Get all test results (admin only)
 */
export const getAllTestResults = async (adminKey: string, filters?: { userId?: string; testType?: string; testId?: string }, limit = 100, offset = 0): Promise<TestResult[]> => {
    try {
        const params = new URLSearchParams();
        if (filters?.userId) params.append('userId', filters.userId);
        if (filters?.testType) params.append('testType', filters.testType);
        if (filters?.testId) params.append('testId', filters.testId);
        params.append('limit', limit.toString());
        params.append('offset', offset.toString());

        const { data, error } = await callAPI<TestResult[]>(`/api/test-results?${params.toString()}`, {
            headers: {
                'X-Admin-Key': adminKey,
            },
        });

        if (error || !data) {
            console.warn('Failed to get all test results:', error);
            return [];
        }

        return data;
    } catch (error) {
        console.error('Error getting all test results:', error);
        return [];
    }
};
