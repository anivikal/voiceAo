/**
 * Handles sample-rate and channel conversion.
 */
export declare class Resampler {
    /**
     * Simple linear resampler to convert between sample rates.
     */
    static resample(data: Int16Array, fromSampleRate: number, toSampleRate: number): Int16Array;
    /**
     * Converts stereo (or multi-channel) to mono by averaging channels.
     */
    static toMono(data: Int16Array, channels: number): Int16Array;
}
//# sourceMappingURL=resampler.d.ts.map