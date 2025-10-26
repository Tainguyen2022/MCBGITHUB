import { ToeicTask } from '../../types';

type ToeicTaskContent = Pick<ToeicTask, 'sampleAnswer_en' | 'sampleAnswer_vi' | 'outline_en' | 'outline_vi' | 'vocabulary'>;

export const toeicPart4Content: Record<string, ToeicTaskContent> = {
    't-spk-q8-10-1': {
        sampleAnswer_en: "Q8: The first event is the Opening Remarks at 9:00 AM, and it will be held in the Main Hall.\n\nQ9: Certainly. The session on The Future of Public Transportation is scheduled for 2:30 PM, and it's also in the Main Hall.\n\nQ10: Of course. The two events in the afternoon are 'The Future of Public Transportation' at 2:30 PM in the Main Hall, followed by the 'Q&A with Planners' at 4:00 PM in Room B.",
        sampleAnswer_vi: "Q8: Sự kiện đầu tiên là Phát biểu Khai mạc lúc 9:00 sáng, và nó sẽ được tổ chức tại Sảnh Chính.\n\nQ9: Chắc chắn rồi. Buổi hội thảo về Tương lai của Giao thông Công cộng được lên lịch vào lúc 2:30 chiều, và nó cũng ở trong Sảnh Chính.\n\nQ10: Dĩ nhiên ạ. Hai sự kiện vào buổi chiều là 'Tương lai của Giao thông Công cộng' lúc 2:30 chiều tại Sảnh Chính, theo sau là 'Hỏi & Đáp với các Nhà quy hoạch' lúc 4:00 chiều tại Phòng B.",
        outline_en: "1. For Q8: Directly state the first event ('Opening Remarks') and its location ('Main Hall').\n2. For Q9: Find the 'Public Transportation' keyword, then state its time ('2:30 PM') and location ('Main Hall').\n3. For Q10: Identify the two events after noon. State the first event with its time and location, then use a linking word like 'followed by' to introduce the second event with its time and location.",
        outline_vi: "1. Đối với Q8: Nêu trực tiếp sự kiện đầu tiên ('Phát biểu Khai mạc') và địa điểm của nó ('Sảnh Chính').\n2. Đối với Q9: Tìm từ khóa 'Public Transportation', sau đó nêu thời gian ('2:30 PM') và địa điểm ('Sảnh Chính').\n3. Đối với Q10: Xác định hai sự kiện sau buổi trưa. Nêu sự kiện đầu tiên với thời gian và địa điểm, sau đó dùng từ nối như 'followed by' để giới thiệu sự kiện thứ hai với thời gian và địa điểm của nó.",
        vocabulary: [
            { word: 'opening remarks', ipa: '/ˈəʊpənɪŋ rɪˈmɑːrks/', pos: 'n. phr.', vi: 'phát biểu khai mạc' },
            { word: 'session', ipa: '/ˈseʃn/', pos: 'n.', vi: 'buổi, phiên họp' },
            { word: 'urban development', ipa: '/ˈɜːrbən dɪˈveləpmənt/', pos: 'n. phr.', vi: 'phát triển đô thị' },
            { word: 'Q&A (Question and Answer)', ipa: '/ˌkjuː ənd ˈeɪ/', pos: 'n. phr.', vi: 'hỏi và đáp' }
        ]
    },
    't-spk-q8-10-2': {
        sampleAnswer_en: "Q8: The flight to Chicago departs at 9:00 AM on May 10th.\n\nQ9: Yes, we are meeting with Sterling Corporation.\n\nQ10: Certainly. On May 11th, we have a client meeting with Sterling Corp. at 10:00 AM, and then a project presentation at the main office at 3:00 PM.",
        sampleAnswer_vi: "Q8: Chuyến bay đến Chicago khởi hành lúc 9:00 sáng ngày 10 tháng 5.\n\nQ9: Vâng, chúng ta sẽ họp với tập đoàn Sterling.\n\nQ10: Chắc chắn rồi. Vào ngày 11 tháng 5, chúng ta có một cuộc họp với khách hàng là Sterling Corp. lúc 10:00 sáng, và sau đó là một bài thuyết trình dự án tại văn phòng chính lúc 3:00 chiều.",
        outline_en: "1. For Q8: State the departure time and date.\n2. For Q9: Find the client name on the schedule.\n3. For Q10: Summarize the two events scheduled for May 11th, including the time and description for each.",
        outline_vi: "1. Đối với Q8: Nêu thời gian và ngày khởi hành.\n2. Đối với Q9: Tìm tên khách hàng trên lịch trình.\n3. Đối với Q10: Tóm tắt hai sự kiện được lên lịch cho ngày 11 tháng 5, bao gồm thời gian và mô tả cho mỗi sự kiện.",
        vocabulary: [
            { word: 'itinerary', ipa: '/aɪˈtɪnəreri/', pos: 'n.', vi: 'lịch trình chuyến đi' },
            { word: 'depart', ipa: '/dɪˈpɑːrt/', pos: 'v.', vi: 'khởi hành' },
            { word: 'client meeting', ipa: '/ˈklaɪənt ˈmiːtɪŋ/', pos: 'n. phr.', vi: 'cuộc họp với khách hàng' },
            { word: 'presentation', ipa: '/ˌpreznˈteɪʃn/', pos: 'n.', vi: 'bài thuyết trình' }
        ]
    },
    't-spk-q8-10-3': {
        sampleAnswer_en: "Q8: According to the schedule, the doors for the job fair open at 10:00 AM.\n\nQ9: The resume writing workshop will be held in Room 201.\n\nQ10: Certainly. In the afternoon, there is a presentation by Innovate Corp. at 1:00 PM in the Auditorium, and a networking session will take place at 3:00 PM in the Grand Ballroom.",
        sampleAnswer_vi: "Q8: Theo lịch trình, cửa hội chợ việc làm sẽ mở vào lúc 10:00 sáng.\n\nQ9: Hội thảo viết sơ yếu lý lịch sẽ được tổ chức tại Phòng 201.\n\nQ10: Chắc chắn rồi. Vào buổi chiều, có một bài thuyết trình của Innovate Corp. lúc 1:00 chiều tại Giảng đường, và một buổi giao lưu kết nối sẽ diễn ra lúc 3:00 chiều tại Sảnh Lớn.",
        outline_en: "1. For Q8: Find 'Doors Open' and state the time.\n2. For Q9: Find 'Resume Writing' and state the location.\n3. For Q10: Identify the two afternoon events. State the 1 PM event and location, then the 3 PM event and location.",
        outline_vi: "1. Đối với Q8: Tìm 'Doors Open' và nêu thời gian.\n2. Đối với Q9: Tìm 'Resume Writing' và nêu địa điểm.\n3. Đối với Q10: Xác định hai sự kiện buổi chiều. Nêu sự kiện 1 giờ chiều và địa điểm, sau đó là sự kiện 3 giờ chiều và địa điểm.",
        vocabulary: [
            { word: 'job fair', ipa: '/ˈdʒɒb feər/', pos: 'n. phr.', vi: 'hội chợ việc làm' },
            { word: 'workshop', ipa: '/ˈwɜːrkʃɒp/', pos: 'n.', vi: 'hội thảo' },
            { word: 'presentation', ipa: '/ˌpreznˈteɪʃn/', pos: 'n.', vi: 'bài thuyết trình' },
            { word: 'networking session', ipa: '/ˈnetwɜːrkɪŋ ˈseʃn/', pos: 'n. phr.', vi: 'buổi giao lưu kết nối' }
        ]
    },
    't-spk-q8-10-4': {
        sampleAnswer_en: "Q8: Dr. Evans' first patient today is Mark Lee, at 9:00 AM.\n\nQ9: The staff meeting is scheduled for 1:30 PM this afternoon.\n\nQ10: Yes, that is correct. I can confirm that the 11:30 AM appointment is for a new patient named David Kim.",
        sampleAnswer_vi: "Q8: Bệnh nhân đầu tiên của Bác sĩ Evans hôm nay là Mark Lee, lúc 9:00 sáng.\n\nQ9: Cuộc họp nhân viên được lên lịch vào lúc 1:30 chiều nay.\n\nQ10: Vâng, đúng vậy ạ. Tôi có thể xác nhận rằng cuộc hẹn lúc 11:30 sáng là dành cho bệnh nhân mới tên David Kim.",
        outline_en: "1. For Q8: Find the first entry and state the name and time.\n2. For Q9: Find 'Staff Meeting' and state the time.\n3. For Q10: Confirm the 11:30 time is for a 'New Patient', and then state the corresponding name 'David Kim'.",
        outline_vi: "1. Đối với Q8: Tìm mục đầu tiên và nêu tên và thời gian.\n2. Đối với Q9: Tìm 'Staff Meeting' và nêu thời gian.\n3. Đối với Q10: Xác nhận thời gian 11:30 là dành cho 'New Patient', sau đó nêu tên tương ứng 'David Kim'.",
        vocabulary: [
            { word: 'annual check-up', ipa: '/ˈænjuəl ˈtʃek ʌp/', pos: 'n. phr.', vi: 'khám sức khỏe định kỳ' },
            { word: 'follow-up', ipa: '/ˈfɒləʊ ʌp/', pos: 'n.', vi: 'tái khám' },
            { word: 'appointment', ipa: '/əˈpɔɪntmənt/', pos: 'n.', vi: 'cuộc hẹn' }
        ]
    },
    't-spk-q8-10-5': {
        sampleAnswer_en: "Q8: On December 24th, the library closes at 1:00 PM.\n\nQ9: No, the library will be closed on December 25th, which is Christmas Day.\n\nQ10: Certainly. On New Year's Eve, December 31st, the library is open from 9 AM to 5 PM. However, it will be closed on New Year's Day, January 1st.",
        sampleAnswer_vi: "Q8: Vào ngày 24 tháng 12, thư viện đóng cửa lúc 1:00 chiều.\n\nQ9: Không ạ, thư viện sẽ đóng cửa vào ngày 25 tháng 12, tức là ngày Giáng sinh.\n\nQ10: Chắc chắn rồi. Vào đêm Giao thừa, ngày 31 tháng 12, thư viện mở cửa từ 9 giờ sáng đến 5 giờ chiều. Tuy nhiên, thư viện sẽ đóng cửa vào ngày Tết Dương lịch, 1 tháng 1.",
        outline_en: "1. For Q8: Find Dec 24 and state the closing time.\n2. For Q9: Find Dec 25, state that it's closed.\n3. For Q10: State the hours for Dec 31 (New Year's Eve), then state that it's closed on Jan 1 (New Year's Day).",
        outline_vi: "1. Đối với Q8: Tìm ngày 24/12 và nêu giờ đóng cửa.\n2. Đối với Q9: Tìm ngày 25/12, nêu rằng nó đóng cửa.\n3. Đối với Q10: Nêu giờ làm việc của ngày 31/12 (Giao thừa), sau đó nêu rằng nó đóng cửa vào ngày 1/1 (Tết Dương lịch).",
        vocabulary: [
            { word: 'holiday hours', ipa: '/ˈhɒlədeɪ ˈaʊərz/', pos: 'n. phr.', vi: 'giờ làm việc ngày lễ' },
            { word: 'resume', ipa: '/rɪˈzjuːm/', pos: 'v.', vi: 'tiếp tục lại' },
            { word: 'New Year\'s Eve', ipa: '/ˌnjuː jɪərz ˈiːv/', pos: 'n.', vi: 'đêm Giao thừa' }
        ]
    },
    't-spk-q8-10-6': {
        sampleAnswer_en: "Q8: This ticket is for the movie 'Planet Explorers'.\n\nQ9: Yes, your seat number is G12.\n\nQ10: Of course. The movie is on November 5th at 7:15 PM, and it will be shown in Screen 8.",
        sampleAnswer_vi: "Q8: Vé này là cho phim 'Planet Explorers'.\n\nQ9: Vâng, số ghế của bạn là G12.\n\nQ10: Dĩ nhiên ạ. Phim chiếu vào ngày 5 tháng 11 lúc 7:15 tối, và sẽ được chiếu tại Phòng chiếu số 8.",
        outline_en: "1. For Q8: Read the movie title.\n2. For Q9: Read the seat number.\n3. For Q10: Read the date, time, and screen number from the ticket information.",
        outline_vi: "1. Đối với Q8: Đọc tên phim.\n2. Đối với Q9: Đọc số ghế.\n3. Đối với Q10: Đọc ngày, giờ và số phòng chiếu từ thông tin trên vé.",
        vocabulary: [
            { word: 'screen', ipa: '/skriːn/', pos: 'n.', vi: 'phòng chiếu, màn hình' },
            { word: 'seat', ipa: '/siːt/', pos: 'n.', vi: 'ghế ngồi' },
            { word: 'confirm', ipa: '/kənˈfɜːrm/', pos: 'v.', vi: 'xác nhận' }
        ]
    },
    't-spk-q8-10-7': {
        sampleAnswer_en: "Q8: At 7:00 PM, the National News will be on.\n\nQ9: The documentary is titled 'Wonders of the Deep Sea'.\n\nQ10: After 9:00 PM, the movie 'The Last Adventure' will be on at 9:30 PM, and that will be followed by The Late Show at 11:30 PM.",
        sampleAnswer_vi: "Q8: Vào lúc 7:00 tối, sẽ có chương trình Thời sự Quốc gia.\n\nQ9: Phim tài liệu có tựa đề là 'Wonders of the Deep Sea' (Những kỳ quan của biển sâu).\n\nQ10: Sau 9:00 tối, sẽ có bộ phim 'The Last Adventure' lúc 9:30 tối, và sau đó là chương trình The Late Show lúc 11:30 tối.",
        outline_en: "1. For Q8: Find 7:00 PM and state the program name.\n2. For Q9: Find 'Documentary' and state its full title.\n3. For Q10: Identify the two programs after 9 PM. State the first with its time, then the second with its time.",
        outline_vi: "1. Đối với Q8: Tìm 7:00 tối và nêu tên chương trình.\n2. Đối với Q9: Tìm 'Documentary' và nêu tên đầy đủ của nó.\n3. Đối với Q10: Xác định hai chương trình sau 9 giờ tối. Nêu chương trình đầu tiên với thời gian, sau đó là chương trình thứ hai với thời gian.",
        vocabulary: [
            { word: 'documentary', ipa: '/ˌdɒkjuˈmentri/', pos: 'n.', vi: 'phim tài liệu' },
            { word: 'schedule', ipa: '/ˈʃedjuːl/', pos: 'n.', vi: 'lịch trình' },
            { word: 'followed by', ipa: '/ˈfɒləʊd baɪ/', pos: 'phr.', vi: 'theo sau là' }
        ]
    },
    't-spk-q8-10-8': {
        sampleAnswer_en: "Q8: Today's soup is Tomato Basil.\n\nQ9: The Grilled Salmon comes with vegetables.\n\nQ10: The special offer is a full set which includes the soup, main course, and dessert. It costs $35.",
        sampleAnswer_vi: "Q8: Súp của ngày hôm nay là Súp Cà chua Húng quế.\n\nQ9: Món Cá hồi nướng đi kèm với rau củ ạ.\n\nQ10: Ưu đãi đặc biệt là một set đầy đủ bao gồm súp, món chính và tráng miệng. Nó có giá là 35 đô la.",
        outline_en: "1. For Q8: Read the name of the soup.\n2. For Q9: Read the side dish for the main course.\n3. For Q10: Explain that the 'full set' includes all three items and state the price.",
        outline_vi: "1. Đối với Q8: Đọc tên món súp.\n2. Đối với Q9: Đọc món ăn kèm của món chính.\n3. Đối với Q10: Giải thích rằng 'full set' bao gồm cả ba món và nêu giá.",
        vocabulary: [
            { word: 'specials', ipa: '/ˈspeʃəlz/', pos: 'n.', vi: 'các món đặc biệt' },
            { word: 'main course', ipa: '/meɪn kɔːrs/', pos: 'n. phr.', vi: 'món chính' },
            { word: 'dessert', ipa: '/dɪˈzɜːrt/', pos: 'n.', vi: 'món tráng miệng' }
        ]
    },
    't-spk-q8-10-9': {
        sampleAnswer_en: "Q8: The train departs from platform 5A.\n\nQ9: It will arrive at West Station at 3:00 PM.\n\nQ10: Yes. The train departs from North Station at 2:15 PM and is scheduled to arrive in Central City at 4:30 PM.",
        sampleAnswer_vi: "Q8: Tàu khởi hành từ sân ga 5A.\n\nQ9: Nó sẽ đến Ga Tây vào lúc 3:00 chiều.\n\nQ10: Vâng. Tàu khởi hành từ Ga Bắc lúc 2:15 chiều và dự kiến đến Thành phố Trung tâm lúc 4:30 chiều.",
        outline_en: "1. For Q8: Find 'Platform' and state the number.\n2. For Q9: Find 'Arrive West Station' and state the time.\n3. For Q10: State the departure time from North Station and the arrival time at Central City.",
        outline_vi: "1. Đối với Q8: Tìm 'Platform' và nêu số.\n2. Đối với Q9: Tìm 'Arrive West Station' và nêu thời gian.\n3. Đối với Q10: Nêu thời gian khởi hành từ Ga Bắc và thời gian đến Thành phố Trung tâm.",
        vocabulary: [
            { word: 'depart', ipa: '/dɪˈpɑːrt/', pos: 'v.', vi: 'khởi hành' },
            { word: 'arrive', ipa: '/əˈraɪv/', pos: 'v.', vi: 'đến nơi' },
            { word: 'platform', ipa: '/ˈplætfɔːrm/', pos: 'n.', vi: 'sân ga' }
        ]
    },
    't-spk-q8-10-10': {
        sampleAnswer_en: "Q8: The instructor for the class is Anna Bell.\n\nQ9: Yes, the class is held on Tuesdays from 8:00 AM to 9:00 AM.\n\nQ10: The class is located in Studio 2, and the note says that you should bring your own mat.",
        sampleAnswer_vi: "Q8: Người hướng dẫn lớp học là Anna Bell.\n\nQ9: Vâng, lớp học được tổ chức vào các ngày thứ Ba từ 8:00 sáng đến 9:00 sáng.\n\nQ10: Lớp học ở Studio 2, và có ghi chú rằng bạn nên mang theo thảm tập của riêng mình.",
        outline_en: "Q8: State instructor name. Q9: State day and time. Q10: State location and required item.",
        outline_vi: "Q8: Nêu tên người hướng dẫn. Q9: Nêu ngày và giờ. Q10: Nêu địa điểm và vật dụng cần thiết.",
        vocabulary: [
            { word: 'instructor', ipa: '/ɪnˈstrʌktər/', pos: 'n.', vi: 'người hướng dẫn' },
            { word: 'studio', ipa: '/ˈstuːdiəʊ/', pos: 'n.', vi: 'phòng tập' },
            { word: 'mat', ipa: '/mæt/', pos: 'n.', vi: 'thảm tập' }
        ]
    },
    't-spk-q8-10-11': {
        sampleAnswer_en: "Q8: The 20th Century Paintings are located on the first floor.\n\nQ9: The special photography exhibition is on the third floor.\n\nQ10: Certainly. On the second floor, you will find the Sculpture Garden, and the third floor is where the Special Exhibition on 'The Art of Photography' is located.",
        sampleAnswer_vi: "Q8: Tranh thế kỷ 20 ở tầng một.\n\nQ9: Triển lãm nhiếp ảnh đặc biệt ở trên tầng ba.\n\nQ10: Chắc chắn rồi. Ở tầng hai, bạn sẽ tìm thấy Vườn Điêu khắc, và tầng ba là nơi có Triển lãm Đặc biệt về 'Nghệ thuật Nhiếp ảnh'.",
        outline_en: "Q8: State the location of the paintings. Q9: State the location of the exhibition. Q10: Describe what is on the second floor, then what is on the third floor.",
        outline_vi: "Q8: Nêu vị trí của các bức tranh. Q9: Nêu vị trí của triển lãm. Q10: Mô tả những gì có ở tầng hai, sau đó là những gì có ở tầng ba.",
        vocabulary: [
            { word: 'exhibition', ipa: '/ˌeksɪˈbɪʃn/', pos: 'n.', vi: 'triển lãm' },
            { word: 'sculpture', ipa: '/ˈskʌlptʃər/', pos: 'n.', vi: 'điêu khắc' },
            { word: 'gallery', ipa: '/ˈɡæləri/', pos: 'n.', vi: 'phòng trưng bày' }
        ]
    },
    't-spk-q8-10-12': {
        sampleAnswer_en: "Q8: The first shuttle to the airport departs at 6:00 AM.\n\nQ9: The journey to the airport takes approximately 45 minutes.\n\nQ10: To be at the airport by 10:00 AM, you should take either the 7:30 AM or the 9:00 AM shuttle. The 7:30 AM shuttle arrives around 8:15 AM, and the 9:00 AM one arrives around 9:45 AM.",
        sampleAnswer_vi: "Q8: Chuyến xe đưa đón đầu tiên đến sân bay khởi hành lúc 6:00 sáng.\n\nQ9: Chuyến đi đến sân bay mất khoảng 45 phút.\n\nQ10: Để có mặt tại sân bay trước 10:00 sáng, bạn nên đi chuyến xe lúc 7:30 sáng hoặc 9:00 sáng. Chuyến 7:30 sẽ đến nơi khoảng 8:15, và chuyến 9:00 sẽ đến nơi khoảng 9:45.",
        outline_en: "Q8: State the first departure time. Q9: State the journey duration. Q10: Identify the two suitable departure times (7:30 AM and 9:00 AM) by calculating their arrival times.",
        outline_vi: "Q8: Nêu thời gian khởi hành đầu tiên. Q9: Nêu thời gian di chuyển. Q10: Xác định hai thời gian khởi hành phù hợp (7:30 sáng và 9:00 sáng) bằng cách tính toán thời gian đến nơi của chúng.",
        vocabulary: [
            { word: 'shuttle', ipa: '/ˈʃʌtl/', pos: 'n.', vi: 'xe đưa đón' },
            { word: 'departure', ipa: '/dɪˈpɑːrtʃər/', pos: 'n.', vi: 'sự khởi hành' },
            { word: 'approximately', ipa: '/əˈprɒksɪmətli/', pos: 'adv.', vi: 'khoảng, xấp xỉ' }
        ]
    },
    't-spk-q8-10-13': {
        sampleAnswer_en: "Q8: A wireless keyboard was ordered.\n\nQ9: Of course, the price of the item is $49.99.\n\nQ10: The order is being shipped to Jane Smith, and the estimated delivery date is March 15th.",
        sampleAnswer_vi: "Q8: Một bàn phím không dây đã được đặt hàng.\n\nQ9: Dĩ nhiên, giá của mặt hàng là 49,99 đô la.\n\nQ10: Đơn hàng đang được vận chuyển đến Jane Smith, và ngày giao hàng dự kiến là ngày 15 tháng 3.",
        outline_en: "Q8: State the item. Q9: State the price. Q10: State the recipient's name and the delivery date.",
        outline_vi: "Q8: Nêu tên mặt hàng. Q9: Nêu giá. Q10: Nêu tên người nhận và ngày giao hàng.",
        vocabulary: [
            { word: 'wireless', ipa: '/ˈwaɪərləs/', pos: 'adj.', vi: 'không dây' },
            { word: 'confirm', ipa: '/kənˈfɜːrm/', pos: 'v.', vi: 'xác nhận' },
            { word: 'estimated delivery', ipa: '/ˈestɪmeɪtɪd dɪˈlɪvəri/', pos: 'n. phr.', vi: 'giao hàng dự kiến' }
        ]
    },
    't-spk-q8-10-14': {
        sampleAnswer_en: "Q8: The problem with the laptop is that it does not turn on.\n\nQ9: The repair will cost eighty-five dollars.\n\nQ10: Hello, Mr. Davis. Your laptop will be ready for pickup on Thursday, anytime after 3 PM. The cost will be eighty-five dollars.",
        sampleAnswer_vi: "Q8: Vấn đề với chiếc máy tính xách tay là nó không bật lên được.\n\nQ9: Chi phí sửa chữa sẽ là tám mươi lăm đô la.\n\nQ10: Chào ông Davis. Máy tính xách tay của ông sẽ sẵn sàng để nhận vào thứ Năm, bất kỳ lúc nào sau 3 giờ chiều. Chi phí sẽ là tám mươi lăm đô la.",
        outline_en: "Q8: State the problem. Q9: State the cost. Q10: Address the customer, state the pickup day/time, and the cost.",
        outline_vi: "Q8: Nêu vấn đề. Q9: Nêu chi phí. Q10: Xưng hô với khách hàng, nêu ngày/giờ nhận hàng và chi phí.",
        vocabulary: [
            { word: 'repair', ipa: '/rɪˈpeər/', pos: 'n.', vi: 'sự sửa chữa' },
            { word: 'turn on', ipa: '/tɜːrn ɒn/', pos: 'phr. v.', vi: 'bật lên' },
            { word: 'pickup', ipa: '/ˈpɪkʌp/', pos: 'n.', vi: 'việc nhận hàng' }
        ]
    },
    't-spk-q8-10-15': {
        sampleAnswer_en: "Q8: The member's name is Sarah Williams.\n\nQ9: The Gold Annual plan includes full gym access, all classes, and the swimming pool.\n\nQ10: According to the information, your membership started on June 1, 2024, and your next payment is due on June 1, 2025.",
        sampleAnswer_vi: "Q8: Tên của thành viên là Sarah Williams.\n\nQ9: Gói Vàng Thường niên bao gồm quyền truy cập toàn bộ phòng gym, tất cả các lớp học và hồ bơi.\n\nQ10: Theo thông tin, tư cách thành viên của bạn đã bắt đầu vào ngày 1 tháng 6 năm 2024 và khoản thanh toán tiếp theo của bạn sẽ đến hạn vào ngày 1 tháng 6 năm 2025.",
        outline_en: "Q8: State the member's name. Q9: List the included facilities. Q10: State the start date and the next payment due date.",
        outline_vi: "Q8: Nêu tên thành viên. Q9: Liệt kê các tiện ích bao gồm. Q10: Nêu ngày bắt đầu và ngày đến hạn thanh toán tiếp theo.",
        vocabulary: [
            { word: 'membership', ipa: '/ˈmembərʃɪp/', pos: 'n.', vi: 'tư cách thành viên' },
            { word: 'access', ipa: '/ˈækses/', pos: 'n.', vi: 'quyền truy cập' },
            { word: 'payment due', ipa: '/ˈpeɪmənt djuː/', pos: 'n. phr.', vi: 'thanh toán đến hạn' }
        ]
    },
    't-spk-q8-10-16': {
        sampleAnswer_en: "Q8: Tom is responsible for cleaning the kitchen on Monday.\n\nQ9: On Friday, the living room needs to be cleaned, and the vacuuming needs to be done.\n\nQ10: Yes, of course. Maria's responsibilities are to clean the bathroom on Wednesday and to take care of the balcony and plants on Saturday.",
        sampleAnswer_vi: "Q8: Tom chịu trách nhiệm dọn dẹp nhà bếp vào thứ Hai.\n\nQ9: Vào thứ Sáu, phòng khách cần được dọn dẹp và cần phải hút bụi.\n\nQ10: Vâng, dĩ nhiên. Trách nhiệm của Maria là dọn dẹp phòng tắm vào thứ Tư và chăm sóc ban công và cây cối vào thứ Bảy.",
        outline_en: "Q8: State who cleans the kitchen. Q9: State the two tasks for Friday. Q10: List Maria's two responsibilities with their respective days.",
        outline_vi: "Q8: Nêu người dọn dẹp nhà bếp. Q9: Nêu hai công việc cho ngày thứ Sáu. Q10: Liệt kê hai trách nhiệm của Maria cùng với các ngày tương ứng.",
        vocabulary: [
            { word: 'responsible for', ipa: '/rɪˈspɒnsəbl fər/', pos: 'adj. phr.', vi: 'chịu trách nhiệm về' },
            { word: 'vacuuming', ipa: '/ˈvækjuːmɪŋ/', pos: 'n.', vi: 'việc hút bụi' },
            { word: 'balcony', ipa: '/ˈbælkəni/', pos: 'n.', vi: 'ban công' }
        ]
    },
    't-spk-q8-10-17': {
        sampleAnswer_en: "Q8: The keynote speech is given by Lisa Ray.\n\nQ9: The workshop at 11:00 AM is about Social Media Strategy.\n\nQ10: At 10:00 AM, there is the Keynote Speech by Lisa Ray. Then, at 2:00 PM, there's a Panel Discussion about 'Branding in 2025'.",
        sampleAnswer_vi: "Q8: Bài phát biểu chính được trình bày bởi Lisa Ray.\n\nQ9: Hội thảo lúc 11:00 sáng là về Chiến lược Truyền thông Xã hội.\n\nQ10: Vào lúc 10:00 sáng, có Bài phát biểu chính của Lisa Ray. Sau đó, vào lúc 2:00 chiều, có một Buổi thảo luận nhóm về 'Xây dựng thương hiệu năm 2025'.",
        outline_en: "Q8: State the speaker's name. Q9: State the workshop topic. Q10: State the 10 AM event, then the 2 PM event.",
        outline_vi: "Q8: Nêu tên diễn giả. Q9: Nêu chủ đề hội thảo. Q10: Nêu sự kiện 10 giờ sáng, sau đó là sự kiện 2 giờ chiều.",
        vocabulary: [
            { word: 'keynote speech', ipa: '/ˈkiːnəʊt spiːtʃ/', pos: 'n. phr.', vi: 'bài phát biểu chính' },
            { word: 'panel discussion', ipa: '/ˈpænl dɪˈskʌʃn/', pos: 'n. phr.', vi: 'buổi thảo luận nhóm' },
            { word: 'branding', ipa: '/ˈbrændɪŋ/', pos: 'n.', vi: 'xây dựng thương hiệu' }
        ]
    },
    't-spk-q8-10-18': {
        sampleAnswer_en: "Q8: The apartment has two bedrooms.\n\nQ9: The apartment will be available starting on August 1st.\n\nQ10: Of course. The monthly rent is $1,500, and the person to contact is Mr. Chen.",
        sampleAnswer_vi: "Q8: Căn hộ có hai phòng ngủ.\n\nQ9: Căn hộ sẽ có sẵn bắt đầu từ ngày 1 tháng 8.\n\nQ10: Dĩ nhiên ạ. Tiền thuê hàng tháng là 1.500 đô la, và người để liên hệ là ông Chen.",
        outline_en: "Q8: State the number of bedrooms. Q9: State the availability date. Q10: State the rent and the contact person.",
        outline_vi: "Q8: Nêu số phòng ngủ. Q9: Nêu ngày có sẵn. Q10: Nêu tiền thuê và người liên hệ.",
        vocabulary: [
            { word: 'rent', ipa: '/rent/', pos: 'n.', vi: 'tiền thuê' },
            { word: 'available', ipa: '/əˈveɪləbl/', pos: 'adj.', vi: 'có sẵn' },
            { word: 'contact', ipa: '/ˈkɒntækt/', pos: 'n.', vi: 'người liên hệ' }
        ]
    },
    't-spk-q8-10-19': {
        sampleAnswer_en: "Q8: The pottery class is at 1:00 PM.\n\nQ9: The Children's Story Time is held in the Library.\n\nQ10: The two events happening in the Main Hall today are the Community Choir Practice at 4:00 PM and Movie Night at 7:00 PM.",
        sampleAnswer_vi: "Q8: Lớp học gốm diễn ra lúc 1:00 chiều.\n\nQ9: Giờ kể chuyện cho trẻ em được tổ chức tại Thư viện.\n\nQ10: Hai sự kiện diễn ra tại Sảnh Chính hôm nay là Buổi tập hát của Dàn hợp xướng Cộng đồng lúc 4:00 chiều và Đêm chiếu phim lúc 7:00 tối.",
        outline_en: "Q8: State the time for the pottery class. Q9: State the location for Story Time. Q10: Identify and state the two events in the Main Hall with their times.",
        outline_vi: "Q8: Nêu thời gian cho lớp học gốm. Q9: Nêu địa điểm cho Giờ kể chuyện. Q10: Xác định và nêu hai sự kiện ở Sảnh Chính cùng với thời gian của chúng.",
        vocabulary: [
            { word: 'pottery', ipa: '/ˈpɒtəri/', pos: 'n.', vi: 'đồ gốm' },
            { word: 'choir practice', ipa: '/ˈkwaɪər ˈpræktɪs/', pos: 'n. phr.', vi: 'buổi tập hát của dàn hợp xướng' },
            { word: 'main hall', ipa: '/meɪn hɔːl/', pos: 'n. phr.', vi: 'sảnh chính' }
        ]
    },
    't-spk-q8-10-20': {
        sampleAnswer_en: "Q8: The reservation is for Friday, July 12th.\n\nQ9: The party is for four guests.\n\nQ10: Yes, Ms. Carter. I can confirm your reservation is at 8:00 PM, and we have noted your special request for a table by the window.",
        sampleAnswer_vi: "Q8: Đặt chỗ này là cho thứ Sáu, ngày 12 tháng 7.\n\nQ9: Bữa tiệc này dành cho bốn khách.\n\nQ10: Vâng, thưa cô Carter. Tôi có thể xác nhận đặt chỗ của cô là vào lúc 8:00 tối, và chúng tôi đã ghi chú yêu cầu đặc biệt của cô về một bàn cạnh cửa sổ.",
        outline_en: "Q8: State the date. Q9: State the number of guests. Q10: Address the customer, confirm the time and special request.",
        outline_vi: "Q8: Nêu ngày. Q9: Nêu số lượng khách. Q10: Xưng hô với khách hàng, xác nhận thời gian và yêu cầu đặc biệt.",
        vocabulary: [
            { word: 'reservation', ipa: '/ˌrezərˈveɪʃn/', pos: 'n.', vi: 'sự đặt chỗ' },
            { word: 'guest', ipa: '/ɡest/', pos: 'n.', vi: 'khách' },
            { word: 'special request', ipa: '/ˈspeʃl rɪˈkwest/', pos: 'n. phr.', vi: 'yêu cầu đặc biệt' }
        ]
    }
};
