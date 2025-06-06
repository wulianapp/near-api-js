import { parseNearAmount } from '@chainless-js/utils';

export const MULTISIG_STORAGE_KEY = '__multisigRequest';
export const MULTISIG_ALLOWANCE = BigInt(parseNearAmount('1'));
// TODO: Different gas value for different requests (can reduce gas usage dramatically)
export const MULTISIG_GAS = BigInt('100000000000000');
export const MULTISIG_DEPOSIT = BigInt('0');
export const MULTISIG_CHANGE_METHODS = ['add_request', 'add_request_and_confirm', 'delete_request', 'confirm'];
export const MULTISIG_CONFIRM_METHODS = ['confirm'];
