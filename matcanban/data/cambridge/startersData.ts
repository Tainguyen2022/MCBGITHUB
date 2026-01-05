import { CambridgeTest } from '../../types';

export const defaultStartersData: CambridgeTest[] = [
    {
        exam: 'starters',
        parts: [
            {
                partId: 'part1',
                title: 'Part 1: Read the question and choose the correct answer.',
                instructions_vi: 'Nhìn và đọc. Chọn câu trả lời đúng.',
                durationSeconds: 300, // 5 minutes
                questions: [
                    {
                        id: 's-p1-q1',
                        questionText: { en: 'This is a ball.', vi: 'Đây là một quả bóng.' },
                        imageSeed: 'starters-ball',
                        options: [{ en: 'Yes', vi: 'Đúng' }, { en: 'No', vi: 'Sai' }],
                        correctAnswer: 'Yes',
                        hint_vi: 'Nhìn vào hình xem có phải là quả bóng không nhé.',
                        explanation_vi: 'Đúng vậy! Trong hình là một quả bóng màu đỏ.'
                    },
                    {
                        id: 's-p1-q2',
                        questionText: { en: 'This is a car.', vi: 'Đây là một chiếc xe hơi.' },
                        imageSeed: 'starters-cat',
                        options: [{ en: 'Yes', vi: 'Đúng' }, { en: 'No', vi: 'Sai' }],
                        correctAnswer: 'No',
                        hint_vi: 'Con vật trong hình là con gì nhỉ?',
                        explanation_vi: 'Không phải! Đây là một con mèo (a cat).'
                    },
                    {
                        id: 's-p1-q3',
                        questionText: { en: 'This is a dog.', vi: 'Đây là một chú chó.' },
                        imageSeed: 'starters-dog',
                        options: [{ en: 'Yes', vi: 'Đúng' }, { en: 'No', vi: 'Sai' }],
                        correctAnswer: 'Yes',
                        hint_vi: 'Con vật này hay sủa "gâu gâu".',
                        explanation_vi: 'Chính xác! Đây là một chú chó.'
                    },
                    {
                        id: 's-p1-q4',
                        questionText: { en: 'This is a bicycle.', vi: 'Đây là một chiếc xe đạp.' },
                        imageSeed: 'starters-bicycle',
                        options: [{ en: 'Yes', vi: 'Đúng' }, { en: 'No', vi: 'Sai' }],
                        correctAnswer: 'Yes',
                        hint_vi: 'Đây là phương tiện có hai bánh xe.',
                        explanation_vi: 'Đúng rồi! Đây là một chiếc xe đạp (a bicycle).'
                    },
                    {
                        id: 's-p1-q5',
                        questionText: { en: 'This is a house.', vi: 'Đây là một ngôi nhà.' },
                        imageSeed: 'starters-house',
                        options: [{ en: 'Yes', vi: 'Đúng' }, { en: 'No', vi: 'Sai' }],
                        correctAnswer: 'Yes',
                        hint_vi: 'Đây là nơi mọi người ở.',
                        explanation_vi: 'Chính xác! Đây là một ngôi nhà (a house).'
                    },
                    {
                        id: 's-p1-q6',
                        questionText: { en: 'This is a book.', vi: 'Đây là một quyển sách.' },
                        imageSeed: 'starters-pencil',
                        options: [{ en: 'Yes', vi: 'Đúng' }, { en: 'No', vi: 'Sai' }],
                        correctAnswer: 'No',
                        hint_vi: 'Vật này dùng để viết hoặc vẽ.',
                        explanation_vi: 'Không phải! Đây là một cây bút chì (a pencil).'
                    }
                ]
            },
            {
                partId: 'part2',
                title: 'Part 2: Read the question and choose the correct answer.',
                instructions_vi: 'Đọc câu hỏi và chọn câu trả lời đúng.',
                durationSeconds: 300,
                questions: [
                     {
                        id: 's-p2-q1',
                        questionText: { en: 'What color is the apple?', vi: 'Quả táo màu gì?' },
                        imageSeed: 'starters-apple',
                        options: [{ en: 'It is red.', vi: 'Nó màu đỏ.' }, { en: 'It is blue.', vi: 'Nó màu xanh dương.' }, { en: 'It is yellow.', vi: 'Nó màu vàng.' }],
                        correctAnswer: 'It is red.',
                        hint_vi: 'Quả táo thường có màu gì nhỉ?',
                        explanation_vi: 'Quả táo trong hình có màu đỏ (red).'
                    },
                ]
            }
        ]
    }
];
