// CO2014_Project_FrontEnd\src\app\(main)\payment\[bookingId]\page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PaymentPage() {
  const { bookingId } = useParams();
  const router = useRouter();

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('CreditCard');
  const [isPaying, setIsPaying] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // -----------------------------
  // Load booking detail
  // -----------------------------
  useEffect(() => {
    if (!bookingId) return;

    const fetchBooking = async () => {
      try {
        const res = await fetch(`${baseUrl}/booking/${bookingId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to load booking');

        setBooking(data);
      } catch (err) {
        console.error(err);
        alert('Unable to load booking info.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  // -----------------------------
  // Handle Payment
  // -----------------------------
  const handlePay = async () => {
    if (!bookingId) return;

    setIsPaying(true);

    try {
      const res = await fetch(`${baseUrl}/booking/${bookingId}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          currency: 'USD',
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Payment failed');

      alert('Payment completed successfully!');

      // Redirect to guest booking history
      router.push('/guest/bookings');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">
        Loading payment details...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-red-500">
        Booking not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-10 py-10 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Complete Your Payment</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 mb-6">
        <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

        <div className="space-y-2 text-gray-700">
          <p><strong>Booking ID:</strong> {booking.Booking_ID}</p>
          <p><strong>Accommodation:</strong> {booking.Accommodation_ID}</p>
          <p><strong>Check-in:</strong> {new Date(booking.Check_in).toLocaleDateString()}</p>
          <p><strong>Check-out:</strong> {new Date(booking.Check_out).toLocaleDateString()}</p>
          <p>
            <strong>Total Price:</strong>{' '}
            {Number(booking.Total_Price).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="CreditCard"
              checked={paymentMethod === 'CreditCard'}
              onChange={() => setPaymentMethod('CreditCard')}
            />
            <span className="text-gray-700">Credit / Debit Card</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={() => setPaymentMethod('PayPal')}
            />
            <span className="text-gray-700">PayPal</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="Cash"
              checked={paymentMethod === 'Cash'}
              onChange={() => setPaymentMethod('Cash')}
            />
            <span className="text-gray-700">Cash (Pay at property)</span>
          </label>
        </div>

        <button
          onClick={handlePay}
          disabled={isPaying}
          className="mt-6 w-full bg-rose-600 text-white font-bold py-3 rounded-lg hover:bg-rose-700 disabled:bg-gray-400"
        >
          {isPaying ? 'Processing Payment...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
}
