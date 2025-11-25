// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useParams, usePathname } from 'next/navigation'; 

// const ACCOMMODATION_DETAIL = {
//     id: 'ACC-001',
//     title: 'Luxury Villa Vung Tau View Biển - Hồ Bơi Vô Cực',
//     address: '123 Đường Thùy Vân, TP. Vũng Tàu',
//     description: 'Tận hưởng kỳ nghỉ tuyệt vời tại biệt thự sát biển với hồ bơi riêng. Không gian thoáng đãng, thiết kế hiện đại, đầy đủ tiện nghi cho gia đình và nhóm bạn. Cách bãi sau chỉ 2 phút đi bộ.',
//     host: {
//         name: 'Nguyễn Minh Tâm',
//         avatar: 'https://i.pravatar.cc/150?u=host',
//         isSuperhost: true, // Cờ Superhost
//         joinedDate: 'Tham gia tháng 10/2021'
//     },
//     amenities: ['Wifi tốc độ cao', 'Hồ bơi riêng', 'Bếp đầy đủ', 'Chỗ đậu xe miễn phí', 'Máy lạnh', 'Smart TV'],
//     pricePerNight: 5000000,
//     rating: 4.85,
//     totalReviews: 124,
//     images: [
//         '/image/ACC_001.jpg',
//         '/image/ACC_002.jpg',
//         '/image/ACC_003.jpg',
//         '/image/ACC_003.jpg',
//         '/image/ACC_002.jpg',
//     ],
//     reviews: [
//         { id: 1, user: 'Hồng Phát', date: 'Tháng 10 2024', comment: 'Nhà rất đẹp, hồ bơi sạch sẽ. Host thân thiện.', rating: 5 },
//         { id: 2, user: 'Thanh Bằng', date: 'Tháng 9 2024', comment: 'Vị trí tuyệt vời, nhưng wifi hơi yếu ở lầu 2.', rating: 4 }
//     ]
// };

// export default function AccommodationDetailPage() {
//     const params = useParams();

//     // --- State cho Booking Form ---
//     const [checkIn, setCheckIn] = useState('');
//     const [checkOut, setCheckOut] = useState('');
//     const [guests, setGuests] = useState(1);
//     const [paymentMethod, setPaymentMethod] = useState('Credit Card');
//     const [isBooking, setIsBooking] = useState(false);

//     const isHostViewing = true; 

//     // --- LOGIC XỬ LÝ ĐẶT PHÒNG (Giả lập Trigger Business Rule) ---
//     const handleBook = () => {
//         setIsBooking(true);

//         // Giả lập độ trễ mạng
//         setTimeout(() => {
//             if (checkIn === '2024-12-25') {
//                 alert('❌ LỖI: Ngày này đã kín phòng! Vui lòng chọn ngày khác.');
//                 setIsBooking(false);
//                 return;
//             }

//             if (!checkIn || !checkOut) {
//                 alert('⚠️ Vui lòng chọn ngày check-in và check-out');
//                 setIsBooking(false);
//                 return;
//             }

//             // 3. Success Case
//             // Tại đây sẽ gọi API: POST /api/bookings -> Gọi sp_CreateBooking
//             alert(`✅ SUCCESS BOOKING!\n\nTrạng thái: PENDING\nPhương thức: ${paymentMethod}\nChúng tôi đã gửi yêu cầu đến Host.`);
//             setIsBooking(false);
//         }, 1000);
//     };

//     return (
//         <div className="container mx-auto px-4 md:px-10 py-6 max-w-7xl">

//             <section className="mb-6">
//                 <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//                     {ACCOMMODATION_DETAIL.title}
//                 </h1>
//                 <div className="flex items-center gap-2 text-sm text-gray-600 underline font-medium">
//                     <span>★ {ACCOMMODATION_DETAIL.rating} · {ACCOMMODATION_DETAIL.totalReviews} đánh giá</span>
//                     <span>·</span>
//                     <span>{ACCOMMODATION_DETAIL.address}</span>
//                 </div>
//             </section>

//             <section className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-xl overflow-hidden h-[300px] md:h-[400px] mb-10 relative">
//                 <img src={ACCOMMODATION_DETAIL.images[0]} alt="Main" className="w-full h-full object-cover hover:brightness-95 transition cursor-pointer" />
//                 <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 h-full w-full  ">
//                     <img src={ACCOMMODATION_DETAIL.images[1]} alt="Sub 1" className="w-full h-full object-cover hover:brightness-95 transition cursor-pointer" />
//                     <img src={ACCOMMODATION_DETAIL.images[2]} alt="Sub 2" className="w-full h-full object-cover hover:brightness-95 transition cursor-pointer" />
//                     <img src={ACCOMMODATION_DETAIL.images[3]} alt="Sub 3" className="w-full h-full object-cover hover:brightness-95 transition cursor-pointer" />
//                     <img src={ACCOMMODATION_DETAIL.images[4]} alt="Sub 4" className="w-full h-full object-cover hover:brightness-95 transition cursor-pointer" />
//                 </div>
//                 <button className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-md text-sm font-bold shadow-md border border-black hover:bg-gray-100 transition">
//                     Hiện tất cả ảnh
//                 </button>
//             </section>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//                 <div className="md:col-span-2 space-y-8">
//                     <div className="flex justify-between items-center border-b pb-6">
//                         <div>
//                             <h2 className="text-xl font-bold text-gray-800">
//                                 Toàn bộ căn hộ. Chủ nhà {ACCOMMODATION_DETAIL.host.name}
//                             </h2>
//                             <p className="text-gray-500 text-sm">{ACCOMMODATION_DETAIL.host.joinedDate}</p>
//                         </div>
//                         <div className="relative">
//                             <img src={ACCOMMODATION_DETAIL.host.avatar} alt="Host" className="w-14 h-14 rounded-full object-cover" />
//                             {ACCOMMODATION_DETAIL.host.isSuperhost && (
//                                 <div className="absolute bottom-0 -right-1 bg-white p-1 rounded-full shadow-sm">
//                                     <svg viewBox="0 0 32 32" className="w-4 h-4 fill-rose-500"><path d="M16 .798l.555.37C20.398 3.73 24.208 5 28 5h1v12.5C29 25.574 23.21 31 16 31S3 25.574 3 17.5V5h1c3.792 0 7.602-1.27 11.445-3.832l.555-.37z"></path></svg>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div className="border-b pb-6">
//                         <h3 className="text-xl font-bold mb-4">Giới thiệu về chỗ ở này</h3>
//                         <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//                             {ACCOMMODATION_DETAIL.description}
//                         </p>
//                     </div>

//                     <div className="border-b pb-6">
//                         <h3 className="text-xl font-bold mb-4">Tiện nghi</h3>
//                         <div className="grid grid-cols-2 gap-3">
//                             {ACCOMMODATION_DETAIL.amenities.map((item, index) => (
//                                 <div key={index} className="flex items-center gap-2 text-gray-700">
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
//                                     {item}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                             <span className="text-rose-500">★</span>
//                             {ACCOMMODATION_DETAIL.rating} · {ACCOMMODATION_DETAIL.totalReviews} đánh giá
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {ACCOMMODATION_DETAIL.reviews.map((review) => (
//                                 <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
//                                     <div className="flex items-center gap-3 mb-2">
//                                         <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600">
//                                             {review.user.charAt(0)}
//                                         </div>
//                                         <div>
//                                             <div className="font-bold text-sm">{review.user}</div>
//                                             <div className="text-xs text-gray-500">{review.date}</div>
//                                         </div>
//                                     </div>
//                                     <p className="text-sm text-gray-700">{review.comment}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="relative">
//                     <div className="sticky top-24 border border-gray-200 rounded-xl shadow-xl p-6 bg-white">

//                         <div className="flex justify-between items-center mb-4">
//                             <div>
//                                 <span className="text-2xl font-bold text-gray-900">
//                                     {ACCOMMODATION_DETAIL.pricePerNight.toLocaleString()}₫
//                                 </span>
//                                 <span className="text-gray-500 text-sm"> / đêm</span>
//                             </div>
//                             <div className="text-sm text-gray-600 underline font-medium">
//                                 {ACCOMMODATION_DETAIL.totalReviews} đánh giá
//                             </div>
//                         </div>

//                         <div className="border border-gray-400 rounded-lg overflow-hidden mb-4">
//                             <div className="flex border-b border-gray-400">
//                                 <div className="w-1/2 p-3 border-r border-gray-400">
//                                     <label className="block text-[10px] font-bold uppercase text-gray-700">Check-in</label>
//                                     <input
//                                         type="date"
//                                         className="w-full text-sm outline-none cursor-pointer text-gray-600"
//                                         value={checkIn}
//                                         onChange={(e) => setCheckIn(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="w-1/2 p-3">
//                                     <label className="block text-[10px] font-bold uppercase text-gray-700">Check-out</label>
//                                     <input
//                                         type="date"
//                                         className="w-full text-sm outline-none cursor-pointer text-gray-600"
//                                         value={checkOut}
//                                         onChange={(e) => setCheckOut(e.target.value)}
//                                     />
//                                 </div>
//                             </div>
//                             <div className="p-3">
//                                 <label className="block text-[10px] font-bold uppercase text-gray-700">Khách</label>
//                                 <input
//                                     type="number"
//                                     min={1}
//                                     value={guests}
//                                     onChange={(e) => setGuests(Number(e.target.value))}
//                                     className="w-full text-sm outline-none"
//                                 />
//                             </div>
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-xs font-bold mb-1 text-gray-700">Phương thức thanh toán</label>
//                             <select
//                                 className="w-full border border-gray-300 rounded-md p-2 text-sm"
//                                 value={paymentMethod}
//                                 onChange={(e) => setPaymentMethod(e.target.value)}
//                             >
//                                 <option value="Credit Card">Thẻ tín dụng (Credit Card)</option>
//                                 <option value="Cash">Tiền mặt (Cash)</option>
//                                 <option value="PayPal">PayPal</option>
//                             </select>
//                         </div>

//                         <button
//                             onClick={handleBook}
//                             disabled={isBooking}
//                             className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-lg transition mb-4 disabled:bg-gray-400"
//                         >
//                             {isBooking ? 'Processing...' : 'BOOK NOW'}
//                         </button>

//                         <p className="text-center text-xs text-gray-500">
//                             Bạn vẫn chưa bị trừ tiền đâu
//                         </p>

//                         {/* Price Calculation Preview */}
//                         <div className="mt-4 pt-4 border-t space-y-2 text-gray-600">
//                             <div className="flex justify-between underline">
//                                 <span>{ACCOMMODATION_DETAIL.pricePerNight.toLocaleString()}₫ x 5 đêm</span>
//                                 <span>{(ACCOMMODATION_DETAIL.pricePerNight * 5).toLocaleString()}₫</span>
//                             </div>
//                             <div className="flex justify-between underline">
//                                 <span>Phí vệ sinh</span>
//                                 <span>200,000₫</span>
//                             </div>
//                             <div className="flex justify-between font-bold text-gray-900 pt-2 border-t">
//                                 <span>Tổng trước thuế</span>
//                                 <span>{(ACCOMMODATION_DETAIL.pricePerNight * 5 + 200000).toLocaleString()}₫</span>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


// src/app/(main)/accommodations/[id]/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const ACCOMMODATION_DETAIL = {
    id: 'ACC-001',
    title: 'Luxury Villa Vũng Tàu - View Biển & Hồ Bơi Vô Cực',
    address: '123 Đường Thùy Vân, Phường 2, TP. Vũng Tàu',
    description: 'Tận hưởng kỳ nghỉ tuyệt vời tại biệt thự sát biển với hồ bơi riêng tràn bờ. Không gian thoáng đãng, thiết kế hiện đại phong cách Địa Trung Hải. \n\nCăn nhà bao gồm:\n- 5 phòng ngủ rộng rãi\n- Bếp nướng BBQ ngoài trời\n- Cách bãi sau chỉ 2 phút đi bộ.\n- Phù hợp cho gia đình và nhóm bạn.',
    host: {
        name: 'Nguyễn Minh Tâm',
        avatar: 'https://i.pravatar.cc/150?img=68',
        isSuperhost: true,
        joinedDate: 'Tham gia tháng 10/2021',
        responseRate: '100%'
    },
    amenities: [
        'Wifi tốc độ cao',
        'Hồ bơi riêng',
        'Bếp đầy đủ tiện nghi',
        'Chỗ đậu xe miễn phí',
        'Máy lạnh trung tâm',
        'Máy giặt & Máy sấy',
        'Lò nướng BBQ'
    ],
    pricePerNight: 5000000,
    rating: 4.85,
    totalReviews: 2,
    images: [
        '/image/ACC_001.jpg', 
        '/image/ACC_001.jpg', 
        '/image/ACC_001.jpg', 
        '/image/ACC_001.jpg', 
        '/image/ACC_001.jpg', 
    ],
    reviews: [
        { id: 1, user: 'Hồng Phát', date: 'Tháng 10 2024', comment: 'Nhà rất đẹp, hồ bơi sạch sẽ. Host cực kỳ thân thiện và hỗ trợ nhiệt tình.', rating: 5 },
        { id: 2, user: 'Thanh Bằng', date: 'Tháng 9 2024', comment: 'Vị trí tuyệt vời, ngay sát biển. Tuy nhiên wifi hơi yếu ở phòng ngủ lầu 3.', rating: 4 }
    ]
};

export default function AccommodationDetailPage() {
    const params = useParams(); 

    // chuyển true/false để test giao diện Host/Guest
    const isHostViewing = true;

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [isBooking, setIsBooking] = useState(false);

    const handleBook = () => {
        if (!checkIn || !checkOut) return alert('Vui lòng chọn ngày!');

        setIsBooking(true);
        setTimeout(() => {
            if (checkIn === '2024-12-25') {
                alert('❌ LỖI: Ngày này đã kín phòng! (Trigger CheckAvailability chặn lại)');
            } else {
                alert(`✅ Đã gửi yêu cầu đặt phòng!\nID: ${params.id}\nThanh toán: ${paymentMethod}\nTrạng thái: PENDING (Chờ Host duyệt)`);
            }
            setIsBooking(false);
        }, 1000);
    };

    return (
        <div className="container mx-auto px-4 md:px-10 py-6 max-w-7xl min-h-screen">
            <section className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {ACCOMMODATION_DETAIL.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 font-medium">
                    <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '14px', width: '14px', fill: 'currentcolor' }}><path fillRule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg>
                        {ACCOMMODATION_DETAIL.rating}
                    </span>
                    <span>·</span>
                    <span className="underline cursor-pointer">{ACCOMMODATION_DETAIL.totalReviews} đánh giá</span>
                    <span>·</span>
                    <span className="underline cursor-pointer">{ACCOMMODATION_DETAIL.address}</span>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-xl overflow-hidden h-[300px] md:h-[450px] mb-10 relative group">
                <div className="h-full w-full bg-gray-200">
                    <img
                        src={ACCOMMODATION_DETAIL.images[0]}
                        alt="Main"
                        className="w-full h-full object-cover hover:brightness-90 transition cursor-pointer"
                    />
                </div>

                <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 h-full w-full">
                    <img src={ACCOMMODATION_DETAIL.images[1] || ACCOMMODATION_DETAIL.images[0]} className="w-full h-full object-cover hover:brightness-90 transition cursor-pointer" />
                    <img src={ACCOMMODATION_DETAIL.images[2] || ACCOMMODATION_DETAIL.images[0]} className="w-full h-full object-cover hover:brightness-90 transition cursor-pointer" />
                    <img src={ACCOMMODATION_DETAIL.images[3] || ACCOMMODATION_DETAIL.images[0]} className="w-full h-full object-cover hover:brightness-90 transition cursor-pointer" />
                    <img src={ACCOMMODATION_DETAIL.images[4] || ACCOMMODATION_DETAIL.images[0]} className="w-full h-full object-cover hover:brightness-90 transition cursor-pointer" />
                </div>

                <button className="absolute bottom-6 right-6 bg-white border border-gray-800 px-4 py-1.5 rounded-md text-sm font-semibold shadow-sm hover:bg-gray-100 transition flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}><path d="M3 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3zm8 0a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM3 6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3zm8 0a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-2zM3 11a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3zm8 0a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2z"></path></svg>
                    Hiện tất cả ảnh
                </button>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                    {/* <div className="flex justify-between items-center border-b border-gray-200 pb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Toàn bộ căn hộ. Chủ nhà {ACCOMMODATION_DETAIL.host.name}
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                {ACCOMMODATION_DETAIL.host.joinedDate} · Phản hồi {ACCOMMODATION_DETAIL.host.responseRate}
                            </p>
                        </div>
                    </div> */}

                    <div className="border-b border-gray-200 pb-6 space-y-4">
                        <div className="flex items-start gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 mt-1"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                            <div>
                                <h3 className="font-semibold text-gray-900">Toàn bộ ngôi nhà</h3>
                                <p className="text-sm text-gray-500">Bạn sẽ có không gian riêng tư mà không cần chia sẻ với ai.</p>
                            </div>
                        </div>
                        {/* <div className="flex items-start gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 mt-1"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A7.5 7.5 0 0112 2.25c-4.142 0-7.501 3.359-7.501 7.501 1.746 0 3.332.477 4.5 1.335" /></svg>
                            <div>
                                <h3 className="font-semibold text-gray-900">{ACCOMMODATION_DETAIL.host.name} là Superhost</h3>
                                <p className="text-sm text-gray-500">Superhost là những chủ nhà có kinh nghiệm, được đánh giá cao.</p>
                            </div>
                        </div> */}
                    </div>

                    {/* Description */}
                    <div className="border-b border-gray-200 pb-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">Giới thiệu về chỗ ở này</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                            {ACCOMMODATION_DETAIL.description}
                        </p>
                    </div>

                    {/* Amenities */}
                    <div className="border-b border-gray-200 pb-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">Nơi này có những gì cho bạn</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {ACCOMMODATION_DETAIL.amenities.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                    <span className="text-base">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-900">
                            <span className="text-rose-500">★</span>
                            {ACCOMMODATION_DETAIL.rating} · {ACCOMMODATION_DETAIL.totalReviews} đánh giá
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {ACCOMMODATION_DETAIL.reviews.map((review) => (
                                <div key={review.id} className="">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-white text-sm">
                                            {review.user.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-gray-900">{review.user}</div>
                                            <div className="text-xs text-gray-500">{review.date}</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                        <button className="mt-8 border border-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                            Hiển thị tất cả đánh giá
                        </button>
                    </div>
                </div>

                
                <div className="relative">
                    <div className="sticky top-24 border border-gray-200 rounded-xl shadow-xl p-6 bg-white">

                        {!isHostViewing ? (
                            <>
                                <div className="flex justify-between items-baseline mb-6">
                                    <span className="text-2xl font-bold text-gray-900">
                                        {ACCOMMODATION_DETAIL.pricePerNight.toLocaleString()}₫
                                        <span className="text-base font-normal text-gray-500"> / đêm</span>
                                    </span>
                                </div>

                                <div className="border border-gray-400 rounded-lg overflow-hidden mb-4">
                                    <div className="flex border-b border-gray-400">
                                        <div className="w-1/2 p-3 border-r border-gray-400 hover:bg-gray-50 cursor-pointer">
                                            <label className="block text-[10px] font-bold uppercase text-gray-800">Check-in</label>
                                            <input
                                                type="date"
                                                className="w-full text-sm outline-none bg-transparent text-gray-600 cursor-pointer"
                                                value={checkIn}
                                                onChange={(e) => setCheckIn(e.target.value)}
                                            />
                                        </div>
                                        <div className="w-1/2 p-3 hover:bg-gray-50 cursor-pointer">
                                            <label className="block text-[10px] font-bold uppercase text-gray-800">Check-out</label>
                                            <input
                                                type="date"
                                                className="w-full text-sm outline-none bg-transparent text-gray-600 cursor-pointer"
                                                value={checkOut}
                                                onChange={(e) => setCheckOut(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="p-3 hover:bg-gray-50 cursor-pointer">
                                        <label className="block text-[10px] font-bold uppercase text-gray-800">Khách</label>
                                        <select
                                            className="w-full text-sm outline-none bg-transparent cursor-pointer"
                                            value={guests}
                                            onChange={(e) => setGuests(Number(e.target.value))}
                                        >
                                            <option value={1}>1 khách</option>
                                            <option value={2}>2 khách</option>
                                            <option value={3}>3 khách</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="mb-4">
                                    <label className="block text-xs font-bold mb-2 text-gray-700">Thanh toán bằng</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-black outline-none"
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                        <option value="Credit Card">Thẻ tín dụng (Credit Card)</option>
                                        <option value="Cash">Tiền mặt (Cash)</option>
                                        <option value="PayPal">PayPal</option>
                                    </select>
                                </div>

                                {/* Booking Button */}
                                <button
                                    onClick={handleBook}
                                    disabled={isBooking}
                                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-lg transition mb-4 disabled:bg-gray-400 text-lg"
                                >
                                    {isBooking ? 'Đang xử lý...' : 'Đặt phòng'}
                                </button>

                                {/* Price Preview */}
                                <div className="pt-4 border-t border-gray-100 space-y-3 text-gray-600">
                                    <div className="flex justify-between underline">
                                        <span>{ACCOMMODATION_DETAIL.pricePerNight.toLocaleString()}₫ x 5 đêm</span>
                                        <span>{(ACCOMMODATION_DETAIL.pricePerNight * 5).toLocaleString()}₫</span>
                                    </div>
                                    <div className="flex justify-between underline">
                                        <span>Phí vệ sinh</span>
                                        <span>200,000₫</span>
                                    </div>
                                    <div className="flex justify-between underline">
                                        <span>Phí dịch vụ Airbkb</span>
                                        <span>150,000₫</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-gray-900 pt-3 border-t border-gray-200 text-lg">
                                        <span>Tổng trước thuế</span>
                                        <span>{(ACCOMMODATION_DETAIL.pricePerNight * 5 + 350000).toLocaleString()}₫</span>
                                    </div>
                                </div>
                            </>
                        ) : (

                            /* --------------- GIAO DIỆN CHO HOST --------------- */
                            <div className="space-y-6">
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 bg-green-600 rounded-full animate-pulse"></span>
                                        Trạng thái: Đang hoạt động
                                    </h3>
                                    <p className="text-sm text-green-700">Căn nhà này đang hiển thị công khai và có thể nhận đặt phòng.</p>
                                </div>

                                <div className="space-y-3">
                                    {/* Nút Edit - Dẫn sang trang Edit Form */}
                                    <Link
                                        href={`/host/listings/edit/${params.id}`}
                                        className="block w-full text-center bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-lg transition shadow-md"
                                    >
                                        Chỉnh sửa thông tin
                                    </Link>

                                    <button className="block w-full border border-gray-900 hover:bg-gray-50 text-gray-900 font-bold py-3 rounded-lg transition">
                                        Xem lịch & Giá
                                    </button>

                                    <button className="block w-full text-rose-600 font-bold py-2 hover:bg-rose-50 rounded-lg text-sm transition">
                                        Tạm ẩn bài đăng
                                    </button>
                                </div>

                                {/* <div className="border-t border-gray-200 pt-4">
                                    <h4 className="font-bold text-sm mb-3 text-gray-900 uppercase tracking-wide">Hiệu suất tháng này</h4>
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>Lượt xem trang:</span>
                                        <span className="font-bold text-gray-900">1,234</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>Thêm vào yêu thích:</span>
                                        <span className="font-bold text-gray-900">56</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Đã đặt:</span>
                                        <span className="font-bold text-gray-900">5 đơn</span>
                                    </div>
                                </div> */}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}