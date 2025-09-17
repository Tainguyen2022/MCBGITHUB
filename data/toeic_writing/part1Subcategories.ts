import { WritingSubcategory, WritingSeed } from '../../types';

type ToeicTask1Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

const toeicP1Base: ToeicTask1Definition[] = [
    // Tasks 1-5: Picture Description (Workplace Scenarios)
    { 
        code: 'TOEIC-P1-DESC-01',
        topic: 'Business Meeting', 
        prompt_en: 'Write a sentence about executives discussing quarterly results in a modern conference room.', 
        prompt_vi: 'Viết một câu về các giám đốc thảo luận kết quả quý trong phòng họp hiện đại.', 
        prompt_vi_short: 'T1-5: Cuộc họp giám đốc',
        must_use: ['are discussing', 'quarterly results', 'conference room'], 
        focus: 'Present Continuous for ongoing business activities', 
    },
    { 
        code: 'TOEIC-P1-DESC-02',
        topic: 'Office Presentation', 
        prompt_en: 'Write a sentence about a woman presenting sales data to her colleagues using a projector.', 
        prompt_vi: 'Viết một câu về một phụ nữ trình bày dữ liệu bán hàng cho đồng nghiệp bằng máy chiếu.', 
        prompt_vi_short: 'T1-5: Thuyết trình doanh số',
        must_use: ['is presenting', 'sales data', 'using a projector'], 
        focus: 'Present Continuous for professional presentations', 
    },
    { 
        code: 'TOEIC-P1-DESC-03',
        topic: 'Customer Service', 
        prompt_en: 'Write a sentence about a customer service representative helping a client at the reception desk.', 
        prompt_vi: 'Viết một câu về nhân viên chăm sóc khách hàng giúp đỡ khách tại quầy lễ tân.', 
        prompt_vi_short: 'T1-5: Chăm sóc khách hàng',
        must_use: ['is helping', 'customer service', 'reception desk'], 
        focus: 'Present Continuous for service interactions', 
    },
    { 
        code: 'TOEIC-P1-DESC-04',
        topic: 'Manufacturing Process', 
        prompt_en: 'Write a sentence about workers assembling electronic components in a factory.', 
        prompt_vi: 'Viết một câu về công nhân lắp ráp linh kiện điện tử trong nhà máy.', 
        prompt_vi_short: 'T1-5: Lắp ráp linh kiện',
        must_use: ['are assembling', 'electronic components', 'factory'], 
        focus: 'Present Continuous for manufacturing activities', 
    },
    { 
        code: 'TOEIC-P1-DESC-05',
        topic: 'Team Collaboration', 
        prompt_en: 'Write a sentence about a diverse team brainstorming innovative solutions in a creative workspace.', 
        prompt_vi: 'Viết một câu về một nhóm đa dạng động não tìm giải pháp sáng tạo trong không gian làm việc sáng tạo.', 
        prompt_vi_short: 'T1-5: Động não nhóm',
        must_use: ['are brainstorming', 'innovative solutions', 'creative workspace'], 
        focus: 'Present Continuous for collaborative work', 
    }
];

const toeicP2Base: ToeicTask1Definition[] = [
    // Tasks 6-7: Email Response (Professional Communication)
    { 
        code: 'TOEIC-P2-EMAIL-01',
        topic: 'Meeting Request Response', 
        prompt_en: 'Respond to an email requesting a meeting to discuss the new product launch timeline.', 
        prompt_vi: 'Phản hồi email yêu cầu cuộc họp để thảo luận lịch trình ra mắt sản phẩm mới.', 
        prompt_vi_short: 'T6-7: Phản hồi lịch họp',
        must_use: ['Thank you for', 'I would be happy to', 'Please let me know'], 
        focus: 'Professional email etiquette and scheduling', 
    },
    { 
        code: 'TOEIC-P2-EMAIL-02',
        topic: 'Project Update Request', 
        prompt_en: 'Respond to a supervisor asking for a progress update on the quarterly marketing campaign.', 
        prompt_vi: 'Phản hồi giám sát viên hỏi về tiến độ chiến dịch marketing quý.', 
        prompt_vi_short: 'T6-7: Báo cáo tiến độ',
        must_use: ['I am pleased to report', 'significant progress', 'on schedule'], 
        focus: 'Professional reporting and project communication', 
    },
    { 
        code: 'TOEIC-P2-EMAIL-03',
        topic: 'Client Inquiry Response', 
        prompt_en: 'Respond to a client inquiring about customization options for their order.', 
        prompt_vi: 'Phản hồi khách hàng hỏi về tùy chọn tùy chỉnh cho đơn hàng của họ.', 
        prompt_vi_short: 'T6-7: Tùy chỉnh đơn hàng',
        must_use: ['We offer several', 'customization options', 'I would be delighted'], 
        focus: 'Customer service and product information', 
    }
];

const toeicP3Base: ToeicTask1Definition[] = [
    // Task 8: Opinion Essay (Workplace Topics)
    { 
        code: 'TOEIC-P3-ESSAY-01',
        topic: 'Remote Work Benefits', 
        prompt_en: 'Some companies allow employees to work from home. Do you think this is a good idea? Use specific reasons and examples to support your opinion.', 
        prompt_vi: 'Một số công ty cho phép nhân viên làm việc tại nhà. Bạn có nghĩ đây là ý tưởng tốt không? Sử dụng lý do và ví dụ cụ thể để hỗ trợ ý kiến của bạn.', 
        prompt_vi_short: 'T8: Làm việc từ xa',
        must_use: ['In my opinion', 'For example', 'In conclusion'], 
        focus: 'Opinion essay with workplace context and personal examples', 
    },
    { 
        code: 'TOEIC-P3-ESSAY-02',
        topic: 'Professional Development', 
        prompt_en: 'Companies should invest in employee training and development programs. Do you agree or disagree? Provide specific reasons and examples.', 
        prompt_vi: 'Các công ty nên đầu tư vào chương trình đào tạo và phát triển nhân viên. Bạn đồng ý hay không đồng ý? Cung cấp lý do và ví dụ cụ thể.', 
        prompt_vi_short: 'T8: Đào tạo nhân viên',
        must_use: ['I believe that', 'Furthermore', 'To summarize'], 
        focus: 'Argumentative essay about workplace policies', 
    },
    { 
        code: 'TOEIC-P3-ESSAY-03',
        topic: 'Technology in Business', 
        prompt_en: 'Artificial intelligence is changing how businesses operate. What are the advantages and disadvantages of AI in the workplace?', 
        prompt_vi: 'Trí tuệ nhân tạo đang thay đổi cách các doanh nghiệp hoạt động. Ưu điểm và nhược điểm của AI trong nơi làm việc là gì?', 
        prompt_vi_short: 'T8: AI trong kinh doanh',
        must_use: ['On one hand', 'On the other hand', 'Overall'], 
        focus: 'Balanced discussion of technology impacts', 
    }
];

export const toeicTask1Subcategories: WritingSubcategory[] = [
    { 
        track_id: 'TOEIC', 
        task_type: 'Tasks 1-5', 
        subcategory_id: 'TOEIC-T1-5-Describe', 
        subcategory_name_vi: 'Tasks 1-5: Miêu tả Tranh', 
        level: 'B1', 
        test_tags: ["TOEIC"], 
        objective_vi: 'Viết một câu mô tả chính xác hoạt động trong bức tranh (workplace scenarios).', 
        seeds: toeicP1Base 
    },
    { 
        track_id: 'TOEIC', 
        task_type: 'Tasks 6-7', 
        subcategory_id: 'TOEIC-T6-7-Email', 
        subcategory_name_vi: 'Tasks 6-7: Email Phản hồi', 
        level: 'B2', 
        test_tags: ["TOEIC"], 
        objective_vi: 'Viết email phản hồi chuyên nghiệp trong bối cảnh công việc (25-50 từ).', 
        seeds: toeicP2Base 
    },
    { 
        track_id: 'TOEIC', 
        task_type: 'Task 8', 
        subcategory_id: 'TOEIC-T8-Essay', 
        subcategory_name_vi: 'Task 8: Bài luận Ý kiến', 
        level: 'B2', 
        test_tags: ["TOEIC"], 
        objective_vi: 'Viết bài luận bày tỏ ý kiến về chủ đề workplace (150+ từ).', 
        seeds: toeicP3Base 
    }
];