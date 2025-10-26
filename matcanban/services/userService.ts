// services/userService.ts
import { User } from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { defaultUsers } from '../data/users';
import { loadOrInitializeData, saveData } from './dataService';

/**
 * Fetches the list of users. This now uses a localStorage-first approach.
 * @returns A promise that resolves to an array of all users.
 */
export const getUsers = async (): Promise<User[]> => {
    // Simulate async fetch for components that use await
    await new Promise(resolve => setTimeout(resolve, 50)); 
    return loadOrInitializeData(LOCAL_STORAGE_KEYS.USERS, defaultUsers);
};

/**
 * Logs in a user by checking credentials against the local user list.
 * @param email User's email
 * @param password User's password
 * @returns The logged-in user object.
 * @throws Will throw an error if login fails.
 */
export const loginUser = async (email?: string, password?: string): Promise<User> => {
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
 * Registers a new user and saves them to localStorage.
 * @param name User's name
 * @param email User's email
 * @param password User's password
 * @returns The newly created user object.
 * @throws Will throw an error if registration fails.
 */
export const registerUser = async (name?: string, email?: string, password?: string): Promise<User> => {
    const users = await getUsers();
    
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        throw new Error('An account with this email already exists.');
    }

    const now = new Date().toISOString();

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
        registered_at: now,
        bananaBalance: 30,
        lastDailyBonus: now, // Set initial bonus timestamp
    };
    
    const updatedUsers = [...users, newUser];
    saveData(LOCAL_STORAGE_KEYS.USERS, updatedUsers);
    
    return newUser;
};

/**
 * Updates a user's data in localStorage.
 * (For Admin page)
 * @param user The user object with updated data (only role and bananaBalance will be updated).
 * @returns The updated user object.
 */
export const updateUserOnServer = async (userToUpdate: User): Promise<User> => {
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
 * Adds bananas for a user and updates the balance in localStorage.
 * @param userId The ID of the user.
 * @param amount The amount of bananas to add.
 * @returns The updated user object.
 */
export const addBananasForUser = async (userId: string, amount: number): Promise<User | null> => {
    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        const updatedUsers = JSON.parse(JSON.stringify(users)); // Deep copy
        updatedUsers[userIndex].bananaBalance += amount;
        saveData(LOCAL_STORAGE_KEYS.USERS, updatedUsers);
        return updatedUsers[userIndex];
    }
    
    return null;
};