import { FrameUtils } from '../frames/frame.utils.js';
import { DEFAULT_SILENCE_CONFIG } from './silence.config.js';
/**
 * Detects silence and speech transitions in audio frames.
 */
export class SilenceDetector {
    config;
    isSilent = true;
    silenceDuration = 0;
    speechDuration = 0;
    constructor(config = {}) {
        this.config = { ...DEFAULT_SILENCE_CONFIG, ...config };
    }
    /**
     * Processes a frame and returns whether the state changed.
     * @returns 'speech_started' | 'silence_started' | null
     */
    process(frame, frameDurationMs) {
        const rms = FrameUtils.calculateRMS(frame);
        const db = FrameUtils.rmsToDb(rms);
        const currentFrameIsSilent = db < this.config.thresholdDb;
        if (currentFrameIsSilent) {
            this.silenceDuration += frameDurationMs;
            this.speechDuration = 0;
            if (!this.isSilent && this.silenceDuration >= this.config.minSilenceDurationMs) {
                this.isSilent = true;
                return 'silence_started';
            }
        }
        else {
            this.speechDuration += frameDurationMs;
            this.silenceDuration = 0;
            if (this.isSilent && this.speechDuration >= this.config.minSpeechDurationMs) {
                this.isSilent = false;
                return 'speech_started';
            }
        }
        return null;
    }
    /**
     * Returns current state.
     */
    getIsSilent() {
        return this.isSilent;
    }
    /**
     * Resets the detector state.
     */
    reset() {
        this.isSilent = true;
        this.silenceDuration = 0;
        this.speechDuration = 0;
    }
}
//# sourceMappingURL=silence.detector.js.map