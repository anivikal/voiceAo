export declare class PaymentAdapter {
    checkPaymentStatus(bookingId: string): Promise<{
        bookingId: string;
        status: string;
        amount: number;
        method: string;
        timestamp: string;
    }>;
    getRefundEta(bookingId: string): Promise<{
        bookingId: string;
        status: string;
        eta: string;
    }>;
}
export declare const paymentAdapter: PaymentAdapter;
//# sourceMappingURL=payment.adapter.d.ts.map