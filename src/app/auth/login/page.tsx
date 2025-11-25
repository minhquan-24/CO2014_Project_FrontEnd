// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';

// export default function LoginPage() {
//     const router = useRouter();
//     const [formData, setFormData] = useState({ email: '', password: '' });

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (formData.email.includes('host')) {
//             Cookies.set('user_role', 'host');
//             router.push('/host/dashboard');
//         } else if (formData.email.includes('admin')) {
//             Cookies.set('user_role', 'admin');
//             router.push('/admin/dashboard');
//         } else {
//             Cookies.set('user_role', 'guest');
//             router.push('/guest/search');
//         }
//     };

//     return (
//         <div className="w-full max-w-[500px] px-6"> 

//             <div className="bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
//                 <div className="border-b border-gray-200 p-4 text-center bg-gray-50">
//                     <h3 className="font-bold text-base text-gray-800">Đăng nhập hoặc đăng ký</h3>
//                 </div>

//                 <div className="p-6">
//                     <h2 className="text-2xl font-semibold text-gray-800 mb-6 mt-2">Chào mừng bạn đến với Airbnb</h2>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div>
//                             <input
//                                 type="email"
//                                 required
//                                 className="w-full p-4 border border-gray-400 rounded-lg focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 placeholder-gray-500 text-gray-900"
//                                 placeholder="Email"
//                                 value={formData.email}
//                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                             />
//                         </div>

//                         <div>
//                             <input
//                                 type="password"
//                                 required
//                                 className="w-full p-4 border border-gray-400 rounded-lg focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 placeholder-gray-500 text-gray-900"
//                                 placeholder="Mật khẩu"
//                                 value={formData.password}
//                                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                             />
//                         </div>

//                         <p className="text-xs text-gray-500 mt-2">
//                             Chúng tôi sẽ gọi điện hoặc nhắn tin cho bạn để xác nhận số điện thoại. Có áp dụng phí dữ liệu và phí tin nhắn tiêu chuẩn. <span className="underline font-bold cursor-pointer">Chính sách về quyền riêng tư</span>
//                         </p>

//                         <Button type="submit" fullWidth variant="primary" className="bg-gradient-to-r from-rose-500 to-rose-600 py-3.5 text-lg">
//                             Tiếp tục
//                         </Button>
//                     </form>

//                     {/* Divider Hoặc */}
//                     <div className="my-6 flex items-center">
//                         <div className="flex-grow border-t border-gray-300"></div>
//                         <span className="flex-shrink-0 mx-4 text-xs text-gray-500">hoặc</span>
//                         <div className="flex-grow border-t border-gray-300"></div>
//                     </div>

//                     {/* Link đăng ký */}
//                     <div className="text-center">
//                         <p className="text-sm text-gray-600 mb-2">Chưa có tài khoản?</p>
//                         <Link href="/register">
//                             <Button fullWidth variant="secondary" className="py-3 border-black border-opacity-80 text-black hover:bg-gray-50">
//                                 Tạo tài khoản mới
//                             </Button>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }