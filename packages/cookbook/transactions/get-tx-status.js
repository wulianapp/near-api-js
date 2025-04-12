// demonstrates how to get a transaction status
const { providers } = require("chainless-api-ts");

//network config (replace testnet with mainnet or betanet)
const provider = new providers.JsonRpcProvider(
    "https://rpc-testnet.chainlessdw20.com"
);

const TX_HASH = "9wWoD7REWEigSaYoUrmqxnu3qXvfyNeBFJTxEDznsRrL";
// account ID associated with the transaction
const ACCOUNT_ID = "multisig_send_mt.chainless";

getState(TX_HASH, ACCOUNT_ID);

async function getState(txHash, accountId) {
    const result = await provider.txStatus(txHash, accountId);
    console.log("Result: ", result);
}
