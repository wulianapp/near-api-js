// demonstrates how to use API-KEY with 'connect' function.
const { connect, keyStores } = require("near-api-js");
const path = require("path");

const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const RPC_API_ENDPOINT = "https://rpc-testnet.chainless.top";
const API_KEY = "";

const ACCOUNT_ID = "chainless";

const config = {
    networkId: "testnet",
    keyStore,
    nodeUrl: RPC_API_ENDPOINT,
    headers: { "x-api-key": API_KEY },
};

async function getMtBalances(accountId) {
    const near = await connect(config);
    const account = await near.account(accountId);
    const fees = await account.transferFee(
        "hello.chainless",
        "USDT",
        100000000000000,
        ["ETH", "DW20", "XYZ"]
    );
    console.log(fees);
}

getMtBalances(ACCOUNT_ID);
