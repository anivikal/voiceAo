/**
 * Standardizes timestamp creation and conversion.
 */
export declare class Timestamp {
    /**
     * Returns current high-resolution timestamp in milliseconds.
     */
    static now(): number;
    /**
     * Converts samples to milliseconds.
     */
    static samplesToMs(samples: number, sampleRate: number): number;
    /**
     * Converts milliseconds to samples.
     */
    static msToSamples(ms: number, sampleRate: number): number;
}
//# sourceMappingURL=timestamp.d.ts.map