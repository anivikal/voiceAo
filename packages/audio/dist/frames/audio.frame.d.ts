/**
 * Canonical AudioFrame representation.
 * PCM, 16-bit signed, mono, 16kHz.
 */
export interface AudioFrame {
    data: Int16Array;
    timestamp: number;
    duration: number;
    sampleRate: number;
    channels: number;
}
export declare const CANONICAL_SAMPLE_RATE = 16000;
export declare const CANONICAL_CHANNELS = 1;
export declare const CANONICAL_FRAME_DURATION_MS = 20;
export declare const CANONICAL_SAMPLES_PER_FRAME: number;
//# sourceMappingURL=audio.frame.d.ts.map