export interface SilenceConfig {
  /**
   * Threshold in dB. Anything below this is considered silence.
   */
  thresholdDb: number;
  
  /**
   * Minimum duration of silence to trigger a silence event (in ms).
   */
  minSilenceDurationMs: number;
  
  /**
   * Minimum duration of speech to trigger a speech event (in ms).
   */
  minSpeechDurationMs: number;
}

export const DEFAULT_SILENCE_CONFIG: SilenceConfig = {
  thresholdDb: -45,
  minSilenceDurationMs: 500,
  minSpeechDurationMs: 100,
};
