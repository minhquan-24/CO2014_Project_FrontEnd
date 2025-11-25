// src/app/(main)/page.tsx
import HeroSearchBar from '@/app/components/ui/HeroSearchBar';
import ListingCard from '@/app/components/card/ListingCard';
import { MOCK_ACCOMMODATIONS } from '@/app/data/mockData';

export default function GuestHomePage() {

    // Lọc data theo category
    const hanoiList = MOCK_ACCOMMODATIONS.filter(item => item.category === 'Hanoi');
    const vungtauList = MOCK_ACCOMMODATIONS.filter(item => item.category === 'VungTau');
    const seoulList = MOCK_ACCOMMODATIONS.filter(item => item.category === 'Seoul');

    // Hàm render section để code gọn hơn
    const renderSection = (title: string, items: typeof hanoiList) => (
        <section className="mb-12">
            <div className="flex justify-between items-center mb-4 px-2">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100">&lt;</button>
                    <button className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100">&gt;</button>
                </div>
            </div>

            {/* Scrollable Container */}
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x scrollbar-hide px-2 -mx-2">
                {items.map(item => (
                    <ListingCard key={item.id} data={item} />
                ))}
            </div>
        </section>
    );

    return (
        <main className="min-h-screen bg-white pb-20">

            {/* 1. Khu vực Search Bar (Nổi bật) */}
            <div className="pt-6 pb-8 border-b border-gray-100 mb-8 sticky top-20 bg-white z-40">
                <HeroSearchBar />
            </div>

            {/* 2. Nội dung chính */}
            <div className="container mx-auto px-4 md:px-10">

                {renderSection("Nơi lưu trú được ưa chuộng tại Hà Nội", hanoiList)}
                {renderSection("Chỗ ở tại Vũng Tàu", vungtauList)}
                {renderSection("Còn phòng tại Seoul vào tháng tới", seoulList)}

            </div>
        </main>
    );
}