import { KeyPair } from '@chainless-js/crypto';

/**
 * KeyStores are passed to {@link "@chainless-js/wallet-account".near.Near | Near} via {@link "@chainless-js/wallet-account".near.NearConfig | NearConfig}
 * and are used by the {@link "@chainless-js/signers".in_memory_signer.InMemorySigner | InMemorySigner} to sign transactions.
 * 
 */
export abstract class KeyStore {
    abstract setKey(networkId: string, accountId: string, keyPair: KeyPair): Promise<void>;
    abstract getKey(networkId: string, accountId: string): Promise<KeyPair>;
    abstract removeKey(networkId: string, accountId: string): Promise<void>;
    abstract clear(): Promise<void>;
    abstract getNetworks(): Promise<string[]>;
    abstract getAccounts(networkId: string): Promise<string[]>;
}
