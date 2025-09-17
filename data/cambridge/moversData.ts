import { CambridgeTest } from '../../types';

export const defaultMoversData: CambridgeTest[] = [
    {
        exam: 'movers',
        parts: [
            {
                partId: 'part1',
                title: 'Part 1: Read the sentences and choose the correct picture.',
                instructions_vi: 'Đọc câu và chọn bức tranh đúng.',
                durationSeconds: 300,
                questions: [
                    {
                        id: 'm-p1-q1',
                        questionText: { en: 'The girl is playing the guitar.', vi: 'Cô gái đang chơi đàn ghi-ta.' },
                        imageSeed: 'movers-girl-playing-guitar',
                        options: [{ en: 'Yes', vi: 'Đúng' }, { en: 'No', vi: 'Sai' }],
                        correctAnswer: 'Yes',
                        hint_vi: 'Nhìn xem cô gái đang cầm nhạc cụ gì.',
                        explanation_vi: 'Chính xác! Cô gái đang ngồi trên ghế và chơi đàn ghi-ta.'
                    },
                    {
                        id: 'm-p1-q2',
                        questionText: { en: 'The boy is flying a kite.', vi: 'Cậu bé đang thả diều.' },
                        imageSeed: 'movers-boy-reading-book',
                        options: [{ en: 'Yes', vi: 'Đúng' }, { en: 'No', vi: 'Sai' }],
                        correctAnswer: 'No',
                        hint_vi: 'Cậu bé đang làm gì với quyển sách?',
                        explanation_vi: 'Không phải! Cậu bé đang ngồi dưới gốc cây và đọc sách (reading a book).'
                    },
                ]
            },
            {
                partId: 'part2',
                title: 'Part 2: Look at the picture and answer the question.',
                instructions_vi: 'Nhìn vào tranh và trả lời câu hỏi.',
                durationSeconds: 300,
                questions: [
                     {
                        id: 'm-p2-q1',
                        questionText: { en: 'What is the monkey doing?', vi: 'Con khỉ đang làm gì?' },
                        imageSeed: 'movers-monkey-eating-banana',
                        options: [{ en: 'It is climbing.', vi: 'Nó đang trèo.' }, { en: 'It is eating.', vi: 'Nó đang ăn.' }, { en: 'It is sleeping.', vi: 'Nó đang ngủ.' }],
                        correctAnswer: 'It is eating.',
                        hint_vi: 'Con khỉ đang cầm quả gì trong tay?',
                        explanation_vi: 'Đúng rồi! Con khỉ đang ăn một quả chuối (eating a banana).'
                    },
                ]
            }
        ]
    }
];
