// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// const INITIAL_LISTINGS = [
//     {
//         id: 'HN-1',
//         title: 'Căn hộ tại Quận Đống Đa',
//         price: 1189000,
//         status: 'Active',
//         imageUrl: '/image/ACC_001.jpg',
//         views: 120,
//         bookings: 5
//     },
//     {
//         id: 'VT-1',
//         title: 'Biệt thự hồ bơi sát biển',
//         price: 9971000,
//         status: 'Inactive', 
//         imageUrl: '/image/ACC_001.jpg',
//         views: 85,
//         bookings: 2
//     },
//     {
//         id: 'KR-1',
//         title: 'Nơi ở tại Seoul',
//         price: 1330000,
//         status: 'Active',
//         imageUrl: '/image/ACC_001.jpg',
//         views: 340,
//         bookings: 12
//     }
// ];

// export default function HostDashboardPage() {
//     const router = useRouter();
//     const [listings, setListings] = useState(INITIAL_LISTINGS);

//     // Giả lập Function SQL
//     const totalListings = listings.length; // Lấy từ COUNT(*)
//     const averageRating = 4.85; // Lấy từ fn_get_average_rating
//     const annualRevenue = 154000000; //Lấy từ fn_CalculateAnnualRevenue

//     const handleDelete = (id: string) => {
//         if (confirm('Bạn có chắc muốn xóa căn nhà này? Hành động này không thể hoàn tác.')) {
//             const newList = listings.filter(item => item.id !== id);
//             setListings(newList);

//             alert(`✅ Đã xóa listing ${id}.\n\n(Database: Trigger trg_post_after_delete đã chạy -> Giảm Listings_Count của Host xuống 1)`);
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 md:px-10 py-8 max-w-7xl min-h-screen">

//             <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
//                 <div>
//                     <h1 className="text-3xl font-bold text-gray-900">Nhà của tôi</h1>
//                 </div>
//                 <Link
//                     href="/host/listings/create"
//                     className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition"
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                     </svg>
//                     Tạo mục cho thuê mới
//                 </Link>
//             </div>

//             <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-12">
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-bold">
//                                 <th className="p-4 w-20">Ảnh</th>
//                                 <th className="p-4">Tên nhà / Địa điểm</th>
//                                 <th className="p-4">Giá / đêm</th>
//                                 <th className="p-4 text-right">Hành động</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-100">
//                             {listings.length === 0 ? (
//                                 <tr>
//                                     <td colSpan={5} className="p-8 text-center text-gray-500">
//                                         Bạn chưa có căn nhà nào. Hãy tạo mới ngay!
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 listings.map((item) => (
//                                     <tr key={item.id} className="hover:bg-gray-50 transition group">
//                                         <td className="p-4">
//                                             <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden">
//                                                 <img src={item.imageUrl} alt="Thumbnail" className="w-full h-full object-cover" />
//                                             </div>
//                                         </td>
//                                         <td className="p-4">
//                                             <Link href={`/accommodations/${item.id}`} className="font-bold text-gray-900 hover:text-rose-600 hover:underline">
//                                                 {item.title}
//                                             </Link>
//                                             <div className="text-xs text-gray-400 mt-1">ID: {item.id}</div>
//                                         </td>
//                                         <td className="p-4 font-medium">
//                                             {item.price.toLocaleString()}₫
//                                         </td>
//                                         <td className="p-4 text-right">
//                                             <div className="flex items-center justify-end gap-3">
//                                                 <Link
//                                                     href={`/host/listings/edit/${item.id}`} 
//                                                     className="text-gray-400 hover:text-blue-600"
//                                                     title="Edit"
//                                                 >
//                                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
//                                                 </Link>

//                                                 <button
//                                                     onClick={() => handleDelete(item.id)}
//                                                     className="text-gray-400 hover:text-red-600"
//                                                     title="Delete"
//                                                 >
//                                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Hiệu quả kinh doanh</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
//                     <div>
//                         <p className="text-gray-500 text-sm font-medium mb-1">Tổng số nhà</p>
//                         <p className="text-2xl font-extrabold text-gray-900">{totalListings}</p>
//                     </div>
//                     <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
//                     </div>
//                 </div>

//                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
//                     <div>
//                         <p className="text-gray-500 text-sm font-medium mb-1">Uy tín trung bình</p>
//                         <div className="flex items-baseline gap-1">
//                             <p className="text-2xl font-extrabold text-gray-900">{averageRating}</p>
//                             <span className="text-yellow-500 text-xl">★</span>
//                         </div>
//                     </div>
//                     <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
//                     </div>
//                 </div>

//                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
//                     <div>
//                         <p className="text-gray-500 text-sm font-medium mb-1">Doanh thu (Năm ngoái)</p>
//                         <p className="text-2xl font-extrabold text-green-600">{annualRevenue.toLocaleString()}₫</p>
//                     </div>
//                     <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { hostApi } from '@/app/service/api'; // 👇 Import API

export default function HostDashboardPage() {
    const router = useRouter();
    
    // State lưu dữ liệu thật
    const [listings, setListings] = useState<any[]>([]);
    const [stats, setStats] = useState({
        totalListings: 0,
        averageRating: 0,
        annualRevenue: 0
    });
    const [loading, setLoading] = useState(true);

    // 1. Hàm lấy dữ liệu từ Backend
    const fetchData = async () => {
        try {
            // Gọi song song cả 2 API để tiết kiệm thời gian
            const [myListings, myStats] = await Promise.all([
                hostApi.getMyListings(),     // Lấy danh sách nhà
                hostApi.getDashboardStats()  // Lấy số liệu thống kê (Revenue, Rating...)
            ]);

            setListings(myListings);
            setStats(myStats);
        } catch (error) {
            console.error("Lỗi tải dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    // 2. Gọi hàm khi component được mount
    useEffect(() => {
        fetchData();
    }, []);

    // 3. Xử lý xóa
    const handleDelete = async (id: string) => {
        if (confirm('Bạn có chắc muốn xóa căn nhà này? Hành động này không thể hoàn tác.')) {
            try {
                await hostApi.deleteListing(id);
                alert(`✅ Đã xóa listing ${id} thành công!`);
                // Gọi lại fetchData để cập nhật lại danh sách và số liệu thống kê (vì Trigger DB đã chạy)
                fetchData(); 
            } catch (error) {
                alert('Xóa thất bại, vui lòng thử lại.');
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-xl font-semibold text-gray-500 animate-pulse">Đang tải dữ liệu kinh doanh...</p>
        </div>
    );

    return (
        <div className="container mx-auto px-4 md:px-10 py-8 max-w-7xl min-h-screen">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Nhà của tôi</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý danh sách nhà và theo dõi hiệu quả kinh doanh.</p>
                </div>
                <Link
                    href="/host/listings/create"
                    className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition shadow-lg hover:shadow-xl"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Tạo mục cho thuê mới
                </Link>
            </div>

            {/* TABLE LISTINGS */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-12">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-bold">
                                <th className="p-4 w-24">Ảnh</th>
                                <th className="p-4">Tên nhà / Địa điểm</th>
                                {/* Đã xóa cột Trạng thái theo yêu cầu trước */}
                                <th className="p-4">Giá / đêm</th>
                                <th className="p-4 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {listings.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-10 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-4xl">🏠</span>
                                            <p>Bạn chưa có căn nhà nào.</p>
                                            <Link href="/host/listings/create" className="text-rose-600 font-bold hover:underline">
                                                Đăng nhà đầu tiên ngay!
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                listings.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition group">
                                        {/* Cột Ảnh */}
                                        <td className="p-4">
                                            <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden shadow-sm border border-gray-100">
                                                <img 
                                                    src={item.imageUrl || '/image/ACC_001.jpg'} 
                                                    alt="Thumbnail" 
                                                    className="w-full h-full object-cover" 
                                                />
                                            </div>
                                        </td>

                                        {/* Cột Tên & Địa điểm */}
                                        <td className="p-4">
                                            <Link href={`/accommodations/${item.id}`} className="font-bold text-gray-900 hover:text-rose-600 hover:underline line-clamp-1">
                                                {item.title}
                                            </Link>
                                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                                                </svg>
                                                {item.city} <span className="text-gray-300">|</span> ID: {item.id}
                                            </div>
                                        </td>

                                        {/* Cột Giá */}
                                        <td className="p-4 font-medium text-gray-900">
                                            {Number(item.price).toLocaleString('vi-VN')}₫
                                        </td>

                                        {/* Cột Hành động */}
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link
                                                    href={`/host/listings/edit/${item.id}`} 
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
                                                    title="Chỉnh sửa"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                                                    title="Xóa nhà"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* DASHBOARD STATS (DỮ LIỆU THẬT) */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Hiệu quả kinh doanh</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card 1: Tổng số nhà */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between hover:shadow-md transition">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Tổng số nhà</p>
                        <p className="text-3xl font-extrabold text-gray-900">{stats.totalListings}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                    </div>
                </div>

                {/* Card 2: Rating */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between hover:shadow-md transition">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Uy tín trung bình</p>
                        <div className="flex items-baseline gap-1">
                            <p className="text-3xl font-extrabold text-gray-900">{stats.averageRating}</p>
                            <span className="text-yellow-500 text-2xl">★</span>
                        </div>
                    </div>
                    <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                    </div>
                </div>

                {/* Card 3: Doanh thu */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between hover:shadow-md transition">
                    <div>
                        <p className="text-gray-500 text-sm font-medium mb-1">Doanh thu năm 2024</p>
                        <p className="text-3xl font-extrabold text-green-600">{Number(stats.annualRevenue).toLocaleString('vi-VN')}₫</p>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
                    </div>
                </div>

            </div>
        </div>
    );
}
