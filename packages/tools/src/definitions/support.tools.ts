import { ToolDefinition } from '../contracts/tool.types.js';
import { SupportTicketSchema } from '../contracts/tool.schema.js';
import { createToolMetadata } from '../contracts/tool.metadata.js';
import { supportAdapter } from '../adapters/support.adapter.js';
import { z } from 'zod';

export const raise_support_ticket: ToolDefinition = {
  metadata: createToolMetadata({
    name: 'raise_support_ticket',
    description: 'Raise a support ticket for a specific booking issue',
    isReadOnly: false,
    handoffRecommendedOnFailure: true,
  }),
  schema: SupportTicketSchema,
  execute: async (input) => {
    return await supportAdapter.raiseSupportTicket(input.bookingId, input.issue);
  },
};

export const handoff_to_human: ToolDefinition = {
  metadata: createToolMetadata({
    name: 'handoff_to_human',
    description: 'Immediately hand off the call to a human agent',
    isReadOnly: false,
    isSafeForAutomation: false,
    requiresConfirmation: true,
  }),
  schema: z.object({
    reason: z.string().describe('The reason for handing off to a human'),
  }),
  execute: async (input) => {
    // This is usually handled by the orchestrator, but we define the tool here
    return {
      status: 'HANDOFF_INITIATED',
      reason: input.reason,
      timestamp: new Date().toISOString(),
    };
  },
};

export const supportTools = [raise_support_ticket, handoff_to_human];
