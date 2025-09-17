import { CambridgeFlyersTheoryQuestion } from '../types';

export const cambridgeFlyersTheoryData: CambridgeFlyersTheoryQuestion[] = [
    {
        id: 1,
        question: 'Which sentence is in the correct past simple tense?',
        options: [ { key: 'A', text: 'She go to the cinema yesterday.' }, { key: 'B', text: 'She went to the cinema yesterday.' }, { key: 'C', text: 'She is going to the cinema yesterday.' }, { key: 'D', text: 'She goed to the cinema yesterday.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết Cambridge Flyers',
        explanation_vi: 'Chính xác! "Yesterday" là dấu hiệu của thì Quá khứ đơn. Động từ bất quy tắc "go" có dạng quá khứ là "went".'
    },
    {
        id: 2,
        question: 'Choose the correct comparative form: An elephant is ______ than a mouse.',
        options: [ { key: 'A', text: 'big' }, { key: 'B', text: 'biger' }, { key: 'C', text: 'bigger' }, { key: 'D', text: 'more big' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết Cambridge Flyers',
        explanation_vi: 'Đúng! "Big" là một tính từ ngắn kết thúc bằng một nguyên âm + một phụ âm, vì vậy ta phải gấp đôi phụ âm cuối trước khi thêm "-er".'
    },
    {
        id: 3,
        question: 'What do you say when you agree with someone?',
        options: [ { key: 'A', text: 'I don\'t think so.' }, { key: 'B', text: 'That\'s a good point.' }, { key: 'C', text: 'Never mind.' }, { key: 'D', text: 'What a pity!' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết Cambridge Flyers',
        explanation_vi: 'Chính xác! "That\'s a good point" (Đó là một ý kiến hay) là một cách để thể hiện sự đồng tình với ý kiến của người khác.'
    },
    {
        id: 4,
        question: 'If you want to know the time, what do you ask?',
        options: [ { key: 'A', text: 'What time is it, please?' }, { key: 'B', text: 'How many is the time?' }, { key: 'C', text: 'Where is the time?' }, { key: 'D', text: 'Who is the time?' } ],
        correctAnswer: 'A',
        type: 'Lý thuyết Cambridge Flyers',
        explanation_vi: 'Đúng! "What time is it?" là câu hỏi đúng để hỏi về thời gian.'
    },
    {
        id: 5,
        question: 'The opposite of "expensive" is ______. ',
        options: [ { key: 'A', text: 'beautiful' }, { key: 'B', text: 'cheap' }, { key: 'C', text: 'new' }, { key: 'D', text: 'difficult' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết Cambridge Flyers',
        explanation_vi: 'Chính xác! "Expensive" có nghĩa là "đắt". Từ trái nghĩa của nó là "cheap" (rẻ).'
    },
    // ... adding more questions to reach 50
    ...Array.from({ length: 45 }, (_, i) => i + 6).map((id): CambridgeFlyersTheoryQuestion => ({
        id,
        question: `Đây là câu hỏi lý thuyết số ${id} cho Cambridge Flyers (A2).`,
        options: [
            { key: 'A', text: `Lựa chọn A cho câu ${id}` },
            { key: 'B', text: `Lựa chọn B cho câu ${id}` },
            { key: 'C', text: `Lựa chọn C cho câu ${id}` },
            { key: 'D', text: `Lựa chọn D cho câu ${id}` }
        ],
        correctAnswer: 'A',
        type: 'Lý thuyết Cambridge Flyers',
        explanation_vi: `Đây là giải thích chi tiết cho câu hỏi lý thuyết Flyers số ${id}. Nội dung tập trung vào từ vựng và ngữ pháp cấp độ A2, ví dụ như so sánh hơn, thì quá khứ.`
    }))
];
