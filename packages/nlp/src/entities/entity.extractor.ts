import { EntityMatch } from './entity.types.js';

/**
 * Extracts entities like booking IDs, phone numbers, etc.
 */
export class EntityExtractor {
  private readonly PATTERNS = {
    booking_id: /\b[A-Z]{2,3}\d{6,8}\b/g,
    phone_number: /\b\d{10}\b/g,
    pincode: /\b\d{6}\b/g,
  };

  extract(text: string): EntityMatch[] {
    const matches: EntityMatch[] = [];

    for (const [type, pattern] of Object.entries(this.PATTERNS)) {
      let match;
      // Reset regex state
      pattern.lastIndex = 0;
      
      while ((match = pattern.exec(text)) !== null) {
        matches.push({
          type,
          value: match[0],
          confidence: 0.95,
          startIndex: match.index,
          endIndex: match.index + match[0].length,
        });
      }
    }

    return matches;
  }
}

export const entityExtractor = new EntityExtractor();
