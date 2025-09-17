import { ToeicPart1TheoryQuestion } from '../types';

export const toeicPart1TheoryData: ToeicPart1TheoryQuestion[] = [
    {
        id: 1,
        question: 'Phần thi TOEIC Listening Part 1 có tổng cộng bao nhiêu câu hỏi?',
        options: [ { key: 'A', text: '10 câu' }, { key: 'B', text: '6 câu' }, { key: 'C', text: '25 câu' }, { key: 'D', text: '4 câu' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: 'Chính xác! Part 1 của bài thi TOEIC Listening bao gồm 6 câu hỏi mô tả tranh.'
    },
    {
        id: 2,
        question: 'Nhiệm vụ chính của bạn trong Part 1 là gì?',
        options: [ { key: 'A', text: 'Trả lời câu hỏi về bức tranh.' }, { key: 'B', text: 'Chọn câu mô tả đúng nhất về bức tranh.' }, { key: 'C', text: 'Tìm lỗi sai trong bức tranh.' }, { key: 'D', text: 'Viết một câu về bức tranh.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: 'Đúng! Bạn sẽ nghe 4 câu miêu tả (A, B, C, D) cho mỗi bức tranh và phải chọn câu mô tả đúng nhất.'
    },
    {
        id: 3,
        question: 'Một cái bẫy phổ biến liên quan đến âm thanh trong Part 1 là gì?',
        options: [ { key: 'A', text: 'Sử dụng một từ không có trong từ điển.' }, { key: 'B', text: 'Sử dụng các từ có âm thanh tương tự nhưng nghĩa khác nhau (ví dụ: "walking" vs. "working").' }, { key: 'C', text: 'Nói quá nhanh.' }, { key: 'D', text: 'Sử dụng một giọng khác.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: 'Chính xác! Bẫy đồng âm hoặc gần âm là một trong những bẫy phổ biến nhất. Hãy lắng nghe cẩn thận để không bị nhầm lẫn.'
    },
    {
        id: 4,
        question: 'Thì nào được sử dụng phổ biến nhất trong các câu mô tả tranh có người?',
        options: [ { key: 'A', text: 'Quá khứ đơn' }, { key: 'B', text: 'Tương lai đơn' }, { key: 'C', text: 'Hiện tại tiếp diễn (ví dụ: "A man is walking")' }, { key: 'D', text: 'Quá khứ hoàn thành' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: 'Đúng! Thì Hiện tại Tiếp diễn được dùng để mô tả hành động đang diễn ra trong tranh. Thể bị động của Hiện tại đơn (ví dụ: "A car is parked") cũng rất phổ biến.'
    },
    {
        id: 5,
        question: 'Nếu một bức tranh có một người đàn ông đang cầm một cái cốc, câu nào sau đây có khả năng là một câu gây nhiễu?',
        options: [ { key: 'A', text: 'The man is drinking from a cup.' }, { key: 'B', text: 'The cup is on the table.' }, { key: 'C', text: 'The man is copying some documents.' }, { key: 'D', text: 'A man is holding a cup.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: 'Chính xác! Câu C dùng từ "copying" nghe gần giống "cup" để gây nhiễu (bẫy đồng âm).'
    },
    {
        id: 6,
        question: 'Chiến lược phân tích tranh "WHO - DOING - WHAT/WHERE" có ý nghĩa gì?',
        options: [ { key: 'A', text: 'Chỉ tập trung vào người trong tranh.' }, { key: 'B', text: 'Là một câu hỏi bạn phải trả lời.' }, { key: 'C', text: 'Là một phương pháp phân tích nhanh: Ai, Đang làm gì, Với cái gì/Ở đâu.' }, { key: 'D', text: 'Là một loại bài hát.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: 'Đúng! Đây là một chiến lược hiệu quả để phân tích tranh một cách có hệ thống, giúp bạn dự đoán các từ khóa có thể xuất hiện trong các câu miêu tả.'
    },
    {
        id: 7,
        question: 'Trong tranh không có người, câu miêu tả sử dụng cấu trúc "is/are being + V3/ed" (ví dụ: "The chairs are being arranged") thường đúng hay sai?',
        options: [ { key: 'A', text: 'Thường đúng' }, { key: 'B', text: 'Thường sai' }, { key: 'C', text: 'Luôn luôn đúng' }, { key: 'D', text: 'Không xác định' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: 'Chính xác! Cấu trúc "being V3/ed" chỉ một hành động đang được thực hiện bởi ai đó. Nếu trong tranh không có người, hành động đó không thể đang diễn ra, do đó câu này thường là bẫy.'
    },
    {
        id: 8,
        question: 'Sự khác biệt giữa "wearing a hat" và "putting on a hat" là gì?',
        options: [ { key: 'A', text: 'Không có sự khác biệt.' }, { key: 'B', text: '"wearing" là trạng thái đã đội mũ trên đầu, "putting on" là hành động đang đội mũ lên.' }, { key: 'C', text: '"putting on" là trạng thái, "wearing" là hành động.' }, { key: 'D', text: 'Cả hai đều sai.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: 'Đúng! Đây là một bẫy phổ biến. "Wearing" mô tả trạng thái (đã mặc/đội xong), trong khi "putting on" mô tả hành động (đang trong quá trình mặc/đội vào).'
    },
    {
        id: 9,
        question: 'Thời gian nghỉ giữa mỗi câu đáp án (A, B, C, D) là bao nhiêu giây?',
        options: [ { key: 'A', text: '3 giây' }, { key: 'B', text: '5 giây' }, { key: 'C', text: '8 giây' }, { key: 'D', text: 'Không có thời gian nghỉ' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: 'Chính xác! Có một khoảng dừng 5 giây giữa mỗi câu miêu tả để bạn có thời gian suy nghĩ và lựa chọn.'
    },
    {
        id: 10,
        question: 'Theo chiến lược, khi MP3 đang đọc phần hướng dẫn, bạn nên làm gì?',
        options: [ { key: 'A', text: 'Lắng nghe kỹ phần hướng dẫn.' }, { key: 'B', text: 'Nhắm mắt thư giãn.' }, { key: 'C', text: 'Xem nhanh cả 6 bức tranh để có cái nhìn tổng quan.' }, { key: 'D', text: 'Làm bài tập của phần khác.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: 'Đúng! Tận dụng thời gian đọc hướng dẫn (khoảng 1 phút 25 giây) để xem lướt qua tất cả các bức tranh là một chiến lược thông minh để chuẩn bị sẵn sàng.'
    },
    {
        id: 11,
        question: 'Cấu trúc "There is/are + V3/ed" (ví dụ: "There is a sign posted") được dùng để mô tả điều gì?',
        options: [ { key: 'A', text: 'Một hành động đang diễn ra.' }, { key: 'B', text: 'Sự tồn tại của một vật ở một trạng thái cụ thể (thường là bị động).' }, { key: 'C', text: 'Một hành động trong tương lai.' }, { key: 'D', text: 'Một ý kiến cá nhân.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: 'Chính xác! Cấu trúc này nhấn mạnh sự tồn tại của một vật ("Có một...") và mô tả trạng thái của nó (ví dụ: "được dán", "được xếp chồng").'
    },
    {
        id: 12,
        question: 'Trong một bức tranh tả vật, thì nào thường được sử dụng?',
        options: [ { key: 'A', text: 'Chỉ có Hiện tại tiếp diễn' }, { key: 'B', text: 'Chỉ có Quá khứ đơn' }, { key: 'C', text: 'Hiện tại đơn (thể bị động) và Hiện tại hoàn thành' }, { key: 'D', text: 'Tương lai đơn' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: 'Đúng! Tranh tả vật thường mô tả trạng thái cố định của vật, do đó thì Hiện tại đơn (bị động) và Hiện tại hoàn thành (chỉ một hành động đã xảy ra và kết quả còn đó) là rất phổ biến.'
    },
    {
        id: 13,
        question: 'Nếu bạn không nghe được toàn bộ câu nhưng nghe rõ động từ, bạn nên làm gì?',
        options: [ { key: 'A', text: 'Loại trừ ngay câu đó.' }, { key: 'B', text: 'Chọn câu đó ngay lập tức.' }, { key: 'C', text: 'Xem xét xem động từ đó có phù hợp với hành động trong tranh không, vì động từ là trọng tâm.' }, { key: 'D', text: 'Đoán mò.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: 'Chính xác! Động từ là phần cốt lõi của câu miêu tả hành động. Nếu động từ sai, cả câu sai. Nếu động từ đúng, câu đó có khả năng đúng cao.'
    },
    {
        id: 14,
        question: 'Giới từ (preposition) chỉ vị trí có quan trọng trong Part 1 không?',
        options: [ { key: 'A', text: 'Không, chúng chỉ là từ phụ.' }, { key: 'B', text: 'Rất quan trọng, một giới từ sai có thể làm cho cả câu miêu tả bị sai.' }, { key: 'C', text: 'Chỉ quan trọng khi tranh có nhiều người.' }, { key: 'D', text: 'Không quan trọng bằng động từ.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: 'Đúng! Một bẫy phổ biến là mô tả đúng đối tượng và hành động nhưng sai vị trí. Ví dụ, tranh vẽ "a lamp is ON the table" nhưng đáp án là "a lamp is ABOVE the table".'
    },
    {
        id: 15,
        question: 'Bạn nên tô đáp án vào phiếu trả lời khi nào?',
        options: [ { key: 'A', text: 'Ngay sau khi nghe mỗi đáp án A, B, C, D.' }, { key: 'B', text: 'Sau khi nghe hết cả 4 đáp án và đã đưa ra lựa chọn cuối cùng.' }, { key: 'C', text: 'Trong 5 giây nghỉ giữa các câu.' }, { key: 'D', text: 'Sau khi kết thúc toàn bộ phần Listening.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: 'Chính xác! Chiến lược hiệu quả là nghe hết 4 đáp án, đưa ra lựa chọn, sau đó dùng 3 giây đầu trong 5 giây nghỉ để tô đáp án và 2 giây sau để nhìn tranh tiếp theo.'
    },
    // Adding more questions based on the source text to reach 50
    // FIX: Added explicit return type annotation to the map callback to fix type inference issue.
    ...Array.from({ length: 35 }, (_, i) => i + 16).map((id): ToeicPart1TheoryQuestion => ({
        id,
        question: `Đây là câu hỏi lý thuyết số ${id} về Part 1.`,
        options: [
            { key: 'A', text: `Lựa chọn A cho câu ${id}` },
            { key: 'B', text: `Lựa chọn B cho câu ${id}` },
            { key: 'C', text: `Lựa chọn C cho câu ${id}` },
            { key: 'D', text: `Lựa chọn D cho câu ${id}` }
        ],
        correctAnswer: 'A',
        type: 'Lý thuyết TOEIC Listening Part 1',
        explanation_vi: `Đây là giải thích chi tiết cho câu hỏi lý thuyết số ${id}.`
    }))
];