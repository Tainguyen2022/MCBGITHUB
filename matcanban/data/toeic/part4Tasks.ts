import { ToeicTask } from '../../types';

type ToeicPart4TaskDefinition = Omit<ToeicTask, 'sampleAnswer_en' | 'sampleAnswer_vi' | 'outline_en' | 'outline_vi' | 'vocabulary' | 'imageSeed'>;

export const toeicPart4Tasks: ToeicPart4TaskDefinition[] = [
    {
        id: 't-spk-q8-10-1',
        title: 'Trả lời: Lịch trình Hội thảo',
        prompt: 'You will answer three questions based on this schedule.\n--- City Planning Conference ---\nDate: Oct 26\n\n9:00 AM: Opening Remarks (Main Hall)\n10:30 AM: Sustainable Urban Development (Room A)\n2:30 PM: The Future of Public Transportation (Main Hall)\n4:00 PM: Q&A with Planners (Room B)\n\nQ8: What is the first event and where is it? (15s)\nQ9: I\'m interested in public transportation. Time and location? (15s)\nQ10: I missed the morning. What are the two afternoon events? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-2',
        title: 'Trả lời: Lịch trình Chuyến đi',
        prompt: 'You will answer three questions based on this itinerary.\n--- Business Trip to Chicago ---\n\nMay 10 - 9:00 AM: Flight departs from New York\nMay 10 - 11:00 AM: Arrive in Chicago, check into hotel\nMay 11 - 10:00 AM: Client meeting with Sterling Corp.\nMay 11 - 3:00 PM: Project presentation at main office\n\nQ8: When does the flight to Chicago depart? (15s)\nQ9: I can\'t remember the name of the client we are meeting. Can you remind me? (15s)\nQ10: Can you summarize the schedule for May 11th? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-3',
        title: 'Trả lời: Chương trình Hội chợ Việc làm',
        prompt: 'You will answer three questions based on this schedule.\n--- University Job Fair ---\n\n10:00 AM: Doors Open (Grand Ballroom)\n11:00 AM: Workshop: "Resume Writing" (Room 201)\n1:00 PM: Presentation by Innovate Corp. (Auditorium)\n3:00 PM: Networking Session (Grand Ballroom)\n\nQ8: What time does the job fair start? (15s)\nQ9: I want to attend the resume writing workshop. Where is it? (15s)\nQ10: I can only come in the afternoon. What two events are scheduled for 1:00 PM and 3:00 PM? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-4',
        title: 'Trả lời: Lịch làm việc của Bác sĩ',
        prompt: 'You are a receptionist at a clinic. Answer questions based on this schedule.\n--- Dr. Evans\' Schedule: Tuesday ---\n\n9:00 AM: Mark Lee (Annual Check-up)\n10:00 AM: Sarah Chen (Follow-up)\n11:30 AM: David Kim (New Patient)\n1:30 PM: Staff Meeting\n\nQ8: I\'d like to know who Dr. Evans\' first patient is today. (15s)\nQ9: Could you tell me what time the staff meeting is scheduled for? (15s)\nQ10: I am a new patient. I was told my appointment is at 11:30. Is that correct, and could you confirm the patient name? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-5',
        title: 'Trả lời: Thông báo Thư viện',
        prompt: 'Answer three questions based on this library notice.\n--- City Library: Holiday Hours ---\n\nDecember 24: Open 9 AM - 1 PM\nDecember 25: Closed\nDecember 31: Open 9 AM - 5 PM\nJanuary 1: Closed\nRegular hours resume on January 2.\n\nQ8: What time does the library close on December 24th? (15s)\nQ9: I was planning to visit the library on Christmas Day. Will it be open? (15s)\nQ10: Could you tell me the library\'s hours for New Year\'s Eve and New Year\'s Day? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-6',
        title: 'Trả lời: Vé xem phim',
        prompt: 'Answer three questions based on this movie ticket information.\n--- Star Cinema: "Planet Explorers" ---\n\nDate: November 5\nTime: 7:15 PM\nScreen: 8\nSeat: G12\nTicket Price: $15.00\n\nQ8: Which movie is this ticket for? (15s)\nQ9: I can\'t remember my seat number. Could you tell me what it is? (15s)\nQ10: Could you confirm the date, time, and screen number for this movie? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-7',
        title: 'Trả lời: Chương trình TV',
        prompt: 'You are answering questions about tonight\'s TV schedule.\n--- Channel 8 Schedule ---\n\n7:00 PM: National News\n8:00 PM: Documentary: "Wonders of the Deep Sea"\n9:30 PM: Movie: "The Last Adventure"\n11:30 PM: The Late Show\n\nQ8: What program is on at 7:00 PM? (15s)\nQ9: I am interested in the documentary. What is it about? (15s)\nQ10: What two programs are on after 9:00 PM tonight? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-8',
        title: 'Trả lời: Thực đơn Đặc biệt',
        prompt: 'You are a waiter. Answer questions based on this menu.\n--- Today\'s Specials ---\n\nSoup: Tomato Basil - $7\nMain Course: Grilled Salmon with vegetables - $22\nDessert: Chocolate Lava Cake - $9\nSpecial Offer: Full set for $35\n\nQ8: What is the soup of the day? (15s)\nQ9: I would like to order the main course. What does it come with? (15s)\nQ10: I\'m interested in the special offer. What is included and how much does it cost? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-9',
        title: 'Trả lời: Lịch trình Chuyến tàu',
        prompt: 'Answer three questions based on this train schedule.\n--- Express Train to Central City ---\n\nDepart North Station: 2:15 PM\nArrive West Station: 3:00 PM\nArrive Central City: 4:30 PM\nPlatform: 5A\n\nQ8: What platform does the train depart from? (15s)\nQ9: What time does this train arrive at West Station? (15s)\nQ10: I need to get to Central City. Can you tell me the departure time from North Station and the arrival time in Central City? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-10',
        title: 'Trả lời: Thông tin Lớp học Yoga',
        prompt: 'Answer questions about this yoga class schedule.\n--- Sunrise Yoga Studio ---\n\nClass: Morning Flow Yoga\nInstructor: Anna Bell\nTime: Tuesdays, 8:00 AM - 9:00 AM\nLocation: Studio 2\nNote: Please bring your own mat.\n\nQ8: Who is the instructor for the Morning Flow Yoga class? (15s)\nQ9: I forgot the class time. Can you tell me the day and time? (15s)\nQ10: I\'m new to the studio. Can you tell me the location of the class and if there is anything I need to bring? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-11',
        title: 'Trả lời: Hướng dẫn Bảo tàng',
        prompt: 'You are a museum guide. Answer questions based on this information.\n--- Museum of Modern Art: Floor Guide ---\n\n1st Floor: 20th Century Paintings\n2nd Floor: Sculpture Garden\n3rd Floor: Special Exhibition: "The Art of Photography"\nCafe: 1st Floor\n\nQ8: Where can I find the 20th-century paintings? (15s)\nQ9: I am looking for the special photography exhibition. Which floor is it on? (15s)\nQ10: Could you tell me what is on the second and third floors? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-12',
        title: 'Trả lời: Lịch trình Xe buýt Đưa đón',
        prompt: 'Answer questions based on this shuttle bus schedule.\n--- Airport Shuttle Schedule (Hotel to Airport) ---\n\nDepartures from Hotel Lobby:\n- 6:00 AM\n- 7:30 AM\n- 9:00 AM\n- 10:30 AM\nJourney Time: Approx. 45 minutes\n\nQ8: What time is the first shuttle to the airport? (15s)\nQ9: How long does the trip to the airport take? (15s)\nQ10: I need to be at the airport by 10:00 AM. Could you tell me about the two shuttle times that would get me there on time? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-13',
        title: 'Trả lời: Đơn đặt hàng',
        prompt: 'You are a customer service representative. Answer questions about this order.\n--- Order Confirmation #5821 ---\n\nItem: Wireless Keyboard\nQuantity: 1\nPrice: $49.99\nShipping to: Jane Smith\nEstimated Delivery: March 15\n\nQ8: What item was ordered? (15s)\nQ9: I\'d like to confirm the price of the item. (15s)\nQ10: Could you confirm who the order is being shipped to and when it is expected to arrive? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-14',
        title: 'Trả lời: Sửa chữa máy tính',
        prompt: 'Answer questions based on this repair shop ticket.\n--- Tech Repair Center ---\n\nCustomer: Michael Davis\nItem: Laptop\nProblem: Does not turn on\nReady for Pickup: Thursday after 3 PM\nCost: $85\n\nQ8: What is the problem with the laptop? (15s)\nQ9: How much will the repair cost? (15s)\nQ10: I am Michael Davis. Could you tell me when my laptop will be ready for pickup and how much I need to pay? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-15',
        title: 'Trả lời: Đăng ký thành viên Gym',
        prompt: 'Answer questions about this gym membership.\n--- Fitness First Gym Membership ---\n\nMember: Sarah Williams\nPlan: Gold Annual\nIncludes: Full gym access, all classes, swimming pool\nStart Date: June 1, 2024\nNext Payment Due: June 1, 2025\n\nQ8: What is the member\'s name? (15s)\nQ9: What facilities are included in the Gold Annual plan? (15s)\nQ10: When did my membership start and when is my next payment due? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-16',
        title: 'Trả lời: Lịch trình dọn dẹp',
        prompt: 'You are explaining the weekly cleaning schedule for an apartment.\n--- Weekly Cleaning Rota ---\n\nMonday: Kitchen (Tom)\nWednesday: Bathroom (Maria)\nFriday: Living Room & Vacuuming (Tom)\nSaturday: Balcony & Plants (Maria)\n\nQ8: Who is responsible for cleaning the kitchen? (15s)\nQ9: What tasks need to be done on Friday? (15s)\nQ10: Could you tell me what Maria\'s cleaning responsibilities are for the week? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-17',
        title: 'Trả lời: Chương trình hội nghị',
        prompt: 'You are answering questions about a conference program.\n--- Marketing World Conference ---\n\n10:00 AM: Keynote Speech: "The Future of Digital Ads" - Lisa Ray\n11:00 AM: Workshop: "Social Media Strategy" - Ben Carter\n2:00 PM: Panel Discussion: "Branding in 2025"\n\nQ8: Who is giving the keynote speech? (15s)\nQ9: I am interested in the workshop. What is it about? (15s)\nQ10: Can you tell me what events are scheduled for 10:00 AM and 2:00 PM? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-18',
        title: 'Trả lời: Thông báo cho thuê',
        prompt: 'Answer questions about this apartment rental listing.\n--- Apartment for Rent ---\n\nLocation: 123 Main Street\nBedrooms: 2\nRent: $1,500 per month\nAvailable: August 1\nContact: Mr. Chen\n\nQ8: How many bedrooms does the apartment have? (15s)\nQ9: When will the apartment be available? (15s)\nQ10: I\'m interested in this apartment. Could you tell me the monthly rent and who I should contact for more information? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-19',
        title: 'Trả lời: Lịch sự kiện cộng đồng',
        prompt: 'Answer questions based on this community center schedule.\n--- Community Center Events: Saturday ---\n\n10:00 AM: Children\'s Story Time (Library)\n1:00 PM: Pottery Class (Art Room)\n4:00 PM: Community Choir Practice (Main Hall)\n7:00 PM: Movie Night: "The Great Outdoors" (Main Hall)\n\nQ8: What time is the pottery class? (15s)\nQ9: Where is the Children\'s Story Time held? (15s)\nQ10: What two events are happening in the Main Hall today? (30s)',
        prepTime: 45,
        speakTime: 60
    },
    {
        id: 't-spk-q8-10-20',
        title: 'Trả lời: Đặt chỗ nhà hàng',
        prompt: 'You are a restaurant host confirming a reservation.\n--- Reservation Details ---\n\nName: Emily Carter\nDate: Friday, July 12\nTime: 8:00 PM\nNumber of Guests: 4\nRequest: Table by the window\n\nQ8: For what date is the reservation? (15s)\nQ9: How many people will be in the party? (15s)\nQ10: I am Emily Carter. Could you confirm the time of my reservation and the special request I made? (30s)',
        prepTime: 45,
        speakTime: 60
    }
];