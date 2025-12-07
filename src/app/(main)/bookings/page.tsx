'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

// Decode guestId from JWT stored in cookie
function getGuestIdFromJWT(): string | null {
  if (typeof window === "undefined") return null;

  const token =
    document.cookie
      .split("; ")
      .find((c) => c.startsWith("access_token="))
      ?.split("=")[1] ??
    document.cookie
      .split("; ")
      .find((c) => c.startsWith("accessToken="))
      ?.split("=")[1];

  if (!token) return null;

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

  // --- STATE CHO CANCEL ---
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [cancelReason, setCancelReason] = useState("");

  // --- STATE CHO REVIEW (MỚI) ---
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5); // Mặc định 5 sao
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      const guestId = getGuestIdFromJWT();
      if (!guestId) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/guest/${guestId}/history`
      );
      const data = await res.json();

      const priority: any = {
        WaitingPayment: 1,
        Pending: 2,
        Confirmed: 3,
        Completed: 4,
        Cancelled: 5,
      };

      data.sort((a: any, b: any) => priority[a.Status] - priority[b.Status]);

      const mappedData = data.map((b: any) => ({
        ...b,
        isReviewed: b.HasReview > 0 
      }));

      setBookings(mappedData);
      setLoading(false);
    };

    fetchBookings();
  }, []);

  // --- XỬ LÝ HỦY PHÒNG ---
  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;
    const guestId = getGuestIdFromJWT();
    if (!guestId) return alert("Please log in.");

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
      if (!res.ok) throw new Error(data.message);

      const refund = Number(data.refundAmount || 0);

      // Cập nhật UI
      setBookings((prev) =>
        prev.map((b) =>
          b.Booking_ID === selectedBooking.Booking_ID
            ? { ...b, Status: "Cancelled" }
            : b
        )
      );
      setShowCancelModal(false);
      setCancelReason("");
      alert(`✅ Booking cancelled! Refund: ${refund.toLocaleString("en-US", { style: "currency", currency: "USD" })}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // --- XỬ LÝ REVIEW (MỚI) ---
  const openReviewModal = (booking: any) => {
    setSelectedBooking(booking);
    setReviewRating(5);
    setReviewComment("");
    setShowReviewModal(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedBooking) return;
    const guestId = getGuestIdFromJWT();
    if (!guestId) return; 

    setIsSubmittingReview(true);
    try {
        const payload = {
            accommodationId: selectedBooking.Accommodation_ID,
            comment: reviewComment,
            rating: reviewRating
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
            method: 'POST',
            credentials: 'include', 
            
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || 'Failed to post review');
        }

        alert("✅ Review submitted successfully!");
        
        setBookings(prev => prev.map(b => 
            b.Booking_ID === selectedBooking.Booking_ID 
            ? { ...b, isReviewed: true } 
            : b
        ));

        setShowReviewModal(false);

    } catch (error: any) {
        console.error(error);
        alert(error.message || "Bạn cần đăng nhập lại để thực hiện thao tác này.");
    } finally {
        setIsSubmittingReview(false);
    }
  };

  // Filter tabs
  const filtered = bookings.filter((b) => {
    if (activeTab === "upcoming") {
      return ["Pending", "WaitingPayment", "Confirmed"].includes(b.Status);
    }
    return ["Completed", "Cancelled"].includes(b.Status);
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>;

  return (
    <div className="container mx-auto px-4 md:px-10 py-8 max-w-5xl min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Bookings</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button onClick={() => setActiveTab("upcoming")} className={`pb-3 px-1 mr-6 text-sm font-medium ${activeTab === "upcoming" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-gray-700"}`}>Upcoming</button>
        <button onClick={() => setActiveTab("past")} className={`pb-3 px-1 mr-6 text-sm font-medium ${activeTab === "past" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-gray-700"}`}>Past Trips</button>
      </div>

      {/* Booking List */}
      <div className="space-y-6">
        {filtered.length === 0 ? (
          <div className="text-center p-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No bookings found.</p>
            <Link href="/" className="text-rose-600 font-bold hover:underline mt-2 inline-block">Find a place to stay</Link>
          </div>
        ) : (
          filtered.map((b) => (
            <div key={b.Booking_ID} className="flex flex-col md:flex-row border rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition">
              
              {/* Image */}
              <div className="md:w-64 h-48 bg-gray-200 relative flex items-center justify-center">
                <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded text-white 
                    ${b.Status === "WaitingPayment" ? "bg-blue-600" : 
                      b.Status === "Pending" ? "bg-yellow-500" : 
                      b.Status === "Confirmed" ? "bg-green-600" : 
                      b.Status === "Cancelled" ? "bg-red-600" : "bg-gray-600"}`}>
                  {b.Status}
                </span>
                {/* Nếu API trả về ảnh thì dùng b.Image, không thì placeholder */}
                <img src="/image/ACC_001.jpg" className="w-full h-full object-cover" alt="Room" />
              </div>

              {/* Info */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Booking #{b.Booking_ID}</h3>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div><span className="block font-bold text-xs uppercase text-gray-400">Check-in</span>{new Date(b.Check_in).toLocaleDateString("en-US")}</div>
                    <div><span className="block font-bold text-xs uppercase text-gray-400">Check-out</span>{new Date(b.Check_out).toLocaleDateString("en-US")}</div>
                  </div>
                  <div className="mt-4">
                    <span className="block font-bold text-xs uppercase text-gray-400">Total Price</span>
                    <span className="text-lg font-semibold">{Number(b.Total_Price).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3 items-center">
                  
                  {/* Pay Now */}
                  {b.Status === "WaitingPayment" && (
                    <button onClick={() => (window.location.href = `/payment/${b.Booking_ID}`)} className="px-4 py-2 text-sm font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-700">Pay Now</button>
                  )}

                  {/* Cancel */}
                  {["Pending", "Confirmed"].includes(b.Status) && (
                    <button onClick={() => { setSelectedBooking(b); setShowCancelModal(true); }} className="px-4 py-2 text-sm font-bold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">Cancel Booking</button>
                  )}

                  {/* Completed & Review Logic */}
                  {b.Status === "Completed" && (
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
                            Completed
                        </span>
                        
                        {/* Nút Review */}
                        {b.isReviewed ? (
                            <button disabled className="px-4 py-2 text-sm font-bold text-gray-400 border border-gray-200 bg-gray-50 rounded-lg cursor-not-allowed">
                                Reviewed
                            </button>
                        ) : (
                            <button 
                                onClick={() => openReviewModal(b)}
                                className="px-4 py-2 text-sm font-bold text-gray-800 border border-black rounded-lg hover:bg-gray-100 flex items-center gap-2 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                                Write a Review
                            </button>
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CANCEL MODAL */}
      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl animate-fade-in-up">
            <h3 className="text-xl font-bold mb-4">Cancel this booking?</h3>
            <p className="text-gray-600 mb-4 text-sm">Are you sure you want to cancel booking #{selectedBooking.Booking_ID}?</p>
            <textarea className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-rose-500 outline-none" rows={3} placeholder="Reason for cancellation..." value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} />
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCancelModal(false)} className="flex-1 py-3 font-bold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">Go Back</button>
              <button onClick={handleConfirmCancel} className="flex-1 py-3 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700">Confirm Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* REVIEW MODAL (MỚI) */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl animate-fade-in-up">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Rate your stay</h3>
                    <button onClick={() => setShowReviewModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                
                {/* Rating Stars */}
                <div className="flex justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                            key={star} 
                            onClick={() => setReviewRating(star)}
                            className={`text-4xl transition transform hover:scale-110 ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                            ★
                        </button>
                    ))}
                </div>
                <div className="text-center text-sm font-bold text-gray-600 mb-4">
                    {reviewRating === 5 ? "Excellent!" : reviewRating >= 4 ? "Good" : "Average"}
                </div>

                <textarea 
                    className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none mb-6" 
                    rows={4} 
                    placeholder="Share your experience..." 
                    value={reviewComment} 
                    onChange={(e) => setReviewComment(e.target.value)} 
                />

                <button 
                    onClick={handleSubmitReview} 
                    disabled={isSubmittingReview}
                    className="w-full py-3 font-bold text-white bg-black rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
                >
                    {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
            </div>
        </div>
      )}

    </div>
  );
}