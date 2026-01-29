import { BookingIdSchema } from '../contracts/tool.schema.js';
import { createToolMetadata } from '../contracts/tool.metadata.js';
import { bookingAdapter } from '../adapters/booking.adapter.js';
import { z } from 'zod';
const BookingInputSchema = z.object({
    bookingId: BookingIdSchema,
});
export const get_booking_status = {
    metadata: createToolMetadata({
        name: 'get_booking_status',
        description: 'Get the current status of a booking including driver details and ETA',
    }),
    schema: BookingInputSchema,
    execute: async (input) => {
        return await bookingAdapter.getBookingStatus(input.bookingId);
    },
};
export const get_cancellation_reason = {
    metadata: createToolMetadata({
        name: 'get_cancellation_reason',
        description: 'Get the reason why a booking was cancelled',
    }),
    schema: BookingInputSchema,
    execute: async (input) => {
        return await bookingAdapter.getCancellationReason(input.bookingId);
    },
};
export const bookingTools = [get_booking_status, get_cancellation_reason];
//# sourceMappingURL=booking.tools.js.map