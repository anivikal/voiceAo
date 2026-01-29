import { ContextState } from '../memory.types.js';
import { HandoffContext } from '@voice-platform/types';

export class SnapshotBuilder {
  /**
   * Creates a handoff-safe context snapshot.
   */
  build(state: ContextState, recentTurns: Array<{ speaker: string; text: string; language: string }>): HandoffContext {
    return {
      callId: state.callId,
      roomName: `call_${state.callId}`, // Convention
      source: 'ai_agent', // Default
      summary: state.summary,
      entities: state.entities,
      recentTurns: recentTurns.slice(-5), // Only last 5 for brevity
      createdAt: new Date().toISOString(),
    };
  }
}

export const snapshotBuilder = new SnapshotBuilder();
