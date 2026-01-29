import { z } from 'zod';
/**
 * Common schemas used across multiple tools
 */
export declare const BookingIdSchema: z.ZodString;
export declare const IssueDescriptionSchema: z.ZodString;
export declare const ToolInputSchema: z.ZodObject<{
    bookingId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    bookingId: string;
}, {
    bookingId: string;
}>;
export declare const SupportTicketSchema: z.ZodObject<{
    bookingId: z.ZodString;
    issue: z.ZodString;
}, "strip", z.ZodTypeAny, {
    bookingId: string;
    issue: string;
}, {
    bookingId: string;
    issue: string;
}>;
//# sourceMappingURL=tool.schema.d.ts.map