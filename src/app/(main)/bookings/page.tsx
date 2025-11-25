'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Trip {
    id: string;
    propertyName: string;
    hostName: string;
    checkIn: string;
    checkOut: string;
    price: number;
    image: string;
    status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
    isReviewed: boolean;
}

const INITIAL_TRIPS: Trip[] = [
    // Upcoming
    { id: 'BK-001', propertyName: 'Luxury Villa Vung Tau', hostName: 'Minh Tâm', checkIn: '2025-11-20', checkOut: '2025-11-22', price: 5000000, image: '/image/ACC_001.jpg', status: 'Confirmed', isReviewed: false },
    { id: 'BK-002', propertyName: 'Căn hộ Quận 1', hostName: 'Hồng Phát', checkIn: '2025-12-01', checkOut: '2025-12-05', price: 2500000, image: '/image/ACC_002.jpg', status: 'Pending', isReviewed: false },

    // Past
    { id: 'BK-003', propertyName: 'Homestay Đà Lạt', hostName: 'Thanh Bằng', checkIn: '2024-01-10', checkOut: '2024-01-12', price: 1200000, image: '/image/ACC_001.jpg', status: 'Completed', isReviewed: false },
    { id: 'BK-004', propertyName: 'Resort Phú Quốc', hostName: 'Tấn Tài', checkIn: '2023-12-20', checkOut: '2023-12-25', price: 15000000, image: '/image/ACC_002.jpg', status: 'Completed', isReviewed: true },
    { id: 'BK-005', propertyName: 'Nhà nghỉ Bình dân', hostName: 'Minh Quân', checkIn: '2023-11-01', checkOut: '2023-11-02', price: 500000, image: '/image/ACC_003.jpg', status: 'Cancelled', isReviewed: false },
];

export default function MyTripsPage() {
    const [trips, setTrips] = useState<Trip[]>(INITIAL_TRIPS);
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

    const [cancelReason, setCancelReason] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');

    // ---(Call sp_CancelBooking) ---
    const handleCancel = () => {
        if (!selectedTrip) return;

        // Giả lập tính toán hoàn tiền
        const refundAmount = selectedTrip.price * 0.5;
        const refundPercent = "50%";

        const updatedTrips = trips.map(t =>
            t.id === selectedTrip.id ? { ...t, status: 'Cancelled' as const } : t
        );
        setTrips(updatedTrips);

        setShowCancelModal(false);
        setCancelReason('');
        alert(`✅ Đã hủy thành công!\nBooking ID: ${selectedTrip.id}\nSố tiền hoàn lại: ${refundAmount.toLocaleString()}₫ (${refundPercent})`);
    };

    const handleSubmitReview = () => {
        if (!selectedTrip) return;

        const updatedTrips = trips.map(t =>
            t.id === selectedTrip.id ? { ...t, isReviewed: true } : t
        );
        setTrips(updatedTrips);

        setShowReviewModal(false);
        setReviewComment('');
        alert(`✅ Đánh giá đã được gửi!\nCảm ơn bạn đã review chuyến đi tại ${selectedTrip.propertyName}.`);
        // Trigger trg_reviews_after_insert sẽ chạy ngầm trong DB thật
    };

    const displayTrips = trips.filter(trip => {
        if (activeTab === 'upcoming') return trip.status === 'Confirmed' || trip.status === 'Pending';
        return trip.status === 'Completed' || trip.status === 'Cancelled';
    });

    return (
        <div className="container mx-auto px-4 md:px-10 py-8 max-w-5xl min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Chuyến đi</h1>

            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`pb-3 px-1 mr-6 text-sm font-medium transition ${activeTab === 'upcoming' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Sắp tới
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`pb-3 px-1 mr-6 text-sm font-medium transition ${activeTab === 'past' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Đã hoàn tất
                </button>
            </div>

            {/* LIST TRIPS */}
            <div className="space-y-6">
                {displayTrips.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Chưa có chuyến đi nào.</p>
                        <Link href="/search" className="text-rose-600 font-bold hover:underline mt-2 inline-block">Đặt phòng ngay</Link>
                    </div>
                ) : (
                    displayTrips.map(trip => (
                        <div key={trip.id} className="flex flex-col md:flex-row border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
                            {/* Ảnh */}
                            <div className="md:w-64 h-48 md:h-auto relative bg-gray-200">
                                <img src={trip.image || '/images/placeholder.jpg'} alt={trip.propertyName} className="w-full h-full object-cover" />
                                <div className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded text-white
                  ${trip.status === 'Confirmed' ? 'bg-green-600' :
                                        trip.status === 'Pending' ? 'bg-yellow-500' :
                                            trip.status === 'Cancelled' ? 'bg-red-500' : 'bg-gray-600'}`}>
                                    {trip.status}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{trip.propertyName}</h3>
                                            <p className="text-sm text-gray-500">Chủ nhà: {trip.hostName}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold">{trip.price.toLocaleString()}₫</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                                        <div>
                                            <span className="block font-bold text-gray-400 text-xs uppercase">Check-in</span>
                                            {trip.checkIn}
                                        </div>
                                        <div>
                                            <span className="block font-bold text-gray-400 text-xs uppercase">Check-out</span>
                                            {trip.checkOut}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">

                                    {(trip.status === 'Confirmed' || trip.status === 'Pending') && (
                                        <button
                                            onClick={() => { setSelectedTrip(trip); setShowCancelModal(true); }}
                                            className="text-sm font-bold text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition border border-gray-300"
                                        >
                                            Hủy đặt phòng
                                        </button>
                                    )}

                                    {trip.status === 'Completed' && !trip.isReviewed && (
                                        <button
                                            onClick={() => { setSelectedTrip(trip); setShowReviewModal(true); }}
                                            className="text-sm font-bold text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-lg transition"
                                        >
                                            Viết đánh giá
                                        </button>
                                    )}

                                    {trip.status === 'Completed' && trip.isReviewed && (
                                        <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                                            ✓ Đã đánh giá
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* HỦY PHÒNG */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">Hủy chuyến đi này?</h3>
                        <p className="text-gray-600 mb-4 text-sm">
                            Bạn có chắc chắn muốn hủy đặt phòng tại <span className="font-bold">{selectedTrip?.propertyName}</span>?
                            <br />Dựa trên chính sách hủy, bạn sẽ được hoàn lại một phần tiền.
                        </p>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Lý do hủy:</label>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none"
                            rows={3}
                            placeholder="Ví dụ: Thay đổi kế hoạch..."
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                        />
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowCancelModal(false)} className="flex-1 py-3 font-bold text-gray-700 hover:bg-gray-100 rounded-lg">Quay lại</button>
                            <button onClick={handleCancel} className="flex-1 py-3 font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg">Xác nhận Hủy</button>
                        </div>
                    </div>
                </div>
            )}

            {/* REVIEW */}
            {showReviewModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
                        <h3 className="text-xl font-bold mb-2">Đánh giá chuyến đi</h3>
                        <p className="text-gray-500 text-sm mb-4">Tại {selectedTrip?.propertyName}</p>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bạn chấm mấy sao?</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        onClick={() => setReviewRating(star)}
                                        className={`text-2xl ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nhận xét của bạn</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none"
                                rows={4}
                                placeholder="Hãy chia sẻ trải nghiệm của bạn..."
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowReviewModal(false)} className="flex-1 py-3 font-bold text-gray-700 hover:bg-gray-100 rounded-lg">Đóng</button>
                            <button onClick={handleSubmitReview} className="flex-1 py-3 font-bold text-white bg-black hover:bg-gray-800 rounded-lg">Gửi đánh giá</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}