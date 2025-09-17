export interface ToeicPart5Question {
    id: number;
    question: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    category: string;
    explanation_vi: string;
}

export const toeicPart5Data: ToeicPart5Question[] = [
    {
        id: 1,
        question: "Your full participation is ______ to our timely completion of this project.",
        options: [
            { key: 'A', text: 'essence' },
            { key: 'B', text: 'essences' },
            { key: 'C', text: 'essential' },
            { key: 'D', text: 'essentially' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau động từ 'to be' (is), ta cần một tính từ (adjective) để bổ nghĩa cho chủ ngữ 'participation'. 'essential' là tính từ. (Mẹo: be + adj)"
    },
    {
        id: 2,
        question: "When the event planner saw the hotel ballroom, she knew that the size wasn’t __________, but the price was right.",
        options: [
            { key: 'A', text: 'ideal' },
            { key: 'B', text: 'ideally' },
            { key: 'C', text: 'idealize' },
            { key: 'D', text: 'idealist' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau động từ 'to be' (wasn't), ta cần một tính từ (adjective). 'ideal' (lý tưởng) là tính từ. 'ideally' là trạng từ."
    },
    {
        id: 3,
        question: "Your prescription will be ready in an hour, if that’s _______ for you.",
        options: [
            { key: 'A', text: 'conveniences' },
            { key: 'B', text: 'conveniently' },
            { key: 'C', text: 'convenience' },
            { key: 'D', text: 'convenient' }
        ],
        correctAnswer: 'D',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau 'to be' (that's = that is), ta cần một tính từ (adjective). 'convenient' (thuận tiện) là tính từ."
    },
    {
        id: 4,
        question: "It was _________ from the X-rays that I needed dental work.",
        options: [
            { key: 'A', text: 'evident' },
            { key: 'B', text: 'evidently' },
            { key: 'C', text: 'evidence' },
            { key: 'D', text: 'evidential' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau động từ 'to be' (was), ta cần một tính từ (adjective). 'evident' (hiển nhiên, rõ ràng) là tính từ."
    },
    {
        id: 5,
        question: "The experienced chef was __________ about the way he prepared his award-winning dish.",
        options: [
            { key: 'A', text: 'method' },
            { key: 'B', text: 'methodical' },
            { key: 'C', text: 'methodically' },
            { key: 'D', text: 'methodology' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau động từ 'to be' (was), ta cần một tính từ (adjective). 'methodical' (có phương pháp, ngăn nắp) là tính từ."
    },
    {
        id: 6,
        question: "The patrons at this restaurant are often __________, but they usually tip well.",
        options: [
            { key: 'A', text: 'demands' },
            { key: 'B', text: 'demanded' },
            { key: 'C', text: 'demanding' },
            { key: 'D', text: 'demand' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau 'to be' (are), ta cần một tính từ (adjective). 'demanding' (đòi hỏi khắt khe) ở đây là một tính từ dạng V-ing."
    },
    {
        id: 7,
        question: "It was _______ to discover that the car rental company had only compact cars available.",
        options: [
            { key: 'A', text: 'disappointing' },
            { key: 'B', text: 'disappointed' },
            { key: 'C', text: 'disappointment' },
            { key: 'D', text: 'disappoints' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + ADJ',
        explanation_vi: "Chủ ngữ là 'It' (ám chỉ việc khám phá ra điều gì đó), mang nghĩa chủ động gây ra cảm xúc. Do đó, ta dùng tính từ V-ing 'disappointing' (gây thất vọng)."
    },
    {
        id: 8,
        question: "Standardized products are _______ in appearance.",
        options: [
            { key: 'A', text: 'uniforms' },
            { key: 'B', text: 'uniformly' },
            { key: 'C', text: 'uniform' },
            { key: 'D', text: 'unformed' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau 'to be' (are), ta cần một tính từ (adjective). 'uniform' (đồng nhất, đồng dạng) là tính từ."
    },
    {
        id: 9,
        question: "The president was __________ about adding more space to the factory.",
        options: [
            { key: 'A', text: 'apprehend' },
            { key: 'B', text: 'apprehensive' },
            { key: 'C', text: 'apprehension' },
            { key: 'D', text: 'apprehended' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau 'to be' (was), ta cần một tính từ (adjective). 'apprehensive' (e ngại, lo lắng) là tính từ."
    },
    {
        id: 10,
        question: "The product development team were __________ that the competition would produce a similar product and get it on the market before they did.",
        options: [
            { key: 'A', text: 'anxious' },
            { key: 'B', text: 'anxiously' },
            { key: 'C', text: 'anxiousness' },
            { key: 'D', text: 'anxiety' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau 'to be' (were), ta cần một tính từ (adjective). 'anxious' (lo lắng) là tính từ."
    },
    {
        id: 11,
        question: "We need to have a spare copier since the only one that is ______ is on its last leg.",
        options: [
            { key: 'A', text: 'functioned' },
            { key: 'B', text: 'functions' },
            { key: 'C', text: 'functional' },
            { key: 'D', text: 'function' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + ADJ',
        explanation_vi: "Trong mệnh đề quan hệ 'that is...', sau 'is', ta cần một tính từ. 'functional' (hoạt động được) là tính từ."
    },
    {
        id: 12,
        question: "When the Dow is dropping, investors need to be __________.",
        options: [
            { key: 'A', text: 'resource' },
            { key: 'B', text: 'resources' },
            { key: 'C', text: 'resourceful' },
            { key: 'D', text: 'resourcefulness' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau 'to be', ta cần một tính từ (adjective). 'resourceful' (tháo vát) là tính từ."
    },
    {
        id: 13,
        question: "The computing power of the new laptop is --------------- to any desktop computer in the same price range.",
        options: [
            { key: 'A', text: 'compare' },
            { key: 'B', text: 'comparing' },
            { key: 'C', text: 'comparison' },
            { key: 'D', text: 'comparable' }
        ],
        correctAnswer: 'D',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau 'to be' (is), ta cần một tính từ (adjective). 'comparable to' (có thể so sánh với) là cấu trúc đúng."
    },
    {
        id: 14,
        question: "The production technicians are __________ for maintaining our factory equipment.",
        options: [
            { key: 'A', text: 'responsibly' },
            { key: 'B', text: 'responsible' },
            { key: 'C', text: 'responsibility' },
            { key: 'D', text: 'responsibilities' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau 'to be' (are), ta cần một tính từ (adjective). Cấu trúc 'responsible for' (chịu trách nhiệm cho) là đúng."
    },
    {
        id: 15,
        question: "Having strong partnerships throughout Southeast Asia has been ------------------- to Srisati Company’s success.",
        options: [
            { key: 'A', text: 'critical' },
            { key: 'B', text: 'criticize' },
            { key: 'C', text: 'critic' },
            { key: 'D', text: 'critically' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau 'to be' (has been), ta cần một tính từ (adjective). 'critical to' (quan trọng, cốt yếu cho) là cấu trúc đúng."
    },
    {
        id: 16,
        question: "The train has stopped because of a malfunction, but we expect it to be _______ again within minutes.",
        options: [
            { key: 'A', text: 'operational' },
            { key: 'B', text: 'operate' },
            { key: 'C', text: 'operation' },
            { key: 'D', text: 'operationally' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau 'to be', ta cần một tính từ (adjective). 'operational' (có thể hoạt động) là tính từ."
    },
    {
        id: 17,
        question: "Even though Smithton Electronics' second quarter was not -------------, the company plans to invest large sums on research.",
        options: [
            { key: 'A', text: 'profitable' },
            { key: 'B', text: 'profiting' },
            { key: 'C', text: 'profitability' },
            { key: 'D', text: 'profitably' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau 'to be' (was not), ta cần một tính từ (adjective). 'profitable' (có lợi nhuận) là tính từ."
    },
    {
        id: 18,
        question: "The reviewer of Ms. Chen's book noted that her research was ------ .",
        options: [
            { key: 'A', text: 'impressed' },
            { key: 'B', text: 'impressive' },
            { key: 'C', text: 'impress' },
            { key: 'D', text: 'impression' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + ADJ',
        explanation_vi: "Chủ ngữ 'her research' (nghiên cứu của cô ấy) mang nghĩa chủ động, gây ra cảm xúc. Do đó, ta dùng tính từ V-ing 'impressive' (gây ấn tượng)."
    },
    {
        id: 19,
        question: "Mr. Moscowitz is __________ that Dr. Tanaka will agree to present the keynote speech at this year's conference.",
        options: [
            { key: 'A', text: 'hopes' },
            { key: 'B', text: 'hoped' },
            { key: 'C', text: 'hopeful' },
            { key: 'D', text: 'hopefully' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau 'to be' (is), ta cần một tính từ (adjective). 'hopeful' (hy vọng) là tính từ."
    },
    {
        id: 20,
        question: "At Yarzen Technology, clients’ records are ------------------- and can only be accessed by a small group of fund managers.",
        options: [
            { key: 'A', text: 'confide' },
            { key: 'B', text: 'confidential' },
            { key: 'C', text: 'confidentially' },
            { key: 'D', text: 'confidentiality' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + ADJ',
        explanation_vi: "Sau 'to be' (are), ta cần một tính từ (adjective). 'confidential' (bảo mật) là tính từ."
    },
    {
        id: 21,
        question: "Market conditions were ------------------------------- enough last year for us to make several new acquisitions.",
        options: [
            { key: 'A', text: 'favor' },
            { key: 'B', text: 'favorite' },
            { key: 'C', text: 'favorably' },
            { key: 'D', text: 'favorable' }
        ],
        correctAnswer: 'D',
        category: 'TOBE + ADJ',
        explanation_vi: "Trước trạng từ 'enough', ta cần một tính từ (adjective). 'favorable' (thuận lợi) là tính từ."
    },
    {
        id: 22,
        question: "It is -------------------------to bring sturdy boots to wear on the hike.",
        options: [
            { key: 'A', text: 'advise' },
            { key: 'B', text: 'advisor' },
            { key: 'C', text: 'advisable' },
            { key: 'D', text: 'advises' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + ADJ',
        explanation_vi: "Trong cấu trúc 'It is + adj + to V', ta cần một tính từ. 'advisable' (nên, đáng theo) là tính từ."
    },
    {
        id: 23,
        question: "Mr. Melo argued that Vantimore’s inventory tracking system is too ---------------- .",
        options: [
            { key: 'A', text: 'complexes' },
            { key: 'B', text: 'complex' },
            { key: 'C', text: 'complexity' },
            { key: 'D', text: 'complexness' }
        ],
        correctAnswer: 'B',
        category: 'TOBE TOO ADJ',
        explanation_vi: "Sau trạng từ 'too', ta cần một tính từ (adjective). 'complex' (phức tạp) là tính từ."
    },
    {
        id: 24,
        question: "Many office supply businesses specialize in furniture that is as ______ as it is affordable.",
        options: [
            { key: 'A', text: 'duration' },
            { key: 'B', text: 'durable' },
            { key: 'C', text: 'durability' },
            { key: 'D', text: 'durableness' }
        ],
        correctAnswer: 'B',
        category: 'SO SÁNH BẰNG AS + ADJ + AS',
        explanation_vi: "Trong cấu trúc so sánh bằng 'as ... as', ta cần một tính từ. 'durable' (bền) là tính từ."
    },
    {
        id: 25,
        question: "For a true understanding of our production levels, data from oil-drilling sites must be as -------------------------- as possible.",
        options: [
            { key: 'A', text: 'accurate' },
            { key: 'B', text: 'optimistic' },
            { key: 'C', text: 'exclusive' },
            { key: 'D', text: 'competitive' }
        ],
        correctAnswer: 'A',
        category: 'SO SÁNH BẰNG AS + ADJ + AS',
        explanation_vi: "Trong cấu trúc so sánh bằng 'as ... as possible', ta cần một tính từ. 'accurate' (chính xác) là tính từ phù hợp nhất về nghĩa."
    },
    {
        id: 26,
        question: "Cormet Motors' profits are __________ this year than last year.",
        options: [
            { key: 'A', text: 'higher' },
            { key: 'B', text: 'high' },
            { key: 'C', text: 'highly' },
            { key: 'D', text: 'highest' }
        ],
        correctAnswer: 'A',
        category: 'TO BE + ADJ SO SÁNH HƠN',
        explanation_vi: "Từ 'than' là dấu hiệu của so sánh hơn. 'higher' là dạng so sánh hơn của tính từ 'high'."
    },
    {
        id: 27,
        question: "The Ford Group’s proposed advertising campaign is by far the most ----------------- we have seen so far.",
        options: [
            { key: 'A', text: 'innovate' },
            { key: 'B', text: 'innovative' },
            { key: 'C', text: 'innovations' },
            { key: 'D', text: 'innovatively' }
        ],
        correctAnswer: 'B',
        category: 'SO SÁNH NHẤT',
        explanation_vi: "Cấu trúc 'the most ...' là so sánh nhất, cần một tính từ (adjective). 'innovative' (sáng tạo) là tính từ."
    },
    {
        id: 28,
        question: "Ms. Kuramoto selected the most ------------------------ mailing option available.",
        options: [
            { key: 'A', text: 'economical' },
            { key: 'B', text: 'economy' },
            { key: 'C', text: 'economize' },
            { key: 'D', text: 'economized' }
        ],
        correctAnswer: 'A',
        category: 'SO SÁNH NHẤT',
        explanation_vi: "Cấu trúc so sánh nhất 'the most...' cần một tính từ để bổ nghĩa cho danh từ 'option'. 'economical' (tiết kiệm) là tính từ."
    },
    {
        id: 29,
        question: "The Ferrera Museum plans to exhibit a collection of Lucia Almeida’s most ---------------- sculptures.",
        options: [
            { key: 'A', text: 'innovative' },
            { key: 'B', text: 'innovation' },
            { key: 'C', text: 'innovatively' },
            { key: 'D', text: 'innovate' }
        ],
        correctAnswer: 'A',
        category: 'SO SÁNH NHẤT',
        explanation_vi: "Cấu trúc 'most...' cần một tính từ để bổ nghĩa cho danh từ 'sculptures'. 'innovative' (sáng tạo, đổi mới) là tính từ."
    },
    {
        id: 30,
        question: "Thank you for being one of Danton Transportation’s most ------------------------ customers over the past ten years.",
        options: [
            { key: 'A', text: 'valuation' },
            { key: 'B', text: 'valued' },
            { key: 'C', text: 'value' },
            { key: 'D', text: 'values' }
        ],
        correctAnswer: 'B',
        category: 'SO SÁNH NHẤT',
        explanation_vi: "Cấu trúc so sánh nhất 'most...' cần một tính từ. 'valued' (được quý trọng) ở đây là một tính từ dạng V-ed."
    },
    {
        id: 31,
        question: "Mira Kumar was probably the __________ of all the interns at Kolbry Media last summer.",
        options: [
            { key: 'A', text: 'ambitious' },
            { key: 'B', text: 'most ambitious' },
            { key: 'C', text: 'ambitiously' },
            { key: 'D', text: 'more ambitiously' }
        ],
        correctAnswer: 'B',
        category: 'SO SÁNH NHẤT',
        explanation_vi: "Mạo từ 'the' đứng trước chỗ trống là dấu hiệu của so sánh nhất. 'most ambitious' là dạng so sánh nhất của tính từ dài 'ambitious'."
    },
    {
        id: 32,
        question: "This month Framley Publishing House is embarking on its ______________ expansion so far.",
        options: [
            { key: 'A', text: 'ambitiously' },
            { key: 'B', text: 'most ambitiously' },
            { key: 'C', text: 'ambition' },
            { key: 'D', text: 'most ambitious' }
        ],
        correctAnswer: 'D',
        category: 'SO SÁNH NHẤT',
        explanation_vi: "Tính từ sở hữu 'its' và trạng từ 'so far' cho thấy đây là so sánh nhất. Ta cần một tính từ để bổ nghĩa cho danh từ 'expansion'. 'most ambitious' là dạng so sánh nhất."
    },
    {
        id: 33,
        question: "Liu’s Foods is pleased to reveal the ----------------------- product in its famous soup line: pumpkin soup.",
        options: [
            { key: 'A', text: 'popularity of' },
            { key: 'B', text: 'as popular as' },
            { key: 'C', text: 'most popular' },
            { key: 'D', text: 'popular than' }
        ],
        correctAnswer: 'C',
        category: 'SO SÁNH NHẤT',
        explanation_vi: "Mạo từ 'the' đứng trước chỗ trống là dấu hiệu của so sánh nhất. 'most popular' là dạng so sánh nhất của 'popular'."
    },
    {
        id: 34,
        question: "Although many factors contribute to a successful business, Mr. Lee thinks that keeping customers satisfied is the -----------------------.",
        options: [
            { key: 'A', text: 'essential' },
            { key: 'B', text: 'most essential' },
            { key: 'C', text: 'essentially' },
            { key: 'D', text: 'more essentially' }
        ],
        correctAnswer: 'B',
        category: 'SO SÁNH NHẤT',
        explanation_vi: "Mạo từ 'the' đứng trước chỗ trống là dấu hiệu của so sánh nhất. 'most essential' là dạng so sánh nhất của 'essential'."
    },
    {
        id: 35,
        question: "The latest survey shows that our downtown store is more ---------------------------- for local shoppers than our suburban location.",
        options: [
            { key: 'A', text: 'conveniences' },
            { key: 'B', text: 'conveniently' },
            { key: 'C', text: 'convenience' },
            { key: 'D', text: 'convenient' }
        ],
        correctAnswer: 'D',
        category: 'TOBE + MORE + TÍNH',
        explanation_vi: "Cấu trúc so sánh hơn với 'more' và 'than' cần một tính từ dài. 'convenient' (thuận tiện) là tính từ."
    },
    {
        id: 36,
        question: "After he was ______, he continued to take classes to upgrade his skills.",
        options: [
            { key: 'A', text: 'hiring' },
            { key: 'B', text: 'hires' },
            { key: 'C', text: 'hired' },
            { key: 'D', text: 'hire' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + V3ED',
        explanation_vi: "Đây là cấu trúc bị động (passive voice): to be + V3/V-ed. 'hired' (được thuê) là dạng V3/V-ed của 'hire'."
    },
    {
        id: 37,
        question: "I expect the rate that I was _______ over the phone and I will not accept any changes.",
        options: [
            { key: 'A', text: 'quoted' },
            { key: 'B', text: 'quotation' },
            { key: 'C', text: 'quotable' },
            { key: 'D', text: 'quotes' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + V3ED',
        explanation_vi: "Cấu trúc bị động (passive voice): I was + V3/V-ed. 'quoted' (được báo giá) là V3/V-ed của 'quote'."
    },
    {
        id: 38,
        question: "Written permission must ---------------- before using Thavor Corporation’s logo.",
        options: [
            { key: 'A', text: 'to obtain' },
            { key: 'B', text: 'obtained' },
            { key: 'C', text: 'be obtained' },
            { key: 'D', text: 'obtaining' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + V3ED',
        explanation_vi: "Sau động từ khuyết thiếu 'must', ta cần một động từ nguyên mẫu. Đây là câu bị động nên cấu trúc là 'must be + V3/V-ed'. 'be obtained' là dạng đúng."
    },
    {
        id: 39,
        question: "Guests were --------------------------- with the table decorations for the company banquet.",
        options: [
            { key: 'A', text: 'impressive' },
            { key: 'B', text: 'impressed' },
            { key: 'C', text: 'impressing' },
            { key: 'D', text: 'impressively' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + V3ED',
        explanation_vi: "Chủ ngữ 'Guests' (những vị khách) là người, nhận cảm xúc. Do đó ta dùng tính từ dạng V-ed 'impressed' (bị ấn tượng)."
    },
    {
        id: 40,
        question: "Agnes was ________ by the odor of the waterproofing.",
        options: [
            { key: 'A', text: 'repel' },
            { key: 'B', text: 'repellent' },
            { key: 'C', text: 'repelled' },
            { key: 'D', text: 'repelling' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + V3ED',
        explanation_vi: "Đây là cấu trúc bị động: was + V3/V-ed. 'repelled' (bị đẩy lùi, làm khó chịu) là V3/V-ed của 'repel'."
    },
    {
        id: 41,
        question: "Even when a show is _________, it is sometimes possible to get in.",
        options: [
            { key: 'A', text: 'sell out' },
            { key: 'B', text: 'sell on' },
            { key: 'C', text: 'sold off' },
            { key: 'D', text: 'sold out' }
        ],
        correctAnswer: 'D',
        category: 'TOBE + V3ED',
        explanation_vi: "Đây là cấu trúc bị động: is + V3/V-ed. 'sold out' (bán hết vé) là V3 của cụm động từ 'sell out'."
    },
    {
        id: 42,
        question: "Before my father was __________ to the hospital, he had to undergo a series of tests.",
        options: [
            { key: 'A', text: 'admit' },
            { key: 'B', text: 'admitted' },
            { key: 'C', text: 'admittance' },
            { key: 'D', text: 'admissions' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + V3ED',
        explanation_vi: "Cấu trúc bị động: was + V3/V-ed. 'admitted' (được nhập viện) là V3/V-ed của 'admit'."
    },
    {
        id: 43,
        question: "The number of withdrawals at no charge from your savings account is _____ to three.",
        options: [
            { key: 'A', text: 'restricting' },
            { key: 'B', text: 'restricted' },
            { key: 'C', text: 'restrict' },
            { key: 'D', text: 'restriction' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + V3ED',
        explanation_vi: "Đây là cấu trúc bị động: is + V3/V-ed. 'restricted' (bị giới hạn) là V3/V-ed của 'restrict'."
    },
    {
        id: 44,
        question: "Agnes was ________ by the odor of the waterproofing.",
        options: [
            { key: 'A', text: 'repel' },
            { key: 'B', text: 'repellent' },
            { key: 'C', text: 'repelled' },
            { key: 'D', text: 'repelling' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + V3ED',
        explanation_vi: "Câu này giống câu 40. Đây là cấu trúc bị động: was + V3/V-ed. 'repelled' là V3/V-ed của 'repel'."
    },
    {
        id: 45,
        question: "The computer staff is responsible for making sure all system files are ______. ",
        options: [
            { key: 'A', text: 'duplication' },
            { key: 'B', text: 'duplicated' },
            { key: 'C', text: 'duplicator' },
            { key: 'D', text: 'duplicate' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + V3ED',
        explanation_vi: "Đây là cấu trúc bị động: are + V3/V-ed. 'duplicated' (được sao chép) là V3/V-ed của 'duplicate'."
    },
    {
        id: 46,
        question: "We didn’t know we had to claim the interest from our savings account and were ____________ for the error.",
        options: [
            { key: 'A', text: 'penalize' },
            { key: 'B', text: 'penalizing' },
            { key: 'C', text: 'penalty' },
            { key: 'D', text: 'penalized' }
        ],
        correctAnswer: 'D',
        category: 'TOBE + V3ED',
        explanation_vi: "Đây là cấu trúc bị động: were + V3/V-ed. 'penalized' (bị phạt) là V3/V-ed của 'penalize'."
    },
    {
        id: 47,
        question: "Unfortunately, not all candidates can be offered a job; some have to be ______. ",
        options: [
            { key: 'A', text: 'rejected' },
            { key: 'B', text: 'rejecting' },
            { key: 'C', text: 'rejection' },
            { key: 'D', text: 'reject' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + V3ED',
        explanation_vi: "Đây là cấu trúc bị động: to be + V3/V-ed. 'rejected' (bị từ chối) là V3/V-ed của 'reject'."
    },
    {
        id: 48,
        question: "The tired employee hoped that she would be ______ for all the long hours she kept and weekends she worked.",
        options: [
            { key: 'A', text: 'compensation' },
            { key: 'B', text: 'compensates' },
            { key: 'C', text: 'compensated' },
            { key: 'D', text: 'compensate' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + V3ED',
        explanation_vi: "Cấu trúc bị động: would be + V3/V-ed. 'compensated' (được đền bù) là V3/V-ed của 'compensate'."
    },
    {
        id: 49,
        question: "It looks like this disk was ______ to intense heat because it’s warped and pocked.",
        options: [
            { key: 'A', text: 'expose' },
            { key: 'B', text: 'exposed' },
            { key: 'C', text: 'exposing' },
            { key: 'D', text: 'exposure' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + V3ED',
        explanation_vi: "Cấu trúc bị động: was + V3/V-ed. 'exposed' (bị phơi bày, tiếp xúc với) là V3/V-ed của 'expose'."
    },
    {
        id: 50,
        question: "A special sale on stationery ----------- on the Write Things Web site yesterday.",
        options: [
            { key: 'A', text: 'was announced' },
            { key: 'B', text: 'announced' },
            { key: 'C', text: 'was announcing' },
            { key: 'D', text: 'to announce' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + V3ED',
        explanation_vi: "Chủ ngữ 'A special sale' (một đợt giảm giá) không thể tự thực hiện hành động 'announce' (thông báo). Do đó, ta cần dùng câu bị động. 'was announced' là dạng bị động ở thì Quá khứ đơn."
    },
    {
        id: 51,
        question: "Phone orders that are __________ to local stores by 11:00 a.m. are eligible for same-day pickup.",
        options: [
            { key: 'A', text: 'submitted' },
            { key: 'B', text: 'submission' },
            { key: 'C', text: 'submitting' },
            { key: 'D', text: 'submits' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + V3ED',
        explanation_vi: "Đây là mệnh đề quan hệ bị động (that are + V3/V-ed). 'submitted' (được nộp) là V3/V-ed của 'submit'."
    },
    {
        id: 52,
        question: "When there is a problem with company policy, it should be __________ before the board of directors.",
        options: [
            { key: 'A', text: 'bring up' },
            { key: 'B', text: 'bring in' },
            { key: 'C', text: 'brought up' },
            { key: 'D', text: 'brought in' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + V3ED',
        explanation_vi: "Cấu trúc bị động với modal verb: should be + V3/V-ed. 'brought up' (được nêu ra, đề cập) là V3 của cụm động từ 'bring up'."
    },
    {
        id: 53,
        question: "The team’s contributions to the Ripton Group’s marketing plan were very ------------ acknowledged.",
        options: [
            { key: 'A', text: 'favor' },
            { key: 'B', text: 'favorably' },
            { key: 'C', text: 'favorable' },
            { key: 'D', text: 'favored' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + ADV + V3ED',
        explanation_vi: "Câu này ở dạng bị động 'were acknowledged'. Để bổ nghĩa cho động từ 'acknowledged', ta cần một trạng từ (adverb). 'favorably' (một cách thuận lợi) là trạng từ."
    },
    {
        id: 54,
        question: "Walter Keegan was ----------------------- hired as a salesperson, but he soon became head of the marketing department.",
        options: [
            { key: 'A', text: 'originality' },
            { key: 'B', text: 'original' },
            { key: 'C', text: 'originals' },
            { key: 'D', text: 'originally' }
        ],
        correctAnswer: 'D',
        category: 'TOBE + ADV + V3ED',
        explanation_vi: "Câu này ở dạng bị động 'was hired'. Ta cần một trạng từ (adverb) để bổ nghĩa cho động từ 'hired'. 'originally' (ban đầu) là trạng từ."
    },
    {
        id: 55,
        question: "Your order cannot ---------------- until we have received full payment.",
        options: [
            { key: 'A', text: 'to process' },
            { key: 'B', text: 'be processed' },
            { key: 'C', text: 'being processed' },
            { key: 'D', text: 'has processed' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + V3ED',
        explanation_vi: "Cấu trúc bị động với modal verb 'cannot' là 'cannot be + V3/V-ed'. 'be processed' là dạng đúng."
    },
    {
        id: 56,
        question: "The presentation was ______ seamlessly, giving an impressive image of the team.",
        options: [
            { key: 'A', text: 'conduct' },
            { key: 'B', text: 'conducted' },
            { key: 'C', text: 'conducting' },
            { key: 'D', text: 'conductor' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + V3ED + ADV',
        explanation_vi: "Cấu trúc bị động: was + V3/V-ed. 'conducted' (được thực hiện) là V3/V-ed của 'conduct'. Trạng từ 'seamlessly' bổ nghĩa cho nó."
    },
    {
        id: 57,
        question: "These microchips are ______ faster and more cheaply in Asia.",
        options: [
            { key: 'A', text: 'produce' },
            { key: 'B', text: 'produced' },
            { key: 'C', text: 'product' },
            { key: 'D', text: 'production' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + V3ED + ADV',
        explanation_vi: "Cấu trúc bị động: are + V3/V-ed. 'produced' (được sản xuất) là V3/V-ed của 'produce'. Các trạng từ 'faster' và 'more cheaply' bổ nghĩa cho nó."
    },
    {
        id: 58,
        question: "Inventory control cannot be performed _____, but must be done by physically counting the merchandise.",
        options: [
            { key: 'A', text: 'automatically' },
            { key: 'B', text: 'automatic' },
            { key: 'C', text: 'automation' },
            { key: 'D', text: 'automated' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + V3ED + ADV',
        explanation_vi: "Ta cần một trạng từ (adverb) để bổ nghĩa cho động từ bị động 'be performed'. 'automatically' (một cách tự động) là trạng từ."
    },
    {
        id: 59,
        question: "For most people, Samco is ______ with computer chip production.",
        options: [
            { key: 'A', text: 'associate' },
            { key: 'B', text: 'associated' },
            { key: 'C', text: 'associating' },
            { key: 'D', text: 'association' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + V3ED + GIỚI',
        explanation_vi: "Cấu trúc bị động 'be associated with' (được liên kết với) là một cụm từ cố định. Ta cần V3/V-ed 'associated'."
    },
    {
        id: 60,
        question: "Ms. Hyun is reviewing the training manual to see if updates----------------.",
        options: [
            { key: 'A', text: 'have need' },
            { key: 'B', text: 'needing' },
            { key: 'C', text: 'are needed' },
            { key: 'D', text: 'to be needed' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + V3ED + GIỚI',
        explanation_vi: "Chủ ngữ 'updates' (những bản cập nhật) không thể tự 'need' (cần). Do đó, ta dùng câu bị động. 'are needed' (được cần đến) là dạng bị động đúng."
    },
    {
        id: 61,
        question: "Some employees have to wait years before they are fully ______ in the company pension plan.",
        options: [
            { key: 'A', text: 'vest' },
            { key: 'B', text: 'vested' },
            { key: 'C', text: 'vesting' },
            { key: 'D', text: 'vests' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + ADV + V3/ED',
        explanation_vi: "Cấu trúc bị động: are + adverb + V3/V-ed. 'vested' (được trao quyền) là V3/V-ed của 'vest'."
    },
    {
        id: 62,
        question: "To assure that your order is ______ filled, it will be checked by a two-person team.",
        options: [
            { key: 'A', text: 'accurately' },
            { key: 'B', text: 'accurateness' },
            { key: 'C', text: 'accurate' },
            { key: 'D', text: 'accuracy' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + ADV + V3/ED',
        explanation_vi: "Ta cần một trạng từ (adverb) để bổ nghĩa cho động từ bị động 'filled'. 'accurately' (một cách chính xác) là trạng từ."
    },
    {
        id: 63,
        question: "Author Minh Phan’s latest novel was ____________ influenced by Vietnamese folk stories.",
        options: [
            { key: 'A', text: 'heavy' },
            { key: 'B', text: 'heavily' },
            { key: 'C', text: 'heaviest' },
            { key: 'D', text: 'heavier' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + ADV + V3/ED',
        explanation_vi: "Ta cần một trạng từ (adverb) để bổ nghĩa cho động từ bị động 'influenced'. 'heavily' (một cách nặng nề, sâu sắc) là trạng từ."
    },
    {
        id: 64,
        question: "Fragile equipment must be stored in a secure location so that nothing is ______________ damaged.",
        options: [
            { key: 'A', text: 'accident' },
            { key: 'B', text: 'accidents' },
            { key: 'C', text: 'accidental' },
            { key: 'D', text: 'accidentally' }
        ],
        correctAnswer: 'D',
        category: 'TOBE + ADV + V3/ED',
        explanation_vi: "Ta cần một trạng từ (adverb) để bổ nghĩa cho động từ bị động 'damaged'. 'accidentally' (một cách tình cờ) là trạng từ."
    },
    {
        id: 65,
        question: "This year’s conference tote bags were ____________ donated by Etani Designs.",
        options: [
            { key: 'A', text: 'generous' },
            { key: 'B', text: 'generosity' },
            { key: 'C', text: 'generously' },
            { key: 'D', text: 'generosities' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + ADV + V3/ED',
        explanation_vi: "Ta cần một trạng từ (adverb) để bổ nghĩa cho động từ bị động 'donated'. 'generously' (một cách hào phóng) là trạng từ."
    },
    {
        id: 66,
        question: "The meeting notes were _________ deleted, but Mr. Hahm was able to recreate them from memory.",
        options: [
            { key: 'A', text: 'accident' },
            { key: 'B', text: 'accidental' },
            { key: 'C', text: 'accidents' },
            { key: 'D', text: 'accidentally' }
        ],
        correctAnswer: 'D',
        category: 'TOBE + ADV + V3/ED',
        explanation_vi: "Câu này giống câu 64. Ta cần một trạng từ (adverb) để bổ nghĩa cho động từ bị động 'deleted'. 'accidentally' là trạng từ."
    },
    {
        id: 67,
        question: "Employees of Belfore Electronics Ltd. are --------------------- involved in community-assistance programs.",
        options: [
            { key: 'A', text: 'active' },
            { key: 'B', text: 'actively' },
            { key: 'C', text: 'activate' },
            { key: 'D', text: 'activity' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + ADV + V3/ED',
        explanation_vi: "Ta cần một trạng từ (adverb) để bổ nghĩa cho động từ bị động 'involved'. 'actively' (một cách tích cực) là trạng từ."
    },
    {
        id: 68,
        question: "The firm’s one-hour lunch policy is ------------------------- enforced, so do not return late.",
        options: [
            { key: 'A', text: 'strictly' },
            { key: 'B', text: 'hungrily' },
            { key: 'C', text: 'punctually' },
            { key: 'D', text: 'bravely' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + ADV + V3/ED',
        explanation_vi: "Ta cần một trạng từ (adverb) để bổ nghĩa cho động từ bị động 'enforced'. 'strictly' (một cách nghiêm ngặt) là trạng từ phù hợp nhất về nghĩa."
    },
    {
        id: 69,
        question: "Sometimes the manager is too ______ and his workers take advantage of him.",
        options: [
            { key: 'A', text: 'flex' },
            { key: 'B', text: 'flexible' },
            { key: 'C', text: 'flexibly' },
            { key: 'D', text: 'flexibility' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + TRẠNG + TÍNH',
        explanation_vi: "Sau trạng từ 'too', ta cần một tính từ (adjective). 'flexible' (linh hoạt) là tính từ."
    },
    {
        id: 70,
        question: "The constant flow of traffic by the researcher’s desk proved to be very ___________.",
        options: [
            { key: 'A', text: 'disruptive' },
            { key: 'B', text: 'disrupts' },
            { key: 'C', text: 'disruption' },
            { key: 'D', text: 'disrupted' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + TRẠNG + TÍNH',
        explanation_vi: "Sau trạng từ 'very', ta cần một tính từ (adjective). 'disruptive' (gây gián đoạn) là tính từ."
    },
    {
        id: 71,
        question: "Project manager Hannah Chung has proved to be very _________ with completing company projects.",
        options: [
            { key: 'A', text: 'helpfulness' },
            { key: 'B', text: 'help' },
            { key: 'C', text: 'helpfully' },
            { key: 'D', text: 'helpful' }
        ],
        correctAnswer: 'D',
        category: 'TOBE + TRẠNG + TÍNH',
        explanation_vi: "Sau trạng từ 'very', ta cần một tính từ (adjective). 'helpful' (hữu ích) là tính từ."
    },
    {
        id: 72,
        question: "The peninsula’s southernmost portion is rarely visited because it is not ----------------------- accessible to travelers.",
        options: [
            { key: 'A', text: 'easy' },
            { key: 'B', text: 'easily' },
            { key: 'C', text: 'easier' },
            { key: 'D', text: 'easiest' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + TRẠNG + TÍNH',
        explanation_vi: "Ta cần một trạng từ (adverb) để bổ nghĩa cho tính từ 'accessible'. 'easily' (một cách dễ dàng) là trạng từ."
    },
    {
        id: 73,
        question: "The registration fee is ---------------- refundable up to two weeks prior to the conference date.",
        options: [
            { key: 'A', text: 'fullest' },
            { key: 'B', text: 'fuller' },
            { key: 'C', text: 'fully' },
            { key: 'D', text: 'full' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + TRẠNG + TÍNH',
        explanation_vi: "Ta cần một trạng từ (adverb) để bổ nghĩa cho tính từ 'refundable'. 'fully' (hoàn toàn) là trạng từ."
    },
    {
        id: 74,
        question: "Inclement weather was ------------ responsible for the low turnout at Saturday’s Exton Music Festival.",
        options: [
            { key: 'A', text: 'largely' },
            { key: 'B', text: 'large' },
            { key: 'C', text: 'largest' },
            { key: 'D', text: 'larger' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + TRẠNG + TÍNH',
        explanation_vi: "Ta cần một trạng từ (adverb) để bổ nghĩa cho tính từ 'responsible'. 'largely' (phần lớn) là trạng từ."
    },
    {
        id: 75,
        question: "Prices at Taylor City Books are ------------------ lower than at other online bookstores.",
        options: [
            { key: 'A', text: 'more significant' },
            { key: 'B', text: 'significant' },
            { key: 'C', text: 'significance' },
            { key: 'D', text: 'significantly' }
        ],
        correctAnswer: 'D',
        category: 'TOBE + TRẠNG + TÍNH',
        explanation_vi: "Ta cần một trạng từ (adverb) để bổ nghĩa cho tính từ so sánh 'lower'. 'significantly' (một cách đáng kể) là trạng từ."
    },
    {
        id: 76,
        question: "The aroma coming from the restaurant was so __________ that the tourists did not hesitate before entering.",
        options: [
            { key: 'A', text: 'appeal' },
            { key: 'B', text: 'appealed' },
            { key: 'C', text: 'appealing' },
            { key: 'D', text: 'appeals' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + TRẠNG + TÍNH',
        explanation_vi: "Trong cấu trúc 'so + adj + that', ta cần một tính từ. Chủ ngữ 'The aroma' (mùi thơm) gây ra cảm xúc, nên ta dùng tính từ V-ing 'appealing' (hấp dẫn)."
    },
    {
        id: 77,
        question: "Our office manager was so __________ by the speed of the delivery, she decided to order from them again.",
        options: [
            { key: 'A', text: 'impressive' },
            { key: 'B', text: 'impressed' },
            { key: 'C', text: 'impression' },
            { key: 'D', text: 'impressionable' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + TRẠNG + TÍNH',
        explanation_vi: "Trong cấu trúc 'so + adj + that', ta cần một tính từ. Chủ ngữ 'Our office manager' (người) nhận cảm xúc, nên ta dùng tính từ V-ed 'impressed' (bị ấn tượng)."
    },
    {
        id: 78,
        question: "Amand Corp.’s flexible work policy is --------------- beneficial to the company as employee turnover is minimal.",
        options: [
            { key: 'A', text: 'financially' },
            { key: 'B', text: 'finances' },
            { key: 'C', text: 'financial' },
            { key: 'D', text: 'to finance' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + TRẠNG + TÍNH',
        explanation_vi: "Ta cần một trạng từ (adverb) để bổ nghĩa cho tính từ 'beneficial'. 'financially' (về mặt tài chính) là trạng từ."
    },
    {
        id: 79,
        question: "Because you are a valued and dedicated employee, we are ______ you to director of the department.",
        options: [
            { key: 'A', text: 'promoting' },
            { key: 'B', text: 'promote' },
            { key: 'C', text: 'promotion' },
            { key: 'D', text: 'promoter' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + V-ING',
        explanation_vi: "Đây là cấu trúc thì Hiện tại tiếp diễn (Present Continuous): are + V-ing. 'promoting' là dạng V-ing của 'promote'."
    },
    {
        id: 80,
        question: "Most people get nervous when someone is ___________ their books.",
        options: [
            { key: 'A', text: 'audit' },
            { key: 'B', text: 'audits' },
            { key: 'C', text: 'audited' },
            { key: 'D', text: 'auditing' }
        ],
        correctAnswer: 'D',
        category: 'TOBE + V-ING',
        explanation_vi: "Thì Hiện tại tiếp diễn: is + V-ing. 'auditing' (kiểm toán) là dạng V-ing của 'audit'."
    },
    {
        id: 81,
        question: "While you are ______ your company, it is a good idea to have a good reputation",
        options: [
            { key: 'A', text: 'develop' },
            { key: 'B', text: 'development' },
            { key: 'C', text: 'developing' },
            { key: 'D', text: 'developer' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + V-ING',
        explanation_vi: "Thì Hiện tại tiếp diễn: are + V-ing. 'developing' (phát triển) là dạng V-ing của 'develop'."
    },
    {
        id: 82,
        question: "The programmer is ______ the message so that it’s not accessible to everyone.",
        options: [
            { key: 'A', text: 'code' },
            { key: 'B', text: 'coding' },
            { key: 'C', text: 'coded' },
            { key: 'D', text: 'coder' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + V-ING',
        explanation_vi: "Thì Hiện tại tiếp diễn: is + V-ing. 'coding' (mã hóa) là dạng V-ing của 'code'."
    },
    {
        id: 83,
        question: "Ms. Okada is __________ a new social media campaign at the request of our office manager.",
        options: [
            { key: 'A', text: 'organize' },
            { key: 'B', text: 'organized' },
            { key: 'C', text: 'organizing' },
            { key: 'D', text: 'organization' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + V-ING',
        explanation_vi: "Thì Hiện tại tiếp diễn: is + V-ing. 'organizing' (tổ chức) là dạng V-ing của 'organize'."
    },
    {
        id: 84,
        question: "Barsan Photo is ------------------ that their latest printer will not be available before the start of the third quarter.",
        options: [
            { key: 'A', text: 'acknowledge' },
            { key: 'B', text: 'acknowledges' },
            { key: 'C', text: 'acknowledging' },
            { key: 'D', text: 'acknowledgement' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + V-ING',
        explanation_vi: "Thì Hiện tại tiếp diễn: is + V-ing. 'acknowledging' (thừa nhận) là dạng V-ing của 'acknowledge'."
    },
    {
        id: 85,
        question: "The most difficult part of hospitalization is being _________.",
        options: [
            { key: 'A', text: 'admit' },
            { key: 'B', text: 'admitted' },
            { key: 'C', text: 'admissions' },
            { key: 'D', text: 'admitting' }
        ],
        correctAnswer: 'B',
        category: 'TOBE + V-ING + V3ED',
        explanation_vi: "Đây là cấu trúc bị động của danh động từ (gerund): being + V3/V-ed. 'admitted' (được nhập viện) là V3 của 'admit'."
    },
    {
        id: 86,
        question: "Daishi Asayama is one of three applicants being ------ to oversee the Kingston franchises.",
        options: [
            { key: 'A', text: 'decided' },
            { key: 'B', text: 'corrected' },
            { key: 'C', text: 'considered' },
            { key: 'D', text: 'practiced' }
        ],
        correctAnswer: 'C',
        category: 'TOBE + V-ING + V3ED',
        explanation_vi: "Đây là cấu trúc Bị động Hiện tại tiếp diễn, rút gọn trong mệnh đề quan hệ (applicants who are being considered). 'considered' (được xem xét) là V3 của 'consider'."
    },
    {
        id: 87,
        question: "______ is still a major concern for inner-city schools that want to install computers.",
        options: [
            { key: 'A', text: 'Afford' },
            { key: 'B', text: 'Affording' },
            { key: 'C', text: 'Affordable' },
            { key: 'D', text: 'Affordability' }
        ],
        correctAnswer: 'D',
        category: 'S + TOBE',
        explanation_vi: "Câu cần một danh từ (noun) làm chủ ngữ. 'Affordability' (khả năng chi trả) là danh từ."
    },
    {
        id: 88,
        question: "Staff at the Bismarck Hotel were ------------------ helpful to us during our stay.",
        options: [
            { key: 'A', text: 'quite' },
            { key: 'B', text: 'enough' },
            { key: 'C', text: 'far' },
            { key: 'D', text: 'early' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + ADV + ADJ',
        explanation_vi: "Ta cần một trạng từ mức độ (adverb of degree) để bổ nghĩa cho tính từ 'helpful'. 'quite' (khá) là lựa chọn phù hợp nhất."
    },
    {
        id: 89,
        question: "Is it ______ to consider funding a new project when we haven’t even seen the returns from the last one?",
        options: [
            { key: 'A', text: 'wisdom' },
            { key: 'B', text: 'wisest' },
            { key: 'C', text: 'wisely' },
            { key: 'D', text: 'wise' }
        ],
        correctAnswer: 'D',
        category: 'IT + BE + ADJ + TO V',
        explanation_vi: "Trong cấu trúc 'Is it ... to V?', ta cần một tính từ (adjective). 'wise' (khôn ngoan) là tính từ."
    },
    {
        id: 90,
        question: "Is it __________ for a doctor to order so many tests?",
        options: [
            { key: 'A', text: 'usual' },
            { key: 'B', text: 'usually' },
            { key: 'C', text: 'unusually' },
            { key: 'D', text: 'used' }
        ],
        correctAnswer: 'A',
        category: 'IT + BE + ADJ + TO V',
        explanation_vi: "Trong cấu trúc 'Is it ... for sb to V?', ta cần một tính từ (adjective). 'usual' (thông thường) là tính từ."
    },
    {
        id: 91,
        question: "The company’s goal is ________ the best services for the customers.",
        options: [
            { key: 'A', text: 'to offer' },
            { key: 'B', text: 'offering' },
            { key: 'C', text: 'offers' },
            { key: 'D', text: 'be offered' }
        ],
        correctAnswer: 'A',
        category: 'TOBE + GERUND/TO V',
        explanation_vi: "Sau 'to be' (is), để chỉ mục đích hoặc định nghĩa, ta có thể dùng to-infinitive. 'to offer' (để cung cấp) là dạng đúng."
    }
];
