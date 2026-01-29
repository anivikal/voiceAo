export class SupportAdapter {
    async raiseSupportTicket(bookingId, issue) {
        // Mock implementation
        return {
            ticketId: `TIC-${Math.floor(Math.random() * 100000)}`,
            status: 'OPEN',
            bookingId,
            issue,
        };
    }
}
export const supportAdapter = new SupportAdapter();
//# sourceMappingURL=support.adapter.js.map