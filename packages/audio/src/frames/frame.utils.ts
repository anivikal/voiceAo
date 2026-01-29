import { AudioFrame } from './audio.frame.js';

/**
 * Pure helper functions for audio frame operations.
 */
export class FrameUtils {
  /**
   * Calculates the Root Mean Square (RMS) energy of a frame.
   */
  static calculateRMS(frame: Int16Array): number {
    let sum = 0;
    for (let i = 0; i < frame.length; i++) {
      sum += (frame[i] / 32768) ** 2;
    }
    return Math.sqrt(sum / frame.length);
  }

  /**
   * Converts RMS to Decibels (dB).
   */
  static rmsToDb(rms: number): number {
    return 20 * Math.log10(Math.max(rms, 0.00001));
  }

  /**
   * Concatenates multiple audio frames into a single Int16Array.
   */
  static mergeFrames(frames: AudioFrame[]): Int16Array {
    const totalLength = frames.reduce((acc, f) => acc + f.data.length, 0);
    const result = new Int16Array(totalLength);
    let offset = 0;
    for (const frame of frames) {
      result.set(frame.data, offset);
      offset += frame.data.length;
    }
    return result;
  }
}
