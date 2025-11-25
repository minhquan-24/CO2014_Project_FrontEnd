// src/app/(auth)/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Nhớ cài: npm install js-cookie
import Button from '@/app/components/button/Button';

export default function RegisterPage() {
    const router = useRouter();

    // State quản lý Role
    const [role, setRole] = useState<'Guest' | 'Host'>('Guest');

    // State quản lý Form
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        birthDate: '',
    });

    // State quản lý lỗi
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // 1. Validate Tuổi (Business Rule: >= 18 tuổi)
        const today = new Date();
        const birthDate = new Date(formData.birthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            setError('Bạn phải đủ 18 tuổi để đăng ký (Yêu cầu hệ thống).');
            return;
        }

        // 2. Giả lập đăng ký thành công & Lưu Cookie
        // Logic này tương ứng với Transaction Insert 2 bảng ở Backend
        if (role === 'Host') {
            Cookies.set('user_role', 'host');
            router.push('/host/dashboard');
        } else {
            Cookies.set('user_role', 'guest');
            router.push('/guest/search');
        }
    };

    return (
        // Wrapper giới hạn chiều rộng, giống trang Login
        <div className="w-full max-w-[550px] px-6">

            <div className="bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
                {/* Header của Form */}
                <div className="border-b border-gray-200 p-4 text-center bg-gray-50">
                    <h3 className="font-bold text-base text-gray-800">Đăng ký tài khoản</h3>
                </div>

                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Chào mừng đến với Airbnb</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* --- Phần 1: Chọn Vai Trò (Giao diện thẻ chọn) --- */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bạn muốn tham gia với tư cách?</label>
                            <div className="grid grid-cols-2 gap-3">
                                {/* Thẻ Khách */}
                                <div
                                    onClick={() => setRole('Guest')}
                                    className={`cursor-pointer border rounded-lg p-3 text-center transition-all duration-200 ${role === 'Guest'
                                            ? 'border-rose-600 bg-rose-50 text-rose-700 ring-1 ring-rose-600'
                                            : 'border-gray-300 hover:border-gray-400 text-gray-600'
                                        }`}
                                >
                                    <div className="font-bold">Khách (Guest)</div>
                                    <div className="text-xs mt-1">Tôi muốn đặt phòng</div>
                                </div>

                                {/* Thẻ Chủ nhà */}
                                <div
                                    onClick={() => setRole('Host')}
                                    className={`cursor-pointer border rounded-lg p-3 text-center transition-all duration-200 ${role === 'Host'
                                            ? 'border-rose-600 bg-rose-50 text-rose-700 ring-1 ring-rose-600'
                                            : 'border-gray-300 hover:border-gray-400 text-gray-600'
                                        }`}
                                >
                                    <div className="font-bold">Chủ nhà (Host)</div>
                                    <div className="text-xs mt-1">Tôi muốn cho thuê</div>
                                </div>
                            </div>
                        </div>

                        {/* --- Phần 2: Nhập liệu (Inputs) --- */}
                        <div className="space-y-4">
                            <div>
                                <input
                                    type="text" required
                                    className="w-full p-3.5 border border-gray-400 rounded-lg focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 placeholder-gray-500 text-gray-900"
                                    placeholder="Họ và tên đầy đủ"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>

                            <div>
                                <input
                                    type="email" required
                                    className="w-full p-3.5 border border-gray-400 rounded-lg focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 placeholder-gray-500 text-gray-900"
                                    placeholder="Địa chỉ Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="tel" required
                                    className="w-full p-3.5 border border-gray-400 rounded-lg focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 placeholder-gray-500 text-gray-900"
                                    placeholder="Số điện thoại"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                <div className="relative">
                                    {/* Input Date cần label giả hoặc placeholder đặc biệt */}
                                    <input
                                        type="date" required
                                        className="w-full p-3.5 border border-gray-400 rounded-lg focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 text-gray-900"
                                        title="Ngày sinh"
                                        value={formData.birthDate}
                                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                    />
                                    {/* Label nhỏ cho date nếu chưa nhập */}
                                    {!formData.birthDate && (
                                        <span className="absolute left-4 top-4 text-gray-500 pointer-events-none bg-white px-1">Ngày sinh</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <input
                                    type="password" required
                                    className="w-full p-3.5 border border-gray-400 rounded-lg focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 placeholder-gray-500 text-gray-900"
                                    placeholder="Mật khẩu"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <p className="text-xs text-gray-500 mt-1 ml-1">Mật khẩu cần có ít nhất 6 ký tự.</p>
                            </div>
                        </div>

                        {/* Thông báo lỗi (Validation) */}
                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg animate-pulse">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <p className="text-xs text-gray-500">
                            Bằng việc chọn <strong>Đồng ý và tiếp tục</strong>, tôi đồng ý với <span className="underline cursor-pointer">Điều khoản dịch vụ</span>, <span className="underline cursor-pointer">Điều khoản thanh toán</span> và <span className="underline cursor-pointer">Chính sách quyền riêng tư</span> của Airbnb.
                        </p>

                        {/* Nút Submit */}
                        <Button type="submit" fullWidth variant="primary" className="bg-gradient-to-r from-rose-500 to-rose-600 py-3.5 text-lg">
                            Đồng ý và tiếp tục
                        </Button>
                    </form>

                    {/* Footer Link */}
                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600">Đã có tài khoản Airbnb?</p>
                        <Link href="/login" className="text-rose-600 font-bold hover:underline mt-1 block">
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}