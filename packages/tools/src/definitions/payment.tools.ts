import { ToolDefinition } from '../contracts/tool.types.js';
import { BookingIdSchema } from '../contracts/tool.schema.js';
import { createToolMetadata } from '../contracts/tool.metadata.js';
import { paymentAdapter } from '../adapters/payment.adapter.js';
import { z } from 'zod';

const PaymentInputSchema = z.object({
  bookingId: BookingIdSchema,
});

export const check_payment_status: ToolDefinition = {
  metadata: createToolMetadata({
    name: 'check_payment_status',
    description: 'Check the payment status and details for a specific booking',
  }),
  schema: PaymentInputSchema,
  execute: async (input) => {
    return await paymentAdapter.checkPaymentStatus(input.bookingId);
  },
};

export const get_refund_eta: ToolDefinition = {
  metadata: createToolMetadata({
    name: 'get_refund_eta',
    description: 'Get the estimated time for a refund to be processed',
  }),
  schema: PaymentInputSchema,
  execute: async (input) => {
    return await paymentAdapter.getRefundEta(input.bookingId);
  },
};

export const paymentTools = [check_payment_status, get_refund_eta];
