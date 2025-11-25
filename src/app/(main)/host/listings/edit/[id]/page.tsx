'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

const AMENITIES_OPTIONS = [
    'Wifi tốc độ cao', 'Hồ bơi riêng', 'Bếp đầy đủ tiện nghi',
    'Chỗ đậu xe miễn phí', 'Máy lạnh trung tâm', 'Máy giặt & Máy sấy',
    'Lò nướng BBQ', 'View biển', 'Bồn tắm nóng', 'TV 4K'
];

export default function EditListingPage() {
    const router = useRouter();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        title: '',
        address: '',
        city: 'Vung Tau',
        description: '',
        pricePerNight: 0,
        maxGuests: 1,
        amenities: [] as string[],
        status: 'Active'
    });

    useEffect(() => {
        setTimeout(() => {
            setFormData({
                title: 'Luxury Villa Vung Tau View Biển',
                address: '123 Đường Thùy Vân',
                city: 'Vung Tau',
                description: 'Biệt thự đẹp nhất khu vực...',
                pricePerNight: 5000000,
                maxGuests: 10,
                amenities: ['Wifi tốc độ cao', 'Hồ bơi riêng'],
                status: 'Active'
            });
            setIsLoading(false);
        }, 500);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`✅ Đã cập nhật thông tin thành công!\nID: ${params.id}\nSQL: UPDATE accommodation SET...`);
        router.push('/host');
    };

    const toggleAmenity = (item: string) => {
        if (formData.amenities.includes(item)) {
            setFormData({ ...formData, amenities: formData.amenities.filter(i => i !== item) });
        } else {
            setFormData({ ...formData, amenities: [...formData.amenities, item] });
        }
    };

    if (isLoading) return <div className="p-10 text-center">Đang tải dữ liệu cũ...</div>;

    return (
        <div className="container mx-auto px-4 py-10 max-w-3xl min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa nhà: {params.id}</h1>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                    {formData.status}
                </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Vị trí</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">Địa chỉ</label>
                            <input type="text" className="w-full border p-3 rounded-lg bg-gray-50" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Thành phố</label>
                            <select className="w-full border p-3 rounded-lg" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}>
                                <option value="Vung Tau">Vũng Tàu</option>
                                <option value="Hanoi">Hà Nội</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Thông tin chi tiết</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">Tiêu đề</label>
                            <input type="text" className="w-full border p-3 rounded-lg" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Mô tả</label>
                            <textarea rows={5} className="w-full border p-3 rounded-lg" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Giá (VNĐ)</label>
                                <input type="number" className="w-full border p-3 rounded-lg" value={formData.pricePerNight} onChange={(e) => setFormData({ ...formData, pricePerNight: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Trạng thái</label>
                                <select className="w-full border p-3 rounded-lg" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                    <option value="Active">Hiện (Active)</option>
                                    <option value="Inactive">Ẩn (Inactive)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Tiện nghi</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {AMENITIES_OPTIONS.map(option => (
                            <label key={option} className="flex items-center gap-2 cursor-pointer p-2 border rounded hover:bg-gray-50">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 accent-black"
                                    checked={formData.amenities.includes(option)}
                                    onChange={() => toggleAmenity(option)}
                                />
                                <span className="text-sm">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4 pt-4 sticky bottom-0 bg-white p-4 border-t shadow-inner z-10">
                    <Link href="/host" className="px-6 py-3 rounded-lg font-bold text-gray-700 hover:bg-gray-200 transition">
                        Quay lại
                    </Link>
                    <button type="submit" className="flex-1 bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition">
                        Lưu thay đổi
                    </button>
                </div>

            </form>
        </div>
    );
}