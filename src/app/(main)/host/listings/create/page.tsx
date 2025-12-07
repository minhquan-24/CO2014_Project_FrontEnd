// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { hostApi } from '@/app/service/api';

// const AMENITIES_OPTIONS = ['Wifi', 'TV', 'Kitchen', 'Air conditioning', 'Pool', 'Parking'];

// export default function CreateListingPage() {
//     const router = useRouter();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState('');

//     const [formData, setFormData] = useState({
//         title: '',
//         city: 'Vung Tau',
//         description: '',
//         pricePerNight: '',
//         maxGuests: 2,
//         amenities: [] as string[],
//     });

//     const toggleAmenity = (item: string) => {
//         if (formData.amenities.includes(item)) {
//             setFormData({ ...formData, amenities: formData.amenities.filter(i => i !== item) });
//         } else {
//             setFormData({ ...formData, amenities: [...formData.amenities, item] });
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setError('');

//         // Basic Validation (Frontend)
//         if (!formData.title || !formData.pricePerNight) {
//             setError('Vui lòng điền đầy đủ các trường bắt buộc.');
//             setIsSubmitting(false);
//             return;
//         }

//         try {
//             await hostApi.createListing(formData);
//             alert("✅ Đăng nhà thành công!");
//             router.push('/host');
//         } catch (err: any) {
//             console.error(err);
//             setError(err.message || 'Có lỗi xảy ra khi tạo nhà.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-10 max-w-3xl min-h-screen">
//             <h1 className="text-3xl font-bold text-gray-900 mb-6">Đăng nhà mới</h1>
            
//             {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>}

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* 1. LOCATION */}
//                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                     <h2 className="text-xl font-bold mb-4">1. Vị trí</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-bold mb-1">Thành phố</label>
//                             <select className="w-full border p-3 rounded-lg" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}>
//                                 <option value="Vung Tau">Vũng Tàu</option>
//                                 <option value="Hanoi">Hà Nội</option>
//                                 <option value="Ho Chi Minh">Hồ Chí Minh</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* 2. DETAILS */}
//                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                     <h2 className="text-xl font-bold mb-4">2. Thông tin chi tiết</h2>
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-bold mb-1">Tiêu đề *</label>
//                             <input required type="text" className="w-full border p-3 rounded-lg" 
//                                 value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-bold mb-1">Mô tả</label>
//                             <textarea rows={4} className="w-full border p-3 rounded-lg" 
//                                 value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-bold mb-1">Giá / đêm *</label>
//                                 <input required type="number" className="w-full border p-3 rounded-lg" 
//                                     value={formData.pricePerNight} onChange={e => setFormData({ ...formData, pricePerNight: e.target.value })} />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-bold mb-1">Số khách tối đa</label>
//                                 <input type="number" className="w-full border p-3 rounded-lg" 
//                                     value={formData.maxGuests} onChange={e => setFormData({ ...formData, maxGuests: Number(e.target.value) })} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* 3. AMENITIES */}
//                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//                     <h2 className="text-xl font-bold mb-4">3. Tiện nghi</h2>
//                     <div className="grid grid-cols-2 gap-3">
//                         {AMENITIES_OPTIONS.map(opt => (
//                             <label key={opt} className="flex items-center gap-2 cursor-pointer p-2 border rounded hover:bg-gray-50">
//                                 <input type="checkbox" checked={formData.amenities.includes(opt)} onChange={() => toggleAmenity(opt)} />
//                                 <span className="text-sm">{opt}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="flex gap-4 pt-4">
//                     <Link href="/host" className="px-6 py-3 rounded-lg font-bold text-gray-700 hover:bg-gray-200 transition">Hủy</Link>
//                     <button type="submit" disabled={isSubmitting} className="flex-1 bg-rose-600 text-white font-bold py-3 rounded-lg hover:bg-rose-700 transition disabled:bg-gray-400">
//                         {isSubmitting ? 'Đang xử lý...' : 'Đăng nhà ngay'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { hostApi } from '@/app/service/api';

const AMENITIES_OPTIONS = ['Wifi', 'TV', 'Kitchen', 'Air conditioning', 'Pool', 'Parking'];

export default function CreateListingPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [types, setTypes] = useState<any[]>([]); 

    const [formData, setFormData] = useState({
        title: '',
        city: 'Vung Tau, Ba Ria - Vung Tau', // ✅ Mặc định format mới
        typeId: '',
        description: '',
        pricePerNight: '',
        maxGuests: 2,
        amenities: [] as string[],
        numBedrooms: 0,
        numBathrooms: 0,
        numBeds: 0
    });

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const data = await hostApi.getAccommodationTypes();
                console.log("🔥 Dữ liệu Types nhận được:", data); // <--- THÊM DÒNG NÀY
                setTypes(data);
                if (data.length > 0) setFormData(prev => ({ ...prev, typeId: data[0].Type_ID }));
            } catch (e) { console.error(e); }
        };
        fetchTypes();
    }, []);

    const toggleAmenity = (item: string) => {
        if (formData.amenities.includes(item)) {
            setFormData({ ...formData, amenities: formData.amenities.filter(i => i !== item) });
        } else {
            setFormData({ ...formData, amenities: [...formData.amenities, item] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await hostApi.createListing(formData);
            alert("✅ Đăng nhà thành công!");
            router.push('/host');
        } catch (err: any) {
            alert(err.message || 'Lỗi tạo nhà');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-10 max-w-3xl min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Đăng nhà mới</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. LOCATION & TYPE */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">1. Thông tin cơ bản</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-bold mb-1">Loại hình chỗ ở *</label>
                            <select 
                                required className="w-full border p-3 rounded-lg bg-white"
                                value={formData.typeId} onChange={e => setFormData({ ...formData, typeId: e.target.value })}
                            >
                                <option value="" disabled>-- Chọn loại nhà --</option>
                                {types.map((t) => (
                                    <option key={t.Type_ID} value={t.Type_ID}>{t.Type_Name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-2">
    <label className="block text-sm font-bold mb-1">Khu vực (Thành phố, Tỉnh/Bang) *</label>
    <input 
        required 
        type="text" 
        className="w-full border p-3 rounded-lg"
        placeholder="VD: Vung Tau, Ba Ria - Vung Tau"
        value={formData.city} 
        onChange={e => setFormData({ ...formData, city: e.target.value })} 
    />
    <p className="text-xs text-gray-500 mt-1">Nhập theo định dạng: Tên thành phố, Tên tỉnh (để hiển thị đẹp hơn trên bản đồ).</p>
</div>
                    </div>
                </div>

                {/* 2. DETAILS */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">2. Chi tiết</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">Tiêu đề *</label>
                            <input required type="text" className="w-full border p-3 rounded-lg" placeholder="VD: Căn hộ view biển..."
                                value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Mô tả</label>
                            <textarea rows={5} className="w-full border p-3 rounded-lg" placeholder="Mô tả chi tiết về chỗ ở của bạn..."
                                value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Giá / đêm (VNĐ) *</label>
                                <input required type="number" className="w-full border p-3 rounded-lg" 
                                    value={formData.pricePerNight} onChange={e => setFormData({ ...formData, pricePerNight: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Số khách tối đa</label>
                                <input type="number" className="w-full border p-3 rounded-lg" 
                                    value={formData.maxGuests} onChange={e => setFormData({ ...formData, maxGuests: Number(e.target.value) })} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
    <div>
        <label className="block text-sm font-bold mb-1">Số phòng ngủ</label>
        <input type="number" min="0" className="w-full border p-3 rounded-lg" 
            value={formData.numBedrooms} onChange={e => setFormData({ 
                ...formData, 
                numBedrooms: e.target.value === '' ? 0 : parseFloat(e.target.value) 
            })}  />
    </div>
    <div>
        <label className="block text-sm font-bold mb-1">Số giường</label>
        <input type="number" min="0" className="w-full border p-3 rounded-lg" 
            value={formData.numBeds} onChange={e => setFormData({ 
                ...formData, 
                numBeds: e.target.value === '' ? 0 : parseFloat(e.target.value) 
            })}  />
    </div>
    <div>
        <label className="block text-sm font-bold mb-1">Số phòng tắm</label>
        <input type="number" min="0" className="w-full border p-3 rounded-lg" 
            value={formData.numBathrooms} onChange={e => setFormData({ 
                ...formData, 
                // Nếu input rỗng thì về 0, ngược lại lấy giá trị số
                numBathrooms: e.target.value === '' ? 0 : parseFloat(e.target.value) 
            })}  />
    </div>
</div>
                    </div>
                </div>

                {/* 3. AMENITIES */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">3. Tiện nghi</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {AMENITIES_OPTIONS.map(opt => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer p-2 border rounded hover:bg-gray-50">
                                <input type="checkbox" checked={formData.amenities.includes(opt)} onChange={() => toggleAmenity(opt)} />
                                <span className="text-sm">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <Link href="/host" className="px-6 py-3 rounded-lg font-bold text-gray-700 hover:bg-gray-200 transition">Hủy</Link>
                    <button type="submit" disabled={isSubmitting} className="flex-1 bg-rose-600 text-white font-bold py-3 rounded-lg hover:bg-rose-700 disabled:bg-gray-400">
                        {isSubmitting ? 'Đang xử lý...' : 'Đăng nhà ngay'}
                    </button>
                </div>
            </form>
        </div>
    );
}