// CO2014_Project_FrontEnd\src\app\api\booking.ts

export async function approveBooking(bookingId: number, hostId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingId}/approve`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hostId }),
    }
  );

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Failed to approve booking');
  }

  return res.json();
}

export async function rejectBooking(bookingId: number, guestId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingId}/cancel`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guestId,
        reason: "Rejected by host"
      }),
    }
  );

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Failed to reject booking');
  }

  return res.json();
}