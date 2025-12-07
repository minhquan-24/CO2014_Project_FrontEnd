'use client';

import { useState, useEffect } from 'react';
import { adminApi } from '@/app/service/api';

export default function AdminContactsPage() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const LIMIT = 50; 

    const fetchContacts = async (pageNumber: number) => {
        setLoading(true);
        try {
            const res = await adminApi.getContacts(pageNumber, LIMIT);
            setContacts(res.data);
            setTotalPages(res.meta.totalPages);
            setPage(res.meta.currentPage);
        } catch (error) {
            console.error("Lỗi tải contacts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts(page);
    }, [page]);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisibleButtons = 5; 

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (page <= 4) {
                pages.push(1, 2, 3, 4, 5, '...', totalPages);
            } else if (page >= totalPages - 3) {
                pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Viewer</h1>
            
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-bold">
                                <th className="p-4 w-20">ID</th>
                                <th className="p-4">Guest Info</th>
                                <th className="p-4">Host Info</th>
                                <th className="p-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan={4} className="p-8 text-center">Loading...</td></tr>
                            ) : contacts.length === 0 ? (
                                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No contact.</td></tr>
                            ) : (
                                contacts.map((item) => (
                                    <tr key={item.Contact_ID} className="hover:bg-gray-50 transition">
                                        <td className="p-4 text-gray-400 font-mono text-sm">#{item.Contact_ID}</td>
                                        <td className="p-4">
                                            <div className="font-bold text-gray-900">{item.GuestName}</div>
                                            <div className="text-xs text-gray-500">{item.GuestEmail}</div>
                                            <div className="text-[10px] text-blue-600 font-mono mt-1">{item.Guest_ID}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-gray-900">{item.HostName}</div>
                                            <div className="text-xs text-gray-500">{item.HostEmail}</div>
                                            <div className="text-[10px] text-purple-600 font-mono mt-1">{item.Host_ID}</div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Connected</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- THANH PHÂN TRANG MỚI --- */}
                {!loading && contacts.length > 0 && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <span className="text-sm text-gray-600">
                            Hiển thị <strong>{(page - 1) * LIMIT + 1}</strong> - <strong>{Math.min(page * LIMIT, (page - 1) * LIMIT + contacts.length)}</strong>
                        </span>

                        <div className="flex gap-1">
                            {/* Nút Trước */}
                            <button 
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 text-sm font-medium transition"
                            >
                                &laquo; Previous
                            </button>

                            {/* Danh sách số trang */}
                            {getPageNumbers().map((num, index) => (
                                <button
                                    key={index}
                                    onClick={() => typeof num === 'number' && setPage(num)}
                                    disabled={num === '...'}
                                    className={`px-3 py-1 border rounded text-sm font-medium min-w-[32px] transition
                                        ${num === page 
                                            ? 'bg-rose-600 text-white border-rose-600' 
                                            : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-300'}
                                        ${num === '...' ? 'cursor-default border-none bg-transparent hover:bg-transparent' : ''}
                                    `}
                                >
                                    {num}
                                </button>
                            ))}

                            {/* Nút Sau */}
                            <button 
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 text-sm font-medium transition"
                            >
                                Next &raquo;
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}