/**
 * Tracks audio processing latency, jitter, and drift.
 */
export interface LatencyStats {
    averageLatencyMs: number;
    jitterMs: number;
    maxLatencyMs: number;
    totalFrames: number;
}
export declare class LatencyTracker {
    private latencies;
    private lastLatency;
    private maxLatency;
    private totalFrames;
    /**
     * Records a latency measurement.
     */
    record(latencyMs: number): void;
    /**
     * Returns current latency statistics.
     */
    getStats(): LatencyStats;
    /**
     * Resets the tracker.
     */
    reset(): void;
}
//# sourceMappingURL=latency.tracker.d.ts.map