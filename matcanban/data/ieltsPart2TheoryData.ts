import { IeltsPart2TheoryQuestion } from '../../types';

export const ieltsPart2TheoryData: IeltsPart2TheoryQuestion[] = [
    {
        id: 1,
        question: 'Thí sinh có bao nhiêu thời gian để chuẩn bị cho bài nói Part 2?',
        options: [ { key: 'A', text: '30 giây' }, { key: 'B', text: '1 phút' }, { key: 'C', text: '2 phút' }, { key: 'D', text: 'Không có thời gian chuẩn bị' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Bạn sẽ có đúng 1 phút để đọc cue card, suy nghĩ ý tưởng và ghi chú trước khi bắt đầu nói.'
    },
    {
        id: 2,
        question: 'Thí sinh cần nói trong bao lâu ở Part 2?',
        options: [ { key: 'A', text: '30-60 giây' }, { key: 'B', text: '1-2 phút' }, { key: 'C', text: '3-4 phút' }, { key: 'D', text: 'Cho đến khi giám khảo yêu cầu dừng' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Bạn được yêu cầu nói trong khoảng từ 1 đến 2 phút. Giám khảo sẽ ra hiệu cho bạn dừng lại khi hết 2 phút.'
    },
    {
        id: 3,
        question: 'Mục đích chính của việc ghi chú trong 1 phút chuẩn bị là gì?',
        options: [ { key: 'A', text: 'Viết ra toàn bộ bài nói.' }, { key: 'B', text: 'Viết ra các từ khóa và ý chính để làm dàn bài.' }, { key: 'C', text: 'Vẽ một bức tranh liên quan đến chủ đề.' }, { key: 'D', text: 'Viết ra các câu hỏi cho giám khảo.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Ghi chú nên tập trung vào các từ khóa (keywords) và ý chính cho mỗi gạch đầu dòng trong cue card để giúp bạn cấu trúc bài nói và không quên ý.'
    },
    {
        id: 4,
        question: 'Cấu trúc bài nói Part 2 hiệu quả nên bao gồm những gì?',
        options: [ { key: 'A', text: 'Chỉ trả lời 4 gạch đầu dòng.' }, { key: 'B', text: 'Một câu mở đầu ngắn, lần lượt trả lời các gợi ý trong cue card, và một câu kết luận.' }, { key: 'C', text: 'Chỉ nói về một gạch đầu dòng duy nhất thật chi tiết.' }, { key: 'D', text: 'Chỉ nói phần kết luận.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Một bài nói tốt cần có cấu trúc rõ ràng: Mở đầu (giới thiệu chủ đề), Thân bài (lần lượt phát triển các ý trong cue card), và Kết luận (tóm tắt cảm xúc/suy nghĩ).'
    },
    {
        id: 5,
        question: 'Thì (tense) nào thường được sử dụng nhiều nhất trong Part 2?',
        options: [ { key: 'A', text: 'Hiện tại đơn' }, { key: 'B', text: 'Tương lai đơn' }, { key: 'C', text: 'Quá khứ đơn và các thì quá khứ khác' }, { key: 'D', text: 'Hiện tại hoàn thành' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Hầu hết các chủ đề Part 2 đều yêu cầu bạn kể lại một trải nghiệm hoặc sự việc trong quá khứ, do đó các thì quá khứ (Past Simple, Past Continuous, Past Perfect) là rất quan trọng.'
    },
    {
        id: 6,
        question: 'Bạn có bắt buộc phải nói về TẤT CẢ các điểm gợi ý trong cue card không?',
        options: [ { key: 'A', text: 'Có, nếu bỏ qua một điểm sẽ bị trừ điểm nặng.' }, { key: 'B', text: 'Không, chúng chỉ là gợi ý để giúp bạn cấu trúc bài nói.' }, { key: 'C', text: 'Chỉ cần nói về điểm đầu tiên và cuối cùng.' }, { key: 'D', text: 'Có, và phải nói theo đúng thứ tự.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Các gạch đầu dòng là để HỖ TRỢ bạn. Quan trọng hơn là bạn phải nói một cách trôi chảy và mạch lạc về chủ đề chính. Tuy nhiên, việc bám theo các gợi ý sẽ giúp bài nói của bạn có cấu trúc tốt hơn.'
    },
    {
        id: 7,
        question: 'Nếu bạn nói chưa đến 1 phút, điều gì có thể xảy ra?',
        options: [ { key: 'A', text: 'Không sao cả.' }, { key: 'B', text: 'Bạn sẽ bị trừ điểm vì không thể nói dài (fluency).' }, { key: 'C', text: 'Giám khảo sẽ cho bạn thêm thời gian.' }, { key: 'D', text: 'Bạn sẽ được điểm cao hơn vì nói ngắn gọn.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Nói quá ngắn cho thấy bạn không có khả năng phát triển ý và nói dài, điều này sẽ ảnh hưởng tiêu cực đến điểm Fluency and Coherence của bạn.'
    },
    {
        id: 8,
        question: 'Sau khi bạn kết thúc bài nói 2 phút, giám khảo sẽ làm gì?',
        options: [ { key: 'A', text: 'Chuyển ngay sang Part 3.' }, { key: 'B', text: 'Cho bạn nhận xét về bài nói.' }, { key: 'C', text: 'Hỏi một hoặc hai câu hỏi ngắn liên quan trực tiếp đến chủ đề bạn vừa nói.' }, { key: 'D', text: 'Kết thúc bài thi.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Sau phần nói dài, giám khảo sẽ hỏi 1-2 câu hỏi ngắn gọn (rounding-off questions) để kết thúc chủ đề Part 2 trước khi chuyển sang phần thảo luận sâu hơn ở Part 3.'
    },
    {
        id: 9,
        question: 'Trong 1 phút chuẩn bị, bạn nên ưu tiên ghi chú điều gì?',
        options: [ { key: 'A', text: 'Các câu hoàn chỉnh.' }, { key: 'B', text: 'Từ vựng "khủng" liên quan đến chủ đề.' }, { key: 'C', text: 'Ý tưởng chính cho mỗi gạch đầu dòng.' }, { key: 'D', text: 'Tất cả các đáp án trên.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Ưu tiên hàng đầu là có ý tưởng cho tất cả các phần để đảm bảo bạn có đủ nội dung để nói. Từ vựng tốt có thể được thêm vào nếu còn thời gian.'
    },
    {
        id: 10,
        question: 'Nếu bạn hết ý để nói trước khi hết 2 phút, bạn nên làm gì?',
        options: [ { key: 'A', text: 'Dừng nói và im lặng.' }, { key: 'B', text: 'Lặp lại những gì bạn vừa nói.' }, { key: 'C', text: 'Mở rộng bằng cách nói về cảm xúc của bạn, hoặc một câu chuyện/ví dụ liên quan.' }, { key: 'D', text: 'Hỏi giám khảo một câu hỏi.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Luôn chuẩn bị sẵn các cách để mở rộng, ví dụ như "This reminds me of another time when..." hoặc "The reason I felt this way was because...". Điều này giúp bạn tiếp tục nói một cách tự nhiên.'
    },
    {
        id: 11,
        question: 'Câu mở đầu tốt cho Part 2 nên như thế nào?',
        options: [ { key: 'A', text: 'Bắt đầu trả lời ngay gạch đầu dòng đầu tiên.' }, { key: 'B', text: 'Diễn giải lại chủ đề chính bằng lời của bạn. (e.g., "I\'d like to talk about a time when...")' }, { key: 'C', text: 'Nói "My topic is..."' }, { key: 'D', text: 'Hỏi giám khảo xem bạn có thể bắt đầu chưa.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Một câu mở đầu tự nhiên bằng cách diễn giải lại đề bài ("I\'m going to describe a situation where...") sẽ tạo ấn tượng tốt và giúp bạn bắt đầu bài nói một cách trôi chảy.'
    },
    {
        id: 12,
        question: 'Bạn có được nhìn vào ghi chú của mình khi đang nói không?',
        options: [ { key: 'A', text: 'Không, bạn phải nhìn thẳng vào giám khảo.' }, { key: 'B', text: 'Có, bạn có thể liếc nhanh vào ghi chú để gợi nhớ ý, nhưng không nên đọc trực tiếp từ đó.' }, { key: 'C', text: 'Có, bạn có thể đọc toàn bộ bài nói từ ghi chú.' }, { key: 'D', text: 'Chỉ được nhìn vào 5 giây đầu tiên.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Ghi chú là công cụ hỗ trợ của bạn. Hãy dùng nó để gợi nhớ các từ khóa và ý chính, nhưng cố gắng duy trì giao tiếp bằng mắt với giám khảo để bài nói tự nhiên hơn.'
    },
    {
        id: 13,
        question: 'Câu kết luận cho Part 2 nên làm gì?',
        options: [ { key: 'A', text: 'Lặp lại câu mở đầu.' }, { key: 'B', text: 'Tóm tắt lại tất cả các ý đã nói.' }, { key: 'C', text: 'Nói một câu ngắn gọn về cảm xúc hoặc suy nghĩ của bạn về chủ đề đó.' }, { key: 'D', text: 'Không cần câu kết luận.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Một câu kết luận ngắn gọn như "Overall, it was an unforgettable experience and I hope to do it again someday" là đủ để kết thúc bài nói một cách tự nhiên.'
    },
    {
        id: 14,
        question: 'Giám khảo có tham gia vào cuộc trò chuyện trong 2 phút nói của bạn không?',
        options: [ { key: 'A', text: 'Có, họ sẽ hỏi các câu hỏi xen kẽ.' }, { key: 'B', text: 'Không, họ sẽ chỉ lắng nghe và không ngắt lời trừ khi bạn nói quá dài hoặc lạc đề.' }, { key: 'C', text: 'Họ sẽ gật đầu và đồng ý với mọi điều bạn nói.' }, { key: 'D', text: 'Họ sẽ sửa lỗi sai của bạn ngay lập tức.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Part 2 là phần nói độc thoại (long turn) của bạn. Giám khảo sẽ giữ im lặng và chỉ ra hiệu khi hết thời gian.'
    },
    {
        id: 15,
        question: 'Nếu cue card yêu cầu mô tả một cái gì đó bạn chưa từng trải qua, bạn nên làm gì?',
        options: [ { key: 'A', text: 'Nói với giám khảo bạn không thể trả lời và yêu cầu đổi đề.' }, { key: 'B', text: 'Bịa ra một câu chuyện một cách hợp lý và tự tin.' }, { key: 'C', text: 'Im lặng.' }, { key: 'D', text: 'Nói về một chủ đề hoàn toàn khác.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! IELTS Speaking kiểm tra khả năng ngôn ngữ, không phải kiến thức hay sự thật. Hãy thoải mái tưởng tượng ra một câu chuyện hợp lý và kể nó một cách thuyết phục.'
    },
    {
        id: 16,
        question: 'Từ nối (discourse markers) như "Firstly," "Moreover," "Finally," có nên được dùng trong Part 2 không?',
        options: [
            { key: 'A', text: 'Không, chúng quá trang trọng.' },
            { key: 'B', text: 'Có, chúng giúp bài nói có cấu trúc và mạch lạc hơn.' },
            { key: 'C', text: 'Chỉ nên dùng "And".' },
            { key: 'D', text: 'Chỉ dùng khi nói về một quy trình.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Sử dụng từ nối giúp giám khảo dễ dàng theo dõi dòng suy nghĩ của bạn, thể hiện sự mạch lạc (Coherence) và cải thiện điểm số.'
    },
    {
        id: 17,
        question: 'Nếu bạn đã trả lời hết các gợi ý trong cue card nhưng vẫn còn thời gian?',
        options: [
            { key: 'A', text: 'Nói "I have finished."' },
            { key: 'B', text: 'Lặp lại chính xác những gì đã nói.' },
            { key: 'C', text: 'Thêm chi tiết, cảm xúc cá nhân, hoặc một câu chuyện nhỏ liên quan.' },
            { key: 'D', text: 'Nhìn giám khảo và im lặng chờ.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Luôn cố gắng nói cho đến khi giám khảo ra hiệu dừng. Mở rộng bằng cách thêm chi tiết hoặc cảm nhận cá nhân là cách tốt nhất để lấp đầy thời gian.'
    },
    {
        id: 18,
        question: 'Câu hỏi ở cuối Part 2 (rounding-off question) thường hỏi về điều gì?',
        options: [
            { key: 'A', text: 'Một chủ đề hoàn toàn mới.' },
            { key: 'B', text: 'Một câu hỏi ngắn, trực tiếp liên quan đến những gì bạn vừa trình bày.' },
            { key: 'C', text: 'Một câu hỏi về ngữ pháp bạn đã dùng.' },
            { key: 'D', text: 'Một câu hỏi về quê hương bạn.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Giám khảo sẽ hỏi một câu hỏi ngắn gọn để kết thúc chủ đề, ví dụ: "Is this a popular activity in your country?"'
    },
    {
        id: 19,
        question: 'Chiến lược ghi chú "Mind Map" trong 1 phút chuẩn bị có hiệu quả không?',
        options: [
            { key: 'A', text: 'Không, nó quá tốn thời gian.' },
            { key: 'B', text: 'Có, nó giúp liên kết các ý tưởng một cách trực quan và dễ dàng hơn cho việc phát triển bài nói.' },
            { key: 'C', text: 'Chỉ hiệu quả với các chủ đề về nghệ thuật.' },
            { key: 'D', text: 'Viết thành câu đầy đủ luôn tốt hơn.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Sơ đồ tư duy (mind map) giúp bạn nhanh chóng ghi lại các ý tưởng chính và các từ vựng liên quan một cách có tổ chức, dễ nhìn hơn là viết thành dòng.'
    },
    {
        id: 20,
        question: 'Khi mô tả một người, bạn nên tập trung vào điều gì?',
        options: [
            { key: 'A', text: 'Chỉ mô tả ngoại hình.' },
            { key: 'B', text: 'Chỉ mô tả tính cách.' },
            { key: 'C', text: 'Kết hợp mô tả ngoại hình, tính cách và kể một câu chuyện ngắn để minh họa cho tính cách đó.' },
            { key: 'D', text: 'Chỉ nói về mối quan hệ của bạn với người đó.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Một bài mô tả người hoàn chỉnh nên bao gồm cả ngoại hình và tính cách. Quan trọng hơn, hãy kể một kỷ niệm ngắn để chứng minh cho những tính cách bạn nêu, điều này làm bài nói sinh động hơn.'
    },
    {
        id: 21,
        question: 'Nếu bạn nói quá 2 phút, giám khảo sẽ làm gì?',
        options: [
            { key: 'A', text: 'Để bạn nói cho đến khi bạn tự dừng lại.' },
            { key: 'B', text: 'Trừ điểm nặng vì không quản lý thời gian.' },
            { key: 'C', text: 'Lịch sự ngắt lời bạn và chuyển sang phần tiếp theo.' },
            { key: 'D', text: 'Yêu cầu bạn tóm tắt lại trong 10 giây.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Giám khảo sẽ lịch sự ngắt lời bạn. Đây là một điều hoàn toàn bình thường và không ảnh hưởng tiêu cực đến điểm số của bạn. Nó cho thấy bạn có nhiều điều để nói.'
    },
    {
        id: 22,
        question: 'Tại sao việc kể một câu chuyện (storytelling) lại hiệu quả trong Part 2?',
        options: [
            { key: 'A', text: 'Vì nó giúp câu giờ.' },
            { key: 'B', text: 'Vì giám khảo thích nghe chuyện.' },
            { key: 'C', text: 'Vì nó giúp bạn sử dụng đa dạng các thì (đặc biệt là thì quá khứ) và làm bài nói hấp dẫn, mạch lạc hơn.' },
            { key: 'D', text: 'Vì nó dễ hơn là mô tả.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Kể chuyện là một cách tự nhiên để cấu trúc bài nói, sử dụng nhiều thì quá khứ, và thể hiện cảm xúc, giúp bạn đạt điểm cao ở cả 4 tiêu chí.'
    },
    {
        id: 23,
        question: 'Bạn có nên dùng những từ vựng rất phức tạp mà bạn không chắc chắn về cách dùng không?',
        options: [
            { key: 'A', text: 'Có, để gây ấn tượng với giám khảo.' },
            { key: 'B', text: 'Không, thà dùng từ đơn giản hơn mà chính xác còn hơn là dùng từ phức tạp mà sai.' },
            { key: 'C', text: 'Chỉ dùng khi bạn không còn từ nào khác.' },
            { key: 'D', text: 'Có, vì giám khảo sẽ sửa cho bạn.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Sự chính xác (Accuracy) là rất quan trọng. Dùng sai một từ khó sẽ bị đánh giá thấp hơn là dùng đúng một từ đơn giản hơn. Hãy chỉ dùng những từ bạn thực sự hiểu.'
    },
    {
        id: 24,
        question: 'Trong 1 phút chuẩn bị, bạn nên viết bằng tiếng Anh hay tiếng Việt?',
        options: [
            { key: 'A', text: 'Chỉ tiếng Việt để suy nghĩ nhanh hơn.' },
            { key: 'B', text: 'Chỉ tiếng Anh để luyện tập.' },
            { key: 'C', text: 'Nên viết bằng tiếng Anh, vì nó giúp bạn không phải dịch trong đầu khi nói.' },
            { key: 'D', text: 'Viết cả hai thứ tiếng.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Ghi chú bằng tiếng Anh (dù chỉ là từ khóa) sẽ giúp bạn chuyển ý tưởng thành lời nói nhanh hơn, tránh việc phải dịch từ tiếng Việt sang tiếng Anh trong đầu, vốn làm giảm độ trôi chảy.'
    },
    {
        id: 25,
        question: 'Để mô tả cảm xúc, cách nào sau đây hiệu quả hơn?',
        options: [
            { key: 'A', text: 'Nói "I was very happy."' },
            { key: 'B', text: 'Sử dụng từ vựng mạnh hơn như "I was thrilled" hoặc "I was on cloud nine."' },
            { key: 'C', text: 'Chỉ cười để thể hiện cảm xúc.' },
            { key: 'D', text: 'Nói "My feeling was happy."' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Sử dụng từ vựng mô tả cảm xúc một cách cụ thể và mạnh mẽ (ví dụ: thrilled, delighted, ecstatic) sẽ giúp bạn đạt điểm cao hơn ở tiêu chí Lexical Resource.'
    },
    {
        id: 26,
        question: 'Điều gì KHÔNG được cung cấp cho bạn trong 1 phút chuẩn bị?',
        options: [
            { key: 'A', text: 'Cue card (thẻ gợi ý)' },
            { key: 'B', text: 'Giấy nháp' },
            { key: 'C', text: 'Bút chì' },
            { key: 'D', text: 'Từ điển' }
        ],
        correctAnswer: 'D',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Bạn sẽ được cung cấp cue card, giấy và bút chì, nhưng không được phép sử dụng bất kỳ tài liệu tham khảo nào, bao gồm cả từ điển.'
    },
    {
        id: 27,
        question: 'Khi bạn bắt đầu nói, bạn nên bắt đầu bằng gạch đầu dòng nào?',
        options: [
            { key: 'A', text: 'Luôn bắt đầu bằng gạch đầu dòng đầu tiên.' },
            { key: 'B', text: 'Bắt đầu bằng gạch đầu dòng cuối cùng.' },
            { key: 'C', text: 'Bạn có thể bắt đầu bằng bất kỳ gạch đầu dòng nào, miễn là bài nói logic.' },
            { key: 'D', text: 'Không cần theo gạch đầu dòng.' }
        ],
        correctAnswer: 'A',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Mặc dù các gạch đầu dòng là gợi ý, việc trả lời chúng theo thứ tự sẽ giúp bài nói của bạn có cấu trúc rõ ràng và logic nhất, dễ dàng cho giám khảo theo dõi.'
    },
    {
        id: 28,
        question: 'Gạch đầu dòng cuối cùng trong cue card thường yêu cầu bạn làm gì?',
        options: [
            { key: 'A', text: 'Mô tả ngoại hình.' },
            { key: 'B', text: 'Giải thích cảm xúc hoặc tầm quan trọng của chủ đề.' },
            { key: 'C', text: 'Nêu một con số cụ thể.' },
            { key: 'D', text: 'So sánh với một chủ đề khác.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Gạch đầu dòng cuối cùng thường là phần quan trọng nhất, yêu cầu bạn phản ánh và giải thích sâu hơn về chủ đề, ví dụ "and explain why it was so memorable".'
    },
    {
        id: 29,
        question: 'Tại sao việc sử dụng đa dạng các cấu trúc câu lại quan trọng trong Part 2?',
        options: [
            { key: 'A', text: 'Để làm cho bài nói dài hơn.' },
            { key: 'B', text: 'Để thể hiện khả năng ngữ pháp của bạn (Grammatical Range).' },
            { key: 'C', text: 'Để giám khảo không bị chán.' },
            { key: 'D', text: 'Để dễ phát âm hơn.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Việc sử dụng kết hợp câu đơn, câu ghép và câu phức (ví dụ: mệnh đề quan hệ, câu điều kiện) cho thấy bạn có khả năng kiểm soát ngữ pháp tốt và sẽ được điểm cao hơn.'
    },
    {
        id: 30,
        question: 'Nếu chủ đề là về một vật bạn sở hữu, bạn có nên chỉ mô tả nó không?',
        options: [
            { key: 'A', text: 'Có, chỉ cần mô tả màu sắc, kích thước.' },
            { key: 'B', text: 'Không, bạn nên kể một câu chuyện về nó (bạn có nó như thế nào, một kỷ niệm với nó).' },
            { key: 'C', text: 'Chỉ nên nói về giá tiền của nó.' },
            { key: 'D', text: 'Chỉ nên so sánh nó với các vật khác.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Một bài nói hay không chỉ là một danh sách các tính từ mô tả. Hãy cá nhân hóa nó bằng cách kể một câu chuyện ngắn, điều này sẽ giúp bài nói của bạn trở nên độc đáo và hấp dẫn hơn.'
    },
    {
        id: 31,
        question: 'Bạn có nên nhìn đồng hồ khi đang nói không?',
        options: [
            { key: 'A', text: 'Có, để kiểm soát thời gian chính xác.' },
            { key: 'B', text: 'Không, việc này có thể làm bạn mất tập trung và trông thiếu tự tin. Hãy để giám khảo quản lý thời gian.' },
            { key: 'C', text: 'Chỉ nên nhìn một lần khi bắt đầu.' },
            { key: 'D', text: 'Có, nên nhìn liên tục.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Việc quản lý thời gian là của giám khảo. Nhiệm vụ của bạn là tập trung vào việc nói một cách trôi chảy và mạch lạc. Nhìn đồng hồ có thể làm gián đoạn dòng chảy của bạn.'
    },
    {
        id: 32,
        question: 'Đâu là cách tốt để bắt đầu phần "explain why..." trong cue card?',
        options: [
            { key: 'A', text: 'The reason is...' },
            { key: 'B', text: 'I think the main reason why this was so special to me was...' },
            { key: 'C', text: 'Because...' },
            { key: 'D', text: 'Now I will explain.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Câu B là một cách diễn đạt đầy đủ và tự nhiên để chuyển sang phần giải thích, thể hiện sự mạch lạc và cấu trúc tốt.'
    },
    {
        id: 33,
        question: 'Sử dụng ngôn ngữ cử chỉ (body language) có giúp ích không?',
        options: [
            { key: 'A', text: 'Không, giám khảo chỉ chấm điểm lời nói.' },
            { key: 'B', text: 'Có, ngôn ngữ cử chỉ tự nhiên (ví dụ: cử chỉ tay) có thể giúp bạn diễn đạt ý tưởng và trông tự tin hơn.' },
            { key: 'C', text: 'Chỉ khi bạn không biết nói gì.' },
            { key: 'D', text: 'Không, nó bị coi là mất lịch sự.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Mặc dù không được chấm điểm trực tiếp, ngôn ngữ cơ thể tự nhiên và tự tin có thể giúp bạn nói trôi chảy hơn và tạo ấn tượng tốt với giám khảo.'
    },
    {
        id: 34,
        question: 'Nếu bạn chợt quên một từ, bạn nên làm gì?',
        options: [
            { key: 'A', text: 'Dừng nói và cố gắng nhớ bằng được.' },
            { key: 'B', text: 'Dùng một từ tiếng Việt.' },
            { key: 'C', text: 'Cố gắng diễn giải (paraphrase) ý đó bằng những từ khác bạn biết.' },
            { key: 'D', text: 'Kết thúc bài nói ngay lập tức.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Khả năng diễn giải là một kỹ năng quan trọng. Thay vì im lặng, hãy cố gắng giải thích ý của bạn bằng những từ đơn giản hơn. Ví dụ: nếu quên từ "architect", bạn có thể nói "a person who designs buildings".'
    },
    {
        id: 35,
        question: 'Chất lượng giọng nói (ví dụ: nói rõ ràng, có năng lượng) có quan trọng không?',
        options: [
            { key: 'A', text: 'Không, chỉ cần nội dung tốt.' },
            { key: 'B', text: 'Có, nói một cách rõ ràng và nhiệt tình sẽ giúp giám khảo dễ nghe và tạo ấn tượng tốt hơn.' },
            { key: 'C', text: 'Bạn nên nói thầm.' },
            { key: 'D', text: 'Chỉ cần nói to là được.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Một giọng nói rõ ràng, đủ lớn và có năng lượng sẽ giúp bạn được đánh giá cao hơn ở tiêu chí Phát âm (Pronunciation) và cả sự tự tin.'
    },
    {
        id: 36,
        question: 'Loại thông tin nào bạn KHÔNG nên đưa vào bài nói Part 2?',
        options: [
            { key: 'A', text: 'Cảm xúc cá nhân.' },
            { key: 'B', text: 'Các chi tiết cụ thể.' },
            { key: 'C', text: 'Các ý kiến chính trị hoặc tôn giáo gây tranh cãi.' },
            { key: 'D', text: 'Một câu chuyện nhỏ.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Giống như Part 1, hãy tránh các chủ đề nhạy cảm. Bài thi chỉ kiểm tra ngôn ngữ, không phải quan điểm cá nhân của bạn về các vấn đề phức tạp.'
    },
    {
        id: 37,
        question: 'Đâu là một cách tốt để thực hành cho Part 2?',
        options: [
            { key: 'A', text: 'Chỉ đọc các bài mẫu.' },
            { key: 'B', text: 'Tự ghi âm lại bài nói của mình, nghe lại và tự đánh giá.' },
            { key: 'C', text: 'Chỉ học từ vựng.' },
            { key: 'D', text: 'Chỉ học ngữ pháp.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Việc ghi âm và nghe lại giúp bạn nhận ra các lỗi về phát âm, ngữ pháp, sự trôi chảy (ví dụ: bạn ngập ngừng ở đâu) và tự sửa lỗi một cách hiệu quả.'
    },
    {
        id: 38,
        question: 'Cue card sẽ được lấy đi khi nào?',
        options: [
            { key: 'A', text: 'Trước khi bạn bắt đầu nói.' },
            { key: 'B', text: 'Sau khi bạn nói xong 2 phút.' },
            { key: 'C', text: 'Bạn được giữ nó cho đến hết bài thi.' },
            { key: 'D', text: 'Sau khi bạn nói được 1 phút.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Bạn có thể giữ cue card và giấy nháp trong suốt 2 phút nói. Giám khảo sẽ lấy lại chúng sau khi Part 2 kết thúc, trước khi bắt đầu Part 3.'
    },
    {
        id: 39,
        question: 'Nếu bạn không có gì để nói về một gạch đầu dòng, bạn nên làm gì?',
        options: [
            { key: 'A', text: 'Nói "I don\'t know" và chuyển sang gạch đầu dòng tiếp theo.' },
            { key: 'B', text: 'Bỏ qua nó hoàn toàn.' },
            { key: 'C', text: 'Cố gắng nói một hoặc hai câu ngắn gọn về nó, dù là ý đơn giản, rồi nhanh chóng chuyển sang phần bạn có nhiều ý hơn.' },
            { key: 'D', text: 'Dừng bài nói.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Cố gắng đề cập đến tất cả các điểm gợi ý, dù chỉ là một chút, để cho thấy bạn đã hiểu yêu cầu. Sau đó, bạn có thể dành nhiều thời gian hơn cho những phần bạn tự tin hơn.'
    },
    {
        id: 40,
        question: 'Mục tiêu chính của Part 2 là để đánh giá khả năng gì của bạn?',
        options: [
            { key: 'A', text: 'Khả năng tranh luận.' },
            { key: 'B', text: 'Khả năng trình bày một chủ đề một cách mạch lạc và có tổ chức trong một khoảng thời gian nhất định.' },
            { key: 'C', text: 'Khả năng trả lời các câu hỏi nhanh.' },
            { key: 'D', text: 'Khả năng ghi nhớ.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Part 2 kiểm tra khả năng độc thoại có cấu trúc của bạn, bao gồm việc phát triển ý, sắp xếp ý tưởng một cách logic và duy trì sự trôi chảy.'
    },
    {
        id: 41,
        question: 'Bạn có nên dùng những câu quá phức tạp mà bạn không quen thuộc không?',
        options: [
            { key: 'A', text: 'Có, để đạt điểm cao.' },
            { key: 'B', text: 'Không, sự trôi chảy và chính xác quan trọng hơn. Hãy dùng những cấu trúc bạn tự tin nhất.' },
            { key: 'C', text: 'Chỉ dùng ở phần kết luận.' },
            { key: 'D', text: 'Chỉ dùng khi bạn hết ý.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Việc cố gắng dùng một cấu trúc quá phức tạp có thể làm bạn ngập ngừng, mắc lỗi và ảnh hưởng đến điểm Fluency và Grammar. Hãy tập trung vào việc nói một cách tự nhiên và chính xác.'
    },
    {
        id: 42,
        question: 'Khi mô tả một sự kiện, việc sắp xếp các chi tiết theo trình tự thời gian có quan trọng không?',
        options: [
            { key: 'A', text: 'Không, bạn có thể kể lộn xộn.' },
            { key: 'B', text: 'Có, việc kể theo trình tự thời gian (chronological order) giúp bài nói của bạn logic và dễ hiểu hơn.' },
            { key: 'C', text: 'Chỉ quan trọng đối với các sự kiện lịch sử.' },
            { key: 'D', text: 'Bạn nên kể từ cuối về đầu.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Kể câu chuyện theo trình tự thời gian (bắt đầu, diễn biến, kết thúc) là cách đơn giản và hiệu quả nhất để đảm bảo sự mạch lạc (Coherence).'
    },
    {
        id: 43,
        question: 'Câu hỏi ở cuối Part 2 (rounding-off question) có được tính điểm không?',
        options: [
            { key: 'A', text: 'Không, nó chỉ là để chuyển tiếp.' },
            { key: 'B', text: 'Có, nó vẫn là một phần của bài thi và được đánh giá.' },
            { key: 'C', text: 'Chỉ tính điểm nếu bạn trả lời dài.' },
            { key: 'D', text: 'Chỉ tính điểm nếu bạn trả lời đúng.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Mặc dù ngắn, câu trả lời của bạn vẫn được giám khảo đánh giá. Hãy trả lời một cách ngắn gọn nhưng đầy đủ.'
    },
    {
        id: 44,
        question: 'Đâu là cách tốt để ghi chú cho gạch đầu dòng "where you went"?',
        options: [
            { key: 'A', text: 'Viết cả câu: "I went to Ha Long Bay with my family."' },
            { key: 'B', text: 'Chỉ viết: "Ha Long Bay - family".' },
            { key: 'C', text: 'Vẽ một bức tranh Vịnh Hạ Long.' },
            { key: 'D', text: 'Viết "where".' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Ghi chú từ khóa giúp bạn tiết kiệm thời gian và không gian trên giấy nháp. Bạn chỉ cần những từ gợi nhớ để phát triển thành câu hoàn chỉnh khi nói.'
    },
    {
        id: 45,
        question: 'Sử dụng các giác quan (sight, sound, smell, taste, touch) khi mô tả có hữu ích không?',
        options: [
            { key: 'A', text: 'Không, chỉ nên mô tả các sự kiện.' },
            { key: 'B', text: 'Rất hữu ích, nó làm cho bài mô tả của bạn trở nên sống động và chi tiết hơn.' },
            { key: 'C', text: 'Chỉ hữu ích khi mô tả đồ ăn.' },
            { key: 'D', text: 'Nó làm bài nói phức tạp không cần thiết.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Việc thêm các chi tiết về giác quan (ví dụ: "the air smelled fresh", "the music was very loud") sẽ làm cho câu chuyện của bạn trở nên sinh động và hấp dẫn hơn, giúp bạn thể hiện vốn từ vựng phong phú.'
    },
    {
        id: 46,
        question: 'Nếu bạn nhận ra mình đã nói sai một thông tin (ví dụ: nói nhầm tên một thành phố), bạn nên làm gì?',
        options: [
            { key: 'A', text: 'Dừng lại và xin lỗi rối rít.' },
            { key: 'B', text: 'Cứ tiếp tục như không có gì xảy ra.' },
            { key: 'C', text: 'Sửa lại một cách nhanh chóng và tự nhiên, ví dụ: "We went to Da Nang, or rather, Hoi An...".' },
            { key: 'D', text: 'Hỏi giám khảo xem họ có nhận ra không.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Giám khảo không kiểm tra kiến thức của bạn. Nếu đó là một lỗi nhỏ, bạn có thể bỏ qua. Nếu là một lỗi lớn ảnh hưởng đến câu chuyện, hãy sửa lại một cách bình tĩnh và tiếp tục.'
    },
    {
        id: 47,
        question: 'Bạn có nên nói về những điều tiêu cực nếu chủ đề cho phép không?',
        options: [
            { key: 'A', text: 'Không, phải luôn nói về những điều tích cực.' },
            { key: 'B', text: 'Có, việc thể hiện nhiều cảm xúc và quan điểm khác nhau (cả tích cực và tiêu cực) cho thấy khả năng ngôn ngữ tốt hơn.' },
            { key: 'C', text: 'Chỉ khi giám khảo yêu cầu.' },
            { key: 'D', text: 'Chỉ khi bạn thực sự ghét chủ đề đó.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Nếu chủ đề là "Describe a time you were angry", bạn chắc chắn phải dùng từ vựng và ngữ pháp để mô tả cảm xúc tiêu cực. Việc thể hiện đa dạng cảm xúc là một kỹ năng ngôn ngữ tốt.'
    },
    {
        id: 48,
        question: 'Đâu là một chiến lược tốt nếu bạn thực sự không có gì để nói về chủ đề trên cue card?',
        options: [
            { key: 'A', text: 'Im lặng.' },
            { key: 'B', text: 'Nói về một chủ đề khác hoàn toàn.' },
            { key: 'C', text: '"Bẻ lái" chủ đề một chút sang một chủ đề liên quan mà bạn có thể nói được.' },
            { key: 'D', text: 'Hát một bài hát.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Nếu đề bài yêu cầu "Describe a sport you like" và bạn không thích thể thao, bạn có thể nói: "To be honest, I\'m not a big fan of sports, but I can tell you about an activity I enjoy that is quite active, which is dancing..."'
    },
    {
        id: 49,
        question: 'Nói "I think", "I believe", "In my opinion" có cần thiết trong Part 2 không?',
        options: [
            { key: 'A', text: 'Không, vì Part 2 là kể chuyện.' },
            { key: 'B', text: 'Có, đặc biệt là ở phần cuối khi bạn giải thích cảm xúc hoặc tầm quan trọng của sự việc.' },
            { key: 'C', text: 'Chỉ nên dùng ở Part 3.' },
            { key: 'D', text: 'Nên dùng ở đầu mỗi câu.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Đúng! Khi bạn chuyển sang phần giải thích "why this was memorable", việc sử dụng các cụm từ chỉ quan điểm cá nhân là hoàn toàn phù hợp và cần thiết.'
    },
    {
        id: 50,
        question: 'Giám khảo đánh giá bài nói Part 2 của bạn khi nào?',
        options: [
            { key: 'A', text: 'Ngay sau khi bạn nói xong.' },
            { key: 'B', text: 'Trong khi bạn đang nói.' },
            { key: 'C', text: 'Sau khi toàn bộ bài thi Speaking kết thúc.' },
            { key: 'D', text: 'Họ không chấm điểm Part 2.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 2',
        explanation_vi: 'Chính xác! Giám khảo sẽ lắng nghe và ghi chú trong suốt cả ba phần, nhưng họ chỉ cho điểm tổng thể sau khi bạn đã rời khỏi phòng thi. Điều này có nghĩa là bạn luôn có cơ hội để cải thiện ấn tượng trong các phần sau.'
    }
];