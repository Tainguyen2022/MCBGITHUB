import { ToeicTask } from '../../types';

type ToeicPart3TaskDefinition = Omit<ToeicTask, 'sampleAnswer_en' | 'sampleAnswer_vi' | 'outline_en' | 'outline_vi' | 'vocabulary' | 'imageSeed'>;

export const toeicPart3Tasks: ToeicPart3TaskDefinition[] = [
    {
        id: 't-spk-q5-7-1',
        title: 'Trả lời: Về việc đi du lịch',
        prompt: 'Imagine that a marketing firm is doing research. You have agreed to participate in a telephone interview about travel.\n\nQ5: How often do you travel for work or leisure? (15s)\nQ6: What is your favorite type of destination? (15s)\nQ7: Do you prefer to travel alone or with a group? Why? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-2',
        title: 'Trả lời: Về việc mua sắm',
        prompt: 'You will participate in an interview about shopping habits.\n\nQ5: Do you prefer shopping online or in physical stores? (15s)\nQ6: How much time do you typically spend shopping each week? (15s)\nQ7: What is more important to you when shopping: price or quality? Why? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-3',
        title: 'Trả lời: Về nơi làm việc',
        prompt: 'You have agreed to answer some questions about your ideal workplace.\n\nQ5: What is one important quality for a good manager to have? (15s)\nQ6: Do you prefer to work in a team or by yourself? (15s)\nQ7: Describe one aspect of a positive work environment. (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-4',
        title: 'Trả lời: Về công nghệ',
        prompt: 'A research company is conducting a survey about technology use.\n\nQ5: What piece of technology do you use most often? (15s)\nQ6: How has technology made your life easier? (15s)\nQ7: Do you think people are too dependent on technology nowadays? Why? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-5',
        title: 'Trả lời: Về ăn uống ngoài',
        prompt: 'You will answer some questions about eating at restaurants.\n\nQ5: How often do you eat out? (15s)\nQ6: What kind of food do you enjoy the most? (15s)\nQ7: What factors are important to you when choosing a restaurant? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-6',
        title: 'Trả lời: Về giao thông công cộng',
        prompt: 'You have agreed to an interview about public transportation.\n\nQ5: Do you ever use public transportation? (15s)\nQ6: What is the most common form of public transport in your city? (15s)\nQ7: What could be done to improve public transportation in your area? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-7',
        title: 'Trả lời: Về việc tập thể dục',
        prompt: 'A health magazine is conducting a survey about exercise habits.\n\nQ5: How important is it to exercise regularly? (15s)\nQ6: What kind of physical activities do you enjoy? (15s)\nQ7: What makes it difficult for people to find time to exercise? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-8',
        title: 'Trả lời: Về việc học ngôn ngữ',
        prompt: 'You will participate in an interview about learning new languages.\n\nQ5: Besides English, what language would you like to learn? (15s)\nQ6: What is the most difficult part of learning a new language? (15s)\nQ7: Do you think it is better to learn a language in a classroom or by traveling? Why? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-9',
        title: 'Trả lời: Về phim ảnh',
        prompt: 'You have agreed to answer questions for a survey about movies.\n\nQ5: What is your favorite movie genre? (15s)\nQ6: Do you prefer watching movies at home or at the cinema? (15s)\nQ7: What makes a movie successful in your opinion? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-10',
        title: 'Trả lời: Về việc đọc sách',
        prompt: 'A market research firm is conducting a survey about reading habits.\n\nQ5: How often do you read books? (15s)\nQ6: What kind of books do you usually read? (15s)\nQ7: Do you think e-books will completely replace printed books in the future? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-11',
        title: 'Trả lời: Về nhà cửa',
        prompt: 'You will answer some questions for a survey about housing.\n\nQ5: Do you live in a house or an apartment? (15s)\nQ6: What is your favorite room in your home? (15s)\nQ7: What is one thing you would like to change about your home? Why? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-12',
        title: 'Trả lời: Về tin tức',
        prompt: 'A media company is interviewing people about how they get their news.\n\nQ5: How do you usually stay informed about current events? (15s)\nQ6: Do you prefer to read the news online or in a newspaper? (15s)\nQ7: Why is it important to follow the news? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-13',
        title: 'Trả lời: Về âm nhạc',
        prompt: 'You have agreed to an interview about your music preferences.\n\nQ5: What type of music do you listen to most often? (15s)\nQ6: Do you ever attend live music concerts? (15s)\nQ7: How does music affect your mood? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-14',
        title: 'Trả lời: Về bạn bè',
        prompt: 'You will participate in a survey about friendship.\n\nQ5: How often do you see your friends? (15s)\nQ6: What do you usually do when you get together with your friends? (15s)\nQ7: What is the most important quality you look for in a friend? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-15',
        title: 'Trả lời: Về công việc tình nguyện',
        prompt: 'A non-profit organization is conducting a survey about volunteering.\n\nQ5: Have you ever done any volunteer work? (15s)\nQ6: What kind of volunteer work would you be interested in doing? (15s)\nQ7: Why do you think it is important for people to volunteer in their community? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-16',
        title: 'Trả lời: Về quảng cáo',
        prompt: 'You will answer some questions for a marketing survey about advertising.\n\nQ5: Where do you see advertisements most often? (15s)\nQ6: Do advertisements influence your decision to buy a product? (15s)\nQ7: What is your opinion on advertisements that target children? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-17',
        title: 'Trả lời: Về môi trường',
        prompt: 'A research institute is interviewing people about environmental issues.\n\nQ5: What is one thing you do to help protect the environment? (15s)\nQ6: What do you think is the biggest environmental problem in your country? (15s)\nQ7: Who do you think is more responsible for protecting the environment: individuals or the government? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-18',
        title: 'Trả lời: Về các kỳ nghỉ',
        prompt: 'You will participate in an interview about holidays and vacations.\n\nQ5: What is your favorite holiday of the year? (15s)\nQ6: How do you usually spend your holidays? (15s)\nQ7: Do you prefer a relaxing beach vacation or an adventurous trip to the mountains? Why? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-19',
        title: 'Trả lời: Về điện thoại di động',
        prompt: 'A technology company is conducting a survey about mobile phones.\n\nQ5: How many hours a day do you use your smartphone? (15s)\nQ6: What is the most useful feature on your phone? (15s)\nQ7: What are some disadvantages of everyone having a smartphone? (30s)',
        prepTime: 3,
        speakTime: 60
    },
    {
        id: 't-spk-q5-7-20',
        title: 'Trả lời: Về kế hoạch nghề nghiệp',
        prompt: 'You have agreed to an interview about career planning.\n\nQ5: What was your first job? (15s)\nQ6: What kind of work do you find most rewarding? (15s)\nQ7: What is more important in a job: a high salary or job satisfaction? Why? (30s)',
        prepTime: 3,
        speakTime: 60
    }
];