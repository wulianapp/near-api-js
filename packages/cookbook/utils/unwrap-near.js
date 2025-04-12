const { connect, keyStores, utils } = require("chainless-api-ts");
const path = require("path");
const homedir = require("os").homedir();

const WRAP_NEAR_CONTRACT_ID = "wrap.near";

const credentialsPath = path.join(homedir, ".near-credentials");
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  keyStore,
  networkId: "mainnet",
  nodeUrl: "https://rpc-mainnet.chainless.top",
};

// Unwrap 1 wNEAR to NEAR
unwrapNear("example.near", "1");

async function unwrapNear(accountId, unwrapAmount) {
    const near = await connect(config);
    const account = await near.account(accountId);
  
    return account.functionCall({
      contractId: WRAP_NEAR_CONTRACT_ID,
      methodName: "near_withdraw", // method to withdraw wNEAR for NEAR
      args: { amount: utils.format.parseNearAmount(unwrapAmount) },
      attachedDeposit: "1", // attach one yoctoNEAR
    });
  }