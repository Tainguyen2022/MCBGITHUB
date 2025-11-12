// TOEIC Writing Full Test 9 - Complete Test with All 8 Questions
// Based on the official TOEIC Writing test structure
// Reference: https://www.toeicswt.co.kr/content/TOS/sample/Writing09/testWriDirection.php
// Nội dung chính xác từ trang web chính thức - Test 9

export interface WritingQuestion {
  id: string;
  question: string;
  questionTranslation: string;
  type: 'picture_sentence' | 'email_response' | 'opinion_essay';
  timeLimit: number; // in minutes
  wordCount?: string;
  imageUrl?: string;
  requiredWords?: string[]; // For picture sentences
  emailContent?: {
    from: string;
    to: string;
    subject: string;
    sent: string;
    body: string;
  };
  requirements?: string[]; // For email responses
  prompt?: string; // For opinion essay
  options?: string[]; // For opinion essay with multiple choice
}

export interface ModelAnswer {
  id: string;
  answer: string;
  answerTranslation: string;
  keyPoints: string[];
  wordCount: number;
}

// Full Test 9 - Complete TOEIC Writing Test
export const toeicWritingFullTest9 = {
  id: 'toeic-writing-full-test9',
  title: 'TOEIC Writing Full Test 9',
  titleTranslation: 'TOEIC Writing Full Test 9',
  description: 'Complete TOEIC Writing test with all 8 questions (approximately 1 hour)',
  descriptionTranslation: 'Bài thi TOEIC Writing đầy đủ với tất cả 8 câu hỏi (khoảng 1 giờ)',
  category: 'Full Test',
  level: 'Intermediate',
  questions: [
    // Questions 1-5: Write a sentence based on a picture (Total 8 minutes)
    {
      id: 'test9-q1',
      question: 'Write ONE sentence that is based on a picture. With each picture, you will be given TWO words or phrases that you must use in your sentence. You can change the forms of the words and you can use the words in any order.',
      questionTranslation: 'Viết MỘT câu dựa trên hình ảnh. Với mỗi hình ảnh, bạn sẽ được cung cấp HAI từ hoặc cụm từ mà bạn phải sử dụng trong câu của mình. Bạn có thể thay đổi dạng của các từ và bạn có thể sử dụng các từ theo bất kỳ thứ tự nào.',
      type: 'picture_sentence',
      timeLimit: 8, // 8 minutes for all 5 questions
      imageUrl: 'https://imagesisa.ybmnet.co.kr/platform/exam_ybmnet_co_kr/content/toeicsw/Writing09_Q1.jpg',
      requiredWords: ['customer', 'order']
    },
    {
      id: 'test9-q2',
      question: 'Write ONE sentence that is based on a picture. With each picture, you will be given TWO words or phrases that you must use in your sentence. You can change the forms of the words and you can use the words in any order.',
      questionTranslation: 'Viết MỘT câu dựa trên hình ảnh. Với mỗi hình ảnh, bạn sẽ được cung cấp HAI từ hoặc cụm từ mà bạn phải sử dụng trong câu của mình. Bạn có thể thay đổi dạng của các từ và bạn có thể sử dụng các từ theo bất kỳ thứ tự nào.',
      type: 'picture_sentence',
      timeLimit: 8,
      imageUrl: 'https://imagesisa.ybmnet.co.kr/platform/exam_ybmnet_co_kr/content/toeicsw/Writing09_Q2.jpg',
      requiredWords: ['next to', 'building']
    },
    {
      id: 'test9-q3',
      question: 'Write ONE sentence that is based on a picture. With each picture, you will be given TWO words or phrases that you must use in your sentence. You can change the forms of the words and you can use the words in any order.',
      questionTranslation: 'Viết MỘT câu dựa trên hình ảnh. Với mỗi hình ảnh, bạn sẽ được cung cấp HAI từ hoặc cụm từ mà bạn phải sử dụng trong câu của mình. Bạn có thể thay đổi dạng của các từ và bạn có thể sử dụng các từ theo bất kỳ thứ tự nào.',
      type: 'picture_sentence',
      timeLimit: 8,
      imageUrl: 'https://imagesisa.ybmnet.co.kr/platform/exam_ybmnet_co_kr/content/toeicsw/Writing09_Q3.jpg',
      requiredWords: ['boat', 'and']
    },
    {
      id: 'test9-q4',
      question: 'Write ONE sentence that is based on a picture. With each picture, you will be given TWO words or phrases that you must use in your sentence. You can change the forms of the words and you can use the words in any order.',
      questionTranslation: 'Viết MỘT câu dựa trên hình ảnh. Với mỗi hình ảnh, bạn sẽ được cung cấp HAI từ hoặc cụm từ mà bạn phải sử dụng trong câu của mình. Bạn có thể thay đổi dạng của các từ và bạn có thể sử dụng các từ theo bất kỳ thứ tự nào.',
      type: 'picture_sentence',
      timeLimit: 8,
      imageUrl: 'https://imagesisa.ybmnet.co.kr/platform/exam_ybmnet_co_kr/content/toeicsw/Writing09_Q4.jpg',
      requiredWords: ['while', 'work']
    },
    {
      id: 'test9-q5',
      question: 'Write ONE sentence that is based on a picture. With each picture, you will be given TWO words or phrases that you must use in your sentence. You can change the forms of the words and you can use the words in any order.',
      questionTranslation: 'Viết MỘT câu dựa trên hình ảnh. Với mỗi hình ảnh, bạn sẽ được cung cấp HAI từ hoặc cụm từ mà bạn phải sử dụng trong câu của mình. Bạn có thể thay đổi dạng của các từ và bạn có thể sử dụng các từ theo bất kỳ thứ tự nào.',
      type: 'picture_sentence',
      timeLimit: 8,
      imageUrl: 'https://imagesisa.ybmnet.co.kr/platform/exam_ybmnet_co_kr/content/toeicsw/Writing09_Q5.jpg',
      requiredWords: ['decide', 'whether']
    },
    // Questions 6-7: Respond to a written request (10 minutes each)
    {
      id: 'test9-q6',
      question: 'Read the e-mail and respond to it.',
      questionTranslation: 'Đọc email và trả lời nó.',
      type: 'email_response',
      timeLimit: 10,
      emailContent: {
        from: 'Pierre Garcia, Chestnut Hill Bistro',
        to: 'Emily Ogden',
        subject: 'Menu for your event',
        sent: 'April 12, 12:14 P.M.',
        body: `Dear Ms. Ogden,

Thank you for hiring Chestnut Hill Bistro to cater your next event. To best serve you, we need to know some more about your event and any dietary restrictions that we need to take into account.

Thank you,
Pierre Garcia`
      },
      requirements: ['In your e-mail, provide THREE pieces of information.']
    },
    {
      id: 'test9-q7',
      question: 'Read the e-mail and respond to it.',
      questionTranslation: 'Đọc email và trả lời nó.',
      type: 'email_response',
      timeLimit: 10,
      emailContent: {
        from: 'Roland Donata, Hiring Manager',
        to: 'Elsie Sook',
        subject: 'Office manager position',
        sent: 'January 21, 8:41 A.M.',
        body: `Dear Ms. Sook,

Thanks for your interest in the office manager position at our company. Before providing you with an application, we would first like you to summarize your main qualifications for the position. Could you please explain why you would be successful in this office manager position?

Best,
Roland Donata, Hiring Manager`
      },
      requirements: ['Respond to the e-mail as if you are the job applicant.', 'In your e-mail, give an explanation with THREE details.']
    },
    // Question 8: Write an opinion essay (30 minutes, minimum 300 words)
    {
      id: 'test9-q8',
      question: 'Which of the following would provide the best educational experience for high school students? Choose ONE of the options provided below, and give reasons and examples to support your opinion.',
      questionTranslation: 'Lựa chọn nào sau đây sẽ cung cấp trải nghiệm giáo dục tốt nhất cho học sinh trung học? Chọn MỘT trong các lựa chọn được cung cấp bên dưới, và đưa ra lý do và ví dụ để hỗ trợ ý kiến của bạn.',
      type: 'opinion_essay',
      timeLimit: 30,
      wordCount: 'minimum of 300 words',
      prompt: 'Which of the following would provide the best educational experience for high school students? Choose ONE of the options provided below, and give reasons and examples to support your opinion.',
      options: [
        'Touring a medical clinic',
        'Touring a dairy farm',
        'Touring a clothing factory'
      ]
    }
  ],
  modelAnswers: [
    {
      id: 'ma1',
      answer: 'The customer is placing an order at the restaurant.',
      answerTranslation: 'Khách hàng đang đặt món tại nhà hàng.',
      keyPoints: ['Uses both required words', 'Grammatically correct', 'Relevant to the picture'],
      wordCount: 8
    },
    {
      id: 'ma2',
      answer: 'The car is parked next to the building.',
      answerTranslation: 'Chiếc xe đang đỗ cạnh tòa nhà.',
      keyPoints: ['Uses both required words', 'Grammatically correct', 'Relevant to the picture'],
      wordCount: 7
    },
    {
      id: 'ma3',
      answer: 'There is a boat on the water, and people are enjoying the view.',
      answerTranslation: 'Có một chiếc thuyền trên mặt nước, và mọi người đang tận hưởng cảnh đẹp.',
      keyPoints: ['Uses both required words', 'Grammatically correct', 'Relevant to the picture'],
      wordCount: 11
    },
    {
      id: 'ma4',
      answer: 'The woman is working on her computer while talking on the phone.',
      answerTranslation: 'Người phụ nữ đang làm việc trên máy tính của cô ấy trong khi nói chuyện điện thoại.',
      keyPoints: ['Uses both required words', 'Grammatically correct', 'Relevant to the picture'],
      wordCount: 11
    },
    {
      id: 'ma5',
      answer: 'The team needs to decide whether to proceed with the project.',
      answerTranslation: 'Nhóm cần quyết định xem có nên tiếp tục với dự án hay không.',
      keyPoints: ['Uses both required words', 'Grammatically correct', 'Relevant to the picture'],
      wordCount: 10
    },
    {
      id: 'ma6',
      answer: `Dear Mr. Garcia,

Thank you for your email. I'm happy to provide you with the information you need.

First, the event will be held on May 15th from 6:00 P.M. to 9:00 P.M. at the Grand Ballroom of the Riverside Hotel. We expect approximately 80 guests to attend.

Second, regarding dietary restrictions, we have several guests with specific needs. Three guests are vegetarian, two have gluten allergies, and one guest has a severe nut allergy. We would appreciate it if you could accommodate these dietary requirements.

Third, the event is a corporate networking dinner, so we would like a mix of appetizers, main courses, and desserts. We prefer a combination of both hot and cold dishes to provide variety for our guests.

Please let me know if you need any additional information.

Best regards,
Emily Ogden`,
      answerTranslation: `Kính gửi Ông Garcia,

Cảm ơn bạn đã gửi email. Tôi rất vui được cung cấp thông tin bạn cần.

Đầu tiên, sự kiện sẽ được tổ chức vào ngày 15 tháng 5 từ 6:00 chiều đến 9:00 tối tại Phòng Khiêu vũ Lớn của Khách sạn Riverside. Chúng tôi dự kiến khoảng 80 khách sẽ tham dự.

Thứ hai, về các hạn chế về chế độ ăn uống, chúng tôi có một số khách với nhu cầu cụ thể. Ba khách là người ăn chay, hai người bị dị ứng gluten, và một khách bị dị ứng hạt nghiêm trọng. Chúng tôi sẽ đánh giá cao nếu bạn có thể đáp ứng các yêu cầu về chế độ ăn uống này.

Thứ ba, sự kiện là một bữa tối giao lưu doanh nghiệp, vì vậy chúng tôi muốn có sự kết hợp giữa món khai vị, món chính và món tráng miệng. Chúng tôi ưa thích sự kết hợp giữa cả món nóng và món lạnh để cung cấp sự đa dạng cho khách của chúng tôi.

Vui lòng cho tôi biết nếu bạn cần thêm thông tin.

Trân trọng,
Emily Ogden`,
      keyPoints: ['Provides THREE pieces of information (event details, dietary restrictions, menu preferences)', 'Professional tone', 'Proper email format', 'Addresses all requirements'],
      wordCount: 145
    },
    {
      id: 'ma7',
      answer: `Dear Mr. Donata,

Thank you for your interest in my application. I am excited about the opportunity to work as an office manager at your company.

I believe I would be successful in this position for three main reasons. First, I have over eight years of experience in administrative management, including five years as an assistant office manager at a similar-sized company. During this time, I successfully managed daily operations, coordinated staff schedules, and handled various administrative tasks efficiently.

Second, I have strong organizational and communication skills that are essential for this role. I am proficient in office software systems, project management tools, and I have a proven track record of improving office efficiency. For example, at my previous position, I implemented a new filing system that reduced document retrieval time by 40%.

Third, I am highly motivated and committed to ensuring smooth office operations. I work well under pressure, can multitask effectively, and I am always willing to go the extra mile to support the team and meet company goals.

I would be grateful for the opportunity to discuss my qualifications further in an interview.

Sincerely,
Elsie Sook`,
      answerTranslation: `Kính gửi Ông Donata,

Cảm ơn bạn đã quan tâm đến đơn đăng ký của tôi. Tôi rất hào hứng về cơ hội làm việc như một quản lý văn phòng tại công ty của bạn.

Tôi tin rằng tôi sẽ thành công trong vị trí này vì ba lý do chính. Đầu tiên, tôi có hơn tám năm kinh nghiệm trong quản lý hành chính, bao gồm năm năm làm trợ lý quản lý văn phòng tại một công ty có quy mô tương tự. Trong thời gian này, tôi đã quản lý thành công các hoạt động hàng ngày, phối hợp lịch trình nhân viên, và xử lý các nhiệm vụ hành chính khác nhau một cách hiệu quả.

Thứ hai, tôi có kỹ năng tổ chức và giao tiếp mạnh mẽ cần thiết cho vai trò này. Tôi thành thạo các hệ thống phần mềm văn phòng, công cụ quản lý dự án, và tôi có một hồ sơ theo dõi đã được chứng minh về việc cải thiện hiệu quả văn phòng. Ví dụ, tại vị trí trước đây của tôi, tôi đã triển khai một hệ thống lưu trữ mới giảm thời gian truy xuất tài liệu xuống 40%.

Thứ ba, tôi rất có động lực và cam kết đảm bảo các hoạt động văn phòng diễn ra suôn sẻ. Tôi làm việc tốt dưới áp lực, có thể đa nhiệm hiệu quả, và tôi luôn sẵn sàng nỗ lực thêm để hỗ trợ nhóm và đạt được mục tiêu công ty.

Tôi sẽ rất biết ơn về cơ hội thảo luận thêm về trình độ của tôi trong một cuộc phỏng vấn.

Trân trọng,
Elsie Sook`,
      keyPoints: ['Gives explanation with THREE details (experience, skills, motivation)', 'Professional tone', 'Proper email format', 'Addresses all requirements'],
      wordCount: 198
    },
    {
      id: 'ma8',
      answer: `I believe that touring a medical clinic would provide the best educational experience for high school students. While all three options offer valuable learning opportunities, a medical clinic visit would be most beneficial because it combines practical career exploration, real-world application of science knowledge, and exposure to important social issues.

First, a medical clinic tour provides students with direct exposure to healthcare careers, which is one of the fastest-growing and most stable employment sectors. Many high school students are uncertain about their future career paths, and visiting a medical clinic allows them to observe various healthcare professionals in action, including doctors, nurses, medical technicians, and administrative staff. This hands-on experience can help students determine if they have an interest in pursuing a career in healthcare, which could influence their course selections and college major choices. For example, a student who is interested in biology might discover a passion for becoming a physician or a medical researcher after seeing the practical applications of their studies.

Second, a medical clinic tour offers practical application of science knowledge that students learn in their biology, chemistry, and anatomy classes. Students can see how concepts like the circulatory system, disease prevention, and medical technology are applied in real-world settings. This connection between classroom learning and practical application helps students understand the relevance of their studies and can improve their motivation to learn. Additionally, students can observe medical equipment, diagnostic procedures, and treatment methods, which makes abstract scientific concepts more concrete and memorable.

Third, visiting a medical clinic exposes students to important social and ethical issues related to healthcare, such as patient care, medical ethics, public health, and healthcare accessibility. These experiences can help students develop empathy, critical thinking skills, and a better understanding of social responsibility. For instance, students might learn about the challenges of providing healthcare in underserved communities or the importance of preventive care, which are valuable life lessons that extend beyond academic knowledge.

While touring a dairy farm or a clothing factory could teach students about agriculture or manufacturing, these experiences are less directly relevant to most students' academic curriculum and future career options. A medical clinic tour, on the other hand, connects to multiple academic subjects and offers insights into a field that many students will encounter personally throughout their lives.

In conclusion, touring a medical clinic would provide the best educational experience for high school students because it offers career exploration opportunities, practical application of science knowledge, and exposure to important social issues. This experience would be most valuable for students' academic development and future career planning.`,
      answerTranslation: `Tôi tin rằng tham quan một phòng khám y tế sẽ cung cấp trải nghiệm giáo dục tốt nhất cho học sinh trung học. Mặc dù cả ba lựa chọn đều cung cấp cơ hội học tập có giá trị, một chuyến tham quan phòng khám y tế sẽ có lợi nhất vì nó kết hợp khám phá nghề nghiệp thực tế, ứng dụng thực tế của kiến thức khoa học, và tiếp xúc với các vấn đề xã hội quan trọng.

Đầu tiên, một chuyến tham quan phòng khám y tế cung cấp cho học sinh tiếp xúc trực tiếp với các nghề nghiệp chăm sóc sức khỏe, đây là một trong những lĩnh vực việc làm phát triển nhanh nhất và ổn định nhất. Nhiều học sinh trung học không chắc chắn về con đường sự nghiệp tương lai của họ, và tham quan một phòng khám y tế cho phép họ quan sát các chuyên gia chăm sóc sức khỏe khác nhau đang làm việc, bao gồm bác sĩ, y tá, kỹ thuật viên y tế, và nhân viên hành chính. Trải nghiệm thực tế này có thể giúp học sinh xác định xem họ có quan tâm đến việc theo đuổi sự nghiệp trong chăm sóc sức khỏe hay không, điều này có thể ảnh hưởng đến việc lựa chọn khóa học và chuyên ngành đại học của họ. Ví dụ, một học sinh quan tâm đến sinh học có thể khám phá niềm đam mê trở thành bác sĩ hoặc nhà nghiên cứu y tế sau khi thấy các ứng dụng thực tế của việc học của họ.

Thứ hai, một chuyến tham quan phòng khám y tế cung cấp ứng dụng thực tế của kiến thức khoa học mà học sinh học trong các lớp sinh học, hóa học và giải phẫu của họ. Học sinh có thể thấy cách các khái niệm như hệ thống tuần hoàn, phòng ngừa bệnh tật, và công nghệ y tế được áp dụng trong các môi trường thực tế. Sự kết nối này giữa việc học trong lớp học và ứng dụng thực tế giúp học sinh hiểu được sự liên quan của việc học của họ và có thể cải thiện động lực học tập của họ. Ngoài ra, học sinh có thể quan sát thiết bị y tế, quy trình chẩn đoán, và phương pháp điều trị, điều này làm cho các khái niệm khoa học trừu tượng trở nên cụ thể và dễ nhớ hơn.

Thứ ba, tham quan một phòng khám y tế cho học sinh tiếp xúc với các vấn đề xã hội và đạo đức quan trọng liên quan đến chăm sóc sức khỏe, chẳng hạn như chăm sóc bệnh nhân, đạo đức y tế, sức khỏe cộng đồng, và khả năng tiếp cận chăm sóc sức khỏe. Những trải nghiệm này có thể giúp học sinh phát triển sự đồng cảm, kỹ năng tư duy phản biện, và hiểu biết tốt hơn về trách nhiệm xã hội. Ví dụ, học sinh có thể tìm hiểu về những thách thức của việc cung cấp chăm sóc sức khỏe trong các cộng đồng thiếu dịch vụ hoặc tầm quan trọng của chăm sóc phòng ngừa, đây là những bài học cuộc sống có giá trị vượt ra ngoài kiến thức học thuật.

Mặc dù tham quan một trang trại sữa hoặc một nhà máy quần áo có thể dạy học sinh về nông nghiệp hoặc sản xuất, những trải nghiệm này ít liên quan trực tiếp đến chương trình học của hầu hết học sinh và các lựa chọn nghề nghiệp tương lai. Mặt khác, một chuyến tham quan phòng khám y tế kết nối với nhiều môn học và cung cấp cái nhìn sâu sắc vào một lĩnh vực mà nhiều học sinh sẽ gặp phải cá nhân trong suốt cuộc đời của họ.

Kết luận, tham quan một phòng khám y tế sẽ cung cấp trải nghiệm giáo dục tốt nhất cho học sinh trung học vì nó cung cấp cơ hội khám phá nghề nghiệp, ứng dụng thực tế của kiến thức khoa học, và tiếp xúc với các vấn đề xã hội quan trọng. Trải nghiệm này sẽ có giá trị nhất cho sự phát triển học thuật và kế hoạch nghề nghiệp tương lai của học sinh.`,
      keyPoints: ['Clear opinion stated (medical clinic)', 'Multiple strong reasons provided', 'Specific examples given', 'Well-organized structure', 'Strong conclusion', 'Meets word count requirement (300+ words)'],
      wordCount: 385
    }
  ]
};

