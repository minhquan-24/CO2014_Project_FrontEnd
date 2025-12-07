'use client'; 

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '@/app/service/api';


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout(); 
      localStorage.removeItem('user');
      router.push('/login');
      router.refresh(); 
    } catch (error) {
      console.error("Logout failed:", error);
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-rose-500">Airbkb Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-3 rounded hover:bg-red-800 text-white font-bold">
            Dashboard & Users
          </Link>
          <Link href="/admin/contacts" className="block px-4 py-3 rounded hover:bg-red-800 text-gray-300 text-white font-bold ">
            Contact Viewer
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout} 
            className="flex w-full items-center gap-2 text-gray-400 hover:text-white transition px-4 py-2 hover:bg-gray-800 rounded text-left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span>Log out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}