'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AMENITIES_OPTIONS = [
    'Wifi tốc độ cao', 'Hồ bơi riêng', 'Bếp đầy đủ tiện nghi',
    'Chỗ đậu xe miễn phí', 'Máy lạnh trung tâm', 'Máy giặt & Máy sấy',
    'Lò nướng BBQ', 'View biển', 'Bồn tắm nóng', 'TV 4K'
];

export default function CreateListingPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        address: '',
        city: 'Vung Tau', 
        description: '',
        pricePerNight: '',
        maxGuests: 2,
        amenities: [] as string[],
        imageUrl: '' 
    });

    const toggleAmenity = (item: string) => {
        if (formData.amenities.includes(item)) {
            setFormData({ ...formData, amenities: formData.amenities.filter(i => i !== item) });
        } else {
            setFormData({ ...formData, amenities: [...formData.amenities, item] });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            console.log("--- START TRANSACTION ---");
            console.log("1. INSERT INTO Location (City, Address)... VALUES", formData.city, formData.address);
            console.log("2. INSERT INTO Accommodation (Title, Price, Amenities...)... VALUES", formData.title, formData.pricePerNight);
            console.log("3. INSERT INTO Post (HostID, AccID, Date)...");
            console.log("--- COMMIT ---");
            console.log("Trigger: trg_post_after_insert executed -> Listings_Count + 1");

            alert("✅ Đăng nhà thành công! \n(Dữ liệu đã được thêm vào 3 bảng: Location, Accommodation, Post)");
            router.push('/host'); // Quay về Dashboard
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-10 max-w-3xl min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhà mới</h1>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">1. Vị trí</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-bold mb-1">Địa chỉ cụ thể</label>
                            <input
                                required type="text"
                                className="w-full border p-3 rounded-lg outline-none focus:border-black"
                                placeholder="Ví dụ: 123 Đường Thùy Vân"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Thành phố</label>
                            <select
                                className="w-full border p-3 rounded-lg outline-none focus:border-black bg-white"
                                value={formData.city}
                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                            >
                                <option value="Vung Tau">Vũng Tàu</option>
                                <option value="Hanoi">Hà Nội</option>
                                <option value="Seoul">Seoul</option>
                                <option value="Ho Chi Minh">Hồ Chí Minh</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">2. Thông tin chi tiết</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">Tiêu đề nhà</label>
                            <input
                                required type="text"
                                className="w-full border p-3 rounded-lg outline-none focus:border-black"
                                placeholder="Vd: Villa sát biển view đẹp..."
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Mô tả</label>
                            <textarea
                                required rows={5}
                                className="w-full border p-3 rounded-lg outline-none focus:border-black"
                                placeholder="Mô tả không gian, tiện ích xung quanh..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Giá mỗi đêm (VNĐ)</label>
                                <input
                                    required type="number"
                                    className="w-full border p-3 rounded-lg outline-none focus:border-black"
                                    value={formData.pricePerNight}
                                    onChange={e => setFormData({ ...formData, pricePerNight: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Số khách tối đa</label>
                                <input
                                    required type="number" min={1}
                                    className="w-full border p-3 rounded-lg outline-none focus:border-black"
                                    value={formData.maxGuests}
                                    onChange={e => setFormData({ ...formData, maxGuests: Number(e.target.value) })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">3. Tiện nghi</h2>
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

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">4. Hình ảnh</h2>
                    <label className="block text-sm font-bold mb-1">URL Ảnh chính</label>
                    <input
                        type="text"
                        className="w-full border p-3 rounded-lg outline-none focus:border-black"
                        placeholder="/images/..."
                        value={formData.imageUrl}
                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                    <p className="text-xs text-gray-500 mt-2">*Trong thực tế sẽ là nút Upload File</p>
                </div>

                <div className="flex gap-4 pt-4">
                    <Link href="/host" className="px-6 py-3 rounded-lg font-bold text-gray-700 hover:bg-gray-200 transition">
                        Hủy
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-lg transition disabled:bg-gray-400"
                    >
                        {isSubmitting ? 'Đang xử lý...' : 'Đăng nhà ngay'}
                    </button>
                </div>

            </form>
        </div>
    );
}