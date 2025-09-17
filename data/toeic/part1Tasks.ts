import { ToeicTask } from '../../types';

type ToeicPart1TaskDefinition = Omit<ToeicTask, 'sampleAnswer_en' | 'sampleAnswer_vi' | 'outline_en' | 'outline_vi' | 'vocabulary' | 'imageSeed'>;

export const toeicPart1Tasks: ToeicPart1TaskDefinition[] = [
    {
        id: 't-spk-q1-1',
        title: 'Đọc: Thông báo Lịch trình',
        prompt: 'Welcome to the annual Tech Innovators Conference! This year, we are excited to host over fifty speakers from around the world. Please remember that all sessions will be recorded and made available online next week. We kindly ask you to silence your mobile phones before each presentation begins. Enjoy the conference!',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-2',
        title: 'Đọc: Tin nhắn thoại',
        prompt: 'Hi, this is a message for Mr. Peterson. I\'m calling to confirm your dental appointment for this Friday at 3 P.M. If you need to reschedule, please call our office at least twenty-four hours in advance. We look forward to seeing you then. Thank you.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-3',
        title: 'Đọc: Báo cáo thời tiết',
        prompt: 'Here is the weather forecast for Saturday. It will be a sunny morning with clear skies, but expect clouds to roll in during the afternoon. There is a sixty percent chance of rain in the evening, so please bring an umbrella if you are heading out. Temperatures will be mild, ranging from 22 to 28 degrees Celsius.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-4',
        title: 'Đọc: Quảng cáo trên radio',
        prompt: 'Are you looking for a new car? Come down to Express Auto this weekend for our biggest sale of the year! We are offering zero percent financing on all new models. Our friendly and knowledgeable staff will be happy to assist you in finding the perfect vehicle to fit your needs. Don\'t miss this limited-time offer!',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-5',
        title: 'Đọc: Thông báo tại bảo tàng',
        prompt: 'Attention visitors. The museum will be closing in thirty minutes. We invite you to visit our gift shop on the ground floor on your way out. Please remember that photography is not permitted in the special exhibitions gallery. We hope you enjoyed your visit and look forward to seeing you again soon.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-6',
        title: 'Đọc: Hướng dẫn tour du lịch',
        prompt: 'Good morning, everyone, and welcome to the city bus tour. We will be driving past some of the city\'s most famous landmarks, including the Central Tower and the historic waterfront. This tour will last approximately two hours. Please remain seated while the bus is in motion. Feel free to ask any questions you may have.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-7',
        title: 'Đọc: Thông báo nội bộ công ty',
        prompt: 'This is a reminder to all employees that the deadline to submit your quarterly performance reviews is this Friday. Please complete the online form and send it to your department manager for approval. Your participation is mandatory and essential for our planning process. Thank you for your cooperation.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-8',
        title: 'Đọc: Hướng dẫn sản phẩm',
        prompt: 'Thank you for purchasing the new QuickBrew coffee maker. To begin, please fill the water reservoir with fresh, cold water. Next, place a coffee filter in the basket and add your desired amount of ground coffee. Finally, press the "start" button to begin brewing. For more detailed instructions, please consult the user manual.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-9',
        title: 'Đọc: Giới thiệu diễn giả',
        prompt: 'It is my great pleasure to introduce our next speaker, Dr. Eleanor Vance. Dr. Vance is a leading expert in the field of renewable energy and has published numerous papers on solar technology. Today, she will be sharing her insights on the future of sustainable power. Please join me in giving her a warm welcome.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-10',
        title: 'Đọc: Thông báo chuyến bay',
        prompt: 'This is the final boarding call for flight BA249 to London. Will all remaining passengers please proceed immediately to gate 15. Please have your boarding pass and passport ready for inspection. The gate will be closing in approximately ten minutes. We wish you a pleasant flight.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-11',
        title: 'Đọc: Giới thiệu chương trình truyền hình',
        prompt: 'Coming up next on Channel 5, we have a fascinating documentary about wildlife in the Amazon rainforest. Join our host as he explores the diverse ecosystems and discovers the incredible creatures that live there. This is a program the whole family can enjoy, so stay tuned for an adventure you won\'t forget.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-12',
        title: 'Đọc: Thông tin thư viện',
        prompt: 'The City Library is pleased to announce its annual summer reading program for children. This program encourages kids to discover the joy of reading through fun activities and weekly prize drawings. Registration is now open and can be completed online or at the main circulation desk. The program begins on June first.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-13',
        title: 'Đọc: Tin nhắn thoại từ công ty',
        prompt: 'Hello, this is a message from City Electric. We are calling to inform you of a planned power outage in your area on Wednesday between 10 AM and 2 PM for system maintenance. We apologize for any inconvenience this may cause and appreciate your understanding as we work to improve our services.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-14',
        title: 'Đọc: Báo cáo giao thông',
        prompt: 'Here is your morning traffic report. A minor accident on the Central Expressway is causing significant delays for commuters heading into the city. Drivers are advised to use the Bridge Street exit as an alternate route. Elsewhere, traffic is moving smoothly with no major incidents to report at this time.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-15',
        title: 'Đọc: Thông báo tại cửa hàng',
        prompt: 'Attention, shoppers. For the next hour, we are offering a special discount on all fresh produce. Take an additional twenty percent off all fruits and vegetables. Also, please be sure to visit our bakery department for a free sample of our delicious new whole wheat bread. Thank you for shopping with us.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-16',
        title: 'Đọc: Giới thiệu hội thảo',
        prompt: 'Welcome to our workshop on effective public speaking. Today, we will cover three key areas: how to structure a compelling presentation, techniques for managing nervousness, and tips for engaging your audience. We encourage active participation, so please feel free to ask questions at any point during the session.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-17',
        title: 'Đọc: Báo cáo tin tức',
        prompt: 'In international news, the leaders of several nations gathered today for a summit on global economic policy. The primary topic of discussion was the reduction of trade barriers between member countries. An official statement outlining the results of the meeting is expected to be released later this evening.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-18',
        title: 'Đọc: Thông báo tại nhà hàng',
        prompt: 'Good evening and welcome to The Waterfront Bistro. We would like to inform our guests that our kitchen will be closing in 15 minutes. Please place any final food orders with your server at this time. Our bar will remain open for another hour. We appreciate your patronage and hope you are enjoying your meal.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-19',
        title: 'Đọc: Hướng dẫn an toàn',
        prompt: 'Before we begin our factory tour, I need to remind everyone of our safety procedures. Hard hats must be worn at all times in the production area. Please stay within the designated walkways and do not touch any machinery. Your guide will be available to answer any questions you have. Please follow me.',
        prepTime: 45,
        speakTime: 45
    },
    {
        id: 't-spk-q1-20',
        title: 'Đọc: Cập nhật dự án',
        prompt: 'This is a quick update on the Franklin Bridge renovation project. Construction is proceeding on schedule, and we expect the bridge to reopen to traffic by the end of next month. We understand that the closure has been an inconvenience and we want to thank the public for their continued patience and cooperation.',
        prepTime: 45,
        speakTime: 45
    }
];