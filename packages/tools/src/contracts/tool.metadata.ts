import { ToolMetadata } from './tool.types.js';

/**
 * Helper to create tool metadata with defaults
 */
export function createToolMetadata(overrides: Partial<ToolMetadata> & Pick<ToolMetadata, 'name' | 'description'>): ToolMetadata {
  return {
    isReadOnly: true,
    requiresConfirmation: false,
    isSafeForAutomation: true,
    handoffRecommendedOnFailure: false,
    ...overrides,
  };
}
