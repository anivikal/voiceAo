import { EntityMatch } from './entity.types.js';
/**
 * Extracts entities like booking IDs, phone numbers, etc.
 */
export declare class EntityExtractor {
    private readonly PATTERNS;
    extract(text: string): EntityMatch[];
}
export declare const entityExtractor: EntityExtractor;
//# sourceMappingURL=entity.extractor.d.ts.map