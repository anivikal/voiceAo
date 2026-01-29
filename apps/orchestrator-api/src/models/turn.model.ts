import { z } from 'zod';

/**
 * Allowed speaker types for transcript turns
 */
export type Speaker = 'driver' | 'ai_agent' | 'human_agent';

/**
 * Supported languages
 */
export type Language = 'en' | 'hi' | 'hinglish' | 'unknown';

/**
 * Turn entity interface - represents a single utterance in a conversation
 */
export interface Turn {
  id: string;
  callId: string;
  speaker: Speaker;
  text: string;
  confidence: number;
  language: Language;
  createdAt: Date;
}

/**
 * Request validation schema for creating a turn
 */
export const CreateTurnRequestSchema = z.object({
  speaker: z.enum(['driver', 'ai_agent', 'human_agent'], {
    errorMap: () => ({ message: 'Speaker must be one of: driver, ai_agent, human_agent' }),
  }),
  text: z.string().min(1, 'Text is required'),
  confidence: z.number().min(0).max(1, 'Confidence must be between 0 and 1'),
  language: z.enum(['en', 'hi', 'hinglish', 'unknown']).default('unknown'),
});

export type CreateTurnRequest = z.infer<typeof CreateTurnRequestSchema>;

/**
 * Response for created turn
 */
export interface CreateTurnResponse {
  turn_id: string;
  call_id: string;
  created_at: string;
}

/**
 * Error thrown when turn validation fails
 */
export class TurnValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TurnValidationError';
  }
}
