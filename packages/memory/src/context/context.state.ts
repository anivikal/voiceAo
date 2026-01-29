import { ContextState } from '../memory.types.js';
import { LanguageCode } from '@voice-platform/types';

export function createInitialContext(callId: string): ContextState {
  return {
    callId,
    language: 'unknown',
    intentHistory: [],
    entities: {},
    sentiment: 'neutral',
    summary: '',
    lastUpdate: new Date(),
  };
}
