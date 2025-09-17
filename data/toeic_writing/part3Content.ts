import { WritingSeed } from '../../types';

type WritingSeedContent = Pick<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const toeicTask3Content: Record<string, WritingSeedContent> = {
    'TOEIC-P3-OPN-01': {
        sample_answer_en: "I believe that requiring uniforms for all employees is a beneficial policy. One reason is that uniforms create a professional and consistent brand image for the company. For example, when customers see employees in a clean, standardized uniform, it builds trust and confidence. Furthermore, it can reduce conflicts among staff regarding appropriate work attire.",
        sample_answer_vi: "Tôi tin rằng việc yêu cầu đồng phục cho tất cả nhân viên là một chính sách có lợi. Một lý do là đồng phục tạo ra một hình ảnh thương hiệu chuyên nghiệp và nhất quán cho công ty. Ví dụ, khi khách hàng thấy nhân viên trong một bộ đồng phục sạch sẽ, được tiêu chuẩn hóa, điều đó xây dựng niềm tin và sự tự tin. Hơn nữa, nó có thể giảm thiểu xung đột giữa các nhân viên về trang phục công sở phù hợp.",
        sample_outline_en: `1. Introduction: State agreement - requiring uniforms is beneficial.\n2. Body Paragraph 1: Professional brand image with customer trust example.\n3. Body Paragraph 2: Reduces workplace conflicts about appropriate attire.\n4. Conclusion: Summarize benefits of uniforms for company image and harmony.`,
        sample_outline_vi: `1. Mở bài: Nêu quan điểm đồng ý - yêu cầu đồng phục là có lợi.\n2. Thân bài 1: Hình ảnh thương hiệu chuyên nghiệp với ví dụ về lòng tin khách hàng.\n3. Thân bài 2: Giảm xung đột nơi làm việc về trang phục phù hợp.\n4. Kết bài: Tóm tắt lợi ích của đồng phục cho hình ảnh và sự hòa hợp công ty.`,
        vocabulary: [
            { word: 'beneficial', ipa: '/ˌbenɪˈfɪʃl/', pos: 'adj.', vi: 'có lợi, có ích' },
            { word: 'consistent', ipa: '/kənˈsɪstənt/', pos: 'adj.', vi: 'nhất quán, kiên định' },
            { word: 'standardized', ipa: '/ˈstændədaɪzd/', pos: 'adj.', vi: 'được tiêu chuẩn hóa' },
            { word: 'appropriate', ipa: '/əˈprəʊpriət/', pos: 'adj.', vi: 'phù hợp, thích hợp' }
        ],
        practice: {
            reorder: [
                { words: [{en:"Uniforms", vi:"Đồng phục"}, {en:"create", vi:"tạo ra"}, {en:"a", vi:"một"}, {en:"professional", vi:"chuyên nghiệp"}, {en:"brand", vi:"thương hiệu"}, {en:"image.", vi:"hình ảnh."}], answer: "Uniforms create a professional brand image." },
                { words: [{en:"Employees", vi:"Nhân viên"}, {en:"should", vi:"nên"}, {en:"wear", vi:"mặc"}, {en:"standardized", vi:"được tiêu chuẩn hóa"}, {en:"uniforms", vi:"đồng phục"}, {en:"at work.", vi:"tại nơi làm việc."}], answer: "Employees should wear standardized uniforms at work." }
            ],
            fill_blank: [
                { sentence: { en: "This policy is ____ for the company.", vi: "Chính sách này ____ cho công ty." }, missing_word: 'beneficial', options: ['good', 'beneficial', 'useful', 'harmful'] },
                { sentence: { en: "Uniforms help ____ a professional appearance.", vi: "Đồng phục giúp ____ một vẻ ngoài chuyên nghiệp." }, missing_word: 'maintain', options: ['maintain', 'destroy', 'ignore', 'avoid'] }
            ],
            find_error: [
                { sentence: { en: "Uniforms helps create a professional image.", vi: "Đồng phục giúp tạo ra một hình ảnh chuyên nghiệp." }, error_word: 'helps', correct_word: 'help' },
                { sentence: { en: "I believe that uniform are necessary for all employees.", vi: "Tôi tin rằng đồng phục là cần thiết cho tất cả nhân viên." }, error_word: 'uniform are', correct_word: 'uniforms are' }
            ],
            choose_phrase: [
                { question: { en: 'Complete: I believe that requiring uniforms _____ the company.', vi: 'Hoàn thành: Tôi tin rằng việc yêu cầu đồng phục _____ công ty.' }, options: [{ en: 'benefits', vi: 'có lợi cho' }, { en: 'harms', vi: 'có hại cho' }, { en: 'ignores', vi: 'bỏ qua' }, { en: 'destroys', vi: 'phá hủy' }], correct: 0 },
                { question: { en: 'Complete: One reason is that uniforms _____ workplace conflicts.', vi: 'Hoàn thành: Một lý do là đồng phục _____ xung đột nơi làm việc.' }, options: [{ en: 'increase', vi: 'tăng' }, { en: 'reduce', vi: 'giảm' }, { en: 'create', vi: 'tạo ra' }, { en: 'ignore', vi: 'bỏ qua' }], correct: 1 }
            ],
            matching: [
                { col_a: [{ en: 'Professional appearance', vi: 'Vẻ ngoài chuyên nghiệp' }, { en: 'Brand consistency', vi: 'Tính nhất quán thương hiệu' }, { en: 'Workplace harmony', vi: 'Sự hòa hợp nơi làm việc' }], col_b: [{ en: 'reduces conflicts among staff', vi: 'giảm xung đột giữa nhân viên' }, { en: 'creates trust with customers', vi: 'tạo niềm tin với khách hàng' }, { en: 'maintains company image', vi: 'duy trì hình ảnh công ty' }, { en: 'extra distractor', vi: 'từ gây nhiễu' }] }
            ],
            drag_drop: [
                { sentence_parts: [{ en: 'a professional brand image', vi: 'một hình ảnh thương hiệu chuyên nghiệp' }, { en: 'Uniforms create', vi: 'Đồng phục tạo ra' }, { en: 'for the company.', vi: 'cho công ty.' }], correct_order: 'Uniforms create a professional brand image for the company.' }
            ]
        }
    },
    'TOEIC-P3-OPN-02': {
        sample_answer_en: "In my opinion, employees should be allowed to work from home permanently. One major advantage is the improved work-life balance that remote work provides. For example, employees can save time on commuting and spend more time with their families. Furthermore, companies can reduce overhead costs such as office rent and utilities while maintaining productivity.",
        sample_answer_vi: "Theo ý kiến của tôi, nhân viên nên được phép làm việc từ nhà vĩnh viễn. Một lợi thế lớn là sự cân bằng công việc-cuộc sống được cải thiện mà làm việc từ xa mang lại. Ví dụ, nhân viên có thể tiết kiệm thời gian đi lại và dành nhiều thời gian hơn cho gia đình. Hơn nữa, các công ty có thể giảm chi phí hoạt động như thuê văn phòng và tiện ích trong khi vẫn duy trì năng suất.",
        sample_outline_en: `1. Introduction: State opinion - permanent remote work should be allowed.\n2. Body Paragraph 1: Improved work-life balance with commuting time savings.\n3. Body Paragraph 2: Reduced company overhead costs while maintaining productivity.\n4. Conclusion: Summarize benefits for both employees and companies.`,
        sample_outline_vi: `1. Mở bài: Nêu quan điểm - nên cho phép làm việc từ xa vĩnh viễn.\n2. Thân bài 1: Cải thiện cân bằng công việc-cuộc sống với việc tiết kiệm thời gian di chuyển.\n3. Thân bài 2: Giảm chi phí hoạt động công ty trong khi duy trì năng suất.\n4. Kết bài: Tóm tắt lợi ích cho cả nhân viên và công ty.`,
        vocabulary: [
            { word: 'permanently', ipa: '/ˈpɜːmənəntli/', pos: 'adv.', vi: 'vĩnh viễn, lâu dài' },
            { word: 'work-life balance', ipa: '/wɜːk laɪf ˈbæləns/', pos: 'n. phr.', vi: 'cân bằng công việc và cuộc sống' },
            { word: 'overhead costs', ipa: '/ˈəʊvəhed kɒsts/', pos: 'n. phr.', vi: 'chi phí hoạt động' },
            { word: 'productivity', ipa: '/ˌprɒdʌkˈtɪvəti/', pos: 'n.', vi: 'năng suất' }
        ],
        practice: {
            reorder: [
                { words: [{en:"Remote work", vi:"Làm việc từ xa"}, {en:"provides", vi:"cung cấp"}, {en:"better", vi:"tốt hơn"}, {en:"work-life", vi:"công việc-cuộc sống"}, {en:"balance.", vi:"cân bằng."}], answer: "Remote work provides better work-life balance." },
                { words: [{en:"Companies", vi:"Các công ty"}, {en:"can reduce", vi:"có thể giảm"}, {en:"overhead", vi:"hoạt động"}, {en:"costs", vi:"chi phí"}, {en:"significantly.", vi:"đáng kể."}], answer: "Companies can reduce overhead costs significantly." }
            ],
            fill_blank: [
                { sentence: { en: "Remote work improves ____ for employees.", vi: "Làm việc từ xa cải thiện ____ cho nhân viên." }, missing_word: 'work-life balance', options: ['work-life balance', 'stress levels', 'office conflicts', 'commuting time'] },
                { sentence: { en: "Companies can ____ office rent costs.", vi: "Các công ty có thể ____ chi phí thuê văn phòng." }, missing_word: 'reduce', options: ['reduce', 'increase', 'maintain', 'ignore'] }
            ],
            find_error: [
                { sentence: { en: "Remote work allow employees to work flexibly.", vi: "Làm việc từ xa cho phép nhân viên làm việc linh hoạt." }, error_word: 'allow', correct_word: 'allows' },
                { sentence: { en: "This arrangement is benefit for both parties.", vi: "Sự sắp xếp này có lợi cho cả hai bên." }, error_word: 'is benefit', correct_word: 'is beneficial' }
            ],
            choose_phrase: [
                { question: { en: 'Complete: In my opinion, remote work _____ productivity.', vi: 'Hoàn thành: Theo ý kiến của tôi, làm việc từ xa _____ năng suất.' }, options: [{ en: 'improves', vi: 'cải thiện' }, { en: 'decreases', vi: 'giảm' }, { en: 'destroys', vi: 'phá hủy' }, { en: 'ignores', vi: 'bỏ qua' }], correct: 0 },
                { question: { en: 'Complete: Furthermore, companies can _____ operational costs.', vi: 'Hoàn thành: Hơn nữa, các công ty có thể _____ chi phí hoạt động.' }, options: [{ en: 'increase', vi: 'tăng' }, { en: 'reduce', vi: 'giảm' }, { en: 'maintain', vi: 'duy trì' }, { en: 'ignore', vi: 'bỏ qua' }], correct: 1 }
            ],
            matching: [
                { col_a: [{ en: 'Work-life balance', vi: 'Cân bằng công việc-cuộc sống' }, { en: 'Cost savings', vi: 'Tiết kiệm chi phí' }, { en: 'Flexibility', vi: 'Tính linh hoạt' }], col_b: [{ en: 'reduced office expenses', vi: 'giảm chi phí văn phòng' }, { en: 'more family time', vi: 'nhiều thời gian gia đình hơn' }, { en: 'customized work schedule', vi: 'lịch làm việc tùy chỉnh' }, { en: 'extra distractor', vi: 'từ gây nhiễu' }] }
            ],
            drag_drop: [
                { sentence_parts: [{ en: 'better work-life balance', vi: 'cân bằng công việc-cuộc sống tốt hơn' }, { en: 'Remote work provides', vi: 'Làm việc từ xa cung cấp' }, { en: 'for employees.', vi: 'cho nhân viên.' }], correct_order: 'Remote work provides better work-life balance for employees.' }
            ]
        }
    },
    'TOEIC-P3-OPN-03': {
        sample_answer_en: "I strongly believe that companies should provide regular training programs for their employees. The main reason is that continuous learning keeps employees updated with industry trends and new technologies. For example, a marketing team that receives social media training can better engage with customers online. Additionally, training programs demonstrate that the company values employee development, which improves job satisfaction and retention.",
        sample_answer_vi: "Tôi tin chắc rằng các công ty nên cung cấp các chương trình đào tạo thường xuyên cho nhân viên của họ. Lý do chính là việc học tập liên tục giúp nhân viên cập nhật các xu hướng ngành và công nghệ mới. Ví dụ, một đội marketing nhận được đào tạo về mạng xã hội có thể tương tác tốt hơn với khách hàng trực tuyến. Ngoài ra, các chương trình đào tạo chứng tỏ rằng công ty coi trọng sự phát triển của nhân viên, điều này cải thiện sự hài lòng trong công việc và khả năng giữ chân nhân viên.",
        sample_outline_en: `1. Introduction: State strong belief - companies should provide regular training.\n2. Body Paragraph 1: Keeps employees updated with industry trends and technologies.\n3. Body Paragraph 2: Shows company values employee development, improving satisfaction.\n4. Conclusion: Training benefits both employee skills and company retention.`,
        sample_outline_vi: `1. Mở bài: Nêu niềm tin mạnh mẽ - công ty nên cung cấp đào tạo thường xuyên.\n2. Thân bài 1: Giúp nhân viên cập nhật xu hướng ngành và công nghệ.\n3. Thân bài 2: Cho thấy công ty coi trọng phát triển nhân viên, cải thiện sự hài lòng.\n4. Kết bài: Đào tạo có lợi cho cả kỹ năng nhân viên và khả năng giữ chân của công ty.`,
        vocabulary: [
            { word: 'continuous learning', ipa: '/kənˈtɪnjuəs ˈlɜːnɪŋ/', pos: 'n. phr.', vi: 'học tập liên tục' },
            { word: 'industry trends', ipa: '/ˈɪndəstri trends/', pos: 'n. phr.', vi: 'xu hướng ngành' },
            { word: 'job satisfaction', ipa: '/dʒɒb ˌsætɪsˈfækʃn/', pos: 'n. phr.', vi: 'sự hài lòng trong công việc' },
            { word: 'retention', ipa: '/rɪˈtenʃn/', pos: 'n.', vi: 'khả năng giữ chân' }
        ],
        practice: {
            reorder: [
                { words: [{en:"Training programs", vi:"Chương trình đào tạo"}, {en:"improve", vi:"cải thiện"}, {en:"employee", vi:"nhân viên"}, {en:"skills", vi:"kỹ năng"}, {en:"significantly.", vi:"đáng kể."}], answer: "Training programs improve employee skills significantly." },
                { words: [{en:"Companies", vi:"Các công ty"}, {en:"should invest", vi:"nên đầu tư"}, {en:"in", vi:"vào"}, {en:"employee", vi:"nhân viên"}, {en:"development.", vi:"phát triển."}], answer: "Companies should invest in employee development." }
            ],
            fill_blank: [
                { sentence: { en: "Regular training keeps employees ____ with new technologies.", vi: "Đào tạo thường xuyên giúp nhân viên ____ với công nghệ mới." }, missing_word: 'updated', options: ['updated', 'confused', 'disconnected', 'overwhelmed'] },
                { sentence: { en: "Training programs improve job ____ among employees.", vi: "Chương trình đào tạo cải thiện sự ____ trong công việc của nhân viên." }, missing_word: 'satisfaction', options: ['satisfaction', 'confusion', 'stress', 'conflict'] }
            ],
            find_error: [
                { sentence: { en: "Training help employees learn new skills.", vi: "Đào tạo giúp nhân viên học kỹ năng mới." }, error_word: 'help', correct_word: 'helps' },
                { sentence: { en: "Companies should provides regular training programs.", vi: "Các công ty nên cung cấp chương trình đào tạo thường xuyên." }, error_word: 'provides', correct_word: 'provide' }
            ],
            choose_phrase: [
                { question: { en: 'Complete: I strongly believe that training _____ employee performance.', vi: 'Hoàn thành: Tôi tin chắc rằng đào tạo _____ hiệu suất nhân viên.' }, options: [{ en: 'improves', vi: 'cải thiện' }, { en: 'worsens', vi: 'làm tệ hơn' }, { en: 'ignores', vi: 'bỏ qua' }, { en: 'reduces', vi: 'giảm' }], correct: 0 },
                { question: { en: 'Complete: For example, marketing teams can _____ from social media training.', vi: 'Hoàn thành: Ví dụ, các đội marketing có thể _____ từ đào tạo mạng xã hội.' }, options: [{ en: 'suffer', vi: 'chịu đựng' }, { en: 'benefit', vi: 'có lợi' }, { en: 'avoid', vi: 'tránh' }, { en: 'ignore', vi: 'bỏ qua' }], correct: 1 }
            ],
            matching: [
                { col_a: [{ en: 'Skill development', vi: 'Phát triển kỹ năng' }, { en: 'Industry knowledge', vi: 'Kiến thức ngành' }, { en: 'Employee retention', vi: 'Giữ chân nhân viên' }], col_b: [{ en: 'reduces staff turnover', vi: 'giảm tỷ lệ nghỉ việc' }, { en: 'improves job performance', vi: 'cải thiện hiệu suất công việc' }, { en: 'keeps up with trends', vi: 'theo kịp xu hướng' }, { en: 'extra distractor', vi: 'từ gây nhiễu' }] }
            ],
            drag_drop: [
                { sentence_parts: [{ en: 'employee skills', vi: 'kỹ năng nhân viên' }, { en: 'Training programs improve', vi: 'Chương trình đào tạo cải thiện' }, { en: 'significantly.', vi: 'đáng kể.' }], correct_order: 'Training programs improve employee skills significantly.' }
            ]
        }
    },
    'TOEIC-P3-OPN-04': {
        sample_answer_en: "I agree that flexible working hours improve employee productivity. This is because employees can work during their most productive hours rather than being forced into a rigid 9-to-5 schedule. For instance, some people are more focused in the morning, while others work better in the evening. Additionally, flexible hours reduce stress from traffic and personal obligations, allowing employees to concentrate better on their tasks.",
        sample_answer_vi: "Tôi đồng ý rằng giờ làm việc linh hoạt cải thiện năng suất của nhân viên. Điều này là bởi vì nhân viên có thể làm việc trong những giờ năng suất nhất của họ thay vì bị ép buộc vào lịch trình cứng nhắc từ 9 giờ sáng đến 5 giờ chiều. Ví dụ, một số người tập trung hơn vào buổi sáng, trong khi những người khác làm việc tốt hơn vào buổi tối. Ngoài ra, giờ làm việc linh hoạt giảm căng thẳng từ giao thông và các nghĩa vụ cá nhân, cho phép nhân viên tập trung tốt hơn vào nhiệm vụ của họ.",
        sample_outline_en: `1. Introduction: Agree that flexible hours improve productivity.\n2. Body Paragraph 1: Employees work during their most productive hours.\n3. Body Paragraph 2: Reduces stress from traffic and personal obligations.\n4. Conclusion: Flexible hours benefit both productivity and employee well-being.`,
        sample_outline_vi: `1. Mở bài: Đồng ý rằng giờ linh hoạt cải thiện năng suất.\n2. Thân bài 1: Nhân viên làm việc trong giờ năng suất nhất của họ.\n3. Thân bài 2: Giảm căng thẳng từ giao thông và nghĩa vụ cá nhân.\n4. Kết bài: Giờ linh hoạt có lợi cho cả năng suất và sức khỏe nhân viên.`,
        vocabulary: [
            { word: 'flexible', ipa: '/ˈfleksəbl/', pos: 'adj.', vi: 'linh hoạt' },
            { word: 'rigid', ipa: '/ˈrɪdʒɪd/', pos: 'adj.', vi: 'cứng nhắc, khắt khe' },
            { word: 'obligations', ipa: '/ˌɒblɪˈɡeɪʃnz/', pos: 'n.', vi: 'nghĩa vụ, trách nhiệm' },
            { word: 'concentrate', ipa: '/ˈkɒnsntreɪt/', pos: 'v.', vi: 'tập trung' }
        ],
        practice: {
            reorder: [
                { words: [{en:"Flexible hours", vi:"Giờ linh hoạt"}, {en:"improve", vi:"cải thiện"}, {en:"employee", vi:"nhân viên"}, {en:"productivity", vi:"năng suất"}, {en:"significantly.", vi:"đáng kể."}], answer: "Flexible hours improve employee productivity significantly." },
                { words: [{en:"Employees", vi:"Nhân viên"}, {en:"can work", vi:"có thể làm việc"}, {en:"during", vi:"trong"}, {en:"their most", vi:"của họ nhất"}, {en:"productive hours.", vi:"giờ năng suất."}], answer: "Employees can work during their most productive hours." }
            ],
            fill_blank: [
                { sentence: { en: "Flexible working hours ____ employee stress levels.", vi: "Giờ làm việc linh hoạt ____ mức độ căng thẳng của nhân viên." }, missing_word: 'reduce', options: ['reduce', 'increase', 'maintain', 'ignore'] },
                { sentence: { en: "Some people are more ____ in the morning.", vi: "Một số người ____ hơn vào buổi sáng." }, missing_word: 'focused', options: ['focused', 'tired', 'stressed', 'confused'] }
            ],
            find_error: [
                { sentence: { en: "Flexible hours allows employees to work better.", vi: "Giờ linh hoạt cho phép nhân viên làm việc tốt hơn." }, error_word: 'allows', correct_word: 'allow' },
                { sentence: { en: "This approach are beneficial for productivity.", vi: "Cách tiếp cận này có lợi cho năng suất." }, error_word: 'are', correct_word: 'is' }
            ],
            choose_phrase: [
                { question: { en: 'Complete: I agree that flexible hours _____ productivity.', vi: 'Hoàn thành: Tôi đồng ý rằng giờ linh hoạt _____ năng suất.' }, options: [{ en: 'improve', vi: 'cải thiện' }, { en: 'reduce', vi: 'giảm' }, { en: 'destroy', vi: 'phá hủy' }, { en: 'ignore', vi: 'bỏ qua' }], correct: 0 },
                { question: { en: 'Complete: This is because employees can work during their _____ hours.', vi: 'Hoàn thành: Điều này là vì nhân viên có thể làm việc trong giờ _____ của họ.' }, options: [{ en: 'least productive', vi: 'ít năng suất nhất' }, { en: 'most productive', vi: 'năng suất nhất' }, { en: 'busiest', vi: 'bận rộn nhất' }, { en: 'longest', vi: 'dài nhất' }], correct: 1 }
            ],
            matching: [
                { col_a: [{ en: 'Morning productivity', vi: 'Năng suất buổi sáng' }, { en: 'Evening focus', vi: 'Tập trung buổi tối' }, { en: 'Stress reduction', vi: 'Giảm căng thẳng' }], col_b: [{ en: 'less traffic pressure', vi: 'ít áp lực giao thông' }, { en: 'early bird advantage', vi: 'lợi thế dậy sớm' }, { en: 'night owl preference', vi: 'sở thích cú đêm' }, { en: 'extra distractor', vi: 'từ gây nhiễu' }] }
            ],
            drag_drop: [
                { sentence_parts: [{ en: 'employee productivity', vi: 'năng suất nhân viên' }, { en: 'Flexible hours improve', vi: 'Giờ linh hoạt cải thiện' }, { en: 'significantly.', vi: 'đáng kể.' }], correct_order: 'Flexible hours improve employee productivity significantly.' }
            ]
        }
    },
    'TOEIC-P3-OPN-05': {
        sample_answer_en: "I think it is essential for companies to organize team-building activities. The main benefit is that these activities help colleagues get to know each other better outside the formal work environment. For example, when team members participate in group games or outdoor activities, they develop stronger personal connections. As a result, communication and collaboration in the workplace improve significantly, leading to better project outcomes.",
        sample_answer_vi: "Tôi nghĩ rằng việc các công ty tổ chức các hoạt động xây dựng đội nhóm là rất quan trọng. Lợi ích chính là những hoạt động này giúp các đồng nghiệp hiểu nhau hơn bên ngoài môi trường làm việc chính thức. Ví dụ, khi các thành viên trong đội tham gia các trò chơi nhóm hoặc hoạt động ngoài trời, họ phát triển những kết nối cá nhân mạnh mẽ hơn. Kết quả là, giao tiếp và hợp tác tại nơi làm việc được cải thiện đáng kể, dẫn đến kết quả dự án tốt hơn.",
        sample_outline_en: `1. Introduction: State that team-building activities are essential.\n2. Body Paragraph 1: Helps colleagues know each other better outside work.\n3. Body Paragraph 2: Improves workplace communication and collaboration.\n4. Conclusion: Team-building leads to better project outcomes and workplace relationships.`,
        sample_outline_vi: `1. Mở bài: Nêu rằng hoạt động xây dựng đội nhóm là cần thiết.\n2. Thân bài 1: Giúp đồng nghiệp hiểu nhau hơn bên ngoài công việc.\n3. Thân bài 2: Cải thiện giao tiếp và hợp tác tại nơi làm việc.\n4. Kết bài: Xây dựng đội nhóm dẫn đến kết quả dự án tốt hơn và mối quan hệ nơi làm việc.`,
        vocabulary: [
            { word: 'essential', ipa: '/ɪˈsenʃl/', pos: 'adj.', vi: 'cần thiết, quan trọng' },
            { word: 'team-building', ipa: '/tiːm ˈbɪldɪŋ/', pos: 'n.', vi: 'xây dựng đội nhóm' },
            { word: 'collaboration', ipa: '/kəˌlæbəˈreɪʃn/', pos: 'n.', vi: 'sự hợp tác' },
            { word: 'outcomes', ipa: '/ˈaʊtkʌmz/', pos: 'n.', vi: 'kết quả, hậu quả' }
        ],
        practice: {
            reorder: [
                { words: [{en:"Team-building activities", vi:"Hoạt động xây dựng đội nhóm"}, {en:"improve", vi:"cải thiện"}, {en:"workplace", vi:"nơi làm việc"}, {en:"communication", vi:"giao tiếp"}, {en:"significantly.", vi:"đáng kể."}], answer: "Team-building activities improve workplace communication significantly." },
                { words: [{en:"Colleagues", vi:"Đồng nghiệp"}, {en:"develop", vi:"phát triển"}, {en:"stronger", vi:"mạnh mẽ hơn"}, {en:"personal", vi:"cá nhân"}, {en:"connections.", vi:"kết nối."}], answer: "Colleagues develop stronger personal connections." }
            ],
            fill_blank: [
                { sentence: { en: "Team-building activities are ____ for workplace harmony.", vi: "Hoạt động xây dựng đội nhóm ____ cho sự hòa hợp nơi làm việc." }, missing_word: 'essential', options: ['essential', 'harmful', 'unnecessary', 'expensive'] },
                { sentence: { en: "These activities help improve ____ among team members.", vi: "Những hoạt động này giúp cải thiện ____ giữa các thành viên trong đội." }, missing_word: 'collaboration', options: ['collaboration', 'competition', 'conflict', 'confusion'] }
            ],
            find_error: [
                { sentence: { en: "Team-building help colleagues work better together.", vi: "Xây dựng đội nhóm giúp đồng nghiệp làm việc tốt hơn cùng nhau." }, error_word: 'help', correct_word: 'helps' },
                { sentence: { en: "These activities is beneficial for team spirit.", vi: "Những hoạt động này có lợi cho tinh thần đội nhóm." }, error_word: 'is', correct_word: 'are' }
            ],
            choose_phrase: [
                { question: { en: 'Complete: I think team-building activities are _____ for companies.', vi: 'Hoàn thành: Tôi nghĩ hoạt động xây dựng đội nhóm _____ cho các công ty.' }, options: [{ en: 'essential', vi: 'cần thiết' }, { en: 'harmful', vi: 'có hại' }, { en: 'unnecessary', vi: 'không cần thiết' }, { en: 'expensive', vi: 'đắt đỏ' }], correct: 0 },
                { question: { en: 'Complete: The main benefit is that these activities _____ team relationships.', vi: 'Hoàn thành: Lợi ích chính là những hoạt động này _____ mối quan hệ đội nhóm.' }, options: [{ en: 'damage', vi: 'làm hỏng' }, { en: 'strengthen', vi: 'tăng cường' }, { en: 'ignore', vi: 'bỏ qua' }, { en: 'complicate', vi: 'làm phức tạp' }], correct: 1 }
            ],
            matching: [
                { col_a: [{ en: 'Personal connections', vi: 'Kết nối cá nhân' }, { en: 'Team collaboration', vi: 'Hợp tác đội nhóm' }, { en: 'Project outcomes', vi: 'Kết quả dự án' }], col_b: [{ en: 'better results achieved', vi: 'đạt được kết quả tốt hơn' }, { en: 'stronger relationships built', vi: 'xây dựng mối quan hệ mạnh mẽ hơn' }, { en: 'improved teamwork skills', vi: 'cải thiện kỹ năng làm việc nhóm' }, { en: 'extra distractor', vi: 'từ gây nhiễu' }] }
            ],
            drag_drop: [
                { sentence_parts: [{ en: 'workplace communication', vi: 'giao tiếp nơi làm việc' }, { en: 'Team-building activities improve', vi: 'Hoạt động xây dựng đội nhóm cải thiện' }, { en: 'significantly.', vi: 'đáng kể.' }], correct_order: 'Team-building activities improve workplace communication significantly.' }
            ]
        }
    }
};