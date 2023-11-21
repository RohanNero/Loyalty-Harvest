import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

/** This function creates the Merkle Tree by taking in an array of merkle leaves */
export default async function createTree(leaves: string[][]) {
  console.log("createTree Input:");
  console.log("leaves:", leaves);
  // Create the merkle tree and explicitly state the structure of the leaves
  const tree = StandardMerkleTree.of(leaves, ["address", "uint256", "uint256", "uint256"]);

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
