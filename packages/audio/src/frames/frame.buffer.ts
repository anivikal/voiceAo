import { AudioFrame, CANONICAL_SAMPLES_PER_FRAME, CANONICAL_SAMPLE_RATE, CANONICAL_CHANNELS, CANONICAL_FRAME_DURATION_MS } from './audio.frame.js';

/**
 * Buffers uneven chunks of audio data into fixed-size frames.
 */
export class FrameBuffer {
  private buffer: Int16Array = new Int16Array(0);
  private lastTimestamp: number = 0;

  /**
   * Pushes a chunk of audio data and returns any complete frames.
   */
  push(chunk: Int16Array, timestamp?: number): AudioFrame[] {
    const frames: AudioFrame[] = [];
    
    // Use provided timestamp or calculate from last
    let currentTimestamp = timestamp ?? this.lastTimestamp;

    // Combine buffer and new chunk
    const newBuffer = new Int16Array(this.buffer.length + chunk.length);
    newBuffer.set(this.buffer);
    newBuffer.set(chunk, this.buffer.length);
    this.buffer = newBuffer;

    // Extract complete frames
    while (this.buffer.length >= CANONICAL_SAMPLES_PER_FRAME) {
      const frameData = this.buffer.slice(0, CANONICAL_SAMPLES_PER_FRAME);
      this.buffer = this.buffer.slice(CANONICAL_SAMPLES_PER_FRAME);

      frames.push({
        data: frameData,
        timestamp: currentTimestamp,
        duration: CANONICAL_FRAME_DURATION_MS,
        sampleRate: CANONICAL_SAMPLE_RATE,
        channels: CANONICAL_CHANNELS,
      });

      currentTimestamp += CANONICAL_FRAME_DURATION_MS;
    }

    this.lastTimestamp = currentTimestamp;
    return frames;
  }

  /**
   * Clears the buffer.
   */
  clear(): void {
    this.buffer = new Int16Array(0);
    this.lastTimestamp = 0;
  }
}
