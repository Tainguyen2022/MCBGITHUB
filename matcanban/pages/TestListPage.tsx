import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { TestListItem } from '../types';
import { testLists as defaultTestLists } from '../data/testLists';
import { ArrowUturnLeftIcon, ChevronRightIcon, LockClosedIcon, TrashIcon } from '../components/Icons';
import { useAuth } from '../App';
import { loadOrInitializeData } from '../services/dataService';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { deleteTestFromList } from '../services/testListService';

const TestListPage: React.FC = () => {
    const { exam, part } = useParams<{ exam: string; part: string }>();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const isAdmin = currentUser?.role === 'Admin';

    const [testLists, setTestLists] = useState(() => 
        loadOrInitializeData(LOCAL_STORAGE_KEYS.PRACTICE_TESTS_LISTS, defaultTestLists)
    );

    const { testsForPart, title } = useMemo(() => {
        if (!exam || !part || !testLists[exam] || !testLists[exam][part]) {
            return { testsForPart: [], title: 'Unknown Test' };
        }
        const examData = testLists[exam];
        const partData = examData[part];
        const title = partData[0]?.title.split(' - ')[0] || `Practice for ${exam} ${part}`;
        return { testsForPart: partData, title };
    }, [exam, part, testLists]);

    const handleDelete = (testId: string, testTitle: string) => {
        if (window.confirm(`Are you sure you want to delete this test?\n\n"${testTitle}"`)) {
            if (!exam || !part) return;
            // Call the service to update localStorage
            deleteTestFromList(exam, part, testId);
            // Update local state to reflect the change immediately
            setTestLists(prevLists => {
                const newLists = JSON.parse(JSON.stringify(prevLists));
                newLists[exam][part] = newLists[exam][part].filter((test: TestListItem) => test.id !== testId);
                return newLists;
            });
        }
    };

    const isUserPremium = currentUser?.role === 'Premium' || currentUser?.role === 'Admin';

    return (
        <div className="bg-slate-50 -m-8 px-4 pt-20 pb-12 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate(-1)} className="btn btn-secondary mb-8 text-lg px-6 py-3 shadow-sm">
                    <ArrowUturnLeftIcon className="w-6 h-6 mr-2" />
                    Quay lại
                </button>

                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
                        {title}
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Chọn một bài tập để bắt đầu.
                    </p>
                </header>

                <div className="space-y-4">
                    {testsForPart.length > 0 ? testsForPart.map(test => {
                        const isLocked = test.disabled || (!isUserPremium && test.path.includes('theory'));
                        return (
                            <div key={test.id} className="card-base bg-white border flex items-center p-4">
                                <div className="flex-grow">
                                    <h2 className="text-xl font-bold text-gray-800">{test.title}</h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    {isAdmin && (
                                        <button 
                                            onClick={() => handleDelete(test.id, test.title)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                            title={`Delete "${test.title}"`}
                                        >
                                            <TrashIcon className="w-6 h-6" />
                                        </button>
                                    )}
                                    <button
                                        // FIX: Pass navigation state if it exists on the test item.
                                        onClick={() => navigate(test.path, { state: test.state })}
                                        disabled={isLocked}
                                        className="btn btn-primary flex items-center gap-2 !rounded-lg !px-6 !py-3 disabled:bg-gray-300"
                                    >
                                        {isLocked && <LockClosedIcon className="w-5 h-5" />}
                                        Bắt đầu
                                        <ChevronRightIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        );
                    }) : (
                         <div className="text-center py-16 text-gray-500 card-base bg-white border">
                            <p className="text-2xl font-semibold">Không có bài tập nào.</p>
                            <p className="mt-2">Nội dung cho phần này sẽ sớm được cập nhật.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestListPage;