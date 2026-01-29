/**
 * Call lifecycle states
 */
export enum CallStatus {
  CREATED = 'CREATED',
  ACTIVE = 'ACTIVE',
  HANDED_OFF = 'HANDED_OFF',
  ENDED = 'ENDED',
}

/**
 * Speaker types
 */
export type Speaker = 'driver' | 'ai_agent' | 'human_agent';

/**
 * Supported languages
 */
export type LanguageCode = 'en' | 'hi' | 'hinglish' | 'unknown';

/**
 * Transcript turn
 */
export interface Turn {
  id: string;
  callId: string;
  speaker: Speaker;
  text: string;
  confidence: number;
  language: LanguageCode;
  createdAt: Date;
}

/**
 * Semantic event types
 */
export enum EventType {
  TOOL_CALL = 'TOOL_CALL',
  TOOL_RESULT = 'TOOL_RESULT',
  LANGUAGE_SWITCH = 'LANGUAGE_SWITCH',
  INTENT_DETECTED = 'INTENT_DETECTED',
  FRUSTRATION_DETECTED = 'FRUSTRATION_DETECTED',
  HANDOFF_TRIGGERED = 'HANDOFF_TRIGGERED',
  AGENT_JOINED = 'AGENT_JOINED',
  AGENT_LEFT = 'AGENT_LEFT',
  CONTEXT_UPDATED = 'CONTEXT_UPDATED',
  ERROR = 'ERROR',
}

/**
 * Semantic event
 */
export interface Event {
  id: string;
  callId: string;
  type: EventType;
  payload: Record<string, unknown>;
  createdAt: Date;
}

/**
 * Call entity
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
 * NLP Result
 */
export interface NLPResult {
  language: LanguageCode;
  languageConfidence: number;
  isHinglish: boolean;
  intent: string | null;
  intentConfidence: number;
  entities: Record<string, unknown>;
}

/**
 * LLM Message
 */
export interface LLMMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  name?: string;
  tool_call_id?: string;
}

/**
 * Tool definition
 */
export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, unknown>; // JSON Schema
}

/**
 * Handoff Context
 */
export interface HandoffContext {
  callId: string;
  roomName: string;
  source: string;
  summary: string;
  entities: Record<string, unknown>;
  recentTurns: Array<{
    speaker: string;
    text: string;
    language: string;
  }>;
  createdAt: string;
}
