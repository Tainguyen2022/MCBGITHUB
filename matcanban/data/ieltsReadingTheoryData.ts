import { IeltsReadingTheoryQuestion } from '../../types';

export const ieltsReadingTheoryData: IeltsReadingTheoryQuestion[] = [
    {
        id: 1,
        question: 'What is the total time allowed for the IELTS Reading test?',
        options: [ { key: 'A', text: '40 minutes' }, { key: 'B', text: '50 minutes' }, { key: 'C', text: '60 minutes' }, { key: 'D', text: '90 minutes' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Bạn có tổng cộng 60 phút để hoàn thành 3 bài đọc và 40 câu hỏi. Không có thời gian bù thêm để chuyển đáp án.'
    },
    {
        id: 2,
        question: 'How much time should you aim to spend on each reading passage?',
        options: [ { key: 'A', text: '15 minutes' }, { key: 'B', text: '20 minutes' }, { key: 'C', text: '25 minutes' }, { key: 'D', text: '30 minutes' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Chia đều thời gian là một chiến lược tốt. Dành 20 phút cho mỗi passage sẽ giúp bạn quản lý thời gian hiệu quả cho cả bài thi.'
    },
    {
        id: 3,
        question: 'What is the main purpose of "skimming" a passage?',
        options: [ { key: 'A', text: 'To find a specific piece of information like a name or a date.' }, { key: 'B', text: 'To understand the general idea and overall structure of the text.' }, { key: 'C', text: 'To read and understand every single word.' }, { key: 'D', text: 'To find synonyms for keywords.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Skimming là kỹ năng đọc nhanh để nắm bắt ý chính, chủ đề và cấu trúc của bài viết, thường bằng cách đọc tiêu đề, câu mở đầu và câu kết của mỗi đoạn.'
    },
    {
        id: 4,
        question: 'What is the main purpose of "scanning" a passage?',
        options: [ { key: 'A', text: 'To understand the main idea of the whole passage.' }, { key: 'B', text: 'To quickly search for a specific piece of information (a keyword) like a name, date, or number.' }, { key: 'C', text: 'To analyze the grammar.' }, { key: 'D', text: 'To summarize the passage.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Scanning là kỹ năng di chuyển mắt thật nhanh qua văn bản để định vị một từ khóa hoặc thông tin cụ thể mà bạn đã xác định từ câu hỏi.'
    },
    {
        id: 5,
        question: 'For "Matching Headings" questions, what should you do first?',
        options: [ { key: 'A', text: 'Read the entire passage very carefully.' }, { key: 'B', text: 'Read the list of headings first to understand the possible main ideas.' }, { key: 'C', text: 'Start immediately with the first paragraph.' }, { key: 'D', text: 'Guess the answers.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Đọc trước danh sách các tiêu đề giúp bạn có một cái nhìn tổng quan về các ý chính và dễ dàng hơn trong việc tìm kiếm và nối chúng với các đoạn văn phù hợp.'
    },
    {
        id: 6,
        question: 'What is the key difference between "FALSE" and "NOT GIVEN"?',
        options: [ { key: 'A', text: 'There is no difference.' }, { key: 'B', text: '"FALSE" means the information in the passage contradicts the statement; "NOT GIVEN" means the information is not mentioned at all.' }, { key: 'C', text: '"FALSE" means the information is not mentioned; "NOT GIVEN" means the information is incorrect.' }, { key: 'D', text: 'This question type is only in the General test.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Đây là điểm cốt lõi. FALSE/NO: thông tin trong bài mâu thuẫn, trái ngược. NOT GIVEN: thông tin không thể được tìm thấy trong bài đọc.'
    },
    {
        id: 7,
        question: 'For most question types (except Matching Headings), in what order do the answers usually appear in the passage?',
        options: [ { key: 'A', text: 'In a random order.' }, { key: 'B', text: 'In the same order as the questions.' }, { key: 'C', text: 'From the end of the passage to the beginning.' }, { key: 'D', text: 'Concentrated in the middle paragraph.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Một tin tốt là các câu trả lời thường xuất hiện tuần tự trong bài đọc. Câu trả lời cho câu 5 sẽ nằm sau câu trả lời cho câu 4.'
    },
    {
        id: 8,
        question: 'Why is it an effective strategy to read the questions BEFORE reading the passage?',
        options: [ { key: 'A', text: 'To save time.' }, { key: 'B', text: 'To know what information you are looking for, which makes your reading more purposeful.' }, { key: 'C', text: 'To be able to guess all the answers.' }, { key: 'D', text: 'It is not an effective strategy.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Đọc câu hỏi trước giúp bạn xác định được loại thông tin cần tìm (tên, ngày, lý do...) và các từ khóa, từ đó bạn có thể đọc bài đọc một cách chủ động và hiệu quả hơn.'
    },
    {
        id: 9,
        question: 'If you don\'t know the meaning of a word, what should you do?',
        options: [ { key: 'A', text: 'Stop and try to translate the word.' }, { key: 'B', text: 'Skip the entire paragraph.' }, { key: 'C', text: 'Try to guess the meaning from the surrounding context.' }, { key: 'D', text: 'Ask the examiner.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Bạn không thể biết hết mọi từ. Kỹ năng đoán nghĩa của từ dựa vào ngữ cảnh là rất quan trọng để không bị "kẹt" và tiết kiệm thời gian.'
    },
    {
        id: 10,
        question: 'In "Summary Completion" tasks, what should you pay attention to in the summary text?',
        options: [ { key: 'A', text: 'Only the words to be filled in.' }, { key: 'B', text: 'The grammatical structure of the sentences and the type of word needed (noun, verb, adjective).' }, { key: 'C', text: 'The number of sentences.' }, { key: 'D', text: 'Finding synonyms.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Phân tích ngữ pháp của câu chứa chỗ trống sẽ giúp bạn dự đoán loại từ cần tìm (ví dụ: sau mạo từ "a" là một danh từ), giúp việc tìm kiếm trong bài đọc dễ dàng hơn.'
    },
    {
        id: 11,
        question: 'Should you transfer answers to the answer sheet immediately after each question?',
        options: [ { key: 'A', text: 'Yes, so you don\'t forget.' }, { key: 'B', text: 'No, it\'s better to finish a whole passage, then transfer the answers for that passage.' }, { key: 'C', text: 'Only for the difficult questions.' }, { key: 'D', text: 'Yes, it is the fastest way.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Việc chuyển đáp án liên tục sẽ làm gián đoạn dòng suy nghĩ của bạn. Tốt nhất là hãy hoàn thành một bài đọc (khoảng 13-14 câu) rồi chuyển toàn bộ đáp án của phần đó vào phiếu trả lời.'
    },
    {
        id: 12,
        question: 'In "Matching Features" tasks (matching a feature to a name/place), what is the most effective strategy?',
        options: [ { key: 'A', text: 'Read the whole passage first and then do the matching.' }, { key: 'B', text: 'Scan for the proper nouns (names) in the passage first, underline all of them, then read the information around each name to match it to a feature.' }, { key: 'C', text: 'Do the questions in order.' }, { key: 'D', text: 'Only read the first and last paragraphs.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Vì tên riêng là từ khóa dễ tìm nhất, việc scan và định vị tất cả chúng trước sẽ giúp bạn tiết kiệm rất nhiều thời gian so với việc đọc đi đọc lại cả bài.'
    },
    {
        id: 13,
        question: 'What is the main difference between the Academic and General Training Reading tests?',
        options: [ { key: 'A', text: 'Academic is harder, with longer and more academic passages.' }, { key: 'B', text: 'General Training has more questions.' }, { key: 'C', text: 'Academic does not have True/False/Not Given questions.' }, { key: 'D', text: 'There is no difference.' } ],
        correctAnswer: 'A',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Bài thi Academic được thiết kế cho mục đích học thuật nên các bài đọc được trích từ sách, tạp chí chuyên ngành, phức tạp và trừu tượng hơn. Bài thi General có các đoạn văn ngắn hơn, liên quan đến các tình huống đời thường.'
    },
    {
        id: 14,
        question: 'If a question requires you to fill in a word from the passage, are you allowed to change the form of the word (e.g., from "develop" to "development")?',
        options: [ { key: 'A', text: 'Yes, as long as it is grammatically correct.' }, { key: 'B', text: 'No, you must copy the word or phrase exactly as it appears in the passage.' }, { key: 'C', text: 'Only if it is a verb.' }, { key: 'D', text: 'Only if it is an adjective.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Trong các dạng bài điền từ (completion tasks), bạn phải sử dụng chính xác từ ngữ có trong bài đọc mà không được thay đổi hình thức của chúng.'
    },
    {
        id: 15,
        question: 'In "Multiple Choice" questions, why is it important to eliminate incorrect options?',
        options: [ { key: 'A', text: 'It is not important.' }, { key: 'B', text: 'Because there are usually two very similar options and one completely wrong option.' }, { key: 'C', text: 'Because incorrect options often contain keywords from the passage to distract you; identifying and eliminating them increases your chance of choosing correctly.' }, { key: 'D', text: 'Because the correct answer is always C.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Các lựa chọn sai thường được thiết kế để đánh lừa bạn bằng cách sử dụng từ khóa trong bài đọc nhưng với ngữ cảnh sai. Việc loại trừ các bẫy này là một kỹ năng quan trọng.'
    },
    {
        id: 16,
        question: 'Is the order in which you do the passages (1, 2, 3) important?',
        options: [ { key: 'A', text: 'No, you can do them in any order.' }, { key: 'B', text: 'Yes, you must do them in the order 1, 2, 3.' }, { key: 'C', text: 'It\'s a good strategy to start with the passage that seems most familiar or has question types you are confident with.' }, { key: 'D', text: 'You should do passage 3 first because it is the hardest.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Mặc dù độ khó thường tăng dần, nhưng bạn có thể bắt đầu với passage có chủ đề quen thuộc hoặc dạng câu hỏi thế mạnh để lấy tinh thần và tiết kiệm thời gian.'
    },
    {
        id: 17,
        question: 'What does the word "respectively" usually mean in a passage?',
        options: [ { key: 'A', text: 'respectfully' }, { key: 'B', text: 'in the order previously mentioned' }, { key: 'C', text: 'approximately' }, { key: 'D', text: 'significantly' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! "Respectively" (lần lượt là) được dùng để nối hai danh sách với nhau theo thứ tự 1-1, 2-2. Ví dụ: "Boys and girls prefer football and dolls, respectively" có nghĩa là con trai thích bóng đá và con gái thích búp bê.'
    },
    {
        id: 18,
        question: 'Which question type does NOT usually appear in the same order as the information in the passage?',
        options: [ { key: 'A', text: 'Sentence Completion' }, { key: 'B', text: 'True/False/Not Given' }, { key: 'C', text: 'Matching Headings' }, { key: 'D', text: 'Short Answer Questions' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! "Matching Headings" là một trong số ít dạng bài mà câu hỏi không theo thứ tự. Bạn phải đọc từng đoạn để tìm tiêu đề phù hợp.'
    },
    {
        id: 19,
        question: 'When should you read a part of the passage carefully?',
        options: [ { key: 'A', text: 'Always read carefully from beginning to end.' }, { key: 'B', text: 'You never need to read carefully.' }, { key: 'C', text: 'Only when you have used skimming and scanning to locate the area that contains the answer.' }, { key: 'D', text: 'Only for Matching Headings tasks.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Chiến lược hiệu quả là dùng skimming/scanning để tìm vùng thông tin liên quan, sau đó mới đọc kỹ vùng đó để xác định câu trả lời chính xác.'
    },
    {
        id: 20,
        question: 'If a question contains a proper noun (e.g., a name), what should you do first?',
        options: [ { key: 'A', text: 'Read the whole text to find the name.' }, { key: 'B', text: 'Quickly scan the entire passage just to find and circle that proper noun.' }, { key: 'C', text: 'Skip that question.' }, { key: 'D', text: 'Guess the meaning of the name.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Tên riêng, ngày tháng, và số liệu là những "mỏ neo" dễ tìm nhất trong bài đọc. Hãy scan chúng trước để định vị thông tin một cách nhanh chóng.'
    },
    {
        id: 21,
        question: 'Are you penalized for incorrect answers?',
        options: [ { key: 'A', text: 'Yes, 0.25 points are deducted for each wrong answer.' }, { key: 'B', text: 'No, you do not lose points for incorrect answers.' }, { key: 'C', text: 'Only in Passage 3.' }, { key: 'D', text: 'Yes, 1 point is deducted.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Giống như bài Nghe, bạn không bị trừ điểm nếu trả lời sai. Vì vậy, đừng bao giờ bỏ trống bất kỳ câu trả lời nào, hãy đoán nếu bạn không chắc chắn.'
    },
    {
        id: 22,
        question: 'In "Diagram Labelling" tasks, where are the answers usually found?',
        options: [ { key: 'A', text: 'Scattered throughout the passage.' }, { key: 'B', text: 'Usually concentrated in one specific paragraph or section of the text that describes the diagram.' }, { key: 'C', text: 'Only in the introduction.' }, { key: 'D', text: 'Only in the conclusion.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Thông tin để điền vào sơ đồ thường nằm tập trung ở một khu vực nhất định trong bài. Hãy scan các từ khóa từ sơ đồ để tìm đúng đoạn văn đó.'
    },
    {
        id: 23,
        question: 'Are the number of passages in the Academic and General Training tests the same?',
        options: [ { key: 'A', text: 'No, Academic has 4 passages, General has 3.' }, { key: 'B', text: 'Yes, both tests have 3 reading passages.' }, { key: 'C', text: 'No, General has 5 shorter sections.' }, { key: 'D', text: 'No, Academic has 3, General has 2.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Cả hai dạng bài thi đều có 3 phần đọc và tổng cộng 40 câu hỏi. Sự khác biệt nằm ở độ dài và tính chất học thuật của các bài đọc.'
    },
    {
        id: 24,
        question: 'Why is time management extremely important in IELTS Reading?',
        options: [ { key: 'A', text: 'Because the passages are very long and time is limited.' }, { key: 'B', text: 'Because the invigilator will take your paper immediately if you go over time.' }, { key: 'C', text: 'Because there is no extra time to transfer your answers.' }, { key: 'D', text: 'All of the above.' } ],
        correctAnswer: 'D',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Tất cả các lý do trên đều đúng. Việc hết thời gian khi chưa làm xong là vấn đề lớn nhất của nhiều thí sinh. Bạn phải luyện tập để làm bài trong vòng 60 phút, bao gồm cả việc điền đáp án.'
    },
    {
        id: 25,
        question: 'What should your answer for "Short Answer Questions" look like?',
        options: [ { key: 'A', text: 'A complete sentence.' }, { key: 'B', text: 'A word or phrase copied exactly from the passage that respects the word limit.' }, { key: 'C', text: 'A personal opinion.' }, { key: 'D', text: 'A synonym.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Bạn phải dùng chính xác từ ngữ trong bài đọc và tuân thủ nghiêm ngặt giới hạn từ cho phép (ví dụ: "NO MORE THAN THREE WORDS").'
    },
    {
        id: 26,
        question: 'Which question type is often considered the most difficult and time-consuming?',
        options: [ { key: 'A', text: 'Short Answer Questions' }, { key: 'B', text: 'Matching Headings' }, { key: 'C', text: 'Sentence Completion' }, { key: 'D', text: 'True/False/Not Given' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! "Matching Headings" đòi hỏi bạn phải hiểu ý chính của từng đoạn văn, điều này tốn nhiều thời gian và kỹ năng đọc hiểu tổng quát. Nhiều người khuyên nên làm dạng này sau cùng.'
    },
    {
        id: 27,
        question: 'If the question is "YES/NO/NOT GIVEN", can you write "TRUE/FALSE/NOT GIVEN" on the answer sheet?',
        options: [ { key: 'A', text: 'Yes, they are the same.' }, { key: 'B', text: 'No, you must write "YES" or "NO" exactly. Writing the wrong format will be marked as incorrect.' }, { key: 'C', text: 'You can only use the abbreviations Y/N/NG.' }, { key: 'D', text: 'You can only use the abbreviations T/F/NG.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Mặc dù hai dạng câu hỏi này kiểm tra cùng một kỹ năng, bạn phải tuân thủ chính xác yêu cầu của đề bài. Nếu câu hỏi là Y/N/NG, câu trả lời phải là Y/N/NG.'
    },
    {
        id: 28,
        question: 'What does the phrase "in turn" usually mean in an academic text?',
        options: [ { key: 'A', text: 'to take turns' }, { key: 'B', text: 'to return something' }, { key: 'C', text: 'as a result, consequently' }, { key: 'D', text: 'inside' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! "In turn" thường được dùng để chỉ một chuỗi các sự kiện nối tiếp nhau, trong đó sự kiện này là kết quả của sự kiện trước đó. Ví dụ: "Increased production leads to lower prices, which in turn boosts demand."'
    },
    {
        id: 29,
        question: 'Why is underlining keywords in the questions important?',
        options: [ { key: 'A', text: 'To make the paper look nice.' }, { key: 'B', text: 'To help you focus and know exactly what information to scan for in the passage.' }, { key: 'C', text: 'To slow down your reading speed.' }, { key: 'D', text: 'It\'s not very important.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Từ khóa là những từ mang thông tin chính (danh từ, động từ, số liệu...). Gạch chân chúng giúp bạn tập trung vào mục tiêu khi scan bài đọc.'
    },
    {
        id: 30,
        question: 'What skill does the "Matching Sentence Endings" task test?',
        options: [ { key: 'A', text: 'The ability to logically and grammatically connect two halves of a sentence.' }, { key: 'B', text: 'The ability to find synonyms.' }, { key: 'C', text: 'The ability to read quickly.' }, { key: 'D', text: 'The ability to guess vocabulary.' } ],
        correctAnswer: 'A',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Dạng bài này yêu cầu bạn đọc phần đầu của một câu và tìm phần cuối phù hợp từ một danh sách, đảm bảo rằng câu hoàn chỉnh vừa đúng về mặt ngữ pháp, vừa phản ánh đúng thông tin trong bài đọc.'
    },
    {
        id: 31,
        question: 'Where is the main idea of a paragraph usually located?',
        options: [ { key: 'A', text: 'In the middle of the paragraph.' }, { key: 'B', text: 'In the last sentence.' }, { key: 'C', text: 'In the topic sentence, which is often the first or second sentence.' }, { key: 'D', text: 'It is never stated directly.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Câu chủ đề (topic sentence) thường nằm ở đầu đoạn văn, giới thiệu ý chính sẽ được phát triển trong đoạn đó. Tìm được câu này là chìa khóa cho dạng bài Matching Headings.'
    },
    {
        id: 32,
        question: 'What happens if your answer for a completion task exceeds the word limit?',
        options: [ { key: 'A', text: 'You get half a point.' }, { key: 'B', text: 'The examiner will ignore the extra words.' }, { key: 'C', text: 'The answer is marked as incorrect.' }, { key: 'D', text: 'You get a warning.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Giới hạn từ là một quy tắc tuyệt đối. Nếu yêu cầu là "NO MORE THAN TWO WORDS" và bạn viết ba từ, câu trả lời của bạn sẽ bị chấm sai, dù ý đúng.'
    },
    {
        id: 33,
        question: 'For Matching Headings, is it a good idea to match headings based on a single keyword?',
        options: [ { key: 'A', text: 'Yes, it is the fastest way.' }, { key: 'B', text: 'No, this is a common trap. You must understand the main idea of the entire paragraph.' }, { key: 'C', text: 'Only if the keyword is a name.' }, { key: 'D', text: 'Only if the keyword is a number.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Các bài đọc thường lặp lại từ khóa trong nhiều đoạn để gây nhiễu. Bạn phải đọc để hiểu ý chính của cả đoạn văn, không chỉ dựa vào một từ duy nhất.'
    },
    {
        id: 34,
        question: 'What do pronouns like "it", "they", or "this" usually refer to?',
        options: [ { key: 'A', text: 'A new idea.' }, { key: 'B', text: 'A noun or idea mentioned in the previous sentence or clause.' }, { key: 'C', text: 'The main topic of the whole passage.' }, { key: 'D', text: 'An opinion of the author.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Hiểu được sự liên kết tham chiếu (pronoun reference) là một kỹ năng đọc hiểu quan trọng, giúp bạn theo dõi dòng lập luận của tác giả.'
    },
    {
        id: 35,
        question: 'Which of these words signals a cause-and-effect relationship?',
        options: [ { key: 'A', text: 'in contrast' }, { key: 'B', text: 'similarly' }, { key: 'C', text: 'consequently' }, { key: 'D', text: 'for example' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! "Consequently", "therefore", "as a result", "due to" đều là những từ báo hiệu mối quan hệ nguyên nhân - kết quả.'
    },
    {
        id: 36,
        question: 'What is the purpose of the passage title and any subheadings?',
        options: [ { key: 'A', text: 'To make the passage look longer.' }, { key: 'B', text: 'To confuse the reader.' }, { key: 'C', text: 'To give a quick overview of the content and structure of the text.' }, { key: 'D', text: 'They are not important.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Luôn đọc tiêu đề và các tiêu đề phụ (nếu có) khi skimming. Chúng cung cấp những manh mối vô giá về chủ đề và cách bài viết được tổ chức.'
    },
    {
        id: 37,
        question: 'In a "YES/NO/NOT GIVEN" question, what are you being asked to identify?',
        options: [ { key: 'A', text: 'A factual statement from the text.' }, { key: 'B', text: 'The author\'s opinion or claim.' }, { key: 'C', text: 'A summary of a paragraph.' }, { key: 'D', text: 'A detail about a date.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Dạng Y/N/NG dùng để kiểm tra khả năng hiểu quan điểm, lập luận hoặc tuyên bố của tác giả, trong khi T/F/NG dùng để kiểm tra thông tin thực tế.'
    },
    {
        id: 38,
        question: 'What is a good strategy for the last 5 minutes of the test?',
        options: [ { key: 'A', text: 'Start reading a new passage.' }, { key: 'B', text: 'Quickly check your answers for spelling/grammar mistakes and fill in any blanks with your best guess.' }, { key: 'C', text: 'Rest your eyes.' }, { key: 'D', text: 'Re-read the first passage.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Hãy dành những phút cuối để rà soát lại phiếu trả lời, kiểm tra lỗi chính tả, ngữ pháp (số ít/nhiều) và đảm bảo không bỏ trống bất kỳ câu nào.'
    },
    {
        id: 39,
        question: 'When a summary completion task has a box of words, what is a helpful first step?',
        options: [ { key: 'A', text: 'Read the whole passage again.' }, { key: 'B', text: 'Choose words from the box at random.' }, { key: 'C', text: 'Analyze the grammar of each blank and check the part of speech (noun, verb, etc.) of the words in the box.' }, { key: 'D', text: 'Translate all the words in the box.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Phân tích ngữ pháp trước giúp bạn thu hẹp đáng kể các lựa chọn cho mỗi chỗ trống, giúp việc tìm kiếm trong bài đọc nhanh hơn và chính xác hơn.'
    },
    {
        id: 40,
        question: 'Why is it important to think of synonyms for keywords in the question?',
        options: [ { key: 'A', text: 'It is not important.' }, { key: 'B', text: 'To make the test harder.' }, { key: 'C', text: 'Because the passage will likely use different words (paraphrasing) to express the same idea.' }, { key: 'D', text: 'To impress the examiner.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Đây là cốt lõi của bài thi Reading. Bài đọc sẽ diễn giải lại ý của câu hỏi. Việc chủ động nghĩ đến các từ đồng nghĩa sẽ giúp bạn scan thông tin hiệu quả hơn rất nhiều.'
    },
    {
        id: 41,
        question: 'If the question asks for "a reason" and the passage lists several, what should you do?',
        options: [
            { key: 'A', text: 'Write all of the reasons listed.' },
            { key: 'B', text: 'Choose any one of the reasons mentioned in the passage.' },
            { key: 'C', text: 'Write your own reason.' },
            { key: 'D', text: 'Write the last reason mentioned.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Nếu câu hỏi chỉ yêu cầu "a reason" (một lý do) hoặc "one reason", bạn chỉ cần tìm và chép lại một trong những lý do được liệt kê trong bài là đủ.'
    },
    {
        id: 42,
        question: 'What is the best way to improve your reading speed for IELTS?',
        options: [
            { key: 'A', text: 'Read everything very slowly and carefully.' },
            { key: 'B', text: 'Only read short articles.' },
            { key: 'C', text: 'Practice reading a wide variety of academic-style texts regularly under timed conditions.' },
            { key: 'D', text: 'Memorize a dictionary.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Không có đường tắt. Cách duy nhất để cải thiện tốc độ và kỹ năng đọc là luyện tập thường xuyên với các dạng bài đọc tương tự IELTS và tự đặt áp lực thời gian.'
    },
    {
        id: 43,
        question: 'In a multiple-choice question asking for the writer\'s main purpose, what should the correct answer reflect?',
        options: [
            { key: 'A', text: 'A small detail from one paragraph.' },
            { key: 'B', text: 'The writer\'s personal life.' },
            { key: 'C', text: 'The main idea of the entire passage.' },
            { key: 'D', text: 'The title of the passage.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Câu hỏi về mục đích chính của tác giả đòi hỏi một cái nhìn tổng quan. Đáp án đúng phải bao quát được ý chính của toàn bộ bài đọc, không chỉ một phần nhỏ.'
    },
    {
        id: 44,
        question: 'How important is it to check the singular/plural form of your answer in completion tasks?',
        options: [
            { key: 'A', text: 'Not important at all.' },
            { key: 'B', text: 'It is extremely important; the wrong form will be marked as incorrect.' },
            { key: 'C', text: 'Only important for names.' },
            { key: 'D', text: 'The examiner will correct it for you.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Một lỗi ngữ pháp nhỏ như thiếu "s" ở danh từ số nhiều cũng đủ để bạn mất điểm cho câu đó. Luôn kiểm tra lại sự hòa hợp ngữ pháp khi điền từ.'
    },
    {
        id: 45,
        question: 'What is a "distractor" in a multiple-choice question?',
        options: [
            { key: 'A', text: 'The correct answer.' },
            { key: 'B', text: 'An option that is clearly wrong.' },
            { key: 'C', text: 'An incorrect option that is designed to look correct, often by using keywords from the passage out of context.' },
            { key: 'D', text: 'An option that is too long.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! "Distractor" là những lựa chọn gây nhiễu. Chúng được tạo ra để bẫy những thí sinh chỉ đọc lướt và tìm từ khóa mà không hiểu sâu ngữ cảnh.'
    },
    {
        id: 46,
        question: 'What should you write on the answer sheet for "NOT GIVEN"?',
        options: [
            { key: 'A', text: 'NG' },
            { key: 'B', text: 'Not Given' },
            { key: 'C', text: 'N/G' },
            { key: 'D', text: 'Both A and B are acceptable.' }
        ],
        correctAnswer: 'D',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Theo hướng dẫn chính thức của IELTS, bạn có thể viết đầy đủ "NOT GIVEN" hoặc viết tắt "NG". Cả hai đều được chấp nhận.'
    },
    {
        id: 47,
        question: 'What is a "lexical chain" in a reading passage?',
        options: [
            { key: 'A', text: 'A very long sentence.' },
            { key: 'B', text: 'A group of related words (synonyms, antonyms, words from the same topic) used throughout a text to maintain cohesion.' },
            { key: 'C', text: 'A list of vocabulary to memorize.' },
            { key: 'D', text: 'A grammatical error.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Nhận biết các chuỗi từ vựng liên quan (ví dụ: "education", "learning", "school", "students") giúp bạn theo dõi ý chính của đoạn văn một cách hiệu quả hơn.'
    },
    {
        id: 48,
        question: 'If you finish the test early, what is the best thing to do?',
        options: [
            { key: 'A', text: 'Leave the room immediately.' },
            { key: 'B', text: 'Check your answers, focusing on spelling, grammar, and word limits.' },
            { key: 'C', text: 'Read the passages again for fun.' },
            { key: 'D', text: 'Take a nap.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Luôn tận dụng toàn bộ thời gian. Rà soát lại câu trả lời có thể giúp bạn phát hiện và sửa những lỗi bất cẩn, có thể làm tăng điểm số của bạn.'
    },
    {
        id: 49,
        question: 'What is the purpose of the short introductory sentence sometimes found before the main passage?',
        options: [
            { key: 'A', text: 'It is not important and can be skipped.' },
            { key: 'B', text: 'It provides a brief summary or context for the entire passage and should be read.' },
            { key: 'C', text: 'It contains the answer to the first question.' },
            { key: 'D', text: 'It is the title.' }
        ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Đúng! Dòng chữ in nghiêng nhỏ này thường cung cấp bối cảnh quan trọng về bài đọc. Đừng bỏ qua nó, vì nó có thể giúp bạn hiểu chủ đề chung một cách nhanh chóng.'
    },
    {
        id: 50,
        question: 'What is the most fundamental skill for achieving a high score in IELTS Reading?',
        options: [
            { key: 'A', text: 'The ability to read very fast.' },
            { key: 'B', text: 'A very large vocabulary.' },
            { key: 'C', text: 'Understanding the question types and having a clear strategy for each one.' },
            { key: 'D', text: 'The ability to guess well.' }
        ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Reading',
        explanation_vi: 'Chính xác! Mặc dù tốc độ và từ vựng rất quan trọng, nhưng chìa khóa để thành công là hiểu rõ từng dạng câu hỏi và áp dụng đúng chiến lược cho dạng đó. Điều này giúp bạn làm bài một cách hệ thống và hiệu quả.'
    }
]
