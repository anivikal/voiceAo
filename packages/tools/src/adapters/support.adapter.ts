export class SupportAdapter {
  async raiseSupportTicket(bookingId: string, issue: string) {
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
