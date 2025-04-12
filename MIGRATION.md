# Migrating from chainless-api-ts to @chainless-js

The `chainless-api-ts@>=2` package now uses the `@chainless-js/*` packages for most of its functionality. Minimal code
was changed as part of this migration, so if you are using `chainless-api-ts@<=1.1.0` your imports will continue
to resolve correctly.

Moving to the `@chainless-js/*` packages in your own code is a matter of finding the corresponding export in
the new package. Below, broken down by domain, are the old and new style imports side by side:

### Accounts
`chainless-api-ts`
```ts
import {
    Account,
    accountCreator,
    Connection,
    Contract,
    multisig,
} from 'chainless-api-ts';
const {
    AccountCreator,
    LocalAccountCreator,
    UrlAccountCreator,
} = accountCreator;
const {
    Account2FA,
    AccountMultisig,
    MULTISIG_ALLOWANCE,
    MULTISIG_DEPOSIT,
    MULTISIG_CHANGE_METHODS,
    MULTISIG_CONFIRM_METHODS,
    MULTISIG_GAS,
    MULTISIG_STORAGE_KEY,
    MultisigDeleteRequestRejectionError,
    MultisigStateStatus,
} = multisig;
```

`@chainless-js/accounts`
```ts

import {
    Account,
    AccountCreator,
    Account2FA,
    AccountMultisig,
    Connection,
    Contract,
    LocalAccountCreator,
    MULTISIG_ALLOWANCE,
    MULTISIG_CHANGE_METHODS,
    MULTISIG_CONFIRM_METHODS,
    MULTISIG_DEPOSIT,
    MULTISIG_GAS,
    MULTISIG_STORAGE_KEY,
    MultisigDeleteRequestRejectionError,
    MultisigStateStatus,
    UrlAccountCreator,
} from '@chainless-js/accounts';
```

### Cryptography
`chainless-api-ts`
```ts
import {
    KeyPair,
    utils,
} from 'chainless-api-ts';
const {
    KeyPairEd25519,
    PublicKey,
} = utils;
```

`@chainless-js/crypto`
```ts
import {
    KeyPair,
    KeyPairEd25519,
    PublicKey,
} from '@chainless-js/crypto';
```

### Keystores
`chainless-api-ts`
```ts
import {
    keyStores,
} from 'chainless-api-ts';
const {
    KeyStore,
    InMemoryKeyStore,
    BrowserLocalStorageKeyStore,
    UnencryptedFileSystemKeyStore,
    MergeKeyStore,
} = keyStores;
```

`@chainless-js/keystores`
```ts
import {
    InMemoryKeyStore,
    KeyStore,
    MergeKeyStore,
} from '@chainless-js/keystores';
```

`@chainless-js/keystores-browser`
```ts
import {
    BrowserLocalStorageKeyStore,
} from '@chainless-js/keystores-browser';
```

`@chainless-js/keystores-node`
```ts
import {
    UnencryptedFileSystemKeyStore,
} from '@chainless-js/keystores-node';
```

### Providers
`chainless-api-ts`
```ts
import {
    providers,
    utils,
} from 'chainless-api-ts';
const {
    ErrorContext,
    ExecutionOutcomeWithId,
    FinalExecutionOutcome,
    FinalExecutionStatus,
    FinalExecutionStatusBasic,
    getTransactionLastResult,
    JsonRpcProvider,
    Provider,
    TypedError,
} = providers;
```

`@chainless-js/providers`
```ts
import {
    exponentialBackoff,
    fetchJson,
    JsonRpcProvider,
    Provider,
} from '@chainless-js/providers';
```

`@chainless-js/types`
```ts
import {
    ErrorContext,
    ExecutionOutcomeWithId,
    FinalExecutionOutcome,
    FinalExecutionStatus,
    FinalExecutionStatusBasic,
    TypedError,
} from '@chainless-js/types';
```

`@chainless-js/utils`
```ts
import {
    getTransactionLastResult,
} from '@chainless-js/utils';
```

### Signers
`chainless-api-ts`
```ts
import {
    InMemorySigner,
    Signer,
} from 'chainless-api-ts';
```

`@chainless-js/providers`
```ts
import {
    InMemorySigner,
    Signer,
} from '@chainless-js/signers';
```

### Transactions
`chainless-api-ts`
```ts
import {
    transactions,
} from 'chainless-api-ts';
const {
    addKey,
    createAccount,
    deleteKey,
    deleteAccount,
    deployContract,
    fullAccessKey,
    functionCallAccessKey,
    functionCall,
    stake,
    transfer,
    stringifyJsonOrBytes,
    Action,
    AccessKey,
    AccessKeyPermission,
    AddKey,
    CreateAccount,
    DeleteAccount,
    DeleteKey,
    DeployContract,
    FullAccessPermission,
    FunctionCall,
    FunctionCallPermission,
    Stake,
    Transfer,
    SCHEMA,
    createTransaction,
    signTransaction,
    Signature,
    SignedTransaction,
    Transaction,
} = transactions;
```

`@chainless-js/transactions`
```ts
import {
    AccessKey,
    AccessKeyPermission,
    Action,
    AddKey,
    CreateAccount,
    DeleteAccount,
    DeleteKey,
    DeployContract,
    FullAccessPermission,
    FunctionCall,
    FunctionCallPermission,
    SignedTransaction,
    Stake,
    Transaction,
    Signature,
    Transfer,
    actionCreators,
    createTransaction,
    SCHEMA,
    signTransaction,
    stringifyJsonOrBytes,
} from '@chainless-js/transactions';
const {
    addKey,
    createAccount,
    deleteAccount,
    deleteKey,
    deployContract,
    fullAccessKey,
    functionCallAccessKey,
    functionCall,
    stake,
    transfer,
} = actionCreators;
```

### Utils
`chainless-api-ts`
```ts
import {
    DEFAULT_FUNCTION_CALL_GAS,
    utils,
    validators,
} from 'chainless-api-ts';
const {
    format,
    logWarning,
    rpc_errors,
    Logger
} = utils;
const {
    formatNearAmount,
    NEAR_NOMINATION,
    NEAR_NOMINATION_EXP,
    parseNearAmount,
} = format;
const {
    formatError,
    getErrorTypeFromErrorMessage,
    parseResultError,
    parseRpcError,
    ServerError,
} = rpc_errors;
const {
    ChangedValidatorInfo,
    diffEpochValidators,
    EpochValidatorsDiff,
    findSeatPrice,
} = validators;
```

`@chainless-js/utils`
```ts
import {
    DEFAULT_FUNCTION_CALL_GAS,
    NEAR_NOMINATION,
    NEAR_NOMINATION_EXP,
    ServerError,
    ChangedValidatorInfo,
    diffEpochValidators,
    EpochValidatorsDiff,
    findSeatPrice,
    formatError,
    formatNearAmount,
    getErrorTypeFromErrorMessage,
    logWarning,
    parseNearAmount,
    parseResultError,
    parseRpcError,
    Logger
} from '@chainless-js/utils';
```
