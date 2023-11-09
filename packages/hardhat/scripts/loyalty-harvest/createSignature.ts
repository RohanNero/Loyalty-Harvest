import Web3 from "web3";
import * as dotenv from "dotenv";
dotenv.config({ path: "/home/trauki/portfolio/ScaffoldLoyaltyHarvest/packages/hardhat/.env" });

const url = "https://eth-sepolia.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY;

//console.log("url:", url);

// address is the third argument in terminal (how to call it via command line)
// 1. = node
// 2. = js/createSig.js
// 3. = 0xe4a98d2bfd66ce08128fdfffc9070662e489a28e
//const address = process.argv[2];

// This function returns a signature for the PRIVATE_KEY in the .env file
// You must pass in an address `to` to be hashed, this address will receive the rewards when `claim` is called

// eth_signTypedData_v4 from metamask will be needed to sign using private key on frontend
/** INPUT:
 * 1. address to encode 0xe4a98d2bfd66ce08128fdfffc9070662e489a28e
 *
 */
export default async function createSignature(address: string) {
  console.log("script address:", address);
  if (address == undefined) {
    console.log("address is undefined!");
    return;
  }
  const web3 = new Web3(url); // Replace with your Ethereum node URL
  const packedEncoding = web3.utils.encodePacked(address);
  //console.log("packedEncoding:", packedEncoding);

  const messageHash = web3.utils.soliditySha3(packedEncoding);
  //console.log("messageHash:", messageHash);
  //console.log("defaultAccount:", web3.eth.defaultAccount);
  // `expected 2 arguments, but got 3' error caused by line below
  // const sig = await web3.eth.accounts.sign(messageHash, process.env.DEPLOYER_PRIVATE_KEY, console.log);
  const priv_key = process.env.DEPLOYER_PRIVATE_KEY || "";

  const sig = await web3.eth.accounts.sign(messageHash || "0x", priv_key);
  console.log("signature:", sig.signature);
  return sig;
}

// in production, this line that calls the main function will be removed, only here for testing
// in reality `createSig` will be imported and called directly on the frontend
//createSignature("0xe4a98d2bfd66ce08128fdfffc9070662e489a28e");
