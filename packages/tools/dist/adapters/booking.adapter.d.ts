export declare class BookingAdapter {
    getBookingStatus(bookingId: string): Promise<{
        bookingId: string;
        status: string;
        driverName: string;
        eta: string;
    }>;
    getCancellationReason(bookingId: string): Promise<{
        bookingId: string;
        reason: string;
        cancelledAt: string;
    }>;
}
export declare const bookingAdapter: BookingAdapter;
//# sourceMappingURL=booking.adapter.d.ts.map