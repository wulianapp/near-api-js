// demonstrates how to query the state without setting 
// up an account. (View methods only)
const { providers } = require("chainless-api-ts");
//network config (replace testnet with mainnet or betanet)
const provider = new providers.JsonRpcProvider(
  "https://rpc-testnet.chainlessdw20.com"
);

getState();

async function getState() {
  const rawResult = await provider.query({
    request_type: "call_function",
    account_id: "multisig-send-mt.chainless",
    method_name: "contract_storage",
    args_base64: "e30=",
    finality: "optimistic",
  });

  // format result
  const res = JSON.parse(Buffer.from(rawResult.result).toString());
  console.log(res);
}
