import { Intent } from './intent.types.js';

export interface IntentRule {
  intent: Intent;
  keywords: string[];
  regex?: RegExp;
}

export const INTENT_RULES: IntentRule[] = [
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
