/**
 * Tracks audio processing latency, jitter, and drift.
 */
export interface LatencyStats {
  averageLatencyMs: number;
  jitterMs: number;
  maxLatencyMs: number;
  totalFrames: number;
}

export class LatencyTracker {
  private latencies: number[] = [];
  private lastLatency: number = 0;
  private maxLatency: number = 0;
  private totalFrames: number = 0;

  /**
   * Records a latency measurement.
   */
  record(latencyMs: number): void {
    this.latencies.push(latencyMs);
    this.lastLatency = latencyMs;
    this.totalFrames++;
    
    if (latencyMs > this.maxLatency) {
      this.maxLatency = latencyMs;
    }

    // Keep only last 100 measurements for moving average
    if (this.latencies.length > 100) {
      this.latencies.shift();
    }
  }

  /**
   * Returns current latency statistics.
   */
  getStats(): LatencyStats {
    if (this.latencies.length === 0) {
      return { averageLatencyMs: 0, jitterMs: 0, maxLatencyMs: 0, totalFrames: 0 };
    }

    const sum = this.latencies.reduce((a, b) => a + b, 0);
    const avg = sum / this.latencies.length;

    // Calculate jitter (average deviation from average latency)
    const jitter = this.latencies.reduce((a, b) => a + Math.abs(b - avg), 0) / this.latencies.length;

    return {
      averageLatencyMs: Math.round(avg * 100) / 100,
      jitterMs: Math.round(jitter * 100) / 100,
      maxLatencyMs: Math.round(this.maxLatency * 100) / 100,
      totalFrames: this.totalFrames,
    };
  }

  /**
   * Resets the tracker.
   */
  reset(): void {
    this.latencies = [];
    this.lastLatency = 0;
    this.maxLatency = 0;
    this.totalFrames = 0;
  }
}
