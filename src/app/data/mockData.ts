// src/app/data/mockData.ts
export interface Accommodation {
    id: string;
    title: string;
    locationCity: string;
    pricePerNight: number;
    averageRating: number;
    imageUrl: string;
    category: 'Hanoi' | 'VungTau' | 'Seoul' | 'Trending'; // Thêm category để lọc
}

export const MOCK_ACCOMMODATIONS: Accommodation[] = [
    // Hà Nội
    { id: 'HN-1', title: 'Căn hộ tại Quận Đống Đa', locationCity: 'Hanoi', pricePerNight: 1189000, averageRating: 5.0, category: 'Hanoi', imageUrl: '/image/ACC_001.jpg' },
    { id: 'HN-2', title: 'Nơi ở tại Quận Hoàn Kiếm', locationCity: 'Hanoi', pricePerNight: 896000, averageRating: 4.92, category: 'Hanoi', imageUrl: '/image/ACC_001.jpg' },
    { id: 'HN-3', title: 'Phòng tại Quận Tây Hồ', locationCity: 'Hanoi', pricePerNight: 1424000, averageRating: 5.0, category: 'Hanoi', imageUrl: '/image/ACC_001.jpg' },
    { id: 'HN-4', title: 'Căn hộ view Hồ Tây', locationCity: 'Hanoi', pricePerNight: 2000000, averageRating: 4.8, category: 'Hanoi', imageUrl: '/image/ACC_001.jpg' },

    // Vũng Tàu
    { id: 'ACC-001', title: 'Phòng tại Vũng Tàu', locationCity: 'Vung Tau', pricePerNight: 654000, averageRating: 5.0, category: 'VungTau', imageUrl: '/image/ACC_001.jpg' },
    { id: 'VT-2', title: 'Căn hộ Melody Vũng Tàu', locationCity: 'Vung Tau', pricePerNight: 1783000, averageRating: 4.9, category: 'VungTau', imageUrl: '/image/ACC_002.jpg' },
    { id: 'VT-3', title: 'Biệt thự hồ bơi sát biển', locationCity: 'Vung Tau', pricePerNight: 9971000, averageRating: 4.95, category: 'VungTau', imageUrl: '/image/ACC_003.jpg' },

    // Seoul
    { id: 'KR-1', title: 'Nơi ở tại Seoul', locationCity: 'Seoul', pricePerNight: 1330000, averageRating: 4.79, category: 'Seoul', imageUrl: '/image/ACC_001.jpg' },
    { id: 'KR-2', title: 'Phòng tại Euljiro', locationCity: 'Seoul', pricePerNight: 2797000, averageRating: 4.99, category: 'Seoul', imageUrl: '/image/ACC_001.jpg' },
];