import { z } from 'zod';

/**
 * Call lifecycle states
 * CREATED → ACTIVE → HANDED_OFF → ENDED
 */
export enum CallStatus {
  CREATED = 'CREATED',
  ACTIVE = 'ACTIVE',
  HANDED_OFF = 'HANDED_OFF',
  ENDED = 'ENDED',
}

/**
 * Valid status transitions
 */
export const VALID_TRANSITIONS: Record<CallStatus, CallStatus[]> = {
  [CallStatus.CREATED]: [CallStatus.ACTIVE, CallStatus.ENDED],
  [CallStatus.ACTIVE]: [CallStatus.HANDED_OFF, CallStatus.ENDED],
  [CallStatus.HANDED_OFF]: [CallStatus.ENDED],
  [CallStatus.ENDED]: [], // Terminal state - no transitions allowed
};

/**
 * Call entity interface
 */
export interface Call {
  id: string;
  roomName: string;
  source: string;
  status: CallStatus;
  summary: string | null;
  entities: Record<string, unknown> | null;
  createdAt: Date;
  startedAt: Date | null;
  handedOffAt: Date | null;
  endedAt: Date | null;
  updatedAt: Date;
}

/**
 * Request validation schemas
 */
export const CreateCallRequestSchema = z.object({
  source: z.string().min(1, 'Source is required'),
});

export type CreateCallRequest = z.infer<typeof CreateCallRequestSchema>;

export interface CreateCallResponse {
  call_id: string;
  room_name: string;
}

/**
 * Validates if a status transition is allowed
 */
export function isValidTransition(from: CallStatus, to: CallStatus): boolean {
  return VALID_TRANSITIONS[from].includes(to);
}

/**
 * Error thrown when an invalid status transition is attempted
 */
export class InvalidTransitionError extends Error {
  constructor(from: CallStatus, to: CallStatus) {
    super(`Invalid transition from ${from} to ${to}`);
    this.name = 'InvalidTransitionError';
  }
}

/**
 * Error thrown when a call is not found
 */
export class CallNotFoundError extends Error {
  constructor(callId: string) {
    super(`Call not found: ${callId}`);
    this.name = 'CallNotFoundError';
  }
}
