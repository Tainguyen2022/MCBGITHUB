import { ToeicPart2Question } from '../types';

export const toeicPart2Data: ToeicPart2Question[] = [
    {
        id: 'tp2-q1',
        questionAudioSrc: 'audio/tp2-q1.mp3',
        transcript: 'Where should I put these boxes?',
        options: [
            { text: 'In the storage room, on the top shelf.', audioSrc: 'audio/tp2-q1-a.mp3' },
            { text: 'Yes, that\'s a good spot.', audioSrc: 'audio/tp2-q1-b.mp3' },
            { text: 'She bought a new box.', audioSrc: 'audio/tp2-q1-c.mp3' }
        ],
        correctOption: 'In the storage room, on the top shelf.',
        questionType: 'WHERE',
        explanation_vi: 'Đây là câu hỏi "WHERE", hỏi về nơi chốn. Đáp án (A) chỉ một vị trí cụ thể. Lựa chọn (B) trả lời Yes/No, không phù hợp với câu hỏi Wh-. Lựa chọn (C) lặp lại từ "box" nhưng sai ngữ cảnh.'
    },
    {
        id: 'tp2-q2',
        questionAudioSrc: 'audio/tp2-q2.mp3',
        transcript: 'When is the marketing meeting scheduled?',
        options: [
            { text: 'He\'s in the marketing department.', audioSrc: 'audio/tp2-q2-a.mp3' },
            { text: 'It was postponed until next Friday.', audioSrc: 'audio/tp2-q2-b.mp3' },
            { text: 'We should meet to schedule it.', audioSrc: 'audio/tp2-q2-c.mp3' }
        ],
        correctOption: 'It was postponed until next Friday.',
        questionType: 'WHEN',
        explanation_vi: 'Đây là câu hỏi "WHEN", hỏi về thời gian. Đáp án (B) cung cấp thông tin về thời gian mới. Lựa chọn (A) lặp lại từ "marketing" nhưng trả lời cho câu hỏi "Who" hoặc "Where".'
    },
    {
        id: 'tp2-q3',
        questionAudioSrc: 'audio/tp2-q3.mp3',
        transcript: 'Who approved the budget proposal?',
        options: [
            { text: 'The finance director did.', audioSrc: 'audio/tp2-q3-a.mp3' },
            { text: 'The proposal was moved.', audioSrc: 'audio/tp2-q3-b.mp3' },
            { text: 'It\'s an affordable budget.', audioSrc: 'audio/tp2-q3-c.mp3' }
        ],
        correctOption: 'The finance director did.',
        questionType: 'WHO',
        explanation_vi: 'Đây là câu hỏi "WHO", hỏi về người. Đáp án (A) chỉ một chức danh cụ thể. Lựa chọn (B) dùng từ "moved" nghe gần giống "approved" để gây nhiễu.'
    },
    {
        id: 'tp2-q4',
        questionAudioSrc: 'audio/tp2-q4.mp3',
        transcript: 'How long will the presentation last?',
        options: [
            { text: 'The last one was impressive.', audioSrc: 'audio/tp2-q4-a.mp3' },
            { text: 'About 30 minutes.', audioSrc: 'audio/tp2-q4-b.mp3' },
            { text: 'No, it hasn\'t started yet.', audioSrc: 'audio/tp2-q4-c.mp3' }
        ],
        correctOption: 'About 30 minutes.',
        questionType: 'HOW',
        explanation_vi: 'Đây là câu hỏi "HOW LONG", hỏi về khoảng thời gian. Đáp án (B) đưa ra một khoảng thời gian cụ thể. Lựa chọn (A) lặp lại từ "last" để gây nhiễu.'
    },
    {
        id: 'tp2-q5',
        questionAudioSrc: 'audio/tp2-q5.mp3',
        transcript: 'Why was the flight delayed?',
        options: [
            { text: 'Due to bad weather conditions.', audioSrc: 'audio/tp2-q5-a.mp3' },
            { text: 'It will arrive late.', audioSrc: 'audio/tp2-q5-b.mp3' },
            { text: 'I didn\'t like it.', audioSrc: 'audio/tp2-q5-c.mp3' }
        ],
        correctOption: 'Due to bad weather conditions.',
        questionType: 'WHY',
        explanation_vi: 'Đây là câu hỏi "WHY", hỏi về lý do. Đáp án (A) "Due to..." (Do...) đưa ra một lý do. Lựa chọn (B) dùng từ "late" nghe gần giống "delayed" để gây nhiễu.'
    },
    {
        id: 'tp2-q6',
        questionAudioSrc: 'audio/tp2-q6.mp3',
        transcript: 'What do you think of the new company logo?',
        options: [
            { text: 'It\'s a local company.', audioSrc: 'audio/tp2-q6-a.mp3' },
            { text: 'I haven\'t seen it yet.', audioSrc: 'audio/tp2-q6-b.mp3' },
            { text: 'He thinks so, too.', audioSrc: 'audio/tp2-q6-c.mp3' }
        ],
        correctOption: 'I haven\'t seen it yet.',
        questionType: 'WHAT/WHICH',
        explanation_vi: 'Đây là câu hỏi "WHAT" hỏi về ý kiến. Đáp án (B) là một câu trả lời gián tiếp nhưng hợp lý (một trong "những từ luôn đúng"). Lựa chọn (A) lặp lại từ "company".'
    },
    {
        id: 'tp2-q7',
        questionAudioSrc: 'audio/tp2-q7.mp3',
        transcript: 'Have you finished the quarterly report?',
        options: [
            { text: 'At a quarter to four.', audioSrc: 'audio/tp2-q7-a.mp3' },
            { text: 'Yes, it is.', audioSrc: 'audio/tp2-q7-b.mp3' },
            { text: 'No, I need one more day.', audioSrc: 'audio/tp2-q7-c.mp3' }
        ],
        correctOption: 'No, I need one more day.',
        questionType: 'YES/NO',
        explanation_vi: 'Đây là câu hỏi "YES/NO". Đáp án (C) trả lời "No" và đưa ra lý do. Lựa chọn (A) dùng từ "quarter" để gây nhiễu, trả lời cho "When". Lựa chọn (B) sai chủ ngữ ("it is" thay vì "I have").'
    },
    {
        id: 'tp2-q8',
        questionAudioSrc: 'audio/tp2-q8.mp3',
        transcript: 'The new printer is much faster.',
        options: [
            { text: 'Yes, the winter is colder.', audioSrc: 'audio/tp2-q8-a.mp3' },
            { text: 'That\'s great, we needed a new one.', audioSrc: 'audio/tp2-q8-b.mp3' },
            { text: 'A painter is coming.', audioSrc: 'audio/tp2-q8-c.mp3' }
        ],
        correctOption: 'That\'s great, we needed a new one.',
        questionType: 'STATEMENT',
        explanation_vi: 'Đây là một câu trần thuật. Đáp án (B) là một phản hồi đồng tình hợp lý. Lựa chọn (C) dùng từ gần âm "painter" để gây nhiễu với "printer".'
    },
    {
        id: 'tp2-q9',
        questionAudioSrc: 'audio/tp2-q9.mp3',
        transcript: 'Would you prefer to meet in the morning or the afternoon?',
        options: [
            { text: 'I don\'t mind, either is fine.', audioSrc: 'audio/tp2-q9-a.mp3' },
            { text: 'Yes, that would be preferable.', audioSrc: 'audio/tp2-q9-b.mp3' },
            { text: 'He left in the morning.', audioSrc: 'audio/tp2-q9-c.mp3' }
        ],
        correctOption: 'I don\'t mind, either is fine.',
        questionType: 'CHOICE',
        explanation_vi: 'Đây là câu hỏi lựa chọn (OR). Đáp án (A) là một câu trả lời phổ biến và hợp lý, cho thấy cả hai lựa chọn đều được. Lựa chọn (B) trả lời Yes/No, không phù hợp.'
    },
    {
        id: 'tp2-q10',
        questionAudioSrc: 'audio/tp2-q10.mp3',
        transcript: 'The traffic is terrible this morning, isn\'t it?',
        options: [
            { text: 'It\'s a terrific idea.', audioSrc: 'audio/tp2-q10-a.mp3' },
            { text: 'Yes, I was almost late.', audioSrc: 'audio/tp2-q10-b.mp3' },
            { text: 'No, I can\'t.', audioSrc: 'audio/tp2-q10-c.mp3' }
        ],
        correctOption: 'Yes, I was almost late.',
        questionType: 'TAG',
        explanation_vi: 'Đây là câu hỏi đuôi, mong đợi sự đồng tình. Đáp án (B) đồng ý và đưa ra hệ quả. Lựa chọn (A) dùng từ gần âm "terrific" để gây nhiễu với "terrible".'
    },
    {
        id: 'tp2-q11',
        questionAudioSrc: 'audio/tp2-q11.mp3',
        transcript: 'Do you know how to operate this machine?',
        options: [
            { text: 'I can read the manual for you.', audioSrc: 'audio/tp2-q11-a.mp3' },
            { text: 'No, it\'s not operating.', audioSrc: 'audio/tp2-q11-b.mp3' },
            { text: 'She is a machine operator.', audioSrc: 'audio/tp2-q11-c.mp3' }
        ],
        correctOption: 'I can read the manual for you.',
        questionType: 'INDIRECT',
        explanation_vi: 'Đây là câu hỏi gián tiếp. Đáp án (A) là một lời đề nghị giúp đỡ hợp lý. Lựa chọn (B) và (C) lặp lại các từ "operating", "machine operator" để gây nhiễu.'
    },
    {
        id: 'tp2-q12',
        questionAudioSrc: 'audio/tp2-q12.mp3',
        transcript: 'Where did you buy that file cabinet?',
        options: [
            { text: 'I\'ll file it later.', audioSrc: 'audio/tp2-q12-a.mp3' },
            { text: 'Yes, I bought it.', audioSrc: 'audio/tp2-q12-b.mp3' },
            { text: 'At the new furniture store downtown.', audioSrc: 'audio/tp2-q12-c.mp3' }
        ],
        correctOption: 'At the new furniture store downtown.',
        questionType: 'WHERE',
        explanation_vi: 'Câu hỏi WHERE. Đáp án (C) chỉ một địa điểm. Lựa chọn (A) lặp lại từ "file" sai ngữ cảnh. Lựa chọn (B) trả lời Yes/No không phù hợp.'
    },
    {
        id: 'tp2-q13',
        questionAudioSrc: 'audio/tp2-q13.mp3',
        transcript: 'When should I call you back?',
        options: [
            { text: 'I\'ll have to check my schedule.', audioSrc: 'audio/tp2-q13-a.mp3' },
            { text: 'The back door is open.', audioSrc: 'audio/tp2-q13-b.mp3' },
            { text: 'He called me yesterday.', audioSrc: 'audio/tp2-q13-c.mp3' }
        ],
        correctOption: 'I\'ll have to check my schedule.',
        questionType: 'WHEN',
        explanation_vi: 'Câu hỏi WHEN. Đáp án (A) là một câu trả lời gián tiếp hợp lý (một trong "những từ luôn đúng"). Lựa chọn (B) dùng từ "back" sai ngữ cảnh. Lựa chọn (C) trả lời sai thì và sai người.'
    },
    {
        id: 'tp2-q14',
        questionAudioSrc: 'audio/tp2-q14.mp3',
        transcript: 'Who is responsible for stocking the shelves?',
        options: [
            { text: 'The evening shift staff.', audioSrc: 'audio/tp2-q14-a.mp3' },
            { text: 'They are on the top shelf.', audioSrc: 'audio/tp2-q14-b.mp3' },
            { text: 'I\'m not responding to that.', audioSrc: 'audio/tp2-q14-c.mp3' }
        ],
        correctOption: 'The evening shift staff.',
        questionType: 'WHO',
        explanation_vi: 'Câu hỏi WHO. Đáp án (A) chỉ một nhóm người. Lựa chọn (B) trả lời cho "Where". Lựa chọn (C) dùng từ gần âm "responding" để gây nhiễu với "responsible".'
    },
    {
        id: 'tp2-q15',
        questionAudioSrc: 'audio/tp2-q15.mp3',
        transcript: 'Why aren\'t the lights working?',
        options: [
            { text: 'He works at night.', audioSrc: 'audio/tp2-q15-a.mp3' },
            { text: 'There might be a power outage.', audioSrc: 'audio/tp2-q15-b.mp3' },
            { text: 'It\'s the right way.', audioSrc: 'audio/tp2-q15-c.mp3' }
        ],
        correctOption: 'There might be a power outage.',
        questionType: 'WHY',
        explanation_vi: 'Câu hỏi WHY. Đáp án (B) đưa ra một lý do/khả năng hợp lý. Lựa chọn (A) lặp lại từ "works" gần âm với "working". Lựa chọn (C) dùng từ "right" gần âm với "light".'
    },
    ...Array.from({ length: 35 }, (_, i) => {
        const id = i + 16;
        return {
            id: `tp2-q${id}`,
            questionAudioSrc: `audio/tp2-q${id}.mp3`,
            transcript: `This is a sample question transcript, number ${id}.`,
            options: [
                { text: `Correct option for question ${id}.`, audioSrc: `audio/tp2-q${id}-a.mp3` },
                { text: `An incorrect option with a sound trap.`, audioSrc: `audio/tp2-q${id}-b.mp3` },
                { text: `Another incorrect option repeating a word.`, audioSrc: `audio/tp2-q${id}-c.mp3` }
            ],
            correctOption: `Correct option for question ${id}.`,
            questionType: 'STATEMENT',
            explanation_vi: `Đây là giải thích cho câu hỏi số ${id}, được thiết kế để kiểm tra chiến lược cụ thể dựa trên mind map.`
        };
    }) as ToeicPart2Question[]
];
