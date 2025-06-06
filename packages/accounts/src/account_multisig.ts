import { Action, actionCreators } from '@chainless-js/transactions';
import { FinalExecutionOutcome } from '@chainless-js/types';
import { Logger } from '@chainless-js/utils';

import { Account, SignAndSendTransactionOptions } from './account';
import { Connection } from './connection';
import {
    MULTISIG_ALLOWANCE,
    MULTISIG_CHANGE_METHODS,
    MULTISIG_DEPOSIT,
    MULTISIG_GAS,
    MULTISIG_STORAGE_KEY,
} from './constants';
import { MultisigDeleteRequestRejectionError, MultisigStateStatus } from './types';

const { deployContract, functionCall } = actionCreators;

enum MultisigCodeStatus {
    INVALID_CODE,
    VALID_CODE,
    UNKNOWN_CODE
}

// in memory request cache for node w/o localStorage
const storageFallback = {
    [MULTISIG_STORAGE_KEY]: null
};

export class AccountMultisig extends Account {
    public storage: any;
    public onAddRequestResult: (any) => any;

    /**
     * Constructs an instance of the `AccountMultisig` class.
     * @param connection The NEAR connection object.
     * @param accountId The NEAR account ID.
     * @param options Additional options for the multisig account.
     * @param options.storage Storage to store data related to multisig operations.
     * @param options.onAddRequestResult Callback function to handle the result of adding a request.
     */
    constructor(connection: Connection, accountId: string, options: any) {
        super(connection, accountId);
        this.storage = options.storage;
        this.onAddRequestResult = options.onAddRequestResult;
    }

    /**
     * Sign and send a transaction with the multisig account as the sender.
     * @param receiverId - The NEAR account ID of the transaction receiver.
     * @param actions - The list of actions to be included in the transaction.
     * @returns {Promise<FinalExecutionOutcome>} A promise that resolves to the final execution outcome of the transaction.
     */
    async signAndSendTransactionWithAccount(receiverId: string, actions: Action[]): Promise<FinalExecutionOutcome> {
        return super.signAndSendTransaction({ receiverId, actions });
    }

    /**
     * Sign and send a multisig transaction to add a request and confirm it.
     * @param options Options for the multisig transaction.
     * @param options.receiverId The NEAR account ID of the transaction receiver.
     * @param options.actions The list of actions to be included in the transaction.
     * @returns {Promise<FinalExecutionOutcome>} A promise that resolves to the final execution outcome of the transaction.
     */
    async signAndSendTransaction({ receiverId, actions }: SignAndSendTransactionOptions): Promise<FinalExecutionOutcome> {
        const { accountId } = this;

        const args = Buffer.from(JSON.stringify({
            request: {
                receiver_id: receiverId,
                actions: convertActions(actions, accountId, receiverId)
            }
        }));

        let result;
        try {
            result = await super.signAndSendTransaction({
                receiverId: accountId,
                actions: [
                    functionCall('add_request_and_confirm', args, MULTISIG_GAS, undefined, MULTISIG_DEPOSIT, undefined)
                ]
            });
        } catch (e) {
            if (e.toString().includes('Account has too many active requests. Confirm or delete some')) {
                await this.deleteUnconfirmedRequests();
                return await this.signAndSendTransaction({ receiverId, actions });
            }
            throw e;
        }

        // TODO: Are following even needed? Seems like it throws on error already
        if (!result.status) {
            throw new Error('Request failed');
        }
        const status: any = { ...result.status };
        if (!status.SuccessValue || typeof status.SuccessValue !== 'string') {
            throw new Error('Request failed');
        }

        this.setRequest({
            accountId,
            actions,
            requestId: parseInt(Buffer.from(status.SuccessValue, 'base64').toString('ascii'), 10)
        });

        if (this.onAddRequestResult) {
            await this.onAddRequestResult(result);
        }

        // NOTE there is no await on purpose to avoid blocking for 2fa
        this.deleteUnconfirmedRequests();

        return result;
    }

    /**
     * This method submits a canary transaction that is expected to always fail in order to determine whether the contract currently has valid multisig state 
     * and whether it is initialized. The canary transaction attempts to delete a request at index u32_max and will go through if a request exists at that index.
     * a u32_max + 1 and -1 value cannot be used for the canary due to expected u32 error thrown before deserialization attempt.
     * @param contractBytes The bytecode of the multisig contract.
     * @returns {Promise<{ codeStatus: MultisigCodeStatus; stateStatus: MultisigStateStatus }>} A promise that resolves to the status of the code and state.
     */
    async checkMultisigCodeAndStateStatus(contractBytes?: Uint8Array): Promise<{ codeStatus: MultisigCodeStatus; stateStatus: MultisigStateStatus }> {
        const u32_max = 4_294_967_295;
        const validCodeStatusIfNoDeploy = contractBytes ? MultisigCodeStatus.UNKNOWN_CODE : MultisigCodeStatus.VALID_CODE;

        try {
            if(contractBytes) {
                await super.signAndSendTransaction({
                    receiverId: this.accountId, actions: [
                        deployContract(contractBytes),
                        functionCall('delete_request', { request_id: u32_max }, MULTISIG_GAS, undefined, MULTISIG_DEPOSIT, undefined)
                    ]
                });
            } else {
                await this.deleteRequest(u32_max);
            }
            
            return { codeStatus: MultisigCodeStatus.VALID_CODE, stateStatus: MultisigStateStatus.VALID_STATE };
        } catch (e) {
            if (new RegExp(MultisigDeleteRequestRejectionError.CANNOT_DESERIALIZE_STATE).test(e && e.kind && e.kind.ExecutionError)) {
                return { codeStatus: validCodeStatusIfNoDeploy, stateStatus: MultisigStateStatus.INVALID_STATE };
            } else if (new RegExp(MultisigDeleteRequestRejectionError.MULTISIG_NOT_INITIALIZED).test(e && e.kind && e.kind.ExecutionError)) {
                return { codeStatus: validCodeStatusIfNoDeploy, stateStatus: MultisigStateStatus.STATE_NOT_INITIALIZED };
            } else if (new RegExp(MultisigDeleteRequestRejectionError.NO_SUCH_REQUEST).test(e && e.kind && e.kind.ExecutionError)) {
                return { codeStatus: validCodeStatusIfNoDeploy, stateStatus: MultisigStateStatus.VALID_STATE };
            } else if (new RegExp(MultisigDeleteRequestRejectionError.METHOD_NOT_FOUND).test(e && e.message)) {
                // not reachable if transaction included a deploy
                return { codeStatus: MultisigCodeStatus.INVALID_CODE, stateStatus: MultisigStateStatus.UNKNOWN_STATE };
            }
            throw e;
        }
    }

    /**
     * Delete a multisig request by its ID.
     * @param request_id The ID of the multisig request to be deleted.
     * @returns {Promise<FinalExecutionOutcome>} A promise that resolves to the final execution outcome of the deletion.
     */
    deleteRequest(request_id) {
        return super.signAndSendTransaction({
            receiverId: this.accountId,
            actions: [functionCall('delete_request', { request_id }, MULTISIG_GAS, undefined, MULTISIG_DEPOSIT, undefined)]
        });
    }

    /**
     * Delete all multisig requests associated with the account.
     * @returns {Promise<void>} A promise that resolves when all requests are deleted.
     */
    async deleteAllRequests() {
        const request_ids = await this.getRequestIds();
        if(request_ids.length) {
            await Promise.all(request_ids.map((id) => this.deleteRequest(id)));
        }
    }

    /**
     * Delete unconfirmed multisig requests associated with the account.
     * @returns {Promise<void>} A promise that resolves when unconfirmed requests are deleted.
     */
    async deleteUnconfirmedRequests () {
        // TODO: Delete in batch, don't delete unexpired
        // TODO: Delete in batch, don't delete unexpired (can reduce gas usage dramatically)
        const request_ids = await this.getRequestIds();
        const { requestId } = this.getRequest();
        for (const requestIdToDelete of request_ids) {
            if (requestIdToDelete == requestId) {
                continue;
            }
            try {
                await super.signAndSendTransaction({
                    receiverId: this.accountId,
                    actions: [functionCall('delete_request', { request_id: requestIdToDelete }, MULTISIG_GAS, undefined, MULTISIG_DEPOSIT, undefined)]
                });
            } catch (e) {
                Logger.warn('Attempt to delete an earlier request before 15 minutes failed. Will try again.');
            }
        }
    }

    // helpers

    async getRequestIds(): Promise<string[]> {
        // TODO: Read requests from state to allow filtering by expiration time
        // TODO: https://github.com/wulianapp/core-contracts/blob/305d1db4f4f2cf5ce4c1ef3479f7544957381f11/multisig/src/lib.rs#L84
        return this.viewFunction({
            contractId: this.accountId,
            methodName: 'list_request_ids',
        });
    }

    getRequest() {
        if (this.storage) {
            return JSON.parse(this.storage.getItem(MULTISIG_STORAGE_KEY) || '{}');
        }
        return storageFallback[MULTISIG_STORAGE_KEY];
    }

    setRequest(data) {
        if (this.storage) {
            return this.storage.setItem(MULTISIG_STORAGE_KEY, JSON.stringify(data));
        }
        storageFallback[MULTISIG_STORAGE_KEY] = data;
    }
}

const convertPKForContract = (pk) => pk.toString().replace('ed25519:', '');

const convertActions = (actions, accountId, receiverId) => actions.map((a) => {
    const type = a.enum;
    const { gas, publicKey, methodName, args, deposit, accessKey, code } = a[type];
    const action = {
        type: type[0].toUpperCase() + type.substr(1),
        gas: (gas && gas.toString()) || undefined,
        public_key: (publicKey && convertPKForContract(publicKey)) || undefined,
        method_name: methodName,
        args: (args && Buffer.from(args).toString('base64')) || undefined,
        code: (code && Buffer.from(code).toString('base64')) || undefined,
        amount: (deposit && deposit.toString()) || undefined,
        deposit: (deposit && deposit.toString()) || '0',
        permission: undefined,
    };
    if (accessKey) {
        if (receiverId === accountId && accessKey.permission.enum !== 'fullAccess') {
            action.permission = {
                receiver_id: accountId,
                allowance: MULTISIG_ALLOWANCE.toString(),
                method_names: MULTISIG_CHANGE_METHODS,
            };
        }
        if (accessKey.permission.enum === 'functionCall') {
            const { receiverId: receiver_id, methodNames: method_names, allowance } = accessKey.permission.functionCall;
            action.permission = {
                receiver_id,
                allowance: (allowance && allowance.toString()) || undefined,
                method_names
            };
        }
    }
    return action;
});
