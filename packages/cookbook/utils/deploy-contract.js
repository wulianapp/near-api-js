const { keyStores, connect } = require("chainless-api-ts");
const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const ACCOUNT_ID = "near-example.testnet";
const WASM_PATH = path.join(__dirname, "/wasm-files/status_message.wasm");
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc-testnet.chainlessdw20.com",
};

deployContract(ACCOUNT_ID, WASM_PATH);

async function deployContract(accountId, wasmPath) { 
    const near = await connect(config);
    const account = await near.account(accountId);
    const result = await account.deployContract(fs.readFileSync(wasmPath));
    console.log(result);
}
