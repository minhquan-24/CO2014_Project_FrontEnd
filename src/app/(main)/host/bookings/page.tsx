'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BookingRequest {
    id: string;
    guestName: string;
    guestAvatar: string;
    propertyName: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
    status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
    requestDate: string;
}

const INITIAL_BOOKINGS: BookingRequest[] = [
    {
        id: 'BK-789',
        guestName: 'Trần Văn A',
        guestAvatar: 'https://i.pravatar.cc/150?img=11',
        propertyName: 'Luxury Villa Vung Tau',
        checkIn: '2025-12-24',
        checkOut: '2025-12-26',
        guests: 4,
        totalPrice: 10000000,
        status: 'Pending',
        requestDate: '2 giờ trước'
    },
    {
        id: 'BK-456',
        guestName: 'Lê Thị B',
        guestAvatar: 'https://i.pravatar.cc/150?img=5',
        propertyName: 'Căn hộ Quận 1',
        checkIn: '2025-11-10',
        checkOut: '2025-11-15',
        guests: 2,
        totalPrice: 6500000,
        status: 'Confirmed',
        requestDate: '1 ngày trước'
    },
    {
        id: 'BK-123',
        guestName: 'John Doe',
        guestAvatar: 'https://i.pravatar.cc/150?img=3',
        propertyName: 'Luxury Villa Vung Tau',
        checkIn: '2025-10-01',
        checkOut: '2025-10-05',
        guests: 2,
        totalPrice: 20000000,
        status: 'Pending',
        requestDate: 'Vừa xong'
    }
];

export default function HostBookingsPage() {
    const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
    const [activeTab, setActiveTab] = useState<'Pending' | 'Confirmed'>('Pending');

    const handleConfirmPayment = (booking: BookingRequest) => {
        if (!confirm(`Xác nhận nhận thanh toán ${booking.totalPrice.toLocaleString()}₫ từ khách ${booking.guestName}?`)) return;

        const updatedList = bookings.map(b =>
            b.id === booking.id ? { ...b, status: 'Confirmed' as const } : b
        );
        setBookings(updatedList);

        alert(`
      ✅ GIAO DỊCH THÀNH CÔNG!
      ------------------------------------
      Gọi Procedure: sp_CompleteBookingPayment
      - BookingID: ${booking.id}
      - Guest: ${booking.guestName}
      - Amount: ${booking.totalPrice}
      - Status: Chuyển từ 'Pending' -> 'Confirmed'
      - Payment: Insert vào bảng Payment thành công.
    `);
    };

    const handleReject = (id: string) => {
        if (!confirm('Bạn có chắc muốn từ chối yêu cầu này?')) return;
        const updatedList = bookings.map(b =>
            b.id === id ? { ...b, status: 'Cancelled' as const } : b
        );
        setBookings(updatedList);
    };

    // Lọc danh sách theo Tab
    const displayList = bookings.filter(b => {
        if (activeTab === 'Pending') return b.status === 'Pending';
        return b.status === 'Confirmed' || b.status === 'Completed';
    });

    return (
        <div className="container mx-auto px-4 md:px-10 py-8 max-w-5xl min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý đặt phòng</h1>
            <div className="flex gap-6 border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('Pending')}
                    className={`pb-3 px-2 text-sm font-bold transition border-b-2 ${activeTab === 'Pending' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Yêu cầu mới ({bookings.filter(b => b.status === 'Pending').length})
                </button>
                <button
                    onClick={() => setActiveTab('Confirmed')}
                    className={`pb-3 px-2 text-sm font-bold transition border-b-2 ${activeTab === 'Confirmed' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Sắp tới / Đã chốt
                </button>
            </div>

            <div className="space-y-4">
                {displayList.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">Không có đơn đặt phòng nào ở trạng thái này.</p>
                    </div>
                ) : (
                    displayList.map((item) => (
                        <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <img src={item.guestAvatar} alt="Guest" className="w-12 h-12 rounded-full object-cover border" />
                                        <div>
                                            <h3 className="font-bold text-gray-900">{item.guestName}</h3>
                                            <p className="text-xs text-gray-500">Yêu cầu: {item.requestDate}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                        {item.status}
                                    </span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Nhà:</span>
                                        <span className="font-semibold text-gray-900">{item.propertyName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Thời gian:</span>
                                        <span className="font-semibold text-gray-900">{item.checkIn} - {item.checkOut}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Số khách:</span>
                                        <span className="font-semibold text-gray-900">{item.guests} người</span>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                                        <span className="font-bold text-gray-700">Tổng thanh toán:</span>
                                        <span className="font-bold text-rose-600 text-lg">{item.totalPrice.toLocaleString()}₫</span>
                                    </div>
                                </div>
                            </div>

                            {item.status === 'Pending' && (
                                <div className="md:w-64 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                                    <p className="text-xs text-gray-500 text-center mb-1">Khách đang chờ bạn xác nhận...</p>

                                    <button
                                        onClick={() => handleConfirmPayment(item)}
                                        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition shadow-md text-sm"
                                    >
                                        CONFIRM & PAYMENT
                                    </button>

                                    <button
                                        onClick={() => handleReject(item.id)}
                                        className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-lg transition text-sm"
                                    >
                                        Từ chối
                                    </button>
                                </div>
                            )}
                            {/* {item.status === 'Confirmed' && (
                                <div className="md:w-48 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                                    <Link href={`/bookings/${item.id}`} className="w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-lg transition text-sm">
                                        Xem chi tiết
                                    </Link>
                                </div>
                            )} */}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}