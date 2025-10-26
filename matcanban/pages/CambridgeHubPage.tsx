import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowUturnLeftIcon, ChevronRightIcon, PencilIcon, SpeakerWaveIcon, ChatBubbleLeftRightIcon, QuestionMarkCircleIcon } from '../components/Icons';

const CambridgeHubPage: React.FC = () => {
    const navigate = useNavigate();
    const { level } = useParams<{ level: string }>(); // starters, movers, flyers
    const capitalizedLevel = level ? level.charAt(0).toUpperCase() + level.slice(1) : '';

    const skills = [
        { name: 'Listening', path: `/tests/cambridge_${level}/listening`, icon: <SpeakerWaveIcon/>, disabled: true },
        { name: 'Reading & Writing - Part 1', path: `/tests/cambridge_${level}/part1`, icon: <PencilIcon/>, disabled: false },
        { name: 'Reading & Writing - Part 2', path: `/tests/cambridge_${level}/part2`, icon: <PencilIcon/>, disabled: false },
        { name: 'Speaking', path: `/tests/cambridge_${level}/speaking`, icon: <ChatBubbleLeftRightIcon/>, disabled: true },
        { name: 'Quiz Lý thuyết', path: `/cambridge-${level}-theory`, icon: <QuestionMarkCircleIcon/>, disabled: false },
    ];

    return (
        <div className="bg-slate-50 -m-8 px-4 pt-20 pb-12 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate('/exam-hub')} className="btn btn-secondary mb-8 text-lg px-6 py-3 shadow-sm">
                    <ArrowUturnLeftIcon className="w-6 h-6 mr-2" />
                    Quay lại
                </button>
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">Cambridge Test: {capitalizedLevel}</h1>
                    <p className="mt-4 text-xl text-gray-600">Chọn một phần thi để bắt đầu.</p>
                </header>
                <div className="space-y-4">
                    {skills.map(skill => (
                        <div 
                            key={skill.path} 
                            onClick={() => !skill.disabled && navigate(skill.path)} 
                            className={`card-base bg-white border flex items-center p-4 ${skill.disabled ? 'opacity-60 cursor-not-allowed' : 'card-hover'}`}
                        >
                            <div className="p-3 bg-amber-100 text-amber-600 rounded-lg mr-4">
                               {React.cloneElement(skill.icon, {className: "w-8 h-8"})}
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-xl font-bold text-gray-800">{skill.name}</h2>
                            </div>
                            {!skill.disabled && <ChevronRightIcon className="w-6 h-6 text-gray-400" />}
                            {skill.disabled && <span className="text-sm font-semibold text-gray-500">Sắp ra mắt</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CambridgeHubPage;