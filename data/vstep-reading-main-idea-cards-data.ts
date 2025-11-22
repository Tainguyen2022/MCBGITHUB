// VSTEP Reading - Main Idea Question Type - Practice Cards Data
// Cập nhật mỗi ngày: Thêm thẻ mới vào mảng practiceCards

export interface VSTEPMainIdeaPracticeCard {
  id: string;
  name: string;
  path: string;
  testNumber: string; // e.g., "Test 1", "Test 2"
  description?: string;
  status: 'available' | 'coming-soon';
  color?: string;
}

// Danh sách các thẻ luyện tập - Cập nhật mỗi ngày
export const vstepMainIdeaPracticeCards: VSTEPMainIdeaPracticeCard[] = [
  {
    id: 'test1',
    name: 'Test 1',
    path: '/vstep-reading-main-idea-test1',
    testNumber: 'Test 1',
    description: 'Mohs\' Hardness Scale - Thang Độ Cứng Mohs',
    status: 'available',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'test2',
    name: 'Test 2',
    path: '/vstep-reading-main-idea-test2',
    testNumber: 'Test 2',
    description: 'Hurricanes in the North Atlantic - Bão Nhiệt Đới ở Bắc Đại Tây Dương',
    status: 'available',
    color: 'from-red-500 to-orange-600'
  },
  {
    id: 'test3',
    name: 'Test 3',
    path: '/vstep-reading-main-idea-test3',
    testNumber: 'Test 3',
    description: 'Evolution of Trees - Sự Tiến Hóa của Cây',
    status: 'available',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'test4',
    name: 'Test 4',
    path: '/vstep-reading-main-idea-test4',
    testNumber: 'Test 4',
    description: 'The Language of Birds - Ngôn Ngữ Của Loài Chim',
    status: 'available',
    color: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'test5',
    name: 'Test 5',
    path: '/vstep-reading-main-idea-test5',
    testNumber: 'Test 5',
    description: 'Cartography - Bản Đồ Học',
    status: 'available',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'test6',
    name: 'Test 6',
    path: '/vstep-reading-main-idea-test6',
    testNumber: 'Test 6',
    description: 'Hawaiian Cuisine - Ẩm Thực Hawaii',
    status: 'available',
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'test7',
    name: 'Test 7',
    path: '/vstep-reading-main-idea-test7',
    testNumber: 'Test 7',
    description: 'Mohs\' Hardness Scale - Thang Độ Cứng Mohs',
    status: 'available',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'test8',
    name: 'Test 8',
    path: '/vstep-reading-main-idea-test8',
    testNumber: 'Test 8',
    description: 'Hawaiian Cuisine - Ẩm Thực Hawaii',
    status: 'available',
    color: 'from-rose-500 to-red-600'
  },
  {
    id: 'test9',
    name: 'Test 9',
    path: '/vstep-reading-main-idea-test9',
    testNumber: 'Test 9',
    description: 'The Language of Birds - Ngôn Ngữ Của Loài Chim',
    status: 'available',
    color: 'from-red-500 to-orange-600'
  },
  {
    id: 'test10',
    name: 'Test 10',
    path: '/vstep-reading-main-idea-test10',
    testNumber: 'Test 10',
    description: 'Cartography - Bản Đồ Học (Vocabulary A2, B1)',
    status: 'available',
    color: 'from-orange-500 to-amber-600'
  }
];

// Helper function để lấy thẻ theo ID
export const getVSTEPMainIdeaCardById = (id: string): VSTEPMainIdeaPracticeCard | undefined => {
  return vstepMainIdeaPracticeCards.find(card => card.id === id);
};

// Helper function để lấy tất cả thẻ available
export const getAvailableVSTEPMainIdeaCards = (): VSTEPMainIdeaPracticeCard[] => {
  return vstepMainIdeaPracticeCards.filter(card => card.status === 'available');
};

// Helper function để lấy tất cả thẻ coming soon
export const getComingSoonVSTEPMainIdeaCards = (): VSTEPMainIdeaPracticeCard[] => {
  return vstepMainIdeaPracticeCards.filter(card => card.status === 'coming-soon');
};

