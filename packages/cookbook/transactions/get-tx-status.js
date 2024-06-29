// demonstrates how to get a transaction status
const { providers } = require("near-api-js");

//network config (replace testnet with mainnet or betanet)
const provider = new providers.JsonRpcProvider(
    "https://rpc-testnet.chainless.top"
);

const TX_HASH = "9wWoD7REWEigSaYoUrmqxnu3qXvfyNeBFJTxEDznsRrL";
// account ID associated with the transaction
const ACCOUNT_ID = "multisig_send_mt.chainless";

getState(TX_HASH, ACCOUNT_ID);

async function getState(txHash, accountId) {
    const result = await provider.txStatus(txHash, accountId);
    console.log("Result: ", result);
}
