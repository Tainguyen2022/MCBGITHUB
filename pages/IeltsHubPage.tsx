import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowUturnLeftIcon, ChevronRightIcon, ChatBubbleLeftRightIcon, PencilIcon, BookOpenIcon, SpeakerWaveIcon, QuestionMarkCircleIcon, IELTSIcon, AcademicCapIcon } from '../components/Icons';

interface SkillCardProps {
    name: string;
    path: string;
    state?: any;
    icon: React.ReactElement<{ className?: string }>;
    description: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, path, state, icon, description }) => (
    <NavLink to={path} state={state} className="card-base bg-white border p-6 flex flex-col items-start card-hover group text-left transition-all duration-300">
        <div className="p-3 bg-violet-100 text-violet-600 rounded-lg mb-4 transition-transform group-hover:scale-110">
            {React.cloneElement(icon, { className: "w-8 h-8" })}
        </div>
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-2 mb-4 flex-grow">{description}</p>
        <span className="mt-auto text-violet-600 font-semibold group-hover:underline flex items-center">
            Bắt đầu luyện tập
            <ChevronRightIcon className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
        </span>
    </NavLink>
);

const IeltsHubPage: React.FC = () => {
    const navigate = useNavigate();

    const skills = [
        { name: 'Luyện Nói (Tất cả các phần)', path: '/speaking', state: { track_id: 'ielts' }, icon: <ChatBubbleLeftRightIcon/>, description: 'Thực hành cả 3 phần thi nói, từ phỏng vấn đến thảo luận chuyên sâu.' },
        { name: 'Luyện Viết (Tất cả các phần)', path: '/writing', state: { track_id: 'IELTS' }, icon: <PencilIcon/>, description: 'Luyện tập viết báo cáo (Task 1) và bài luận học thuật (Task 2).' },
        { name: 'Quiz Lý thuyết Nghe', path: '/ielts-listening-theory', icon: <SpeakerWaveIcon/>, description: 'Kiểm tra kiến thức về các dạng câu hỏi và chiến thuật làm bài nghe.' },
        { name: 'Quiz Lý thuyết Đọc', path: '/ielts-reading-theory', icon: <BookOpenIcon/>, description: 'Kiểm tra kiến thức về các kỹ năng skimming, scanning và các dạng bài đọc.' },
        { name: 'Quiz Lý thuyết Speaking Part 1', path: '/ielts-part1-theory', icon: <QuestionMarkCircleIcon/>, description: 'Nắm vững chiến thuật trả lời cho các câu hỏi khởi động về chủ đề quen thuộc.' },
        { name: 'Quiz Lý thuyết Speaking Part 2', path: '/ielts-part2-theory', icon: <QuestionMarkCircleIcon/>, description: 'Học cách chuẩn bị và trình bày bài nói dài (long-turn) một cách hiệu quả.' },
        { name: 'Quiz Lý thuyết Writing Task 1', path: '/ielts-part1-writing-theory', icon: <PencilIcon/>, description: 'Nắm vững cách phân tích và mô tả các loại biểu đồ, bản đồ, và quy trình.' },
        { name: 'Quiz Lý thuyết Writing Task 2', path: '/ielts-part2-writing-theory', icon: <PencilIcon/>, description: 'Kiểm tra kiến thức về các dạng bài luận, cấu trúc, và chiến thuật cho Task 2.' },
        { name: 'Quiz Lý thuyết Writing Task 2 (Chuyên sâu)', path: '/ielts-part2-writing-advanced-theory', icon: <AcademicCapIcon/>, description: 'Kiểm tra kiến thức chuyên sâu về các dạng bài luận, cấu trúc phức tạp, và chiến thuật đạt điểm cao.' },
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
                       <IELTSIcon className="w-12 h-12 text-violet-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">IELTS Test</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">Chọn một kỹ năng để bắt đầu luyện tập và kiểm tra kiến thức chiến thuật.</p>
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
export default IeltsHubPage;