import { ContextState, MemoryUpdate } from '../memory.types.js';

export class ContextUpdater {
  /**
   * Updates context with new signals. Never mutates input state.
   */
  update(prev: ContextState, update: MemoryUpdate): ContextState {
    const newState = { ...prev, lastUpdate: new Date() };

    if (update.intent) {
      newState.intentHistory = [...prev.intentHistory, update.intent].slice(-10); // Keep last 10
    }

    if (update.entities) {
      newState.entities = { ...prev.entities, ...update.entities };
    }

    if (update.sentiment) {
      newState.sentiment = update.sentiment;
    }

    if (update.language) {
      newState.language = update.language;
    }

    return newState;
  }
}

export const contextUpdater = new ContextUpdater();
