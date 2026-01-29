export declare class SupportAdapter {
    raiseSupportTicket(bookingId: string, issue: string): Promise<{
        ticketId: string;
        status: string;
        bookingId: string;
        issue: string;
    }>;
}
export declare const supportAdapter: SupportAdapter;
//# sourceMappingURL=support.adapter.d.ts.map