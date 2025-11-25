// src/app/components/ui/HeroSearchBar.tsx
'use client';

export default function HeroSearchBar() {
    return (
        <div className="border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-white p-2 flex items-center max-w-4xl mx-auto divide-x divide-gray-200">

            {/* 1. Địa điểm */}
            <div className="flex-1 px-6 py-2 hover:bg-gray-100 rounded-full cursor-pointer group">
                <div className="text-xs font-bold text-gray-800">Địa điểm</div>
                <input
                    type="text"
                    placeholder="Tìm kiếm điểm đến"
                    className="w-full text-sm text-gray-600 placeholder-gray-400 bg-transparent outline-none group-hover:bg-transparent"
                />
            </div>

            {/* 2. Thời gian */}
            <div className="flex-1 px-6 py-2 hover:bg-gray-100 rounded-full cursor-pointer">
                <div className="text-xs font-bold text-gray-800">Thời gian</div>
                <div className="text-sm text-gray-400">Thêm ngày</div>
            </div>

            {/* 3. Khách */}
            <div className="flex-[0.8] pl-6 pr-2 py-2 hover:bg-gray-100 rounded-full cursor-pointer flex items-center justify-between">
                <div>
                    <div className="text-xs font-bold text-gray-800">Khách</div>
                    <div className="text-sm text-gray-400">Thêm khách</div>
                </div>

                {/* Nút Kính lúp */}
                <button className="bg-rose-500 hover:bg-rose-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: 4, overflow: 'visible' }} aria-hidden="true" role="presentation" focusable="false"><path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path></svg>
                </button>
            </div>
        </div>
    );
}