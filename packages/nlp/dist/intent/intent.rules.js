import { Intent } from './intent.types.js';
export const INTENT_RULES = [
    {
        intent: Intent.HANDOFF_REQUEST,
        keywords: ['manager', 'supervisor', 'human', 'person', 'senior', 'baat karao'],
        regex: /(speak|talk|connect).*(human|person|manager)/i,
    },
    {
        intent: Intent.CANCEL_BOOKING,
        keywords: ['cancel', 'radd', 'hatao', 'band karo'],
        regex: /(cancel|stop).*(booking|order|ride)/i,
    },
    {
        intent: Intent.CHECK_STATUS,
        keywords: ['status', 'kahan', 'where', 'update', 'kab tak'],
        regex: /(where|status|update).*(booking|order|ride|driver)/i,
    },
    {
        intent: Intent.GREETING,
        keywords: ['hello', 'hi', 'namaste', 'hey', 'good morning'],
    }
];
//# sourceMappingURL=intent.rules.js.map