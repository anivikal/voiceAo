export class BookingAdapter {
    async getBookingStatus(bookingId) {
        // Mock implementation
        return {
            bookingId,
            status: 'CONFIRMED',
            driverName: 'Rajesh Kumar',
            eta: '10 mins',
        };
    }
    async getCancellationReason(bookingId) {
        // Mock implementation
        return {
            bookingId,
            reason: 'Driver could not reach location due to road closure',
            cancelledAt: new Date().toISOString(),
        };
    }
}
export const bookingAdapter = new BookingAdapter();
//# sourceMappingURL=booking.adapter.js.map