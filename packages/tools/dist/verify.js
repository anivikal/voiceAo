import { defaultExecutor } from './index.js';
async function verify() {
    console.log('--- Verifying Tools Package ---');
    // 1. List tools
    const tools = defaultExecutor.listTools();
    console.log(`Available tools: ${tools.map(t => t.name).join(', ')}`);
    // 2. Test get_booking_status
    console.log('\nTesting get_booking_status...');
    const result = await defaultExecutor.execute('get_booking_status', { bookingId: 'BOOK-123' });
    console.log('Result:', JSON.stringify(result, null, 2));
    // 3. Test validation failure
    console.log('\nTesting validation failure...');
    const failResult = await defaultExecutor.execute('raise_support_ticket', { bookingId: 'BOOK-123', issue: 'short' });
    console.log('Result (should fail):', JSON.stringify(failResult, null, 2));
    // 4. Test tool not found
    console.log('\nTesting tool not found...');
    const nfResult = await defaultExecutor.execute('non_existent_tool', {});
    console.log('Result (should fail):', JSON.stringify(nfResult, null, 2));
}
verify().catch(console.error);
//# sourceMappingURL=verify.js.map