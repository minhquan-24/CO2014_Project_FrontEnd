import Link from 'next/link';
import Image from 'next/image';
import { Accommodation } from '@/app/data/mockData';

export default function ListingCard({ data }: { data: Accommodation }) {
    return (
        <Link href={`/accommodations/${data.id}`} className="block group min-w-[280px] snap-start">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-200">
                <Image
                    src={data.imageUrl}
                    alt={data.title}
                    fill // Thuộc tính quan trọng: Tự động tràn đầy khung cha
                    className="object-cover group-hover:scale-105 transition duration-300" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                />
                <div className="absolute top-3 right-3 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="rgba(0,0,0,0.5)" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-110 transition">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </div>
                <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-xs font-bold shadow-sm">
                    Được khách yêu thích
                </div>
            </div>

            <div className="mt-2 space-y-1">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 truncate pr-2">{data.title}</h3>
                    <div className="flex items-center gap-1 text-sm">
                        <span className="text-black">★</span>
                        <span>{data.averageRating}</span>
                    </div>
                </div>
                <p className="text-gray-500 text-sm">{data.locationCity}</p>
                <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-semibold text-gray-900">{data.pricePerNight.toLocaleString()}₫</span>
                    <span className="text-gray-900"> cho 2 đêm</span>
                </div>
            </div>
        </Link>
    );
}