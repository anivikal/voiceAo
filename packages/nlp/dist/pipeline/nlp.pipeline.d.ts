import { NLPResult } from '@voice-platform/types';
/**
 * Coordinates NLP stages into a single pipeline.
 */
export declare class NLPPipeline {
    process(callId: string, text: string): Promise<NLPResult>;
}
export declare const nlpPipeline: NLPPipeline;
//# sourceMappingURL=nlp.pipeline.d.ts.map