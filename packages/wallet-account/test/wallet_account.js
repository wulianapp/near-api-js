const { KeyPair, PublicKey } = require('@chainless-js/crypto');
const { InMemoryKeyStore } = require('@chainless-js/keystores');
const { InMemorySigner } = require('@chainless-js/signers');
const { baseDecode } = require('@chainless-js/utils');
const { actionCreators, createTransaction, SCHEMA } = require('@chainless-js/transactions');
const BN = require('bn.js');
const { deserialize } = require('borsh');
const localStorage = require('localstorage-memory');
const url = require('url');

const { WalletConnection } = require('../lib/wallet_account');

const { functionCall, transfer } = actionCreators;
// If an access key has itself as receiverId and method permission add_request_and_confirm, then it is being used in a wallet with multisig contract: https://github.com/wulianapp/core-contracts/blob/671c05f09abecabe7a7e58efe942550a35fc3292/multisig/src/lib.rs#L149-L153
const MULTISIG_HAS_METHOD = 'add_request_and_confirm';

let lastRedirectUrl;
let lastTransaction;
global.window = {
    localStorage
};
global.document = {
    title: 'documentTitle'
};

let history;
let nearFake;
let walletConnection;
let keyStore = new InMemoryKeyStore();
module.exports.createTransactions = () => {
    beforeEach(() => {
        keyStore.clear();
        nearFake = {
            config: {
                networkId: 'networkId',
                contractName: 'contractId',
                walletUrl: 'http://example.com/wallet',
            },
            connection: {
                networkId: 'networkId',
                signer: new InMemorySigner(keyStore)
            },
            account() {
                return {
                    state() {}
                };
            }
        };
        lastRedirectUrl = null;
        history = [];
        Object.assign(global.window, {
            location: {
                href: 'http://example.com/location',
                assign(url) {
                    lastRedirectUrl = url;
                }
            },
            history: {
                replaceState: (state, title, url) => history.push([state, title, url])
            }
        });
        walletConnection = new WalletConnection(nearFake, '');
    });

    it('not signed in by default', () => {
        expect(walletConnection.isSignedIn()).not.toBeTruthy();
    });

    it('throws if non string appKeyPrefix', () => {
        expect(() => new WalletConnection(nearFake)).toThrow(/appKeyPrefix/);
        expect(() => new WalletConnection(nearFake, 1)).toThrow(/appKeyPrefix/);
        expect(() => new WalletConnection(nearFake, null)).toThrow(/appKeyPrefix/);
        expect(() => new WalletConnection(nearFake, undefined)).toThrow(/appKeyPrefix/);
    });
    //     const windowValueBefore = global.window;

    //     beforeEach(() => {
    //         global.window = undefined;
    //         keyStore.clear();
    //     });

    //     afterEach(() => {
    //         global.window = windowValueBefore;
    //     });

    //     it('does not throw on instantiation', () => {
    //         expect(() => new WalletConnection(nearFake, '')).not.toThrowError();
    //     });

    //     it('throws if non string appKeyPrefix in server context', () => {
    //         expect(() => new WalletConnection(nearFake)).toThrow(/appKeyPrefix/);
    //         expect(() => new WalletConnection(nearFake, 1)).toThrow(/appKeyPrefix/);
    //         expect(() => new WalletConnection(nearFake, null)).toThrow(/appKeyPrefix/);
    //         expect(() => new WalletConnection(nearFake, undefined)).toThrow(/appKeyPrefix/);
    //     });

    //     it('returns an empty string as accountId', () => {
    //         const serverWalletConnection = new WalletConnection(nearFake, '');
    //         expect(serverWalletConnection.getAccountId()).toEqual('');
    //     });

    //     it('returns false as isSignedIn', () => {
    //         const serverWalletConnection = new WalletConnection(nearFake, '');
    //         expect(serverWalletConnection.isSignedIn()).toEqual(false);
    //     });

    //     it('throws explicit error when calling other methods on the instance', () => {
    //         const serverWalletConnection = new WalletConnection(nearFake, '');
    //         expect(() => serverWalletConnection.requestSignIn('signInContract', 'signInTitle', 'http://example.com/success',  'http://example.com/fail')).toThrow(/please ensure you are using WalletConnection on the browser/);
    //         expect(() => serverWalletConnection.requestSignInUrl('signInContract', 'signInTitle', 'http://example.com/success',  'http://example.com/fail')).toThrow(/please ensure you are using WalletConnection on the browser/);
    //         expect(() => serverWalletConnection.requestSignTransactions('signInContract', 'signInTitle', 'http://example.com/success',  'http://example.com/fail')).toThrow(/please ensure you are using WalletConnection on the browser/);
    //         expect(() => serverWalletConnection.requestSignTransactionsUrl('signInContract', 'signInTitle', 'http://example.com/success',  'http://example.com/fail')).toThrow(/please ensure you are using WalletConnection on the browser/);
    //     });

    //     it('can access other props on the instance', () => {
    //         const serverWalletConnection = new WalletConnection(nearFake, '');
    //         expect(serverWalletConnection['randomValue']).toEqual(undefined);
    //     });
    // });

    // describe('can request sign in', () => {
    //     beforeEach(() => keyStore.clear());
        
    //     it('V2', () => {
    //         return walletConnection.requestSignIn({
    //             contractId: 'signInContract',
    //             successUrl: 'http://example.com/success', 
    //             failureUrl: 'http://example.com/fail'
    //         });
    //     });

    //     afterEach(async () => {
    //         let accounts = await keyStore.getAccounts('networkId');
    //         expect(accounts).toHaveLength(1);
    //         expect(accounts[0]).toMatch(/^pending_key.+/);
    //         expect(url.parse(lastRedirectUrl, true)).toMatchObject({
    //             protocol: 'http:',
    //             host: 'example.com',
    //             query: {
    //                 contract_id: 'signInContract',
    //                 success_url: 'http://example.com/success',
    //                 failure_url: 'http://example.com/fail',
    //                 public_key: (await keyStore.getKey('networkId', accounts[0])).publicKey.toString()
    //             }
    //         });
    //     });
    // });

    // it('can request sign in with methodNames', async () => {
    //     await walletConnection.requestSignIn({
    //         contractId: 'signInContract',
    //         methodNames: ['hello', 'goodbye'],
    //         successUrl: 'http://example.com/success', 
    //         failureUrl: 'http://example.com/fail'
    //     });

    //     let accounts = await keyStore.getAccounts('networkId');
    //     expect(accounts).toHaveLength(1);
    //     expect(accounts[0]).toMatch(/^pending_key.+/);
    //     expect(url.parse(lastRedirectUrl, true)).toMatchObject({
    //         protocol: 'http:',
    //         host: 'example.com',
    //         query: {
    //             contract_id: 'signInContract',
    //             methodNames: ['hello', 'goodbye'],
    //             success_url: 'http://example.com/success',
    //             failure_url: 'http://example.com/fail',
    //             public_key: (await keyStore.getKey('networkId', accounts[0])).publicKey.toString()
    //         }
    //     });
    // });

    // it('can complete sign in', async () => {
    //     const keyPair = KeyPair.fromRandom('ed25519');
    //     global.window.location.href = `http://example.com/location?account_id=near.account&public_key=${keyPair.publicKey}`;
    //     await keyStore.setKey('networkId', 'pending_key' + keyPair.publicKey, keyPair);

    //     await walletConnection._completeSignInWithAccessKey();

    //     expect(await keyStore.getKey('networkId', 'near.account')).toEqual(keyPair);
    //     expect(localStorage.getItem('contractId_wallet_auth_key'));
    //     expect(history.slice(1)).toEqual([
    //         [{}, 'documentTitle', 'http://example.com/location']
    //     ]);
    // });

    // it('Promise until complete sign in', async () => {
    //     const keyPair = KeyPair.fromRandom('ed25519');
    //     global.window.location.href = `http://example.com/location?account_id=near2.account&public_key=${keyPair.publicKey}`;
    //     await keyStore.setKey('networkId', 'pending_key' + keyPair.publicKey, keyPair);

    //     const newWalletConn = new WalletConnection(nearFake, 'promise_on_complete_signin');

    //     expect(newWalletConn.isSignedIn()).toEqual(false);
    //     expect(await newWalletConn.isSignedInAsync()).toEqual(true);
    //     expect(await keyStore.getKey('networkId', 'near2.account')).toEqual(keyPair);
    //     expect(localStorage.getItem('promise_on_complete_signin_wallet_auth_key'));
    //     expect(history).toEqual([
    //         [{}, 'documentTitle', 'http://example.com/location']
    //     ]);
    // });

    const BLOCK_HASH = '244ZQ9cgj3CQ6bWBdytfrJMuMQ1jdXLFGnr4HhvtCTnM';

    function setupWalletConnectionForSigning({ allKeys, accountAccessKeys }) {
        walletConnection._authData = {
            allKeys: allKeys,
            accountId: 'signer.near'
        };
        nearFake.connection.provider = {
            query(params) {
                if (params.request_type === 'view_account' && params.account_id === 'signer.near') {
                    return { };
                }
                if (params.request_type === 'view_access_key_list' && params.account_id === 'signer.near') {
                    return { keys: accountAccessKeys };
                }
                if (params.request_type === 'view_access_key' && params.account_id === 'signer.near') {
                    for (let accessKey of accountAccessKeys) {
                        if (accessKey.public_key === params.public_key) {
                            return accessKey;
                        }
                    }
                }
                fail(`Unexpected query: ${JSON.stringify(params)}`);
            },
            sendTransaction(signedTransaction) {
                lastTransaction = signedTransaction;
                return {
                    transaction_outcome: { outcome: { logs: [] } },
                    receipts_outcome: []
                };
            },
            block() {
                return {
                    header: {
                        hash: BLOCK_HASH
                    }
                };
            }
        };
    }
    //     const keyPair = KeyPair.fromRandom('ed25519');
    //     let transactions;
    //     beforeEach(() => {
    //         setupWalletConnectionForSigning({
    //             allKeys: [ 'no_such_access_key', keyPair.publicKey.toString() ],
    //             accountAccessKeys: [{
    //                 access_key: {
    //                     nonce: 1,
    //                     permission: 'FullAccess'
    //                 },
    //                 public_key: keyPair.publicKey.toString()
    //             }]
    //         });
    //     });

    //     it('V2', async() => {
    //         try {
    //             await walletConnection.account().signAndSendTransaction({
    //                 receiverId: 'receiver.near',
    //                 actions: [transfer(1)],
    //                 walletCallbackUrl: 'http://callback.com/callback'
    //             });
    //             fail('expected to throw');
    //         } catch (e) {
    //             expect(e.message).toEqual('Failed to redirect to sign transaction');
    //         }
    //         transactions = parseTransactionsFromUrl(lastRedirectUrl, 'http://callback.com/callback');
    //     });

    //     afterEach(() => {
    //         expect(transactions).toHaveLength(1);
    //         expect(transactions[0]).toMatchObject({
    //             signerId: 'signer.near',
    //             // nonce: new BN(2)
    //             receiverId: 'receiver.near',
    //             actions: [{
    //                 transfer: {
    //                     // deposit: new BN(1)
    //                 }
    //             }]
    //         });
    //         expect(transactions[0].nonce.toString()).toEqual('2');
    //         expect(transactions[0].actions[0].transfer.deposit.toString()).toEqual('1');
    //         expect(Buffer.from(transactions[0].publicKey.data)).toEqual(Buffer.from(keyPair.publicKey.data));
    //     });
    // });

    // describe('requests transaction signing automatically when function call has attached deposit', () => {
    //     beforeEach(async() => {
    //         const localKeyPair = KeyPair.fromRandom('ed25519');
    //         const walletKeyPair = KeyPair.fromRandom('ed25519');
    //         setupWalletConnectionForSigning({
    //             allKeys: [ walletKeyPair.publicKey.toString() ],
    //             accountAccessKeys: [{
    //                 access_key: {
    //                     nonce: 1,
    //                     permission: {
    //                         FunctionCall: {
    //                             allowance: '1000000000',
    //                             receiver_id: 'receiver.near',
    //                             method_names: []
    //                         }
    //                     }
    //                 },
    //                 public_key: localKeyPair.publicKey.toString()
    //             }, {
    //                 access_key: {
    //                     nonce: 1,
    //                     permission: 'FullAccess'
    //                 },
    //                 public_key: walletKeyPair.publicKey.toString()
    //             }]
    //         });
    //         await keyStore.setKey('networkId', 'signer.near', localKeyPair);
    //     });

    //     it('V2', async() => {
    //         try {
    //             await walletConnection.account().signAndSendTransaction({
    //                 receiverId: 'receiver.near',
    //                 actions: [functionCall('someMethod', new Uint8Array(), new BN('1'), new BN('1'))],
    //                 walletCallbackUrl: 'http://example.com/after',
    //                 walletMeta: 'someStuff'
    //             });
    //             fail('expected to throw');
    //         } catch (e) {
    //             expect(e.message).toEqual('Failed to redirect to sign transaction');
    //         }
        
    //         const transactions = parseTransactionsFromUrl(lastRedirectUrl, 'http://example.com/after');
    //         expect(transactions).toHaveLength(1);
    //     });
    // });

    describe('requests transaction signing with 2fa access key', () => {
        beforeEach(async () => {
            let localKeyPair = KeyPair.fromRandom('ed25519');
            let walletKeyPair = KeyPair.fromRandom('ed25519');
            setupWalletConnectionForSigning({
                allKeys: [ walletKeyPair.publicKey.toString() ],
                accountAccessKeys: [{
                    access_key: {
                        nonce: 1,
                        permission: {
                            FunctionCall: {
                                allowance: '1000000000',
                                receiver_id: 'signer.near',
                                method_names: [MULTISIG_HAS_METHOD]
                            }
                        }
                    },
                    public_key: localKeyPair.publicKey.toString()
                }]
            });
            await keyStore.setKey('networkId', 'signer.near', localKeyPair);
        });

        it('V2', async () => {
            try {
                const res = await walletConnection.account().signAndSendTransaction({
                    receiverId: 'receiver.near',
                    actions: [functionCall('someMethod', new Uint8Array(), new BN('1'), new BN('1'))]
                });

                // multisig access key is accepted res is object representing transaction, populated upon wallet redirect to app
                expect(res).toHaveProperty('transaction_outcome');
                expect(res).toHaveProperty('receipts_outcome');
            } catch (e) {
                fail('expected transaction outcome');
            }
        });
    });

    describe('fails requests transaction signing without 2fa access key', () => {
        beforeEach(async () => {
            const localKeyPair = KeyPair.fromRandom('ed25519');
            const walletKeyPair = KeyPair.fromRandom('ed25519');
            setupWalletConnectionForSigning({
                allKeys: [ walletKeyPair.publicKey.toString() ],
                accountAccessKeys: [{
                    access_key: {
                        nonce: 1,
                        permission: {
                            FunctionCall: {
                                allowance: '1000000000',
                                receiver_id: 'signer.near',
                                method_names: ['not_a_valid_2fa_method']
                            }
                        }
                    },
                    public_key: localKeyPair.publicKey.toString()
                }]
            });
            await keyStore.setKey('networkId', 'signer.near', localKeyPair);
        });

        it('V2', () => {
            return expect(
                walletConnection.account().signAndSendTransaction({
                    receiverId: 'receiver.near',
                    actions: [functionCall('someMethod', new Uint8Array(), new BN('1'), new BN('1'))]
                })
            ).rejects.toThrow('Cannot find matching key for transaction sent to receiver.near');
        });
    });

    describe('can sign transaction locally when function call has no attached deposit', () => {
        beforeEach(async () => {
            const localKeyPair = KeyPair.fromRandom('ed25519');
            setupWalletConnectionForSigning({
                allKeys: [ /* no keys in wallet needed */ ],
                accountAccessKeys: [{
                    access_key: {
                        nonce: 1,
                        permission: {
                            FunctionCall: {
                                allowance: '1000000000',
                                receiver_id: 'receiver.near',
                                method_names: []
                            }
                        }
                    },
                    public_key: localKeyPair.publicKey.toString()
                }]
            });
            await keyStore.setKey('networkId', 'signer.near', localKeyPair);
        });

        it.each([
            functionCall('someMethod', new Uint8Array(), new BN('1'), new BN('0')),
            functionCall('someMethod', new Uint8Array(), new BN('1')),
            functionCall('someMethod', new Uint8Array())
        ])('V2', async (functionCall) => {
            await walletConnection.account().signAndSendTransaction({
                receiverId: 'receiver.near',
                actions: [ functionCall ]
            });
            // NOTE: Transaction gets signed without wallet in this test
            expect(lastTransaction).toMatchObject({
                transaction: {
                    receiverId: 'receiver.near',
                    signerId: 'signer.near',
                    actions: [{
                        functionCall: {
                            methodName: 'someMethod',
                        }
                    }]
                }
            });
        });
    });
}