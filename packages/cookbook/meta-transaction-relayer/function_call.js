const { Account } = require("@near-js/accounts");
const { UnencryptedFileSystemKeyStore } = require("@near-js/keystores-node");
const { JsonRpcProvider, fetchJson } = require("@near-js/providers");
const { InMemorySigner } = require("@near-js/signers");
const {
    actionCreators,
    encodeSignedDelegate,
} = require("@near-js/transactions");
const os = require("os");
const path = require("path");

const { functionCall } = actionCreators;

async function sendNearThroughRelayer({ amount, receiverId, senderAccount }) {
    const signedDelegate = await senderAccount.signedDelegate({
        actions: [
            functionCall(
                "set_thresholds_and_min_slave_sigs",
                { thresholds: [], min_slave_sigs: [] },
                300000000000000,
                "USDT",
                10000,
                "USDT"
            ),
        ],
        blockHeightTtl: 60,
        receiverId,
    });

    return fetchJson(
        "https://relayer.testnet.chainless.top/send_meta_tx_borsh",
        Buffer.from(Array.from(encodeSignedDelegate(signedDelegate))).toString(
            "base64"
        )
    );
}

module.exports = {
    sendNearThroughRelayer,
};

if (require.main === module) {
    (async function () {
        const networkId = "testnet";
        const provider = new JsonRpcProvider({
            url: "https://rpc.testnet.chainless.top",
        });

        const CREDENTIALS_DIR = ".near-credentials";
        const credentialsPath = path.join(os.homedir(), CREDENTIALS_DIR);

        const RECEIVER_ACCOUNT_ID = "multisig_send_mt.chainless"; // the ultimate recipient of the meta transaction execution
        const SENDER_ACCOUNT_ID = "chainless"; // the account requesting the transaction be executed

        const senderAccount = new Account(
            {
                networkId,
                provider,
                signer: new InMemorySigner(
                    new UnencryptedFileSystemKeyStore(credentialsPath)
                ),
            },
            SENDER_ACCOUNT_ID
        );

        const result = await sendNearThroughRelayer({
            amount: BigInt("1000000000"),
            receiverId: RECEIVER_ACCOUNT_ID,
            senderAccount,
        });
        console.log(JSON.stringify(result, undefined, 2));
    })();
}
