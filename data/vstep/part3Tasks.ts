import { VstepTask } from '../../types';

type VstepPart3TaskDefinition = Omit<VstepTask, 'sampleAnswer_en' | 'sampleAnswer_vi' | 'outline_en' | 'outline_vi' | 'vocabulary' | 'imageSeed'>;

export const vstepPart3Tasks: VstepPart3TaskDefinition[] = [
    {
        id: 'v-p3-1',
        title: 'Chủ đề 1: Lợi ích của việc đi du lịch',
        prompt: 'The benefits of traveling are presented below.\n\n- Broaden horizons\n- Reduce stress\n- Learn new skills\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Do you think traveling is a good form of education?\n- What are some of the negative impacts of tourism?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-2',
        title: 'Chủ đề 2: Tầm quan trọng của việc học trực tuyến',
        prompt: 'The topic of online learning is presented below.\n\n- Flexibility\n- Access to more courses\n- Develops self-discipline\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Do you think online learning will replace traditional classrooms?\n- What are the disadvantages of learning online?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-3',
        title: 'Chủ đề 3: Ảnh hưởng của mạng xã hội',
        prompt: 'The effects of social media are presented below.\n\n- Connect with people\n- Source of information\n- Can be addictive\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- How can people avoid the negative effects of social media?\n- Do you think social media is a reliable source of news?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-4',
        title: 'Chủ đề 4: Tầm quan trọng của việc tập thể dục',
        prompt: 'The importance of regular exercise is presented below.\n\n- Improves physical health\n- Boosts mental well-being\n- Increases energy levels\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- How can busy people make time for exercise?\n- Should governments do more to promote physical activity?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-5',
        title: 'Chủ đề 5: Ưu điểm của việc sống ở thành phố',
        prompt: 'The advantages of living in a big city are presented below.\n\n- More job opportunities\n- Better entertainment options\n- Cultural diversity\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What are the main disadvantages of city life?\n- How can cities be made better places to live?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-6',
        title: 'Chủ đề 6: Bảo vệ môi trường',
        prompt: 'The topic of protecting the environment is presented below.\n\n- Reduce, Reuse, Recycle\n- Save energy\n- Plant trees\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Who is more responsible for protecting the environment: individuals or governments?\n- What is the biggest environmental threat today?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-7',
        title: 'Chủ đề 7: Lợi ích của việc đọc sách',
        prompt: 'The benefits of reading books are presented below.\n\n- Gain knowledge\n- Improve vocabulary\n- Reduce stress\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Do you think e-books will replace printed books?\n- How can we encourage young people to read more?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-8',
        title: 'Chủ đề 8: Ảnh hưởng của công nghệ',
        prompt: 'The influence of technology on modern life is presented below.\n\n- Makes communication easier\n- Provides access to information\n- Can lead to a sedentary lifestyle\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Is technology making people more isolated?\n- What do you think will be the next major technological development?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-9',
        title: 'Chủ đề 9: Tầm quan trọng của gia đình',
        prompt: 'The importance of family is presented below.\n\n- Emotional support\n- Teaches values\n- Sense of belonging\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- How has the role of family changed over the years?\n- Is it better to grow up in a small or large family?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-10',
        title: 'Chủ đề 10: Tầm quan trọng của việc học ngoại ngữ',
        prompt: 'The importance of learning a foreign language is presented below.\n\n- Better job opportunities\n- Understand other cultures\n- Improves cognitive skills\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What is the most difficult part of learning a new language?\n- Should children be required to learn a second language at school?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-11',
        title: 'Chủ đề 11: Ưu điểm của làm việc nhóm',
        prompt: 'The advantages of teamwork are presented below.\n\n- Share ideas\n- Divide workload\n- Learn from others\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What are some challenges of working in a team?\n- Are leaders always necessary for a team to be successful?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-12',
        title: 'Chủ đề 12: Thói quen ăn uống lành mạnh',
        prompt: 'The topic of healthy eating habits is presented below.\n\n- Eat more fruits and vegetables\n- Drink plenty of water\n- Avoid processed foods\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Why do many people find it difficult to eat healthily?\n- What is the role of advertising in people\'s food choices?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-13',
        title: 'Chủ đề 13: Ảnh hưởng của quảng cáo',
        prompt: 'The effects of advertising are presented below.\n\n- Informs consumers\n- Creates desire for products\n- Can be misleading\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Do you think there should be more regulations on advertising?\n- How has online advertising changed the industry?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-14',
        title: 'Chủ đề 14: Tầm quan trọng của âm nhạc',
        prompt: 'The importance of music in our lives is presented below.\n\n- Reduces stress\n- Expresses culture\n- Brings people together\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- How have music listening habits changed with technology?\n- Should music be a compulsory subject in schools?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-15',
        title: 'Chủ đề 15: Lợi ích của việc có thú cưng',
        prompt: 'The benefits of having a pet are presented below.\n\n- Provides companionship\n- Teaches responsibility\n- Encourages physical activity\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What are some of the difficulties of owning a pet?\n- Do you think animals have rights?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-16',
        title: 'Chủ đề 16: Tầm quan trọng của giấc ngủ',
        prompt: 'The importance of getting enough sleep is presented below.\n\n- Improves concentration\n- Boosts immune system\n- Affects mood\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Why do some people suffer from sleep problems?\n- How can technology affect our sleep patterns?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-17',
        title: 'Chủ đề 17: Thay đổi khí hậu',
        prompt: 'The issue of climate change is presented below.\n\n- Rising global temperatures\n- Extreme weather events\n- Melting ice caps\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What are the main causes of climate change?\n- What can be done to solve this problem?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-18',
        title: 'Chủ đề 18: Lợi ích của việc làm tình nguyện',
        prompt: 'The benefits of volunteering are presented below.\n\n- Helps the community\n- Develops new skills\n- Provides a sense of purpose\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What kind of volunteer work is popular in your country?\n- Do you think people are born selfish or selfless?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-19',
        title: 'Chủ đề 19: Tầm quan trọng của thời trang',
        prompt: 'The topic of fashion is presented below.\n\n- Expresses personality\n- Creates social trends\n- Can be a form of art\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Do you think people spend too much money on clothes?\n- What are the negative impacts of the fast fashion industry?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-20',
        title: 'Chủ đề 20: Lợi ích của tiếng cười',
        prompt: 'The benefits of laughter are presented below.\n\n- Reduces stress\n- Strengthens relationships\n- Improves mood\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What kinds of things make you laugh?\n- Is it important to have a good sense of humor?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-21',
        title: 'Chủ đề 21: Cuộc sống ở nông thôn',
        prompt: 'The topic of living in the countryside is presented below.\n\n- Peaceful and quiet\n- Close to nature\n- Fewer job opportunities\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Why do some people prefer the countryside to the city?\n- What challenges do rural communities face?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-22',
        title: 'Chủ đề 22: Tầm quan trọng của lịch sử',
        prompt: 'The importance of learning history is presented below.\n\n- Understand the present\n- Learn from past mistakes\n- Shapes cultural identity\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What is the best way to learn about history?\n- Do you think history is always written by the victors?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-23',
        title: 'Chủ đề 23: Ảnh hưởng của toàn cầu hóa',
        prompt: 'The effects of globalization are presented below.\n\n- Increased trade\n- Cultural exchange\n- Loss of local traditions\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Has globalization been a positive or negative force overall?\n- How can local cultures be protected in a globalized world?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-24',
        title: 'Chủ đề 24: Vai trò của giáo dục đại học',
        prompt: 'The role of university education is presented below.\n\n- Prepares for a career\n- Develops critical thinking\n- Can be very expensive\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Do you think a university degree is necessary to be successful?\n- Should university education be free for everyone?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-25',
        title: 'Chủ đề 25: Tầm quan trọng của sự trung thực',
        prompt: 'The importance of honesty is presented below.\n\n- Builds trust\n- Essential for relationships\n- Can sometimes be difficult\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Is it ever okay to tell a "white lie"?\n- How can parents teach their children to be honest?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-26',
        title: 'Chủ đề 26: Lợi ích của giao thông công cộng',
        prompt: 'The benefits of public transportation are presented below.\n\n- Reduces traffic congestion\n- Better for the environment\n- Cost-effective for individuals\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What are the disadvantages of using public transport?\n- How can more people be encouraged to use it?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-27',
        title: 'Chủ đề 27: Ảnh hưởng của trò chơi điện tử',
        prompt: 'The effects of video games are presented below.\n\n- Improves problem-solving skills\n- Can be a form of social interaction\n- Can be addictive and time-consuming\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Do you think video games can be a form of art?\n- Should there be age restrictions on violent video games?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-28',
        title: 'Chủ đề 28: Tầm quan trọng của việc đặt mục tiêu',
        prompt: 'The importance of setting goals is presented below.\n\n- Provides direction\n- Increases motivation\n- Gives a sense of accomplishment\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Is it better to have one big goal or many small goals?\n- What can people do when they fail to achieve a goal?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-29',
        title: 'Chủ đề 29: Vai trò của các thư viện công cộng',
        prompt: 'The role of public libraries is presented below.\n\n- Provide free access to books\n- Offer community programs\n- Serve as quiet study spaces\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- How have libraries changed in the digital age?\n- Do you think governments should invest more in public libraries?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-30',
        title: 'Chủ đề 30: Ảnh hưởng của du lịch đến môi trường',
        prompt: 'The environmental impact of tourism is presented below.\n\n- Increased pollution\n- Damage to natural habitats\n- Puts pressure on local resources\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What is "eco-tourism"?\n- How can tourists travel more sustainably?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-31',
        title: 'Chủ đề 31: Lợi ích của việc dậy sớm',
        prompt: 'The benefits of waking up early are presented below.\n\n- More productive morning\n- Time for exercise\n- Quiet time for yourself\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Are you a "morning person" or a "night owl"?\n- Do you think the traditional 9-to-5 workday is suitable for everyone?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-32',
        title: 'Chủ đề 32: Tầm quan trọng của sự sáng tạo',
        prompt: 'The importance of creativity is presented below.\n\n- Drives innovation\n- Helps solve problems\n- Is a form of self-expression\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Can creativity be taught, or is it an innate talent?\n- What jobs require a high level of creativity?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-33',
        title: 'Chủ đề 33: Ảnh hưởng của thời tiết',
        prompt: 'The influence of weather on our lives is presented below.\n\n- Affects our mood\n- Influences our daily activities\n- Can impact the economy\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Do you prefer hot or cold climates?\n- How do extreme weather events affect communities?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-34',
        title: 'Chủ đề 34: Tầm quan trọng của sự kiên nhẫn',
        prompt: 'The importance of patience is presented below.\n\n- Helps make better decisions\n- Reduces stress\n- Is key to learning new skills\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- In what situations do you find it hardest to be patient?\n- Are people becoming less patient because of technology?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-35',
        title: 'Chủ đề 35: Lợi ích của việc làm vườn',
        prompt: 'The benefits of gardening are presented below.\n\n- Provides fresh food\n- Is a form of physical exercise\n- Connects people with nature\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Do you think every home should have a garden?\n- How can people in apartments do gardening?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-36',
        title: 'Chủ đề 36: Vai trò của bảo tàng',
        prompt: 'The role of museums in society is presented below.\n\n- Preserve history and culture\n- Educate the public\n- Inspire creativity\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What was the last museum you visited?\n- Do you think museums should be free to enter?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-37',
        title: 'Chủ đề 37: Lợi ích của việc nấu ăn tại nhà',
        prompt: 'The benefits of cooking at home are presented below.\n\n- Healthier meals\n- Saves money\n- Is a relaxing activity\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Why do many people prefer to eat out or order food?\n- Should cooking be taught in schools?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-38',
        title: 'Chủ đề 38: Tầm quan trọng của tình bạn',
        prompt: 'The importance of friendship is presented below.\n\n- Provides emotional support\n- Reduces loneliness\n- Makes life more fun\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- How has technology changed the way we make and maintain friends?\n- What is the difference between a good friend and an acquaintance?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-39',
        title: 'Chủ đề 39: Ảnh hưởng của phim ảnh',
        prompt: 'The influence of movies on society is presented below.\n\n- Reflects cultural values\n- Can shape opinions\n- Is a popular form of entertainment\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Do you think movies can be a powerful tool for education?\n- What is your favorite movie genre and why?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-40',
        title: 'Chủ đề 40: Lợi ích của việc đi bộ',
        prompt: 'The benefits of walking are presented below.\n\n- Good for physical health\n- Helps clear the mind\n- Is a free form of exercise\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- How can cities be made more walkable?\n- Do you think people walk less now than in the past?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-41',
        title: 'Chủ đề 41: Vai trò của các kỳ thi',
        prompt: 'The role of exams in education is presented below.\n\n- Measure student knowledge\n- Motivate students to study\n- Can cause a lot of stress\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What are some alternatives to traditional exams?\n- Do you think exams are a fair way to assess a student\'s ability?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-42',
        title: 'Chủ đề 42: Tầm quan trọng của truyền thống',
        prompt: 'The importance of traditions is presented below.\n\n- Connects generations\n- Creates a sense of identity\n- Can sometimes be slow to change\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What is an important tradition in your family?\n- When is it good to break with tradition?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-43',
        title: 'Chủ đề 43: Lợi ích của việc làm việc tự do (freelancing)',
        prompt: 'The advantages of being a freelancer are presented below.\n\n- Flexible work schedule\n- Choose your own projects\n- Be your own boss\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What are the main disadvantages of freelance work?\n- What kind of person is well-suited to being a freelancer?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-44',
        title: 'Chủ đề 44: Vai trò của các công viên công cộng',
        prompt: 'The role of public parks in cities is presented below.\n\n- Provide green space\n- A place for recreation\n- Improve air quality\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- How can we encourage more people to use public parks?\n- Should there be more public parks in your city?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-45',
        title: 'Chủ đề 45: Lợi ích của việc viết nhật ký',
        prompt: 'The benefits of keeping a journal are presented below.\n\n- Helps organize thoughts\n- Reduces stress\n- Preserves memories\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Do you prefer writing by hand or typing?\n- Is it important to share your feelings with others?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-46',
        title: 'Chủ đề 46: Ảnh hưởng của người nổi tiếng',
        prompt: 'The influence of celebrities on young people is presented below.\n\n- Set fashion trends\n- Can be positive role models\n- Can promote an unrealistic lifestyle\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Do celebrities have a responsibility to behave well in public?\n- Why are many people so interested in the lives of celebrities?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-47',
        title: 'Chủ đề 47: Tầm quan trọng của việc xin lỗi',
        prompt: 'The importance of apologizing is presented below.\n\n- Repairs relationships\n- Shows respect\n- Takes courage\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Why do some people find it so hard to apologize?\n- What makes a good apology?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-48',
        title: 'Chủ đề 48: Lợi ích của việc có một thói quen',
        prompt: 'The benefits of having a daily routine are presented below.\n\n- Increases efficiency\n- Reduces stress\n- Helps build good habits\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- Is it sometimes good to break your routine?\n- How is your weekend routine different from your weekday routine?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-49',
        title: 'Chủ đề 49: Vai trò của chính phủ',
        prompt: 'The role of government in society is presented below.\n\n- Provide public services\n- Create laws and regulations\n- Protect the country\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What is the most important responsibility of a government?\n- How can citizens participate in government?',
        prepTime: 60,
        speakTime: 180
    },
    {
        id: 'v-p3-50',
        title: 'Chủ đề 50: Tương lai của công việc',
        prompt: 'The future of work is presented below.\n\n- Rise of automation and AI\n- More remote work\n- Need for lifelong learning\n\nYou should develop the topic using the given ideas and your own ideas.\n\nFollow-up questions:\n- What jobs do you think will be replaced by robots in the future?\n- What skills will be most important for workers in the future?',
        prepTime: 60,
        speakTime: 180
    }
];
