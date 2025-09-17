import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    TOEICIcon, IELTSIcon, VSTEPIcon, StarIcon, MoverIcon, FlyerIcon, ChevronRightIcon
} from '../components/Icons';

type ExamType = 'TOEIC' | 'VSTEP' | 'IELTS' | 'STARTERS' | 'MOVERS' | 'FLYERS' | null;

const ExamPracticePage: React.FC = () => {
    const navigate = useNavigate();

    const exams = [
        { id: 'STARTERS' as const, name: 'STARTERS CAMBRIDGE', icon: <StarIcon />, iconBgColor: 'var(--theme-starters-start)', decorationColor: 'var(--theme-starters-start)' },
        { id: 'MOVERS' as const, name: 'MOVERS CAMBRIDGE', icon: <MoverIcon />, iconBgColor: 'var(--theme-movers-start)', decorationColor: 'var(--theme-movers-start)'},
        { id: 'FLYERS' as const, name: 'FLYERS CAMBRIDGE', icon: <FlyerIcon />, iconBgColor: 'var(--theme-flyers-start)', decorationColor: 'var(--theme-flyers-start)' },
        { id: 'TOEIC' as const, name: 'TOEIC', icon: <TOEICIcon />, iconBgColor: 'var(--theme-toeic-start)', decorationColor: 'var(--theme-toeic-start)' },
        { id: 'VSTEP' as const, name: 'VSTEP', icon: <VSTEPIcon />, iconBgColor: 'var(--theme-vstep-start)', decorationColor: 'var(--theme-vstep-start)' },
        { id: 'IELTS' as const, name: 'IELTS', icon: <IELTSIcon />, iconBgColor: 'var(--theme-ielts-start)', decorationColor: 'var(--theme-ielts-start)' },
    ];
    
    const handleExamClick = (examId: ExamType) => {
        if (!examId) return;
        
        let path = '';
        if (examId === 'TOEIC') path = '/toeic-hub';
        else if (examId === 'IELTS') path = '/ielts-hub';
        else if (examId === 'VSTEP') path = '/vstep-hub';
        else if (['STARTERS', 'MOVERS', 'FLYERS'].includes(examId)) {
            path = `/cambridge-hub/${examId.toLowerCase()}`;
        }
        
        if (path) {
            navigate(path);
        }
    };

    return (
        <div className="bg-slate-50 pt-20 pb-20 px-4 md:px-8 min-h-screen">
             <div className="max-w-7xl mx-auto">
                <section>
                     <header className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
                            Test
                        </h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-600">
                            Chọn một kỳ thi để bắt đầu luyện tập các kỹ năng chuyên sâu và làm đề thi thử.
                        </p>
                    </header>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                        {exams.map((exam) => (
                            <div 
                                key={exam.id} 
                                onClick={() => handleExamClick(exam.id)}
                                className="exam-skill-card group"
                            >
                                <div className="exam-skill-card-decoration" style={{ backgroundColor: exam.decorationColor }}></div>
                                <div className="relative z-10 flex flex-col items-center h-full">
                                    <div className="exam-skill-card-icon-wrapper" style={{ backgroundColor: exam.iconBgColor }}>
                                        {exam.icon}
                                    </div>
                                    <h3 className="exam-skill-card-title">{exam.name}</h3>
                                    <div className="exam-skill-card-link">
                                        CHỌN BÀI THI <ChevronRightIcon className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ExamPracticePage;