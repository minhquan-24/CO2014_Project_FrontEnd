'use client';

import { useState } from 'react';

// Interface dữ liệu gửi đi
export interface SearchParams {
    keyword: string;
    checkIn: string;
    checkOut: string;
    guests: number;
}

interface Props {
    onSearch?: (params: SearchParams) => void;
}

export default function HeroSearchBar({ onSearch }: Props) {
    const [keyword, setKeyword] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

    const handleSearch = () => {
        if (onSearch) {
            onSearch({
                keyword,
                checkIn,
                checkOut,
                guests
            });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-full shadow-lg border border-gray-200 flex items-center p-2">
            
            {/* 1. ĐỊA ĐIỂM */}
            <div className="flex-1 px-6 border-r border-gray-200 relative">
                <label className="block text-xs font-bold text-gray-800 ml-1">Địa điểm</label>
                <input 
                    type="text" 
                    placeholder="Tìm kiếm điểm đến" 
                    className="w-full outline-none text-sm text-gray-600 placeholder-gray-400 bg-transparent truncate"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {/* 2. NHẬN PHÒNG */}
            <div className="hidden md:block flex-1 px-6 border-r border-gray-200">
                <label className="block text-xs font-bold text-gray-800">Nhận phòng</label>
                <input 
                    type="date"
                    className="w-full outline-none text-sm text-gray-600 bg-transparent cursor-pointer"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                />
            </div>
            
            {/* 3. TRẢ PHÒNG */}
            <div className="hidden md:block flex-1 px-6 border-r border-gray-200">
                <label className="block text-xs font-bold text-gray-800">Trả phòng</label>
                <input 
                    type="date"
                    className="w-full outline-none text-sm text-gray-600 bg-transparent cursor-pointer"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                />
            </div>

            {/* 4. KHÁCH */}
            <div className="hidden md:block flex-1 px-6 relative">
                <label className="block text-xs font-bold text-gray-800">Khách</label>
                <input 
                    type="number"
                    min={1}
                    className="w-full outline-none text-sm text-gray-600 bg-transparent"
                    placeholder="Thêm khách"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                />
            </div>

            {/* NÚT SEARCH */}
            <button 
                onClick={handleSearch}
                className="bg-rose-500 hover:bg-rose-600 text-white rounded-full p-3 m-1 transition-all flex items-center justify-center shadow-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </button>
        </div>
    );
}