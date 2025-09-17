
export interface ToeicPart7StrategyQuestion {
    id: number;
    question: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    type: 'Lý thuyết';
    explanation_vi: string;
}

export const toeicPart7Data: ToeicPart7StrategyQuestion[] = [
    {
        id: 1,
        question: 'Theo chiến lược, tổng số câu hỏi trong TOEIC Part 7 là bao nhiêu?',
        options: [ { key: 'A', text: '50 câu' }, { key: 'B', text: '54 câu' }, { key: 'C', text: '46 câu' }, { key: 'D', text: '100 câu' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Part 7 có 54 câu, kéo dài từ câu 147 đến 200.'
    },
    {
        id: 2,
        question: 'Thời gian làm bài đề xuất cho Part 7 là bao nhiêu phút?',
        options: [ { key: 'A', text: '50 phút' }, { key: 'B', text: '75 phút' }, { key: 'C', text: '45 phút' }, { key: 'D', text: '60 phút' } ],
        correctAnswer: 'A',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng vậy, chiến lược đề xuất dành 50 phút để hoàn thành 54 câu của Part 7.'
    },
    {
        id: 3,
        question: 'Đối với câu hỏi về "Chủ đề (mục đích)", đáp án thường nằm ở đâu?',
        options: [ { key: 'A', text: 'Luôn ở giữa đoạn văn.' }, { key: 'B', text: 'Chỉ ở câu cuối cùng.' }, { key: 'C', text: 'Ở 3 câu đầu (diễn dịch) hoặc 3 câu cuối (quy nạp).' }, { key: 'D', text: 'Bất kỳ đâu trong bài.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Câu hỏi chủ đề có đáp án ở 3 câu đầu (lối diễn dịch) hoặc 3 câu cuối (lối quy nạp).'
    },
    {
        id: 4,
        question: 'Khi gặp câu hỏi NOT TRUE, bạn nên tìm kiếm thông tin ở khu vực nào?',
        options: [ { key: 'A', text: 'Câu đầu tiên của mỗi đoạn.' }, { key: 'B', text: 'Các câu có từ "please" hoặc "because".' }, { key: 'C', text: 'Nơi có liệt kê, dấu phẩy, bullet points, hoặc các từ như AND, PLUS, MORE.' }, { key: 'D', text: 'Chỉ ở đoạn cuối cùng.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Chiến lược hiệu quả là tìm các khu vực liệt kê (dấu phẩy, bullet, AND, PLUS, MORE) để đối chiếu và tìm ra đáp án sai (NOT TRUE).'
    },
    {
        id: 5,
        question: 'Câu hỏi "bê đê" (cross-reference) là gì?',
        options: [ { key: 'A', text: 'Câu hỏi về giới tính.' }, { key: 'B', text: 'Câu hỏi phải dùng dữ liệu từ 2 hoặc 3 đoạn văn để trả lời.' }, { key: 'C', text: 'Câu hỏi luôn có đáp án sai.' }, { key: 'D', text: 'Câu hỏi dễ nhất trong bài.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Câu "bê đê" yêu cầu kết hợp thông tin từ nhiều đoạn văn (đoạn đôi/ba) để tìm ra đáp án.'
    },
    {
        id: 6,
        question: 'Chiến lược được đề xuất cho câu hỏi SUY LUẬN (Inference) là gì?',
        options: [ { key: 'A', text: 'Làm câu đó đầu tiên vì nó quan trọng nhất.' }, { key: 'B', text: 'Bỏ qua câu đó vì nó quá khó.' }, { key: 'C', text: 'Đọc 4 đáp án trước để hiểu chủ đề, giải các câu dễ xung quanh, rồi quay lại giải nó sau cùng.' }, { key: 'D', text: 'Chỉ đọc câu đầu và câu cuối của đoạn văn.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Tư duy ngược là chiến lược hiệu quả: đọc đáp án trước để nắm bối cảnh, giải các câu dễ để thu thập thông tin, rồi quay lại giải câu suy luận.'
    },
    {
        id: 7,
        question: 'Đối với câu hỏi điền vào chỗ trống, nếu thiếu thời gian, chiến lược "đánh lụi" được đề xuất là gì?',
        options: [ { key: 'A', text: 'Luôn chọn A' }, { key: 'B', text: 'Luôn chọn D' }, { key: 'C', text: 'Đánh lụi đáp án B hoặc C' }, { key: 'D', text: 'Bỏ qua không làm' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng vậy! Vì tốn thời gian, chiến lược đề xuất là nếu không chắc chắn, hãy chọn B hoặc C để tối ưu hóa thời gian.'
    },
    {
        id: 8,
        question: 'Trong câu hỏi NGOẶC KÉP, ngoài việc dịch câu trong ngoặc, bạn cần làm gì?',
        options: [ { key: 'A', text: 'Tìm một mốc thời gian trong câu hỏi và một mốc thời gian liền trước nó trong bài đọc.' }, { key: 'B', text: 'Chỉ cần tìm từ đồng nghĩa.' }, { key: 'C', text: 'Đếm số từ trong câu ngoặc kép.' }, { key: 'D', text: 'Bỏ qua câu ngoặc kép.' } ],
        correctAnswer: 'A',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Chiến lược là lấy mốc thời gian trong câu hỏi, tìm mốc thời gian liền trước trong bài, và kết hợp ngữ cảnh của cả hai để suy luận ý nghĩa.'
    },
    {
        id: 9,
        question: 'Trong 5 câu hỏi của một đoạn văn đôi/ba, câu "bê đê" có xác suất xuất hiện cao nhất ở vị trí nào?',
        options: [ { key: 'A', text: 'Câu 1 và 2' }, { key: 'B', text: 'Câu 5' }, { key: 'C', text: 'Câu 3 và 4' }, { key: 'D', text: 'Câu 1 và 5' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Theo phân tích xác suất (30% và 40%), câu hỏi số 3 và 4 có khả năng cao nhất là câu "bê đê".'
    },
    {
        id: 10,
        question: 'Khi khai thác email, đuôi email ".org" thường gợi ý nội dung liên quan đến lĩnh vực nào?',
        options: [ { key: 'A', text: 'Chính phủ (government)' }, { key: 'B', text: 'Giáo dục (education)' }, { key: 'C', text: 'Công ty (company)' }, { key: 'D', text: 'Tổ chức từ thiện, gây quỹ (organization)' } ],
        correctAnswer: 'D',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Đuôi ".org" là viết tắt của "organization", thường liên quan đến các tổ chức phi lợi nhuận, từ thiện, gây quỹ.'
    },
    {
        id: 11,
        question: 'Để tìm đáp án cho câu hỏi LÝ DO (Reason), bạn nên tìm kiếm những từ nào sau đây?',
        options: [ { key: 'A', text: 'please, would you, could you' }, { key: 'B', text: 'and, plus, more' }, { key: 'C', text: 'to, for, because, due to' }, { key: 'D', text: 'probably, most likely' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Các từ như "to", "for", "because", "due to", "in order to"... là những dấu hiệu mạnh mẽ cho thấy lý do của một hành động.'
    },
    {
        id: 12,
        question: 'Part 7 bao gồm bao nhiêu đoạn văn đơn?',
        options: [ { key: 'A', text: '10 đoạn' }, { key: 'B', text: '2 đoạn' }, { key: 'C', text: '3 đoạn' }, { key: 'D', text: '5 đoạn' } ],
        correctAnswer: 'A',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Theo cấu trúc đề thi, Part 7 có 10 đoạn văn đơn, từ câu 147 đến 175.'
    },
    {
        id: 13,
        question: 'Part 7 có bao nhiêu đoạn văn ba?',
        options: [ { key: 'A', text: '1 đoạn' }, { key: 'B', text: '2 đoạn' }, { key: 'C', text: '3 đoạn' }, { key: 'D', text: '4 đoạn' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Theo cấu trúc, Part 7 có 3 đoạn văn ba, tương ứng với các câu 186-190, 191-195, và 196-200.'
    },
    {
        id: 14,
        question: 'Từ nào sau đây là dấu hiệu mạnh mẽ cho một câu hỏi YÊU CẦU (Request)?',
        options: [ { key: 'A', text: 'because' }, { key: 'B', text: 'probably' }, { key: 'C', text: 'yesterday' }, { key: 'D', text: 'please' } ],
        correctAnswer: 'D',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Các từ như "please", "would you", "request", "ask" là dấu hiệu của một câu hỏi yêu cầu.'
    },
    {
        id: 15,
        question: 'Trong một email, nếu ngày gửi email SỚM HƠN ngày trong nội dung, chủ đề của email có thể là gì?',
        options: [ { key: 'A', text: 'Đổi trả sản phẩm đã mua' }, { key: 'B', text: 'Khiếu nại về một sự kiện đã qua' }, { key: 'C', text: 'Tuyển dụng cho một vị trí sắp tới' }, { key: 'D', text: 'Hoàn tiền cho đơn hàng cũ' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Nếu ngày gửi sớm hơn, điều đó cho thấy sự kiện trong email là một sự kiện TƯƠNG LAI, ví dụ như khai trương, tuyển dụng, hoặc sự kiện gây quỹ.'
    },
    {
        id: 16,
        question: 'Trong một quảng cáo tuyển dụng, từ "vacancy" có nghĩa là gì?',
        options: [ { key: 'A', text: 'Kỳ nghỉ' }, { key: 'B', text: 'Chỗ trống, vị trí cần tuyển' }, { key: 'C', text: 'Bằng cấp' }, { key: 'D', text: 'Lương bổng' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! "Vacancy", "opening", "slot" đều có nghĩa là vị trí trống cần tuyển dụng.'
    },
    {
        id: 17,
        question: 'Theo chiến lược phân bổ thời gian, một đoạn văn có 4 câu hỏi thì nên làm trong bao nhiêu phút?',
        options: [ { key: 'A', text: '2 phút' }, { key: 'B', text: '4 phút' }, { key: 'C', text: '6 phút' }, { key: 'D', text: '8 phút' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Chiến lược là cứ một đoạn có bao nhiêu câu hỏi thì làm bấy nhiêu phút. 4 câu hỏi tương ứng với 4 phút.'
    },
    {
        id: 18,
        question: 'Đối với câu hỏi ĐỒNG NGHĨA, bước đầu tiên của chiến lược là gì?',
        options: [ { key: 'A', text: 'Đoán mò' }, { key: 'B', text: 'Dịch chặn 2 đầu từ vựng trên đoạn văn' }, { key: 'C', text: 'Dịch TỪ trong ngoặc ở câu hỏi' }, { key: 'D', text: 'Bỏ qua câu hỏi' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Bước 1 là dịch từ trong ngoặc, bước 2 là dịch 4 đáp án, bước 3 mới là xem xét ngữ cảnh nếu cần.'
    },
    {
        id: 19,
        question: 'Khi áp dụng tiêu chí "Tâm trạng" (Mood) cho câu hỏi điền vào chỗ trống, nếu câu cần điền có "however", điều đó gợi ý gì?',
        options: [ { key: 'A', text: 'Câu trước và sau phải cùng tâm trạng tích cực.' }, { key: 'B', text: 'Câu trước và sau phải cùng tâm trạng tiêu cực.' }, { key: 'C', text: 'Câu trước và sau phải có tâm trạng tương phản (tích cực-tiêu cực hoặc ngược lại).' }, { key: 'D', text: 'Câu đó không liên quan đến tâm trạng.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Các từ tương phản như "but", "however" cho thấy sự đối lập về tâm trạng hoặc ý nghĩa giữa câu trước và câu cần điền.'
    },
    {
        id: 20,
        question: 'Một email có đuôi ".gov" thường liên quan đến nội dung gì?',
        options: [ { key: 'A', text: 'Sản phẩm, dịch vụ của một công ty' }, { key: 'B', text: 'Các vấn đề vĩ mô như dân số, môi trường từ chính phủ' }, { key: 'C', text: 'Một khóa học mới từ trường đại học' }, { key: 'D', text: 'Hoạt động gây quỹ của một tổ chức' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! ".gov" là viết tắt của "government", thường đề cập đến các vấn đề của chính phủ.'
    },
    {
        id: 21,
        question: 'Câu hỏi nào sau đây có khả năng là câu "bê đê" nhất?',
        options: [ { key: 'A', text: 'What is the purpose of the e-mail?' }, { key: 'B', text: 'What is mentioned about the library?' }, { key: 'C', text: 'What is probably true about Ms. Jones?' }, { key: 'D', text: 'When will the event take place?' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Các từ "probably" hoặc "most likely" là những dấu hiệu mạnh cho thấy đây là một câu "bê đê" (suy luận kết hợp).'
    },
    {
        id: 22,
        question: 'Nếu người gửi email có chức vụ "Human Resources" (HR), nội dung email có khả năng cao nhất là về gì?',
        options: [ { key: 'A', text: 'Kiểm tra, thanh tra nhà máy' }, { key: 'B', text: 'Tuyển dụng hoặc bồi hoàn công tác phí' }, { key: 'C', text: 'Đổi trả sản phẩm bị lỗi' }, { key: 'D', text: 'Giới thiệu sản phẩm mới' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! HR (Nhân sự) thường xử lý các vấn đề liên quan đến tuyển dụng, lương bổng, và công tác phí.'
    },
    {
        id: 23,
        question: 'Theo chiến lược, có tổng cộng bao nhiêu câu hỏi "ngoặc kép" trong bài thi Part 7?',
        options: [ { key: 'A', text: '1 câu' }, { key: 'B', text: '2 câu' }, { key: 'C', text: '3 câu' }, { key: 'D', text: 'Không có câu nào' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Thông thường có 2 câu hỏi ngoặc kép, một câu ở mức trung bình và một câu khó.'
    },
    {
        id: 24,
        question: 'Đối với câu hỏi "Danh từ riêng chi tiết", chiến lược làm bài hiệu quả nhất là gì?',
        options: [ { key: 'A', text: 'Dịch toàn bộ bài đọc.' }, { key: 'B', text: 'Scan (dò) nhanh tên riêng/số/ngày tháng trong bài và tìm đáp án xung quanh nó.' }, { key: 'C', text: 'Đoán mò đáp án.' }, { key: 'D', text: 'Tìm câu trả lời ở đoạn cuối cùng.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Đây là loại câu hỏi dễ, chỉ cần scan từ khóa và tìm thông tin liên quan ngay tại vị trí đó.'
    },
    {
        id: 25,
        question: 'Trong email, nếu ngày gửi là 15/10 và nội dung đề cập đến một sự kiện vào ngày 12/10, email đó có thể về vấn đề gì?',
        options: [ { key: 'A', text: 'Thông báo khai trương' }, { key: 'B', text: 'Giới thiệu sản phẩm mới' }, { key: 'C', text: 'Mời tham dự sự kiện' }, { key: 'D', text: 'Hoàn tiền cho một sản phẩm đã mua' } ],
        correctAnswer: 'D',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Ngày gửi trễ hơn ngày trong email cho thấy đây là một sự kiện quá khứ, thường liên quan đến các vấn đề hậu mãi như đổi trả, hoàn tiền.'
    },
    {
        id: 26,
        question: 'Câu hỏi đoạn đôi đầu tiên trong Part 7 nằm trong khoảng nào?',
        options: [ { key: 'A', text: '147-175' }, { key: 'B', text: '176-180' }, { key: 'C', text: '181-185' }, { key: 'D', text: '186-190' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Đoạn văn đôi thứ nhất bắt đầu từ câu 176 đến 180.'
    },
    {
        id: 27,
        question: 'Theo tiêu chí "Thứ tự" cho câu điền vào chỗ trống, một câu mang nghĩa giới thiệu nên được đặt ở đâu?',
        options: [ { key: 'A', text: 'Vị trí [1]' }, { key: 'B', text: 'Vị trí [2] hoặc [3]' }, { key: 'C', text: 'Vị trí [4]' }, { key: 'D', text: 'Bất kỳ vị trí nào' } ],
        correctAnswer: 'A',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Câu mang tính giới thiệu, khái quát thường nằm ở vị trí đầu tiên, tức là vị trí [1].'
    },
    {
        id: 28,
        question: 'Nếu người gửi email là "Customer Service Representative", nội dung có khả năng cao nhất là gì?',
        options: [ { key: 'A', text: 'Giải quyết vấn đề của khách hàng hoặc đổi trả sản phẩm' }, { key: 'B', text: 'Thông báo tuyển dụng' }, { key: 'C', text: 'Thông báo về chính sách môi trường của chính phủ' }, { key: 'D', text: 'Báo cáo về một đợt thanh tra nhà máy' } ],
        correctAnswer: 'A',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! "Đại diện Dịch vụ Khách hàng" chuyên giải quyết các vấn đề liên quan đến sản phẩm và dịch vụ cho khách hàng.'
    },
    {
        id: 29,
        question: 'Đâu KHÔNG phải là một trong 12 dạng đoạn văn thường gặp trong Part 7?',
        options: [ { key: 'A', text: 'Email' }, { key: 'B', text: 'Quảng cáo (Advertisement)' }, { key: 'C', text: 'Bài thơ (Poem)' }, { key: 'D', text: 'Tin nhắn (Text Message)' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng vậy, Part 7 thường bao gồm các dạng văn bản kinh doanh và đời thường, không bao gồm thơ ca.'
    },
    {
        id: 30,
        question: 'Theo chiến lược, bạn nên làm gì khi gặp một câu "bê đê" có 4 đáp án đều xuất hiện trong bài thi?',
        options: [ { key: 'A', text: 'Chọn ngay đáp án A.' }, { key: 'B', text: 'Nhận diện đây là dấu hiệu của câu "bê đê" và tiến hành kết hợp dữ liệu từ các đoạn văn.' }, { key: 'C', text: 'Bỏ qua câu hỏi này.' }, { key: 'D', text: 'Chọn đáp án dài nhất.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Khi cả 4 đáp án đều có trong bài, đó là một dấu hiệu mạnh cho thấy bạn cần kết hợp thông tin từ nhiều đoạn để tìm ra câu trả lời đúng.'
    },
    {
        id: 31,
        question: 'Theo phân bố xác suất câu "bê đê", câu hỏi số 2 trong một cụm 5 câu có bao nhiêu phần trăm khả năng là câu "bê đê"?',
        options: [ { key: 'A', text: '0%' }, { key: 'B', text: '10%' }, { key: 'C', text: '30%' }, { key: 'D', text: '40%' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Tỷ lệ phân bố là 0%-10%-30%-40%-20%, vậy câu số 2 có 10% khả năng.'
    },
    {
        id: 32,
        question: 'Nếu một câu điền vào chỗ trống mang nghĩa kết luận, nó thường nằm ở vị trí nào?',
        options: [ { key: 'A', text: 'Vị trí [1]' }, { key: 'B', text: 'Vị trí [2]' }, { key: 'C', text: 'Vị trí [3]' }, { key: 'D', text: 'Vị trí [4]' } ],
        correctAnswer: 'D',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Theo tiêu chí "Thứ tự", câu mang tính chất tóm tắt, kết luận thường nằm ở vị trí cuối cùng, tức là [4].'
    },
    {
        id: 33,
        question: 'Trong một email có nhiều ngày tháng được liệt kê, chủ đề có khả năng cao nhất là gì?',
        options: [ { key: 'A', text: 'Một sự kiện khai trương' }, { key: 'B', text: 'Một thông báo tuyển dụng' }, { key: 'C', text: 'Một thẻ thành viên (ngày hết hạn, gia hạn)' }, { key: 'D', text: 'Một lời phàn nàn về sản phẩm' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Nhiều mốc thời gian thường liên quan đến các chương trình thành viên, bao gồm ngày đăng ký, ngày hết hạn, và ngày gia hạn.'
    },
    {
        id: 34,
        question: 'Tiêu chí "Giới tính" (Gender/Pronoun) trong chiến lược điền vào chỗ trống nghĩa là gì?',
        options: [ { key: 'A', text: 'Chỉ điền câu có chủ ngữ là nam.' }, { key: 'B', text: 'Câu cần điền phải có chủ ngữ (he, she, it, they) phù hợp với đối tượng được nhắc đến ở câu liền trước.' }, { key: 'C', text: 'Chỉ điền câu có chủ ngữ là nữ.' }, { key: 'D', text: 'Tất cả các câu điền vào chỗ trống đều nói về giới tính.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Tiêu chí này yêu cầu kiểm tra sự liên kết về đại từ. Nếu câu trước nói về "Mr. Smith", câu sau có thể bắt đầu bằng "He".'
    },
    {
        id: 35,
        question: 'Đâu là câu hỏi KHÔNG thuộc 9 loại câu hỏi chính của Part 7?',
        options: [ { key: 'A', text: 'Câu hỏi Yêu cầu' }, { key: 'B', text: 'Câu hỏi Đồng nghĩa' }, { key: 'C', text: 'Câu hỏi Lịch sử' }, { key: 'D', text: 'Câu hỏi Not True' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! 9 loại câu hỏi chính là Chủ đề, Chi tiết, Yêu cầu, Lí do, Not True, Suy luận, Đồng nghĩa, Ngoặc kép, và Điền vào chỗ trống.'
    },
    {
        id: 36,
        question: 'Nếu gặp một quảng cáo có các từ "seeking", "searching", "looking for", đây là loại quảng cáo gì?',
        options: [ { key: 'A', text: 'Quảng cáo sản phẩm' }, { key: 'B', text: 'Quảng cáo tuyển dụng' }, { key: 'C', text: 'Quảng cáo sự kiện' }, { key: 'D', text: 'Quảng cáo giảm giá' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Các từ này có nghĩa là "tìm kiếm", là dấu hiệu rõ ràng của một quảng cáo tuyển dụng nhân sự.'
    },
    {
        id: 37,
        question: 'Chiến lược cuối cùng cho câu hỏi đồng nghĩa nếu vẫn còn phân vân 50/50 là gì?',
        options: [ { key: 'A', text: 'Chọn đáp án dài nhất' }, { key: 'B', text: 'Dịch chặn 2 đầu từ vựng trên đoạn văn để lấy ngữ cảnh' }, { key: 'C', text: 'Chọn đáp án có vẻ quen thuộc nhất' }, { key: 'D', text: 'Đoán mò' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Bước 3 của chiến lược là đặt từ vào ngữ cảnh trong bài đọc, dịch câu chứa nó (chặn 2 đầu) để xác định nghĩa chính xác nhất.'
    },
    {
        id: 38,
        question: 'Đuôi email ".edu" thường gợi ý nội dung về lĩnh vực nào?',
        options: [ { key: 'A', text: 'Giáo dục, khóa học, trường học' }, { key: 'B', text: 'Chính phủ, chính sách' }, { key: 'C', text: 'Công ty, sản phẩm' }, { key: 'D', text: 'Tổ chức, từ thiện' } ],
        correctAnswer: 'A',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! ".edu" là viết tắt của "education", liên quan đến giáo dục.'
    },
    {
        id: 39,
        question: 'Trong đoạn văn ba thứ hai, các câu hỏi nằm trong khoảng nào?',
        options: [ { key: 'A', text: '181-185' }, { key: 'B', text: '186-190' }, { key: 'C', text: '191-195' }, { key: 'D', text: '196-200' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Đoạn ba thứ hai tương ứng với các câu hỏi từ 191 đến 195.'
    },
    {
        id: 40,
        question: 'Nếu chức danh người gửi email là "Factory Manager", nội dung email có thể liên quan đến việc gì?',
        options: [ { key: 'A', text: 'Tuyển dụng nhân viên mới' }, { key: 'B', text: 'Đổi trả một sản phẩm hỏng' }, { key: 'C', text: 'Chuẩn bị cho một đợt thanh tra nhà máy' }, { key: 'D', text: 'Mời tham dự một khóa học' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! "Quản lý nhà máy" thường liên quan đến các hoạt động sản xuất, kiểm tra, thanh tra tại nhà máy.'
    },
    {
        id: 41,
        question: 'Từ nào sau đây KHÔNG phải là dấu hiệu của câu hỏi LÝ DO?',
        options: [ { key: 'A', text: 'because of' }, { key: 'B', text: 'in order to' }, { key: 'C', text: 'due to' }, { key: 'D', text: 'in addition' } ],
        correctAnswer: 'D',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! "in addition" (thêm vào đó) là dấu hiệu của câu hỏi NOT TRUE, dùng để thêm thông tin, không phải chỉ lý do.'
    },
    {
        id: 42,
        question: 'Theo tiêu chí "Thì" (Tense) trong câu điền vào chỗ trống, bạn nên làm gì?',
        options: [ { key: 'A', text: 'Luôn chọn thì hiện tại đơn.' }, { key: 'B', text: 'Kiểm tra xem động từ của câu cần điền có cùng thì (quá khứ, hiện tại, tương lai) với câu liền trước không.' }, { key: 'C', text: 'Luôn chọn thì tương lai.' }, { key: 'D', text: 'Không cần quan tâm đến thì.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Sự liên kết về thì giữa các câu là một manh mối quan trọng. Câu trước ở thì quá khứ thì câu sau cũng có khả năng ở thì quá khứ.'
    },
    {
        id: 43,
        question: 'Mục đích chính của chiến lược "tư duy ngược" cho câu hỏi Suy luận là gì?',
        options: [ { key: 'A', text: 'Để làm bài nhanh hơn.' }, { key: 'B', text: 'Để đoán trước nội dung chính của đoạn văn thông qua các đáp án, giúp giải các câu dễ hơn.' }, { key: 'C', text: 'Để kiểm tra lại đáp án.' }, { key: 'D', text: 'Để bỏ qua câu hỏi khó.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Bằng cách đọc đáp án của câu khó trước, bạn có thể nắm được ý chính của đoạn văn, từ đó giải quyết các câu dễ xung quanh một cách hiệu quả hơn.'
    },
    {
        id: 44,
        question: 'Có bao nhiêu đoạn văn đôi trong Part 7?',
        options: [ { key: 'A', text: '1 đoạn' }, { key: 'B', text: '2 đoạn' }, { key: 'C', text: '3 đoạn' }, { key: 'D', text: '4 đoạn' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Part 7 có 2 đoạn văn đôi: 176-180 và 181-185.'
    },
    {
        id: 45,
        question: 'Biểu tượng đinh ghim hoặc các từ "attached", "enclosed" trong email gợi ý điều gì?',
        options: [ { key: 'A', text: 'Email bị lỗi.' }, { key: 'B', text: 'Email có tệp đính kèm.' }, { key: 'C', text: 'Email rất khẩn cấp.' }, { key: 'D', text: 'Email đã được gửi cho nhiều người.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Đây là những dấu hiệu rõ ràng cho thấy email có một tệp tin được gửi kèm theo.'
    },
    {
        id: 46,
        question: 'Từ "BA" trong một quảng cáo tuyển dụng là viết tắt của gì?',
        options: [ { key: 'A', text: 'Business Administration' }, { key: 'B', text: 'Bachelor of Arts (Cử nhân)' }, { key: 'C', text: 'Basic Applicant' }, { key: 'D', text: 'Best Applicant' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! BA là viết tắt của Bachelor of Arts, tức là bằng Cử nhân. MA là Master of Arts (Thạc sĩ).'
    },
    {
        id: 47,
        question: 'Khi một câu hỏi Yêu cầu có từ "ask", "request", hoặc "help", đáp án thường nằm ở đâu?',
        options: [ { key: 'A', text: 'Đầu đoạn văn' }, { key: 'B', text: 'Cuối đoạn văn' }, { key: 'C', text: 'Xung quanh các từ "please", "would you", "if",... hoặc các động từ nhờ vả' }, { key: 'D', text: 'Không có quy luật' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! Câu hỏi yêu cầu thường có đáp án nằm ở các câu nhờ vả, làm ơn trong bài đọc.'
    },
    {
        id: 48,
        question: 'Theo chiến lược, câu hỏi đơn cuối cùng của Part 7 là câu số mấy?',
        options: [ { key: 'A', text: '170' }, { key: 'B', text: '175' }, { key: 'C', text: '180' }, { key: 'D', text: '200' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Phần đoạn đơn kéo dài từ câu 147 đến 175.'
    },
    {
        id: 49,
        question: 'Đuôi email ".com" thường gợi ý nội dung về lĩnh vực nào?',
        options: [ { key: 'A', text: 'Tổ chức từ thiện' }, { key: 'B', text: 'Giáo dục' }, { key: 'C', text: 'Sản phẩm, dịch vụ của một công ty' }, { key: 'D', text: 'Chính phủ' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết',
        explanation_vi: 'Đúng! ".com" là viết tắt của "company" hoặc "commercial", liên quan đến các công ty và hoạt động thương mại.'
    },
    {
        id: 50,
        question: 'Nếu câu cần điền vào chỗ trống chứa nhiều chi tiết, ngày tháng, tên riêng, nó có khả năng nằm ở vị trí nào nhất?',
        options: [ { key: 'A', text: 'Vị trí [1] (đầu tiên)' }, { key: 'B', text: 'Vị trí [2] hoặc [3] (ở giữa)' }, { key: 'C', text: 'Vị trí [4] (cuối cùng)' }, { key: 'D', text: 'Không thể xác định' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết',
        explanation_vi: 'Chính xác! Theo tiêu chí "Thứ tự", các câu chứa nhiều chi tiết cụ thể thường nằm ở phần thân bài, tức là vị trí [2] hoặc [3].'
    }
]
