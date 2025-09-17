
import { Tip } from '../../types';

export const tips5to6: Tip[] = [
    {
        id: 5,
        title: 'Phát âm sai âm cuối',
        situation: '🗣️ Bạn bỏ qua hoặc phát âm sai các âm cuối quan trọng như /s/, /z/, /t/, /d/, /ed/, làm người nghe khó hiểu.',
        solution65: {
            en: 'Focus on clearly pronouncing all sounds, especially final consonants, even if you speak slowly.',
            vi: 'Tập trung phát âm rõ ràng tất cả các âm, đặc biệt là phụ âm cuối, dù cho bạn nói chậm.'
        },
        solution75: {
            en: 'Practice minimal pairs of final sounds and use natural linking sounds where appropriate to improve flow.',
            vi: 'Luyện tập các cặp âm cuối dễ nhầm lẫn và sử dụng nối âm một cách tự nhiên khi có thể để cải thiện sự trôi chảy.'
        },
        examples65: [
             {
                phrase: { en: 'Exaggerate the /s/ sound at the end of plurals and third-person verbs.', vi: 'Phóng đại âm /s/ ở cuối danh từ số nhiều và động từ ngôi thứ ba.' },
                sampleSpeech: { en: 'He likes sports and watches games on weekends.', vi: 'Anh ấy thích thể thao và xem các trận đấu vào cuối tuần.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What does your friend like to do?"</b><br/><br/>
                         💬 <b>Candidate:</b> "He like<strong class="vocab-highlight-en">s</strong> many sport<strong class="vocab-highlight-en">s</strong>. He often watch<strong class="vocab-highlight-en">es</strong> game<strong class="vocab-highlight-en">s</strong> with his friend<strong class="vocab-highlight-en">s</strong> on weekend<strong class="vocab-highlight-en">s</strong>."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Bạn của bạn thích làm gì?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Anh ấy thích nhiều môn thể thao. Anh ấy thường xem các trận đấu với bạn bè vào cuối tuần." (Lưu ý nhấn mạnh các âm cuối 's' và 'es').` 
                }
            }
        ],
        examples75: [
            {
                phrase: { en: 'Use linking between a final consonant and a starting vowel.', vi: 'Sử dụng nối âm giữa một phụ âm cuối và một nguyên âm đầu.' },
                sampleSpeech: { en: 'I think_it\'s_an_interesting_idea.', vi: 'Tôi nghĩ đó là một ý tưởng thú vị.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What do you think about online learning?"</b><br/><br/>
                         💬 <b>Candidate:</b> "Well, I thin<strong class="vocab-highlight-en">k_i</strong>t'<strong class="vocab-highlight-en">s_a</strong>n <strong class="vocab-highlight-en">i</strong>ncredibly usefu<strong class="vocab-highlight-en">l_o</strong>ption for many people. I<strong class="vocab-highlight-en">t_o</strong>ffer<strong class="vocab-highlight-en">s_a</strong> lot of flexibility."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Bạn nghĩ gì về việc học trực tuyến?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "À, tôi nghĩ đó là một lựa chọn cực kỳ hữu ích cho nhiều người. Nó mang lại rất nhiều sự linh hoạt." (Lưu ý các âm được nối với nhau một cách tự nhiên).`
                }
            }
        ]
    },
    {
        id: 6,
        title: 'Trả lời lạc đề',
        situation: '💬 Bạn nghe không rõ câu hỏi hoặc bị "ám ảnh" bởi một từ khóa, dẫn đến việc trả lời một câu hỏi khác hoặc đi quá xa khỏi chủ đề chính.',
        solution65: {
            en: 'Always listen carefully. If unsure, politely ask the examiner to repeat the question. Stick to the main point.',
            vi: 'Luôn lắng nghe kỹ. Nếu không chắc, hãy lịch sự yêu cầu giám khảo nhắc lại. Bám sát vào ý chính của câu hỏi.'
        },
        solution75: {
            en: 'Proactively confirm your understanding by paraphrasing the question, then answer directly before expanding in a controlled, relevant manner.',
            vi: 'Chủ động xác nhận lại câu hỏi bằng cách diễn giải lại, sau đó trả lời trực tiếp trước khi mở rộng một cách có kiểm soát và liên quan.'
        },
        examples65: [
             {
                phrase: { en: '“Sorry, could you please repeat the question?”', vi: '“Xin lỗi, ông/bà có thể vui lòng nhắc lại câu hỏi được không?”' },
                sampleSpeech: { en: 'I didn\'t quite catch that.', vi: 'Tôi nghe không rõ lắm.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What are the pros and cons of globalisation?"</b><br/><br/>
                         💬 <b>Candidate:</b> "I'm sorry, I didn't quite catch the last word. Could you please repeat the question?"`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Ưu và nhược điểm của toàn cầu hóa là gì?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Xin lỗi, tôi nghe không rõ từ cuối cùng. Ông/bà có thể vui lòng nhắc lại câu hỏi được không?"` 
                }
            }
        ],
        examples75: [
            {
                phrase: { en: '“So, if I understand correctly, you’re asking about...?”', vi: '“Vậy, nếu tôi hiểu đúng, ông/bà đang hỏi về…?”' },
                sampleSpeech: { en: '...the reasons why people choose to live in big cities. Is that right?', vi: '...lý do tại sao mọi người chọn sống ở các thành phố lớn. Có đúng không ạ?' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What draws people to major urban centers?"</b><br/><br/>
                         💬 <b>Candidate:</b> "So, if I understand correctly, you’re asking about the main reasons people move to big cities. Is that right? ... Well, I believe the primary driver is the search for better economic opportunities."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Điều gì thu hút mọi người đến các trung tâm đô thị lớn?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Vậy, nếu tôi hiểu đúng, ông/bà đang hỏi về những lý do chính mà mọi người chuyển đến các thành phố lớn. Có đúng không ạ? ... Vâng, tôi tin rằng động lực chính là việc tìm kiếm cơ hội kinh tế tốt hơn."`
                }
            }
        ]
    }
];
