import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../types';
import { getUsers, updateUserOnServer } from '../services/userService';
import { CheckCircleIcon, PhotoIcon } from '../components/Icons';

const AdminPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const userList = await getUsers();
            setUsers(userList);
        } catch (err) {
            setError('Failed to fetch user data from localStorage.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user: User) => {
        setEditingUser({ ...user });
    };

    const handleCancel = () => {
        setEditingUser(null);
    };

    const handleSave = async () => {
        if (!editingUser) return;
        try {
            const updatedUser = await updateUserOnServer(editingUser);
            // Refresh the whole list to get the latest state
            await fetchUsers();
            setSaveSuccess(updatedUser.id);
            setTimeout(() => setSaveSuccess(null), 2000);
        } catch (err: any) {
            alert(`Failed to save user data: ${err.message}`);
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
    
    if (loading) return <div className="text-center p-10">Loading users from local storage...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto pt-12 px-4">
            <header className="text-center mb-10">
                 <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
                    Admin Dashboard
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    Manage service status and user data.
                </p>
            </header>
            
            <div className="grid grid-cols-1 gap-10 mb-10 max-w-xl mx-auto">
                <div className="card-base bg-white border border-gray-200 p-6 flex flex-col items-center justify-center text-center">
                    <PhotoIcon className="w-12 h-12 text-indigo-500 mb-3" />
                    <h3 className="text-2xl font-bold text-gray-800">Content Asset Browser</h3>
                    <p className="text-gray-600 mt-1 mb-4">Browse and manage images and sounds for lessons.</p>
                    <NavLink to="/asset-browser" className="btn btn-primary text-base">
                        Open Asset Browser
                    </NavLink>
                </div>
            </div>


            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gray-50/50 border-b">
                    <h2 className="text-xl font-bold text-gray-700">User Management (localStorage)</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heart Balance</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
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
                                            <span className="font-semibold text-pink-600">{user.bananaBalance} ❤️</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {editingUser?.id === user.id ? (
                                            <div className="flex gap-2">
                                                <button onClick={handleSave} className="text-green-600 hover:text-green-900">Save</button>
                                                <button onClick={handleCancel} className="text-gray-600 hover:text-gray-900">Cancel</button>
                                            </div>
                                        ) : (
                                             <div className="flex items-center gap-2">
                                                <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                                {saveSuccess === user.id && <CheckCircleIcon className="w-5 h-5 text-green-500" />}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;