export interface IeltsPart1WritingTheoryQuestion {
    id: number;
    question: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    type: 'Lý thuyết IELTS Writing Part 1';
    explanation_vi: string;
}

export const ieltsPart1WritingTheoryData: IeltsPart1WritingTheoryQuestion[] = [
    {
        id: 1,
        question: 'Thời gian làm bài đề xuất cho IELTS Writing Task 1 là bao nhiêu?',
        options: [ { key: 'A', text: '15 phút' }, { key: 'B', text: '20 phút' }, { key: 'C', text: '30 phút' }, { key: 'D', text: '40 phút' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! Bạn nên dành khoảng 20 phút cho Task 1 để có đủ 40 phút cho Task 2, phần thi chiếm nhiều điểm hơn.'
    },
    {
        id: 2,
        question: 'Số từ tối thiểu bạn cần viết cho Task 1 là bao nhiêu?',
        options: [ { key: 'A', text: '120 từ' }, { key: 'B', text: '150 từ' }, { key: 'C', text: '200 từ' }, { key: 'D', text: '250 từ' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! Bạn phải viết ít nhất 150 từ. Viết ít hơn sẽ bị trừ điểm.'
    },
    {
        id: 3,
        question: 'Cấu trúc chuẩn của một bài viết Task 1 bao gồm những phần nào?',
        options: [ { key: 'A', text: 'Mở bài, Thân bài 1, Thân bài 2, Kết bài' }, { key: 'B', text: 'Mở bài, Tổng quan, Thân bài 1, Thân bài 2' }, { key: 'C', text: 'Tổng quan, Thân bài 1, Thân bài 2, Kết bài' }, { key: 'D', text: 'Mở bài, Thân bài, Kết bài' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! Cấu trúc đúng bao gồm một Mở bài (Introduction) diễn giải lại đề bài, một đoạn Tổng quan (Overview) nêu các xu hướng chính, và hai đoạn Thân bài (Body) mô tả chi tiết số liệu. Task 1 không có kết bài.'
    },
    {
        id: 4,
        question: 'Bạn có được đưa ra ý kiến cá nhân (personal opinion) trong Task 1 không?',
        options: [ { key: 'A', text: 'Có, ở đoạn tổng quan' }, { key: 'B', text: 'Có, ở đoạn kết bài' }, { key: 'C', text: 'Tuyệt đối không' }, { key: 'D', text: 'Chỉ khi đề bài yêu cầu' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! Task 1 là một bài báo cáo khách quan. Bạn chỉ mô tả những gì bạn thấy trong biểu đồ, không được đưa ra bất kỳ ý kiến, phỏng đoán hay giải thích nào của riêng mình.'
    },
    {
        id: 5,
        question: 'Chức năng chính của đoạn Mở bài (Introduction) là gì?',
        options: [ { key: 'A', text: 'Nêu các số liệu cao nhất và thấp nhất.' }, { key: 'B', text: 'Diễn giải lại (paraphrase) câu hỏi của đề bài.' }, { key: 'C', text: 'Đưa ra ý kiến cá nhân về biểu đồ.' }, { key: 'D', text: 'Tóm tắt tất cả các số liệu.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! Mở bài chỉ cần một câu, diễn giải lại đề bài bằng từ vựng và cấu trúc của riêng bạn.'
    },
    {
        id: 6,
        question: 'Đoạn Tổng quan (Overview) nên nêu bật điều gì?',
        options: [ { key: 'A', text: 'Tất cả các số liệu chi tiết.' }, { key: 'B', text: 'Hai hoặc ba xu hướng hoặc đặc điểm nổi bật nhất, tổng quát nhất của biểu đồ.' }, { key: 'C', text: 'Lý do tại sao các số liệu lại thay đổi.' }, { key: 'D', text: 'So sánh số liệu của năm đầu tiên.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! Overview là phần quan trọng nhất, tóm tắt những điểm chính như xu hướng chung (tăng/giảm), điểm cao nhất/thấp nhất, hoặc sự khác biệt lớn nhất mà không đi vào chi tiết số liệu.'
    },
    {
        id: 7,
        question: 'Khi mô tả một biểu đồ đường (line graph) có sự thay đổi theo thời gian, thì nào là phù hợp nhất?',
        options: [ { key: 'A', text: 'Hiện tại đơn' }, { key: 'B', text: 'Tương lai đơn' }, { key: 'C', text: 'Quá khứ đơn' }, { key: 'D', text: 'Hiện tại hoàn thành' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! Nếu các mốc thời gian trong biểu đồ đều ở quá khứ, bạn phải sử dụng thì Quá khứ đơn để mô tả các xu hướng và số liệu.'
    },
    {
        id: 8,
        question: 'Đâu là một từ vựng tốt để mô tả một sự tăng mạnh?',
        options: [ { key: 'A', text: 'decreased slightly' }, { key: 'B', text: 'remained stable' }, { key: 'C', text: 'rose sharply' }, { key: 'D', text: 'fluctuated' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! "Rose sharply" (tăng một cách đột ngột/mạnh mẽ) là một cụm từ chính xác để mô tả một sự tăng trưởng lớn và nhanh.'
    },
    {
        id: 9,
        question: 'Khi mô tả một biểu đồ tròn (pie chart) ở một năm duy nhất, bạn nên tập trung vào điều gì?',
        options: [ { key: 'A', text: 'Xu hướng tăng giảm' }, { key: 'B', text: 'So sánh tỷ lệ phần trăm giữa các hạng mục' }, { key: 'C', text: 'Sự thay đổi theo thời gian' }, { key: 'D', text: 'Dự đoán cho tương lai' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! Biểu đồ tròn thể hiện tỷ lệ của các phần trong một tổng thể tại một thời điểm. Do đó, ngôn ngữ so sánh (the largest proportion, more than, less than) là quan trọng nhất.'
    },
    {
        id: 10,
        question: 'Khi mô tả một quy trình (process diagram), thì nào thường được sử dụng?',
        options: [ { key: 'A', text: 'Quá khứ đơn' }, { key: 'B', text: 'Tương lai đơn' }, { key: 'C', text: 'Hiện tại đơn (thể bị động)' }, { key: 'D', text: 'Hiện tại hoàn thành' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! Quy trình là một chuỗi các bước luôn xảy ra theo cùng một cách. Do đó, ta dùng thì Hiện tại đơn, và thường ở thể bị động (e.g., "The coffee beans are picked and then they are dried").'
    },
    {
        id: 11,
        question: 'Mục đích chính của hai đoạn thân bài (Body Paragraphs) là gì?',
        options: [ { key: 'A', text: 'Lặp lại đoạn tổng quan.' }, { key: 'B', text: 'Cung cấp và so sánh các số liệu chi tiết để hỗ trợ cho những điểm đã nêu trong đoạn tổng quan.' }, { key: 'C', text: 'Đưa ra dự đoán về tương lai.' }, { key: 'D', text: 'Đưa ra ý kiến cá nhân.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! Các đoạn thân bài là nơi bạn đi sâu vào chi tiết, trích dẫn số liệu cụ thể từ biểu đồ để chứng minh cho các xu hướng chính bạn đã nêu trong phần Tổng quan.'
    },
    {
        id: 12,
        question: 'Từ "fluctuate" có nghĩa là gì khi mô tả một xu hướng?',
        options: [ { key: 'A', text: 'Tăng đều' }, { key: 'B', text: 'Giảm mạnh' }, { key: 'C', text: 'Không thay đổi' }, { key: 'D', text: 'Dao động, lên xuống thất thường' } ],
        correctAnswer: 'D',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! "Fluctuate" được dùng khi số liệu thay đổi liên tục, không theo một xu hướng tăng hay giảm rõ ràng.'
    },
    {
        id: 13,
        question: 'Khi mô tả bản đồ (maps) so sánh hai thời điểm, bạn nên tập trung vào điều gì?',
        options: [ { key: 'A', text: 'Những khu vực không thay đổi.' }, { key: 'B', text: 'Những thay đổi chính đã xảy ra (ví dụ: xây mới, phá bỏ, mở rộng).' }, { key: 'C', text: 'Số lượng dân cư.' }, { key: 'D', text: 'Lý do của sự thay đổi.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! Mục đích của dạng bài bản đồ là mô tả sự thay đổi. Bạn cần dùng ngôn ngữ của sự thay đổi (was built, was replaced by, was expanded) và vị trí (in the north of, next to).'
    },
    {
        id: 14,
        question: 'Cụm từ "remained stable" có nghĩa là gì?',
        options: [ { key: 'A', text: 'Tăng lên đỉnh điểm' }, { key: 'B', text: 'Giảm xuống đáy' }, { key: 'C', text: 'Giữ nguyên, không thay đổi' }, { key: 'D', text: 'Dao động nhẹ' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! "Remained stable" hoặc "remained constant" được dùng để mô tả một số liệu không thay đổi trong một khoảng thời gian.'
    },
    {
        id: 15,
        question: 'Cách nhóm thông tin hiệu quả cho hai đoạn thân bài là gì?',
        options: [ { key: 'A', text: 'Mỗi thân bài mô tả một năm.' }, { key: 'B', text: 'Mỗi thân bài mô tả một hạng mục.' }, { key: 'C', text: 'Nhóm các hạng mục có xu hướng tương tự hoặc các đặc điểm nổi bật lại với nhau.' }, { key: 'D', text: 'Không cần nhóm, cứ mô tả lần lượt.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! Việc nhóm thông tin một cách logic (ví dụ: các đường tăng trong một đoạn, các đường giảm trong đoạn kia) cho thấy khả năng phân tích và làm cho bài viết mạch lạc hơn.'
    },
    {
        id: 16,
        question: 'Bạn nên viết đoạn Tổng quan (Overview) ở đâu?',
        options: [ { key: 'A', text: 'Ở cuối bài, như một kết luận.' }, { key: 'B', text: 'Ngay sau đoạn Mở bài.' }, { key: 'C', text: 'Không cần viết đoạn này.' }, { key: 'D', text: 'Ở đầu bài, trước cả Mở bài.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! Vị trí tốt nhất và logic nhất cho đoạn Tổng quan là ngay sau Mở bài. Điều này giúp giám khảo nắm được ngay những điểm chính của bài báo cáo.'
    },
    {
        id: 17,
        question: 'Từ nào sau đây KHÔNG dùng để chỉ một sự sụt giảm?',
        options: [ { key: 'A', text: 'a decline' }, { key: 'B', text: 'a drop' }, { key: 'C', text: 'a surge' }, { key: 'D', text: 'a decrease' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! "A surge" có nghĩa là một sự gia tăng đột ngột, trái ngược với các từ còn lại.'
    },
    {
        id: 18,
        question: 'Khi mô tả một quy trình sản xuất (manufacturing process), thể nào thường được sử dụng?',
        options: [ { key: 'A', text: 'Chủ động (Active voice)' }, { key: 'B', text: 'Bị động (Passive voice)' }, { key: 'C', text: 'Câu mệnh lệnh' }, { key: 'D', text: 'Câu điều kiện' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! Thể bị động rất phổ biến trong dạng bài quy trình vì đối tượng (vật được sản xuất) quan trọng hơn người thực hiện (công nhân, máy móc).'
    },
    {
        id: 19,
        question: 'Trong đoạn Tổng quan, bạn có nên trích dẫn số liệu cụ thể không?',
        options: [ { key: 'A', text: 'Có, càng nhiều càng tốt.' }, { key: 'B', text: 'Chỉ số liệu cao nhất.' }, { key: 'C', text: 'Không, chỉ nêu xu hướng chung và các đặc điểm nổi bật.' }, { key: 'D', text: 'Chỉ số liệu của năm cuối.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! Đoạn Tổng quan chỉ nên nêu các điểm chính một cách khái quát. Việc trích dẫn số liệu chi tiết là dành cho các đoạn Thân bài.'
    },
    {
        id: 20,
        question: 'Từ "respectively" được dùng để làm gì?',
        options: [ { key: 'A', text: 'Để chỉ sự tôn trọng.' }, { key: 'B', text: 'Để liệt kê các số liệu theo đúng thứ tự của các đối tượng đã được nhắc đến trước đó.' }, { key: 'C', text: 'Để chỉ một sự tăng trưởng.' }, { key: 'D', text: 'Để đưa ra một ví dụ.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! "Respectively" (lần lượt là) là một cách hiệu quả để trình bày nhiều số liệu một cách gọn gàng. Ví dụ: "Apples and oranges cost $2 and $3, respectively."'
    },
    {
        id: 21,
        question: 'Biểu đồ "dynamic" (động) là biểu đồ thể hiện điều gì?',
        options: [ { key: 'A', text: 'So sánh các mục tại một thời điểm duy nhất.' }, { key: 'B', text: 'Sự thay đổi của dữ liệu qua nhiều mốc thời gian.' }, { key: 'C', text: 'Một quy trình sản xuất.' }, { key: 'D', text: 'Một bản đồ.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! Biểu đồ động (ví dụ: line graph) cho thấy sự thay đổi, xu hướng (tăng, giảm, dao động) qua các năm hoặc tháng.'
    },
    {
        id: 22,
        question: 'Biểu đồ "static" (tĩnh) là biểu đồ thể hiện điều gì?',
        options: [ { key: 'A', text: 'Sự thay đổi của dữ liệu qua nhiều năm.' }, { key: 'B', text: 'So sánh các hạng mục khác nhau tại một thời điểm duy nhất.' }, { key: 'C', text: 'Một quy trình có nhiều bước.' }, { key: 'D', text: 'Sự thay đổi của một khu vực.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! Biểu đồ tĩnh (ví dụ: pie chart, table, bar chart ở một năm duy nhất) yêu cầu ngôn ngữ so sánh (cao hơn, thấp hơn, lớn nhất) thay vì ngôn ngữ xu hướng.'
    },
    {
        id: 23,
        question: 'Khi mô tả bản đồ, từ nào sau đây KHÔNG hữu ích?',
        options: [ { key: 'A', text: 'was replaced by' }, { key: 'B', text: 'was constructed' }, { key: 'C', text: 'in the north of' }, { key: 'D', text: 'increased significantly' } ],
        correctAnswer: 'D',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! "Increased significantly" (tăng đáng kể) là ngôn ngữ cho biểu đồ có số liệu (line, bar, table). Bản đồ cần ngôn ngữ về sự thay đổi vật lý và vị trí.'
    },
    {
        id: 24,
        question: 'Đâu là cách tốt để diễn giải lại (paraphrase) cụm từ "the number of students"?',
        options: [ { key: 'A', text: 'the amount of students' }, { key: 'B', text: 'how many students' }, { key: 'C', text: 'the quantity of students' }, { key: 'D', text: 'the figure for students' } ],
        correctAnswer: 'D',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! "The figure for students" là một cách diễn giải học thuật và chính xác. "Amount" và "quantity" dùng cho danh từ không đếm được, còn "how many" dùng trong câu hỏi.'
    },
    {
        id: 25,
        question: 'Để mô tả một xu hướng giảm nhẹ, từ nào sau đây là phù hợp nhất?',
        options: [ { key: 'A', text: 'plummeted' }, { key: 'B', text: 'dropped slightly' }, { key: 'C', text: 'soared' }, { key: 'D', text: 'remained unchanged' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! "Dropped slightly" (giảm nhẹ) thể hiện chính xác một sự thay đổi nhỏ đi xuống. "Plummeted" là giảm mạnh, còn "soared" là tăng vọt.'
    },
    {
        id: 26,
        question: 'Từ "overall" thường được dùng để bắt đầu đoạn nào?',
        options: [ { key: 'A', text: 'Mở bài (Introduction)' }, { key: 'B', text: 'Thân bài 1 (Body 1)' }, { key: 'C', text: 'Tổng quan (Overview)' }, { key: 'D', text: 'Thân bài 2 (Body 2)' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! "Overall" hoặc "In general" là những từ báo hiệu tuyệt vời để bắt đầu đoạn Tổng quan, nơi bạn sẽ tóm tắt những đặc điểm chính.'
    },
    {
        id: 27,
        question: 'Khi mô tả một quy trình, các từ như "firstly", "then", "after that" được gọi là gì?',
        options: [ { key: 'A', text: 'Tính từ so sánh' }, { key: 'B', text: 'Động từ chỉ xu hướng' }, { key: 'C', text: 'Ngôn ngữ trình tự (Sequencing language)' }, { key: 'D', text: 'Đại từ quan hệ' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! Đây là những từ và cụm từ chỉ trình tự, rất cần thiết để mô tả các bước trong một quy trình một cách logic.'
    },
    {
        id: 28,
        question: 'Nếu biểu đồ có các mốc thời gian kéo dài đến tương lai (ví dụ: đến năm 2040), bạn nên dùng thì nào để mô tả các dự đoán đó?',
        options: [ { key: 'A', text: 'Quá khứ đơn' }, { key: 'B', text: 'Hiện tại hoàn thành' }, { key: 'C', text: 'Tương lai đơn (will) hoặc các cấu trúc dự đoán (is predicted to)' }, { key: 'D', text: 'Hiện tại đơn' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! Đối với các số liệu dự đoán trong tương lai, bạn phải sử dụng các cấu trúc tương lai như "will increase", "is expected to rise", hoặc "is projected to fall".'
    },
    {
        id: 29,
        question: 'Trong 4 tiêu chí chấm điểm của IELTS Writing, Task 1 đánh giá những tiêu chí nào?',
        options: [ { key: 'A', text: 'Chỉ có Ngữ pháp và Từ vựng' }, { key: 'B', text: 'Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy' }, { key: 'C', text: 'Fluency, Pronunciation, Lexical Resource, Grammar' }, { key: 'D', text: 'Tất cả các tiêu chí của bài thi Nói' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! Bốn tiêu chí chấm điểm là: Task Achievement (Hoàn thành yêu cầu đề bài), Coherence and Cohesion (Mạch lạc và Liên kết), Lexical Resource (Vốn từ), và Grammatical Range and Accuracy (Ngữ pháp Đa dạng và Chính xác).'
    },
    {
        id: 30,
        question: 'Tiêu chí "Task Achievement" trong Task 1 KHÔNG yêu cầu bạn làm gì?',
        options: [ { key: 'A', text: 'Viết ít nhất 150 từ' }, { key: 'B', text: 'Mô tả các đặc điểm chính của biểu đồ' }, { key: 'C', text: 'Đưa ra ý kiến cá nhân về lý do tại sao số liệu lại như vậy' }, { key: 'D', text: 'Có một đoạn tổng quan rõ ràng' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! "Task Achievement" yêu cầu bạn báo cáo thông tin một cách khách quan. Việc đưa ra ý kiến cá nhân hoặc giải thích nguyên nhân là điều cấm kỵ và sẽ làm bạn mất điểm.'
    },
    {
        id: 31,
        question: 'Từ "approximately" có thể được thay thế bằng từ nào sau đây?',
        options: [ { key: 'A', text: 'exactly' }, { key: 'B', text: 'precisely' }, { key: 'C', text: 'roughly' }, { key: 'D', text: 'significantly' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! "Approximately", "roughly", "around", "about" đều có nghĩa là "khoảng, xấp xỉ" và rất hữu ích khi số liệu không nằm ngay trên vạch kẻ.'
    },
    {
        id: 32,
        question: 'Để mô tả một số liệu đạt đến điểm cao nhất, cụm từ nào sau đây là phù hợp?',
        options: [ { key: 'A', text: 'hit a low of' }, { key: 'B', text: 'reached a peak of' }, { key: 'C', text: 'bottomed out at' }, { key: 'D', text: 'levelled off at' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! "Reached a peak of" hoặc "peaked at" được dùng để chỉ điểm cao nhất trên một biểu đồ đường.'
    },
    {
        id: 33,
        question: 'Khi mô tả một bản đồ, từ nào sau đây dùng để chỉ sự phá bỏ một công trình?',
        options: [ { key: 'A', text: 'constructed' }, { key: 'B', text: 'developed' }, { key: 'C', text: 'demolished' }, { key: 'D', text: 'expanded' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! "Demolished" hoặc "knocked down" có nghĩa là phá bỏ, dùng để mô tả một tòa nhà hoặc công trình không còn tồn tại ở thời điểm sau.'
    },
    {
        id: 34,
        question: 'Trong các đoạn thân bài, bạn nên làm gì với các số liệu?',
        options: [ { key: 'A', text: 'Liệt kê tất cả các số liệu bạn thấy.' }, { key: 'B', text: 'Chỉ chọn các số liệu ở năm đầu và năm cuối.' }, { key: 'C', text: 'Chọn lọc, nhóm và so sánh các số liệu quan trọng để minh họa cho các điểm chính.' }, { key: 'D', text: 'Bịa ra các số liệu để làm bài viết thú vị hơn.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! Kỹ năng quan trọng trong Task 1 là khả năng chọn lọc và nhóm thông tin. Bạn không cần và không nên mô tả tất cả mọi thứ.'
    },
    {
        id: 35,
        question: 'Đâu là cách diễn đạt tốt hơn cho "the number went up"?',
        options: [ { key: 'A', text: 'the number got bigger' }, { key: 'B', text: 'the figure saw an increase' }, { key: 'C', text: 'the number was more' }, { key: 'D', text: 'the number changed' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! "The figure saw an increase" là một cách diễn đạt học thuật và trang trọng hơn, giúp bạn đạt điểm cao hơn ở tiêu chí Lexical Resource.'
    },
    {
        id: 36,
        question: 'Trong một biểu đồ có nhiều đường (ví dụ: 4 quốc gia), bạn nên làm gì?',
        options: [ { key: 'A', text: 'Mô tả từng đường từ đầu đến cuối trong các đoạn riêng biệt.' }, { key: 'B', text: 'Nhóm 2 đường có xu hướng tương tự vào một đoạn thân bài, và 2 đường còn lại vào đoạn thân bài kia.' }, { key: 'C', text: 'Chỉ mô tả đường cao nhất và thấp nhất.' }, { key: 'D', text: 'Mô tả tất cả các số liệu của năm đầu tiên, sau đó là tất cả số liệu của năm cuối.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! Nhóm các đối tượng có đặc điểm chung (ví dụ: cùng tăng, cùng giảm, hoặc luôn cao hơn các đối tượng khác) là cách hiệu quả nhất để cấu trúc bài viết và thể hiện khả năng phân tích.'
    },
    {
        id: 37,
        question: 'Từ "whereas" được dùng để làm gì?',
        options: [ { key: 'A', text: 'Để thêm thông tin.' }, { key: 'B', text: 'Để chỉ lý do.' }, { key: 'C', text: 'Để chỉ sự tương phản, đối lập.' }, { key: 'D', text: 'Để chỉ kết quả.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! "Whereas" hoặc "while" là những từ nối rất hữu ích để so sánh hai xu hướng hoặc số liệu trái ngược nhau trong cùng một câu.'
    },
    {
        id: 38,
        question: 'Viết tắt (ví dụ: "don\'t", "it\'s") có được phép trong Writing Task 1 không?',
        options: [ { key: 'A', text: 'Có, nó làm bài viết tự nhiên hơn.' }, { key: 'B', text: 'Không, bạn phải dùng dạng đầy đủ (do not, it is) vì đây là văn viết trang trọng.' }, { key: 'C', text: 'Chỉ được dùng ở đoạn tổng quan.' }, { key: 'D', text: 'Chỉ được dùng khi trích dẫn số liệu.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! IELTS Writing là bài thi học thuật, đòi hỏi văn phong trang trọng. Do đó, bạn phải luôn viết dạng đầy đủ của các từ.'
    },
    {
        id: 39,
        question: 'Cụm từ "accounted for" có nghĩa là gì trong biểu đồ tròn?',
        options: [ { key: 'A', text: 'Giải thích cho' }, { key: 'B', text: 'Chịu trách nhiệm cho' }, { key: 'C', text: 'Chiếm (một tỷ lệ phần trăm)' }, { key: 'D', text: 'Tăng lên' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Chính xác! "Accounted for" là một từ vựng học thuật rất tốt để mô tả một hạng mục chiếm bao nhiêu phần trăm trong tổng thể. Ví dụ: "Category A accounted for 40% of the total."'
    },
    {
        id: 40,
        question: 'Để mô tả một số liệu không thay đổi nhiều, bạn có thể dùng từ nào?',
        options: [ { key: 'A', text: 'rocketed' }, { key: 'B', text: 'plummeted' }, { key: 'C', text: 'remained relatively stable' }, { key: 'D', text: 'surged' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Writing Part 1',
        explanation_vi: 'Đúng! "Remained relatively stable" hoặc "showed little change" là những cách diễn đạt chính xác cho một đường biểu diễn gần như đi ngang.'
    }
];
