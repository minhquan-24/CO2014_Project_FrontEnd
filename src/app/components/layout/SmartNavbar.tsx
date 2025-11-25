// // src/app/components/layout/SmartNavbar.tsx
// 'use client';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// export default function SmartNavbar() {
//     const pathname = usePathname();
//     const isHostMode = pathname.includes('/host');

//     return (
//         <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
//             <div className="container mx-auto px-4 md:px-10 h-20 flex items-center justify-between">
//                 <Link href={isHostMode ? "/host" : "/"} className="flex items-center gap-2">
//                     <div className="text-rose-500">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '32px', width: '32px', fill: 'currentcolor' }}><path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 3.162.723 4.691l-.067.496c-.361 2.222-2.112 3.755-4.321 3.755l-.11-.002c-1.32-.045-2.529-.636-3.41-1.579l-.264-.298-.242.274c-.933 1.055-2.22 1.631-3.619 1.614l-.234-.006c-2.348-.095-4.148-1.785-4.437-4.113l-.042-.401c-.131-1.464.127-2.971.745-4.49l.169-.402c.966-2.203 5.376-11.268 7.294-14.896l.462-.848C12.515 1.95 13.985 1 16 1zm0 2c-1.239 0-2.053.539-2.987 2.211C11.139 8.583 6.726 17.632 5.766 19.824c-.503 1.236-.696 2.399-.575 3.493l.024.173c.22 1.77 1.536 3.033 3.328 3.106l.193.004c1.028-.014 1.969-.475 2.652-1.24l1.523-1.724a1.866 1.866 0 0 1 2.454-.25l.173.124 1.654 1.874c.736.834 1.724 1.266 2.768 1.213l.206-.016c1.65-.188 2.92-1.332 3.187-3.001l.036-.265c.137-1.155-.081-2.392-.647-3.708l-.132-.294C21.626 17.065 17.306 8.356 15.341 4.545 14.908 3.77 14.475 3 14.043 3H16z"></path></svg>
//                     </div>
//                     <span className="text-rose-500 font-bold text-xl hidden md:block">Airbkb</span>
//                 </Link>

//                 <div className="flex items-center gap-4">
//                     {isHostMode ? (
//                         <Link
//                             href="/"
//                             className="text-sm font-semibold text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full transition"
//                         >
//                             Chế độ du lịch
//                         </Link>
//                     ) : (
//                         <Link
//                             href="/host"
//                             className="text-sm font-semibold text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full transition"
//                         >
//                             Trở thành host
//                         </Link>
//                     )}

//                     <div className="flex items-center border border-gray-300 rounded-full p-1 pl-3 hover:shadow-md cursor-pointer gap-2 transition">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//                         </svg>
//                         <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center overflow-hidden">
//                             <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" className="w-full h-full object-cover" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// }

// src/app/components/layout/SmartNavbar.tsx

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SmartNavbar() {
    const pathname = usePathname();
    const isHostMode = pathname.includes('/host');

    // Hàm kiểm tra link đang active để tô đậm
    const isActive = (path: string) => pathname === path ? "text-gray-900 font-bold" : "text-gray-500 hover:text-gray-800 font-medium";

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm relative">
            <div className="container mx-auto px-4 md:px-10 h-20 flex items-center justify-between">

                <Link href={isHostMode ? "/host" : "/"} className="flex items-center gap-2 z-10">
                    <div className="text-rose-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '32px', width: '32px', fill: 'currentcolor' }}><path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 3.162.723 4.691l-.067.496c-.361 2.222-2.112 3.755-4.321 3.755l-.11-.002c-1.32-.045-2.529-.636-3.41-1.579l-.264-.298-.242.274c-.933 1.055-2.22 1.631-3.619 1.614l-.234-.006c-2.348-.095-4.148-1.785-4.437-4.113l-.042-.401c-.131-1.464.127-2.971.745-4.49l.169-.402c.966-2.203 5.376-11.268 7.294-14.896l.462-.848C12.515 1.95 13.985 1 16 1zm0 2c-1.239 0-2.053.539-2.987 2.211C11.139 8.583 6.726 17.632 5.766 19.824c-.503 1.236-.696 2.399-.575 3.493l.024.173c.22 1.77 1.536 3.033 3.328 3.106l.193.004c1.028-.014 1.969-.475 2.652-1.24l1.523-1.724a1.866 1.866 0 0 1 2.454-.25l.173.124 1.654 1.874c.736.834 1.724 1.266 2.768 1.213l.206-.016c1.65-.188 2.92-1.332 3.187-3.001l.036-.265c.137-1.155-.081-2.392-.647-3.708l-.132-.294C21.626 17.065 17.306 8.356 15.341 4.545 14.908 3.77 14.475 3 14.043 3H16z"></path></svg>
                    </div>
                    <span className="text-rose-500 font-bold text-xl hidden md:block">Airbkb</span>
                </Link>

                
                <nav className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
                    {isHostMode ? (
                        <>
                            <Link href="/host" className={isActive('/host')}>Tổng quan</Link>
                            {/* <Link href="/host/listings" className={isActive('/host/listings')}>Nhà của tôi</Link> */}
                            <Link href="/host/bookings" className={isActive('/host/bookings')}>Đơn đặt</Link>
                        </>
                    ) : (
                        <>
                            <Link href="/" className={pathname === '/' ? "text-gray-900 font-bold" : "text-gray-500 hover:text-gray-800 font-medium"}>
                                Tìm nhà
                            </Link>
                            <Link href="/bookings" className={isActive('/bookings')}>
                                Chuyến đi
                            </Link>
                        </>
                    )}
                </nav>

                <div className="flex items-center gap-4 z-10">
                    {isHostMode ? (
                        <Link
                            href="/"
                            className="text-sm font-semibold text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full transition"
                        >
                            Chế độ du lịch
                        </Link>
                    ) : (
                        <Link
                            href="/host"
                            className="text-sm font-semibold text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full transition"
                        >
                            Trở thành host
                        </Link>
                    )}

                    <div className="flex items-center border border-gray-300 rounded-full p-1 pl-3 hover:shadow-md cursor-pointer gap-2 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center overflow-hidden">
                            <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}