export interface IeltsPart1TheoryQuestion {
    id: number;
    question: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    type: 'Lý thuyết IELTS Part 1';
    explanation_vi: string;
}

export const ieltsPart1TheoryData: IeltsPart1TheoryQuestion[] = [
    {
        id: 1,
        question: 'IELTS Speaking Part 1 kéo dài trong bao lâu?',
        options: [ { key: 'A', text: '1-2 phút' }, { key: 'B', text: '4-5 phút' }, { key: 'C', text: '10-12 phút' }, { key: 'D', text: '15 phút' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Part 1 là phần khởi động, kéo dài khoảng 4-5 phút, bao gồm phần giới thiệu và các câu hỏi về chủ đề quen thuộc.'
    },
    {
        id: 2,
        question: 'Giám khảo thường hỏi bao nhiêu chủ đề trong Part 1?',
        options: [ { key: 'A', text: '1 chủ đề' }, { key: 'B', text: '2-3 chủ đề' }, { key: 'C', text: '5-6 chủ đề' }, { key: 'D', text: 'Chỉ hỏi về công việc/học tập' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Sau phần giới thiệu, giám khảo sẽ hỏi bạn về 2-3 chủ đề quen thuộc khác nhau, mỗi chủ đề có khoảng 3-4 câu hỏi.'
    },
    {
        id: 3,
        question: 'Đâu là một trong những chủ đề KHÔNG BAO GIỜ được hỏi trong IELTS Speaking?',
        options: [ { key: 'A', text: 'Work/Studies' }, { key: 'B', text: 'Hometown' }, { key: 'C', text: 'Politics/Religion' }, { key: 'D', text: 'Hobbies' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Các chủ đề nhạy cảm và gây tranh cãi như chính trị, tôn giáo sẽ không bao giờ được hỏi để đảm bảo tính công bằng.'
    },
    {
        id: 4,
        question: 'Mục đích chính của Part 1 là gì?',
        options: [ { key: 'A', text: 'Kiểm tra kiến thức chuyên sâu của bạn.' }, { key: 'B', text: 'Để bạn làm quen và "khởi động" trước các phần sau.' }, { key: 'C', text: 'Để bạn tranh luận với giám khảo.' }, { key: 'D', text: 'Để bạn kể một câu chuyện dài.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Part 1 được thiết kế như một phần "ice-breaker" để giúp bạn thoải mái, làm quen với giọng của giám khảo và thể hiện khả năng giao tiếp cơ bản.'
    },
    {
        id: 5,
        question: 'Chiến lược trả lời hiệu quả cho câu hỏi Part 1 là gì?',
        options: [ { key: 'A', text: 'Chỉ trả lời "Yes" hoặc "No".' }, { key: 'B', text: 'Trả lời ngắn gọn trong 1-2 câu.' }, { key: 'C', text: 'Trả lời trực tiếp, sau đó mở rộng bằng cách giải thích và/hoặc đưa ra ví dụ (Answer-Explain-Example).' }, { key: 'D', text: 'Hỏi lại giám khảo câu hỏi tương tự.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Một câu trả lời tốt nên kéo dài 2-3 câu, bao gồm câu trả lời trực tiếp, sau đó là lý do ("because...") hoặc một ví dụ ("for example...").'
    },
    {
        id: 6,
        question: 'Nếu không hiểu câu hỏi của giám khảo, bạn nên làm gì?',
        options: [ { key: 'A', text: 'Đoán và trả lời đại.' }, { key: 'B', text: 'Im lặng.' }, { key: 'C', text: 'Lịch sự yêu cầu giám khảo nhắc lại hoặc giải thích từ. (e.g., "Could you please repeat the question?")' }, { key: 'D', text: 'Trả lời một câu hỏi khác mà bạn đã chuẩn bị.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Yêu cầu làm rõ là hoàn toàn chấp nhận được và tốt hơn nhiều so với việc trả lời sai câu hỏi. Bạn có thể nói "Sorry, could you say that again?" hoặc "I\'m not sure I understand the word...".'
    },
    {
        id: 7,
        question: 'Tiêu chí "Fluency and Coherence" (Trôi chảy và Mạch lạc) đánh giá điều gì?',
        options: [ { key: 'A', text: 'Bạn có dùng nhiều từ vựng khó hay không.' }, { key: 'B', text: 'Bạn có nói nhanh và không mắc lỗi ngữ pháp hay không.' }, { key: 'C', text: 'Bạn có nói một cách tự nhiên, có ngập ngừng hợp lý và nối các ý một cách logic hay không.' }, { key: 'D', text: 'Bạn có phát âm chuẩn như người bản xứ hay không.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Tiêu chí này đánh giá tốc độ nói tự nhiên, khả năng nói dài mà không cần cố gắng quá sức, và việc sử dụng các từ nối (linking words) để làm cho câu trả lời có logic.'
    },
    {
        id: 8,
        question: 'Tiêu chí "Lexical Resource" (Vốn từ vựng) đánh giá điều gì?',
        options: [ { key: 'A', text: 'Chỉ dùng các từ đơn giản và an toàn.' }, { key: 'B', text: 'Sử dụng đa dạng từ vựng, bao gồm các từ ít phổ biến và thành ngữ một cách chính xác.' }, { key: 'C', text: 'Nói thật nhanh.' }, { key: 'D', text: 'Không mắc lỗi ngữ pháp nào.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Để đạt điểm cao, bạn cần thể hiện một vốn từ vựng rộng, có khả năng diễn giải (paraphrase) và sử dụng các cụm từ (collocations) một cách tự nhiên.'
    },
    {
        id: 9,
        question: 'Tiêu chí "Grammatical Range and Accuracy" (Ngữ pháp Đa dạng và Chính xác) yêu cầu gì?',
        options: [ { key: 'A', text: 'Chỉ dùng câu đơn và thì hiện tại đơn để tránh lỗi.' }, { key: 'B', text: 'Sử dụng kết hợp câu đơn và câu phức, và các thì khác nhau một cách linh hoạt và chính xác.' }, { key: 'C', text: 'Nói không ngừng nghỉ.' }, { key: 'D', text: 'Dùng thật nhiều thành ngữ.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Giám khảo muốn nghe bạn sử dụng đa dạng các cấu trúc ngữ pháp (câu phức, câu điều kiện, mệnh đề quan hệ...) và sử dụng chúng một cách chính xác.'
    },
    {
        id: 10,
        question: 'Tiêu chí "Pronunciation" (Phát âm) tập trung vào điều gì nhất?',
        options: [ { key: 'A', text: 'Bạn phải có giọng Anh-Anh hoặc Anh-Mỹ chuẩn.' }, { key: 'B', text: 'Bạn phải nói thật to.' }, { key: 'C', text: 'Bạn phải nói rõ ràng, dễ hiểu, có ngữ điệu, nhấn trọng âm đúng.' }, { key: 'D', text: 'Bạn phải nói không có bất kỳ lỗi phát âm nào.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Giọng (accent) không quan trọng. Điều quan trọng là phát âm của bạn phải rõ ràng, dễ hiểu, và sử dụng ngữ điệu (intonation) và trọng âm (stress) để truyền tải ý nghĩa.'
    },
    {
        id: 11,
        question: 'Bạn có nên học thuộc lòng câu trả lời cho Part 1 không?',
        options: [ { key: 'A', text: 'Có, đó là cách tốt nhất để đạt điểm cao.' }, { key: 'B', text: 'Không, vì giám khảo được đào tạo để nhận ra câu trả lời học thuộc và sẽ cho điểm thấp.' }, { key: 'C', text: 'Chỉ nên học thuộc cho các chủ đề khó.' }, { key: 'D', text: 'Có, nhưng chỉ học thuộc các từ vựng.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Câu trả lời học thuộc lòng nghe rất thiếu tự nhiên và giám khảo sẽ dễ dàng nhận ra. Thay vào đó, hãy học ý tưởng và từ vựng, và luyện tập trả lời một cách tự nhiên.'
    },
    {
        id: 12,
        question: 'Khi giám khảo hỏi "Do you like X?", cách trả lời nào sau đây tốt hơn?',
        options: [ { key: 'A', text: 'Yes, I do.' }, { key: 'B', text: 'Yes, I do. I like it very much.' }, { key: 'C', text: 'Absolutely! I\'m a big fan of X because it helps me relax.' }, { key: 'D', text: 'I don\'t know.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Câu trả lời C không chỉ trả lời trực tiếp mà còn dùng từ vựng tốt hơn ("Absolutely! I\'m a big fan of...") và mở rộng bằng cách nêu lý do ("because...").'
    },
    {
        id: 13,
        question: 'Việc sử dụng các "filler words" (từ đệm) như "Well...", "Let me see..." có tốt không?',
        options: [ { key: 'A', text: 'Không, nó cho thấy bạn không biết câu trả lời.' }, { key: 'B', text: 'Có, nếu được dùng một cách tự nhiên để có thêm thời gian suy nghĩ, nó sẽ giúp câu trả lời trôi chảy hơn.' }, { key: 'C', text: 'Chỉ nên dùng "Uhm..." và "Ahh...".' }, { key: 'D', text: 'Không, bạn phải trả lời ngay lập tức.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Sử dụng các từ đệm một cách tự nhiên (không lạm dụng) cho thấy khả năng giao tiếp thực tế, giúp bạn có vài giây để sắp xếp ý tưởng.'
    },
    {
        id: 14,
        question: 'Paraphrasing (diễn giải lại câu hỏi) trong câu trả lời có quan trọng không?',
        options: [ { key: 'A', text: 'Không, bạn nên lặp lại chính xác các từ trong câu hỏi.' }, { key: 'B', text: 'Có, nó cho thấy bạn có vốn từ vựng rộng và hiểu câu hỏi.' }, { key: 'C', text: 'Chỉ quan trọng ở Part 3.' }, { key: 'D', text: 'Không quan trọng bằng ngữ pháp.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Thay vì lặp lại "I like reading books...", bạn có thể nói "I\'m really keen on reading..." hoặc "I\'m an avid reader...". Điều này thể hiện vốn từ vựng của bạn (Lexical Resource).'
    },
    {
        id: 15,
        question: 'Nếu bạn thực sự không thích một chủ đề nào đó (ví dụ: museums), bạn nên trả lời như thế nào?',
        options: [ { key: 'A', text: 'Nói dối rằng bạn rất thích nó.' }, { key: 'B', text: 'Nói thẳng rằng bạn không thích và giải thích lý do tại sao.' }, { key: 'C', text: 'Chỉ nói "I don\'t like it." và dừng lại.' }, { key: 'D', text: 'Yêu cầu giám khảo đổi chủ đề.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Giám khảo không chấm điểm ý kiến của bạn, mà là khả năng diễn đạt ý kiến đó bằng tiếng Anh. Hãy trung thực và giải thích lý do, ví dụ: "To be honest, I\'m not a big fan of museums because I find them a bit boring. I prefer more active hobbies."'
    },
    {
        id: 16,
        question: 'Việc tự sửa lỗi (self-correction) khi nói có ảnh hưởng đến điểm không?',
        options: [ { key: 'A', text: 'Có, nó sẽ làm điểm của bạn bị trừ nặng.' }, { key: 'B', text: 'Không, nếu bạn sửa lỗi một cách nhanh chóng và tự nhiên, nó có thể cho thấy bạn có ý thức về ngữ pháp.' }, { key: 'C', text: 'Bạn không bao giờ được phép tự sửa lỗi.' }, { key: 'D', text: 'Chỉ được sửa lỗi phát âm, không được sửa lỗi ngữ pháp.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Một vài lần tự sửa lỗi nhỏ và tự nhiên là hoàn toàn bình thường và cho thấy khả năng tự nhận thức về ngôn ngữ. Tuy nhiên, nếu bạn sửa lỗi liên tục, nó sẽ ảnh hưởng đến độ trôi chảy.'
    },
    {
        id: 17,
        question: 'Trong Part 1, bạn có nên dùng các thành ngữ (idioms) không?',
        options: [ { key: 'A', text: 'Không, thành ngữ chỉ dành cho Part 3.' }, { key: 'B', text: 'Có, nhưng chỉ khi bạn chắc chắn hiểu đúng nghĩa và dùng đúng ngữ cảnh để nghe tự nhiên.' }, { key: 'C', text: 'Có, càng nhiều càng tốt để gây ấn tượng.' }, { key: 'D', text: 'Không, vì giám khảo có thể không hiểu.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Dùng đúng thành ngữ sẽ giúp bạn đạt điểm cao ở tiêu chí Lexical Resource. Nhưng dùng sai hoặc gượng ép sẽ phản tác dụng. Ví dụ: "It costs an arm and a leg" (rất đắt).'
    },
    {
        id: 18,
        question: 'Nếu giám khảo hỏi về một chủ đề bạn không có kinh nghiệm (ví dụ: "Do you like dancing?"), bạn nên làm gì?',
        options: [ { key: 'A', text: 'Bịa ra một câu chuyện về việc bạn là một vũ công giỏi.' }, { key: 'B', text: 'Nói "I don\'t know" và dừng lại.' }, { key: 'C', text: 'Thành thật nói bạn không có kinh nghiệm và giải thích tại sao, hoặc nói về một hoạt động tương tự.' }, { key: 'D', text: 'Im lặng.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Hãy thành thật. Ví dụ: "Actually, I have two left feet, so I don\'t really dance. However, I do enjoy watching dance performances."'
    },
    {
        id: 19,
        question: 'Tốc độ nói như thế nào là lý tưởng trong Part 1?',
        options: [ { key: 'A', text: 'Nói thật nhanh để chứng tỏ sự lưu loát.' }, { key: 'B', text: 'Nói thật chậm để tránh lỗi.' }, { key: 'C', text: 'Nói với tốc độ tự nhiên, vừa phải, có ngắt nghỉ hợp lý.' }, { key: 'D', text: 'Nói với tốc độ giống hệt giám khảo.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Trôi chảy không có nghĩa là nói nhanh. Nó có nghĩa là nói một cách tự nhiên, không bị ngập ngừng quá nhiều để tìm từ. Một tốc độ vừa phải sẽ giúp bạn phát âm rõ ràng hơn.'
    },
    {
        id: 20,
        question: 'Câu trả lời của bạn nên tập trung vào điều gì?',
        options: [ { key: 'A', text: 'Kể một câu chuyện thật dài và chi tiết.' }, { key: 'B', text: 'Cung cấp thông tin cá nhân và trải nghiệm của bạn.' }, { key: 'C', text: 'Phân tích các vấn đề xã hội phức tạp.' }, { key: 'D', text: 'Đưa ra các số liệu thống kê.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Part 1 là về cá nhân bạn. Hãy trả lời dựa trên cuộc sống, sở thích, và kinh nghiệm của chính bạn. Đây là những chủ đề bạn quen thuộc nhất.'
    },
    {
        id: 21,
        question: 'Sử dụng từ nối (linking words) như "However", "Therefore" trong Part 1 có phải là một ý hay không?',
        options: [ { key: 'A', text: 'Có, nên dùng càng nhiều càng tốt.' }, { key: 'B', text: 'Không, những từ đó quá trang trọng cho Part 1.' }, { key: 'C', text: 'Có thể dùng, nhưng các từ nối đơn giản như "and", "but", "so", "because" sẽ tự nhiên hơn.' }, { key: 'D', text: 'Chỉ nên dùng "and".' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Part 1 mang tính chất trò chuyện thân mật. Dùng các từ nối đơn giản sẽ giúp câu trả lời của bạn nghe tự nhiên hơn. Các từ nối phức tạp hơn phù hợp với Part 3.'
    },
    {
        id: 22,
        question: 'Khi trả lời, bạn có nên nhìn thẳng vào giám khảo không?',
        options: [ { key: 'A', text: 'Không, nên nhìn xuống bàn để tập trung.' }, { key: 'B', text: 'Có, giao tiếp bằng mắt (eye contact) tự nhiên là một phần quan trọng của giao tiếp.' }, { key: 'C', text: 'Chỉ nên nhìn vào giấy nháp.' }, { key: 'D', text: 'Nên nhắm mắt lại để suy nghĩ.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Giao tiếp bằng mắt tự nhiên cho thấy sự tự tin và giúp cuộc trò chuyện diễn ra trôi chảy hơn. Đừng nhìn chằm chằm, nhưng hãy duy trì giao tiếp bằng mắt như khi bạn đang nói chuyện với một người bình thường.'
    },
    {
        id: 23,
        question: 'Đâu là cách tốt để mở rộng câu trả lời cho câu hỏi "Do you like watching movies?"',
        options: [ { key: 'A', text: 'Yes, I like watching movies because they are interesting.' }, { key: 'B', text: 'Yes, especially comedies. I find that laughing is a great way to relieve stress.' }, { key: 'C', text: 'Yes, many people in my country like movies.' }, { key: 'D', text: 'Yes, I do.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Câu B không chỉ trả lời, mà còn cụ thể hóa ("especially comedies") và giải thích lý do ("laughing is a great way to relieve stress"), thể hiện vốn từ và khả năng phát triển ý.'
    },
    {
        id: 24,
        question: 'Nếu giám khảo hỏi "What kind of music do you like?", bạn nên tránh câu trả lời nào sau đây?',
        options: [ { key: 'A', text: 'I\'m a big fan of pop music, especially artists like Taylor Swift.' }, { key: 'B', text: 'I like all kinds of music.' }, { key: 'C', text: 'To be honest, I don\'t listen to music very often, but when I do, I prefer something relaxing.' }, { key: 'D', text: 'My taste in music is quite eclectic. I enjoy everything from classical to rock.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Câu trả lời "I like all kinds of music" quá chung chung và không cho giám khảo thấy được khả năng ngôn ngữ của bạn. Hãy cố gắng cụ thể hơn một chút.'
    },
    {
        id: 25,
        question: 'Việc sử dụng các thì khác nhau (ví dụ: quá khứ, tương lai) trong Part 1 có cần thiết không?',
        options: [ { key: 'A', text: 'Không, chỉ cần dùng thì hiện tại đơn.' }, { key: 'B', text: 'Có, nếu câu hỏi yêu cầu. Ví dụ: "What did you do last weekend?" yêu cầu thì quá khứ.' }, { key: 'C', text: 'Chỉ cần dùng thì tương lai.' }, { key: 'D', text: 'Không quan trọng.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Lắng nghe kỹ câu hỏi của giám khảo để sử dụng đúng thì. Ví dụ: "What did you do...?" → dùng thì quá khứ; "What will you do...?" → dùng thì tương lai. Điều này thể hiện Grammatical Range and Accuracy.'
    },
    {
        id: 26,
        question: 'Tiêu chí Fluency & Coherence KHÔNG đánh giá yếu tố nào sau đây?',
        options: [ { key: 'A', text: 'Tốc độ nói' }, { key: 'B', text: 'Khả năng nói dài' }, { key: 'C', text: 'Việc sử dụng từ nối' }, { key: 'D', text: 'Sự chính xác của ngữ pháp' } ],
        correctAnswer: 'D',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Sự chính xác của ngữ pháp được đánh giá trong tiêu chí "Grammatical Range and Accuracy", không phải trong "Fluency and Coherence".'
    },
    {
        id: 27,
        question: 'Để thể hiện "Lexical Resource" tốt, bạn nên làm gì?',
        options: [ { key: 'A', text: 'Lặp lại các từ của giám khảo.' }, { key: 'B', text: 'Dùng từ đồng nghĩa và diễn giải lại ý.' }, { key: 'C', text: 'Nói những câu rất ngắn.' }, { key: 'D', text: 'Chỉ dùng những từ bạn chắc chắn 100%.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Sử dụng từ đồng nghĩa (synonyms) và diễn giải (paraphrasing) là hai cách hiệu quả nhất để thể hiện vốn từ vựng phong phú của bạn.'
    },
    {
        id: 28,
        question: 'Ngữ điệu (Intonation) là gì và nó có quan trọng không?',
        options: [ { key: 'A', text: 'Là âm lượng của giọng nói, không quan trọng.' }, { key: 'B', text: 'Là sự lên xuống của giọng nói, rất quan trọng để truyền tải ý nghĩa và cảm xúc.' }, { key: 'C', text: 'Là cách bạn phát âm nguyên âm, khá quan trọng.' }, { key: 'D', text: 'Là cách bạn nối các từ, không quan trọng.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Ngữ điệu là sự lên xuống của giọng nói. Sử dụng ngữ điệu phù hợp làm cho bài nói của bạn tự nhiên và biểu cảm hơn, giúp bạn đạt điểm cao hơn ở tiêu chí Pronunciation.'
    },
    {
        id: 29,
        question: 'Một câu trả lời tốt cho Part 1 nên dài khoảng bao nhiêu câu?',
        options: [ { key: 'A', text: '1 câu' }, { key: 'B', text: '2-4 câu' }, { key: 'C', text: '5-7 câu' }, { key: 'D', text: 'Càng dài càng tốt' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Một câu trả lời dài khoảng 2-4 câu là lý tưởng. Nó đủ dài để bạn thể hiện khả năng ngôn ngữ nhưng không quá dài dòng, lan man cho một cuộc trò chuyện ở Part 1.'
    },
    {
        id: 30,
        question: 'Đâu là cách diễn giải (paraphrase) tốt cho câu hỏi "Do you like your hometown?"',
        options: [ { key: 'A', text: 'Yes, I like my hometown.' }, { key: 'B', text: 'My hometown is a place I like.' }, { key: 'C', text: 'Absolutely, I\'m very fond of the place where I grew up.' }, { key: 'D', text: 'Yes, my hometown is very good.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Câu C sử dụng từ vựng tốt hơn ("fond of") và diễn giải lại "hometown" thành "the place where I grew up", thể hiện rõ khả năng ngôn ngữ.'
    },
    {
        id: 31,
        question: 'Tại sao việc mở rộng câu trả lời lại quan trọng trong Part 1?',
        options: [ { key: 'A', text: 'Để kéo dài thời gian thi.' }, { key: 'B', text: 'Để cho giám khảo có thêm cơ hội đánh giá khả năng ngôn ngữ của bạn.' }, { key: 'C', text: 'Để chứng tỏ bạn biết nhiều về chủ đề.' }, { key: 'D', text: 'Để làm cho giám khảo mệt mỏi.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Câu trả lời dài hơn (nhưng không lan man) cung cấp nhiều "dữ liệu" hơn cho giám khảo để đánh giá cả bốn tiêu chí: Fluency, Lexical Resource, Grammar, và Pronunciation.'
    },
    {
        id: 32,
        question: 'Từ "collocation" (cụm từ) có nghĩa là gì trong tiêu chí Lexical Resource?',
        options: [ { key: 'A', text: 'Các từ khó.' }, { key: 'B', text: 'Các từ được sắp xếp theo đúng trật tự.' }, { key: 'C', text: 'Các từ thường đi với nhau một cách tự nhiên, ví dụ "heavy rain" hay "fast food".' }, { key: 'D', text: 'Các từ đồng nghĩa.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Sử dụng các cụm từ tự nhiên như người bản xứ (collocations) là một cách tuyệt vời để gây ấn tượng với giám khảo và tăng điểm từ vựng.'
    },
    {
        id: 33,
        question: 'Trong câu trả lời, bạn có nên dùng "I think" nhiều lần không?',
        options: [ { key: 'A', text: 'Có, nó cho thấy bạn đang suy nghĩ.' }, { key: 'B', text: 'Không, bạn nên đa dạng hóa bằng các cụm từ khác như "I believe", "In my opinion", "As I see it".' }, { key: 'C', text: 'Chỉ được dùng một lần duy nhất.' }, { key: 'D', text: 'Nên tránh hoàn toàn việc đưa ra ý kiến.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Lặp lại "I think" sẽ làm bài nói của bạn đơn điệu. Hãy chuẩn bị một vài cách khác để diễn đạt quan điểm cá nhân.'
    },
    {
        id: 34,
        question: 'Trọng âm từ (Word stress) là gì?',
        options: [ { key: 'A', text: 'Nhấn mạnh vào âm tiết đúng trong một từ (ví dụ: PHO-to-graphy).' }, { key: 'B', text: 'Nói một từ to hơn các từ khác.' }, { key: 'C', text: 'Nói tất cả các âm tiết bằng nhau.' }, { key: 'D', text: 'Chỉ quan trọng đối với các từ dài.' } ],
        correctAnswer: 'A',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Đặt trọng âm đúng âm tiết trong một từ là một phần quan trọng của tiêu chí Pronunciation, giúp người nghe dễ hiểu hơn.'
    },
    {
        id: 35,
        question: 'Đâu là một ví dụ tốt về việc sử dụng câu phức (complex sentence) trong Part 1?',
        options: [ { key: 'A', text: 'I like dogs. Dogs are cute.' }, { key: 'B', text: 'I like dogs, and they are cute.' }, { key: 'C', text: 'I like dogs because they are very loyal, although they can be noisy sometimes.' }, { key: 'D', text: 'Dogs are good.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Câu C sử dụng các liên từ phụ thuộc ("because", "although") để nối các mệnh đề, tạo thành một câu phức thể hiện khả năng ngữ pháp tốt hơn.'
    },
    {
        id: 36,
        question: 'Sử dụng ngôn ngữ không trang trọng (informal language) trong Part 1 có được không?',
        options: [ { key: 'A', text: 'Không, bạn phải luôn dùng ngôn ngữ học thuật.' }, { key: 'B', text: 'Có, Part 1 giống như một cuộc trò chuyện, vì vậy ngôn ngữ thân mật, tự nhiên là phù hợp.' }, { key: 'C', text: 'Chỉ được dùng tiếng lóng (slang).' }, { key: 'D', text: 'Chỉ được dùng ngôn ngữ trang trọng.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Part 1 là phần thi ít trang trọng nhất. Sử dụng ngôn ngữ tự nhiên, hàng ngày (nhưng vẫn đúng ngữ pháp) là hoàn toàn phù hợp. Tránh dùng tiếng lóng hoặc ngôn ngữ quá suồng sã.'
    },
    {
        id: 37,
        question: 'Giám khảo ngắt lời bạn khi đang trả lời có phải là một dấu hiệu xấu không?',
        options: [ { key: 'A', text: 'Có, điều đó có nghĩa là bạn đã trả lời sai.' }, { key: 'B', text: 'Không, giám khảo phải tuân thủ thời gian nghiêm ngặt và cần chuyển sang câu hỏi tiếp theo.' }, { key: 'C', text: 'Có, điều đó có nghĩa là giám khảo không thích bạn.' }, { key: 'D', text: 'Không, điều đó có nghĩa là bạn đã nói đủ và giám khảo muốn kiểm tra chủ đề khác.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Đừng lo lắng nếu bị ngắt lời. Giám khảo có một lịch trình chặt chẽ và phải hỏi đủ số lượng câu hỏi trong thời gian quy định. Đó là một phần bình thường của bài thi.'
    },
    {
        id: 38,
        question: 'Đâu là cách tốt để bắt đầu câu trả lời nếu bạn cần một chút thời gian suy nghĩ?',
        options: [ { key: 'A', text: 'Im lặng và nhìn xuống.' }, { key: 'B', text: 'Lặp lại chính xác câu hỏi của giám khảo.' }, { key: 'C', text: 'Sử dụng một cụm từ đệm như "That\'s an interesting question...".' }, { key: 'D', text: 'Nói "I need more time".' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Sử dụng các cụm từ như "That\'s a good question," hoặc "Let me see..." cho bạn một vài giây quý giá để sắp xếp ý tưởng mà vẫn duy trì được sự trôi chảy.'
    },
    {
        id: 39,
        question: 'Nếu bạn mắc một lỗi ngữ pháp nhỏ, bạn nên làm gì?',
        options: [ { key: 'A', text: 'Dừng lại, xin lỗi và bắt đầu lại từ đầu.' }, { key: 'B', text: 'Phớt lờ nó và tiếp tục nói.' }, { key: 'C', text: 'Tự sửa lỗi một cách nhanh chóng và tiếp tục (ví dụ: "I go... I mean, I went...").' }, { key: 'D', text: 'Hoảng sợ và ngừng nói.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Việc tự sửa lỗi nhanh chóng cho thấy bạn nhận thức được lỗi sai của mình, điều này có thể được giám khảo đánh giá cao. Đừng làm cho nó trở nên quá lớn.'
    },
    {
        id: 40,
        question: 'Chủ đề đầu tiên trong Part 1 sau phần giới thiệu thường là gì?',
        options: [ { key: 'A', text: 'Một chủ đề ngẫu nhiên.' }, { key: 'B', text: 'Luôn là về công việc hoặc học tập của bạn.' }, { key: 'C', text: 'Luôn là về quê hương hoặc nơi ở của bạn.' }, { key: 'D', text: 'Cả B và C đều có thể.' } ],
        correctAnswer: 'D',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Giám khảo sẽ bắt đầu bằng cách hỏi bạn về công việc/học tập HOẶC quê hương/nơi ở của bạn. Hãy chuẩn bị kỹ cho cả hai chủ đề này.'
    },
    {
        id: 41,
        question: 'Tại sao việc dùng các từ chỉ mức độ (ví dụ: "absolutely", "incredibly", "quite") lại tốt?',
        options: [ { key: 'A', text: 'Để làm câu dài hơn.' }, { key: 'B', text: 'Để thể hiện cảm xúc và làm cho ngôn ngữ của bạn phong phú hơn.' }, { key: 'C', text: 'Không có lợi ích gì.' }, { key: 'D', text: 'Để thay thế cho "very".' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Sử dụng các trạng từ chỉ mức độ giúp bạn thể hiện ý kiến một cách chính xác hơn (Lexical Resource) và làm cho bài nói của bạn trở nên sống động và tự nhiên hơn.'
    },
    {
        id: 42,
        question: 'Trọng âm câu (Sentence stress) có nghĩa là gì?',
        options: [ { key: 'A', text: 'Nói tất cả các từ trong câu to bằng nhau.' }, { key: 'B', text: 'Nhấn mạnh vào những từ quan trọng (content words) trong câu để làm rõ ý nghĩa.' }, { key: 'C', text: 'Nói câu cuối cùng to hơn.' }, { key: 'D', text: 'Chỉ nhấn mạnh vào động từ.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Nhấn mạnh vào các từ mang nội dung chính (danh từ, động từ chính, tính từ, trạng từ) là một phần quan trọng của tiêu chí Pronunciation, giúp bài nói của bạn có nhịp điệu tự nhiên.'
    },
    {
        id: 43,
        question: 'Nếu bạn được hỏi một câu hỏi mà bạn vừa mới trả lời, bạn nên làm gì?',
        options: [ { key: 'A', text: 'Nói "I already told you that".' }, { key: 'B', text: 'Lặp lại chính xác câu trả lời cũ của bạn.' }, { key: 'C', text: 'Diễn giải lại câu trả lời của bạn bằng những từ khác và có thể thêm một chi tiết nhỏ.' }, { key: 'D', text: 'Từ chối trả lời.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Giám khảo có thể hỏi lại để kiểm tra sự nhất quán hoặc khả năng diễn giải của bạn. Hãy trả lời lại câu hỏi bằng cách dùng từ vựng và cấu trúc khác để thể hiện sự linh hoạt.'
    },
    {
        id: 44,
        question: 'Tại sao nên tránh các câu trả lời chỉ có một từ?',
        options: [ { key: 'A', text: 'Vì chúng quá ngắn.' }, { key: 'B', text: 'Vì giám khảo không thể đánh giá được khả năng ngôn ngữ của bạn từ một từ.' }, { key: 'C', text: 'Vì chúng bị coi là thô lỗ.' }, { key: 'D', text: 'Tất cả các đáp án trên.' } ],
        correctAnswer: 'D',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Câu trả lời một từ không cung cấp đủ "dữ liệu" cho giám khảo để chấm điểm bất kỳ tiêu chí nào và có thể bị coi là không hợp tác.'
    },
    {
        id: 45,
        question: 'Việc ngập ngừng "um", "er" có ảnh hưởng đến điểm Fluency không?',
        options: [ { key: 'A', text: 'Không, hoàn toàn không ảnh hưởng.' }, { key: 'B', text: 'Có, nếu bạn lạm dụng chúng quá nhiều, nó cho thấy bạn đang gặp khó khăn trong việc tìm từ.' }, { key: 'C', text: 'Bạn sẽ bị trừ điểm ngay lập tức nếu nói "um".' }, { key: 'D', text: 'Chỉ ảnh hưởng đến điểm phát âm.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Một vài lần ngập ngừng là tự nhiên, nhưng nếu bạn lạm dụng "um", "er" liên tục, nó sẽ ảnh hưởng tiêu cực đến điểm Fluency. Hãy cố gắng thay thế chúng bằng các từ đệm như "Well..." hoặc "Let me see...".'
    },
    {
        id: 46,
        question: 'Đâu là một câu trả lời tốt thể hiện "Grammatical Range" cho câu hỏi "What do you do in your free time?"',
        options: [ { key: 'A', text: 'I like to play football.' }, { key: 'B', text: 'I usually play football, which is a sport I have loved since I was a child.' }, { key: 'C', text: 'I play football. I play with friends. It is fun.' }, { key: 'D', text: 'I will play football.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Câu B sử dụng thì hiện tại đơn ("play"), mệnh đề quan hệ ("which is..."), và thì hiện tại hoàn thành ("I have loved"), thể hiện sự đa dạng về ngữ pháp.'
    },
    {
        id: 47,
        question: 'Sử dụng các từ vựng không phổ biến (less common vocabulary) có nghĩa là gì?',
        options: [ { key: 'A', text: 'Dùng những từ không ai biết.' }, { key: 'B', text: 'Dùng những từ cụ thể, chính xác và ít gặp hơn thay vì các từ chung chung (ví dụ: "fascinating" thay vì "interesting").' }, { key: 'C', text: 'Dùng tiếng lóng.' }, { key: 'D', text: 'Dùng những từ rất dài.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Giám khảo tìm kiếm khả năng sử dụng từ vựng chính xác và ít thông dụng hơn để diễn đạt ý. Ví dụ, thay vì nói "very big", bạn có thể nói "enormous" hoặc "massive".'
    },
    {
        id: 48,
        question: 'Nối âm (Linking) có quan trọng trong tiêu chí Pronunciation không?',
        options: [ { key: 'A', text: 'Không, bạn nên phát âm từng từ riêng biệt.' }, { key: 'B', text: 'Có, nối âm tự nhiên giữa các từ làm cho bài nói của bạn trôi chảy và giống người bản xứ hơn.' }, { key: 'C', text: 'Chỉ quan trọng khi nói nhanh.' }, { key: 'D', text: 'Không quan trọng bằng trọng âm.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Nối âm (ví dụ: "an apple" đọc là /ən_æpl/) là một đặc điểm quan trọng của phát âm tự nhiên trong tiếng Anh và góp phần vào điểm Pronunciation của bạn.'
    },
    {
        id: 49,
        question: 'Nếu bạn nhận ra mình đã trả lời lạc đề, bạn nên làm gì?',
        options: [ { key: 'A', text: 'Tiếp tục nói lạc đề.' }, { key: 'B', text: 'Dừng lại đột ngột.' }, { key: 'C', text: 'Dùng một cụm từ để quay lại chủ đề, ví dụ "Anyway, to get back to your original question...".' }, { key: 'D', text: 'Xin lỗi giám khảo và yêu cầu làm lại.' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Đúng! Việc nhận ra và khéo léo quay lại chủ đề cho thấy khả năng kiểm soát ngôn ngữ và sự mạch lạc tốt. Đừng hoảng sợ, chỉ cần nhẹ nhàng điều hướng lại cuộc trò chuyện.'
    },
    {
        id: 50,
        question: 'Điều gì xảy ra ở đầu Part 1?',
        options: [ { key: 'A', text: 'Giám khảo hỏi ngay về một chủ đề khó.' }, { key: 'B', text: 'Giám khảo kiểm tra ID của bạn, hỏi tên đầy đủ và một vài câu hỏi giới thiệu cơ bản.' }, { key: 'C', text: 'Bạn phải giới thiệu về bản thân trong 2 phút.' }, { key: 'D', text: 'Bạn được chọn chủ đề để nói.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết IELTS Part 1',
        explanation_vi: 'Chính xác! Phần thi luôn bắt đầu bằng việc kiểm tra giấy tờ tùy thân, xác nhận tên của bạn, và sau đó là các câu hỏi về công việc/học tập hoặc quê hương để bắt đầu cuộc trò chuyện.'
    }
]
