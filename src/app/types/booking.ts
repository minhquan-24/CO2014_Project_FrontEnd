// CO2014_Project_FrontEnd\src\app\types\booking.ts

export interface BookingResponse {
  Booking_ID: number;
  Accommodation_ID: string;
  Guest_ID: string;
  Check_in: string;
  Check_out: string;
  Status: "Pending" | "WaitingPayment" | "Confirmed" | "Completed" | "Cancelled";
  Num_Guests: number;
  Total_Price: number;
  Created_At: string;
}