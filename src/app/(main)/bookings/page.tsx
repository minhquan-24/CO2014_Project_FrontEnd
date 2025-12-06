'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

// Decode guestId from JWT stored in cookie
function getGuestIdFromJWT(): string | null {
  if (typeof window === "undefined") return null;

  // Read both possible cookie names
  const token =
    document.cookie
      .split("; ")
      .find((c) => c.startsWith("access_token="))
      ?.split("=")[1] ??
    document.cookie
      .split("; ")
      .find((c) => c.startsWith("accessToken="))
      ?.split("=")[1];

  if (!token) {
    console.warn("No JWT cookie found");
    return null;
  }

  try {
    const payload = JSON.parse(window.atob(token.split(".")[1]));
    return payload.sub ?? null;
  } catch (err) {
    console.error("JWT decode failed:", err);
    return null;
  }
}


export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      const guestId = getGuestIdFromJWT();
      if (!guestId) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/guest/${guestId}/history`
      );
      const data = await res.json();

      // Sort bookings: WaitingPayment → Pending → Confirmed → Completed → Cancelled
      const priority: any = {
        WaitingPayment: 1,
        Pending: 2,
        Confirmed: 3,
        Completed: 4,
        Cancelled: 5,
      };

      data.sort((a: any, b: any) => priority[a.Status] - priority[b.Status]);

      setBookings(data);
      setLoading(false);
    };

    fetchBookings();
  }, []);

  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;

    const guestId = getGuestIdFromJWT();
    if (!guestId) {
      alert("You must be logged in to cancel a booking.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/${selectedBooking.Booking_ID}/cancel`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            guestId,
            reason: cancelReason || "No reason provided",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Cancellation failed");
      }

    // Refund amount returned by stored procedure
      const refund = Number(data.refundAmount || 0);

    // Update UI
      setBookings((prev) =>
        prev.map((b) =>
          b.Booking_ID === selectedBooking.Booking_ID
            ? { ...b, Status: "Cancelled" }
            : b
        )
      );

      setShowCancelModal(false);
      setCancelReason("");

      alert(
        `✅ Booking cancelled!\nRefund issued: ${refund.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}`
      );
    } catch (err: any) {
      alert(err.message || "Cancellation error");
    }
  };

  // Filter for Upcoming / Past tabs
  const filtered = bookings.filter((b) => {
    if (activeTab === "upcoming") {
      return ["Pending", "WaitingPayment", "Confirmed"].includes(b.Status);
    }
    return ["Completed", "Cancelled"].includes(b.Status);
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading your bookings...
      </div>
    );

  return (
    <div className="container mx-auto px-4 md:px-10 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Your Bookings
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`pb-3 px-1 mr-6 text-sm font-medium ${
            activeTab === "upcoming"
              ? "border-b-2 border-black text-black"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Upcoming
        </button>

        <button
          onClick={() => setActiveTab("past")}
          className={`pb-3 px-1 mr-6 text-sm font-medium ${
            activeTab === "past"
              ? "border-b-2 border-black text-black"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Past Trips
        </button>
      </div>

      {/* List of bookings */}
      <div className="space-y-6">
        {filtered.length === 0 ? (
          <div className="text-center p-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No bookings found.</p>
            <Link
              href="/search"
              className="text-rose-600 font-bold hover:underline mt-2 inline-block"
            >
              Find a place to stay
            </Link>
          </div>
        ) : (
          filtered.map((b) => (
            <div
              key={b.Booking_ID}
              className="flex flex-col md:flex-row border rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition"
            >
              {/* Placeholder image for now */}
              <div className="md:w-64 h-48 bg-gray-200 relative flex items-center justify-center">
                <span
                  className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded text-white ${
                    b.Status === "WaitingPayment"
                      ? "bg-blue-600"
                      : b.Status === "Pending"
                      ? "bg-yellow-500"
                      : b.Status === "Confirmed"
                      ? "bg-green-600"
                      : b.Status === "Cancelled"
                      ? "bg-red-600"
                      : "bg-gray-600"
                  }`}
                >
                  {b.Status}
                </span>
                <span className="text-gray-500 text-sm">No image</span>
              </div>

              {/* Booking Info */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Booking #{b.Booking_ID}
                  </h3>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="block font-bold text-xs uppercase text-gray-400">
                        Check-in
                      </span>
                      {new Date(b.Check_in).toLocaleDateString("en-US")}
                    </div>
                    <div>
                      <span className="block font-bold text-xs uppercase text-gray-400">
                        Check-out
                      </span>
                      {new Date(b.Check_out).toLocaleDateString("en-US")}
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="block font-bold text-xs uppercase text-gray-400">
                      Total Price
                    </span>
                    <span className="text-lg font-semibold">
                      {Number(b.Total_Price).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-6 flex justify-end gap-3">

                  {/* Pay Now */}
                  {b.Status === "WaitingPayment" && (
                    <button
                      onClick={() =>
                        (window.location.href = `/payment/${b.Booking_ID}`)
                      }
                      className="px-4 py-2 text-sm font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-700"
                    >
                      Pay Now
                    </button>
                  )}

                  {/* Cancel */}
                  {["Pending", "Confirmed"].includes(b.Status) && (
                    <button
                      onClick={() => {
                        setSelectedBooking(b);
                        setShowCancelModal(true);
                      }}
                      className="px-4 py-2 text-sm font-bold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                      Cancel Booking
                    </button>
                  )}

                  {/* Completed */}
                  {b.Status === "Completed" && (
                    <span className="text-sm font-medium text-green-600">
                      ✓ Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cancel Modal */}
      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Cancel this booking?</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Are you sure you want to cancel booking #{selectedBooking.Booking_ID}?
            </p>

            <textarea
              className="w-full border rounded-lg p-3 text-sm"
              rows={3}
              placeholder="Reason for cancellation..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 font-bold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-3 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
