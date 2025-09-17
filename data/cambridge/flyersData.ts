
import { CambridgeTest } from '../../types';

export const defaultFlyersData: CambridgeTest[] = [
    {
        exam: 'flyers',
        parts: [
            {
                partId: 'part1',
                title: 'Part 1: Read the sentences and choose the correct picture.',
                instructions_vi: 'Đọc câu và chọn bức tranh đúng.',
                durationSeconds: 300,
                questions: [
                    {
                        id: 'f-p1-q1',
                        questionText: { en: 'The man with the beard is a pirate.', vi: 'Người đàn ông có râu là một tên cướp biển.' },
                        imageSeed: 'flyers-pirate-with-beard',
                        options: [{ en: 'Yes', vi: 'Đúng' }, { en: 'No', vi: 'Sai' }],
                        correctAnswer: 'Yes',
                        hint_vi: 'Nhìn vào trang phục và đặc điểm của người đàn ông.',
                        explanation_vi: 'Đúng! Câu này mô tả đúng bức tranh. Người đàn ông trong hình có râu, bịt một mắt và mặc trang phục cướp biển.'
                    },
                    {
                        id: 'f-p1-q2',
                        questionText: { en: 'The astronauts are walking on the moon.', vi: 'Các phi hành gia đang đi bộ trên mặt trăng.' },
                        imageSeed: 'flyers-children-playing-football',
                        options: [{ en: 'Yes', vi: 'Đúng' }, { en: 'No', vi: 'Sai' }],
                        correctAnswer: 'No',
                        hint_vi: 'Những người trong hình đang chơi môn thể thao gì?',
                        explanation_vi: 'Sai! Câu này mô tả "phi hành gia đang đi bộ trên mặt trăng", nhưng bức tranh lại vẽ những đứa trẻ đang chơi bóng đá trong công viên.'
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
                        id: 'f-p2-q1',
                        questionText: { en: 'What is happening in the picture?', vi: 'Chuyện gì đang xảy ra trong tranh?' },
                        imageSeed: 'flyers-hospital-scene',
                        options: [{ en: 'A doctor is helping a patient.', vi: 'Bác sĩ đang giúp bệnh nhân.' }, { en: 'A teacher is teaching a class.', vi: 'Giáo viên đang dạy học.' }, { en: 'A chef is cooking a meal.', vi: 'Đầu bếp đang nấu ăn.' }],
                        correctAnswer: 'A doctor is helping a patient.',
                        hint_vi: 'Bối cảnh này là ở đâu? (bệnh viện, trường học, hay nhà hàng?)',
                        explanation_vi: 'Đúng rồi! Đây là cảnh trong bệnh viện, nơi một bác sĩ đang kiểm tra cho một bệnh nhân bị gãy tay.'
                    },
                ]
            }
        ]
    }
];
