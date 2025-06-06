const { InMemoryKeyStore } = require('@chainless-js/keystores');

const { InMemorySigner } = require('../lib');

const { TextEncoder } = require('util');
global.TextEncoder = TextEncoder;

test('test no key', async() => {
    const signer = new InMemorySigner(new InMemoryKeyStore());
    await expect(signer.signMessage('message', 'user', 'network'))
        .rejects.toThrow(/Key for user not found in network/);
});
