import { LanguageCode } from '@voice-platform/types';
import { LanguageDetectionResult } from './language.types.js';
/**
 * Prevents language flipping (jitter) by requiring a confidence threshold
 * or multiple consistent detections to switch.
 */
export declare class LanguageLock {
    private state;
    private readonly STABILITY_THRESHOLD;
    /**
     * Updates and locks language for a specific call.
     */
    lockLanguage(callId: string, detection: LanguageDetectionResult): LanguageCode;
    /**
     * Resets lock for a call.
     */
    reset(callId: string): void;
}
export declare const languageLock: LanguageLock;
//# sourceMappingURL=language.lock.d.ts.map