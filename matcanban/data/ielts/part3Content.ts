import { IeltsTask } from '../../types';

type IeltsTaskContent = Pick<IeltsTask, 'sampleAnswer_en' | 'sampleAnswer_vi' | 'outline_en' | 'outline_vi' | 'vocabulary'>;

export const ieltsPart3Content: Record<string, IeltsTaskContent> = {
    // This file was likely empty. Adding placeholder content to resolve module errors.
    // In a real scenario, this would contain sample answers for IELTS Speaking Part 3 tasks.
    'i-p3-1': {
        sampleAnswer_en: "From my perspective, people travel primarily for two reasons: escapism and curiosity. Firstly, it offers a break from the monotony of daily life. Secondly, it satisfies our innate desire to see new places and understand different cultures. The benefits for a country are immense, primarily through economic boosts from tourism revenue and the promotion of its cultural heritage on a global stage. In the future, I believe travel will become more sustainable and personalized, with technology enabling more immersive and less environmentally damaging experiences.",
        sampleAnswer_vi: "Theo quan điểm của tôi, mọi người đi du lịch chủ yếu vì hai lý do: thoát ly thực tại và sự tò mò. Thứ nhất, nó mang lại một sự nghỉ ngơi khỏi sự đơn điệu của cuộc sống hàng ngày. Thứ hai, nó thỏa mãn mong muốn bẩm sinh của chúng ta là được nhìn thấy những nơi mới và hiểu các nền văn hóa khác nhau. Lợi ích cho một quốc gia là rất lớn, chủ yếu thông qua việc thúc đẩy kinh tế từ doanh thu du lịch và quảng bá di sản văn hóa của mình trên trường toàn cầu. Trong tương lai, tôi tin rằng du lịch sẽ trở nên bền vững và cá nhân hóa hơn, với công nghệ cho phép những trải nghiệm đắm chìm hơn và ít gây hại cho môi trường hơn.",
        outline_en: "1.  Reasons for travel: Escapism and curiosity.\n2.  Benefits for a country: Economic boosts and cultural promotion.\n3.  Future of travel: More sustainable and personalized, enabled by technology.",
        outline_vi: "1.  Lý do du lịch: Thoát ly thực tại và sự tò mò.\n2.  Lợi ích cho một quốc gia: Thúc đẩy kinh tế và quảng bá văn hóa.\n3.  Tương lai của du lịch: Bền vững và cá nhân hóa hơn, được hỗ trợ bởi công nghệ.",
        vocabulary: [
            { word: 'escapism', ipa: '/ɪˈskeɪpɪzəm/', pos: 'n.', vi: 'sự thoát ly thực tại' },
            { word: 'innate desire', ipa: '/ɪˈneɪt dɪˈzaɪər/', pos: 'n. phr.', vi: 'mong muốn bẩm sinh' },
            { word: 'sustainable', ipa: '/səˈsteɪnəbl/', pos: 'adj.', vi: 'bền vững' },
            { word: 'immersive', ipa: '/ɪˈmɜːsɪv/', pos: 'adj.', vi: 'đắm chìm, chân thực' }
        ]
    }
};
