export function createInitialContext(callId) {
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
//# sourceMappingURL=context.state.js.map