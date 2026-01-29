import { ContextState, MemoryUpdate } from './memory.types.js';
import { contextUpdater } from './context/context.updater.js';
import { summarizer } from './summary/summarizer.js';
import { snapshotBuilder } from './snapshot/snapshot.builder.js';
import { HandoffContext } from '@voice-platform/types';

/**
 * Updates memory with new signals and returns the new state.
 */
export function updateMemory(state: ContextState, update: MemoryUpdate): ContextState {
  const newState = contextUpdater.update(state, update);
  newState.summary = summarizer.summarize(newState);
  return newState;
}

/**
 * Builds a handoff snapshot from current state.
 */
export function buildSnapshot(
  state: ContextState, 
  recentTurns: Array<{ speaker: string; text: string; language: string }>
): HandoffContext {
  return snapshotBuilder.build(state, recentTurns);
}

export * from './memory.types.js';
export * from './context/context.state.js';
export * from './context/context.updater.js';
export * from './summary/summarizer.js';
export * from './snapshot/snapshot.builder.js';
