import * as dotenv from "dotenv";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

dotenv.config({ path: "/home/trauki/portfolio/ScaffoldLoyaltyHarvest/packages/hardhat/.env" });

/** This function returns a RPC URL for the current network */
export default async function getRpc() {
  const chainId = getTargetNetwork().id;
  console.log("chainId:", chainId);
  let url;

  /** Hardhat */
  if (chainId == 31337) {
    url = "http://127.0.0.1:8545/";
  } /** Sepolia */ else if (chainId == 11155111) {
    url = "https://eth-sepolia.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY;
    // Public Sepolia RPC URL list
    //const url = "https://eth-sepolia.public.blastapi.io"; //`eth_getLogs` doesn't work
    //const url = "https://rpc2.sepolia.org"; // `missing trie node`
    //const url = "https://ethereum-sepolia.blockpi.network/v1/rpc/public"; // `missing trie node`
    //const url = "https://eth-sepolia-public.unifra.io"; // `missing trie node`
    //const url = "https://eth-sepolia.g.alchemy.com/v2/demo"; // exceeded concurrent requests capacity <-- ALCHEMY
    //const url = "https://eth-sepolia.g.alchemy.com/v2/" + process.env.SEPOLIA_RPC_URL;
  } /** Ethereum Mainnet */ else if (chainId == 1) {
    url = "";
  } /** Gnosis Mainnet */ else if (chainId == 100) {
    url = "";
  }

  // Return the RPC URL as output
  return url;
}
