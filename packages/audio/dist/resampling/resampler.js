/**
 * Handles sample-rate and channel conversion.
 */
export class Resampler {
    /**
     * Simple linear resampler to convert between sample rates.
     */
    static resample(data, fromSampleRate, toSampleRate) {
        if (fromSampleRate === toSampleRate) {
            return data;
        }
        const ratio = fromSampleRate / toSampleRate;
        const newLength = Math.round(data.length / ratio);
        const result = new Int16Array(newLength);
        for (let i = 0; i < newLength; i++) {
            const pos = i * ratio;
            const index = Math.floor(pos);
            const fraction = pos - index;
            if (index + 1 < data.length) {
                // Linear interpolation
                result[i] = Math.round(data[index] * (1 - fraction) + data[index + 1] * fraction);
            }
            else {
                result[i] = data[index];
            }
        }
        return result;
    }
    /**
     * Converts stereo (or multi-channel) to mono by averaging channels.
     */
    static toMono(data, channels) {
        if (channels === 1) {
            return data;
        }
        const newLength = data.length / channels;
        const result = new Int16Array(newLength);
        for (let i = 0; i < newLength; i++) {
            let sum = 0;
            for (let c = 0; c < channels; c++) {
                sum += data[i * channels + c];
            }
            result[i] = Math.round(sum / channels);
        }
        return result;
    }
}
//# sourceMappingURL=resampler.js.map