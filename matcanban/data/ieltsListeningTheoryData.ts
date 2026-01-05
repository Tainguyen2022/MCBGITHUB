export interface IeltsListeningTheoryQuestion {
    id: number;
    question: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    type: 'Lý thuyết IELTS Listening';
    explanation_vi: string;
}

export const ieltsListeningTheoryData: IeltsListeningTheoryQuestion[] = [
    {
        id: 1,
        question: 'Tổng thời gian của bài thi IELTS Listening là bao nhiêu phút?',
        options: [ { key: 'A', text: '20 phút' }, { key: 'B', text: '30 phút nghe + 10 phút transfer' }, { key: 'C', text: '40 phút nghe + 10 phút transfer' }, { key: 'D', text: '60 phút' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Bài thi nghe kéo dài khoảng 30 phút, và bạn có thêm 10 phút để chuyển câu trả lời vào phiếu trả lời (answer sheet) nếu thi trên giấy.'
    },
    {
        id: 2,
        question: 'Trong Section 1, bạn thường nghe loại hội thoại nào?',
        options: [ { key: 'A', text: 'Một bài giảng học thuật' }, { key: 'B', text: 'Một cuộc thảo luận giữa 3-4 sinh viên' }, { key: 'C', text: 'Một cuộc hội thoại giữa hai người về một chủ đề xã hội, hàng ngày' }, { key: 'D', text: 'Một bản tin thời sự' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Section 1 luôn là một cuộc hội thoại giao dịch hàng ngày, ví dụ như đặt phòng khách sạn, hỏi thông tin du lịch, hoặc đăng ký một khóa học.'
    },
    {
        id: 3,
        question: 'Trong Section 4, bạn thường nghe loại bài nói nào?',
        options: [ { key: 'A', text: 'Một cuộc trò chuyện thân mật' }, { key: 'B', text: 'Một bài giảng học thuật của một giảng viên' }, { key: 'C', text: 'Một cuộc phỏng vấn xin việc' }, { key: 'D', text: 'Một hướng dẫn du lịch' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Section 4 luôn là một bài giảng hoặc bài nói chuyện học thuật (monologue) về một chủ đề cụ thể, tương tự như một bài giảng ở trường đại học.'
    },
    {
        id: 4,
        question: 'Bạn có được nghe lại bài ghi âm không?',
        options: [ { key: 'A', text: 'Có, hai lần' }, { key: 'B', text: 'Không, bạn chỉ được nghe một lần duy nhất' }, { key: 'C', text: 'Có, nếu bạn yêu cầu' }, { key: 'D', text: 'Chỉ Section 1 được nghe lại' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Đây là một trong những thử thách lớn nhất của bài thi. Bạn chỉ được nghe một lần duy nhất, vì vậy sự tập trung là cực kỳ quan trọng.'
    },
    {
        id: 5,
        question: 'Chiến lược quan trọng nhất cần làm trong thời gian đọc câu hỏi là gì?',
        options: [ { key: 'A', text: 'Nhắm mắt nghỉ ngơi' }, { key: 'B', text: 'Gạch chân từ khóa và dự đoán loại thông tin cần điền' }, { key: 'C', text: 'Đọc lại các câu trả lời của phần trước' }, { key: 'D', text: 'Viết ra các từ đồng nghĩa bạn biết' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Việc gạch chân từ khóa và dự đoán (ví dụ: cần điền một cái tên, một con số, một danh từ) giúp bạn tập trung lắng nghe đúng thông tin cần thiết.'
    },
    {
        id: 6,
        question: 'Nếu câu hỏi yêu cầu "NO MORE THAN TWO WORDS AND/OR A NUMBER", câu trả lời nào sau đây là HỢP LỆ?',
        options: [ { key: 'A', text: 'three new books' }, { key: 'B', text: '15 Main Street' }, { key: 'C', text: 'a very large box' }, { key: 'D', text: 'blue and yellow' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! "15 Main Street" bao gồm một con số ("15") và hai từ ("Main Street"), hoàn toàn tuân thủ yêu cầu "không quá hai từ VÀ/HOẶC một con số".'
    },
    {
        id: 7,
        question: 'Từ đồng nghĩa (synonyms) và diễn giải (paraphrasing) có vai trò gì trong bài thi Nghe?',
        options: [ { key: 'A', text: 'Không có vai trò gì' }, { key: 'B', text: 'Chúng chỉ xuất hiện trong bài thi Đọc' }, { key: 'C', text: 'Chúng được dùng để làm câu hỏi khó hơn một cách không cần thiết' }, { key: 'D', text: 'Rất quan trọng, vì những gì bạn nghe được thường là cách diễn đạt khác của các từ trong câu hỏi' } ],
        correctAnswer: 'D',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Rất hiếm khi bạn nghe được chính xác từ trong câu hỏi. Thay vào đó, bạn sẽ nghe thấy các từ đồng nghĩa hoặc cả một cụm từ được diễn giải lại. Ví dụ, câu hỏi có "library", bạn có thể nghe thấy "a place with a lot of books".'
    },
    {
        id: 8,
        question: '"Distractor" (từ gây nhiễu) trong IELTS Listening là gì?',
        options: [ { key: 'A', text: 'Tiếng ồn nền trong đoạn ghi âm' }, { key: 'B', text: 'Một thông tin ban đầu có vẻ đúng nhưng sau đó bị người nói sửa lại hoặc phủ nhận' }, { key: 'C', text: 'Một từ khó mà bạn không biết nghĩa' }, { key: 'D', text: 'Giọng của người nói' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Một bẫy phổ biến là người nói đưa ra một thông tin (ví dụ: "The meeting is on Tuesday"), sau đó ngay lập tức sửa lại ("Oh, wait, no, it\'s on Wednesday"). Bạn phải lắng nghe đến cuối để có câu trả lời chính xác.'
    },
    {
        id: 9,
        question: 'Trong dạng bài điền vào bản đồ/sơ đồ (map/diagram labelling), kỹ năng nào là quan trọng nhất?',
        options: [ { key: 'A', text: 'Kỹ năng vẽ' }, { key: 'B', text: 'Hiểu và làm theo các chỉ dẫn về phương hướng và vị trí (e.g., "turn left", "opposite the bank")' }, { key: 'C', text: 'Kiến thức về địa lý' }, { key: 'D', text: 'Khả năng đoán từ' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Dạng bài này kiểm tra khả năng bạn nghe và hình dung không gian. Việc nắm vững các từ chỉ phương hướng (next to, behind, turn right, go past) là cực kỳ cần thiết.'
    },
    {
        id: 10,
        question: 'Nếu bạn bỏ lỡ một câu trả lời, bạn nên làm gì?',
        options: [ { key: 'A', text: 'Hoảng sợ và ngừng làm bài' }, { key: 'B', text: 'Để trống và ngay lập tức tập trung vào câu hỏi tiếp theo' }, { key: 'C', text: 'Cố gắng nhớ lại và đoán mò' }, { key: 'D', text: 'Giơ tay báo cho giám thị' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Điều tồi tệ nhất bạn có thể làm là cố gắng suy nghĩ về câu đã lỡ, vì điều này sẽ khiến bạn bỏ lỡ thêm các câu tiếp theo. Hãy bình tĩnh bỏ qua và tập trung vào câu hỏi kế tiếp.'
    },
    {
        id: 11,
        question: 'Chính tả (Spelling) có quan trọng trong bài thi Listening không?',
        options: [ { key: 'A', text: 'Không, chỉ cần nghe đúng ý' }, { key: 'B', text: 'Rất quan trọng, sai chính tả sẽ bị tính là sai cả câu' }, { key: 'C', text: 'Chỉ quan trọng đối với tên riêng' }, { key: 'D', text: 'Chỉ quan trọng ở Section 4' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Sai chính tả, dù chỉ một chữ cái, cũng sẽ làm bạn mất điểm cho câu đó. Hãy đặc biệt cẩn thận khi chuyển câu trả lời vào phiếu.'
    },
    {
        id: 12,
        question: 'Section 2 thường có dạng bài nói nào?',
        options: [ { key: 'A', text: 'Một cuộc thảo luận học thuật' }, { key: 'B', text: 'Một cuộc hội thoại giữa hai người' }, { key: 'C', text: 'Một bài nói của một người (monologue) về một chủ đề chung (ví dụ: giới thiệu về một địa điểm)' }, { key: 'D', text: 'Một cuộc phỏng vấn' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Section 2 luôn là một bài độc thoại về một chủ đề xã hội hoặc thông tin chung, ví dụ như một hướng dẫn viên du lịch giới thiệu, hoặc một người nói về một sự kiện cộng đồng.'
    },
    {
        id: 13,
        question: 'Khi điền vào một biểu mẫu (form completion), bạn nên chú ý điều gì trước khi nghe?',
        options: [ { key: 'A', text: 'Màu sắc của biểu mẫu' }, { key: 'B', text: 'Các tiêu đề của các cột và hàng để dự đoán loại thông tin' }, { key: 'C', text: 'Viết thử vào biểu mẫu' }, { key: 'D', text: 'Không cần chú ý gì' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Đọc các tiêu đề như "Name", "Date of Birth", "Address" giúp bạn biết chính xác loại thông tin mình sắp nghe, ví dụ như một cái tên, một ngày tháng, hay một địa chỉ.'
    },
    {
        id: 14,
        question: 'Nếu câu trả lời là một danh từ số nhiều (ví dụ: "books"), việc quên chữ "s" cuối có bị trừ điểm không?',
        options: [ { key: 'A', text: 'Không, miễn là từ đó đúng' }, { key: 'B', text: 'Có, đó được coi là một lỗi và sẽ bị tính là sai' }, { key: 'C', text: 'Tùy vào giám khảo' }, { key: 'D', text: 'Chỉ bị trừ nửa điểm' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Lỗi ngữ pháp, bao gồm cả việc thiếu "s" cho danh từ số nhiều, sẽ làm cho câu trả lời của bạn bị chấm sai. Hãy lắng nghe kỹ các âm cuối.'
    },
    {
        id: 15,
        question: 'Section 3 thường có nội dung gì?',
        options: [ { key: 'A', text: 'Một cuộc trò chuyện điện thoại đặt vé' }, { key: 'B', text: 'Một bài giảng của giáo sư' }, { key: 'C', text: 'Một cuộc thảo luận giữa 2 đến 4 người trong bối cảnh học thuật (ví dụ: sinh viên bàn về bài tập)' }, { key: 'D', text: 'Một bản tin radio' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Section 3 luôn là một cuộc hội thoại trong môi trường giáo dục hoặc đào tạo, thường có nhiều người nói, làm cho việc theo dõi ai đang nói trở nên khó khăn hơn.'
    },
    {
        id: 16,
        question: 'Trong dạng bài Multiple Choice, tại sao bạn nên cẩn thận với các đáp án có từ giống hệt trong bài nghe?',
        options: [ { key: 'A', text: 'Vì đó thường là đáp án đúng.' }, { key: 'B', text: 'Vì đó thường là một cái bẫy (distractor); đáp án đúng thường được diễn giải lại.' }, { key: 'C', text: 'Vì nó cho thấy bạn nghe tốt.' }, { key: 'D', text: 'Vì tất cả các đáp án đều có từ giống nhau.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Đây là một cái bẫy phổ biến. Các lựa chọn sai thường chứa chính xác từ bạn nghe được để đánh lừa, trong khi đáp án đúng thường dùng từ đồng nghĩa hoặc diễn giải lại ý.'
    },
    {
        id: 17,
        question: 'Thứ tự của các câu hỏi trong bài thi Listening có tương ứng với thứ tự thông tin trong bài nghe không?',
        options: [ { key: 'A', text: 'Không, thứ tự là ngẫu nhiên.' }, { key: 'B', text: 'Có, thông tin luôn xuất hiện theo đúng thứ tự của các câu hỏi.' }, { key: 'C', text: 'Chỉ đúng cho Section 1 và 2.' }, { key: 'D', text: 'Chỉ đúng cho dạng bài điền từ.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Một điểm thuận lợi của bài thi là các câu hỏi luôn theo thứ tự thông tin được trình bày trong bài nghe. Điều này giúp bạn theo dõi và không bị lạc.'
    },
    {
        id: 18,
        question: 'Tại sao việc viết câu trả lời bằng chữ IN HOA (capital letters) lại là một chiến lược tốt?',
        options: [ { key: 'A', text: 'Vì nó trông đẹp hơn.' }, { key: 'B', text: 'Vì nó giúp tránh các lỗi về viết hoa không cần thiết (ví dụ: tên riêng, đầu câu).' }, { key: 'C', text: 'Vì giám khảo thích chữ in hoa.' }, { key: 'D', text: 'Vì nó không có lợi ích gì.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Viết tất cả bằng chữ IN HOA là một mẹo an toàn. Bạn sẽ không bị trừ điểm vì viết hoa sai (ví dụ: viết hoa một danh từ chung), và nó cũng giúp chữ bạn dễ đọc hơn.'
    },
    {
        id: 19,
        question: 'Trong Section 4, thường có một khoảng nghỉ ở giữa bài giảng không?',
        options: [ { key: 'A', text: 'Có, luôn có một khoảng nghỉ dài.' }, { key: 'B', text: 'Không, Section 4 là một bài nói liền mạch không có khoảng nghỉ.' }, { key: 'C', text: 'Có, nhưng rất ngắn.' }, { key: 'D', text: 'Tùy thuộc vào độ dài của bài giảng.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Không giống như các section khác, Section 4 không có khoảng nghỉ ở giữa. Bạn phải tập trung cao độ trong suốt cả bài giảng.'
    },
    {
        id: 20,
        question: 'Dạng câu hỏi nào thường xuất hiện nhất ở Section 1?',
        options: [ { key: 'A', text: 'Multiple Choice' }, { key: 'B', text: 'Map Labelling' }, { key: 'C', text: 'Form/Note Completion (Điền vào biểu mẫu/ghi chú)' }, { key: 'D', text: 'Matching' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Section 1 thường yêu cầu bạn điền các thông tin cụ thể như tên, địa chỉ, số điện thoại, ngày tháng vào một biểu mẫu hoặc một bộ ghi chú.'
    },
    {
        id: 21,
        question: 'Trong 10 phút chuyển câu trả lời, bạn nên làm gì?',
        options: [ { key: 'A', text: 'Nghỉ ngơi.' }, { key: 'B', text: 'Kiểm tra lại chính tả, ngữ pháp (số ít/nhiều) và đảm bảo các câu trả lời nằm đúng dòng.' }, { key: 'C', text: 'Cố gắng đoán các câu đã bỏ lỡ.' }, { key: 'D', text: 'Chỉ cần chuyển đáp án thật nhanh.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Đây là thời gian vàng để kiểm tra lại các lỗi chính tả, đảm bảo bạn đã thêm "s" cho danh từ số nhiều, và viết câu trả lời vào đúng số thứ tự trên phiếu.'
    },
    {
        id: 22,
        question: 'Dạng bài "Matching" yêu cầu bạn làm gì?',
        options: [ { key: 'A', text: 'Điền vào chỗ trống.' }, { key: 'B', text: 'Nối một danh sách các mục (ví dụ: tên người) với một danh sách các lựa chọn (ví dụ: ý kiến).' }, { key: 'C', text: 'Chọn một đáp án đúng từ A, B, C.' }, { key: 'D', text: 'Ghi nhãn một sơ đồ.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Dạng bài này kiểm tra khả năng theo dõi thông tin chi tiết và liên kết chúng lại với nhau. Bạn phải nối các mục trong câu hỏi với các lựa chọn phù hợp.'
    },
    {
        id: 23,
        question: 'Sự khác biệt về số lượng người nói giữa Section 1 và Section 2 là gì?',
        options: [ { key: 'A', text: 'Không có sự khác biệt.' }, { key: 'B', text: 'Section 1 có một người, Section 2 có hai người.' }, { key: 'C', text: 'Section 1 có hai người, Section 2 có một người.' }, { key: 'D', text: 'Cả hai đều có 3 người.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Section 1 là một cuộc hội thoại (dialogue) giữa hai người, trong khi Section 2 là một bài độc thoại (monologue) của một người.'
    },
    {
        id: 24,
        question: 'Tại sao việc đọc hướng dẫn (ví dụ: "NO MORE THAN THREE WORDS") lại cực kỳ quan trọng?',
        options: [ { key: 'A', text: 'Vì nó giúp bạn hiểu chủ đề.' }, { key: 'B', text: 'Vì nếu bạn viết nhiều hơn số từ cho phép, câu trả lời sẽ bị tính là sai.' }, { key: 'C', text: 'Vì nó cho bạn biết đáp án.' }, { key: 'D', text: 'Vì nó không thực sự quan trọng.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Đây là một lỗi rất phổ biến. Dù bạn nghe đúng thông tin, nhưng nếu bạn viết nhiều hơn số từ quy định, bạn sẽ không được điểm cho câu đó.'
    },
    {
        id: 25,
        question: 'Trong bài thi trên máy tính, bạn có 10 phút để chuyển câu trả lời không?',
        options: [ { key: 'A', text: 'Có, giống hệt thi trên giấy.' }, { key: 'B', text: 'Không, bạn nhập câu trả lời trực tiếp và chỉ có 2 phút cuối để kiểm tra lại.' }, { key: 'C', text: 'Có, nhưng chỉ có 5 phút.' }, { key: 'D', text: 'Không, không có thời gian kiểm tra.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Đây là một khác biệt lớn. Khi thi trên máy, bạn phải nhập câu trả lời ngay khi nghe. Bạn sẽ có 2 phút cuối cùng để rà soát lại tất cả các câu trả lời của mình.'
    },
    {
        id: 26,
        question: 'Từ "fortnight" có nghĩa là gì?',
        options: [ { key: 'A', text: 'Bốn đêm' }, { key: 'B', text: 'Bốn ngày' }, { key: 'C', text: 'Một tuần' }, { key: 'D', text: 'Hai tuần' } ],
        correctAnswer: 'D',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! "A fortnight" là một từ vựng phổ biến trong tiếng Anh-Anh, có nghĩa là một khoảng thời gian hai tuần (14 ngày). Đây là một từ thường xuất hiện trong Section 1.'
    },
    {
        id: 27,
        question: 'Dấu hiệu nào cho thấy người nói sắp chuyển sang một điểm mới trong một bài giảng (Section 4)?',
        options: [ { key: 'A', text: 'Họ dừng lại một lúc lâu.' }, { key: 'B', text: 'Họ nói nhanh hơn.' }, { key: 'C', text: 'Họ sử dụng các từ nối báo hiệu (signposting language) như "Now, let\'s turn to...", "Another key point is...".' }, { key: 'D', text: 'Họ ho.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Việc lắng nghe các từ nối này giúp bạn theo dõi cấu trúc của bài giảng và biết khi nào thông tin cho câu hỏi tiếp theo sắp xuất hiện.'
    },
    {
        id: 28,
        question: 'Khi một cái tên được đánh vần (ví dụ: S-M-I-T-H), bạn nên làm gì?',
        options: [ { key: 'A', text: 'Chỉ nghe âm thanh chung.' }, { key: 'B', text: 'Ghi lại cẩn thận từng chữ cái được đánh vần.' }, { key: 'C', text: 'Đoán tên dựa trên chữ cái đầu.' }, { key: 'D', text: 'Bỏ qua vì nó quá khó.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Đây là một phần cho điểm. Hãy tập trung và ghi lại chính xác từng chữ cái để đảm bảo bạn không mất điểm vì lỗi chính tả.'
    },
    {
        id: 29,
        question: 'Sự khác biệt chính về nội dung giữa Section 1/2 và Section 3/4 là gì?',
        options: [ { key: 'A', text: 'Section 1/2 nói về quá khứ, Section 3/4 nói về tương lai.' }, { key: 'B', text: 'Section 1/2 có nội dung xã hội, hàng ngày; Section 3/4 có nội dung học thuật, chuyên sâu.' }, { key: 'C', text: 'Section 1/2 dễ hơn về từ vựng nhưng khó hơn về tốc độ.' }, { key: 'D', text: 'Không có sự khác biệt.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Độ khó của bài thi tăng dần. Section 1 và 2 là về các tình huống xã hội thông thường, trong khi Section 3 và 4 chuyển sang bối cảnh giáo dục và học thuật, với từ vựng và cấu trúc phức tạp hơn.'
    },
    {
        id: 30,
        question: 'Nếu câu trả lời là một con số có hai phần (ví dụ: "twenty-four"), nó được tính là mấy từ?',
        options: [ { key: 'A', text: 'Hai từ' }, { key: 'B', text: 'Một từ' }, { key: 'C', text: 'Không tính là từ nào' }, { key: 'D', text: 'Ba từ' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Một con số được viết bằng chữ và có gạch nối (ví dụ: twenty-four) được tính là MỘT từ duy nhất.'
    },
    {
        id: 31,
        question: 'Trong dạng bài Matching, bạn có thể sử dụng một lựa chọn nhiều hơn một lần không?',
        options: [ { key: 'A', text: 'Không, mỗi lựa chọn chỉ dùng một lần.' }, { key: 'B', text: 'Có, nếu hướng dẫn cho phép (e.g., "You may use any letter more than once").' }, { key: 'C', text: 'Luôn luôn có thể.' }, { key: 'D', text: 'Chỉ trong Section 3.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Luôn đọc kỹ hướng dẫn. Nếu có ghi chú "You may use any letter more than once", điều đó có nghĩa là một lựa chọn có thể là đáp án cho nhiều câu hỏi.'
    },
    {
        id: 32,
        question: 'Mục đích của việc đọc trước các lựa chọn trong câu hỏi Multiple Choice là gì?',
        options: [ { key: 'A', text: 'Để chọn đại một đáp án.' }, { key: 'B', text: 'Để làm quen với các từ khóa và dự đoán nội dung sắp nghe.' }, { key: 'C', text: 'Để tìm lỗi ngữ pháp trong các lựa chọn.' }, { key: 'D', text: 'Không có mục đích gì.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Việc đọc trước các lựa chọn giúp bạn hình dung về những gì sắp được thảo luận và tập trung lắng nghe sự khác biệt tinh tế giữa chúng.'
    },
    {
        id: 33,
        question: 'Trong bài nghe, bạn thường nghe giọng (accent) nào?',
        options: [ { key: 'A', text: 'Chỉ có giọng Mỹ.' }, { key: 'B', text: 'Chỉ có giọng Anh.' }, { key: 'C', text: 'Một loạt các giọng, bao gồm Anh, Úc, New Zealand, Bắc Mỹ.' }, { key: 'D', text: 'Chỉ có giọng Canada.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! IELTS là bài thi quốc tế, vì vậy bạn sẽ được nghe nhiều loại giọng khác nhau để phản ánh sự đa dạng của tiếng Anh trên thế giới.'
    },
    {
        id: 34,
        question: 'Nếu câu trả lời là "a large garden", và yêu cầu là "NO MORE THAN TWO WORDS", bạn nên viết gì?',
        options: [ { key: 'A', text: 'a large garden' }, { key: 'B', text: 'large garden' }, { key: 'C', text: 'garden' }, { key: 'D', text: 'a garden' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! "a large garden" có 3 từ, vi phạm quy tắc. Bạn phải bỏ mạo từ "a" để tuân thủ giới hạn 2 từ. "large garden" là câu trả lời đúng.'
    },
    {
        id: 35,
        question: 'Trong dạng bài điền vào bảng (Table Completion), thông tin thường được trình bày như thế nào?',
        options: [ { key: 'A', text: 'Theo thứ tự ngẫu nhiên.' }, { key: 'B', text: 'Từ trái sang phải, từ trên xuống dưới, theo các cột và hàng.' }, { key: 'C', text: 'Từ dưới lên trên.' }, { key: 'D', text: 'Chỉ theo cột dọc.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Thông tin trong bài nghe sẽ tuần tự theo cấu trúc của bảng, giúp bạn dễ dàng theo dõi và điền vào các ô trống.'
    },
    {
        id: 36,
        question: 'Tại sao việc dự đoán câu trả lời lại hữu ích, ngay cả khi bạn đoán sai?',
        options: [ { key: 'A', text: 'Nó không hữu ích.' }, { key: 'B', text: 'Nó giúp bạn tập trung vào loại từ cần nghe (danh từ, động từ, số...) và ngữ pháp của câu.' }, { key: 'C', text: 'Nó giúp bạn viết nhanh hơn.' }, { key: 'D', text: 'Nó giúp bạn thư giãn.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Quá trình dự đoán buộc bạn phải phân tích câu hỏi một cách kỹ lưỡng. Điều này giúp não bạn sẵn sàng để "bắt" đúng loại thông tin khi nó xuất hiện trong bài nghe.'
    },
    {
        id: 37,
        question: 'Trong dạng bài Multiple Choice có nhiều lựa chọn (ví dụ: "Choose TWO letters"), bạn nên làm gì?',
        options: [ { key: 'A', text: 'Chỉ chọn một đáp án bạn chắc chắn nhất.' }, { key: 'B', text: 'Đọc kỹ yêu cầu và đảm bảo bạn chọn đúng số lượng đáp án được yêu cầu.' }, { key: 'C', text: 'Chọn ba đáp án cho chắc.' }, { key: 'D', text: 'Viết cả hai đáp án trên cùng một dòng.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Đọc sai hướng dẫn là một lỗi rất đáng tiếc. Hãy luôn kiểm tra xem bạn cần chọn một, hai, hay ba đáp án.'
    },
    {
        id: 38,
        question: 'Khi nghe một con số lớn (ví dụ: 1,500), bạn nên viết nó như thế nào vào nháp?',
        options: [ { key: 'A', text: 'Viết đầy đủ bằng chữ: "one thousand five hundred".' }, { key: 'B', text: 'Viết bằng số để tiết kiệm thời gian, ví dụ: "1500".' }, { key: 'C', text: 'Chỉ viết số đầu tiên: "1".' }, { key: 'D', text: 'Cố gắng nhớ và không viết gì.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Viết bằng chữ số sẽ nhanh hơn và ít có khả năng sai sót hơn nhiều so với viết bằng chữ. Sau đó, trong 10 phút cuối, bạn có thể quyết định viết bằng số hay chữ vào phiếu trả lời.'
    },
    {
        id: 39,
        question: 'Dạng bài "Sentence Completion" (Hoàn thành câu) yêu cầu gì?',
        options: [ { key: 'A', text: 'Viết lại toàn bộ câu.' }, { key: 'B', text: 'Điền từ còn thiếu vào cuối một câu, đảm bảo câu đó đúng ngữ pháp.' }, { key: 'C', text: 'Chọn A, B, C.' }, { key: 'D', text: 'Nối hai nửa câu.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Bạn cần điền từ/cụm từ nghe được vào chỗ trống để hoàn thành câu. Hãy kiểm tra xem từ bạn điền có làm cho câu văn hợp lý về mặt ngữ pháp và ý nghĩa không.'
    },
    {
        id: 40,
        question: 'Trước khi Section 1 bắt đầu, bạn có thời gian để làm gì?',
        options: [ { key: 'A', text: 'Nghe một ví dụ.' }, { key: 'B', text: 'Đọc câu hỏi cho toàn bộ Section 1.' }, { key: 'C', text: 'Nghỉ ngơi.' }, { key: 'D', text: 'Cả A và B.' } ],
        correctAnswer: 'D',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Bài thi sẽ bắt đầu bằng một ví dụ đã được làm sẵn, và sau đó bạn sẽ có thời gian để đọc lướt qua các câu hỏi của Section 1 trước khi đoạn hội thoại bắt đầu.'
    },
    {
        id: 41,
        question: 'Nếu bạn không chắc về một câu trả lời, bạn nên làm gì?',
        options: [ { key: 'A', text: 'Để trống.' }, { key: 'B', text: 'Viết ra hai hoặc ba khả năng.' }, { key: 'C', text: 'Đoán một câu trả lời hợp lý nhất. Bạn không bị trừ điểm nếu đoán sai.' }, { key: 'D', text: 'Hỏi giám thị.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Vì không có điểm trừ cho câu trả lời sai, bạn không nên bao giờ để trống. Hãy đưa ra một phỏng đoán có cơ sở nhất dựa trên những gì bạn đã nghe được.'
    },
    {
        id: 42,
        question: 'Tại sao việc hiểu ngữ cảnh chung của cuộc hội thoại lại quan trọng?',
        options: [ { key: 'A', text: 'Để giúp bạn dự đoán loại từ vựng và thông tin có thể xuất hiện.' }, { key: 'B', text: 'Không quan trọng, chỉ cần nghe từ khóa.' }, { key: 'C', text: 'Để bạn có thể tham gia vào cuộc hội thoại.' }, { key: 'D', text: 'Để biết ai là người nói.' } ],
        correctAnswer: 'A',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Khi bạn biết cuộc hội thoại là về việc đặt phòng khách sạn, bạn có thể dự đoán sẽ nghe thấy các từ vựng liên quan đến ngày tháng, loại phòng, giá cả, tên...'
    },
    {
        id: 43,
        question: 'Trong dạng bài Matching, thứ tự các câu hỏi có giống thứ tự thông tin trong bài nghe không?',
        options: [ { key: 'A', text: 'Có, luôn luôn.' }, { key: 'B', text: 'Không, các lựa chọn (A, B, C...) sẽ được nhắc đến theo thứ tự, nhưng các câu hỏi (21, 22, 23...) thì không.' }, { key: 'C', text: 'Có, các câu hỏi (21, 22, 23...) thường được nhắc đến theo thứ tự, nhưng các lựa chọn (A, B, C...) thì không.' }, { key: 'D', text: 'Không có quy luật nào.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Thông tin cho các câu hỏi thường sẽ xuất hiện theo thứ tự (ví dụ, họ sẽ nói về câu 21 trước câu 22). Tuy nhiên, các đáp án (A, B, C) có thể được nhắc đến một cách ngẫu nhiên.'
    },
    {
        id: 44,
        question: 'Đâu là một ví dụ về diễn giải (paraphrasing)?',
        options: [ { key: 'A', text: 'Câu hỏi: "car", bài nghe: "car"' }, { key: 'B', text: 'Câu hỏi: "at the moment", bài nghe: "currently"' }, { key: 'C', text: 'Câu hỏi: "book", bài nghe: "look"' }, { key: 'D', text: 'Câu hỏi: "run", bài nghe: "ran"' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! "at the moment" và "currently" là hai cách nói khác nhau nhưng cùng một ý nghĩa, đây là một ví dụ điển hình của paraphrasing.'
    },
    {
        id: 45,
        question: 'Trong Section 3, bạn thường nghe thấy ai nói chuyện?',
        options: [ { key: 'A', text: 'Một giáo viên và một phụ huynh.' }, { key: 'B', text: 'Một hướng dẫn viên du lịch và một du khách.' }, { key: 'C', text: 'Hai sinh viên, hoặc một nhóm sinh viên và giáo sư của họ.' }, { key: 'D', text: 'Hai đồng nghiệp trong một công ty.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Bối cảnh của Section 3 luôn là học thuật, thường là sinh viên thảo luận bài tập, hoặc trao đổi với giảng viên hướng dẫn.'
    },
    {
        id: 46,
        question: 'Nếu câu trả lời là một danh từ kép như "credit card", nó được tính là mấy từ?',
        options: [ { key: 'A', text: 'Một từ' }, { key: 'B', text: 'Hai từ' }, { key: 'C', text: 'Tùy cách viết' }, { key: 'D', text: 'Ba từ' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Mặc dù "credit card" là một cụm từ có ý nghĩa thống nhất, nó vẫn được tính là hai từ riêng biệt ("credit" và "card").'
    },
    {
        id: 47,
        question: 'Việc viết câu trả lời vào phiếu trả lời ngay lập tức (khi thi trên giấy) có phải là một ý hay không?',
        options: [ { key: 'A', text: 'Có, để không quên.' }, { key: 'B', text: 'Không, bạn nên viết vào tờ câu hỏi trước, sau đó dùng 10 phút cuối để chuyển vào phiếu một cách cẩn thận.' }, { key: 'C', text: 'Chỉ nên làm vậy ở Section 4.' }, { key: 'D', text: 'Có, đó là cách nhanh nhất.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Viết trực tiếp vào phiếu trả lời có thể khiến bạn mất tập trung vào việc nghe các câu tiếp theo. Hãy tận dụng tờ câu hỏi làm nháp và dùng 10 phút cuối để chuyển đáp án một cách sạch sẽ và chính xác.'
    },
    {
        id: 48,
        question: 'Dạng bài nào kiểm tra khả năng hiểu một quy trình hoặc một chu trình?',
        options: [ { key: 'A', text: 'Table Completion' }, { key: 'B', text: 'Flow-chart Completion' }, { key: 'C', text: 'Multiple Choice' }, { key: 'D', text: 'Map Labelling' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! "Flow-chart Completion" (Hoàn thành lưu đồ) là dạng bài chuyên dùng để kiểm tra khả năng nghe và hiểu các bước của một quy trình hoặc chu trình.'
    },
    {
        id: 49,
        question: 'Tại sao việc đọc lướt các câu hỏi trong thời gian nghỉ giữa các section lại quan trọng?',
        options: [ { key: 'A', text: 'Để nghỉ ngơi.' }, { key: 'B', text: 'Để chuẩn bị và dự đoán cho phần nghe tiếp theo.' }, { key: 'C', text: 'Để kiểm tra lại câu trả lời cũ.' }, { key: 'D', text: 'Không quan trọng.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Đúng! Tận dụng mọi giây phút để đọc trước câu hỏi của phần tiếp theo là một chiến lược quan trọng để tăng cơ hội nghe đúng thông tin.'
    },
    {
        id: 50,
        question: 'Mục tiêu chính của bạn trong bài thi IELTS Listening là gì?',
        options: [ { key: 'A', text: 'Hiểu mọi từ trong bài nghe.' }, { key: 'B', text: 'Trả lời đúng các câu hỏi dựa trên thông tin nghe được.' }, { key: 'C', text: 'Viết những câu trả lời thật dài.' }, { key: 'D', text: 'Hoàn thành bài thi thật nhanh.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Listening',
        explanation_vi: 'Chính xác! Bạn không cần phải hiểu mọi từ. Mục tiêu của bạn là xác định và ghi lại chính xác thông tin cần thiết để trả lời câu hỏi.'
    }
];