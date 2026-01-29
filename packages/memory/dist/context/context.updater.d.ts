import { ContextState, MemoryUpdate } from '../memory.types.js';
export declare class ContextUpdater {
    /**
     * Updates context with new signals. Never mutates input state.
     */
    update(prev: ContextState, update: MemoryUpdate): ContextState;
}
export declare const contextUpdater: ContextUpdater;
//# sourceMappingURL=context.updater.d.ts.map