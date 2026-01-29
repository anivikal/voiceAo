// Contracts & Types
export * from './contracts/tool.types.js';
export * from './contracts/tool.schema.js';
export * from './contracts/tool.metadata.js';

// Tool Definitions
export * from './definitions/booking.tools.js';
export * from './definitions/payment.tools.js';
export * from './definitions/support.tools.js';

// Executor
export * from './executor/tool.executor.js';

// Pre-configured instance with all tools
import { bookingTools } from './definitions/booking.tools.js';
import { paymentTools } from './definitions/payment.tools.js';
import { supportTools } from './definitions/support.tools.js';
import { ToolExecutor } from './executor/tool.executor.js';

export const allTools = [
  ...bookingTools,
  ...paymentTools,
  ...supportTools,
];

export const defaultExecutor = new ToolExecutor(allTools);
