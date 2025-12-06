'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authApi } from '@/app/service/api';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; 

export default function SmartNavbar() {
    const pathname = usePathname();
    // const isHostMode = pathname.includes('/host');
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


     useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const userRole = user?.role;
    const isHost = userRole === 'HOST';

    const handleLogout = async () => {
        try {
            await authApi.logout();
            localStorage.removeItem('user'); 
            setUser(null);
            Cookies.remove('access_token');
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    if (isLoading) return <header className="h-20 bg-white border-b"></header>;

    
    const isActive = (path: string) => pathname === path ? "text-gray-900 font-bold" : "text-gray-500 hover:text-gray-800 font-medium";

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm relative">
            <div className="container mx-auto px-4 md:px-10 h-20 flex items-center justify-between">

                <Link href={isHost ? "/host" : "/"} className="flex items-center gap-2 z-10">
                    <div className="h-10 w-10 relative">
                        <img
                            src="/image/logo.svg" 
                            alt="Logo BK"
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <span className="text-rose-500 font-bold text-xl hidden md:block">Airbkb</span>
                </Link>

                
                <nav className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
                    {isHost ? (
                        <>
                            <Link href="/host" className={isActive('/host')}>Accommodations</Link>
                            {/* <Link href="/host/listings" className={isActive('/host/listings')}>Nhà của tôi</Link> */}
                            <Link href="/host/bookings" className={isActive('/host/bookings')}>Booking Orders</Link>
                        </>
                    ) : (
                        <>
                            <Link href="/" className={pathname === '/' ? "text-gray-900 font-bold" : "text-gray-500 hover:text-gray-800 font-medium"}>
                                Find place
                            </Link>
                            <Link href="/bookings" className={isActive('/bookings')}>
                                My Trip
                            </Link>
                        </>
                    )}
                </nav>

                <div className="flex items-center gap-4 z-10">
                    {/* {isHostMode ? (
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
                    )} */}

                    {/* <div className="flex items-center border border-gray-300 rounded-full p-1 pl-3 hover:shadow-md cursor-pointer gap-2 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center overflow-hidden">
                            <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                    </div> */}

                    <div className="relative">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center border border-gray-300 rounded-full p-1 pl-3 hover:shadow-md cursor-pointer gap-2 transition bg-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center overflow-hidden">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" className="w-full h-full object-cover" />
                                )}
                            </div>
                        </button>

                        {isMenuOpen && (
                            <div className="absolute right-0 top-12 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden flex flex-col">
                                {user ? (
                                    <>
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 mt-1 inline-block">{user.role}</span>
                                        </div>
                                        <Link 
                                            href="/profile" 
                                            className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Profile
                                        </Link>

                                         {!isHost && (
                                            <Link 
                                                href="/bookings" 
                                                className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                My Trip
                                            </Link>
                                        )}

                                        <div className="border-t border-gray-100 my-1"></div>
                                        <button 
                                            onClick={handleLogout}
                                            className="px-4 py-3 text-sm text-red-600 hover:bg-gray-50 text-left w-full font-semibold"
                                        >
                                            Log out
                                        </button>
                                    </>
                                ) : (
                                    // Nếu chưa đăng nhập
                                    <>
                                        <Link href="/login" className="px-4 py-3 text-sm font-bold text-gray-900 hover:bg-gray-50">Log In</Link>
                                        <Link href="/register" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">Register</Link>
                                    </>
                                )}
                            </div>
                        )}
                        
                        {isMenuOpen && (
                            <div className="fixed inset-0 z-[-1]" onClick={() => setIsMenuOpen(false)}></div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}