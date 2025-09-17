import { WritingSeed } from '../../types';

type WritingSeedContent = Pick<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const vstepTask2Content: Record<string, WritingSeedContent> = {
    'VSTEP-T2-OPN-01': {
        sample_answer_en: "In recent years, online learning has emerged as a popular alternative to traditional classroom-based education. While both methods have their merits, I am of the opinion that traditional learning remains more effective for a comprehensive educational experience.\n\nOn the one hand, online learning offers undeniable flexibility and accessibility. Students can learn from anywhere at any time, which is particularly beneficial for working professionals or those with family commitments. For example, a parent can attend a university course from home without needing childcare. This mode of learning also provides access to a wider range of courses from institutions around the world.\n\nOn the other hand, traditional learning fosters crucial interpersonal skills and provides immediate support. The face-to-face interaction with teachers and peers is invaluable for collaborative projects, debates, and developing communication skills. Furthermore, students in a classroom can receive instant feedback and clarification from their instructors, which can prevent misunderstanding and enhance the learning process.\n\nIn conclusion, although online education provides convenience, I believe the interactive and supportive environment of a traditional classroom is more conducive to holistic learning and skill development.",
        sample_answer_vi: "Trong những năm gần đây, học trực tuyến đã nổi lên như một sự thay thế phổ biến cho giáo dục truyền thống tại lớp học. Mặc dù cả hai phương pháp đều có giá trị riêng, tôi cho rằng học tập truyền thống vẫn hiệu quả hơn để có một trải nghiệm giáo dục toàn diện.\n\nMột mặt, học trực tuyến mang lại sự linh hoạt và khả năng tiếp cận không thể phủ nhận. Sinh viên có thể học từ bất cứ đâu vào bất cứ lúc nào, điều này đặc biệt có lợi cho những người đang đi làm hoặc có các cam kết gia đình. Ví dụ, một phụ huynh có thể tham gia một khóa học đại học từ nhà mà không cần dịch vụ trông trẻ. Hình thức học này cũng cung cấp quyền truy cập vào một loạt các khóa học rộng hơn từ các tổ chức trên khắp thế giới.\n\nMặt khác, học tập truyền thống nuôi dưỡng các kỹ năng giao tiếp giữa các cá nhân và cung cấp sự hỗ trợ tức thì. Sự tương tác trực tiếp với giáo viên và bạn bè là vô giá cho các dự án hợp tác, các cuộc tranh luận và phát triển kỹ năng giao tiếp. Hơn nữa, sinh viên trong một lớp học có thể nhận được phản hồi và làm rõ ngay lập tức từ giảng viên của họ, điều này có thể ngăn chặn sự hiểu lầm và nâng cao quá trình học tập.\n\nKết luận, mặc dù giáo dục trực tuyến mang lại sự tiện lợi, tôi tin rằng môi trường tương tác và hỗ trợ của một lớp học truyền thống có lợi hơn cho việc học tập toàn diện và phát triển kỹ năng.",
        sample_outline_en: `1. Introduction:
   - Introduce the topic: Online vs. traditional learning.
   - State opinion: Traditional learning is more effective.
2. Body Paragraph 1 (Counter-argument):
   - Acknowledge benefits of online learning.
   - Point 1: Flexibility (good for working adults).
   - Point 2: Accessibility (access to global courses).
3. Body Paragraph 2 (Main argument):
   - Argue for traditional learning.
   - Point 1: Fosters interpersonal skills (collaboration, debate).
   - Point 2: Provides immediate feedback and support from instructors.
4. Conclusion:
   - Summarize main points.
   - Restate opinion: Traditional classrooms are more conducive to holistic learning.`,
        sample_outline_vi: `1. Mở bài:
   - Giới thiệu chủ đề: Học trực tuyến so với học truyền thống.
   - Nêu quan điểm: Học truyền thống hiệu quả hơn.
2. Thân bài 1 (Lập luận phản biện):
   - Ghi nhận lợi ích của học trực tuyến.
   - Luận điểm 1: Linh hoạt (tốt cho người đi làm).
   - Luận điểm 2: Dễ tiếp cận (tiếp cận các khóa học toàn cầu).
3. Thân bài 2 (Lập luận chính):
   - Bênh vực cho học truyền thống.
   - Luận điểm 1: Nuôi dưỡng kỹ năng giao tiếp (hợp tác, tranh luận).
   - Luận điểm 2: Cung cấp phản hồi và hỗ trợ tức thì từ giảng viên.
4. Kết bài:
   - Tóm tắt các ý chính.
   - Khẳng định lại quan điểm: Lớp học truyền thống có lợi hơn cho việc học tập toàn diện.`,
        vocabulary: [
            { word: 'flexibility', ipa: '/ˌfleksəˈbɪləti/', pos: 'n.', vi: 'sự linh hoạt' },
            { word: 'accessibility', ipa: '/əkˌsesəˈbɪləti/', pos: 'n.', vi: 'khả năng tiếp cận' },
            { word: 'foster', ipa: '/ˈfɒstə(r)/', pos: 'v.', vi: 'nuôi dưỡng, thúc đẩy' },
            { word: 'interpersonal skills', ipa: '/ˌɪntəˈpɜːsənl skɪlz/', pos: 'n. phr.', vi: 'kỹ năng giao tiếp giữa các cá nhân' },
            { word: 'invaluable', ipa: '/ɪnˈvæljuəbl/', pos: 'adj.', vi: 'vô giá' },
            { word: 'conducive to', ipa: '/kənˈdjuːsɪv tuː/', pos: 'adj. phr.', vi: 'có lợi cho, thuận lợi cho' }
        ],
        practice: { 
            reorder: [{ words: [{en:"Traditional", vi: "Truyền thống"}, {en:"learning", vi: "học tập"}, {en:"fosters", vi: "nuôi dưỡng"}, {en:"crucial", vi: "quan trọng"}, {en:"interpersonal", vi: "giữa các cá nhân"}, {en:"skills.", vi: "kỹ năng."}], answer: "Traditional learning fosters crucial interpersonal skills." }]
        } 
    },
    'VSTEP-T2-ADD-01': { 
        sample_answer_en: "Living in a big city offers numerous advantages, but it also comes with several significant disadvantages. The primary benefit is the abundance of career opportunities. Major companies and industries tend to be concentrated in urban areas, providing a diverse job market. However, a major drawback is the high cost of living, especially for housing, which can be a financial burden. Another advantage is the access to better facilities, such as top universities, specialized hospitals, and a wide range of entertainment options. On the other hand, city life is often associated with high levels of stress due to factors like traffic congestion and a fast-paced lifestyle. In conclusion, while city living provides unparalleled opportunities, one must be prepared to cope with its financial and mental pressures.",
        sample_answer_vi: "Sống ở một thành phố lớn mang lại nhiều lợi thế, nhưng cũng đi kèm với một số nhược điểm đáng kể. Lợi ích chính là sự phong phú của các cơ hội nghề nghiệp. Các công ty và ngành công nghiệp lớn có xu hướng tập trung ở các khu vực đô thị, tạo ra một thị trường việc làm đa dạng. Tuy nhiên, một nhược điểm lớn là chi phí sinh hoạt cao, đặc biệt là nhà ở, có thể là một gánh nặng tài chính. Một lợi thế khác là khả năng tiếp cận các cơ sở vật chất tốt hơn, chẳng hạn như các trường đại học hàng đầu, bệnh viện chuyên khoa và nhiều lựa chọn giải trí. Mặt khác, cuộc sống thành phố thường gắn liền với mức độ căng thẳng cao do các yếu tố như ùn tắc giao thông và lối sống hối hả. Tóm lại, trong khi cuộc sống thành thị mang lại những cơ hội không gì sánh bằng, người ta phải chuẩn bị để đối phó với những áp lực tài chính và tinh thần của nó.",
        practice: {
            fill_blank: [{ sentence: { en: 'A major drawback is the high ____ of living.', vi: 'Một nhược điểm lớn là ____ sinh hoạt cao.' }, missing_word: 'cost', options: ['cost', 'price', 'value'] }]
        }
    },
    'VSTEP-T2-PRS-01': { 
        sample_answer_en: "Traffic congestion is a critical problem plaguing many modern cities, arising from several key causes. One of the main causes is the over-reliance on private vehicles, as public transport systems are often inadequate or inconvenient. This leads to an excessive number of cars on the road. To address this, a multi-faceted solution is required. A possible solution would be for governments to invest heavily in improving public transportation, making it more reliable, affordable, and extensive. For instance, expanding subway networks and creating dedicated bus lanes could encourage more people to leave their cars at home. Additionally, promoting flexible working hours could help to reduce traffic during peak times.",
        sample_answer_vi: "Ùn tắc giao thông là một vấn đề nghiêm trọng đang gây khó khăn cho nhiều thành phố hiện đại, phát sinh từ một số nguyên nhân chính. Một trong những nguyên nhân chính là sự phụ thuộc quá mức vào phương tiện cá nhân, vì hệ thống giao thông công cộng thường không đủ hoặc bất tiện. Điều này dẫn đến số lượng xe ô tô quá lớn trên đường. Để giải quyết vấn đề này, cần có một giải pháp đa diện. Một giải pháp khả thi là chính phủ nên đầu tư mạnh vào việc cải thiện giao thông công cộng, làm cho nó đáng tin cậy, giá cả phải chăng và mở rộng hơn. Ví dụ, việc mở rộng mạng lưới tàu điện ngầm và tạo ra các làn đường dành riêng cho xe buýt có thể khuyến khích nhiều người để xe ở nhà hơn. Ngoài ra, việc thúc đẩy giờ làm việc linh hoạt có thể giúp giảm lưu lượng giao thông trong giờ cao điểm.",
        practice: {
            find_error: [{ sentence: { en: 'One of the main cause is over-reliance.', vi: 'Một trong những nguyên nhân chính là sự phụ thuộc quá mức.' }, error_word: 'cause', correct_word: 'causes' }]
        }
    },
    'VSTEP-T2-DIS-01': { 
        sample_answer_en: "The debate over the ideal climate is a matter of personal preference, with valid arguments for both hot and cold environments. On the one hand, proponents of hot climates often praise the abundance of sunshine and opportunities for outdoor activities year-round, which can lead to a more active and social lifestyle. Conversely, those who favor cold climates appreciate the changing seasons, the beauty of snow, and the cozy feeling of being indoors during winter. In my opinion, while the constant warmth is appealing, the variety and distinct beauty of four seasons make colder climates more interesting to live in.", 
        sample_answer_vi: "Cuộc tranh luận về khí hậu lý tưởng là một vấn đề sở thích cá nhân, với những lập luận hợp lý cho cả môi trường nóng và lạnh. Một mặt, những người ủng hộ khí hậu nóng thường ca ngợi sự dồi dào của ánh nắng mặt trời và các cơ hội cho các hoạt động ngoài trời quanh năm, điều này có thể dẫn đến một lối sống năng động và xã hội hơn. Ngược lại, những người ưa thích khí hậu lạnh đánh giá cao sự thay đổi của các mùa, vẻ đẹp của tuyết, và cảm giác ấm cúng khi ở trong nhà vào mùa đông. Theo tôi, mặc dù sự ấm áp liên tục rất hấp dẫn, sự đa dạng và vẻ đẹp riêng biệt của bốn mùa làm cho các vùng khí hậu lạnh trở nên thú vị hơn để sinh sống.",
        practice: {
            choose_phrase: [{ sentence: { en: '____, those who favor cold climates appreciate the changing seasons.', vi: '____, những người ưa thích khí hậu lạnh đánh giá cao sự thay đổi của các mùa.' }, correct_phrase: 'Conversely', options: ['Therefore', 'Additionally', 'Conversely'] }]
        }
    }
};
