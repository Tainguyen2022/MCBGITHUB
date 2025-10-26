import { ToeicTask } from '../../types';

type ToeicPart2TaskDefinition = Omit<ToeicTask, 'sampleAnswer_en' | 'sampleAnswer_vi' | 'outline_en' | 'outline_vi' | 'vocabulary'>;

export const toeicPart2Tasks: ToeicPart2TaskDefinition[] = [
    { id: 't-spk-q3-1', title: 'Miêu tả: Cuộc họp văn phòng', imageSeed: 'office-meeting', prompt: 'Describe the picture in as much detail as you can.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-2', title: 'Miêu tả: Quầy thanh toán ở siêu thị', imageSeed: 'supermarket-checkout', prompt: 'Talk about this picture.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-3', title: 'Miêu tả: Cảnh quán cà phê', imageSeed: 'cafe-scene', prompt: 'Describe this picture.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-4', title: 'Miêu tả: Người đi bộ trên phố', imageSeed: 'pedestrians-on-street', prompt: 'Describe what you see in the picture.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-5', title: 'Miêu tả: Thư viện', imageSeed: 'library-interior', prompt: 'Talk about this picture.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-6', title: 'Miêu tả: Bữa ăn ngoài trời', imageSeed: 'outdoor-meal-picnic', prompt: 'Describe this picture in detail.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-7', title: 'Miêu tả: Công trường xây dựng', imageSeed: 'construction-site', prompt: 'Describe what is happening in the picture.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-8', title: 'Miêu tả: Phòng bếp', imageSeed: 'kitchen-cooking-scene', prompt: 'Describe this picture.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-9', title: 'Miêu tả: Sân bay', imageSeed: 'airport-terminal', prompt: 'Talk about this picture.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-10', title: 'Miêu tả: Lớp học', imageSeed: 'classroom-lecture', prompt: 'Describe what you see.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-11', title: 'Miêu tả: Người chạy bộ trong công viên', imageSeed: 'jogging-in-park', prompt: 'Describe this picture in as much detail as possible.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-12', title: 'Miêu tả: Chợ ngoài trời', imageSeed: 'outdoor-market', prompt: 'Talk about this picture.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-13', title: 'Miêu tả: Bàn làm việc', imageSeed: 'office-desk-with-computer', prompt: 'Describe this picture.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-14', title: 'Miêu tả: Lễ tân khách sạn', imageSeed: 'hotel-reception', prompt: 'Describe what is happening in the picture.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-15', title: 'Miêu tả: Sửa xe', imageSeed: 'mechanic-fixing-car', prompt: 'Talk about this picture.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-16', title: 'Miêu tả: Nhà ga xe lửa', imageSeed: 'train-station-platform', prompt: 'Describe what you see in the picture.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-17', title: 'Miêu tả: Buổi hòa nhạc', imageSeed: 'live-music-concert', prompt: 'Describe this picture.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-18', title: 'Miêu tả: Thuyết trình', imageSeed: 'business-presentation', prompt: 'Talk about this picture.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-19', title: 'Miêu tả: Cảnh bãi biển', imageSeed: 'beach-scene-with-people', prompt: 'Describe this picture in detail.', prepTime: 45, speakTime: 45 },
    { id: 't-spk-q3-20', title: 'Miêu tả: Phòng thí nghiệm', imageSeed: 'scientists-in-laboratory', prompt: 'Describe what is happening.', prepTime: 45, speakTime: 45 }
];