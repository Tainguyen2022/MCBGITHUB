import { Tip } from '../types';

export const defaultTipsData: Tip[] = [
    {
        id: 1,
        title: 'Bí ý, không biết câu trả lời',
        situation: '🤔 Bạn <strong>bí ý</strong>, không biết phải trả lời câu hỏi của giám khảo như thế nào và cần một vài giây để suy nghĩ.',
        solution65: {
            en: 'Use filler phrases to buy time, give a general answer, or tell a personal story to avoid silence.',
            vi: 'Sử dụng các cụm từ kéo dài thời gian, đưa ra câu trả lời chung chung, hoặc kể một câu chuyện cá nhân để tránh im lặng.'
        },
        solution75: {
            en: 'Employ sophisticated, natural-sounding phrases, combining hypotheses with personal experiences to extend your response.',
            vi: 'Sử dụng các cụm từ tinh tế, tự nhiên, kết hợp giả định với trải nghiệm cá nhân để mở rộng câu trả lời của bạn.'
        },
        examples65: [
            {
                phrase: { en: '“That’s an interesting question. Let me see…”', vi: '“Đó là một câu hỏi thú vị. Để tôi xem nào…”' },
                sampleSpeech: { en: 'I would have to say it’s the bus, as it connects almost every part of the city.', vi: 'Tôi phải nói rằng đó là xe buýt, vì nó kết nối gần như mọi nơi trong thành phố.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What is the most popular form of public transport in your city?"</b><br/><br/>
                         💬 <b>Candidate:</b> "That’s an interesting question. Let me see… I would have to say it’s the bus, as it connects almost every part of the city. While we do have taxis and <strong class="vocab-highlight-en">ride-sharing services</strong>, buses are far more <strong class="vocab-highlight-en">affordable</strong> for daily <strong class="vocab-highlight-en">commuters</strong> like students and workers."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Loại hình giao thông công cộng phổ biến nhất ở thành phố của bạn là gì?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Đó là một câu hỏi thú vị. Để tôi xem nào… Tôi phải nói rằng đó là xe buýt, vì nó kết nối gần như mọi nơi trong thành phố. Mặc dù chúng tôi có taxi và <strong class="vocab-highlight-vi">dịch vụ đi chung xe</strong>, xe buýt có <strong class="vocab-highlight-vi">giá phải chăng</strong> hơn nhiều cho những <strong class="vocab-highlight-vi">người đi làm hàng ngày</strong> như sinh viên và công nhân."` 
                }
            },
            {
                phrase: { en: '“Well, generally speaking, I’d say that most people...”', vi: '“À, nói chung thì, tôi cho rằng hầu hết mọi người…”' },
                sampleSpeech: { en: 'Most people prefer modern entertainment, but historical museums are still quite popular.', vi: 'Hầu hết mọi người thích các hình thức giải trí hiện đại hơn, nhưng các bảo tàng lịch sử vẫn khá phổ biến.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Do people in your country enjoy going to museums?"</b><br/><br/>
                         💬 <b>Candidate:</b> "Well, generally speaking, I’d say that most people, especially the <strong class="vocab-highlight-en">younger generation</strong>, prefer modern entertainment like cinemas or shopping malls. However, historical museums are still quite popular, particularly with tourists and school groups who want to learn about our country's <strong class="vocab-highlight-en">past</strong>."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Người dân ở nước bạn có thích đi bảo tàng không?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "À, nói chung thì, tôi cho rằng hầu hết mọi người, đặc biệt là <strong class="vocab-highlight-vi">thế hệ trẻ</strong>, thích các hình thức giải trí hiện đại như rạp chiếu phim hay trung tâm mua sắm hơn. Tuy nhiên, các bảo tàng lịch sử vẫn khá phổ biến, đặc biệt với khách du lịch và các đoàn học sinh muốn tìm hiểu về <strong class="vocab-highlight-vi">quá khứ</strong> của đất nước chúng tôi."`
                }
            },
            {
                phrase: { en: '“I don’t have a strong opinion, but I guess…”', vi: '“Tôi không có quan điểm rõ ràng, nhưng tôi đoán là…”' },
                sampleSpeech: { en: 'It could be a useful life skill for them to learn early on.', vi: 'Đó có thể là một kỹ năng sống hữu ích để chúng học từ sớm.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Should children learn to cook at school?"</b><br/><br/>
                         💬 <b>Candidate:</b> "I don’t have a strong opinion on whether it should be <strong class="vocab-highlight-en">mandatory</strong>, but I guess it could be a useful <strong class="vocab-highlight-en">life skill</strong> for them to learn early on. It teaches them about nutrition and independence, which are both very <strong class="vocab-highlight-en">valuable</strong>."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Trẻ em có nên học nấu ăn ở trường không?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Tôi không có quan điểm rõ ràng về việc liệu nó có nên là <strong class="vocab-highlight-vi">bắt buộc</strong> hay không, nhưng tôi đoán đó có thể là một <strong class="vocab-highlight-vi">kỹ năng sống</strong> hữu ích để chúng học từ sớm. Nó dạy chúng về dinh dưỡng và sự độc lập, cả hai đều rất <strong class="vocab-highlight-vi">quý giá</strong>."`
                }
            },
            {
                phrase: { en: '“In my country, it’s common for people to...”', vi: '“Ở đất nước tôi, mọi người thường…”' },
                sampleSpeech: { en: 'Have a big family dinner and watch fireworks at midnight.', vi: 'Có một bữa tối gia đình lớn và xem pháo hoa vào lúc nửa đêm.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "How do people in your country celebrate New Year?"</b><br/><br/>
                         💬 <b>Candidate:</b> "In my country, it’s common for people to have a big <strong class="vocab-highlight-en">family gathering</strong> on New Year's Eve. Afterwards, many families get together to watch fireworks at midnight to welcome the new year. It’s a very <strong class="vocab-highlight-en">festive</strong> time."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Mọi người ở nước bạn ăn mừng năm mới như thế nào?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Ở đất nước tôi, mọi người thường có một buổi <strong class="vocab-highlight-vi">tụ họp gia đình</strong> lớn vào đêm giao thừa. Sau đó, nhiều gia đình tụ tập cùng nhau để xem pháo hoa vào lúc nửa đêm để chào đón năm mới. Đó là một thời gian rất <strong class="vocab-highlight-vi">lễ hội</strong>."`
                }
            },
            {
                phrase: { en: '“Personally, I think it depends on the situation.”', vi: '“Cá nhân tôi nghĩ điều đó còn tùy thuộc vào tình huống.”' },
                sampleSpeech: { en: 'If you want adventure, traveling alone is great, but for relaxing, friends are better.', vi: 'Nếu bạn muốn phiêu lưu, đi một mình rất tuyệt, nhưng để thư giãn, bạn bè sẽ tốt hơn.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Is it better to travel alone or with friends?"</b><br/><br/>
                         💬 <b>Candidate:</b> "Personally, I think it depends on the situation and the <strong class="vocab-highlight-en">purpose</strong> of the trip. If you want a real adventure and <strong class="vocab-highlight-en">self-discovery</strong>, traveling alone is great. But for a relaxing holiday where you just want to have fun, going with friends is definitely better."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Đi du lịch một mình hay với bạn bè tốt hơn?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Cá nhân tôi nghĩ điều đó còn tùy thuộc vào tình huống và <strong class="vocab-highlight-vi">mục đích</strong> của chuyến đi. Nếu bạn muốn một cuộc phiêu lưu thực sự và <strong class="vocab-highlight-vi">khám phá bản thân</strong>, đi du lịch một mình rất tuyệt. Nhưng để có một kỳ nghỉ thư giãn mà bạn chỉ muốn vui vẻ, đi cùng bạn bè chắc chắn là tốt hơn."`
                }
            },
            {
                phrase: { en: '“To be honest, I haven’t thought about that before.”', vi: '“Thú thật là tôi chưa từng nghĩ về điều đó trước đây.”' },
                sampleSpeech: { en: 'I imagine it will make many tasks much easier and more efficient.', vi: 'Tôi tưởng tượng nó sẽ làm cho nhiều công việc trở nên dễ dàng và hiệu quả hơn nhiều.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What impact will artificial intelligence have on our lives in the future?"</b><br/><br/>
                         💬 <b>Candidate:</b> "To be honest, I haven’t thought about that in great detail before. However, I imagine it will make many tasks in our daily lives, like driving or managing schedules, much easier and more <strong class="vocab-highlight-en">efficient</strong>. It has a lot of <strong class="vocab-highlight-en">potential</strong>."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Trí tuệ nhân tạo sẽ có tác động gì đến cuộc sống của chúng ta trong tương lai?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Thú thật là tôi chưa từng nghĩ về điều đó một cách chi tiết trước đây. Tuy nhiên, tôi tưởng tượng nó sẽ làm cho nhiều công việc trong cuộc sống hàng ngày của chúng ta, như lái xe hay quản lý lịch trình, trở nên dễ dàng và <strong class="vocab-highlight-vi">hiệu quả</strong> hơn nhiều. Nó có rất nhiều <strong class="vocab-highlight-vi">tiềm năng</strong>."`
                }
            },
            {
                phrase: { en: '“Let me tell you about something that happened to me…”', vi: '“Để tôi kể cho bạn nghe về một chuyện đã xảy ra với tôi…”' },
                sampleSpeech: { en: 'My friend gave me a handmade photo album for my birthday.', vi: 'Bạn tôi đã tặng tôi một album ảnh làm bằng tay vào ngày sinh nhật.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Have you ever received a very special gift?"</b><br/><br/>
                         💬 <b>Candidate:</b> "That’s a lovely question. Let me tell you about something that happened to me last year. For my birthday, my best friend gave me a <strong class="vocab-highlight-en">handmade</strong> photo album filled with pictures from our school days. It was so <strong class="vocab-highlight-en">thoughtful</strong> and personal."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Bạn đã bao giờ nhận được một món quà rất đặc biệt chưa?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Đó là một câu hỏi đáng yêu. Để tôi kể cho bạn nghe về một chuyện đã xảy ra với tôi năm ngoái. Vào ngày sinh nhật của tôi, người bạn thân nhất đã tặng tôi một album ảnh <strong class="vocab-highlight-vi">làm bằng tay</strong> chứa đầy những bức ảnh từ thời đi học của chúng tôi. Nó thật <strong class="vocab-highlight-vi">chu đáo</strong> và mang tính cá nhân."`
                }
            },
            {
                phrase: { en: '“It’s hard to say for sure, but maybe…”', vi: '“Khó mà nói chắc được, nhưng có lẽ…”' },
                sampleSpeech: { en: 'E-books will become more popular, but traditional books will never disappear completely.', vi: 'Sách điện tử sẽ trở nên phổ biến hơn, nhưng sách truyền thống sẽ không bao giờ biến mất hoàn toàn.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Will people still read physical books in 50 years?"</b><br/><br/>
                         💬 <b>Candidate:</b> "It’s hard to say for sure, as technology changes so fast. But maybe e-books will become the <strong class="vocab-highlight-en">dominant</strong> format for convenience. However, I think traditional books will never <strong class="vocab-highlight-en">disappear completely</strong> because many people love the feel of a real book."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Liệu 50 năm nữa người ta có còn đọc sách giấy không?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Khó mà nói chắc được, vì công nghệ thay đổi quá nhanh. Nhưng có lẽ sách điện tử sẽ trở thành định dạng <strong class="vocab-highlight-vi">thống trị</strong> vì sự tiện lợi. Tuy nhiên, tôi nghĩ sách truyền thống sẽ không bao giờ <strong class="vocab-highlight-vi">biến mất hoàn toàn</strong> vì nhiều người yêu thích cảm giác của một cuốn sách thật."`
                }
            },
            {
                phrase: { en: '“I suppose the main reason is that…”', vi: '“Tôi cho rằng lý do chính là…”' },
                sampleSpeech: { en: 'There are more job opportunities and better educational facilities available there.', vi: 'Ở đó có nhiều cơ hội việc làm và cơ sở giáo dục tốt hơn.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Why do many people move to big cities?"</b><br/><br/>
                         💬 <b>Candidate:</b> "That's a common trend. I suppose the main reason is that there are simply more <strong class="vocab-highlight-en">job opportunities</strong> in <strong class="vocab-highlight-en">urban areas</strong>. Additionally, cities usually offer better educational facilities and a wider range of entertainment options, which is attractive to many people."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Tại sao nhiều người lại chuyển đến các thành phố lớn?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Đó là một xu hướng phổ biến. Tôi cho rằng lý do chính là vì đơn giản là có nhiều <strong class="vocab-highlight-vi">cơ hội việc làm</strong> hơn ở các <strong class="vocab-highlight-vi">khu vực đô thị</strong>. Ngoài ra, các thành phố thường cung cấp cơ sở giáo dục tốt hơn và nhiều lựa chọn giải trí đa dạng hơn, điều này hấp dẫn nhiều người."`
                }
            },
            {
                phrase: { en: '“Let me think for a moment…”', vi: '“Để tôi suy nghĩ một lát…”' },
                sampleSpeech: { en: 'I believe loyalty is the most crucial quality because you need someone you can always count on.', vi: 'Tôi tin rằng lòng trung thành là phẩm chất quan trọng nhất vì bạn cần một người mà bạn luôn có thể tin cậy.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What is the most important quality in a friend?"</b><br/><br/>
                         💬 <b>Candidate:</b> "Let me think for a moment… That’s a tough one. For me, I believe <strong class="vocab-highlight-en">loyalty</strong> is the most <strong class="vocab-highlight-en">crucial</strong> quality. It’s important to have someone you can always count on, who will support you no matter what. Trust is built on loyalty."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Phẩm chất quan trọng nhất ở một người bạn là gì?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Để tôi suy nghĩ một lát… Câu này khó đấy. Đối với tôi, tôi tin rằng <strong class="vocab-highlight-vi">lòng trung thành</strong> là phẩm chất <strong class="vocab-highlight-vi">quan trọng nhất</strong>. Điều quan trọng là có một người mà bạn luôn có thể tin cậy, người sẽ ủng hộ bạn dù có chuyện gì xảy ra. Niềm tin được xây dựng trên lòng trung thành."`
                }
            },
        ],
        examples75: [
            {
                phrase: { en: '“That’s a rather thought-provoking question. My initial reaction is that...”', vi: '“Đó là một câu hỏi khá kích thích tư duy. Phản ứng ban đầu của tôi là…”' },
                sampleSpeech: { en: 'While it offers incredible connectivity, it can paradoxically lead to less meaningful interaction.', vi: 'Mặc dù nó mang lại khả năng kết nối đáng kinh ngạc, nó lại có thể nghịch lý dẫn đến ít tương tác ý nghĩa hơn.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Do you think technology has made people more isolated?"</b><br/><br/>
                         💬 <b>Candidate:</b> "That’s a rather <strong class="vocab-highlight-en">thought-provoking</strong> question. My initial reaction is that while it offers incredible connectivity online, it can <strong class="vocab-highlight-en">paradoxically</strong> lead to less meaningful face-to-face interaction. We might have hundreds of online friends but still feel lonely. So, in a way, it has <strong class="vocab-highlight-en">redefined</strong> what connection means, for better or worse."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Bạn có nghĩ rằng công nghệ đã làm cho con người trở nên cô lập hơn không?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Đó là một câu hỏi khá <strong class="vocab-highlight-vi">kích thích tư duy</strong>. Phản ứng ban đầu của tôi là mặc dù nó mang lại khả năng kết nối trực tuyến đáng kinh ngạc, nó lại có thể <strong class="vocab-highlight-vi">nghịch lý</strong> dẫn đến ít tương tác trực tiếp ý nghĩa hơn. Chúng ta có thể có hàng trăm người bạn trên mạng nhưng vẫn cảm thấy cô đơn. Vì vậy, theo một cách nào đó, nó đã <strong class="vocab-highlight-vi">định nghĩa lại</strong> ý nghĩa của sự kết nối, dù tốt hay xấu."`
                }
            },
            {
                phrase: { en: '“I haven’t given it much thought until now, but I would venture to say that...”', vi: '“Tôi chưa nghĩ nhiều về nó cho đến bây giờ, nhưng tôi mạn phép nói rằng…”' },
                sampleSpeech: { en: 'Their public influence comes with a certain degree of social responsibility.', vi: 'Ảnh hưởng của họ đối với công chúng đi kèm với một mức độ trách nhiệm xã hội nhất định.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Should celebrities be considered role models?"</b><br/><br/>
                         💬 <b>Candidate:</b> "I haven’t given it much thought until now, but I would <strong class="vocab-highlight-en">venture to say that</strong> whether they like it or not, their public influence means they have a certain degree of <strong class="vocab-highlight-en">social responsibility</strong>. Young people often look up to them, so their actions can have a <strong class="vocab-highlight-en">significant impact</strong>."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Người nổi tiếng có nên được xem là hình mẫu không?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Tôi chưa nghĩ nhiều về nó cho đến bây giờ, nhưng tôi <strong class="vocab-highlight-vi">mạn phép nói rằng</strong> dù họ có thích hay không, ảnh hưởng của họ đối với công chúng có nghĩa là họ có một mức độ <strong class="vocab-highlight-vi">trách nhiệm xã hội</strong> nhất định. Những người trẻ tuổi thường ngưỡng mộ họ, vì vậy hành động của họ có thể có <strong class="vocab-highlight-vi">tác động đáng kể</strong>."`
                }
            },
            {
                phrase: { en: '“It’s a multifaceted issue, but from my perspective, the key factor is...”', vi: '“Đó là một vấn đề đa diện, nhưng theo quan điểm của tôi, yếu tố then chốt là…”' },
                sampleSpeech: { en: 'The over-reliance on private vehicles rather than efficient public transport.', vi: 'Sự phụ thuộc quá mức vào phương tiện cá nhân thay vì giao thông công cộng hiệu quả.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What is the main cause of traffic congestion in cities?"</b><br/><br/>
                         💬 <b>Candidate:</b> "It’s a <strong class="vocab-highlight-en">multifaceted issue</strong> with many contributing causes. But from my perspective, the key factor is the <strong class="vocab-highlight-en">over-reliance</strong> on private vehicles. If cities invested more in efficient public transport, congestion would be <strong class="vocab-highlight-en">significantly reduced</strong>."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Nguyên nhân chính của ùn tắc giao thông ở các thành phố là gì?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Đó là một <strong class="vocab-highlight-vi">vấn đề đa diện</strong> với nhiều nguyên nhân góp phần. Nhưng theo quan điểm của tôi, yếu tố then chốt là sự <strong class="vocab-highlight-vi">phụ thuộc quá mức</strong> vào phương tiện cá nhân. Nếu các thành phố đầu tư nhiều hơn vào giao thông công cộng hiệu quả, ùn tắc sẽ <strong class="vocab-highlight-vi">giảm đáng kể</strong>."`
                }
            },
            {
                phrase: { en: '“If I were to speculate, I’d suggest that it probably has something to do with...”', vi: '“Nếu để suy đoán, tôi cho rằng nó có lẽ liên quan đến…”' },
                sampleSpeech: { en: 'Globalization and the pervasive influence of modern media.', vi: 'Toàn cầu hóa và ảnh hưởng sâu rộng của truyền thông hiện đại.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Why are some traditional customs disappearing?"</b><br/><br/>
                         💬 <b>Candidate:</b> "That's a sad reality. If I were to <strong class="vocab-highlight-en">speculate</strong>, I’d suggest that it probably has something to do with globalization. The <strong class="vocab-highlight-en">pervasive influence</strong> of Western media often makes local traditions seem <strong class="vocab-highlight-en">old-fashioned</strong> to the younger generation."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Tại sao một số phong tục truyền thống đang biến mất?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Đó là một thực tế đáng buồn. Nếu để <strong class="vocab-highlight-vi">suy đoán</strong>, tôi cho rằng nó có lẽ liên quan đến toàn cầu hóa. <strong class="vocab-highlight-vi">Ảnh hưởng sâu rộng</strong> của truyền thông phương Tây thường làm cho các truyền thống địa phương có vẻ <strong class="vocab-highlight-vi">lỗi thời</strong> đối với thế hệ trẻ."`
                }
            },
            {
                phrase: { en: '“Drawing from my own experience, I can say that...”', vi: '“Rút ra từ kinh nghiệm của bản thân, tôi có thể nói rằng…”' },
                sampleSpeech: { en: 'The process is incredibly rewarding, especially when you start communicating with native speakers.', vi: 'Quá trình này vô cùng bổ ích, đặc biệt là khi bạn bắt đầu giao tiếp được với người bản xứ.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Is it difficult to learn a new language?"</b><br/><br/>
                         💬 <b>Candidate:</b> "It can be a challenge. Drawing from my own experience, I can say that while it requires immense <strong class="vocab-highlight-en">dedication</strong>, the process is incredibly <strong class="vocab-highlight-en">rewarding</strong>. The moment you start communicating with native speakers is truly <strong class="vocab-highlight-en">priceless</strong>."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Học một ngôn ngữ mới có khó không?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Đó có thể là một thử thách. Rút ra từ kinh nghiệm của bản thân, tôi có thể nói rằng mặc dù nó đòi hỏi sự <strong class="vocab-highlight-vi">cống hiến</strong> rất lớn, quá trình này vô cùng <strong class="vocab-highlight-vi">bổ ích</strong>. Khoảnh khắc bạn bắt đầu giao tiếp được với người bản xứ thực sự là <strong class="vocab-highlight-vi">vô giá</strong>."`
                }
            },
            {
                phrase: { en: '“That’s a complex topic, and my view is that it cannot be boiled down to a single answer.”', vi: '“Đó là một chủ đề phức tạp, và quan điểm của tôi là nó không thể được tóm gọn trong một câu trả lời duy nhất.”' },
                sampleSpeech: { en: 'It’s a combination of hard work, perseverance, and a little bit of luck.', vi: 'Đó là sự kết hợp của làm việc chăm chỉ, sự kiên trì và một chút may mắn.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What is the most important factor for success?"</b><br/><br/>
                         💬 <b>Candidate:</b> "That’s a complex topic, and my view is that it cannot be <strong class="vocab-highlight-en">boiled down to</strong> a single answer. It’s a combination of relentless hard work, <strong class="vocab-highlight-en">perseverance</strong> through failure, and often, a bit of luck or being in the right place at the right time."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Yếu tố quan trọng nhất để thành công là gì?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Đó là một chủ đề phức tạp, và quan điểm của tôi là nó không thể được <strong class="vocab-highlight-vi">tóm gọn trong</strong> một câu trả lời duy nhất. Đó là sự kết hợp của làm việc chăm chỉ không ngừng, sự <strong class="vocab-highlight-vi">kiên trì</strong> vượt qua thất bại, và thường là một chút may mắn hoặc ở đúng nơi vào đúng thời điểm."`
                }
            },
            {
                phrase: { en: '“While I’m no expert on the matter, my impression is that...”', vi: '“Dù tôi không phải là chuyên gia về vấn đề này, ấn tượng của tôi là…”' },
                sampleSpeech: { en: 'Investing in renewable energy and promoting sustainable practices are two crucial first steps.', vi: 'Đầu tư vào năng lượng tái tạo và thúc đẩy các hoạt động bền vững là hai bước đầu tiên quan trọng.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What should governments do to combat climate change?"</b><br/><br/>
                         💬 <b>Candidate:</b> "That\'s a huge challenge. While I’m no expert, my impression is that they must lead the way. Investing heavily in <strong class="vocab-highlight-en">renewable energy</strong> and promoting <strong class="vocab-highlight-en">sustainable practices</strong> through legislation are two <strong class="vocab-highlight-en">crucial</strong> first steps."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Chính phủ nên làm gì để chống biến đổi khí hậu?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Đó là một thách thức lớn. Dù tôi không phải là chuyên gia, ấn tượng của tôi là họ phải đi đầu. Đầu tư mạnh mẽ vào <strong class="vocab-highlight-vi">năng lượng tái tạo</strong> và thúc đẩy các <strong class="vocab-highlight-vi">hoạt động bền vững</strong> thông qua luật pháp là hai bước đầu tiên <strong class="vocab-highlight-vi">quan trọng</strong> mà họ phải thực hiện."`
                }
            },
            {
                phrase: { en: '“Let me rephrase the question to make sure I understand: you’re asking about...?”', vi: '“Để tôi diễn đạt lại câu hỏi để chắc chắn tôi hiểu: bạn đang hỏi về…?”' },
                sampleSpeech: { en: 'How tourism affects local traditions, is that correct? Well, I believe it has both positive and negative effects.', vi: 'Việc du lịch ảnh hưởng đến truyền thống địa phương như thế nào, có đúng không ạ? Vâng, tôi tin rằng nó có cả tác động tích cực và tiêu cực.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What do you think about the cultural impact of international tourism?"</b><br/><br/>
                         💬 <b>Candidate:</b> "Let me rephrase that: you’re asking how tourism affects local traditions, correct? Well, I believe it’s a <strong class="vocab-highlight-en">double-edged sword</strong>. It can bring money to <strong class="vocab-highlight-en">preserve</strong> heritage sites, but it can also <strong class="vocab-highlight-en">dilute</strong> authentic cultural practices."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Bạn nghĩ gì về tác động văn hóa của du lịch quốc tế?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Để tôi diễn đạt lại: bạn đang hỏi việc du lịch ảnh hưởng đến truyền thống địa phương như thế nào, đúng không? Vâng, tôi tin rằng đó là một <strong class="vocab-highlight-vi">con dao hai lưỡi</strong>. Nó có thể mang lại tiền để <strong class="vocab-highlight-vi">bảo tồn</strong> các di sản, nhưng cũng có thể <strong class="vocab-highlight-vi">làm loãng đi</strong> các thực hành văn hóa đích thực."`
                }
            },
            {
                phrase: { en: '“Hypothetically speaking, if we were to consider..., then my answer would be...”', vi: '“Nói một cách giả định, nếu chúng ta xem xét..., thì câu trả lời của tôi sẽ là…”' },
                sampleSpeech: { en: 'Communication and access to information would be far more difficult, so our lives would not be better.', vi: 'Việc giao tiếp và truy cập thông tin sẽ khó khăn hơn rất nhiều, vì vậy cuộc sống của chúng ta sẽ không tốt hơn.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Would our lives be better without the internet?"</b><br/><br/>
                         💬 <b>Candidate:</b> "That\'s an interesting <strong class="vocab-highlight-en">thought experiment</strong>. Hypothetically speaking, if we were to consider a world without it, communication and <strong class="vocab-highlight-en">access to information</strong> would be far more difficult. We would lose a huge tool for learning and global connection. So, my answer would be that our lives would not be better <strong class="vocab-highlight-en">overall</strong>."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Cuộc sống của chúng ta có tốt hơn nếu không có internet không?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Đó là một <strong class="vocab-highlight-vi">thí nghiệm tư duy</strong> thú vị. Nói một cách giả định, nếu chúng ta xem xét một thế giới không có nó, việc giao tiếp và <strong class="vocab-highlight-vi">truy cập thông tin</strong> sẽ khó khăn hơn rất nhiều. Chúng ta sẽ mất đi một công cụ khổng lồ cho việc học và kết nối toàn cầu. Vì vậy, câu trả lời của tôi sẽ là cuộc sống của chúng ta sẽ không tốt hơn <strong class="vocab-highlight-vi">về tổng thể</strong>."`
                }
            },
            {
                phrase: { en: '“It’s challenging to generalize, but a common perception in my culture is that...”', vi: '“Thật khó để khái quát hóa, nhưng một nhận thức chung trong văn hóa của tôi là…”' },
                sampleSpeech: { en: 'The elderly should be deeply respected for their wisdom and experience.', vi: 'Người cao tuổi nên được tôn trọng sâu sắc vì trí tuệ và kinh nghiệm của họ.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What is the attitude towards aging in your country?"</b><br/><br/>
                         💬 <b>Candidate:</b> "It’s challenging to <strong class="vocab-highlight-en">generalize</strong>, but a common perception is that the elderly should be deeply respected for their <strong class="vocab-highlight-en">wisdom</strong>. Families often live in <strong class="vocab-highlight-en">multi-generational</strong> households, and taking care of one's parents is a fundamental duty."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Thái độ đối với sự lão hóa ở nước bạn như thế nào?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Thật khó để <strong class="vocab-highlight-vi">khái quát hóa</strong>, nhưng một nhận thức chung là người cao tuổi nên được tôn trọng sâu sắc vì <strong class="vocab-highlight-vi">trí tuệ</strong> của họ. Các gia đình thường sống trong các hộ gia đình <strong class="vocab-highlight-vi">nhiều thế hệ</strong>, và việc chăm sóc cha mẹ được coi là một nghĩa vụ cơ bản."`
                }
            },
        ]
    },
    {
        id: 2,
        title: 'Lặp từ vựng',
        situation: '🔁 Bạn lặp đi lặp lại một từ hoặc một cụm từ nhiều lần (ví dụ: "I think", "very good", "interesting").',
        solution65: {
            en: 'Use simple synonyms to replace the repeated words.',
            vi: 'Sử dụng các từ đồng nghĩa đơn giản để thay thế các từ bị lặp.'
        },
        solution75: {
            en: 'Employ a wide range of synonyms and paraphrasing techniques to demonstrate lexical flexibility.',
            vi: 'Sử dụng một loạt các từ đồng nghĩa và kỹ thuật diễn giải để thể hiện sự linh hoạt trong vốn từ vựng.'
        },
        examples65: [
            {
                phrase: { en: 'Instead of "good", try "nice", "great", "fine".', vi: 'Thay vì "good", hãy thử "nice", "great", "fine".' },
                sampleSpeech: { en: 'The weather was really nice, so we had a great time at the park. Everything was fine.', vi: 'Thời tiết rất đẹp, vì vậy chúng tôi đã có một khoảng thời gian tuyệt vời ở công viên. Mọi thứ đều ổn.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "How was your weekend?"</b><br/><br/>
                         💬 <b>Candidate:</b> "It was <strong class="vocab-highlight-en">great</strong>, thank you. The weather on Saturday was really <strong class="vocab-highlight-en">nice</strong>, so my friends and I had a fantastic time at the park. Overall, the weekend was <strong class="vocab-highlight-en">fine</strong>, very relaxing."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Cuối tuần của bạn thế nào?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Rất <strong class="vocab-highlight-vi">tuyệt</strong>, cảm ơn bạn. Thời tiết hôm thứ Bảy rất <strong class="vocab-highlight-vi">đẹp</strong>, vì vậy tôi và bạn bè đã có một khoảng thời gian tuyệt vời ở công viên. Nhìn chung, cuối tuần <strong class="vocab-highlight-vi">ổn</strong>, rất thư giãn."`
                }
            },
            {
                phrase: { en: 'For "interesting", use "fun", "cool", "exciting".', vi: 'Với "interesting", hãy dùng "fun", "cool", "exciting".' },
                sampleSpeech: { en: 'The party was really fun. They played some cool music, and the whole atmosphere was exciting.', vi: 'Bữa tiệc thật vui. Họ đã chơi một vài bản nhạc rất tuyệt, và toàn bộ không khí thật sôi động.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Did you enjoy the music festival?"</b><br/><br/>
                         💬 <b>Candidate:</b> "Yes, it was a lot of <strong class="vocab-highlight-en">fun</strong>. They had some <strong class="vocab-highlight-en">cool</strong> bands from different countries. The final performance was especially <strong class="vocab-highlight-en">exciting</strong>, with a huge fireworks display."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Bạn có thích lễ hội âm nhạc không?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Có, nó rất <strong class="vocab-highlight-vi">vui</strong>. Họ có một số ban nhạc rất <strong class="vocab-highlight-vi">tuyệt</strong> từ các quốc gia khác nhau. Màn trình diễn cuối cùng đặc biệt <strong class="vocab-highlight-vi">sôi động</strong>, với một màn trình diễn pháo hoa lớn."`
                }
            },
            {
                phrase: { en: 'Instead of "I think", say "In my opinion" or "I believe".', vi: 'Thay vì "I think", hãy nói "In my opinion" hoặc "I believe".' },
                sampleSpeech: { en: 'In my opinion, learning English is very important. I believe it opens up many new opportunities.', vi: 'Theo tôi, học tiếng Anh rất quan trọng. Tôi tin rằng nó mở ra nhiều cơ hội mới.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Should all students learn a foreign language?"</b><br/><br/>
                         💬 <b>Candidate:</b> "Yes, definitely. <strong class="vocab-highlight-en">In my opinion</strong>, learning English is very important in today’s globalized world. <strong class="vocab-highlight-en">I believe</strong> it not only helps with career prospects but also allows us to understand different cultures."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Tất cả học sinh có nên học ngoại ngữ không?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Vâng, chắc chắn rồi. <strong class="vocab-highlight-vi">Theo tôi</strong>, học tiếng Anh rất quan trọng trong thế giới toàn cầu hóa ngày nay. <strong class="vocab-highlight-vi">Tôi tin rằng</strong> nó không chỉ giúp ích cho triển vọng nghề nghiệp mà còn cho phép chúng ta hiểu các nền văn hóa khác nhau."`
                }
            },
            {
                phrase: { en: 'For "bad", try "not very good" or "terrible".', vi: 'Với "bad", hãy thử "not very good" hoặc "terrible".' },
                sampleSpeech: { en: 'The traffic was terrible this morning. The delay was not very good for my schedule.', vi: 'Giao thông sáng nay thật kinh khủng. Sự chậm trễ đó không tốt chút nào cho lịch trình của tôi.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "How was your journey to work today?"</b><br/><br/>
                         💬 <b>Candidate:</b> "Oh, it was <strong class="vocab-highlight-en">terrible</strong>. The traffic jam on the main highway was awful. I was stuck for nearly an hour, which was <strong class="vocab-highlight-en">not very good</strong> for my schedule as I had an early meeting."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Chuyến đi làm của bạn hôm nay thế nào?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Ồ, nó thật <strong class="vocab-highlight-vi">kinh khủng</strong>. Vụ tắc đường trên đường cao tốc chính thật tồi tệ. Tôi bị kẹt gần một giờ, điều này <strong class="vocab-highlight-vi">không tốt chút nào</strong> cho lịch trình của tôi vì tôi có một cuộc họp sớm."`
                }
            },
            {
                phrase: { en: 'Instead of "happy", use "pleased" or "glad".', vi: 'Thay vì "happy", hãy dùng "pleased" hoặc "glad".' },
                sampleSpeech: { en: 'I was very pleased with my exam results. I’m glad all my hard work paid off.', vi: 'Tôi rất hài lòng với kết quả thi của mình. Tôi mừng vì mọi nỗ lực của mình đã được đền đáp.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "How did you feel after you finished your exams?"</b><br/><br/>
                         💬 <b>Candidate:</b> "I was so relieved. When I got my results, I was very <strong class="vocab-highlight-en">pleased</strong>. I’m <strong class="vocab-highlight-en">glad</strong> all my hard work paid off in the end. It was a great feeling."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Bạn cảm thấy thế nào sau khi thi xong?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Tôi đã rất nhẹ nhõm. Khi nhận được kết quả, tôi đã rất <strong class="vocab-highlight-vi">hài lòng</strong>. Tôi <strong class="vocab-highlight-vi">mừng</strong> vì mọi nỗ lực của mình cuối cùng đã được đền đáp. Đó là một cảm giác tuyệt vời."`
                }
            },
            {
                phrase: { en: 'For "sad", say "unhappy" or "a bit down".', vi: 'Với "sad", hãy nói "unhappy" hoặc "a bit down".' },
                sampleSpeech: { en: 'She seemed a bit down yesterday. I think she was unhappy about the news.', vi: 'Hôm qua cô ấy có vẻ hơi buồn. Tôi nghĩ cô ấy không vui về tin tức đó.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "How is Maria doing? I heard her team lost the match."</b><br/><br/>
                         💬 <b>Candidate:</b> "Yes, she was <strong class="vocab-highlight-en">a bit down</strong> yesterday evening. I think she was really <strong class="vocab-highlight-en">unhappy</strong> about the final score because they had trained so hard for it."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Maria thế nào rồi? Tôi nghe nói đội của cô ấy đã thua trận."</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Vâng, cô ấy <strong class="vocab-highlight-vi">hơi buồn</strong> vào tối hôm qua. Tôi nghĩ cô ấy thực sự <strong class="vocab-highlight-vi">không vui</strong> về tỷ số cuối cùng vì họ đã tập luyện rất chăm chỉ cho nó."`
                }
            },
            {
                phrase: { en: 'Instead of "big", try "large" or "huge".', vi: 'Thay vì "big", hãy thử "large" hoặc "huge".' },
                sampleSpeech: { en: 'They live in a large house with a huge garden in the back.', vi: 'Họ sống trong một ngôi nhà lớn với một khu vườn khổng lồ ở phía sau.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Tell me about your dream house."</b><br/><br/>
                         💬 <b>Candidate:</b> "My dream house would be near the sea. It would be a <strong class="vocab-highlight-en">large</strong> house, with enough space for my whole family. Most importantly, it would have a <strong class="vocab-highlight-en">huge</strong> garden where I could grow flowers and vegetables."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Hãy kể cho tôi nghe về ngôi nhà mơ ước của bạn."</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Ngôi nhà mơ ước của tôi sẽ ở gần biển. Đó sẽ là một ngôi nhà <strong class="vocab-highlight-vi">lớn</strong>, có đủ không gian cho cả gia đình tôi. Quan trọng nhất, nó sẽ có một khu vườn <strong class="vocab-highlight-vi">khổng lồ</strong> nơi tôi có thể trồng hoa và rau."`
                }
            },
            {
                phrase: { en: 'For "like", use "enjoy" or "I’m keen on".', vi: 'Với "like", hãy dùng "enjoy" hoặc "I’m keen on".' },
                sampleSpeech: { en: 'I really enjoy reading. In particular, I’m keen on historical novels.', vi: 'Tôi rất thích đọc sách. Đặc biệt, tôi rất say mê tiểu thuyết lịch sử.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What do you do in your free time?"</b><br/><br/>
                         💬 <b>Candidate:</b> "Well, I have a few hobbies. I really <strong class="vocab-highlight-en">enjoy</strong> reading to relax. In particular, <strong class="vocab-highlight-en">I’m keen on</strong> historical novels because I love learning about the past in an entertaining way."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Bạn làm gì vào thời gian rảnh?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "À, tôi có một vài sở thích. Tôi thực sự <strong class="vocab-highlight-vi">thích</strong> đọc sách để thư giãn. Đặc biệt, <strong class="vocab-highlight-vi">tôi rất say mê</strong> tiểu thuyết lịch sử vì tôi thích tìm hiểu về quá khứ một cách giải trí."`
                }
            },
            {
                phrase: { en: 'Instead of "beautiful", say "pretty" or "lovely".', vi: 'Thay vì "beautiful", hãy nói "pretty" hoặc "lovely".' },
                sampleSpeech: { en: 'It was a lovely day, and the view from the mountaintop was very pretty.', vi: 'Đó là một ngày đẹp trời, và quang cảnh từ đỉnh núi rất xinh đẹp.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Tell me about a time you enjoyed being in nature."</b><br/><br/>
                         💬 <b>Candidate:</b> "Last spring, I went hiking. It was a <strong class="vocab-highlight-en">lovely</strong> day, perfect for a walk. When we reached the top, the view of the valley was very <strong class="vocab-highlight-en">pretty</strong>. It was so peaceful."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Hãy kể cho tôi nghe về một lần bạn tận hưởng thiên nhiên."</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Mùa xuân năm ngoái, tôi đã đi bộ đường dài. Đó là một ngày <strong class="vocab-highlight-vi">đẹp trời</strong>, hoàn hảo cho một cuộc đi dạo. Khi chúng tôi lên đến đỉnh, quang cảnh của thung lũng rất <strong class="vocab-highlight-vi">xinh đẹp</strong>. Thật là yên bình."`
                }
            },
            {
                phrase: { en: 'For "important", try "necessary" or "key".', vi: 'Với "important", hãy thử "necessary" hoặc "key".' },
                sampleSpeech: { en: 'Good communication is a key skill. It’s necessary for success in any team.', vi: 'Giao tiếp tốt là một kỹ năng then chốt. Nó cần thiết cho sự thành công trong bất kỳ đội nhóm nào.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What skills are needed to be a good manager?"</b><br/><br/>
                         💬 <b>Candidate:</b> "There are many, but I think good communication is a <strong class="vocab-highlight-en">key</strong> skill. It’s absolutely <strong class="vocab-highlight-en">necessary</strong> for a manager to be able to explain tasks clearly and listen to their team to ensure success."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Những kỹ năng nào cần thiết để trở thành một nhà quản lý giỏi?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Có rất nhiều, nhưng tôi nghĩ giao tiếp tốt là một kỹ năng <strong class="vocab-highlight-vi">then chốt</strong>. Hoàn toàn <strong class="vocab-highlight-vi">cần thiết</strong> cho một nhà quản lý để có thể giải thích công việc một cách rõ ràng và lắng nghe đội nhóm của mình để đảm bảo thành công."`
                }
            },
        ],
        examples75: [
            {
                phrase: { en: 'For "good", use "excellent", "outstanding", "superb", "exceptional".', vi: 'Với "good", hãy dùng "excellent", "outstanding", "superb", "exceptional".' },
                sampleSpeech: { en: 'The service at that restaurant was exceptional. From the food to the ambiance, everything was absolutely superb.', vi: 'Dịch vụ tại nhà hàng đó thật xuất sắc. Từ món ăn đến không khí, mọi thứ đều tuyệt hảo.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Tell me about a restaurant you would recommend."</b><br/><br/>
                         💬 <b>Candidate:</b> "I recently went to a new Italian place downtown. The service was <strong class="vocab-highlight-en">exceptional</strong>; the staff were so attentive. And the food was <strong class="vocab-highlight-en">outstanding</strong>. I had the seafood pasta, and it was absolutely <strong class="vocab-highlight-en">superb</strong>. I would highly recommend it."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Hãy kể cho tôi nghe về một nhà hàng mà bạn muốn giới thiệu."</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Gần đây tôi đã đến một quán ăn Ý mới ở trung tâm thành phố. Dịch vụ thật <strong class="vocab-highlight-vi">xuất sắc</strong>; nhân viên rất chu đáo. Và thức ăn thì <strong class="vocab-highlight-vi">nổi bật</strong>. Tôi đã ăn mì ống hải sản, và nó <strong class="vocab-highlight-vi">tuyệt hảo</strong>. Tôi chắc chắn sẽ giới thiệu nó."`
                }
            },
            {
                phrase: { en: 'Instead of "interesting", say "fascinating", "captivating", "thought-provoking".', vi: 'Thay vì "interesting", hãy nói "fascinating", "captivating", "thought-provoking".' },
                sampleSpeech: { en: 'I just finished a captivating documentary. It raised some thought-provoking questions about our future.', vi: 'Tôi vừa xem xong một bộ phim tài liệu hấp dẫn. Nó đã đặt ra một số câu hỏi kích thích tư duy về tương lai của chúng ta.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What have you watched on TV recently?"</b><br/><br/>
                         💬 <b>Candidate:</b> "I watched a <strong class="vocab-highlight-en">fascinating</strong> documentary about the deep sea. The visuals were <strong class="vocab-highlight-en">captivating</strong>, and it raised some truly <strong class="vocab-highlight-en">thought-provoking</strong> questions about the undiscovered life on our own planet."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Gần đây bạn đã xem gì trên TV?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Tôi đã xem một bộ phim tài liệu <strong class="vocab-highlight-vi">hấp dẫn</strong> về biển sâu. Hình ảnh rất <strong class="vocab-highlight-vi">lôi cuốn</strong>, và nó đã đặt ra một số câu hỏi thực sự <strong class="vocab-highlight-vi">kích thích tư duy</strong> về sự sống chưa được khám phá trên hành tinh của chúng ta."`
                }
            },
            {
                phrase: { en: 'For "I think", try "From my perspective", "As I see it", "I reckon that...".', vi: 'Với "I think", hãy thử "From my perspective", "As I see it", "I reckon that...".' },
                sampleSpeech: { en: 'As I see it, technology has both pros and cons. From my perspective, we must focus on managing its negative impacts.', vi: 'Theo tôi thấy, công nghệ có cả ưu và nhược điểm. Theo quan điểm của tôi, chúng ta phải tập trung vào việc quản lý các tác động tiêu cực của nó.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Is technology good or bad for society?"</b><br/><br/>
                         💬 <b>Candidate:</b> "Well, <strong class="vocab-highlight-en">as I see it</strong>, it’s not that simple. <strong class="vocab-highlight-en">From my perspective</strong>, the key challenge is not the technology itself, but how we use it. <strong class="vocab-highlight-en">I reckon that</strong> we need stronger regulations to manage its negative impacts."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Công nghệ tốt hay xấu cho xã hội?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "À, <strong class="vocab-highlight-vi">theo tôi thấy</strong>, nó không đơn giản như vậy. <strong class="vocab-highlight-vi">Theo quan điểm của tôi</strong>, thách thức chính không phải là bản thân công nghệ, mà là cách chúng ta sử dụng nó. <strong class="vocab-highlight-vi">Tôi cho rằng</strong> chúng ta cần những quy định chặt chẽ hơn để quản lý các tác động tiêu cực của nó."`
                }
            },
            {
                phrase: { en: 'Instead of "bad", use "dreadful", "abysmal", "substandard".', vi: 'Thay vì "bad", hãy dùng "dreadful", "abysmal", "substandard".' },
                sampleSpeech: { en: 'The quality of the product was substandard. In fact, its performance was abysmal.', vi: 'Chất lượng sản phẩm dưới tiêu chuẩn. Trên thực tế, hiệu suất của nó rất tồi tệ.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Have you ever complained about a product?"</b><br/><br/>
                         💬 <b>Candidate:</b> "Yes, I once bought a phone that stopped working after a week. The quality was clearly <strong class="vocab-highlight-en">substandard</strong>. Its battery performance was <strong class="vocab-highlight-en">abysmal</strong>, and the customer service was <strong class="vocab-highlight-en">dreadful</strong>."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Bạn đã bao giờ phàn nàn về một sản phẩm chưa?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Có, tôi đã từng mua một chiếc điện thoại ngừng hoạt động sau một tuần. Chất lượng rõ ràng là <strong class="vocab-highlight-vi">dưới tiêu chuẩn</strong>. Hiệu suất pin của nó rất <strong class="vocab-highlight-vi">tồi tệ</strong>, và dịch vụ khách hàng thì <strong class="vocab-highlight-vi">kinh khủng</strong>."`
                }
            },
            {
                phrase: { en: 'For "happy", say "delighted", "thrilled", "on cloud nine".', vi: 'Với "happy", hãy nói "delighted", "thrilled", "on cloud nine".' },
                sampleSpeech: { en: 'She was absolutely thrilled when she received the award. She told me she was on cloud nine all day.', vi: 'Cô ấy đã vô cùng vui mừng khi nhận được giải thưởng. Cô ấy nói với tôi rằng cô ấy đã ở trên chín tầng mây cả ngày.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Tell me about a time you received good news."</b><br/><br/>
                         💬 <b>Candidate:</b> "I remember when I got the scholarship. I was absolutely <strong class="vocab-highlight-en">thrilled</strong>. My parents were so <strong class="vocab-highlight-en">delighted</strong>, too. To be honest, I was <strong class="vocab-highlight-en">on cloud nine</strong> for the rest of the week."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Hãy kể cho tôi nghe về một lần bạn nhận được tin tốt."</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Tôi nhớ khi tôi nhận được học bổng. Tôi đã vô cùng <strong class="vocab-highlight-vi">vui mừng</strong>. Bố mẹ tôi cũng rất <strong class="vocab-highlight-vi">vui sướng</strong>. Thú thật, tôi đã <strong class="vocab-highlight-vi">ở trên chín tầng mây</strong> trong suốt phần còn lại của tuần."`
                }
            },
            {
                phrase: { en: 'Instead of "sad", use "devastated", "heartbroken", "melancholy".', vi: 'Thay vì "sad", hãy dùng "devastated", "heartbroken", "melancholy".' },
                sampleSpeech: { en: 'He was heartbroken after hearing the news. A melancholy mood filled the room.', vi: 'Anh ấy đã tan nát cõi lòng sau khi nghe tin. Một không khí u sầu bao trùm căn phòng.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Can a place make you feel sad?"</b><br/><br/>
                         💬 <b>Candidate:</b> "Absolutely. I once visited an abandoned hospital. I felt a very <strong class="vocab-highlight-en">melancholy</strong> atmosphere there. I wasn't <strong class="vocab-highlight-en">devastated</strong>, but it left a somber impression on me. I wouldn't say I was <strong class="vocab-highlight-en">heartbroken</strong>, but it was sad."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Một nơi có thể khiến bạn cảm thấy buồn không?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Chắc chắn rồi. Tôi đã từng đến thăm một bệnh viện bỏ hoang. Tôi cảm thấy một không khí rất <strong class="vocab-highlight-vi">u sầu</strong> ở đó. Tôi không <strong class="vocab-highlight-vi">suy sụp</strong>, nhưng nó đã để lại một ấn tượng u ám trong tôi. Tôi sẽ không nói là mình <strong class="vocab-highlight-vi">tan nát cõi lòng</strong>, nhưng nó thật buồn."`
                }
            },
            {
                phrase: { en: 'For "big", try "enormous", "massive", "colossal".', vi: 'Với "big", hãy thử "enormous", "massive", "colossal".' },
                sampleSpeech: { en: 'The new shopping mall is colossal. It has a massive parking lot to accommodate thousands of cars.', vi: 'Trung tâm mua sắm mới thật khổng lồ. Nó có một bãi đậu xe rộng lớn để chứa hàng ngàn chiếc xe hơi.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Describe an impressive building in your city."</b><br/><br/>
                         💬 <b>Candidate:</b> "The new national library is a <strong class="vocab-highlight-en">colossal</strong> structure. The main reading room is an <strong class="vocab-highlight-en">enormous</strong> space with a <strong class="vocab-highlight-en">massive</strong> glass dome. It's an architectural marvel."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Hãy miêu tả một tòa nhà ấn tượng trong thành phố của bạn."</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Thư viện quốc gia mới là một công trình <strong class="vocab-highlight-vi">khổng lồ</strong>. Phòng đọc chính là một không gian <strong class="vocab-highlight-vi">rộng lớn</strong> với một mái vòm kính <strong class="vocab-highlight-vi">đồ sộ</strong>. Đó thực sự là một kỳ quan kiến trúc."`
                }
            },
            {
                phrase: { en: 'Instead of "like", say "I’m passionate about", "I have a fondness for...".', vi: 'Thay vì "like", hãy nói "I’m passionate about", "I have a fondness for...".' },
                sampleSpeech: { en: 'I have a fondness for classical music. In fact, I’m passionate about learning to play the violin.', vi: 'Tôi có một sự yêu thích đặc biệt đối với nhạc cổ điển. Thực tế, tôi rất đam mê học chơi đàn violin.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What kind of music do you enjoy?"</b><br/><br/>
                         💬 <b>Candidate:</b> "I have a particular <strong class="vocab-highlight-en">fondness for</strong> classical music. The compositions are so complex. In fact, <strong class="vocab-highlight-en">I’m quite passionate about</strong> learning to play the violin, though I'm still a beginner."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Bạn thích loại nhạc nào?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Tôi có một <strong class="vocab-highlight-vi">sự yêu thích đặc biệt đối với</strong> nhạc cổ điển. Các bản nhạc rất phức tạp. Thực tế, <strong class="vocab-highlight-vi">tôi khá đam mê</strong> học chơi đàn violin, mặc dù tôi vẫn chỉ là người mới bắt đầu."`
                }
            },
            {
                phrase: { en: 'For "beautiful", use "stunning", "gorgeous", "exquisite".', vi: 'Với "beautiful", hãy dùng "stunning", "gorgeous", "exquisite".' },
                sampleSpeech: { en: 'The bride looked stunning in her exquisite wedding gown. Everyone said she was gorgeous.', vi: 'Cô dâu trông thật lộng lẫy trong bộ váy cưới tinh xảo của mình. Mọi người đều nói cô ấy thật xinh đẹp.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Tell me about a wedding you attended."</b><br/><br/>
                         💬 <b>Candidate:</b> "I went to my cousin's wedding last month. The bride looked absolutely <strong class="vocab-highlight-en">stunning</strong>. She wore an <strong class="vocab-highlight-en">exquisite</strong> white gown. Everyone agreed she was the most <strong class="vocab-highlight-en">gorgeous</strong> bride they had ever seen."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Hãy kể cho tôi nghe về một đám cưới bạn đã tham dự."</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Tôi đã đi đám cưới của em họ tôi vào tháng trước. Cô dâu trông hoàn toàn <strong class="vocab-highlight-vi">lộng lẫy</strong>. Cô ấy mặc một chiếc váy trắng <strong class="vocab-highlight-vi">tinh xảo</strong>. Mọi người đều đồng ý rằng cô ấy là cô dâu <strong class="vocab-highlight-vi">xinh đẹp</strong> nhất họ từng thấy."`
                }
            },
            {
                phrase: { en: 'Instead of "important", say "crucial", "vital", "essential", "indispensable".', vi: 'Thay vì "important", hãy dùng "crucial", "vital", "essential", "indispensable".' },
                sampleSpeech: { en: 'Effective communication is indispensable in any team. It’s a vital component for success.', vi: 'Giao tiếp hiệu quả là không thể thiếu trong bất kỳ đội nhóm nào. Đó là một thành phần quan trọng sống còn cho sự thành công.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What is the key to a successful team?"</b><br/><br/>
                         💬 <b>Candidate:</b> "I believe trust is <strong class="vocab-highlight-en">essential</strong>. However, effective communication is perhaps the most <strong class="vocab-highlight-en">vital</strong> component. It is an <strong class="vocab-highlight-en">indispensable</strong> skill for any successful team. Therefore, it is <strong class="vocab-highlight-en">crucial</strong>."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Chìa khóa cho một đội nhóm thành công là gì?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Tôi tin rằng sự tin tưởng là <strong class="vocab-highlight-vi">thiết yếu</strong>. Tuy nhiên, giao tiếp hiệu quả có lẽ là thành phần <strong class="vocab-highlight-vi">sống còn</strong> nhất. Nó là một kỹ năng <strong class="vocab-highlight-vi">không thể thiếu</strong> cho bất kỳ đội nhóm thành công nào. Do đó, nó rất <strong class="vocab-highlight-vi">quan trọng</strong>."`
                }
            },
        ]
    }
];