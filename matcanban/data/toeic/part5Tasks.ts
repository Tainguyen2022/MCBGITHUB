import { ToeicTask } from '../../types';

type ToeicPart5TaskDefinition = Omit<ToeicTask, 'sampleAnswer_en' | 'sampleAnswer_vi' | 'outline_en' | 'outline_vi' | 'vocabulary' | 'imageSeed'>;

export const toeicPart5Tasks: ToeicPart5TaskDefinition[] = [
     { 
        id: 't-spk-q11-1', 
        title: 'Quan điểm: Mua sắm trực tuyến', 
        prompt: 'Do you think online shopping will eventually replace traditional physical stores? Why or why not? Give specific reasons and examples to support your opinion.', 
        prepTime: 45, 
        speakTime: 60
     },
     { id: 't-spk-q11-2', title: 'Quan điểm: Làm việc tại nhà', prompt: 'What are the advantages and disadvantages of working from home? Provide specific details in your response.', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-3', title: 'Quan điểm: Du lịch', prompt: 'Some people prefer to travel to foreign countries, while others prefer to travel within their own country. Which do you prefer and why?', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-4', title: 'Quan điểm: Mạng xã hội', prompt: 'Do you agree or disagree that social media has a mostly negative effect on society? Support your view with reasons.', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-5', title: 'Quan điểm: Đồng phục', prompt: 'Should students be required to wear uniforms at school? Explain your position.', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-6', title: 'Quan điểm: Giao thông công cộng', prompt: 'Do you believe that cities should invest more money in public transportation? Why or why not?', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-7', title: 'Quan điểm: Học trực tuyến', prompt: 'What are some of the benefits of online learning compared to traditional classroom learning? Provide specific examples.', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-8', title: 'Quan điểm: Môi trường làm việc', prompt: 'Is it more important to have a high salary or to have a job that you enjoy? Explain your choice.', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-9', title: 'Quan điểm: Công nghệ trong lớp học', prompt: 'Do you think technology like tablets and computers should be used more in classrooms? Support your opinion.', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-10', title: 'Quan điểm: Cuộc sống thành thị và nông thôn', prompt: 'Would you prefer to live in a big city or in the countryside? Explain your preference with specific reasons.', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-11', title: 'Quan điểm: Quảng cáo', prompt: 'Do you think advertising is generally a positive or negative force in society? Explain your reasoning.', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-12', title: 'Quan điểm: Làm việc nhóm', prompt: 'Is it better to work on projects in a team or to work alone? Explain your opinion.', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-13', title: 'Quan điểm: Du lịch một mình', prompt: 'What are the advantages of traveling alone? Provide specific examples to support your view.', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-14', title: 'Quan điểm: Ăn uống lành mạnh', prompt: 'Do you agree or disagree that it is the government\'s responsibility to encourage healthy eating habits? Why?', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-15', title: 'Quan điểm: Học ngoại ngữ', prompt: 'What is the most important reason for people to learn a foreign language? Explain your view.', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-16', title: 'Quan điểm: Công ty lớn và nhỏ', prompt: 'Is it better to work for a large company or a small company? Provide reasons to support your choice.', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-17', title: 'Quan điểm: Mua sắm tại cửa hàng địa phương', prompt: 'How important is it for people to support local businesses instead of large international corporations? Explain your opinion.', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-18', title: 'Quan điểm: Tin tức', prompt: 'Do you believe it is important for people to follow the news every day? Why or why not?', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-19', title: 'Quan điểm: Trí tuệ nhân tạo', prompt: 'Are you optimistic or pessimistic about the impact of artificial intelligence (AI) on future jobs? Explain your position.', prepTime: 45, speakTime: 60 },
     { id: 't-spk-q11-20', title: 'Quan điểm: Cân bằng công việc-cuộc sống', prompt: 'What is the best way to achieve a good work-life balance? Provide specific suggestions.', prepTime: 45, speakTime: 60 }
];