
import React, { useState } from 'react';
import { useAuth } from '../App';
import { addBananasForUser } from '../services/userService';
import { BananaIcon, CheckCircleIcon } from '../components/Icons';
import { useNavigate } from 'react-router-dom';

const AddBananasPage: React.FC = () => {
    const { currentUser, updateUser } = useAuth();
    const navigate = useNavigate();
    const [addingAmount, setAddingAmount] = useState<number | null>(null);

    if (!currentUser) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold">Please log in</h2>
                <p className="text-lg mt-2">You need to be logged in to add bananas.</p>
                <button onClick={() => navigate('/login')} className="btn btn-primary mt-6">
                    Go to Login
                </button>
            </div>
        );
    }
    
    const handleAddBananas = async (amount: number) => {
        setAddingAmount(amount);
        // This is a placeholder for a real payment gateway integration.
        // The bug was that it actually increased the balance locally.
        // This fix prevents the balance from changing and informs the user that the feature is in development.
        setTimeout(() => {
            alert('Chức năng nạp Chuối đang được xây dựng. Vui lòng quay lại sau!');
            setAddingAmount(null);
        }, 1000);
    };

    const packages = [
        { bananas: 100, price: '100,000đ' },
        { bananas: 250, price: '200,000đ' },
        { bananas: 700, price: '500,000đ' },
        { bananas: 1500, price: '1,000,000đ' },
    ];

    return (
        <div className="max-w-4xl mx-auto pt-12">
            <div className="text-center">
                 <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
                    Nạp Chuối 🍌
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    Sử dụng "Chuối" để truy cập các tính năng AI nâng cao như tạo đề, kiểm tra ngữ pháp và nâng cấp bài viết.
                </p>
            </div>
            
            <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 text-center">
                <p className="text-lg text-gray-600">Số dư hiện tại của bạn:</p>
                <p className="text-6xl font-bold text-amber-500 my-2">{currentUser.bananaBalance} 🍌</p>
            </div>

            <div className="mt-12">
                <h2 className="text-3xl font-bold text-center text-gray-800">Chọn Gói Nạp</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                    {packages.map(pkg => (
                        <div key={pkg.bananas} className="card-base bg-white border-2 border-gray-200 text-center p-8 flex flex-col hover:border-amber-400 hover:shadow-2xl transition-all duration-300">
                            <div className="text-6xl mb-4">🍌</div>
                            <h3 className="text-4xl font-extrabold text-amber-600">{pkg.bananas}</h3>
                            <p className="text-lg text-gray-500">Chuối</p>
                            <div className="my-6 border-t border-gray-200"></div>
                            <p className="text-3xl font-bold text-gray-800">{pkg.price}</p>
                            <div className="flex-grow"></div>
                            <button 
                                onClick={() => handleAddBananas(pkg.bananas)}
                                disabled={addingAmount !== null}
                                className={`w-full mt-8 btn text-lg py-3 transition-colors duration-300 ${addingAmount === pkg.bananas ? '!bg-green-600' : 'btn-primary'}`}
                            >
                                {addingAmount === pkg.bananas ? <CheckCircleIcon className="w-6 h-6"/> : 'Nạp ngay'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddBananasPage;
