/**
 * Helper to create tool metadata with defaults
 */
export function createToolMetadata(overrides) {
    return {
        isReadOnly: true,
        requiresConfirmation: false,
        isSafeForAutomation: true,
        handoffRecommendedOnFailure: false,
        ...overrides,
    };
}
//# sourceMappingURL=tool.metadata.js.map