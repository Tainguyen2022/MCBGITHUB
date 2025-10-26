import { TestListItem } from '../types';

export const testLists: Record<string, Record<string, TestListItem[]>> = {
    cambridge_starters: {
        part1: [
            { id: 'cs-p1-01', title: 'Starters - Part 1 - Test 1', path: '/cambridge-practice/starters/part1', disabled: false },
        ],
    },
    cambridge_movers: {
        part1: [
             { id: 'cm-p1-01', title: 'Movers - Part 1 - Test 1', path: '/cambridge-practice/movers/part1', disabled: false },
        ],
        part2: [
             { id: 'cm-p2-01', title: 'Movers - Part 2 - Test 1', path: '/cambridge-practice/movers/part2', disabled: false },
        ],
        theory: [
            { id: 'cm-t-01', title: 'Quiz Lý thuyết Movers', path: '/cambridge-movers-theory', disabled: false },
        ],
    },
    cambridge_flyers: {
         part1: [
             { id: 'cf-p1-01', title: 'Flyers - Part 1 - Test 1', path: '/cambridge-practice/flyers/part1', disabled: false },
        ],
        part2: [
             { id: 'cf-p2-01', title: 'Flyers - Part 2 - Test 1', path: '/cambridge-practice/flyers/part2', disabled: false },
        ],
        theory: [
            { id: 'cf-t-01', title: 'Quiz Lý thuyết Flyers', path: '/cambridge-flyers-theory', disabled: false },
        ],
    },
    toeic: {
        part1_theory: [
            { id: 'toeic-p1-t-01', title: 'Bài kiểm tra Lý thuyết Part 1 - Đề 1', path: '/toeic-part1-theory' }
        ],
        part2_practice: [
            { id: 'toeic-p2-p-01', title: 'Bài luyện tập Hỏi-Đáp - Đề 1', path: '/toeic-part2-practice' }
        ],
        part5_practice: [
            { id: 'toeic-p5-p-01', title: 'Bài luyện tập Hoàn thành câu - Đề 1', path: '/toeic-part5-practice' }
        ],
        part7_theory: [
            { id: 'toeic-p7-t-01', title: 'Bài kiểm tra Lý thuyết Part 7 - Đề 1', path: '/toeic-part7-practice' }
        ],
    },
    ielts: {
        reading_theory: [
            { id: 'ielts-r-t-01', title: 'Quiz Lý thuyết Kỹ năng Đọc', path: '/ielts-reading-theory', disabled: false }
        ],
        part1_theory: [
             { id: 'ielts-s1-t-01', title: 'Quiz Lý thuyết Speaking Part 1', path: '/ielts-part1-theory', disabled: false }
        ],
        part2_theory: [
            { id: 'ielts-s2-t-01', title: 'Quiz Lý thuyết Speaking Part 2', path: '/ielts-part2-theory', disabled: false }
        ]
    },
    vstep: {
        speaking: [
            { id: 'vstep-s-01', title: 'Luyện Nói VSTEP (Full Test)', path: '/speaking', state: { track_id: 'vstep' }, disabled: false }
        ],
        writing: [
             { id: 'vstep-w-01', title: 'Luyện Viết VSTEP (Full Test)', path: '/writing', state: { track_id: 'VSTEP' }, disabled: false }
        ]
    }
};