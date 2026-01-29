export class Summarizer {
    /**
     * Generates a rule-based summary of the conversation state.
     */
    summarize(state) {
        const intents = state.intentHistory.join(' -> ');
        const entities = Object.keys(state.entities).join(', ');
        let summary = `Call ${state.callId} is in ${state.language}. `;
        if (intents)
            summary += `Intents: ${intents}. `;
        if (entities)
            summary += `Entities found: ${entities}. `;
        summary += `Sentiment is ${state.sentiment}.`;
        return summary;
    }
}
export const summarizer = new Summarizer();
//# sourceMappingURL=summarizer.js.map