// TOEIC Speaking Questions 1-2 - Read a Text Aloud
// Based on the official TOEIC Speaking test structure

import { SpeakingTopic } from './speaking-hub';

// TOEIC Speaking Questions 1-2 - Read a Text Aloud
export const toeicReadAloudTopic: SpeakingTopic = {
  id: 'toeic-read-aloud',
  title: 'TOEIC Speaking Questions 1-2 - Read a Text Aloud',
  titleTranslation: 'TOEIC Speaking Câu 1-2 - Đọc to đoạn văn',
  description: 'Practice reading business texts aloud with proper pronunciation',
  descriptionTranslation: 'Luyện đọc to các văn bản kinh doanh với phát âm chuẩn',
  category: 'Tasks 1-2: Read a text aloud',
  level: 'Beginner',
  color: '#10B981',
  gradient: 'from-green-500 to-green-700',
  icon: '📢',
  createdAt: '2025-01-08',
  updatedAt: '2025-01-08',
  questions: [
    {
      id: 'q1',
      question: 'If you\'re shopping, sightseeing, and running around every minute, your vacation can seem like hard work. To avoid vacation stress, come to the Blue Valley Inn on beautiful Lake Mead. While staying at our inn, you\'ll breathe clean country air as you view spectacular sights. With its spacious rooms, swimming pool, and many outdoor activities, the inn is the perfect place for a vacation you won\'t forget. The Blue Valley Inn prides itself on the personal attention it provides for every guest. The Blue Valley motto has always been "A happy guest is our greatest treasure."',
      questionTranslation: 'Nếu bạn đang mua sắm, tham quan và chạy khắp nơi mỗi phút, kỳ nghỉ của bạn có thể giống như công việc khó khăn. Để tránh căng thẳng trong kỳ nghỉ, hãy đến Blue Valley Inn trên hồ Lake Mead xinh đẹp. Trong khi ở tại nhà trọ của chúng tôi, bạn sẽ hít thở không khí trong lành của vùng quê khi ngắm nhìn những cảnh đẹp ngoạn mục. Với các phòng rộng rãi, bể bơi và nhiều hoạt động ngoài trời, nhà trọ là nơi hoàn hảo cho một kỳ nghỉ mà bạn sẽ không bao giờ quên. Blue Valley Inn tự hào về sự chăm sóc cá nhân mà nó cung cấp cho mỗi khách. Phương châm của Blue Valley luôn là "Một vị khách hạnh phúc là kho báu lớn nhất của chúng tôi."',
      type: 'read_aloud',
      difficulty: 'Beginner',
      timeLimit: 45,
      preparationTime: 45
    },
    {
      id: 'q2',
      question: 'Read the following announcement: "Attention all employees. The annual company meeting will be held on Friday, January 15th, at 2 PM in the main conference room. Attendance is mandatory for all department heads. Please confirm your attendance by replying to this email."',
      questionTranslation: 'Đọc thông báo sau: "Kính gửi tất cả nhân viên. Cuộc họp công ty hàng năm sẽ được tổ chức vào thứ Sáu, ngày 15 tháng 1, lúc 2 giờ chiều tại phòng hội nghị chính. Việc tham dự là bắt buộc đối với tất cả trưởng phòng. Vui lòng xác nhận sự tham dự của bạn bằng cách trả lời email này."',
      type: 'read_aloud',
      difficulty: 'Beginner',
      timeLimit: 45,
      preparationTime: 45
    },
    {
      id: 'q3',
      question: 'Read the following notice: "Due to the upcoming holiday season, our customer service hours will be adjusted. From December 20th to January 3rd, our office will be open from 9 AM to 3 PM instead of the regular 8 AM to 6 PM schedule. We apologize for any inconvenience this may cause."',
      questionTranslation: 'Đọc thông báo sau: "Do mùa lễ sắp tới, giờ phục vụ khách hàng của chúng tôi sẽ được điều chỉnh. Từ ngày 20 tháng 12 đến ngày 3 tháng 1, văn phòng của chúng tôi sẽ mở cửa từ 9 giờ sáng đến 3 giờ chiều thay vì lịch thường xuyên từ 8 giờ sáng đến 6 giờ chiều. Chúng tôi xin lỗi vì sự bất tiện này có thể gây ra."',
      type: 'read_aloud',
      difficulty: 'Beginner',
      timeLimit: 45,
      preparationTime: 45
    },
    {
      id: 'q4',
      question: 'Read the following announcement: "Good morning, everyone. This is an important announcement regarding the upcoming company-wide training program. All employees are required to attend a mandatory safety training session scheduled for next Wednesday, March 22nd, from 10:00 AM to 12:00 PM in the main auditorium on the third floor. This training will cover essential workplace safety procedures, emergency evacuation protocols, and proper use of safety equipment. Please arrive ten minutes early to check in and receive your training materials. If you are unable to attend due to a scheduling conflict, you must notify your supervisor and the Human Resources department by this Friday, March 17th, to arrange an alternative session. Your participation is essential for maintaining a safe working environment for all staff members. Thank you for your attention, and we look forward to seeing everyone at the training session."',
      questionTranslation: 'Đọc thông báo sau: "Chào buổi sáng, mọi người. Đây là một thông báo quan trọng liên quan đến chương trình đào tạo toàn công ty sắp tới. Tất cả nhân viên được yêu cầu tham dự một buổi đào tạo an toàn bắt buộc được lên lịch vào thứ Tư tới, ngày 22 tháng 3, từ 10:00 sáng đến 12:00 trưa tại hội trường chính ở tầng ba. Buổi đào tạo này sẽ bao gồm các quy trình an toàn nơi làm việc cần thiết, giao thức sơ tán khẩn cấp, và cách sử dụng đúng thiết bị an toàn. Vui lòng đến sớm mười phút để đăng ký và nhận tài liệu đào tạo. Nếu bạn không thể tham dự do xung đột lịch trình, bạn phải thông báo cho người giám sát và bộ phận Nhân sự trước thứ Sáu này, ngày 17 tháng 3, để sắp xếp một buổi thay thế. Sự tham gia của bạn là cần thiết để duy trì môi trường làm việc an toàn cho tất cả nhân viên. Cảm ơn sự chú ý của bạn, và chúng tôi mong được gặp mọi người tại buổi đào tạo."',
      type: 'read_aloud',
      difficulty: 'Intermediate',
      timeLimit: 60,
      preparationTime: 45
    },
    {
      id: 'q5',
      question: 'Read the following memo: "To: All Department Managers. From: Sarah Johnson, Director of Operations. Date: April 5th, 2024. Subject: Quarterly Performance Review Meeting. This memo is to inform you that the quarterly performance review meeting for the second quarter of 2024 will take place on Monday, April 15th, from 1:30 PM to 4:00 PM in Conference Room B on the second floor. All department managers are required to attend this meeting and must bring the following documents: your department\'s performance report for the first quarter, a list of goals and objectives for the upcoming quarter, and any budget proposals that require approval. Please prepare a brief presentation, approximately five to seven minutes in length, summarizing your department\'s achievements, challenges, and future plans. If you have any questions or concerns regarding this meeting, please contact my assistant, Michael Chen, at extension 2341 or via email at mchen@company.com no later than Friday, April 12th. Your attendance and preparation are crucial for the success of our quarterly planning process. Thank you for your cooperation."',
      questionTranslation: 'Đọc bản ghi nhớ sau: "Gửi: Tất cả Trưởng phòng. Từ: Sarah Johnson, Giám đốc Vận hành. Ngày: 5 tháng 4, 2024. Chủ đề: Cuộc họp Đánh giá Hiệu suất Quý. Bản ghi nhớ này nhằm thông báo cho các bạn biết rằng cuộc họp đánh giá hiệu suất quý cho quý hai năm 2024 sẽ diễn ra vào thứ Hai, ngày 15 tháng 4, từ 1:30 chiều đến 4:00 chiều tại Phòng họp B ở tầng hai. Tất cả trưởng phòng được yêu cầu tham dự cuộc họp này và phải mang theo các tài liệu sau: báo cáo hiệu suất của phòng bạn cho quý một, danh sách mục tiêu và mục đích cho quý sắp tới, và bất kỳ đề xuất ngân sách nào cần được phê duyệt. Vui lòng chuẩn bị một bài thuyết trình ngắn, khoảng năm đến bảy phút, tóm tắt các thành tựu, thách thức và kế hoạch tương lai của phòng bạn. Nếu bạn có bất kỳ câu hỏi hoặc mối quan ngại nào liên quan đến cuộc họp này, vui lòng liên hệ với trợ lý của tôi, Michael Chen, tại số máy lẻ 2341 hoặc qua email tại mchen@company.com không muộn hơn thứ Sáu, ngày 12 tháng 4. Sự tham dự và chuẩn bị của bạn là rất quan trọng cho sự thành công của quá trình lập kế hoạch quý của chúng ta. Cảm ơn sự hợp tác của bạn."',
      type: 'read_aloud',
      difficulty: 'Intermediate',
      timeLimit: 60,
      preparationTime: 45
    },
    {
      id: 'q6',
      question: 'Read the following notice: "Important Notice: Building Maintenance and System Upgrade. Dear valued employees, we would like to inform you that our building will undergo scheduled maintenance and system upgrades during the weekend of May 18th and 19th, 2024. The maintenance work will begin on Saturday, May 18th, at 6:00 AM and is expected to be completed by Sunday, May 19th, at 8:00 PM. During this period, the entire building will be closed, and all employees will not have access to the office facilities, including parking areas, elevators, and common spaces. We understand that this may cause some inconvenience, and we sincerely apologize for any disruption to your work schedule. To minimize the impact, we strongly recommend that you complete any urgent tasks before Friday, May 17th, and save all important documents to the cloud storage system. Additionally, please ensure that all electronic devices are properly shut down and unplugged before leaving the office on Friday evening. If you have any questions or require assistance with accessing cloud storage or backing up your files, please contact the IT Support team at itsupport@company.com or call the help desk at extension 5555. We appreciate your understanding and cooperation during this necessary maintenance period. Thank you for your patience."',
      questionTranslation: 'Đọc thông báo sau: "Thông báo quan trọng: Bảo trì Tòa nhà và Nâng cấp Hệ thống. Kính gửi các nhân viên quý mến, chúng tôi muốn thông báo cho các bạn biết rằng tòa nhà của chúng tôi sẽ trải qua bảo trì theo lịch trình và nâng cấp hệ thống trong cuối tuần ngày 18 và 19 tháng 5, 2024. Công việc bảo trì sẽ bắt đầu vào thứ Bảy, ngày 18 tháng 5, lúc 6:00 sáng và dự kiến sẽ hoàn thành vào Chủ nhật, ngày 19 tháng 5, lúc 8:00 tối. Trong thời gian này, toàn bộ tòa nhà sẽ bị đóng cửa, và tất cả nhân viên sẽ không có quyền truy cập vào các cơ sở văn phòng, bao gồm khu vực đỗ xe, thang máy, và không gian chung. Chúng tôi hiểu rằng điều này có thể gây ra một số bất tiện, và chúng tôi chân thành xin lỗi vì bất kỳ gián đoạn nào đối với lịch làm việc của bạn. Để giảm thiểu tác động, chúng tôi khuyến nghị mạnh mẽ rằng bạn hoàn thành bất kỳ nhiệm vụ khẩn cấp nào trước thứ Sáu, ngày 17 tháng 5, và lưu tất cả tài liệu quan trọng vào hệ thống lưu trữ đám mây. Ngoài ra, vui lòng đảm bảo rằng tất cả thiết bị điện tử được tắt đúng cách và rút phích cắm trước khi rời văn phòng vào tối thứ Sáu. Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ về việc truy cập lưu trữ đám mây hoặc sao lưu tệp của bạn, vui lòng liên hệ với nhóm Hỗ trợ CNTT tại itsupport@company.com hoặc gọi bàn trợ giúp tại số máy lẻ 5555. Chúng tôi đánh giá cao sự hiểu biết và hợp tác của bạn trong thời gian bảo trì cần thiết này. Cảm ơn sự kiên nhẫn của bạn."',
      type: 'read_aloud',
      difficulty: 'Intermediate',
      timeLimit: 60,
      preparationTime: 45
    },
    {
      id: 'q7',
      question: 'Read the following email announcement: "Subject: New Employee Orientation Program - June 2024. Dear Team Members, I am pleased to announce that our company will be conducting a comprehensive new employee orientation program for all recently hired staff members during the month of June 2024. The orientation sessions will be held every Monday and Wednesday throughout June, from 9:00 AM to 12:00 PM in the Training Center located on the fourth floor of our main building. This program is designed to help new employees become familiar with our company culture, policies, procedures, and organizational structure. The orientation will cover important topics such as employee benefits, health insurance options, retirement plans, vacation policies, workplace safety regulations, and our code of conduct. Additionally, new employees will receive training on our internal communication systems, including email protocols, project management software, and the company intranet. All new employees who joined the company between January 1st and May 31st, 2024, are required to attend at least one complete orientation session. Please register for your preferred session by contacting the Human Resources department at hr@company.com or by calling extension 7890 no later than Friday, May 31st, 2024. We look forward to welcoming our new team members and helping them integrate successfully into our organization."',
      questionTranslation: 'Đọc thông báo email sau: "Chủ đề: Chương trình Định hướng Nhân viên Mới - Tháng 6 năm 2024. Kính gửi các Thành viên Nhóm, tôi rất vui được thông báo rằng công ty chúng tôi sẽ tiến hành một chương trình định hướng nhân viên mới toàn diện cho tất cả nhân viên mới được tuyển dụng trong tháng 6 năm 2024. Các buổi định hướng sẽ được tổ chức vào mỗi thứ Hai và thứ Tư trong suốt tháng 6, từ 9:00 sáng đến 12:00 trưa tại Trung tâm Đào tạo nằm ở tầng bốn của tòa nhà chính của chúng tôi. Chương trình này được thiết kế để giúp nhân viên mới làm quen với văn hóa công ty, chính sách, quy trình và cấu trúc tổ chức của chúng tôi. Định hướng sẽ bao gồm các chủ đề quan trọng như phúc lợi nhân viên, các lựa chọn bảo hiểm y tế, kế hoạch nghỉ hưu, chính sách nghỉ phép, quy định an toàn nơi làm việc, và quy tắc ứng xử của chúng tôi. Ngoài ra, nhân viên mới sẽ nhận được đào tạo về các hệ thống giao tiếp nội bộ của chúng tôi, bao gồm giao thức email, phần mềm quản lý dự án, và mạng nội bộ công ty. Tất cả nhân viên mới đã tham gia công ty từ ngày 1 tháng 1 đến ngày 31 tháng 5, 2024, được yêu cầu tham dự ít nhất một buổi định hướng hoàn chỉnh. Vui lòng đăng ký cho buổi ưa thích của bạn bằng cách liên hệ với bộ phận Nhân sự tại hr@company.com hoặc bằng cách gọi số máy lẻ 7890 không muộn hơn thứ Sáu, ngày 31 tháng 5, 2024. Chúng tôi mong được chào đón các thành viên nhóm mới và giúp họ tích hợp thành công vào tổ chức của chúng tôi."',
      type: 'read_aloud',
      difficulty: 'Intermediate',
      timeLimit: 60,
      preparationTime: 45
    },
    {
      id: 'q8',
      question: 'Read the following public announcement: "Attention all passengers. This is a public service announcement from the City Transportation Authority. We would like to inform you that due to scheduled track maintenance and signal system upgrades, the Blue Line subway service will be temporarily suspended between Central Station and Riverside Station from Saturday, July 6th, 2024, at 12:01 AM until Monday, July 8th, 2024, at 5:00 AM. During this period, alternative transportation services will be provided. Free shuttle buses will operate between Central Station and Riverside Station every ten minutes from 5:00 AM to 11:00 PM daily. The shuttle buses will make stops at all regular subway stations along the route, including Market Square, City Hall, Park Avenue, and University Boulevard. Please note that the shuttle bus service may take approximately twenty to thirty minutes longer than the regular subway service due to traffic conditions. We recommend that passengers allow extra time for their journeys and plan their travel accordingly. For real-time updates and additional information about alternative routes, please visit our website at www.citytransit.gov or call our customer service hotline at 1-800-555-TRAN. We sincerely apologize for any inconvenience this temporary service interruption may cause, and we appreciate your patience and understanding during this necessary maintenance period. Thank you for choosing City Transportation Authority."',
      questionTranslation: 'Đọc thông báo công cộng sau: "Kính gửi tất cả hành khách. Đây là thông báo dịch vụ công cộng từ Cơ quan Giao thông Thành phố. Chúng tôi muốn thông báo cho các bạn biết rằng do bảo trì đường ray theo lịch trình và nâng cấp hệ thống tín hiệu, dịch vụ tàu điện ngầm Tuyến Xanh sẽ tạm thời bị đình chỉ giữa Trạm Trung tâm và Trạm Riverside từ thứ Bảy, ngày 6 tháng 7, 2024, lúc 12:01 sáng cho đến thứ Hai, ngày 8 tháng 7, 2024, lúc 5:00 sáng. Trong thời gian này, các dịch vụ giao thông thay thế sẽ được cung cấp. Xe buýt đưa đón miễn phí sẽ hoạt động giữa Trạm Trung tâm và Trạm Riverside mỗi mười phút từ 5:00 sáng đến 11:00 tối hàng ngày. Xe buýt đưa đón sẽ dừng tại tất cả các trạm tàu điện ngầm thường xuyên dọc theo tuyến đường, bao gồm Market Square, City Hall, Park Avenue, và University Boulevard. Vui lòng lưu ý rằng dịch vụ xe buýt đưa đón có thể mất khoảng hai mươi đến ba mươi phút lâu hơn so với dịch vụ tàu điện ngầm thường xuyên do điều kiện giao thông. Chúng tôi khuyến nghị rằng hành khách dành thêm thời gian cho hành trình của họ và lập kế hoạch đi lại phù hợp. Để cập nhật thời gian thực và thông tin bổ sung về các tuyến đường thay thế, vui lòng truy cập trang web của chúng tôi tại www.citytransit.gov hoặc gọi đường dây nóng dịch vụ khách hàng của chúng tôi tại 1-800-555-TRAN. Chúng tôi chân thành xin lỗi vì bất kỳ bất tiện nào mà sự gián đoạn dịch vụ tạm thời này có thể gây ra, và chúng tôi đánh giá cao sự kiên nhẫn và hiểu biết của bạn trong thời gian bảo trì cần thiết này. Cảm ơn bạn đã chọn Cơ quan Giao thông Thành phố."',
      type: 'read_aloud',
      difficulty: 'Intermediate',
      timeLimit: 60,
      preparationTime: 45
    },
    {
      id: 'q9',
      question: 'Read the following hotel notice: "Dear Valued Guests, We would like to inform you about important changes to our hotel services and facilities that will take effect beginning Monday, August 12th, 2024. First, our complimentary breakfast service will now be served from 6:30 AM to 10:00 AM daily in the Grand Ballroom on the second floor, instead of the previous location in the main dining area. The breakfast buffet will feature an expanded selection of hot and cold items, including freshly prepared omelets, pancakes, waffles, fresh fruit, yogurt, cereals, pastries, and a variety of beverages including coffee, tea, and fresh juices. Second, our fitness center and swimming pool will be closed for renovation from Monday, August 19th, 2024, through Friday, September 6th, 2024. During this period, we have arranged for our guests to use the facilities at the nearby Riverside Athletic Club, located just two blocks away at 245 Main Street. Simply present your room key at the front desk to gain access. Third, our business center will be relocated to the third floor, Room 305, and will now operate with extended hours from 6:00 AM to 11:00 PM daily. The new business center will feature upgraded computer workstations, high-speed internet access, printing and photocopying services, and private meeting rooms available for reservation. For any questions or assistance, please contact our front desk at extension 1000 or visit our concierge desk in the lobby. We appreciate your understanding and look forward to providing you with an enhanced guest experience."',
      questionTranslation: 'Đọc thông báo khách sạn sau: "Kính gửi các Khách hàng Quý mến, chúng tôi muốn thông báo cho các bạn về những thay đổi quan trọng đối với dịch vụ và cơ sở vật chất của khách sạn chúng tôi sẽ có hiệu lực bắt đầu từ thứ Hai, ngày 12 tháng 8, 2024. Thứ nhất, dịch vụ bữa sáng miễn phí của chúng tôi giờ sẽ được phục vụ từ 6:30 sáng đến 10:00 sáng hàng ngày tại Grand Ballroom ở tầng hai, thay vì địa điểm trước đây ở khu vực ăn uống chính. Bữa sáng buffet sẽ có thêm nhiều lựa chọn món nóng và lạnh, bao gồm trứng ốp lết tươi, bánh kếp, bánh quế, trái cây tươi, sữa chua, ngũ cốc, bánh ngọt, và nhiều loại đồ uống bao gồm cà phê, trà, và nước ép tươi. Thứ hai, trung tâm thể dục và bể bơi của chúng tôi sẽ bị đóng cửa để cải tạo từ thứ Hai, ngày 19 tháng 8, 2024, đến thứ Sáu, ngày 6 tháng 9, 2024. Trong thời gian này, chúng tôi đã sắp xếp cho khách của chúng tôi sử dụng các cơ sở tại Riverside Athletic Club gần đó, nằm cách hai dãy nhà tại 245 Main Street. Chỉ cần trình chìa khóa phòng của bạn tại quầy lễ tân để được truy cập. Thứ ba, trung tâm kinh doanh của chúng tôi sẽ được chuyển đến tầng ba, Phòng 305, và giờ sẽ hoạt động với giờ mở rộng từ 6:00 sáng đến 11:00 tối hàng ngày. Trung tâm kinh doanh mới sẽ có các trạm làm việc máy tính được nâng cấp, truy cập internet tốc độ cao, dịch vụ in và photocopy, và phòng họp riêng có sẵn để đặt chỗ. Đối với bất kỳ câu hỏi hoặc hỗ trợ nào, vui lòng liên hệ quầy lễ tân của chúng tôi tại số máy lẻ 1000 hoặc ghé thăm quầy tiếp tân của chúng tôi ở sảnh. Chúng tôi đánh giá cao sự hiểu biết của bạn và mong được cung cấp cho bạn một trải nghiệm khách hàng được nâng cao."',
      type: 'read_aloud',
      difficulty: 'Intermediate',
      timeLimit: 60,
      preparationTime: 45
    },
    {
      id: 'q10',
      question: 'Read the following airport announcement: "Attention all passengers traveling on Flight 847 to Tokyo, Japan. This is a final boarding call for Flight 847, scheduled to depart from Gate 12 in Terminal B at 3:45 PM. All passengers holding tickets for Flight 847 are required to proceed immediately to Gate 12 for boarding. Please have your boarding pass and passport ready for inspection at the gate. We remind you that carry-on luggage must not exceed the maximum dimensions of 22 inches by 14 inches by 9 inches, and the maximum weight limit is 15 pounds per bag. Additionally, please ensure that all electronic devices are fully charged, as you may be asked to power them on during the security screening process. Passengers requiring special assistance, including wheelchair service or help with mobility, should contact a gate agent immediately. For passengers who have checked luggage, please note that your bags will be automatically transferred to your final destination, and you can claim them at the baggage claim area in Terminal 2 upon arrival in Tokyo. The flight duration is approximately thirteen hours and thirty minutes, with a scheduled arrival time of 6:15 PM local time on Tuesday, September 10th, 2024. We thank you for your attention and wish you a pleasant journey. Once again, this is the final boarding call for Flight 847 to Tokyo, departing from Gate 12 in Terminal B."',
      questionTranslation: 'Đọc thông báo sân bay sau: "Kính gửi tất cả hành khách đi chuyến bay 847 đến Tokyo, Nhật Bản. Đây là lời gọi lên máy bay cuối cùng cho chuyến bay 847, dự kiến khởi hành từ Cổng 12 tại Nhà ga B lúc 3:45 chiều. Tất cả hành khách có vé cho chuyến bay 847 được yêu cầu tiến hành ngay lập tức đến Cổng 12 để lên máy bay. Vui lòng chuẩn bị sẵn thẻ lên máy bay và hộ chiếu của bạn để kiểm tra tại cổng. Chúng tôi nhắc nhở bạn rằng hành lý xách tay không được vượt quá kích thước tối đa 22 inch x 14 inch x 9 inch, và giới hạn trọng lượng tối đa là 15 pound mỗi túi. Ngoài ra, vui lòng đảm bảo rằng tất cả thiết bị điện tử được sạc đầy, vì bạn có thể được yêu cầu bật chúng lên trong quá trình kiểm tra an ninh. Hành khách cần hỗ trợ đặc biệt, bao gồm dịch vụ xe lăn hoặc giúp đỡ về di chuyển, nên liên hệ ngay với nhân viên cổng. Đối với hành khách đã ký gửi hành lý, vui lòng lưu ý rằng túi của bạn sẽ được tự động chuyển đến điểm đến cuối cùng của bạn, và bạn có thể nhận chúng tại khu vực nhận hành lý ở Nhà ga 2 khi đến Tokyo. Thời gian bay là khoảng mười ba giờ ba mươi phút, với thời gian đến dự kiến là 6:15 chiều giờ địa phương vào thứ Ba, ngày 10 tháng 9, 2024. Chúng tôi cảm ơn sự chú ý của bạn và chúc bạn một hành trình dễ chịu. Một lần nữa, đây là lời gọi lên máy bay cuối cùng cho chuyến bay 847 đến Tokyo, khởi hành từ Cổng 12 tại Nhà ga B."',
      type: 'read_aloud',
      difficulty: 'Intermediate',
      timeLimit: 60,
      preparationTime: 45
    },
    {
      id: 'q11',
      question: 'Read the following conference announcement: "Good afternoon, ladies and gentlemen. Welcome to the International Business Conference 2024, taking place here at the Grand Convention Center. We are pleased to announce that registration for today\'s conference is now open and will continue until 2:30 PM in the main lobby on the ground floor. All registered participants are required to check in at the registration desk and collect their conference materials, including name badges, program schedules, and welcome packets. The opening ceremony will commence at 3:00 PM sharp in the Grand Ballroom on the third floor, followed by the keynote address by Dr. Sarah Mitchell, a renowned expert in international business strategy, scheduled to begin at 3:30 PM. After the keynote address, there will be a networking coffee break from 4:15 PM to 4:45 PM in the Exhibition Hall, where you can meet with fellow attendees and visit our sponsor booths. The afternoon session will feature three concurrent workshop sessions running from 5:00 PM to 6:30 PM. Workshop A will focus on digital marketing strategies in Room 301, Workshop B will cover financial planning and investment in Room 302, and Workshop C will discuss human resources management in Room 303. Please note that seating is limited for each workshop, so we encourage you to arrive early to secure your preferred session. For any questions or assistance throughout the conference, please visit our information desk located in the main lobby or contact our conference staff members who will be wearing blue identification badges. We look forward to an engaging and productive conference experience. Thank you for your participation."',
      questionTranslation: 'Đọc thông báo hội nghị sau: "Chào buổi chiều, thưa quý vị. Chào mừng đến với Hội nghị Kinh doanh Quốc tế 2024, diễn ra tại đây tại Trung tâm Hội nghị Grand. Chúng tôi rất vui được thông báo rằng đăng ký cho hội nghị hôm nay hiện đã mở và sẽ tiếp tục cho đến 2:30 chiều tại sảnh chính ở tầng trệt. Tất cả người tham gia đã đăng ký được yêu cầu đăng ký tại bàn đăng ký và nhận tài liệu hội nghị của họ, bao gồm thẻ tên, lịch trình chương trình, và gói chào mừng. Lễ khai mạc sẽ bắt đầu đúng 3:00 chiều tại Grand Ballroom ở tầng ba, tiếp theo là bài phát biểu chính của Tiến sĩ Sarah Mitchell, một chuyên gia nổi tiếng về chiến lược kinh doanh quốc tế, được lên lịch bắt đầu lúc 3:30 chiều. Sau bài phát biểu chính, sẽ có giờ nghỉ cà phê giao lưu từ 4:15 chiều đến 4:45 chiều tại Hội trường Triển lãm, nơi bạn có thể gặp gỡ với các người tham dự khác và thăm các gian hàng tài trợ của chúng tôi. Phiên buổi chiều sẽ có ba phiên hội thảo đồng thời chạy từ 5:00 chiều đến 6:30 chiều. Hội thảo A sẽ tập trung vào chiến lược tiếp thị kỹ thuật số tại Phòng 301, Hội thảo B sẽ bao gồm lập kế hoạch tài chính và đầu tư tại Phòng 302, và Hội thảo C sẽ thảo luận về quản lý nhân sự tại Phòng 303. Vui lòng lưu ý rằng chỗ ngồi có giới hạn cho mỗi hội thảo, vì vậy chúng tôi khuyến khích bạn đến sớm để đảm bảo phiên ưa thích của bạn. Đối với bất kỳ câu hỏi hoặc hỗ trợ nào trong suốt hội nghị, vui lòng ghé thăm bàn thông tin của chúng tôi nằm ở sảnh chính hoặc liên hệ với các thành viên nhân viên hội nghị của chúng tôi, những người sẽ đeo thẻ nhận dạng màu xanh. Chúng tôi mong đợi một trải nghiệm hội nghị hấp dẫn và hiệu quả. Cảm ơn sự tham gia của bạn."',
      type: 'read_aloud',
      difficulty: 'Intermediate',
      timeLimit: 60,
      preparationTime: 45
    },
    {
      id: 'q12',
      question: 'Read the following university notice: "To: All Students and Faculty Members. From: Office of Student Affairs. Date: October 15th, 2024. Subject: Important Updates Regarding Fall Semester 2024 Final Examinations. This notice is to inform all students and faculty members about important updates regarding the Fall Semester 2024 final examinations, which will take place from Monday, December 9th, 2024, through Friday, December 20th, 2024. All final examinations will be conducted in person at the designated examination halls on campus. The examination schedule has been posted on the university website and is also available at the Student Affairs Office in Building A, Room 205. Students are required to arrive at least fifteen minutes before their scheduled examination time and must bring a valid student identification card and a government-issued photo identification, such as a driver\'s license or passport. Please note that electronic devices, including cell phones, tablets, smartwatches, and calculators, are strictly prohibited in all examination rooms. Students found with unauthorized electronic devices during an examination will face immediate disciplinary action, which may include receiving a failing grade for that examination. Additionally, all examination materials, including question papers and answer sheets, must be returned to the invigilators at the end of each examination session. Students who require special accommodations due to documented disabilities should contact the Disability Services Office at disability@university.edu or call extension 4567 no later than Friday, November 22nd, 2024, to arrange appropriate accommodations. We wish all students success in their final examinations and remind you that academic integrity is of the utmost importance. For any questions or concerns, please contact the Office of Student Affairs at studentaffairs@university.edu or visit our office during regular business hours from 8:00 AM to 5:00 PM, Monday through Friday."',
      questionTranslation: 'Đọc thông báo đại học sau: "Gửi: Tất cả Sinh viên và Thành viên Khoa. Từ: Văn phòng Công tác Sinh viên. Ngày: 15 tháng 10, 2024. Chủ đề: Cập nhật Quan trọng về Kỳ thi Cuối kỳ Học kỳ Thu 2024. Thông báo này nhằm thông báo cho tất cả sinh viên và thành viên khoa về các cập nhật quan trọng liên quan đến kỳ thi cuối kỳ Học kỳ Thu 2024, sẽ diễn ra từ thứ Hai, ngày 9 tháng 12, 2024, đến thứ Sáu, ngày 20 tháng 12, 2024. Tất cả kỳ thi cuối kỳ sẽ được tiến hành trực tiếp tại các hội trường thi được chỉ định trong khuôn viên. Lịch thi đã được đăng trên trang web của trường đại học và cũng có sẵn tại Văn phòng Công tác Sinh viên ở Tòa nhà A, Phòng 205. Sinh viên được yêu cầu đến ít nhất mười lăm phút trước giờ thi được lên lịch và phải mang theo thẻ nhận dạng sinh viên hợp lệ và giấy tờ tùy thân có ảnh do chính phủ cấp, chẳng hạn như bằng lái xe hoặc hộ chiếu. Vui lòng lưu ý rằng thiết bị điện tử, bao gồm điện thoại di động, máy tính bảng, đồng hồ thông minh, và máy tính, bị nghiêm cấm trong tất cả các phòng thi. Sinh viên bị phát hiện có thiết bị điện tử trái phép trong khi thi sẽ phải đối mặt với hành động kỷ luật ngay lập tức, có thể bao gồm nhận điểm không đạt cho kỳ thi đó. Ngoài ra, tất cả tài liệu thi, bao gồm đề thi và phiếu trả lời, phải được trả lại cho các giám thị vào cuối mỗi phiên thi. Sinh viên cần điều chỉnh đặc biệt do khuyết tật được ghi nhận nên liên hệ với Văn phòng Dịch vụ Khuyết tật tại disability@university.edu hoặc gọi số máy lẻ 4567 không muộn hơn thứ Sáu, ngày 22 tháng 11, 2024, để sắp xếp điều chỉnh phù hợp. Chúng tôi chúc tất cả sinh viên thành công trong kỳ thi cuối kỳ của họ và nhắc nhở bạn rằng tính toàn vẹn học thuật là vô cùng quan trọng. Đối với bất kỳ câu hỏi hoặc mối quan ngại nào, vui lòng liên hệ Văn phòng Công tác Sinh viên tại studentaffairs@university.edu hoặc ghé thăm văn phòng của chúng tôi trong giờ làm việc thường xuyên từ 8:00 sáng đến 5:00 chiều, thứ Hai đến thứ Sáu."',
      type: 'read_aloud',
      difficulty: 'Intermediate',
      timeLimit: 60,
      preparationTime: 45
    }
  ],
  vocabulary: [
    {
      id: 'v1',
      word: 'mandatory',
      pronunciation: '/ˈmændətɔːri/',
      meaning: 'bắt buộc',
      example: 'Attendance at the training session is mandatory.',
      exampleTranslation: 'Việc tham dự buổi đào tạo là bắt buộc.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v2',
      word: 'announcement',
      pronunciation: '/əˈnaʊnsmənt/',
      meaning: 'thông báo',
      example: 'The company made an important announcement.',
      exampleTranslation: 'Công ty đã đưa ra một thông báo quan trọng.',
      category: 'business',
      level: 'Beginner'
    },
    {
      id: 'v3',
      word: 'auditorium',
      pronunciation: '/ˌɔːdɪˈtɔːriəm/',
      meaning: 'hội trường',
      example: 'The meeting will be held in the main auditorium.',
      exampleTranslation: 'Cuộc họp sẽ được tổ chức tại hội trường chính.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v4',
      word: 'evacuation',
      pronunciation: '/ɪˌvækjuˈeɪʃən/',
      meaning: 'sơ tán',
      example: 'Emergency evacuation protocols must be followed.',
      exampleTranslation: 'Các giao thức sơ tán khẩn cấp phải được tuân theo.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v5',
      word: 'supervisor',
      pronunciation: '/ˈsuːpərvaɪzər/',
      meaning: 'người giám sát',
      example: 'Please notify your supervisor if you cannot attend.',
      exampleTranslation: 'Vui lòng thông báo cho người giám sát nếu bạn không thể tham dự.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v6',
      word: 'quarterly',
      pronunciation: '/ˈkwɔːrtərli/',
      meaning: 'hàng quý',
      example: 'We have a quarterly performance review meeting.',
      exampleTranslation: 'Chúng tôi có cuộc họp đánh giá hiệu suất hàng quý.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v7',
      word: 'proposal',
      pronunciation: '/prəˈpoʊzəl/',
      meaning: 'đề xuất',
      example: 'Please submit your budget proposal by Friday.',
      exampleTranslation: 'Vui lòng nộp đề xuất ngân sách của bạn trước thứ Sáu.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v8',
      word: 'extension',
      pronunciation: '/ɪkˈstenʃən/',
      meaning: 'số máy lẻ',
      example: 'Please call me at extension 2341.',
      exampleTranslation: 'Vui lòng gọi cho tôi tại số máy lẻ 2341.',
      category: 'business',
      level: 'Beginner'
    },
    {
      id: 'v9',
      word: 'maintenance',
      pronunciation: '/ˈmeɪntənəns/',
      meaning: 'bảo trì',
      example: 'The building will undergo scheduled maintenance this weekend.',
      exampleTranslation: 'Tòa nhà sẽ trải qua bảo trì theo lịch trình vào cuối tuần này.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v10',
      word: 'upgrade',
      pronunciation: '/ˈʌpɡreɪd/',
      meaning: 'nâng cấp',
      example: 'The system upgrade will improve performance.',
      exampleTranslation: 'Nâng cấp hệ thống sẽ cải thiện hiệu suất.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v11',
      word: 'disruption',
      pronunciation: '/dɪsˈrʌpʃən/',
      meaning: 'gián đoạn',
      example: 'We apologize for any disruption to your work schedule.',
      exampleTranslation: 'Chúng tôi xin lỗi vì bất kỳ gián đoạn nào đối với lịch làm việc của bạn.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v12',
      word: 'facilities',
      pronunciation: '/fəˈsɪlətiz/',
      meaning: 'cơ sở vật chất',
      example: 'All employees will not have access to office facilities.',
      exampleTranslation: 'Tất cả nhân viên sẽ không có quyền truy cập vào cơ sở văn phòng.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v13',
      word: 'orientation',
      pronunciation: '/ˌɔːriənˈteɪʃən/',
      meaning: 'định hướng',
      example: 'New employees must attend the orientation program.',
      exampleTranslation: 'Nhân viên mới phải tham dự chương trình định hướng.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v14',
      word: 'comprehensive',
      pronunciation: '/ˌkɑːmprɪˈhensɪv/',
      meaning: 'toàn diện',
      example: 'We offer a comprehensive training program.',
      exampleTranslation: 'Chúng tôi cung cấp một chương trình đào tạo toàn diện.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v15',
      word: 'integrate',
      pronunciation: '/ˈɪntɪɡreɪt/',
      meaning: 'tích hợp',
      example: 'We help new employees integrate into the organization.',
      exampleTranslation: 'Chúng tôi giúp nhân viên mới tích hợp vào tổ chức.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v16',
      word: 'intranet',
      pronunciation: '/ˈɪntrənet/',
      meaning: 'mạng nội bộ',
      example: 'Please check the company intranet for updates.',
      exampleTranslation: 'Vui lòng kiểm tra mạng nội bộ công ty để cập nhật.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v17',
      word: 'suspended',
      pronunciation: '/səˈspendɪd/',
      meaning: 'bị đình chỉ',
      example: 'The subway service will be temporarily suspended.',
      exampleTranslation: 'Dịch vụ tàu điện ngầm sẽ tạm thời bị đình chỉ.',
      category: 'transportation',
      level: 'Intermediate'
    },
    {
      id: 'v18',
      word: 'alternative',
      pronunciation: '/ɔːlˈtɜːrnətɪv/',
      meaning: 'thay thế',
      example: 'Alternative transportation services will be provided.',
      exampleTranslation: 'Các dịch vụ giao thông thay thế sẽ được cung cấp.',
      category: 'transportation',
      level: 'Intermediate'
    },
    {
      id: 'v19',
      word: 'shuttle',
      pronunciation: '/ˈʃʌtəl/',
      meaning: 'đưa đón',
      example: 'Free shuttle buses will operate between stations.',
      exampleTranslation: 'Xe buýt đưa đón miễn phí sẽ hoạt động giữa các trạm.',
      category: 'transportation',
      level: 'Intermediate'
    },
    {
      id: 'v20',
      word: 'interruption',
      pronunciation: '/ˌɪntəˈrʌpʃən/',
      meaning: 'gián đoạn',
      example: 'We apologize for the temporary service interruption.',
      exampleTranslation: 'Chúng tôi xin lỗi vì sự gián đoạn dịch vụ tạm thời.',
      category: 'transportation',
      level: 'Intermediate'
    },
    {
      id: 'v21',
      word: 'complimentary',
      pronunciation: '/ˌkɑːmplɪˈmentri/',
      meaning: 'miễn phí',
      example: 'Complimentary breakfast is included with your stay.',
      exampleTranslation: 'Bữa sáng miễn phí được bao gồm trong kỳ nghỉ của bạn.',
      category: 'hospitality',
      level: 'Intermediate'
    },
    {
      id: 'v22',
      word: 'renovation',
      pronunciation: '/ˌrenəˈveɪʃən/',
      meaning: 'cải tạo',
      example: 'The fitness center will be closed for renovation.',
      exampleTranslation: 'Trung tâm thể dục sẽ bị đóng cửa để cải tạo.',
      category: 'hospitality',
      level: 'Intermediate'
    },
    {
      id: 'v23',
      word: 'concierge',
      pronunciation: '/ˈkɑːnsiɜːrʒ/',
      meaning: 'tiếp tân',
      example: 'Please visit our concierge desk for assistance.',
      exampleTranslation: 'Vui lòng ghé thăm quầy tiếp tân của chúng tôi để được hỗ trợ.',
      category: 'hospitality',
      level: 'Intermediate'
    },
    {
      id: 'v24',
      word: 'enhanced',
      pronunciation: '/ɪnˈhænst/',
      meaning: 'được nâng cao',
      example: 'We look forward to providing you with an enhanced experience.',
      exampleTranslation: 'Chúng tôi mong được cung cấp cho bạn một trải nghiệm được nâng cao.',
      category: 'hospitality',
      level: 'Intermediate'
    },
    {
      id: 'v25',
      word: 'boarding',
      pronunciation: '/ˈbɔːrdɪŋ/',
      meaning: 'lên máy bay',
      example: 'This is the final boarding call for Flight 847.',
      exampleTranslation: 'Đây là lời gọi lên máy bay cuối cùng cho chuyến bay 847.',
      category: 'travel',
      level: 'Intermediate'
    },
    {
      id: 'v26',
      word: 'dimensions',
      pronunciation: '/dɪˈmenʃənz/',
      meaning: 'kích thước',
      example: 'Carry-on luggage must not exceed the maximum dimensions.',
      exampleTranslation: 'Hành lý xách tay không được vượt quá kích thước tối đa.',
      category: 'travel',
      level: 'Intermediate'
    },
    {
      id: 'v27',
      word: 'screening',
      pronunciation: '/ˈskriːnɪŋ/',
      meaning: 'kiểm tra',
      example: 'You may be asked to power on devices during security screening.',
      exampleTranslation: 'Bạn có thể được yêu cầu bật thiết bị trong quá trình kiểm tra an ninh.',
      category: 'travel',
      level: 'Intermediate'
    },
    {
      id: 'v28',
      word: 'destination',
      pronunciation: '/ˌdestɪˈneɪʃən/',
      meaning: 'điểm đến',
      example: 'Your bags will be transferred to your final destination.',
      exampleTranslation: 'Túi của bạn sẽ được chuyển đến điểm đến cuối cùng của bạn.',
      category: 'travel',
      level: 'Intermediate'
    },
    {
      id: 'v29',
      word: 'conference',
      pronunciation: '/ˈkɑːnfərəns/',
      meaning: 'hội nghị',
      example: 'Welcome to the International Business Conference 2024.',
      exampleTranslation: 'Chào mừng đến với Hội nghị Kinh doanh Quốc tế 2024.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v30',
      word: 'keynote',
      pronunciation: '/ˈkiːnoʊt/',
      meaning: 'phát biểu chính',
      example: 'The keynote address will begin at 3:30 PM.',
      exampleTranslation: 'Bài phát biểu chính sẽ bắt đầu lúc 3:30 chiều.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v31',
      word: 'concurrent',
      pronunciation: '/kənˈkɜːrənt/',
      meaning: 'đồng thời',
      example: 'Three concurrent workshop sessions will run simultaneously.',
      exampleTranslation: 'Ba phiên hội thảo đồng thời sẽ chạy cùng lúc.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v32',
      word: 'identification',
      pronunciation: '/aɪˌdentɪfɪˈkeɪʃən/',
      meaning: 'nhận dạng',
      example: 'Staff members will be wearing blue identification badges.',
      exampleTranslation: 'Các thành viên nhân viên sẽ đeo thẻ nhận dạng màu xanh.',
      category: 'business',
      level: 'Intermediate'
    },
    {
      id: 'v33',
      word: 'examinations',
      pronunciation: '/ɪɡˌzæmɪˈneɪʃənz/',
      meaning: 'kỳ thi',
      example: 'Final examinations will take place from December 9th to 20th.',
      exampleTranslation: 'Kỳ thi cuối kỳ sẽ diễn ra từ ngày 9 đến 20 tháng 12.',
      category: 'education',
      level: 'Intermediate'
    },
    {
      id: 'v34',
      word: 'prohibited',
      pronunciation: '/prəˈhɪbɪtɪd/',
      meaning: 'bị cấm',
      example: 'Electronic devices are strictly prohibited in examination rooms.',
      exampleTranslation: 'Thiết bị điện tử bị nghiêm cấm trong phòng thi.',
      category: 'education',
      level: 'Intermediate'
    },
    {
      id: 'v35',
      word: 'invigilators',
      pronunciation: '/ɪnˈvɪdʒɪleɪtərz/',
      meaning: 'giám thị',
      example: 'Return all examination materials to the invigilators.',
      exampleTranslation: 'Trả lại tất cả tài liệu thi cho các giám thị.',
      category: 'education',
      level: 'Intermediate'
    },
    {
      id: 'v36',
      word: 'accommodations',
      pronunciation: '/əˌkɑːməˈdeɪʃənz/',
      meaning: 'điều chỉnh',
      example: 'Students with disabilities should request special accommodations.',
      exampleTranslation: 'Sinh viên khuyết tật nên yêu cầu điều chỉnh đặc biệt.',
      category: 'education',
      level: 'Intermediate'
    }
  ],
  grammar: [
    {
      id: 'g1',
      structure: 'Attention all...',
      explanation: 'Cấu trúc bắt đầu thông báo',
      example: 'Attention all passengers.',
      exampleTranslation: 'Kính gửi tất cả hành khách.',
      usage: 'Dùng để bắt đầu thông báo chính thức',
      level: 'Beginner'
    }
  ],
  answerFlow: [
    {
      id: 'af1',
      step: 1,
      title: 'Read Clearly',
      description: 'Read the text with clear pronunciation',
      example: 'Speak at a moderate pace with clear articulation.',
      exampleTranslation: 'Nói với tốc độ vừa phải và phát âm rõ ràng.',
      tips: ['Speak clearly', 'Don\'t rush', 'Pause at punctuation']
    }
  ],
  modelAnswers: [
    {
      id: 'ma1',
      answer: 'Attention all employees. The annual company meeting will be held on Friday, January 15th, at 2 PM in the main conference room. Attendance is mandatory for all department heads. Please confirm your attendance by replying to this email.',
      answerTranslation: 'Kính gửi tất cả nhân viên. Cuộc họp công ty hàng năm sẽ được tổ chức vào thứ Sáu, ngày 15 tháng 1, lúc 2 giờ chiều tại phòng hội nghị chính. Việc tham dự là bắt buộc đối với tất cả trưởng phòng. Vui lòng xác nhận sự tham dự của bạn bằng cách trả lời email này.',
      keyPoints: ['Clear pronunciation', 'Appropriate pace', 'Proper intonation'],
      vocabulary: ['attention', 'employees', 'annual', 'meeting', 'mandatory', 'department', 'confirm'],
      grammar: ['Present simple', 'Future tense', 'Imperative'],
      duration: 45,
      level: 'Beginner'
    },
    {
      id: 'ma2',
      answer: 'Due to the upcoming holiday season, our customer service hours will be adjusted. From December 20th to January 3rd, our office will be open from 9 AM to 3 PM instead of the regular 8 AM to 6 PM schedule. We apologize for any inconvenience this may cause.',
      answerTranslation: 'Do mùa lễ sắp tới, giờ phục vụ khách hàng của chúng tôi sẽ được điều chỉnh. Từ ngày 20 tháng 12 đến ngày 3 tháng 1, văn phòng của chúng tôi sẽ mở cửa từ 9 giờ sáng đến 3 giờ chiều thay vì lịch thường xuyên từ 8 giờ sáng đến 6 giờ chiều. Chúng tôi xin lỗi vì sự bất tiện này có thể gây ra.',
      keyPoints: ['Clear pronunciation', 'Appropriate pace', 'Proper intonation', 'Natural pauses', 'Emphasis on dates and times'],
      vocabulary: ['upcoming', 'holiday season', 'customer service', 'hours', 'adjusted', 'office', 'regular', 'schedule', 'apologize', 'inconvenience'],
      grammar: ['Present simple', 'Future tense', 'Passive voice', 'Formal business language'],
      duration: 45,
      level: 'Beginner'
    },
    {
      id: 'ma3',
      answer: 'Good morning, everyone. This is an important announcement regarding the upcoming company-wide training program. All employees are required to attend a mandatory safety training session scheduled for next Wednesday, March 22nd, from 10:00 AM to 12:00 PM in the main auditorium on the third floor. This training will cover essential workplace safety procedures, emergency evacuation protocols, and proper use of safety equipment. Please arrive ten minutes early to check in and receive your training materials. If you are unable to attend due to a scheduling conflict, you must notify your supervisor and the Human Resources department by this Friday, March 17th, to arrange an alternative session. Your participation is essential for maintaining a safe working environment for all staff members. Thank you for your attention, and we look forward to seeing everyone at the training session.',
      answerTranslation: 'Chào buổi sáng, mọi người. Đây là một thông báo quan trọng liên quan đến chương trình đào tạo toàn công ty sắp tới. Tất cả nhân viên được yêu cầu tham dự một buổi đào tạo an toàn bắt buộc được lên lịch vào thứ Tư tới, ngày 22 tháng 3, từ 10:00 sáng đến 12:00 trưa tại hội trường chính ở tầng ba. Buổi đào tạo này sẽ bao gồm các quy trình an toàn nơi làm việc cần thiết, giao thức sơ tán khẩn cấp, và cách sử dụng đúng thiết bị an toàn. Vui lòng đến sớm mười phút để đăng ký và nhận tài liệu đào tạo. Nếu bạn không thể tham dự do xung đột lịch trình, bạn phải thông báo cho người giám sát và bộ phận Nhân sự trước thứ Sáu này, ngày 17 tháng 3, để sắp xếp một buổi thay thế. Sự tham gia của bạn là cần thiết để duy trì môi trường làm việc an toàn cho tất cả nhân viên. Cảm ơn sự chú ý của bạn, và chúng tôi mong được gặp mọi người tại buổi đào tạo.',
      keyPoints: ['Clear pronunciation', 'Appropriate pace', 'Proper intonation', 'Natural pauses', 'Emphasis on key information'],
      vocabulary: ['announcement', 'company-wide', 'mandatory', 'safety training', 'auditorium', 'procedures', 'evacuation', 'protocols', 'equipment', 'supervisor', 'Human Resources', 'participation', 'essential', 'maintaining'],
      grammar: ['Present simple', 'Future tense', 'Imperative', 'Conditional clauses', 'Passive voice'],
      duration: 60,
      level: 'Intermediate'
    },
    {
      id: 'ma4',
      answer: 'To: All Department Managers. From: Sarah Johnson, Director of Operations. Date: April 5th, 2024. Subject: Quarterly Performance Review Meeting. This memo is to inform you that the quarterly performance review meeting for the second quarter of 2024 will take place on Monday, April 15th, from 1:30 PM to 4:00 PM in Conference Room B on the second floor. All department managers are required to attend this meeting and must bring the following documents: your department\'s performance report for the first quarter, a list of goals and objectives for the upcoming quarter, and any budget proposals that require approval. Please prepare a brief presentation, approximately five to seven minutes in length, summarizing your department\'s achievements, challenges, and future plans. If you have any questions or concerns regarding this meeting, please contact my assistant, Michael Chen, at extension 2341 or via email at mchen@company.com no later than Friday, April 12th. Your attendance and preparation are crucial for the success of our quarterly planning process. Thank you for your cooperation.',
      answerTranslation: 'Gửi: Tất cả Trưởng phòng. Từ: Sarah Johnson, Giám đốc Vận hành. Ngày: 5 tháng 4, 2024. Chủ đề: Cuộc họp Đánh giá Hiệu suất Quý. Bản ghi nhớ này nhằm thông báo cho các bạn biết rằng cuộc họp đánh giá hiệu suất quý cho quý hai năm 2024 sẽ diễn ra vào thứ Hai, ngày 15 tháng 4, từ 1:30 chiều đến 4:00 chiều tại Phòng họp B ở tầng hai. Tất cả trưởng phòng được yêu cầu tham dự cuộc họp này và phải mang theo các tài liệu sau: báo cáo hiệu suất của phòng bạn cho quý một, danh sách mục tiêu và mục đích cho quý sắp tới, và bất kỳ đề xuất ngân sách nào cần được phê duyệt. Vui lòng chuẩn bị một bài thuyết trình ngắn, khoảng năm đến bảy phút, tóm tắt các thành tựu, thách thức và kế hoạch tương lai của phòng bạn. Nếu bạn có bất kỳ câu hỏi hoặc mối quan ngại nào liên quan đến cuộc họp này, vui lòng liên hệ với trợ lý của tôi, Michael Chen, tại số máy lẻ 2341 hoặc qua email tại mchen@company.com không muộn hơn thứ Sáu, ngày 12 tháng 4. Sự tham dự và chuẩn bị của bạn là rất quan trọng cho sự thành công của quá trình lập kế hoạch quý của chúng ta. Cảm ơn sự hợp tác của bạn.',
      keyPoints: ['Clear pronunciation', 'Appropriate pace', 'Proper intonation', 'Natural pauses', 'Emphasis on dates and times', 'Professional tone'],
      vocabulary: ['memo', 'department managers', 'quarterly', 'performance review', 'conference room', 'required', 'documents', 'performance report', 'goals', 'objectives', 'budget proposals', 'approval', 'presentation', 'achievements', 'challenges', 'extension', 'crucial', 'cooperation'],
      grammar: ['Present simple', 'Future tense', 'Imperative', 'Passive voice', 'Complex sentences', 'Formal business language'],
      duration: 60,
      level: 'Intermediate'
    },
    {
      id: 'ma5',
      answer: 'Important Notice: Building Maintenance and System Upgrade. Dear valued employees, we would like to inform you that our building will undergo scheduled maintenance and system upgrades during the weekend of May 18th and 19th, 2024. The maintenance work will begin on Saturday, May 18th, at 6:00 AM and is expected to be completed by Sunday, May 19th, at 8:00 PM. During this period, the entire building will be closed, and all employees will not have access to the office facilities, including parking areas, elevators, and common spaces. We understand that this may cause some inconvenience, and we sincerely apologize for any disruption to your work schedule. To minimize the impact, we strongly recommend that you complete any urgent tasks before Friday, May 17th, and save all important documents to the cloud storage system. Additionally, please ensure that all electronic devices are properly shut down and unplugged before leaving the office on Friday evening. If you have any questions or require assistance with accessing cloud storage or backing up your files, please contact the IT Support team at itsupport@company.com or call the help desk at extension 5555. We appreciate your understanding and cooperation during this necessary maintenance period. Thank you for your patience.',
      answerTranslation: 'Thông báo quan trọng: Bảo trì Tòa nhà và Nâng cấp Hệ thống. Kính gửi các nhân viên quý mến, chúng tôi muốn thông báo cho các bạn biết rằng tòa nhà của chúng tôi sẽ trải qua bảo trì theo lịch trình và nâng cấp hệ thống trong cuối tuần ngày 18 và 19 tháng 5, 2024. Công việc bảo trì sẽ bắt đầu vào thứ Bảy, ngày 18 tháng 5, lúc 6:00 sáng và dự kiến sẽ hoàn thành vào Chủ nhật, ngày 19 tháng 5, lúc 8:00 tối. Trong thời gian này, toàn bộ tòa nhà sẽ bị đóng cửa, và tất cả nhân viên sẽ không có quyền truy cập vào các cơ sở văn phòng, bao gồm khu vực đỗ xe, thang máy, và không gian chung. Chúng tôi hiểu rằng điều này có thể gây ra một số bất tiện, và chúng tôi chân thành xin lỗi vì bất kỳ gián đoạn nào đối với lịch làm việc của bạn. Để giảm thiểu tác động, chúng tôi khuyến nghị mạnh mẽ rằng bạn hoàn thành bất kỳ nhiệm vụ khẩn cấp nào trước thứ Sáu, ngày 17 tháng 5, và lưu tất cả tài liệu quan trọng vào hệ thống lưu trữ đám mây. Ngoài ra, vui lòng đảm bảo rằng tất cả thiết bị điện tử được tắt đúng cách và rút phích cắm trước khi rời văn phòng vào tối thứ Sáu. Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ về việc truy cập lưu trữ đám mây hoặc sao lưu tệp của bạn, vui lòng liên hệ với nhóm Hỗ trợ CNTT tại itsupport@company.com hoặc gọi bàn trợ giúp tại số máy lẻ 5555. Chúng tôi đánh giá cao sự hiểu biết và hợp tác của bạn trong thời gian bảo trì cần thiết này. Cảm ơn sự kiên nhẫn của bạn.',
      keyPoints: ['Clear pronunciation', 'Appropriate pace', 'Proper intonation', 'Natural pauses', 'Emphasis on dates and times', 'Professional and apologetic tone'],
      vocabulary: ['notice', 'maintenance', 'upgrade', 'scheduled', 'undergo', 'facilities', 'parking areas', 'elevators', 'common spaces', 'inconvenience', 'disruption', 'minimize', 'impact', 'urgent tasks', 'cloud storage', 'electronic devices', 'unplugged', 'assistance', 'backing up', 'IT Support', 'help desk', 'appreciate', 'cooperation', 'patience'],
      grammar: ['Present simple', 'Future tense', 'Imperative', 'Passive voice', 'Complex sentences', 'Conditional clauses', 'Formal business language'],
      duration: 60,
      level: 'Intermediate'
    },
    {
      id: 'ma6',
      answer: 'Subject: New Employee Orientation Program - June 2024. Dear Team Members, I am pleased to announce that our company will be conducting a comprehensive new employee orientation program for all recently hired staff members during the month of June 2024. The orientation sessions will be held every Monday and Wednesday throughout June, from 9:00 AM to 12:00 PM in the Training Center located on the fourth floor of our main building. This program is designed to help new employees become familiar with our company culture, policies, procedures, and organizational structure. The orientation will cover important topics such as employee benefits, health insurance options, retirement plans, vacation policies, workplace safety regulations, and our code of conduct. Additionally, new employees will receive training on our internal communication systems, including email protocols, project management software, and the company intranet. All new employees who joined the company between January 1st and May 31st, 2024, are required to attend at least one complete orientation session. Please register for your preferred session by contacting the Human Resources department at hr@company.com or by calling extension 7890 no later than Friday, May 31st, 2024. We look forward to welcoming our new team members and helping them integrate successfully into our organization.',
      answerTranslation: 'Chủ đề: Chương trình Định hướng Nhân viên Mới - Tháng 6 năm 2024. Kính gửi các Thành viên Nhóm, tôi rất vui được thông báo rằng công ty chúng tôi sẽ tiến hành một chương trình định hướng nhân viên mới toàn diện cho tất cả nhân viên mới được tuyển dụng trong tháng 6 năm 2024. Các buổi định hướng sẽ được tổ chức vào mỗi thứ Hai và thứ Tư trong suốt tháng 6, từ 9:00 sáng đến 12:00 trưa tại Trung tâm Đào tạo nằm ở tầng bốn của tòa nhà chính của chúng tôi. Chương trình này được thiết kế để giúp nhân viên mới làm quen với văn hóa công ty, chính sách, quy trình và cấu trúc tổ chức của chúng tôi. Định hướng sẽ bao gồm các chủ đề quan trọng như phúc lợi nhân viên, các lựa chọn bảo hiểm y tế, kế hoạch nghỉ hưu, chính sách nghỉ phép, quy định an toàn nơi làm việc, và quy tắc ứng xử của chúng tôi. Ngoài ra, nhân viên mới sẽ nhận được đào tạo về các hệ thống giao tiếp nội bộ của chúng tôi, bao gồm giao thức email, phần mềm quản lý dự án, và mạng nội bộ công ty. Tất cả nhân viên mới đã tham gia công ty từ ngày 1 tháng 1 đến ngày 31 tháng 5, 2024, được yêu cầu tham dự ít nhất một buổi định hướng hoàn chỉnh. Vui lòng đăng ký cho buổi ưa thích của bạn bằng cách liên hệ với bộ phận Nhân sự tại hr@company.com hoặc bằng cách gọi số máy lẻ 7890 không muộn hơn thứ Sáu, ngày 31 tháng 5, 2024. Chúng tôi mong được chào đón các thành viên nhóm mới và giúp họ tích hợp thành công vào tổ chức của chúng tôi.',
      keyPoints: ['Clear pronunciation', 'Appropriate pace', 'Proper intonation', 'Natural pauses', 'Emphasis on dates and times', 'Professional and welcoming tone'],
      vocabulary: ['subject', 'orientation', 'comprehensive', 'recently hired', 'staff members', 'sessions', 'Training Center', 'company culture', 'policies', 'procedures', 'organizational structure', 'employee benefits', 'health insurance', 'retirement plans', 'vacation policies', 'safety regulations', 'code of conduct', 'internal communication', 'email protocols', 'project management software', 'intranet', 'required', 'register', 'preferred session', 'Human Resources', 'integrate', 'organization'],
      grammar: ['Present simple', 'Future tense', 'Imperative', 'Passive voice', 'Complex sentences', 'Relative clauses', 'Formal business language'],
      duration: 60,
      level: 'Intermediate'
    },
    {
      id: 'ma7',
      answer: 'Attention all passengers. This is a public service announcement from the City Transportation Authority. We would like to inform you that due to scheduled track maintenance and signal system upgrades, the Blue Line subway service will be temporarily suspended between Central Station and Riverside Station from Saturday, July 6th, 2024, at 12:01 AM until Monday, July 8th, 2024, at 5:00 AM. During this period, alternative transportation services will be provided. Free shuttle buses will operate between Central Station and Riverside Station every ten minutes from 5:00 AM to 11:00 PM daily. The shuttle buses will make stops at all regular subway stations along the route, including Market Square, City Hall, Park Avenue, and University Boulevard. Please note that the shuttle bus service may take approximately twenty to thirty minutes longer than the regular subway service due to traffic conditions. We recommend that passengers allow extra time for their journeys and plan their travel accordingly. For real-time updates and additional information about alternative routes, please visit our website at www.citytransit.gov or call our customer service hotline at 1-800-555-TRAN. We sincerely apologize for any inconvenience this temporary service interruption may cause, and we appreciate your patience and understanding during this necessary maintenance period. Thank you for choosing City Transportation Authority.',
      answerTranslation: 'Kính gửi tất cả hành khách. Đây là thông báo dịch vụ công cộng từ Cơ quan Giao thông Thành phố. Chúng tôi muốn thông báo cho các bạn biết rằng do bảo trì đường ray theo lịch trình và nâng cấp hệ thống tín hiệu, dịch vụ tàu điện ngầm Tuyến Xanh sẽ tạm thời bị đình chỉ giữa Trạm Trung tâm và Trạm Riverside từ thứ Bảy, ngày 6 tháng 7, 2024, lúc 12:01 sáng cho đến thứ Hai, ngày 8 tháng 7, 2024, lúc 5:00 sáng. Trong thời gian này, các dịch vụ giao thông thay thế sẽ được cung cấp. Xe buýt đưa đón miễn phí sẽ hoạt động giữa Trạm Trung tâm và Trạm Riverside mỗi mười phút từ 5:00 sáng đến 11:00 tối hàng ngày. Xe buýt đưa đón sẽ dừng tại tất cả các trạm tàu điện ngầm thường xuyên dọc theo tuyến đường, bao gồm Market Square, City Hall, Park Avenue, và University Boulevard. Vui lòng lưu ý rằng dịch vụ xe buýt đưa đón có thể mất khoảng hai mươi đến ba mươi phút lâu hơn so với dịch vụ tàu điện ngầm thường xuyên do điều kiện giao thông. Chúng tôi khuyến nghị rằng hành khách dành thêm thời gian cho hành trình của họ và lập kế hoạch đi lại phù hợp. Để cập nhật thời gian thực và thông tin bổ sung về các tuyến đường thay thế, vui lòng truy cập trang web của chúng tôi tại www.citytransit.gov hoặc gọi đường dây nóng dịch vụ khách hàng của chúng tôi tại 1-800-555-TRAN. Chúng tôi chân thành xin lỗi vì bất kỳ bất tiện nào mà sự gián đoạn dịch vụ tạm thời này có thể gây ra, và chúng tôi đánh giá cao sự kiên nhẫn và hiểu biết của bạn trong thời gian bảo trì cần thiết này. Cảm ơn bạn đã chọn Cơ quan Giao thông Thành phố.',
      keyPoints: ['Clear pronunciation', 'Appropriate pace', 'Proper intonation', 'Natural pauses', 'Emphasis on dates, times, and locations', 'Professional and apologetic tone', 'Clear articulation of numbers and website'],
      vocabulary: ['attention', 'passengers', 'public service announcement', 'Transportation Authority', 'scheduled', 'track maintenance', 'signal system', 'upgrades', 'subway service', 'temporarily suspended', 'alternative transportation', 'shuttle buses', 'operate', 'regular stations', 'route', 'traffic conditions', 'allow extra time', 'real-time updates', 'alternative routes', 'customer service hotline', 'inconvenience', 'service interruption', 'patience', 'understanding', 'maintenance period'],
      grammar: ['Present simple', 'Future tense', 'Imperative', 'Passive voice', 'Complex sentences', 'Conditional clauses', 'Formal public service language'],
      duration: 60,
      level: 'Intermediate'
    },
    {
      id: 'ma8',
      answer: 'Dear Valued Guests, We would like to inform you about important changes to our hotel services and facilities that will take effect beginning Monday, August 12th, 2024. First, our complimentary breakfast service will now be served from 6:30 AM to 10:00 AM daily in the Grand Ballroom on the second floor, instead of the previous location in the main dining area. The breakfast buffet will feature an expanded selection of hot and cold items, including freshly prepared omelets, pancakes, waffles, fresh fruit, yogurt, cereals, pastries, and a variety of beverages including coffee, tea, and fresh juices. Second, our fitness center and swimming pool will be closed for renovation from Monday, August 19th, 2024, through Friday, September 6th, 2024. During this period, we have arranged for our guests to use the facilities at the nearby Riverside Athletic Club, located just two blocks away at 245 Main Street. Simply present your room key at the front desk to gain access. Third, our business center will be relocated to the third floor, Room 305, and will now operate with extended hours from 6:00 AM to 11:00 PM daily. The new business center will feature upgraded computer workstations, high-speed internet access, printing and photocopying services, and private meeting rooms available for reservation. For any questions or assistance, please contact our front desk at extension 1000 or visit our concierge desk in the lobby. We appreciate your understanding and look forward to providing you with an enhanced guest experience.',
      answerTranslation: 'Kính gửi các Khách hàng Quý mến, chúng tôi muốn thông báo cho các bạn về những thay đổi quan trọng đối với dịch vụ và cơ sở vật chất của khách sạn chúng tôi sẽ có hiệu lực bắt đầu từ thứ Hai, ngày 12 tháng 8, 2024. Thứ nhất, dịch vụ bữa sáng miễn phí của chúng tôi giờ sẽ được phục vụ từ 6:30 sáng đến 10:00 sáng hàng ngày tại Grand Ballroom ở tầng hai, thay vì địa điểm trước đây ở khu vực ăn uống chính. Bữa sáng buffet sẽ có thêm nhiều lựa chọn món nóng và lạnh, bao gồm trứng ốp lết tươi, bánh kếp, bánh quế, trái cây tươi, sữa chua, ngũ cốc, bánh ngọt, và nhiều loại đồ uống bao gồm cà phê, trà, và nước ép tươi. Thứ hai, trung tâm thể dục và bể bơi của chúng tôi sẽ bị đóng cửa để cải tạo từ thứ Hai, ngày 19 tháng 8, 2024, đến thứ Sáu, ngày 6 tháng 9, 2024. Trong thời gian này, chúng tôi đã sắp xếp cho khách của chúng tôi sử dụng các cơ sở tại Riverside Athletic Club gần đó, nằm cách hai dãy nhà tại 245 Main Street. Chỉ cần trình chìa khóa phòng của bạn tại quầy lễ tân để được truy cập. Thứ ba, trung tâm kinh doanh của chúng tôi sẽ được chuyển đến tầng ba, Phòng 305, và giờ sẽ hoạt động với giờ mở rộng từ 6:00 sáng đến 11:00 tối hàng ngày. Trung tâm kinh doanh mới sẽ có các trạm làm việc máy tính được nâng cấp, truy cập internet tốc độ cao, dịch vụ in và photocopy, và phòng họp riêng có sẵn để đặt chỗ. Đối với bất kỳ câu hỏi hoặc hỗ trợ nào, vui lòng liên hệ quầy lễ tân của chúng tôi tại số máy lẻ 1000 hoặc ghé thăm quầy tiếp tân của chúng tôi ở sảnh. Chúng tôi đánh giá cao sự hiểu biết của bạn và mong được cung cấp cho bạn một trải nghiệm khách hàng được nâng cao.',
      keyPoints: ['Clear pronunciation', 'Appropriate pace', 'Proper intonation', 'Natural pauses', 'Emphasis on dates, times, and locations', 'Professional and welcoming tone', 'Clear articulation of numbers and addresses'],
      vocabulary: ['valued guests', 'take effect', 'complimentary breakfast', 'Grand Ballroom', 'breakfast buffet', 'expanded selection', 'omelets', 'pancakes', 'waffles', 'beverages', 'fitness center', 'swimming pool', 'renovation', 'arranged', 'Riverside Athletic Club', 'room key', 'front desk', 'gain access', 'business center', 'relocated', 'extended hours', 'upgraded computer workstations', 'high-speed internet', 'photocopying services', 'private meeting rooms', 'reservation', 'concierge desk', 'lobby', 'enhanced guest experience'],
      grammar: ['Present simple', 'Future tense', 'Imperative', 'Passive voice', 'Complex sentences', 'Conditional clauses', 'Formal hospitality language'],
      duration: 60,
      level: 'Intermediate'
    },
    {
      id: 'ma9',
      answer: 'Attention all passengers traveling on Flight 847 to Tokyo, Japan. This is a final boarding call for Flight 847, scheduled to depart from Gate 12 in Terminal B at 3:45 PM. All passengers holding tickets for Flight 847 are required to proceed immediately to Gate 12 for boarding. Please have your boarding pass and passport ready for inspection at the gate. We remind you that carry-on luggage must not exceed the maximum dimensions of 22 inches by 14 inches by 9 inches, and the maximum weight limit is 15 pounds per bag. Additionally, please ensure that all electronic devices are fully charged, as you may be asked to power them on during the security screening process. Passengers requiring special assistance, including wheelchair service or help with mobility, should contact a gate agent immediately. For passengers who have checked luggage, please note that your bags will be automatically transferred to your final destination, and you can claim them at the baggage claim area in Terminal 2 upon arrival in Tokyo. The flight duration is approximately thirteen hours and thirty minutes, with a scheduled arrival time of 6:15 PM local time on Tuesday, September 10th, 2024. We thank you for your attention and wish you a pleasant journey. Once again, this is the final boarding call for Flight 847 to Tokyo, departing from Gate 12 in Terminal B.',
      answerTranslation: 'Kính gửi tất cả hành khách đi chuyến bay 847 đến Tokyo, Nhật Bản. Đây là lời gọi lên máy bay cuối cùng cho chuyến bay 847, dự kiến khởi hành từ Cổng 12 tại Nhà ga B lúc 3:45 chiều. Tất cả hành khách có vé cho chuyến bay 847 được yêu cầu tiến hành ngay lập tức đến Cổng 12 để lên máy bay. Vui lòng chuẩn bị sẵn thẻ lên máy bay và hộ chiếu của bạn để kiểm tra tại cổng. Chúng tôi nhắc nhở bạn rằng hành lý xách tay không được vượt quá kích thước tối đa 22 inch x 14 inch x 9 inch, và giới hạn trọng lượng tối đa là 15 pound mỗi túi. Ngoài ra, vui lòng đảm bảo rằng tất cả thiết bị điện tử được sạc đầy, vì bạn có thể được yêu cầu bật chúng lên trong quá trình kiểm tra an ninh. Hành khách cần hỗ trợ đặc biệt, bao gồm dịch vụ xe lăn hoặc giúp đỡ về di chuyển, nên liên hệ ngay với nhân viên cổng. Đối với hành khách đã ký gửi hành lý, vui lòng lưu ý rằng túi của bạn sẽ được tự động chuyển đến điểm đến cuối cùng của bạn, và bạn có thể nhận chúng tại khu vực nhận hành lý ở Nhà ga 2 khi đến Tokyo. Thời gian bay là khoảng mười ba giờ ba mươi phút, với thời gian đến dự kiến là 6:15 chiều giờ địa phương vào thứ Ba, ngày 10 tháng 9, 2024. Chúng tôi cảm ơn sự chú ý của bạn và chúc bạn một hành trình dễ chịu. Một lần nữa, đây là lời gọi lên máy bay cuối cùng cho chuyến bay 847 đến Tokyo, khởi hành từ Cổng 12 tại Nhà ga B.',
      keyPoints: ['Clear pronunciation', 'Appropriate pace', 'Proper intonation', 'Natural pauses', 'Emphasis on flight numbers, gates, times, and dates', 'Professional and urgent tone', 'Clear articulation of numbers and measurements'],
      vocabulary: ['attention', 'passengers', 'Flight 847', 'Tokyo', 'Japan', 'final boarding call', 'Gate 12', 'Terminal B', 'depart', 'boarding pass', 'passport', 'inspection', 'carry-on luggage', 'dimensions', 'inches', 'weight limit', 'pounds', 'electronic devices', 'fully charged', 'security screening', 'special assistance', 'wheelchair service', 'mobility', 'gate agent', 'checked luggage', 'automatically transferred', 'final destination', 'baggage claim area', 'Terminal 2', 'arrival', 'flight duration', 'thirteen hours', 'thirty minutes', 'scheduled arrival time', 'local time', 'pleasant journey'],
      grammar: ['Present simple', 'Future tense', 'Imperative', 'Passive voice', 'Complex sentences', 'Conditional clauses', 'Formal airport announcement language'],
      duration: 60,
      level: 'Intermediate'
    },
    {
      id: 'ma10',
      answer: 'Good afternoon, ladies and gentlemen. Welcome to the International Business Conference 2024, taking place here at the Grand Convention Center. We are pleased to announce that registration for today\'s conference is now open and will continue until 2:30 PM in the main lobby on the ground floor. All registered participants are required to check in at the registration desk and collect their conference materials, including name badges, program schedules, and welcome packets. The opening ceremony will commence at 3:00 PM sharp in the Grand Ballroom on the third floor, followed by the keynote address by Dr. Sarah Mitchell, a renowned expert in international business strategy, scheduled to begin at 3:30 PM. After the keynote address, there will be a networking coffee break from 4:15 PM to 4:45 PM in the Exhibition Hall, where you can meet with fellow attendees and visit our sponsor booths. The afternoon session will feature three concurrent workshop sessions running from 5:00 PM to 6:30 PM. Workshop A will focus on digital marketing strategies in Room 301, Workshop B will cover financial planning and investment in Room 302, and Workshop C will discuss human resources management in Room 303. Please note that seating is limited for each workshop, so we encourage you to arrive early to secure your preferred session. For any questions or assistance throughout the conference, please visit our information desk located in the main lobby or contact our conference staff members who will be wearing blue identification badges. We look forward to an engaging and productive conference experience. Thank you for your participation.',
      answerTranslation: 'Chào buổi chiều, thưa quý vị. Chào mừng đến với Hội nghị Kinh doanh Quốc tế 2024, diễn ra tại đây tại Trung tâm Hội nghị Grand. Chúng tôi rất vui được thông báo rằng đăng ký cho hội nghị hôm nay hiện đã mở và sẽ tiếp tục cho đến 2:30 chiều tại sảnh chính ở tầng trệt. Tất cả người tham gia đã đăng ký được yêu cầu đăng ký tại bàn đăng ký và nhận tài liệu hội nghị của họ, bao gồm thẻ tên, lịch trình chương trình, và gói chào mừng. Lễ khai mạc sẽ bắt đầu đúng 3:00 chiều tại Grand Ballroom ở tầng ba, tiếp theo là bài phát biểu chính của Tiến sĩ Sarah Mitchell, một chuyên gia nổi tiếng về chiến lược kinh doanh quốc tế, được lên lịch bắt đầu lúc 3:30 chiều. Sau bài phát biểu chính, sẽ có giờ nghỉ cà phê giao lưu từ 4:15 chiều đến 4:45 chiều tại Hội trường Triển lãm, nơi bạn có thể gặp gỡ với các người tham dự khác và thăm các gian hàng tài trợ của chúng tôi. Phiên buổi chiều sẽ có ba phiên hội thảo đồng thời chạy từ 5:00 chiều đến 6:30 chiều. Hội thảo A sẽ tập trung vào chiến lược tiếp thị kỹ thuật số tại Phòng 301, Hội thảo B sẽ bao gồm lập kế hoạch tài chính và đầu tư tại Phòng 302, và Hội thảo C sẽ thảo luận về quản lý nhân sự tại Phòng 303. Vui lòng lưu ý rằng chỗ ngồi có giới hạn cho mỗi hội thảo, vì vậy chúng tôi khuyến khích bạn đến sớm để đảm bảo phiên ưa thích của bạn. Đối với bất kỳ câu hỏi hoặc hỗ trợ nào trong suốt hội nghị, vui lòng ghé thăm bàn thông tin của chúng tôi nằm ở sảnh chính hoặc liên hệ với các thành viên nhân viên hội nghị của chúng tôi, những người sẽ đeo thẻ nhận dạng màu xanh. Chúng tôi mong đợi một trải nghiệm hội nghị hấp dẫn và hiệu quả. Cảm ơn sự tham gia của bạn.',
      keyPoints: ['Clear pronunciation', 'Appropriate pace', 'Proper intonation', 'Natural pauses', 'Emphasis on times, locations, and room numbers', 'Professional and welcoming tone', 'Clear articulation of numbers and names'],
      vocabulary: ['ladies and gentlemen', 'International Business Conference', 'Grand Convention Center', 'registration', 'main lobby', 'ground floor', 'check in', 'registration desk', 'conference materials', 'name badges', 'program schedules', 'welcome packets', 'opening ceremony', 'commence', 'Grand Ballroom', 'third floor', 'keynote address', 'renowned expert', 'international business strategy', 'networking coffee break', 'Exhibition Hall', 'attendees', 'sponsor booths', 'afternoon session', 'concurrent workshop sessions', 'digital marketing strategies', 'financial planning', 'investment', 'human resources management', 'seating is limited', 'arrive early', 'secure', 'preferred session', 'information desk', 'conference staff members', 'identification badges', 'engaging', 'productive', 'participation'],
      grammar: ['Present simple', 'Future tense', 'Imperative', 'Passive voice', 'Complex sentences', 'Relative clauses', 'Formal conference announcement language'],
      duration: 60,
      level: 'Intermediate'
    },
    {
      id: 'ma11',
      answer: 'To: All Students and Faculty Members. From: Office of Student Affairs. Date: October 15th, 2024. Subject: Important Updates Regarding Fall Semester 2024 Final Examinations. This notice is to inform all students and faculty members about important updates regarding the Fall Semester 2024 final examinations, which will take place from Monday, December 9th, 2024, through Friday, December 20th, 2024. All final examinations will be conducted in person at the designated examination halls on campus. The examination schedule has been posted on the university website and is also available at the Student Affairs Office in Building A, Room 205. Students are required to arrive at least fifteen minutes before their scheduled examination time and must bring a valid student identification card and a government-issued photo identification, such as a driver\'s license or passport. Please note that electronic devices, including cell phones, tablets, smartwatches, and calculators, are strictly prohibited in all examination rooms. Students found with unauthorized electronic devices during an examination will face immediate disciplinary action, which may include receiving a failing grade for that examination. Additionally, all examination materials, including question papers and answer sheets, must be returned to the invigilators at the end of each examination session. Students who require special accommodations due to documented disabilities should contact the Disability Services Office at disability@university.edu or call extension 4567 no later than Friday, November 22nd, 2024, to arrange appropriate accommodations. We wish all students success in their final examinations and remind you that academic integrity is of the utmost importance. For any questions or concerns, please contact the Office of Student Affairs at studentaffairs@university.edu or visit our office during regular business hours from 8:00 AM to 5:00 PM, Monday through Friday.',
      answerTranslation: 'Gửi: Tất cả Sinh viên và Thành viên Khoa. Từ: Văn phòng Công tác Sinh viên. Ngày: 15 tháng 10, 2024. Chủ đề: Cập nhật Quan trọng về Kỳ thi Cuối kỳ Học kỳ Thu 2024. Thông báo này nhằm thông báo cho tất cả sinh viên và thành viên khoa về các cập nhật quan trọng liên quan đến kỳ thi cuối kỳ Học kỳ Thu 2024, sẽ diễn ra từ thứ Hai, ngày 9 tháng 12, 2024, đến thứ Sáu, ngày 20 tháng 12, 2024. Tất cả kỳ thi cuối kỳ sẽ được tiến hành trực tiếp tại các hội trường thi được chỉ định trong khuôn viên. Lịch thi đã được đăng trên trang web của trường đại học và cũng có sẵn tại Văn phòng Công tác Sinh viên ở Tòa nhà A, Phòng 205. Sinh viên được yêu cầu đến ít nhất mười lăm phút trước giờ thi được lên lịch và phải mang theo thẻ nhận dạng sinh viên hợp lệ và giấy tờ tùy thân có ảnh do chính phủ cấp, chẳng hạn như bằng lái xe hoặc hộ chiếu. Vui lòng lưu ý rằng thiết bị điện tử, bao gồm điện thoại di động, máy tính bảng, đồng hồ thông minh, và máy tính, bị nghiêm cấm trong tất cả các phòng thi. Sinh viên bị phát hiện có thiết bị điện tử trái phép trong khi thi sẽ phải đối mặt với hành động kỷ luật ngay lập tức, có thể bao gồm nhận điểm không đạt cho kỳ thi đó. Ngoài ra, tất cả tài liệu thi, bao gồm đề thi và phiếu trả lời, phải được trả lại cho các giám thị vào cuối mỗi phiên thi. Sinh viên cần điều chỉnh đặc biệt do khuyết tật được ghi nhận nên liên hệ với Văn phòng Dịch vụ Khuyết tật tại disability@university.edu hoặc gọi số máy lẻ 4567 không muộn hơn thứ Sáu, ngày 22 tháng 11, 2024, để sắp xếp điều chỉnh phù hợp. Chúng tôi chúc tất cả sinh viên thành công trong kỳ thi cuối kỳ của họ và nhắc nhở bạn rằng tính toàn vẹn học thuật là vô cùng quan trọng. Đối với bất kỳ câu hỏi hoặc mối quan ngại nào, vui lòng liên hệ Văn phòng Công tác Sinh viên tại studentaffairs@university.edu hoặc ghé thăm văn phòng của chúng tôi trong giờ làm việc thường xuyên từ 8:00 sáng đến 5:00 chiều, thứ Hai đến thứ Sáu.',
      keyPoints: ['Clear pronunciation', 'Appropriate pace', 'Proper intonation', 'Natural pauses', 'Emphasis on dates, times, locations, and contact information', 'Professional and formal tone', 'Clear articulation of numbers, email addresses, and extensions'],
      vocabulary: ['students', 'faculty members', 'Office of Student Affairs', 'Fall Semester', 'final examinations', 'designated examination halls', 'campus', 'examination schedule', 'university website', 'Student Affairs Office', 'Building A', 'Room 205', 'arrive at least fifteen minutes', 'valid student identification card', 'government-issued photo identification', 'driver\'s license', 'passport', 'electronic devices', 'cell phones', 'tablets', 'smartwatches', 'calculators', 'strictly prohibited', 'examination rooms', 'unauthorized electronic devices', 'immediate disciplinary action', 'failing grade', 'examination materials', 'question papers', 'answer sheets', 'invigilators', 'examination session', 'special accommodations', 'documented disabilities', 'Disability Services Office', 'extension 4567', 'appropriate accommodations', 'academic integrity', 'utmost importance', 'regular business hours', 'Monday through Friday'],
      grammar: ['Present simple', 'Future tense', 'Imperative', 'Passive voice', 'Complex sentences', 'Conditional clauses', 'Relative clauses', 'Formal academic notice language'],
      duration: 60,
      level: 'Intermediate'
    }
  ]
};

// Export TOEIC Speaking Questions 1-2 topics
export const toeicSpeakingQuestions1_2Topics: SpeakingTopic[] = [
  toeicReadAloudTopic,
];
