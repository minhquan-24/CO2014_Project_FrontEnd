// CO2014_Project_FrontEnd\src\app\(main)\host\bookings\page.tsx

'use client';

import { useEffect, useState } from "react";
import { BookingResponse } from "@/app/types/booking";
import { approveBooking, rejectBooking } from "@/app/api/booking";

// Decode hostId from JWT
function getHostIdFromJWT(): string | null {
  if (typeof document === "undefined") return null;

  const token =
    document.cookie.split("; ").find((c) => c.startsWith("access_token="))?.split("=")[1] ??
    document.cookie.split("; ").find((c) => c.startsWith("accessToken="))?.split("=")[1];

  if (!token) return null;

  try {
    return JSON.parse(atob(token.split(".")[1])).sub;
  } catch {
    return null;
  }
}

export default function HostBookingsPage() {
  const [hostId, setHostId] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [activeTab, setActiveTab] = useState<"Pending" | "Confirmed">("Pending");
  const [loading, setLoading] = useState(true);

  // UI Helpers
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const formatPrice = (val: number | string) =>
    Number(val).toLocaleString("en-US", { style: "currency", currency: "USD" });

  // Status Badge (Correct, clean UI)
  const StatusBadge = ({ status }: { status: string }) => {
    const map: Record<string, string> = {
      Pending: "bg-yellow-100 text-yellow-800",
      WaitingPayment: "bg-blue-100 text-blue-700",
      Confirmed: "bg-green-100 text-green-700",
      Completed: "bg-gray-200 text-gray-700",
      Cancelled: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`inline-flex items-center justify-center align-middle
        px-3 py-1 rounded-full text-xs font-semibold leading-none
        ${map[status] ?? 'bg-gray-100 text-gray-700'}`}
      >
        {status}
      </span>
    );
  };

  useEffect(() => {
    const id = getHostIdFromJWT();
    if (!id) return;

    setHostId(id);
    loadBookings(id);
  }, []);

  const loadBookings = async (id: string) => {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/host/${id}/all`);
      if (!res.ok) throw new Error("Failed to fetch bookings");

      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId: number) => {
    if (!hostId) return;
    if (!confirm("Approve this booking?")) return;

    try {
      await approveBooking(bookingId, hostId);
      alert("Booking approved.");
      loadBookings(hostId);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleReject = async (b: BookingResponse) => {
    if (!confirm("Reject this booking?")) return;

    try {
      await rejectBooking(b.Booking_ID, b.Guest_ID);
      alert("Booking rejected.");
      if (hostId) loadBookings(hostId);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filtered = bookings.filter((b) =>
    activeTab === "Pending" ? b.Status === "Pending" : b.Status !== "Pending"
  );

  if (!hostId)
    return <div className="text-center py-20 text-gray-500">Host not logged in.</div>;

  return (
    <div className="container mx-auto px-4 md:px-10 py-10 max-w-5xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
      <p className="text-gray-500 mb-8">Review booking requests and manage upcoming stays.</p>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("Pending")}
          className={`pb-3 px-2 font-semibold text-sm border-b-2 ${
            activeTab === "Pending"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Pending Requests
        </button>

        <button
          onClick={() => setActiveTab("Confirmed")}
          className={`pb-3 px-2 font-semibold text-sm border-b-2 ${
            activeTab === "Confirmed"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Approved / Confirmed
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-gray-600">Loading bookings...</p>}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="py-16 text-center bg-gray-50 border rounded-xl border-dashed">
          <p className="text-gray-600">No bookings found.</p>
        </div>
      )}

      {/* Booking Cards */}
      <div className="space-y-6">
        {filtered.map((item) => (
          <div
            key={item.Booking_ID}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">Booking #{item.Booking_ID}</h3>
                <p className="text-sm text-gray-500">Requested: {formatDate(item.Created_At)}</p>
              </div>
              <StatusBadge status={item.Status} />
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm">
              <p><span className="font-medium text-gray-600">Guest:</span> {item.Guest_ID}</p>
              <p><span className="font-medium text-gray-600">Accommodation:</span> {item.Accommodation_ID}</p>
              <p><span className="font-medium text-gray-600">Dates:</span> {formatDate(item.Check_in)} → {formatDate(item.Check_out)}</p>
              <p><span className="font-medium text-gray-600">Guests:</span> {item.Num_Guests}</p>
              <p><span className="font-medium text-gray-600">Total:</span> {formatPrice(item.Total_Price)}</p>
            </div>

            {item.Status === "Pending" && (
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => handleApprove(item.Booking_ID)}
                  className="px-5 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(item)}
                  className="px-5 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
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