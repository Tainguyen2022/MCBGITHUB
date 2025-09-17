import { IeltsTask } from '../../types';

type IeltsTaskContent = Pick<IeltsTask, 'sampleAnswer_en' | 'sampleAnswer_vi' | 'outline_en' | 'outline_vi' | 'vocabulary'>;

export const ieltsPart1Content: Record<string, IeltsTaskContent> = {
    'i-p1-1': {
        sampleAnswer_en: "Currently, I'm a final-year student at the University of Economics, pursuing a degree in International Business. I chose this major because I find the dynamics of global trade and cross-cultural communication absolutely fascinating. What I like most is the practical aspect of my studies; we often work on case studies of real multinational corporations, which makes the theory much more tangible and engaging.",
        sampleAnswer_vi: "Hiện tại, em là sinh viên năm cuối của trường Đại học Kinh tế, đang theo học ngành Kinh doanh Quốc tế. Em chọn chuyên ngành này vì em thấy sự năng động của thương mại toàn cầu và giao tiếp đa văn hóa thực sự hấp dẫn. Điều em thích nhất là khía cạnh thực tế của việc học; chúng em thường làm việc với các nghiên cứu tình huống của các tập đoàn đa quốc gia thực tế, điều này làm cho lý thuyết trở nên hữu hình và hấp dẫn hơn nhiều.",
        outline_en: "1.  Answer directly: State that you are a student and mention your major (International Business).\n2.  Explain why: Mention fascination with global trade and cross-cultural communication.\n3.  Explain what you like most: Talk about the practical aspect (case studies) and how it makes learning tangible.",
        outline_vi: "1.  Trả lời trực tiếp: Nêu rõ bạn là sinh viên và đề cập đến chuyên ngành (Kinh doanh Quốc tế).\n2.  Giải thích lý do: Đề cập đến sự hấp dẫn đối với thương mại toàn cầu và giao tiếp đa văn hóa.\n3.  Giải thích điều bạn thích nhất: Nói về khía cạnh thực tế (nghiên cứu tình huống) và nó làm cho việc học trở nên hữu hình như thế nào.",
        vocabulary: [
            { word: 'pursue a degree', ipa: '/pərˈsuː ə dɪˈɡriː/', pos: 'v. phr.', vi: 'theo học một bằng cấp' },
            { word: 'fascinating', ipa: '/ˈfæsɪneɪtɪŋ/', pos: 'adj.', vi: 'hấp dẫn, lôi cuốn' },
            { word: 'multinational corporation', ipa: '/ˌmʌltiˈnæʃnəl ˌkɔːrpəˈreɪʃn/', pos: 'n. phr.', vi: 'tập đoàn đa quốc gia' },
            { word: 'tangible', ipa: '/ˈtændʒəbl/', pos: 'adj.', vi: 'hữu hình, có thể cảm nhận' }
        ]
    },
    'i-p1-2': {
        sampleAnswer_en: "My hometown is Da Nang, which is a coastal city in Central Vietnam. It's probably most renowned for its long, sandy beaches and the stunning Marble Mountains. I think I will definitely continue to live here in the future. It strikes a perfect balance between a bustling city with modern amenities and a relaxed, laid-back atmosphere. It has everything I need without the overwhelming pace of a megacity.",
        sampleAnswer_vi: "Quê em là Đà Nẵng, một thành phố ven biển ở miền Trung Việt Nam. Nơi đây có lẽ nổi tiếng nhất với những bãi biển đầy cát dài và Ngũ Hành Sơn tuyệt đẹp. Em nghĩ em chắc chắn sẽ tiếp tục sống ở đây trong tương lai. Nó đạt được sự cân bằng hoàn hảo giữa một thành phố nhộn nhịp với các tiện nghi hiện đại và một không khí thư thái, thoải mái. Nó có mọi thứ em cần mà không có nhịp sống quá choáng ngợp như một siêu đô thị.",
        outline_en: "1.  Answer where: State the city (Da Nang) and its location (coastal, Central Vietnam).\n2.  Explain what it's famous for: Mention key attractions (beaches, Marble Mountains).\n3.  Explain future plans: State you will continue to live there and explain why (perfect balance, modern but relaxed).",
        outline_vi: "1.  Trả lời về nơi chốn: Nêu tên thành phố (Đà Nẵng) và vị trí của nó (ven biển, miền Trung Việt Nam).\n2.  Giải thích nơi đó nổi tiếng về điều gì: Đề cập đến các điểm thu hút chính (bãi biển, Ngũ Hành Sơn).\n3.  Giải thích kế hoạch tương lai: Nêu rõ bạn sẽ tiếp tục sống ở đó và giải thích lý do (sự cân bằng hoàn hảo, hiện đại nhưng thư thái).",
        vocabulary: [
            { word: 'coastal city', ipa: '/ˈkoʊstl ˈsɪti/', pos: 'n. phr.', vi: 'thành phố ven biển' },
            { word: 'renowned for', ipa: '/rɪˈnaʊnd fɔːr/', pos: 'adj. phr.', vi: 'nổi tiếng về' },
            { word: 'bustling', ipa: '/ˈbʌslɪŋ/', pos: 'adj.', vi: 'nhộn nhịp, hối hả' },
            { word: 'amenities', ipa: '/əˈmiːnətiz/', pos: 'n.', vi: 'tiện nghi' }
        ]
    },
    'i-p1-3': {
        sampleAnswer_en: "I currently live in a cozy apartment in a residential area of the city. My favorite room is definitely the living room. It's not particularly large, but it gets a lot of natural light, which makes it feel bright and airy. It's my little sanctuary where I can relax with a book. If I could change one thing, I would probably want a more spacious kitchen. I enjoy cooking, but the current layout is a bit cramped, so having more counter space would be fantastic.",
        sampleAnswer_vi: "Em hiện đang sống trong một căn hộ ấm cúng ở một khu dân cư của thành phố. Phòng yêu thích của em chắc chắn là phòng khách. Nó không đặc biệt lớn, nhưng nhận được nhiều ánh sáng tự nhiên, làm cho nó có cảm giác sáng sủa và thoáng đãng. Đó là nơi trú ẩn nhỏ của em, nơi em có thể thư giãn với một cuốn sách. Nếu có thể thay đổi một điều, em có lẽ sẽ muốn một nhà bếp rộng rãi hơn. Em thích nấu ăn, nhưng bố cục hiện tại hơi chật chội, vì vậy có thêm không gian mặt bàn sẽ thật tuyệt vời.",
        outline_en: "1.  Answer type of home: State you live in a cozy apartment.\n2.  Explain favorite room: The living room, because of the natural light.\n3.  Explain desired change: A more spacious kitchen, because you enjoy cooking.",
        outline_vi: "1.  Trả lời loại nhà ở: Nêu rõ bạn sống trong một căn hộ ấm cúng.\n2.  Giải thích phòng yêu thích: Phòng khách, vì có ánh sáng tự nhiên.\n3.  Giải thích sự thay đổi mong muốn: Một nhà bếp rộng rãi hơn, vì bạn thích nấu ăn.",
        vocabulary: [
            { word: 'cozy', ipa: '/ˈkoʊzi/', pos: 'adj.', vi: 'ấm cúng' },
            { word: 'residential area', ipa: '/ˌrezɪˈdenʃl ˈeəriə/', pos: 'n. phr.', vi: 'khu dân cư' },
            { word: 'sanctuary', ipa: '/ˈsæŋktʃuəri/', pos: 'n.', vi: 'nơi trú ẩn, nơi tôn nghiêm' },
            { word: 'spacious', ipa: '/ˈspeɪʃəs/', pos: 'adj.', vi: 'rộng rãi' }
        ]
    },
    'i-p1-4': {
        sampleAnswer_en: "Yes, I do. I'm quite passionate about photography. In my country, sports like football are incredibly popular, as is gathering with friends at coffee shops. I believe having a hobby is essential for one's mental well-being. It serves as a creative outlet and a way to de-stress from the pressures of work or study. It allows you to focus on something you genuinely enjoy, which is incredibly refreshing.",
        sampleAnswer_vi: "Vâng, có ạ. Em khá đam mê nhiếp ảnh. Ở nước em, các môn thể thao như bóng đá vô cùng phổ biến, cũng như việc tụ tập với bạn bè ở các quán cà phê. Em tin rằng có một sở thích là điều cần thiết cho sức khỏe tinh thần của một người. Nó đóng vai trò như một lối thoát sáng tạo và một cách để giải tỏa căng thẳng từ áp lực công việc hoặc học tập. Nó cho phép bạn tập trung vào điều gì đó bạn thực sự thích, điều đó vô cùng sảng khoái.",
        outline_en: "1.  Answer directly & state your hobby: Yes, passionate about photography.\n2.  Mention popular hobbies: Sports (football), going to cafes.\n3.  Explain importance: Essential for mental well-being, creative outlet, de-stress.",
        outline_vi: "1.  Trả lời trực tiếp & nêu sở thích: Vâng, đam mê nhiếp ảnh.\n2.  Đề cập sở thích phổ biến: Thể thao (bóng đá), đi cà phê.\n3.  Giải thích tầm quan trọng: Cần thiết cho sức khỏe tinh thần, lối thoát sáng tạo, giải tỏa căng thẳng.",
        vocabulary: [
            { word: 'passionate about', ipa: '/ˈpæʃənət əˈbaʊt/', pos: 'adj. phr.', vi: 'đam mê về' },
            { word: 'essential', ipa: '/ɪˈsenʃl/', pos: 'adj.', vi: 'cần thiết, thiết yếu' },
            { word: 'mental well-being', ipa: '/ˈmentl ˌwelˈbiːɪŋ/', pos: 'n. phr.', vi: 'sức khỏe tinh thần' },
            { word: 'creative outlet', ipa: '/kriˈeɪtɪv ˈaʊtlet/', pos: 'n. phr.', vi: 'lối thoát sáng tạo' }
        ]
    },
    'i-p1-5': {
        sampleAnswer_en: "My taste in music is quite eclectic, but I'm particularly fond of indie pop and classical music. I used to play the piano when I was younger, but unfortunately, I haven't kept it up. For me, music is an integral part of my day. It's a great mood booster, and it helps me concentrate when I'm studying. I honestly can't imagine a day without it.",
        sampleAnswer_vi: "Gu âm nhạc của em khá đa dạng, nhưng em đặc biệt thích nhạc indie pop và nhạc cổ điển. Em từng chơi piano khi còn nhỏ, nhưng tiếc là em đã không duy trì được. Đối với em, âm nhạc là một phần không thể thiếu trong ngày. Nó là một liều thuốc tinh thần tuyệt vời, và nó giúp em tập trung khi học. Em thật sự không thể tưởng tượng một ngày mà không có âm nhạc.",
        outline_en: "1.  Answer music taste: Eclectic, but fond of indie pop and classical.\n2.  Answer instrument question: Used to play the piano but didn't keep it up.\n3.  Explain importance: Integral part of the day, a mood booster, helps concentration.",
        outline_vi: "1.  Trả lời gu âm nhạc: Đa dạng, nhưng thích indie pop và cổ điển.\n2.  Trả lời câu hỏi về nhạc cụ: Từng chơi piano nhưng không duy trì.\n3.  Giải thích tầm quan trọng: Phần không thể thiếu, cải thiện tâm trạng, giúp tập trung.",
        vocabulary: [
            { word: 'eclectic', ipa: '/ɪˈklektɪk/', pos: 'adj.', vi: 'đa dạng, chiết trung' },
            { word: 'fond of', ipa: '/fɒnd əv/', pos: 'adj. phr.', vi: 'yêu thích' },
            { word: 'keep it up', ipa: '/kiːp ɪt ʌp/', pos: 'v. phr.', vi: 'duy trì, tiếp tục' },
            { word: 'integral', ipa: '/ˈɪntɪɡrəl/', pos: 'adj.', vi: 'không thể thiếu' }
        ]
    },
    'i-p1-6': {
        sampleAnswer_en: "My absolute favorite food is Pho, which is a quintessential Vietnamese noodle soup. I do enjoy cooking, but I must admit I don't do it as often as I should due to a busy schedule. I believe having a balanced diet is crucial. It's not about restricting food, but rather about eating a variety of things in moderation to fuel your body and mind effectively.",
        sampleAnswer_vi: "Món ăn yêu thích nhất của em là Phở, một món súp mì tinh hoa của Việt Nam. Em có thích nấu ăn, nhưng phải thừa nhận là em không nấu thường xuyên như nên làm do lịch trình bận rộn. Em tin rằng có một chế độ ăn uống cân bằng là rất quan trọng. Vấn đề không phải là hạn chế thực phẩm, mà là ăn đa dạng các loại thực phẩm một cách điều độ để cung cấp năng lượng cho cơ thể và trí óc một cách hiệu quả.",
        outline_en: "1.  Answer favorite food: Pho, quintessential Vietnamese soup.\n2.  Answer cooking question: Enjoy it but don't do it often due to busy schedule.\n3.  Explain importance of healthy diet: It's crucial; about balance and moderation, not restriction.",
        outline_vi: "1.  Trả lời món ăn yêu thích: Phở, món súp tinh hoa của Việt Nam.\n2.  Trả lời câu hỏi nấu ăn: Thích nhưng không nấu thường xuyên do bận rộn.\n3.  Giải thích tầm quan trọng của chế độ ăn lành mạnh: Rất quan trọng; về sự cân bằng và điều độ, không phải hạn chế.",
        vocabulary: [
            { word: 'quintessential', ipa: '/ˌkwɪntɪˈsenʃl/', pos: 'adj.', vi: 'tinh túy, tinh hoa' },
            { word: 'balanced diet', ipa: '/ˈbælənst ˈdaɪət/', pos: 'n. phr.', vi: 'chế độ ăn uống cân bằng' },
            { word: 'crucial', ipa: '/ˈkruːʃl/', pos: 'adj.', vi: 'cốt yếu, quan trọng' },
            { word: 'in moderation', ipa: '/ɪn ˌmɒdəˈreɪʃn/', pos: 'adv. phr.', vi: 'một cách điều độ' }
        ]
    },
    'i-p1-7': {
        sampleAnswer_en: "I don't have a huge number of friends, but I have a close-knit circle of people I can truly rely on. We try to see each other at least once a week, usually on the weekend for a coffee or a meal. For me, the most important quality in a good friend is loyalty. It's essential to have someone you can trust and count on, who will support you through thick and thin.",
        sampleAnswer_vi: "Em không có quá nhiều bạn, nhưng em có một nhóm bạn thân thiết mà em có thể thực sự tin cậy. Chúng em cố gắng gặp nhau ít nhất một lần một tuần, thường là vào cuối tuần để đi cà phê hoặc ăn uống. Đối với em, phẩm chất quan trọng nhất ở một người bạn tốt là lòng trung thành. Điều cần thiết là có một người mà bạn có thể tin tưởng và trông cậy, người sẽ ủng hộ bạn dù trong hoàn cảnh khó khăn hay thuận lợi.",
        outline_en: "1.  Answer number of friends: Not many, but a close-knit circle.\n2.  Answer frequency: At least once a week, on weekends.\n3.  Explain quality of a good friend: Loyalty, someone to trust and count on.",
        outline_vi: "1.  Trả lời số lượng bạn bè: Không nhiều, nhưng là một nhóm thân thiết.\n2.  Trả lời tần suất: Ít nhất một lần một tuần, vào cuối tuần.\n3.  Giải thích phẩm chất của bạn tốt: Lòng trung thành, người có thể tin tưởng và trông cậy.",
        vocabulary: [
            { word: 'close-knit', ipa: '/ˌkloʊsˈnɪt/', pos: 'adj.', vi: 'gắn bó, thân thiết' },
            { word: 'rely on', ipa: '/rɪˈlaɪ ɒn/', pos: 'phr. v.', vi: 'tin cậy vào' },
            { word: 'loyalty', ipa: '/ˈlɔɪəlti/', pos: 'n.', vi: 'lòng trung thành' },
            { word: 'through thick and thin', ipa: '/θruː θɪk ənd θɪn/', pos: 'idiom', vi: 'bất chấp mọi hoàn cảnh khó khăn' }
        ]
    },
    'i-p1-8': {
        sampleAnswer_en: "Yes, I'm an avid reader. I tend to gravitate towards non-fiction, particularly biographies and books on psychology. I find it fascinating to learn about people's lives and what motivates them. I absolutely believe reading is important. It's one of the best ways to broaden your horizons, gain new perspectives, and develop empathy by stepping into someone else's shoes.",
        sampleAnswer_vi: "Vâng, em là một người ham đọc sách. Em có xu hướng bị thu hút bởi thể loại phi hư cấu, đặc biệt là tiểu sử và sách về tâm lý học. Em thấy việc tìm hiểu về cuộc đời của mọi người và điều gì thúc đẩy họ rất hấp dẫn. Em hoàn toàn tin rằng đọc sách là quan trọng. Đó là một trong những cách tốt nhất để mở rộng tầm nhìn, có được những góc nhìn mới và phát triển sự đồng cảm bằng cách đặt mình vào vị trí của người khác.",
        outline_en: "1.  Answer directly: Yes, an avid reader.\n2.  Explain what kind of books: Non-fiction, especially biographies and psychology.\n3.  Explain why it's important: Broadens horizons, provides new perspectives, develops empathy.",
        outline_vi: "1.  Trả lời trực tiếp: Vâng, một người ham đọc sách.\n2.  Giải thích loại sách: Phi hư cấu, đặc biệt là tiểu sử và tâm lý học.\n3.  Giải thích tại sao nó quan trọng: Mở rộng tầm nhìn, cung cấp góc nhìn mới, phát triển sự đồng cảm.",
        vocabulary: [
            { word: 'avid', ipa: '/ˈævɪd/', pos: 'adj.', vi: 'ham mê, khao khát' },
            { word: 'gravitate towards', ipa: '/ˈɡrævɪteɪt təˈwɔːrdz/', pos: 'phr. v.', vi: 'bị thu hút về phía' },
            { word: 'broaden your horizons', ipa: '/ˈbrɔːdn jɔːr həˈraɪznz/', pos: 'idiom', vi: 'mở rộng tầm nhìn của bạn' },
            { word: 'empathy', ipa: '/ˈempəθi/', pos: 'n.', vi: 'sự đồng cảm' }
        ]
    },
    'i-p1-9': {
        sampleAnswer_en: "Oh yes, I'm a huge movie fan. My favorite genre would have to be science fiction. I love films that are imaginative and explore thought-provoking ideas about the future. While watching films at home is comfortable, I definitely prefer the cinema. There's nothing quite like the immersive experience of a huge screen and a great sound system. It really allows for a sense of escapism.",
        sampleAnswer_vi: "Ồ vâng, em là một người hâm mộ phim ảnh cuồng nhiệt. Thể loại yêu thích của em có lẽ là khoa học viễn tưởng. Em thích những bộ phim giàu trí tưởng tượng và khám phá những ý tưởng kích thích tư duy về tương lai. Mặc dù xem phim ở nhà rất thoải mái, em chắc chắn thích rạp chiếu phim hơn. Không có gì có thể sánh bằng trải nghiệm đắm chìm của một màn hình lớn và hệ thống âm thanh tuyệt vời. Nó thực sự cho phép một cảm giác thoát ly thực tại.",
        outline_en: "1.  Answer directly: Yes, a huge movie fan.\n2.  Explain favorite type: Science fiction, because they are imaginative and thought-provoking.\n3.  Explain preference (cinema): Prefer the cinema for its immersive experience and sense of escapism.",
        outline_vi: "1.  Trả lời trực tiếp: Vâng, một người hâm mộ phim lớn.\n2.  Giải thích thể loại yêu thích: Khoa học viễn tưởng, vì chúng giàu trí tưởng tượng và kích thích tư duy.\n3.  Giải thích sở thích (rạp chiếu phim): Thích rạp chiếu phim hơn vì trải nghiệm đắm chìm và cảm giác thoát ly thực tại.",
        vocabulary: [
            { word: 'imaginative', ipa: '/ɪˈmædʒɪnətɪv/', pos: 'adj.', vi: 'giàu trí tưởng tượng' },
            { word: 'thought-provoking', ipa: '/ˈθɔːt prəˌvoʊkɪŋ/', pos: 'adj.', vi: 'kích thích tư duy' },
            { word: 'immersive', ipa: '/ɪˈmɜːrsɪv/', pos: 'adj.', vi: 'đắm chìm, chân thực' },
            { word: 'escapism', ipa: '/ɪˈskeɪpɪzəm/', pos: 'n.', vi: 'sự thoát ly thực tại' }
        ]
    },
    'i-p1-10': {
        sampleAnswer_en: "I'm not particularly athletic, but I do enjoy playing badminton on the weekends. It's a great way to stay active and socialize with friends. In Vietnam, football is undoubtedly the king of sports; it's almost a religion. People are incredibly passionate about it. I absolutely think it's vital for children to play sports. It not only promotes physical health and helps combat a sedentary lifestyle, but it also teaches them invaluable life skills like teamwork, discipline, and how to handle both victory and defeat gracefully.",
        sampleAnswer_vi: "Em không phải là người quá năng động, nhưng em thích chơi cầu lông vào cuối tuần. Đó là một cách tuyệt vời để giữ gìn sức khỏe và giao lưu với bạn bè. Ở Việt Nam, bóng đá chắc chắn là môn thể thao vua; nó gần như là một tôn giáo. Mọi người vô cùng đam mê nó. Em hoàn toàn nghĩ rằng việc trẻ em chơi thể thao là rất quan trọng. Nó không chỉ thúc đẩy sức khỏe thể chất và giúp chống lại lối sống ít vận động, mà còn dạy cho chúng những kỹ năng sống vô giá như làm việc nhóm, kỷ luật, và cách xử lý cả chiến thắng và thất bại một cách cao thượng.",
        outline_en: "1.  Answer directly: Mention badminton as a personal activity.\n2.  Popular sports: State that football is the most popular.\n3.  Importance for children: Explain benefits like physical health, teamwork, and discipline.",
        outline_vi: "1.  Trả lời trực tiếp: Đề cập cầu lông là hoạt động cá nhân.\n2.  Môn thể thao phổ biến: Nêu rằng bóng đá là phổ biến nhất.\n3.  Tầm quan trọng với trẻ em: Giải thích các lợi ích như sức khỏe thể chất, làm việc nhóm và kỷ luật.",
        vocabulary: [
            { word: 'athletic', ipa: '/æθˈletɪk/', pos: 'adj.', vi: 'năng động, yêu thể thao' },
            { word: 'stay active', ipa: '/steɪ ˈæktɪv/', pos: 'v. phr.', vi: 'giữ gìn sự năng động' },
            { word: 'undoubtedly', ipa: '/ʌnˈdaʊtɪdli/', pos: 'adv.', vi: 'chắc chắn, không nghi ngờ gì' },
            { word: 'vital', ipa: '/ˈvaɪtl/', pos: 'adj.', vi: 'quan trọng, thiết yếu' },
            { word: 'sedentary lifestyle', ipa: '/ˈsedntri ˈlaɪfstaɪl/', pos: 'n. phr.', vi: 'lối sống ít vận động' },
            { word: 'invaluable', ipa: '/ɪnˈvæljuəbl/', pos: 'adj.', vi: 'vô giá' }
        ]
    },
    'i-p1-11': {
        sampleAnswer_en: "My favorite holiday is definitely Tet, the Lunar New Year. It's the most significant celebration in Vietnam. We usually have a big family reunion. My family and I spend days preparing traditional foods like 'banh chung', decorating the house with apricot blossoms, and visiting relatives to give best wishes. I believe public holidays are crucial for a nation. They offer a collective break from work, strengthen family bonds, and are essential for preserving cultural identity and traditions for future generations.",
        sampleAnswer_vi: "Kỳ nghỉ yêu thích của em chắc chắn là Tết, Tết Nguyên Đán. Đây là lễ kỷ niệm quan trọng nhất ở Việt Nam. Chúng em thường có một buổi sum họp gia đình lớn. Gia đình em và em dành nhiều ngày để chuẩn bị các món ăn truyền thống như 'bánh chưng', trang trí nhà cửa bằng hoa mai và đi thăm họ hàng để chúc những lời chúc tốt đẹp nhất. Em tin rằng các ngày nghỉ lễ là rất quan trọng đối với một quốc gia. Chúng mang lại một kỳ nghỉ chung cho mọi người, củng cố tình cảm gia đình và cần thiết cho việc bảo tồn bản sắc văn hóa và truyền thống cho các thế hệ tương lai.",
        outline_en: "1.  Favorite holiday: State Tet (Lunar New Year).\n2.  How you celebrate: Family reunion, traditional food, decorations.\n3.  Importance of holidays: Collective break, strengthen bonds, preserve culture.",
        outline_vi: "1.  Kỳ nghỉ yêu thích: Nêu Tết (Tết Nguyên Đán).\n2.  Cách bạn ăn mừng: Sum họp gia đình, món ăn truyền thống, trang trí.\n3.  Tầm quan trọng của ngày lễ: Kỳ nghỉ chung, củng cố tình cảm, bảo tồn văn hóa.",
        vocabulary: [
            { word: 'significant', ipa: '/sɪɡˈnɪfɪkənt/', pos: 'adj.', vi: 'quan trọng, đáng kể' },
            { word: 'family reunion', ipa: '/ˈfæməli ˌriːˈjuːniən/', pos: 'n. phr.', vi: 'sum họp gia đình' },
            { word: 'apricot blossoms', ipa: '/ˈeɪprɪkɒt ˈblɒsəmz/', pos: 'n. phr.', vi: 'hoa mai' },
            { word: 'crucial', ipa: '/ˈkruːʃl/', pos: 'adj.', vi: 'cốt yếu, quan trọng' },
            { word: 'preserving cultural identity', ipa: '/prɪˈzɜːvɪŋ ˈkʌltʃərəl aɪˈdentəti/', pos: 'v. phr.', vi: 'bảo tồn bản sắc văn hóa' }
        ]
    },
    'i-p1-12': {
        sampleAnswer_en: "My hometown, Ho Chi Minh City, has a tropical climate, so it's typically hot and humid all year round. We basically have two seasons: the rainy season and the dry season. The weather definitely has a huge impact on my mood. I feel much more energetic and optimistic on a sunny day, whereas gloomy, rainy weather can make me feel a bit lethargic. I much prefer cooler weather. I find the heat can be quite draining, so I enjoy the mild temperatures of autumn, when you can be outdoors comfortably.",
        sampleAnswer_vi: "Quê em, Thành phố Hồ Chí Minh, có khí hậu nhiệt đới, vì vậy thời tiết thường nóng và ẩm quanh năm. Về cơ bản chúng em có hai mùa: mùa mưa và mùa khô. Thời tiết chắc chắn có ảnh hưởng rất lớn đến tâm trạng của em. Em cảm thấy năng động và lạc quan hơn nhiều vào một ngày nắng đẹp, trong khi thời tiết u ám, mưa nhiều có thể làm em cảm thấy hơi uể oải. Em thích thời tiết mát mẻ hơn nhiều. Em thấy nắng nóng có thể khá mệt mỏi, vì vậy em thích nhiệt độ ôn hòa của mùa thu, khi bạn có thể ở ngoài trời một cách thoải mái.",
        outline_en: "1.  Describe hometown weather: Tropical climate, hot and humid, two seasons.\n2.  Effect on mood: Sunny days make me energetic, rainy days make me lethargic.\n3.  Preference: Prefer cooler weather as heat is draining.",
        outline_vi: "1.  Mô tả thời tiết quê hương: Khí hậu nhiệt đới, nóng ẩm, hai mùa.\n2.  Ảnh hưởng đến tâm trạng: Ngày nắng làm tôi năng động, ngày mưa làm tôi uể oải.\n3.  Sở thích: Thích thời tiết mát mẻ hơn vì nắng nóng mệt mỏi.",
        vocabulary: [
            { word: 'tropical climate', ipa: '/ˈtrɒpɪkl ˈklaɪmət/', pos: 'n. phr.', vi: 'khí hậu nhiệt đới' },
            { word: 'humid', ipa: '/ˈhjuːmɪd/', pos: 'adj.', vi: 'ẩm ướt' },
            { word: 'optimistic', ipa: '/ˌɒptɪˈmɪstɪk/', pos: 'adj.', vi: 'lạc quan' },
            { word: 'lethargic', ipa: '/ləˈθɑːdʒɪk/', pos: 'adj.', vi: 'uể oải, lờ đờ' },
            { word: 'draining', ipa: '/ˈdreɪnɪŋ/', pos: 'adj.', vi: 'làm kiệt sức, mệt mỏi' }
        ]
    },
    'i-p1-13': {
        sampleAnswer_en: "I usually get around by motorbike, as it's the most convenient way to navigate the busy streets of my city. The most popular means of transport in Vietnam is overwhelmingly the motorbike. You'll see them everywhere. Using public transport has several clear advantages. Firstly, it's environmentally friendly as it reduces the number of private vehicles on the road, which helps to alleviate traffic congestion and air pollution. Secondly, it's often more cost-effective for daily commuters compared to owning and maintaining a car.",
        sampleAnswer_vi: "Em thường di chuyển bằng xe máy, vì đó là cách thuận tiện nhất để đi lại trên những con đường đông đúc của thành phố. Phương tiện giao thông phổ biến nhất ở Việt Nam chắc chắn là xe máy. Bạn sẽ thấy chúng ở khắp mọi nơi. Sử dụng phương tiện giao thông công cộng có một số lợi thế rõ ràng. Thứ nhất, nó thân thiện với môi trường vì nó làm giảm số lượng phương tiện cá nhân trên đường, giúp giảm bớt ùn tắc giao thông và ô nhiễm không khí. Thứ hai, nó thường tiết kiệm chi phí hơn cho những người đi làm hàng ngày so với việc sở hữu và bảo dưỡng một chiếc ô tô.",
        outline_en: "1.  How you travel: By motorbike, as it's convenient.\n2.  Most popular transport: Overwhelmingly the motorbike.\n3.  Advantages of public transport: Environmentally friendly (reduces congestion/pollution) and cost-effective.",
        outline_vi: "1.  Cách bạn di chuyển: Bằng xe máy, vì nó thuận tiện.\n2.  Phương tiện phổ biến nhất: Chắc chắn là xe máy.\n3.  Lợi ích của giao thông công cộng: Thân thiện với môi trường (giảm ùn tắc/ô nhiễm) và tiết kiệm chi phí.",
        vocabulary: [
            { word: 'get around', ipa: '/ɡet əˈraʊnd/', pos: 'phr. v.', vi: 'đi lại, di chuyển' },
            { word: 'navigate', ipa: '/ˈnævɪɡeɪt/', pos: 'v.', vi: 'đi lại, định vị' },
            { word: 'overwhelmingly', ipa: '/ˌəʊvəˈwelmɪŋli/', pos: 'adv.', vi: 'một cách áp đảo, vượt trội' },
            { word: 'alleviate', ipa: '/əˈliːvieɪt/', pos: 'v.', vi: 'làm giảm bớt, làm dịu đi' },
            { word: 'cost-effective', ipa: '/ˌkɒst ɪˈfektɪv/', pos: 'adj.', vi: 'hiệu quả về chi phí' }
        ]
    },
    'i-p1-14': {
        sampleAnswer_en: "On a daily basis, I tend to opt for casual and comfortable clothes, like a t-shirt and jeans. I'm not a huge fan of shopping for clothes, to be honest. I find it a bit overwhelming with so many choices. For me, fashion isn't a top priority. While I appreciate looking presentable and neat, I value comfort and functionality over following the latest trends. I prefer a minimalist wardrobe with versatile pieces.",
        sampleAnswer_vi: "Hàng ngày, em có xu hướng chọn những bộ quần áo đơn giản và thoải mái, như áo phông và quần jean. Thành thật mà nói, em không phải là một người quá thích mua sắm quần áo. Em thấy nó hơi choáng ngợp với quá nhiều lựa chọn. Đối với em, thời trang không phải là ưu tiên hàng đầu. Mặc dù em đánh giá cao việc trông chỉn chu và gọn gàng, em coi trọng sự thoải mái và tính ứng dụng hơn là chạy theo các xu hướng mới nhất. Em thích một tủ quần áo tối giản với những món đồ đa năng.",
        outline_en: "1.  What you wear: Casual and comfortable clothes (t-shirt, jeans).\n2.  Enjoy shopping?: Not a huge fan, find it overwhelming.\n3.  Fashion importance: Not a top priority; value comfort and functionality over trends.",
        outline_vi: "1.  Bạn mặc gì: Quần áo đơn giản và thoải mái (áo phông, jean).\n2.  Thích mua sắm không?: Không thích lắm, thấy choáng ngợp.\n3.  Tầm quan trọng của thời trang: Không phải ưu tiên hàng đầu; coi trọng sự thoải mái và tính ứng dụng hơn là xu hướng.",
        vocabulary: [
            { word: 'opt for', ipa: '/ɒpt fɔː(r)/', pos: 'phr. v.', vi: 'lựa chọn' },
            { word: 'overwhelming', ipa: '/ˌəʊvəˈwelmɪŋ/', pos: 'adj.', vi: 'choáng ngợp' },
            { word: 'a top priority', ipa: '/ə tɒp praɪˈɒrəti/', pos: 'n. phr.', vi: 'một ưu tiên hàng đầu' },
            { word: 'presentable', ipa: '/prɪˈzentəbl/', pos: 'adj.', vi: 'chỉn chu, bảnh bao' },
            { word: 'functionality', ipa: '/ˌfʌŋkʃəˈnæləti/', pos: 'n.', vi: 'tính ứng dụng, tính năng' }
        ]
    },
    'i-p1-15': {
        sampleAnswer_en: "I don't go shopping for things like clothes very often, maybe just a few times a year when I need something specific. However, I do my grocery shopping weekly. I prefer a mix of both online and in-store shopping. For electronics, I prefer shopping online because I can easily compare reviews and prices. For clothes, however, I'd rather visit a physical store to try them on. The last thing I bought was a new pair of headphones online, as my old ones had stopped working.",
        sampleAnswer_vi: "Em không đi mua sắm những thứ như quần áo thường xuyên, có lẽ chỉ vài lần một năm khi em cần một thứ gì đó cụ thể. Tuy nhiên, em đi mua thực phẩm hàng tuần. Em thích sự kết hợp của cả mua sắm trực tuyến và tại cửa hàng. Đối với đồ điện tử, em thích mua sắm trực tuyến hơn vì em có thể dễ dàng so sánh các bài đánh giá và giá cả. Tuy nhiên, đối với quần áo, em thích đến một cửa hàng thực tế hơn để thử chúng. Món đồ cuối cùng em mua là một cặp tai nghe mới trên mạng, vì cặp cũ của em đã ngừng hoạt động.",
        outline_en: "1.  Frequency: Infrequently for clothes, weekly for groceries.\n2.  Preference: A mix; online for electronics (reviews/prices), in-store for clothes (to try on).\n3.  Last purchase: New headphones online because the old ones broke.",
        outline_vi: "1.  Tần suất: Ít khi mua quần áo, hàng tuần mua thực phẩm.\n2.  Sở thích: Kết hợp; trực tuyến cho đồ điện tử (đánh giá/giá), tại cửa hàng cho quần áo (để thử).\n3.  Món đồ cuối cùng: Tai nghe mới trên mạng vì cái cũ bị hỏng.",
        vocabulary: [
            { word: 'infrequently', ipa: '/ɪnˈfriːkwəntli/', pos: 'adv.', vi: 'không thường xuyên' },
            { word: 'grocery shopping', ipa: '/ˈɡrəʊsəri ˈʃɒpɪŋ/', pos: 'n. phr.', vi: 'mua sắm thực phẩm' },
            { word: 'physical store', ipa: '/ˈfɪzɪkl stɔː(r)/', pos: 'n. phr.', vi: 'cửa hàng thực tế' },
            { word: 'try them on', ipa: '/traɪ ðəm ɒn/', pos: 'phr. v.', vi: 'thử (quần áo)' }
        ]
    },
    'i-p1-16': {
        sampleAnswer_en: "I use my computer every single day, for both my studies and for leisure. I use the internet for a vast range of activities, from researching for my assignments and attending online classes to streaming movies and staying in touch with friends. I firmly believe that, on the whole, technology has made life significantly better. It has revolutionized communication and made information instantly accessible. While there are downsides, like addiction or privacy concerns, its positive contributions are undeniable.",
        sampleAnswer_vi: "Em sử dụng máy tính mỗi ngày, cho cả việc học và giải trí. Em sử dụng internet cho rất nhiều hoạt động, từ nghiên cứu cho bài tập và tham gia các lớp học trực tuyến đến xem phim và giữ liên lạc với bạn bè. Em tin chắc rằng, nhìn chung, công nghệ đã làm cho cuộc sống tốt hơn đáng kể. Nó đã cách mạng hóa giao tiếp và làm cho thông tin có thể truy cập ngay lập tức. Mặc dù có những mặt trái, như nghiện ngập hoặc lo ngại về quyền riêng tư, những đóng góp tích cực của nó là không thể phủ nhận.",
        outline_en: "1.  Frequency: Every single day, for studies and leisure.\n2.  Internet use: Research, online classes, streaming movies, staying in touch.\n3.  Impact: Significantly better; revolutionized communication, made information accessible. Acknowledge downsides.",
        outline_vi: "1.  Tần suất: Mỗi ngày, cho học tập và giải trí.\n2.  Sử dụng Internet: Nghiên cứu, lớp học trực tuyến, xem phim, giữ liên lạc.\n3.  Tác động: Tốt hơn đáng kể; cách mạng hóa giao tiếp, làm cho thông tin dễ tiếp cận. Ghi nhận các mặt trái.",
        vocabulary: [
            { word: 'leisure', ipa: '/ˈleʒə(r)/', pos: 'n.', vi: 'thời gian rảnh, giải trí' },
            { word: 'a vast range of', ipa: '/ə vɑːst reɪndʒ əv/', pos: 'n. phr.', vi: 'một loạt các' },
            { word: 'revolutionize', ipa: '/ˌrevəˈluːʃənaɪz/', pos: 'v.', vi: 'cách mạng hóa' },
            { word: 'instantly accessible', ipa: '/ˈɪnstəntli əkˈsesəbl/', pos: 'adj. phr.', vi: 'có thể truy cập ngay lập tức' },
            { word: 'undeniable', ipa: '/ˌʌndɪˈnaɪəbl/', pos: 'adj.', vi: 'không thể phủ nhận' }
        ]
    },
    'i-p1-17': {
        sampleAnswer_en: "On a typical weekday, I get up early, around 6 AM, to do some exercise before heading to my university lectures. My weekends, however, are much more flexible and laid-back; I tend to catch up on sleep and spend quality time with my friends. My favourite part of the day is definitely the late evening. It's the time when I've completed all my tasks and can finally unwind, perhaps by reading a book or watching a good series.",
        sampleAnswer_vi: "Vào một ngày trong tuần điển hình, em thường dậy sớm, khoảng 6 giờ sáng, để tập thể dục một chút trước khi đến các bài giảng ở trường đại học. Tuy nhiên, lịch trình cuối tuần của em linh hoạt và thoải mái hơn nhiều; em có xu hướng ngủ nướng và dành thời gian chất lượng với bạn bè. Phần yêu thích nhất trong ngày của em chắc chắn là buổi tối muộn. Đó là lúc em đã hoàn thành tất cả công việc của mình và cuối cùng có thể thư giãn, có lẽ bằng cách đọc một cuốn sách hoặc xem một bộ phim hay.",
        outline_en: "1.  Morning Routine: Early start, exercise, lectures.\n2.  Weekend vs. Weekday: Weekends are more flexible and relaxed.\n3.  Favorite Part of Day: Late evening for unwinding.",
        outline_vi: "1.  Thói quen buổi sáng: Bắt đầu sớm, tập thể dục, đi học.\n2.  Cuối tuần vs. Trong tuần: Cuối tuần linh hoạt và thư thái hơn.\n3.  Phần yêu thích trong ngày: Tối muộn để thư giãn.",
        vocabulary: [
            { word: 'structured', ipa: '/ˈstrʌktʃəd/', pos: 'adj.', vi: 'có cấu trúc' },
            { word: 'laid-back', ipa: '/ˌleɪdˈbæk/', pos: 'adj.', vi: 'thoải mái, thư thái' },
            { word: 'catch up on sleep', ipa: '/kætʃ ʌp ɒn sliːp/', pos: 'v. phr.', vi: 'ngủ bù' },
            { word: 'unwind', ipa: '/ʌnˈwaɪnd/', pos: 'v.', vi: 'thư giãn, xả hơi' }
        ]
    },
    'i-p1-18': {
        sampleAnswer_en: "I'm not one for extravagant celebrations, so I usually prefer a low-key get-together with my closest friends and family. On my last birthday, for instance, we just had a cozy dinner at my favourite local restaurant. For me, birthdays are significant milestones. They're not just about getting older, but also about reflecting on the past year's achievements and setting intentions for the year ahead. It's a nice moment for personal reflection.",
        sampleAnswer_vi: "Em không phải là người thích những buổi lễ kỷ niệm xa hoa, vì vậy em thường thích một buổi họp mặt thân mật với bạn bè thân thiết và gia đình. Ví dụ, vào sinh nhật lần trước của em, chúng em chỉ có một bữa tối ấm cúng tại nhà hàng địa phương yêu thích của em. Đối với em, sinh nhật là những cột mốc quan trọng. Chúng không chỉ là việc già đi, mà còn là để suy ngẫm về những thành tựu của năm qua và đặt ra những dự định cho năm tới. Đó là một khoảnh khắc tốt đẹp để tự suy ngẫm về bản thân.",
        outline_en: "1.  Celebration style: Prefer low-key get-togethers.\n2.  Last birthday example: Cozy dinner.\n3.  Importance: Significant milestones for reflection and setting intentions.",
        outline_vi: "1.  Phong cách kỷ niệm: Thích những buổi họp mặt thân mật.\n2.  Ví dụ sinh nhật trước: Bữa tối ấm cúng.\n3.  Tầm quan trọng: Những cột mốc quan trọng để suy ngẫm và đặt ra dự định.",
        vocabulary: [
            { word: 'extravagant', ipa: '/ɪkˈstrævəɡənt/', pos: 'adj.', vi: 'xa hoa, lãng phí' },
            { word: 'low-key', ipa: '/ˌləʊˈkiː/', pos: 'adj.', vi: 'thân mật, không phô trương' },
            { word: 'get-together', ipa: '/ˈɡet təˌɡeðə(r)/', pos: 'n.', vi: 'buổi họp mặt' },
            { word: 'significant milestone', ipa: '/sɪɡˈnɪfɪkənt ˈmaɪlstəʊn/', pos: 'n. phr.', vi: 'cột mốc quan trọng' },
            { word: 'reflect on', ipa: '/rɪˈflekt ɒn/', pos: 'phr. v.', vi: 'suy ngẫm về' },
            { word: 'set intentions', ipa: '/set ɪnˈtenʃnz/', pos: 'v. phr.', vi: 'đặt ra dự định' }
        ]
    },
    'i-p1-19': {
        sampleAnswer_en: "Yes, I'm a real animal lover. My favorite would have to be dogs, simply because of their unwavering loyalty and affectionate nature. In Vietnam, you'll see a lot of domesticated animals like dogs, cats, and chickens, especially in rural areas. As for wild animals, we're fortunate to have some incredible biodiversity, with species like the Asian elephant and the saola, although many are sadly endangered.",
        sampleAnswer_vi: "Vâng, em là một người rất yêu động vật. Con vật yêu thích của em có lẽ là chó, đơn giản vì lòng trung thành không lay chuyển và bản tính trìu mến của chúng. Ở Việt Nam, bạn sẽ thấy rất nhiều động vật nuôi như chó, mèo và gà, đặc biệt là ở các vùng nông thôn. Về động vật hoang dã, chúng em may mắn có được sự đa dạng sinh học đáng kinh ngạc, với các loài như voi châu Á và sao la, mặc dù nhiều loài đang bị đe dọa nghiêm trọng.",
        outline_en: "1.  Affirmation: Yes, a real animal lover.\n2.  Favorite animal: Dogs, due to their loyalty and affectionate nature.\n3.  Animals in your country: Mention domesticated animals (dogs, cats) and wild, endangered species (elephants, saola).",
        outline_vi: "1.  Khẳng định: Vâng, một người yêu động vật thực sự.\n2.  Động vật yêu thích: Chó, vì lòng trung thành và bản tính trìu mến.\n3.  Động vật ở nước bạn: Đề cập đến động vật nuôi (chó, mèo) và các loài hoang dã, bị đe dọa (voi, sao la).",
        vocabulary: [
            { word: 'unwavering', ipa: '/ʌnˈweɪvərɪŋ/', pos: 'adj.', vi: 'không lay chuyển, kiên định' },
            { word: 'affectionate', ipa: '/əˈfekʃənət/', pos: 'adj.', vi: 'trìu mến, âu yếm' },
            { word: 'domesticated', ipa: '/dəˈmestɪkeɪtɪd/', pos: 'adj.', vi: 'được thuần hóa' },
            { word: 'biodiversity', ipa: '/ˌbaɪəʊdaɪˈvɜːsəti/', pos: 'n.', vi: 'đa dạng sinh học' },
            { word: 'endangered', ipa: '/ɪnˈdeɪndʒəd/', pos: 'adj.', vi: 'bị đe dọa, có nguy cơ tuyệt chủng' }
        ]
    },
    'i-p1-20': {
        sampleAnswer_en: "I do appreciate art, although I wouldn't call myself an expert. I've visited a few art galleries, and I particularly enjoy modern art because it's often abstract and open to interpretation. I think art is a crucial part of culture because it serves as a form of expression and a reflection of society at a particular time. It challenges our perspectives and adds beauty to our lives.",
        sampleAnswer_vi: "Em có trân trọng nghệ thuật, mặc dù em không tự gọi mình là chuyên gia. Em đã đến thăm một vài phòng trưng bày nghệ thuật, và em đặc biệt thích nghệ thuật hiện đại vì nó thường trừu tượng và mở ra nhiều cách diễn giải. Em nghĩ nghệ thuật là một phần quan trọng của văn hóa vì nó đóng vai trò như một hình thức biểu đạt và là sự phản ánh của xã hội tại một thời điểm cụ thể. Nó thách thức các quan điểm của chúng ta và thêm vẻ đẹp vào cuộc sống.",
        outline_en: "1.  Appreciation: Appreciate art but not an expert.\n2.  Experience: Visited galleries, enjoy modern art.\n3.  Reason for liking modern art: Abstract and open to interpretation.\n4.  Importance of art: Crucial to culture, a form of expression, reflects society.",
        outline_vi: "1.  Sự trân trọng: Trân trọng nghệ thuật nhưng không phải chuyên gia.\n2.  Kinh nghiệm: Đã thăm các phòng trưng bày, thích nghệ thuật hiện đại.\n3.  Lý do thích nghệ thuật hiện đại: Trừu tượng và mở ra nhiều cách diễn giải.\n4.  Tầm quan trọng của nghệ thuật: Quan trọng đối với văn hóa, là một hình thức biểu đạt, phản ánh xã hội.",
        vocabulary: [
            { word: 'appreciate', ipa: '/əˈpriːʃieɪt/', pos: 'v.', vi: 'trân trọng, đánh giá cao' },
            { word: 'abstract', ipa: '/ˈæbstrækt/', pos: 'adj.', vi: 'trừu tượng' },
            { word: 'open to interpretation', ipa: '/ˈəʊpən tuː ɪnˌtɜːprəˈteɪʃn/', pos: 'adj. phr.', vi: 'mở ra nhiều cách diễn giải' },
            { word: 'crucial', ipa: '/ˈkruːʃl/', pos: 'adj.', vi: 'cốt yếu, quan trọng' },
            { word: 'reflection', ipa: '/rɪˈflekʃn/', pos: 'n.', vi: 'sự phản ánh' }
        ]
    },
    'i-p1-21': {
        sampleAnswer_en: "Yes, I find history absolutely fascinating. The historical event that I find most compelling is the Vietnamese resistance against foreign invaders. It's a testament to the resilience and strategic ingenuity of my ancestors. I believe it's vital to learn about history because it provides context for our present-day society and helps us avoid repeating past mistakes. Understanding where we come from is key to knowing where we're going.",
        sampleAnswer_vi: "Vâng, em thấy lịch sử vô cùng hấp dẫn. Sự kiện lịch sử mà em thấy hấp dẫn nhất là cuộc kháng chiến của người Việt Nam chống lại giặc ngoại xâm. Đó là một minh chứng cho sự kiên cường và tài trí chiến lược của tổ tiên em. Em tin rằng việc học lịch sử là rất quan trọng vì nó cung cấp bối cảnh cho xã hội ngày nay của chúng ta và giúp chúng ta tránh lặp lại những sai lầm trong quá khứ. Hiểu được chúng ta từ đâu đến là chìa khóa để biết chúng ta sẽ đi về đâu.",
        outline_en: "1.  Affirmation: Find history fascinating.\n2.  Interesting event: Vietnamese resistance, showing resilience and ingenuity.\n3.  Importance: Provides context for the present and helps avoid repeating past mistakes.",
        outline_vi: "1.  Khẳng định: Thấy lịch sử hấp dẫn.\n2.  Sự kiện thú vị: Kháng chiến của người Việt, thể hiện sự kiên cường và tài trí.\n3.  Tầm quan trọng: Cung cấp bối cảnh cho hiện tại và giúp tránh lặp lại sai lầm quá khứ.",
        vocabulary: [
            { word: 'fascinating', ipa: '/ˈfæsɪneɪtɪŋ/', pos: 'adj.', vi: 'hấp dẫn, lôi cuốn' },
            { word: 'compelling', ipa: '/kəmˈpelɪŋ/', pos: 'adj.', vi: 'hấp dẫn, thuyết phục' },
            { word: 'testament to', ipa: '/ˈtestəmənt tuː/', pos: 'n. phr.', vi: 'minh chứng cho' },
            { word: 'resilience', ipa: '/rɪˈzɪliəns/', pos: 'n.', vi: 'sự kiên cường' },
            { word: 'ingenuity', ipa: '/ˌɪndʒəˈnjuːəti/', pos: 'n.', vi: 'sự tài trí, khéo léo' }
        ]
    },
    'i-p1-22': {
        sampleAnswer_en: "Besides English, I'm currently trying to learn a bit of Japanese. I'm learning English primarily for professional reasons, as it's the global language of business and technology. I think the best way to learn a new language is through immersion. While grammar books and apps are useful, nothing compares to regularly communicating with native speakers and consuming media in that language. It helps you pick up the nuances and rhythm of the language naturally.",
        sampleAnswer_vi: "Ngoài tiếng Anh, em hiện đang cố gắng học một chút tiếng Nhật. Em học tiếng Anh chủ yếu vì lý do nghề nghiệp, vì đó là ngôn ngữ toàn cầu của kinh doanh và công nghệ. Em nghĩ cách tốt nhất để học một ngôn ngữ mới là thông qua sự đắm mình. Mặc dù sách ngữ pháp và ứng dụng rất hữu ích, không có gì có thể so sánh với việc thường xuyên giao tiếp với người bản xứ và tiêu thụ các phương tiện truyền thông bằng ngôn ngữ đó. Nó giúp bạn nắm bắt được các sắc thái và nhịp điệu của ngôn ngữ một cách tự nhiên.",
        outline_en: "1.  Other languages: Trying to learn Japanese.\n2.  Reason for English: Primarily for professional reasons.\n3.  Best learning method: Immersion, through communication with native speakers and consuming media.",
        outline_vi: "1.  Các ngôn ngữ khác: Đang cố học tiếng Nhật.\n2.  Lý do học tiếng Anh: Chủ yếu vì lý do nghề nghiệp.\n3.  Phương pháp học tốt nhất: Đắm mình, thông qua giao tiếp với người bản xứ và tiêu thụ truyền thông.",
        vocabulary: [
            { word: 'primarily', ipa: '/ˈpraɪmərəli/', pos: 'adv.', vi: 'chủ yếu, chính' },
            { word: 'immersion', ipa: '/ɪˈmɜːʃn/', pos: 'n.', vi: 'sự đắm mình (vào ngôn ngữ)' },
            { word: 'native speaker', ipa: '/ˈneɪtɪv ˈspiːkə(r)/', pos: 'n. phr.', vi: 'người bản xứ' },
            { word: 'consume media', ipa: '/kənˈsjuːm ˈmiːdiə/', pos: 'v. phr.', vi: 'tiêu thụ truyền thông' },
            { word: 'nuances', ipa: '/ˈnjuːɑːnsɪz/', pos: 'n.', vi: 'các sắc thái' }
        ]
    },
    'i-p1-23': {
        sampleAnswer_en: "Yes, I'm quite fond of my neighbourhood. It has a good mix of residential tranquility and convenient amenities. We have a lovely local park, a few cozy cafes, and a supermarket all within walking distance. It has changed quite a bit recently; several modern apartment complexes have been constructed, which has made the area more bustling and has brought in a lot of new residents.",
        sampleAnswer_vi: "Vâng, em khá thích khu phố của mình. Nó có sự kết hợp tốt giữa sự yên tĩnh của khu dân cư và các tiện nghi thuận lợi. Chúng em có một công viên địa phương đáng yêu, một vài quán cà phê ấm cúng, và một siêu thị, tất cả đều trong khoảng cách đi bộ. Gần đây nó đã thay đổi khá nhiều; một vài khu chung cư hiện đại đã được xây dựng, điều này đã làm cho khu vực trở nên nhộn nhịp hơn và thu hút nhiều cư dân mới.",
        outline_en: "1.  Liking: Yes, fond of the mix of tranquility and convenience.\n2.  Facilities: Mention a park, cafes, and a supermarket.\n3.  Recent changes: New apartment complexes have made it more bustling.",
        outline_vi: "1.  Mức độ yêu thích: Có, thích sự kết hợp giữa yên tĩnh và tiện lợi.\n2.  Cơ sở vật chất: Đề cập đến công viên, quán cà phê và siêu thị.\n3.  Những thay đổi gần đây: Các khu chung cư mới đã làm cho nó nhộn nhịp hơn.",
        vocabulary: [
            { word: 'fond of', ipa: '/fɒnd əv/', pos: 'adj. phr.', vi: 'yêu thích' },
            { word: 'tranquility', ipa: '/træŋˈkwɪləti/', pos: 'n.', vi: 'sự yên tĩnh, thanh bình' },
            { word: 'amenities', ipa: '/əˈmiːnətiz/', pos: 'n.', vi: 'các tiện nghi' },
            { word: 'within walking distance', ipa: '/wɪˈðɪn ˈwɔːkɪŋ ˈdɪstəns/', pos: 'adv. phr.', vi: 'trong khoảng cách đi bộ' },
            { word: 'bustling', ipa: '/ˈbʌslɪŋ/', pos: 'adj.', vi: 'nhộn nhịp, hối hả' }
        ]
    },
    'i-p1-24': {
        sampleAnswer_en: "I usually try to strike a balance. Saturdays are often for catching up on errands and socializing with friends, maybe going out for dinner. Sundays, on the other hand, are my time to unwind and recharge for the week ahead, so I'll typically stay home, read a book, or watch a movie. I don't think weekends are long enough! A three-day weekend would be the ideal, in my opinion. Next weekend, I'm planning to visit a new art exhibition downtown.",
        sampleAnswer_vi: "Em thường cố gắng tạo sự cân bằng. Thứ Bảy thường là để giải quyết các công việc vặt và giao lưu với bạn bè, có thể là đi ăn tối. Trong khi đó, Chủ nhật là thời gian để em thư giãn và nạp lại năng lượng cho tuần sắp tới, vì vậy em thường sẽ ở nhà, đọc sách hoặc xem phim. Em không nghĩ cuối tuần đủ dài! Theo em, cuối tuần ba ngày sẽ là lý tưởng. Cuối tuần tới, em dự định đi thăm một triển lãm nghệ thuật mới ở trung tâm thành phố.",
        outline_en: "1.  How you spend: Saturday for errands/socializing, Sunday for relaxing.\n2.  Long enough?: No, a three-day weekend would be ideal.\n3.  Next weekend: Planning to visit an art exhibition.",
        outline_vi: "1.  Cách bạn trải qua: Thứ Bảy cho công việc vặt/giao lưu, Chủ nhật để thư giãn.\n2.  Đủ dài không?: Không, cuối tuần ba ngày sẽ là lý tưởng.\n3.  Cuối tuần tới: Dự định thăm một triển lãm nghệ thuật.",
        vocabulary: [
            { word: 'strike a balance', ipa: '/straɪk ə ˈbæləns/', pos: 'idiom', vi: 'tạo sự cân bằng' },
            { word: 'errands', ipa: '/ˈerəndz/', pos: 'n.', vi: 'công việc vặt' },
            { word: 'socialize', ipa: '/ˈsəʊʃəlaɪz/', pos: 'v.', vi: 'giao lưu' },
            { word: 'unwind', ipa: '/ʌnˈwaɪnd/', pos: 'v.', vi: 'thư giãn, xả hơi' },
            { word: 'recharge', ipa: '/ˌriːˈtʃɑːdʒ/', pos: 'v.', vi: 'nạp lại năng lượng' }
        ]
    },
    'i-p1-25': {
        sampleAnswer_en: "I mainly use Instagram and Zalo. Zalo is indispensable for keeping in touch with family and for work communication in Vietnam. I probably spend more time than I should, maybe an hour or two scattered throughout the day. The main advantage is connectivity – it’s incredibly easy to stay updated. However, the disadvantage is that it can be a significant distraction and sometimes promotes an unrealistic comparison of lifestyles.",
        sampleAnswer_vi: "Em chủ yếu sử dụng Instagram và Zalo. Zalo là không thể thiếu để giữ liên lạc với gia đình và cho giao tiếp công việc tại Việt Nam. Em có lẽ dành nhiều thời gian hơn mức cần thiết, có thể là một hoặc hai tiếng rải rác trong ngày. Ưu điểm chính là khả năng kết nối – thật vô cùng dễ dàng để cập nhật thông tin. Tuy nhiên, nhược điểm là nó có thể là một sự sao lãng đáng kể và đôi khi thúc đẩy sự so sánh lối sống phi thực tế.",
        outline_en: "1.  Websites used: Instagram and Zalo, explaining Zalo's importance in Vietnam.\n2.  Time spent: An hour or two scattered throughout the day.\n3.  Advantages vs. Disadvantages: Advantage is connectivity; disadvantage is distraction and unrealistic comparison.",
        outline_vi: "1.  Các trang web sử dụng: Instagram và Zalo, giải thích tầm quan trọng của Zalo tại Việt Nam.\n2.  Thời gian sử dụng: Một hoặc hai tiếng rải rác trong ngày.\n3.  Ưu điểm vs. Nhược điểm: Ưu điểm là khả năng kết nối; nhược điểm là sự sao lãng và so sánh phi thực tế.",
        vocabulary: [
            { word: 'indispensable', ipa: '/ˌɪndɪˈspensəbl/', pos: 'adj.', vi: 'không thể thiếu' },
            { word: 'scattered', ipa: '/ˈskætəd/', pos: 'adj.', vi: 'rải rác' },
            { word: 'connectivity', ipa: '/ˌkɒnekˈtɪvəti/', pos: 'n.', vi: 'khả năng kết nối' },
            { word: 'significant distraction', ipa: '/sɪɡˈnɪfɪkənt dɪˈstrækʃn/', pos: 'n. phr.', vi: 'sự sao lãng đáng kể' },
            { word: 'unrealistic', ipa: '/ˌʌnrɪəˈlɪstɪk/', pos: 'adj.', vi: 'phi thực tế' }
        ]
    },
    'i-p1-26': {
        sampleAnswer_en: "In the short term, my main goal is to graduate with a good degree. After that, I hope to secure a position at a multinational company to gain some practical experience in my field. I would like to work as a marketing specialist. I definitely think having goals is crucial. They provide direction and motivation, giving you a clear sense of purpose to work towards.",
        sampleAnswer_vi: "Trong ngắn hạn, mục tiêu chính của em là tốt nghiệp với một tấm bằng tốt. Sau đó, em hy vọng sẽ có được một vị trí tại một công ty đa quốc gia để tích lũy kinh nghiệm thực tế trong lĩnh vực của mình. Em muốn làm việc với tư cách là một chuyên gia marketing. Em chắc chắn nghĩ rằng việc có mục tiêu là rất quan trọng. Chúng cung cấp định hướng và động lực, cho bạn một ý thức rõ ràng về mục đích để phấn đấu.",
        outline_en: "1.  Short-term plans: Graduate with a good degree.\n2.  Long-term plans: Secure a position at a multinational company as a marketing specialist.\n3.  Importance of goals: Crucial as they provide direction and motivation.",
        outline_vi: "1.  Kế hoạch ngắn hạn: Tốt nghiệp với bằng tốt.\n2.  Kế hoạch dài hạn: Có được một vị trí tại công ty đa quốc gia với tư cách chuyên gia marketing.\n3.  Tầm quan trọng của mục tiêu: Rất quan trọng vì chúng cung cấp định hướng và động lực.",
        vocabulary: [
            { word: 'secure a position', ipa: '/sɪˈkjʊər ə pəˈzɪʃn/', pos: 'v. phr.', vi: 'có được một vị trí (công việc)' },
            { word: 'multinational company', ipa: '/ˌmʌltiˈnæʃnəl ˈkʌmpəni/', pos: 'n. phr.', vi: 'công ty đa quốc gia' },
            { word: 'practical experience', ipa: '/ˈpræktɪkl ɪkˈspɪəriəns/', pos: 'n. phr.', vi: 'kinh nghiệm thực tế' },
            { word: 'crucial', ipa: '/ˈkruːʃl/', pos: 'adj.', vi: 'cốt yếu, quan trọng' },
            { word: 'sense of purpose', ipa: '/sens əv ˈpɜːpəs/', pos: 'n. phr.', vi: 'ý thức về mục đích' }
        ]
    }
};
