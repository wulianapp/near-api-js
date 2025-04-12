const { keyStores, connect } = require("chainless-api-ts");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
// NOTE: replace "example.testnet" with your accountId
const ACCOUNT_ID = "example.testnet";
// NOTE: replace this PK with the one that you are trying to delete
const PUBLIC_KEY = "ed25519:4yLYjwC3Rd8EkhKwVPoAdy6EUcCVSz2ZixFtsCeuBEZD";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc-testnet.chainlessdw20.com",
};

deleteAccessKey(ACCOUNT_ID, PUBLIC_KEY);

async function deleteAccessKey(accountId, publicKey) {
    const near = await connect(config);
    const account = await near.account(accountId);
    await account.deleteKey(publicKey);
}
