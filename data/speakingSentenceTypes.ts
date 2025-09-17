import { SentenceStructureGroup } from '../types';

export const speakingSentenceTypes: SentenceStructureGroup[] = [
    {
        category: "Basic Sentence Structures",
        vi: "Các cấu trúc câu cơ bản",
        items: [
            { id: "gen-simple", title: "Simple Sentences", vi: "Câu đơn", description: "Diễn tả một ý tưởng hoàn chỉnh.", example: "The cat sleeps on the mat." },
            { id: "gen-compound", title: "Compound Sentences", vi: "Câu ghép", description: "Nối hai ý tưởng độc lập bằng FANBOYS.", example: "I like coffee, and she likes tea." },
            { id: "gen-complex", title: "Complex Sentences", vi: "Câu phức", description: "Nối một ý phụ thuộc vào một ý chính.", example: "He went to bed because he was tired." },
            { id: "gen-comp-complex", title: "Compound-Complex", vi: "Câu phức-ghép", description: "Kết hợp câu ghép và câu phức.", example: "Although I was tired, I went out, and I had a great time." },
        ]
    },
    {
        category: "Conditionals & Hypotheticals",
        vi: "Câu điều kiện & Giả định",
        items: [
            { id: "gen-cond-1", title: "First Conditional", vi: "Điều kiện loại 1", description: "Điều kiện có thật ở tương lai.", example: "If it rains, we will stay home." },
            { id: "gen-cond-2", title: "Second Conditional", vi: "Điều kiện loại 2", description: "Điều kiện không có thật ở hiện tại.", example: "If I were you, I would study harder." },
            { id: "gen-cond-3", title: "Third Conditional", vi: "Điều kiện loại 3", description: "Điều kiện không có thật trong quá khứ.", example: "If she had known, she would have come." },
            { id: "gen-wishes", title: "Wishes & Subjunctive", vi: "Câu ước & Giả định", description: "Bày tỏ mong muốn trái với thực tế.", example: "I wish I had more time." },
        ]
    },
    {
        category: "Functional Sentences",
        vi: "Các câu chức năng",
        items: [
            { id: "gen-func-opinion", title: "Giving Opinions", vi: "Đưa ra ý kiến", description: "Bày tỏ quan điểm cá nhân.", example: "In my opinion, this is the best solution." },
            { id: "gen-func-agree", title: "Agreeing/Disagreeing", vi: "Đồng ý/Không đồng ý", description: "Thể hiện sự đồng tình hoặc phản đối.", example: "I see your point, but I have to disagree." },
            { id: "gen-func-suggest", title: "Making Suggestions", vi: "Đưa ra gợi ý", description: "Đề xuất một hành động.", example: "Why don't we go to the cinema tonight?" },
            { id: "gen-func-request", title: "Polite Requests", vi: "Yêu cầu lịch sự", description: "Đưa ra yêu cầu một cách lịch sự.", example: "Could you please open the window?" },
        ]
    }
];
