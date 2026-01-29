export class PaymentAdapter {
    async checkPaymentStatus(bookingId) {
        // Mock implementation
        return {
            bookingId,
            status: 'PAID',
            amount: 450,
            method: 'UPI',
            timestamp: new Date().toISOString(),
        };
    }
    async getRefundEta(bookingId) {
        // Mock implementation
        return {
            bookingId,
            status: 'REFUND_INITIATED',
            eta: '3-5 business days',
        };
    }
}
export const paymentAdapter = new PaymentAdapter();
//# sourceMappingURL=payment.adapter.js.map