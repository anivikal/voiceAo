import { LanguageCode } from '@voice-platform/types';

export interface ContextState {
  callId: string;
  language: LanguageCode;
  intentHistory: string[];
  entities: Record<string, unknown>;
  sentiment: 'positive' | 'neutral' | 'negative';
  summary: string;
  lastUpdate: Date;
}

export interface MemoryUpdate {
  intent?: string;
  entities?: Record<string, unknown>;
  sentiment?: 'positive' | 'neutral' | 'negative';
  language?: LanguageCode;
}
