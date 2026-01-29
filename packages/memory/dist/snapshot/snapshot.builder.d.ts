import { ContextState } from '../memory.types.js';
import { HandoffContext } from '@voice-platform/types';
export declare class SnapshotBuilder {
    /**
     * Creates a handoff-safe context snapshot.
     */
    build(state: ContextState, recentTurns: Array<{
        speaker: string;
        text: string;
        language: string;
    }>): HandoffContext;
}
export declare const snapshotBuilder: SnapshotBuilder;
//# sourceMappingURL=snapshot.builder.d.ts.map