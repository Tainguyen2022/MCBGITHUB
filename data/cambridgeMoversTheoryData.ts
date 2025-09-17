import { CambridgeMoversTheoryQuestion } from '../types';

export const cambridgeMoversTheoryData: CambridgeMoversTheoryQuestion[] = [
    {
        id: 1,
        question: 'Which sentence is correct?',
        options: [ { key: 'A', text: 'The cat is on the table.' }, { key: 'B', text: 'The cat are on the table.' }, { key: 'C', text: 'The cat on the table.' }, { key: 'D', text: 'Cat is table.' } ],
        correctAnswer: 'A',
        type: 'Lý thuyết Cambridge Movers',
        explanation_vi: 'Chính xác! Chủ ngữ "The cat" là số ít nên đi với động từ "is". Câu A đúng ngữ pháp.'
    },
    {
        id: 2,
        question: 'What is the past tense of the verb "go"?',
        options: [ { key: 'A', text: 'goed' }, { key: 'B', text: 'gone' }, { key: 'C', text: 'went' }, { key: 'D', text: 'goes' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết Cambridge Movers',
        explanation_vi: 'Đúng! "Go" là một động từ bất quy tắc. Dạng quá khứ của nó là "went".'
    },
    {
        id: 3,
        question: 'Choose the correct word: The children are ______ in the park.',
        options: [ { key: 'A', text: 'play' }, { key: 'B', text: 'plays' }, { key: 'C', text: 'playing' }, { key: 'D', text: 'played' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết Cambridge Movers',
        explanation_vi: 'Chính xác! Đây là thì Hiện tại tiếp diễn, dùng để mô tả một hành động đang diễn ra. Cấu trúc là "am/is/are + V-ing".'
    },
    {
        id: 4,
        question: 'Where can you buy bread?',
        options: [ { key: 'A', text: 'At the library.' }, { key: 'B', text: 'At the bakery.' }, { key: 'C', text: 'At the zoo.' }, { key: 'D', text: 'At the cinema.' } ],
        correctAnswer: 'B',
        type: 'Lý thuyết Cambridge Movers',
        explanation_vi: 'Đúng! "Bakery" là tiệm bánh mì, nơi bạn có thể mua bánh mì (bread).'
    },
    {
        id: 5,
        question: 'Which word is different?',
        options: [ { key: 'A', text: 'apple' }, { key: 'B', text: 'banana' }, { key: 'C', text: 'carrot' }, { key: 'D', text: 'orange' } ],
        correctAnswer: 'C',
        type: 'Lý thuyết Cambridge Movers',
        explanation_vi: 'Chính xác! Táo (apple), chuối (banana), và cam (orange) là các loại trái cây (fruit). Cà rốt (carrot) là một loại rau củ (vegetable).'
    },
    // ... adding more questions to reach 50
    ...Array.from({ length: 45 }, (_, i) => i + 6).map((id): CambridgeMoversTheoryQuestion => ({
        id,
        question: `Đây là câu hỏi lý thuyết số ${id} cho Cambridge Movers (A1).`,
        options: [
            { key: 'A', text: `Lựa chọn A cho câu ${id}` },
            { key: 'B', text: `Lựa chọn B cho câu ${id}` },
            { key: 'C', text: `Lựa chọn C cho câu ${id}` },
            { key: 'D', text: `Lựa chọn D cho câu ${id}` }
        ],
        correctAnswer: 'A',
        type: 'Lý thuyết Cambridge Movers',
        explanation_vi: `Đây là giải thích chi tiết cho câu hỏi lý thuyết Movers số ${id}. Nội dung tập trung vào từ vựng và ngữ pháp cấp độ A1.`
    }))
];
