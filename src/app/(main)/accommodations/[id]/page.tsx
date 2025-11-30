'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function AccommodationDetailPage() {
    const params = useParams();
    const id = params?.id;

    const [room, setRoom] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // --- STATES ---
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [isBooking, setIsBooking] = useState(false);
    
    // UI States
    const [showAllAmenities, setShowAllAmenities] = useState(false);
    const [isDescExpanded, setIsDescExpanded] = useState(false); // State mở rộng mô tả
    const [showReviewModal, setShowReviewModal] = useState(false); // <--- MỚI: State Popup Review

    // --- GỌI API ---
    useEffect(() => {
        if (!id) return;
        const fetchDetail = async () => {
            try {
                const res = await fetch(`http://localhost:3000/accommodation/${id}`);
                if (!res.ok) throw new Error('Failed');
                const data = await res.json();
                setRoom(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    const cleanAmenities = (text: string) => {
        if (!text) return [];
        try {
            const parsed = JSON.parse(text);
            return Array.isArray(parsed) ? parsed : text.split(',');
        } catch {
            return text.replace(/[\[\]"]/g, '').split(',');
        }
    };

    const handleBook = () => {
        if (!checkIn || !checkOut) return alert('Vui lòng chọn ngày nhận/trả phòng!');
        setIsBooking(true);
        setTimeout(() => {
            alert(`Đã gửi yêu cầu đến Host ${room.hostData?.name}!`);
            setIsBooking(false);
        }, 1000);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-rose-500 font-bold">⏳ Đang tải dữ liệu...</div>;
    if (!room) return <div className="min-h-screen flex items-center justify-center">❌ Không tìm thấy phòng</div>;

    // --- DATA MAPPING ---
    const joinedYear = room.hostData?.joinedDate ? new Date(room.hostData.joinedDate).getFullYear() : 2021;
    const yearsExperience = new Date().getFullYear() - joinedYear;
    
    const amenitiesList = cleanAmenities(room.Amenities);
    const hasSmokeAlarm = amenitiesList.some((item: string) => item.toLowerCase().includes('smoke alarm'));
    const hasCOAlarm = amenitiesList.some((item: string) => item.toLowerCase().includes('carbon monoxide') || item.toLowerCase().includes('co alarm'));

    // PLACEHOLDER IMAGE: Ảnh mặc định nếu API trả về null
    const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/800x600?text=No+Image';
    const mainImage = room.image || PLACEHOLDER_IMAGE;

    const DATA = {
        ...room,
        description: room.Description ? room.Description.replace(/<br\s*\/?>/gi, '\n') : '',
        amenities: amenitiesList,
        price: Number(room.pricePerNight),
        isGuestFavorite: Number(room.rating) >= 4.8,
        isInstant: Boolean(room.isInstantBookable), // Logic Instant Book
        
        host: {
            name: room.hostData?.name || 'Chủ nhà',
            avatar: room.hostData?.avatar || 'https://i.pravatar.cc/150?u=host',
            isSuperhost: Boolean(room.hostData?.isSuperhost),
            joinedYear: joinedYear,
            yearsExperience: yearsExperience > 0 ? yearsExperience : 1,
            responseRate: room.hostData?.responseRate || '100%',
            reviewCount: 124 
        },
        
        reviews: room.reviewsList?.map((r: any, i: number) => ({
            id: i,
            user: r.guestName,
            date: new Date(r.date).toLocaleDateString('vi-VN'),
            comment: r.comment,
            avatar: `https://i.pravatar.cc/150?u=${i}`
        })) || [],
        
        // Sửa lại image: dùng mainImage đã xử lý null
        images: [mainImage, mainImage, mainImage, mainImage, mainImage]
    };

    return (
        <div className="container mx-auto px-4 md:px-20 py-6 max-w-[1280px] text-gray-800 relative">
            
            {/* TITLE & HEADER */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">{DATA.Title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                    {/* Badge Instant Book (Yêu cầu Leader) */}
                    {DATA.isInstant && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold flex items-center gap-1 border border-yellow-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12.0001 0L4.62891 12.6855H11.3145L9.31445 24L20.6855 9.6001H12.6855L12.0001 0Z"/></svg>
                            Được đặt ngay
                        </span>
                    )}
                    <div className="flex items-center gap-2 font-medium underline">
                        <span>★ {DATA.rating}</span> · <span>{DATA.reviewCount} đánh giá</span> · <span>{DATA.location?.City}</span>
                    </div>
                    <div className="flex gap-4 ml-auto">
                        <button className="flex items-center gap-1 hover:bg-gray-100 px-3 py-2 rounded-lg transition">Chia sẻ</button>
                    </div>
                </div>
            </div>

            {/* IMAGES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden h-[400px] mb-10">
                <div className="md:col-span-2 md:row-span-2"><img src={DATA.images[0]} className="w-full h-full object-cover hover:brightness-95 transition cursor-pointer" /></div>
                {DATA.images.slice(1, 5).map((img: string, i: number) => (
                    <div key={i} className="hidden md:block"><img src={img} className="w-full h-full object-cover hover:brightness-95 transition cursor-pointer" /></div>
                ))}
            </div>

            {/* MAIN CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                <div className="md:col-span-2">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-6 mb-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-1">{DATA.type?.typeName || 'Chỗ ở'} tại {DATA.location?.City?.split(',')[0]}</h2>
                            <p className="text-gray-600 text-sm">{DATA.maxGuests} khách · {DATA.numBedrooms} phòng ngủ · {DATA.numBeds} giường · {DATA.numBathrooms} phòng tắm</p>
                        </div>
                        <img src={DATA.host.avatar} className="w-14 h-14 rounded-full border border-gray-200 object-cover" />
                    </div>

                    {/* HOST INFO */}
                    <div className="space-y-6 border-b border-gray-200 pb-8 mb-8">
                        <div className="flex gap-4 items-start">
                            <img src={DATA.host.avatar} className="w-10 h-10 rounded-full" />
                            <div>
                                <h3 className="font-semibold text-gray-900">Host: {DATA.host.name}</h3>
                                <p className="text-sm text-gray-500">{DATA.host.isSuperhost ? 'Chủ nhà siêu cấp' : 'Chủ nhà kinh nghiệm'}</p>
                            </div>
                        </div>
                        {DATA.isInstant && (
                            <div className="flex gap-4 items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1 text-gray-600"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Trải nghiệm check-in tuyệt vời</h3>
                                    <p className="text-sm text-gray-500">Đặt phòng ngay lập tức mà không cần chờ chủ nhà phê duyệt.</p>
                                </div>
                            </div>
                        )}
                        <div className="flex gap-4 items-start">
                            <svg className="w-6 h-6 mt-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <div>
                                <h3 className="font-semibold text-gray-900">Địa điểm tuyệt vời</h3>
                                <p className="text-sm text-gray-500">95% khách gần đây đã xếp hạng 5 sao cho vị trí này.</p>
                            </div>
                        </div>
                    </div>

                    {/* DESCRIPTION (MỚI: Có Show More/Less) */}
                    <div className="border-b border-gray-200 pb-8 mb-8">
                        <div className={`text-gray-800 leading-relaxed whitespace-pre-line ${isDescExpanded ? '' : 'line-clamp-4 overflow-hidden text-ellipsis'}`}>
                            {DATA.description}
                        </div>
                        {DATA.description.length > 200 && (
                            <button 
                                onClick={() => setIsDescExpanded(!isDescExpanded)}
                                className="mt-3 font-semibold underline text-black flex items-center gap-1 hover:text-gray-700 transition"
                            >
                                {isDescExpanded ? 'Thu gọn' : 'Hiển thị thêm'} ›
                            </button>
                        )}
                    </div>

                    {/* AMENITIES SECTION (MỚI: Có Show More/Less) */}
                    <div className="border-b border-gray-200 pb-8 mb-8">
                        <h3 className="text-xl font-semibold mb-6">Nơi này có những gì cho bạn</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {DATA.amenities.slice(0, showAllAmenities ? undefined : 10).map((item: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 text-gray-700">
                                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span>{item.trim().replace(/"/g, '')}</span>
                                </div>
                            ))}
                        </div>
                        {DATA.amenities.length > 10 && (
                            <button 
                                onClick={() => setShowAllAmenities(!showAllAmenities)}
                                className="mt-6 border border-black rounded-lg px-6 py-3 font-semibold hover:bg-gray-50 transition"
                            >
                                {showAllAmenities ? 'Thu gọn' : `Hiển thị tất cả ${DATA.amenities.length} tiện nghi`}
                            </button>
                        )}
                    </div>
                </div>

                {/* BOOKING FORM STICKY */}
                <div className="relative">
                    <div className="sticky top-28 border border-gray-200 rounded-xl shadow-xl p-6 bg-white">
                        <div className="flex justify-between items-end mb-4">
                            <div><span className="text-2xl font-bold">{DATA.price.toLocaleString()}₫</span> <span className="text-gray-600">/ đêm</span></div>
                        </div>
                        <div className="border border-gray-400 rounded-lg overflow-hidden mb-4">
                            <div className="flex border-b border-gray-400">
                                <div className="w-1/2 p-3 border-r border-gray-400"><label className="block text-[10px] font-bold uppercase">Nhận phòng</label><input type="date" className="w-full outline-none text-sm" value={checkIn} onChange={e => setCheckIn(e.target.value)} /></div>
                                <div className="w-1/2 p-3"><label className="block text-[10px] font-bold uppercase">Trả phòng</label><input type="date" className="w-full outline-none text-sm" value={checkOut} onChange={e => setCheckOut(e.target.value)} /></div>
                            </div>
                            <div className="p-3"><label className="block text-[10px] font-bold uppercase">Khách</label><input type="number" min="1" className="w-full outline-none text-sm" value={guests} onChange={e => setGuests(Number(e.target.value))} /></div>
                        </div>
                        <button onClick={handleBook} disabled={isBooking} className="w-full bg-rose-600 text-white font-bold py-3 rounded-lg mb-4 hover:bg-rose-700 disabled:bg-gray-400">Đặt phòng</button>
                        <div className="flex justify-between font-bold pt-4 border-t"><span>Tổng trước thuế</span><span>{(DATA.price * 5).toLocaleString()}₫</span></div>
                    </div>
                </div>
            </div>

            {/* REVIEWS (MỚI: Thêm nút mở Popup) */}
            <div className="border-t border-gray-200 py-10">
                <h2 className="text-2xl font-semibold mb-8">★ {DATA.rating} · {DATA.totalReviews} đánh giá</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                    {DATA.reviews.slice(0, 6).map((review: any) => (
                        <div key={review.id}>
                            <div className="flex items-center gap-3 mb-2">
                                <img src={review.avatar} className="w-10 h-10 rounded-full bg-gray-200" />
                                <div><div className="font-bold">{review.user}</div><div className="text-sm text-gray-500">{review.date}</div></div>
                            </div>
                            <p className="text-gray-600 text-sm line-clamp-3">{review.comment}</p>
                        </div>
                    ))}
                </div>
                {DATA.reviews.length > 6 && (
                    <button 
                        onClick={() => setShowReviewModal(true)}
                        className="mt-8 border border-black rounded-lg px-6 py-3 font-semibold hover:bg-gray-50 transition"
                    >
                        Hiển thị tất cả {DATA.totalReviews} đánh giá
                    </button>
                )}
            </div>

            <div className="border-t border-gray-200 py-10">
                <h2 className="text-2xl font-semibold mb-4">Nơi bạn sẽ đến</h2>
                <p className="mb-4 text-gray-600">{DATA.location?.City}</p>
                <div className="w-full h-[400px] bg-gray-100 rounded-xl relative overflow-hidden flex items-center justify-center border border-gray-300">
                    <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=21.0285,105.8542&zoom=10&size=800x400')] bg-cover opacity-20"></div>
                    <div className="z-10 text-center">
                        <div className="bg-white p-4 rounded-full shadow-lg mb-3 inline-block"><svg className="w-8 h-8 text-rose-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>
                        <p className="font-bold text-gray-800">Vị trí chính xác sẽ hiển thị sau khi đặt phòng</p>
                        <p className="text-xs text-gray-500 mt-1">Lat: {DATA.location?.Latitude} | Long: {DATA.location?.Longitude}</p>
                    </div>
                </div>
            </div>

            {/* HOST CARD (Giữ nguyên) */}
            <div className="border-t border-gray-200 py-10">
                <h2 className="text-2xl font-semibold mb-6">Gặp gỡ Host của bạn</h2>
                <div className="bg-gray-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-12">
                    <div className="bg-white rounded-3xl p-8 shadow-xl w-full md:w-[350px] flex flex-col items-center text-center relative">
                        <img src={DATA.host.avatar} className="w-28 h-28 rounded-full object-cover mb-4" />
                        <h3 className="text-3xl font-bold text-gray-900 mb-1">{DATA.host.name}</h3>
                        <p className="text-sm font-bold text-gray-900 mb-6">{DATA.host.isSuperhost && 'Chủ nhà siêu cấp'}</p>
                        <div className="grid grid-cols-2 w-full gap-y-4 pt-4 border-t border-gray-100">
                            <div className="text-left pl-4"><div className="font-bold text-xl">124</div><div className="text-[10px] font-bold uppercase text-gray-500">Đánh giá</div></div>
                            <div className="text-left pl-4 border-l border-gray-200"><div className="font-bold text-xl">{DATA.rating} ★</div><div className="text-[10px] font-bold uppercase text-gray-500">Xếp hạng</div></div>
                        </div>
                    </div>
                    <div className="flex-1 space-y-6">
                        <div className="space-y-4">
                            <h3 className="font-bold text-xl">Thông tin về {DATA.host.name}</h3>
                            <p className="text-gray-600">Phản hồi: {DATA.host.responseRate}</p>
                            <button className="bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800">Nhắn tin cho Host</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER: NHỮNG ĐIỀU CẦN BIẾT */}
            <div className="border-t border-gray-200 py-10">
                <h2 className="text-2xl font-semibold mb-6">Những điều cần biết</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    <div>
                        <h4 className="font-bold mb-3">Nội quy nhà</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li>Nhận phòng sau 14:00</li>
                            <li>Trả phòng trước 11:00</li>
                            <li>Tối đa {DATA.maxGuests} khách</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">An toàn và chỗ ở</h4>
                        <ul className="space-y-2 text-gray-600">
                            {hasCOAlarm ? <li>✓ Có máy phát hiện khí CO</li> : <li className="text-gray-500 line-through decoration-gray-400">Không có máy phát hiện khí CO</li>}
                            {hasSmokeAlarm ? <li>✓ Có máy báo khói</li> : <li className="text-gray-500 line-through decoration-gray-400">Không có máy báo khói</li>}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Chính sách hủy</h4>
                        <p className="text-gray-600">Hủy miễn phí trước 2 ngày. Sau đó hủy trước khi nhận phòng sẽ được hoàn lại 50% trừ phí dịch vụ.</p>
                    </div>
                </div>
            </div>

            {/* --- MỚI: REVIEW POPUP MODAL (Hiển thị khi bấm showReviewModal) --- */}
            {showReviewModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col relative animate-fade-in-up">
                        {/* Header Modal */}
                        <div className="p-5 border-b flex justify-between items-center">
                            <button onClick={() => setShowReviewModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                            <h2 className="text-lg font-bold">★ {DATA.rating} · {DATA.totalReviews} đánh giá</h2>
                            <div className="w-8"></div> {/* Spacer */}
                        </div>
                        {/* Content Scrollable */}
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="grid grid-cols-1 gap-8">
                                {DATA.reviews.map((review: any) => (
                                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                                        <div className="flex items-center gap-3 mb-3">
                                            <img src={review.avatar} className="w-12 h-12 rounded-full bg-gray-200" />
                                            <div>
                                                <div className="font-bold text-gray-900">{review.user}</div>
                                                <div className="text-sm text-gray-500">{review.date}</div>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}