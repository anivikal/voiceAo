/**
 * Prevents language flipping (jitter) by requiring a confidence threshold
 * or multiple consistent detections to switch.
 */
export class LanguageLock {
    state = new Map();
    STABILITY_THRESHOLD = 0.8;
    /**
     * Updates and locks language for a specific call.
     */
    lockLanguage(callId, detection) {
        const currentState = this.state.get(callId);
        if (!currentState) {
            const newState = {
                currentLanguage: detection.language,
                confidence: detection.confidence,
                isLocked: detection.confidence > this.STABILITY_THRESHOLD,
                lastUpdate: new Date(),
            };
            this.state.set(callId, newState);
            return newState.currentLanguage;
        }
        // If already locked and new detection is low confidence, stick to current
        if (currentState.isLocked && detection.confidence < this.STABILITY_THRESHOLD) {
            return currentState.currentLanguage;
        }
        // Update state
        currentState.currentLanguage = detection.language;
        currentState.confidence = detection.confidence;
        currentState.isLocked = detection.confidence > this.STABILITY_THRESHOLD;
        currentState.lastUpdate = new Date();
        return currentState.currentLanguage;
    }
    /**
     * Resets lock for a call.
     */
    reset(callId) {
        this.state.delete(callId);
    }
}
export const languageLock = new LanguageLock();
//# sourceMappingURL=language.lock.js.map