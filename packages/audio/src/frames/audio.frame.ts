/**
 * Canonical AudioFrame representation.
 * PCM, 16-bit signed, mono, 16kHz.
 */
export interface AudioFrame {
  data: Int16Array;
  timestamp: number; // In milliseconds
  duration: number; // In milliseconds
  sampleRate: number;
  channels: number;
}

export const CANONICAL_SAMPLE_RATE = 16000;
export const CANONICAL_CHANNELS = 1;
export const CANONICAL_FRAME_DURATION_MS = 20;
export const CANONICAL_SAMPLES_PER_FRAME = (CANONICAL_SAMPLE_RATE * CANONICAL_FRAME_DURATION_MS) / 1000;
