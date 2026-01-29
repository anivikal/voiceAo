export class SnapshotBuilder {
    /**
     * Creates a handoff-safe context snapshot.
     */
    build(state, recentTurns) {
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
//# sourceMappingURL=snapshot.builder.js.map