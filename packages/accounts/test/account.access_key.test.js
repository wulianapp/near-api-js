const { KeyPair } = require('@chainless-js/crypto');

const testUtils = require('./test-utils');

let nearjs;
let workingAccount;
let contractId;
let contract;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

beforeAll(async () => {
    nearjs = await testUtils.setUpTestConnection();
});

beforeEach(async () => {
    contractId = testUtils.generateUniqueString('test');
    workingAccount = await testUtils.createAccount(nearjs);
    contract = await testUtils.deployContract(nearjs.accountCreator.masterAccount, contractId);
});

test('make function call using access key', async() => {
    const keyPair = KeyPair.fromRandom('ed25519');
    await workingAccount.addKey(keyPair.getPublicKey(), contractId, '', '2000000000000000000000000');

    // Override in the key store the workingAccount key to the given access key.
    await nearjs.connection.signer.keyStore.setKey(testUtils.networkId, workingAccount.accountId, keyPair);
    const setCallValue = testUtils.generateUniqueString('setCallPrefix');
    await contract.setValue({ args: { value: setCallValue } });
    expect(await contract.getValue()).toEqual(setCallValue);
});

test('remove access key no longer works', async() => {
    const keyPair = KeyPair.fromRandom('ed25519');
    let publicKey = keyPair.getPublicKey();
    await nearjs.accountCreator.masterAccount.addKey(publicKey, contractId, '', 400000);
    await nearjs.accountCreator.masterAccount.deleteKey(publicKey);
    // Override in the key store the workingAccount key to the given access key.
    await nearjs.connection.signer.keyStore.setKey(testUtils.networkId, nearjs.accountCreator.masterAccount.accountId, keyPair);
    try {
        await contract.setValue({ args: { value: 'test' } });
        fail('should throw an error');
    } catch (e) {
        expect(e.message).toEqual(`Can not sign transactions for account ${nearjs.accountCreator.masterAccount.accountId} on network ${testUtils.networkId}, no matching key pair exists for this account`);
        expect(e.type).toEqual('KeyNotFound');
    }
    nearjs = await testUtils.setUpTestConnection();
});

test('view account details after adding access keys', async() => {
    const keyPair = KeyPair.fromRandom('ed25519');
    await nearjs.accountCreator.masterAccount.addKey(keyPair.getPublicKey(), contractId, '', 1000000000);

    const contract2 = await testUtils.deployContract(nearjs.accountCreator.masterAccount, testUtils.generateUniqueString('test_contract2'));
    const keyPair2 = KeyPair.fromRandom('ed25519');
    await nearjs.accountCreator.masterAccount.addKey(keyPair2.getPublicKey(), contract2.contractId, '', 2000000000);

    const details = await nearjs.accountCreator.masterAccount.getAccountDetails();
    const expectedResult = {
        authorizedApps: [{
            contractId: contractId,
            amount: '1000000000',
            publicKey: keyPair.getPublicKey().toString(),
        },
        {
            contractId: contract2.contractId,
            amount: '2000000000',
            publicKey: keyPair2.getPublicKey().toString(),
        }],
        transactions: []
    };
    expect(details.authorizedApps).toEqual(jasmine.arrayContaining(expectedResult.authorizedApps));
});

test('loading account after adding a full key', async() => {
    const keyPair = KeyPair.fromRandom('ed25519');
    // wallet calls this with an empty string for contract id and method
    await workingAccount.addKey(keyPair.getPublicKey(), '', '');

    let accessKeys = await workingAccount.getAccessKeys();

    expect(accessKeys.length).toBe(2);
    const addedKey = accessKeys.find(item => item.public_key == keyPair.getPublicKey().toString());
    expect(addedKey).toBeTruthy();
    expect(addedKey.access_key.permission).toEqual('FullAccess');
});

test('load invalid key pair', async() => {
    // Override in the key store with invalid key pair
    await nearjs.connection.signer.keyStore.setKey(testUtils.networkId, nearjs.accountCreator.masterAccount.accountId, '');
    try {
        await contract.setValue({ args: { value: 'test' } });
        fail('should throw an error');
    } catch (e) {
        expect(e.message).toEqual(`no matching key pair found in ${nearjs.connection.signer}`);
        expect(e.type).toEqual('PublicKeyNotFound');
    }
});