// CO2014_Project_FrontEnd\src\app\(main)\host\[hostId]\bookings\page.tsx

'use client';
import { use } from 'react';
import { useEffect, useState } from 'react';
import { BookingResponse } from '@/app/types/booking';
import { approveBooking, rejectBooking } from '@/app/api/booking';

export default function HostBookingsPage({ params }: { params: Promise<{ hostId: string }> }) {
  const { hostId } = use(params);

  console.log("Host ID =", hostId);

  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [activeTab, setActiveTab] = useState<'Pending' | 'Confirmed'>('Pending');
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Formatting Helpers
  // -----------------------------
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const formatPrice = (value: number | string) => {
    return Number(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  // -----------------------------
  // Load Bookings
  // -----------------------------
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/host/${hostId}/all`
      );

      if (!res.ok) throw new Error("Failed to fetch bookings");

      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Actions
  // -----------------------------
  const handleApprove = async (bookingId: number) => {
    if (!confirm("Approve this booking?")) return;

    try {
      await approveBooking(bookingId, hostId);
      alert("Booking approved successfully.");
      loadBookings();
    } catch (err: any) {
      alert("Failed to approve: " + err.message);
    }
  };

  const handleReject = async (item: BookingResponse) => {
    if (!confirm("Reject this booking?")) return;

    try {
      await rejectBooking(item.Booking_ID, item.Guest_ID);
      alert("Booking rejected and cancelled.");
      loadBookings();
    } catch (err: any) {
      alert("Failed to reject: " + err.message);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "Pending") {  
      return b.Status === "Pending";
    }
    return b.Status !== "Pending"; // includes: WaitingForPayment, Confirmed, Completed, Cancelled
  });

  // -----------------------------
  // Status Badge
  // -----------------------------
  const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
      Pending: 'bg-yellow-100 text-yellow-800',
      WaitingPayment: 'bg-blue-100 text-blue-700',
      Confirmed: 'bg-green-100 text-green-700',
      Completed: 'bg-gray-200 text-gray-700',
      Cancelled: 'bg-red-100 text-red-700',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] ?? 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 md:px-10 py-10 max-w-5xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
      <p className="text-gray-500 mb-8">Review booking requests and manage upcoming stays.</p>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('Pending')}
          className={`pb-3 px-2 font-semibold text-sm border-b-2 transition-all ${
            activeTab === 'Pending'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Pending Requests
        </button>

        <button
          onClick={() => setActiveTab('Confirmed')}
          className={`pb-3 px-2 font-semibold text-sm border-b-2 transition-all ${
            activeTab === 'Confirmed'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Approved / Confirmed
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-gray-600">Loading bookings...</p>}

      {/* Empty State */}
      {!loading && filteredBookings.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <h3 className="text-gray-600 font-medium">No bookings found in this category.</h3>
        </div>
      )}

      {/* Booking Cards */}
      <div className="space-y-6">
        {filteredBookings.map((item) => (
          <div
            key={item.Booking_ID}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Booking #{item.Booking_ID}</h3>
                <p className="text-sm text-gray-500">
                  Requested on: {formatDate(item.Created_At)}
                </p>
              </div>
              <StatusBadge status={item.Status} />
            </div>

            {/* Booking Info */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <p><span className="font-medium text-gray-600">Guest:</span> {item.Guest_ID}</p>
              <p><span className="font-medium text-gray-600">Accommodation:</span> {item.Accommodation_ID}</p>

              <p>
                <span className="font-medium text-gray-600">Dates:</span>{" "}
                {formatDate(item.Check_in)} → {formatDate(item.Check_out)}
              </p>

              <p><span className="font-medium text-gray-600">Number of Guests:</span> {item.Num_Guests}</p>

              <p>
                <span className="font-medium text-gray-600">Total Price:</span>{" "}
                {formatPrice(item.Total_Price)}
              </p>
            </div>

            {/* Actions */}
            {item.Status === 'Pending' && (
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => handleApprove(item.Booking_ID)}
                  className="px-5 py-2 w-full md:w-40 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(item)}
                  className="px-5 py-2 w-full md:w-40 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
