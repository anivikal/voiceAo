import { AudioFrame } from './audio.frame.js';
/**
 * Buffers uneven chunks of audio data into fixed-size frames.
 */
export declare class FrameBuffer {
    private buffer;
    private lastTimestamp;
    /**
     * Pushes a chunk of audio data and returns any complete frames.
     */
    push(chunk: Int16Array, timestamp?: number): AudioFrame[];
    /**
     * Clears the buffer.
     */
    clear(): void;
}
//# sourceMappingURL=frame.buffer.d.ts.map