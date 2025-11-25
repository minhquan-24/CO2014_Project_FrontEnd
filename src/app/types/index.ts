// 1. Khuôn mẫu cho User (Guest/Host/Admin)
export interface User {
    userID: string;
    name: string;
    email: string;
    role: 'Guest' | 'Host' | 'Admin';
    avatarUrl?: string;
}

// 2. Khuôn mẫu cho Căn nhà (Accommodation)
export interface Accommodation {
    id: string;
    title: string;
    description: string;
    pricePerNight: number;
    locationCity: string; // Lấy từ bảng Location
    maxGuests: number;
    averageRating: number;
    totalReviews: number;
    imageUrl: string;    
    hostID: string;
}

// 3. Khuôn mẫu cho Booking (Đơn đặt)
export interface Booking {
    bookingID: string;
    accommodationTitle: string; 
    checkIn: string; 
    checkOut: string;
    totalPrice: number;
    status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
}

// 4. Khuôn mẫu cho Review
export interface Review {
    reviewID: string;
    guestName: string;
    rating: number;
    comment: string;
    date: string;
}