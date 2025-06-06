/**
 * NEAR RPC API request types and responses
 * @module
 */

import { BlockReference } from "./protocol";

export interface ViewAccountRequest {
    request_type: "view_account";
    account_id: string;
}

export interface ViewMtBalancesRequest {
    request_type: "view_token_balance_list";
    account_id: string;
}

export interface ViewTransferFeeRequest {
    request_type: "transfer_fee";
    account_id: string;
    receiver_id: string;
    symbol: string;
    amount: string;
    fee_symbol: Array<string>;
}

export interface ViewCodeRequest {
    request_type: "view_code";
    account_id: string;
}

export interface ViewStateRequest {
    request_type: "view_state";
    account_id: string;
    prefix_base64: string;
}

export interface ViewAccessKeyRequest {
    request_type: "view_access_key";
    account_id: string;
    public_key: string;
}

export interface ViewAccessKeyListRequest {
    request_type: "view_access_key_list";
    account_id: string;
}

export interface CallFunctionRequest {
    request_type: "call_function";
    account_id: string;
    method_name: string;
    args_base64: string;
}

export type RpcQueryRequest = (
    | ViewAccountRequest
    | ViewCodeRequest
    | ViewStateRequest
    | ViewAccountRequest
    | ViewMtBalancesRequest
    | ViewTransferFeeRequest
    | ViewAccessKeyRequest
    | ViewAccessKeyListRequest
    | CallFunctionRequest
) &
    BlockReference;
