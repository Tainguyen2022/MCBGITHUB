import { VstepTask } from '../../types';

type VstepPart2TaskDefinition = Omit<VstepTask, 'sampleAnswer_en' | 'sampleAnswer_vi' | 'outline_en' | 'outline_vi' | 'vocabulary' | 'imageSeed'>;

export const vstepPart2Tasks: VstepPart2TaskDefinition[] = [
    {
        id: 'v-p2-1',
        title: 'Tình huống 1: Câu lạc bộ Tiếng Anh',
        prompt: 'A new English club is being established at your university. The club wants to attract more members. There are three suggestions:\n1. Organize a music show with English songs.\n2. Hold a public speaking contest in English.\n3. Offer free coffee and snacks at every meeting.\nWhich solution do you think is the best? Why?',
        prepTime: 60,
        speakTime: 120,
    },
    {
        id: 'v-p2-2',
        title: 'Tình huống 2: Cải thiện sức khỏe',
        prompt: 'Your friend wants to improve their physical health but doesn\'t have much time. There are three suggestions:\n1. Wake up 30 minutes earlier to exercise.\n2. Join a gym near their workplace.\n3. Cycle to work instead of taking the bus.\nWhich do you think is the best suggestion for your friend?',
        prepTime: 60,
        speakTime: 120
    },
     {
        id: 'v-p2-3',
        title: 'Tình huống 3: Quà tặng sinh nhật',
        prompt: 'You want to buy a birthday gift for a close friend. There are three options:\n1. A book by their favorite author.\n2. A ticket to a concert.\n3. A handmade photo album.\nWhich option would you choose and why?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-4',
        title: 'Tình huống 4: Quản lý căng thẳng',
        prompt: 'Your classmate is feeling very stressed because of the upcoming exams. There are three suggestions to help them relax:\n1. Practice meditation or mindfulness exercises.\n2. Take short breaks to do a fun activity like watching a movie.\n3. Create a detailed study schedule to feel more in control.\nWhich solution do you think is most effective?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-5',
        title: 'Tình huống 5: Gây quỹ từ thiện',
        prompt: 'Your class wants to raise money for a local charity. There are three fundraising ideas:\n1. Organize a bake sale on campus.\n2. Host a charity concert featuring student bands.\n3. Create a crowdfunding campaign online.\nWhich idea do you think would raise the most money?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-6',
        title: 'Tình huống 6: Cải thiện kỹ năng thuyết trình',
        prompt: 'You need to improve your presentation skills for a class project. There are three ways to do this:\n1. Join the university\'s public speaking club.\n2. Practice recording yourself and watching it back.\n3. Ask a professor or mentor for feedback.\nWhich method would you choose?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-7',
        title: 'Tình huống 7: Giảm rác thải nhựa',
        prompt: 'Your university cafeteria produces a lot of plastic waste. There are three suggestions to reduce it:\n1. Offer a discount to students who bring their own reusable cups.\n2. Replace plastic cutlery with metal or biodegradable ones.\n3. Start an awareness campaign about the harm of plastic waste.\nWhich suggestion do you think is the best to start with?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-8',
        title: 'Tình huống 8: Lựa chọn điểm đến du lịch',
        prompt: 'You and your friends are planning a short holiday. You have three destination options:\n1. A relaxing trip to the beach.\n2. A hiking trip in the mountains.\n3. A cultural tour of a historic city.\nWhich option would you prefer and why?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-9',
        title: 'Tình huống 9: Tiết kiệm tiền',
        prompt: 'Your friend wants to save money but finds it difficult. Here are three pieces of advice:\n1. Cook meals at home instead of eating out.\n2. Track all expenses using a budgeting app.\n3. Set up an automatic monthly transfer to a savings account.\nWhich piece of advice is the most helpful?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-10',
        title: 'Tình huống 10: Học một kỹ năng mới',
        prompt: 'You want to learn a new skill in your free time. You are considering three options:\n1. Learning to play a musical instrument like the guitar.\n2. Learning a new language online.\n3. Taking a coding course to build websites.\nWhich skill would you choose to learn?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-11',
        title: 'Tình huống 11: Trang trí phòng ký túc xá',
        prompt: 'Your dorm room looks boring and you want to decorate it on a small budget. There are three ideas:\n1. Buy some plants and posters.\n2. Rearrange the furniture and add some new lighting.\n3. Do a DIY project to create some unique decorations.\nWhich idea would you choose?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-12',
        title: 'Tình huống 12: Xung đột trong nhóm',
        prompt: 'There is a conflict in your project group because two members disagree on the main idea. What should the group leader do?\n1. Have a group meeting to let everyone voice their opinion.\n2. Make a final decision as the leader.\n3. Ask a professor to mediate the conflict.\nWhich is the best solution?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-13',
        title: 'Tình huống 13: Cải thiện thư viện',
        prompt: 'The university library is often too crowded and noisy during exam periods. Three solutions are proposed:\n1. Designate more "silent study" zones.\n2. Extend the library\'s opening hours.\n3. Create an online booking system for study spaces.\nWhich solution do you think is the most practical?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-14',
        title: 'Tình huống 14: Lựa chọn phương tiện đi lại',
        prompt: 'You need to choose a mode of transport for your daily commute to university. There are three options:\n1. A public bus.\n2. A bicycle.\n3. A motorbike.\nWhich option would you choose, considering factors like cost, time, and safety?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-15',
        title: 'Tình huống 15: Hoạt động cuối tuần',
        prompt: 'You have a free weekend and want to do something relaxing. There are three ideas:\n1. Stay at home and watch movies.\n2. Go for a long walk in a nearby park.\n3. Visit a local museum or art gallery.\nWhich activity would you prefer?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-16',
        title: 'Tình huống 16: Giúp đỡ người bạn bị ốm',
        prompt: 'Your classmate has been sick and missed a week of classes. How can you help them catch up?\n1. Share your class notes with them.\n2. Offer to study together and explain the difficult topics.\n3. Inform the professors about their situation.\nWhich is the most helpful action?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-17',
        title: 'Tình huống 17: Chọn công việc bán thời gian',
        prompt: 'You are looking for a part-time job as a student. There are three positions available:\n1. A waiter at a busy restaurant.\n2. A tutor for a high school student.\n3. A clerk at the university bookstore.\nWhich job would you choose?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-18',
        title: 'Tình huống 18: Lựa chọn chủ đề nghiên cứu',
        prompt: 'You have to choose a topic for your final year research paper. There are three options:\n1. A topic you are very passionate about but is very difficult.\n2. A topic that is easy to research but you find a bit boring.\n3. A topic suggested by your professor that is relevant to current events.\nWhich option would you select?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-19',
        title: 'Tình huống 19: Giải quyết vấn đề mạng Wifi',
        prompt: 'The Wi-Fi in your shared apartment is very slow and unreliable. What should you and your roommates do?\n1. Upgrade to a more expensive, higher-speed internet plan.\n2. Buy a new, more powerful Wi-Fi router.\n3. Contact the internet provider to complain and ask for a technician.\nWhich is the best first step?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-20',
        title: 'Tình huống 20: Lên kế hoạch cho chuyến đi dã ngoại',
        prompt: 'Your class is planning a day trip. To make it successful, three things are suggested:\n1. Carefully plan the transportation and schedule.\n2. Prepare fun team-building games and activities.\n3. Choose a destination with beautiful scenery and good facilities.\nWhich do you think is the most important element for a successful trip?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-21',
        title: 'Tình huống 21: Thúc đẩy tái chế',
        prompt: 'Your neighborhood wants to encourage more people to recycle. There are three ideas:\n1. Place more recycling bins in public areas.\n2. Organize a workshop to teach people how to sort waste correctly.\n3. Start a competition between streets with a prize for the one that recycles the most.\nWhich idea do you think would be most effective?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-22',
        title: 'Tình huống 22: Chuẩn bị cho buổi phỏng vấn',
        prompt: 'Your friend has an important job interview tomorrow. What is the best advice you can give them?\n1. Research the company and prepare some questions to ask.\n2. Choose a professional outfit and get a good night\'s sleep.\n3. Practice answering common interview questions with a friend.\nWhich piece of advice is the most crucial?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-23',
        title: 'Tình huống 23: Đối phó với hàng xóm ồn ào',
        prompt: 'Your next-door neighbors often play loud music late at night, which disturbs your sleep. What is the best way to handle this situation?\n1. Talk to them politely and explain the problem.\n2. Report the issue to the building manager or landlord.\n3. Buy some good quality earplugs.\nWhich approach would you try first?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-24',
        title: 'Tình huống 24: Cải thiện chất lượng không khí',
        prompt: 'Air pollution is a growing concern in your city. Three solutions are being discussed:\n1. Encourage more people to use public transport by making it cheaper.\n2. Plant more trees and create more green spaces in the city.\n3. Impose stricter regulations on factory emissions.\nWhich solution do you think would have the biggest impact?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-25',
        title: 'Tình huống 25: Lựa chọn khóa học online',
        prompt: 'You want to take an online course to improve your skills. When choosing a course, what is the most important factor?\n1. The reputation and qualifications of the instructor.\n2. The cost of the course.\n3. The flexibility of the study schedule.\nWhich factor is most important to you?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-26',
        title: 'Tình huống 26: Tổ chức sự kiện chào mừng',
        prompt: 'Your department is organizing a welcome event for new students. What would be the best activity?\n1. A formal dinner with speeches from professors.\n2. A casual BBQ party with games and music.\n3. A campus tour followed by a Q&A session with senior students.\nWhich activity would be most helpful and enjoyable for new students?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-27',
        title: 'Tình huống 27: Đối phó với thông tin sai lệch',
        prompt: 'There is a lot of fake news and misinformation online. What is the best way for people to protect themselves?\n1. Only get news from well-known and reputable news organizations.\n2. Check multiple sources before believing a piece of information.\n3. Learn critical thinking skills to identify biased or false content.\nWhich is the most reliable strategy?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-28',
        title: 'Tình huống 28: Cải thiện an toàn giao thông',
        prompt: 'The number of traffic accidents in your city is increasing. What is the best way to improve road safety?\n1. Implement stricter penalties for traffic violations.\n2. Launch a public awareness campaign about safe driving.\n3. Improve the quality of roads and traffic signs.\nWhich solution should be prioritized?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-29',
        title: 'Tình huống 29: Chọn một hoạt động tình nguyện',
        prompt: 'You have decided to do some volunteer work. There are three opportunities:\n1. Helping at a local animal shelter.\n2. Tutoring disadvantaged children in your community.\n3. Participating in a project to clean up a local park.\nWhich volunteer activity would you choose and why?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-30',
        title: 'Tình huống 30: Giữ gìn văn hóa truyền thống',
        prompt: 'Many young people are losing interest in traditional culture. What is the best way to preserve it?\n1. Teach traditional arts and history as a compulsory subject in schools.\n2. Organize more modern and engaging cultural festivals.\n3. Use social media to promote traditional culture in a creative way.\nWhich method do you think would be most effective?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-31',
        title: 'Tình huống 31: Mất đồ vật giá trị',
        prompt: 'Your friend lost their wallet on a public bus. What should they do first?\n1. Immediately cancel all their credit and bank cards.\n2. Go back to the bus station to check their lost and found department.\n3. Report the loss to the local police.\nWhat is the most urgent action to take?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-32',
        title: 'Tình huống 32: Khuyến khích đọc sách',
        prompt: 'A local library wants to encourage more young adults to read books. There are three ideas:\n1. Create a modern, comfortable reading cafe inside the library.\n2. Start a book club that focuses on popular modern novels and movies.\n3. Host events with famous authors and book bloggers.\nWhich idea would be the most appealing?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-33',
        title: 'Tình huống 33: Chọn vật nuôi',
        prompt: 'Your family has decided to get a pet. There are three options:\n1. A dog, which needs a lot of attention and walks.\n2. A cat, which is more independent.\n3. A small pet like a hamster or a fish, which is easy to care for.\nWhich pet would be best for a busy family?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-34',
        title: 'Tình huống 34: Lên kế hoạch cho buổi họp nhóm',
        prompt: 'Your study group needs to meet to discuss a project. To make the meeting productive, what is the most important thing to do?\n1. Set a clear agenda and objective for the meeting beforehand.\n2. Choose a quiet location with no distractions.\n3. Assign a timekeeper to make sure the meeting does not go too long.\nWhich factor is most crucial for a productive meeting?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-35',
        title: 'Tình huống 35: Giảm căng thẳng tại nơi làm việc',
        prompt: 'The employees at a company are reporting high levels of stress. The company wants to help. There are three proposals:\n1. Offer free gym memberships to all employees.\n2. Organize workshops on time management and stress reduction.\n3. Introduce more flexible working hours.\nWhich solution do you think would be the most beneficial?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-36',
        title: 'Tình huống 36: Lựa chọn một bộ phim',
        prompt: 'You and your friends want to watch a movie tonight. There are three options playing at the cinema:\n1. A new action-packed superhero movie.\n2. A romantic comedy.\n3. A scary horror film.\nWhich type of film would you choose for a group of friends and why?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-37',
        title: 'Tình huống 37: Bảo vệ dữ liệu cá nhân',
        prompt: 'Protecting personal data online is very important. What is the best way for an individual to do this?\n1. Use strong, unique passwords for different websites.\n2. Be careful about sharing personal information on social media.\n3. Regularly update the software on their devices.\nWhich is the most important habit to develop?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-38',
        title: 'Tình huống 38: Chi tiêu cho kỳ nghỉ',
        prompt: 'You are planning a one-week holiday on a limited budget. What is the best way to save money?\n1. Travel during the off-season when prices are lower.\n2. Stay in hostels or budget guesthouses instead of hotels.\n3. Cook some of your own meals instead of eating out for every meal.\nWhich strategy would save the most money?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-39',
        title: 'Tình huống 39: Cải thiện khu phố',
        prompt: 'Residents want to improve their neighborhood. There are three suggestions:\n1. Organize a community event to clean up the local park.\n2. Start a neighborhood watch program to improve safety.\n3. Create a community garden where people can grow vegetables.\nWhich project would bring the most benefit to the community?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-40',
        title: 'Tình huống 40: Chọn một nhà hàng',
        prompt: 'You are choosing a restaurant for a special celebration dinner. What is the most important factor to consider?\n1. The quality and taste of the food.\n2. The ambiance and atmosphere of the restaurant.\n3. The price and value for money.\nWhich factor would you prioritize?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-41',
        title: 'Tình huống 41: Khắc phục sự trì hoãn',
        prompt: 'Your friend often procrastinates and leaves their assignments until the last minute. What advice would you give them?\n1. Break down large tasks into smaller, more manageable steps.\n2. Use a planner to schedule specific times for studying.\n3. Find a study partner to hold them accountable.\nWhich method is most effective for overcoming procrastination?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-42',
        title: 'Tình huống 42: Lựa chọn một ngôn ngữ để học',
        prompt: 'You have decided to learn a new language. There are three choices:\n1. Spanish, which is spoken by many people worldwide.\n2. Japanese, because you are interested in the culture.\n3. German, which could be useful for your future career in engineering.\nWhich language would you choose to learn and why?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-43',
        title: 'Tình huống 43: Khuyến khích du lịch bền vững',
        prompt: 'A local tourism board wants to promote sustainable tourism. What is the best way to do this?\n1. Encourage tourists to support local businesses and artisans.\n2. Create more eco-friendly tours, such as hiking and cycling.\n3. Launch a campaign to educate tourists on how to reduce their environmental impact.\nWhich approach do you think is most important?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-44',
        title: 'Tình huống 44: Giải quyết hiểu lầm',
        prompt: 'You had a misunderstanding with a friend and they are now upset with you. What is the best way to resolve the situation?\n1. Give them some space and wait for them to cool down.\n2. Send them a text message to apologize and explain your side.\n3. Ask to meet them in person to talk things through and listen to their feelings.\nWhich is the best approach?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-45',
        title: 'Tình huống 45: Tiết kiệm năng lượng',
        prompt: 'Your family wants to reduce its electricity consumption at home. There are three suggestions:\n1. Replace all old light bulbs with energy-efficient LED bulbs.\n2. Unplug electronic devices when they are not in use.\n3. Use air conditioning less and use fans instead.\nWhich change would have the biggest impact on the electricity bill?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-46',
        title: 'Tình huống 46: Chọn nơi ở',
        prompt: 'You are moving to a new city for a job. When choosing a place to live, what is the most important consideration?\n1. Proximity to your workplace to have a short commute.\n2. The safety and atmosphere of the neighborhood.\n3. The cost of the rent.\nWhich factor would be your top priority?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-47',
        title: 'Tình huống 47: Khuyến khích sáng tạo',
        prompt: 'A teacher wants to encourage more creativity in her students. What is the best method?\n1. Assign more open-ended projects with fewer rules.\n2. Dedicate class time for brainstorming and creative thinking exercises.\n3. Create a classroom environment where students are not afraid to make mistakes.\nWhich method do you think is most effective?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-48',
        title: 'Tình huống 48: Cân bằng giữa học và làm',
        prompt: 'A student is struggling to balance their part-time job with their university studies. What is the best advice for them?\n1. Create a strict weekly schedule that allocates time for both.\n2. Talk to their employer about the possibility of more flexible hours.\n3. Consider reducing their work hours, even if it means earning less money.\nWhich option should they consider first?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-49',
        title: 'Tình huống 49: Quyết định nghề nghiệp',
        prompt: 'Your friend is unsure what career to pursue after graduation. What is the best course of action?\n1. Do an internship in a field they are interested in.\n2. Talk to a career counselor at the university.\n3. Interview people who are working in different professions.\nWhich would be the most helpful step?',
        prepTime: 60,
        speakTime: 120
    },
    {
        id: 'v-p2-50',
        title: 'Tình huống 50: Tổ chức một chuyến đi cho lớp',
        prompt: 'Your university class is planning a graduation trip. To ensure everyone has a good time, what is the most important thing?\n1. Choose a destination that offers a variety of activities to suit different interests.\n2. Create a detailed itinerary but also allow for some free time.\n3. Establish a clear budget that everyone is comfortable with.\nWhich factor is the most crucial for a successful group trip?',
        prepTime: 60,
        speakTime: 120
    }
];