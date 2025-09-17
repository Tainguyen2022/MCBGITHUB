
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowUturnLeftIcon, ChevronRightIcon, ChatBubbleLeftRightIcon, PencilIcon, BookOpenIcon, TOEICIcon } from '../components/Icons';

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
        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mb-4 transition-transform group-hover:scale-110">
            {React.cloneElement(icon, { className: "w-8 h-8" })}
        </div>
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-2 mb-4 flex-grow">{description}</p>
        <span className="mt-auto text-blue-600 font-semibold group-hover:underline flex items-center">
            Bắt đầu luyện tập
            <ChevronRightIcon className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
        </span>
    </NavLink>
);

const ToeicHubPage: React.FC = () => {
    const navigate = useNavigate();

    const skills = [
        { name: 'Part 1: Mô tả tranh (Lý thuyết)', path: '/tests/toeic/part1_theory', icon: <BookOpenIcon/>, description: 'Luyện tập các câu hỏi lý thuyết về chiến thuật mô tả tranh.' },
        { name: 'Part 2: Hỏi - Đáp (Luyện tập)', path: '/tests/toeic/part2_practice', icon: <ChatBubbleLeftRightIcon/>, description: 'Luyện nghe và chọn đáp án đúng cho các câu hỏi-đáp ngắn.' },
        { name: 'Part 5: Hoàn thành câu (Luyện tập)', path: '/tests/toeic/part5_practice', icon: <PencilIcon/>, description: 'Thực hành điền từ vào chỗ trống để hoàn thành câu.' },
        { name: 'Part 7: Đọc hiểu (Lý thuyết)', path: '/tests/toeic/part7_theory', icon: <BookOpenIcon/>, description: 'Kiểm tra kiến thức về các chiến lược đọc hiểu hiệu quả.' },
        { name: 'Luyện Nói (Tất cả các phần)', path: '/speaking', state: { track_id: 'toeic' }, icon: <ChatBubbleLeftRightIcon/>, description: 'Thực hành tất cả các phần thi nói TOEIC, từ đọc to đến trình bày quan điểm.' },
        { name: 'Luyện Viết (Tất cả các phần)', path: '/writing', state: { track_id: 'TOEIC' }, icon: <PencilIcon/>, description: 'Luyện tập kỹ năng viết email và bài luận theo chuẩn format TOEIC.' },
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
                       <TOEICIcon className="w-12 h-12 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
                        TOEIC Test
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                        Luyện tập các kỹ năng và làm bài thi thử theo từng phần của bài thi TOEIC.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map(skill => (
                        <SkillCard key={skill.path} {...skill} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ToeicHubPage;
