'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { adminApi } from '@/app/service/api';
import Link from 'next/link';

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await adminApi.getUserDetail(id);
        setUser(data);
      } catch (error) {
        alert("Không tìm thấy user hoặc lỗi hệ thống");
        router.push('/admin');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, router]);

  if (loading) return <div className="p-10 text-center">Loading infomation...</div>;
  if (!user) return null;

  return (
    <div className="container mx-auto max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/admin" className="hover:text-rose-600 hover:underline">Dashboard</Link>
        <span>/</span>
        <span className="font-bold text-gray-800">Detail of User: {user.User_ID}</span>
      </div>

      {/* HEADER CARD */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="bg-gray-900 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold">
              {user.Name?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.Name}</h1>
              <p className="text-gray-400">{user.Email}</p>
            </div>
          </div>
          <span className={`px-4 py-1 rounded-full text-sm font-bold ${user.Role === 'Host' ? 'bg-blue-500' : 'bg-purple-500'}`}>
            {user.Role}
          </span>
        </div>

        {/* INFO GRID */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem label="User ID" value={user.User_ID} />
          <InfoItem label="Attendance Date" value={new Date(user.Joined_Date).toLocaleDateString()} />
          <InfoItem label="Phone number" value={user.PhoneNumber || 'Not updated'} />
          <InfoItem label="Nationality" value={user.Nationality || 'Not updated'} />
          <InfoItem label="Birthday" value={user.BirthDate ? new Date(user.BirthDate).toLocaleDateString() : 'Not updated'} />
          <InfoItem label="SSN" value={user.SSN || 'Not updated'} />
        </div>
      </div>

      {/* ROLE SPECIFIC STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {user.Role === 'Host' ? (
          <>
            <StatCard label="Accommodations" value={user.Listings_Count} color="blue" />
            <StatCard label="Tax Number" value={user.Tax_ID || 'N/A'} color="red" />
            <StatCard label="Superhost" value={user.Is_Superhost ? 'YES' : 'NO'} color={user.Is_Superhost ? 'yellow' : 'gray'} />
            <StatCard label="Acceptance rate" value={user.Acceptance_Rate ? `${user.Acceptance_Rate}%` : 'N/A'} color="green" />
            <StatCard label="Response Time" value={user.Response_Time || 'N/A'} color="purple" />
          </>
        ) : (
          <>
            <StatCard label="Bookings" value={user.Bookings_Count} color="purple" />
            <StatCard label="Reviews" value={user.Reviews_Count} color="pink" />
            <StatCard label="Preferred Payment" value={user.Preferred_Payment || 'Cash'} color="green" />
            <StatCard label="Travel Interest" value={user.Travel_Interests || 'None'} color="blue" />
          </>
        )}
      </div>
    </div>
  );
}

const InfoItem = ({ label, value }: { label: string, value: string }) => (
  <div className="border-b border-gray-100 pb-2">
    <span className="block text-xs font-bold text-gray-500 uppercase">{label}</span>
    <span className="text-gray-900 font-medium">{value}</span>
  </div>
);

const StatCard = ({ label, value, color }: any) => {
  const colorMap: any = {
    blue: 'border-blue-500',
    gray: 'border-gray-500',
    yellow: 'border-yellow-500',
    purple: 'border-purple-500',
    pink: 'border-pink-500',
    green: 'border-green-500',
    red: 'border-red-500',
  };

  const borderClass = colorMap[color] || 'border-gray-500';
  return (
    <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm border-l-4 ${borderClass}`}>
      <p className="text-gray-500 text-sm font-bold uppercase">{label}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
};