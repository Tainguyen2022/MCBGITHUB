
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowUturnLeftIcon, ChevronRightIcon, ChatBubbleLeftRightIcon, PencilIcon, VSTEPIcon } from '../components/Icons';

interface SkillCardProps {
    name: string;
    path: string;
    state?: any;
    // FIX: Changed type to be more specific about props, resolving cloneElement error.
    icon: React.ReactElement<{ className?: string }>;
    description: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, path, state, icon, description }) => (
    <NavLink to={path} state={state} className="card-base bg-white border p-6 flex flex-col items-start card-hover group text-left transition-all duration-300">
        <div className="p-3 bg-green-100 text-green-600 rounded-lg mb-4 transition-transform group-hover:scale-110">
            {React.cloneElement(icon, { className: "w-8 h-8" })}
        </div>
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-2 mb-4 flex-grow">{description}</p>
        <span className="mt-auto text-green-600 font-semibold group-hover:underline flex items-center">
            Bắt đầu luyện tập
            <ChevronRightIcon className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
        </span>
    </NavLink>
);

const VstepHubPage: React.FC = () => {
    const navigate = useNavigate();
    const skills = [
        { name: 'Luyện Nói', path: '/speaking', state: { track_id: 'vstep' }, icon: <ChatBubbleLeftRightIcon/>, description: 'Thực hành 3 phần thi nói VSTEP, từ tương tác xã hội đến phát triển chủ đề.' },
        { name: 'Luyện Viết', path: '/writing', state: { track_id: 'VSTEP' }, icon: <PencilIcon/>, description: 'Thực hành kỹ năng viết thư (Task 1) và bài luận (Task 2) theo chuẩn VSTEP.' },
    ];
    return (
        <div className="bg-slate-50 -m-8 px-4 pt-12 pb-20 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <button onClick={() => navigate('/exam-hub')} className="btn btn-secondary mb-8 text-lg px-6 py-3 shadow-sm">
                    <ArrowUturnLeftIcon className="w-6 h-6 mr-2" />
                    Quay lại Hub
                </button>
                <header className="text-center mb-12">
                    <div className="inline-block p-4 bg-white rounded-2xl shadow-md border mb-4">
                       <VSTEPIcon className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">VSTEP Test</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">Chọn một kỹ năng để bắt đầu luyện tập theo định dạng bài thi VSTEP.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {skills.map(skill => (
                         <SkillCard key={skill.path} {...skill} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default VstepHubPage;
