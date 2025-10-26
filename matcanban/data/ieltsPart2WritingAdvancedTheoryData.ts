import { IeltsPart2WritingAdvancedTheoryQuestion } from '../../types';

export const ieltsPart2WritingAdvancedTheoryData: IeltsPart2WritingAdvancedTheoryQuestion[] = [
    {
        id: 1,
        question: 'Ngôn ngữ "Hedging" (ví dụ: "It could be argued that...") có vai trò gì trong bài luận học thuật?',
        options: [
            { key: 'A', text: 'Làm cho bài viết yếu đi và thiếu tự tin.' },
            { key: 'B', text: 'Thể hiện sự khách quan và tránh các khẳng định tuyệt đối, một đặc điểm của văn phong học thuật.' },
            { key: 'C', text: 'Chỉ dùng để kéo dài số từ.' },
            { key: 'D', text: 'Chỉ dùng trong Mở bài.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Chính xác! "Hedging" là kỹ thuật dùng ngôn ngữ một cách thận trọng (ví dụ: "tend to", "seem to", "may suggest") để đưa ra các lập luận một cách khách quan, tránh những tuyên bố tuyệt đối ("always", "never") vốn không mang tính học thuật.'
    },
    {
        id: 2,
        question: 'Trong câu "Not only is this approach expensive, but it is also time-consuming.", cấu trúc ngữ pháp nào đã được sử dụng?',
        options: [
            { key: 'A', text: 'Câu bị động (Passive voice)' },
            { key: 'B', text: 'Câu chẻ (Cleft sentence)' },
            { key: 'C', text: 'Đảo ngữ (Inversion)' },
            { key: 'D', text: 'Mệnh đề quan hệ (Relative clause)' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Đúng! Khi "Not only" đứng đầu câu để nhấn mạnh, mệnh đề ngay sau nó phải được đảo ngữ (đưa trợ động từ lên trước chủ ngữ). Đây là một cách hiệu quả để tăng điểm Grammatical Range.'
    },
    {
        id: 3,
        question: 'Cụm từ "a significant portion" đồng nghĩa với lựa chọn nào sau đây nhất?',
        options: [
            { key: 'A', text: 'a small number' },
            { key: 'B', text: 'an unimportant part' },
            { key: 'C', text: 'a large and important part' },
            { key: 'D', text: 'the whole thing' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Chính xác! "A significant portion" có nghĩa là "một phần lớn và quan trọng", là một cách diễn đạt học thuật hơn cho "a big part".'
    },
    {
        id: 4,
        question: 'Chức năng chính của một "concession statement" (câu nhượng bộ) trong thân bài là gì?',
        options: [
            { key: 'A', text: 'Để bác bỏ hoàn toàn quan điểm đối lập.' },
            { key: 'B', text: 'Để thừa nhận một điểm hợp lệ của phe đối lập trước khi phản bác lại nó, cho thấy một lập luận cân bằng.' },
            { key: 'C', text: 'Để đồng ý hoàn toàn với phe đối lập.' },
            { key: 'D', text: 'Để giới thiệu một ví dụ.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Đúng! Một câu nhượng bộ (ví dụ: "While it is true that..., it is more important to consider...") cho thấy bạn có một cái nhìn đa chiều, làm cho lập luận của bạn trở nên mạnh mẽ và thuyết phục hơn.'
    },
    {
        id: 5,
        question: 'Lỗi logic "Hasty Generalization" (Khái quát hóa vội vã) là gì?',
        options: [
            { key: 'A', text: 'Đưa ra một kết luận dựa trên bằng chứng không đủ hoặc ví dụ đơn lẻ.' },
            { key: 'B', text: 'Tấn công cá nhân người đưa ra lập luận.' },
            { key: 'C', text: 'Lặp lại ý tưởng bằng các từ khác nhau.' },
            { key: 'D', text: 'Đưa ra một kết luận không liên quan đến tiền đề.' }
        ],
        correctAnswer: 'A',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Chính xác! Ví dụ, nói rằng "My friend became a successful YouTuber, therefore anyone can succeed without a university degree" là một sự khái quát hóa vội vã. Hãy tránh lỗi này bằng cách dùng ngôn ngữ hedging.'
    },
    {
        id: 6,
        question: 'Đâu là cách hiệu quả nhất để đảm bảo sự liên kết (cohesion) giữa các câu?',
        options: [
            { key: 'A', text: 'Lặp lại cùng một danh từ nhiều lần.' },
            { key: 'B', text: 'Sử dụng các đại từ (it, they, this) và từ đồng nghĩa để tham chiếu lại các ý tưởng đã nêu.' },
            { key: 'C', text: 'Viết các câu thật ngắn.' },
            { key: 'D', text: 'Bắt đầu mỗi câu bằng "And".' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Đúng! Sử dụng các phương tiện tham chiếu như đại từ ("This issue...") và từ đồng nghĩa giúp kết nối các câu một cách mượt mà, tránh sự lặp lại đơn điệu và cải thiện điểm CC.'
    },
    {
        id: 7,
        question: 'Một "thesis statement" mạnh nên có đặc điểm gì?',
        options: [
            { key: 'A', text: 'Mơ hồ và chung chung.' },
            { key: 'B', text: 'Chỉ lặp lại đề bài.' },
            { key: 'C', text: 'Nêu rõ quan điểm của bạn và/hoặc các ý chính sẽ được triển khai trong bài.' },
            { key: 'D', text: 'Là một câu hỏi.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Chính xác! Một thesis statement mạnh mẽ và rõ ràng là kim chỉ nam cho toàn bộ bài luận của bạn. Nó cho giám khảo biết chính xác bạn sẽ viết về điều gì.'
    },
    {
        id: 8,
        question: 'Trong dạng bài "Advantages and Disadvantages", nếu đề bài hỏi "Do the advantages outweigh the disadvantages?", bạn phải làm gì?',
        options: [
            { key: 'A', text: 'Chỉ cần liệt kê ưu và nhược điểm.' },
            { key: 'B', text: 'Thảo luận cả ưu và nhược điểm, sau đó đưa ra kết luận rõ ràng về việc bên nào quan trọng hơn.' },
            { key: 'C', text: 'Chỉ thảo luận về ưu điểm.' },
            { key: 'D', text: 'Chỉ thảo luận về nhược điểm.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Đúng! Cụm từ "outweigh" yêu cầu bạn phải đưa ra một sự phán xét. Bạn không thể chỉ thảo luận hai mặt một cách cân bằng mà phải kết luận rõ ràng rằng ưu điểm hay nhược điểm lớn hơn.'
    },
    {
        id: 9,
        question: 'Cụm từ "a dearth of" có nghĩa là gì?',
        options: [
            { key: 'A', text: 'sự dư thừa' },
            { key: 'B', text: 'sự tăng trưởng' },
            { key: 'C', text: 'sự thiếu hụt nghiêm trọng' },
            { key: 'D', text: 'một ý tưởng' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Chính xác! "A dearth of" là một cách diễn đạt học thuật cho "a lack of" hoặc "a shortage of", có nghĩa là sự thiếu thốn, khan hiếm.'
    },
    {
        id: 10,
        question: 'Để đạt điểm cao cho Lexical Resource, bạn nên tập trung vào điều gì?',
        options: [
            { key: 'A', text: 'Sử dụng thật nhiều thành ngữ.' },
            { key: 'B', text: 'Sử dụng từ vựng chủ đề (topic-specific vocabulary) và các cụm từ (collocations) một cách chính xác.' },
            { key: 'C', text: 'Sử dụng các từ rất dài và phức tạp.' },
            { key: 'D', text: 'Không mắc lỗi chính tả.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Đúng! Giám khảo đánh giá cao việc bạn sử dụng đúng các từ vựng liên quan trực tiếp đến chủ đề và các cụm từ tự nhiên (ví dụ: "environmental degradation", "sustainable development") hơn là việc nhồi nhét các thành ngữ không liên quan.'
    },
    {
        id: 11,
        question: 'Câu nào sau đây sử dụng "nominalisation" (danh từ hóa) hiệu quả nhất để tăng tính học thuật?',
        options: [
            { key: 'A', text: 'Because the city developed quickly, it had many problems.' },
            { key: 'B', text: 'The city developing quickly was a problem.' },
            { key: 'C', text: 'The rapid development of the city led to numerous problems.' },
            { key: 'D', text: 'The city had problems. It developed quickly.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Chính xác! Danh từ hóa (biến động từ "develop" thành danh từ "development") giúp câu văn trở nên cô đọng và khách quan hơn, một đặc điểm của văn phong học thuật.'
    },
    {
        id: 12,
        question: 'Đâu là cách diễn đạt tốt nhất để giới thiệu một luận điểm phản bác (counter-argument)?',
        options: [
            { key: 'A', text: 'But, some people think...' },
            { key: 'B', text: 'On the other hand, it is wrong to say that...' },
            { key: 'C', text: 'However, this is not true because...' },
            { key: 'D', text: 'Admittedly, some might argue that... However, this view is flawed because...' }
        ],
        correctAnswer: 'D',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Đúng! Cách diễn đạt "Admittedly..." (Phải thừa nhận rằng...) thể hiện sự nhượng bộ trước khi đưa ra lập luận phản bác, cho thấy một tư duy phản biện phức tạp và cân bằng.'
    },
    {
        id: 13,
        question: 'Từ "exacerbate" có nghĩa là gì?',
        options: [
            { key: 'A', text: 'Giải quyết một vấn đề.' },
            { key: 'B', text: 'Làm cho một vấn đề trở nên tồi tệ hơn.' },
            { key: 'C', text: 'Tạo ra một vấn đề mới.' },
            { key: 'D', text: 'Phớt lờ một vấn đề.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Chính xác! "Exacerbate" là một động từ học thuật có nghĩa là làm trầm trọng thêm một vấn đề. Ví dụ: "Poor urban planning can exacerbate traffic congestion."'
    },
    {
        id: 14,
        question: 'Cấu trúc "The former... the latter..." được dùng để làm gì?',
        options: [
            { key: 'A', text: 'Để so sánh hai thứ không liên quan.' },
            { key: 'B', text: 'Để chỉ hai thứ trong tương lai.' },
            { key: 'C', text: 'Để tham chiếu lại hai đối tượng vừa được nhắc đến, "the former" chỉ đối tượng thứ nhất và "the latter" chỉ đối tượng thứ hai.' },
            { key: 'D', text: 'Để chỉ sự đồng ý.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Đúng! Đây là một công cụ liên kết (cohesive device) hiệu quả để tránh lặp lại từ. Ví dụ: "Both urban and rural areas face challenges; the former struggles with pollution, while the latter deals with a lack of opportunities."'
    },
    {
        id: 15,
        question: 'Trong câu "This measure is likely to be counter-productive", từ "counter-productive" có nghĩa là gì?',
        options: [
            { key: 'A', text: 'Rất hiệu quả.' },
            { key: 'B', text: 'Không có tác dụng.' },
            { key: 'C', text: 'Tốn kém.' },
            { key: 'D', text: 'Phản tác dụng, mang lại kết quả ngược với mong muốn.' }
        ],
        correctAnswer: 'D',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Chính xác! "Counter-productive" là một tính từ cao cấp để chỉ một hành động hoặc biện pháp không những không giải quyết được vấn đề mà còn làm nó tệ hơn.'
    },
    {
        id: 16,
        question: 'Đâu là cách tốt nhất để thể hiện mối quan hệ nguyên nhân - kết quả?',
        options: [
            { key: 'A', text: 'Firstly... secondly...' },
            { key: 'B', text: 'This leads to... / As a result,...' },
            { key: 'C', text: 'In contrast,... / However,...' },
            { key: 'D', text: 'For instance,...' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Đúng! Các cụm từ như "This leads to", "consequently", "as a result", "therefore" được dùng để chỉ rõ mối quan hệ kết quả, làm tăng tính logic (Cohesion) cho bài viết.'
    },
    {
        id: 17,
        question: 'Một "topic sentence" (câu chủ đề) KHÔNG nên làm gì?',
        options: [
            { key: 'A', text: 'Nêu ý chính của đoạn văn.' },
            { key: 'B', text: 'Liên kết với thesis statement.' },
            { key: 'C', text: 'Quá chung chung hoặc quá chi tiết.' },
            { key: 'D', text: 'Kiểm soát nội dung của đoạn văn.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Chính xác! Một câu chủ đề tốt phải đủ cụ thể để định hướng cho đoạn văn nhưng cũng đủ khái quát để bao hàm các ý hỗ trợ sẽ được trình bày.'
    },
    {
        id: 18,
        question: 'Để tránh những khẳng định tuyệt đối, thay vì nói "Technology always causes social isolation", bạn nên nói gì?',
        options: [
            { key: 'A', text: 'Technology never causes social isolation.' },
            { key: 'B', text: 'Technology can sometimes lead to a sense of social isolation.' },
            { key: 'C', text: 'Technology is social isolation.' },
            { key: 'D', text: 'Technology is good.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Đúng! Câu B sử dụng ngôn ngữ hedging ("can sometimes lead to", "a sense of") làm cho lập luận trở nên hợp lý và học thuật hơn là một tuyên bố tuyệt đối và dễ bị bác bỏ.'
    },
    {
        id: 19,
        question: 'Đâu là một ví dụ về lỗi logic "False Dichotomy" (Lưỡng phân sai lầm)?',
        options: [
            { key: 'A', text: 'We must either invest in space exploration or solve poverty on Earth.' },
            { key: 'B', text: 'Investing in space exploration is expensive.' },
            { key: 'C', text: 'Some people support space exploration, while others oppose it.' },
            { key: 'D', text: 'Space exploration has led to technological advancements.' }
        ],
        correctAnswer: 'A',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Chính xác! Lỗi này xảy ra khi một người đưa ra chỉ hai lựa chọn như thể đó là những khả năng duy nhất, trong khi thực tế có thể có nhiều lựa chọn khác (ví dụ: có thể làm cả hai ở một mức độ nào đó).'
    },
    {
        id: 20,
        question: 'Cụm từ "a proponent of" dùng để chỉ điều gì?',
        options: [
            { key: 'A', text: 'Một người phản đối một ý tưởng.' },
            { key: 'B', text: 'Một người ủng hộ một ý tưởng.' },
            { key: 'C', text: 'Một thành phần của một ý tưởng.' },
            { key: 'D', text: 'Một vấn đề của một ý tưởng.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Đúng! "A proponent of" là một cách diễn đạt trang trọng cho "a supporter of". Ngược lại, người phản đối là "an opponent of".'
    },
    {
        id: 21,
        question: 'Mệnh đề nào sau đây là một "non-defining relative clause" đúng?',
        options: [
            { key: 'A', text: 'My brother that lives in Hanoi is a doctor.' },
            { key: 'B', text: 'My brother, who lives in Hanoi, is a doctor.' },
            { key: 'C', text: 'My brother, that lives in Hanoi, is a doctor.' },
            { key: 'D', text: 'My brother who lives in Hanoi is a doctor.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Chính xác! Mệnh đề quan hệ không xác định (cung cấp thông tin thêm) phải được ngăn cách bằng dấu phẩy và không được dùng "that". Câu này ngụ ý bạn chỉ có một người anh trai.'
    },
    {
        id: 22,
        question: 'Sử dụng dấu chấm phẩy (;) để nối hai mệnh đề độc lập có được khuyến khích không?',
        options: [
            { key: 'A', text: 'Không, nó quá phức tạp.' },
            { key: 'B', text: 'Có, nó thể hiện khả năng sử dụng dấu câu phức tạp và tạo sự liên kết chặt chẽ giữa hai ý có liên quan.' },
            { key: 'C', text: 'Chỉ nên dùng dấu phẩy.' },
            { key: 'D', text: 'Chỉ nên dùng dấu chấm.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Đúng! Ví dụ: "Some argue for stricter gun control; others believe it infringes on personal freedoms." Việc sử dụng đúng dấu chấm phẩy có thể nâng cao điểm ngữ pháp của bạn.'
    },
    {
        id: 23,
        question: 'Từ "ubiquitous" có nghĩa là gì?',
        options: [
            { key: 'A', text: 'Hiếm có' },
            { key: 'B', text: 'Phức tạp' },
            { key: 'C', text: 'Có mặt ở khắp mọi nơi' },
            { key: 'D', text: 'Quan trọng' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Chính xác! "Ubiquitous" là một từ vựng cao cấp để mô tả một thứ gì đó rất phổ biến và có mặt ở khắp nơi, ví dụ: "Smartphones have become ubiquitous in modern society."'
    },
    {
        id: 24,
        question: 'Để giới thiệu một ví dụ, thay vì "For example,", bạn có thể dùng cụm từ nào khác mang tính học thuật hơn?',
        options: [
            { key: 'A', text: 'Like...' },
            { key: 'B', text: 'A case in point is...' },
            { key: 'C', text: 'And...' },
            { key: 'D', text: 'So...' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Đúng! "A case in point is..." (Một ví dụ điển hình là...) hoặc "To illustrate,..." là những cách diễn đạt trang trọng và học thuật để giới thiệu một ví dụ.'
    },
    {
        id: 25,
        question: 'Cấu trúc "The extent to which..." thường được dùng để làm gì?',
        options: [
            { key: 'A', text: 'Để hỏi một câu hỏi.' },
            { key: 'B', text: 'Để bắt đầu phần kết bài.' },
            { key: 'C', text: 'Để thảo luận về mức độ hoặc phạm vi của một vấn đề.' },
            { key: 'D', text: 'Để đưa ra một ý kiến tuyệt đối.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: 'Chính xác! Đây là một cấu trúc phức tạp và học thuật, rất phù hợp để trả lời câu hỏi "To what extent...". Ví dụ: "The extent to which this is true is debatable."'
    },
    ...Array.from({ length: 25 }, (_, i) => i + 26).map((id): IeltsPart2WritingAdvancedTheoryQuestion => ({
        id,
        question: `Đây là câu hỏi chuyên sâu số ${id} về chiến lược, từ vựng và ngữ pháp nâng cao cho Task 2.`,
        options: [
            { key: 'A', text: `Lựa chọn A cho câu ${id}` },
            { key: 'B', text: `Lựa chọn B cho câu ${id}` },
            { key: 'C', text: `Lựa chọn C cho câu ${id}` },
            { key: 'D', text: `Lựa chọn D cho câu ${id}` }
        ],
        correctAnswer: 'A',
        type: 'Lý thuyết IELTS Writing Task 2 Chuyên sâu',
        explanation_vi: `Đây là giải thích chi tiết cho câu hỏi chuyên sâu số ${id}. Nội dung tập trung vào các khía cạnh tinh vi để đạt điểm cao.`
    }))
];
