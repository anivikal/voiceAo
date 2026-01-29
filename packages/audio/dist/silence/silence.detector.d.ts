import { SilenceConfig } from './silence.config.js';
/**
 * Detects silence and speech transitions in audio frames.
 */
export declare class SilenceDetector {
    private config;
    private isSilent;
    private silenceDuration;
    private speechDuration;
    constructor(config?: Partial<SilenceConfig>);
    /**
     * Processes a frame and returns whether the state changed.
     * @returns 'speech_started' | 'silence_started' | null
     */
    process(frame: Int16Array, frameDurationMs: number): 'speech_started' | 'silence_started' | null;
    /**
     * Returns current state.
     */
    getIsSilent(): boolean;
    /**
     * Resets the detector state.
     */
    reset(): void;
}
//# sourceMappingURL=silence.detector.d.ts.map