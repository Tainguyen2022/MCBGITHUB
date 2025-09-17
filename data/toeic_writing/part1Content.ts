import { WritingSeed } from '../../types';

type WritingSeedContent = Pick<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const toeicTask1Content: Record<string, WritingSeedContent> = {
    'TOEIC-P1-DESC-01': {
        sample_answer_en: 'A group of people are sitting around a table in a business meeting.', 
        sample_answer_vi: 'Một nhóm người đang ngồi quanh một chiếc bàn trong một cuộc họp kinh doanh.',
        vocabulary: [{ word: 'meeting', ipa: '/ˈmiːtɪŋ/', pos: 'n.', vi: 'cuộc họp' }, { word: 'colleague', ipa: '/ˈkɒliːɡ/', pos: 'n.', vi: 'đồng nghiệp' }, { word: 'discuss', ipa: '/dɪˈskʌs/', pos: 'v.', vi: 'thảo luận' }],
        practice: {
            reorder: [{ 
                words: [
                    { en: "Colleagues", vi: "Các đồng nghiệp" },
                    { en: "are discussing", vi: "đang thảo luận" },
                    { en: "a new project", vi: "một dự án mới" },
                    { en: "during the meeting.", vi: "trong suốt cuộc họp." }
                ], 
                answer: "Colleagues are discussing a new project during the meeting." 
            }],
            fill_blank: [{ 
                sentence: { en: "One woman is pointing at a chart on the ____.", vi: "Một người phụ nữ đang chỉ vào biểu đồ trên ____." }, 
                missing_word: 'screen', 
                options: ['wall', 'screen', 'board'] 
            }],
            find_error: [{ 
                sentence: { en: "The team seem focused on the presentation.", vi: "Cả đội dường như tập trung vào bài thuyết trình." }, 
                error_word: 'seem', 
                correct_word: 'seems' 
            }],
            choose_phrase: [{ 
                sentence: { en: "They are _____ to finalize an agreement.", vi: "Họ đang _____ để hoàn tất một thỏa thuận." }, 
                correct_phrase: 'aiming', 
                options: ['trying', 'aiming', 'doing'] 
            }],
            matching: [{ 
                col_a: [{ en: "A man in a suit is", vi: "Một người đàn ông mặc vest đang" }, { en: "Several documents are spread", vi: "Nhiều tài liệu được trải ra" }], 
                col_b: [{ en: "across the table.", vi: "trên khắp bàn." }, { en: "leading the discussion.", vi: "dẫn dắt cuộc thảo luận." }], 
                correct_pairs: [{key: "A man in a suit is", value: "leading the discussion."}, {key: "Several documents are spread", value: "across the table."}]
            }],
            drag_drop: [{
                sentence_parts: [{ en: 'Several colleagues', vi: 'Một vài đồng nghiệp' }, { en: 'are discussing', vi: 'đang thảo luận' }, { en: 'a new project.', vi: 'một dự án mới.' }],
                correct_order: ['Several colleagues', 'are discussing', 'a new project.']
            }]
        }
    }
};