import { KeyPair, PublicKey, Signature } from '@chainless-js/crypto';
import { InMemoryKeyStore, KeyStore } from '@chainless-js/keystores';
import { sha256 } from '@noble/hashes/sha256';

import { Signer } from './signer';

/**
 * Signs using in memory key store.
 */
export class InMemorySigner extends Signer {
    readonly keyStore: KeyStore;

    constructor(keyStore: KeyStore) {
        super();
        this.keyStore = keyStore;
    }

    /**
     * Creates a single account Signer instance with account, network and keyPair provided.
     *
     * Intended to be useful for temporary keys (e.g. claiming a Linkdrop).
     *
     * @param networkId The targeted network. (ex. default, betanet, etc…)
     * @param accountId The NEAR account to assign the key pair to
     * @param keyPair The keyPair to use for signing
     */
    static async fromKeyPair(networkId: string, accountId: string, keyPair: KeyPair): Promise<Signer> {
        const keyStore = new InMemoryKeyStore();
        await keyStore.setKey(networkId, accountId, keyPair);
        return new InMemorySigner(keyStore);
    }

    /**
     * Creates a public key for the account given
     * @param accountId The NEAR account to assign a public key to
     * @param networkId The targeted network. (ex. default, betanet, etc…)
     * @returns {Promise<PublicKey>}
     */
    async createKey(accountId: string, networkId: string): Promise<PublicKey> {
        const keyPair = KeyPair.fromRandom('ed25519');
        await this.keyStore.setKey(networkId, accountId, keyPair);
        return keyPair.getPublicKey();
    }

    /**
     * Gets the existing public key for a given account
     * @param accountId The NEAR account to assign a public key to
     * @param networkId The targeted network. (ex. default, betanet, etc…)
     * @returns {Promise<PublicKey>} Returns the public key or null if not found
     */
    async getPublicKey(accountId?: string, networkId?: string): Promise<PublicKey> {
        const keyPair = await this.keyStore.getKey(networkId, accountId);
        if (keyPair === null) {
            return null;
        }
        return keyPair.getPublicKey();
    }

    /**
     * @param message A message to be signed, typically a serialized transaction
     * @param accountId the NEAR account signing the message
     * @param networkId The targeted network. (ex. default, betanet, etc…)
     * @returns {Promise<Signature>}
     */
    async signMessage(message: Uint8Array, accountId?: string, networkId?: string): Promise<Signature> {
        const hash = new Uint8Array(sha256(message));
        if (!accountId) {
            throw new Error('InMemorySigner requires provided account id');
        }
        const keyPair = await this.keyStore.getKey(networkId, accountId);
        if (keyPair === null) {
            throw new Error(`Key for ${accountId} not found in ${networkId}`);
        }
        return keyPair.sign(hash);
    }

    toString(): string {
        return `InMemorySigner(${this.keyStore})`;
    }
}
