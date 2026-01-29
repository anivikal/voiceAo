import { AudioFrame } from './audio.frame.js';
/**
 * Pure helper functions for audio frame operations.
 */
export declare class FrameUtils {
    /**
     * Calculates the Root Mean Square (RMS) energy of a frame.
     */
    static calculateRMS(frame: Int16Array): number;
    /**
     * Converts RMS to Decibels (dB).
     */
    static rmsToDb(rms: number): number;
    /**
     * Concatenates multiple audio frames into a single Int16Array.
     */
    static mergeFrames(frames: AudioFrame[]): Int16Array;
}
//# sourceMappingURL=frame.utils.d.ts.map