import { WritingSeed } from '../../types';

type WritingSeedContent = Pick<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const toeicTask2Content: Record<string, WritingSeedContent> = {
    'TOEIC-P2-EMAIL-01': {
        sample_answer_en: "Hi Alex,\n\nThanks for checking in.\nThe project kickoff meeting is scheduled for 10:00 AM on Wednesday in Conference Room 3.\n\nBest,\n[Your Name]", 
        sample_answer_vi: "Chào Alex,\n\nCảm ơn bạn đã hỏi.\nCuộc họp khởi động dự án được lên lịch vào 10:00 sáng thứ Tư tại Phòng họp số 3.\n\nThân ái,\n[Tên của bạn]",
        sample_outline_en: "1. Greeting: Start with a polite greeting (e.g., Hi Alex,).\n2. Acknowledgment: Thank them for the email (e.g., Thanks for checking in.).\n3. Confirmation: Clearly state the meeting time, date, and location.\n4. Closing: End with a polite closing (e.g., Best,).", 
        sample_outline_vi: "1. Chào hỏi: Bắt đầu bằng lời chào lịch sự (ví dụ: Chào Alex,).\n2. Ghi nhận: Cảm ơn họ về email (ví dụ: Cảm ơn bạn đã hỏi.).\n3. Xác nhận: Nêu rõ thời gian, ngày tháng và địa điểm cuộc họp.\n4. Kết thư: Kết thúc bằng một lời chào lịch sự (ví dụ: Thân ái,).",
        practice: {
            reorder: [{ words: [{en:"The", vi: "(mạo từ)"}, {en:"meeting", vi: "cuộc họp"}, {en:"is", vi: "thì"}, {en:"scheduled", vi: "được lên lịch"}, {en:"for", vi: "vào"}, {en:"10:00 AM.", vi: "10:00 sáng."}], answer: "The meeting is scheduled for 10:00 AM." }],
            fill_blank: [{ sentence: { en: "The meeting is ____ for 10:00 AM.", vi: "Cuộc họp được ____ vào lúc 10:00 sáng." }, missing_word: 'scheduled', options: ['planned', 'scheduled', 'set'] }]
        }
    }
};