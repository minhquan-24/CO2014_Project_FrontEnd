'use client';

import { useState, useEffect, useRef } from 'react';
import HeroSearchBar, { SearchParams } from '@/app/components/ui/HeroSearchBar';
import Link from 'next/link';

// --- COMPONENT: Listing Section (Horizontal Scroll) ---
const ListingSection = ({ title, items }: { title: string, items: any[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    if (!items || items.length === 0) return null;

    const handleScroll = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            const scrollAmount = containerRef.current.clientWidth * 0.8;
            containerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="mb-12 group">
             {/* Header Section */}
            <div className="flex justify-between items-center mb-4 px-2">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => handleScroll('left')} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 bg-white shadow-sm">&lt;</button>
                    <button onClick={() => handleScroll('right')} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 bg-white shadow-sm">&gt;</button>
                </div>
            </div>
            
            {/* List Items */}
            <div ref={containerRef} className="flex gap-6 overflow-x-auto pb-4 snap-x scrollbar-hide -mx-4 px-4 scroll-smooth">
                {items.map(item => <AccommodationCard key={item.id} item={item} isHorizontal={true} />)}
            </div>
        </section>
    );
};

// --- COMPONENT: Listing Grid (Main Grid) ---
const ListingGrid = ({ title, items }: { title: string, items: any[] }) => {
    const [visibleCount, setVisibleCount] = useState(8);
    if (!items || items.length === 0) return null;

    return (
        <section className="mb-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 px-2">
                {items.slice(0, visibleCount).map(item => <AccommodationCard key={item.id} item={item} />)}
            </div>
            {visibleCount < items.length && (
                <div className="mt-10 flex justify-center">
                    <button onClick={() => setVisibleCount(prev => prev + 8)} className="border border-black bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-lg transition transform active:scale-95">
                        Hiển thị thêm
                    </button>
                </div>
            )}
        </section>
    );
};

// --- COMPONENT: Single Card (Tách ra để dùng chung) ---
const AccommodationCard = ({ item, isHorizontal }: { item: any, isHorizontal?: boolean }) => {
    return (
        <Link href={`/accommodations/${item.id}`} className={`${isHorizontal ? 'min-w-[270px] w-[270px] snap-start' : 'w-full'} cursor-pointer group/card block`}>
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-200 mb-3">
                <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover group-hover/card:scale-105 transition duration-300" />
                <div className="absolute top-3 right-3 text-white/70 hover:text-white hover:scale-110 transition">
                   {/* Heart Icon */}
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 drop-shadow-md"><path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" /></svg>
                </div>
            </div>
            
            {/* THÔNG TIN CHI TIẾT */}
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 text-[15px] truncate flex-1">{item.title}</h3>
                    <div className="flex items-center gap-1 text-black font-medium text-sm ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                        <span>{item.rating || 'New'}</span>
                    </div>
                </div>

                {/* HIỂN THỊ TYPE & SUBTYPE */}
                <div className="text-gray-500 text-[14px] truncate">
                   {/* Nếu có subtype thì hiện subtype, không thì hiện type chính */}
                   {item.subtype ? item.subtype : item.type}
                </div>

                <div className="mt-1.5 flex items-baseline gap-1">
                    <span className="font-semibold text-gray-900 text-[15px]">{item.pricePerNight.toLocaleString()}₫</span>
                    <span className="text-gray-500 text-sm"> đêm</span>
                </div>
            </div>
        </Link>
    );
}


// --- MAIN PAGE COMPONENT ---
export default function GuestHomePage() {
    const [accommodations, setAccommodations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const FIXED_IMAGE = "/image/ACC_001.jpg"; 

    const fetchData = async (params?: SearchParams) => {
        setLoading(true);
        try {
            const query = new URLSearchParams();
            
            if (params) {
                if (params.keyword) query.append('search', params.keyword);
                if (params.guests > 1) query.append('guests', params.guests.toString());
                if (params.checkIn) query.append('checkIn', params.checkIn);
                if (params.checkOut) query.append('checkOut', params.checkOut);
            }

            const queryString = query.toString();
            const url = `http://localhost:3001/accommodation${queryString ? `?${queryString}` : ''}`;
            
            console.log("Fetching:", url);

            const res = await fetch(url);
            const rawData = await res.json();
            console.log("DEBUG RAW DATA:", rawData);

            const mappedData = rawData.map((item: any) => ({
                id: item.accommodationId, 
                title: item.Title,
                locationCity: item.location?.City || 'Vietnam', 
                imageUrl: FIXED_IMAGE, 
                pricePerNight: Number(item.pricePerNight), 
                rating: item.rating,
                // MAP TYPE
                type: item.typeName,
                subtype: item.subTypeName,
            }));

            setAccommodations(mappedData);
        } catch (error) {
            console.error("Lỗi:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const hanoiList = accommodations.filter(item => item.locationCity?.includes('Hanoi') || item.locationCity?.includes('Ha Noi'));
    const vungtauList = accommodations.filter(item => item.locationCity?.includes('Vung Tau'));
    const exploreList = accommodations;

    return (
        <main className="min-h-screen bg-white pb-20">
            <div className="pt-6 pb-4 border-b border-gray-100 mb-8 sticky top-20 bg-white z-40 shadow-sm">
                <HeroSearchBar onSearch={(params) => fetchData(params)} /> 
            </div>

            <div className="container mx-auto px-4 md:px-10">
                {loading ? (
                    <div className="text-center py-10">Đang tải dữ liệu...</div>
                ) : (
                    <>
                        {hanoiList.length > 0 && <ListingSection title="Nơi lưu trú tại Hà Nội" items={hanoiList} />}
                        {vungtauList.length > 0 && <ListingSection title="Chỗ ở tại Vũng Tàu" items={vungtauList} />}
                        <hr className="my-10 border-gray-200" />
                        {exploreList.length === 0 ? (
                            <div className="text-center text-gray-500 mt-10">Không tìm thấy chỗ ở phù hợp.</div>
                        ) : (
                            <ListingGrid title="Khám phá những nơi ở khác" items={exploreList} />
                        )}
                    </>
                )}
            </div>
        </main>
    );
}