/**
 * This module contains the main class developers will use to interact with NEAR.
 * The {@link Near} class is used to interact with {@link "@chainless-js/accounts".account.Account | Account} through the {@link "@chainless-js/providers".json-rpc-provider.JsonRpcProvider | JsonRpcProvider}.
 * It is configured via the {@link NearConfig}.
 * 
 * @see [https://docs.near.org/tools/chainless-api-ts/quick-reference#account](https://docs.near.org/tools/chainless-api-ts/quick-reference#account)
 * 
 * @module near
 */
import {
    Account,
    AccountCreator,
    Connection,
    LocalAccountCreator,
    UrlAccountCreator,
} from '@chainless-js/accounts';
import { PublicKey } from '@chainless-js/crypto';
import { KeyStore } from '@chainless-js/keystores';
import { Signer } from '@chainless-js/signers';
import { LoggerService } from '@chainless-js/utils';
import { Provider } from '@chainless-js/providers';

export interface NearConfig {
    /** Holds {@link "@chainless-js/crypto".key_pair.KeyPair | KeyPair} for signing transactions */
    keyStore?: KeyStore;

    /** @hidden */
    signer?: Signer;

    /**
     * [NEAR Contract Helper](https://github.com/wulianapp/near-contract-helper) url used to create accounts if no master account is provided
     * @see {@link UrlAccountCreator}
     */
    helperUrl?: string;

    /**
     * The balance transferred from the {@link NearConfig#masterAccount} to a created account
     * @see {@link LocalAccountCreator}
     */
    initialBalance?: string;

    /**
     * The account to use when creating new accounts
     * @see {@link LocalAccountCreator}
     */
    masterAccount?: string;

    /**
     * {@link "@chainless-js/crypto".key_pair.KeyPair | KeyPair} are stored in a {@link KeyStore} under the `networkId` namespace.
     */
    networkId: string;

    /**
     * NEAR RPC API url. used to make JSON RPC calls to interact with NEAR.
     * @see {@link "@chainless-js/providers".json-rpc-provider.JsonRpcProvider | JsonRpcProvider}
     */
    nodeUrl: string;

    /**
     * NEAR RPC API headers. Can be used to pass API KEY and other parameters.
     * @see {@link "@chainless-js/providers".json-rpc-provider.JsonRpcProvider | JsonRpcProvider}
     */
    headers?: { [key: string]: string | number };

    /**
     * NEAR wallet url used to redirect users to their wallet in browser applications.
     * @see [https://wallet.near.org/](https://wallet.near.org/)
     */
    walletUrl?: string;

    /**
     * JVSM account ID for NEAR JS SDK
     */
    jsvmAccountId?: string;

    /**
     * Backward-compatibility for older versions
     */
    deps?: { keyStore: KeyStore };
    /**
     * Specifies the logger to use.  Pass `false` to turn off logging.
     */
    logger?: LoggerService | false;
    /**
     * Specifies NEAR RPC API connections, and is used to make JSON RPC calls to interact with NEAR
     * @see {@link "@chainless-js/providers".json-rpc-provider.JsonRpcProvider | JsonRpcProvider}
     * @see {@link "@chainless-js/providers".json-rpc-provider.FailoverRpcProvider | FailoverRpcProvider}
     * @see [List of available and public JSON RPC endpoints](https://docs.near.org/api/rpc/providers)
     */
    provider?: Provider;
}

/**
 * This is the main class developers should use to interact with NEAR.
 * @example
 * ```js
 * const near = new Near(config);
 * ```
 */
export class Near {
    readonly config: any;
    readonly connection: Connection;
    readonly accountCreator: AccountCreator;

    constructor(config: NearConfig) {
        this.config = config;
        this.connection = Connection.fromConfig({
            networkId: config.networkId,
            provider: config.provider || { type: 'JsonRpcProvider', args: { url: config.nodeUrl, headers: config.headers } },
            signer: config.signer || { type: 'InMemorySigner', keyStore: config.keyStore || config.deps?.keyStore },
            jsvmAccountId: config.jsvmAccountId || `jsvm.${config.networkId}`
        });
        
        if (config.masterAccount) {
            // TODO: figure out better way of specifiying initial balance.
            // Hardcoded number below must be enough to pay the gas cost to dev-deploy with near-shell for multiple times
            const initialBalance = config.initialBalance ? BigInt(config.initialBalance) : BigInt('500000000000000000000000000');
            this.accountCreator = new LocalAccountCreator(new Account(this.connection, config.masterAccount), initialBalance);
        } else if (config.helperUrl) {
            this.accountCreator = new UrlAccountCreator(this.connection, config.helperUrl);
        } else {
            this.accountCreator = null;
        }
    }

    /**
     * @param accountId near accountId used to interact with the network.
     */
    async account(accountId: string): Promise<Account> {
        const account = new Account(this.connection, accountId);
        return account;
    }

    /**
     * Create an account using the {@link AccountCreator}. Either:
     * * using a masterAccount with {@link LocalAccountCreator}
     * * using the helperUrl with {@link UrlAccountCreator}
     * @see {@link NearConfig#masterAccount} and {@link NearConfig#helperUrl}
     * 
     * @param accountId
     * @param publicKey
     */
    async createAccount(accountId: string, publicKey: PublicKey): Promise<Account> {
        if (!this.accountCreator) {
            throw new Error('Must specify account creator, either via masterAccount or helperUrl configuration settings.');
        }
        await this.accountCreator.createAccount(accountId, publicKey);
        return new Account(this.connection, accountId);
    }
}
