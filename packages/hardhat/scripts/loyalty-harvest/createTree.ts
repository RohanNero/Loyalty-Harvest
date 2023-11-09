//import Web3 from "web3";
// import ethers from "ethers";
//import keccak256 from "keccak256";
//import dotenv from "dotenv";
//import { claimAbi } from "../abi/Claim.json";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
//import fs from "fs";

//dotenv.config();

//const url = "https://eth-sepolia.g.alchemy.com/v2/" + process.env.SEPOLIA_RPC_URL;

//const web3 = new Web3(url);

// This script is called after the reward period has ended
// 1. it first creates leaves of all the original NFT holders
// 2. then loops through the reward period block frame to view all the `Transfer` events, if one was fired,
// the heldDuration of that leaf is then set to the block that it was transferred at.
// 3. if the duration wasn't set during the loop through the event, it is set to the endBlock.
// 4. now that we have all of the leaves, we can construct the merkle tree and get the root.
// 5. share the root publicly, and the method used to derive the root, this way anyone can prove the root is legit <-- not a true code step
// 6. users create a leaf using their signature, id, and possibily the block they sold at, then a proof using the leaf and the root
// 7. users call claim() function in smart contract with `root`, `proof`, and `leaf` to get their reward.

/**
 * This function creates the Merkle Tree by taking in two input parameters
 * leaves - all of the leaves to build the tree with
 * structure - array of strings describing the types inside the leaves
 */
export default async function createMerkle(leaves: string[]) {
  console.log("createTree Input:");
  console.log("leaves:", leaves);
  //console.log("structure:", structure);
  // Create the merkle tree and explicitly state the structure of the leaves
  const tree = StandardMerkleTree.of(leaves, ["address", "uint256", "uint256", "uint256"]);

  console.log("createMerkle script: Merkle Root:", tree.root);

  const result = {
    tree,
    root: tree.root,
  };

  return result;
}

// // Example leaves for testing
// 1st leaf value: holder address
// 2nd leaf value: nft contract address
// 3rd leaf value: nft tokenId
// 4th leaf value: block heldUntil
// const leaves = [
//   ["0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E", "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f", "0", "4283030"],
//   ["0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E", "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f", "1", "4283024"],
//   ["0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E", "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f", "2", "4283030"],
//   ["0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E", "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f", "3", "4283030"],
//   ["0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E", "0x52469E13ac6DdbFbf803F48E7106f8294E2B888f", "4", "4283030"],
// ];

// // Structure describing the leaf variable types
// const structure = ["address", "address", "uint256", "uint256"];

// // Call the createMerkle function and log the resulting Merkle root
// createMerkle(leaves, structure)
//   .then(result => {
//     console.log("Merkle Root:", result.root);
//   })
//   .catch(error => {
//     console.error("Error:", error);
//   });
