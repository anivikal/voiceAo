import { z } from 'zod';

/**
 * Common schemas used across multiple tools
 */

export const BookingIdSchema = z.string().describe('The unique identifier for the booking');

export const IssueDescriptionSchema = z.string().min(10).describe('A detailed description of the issue or complaint');

export const ToolInputSchema = z.object({
  bookingId: BookingIdSchema,
});

export const SupportTicketSchema = z.object({
  bookingId: BookingIdSchema,
  issue: IssueDescriptionSchema,
});
