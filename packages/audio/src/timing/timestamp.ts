/**
 * Standardizes timestamp creation and conversion.
 */
export class Timestamp {
  /**
   * Returns current high-resolution timestamp in milliseconds.
   */
  static now(): number {
    const hrTime = process.hrtime();
    return hrTime[0] * 1000 + hrTime[1] / 1000000;
  }

  /**
   * Converts samples to milliseconds.
   */
  static samplesToMs(samples: number, sampleRate: number): number {
    return (samples / sampleRate) * 1000;
  }

  /**
   * Converts milliseconds to samples.
   */
  static msToSamples(ms: number, sampleRate: number): number {
    return (ms * sampleRate) / 1000;
  }
}
