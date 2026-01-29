import { ContextState, MemoryUpdate } from './memory.types.js';
import { HandoffContext } from '@voice-platform/types';
/**
 * Updates memory with new signals and returns the new state.
 */
export declare function updateMemory(state: ContextState, update: MemoryUpdate): ContextState;
/**
 * Builds a handoff snapshot from current state.
 */
export declare function buildSnapshot(state: ContextState, recentTurns: Array<{
    speaker: string;
    text: string;
    language: string;
}>): HandoffContext;
export * from './memory.types.js';
export * from './context/context.state.js';
export * from './context/context.updater.js';
export * from './summary/summarizer.js';
export * from './snapshot/snapshot.builder.js';
//# sourceMappingURL=index.d.ts.map