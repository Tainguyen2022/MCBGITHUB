import { Scenario } from '../types';

export const scenariosData: Scenario[] = [
  // --- Daily Life ---
  {
    id: 'sg-1',
    imageSeed: 'ordering-coffee-saigon',
    title: 'Gọi Cà phê Sữa Đá',
    description: 'Thực hành gọi một ly cà phê sữa đá mang đi tại một quán quen ở Sài Gòn.',
    level: 'Beginner',
    category: 'Gia đình (10-18 tuổi)',
    categoryGroup: 'Daily Life',
    dialogue: [
      { speaker: 'Chủ quán', en: 'Hey kid, what can I get for you today?', ipa: '/heɪ kɪd, wʌt kæn aɪ gɛt fɔr ju təˈdeɪ?/', vi: 'Em trai, nay uống gì em?' },
      { speaker: 'Bạn', en: 'Hi auntie, one iced milk coffee to go, please. Less sweet.', ipa: '/haɪ ˈænti, wʌn aɪst mɪlk ˈkɔfi tə goʊ, pliz. lɛs swit./', vi: 'Dạ chào cô, cho con một ly cà phê sữa đá mang đi, ít ngọt ạ.' },
      { speaker: 'Chủ quán', en: 'Alright, 20k. Wait a moment.', ipa: '/ɔlˈraɪt, ˈtwɛnti keɪ. weɪt ə ˈmoʊmənt./', vi: 'Rồi, 20 ngàn. Đợi cô xíu nha.' }
    ],
    vocabulary: [
      { word: 'iced milk coffee', ipa: '/aɪst mɪlk ˈkɔfi/', pos: 'n. phr.', vi: 'cà phê sữa đá' },
      { word: 'to go', ipa: '/tə goʊ/', pos: 'adv. phr.', vi: 'mang đi' },
      { word: 'less sweet', ipa: '/lɛs swit/', pos: 'adj. phr.', vi: 'ít ngọt' }
    ]
  },
   {
    id: 'sg-3',
    imageSeed: 'saigon-traffic-jam',
    title: 'Than phiền về Kẹt xe',
    description: 'Than phiền với bạn bè về tình trạng kẹt xe giờ tan tầm ở Sài Gòn.',
    level: 'Beginner',
    category: 'Gia đình (10-18 tuổi)',
    categoryGroup: 'Daily Life',
    dialogue: [
      { speaker: 'Bạn', en: 'Oh man, the traffic jam today was terrible.', ipa: '/oʊ mæn, ðə ˈtræfɪk ʤæm təˈdeɪ wəz ˈtɛrəbəl./', vi: 'Trời ơi, kẹt xe hôm nay kinh khủng thật sự.' },
      { speaker: 'Bạn bè', en: 'Tell me about it. It took me an hour to get home from District 1.', ipa: '/tɛl mi əˈbaʊt ɪt. ɪt tʊk mi ən ˈaʊər tə gɛt hoʊm frʌm ˈdɪstrɪkt wʌn./', vi: 'Biết rồi khổ lắm nói mãi. Tui mất cả tiếng đồng hồ để về nhà từ Quận 1 đó.' }
    ],
    vocabulary: [
      { word: 'traffic jam', ipa: '/ˈtræfɪk ʤæm/', pos: 'n.', vi: 'kẹt xe' },
      { word: 'terrible', ipa: '/ˈtɛrəbəl/', pos: 'adj.', vi: 'kinh khủng, tồi tệ' }
    ]
  },
  // ... (Other "Daily Life" scenarios would go here)
  {
    id: 'sg-50',
    imageSeed: 'job-interview-saigon',
    title: 'Phỏng vấn Xin việc',
    description: 'Trải qua một buổi phỏng vấn cho vị trí nhân viên văn phòng tại một công ty ở Quận 3.',
    level: 'Intermediate',
    category: 'Công việc (18-25 tuổi)',
    categoryGroup: 'Academic/Work',
    dialogue: [
      { speaker: 'Nhà tuyển dụng', en: 'Good morning. Please tell me about your strengths.', ipa: '/gʊd ˈmɔrnɪŋ. pliz tɛl mi əˈbaʊt jʊər strɛŋθs./', vi: 'Chào em. Em hãy cho tôi biết về những điểm mạnh của mình.' },
      { speaker: 'Bạn', en: 'Yes. I am proficient in office software and have good communication skills.', ipa: '/jɛs. aɪ æm prəˈfɪʃənt ɪn ˈɔfɪs ˈsɔftˌwɛr ænd hæv gʊd kəmˌjunəˈkeɪʃən skɪlz./', vi: 'Dạ. Em thành thạo phần mềm văn phòng và có kỹ năng giao tiếp tốt ạ.' }
    ],
    vocabulary: [
      { word: 'proficient in', ipa: '/prəˈfɪʃənt ɪn/', pos: 'adj. phr.', vi: 'thành thạo về' },
      { word: 'communication skills', ipa: '/kəmˌjunəˈkeɪʃən skɪlz/', pos: 'n. phr.', vi: 'kỹ năng giao tiếp' }
    ]
  },
  // ... (Other "Academic/Work" scenarios)
  {
    id: 'sg-80',
    imageSeed: 'wedding-invitation-saigon',
    title: 'Mời đám cưới',
    description: 'Mời một người bạn thân đến dự đám cưới của mình.',
    level: 'Intermediate',
    category: 'Bạn bè (25-40 tuổi)',
    categoryGroup: 'Social Functions',
    dialogue: [
        { speaker: 'Bạn', en: 'Hey, I have some great news! I\'m getting married next month, and I\'d be honored if you could come.', ipa: '/heɪ, aɪ hæv sʌm greɪt nuz! aɪm ˈgɛtɪŋ ˈmɛrid nɛkst mʌnθ, ænd aɪd bi ˈɑnərd ɪf ju kʊd kʌm./', vi: 'Ê, có tin vui nè! Tháng sau tao cưới, và sẽ rất vinh dự nếu mày đến dự được.'},
        { speaker: 'Bạn bè', en: 'Wow, congratulations! Of course, I\'ll be there. I wouldn\'t miss it for the world!', ipa: '/waʊ, kənˌgræʧəˈleɪʃənz! ʌv kɔrs, aɪl bi ðɛr. aɪ ˈwʊdənt mɪs ɪt fɔr ðə wɜrld!/', vi: 'Wow, chúc mừng nha! Dĩ nhiên là tao sẽ đến rồi. Không đời nào tao bỏ lỡ đâu!'}
    ],
    vocabulary: [
        { base: 'get married', ipa: '/tə gɛt ˈmɛrid/', pos: 'v. phr.', vi: 'kết hôn, cưới'},
        { base: 'be honored', ipa: '/tə bi ˈɑnərd/', pos: 'v. phr.', vi: 'cảm thấy vinh dự'}
    ]
  },
  {
    id: 'sg-81',
    imageSeed: 'birthday-party-invitation',
    title: 'Rủ rê đi tiệc sinh nhật',
    description: 'Mời một người bạn đi dự tiệc sinh nhật và sắp xếp thời gian, địa điểm.',
    level: 'Intermediate',
    category: 'Bạn bè (25-40 tuổi)',
    categoryGroup: 'Social Functions',
    dialogue: [
        { speaker: 'Bạn', en: 'Hey, I\'m throwing a birthday party next Saturday. Are you free to come?', ipa: '/heɪ, aɪm ˈθroʊɪŋ ə ˈbɜrθˌdeɪ ˈpɑrti nɛkst ˈsætərdeɪ. ɑr ju fri tə kʌm?/', vi: 'Ê, thứ Bảy tới tao tổ chức tiệc sinh nhật nè. Mày rảnh không?'},
        { speaker: 'Bạn bè', en: 'That sounds awesome! I\'d love to. What time and where?', ipa: '/ðæt saʊndz ˈɔsəm! aɪd lʌv tu. wʌt taɪm ænd wɛr?/', vi: 'Nghe hay đó! Tao thích lắm. Mấy giờ và ở đâu vậy?'},
        { speaker: 'Bạn', en: 'It\'s at my place, around 7 PM. Just bring yourself!', ipa: '/ɪts æt maɪ pleɪs, əˈraʊnd ˈsɛvən piˈɛm. ʤʌst brɪŋ jərˈsɛlf!/', vi: 'Ở nhà tao, khoảng 7 giờ tối. Chỉ cần mày tới thôi!'}
    ],
    vocabulary: [
        { base: 'throw a party', ipa: '/tə θroʊ ə ˈpɑrti/', pos: 'v. phr.', vi: 'tổ chức một bữa tiệc'},
        { word: 'Are you free?', ipa: '/ɑr ju fri?/', pos: 'phr.', vi: 'Bạn có rảnh không?'},
        { word: 'sounds awesome', ipa: '/saʊndz ˈɔsəm/', pos: 'phr.', vi: 'nghe thật tuyệt'}
    ]
  },
  {
    id: 'sg-82',
    imageSeed: 'complaining-about-product',
    title: 'Phàn nàn về Sản phẩm lỗi',
    description: 'Phàn nàn với quản lý cửa hàng về một sản phẩm bị lỗi và nhận được lời xin lỗi.',
    level: 'Intermediate',
    category: 'Giao dịch (25-40 tuổi)',
    categoryGroup: 'Social Functions',
    dialogue: [
        { speaker: 'Bạn', en: 'Excuse me, I bought this headphone here yesterday, but it\'s not working.', ipa: '/ɪkˈskjus mi, aɪ bɔt ðɪs ˈhɛdˌfoʊn hir ˈjɛstərdeɪ, bʌt ɪts nɑt ˈwɜrkɪŋ./', vi: 'Xin lỗi, tôi mua cái tai nghe này ở đây hôm qua, nhưng nó không hoạt động.'},
        { speaker: 'Quản lý', en: 'Oh, I\'m terribly sorry to hear that. Do you have the receipt?', ipa: '/oʊ, aɪm ˈtɛrəbli ˈsɔri tə hir ðæt. du ju hæv ðə rɪˈsit?/', vi: 'Ồ, tôi rất xin lỗi khi nghe điều đó. Anh/chị có hóa đơn không ạ?'},
        { speaker: 'Bạn', en: 'Yes, here it is. I\'d like a replacement, please.', ipa: '/jɛs, hir ɪt ɪz. aɪd laɪk ə rɪˈpleɪsmənt, pliz./', vi: 'Có, đây ạ. Tôi muốn đổi một cái mới.'}
    ],
    vocabulary: [
        { word: 'not working', ipa: '/nɑt ˈwɜrkɪŋ/', pos: 'v. phr.', vi: 'không hoạt động, bị hỏng'},
        { word: 'receipt', ipa: '/rɪˈsit/', pos: 'n.', vi: 'hóa đơn, biên lai'},
        { word: 'replacement', ipa: '/rɪˈpleɪsmənt/', pos: 'n.', vi: 'sự thay thế, vật thay thế'}
    ]
  },
  {
    id: 'sg-83',
    imageSeed: 'winning-lottery-dream',
    title: 'Nếu trúng số độc đắc',
    description: 'Thảo luận với bạn bè về việc bạn sẽ làm gì nếu trúng số độc đắc.',
    level: 'Intermediate',
    category: 'Bạn bè (25-40 tuổi)',
    categoryGroup: 'Social Functions',
    dialogue: [
        { speaker: 'Bạn bè', en: 'What would you do if you won the lottery?', ipa: '/wʌt wʊd ju du ɪf ju wʌn ðə ˈlɑtəri?/', vi: 'Mày sẽ làm gì nếu trúng số?'},
        { speaker: 'Bạn', en: 'If I won, I would travel the world first. Then I\'d buy a house for my parents.', ipa: '/ɪf aɪ wʌn, aɪ wʊd ˈtrævəl ðə wɜrld fɜrst. ðɛn aɪd baɪ ə haʊs fɔr maɪ ˈpɛrənts./', vi: 'Nếu tao trúng, tao sẽ đi du lịch vòng quanh thế giới trước. Sau đó mua nhà cho ba mẹ.'},
        { speaker: 'Bạn bè', en: 'That\'s a great plan! I\'d probably start my own business.', ipa: '/ðæts ə greɪt plæn! aɪd ˈprɑbəbli stɑrt maɪ oʊn ˈbɪznəs./', vi: 'Kế hoạch hay đó! Tao chắc sẽ tự mở công ty.'}
    ],
    vocabulary: [
        { base: 'win the lottery', ipa: '/wɪn ðə ˈlɑtəri/', pos: 'v. phr.', vi: 'trúng số'},
        { base: 'speculate', ipa: '/ˈspɛkjəˌleɪtɪŋ/', pos: 'v.', vi: 'suy đoán, giả định'},
        { word: 'hypothetical', ipa: '/ˌhaɪpəˈθɛtɪkəl/', pos: 'adj.', vi: 'giả thuyết'}
    ]
  },
  {
    id: 'sg-84',
    imageSeed: 'telling-funny-story',
    title: 'Kể một kỷ niệm khó quên',
    description: 'Kể lại cho bạn bè nghe một trải nghiệm đáng nhớ trong chuyến đi gần đây.',
    level: 'Intermediate',
    category: 'Bạn bè (25-40 tuổi)',
    categoryGroup: 'Social Functions',
    dialogue: [
        { speaker: 'Bạn bè', en: 'How was your trip to Da Lat?', ipa: '/haʊ wəz jʊər trɪp tə dɑ lɑt?/', vi: 'Chuyến đi Đà Lạt của mày sao rồi?'},
        { speaker: 'Bạn', en: 'It was amazing! Let me tell you about the time we got lost on the way to the waterfall. It was hilarious!', ipa: '/ɪt wəz əˈmeɪzɪŋ! lɛt mi tɛl ju əˈbaʊt ðə taɪm wi gɑt lɔst ɑn ðə weɪ tə ðə ˈwɔtərˌfɔl. ɪt wəz hɪˈlɛriəs!/', vi: 'Tuyệt vời lắm! Để tao kể mày nghe lúc tụi tao bị lạc đường đến thác nước. Vui dã man!'},
        { speaker: 'Bạn bè', en: 'Oh really? What happened?', ipa: '/oʊ ˈrili? wʌt ˈhæpənd?/', vi: 'Vậy hả? Chuyện gì đã xảy ra?'}
    ],
    vocabulary: [
        { word: 'memorable', ipa: '/ˈmɛmərəbəl/', pos: 'adj.', vi: 'đáng nhớ'},
        { word: 'got lost', ipa: '/gɑt lɔst/', pos: 'v. phr.', vi: 'bị lạc đường'},
        { word: 'hilarious', ipa: '/hɪˈlɛriəs/', pos: 'adj.', vi: 'rất vui, hài hước'}
    ]
  },
  {
    id: 'sg-85',
    imageSeed: 'giving-compliment-at-work',
    title: 'Khen ngợi và Đáp lại',
    description: 'Khen một đồng nghiệp về bài thuyết trình thành công và đáp lại lời khen.',
    level: 'Intermediate',
    category: 'Công việc (25-40 tuổi)',
    categoryGroup: 'Social Functions',
    dialogue: [
        { speaker: 'Bạn', en: 'That was an excellent presentation! You did a fantastic job.', ipa: '/ðæt wəz ən ˈɛksələnt ˌprɛzɛnˈteɪʃən! ju dɪd ə fænˈtæstɪk ʤɑb./', vi: 'Đó là một bài thuyết trình xuất sắc! Bạn đã làm rất tuyệt.'},
        { speaker: 'Đồng nghiệp', en: 'Thank you so much! I\'m glad you enjoyed it. I really appreciate your feedback.', ipa: '/θæŋk ju soʊ mʌʧ! aɪm glæd ju ɛnˈʤɔɪd ɪt. aɪ ˈrili əˈpriʃiˌeɪt jʊər ˈfidˌbæk./', vi: 'Cảm ơn bạn nhiều! Mình rất vui vì bạn đã thích nó. Mình thực sự trân trọng phản hồi của bạn.'},
        { speaker: 'Bạn', en: 'You deserve it. Your slides were very clear and persuasive.', ipa: '/ju dɪˈzɜrv ɪt. jʊər slaɪdz wər ˈvɛri klɪr ænd pərˈsweɪsɪv./', vi: 'Bạn xứng đáng mà. Các slide của bạn rất rõ ràng và thuyết phục.'}
    ],
    vocabulary: [
        { word: 'excellent', ipa: '/ˈɛksələnt/', pos: 'adj.', vi: 'xuất sắc'},
        { base: 'appreciate', ipa: '/əˈpriʃiˌeɪt/', pos: 'v.', vi: 'trân trọng, đánh giá cao'},
        { word: 'persuasive', ipa: '/pərˈsweɪsɪv/', pos: 'adj.', vi: 'có tính thuyết phục'}
    ]
  }
];
