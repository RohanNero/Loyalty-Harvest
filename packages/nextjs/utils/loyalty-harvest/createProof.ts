import createTree from "./createTree";

/** This function should create a merkle proof based upon a merkle tree and the user's address
 * Merkle tree will be constructed based upon the inputted leaves
 */
export default async function createProof(userAddress: string, leaves: any[]) {
  /* First get the event data from the blockchain */
  console.log("script input leaves:", leaves);
  console.log("user addr:", userAddress);

  /* Call `createTree` script */

  const { tree, root } = await createTree(leaves);
  //console.log("tree:", tree);
  console.log("root:", root);

  /* Finally calculate the proof */
  console.log("Proof calculation:");

  // Object that will contain the proof
  const proofAndValue: { Value: any; Proof: any[] }[] = [];

  // Loop through the tree and find entries that match the inputted address
  //   "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E"
  for (const [i, v] of tree.entries()) {
    if (v[0] === userAddress) {
      // Obtain the proof at the target entry and log it
      const proof = tree.getProof(i);
      const proofValuePair = {
        Value: v,
        Proof: proof,
      };

      // Push the proofValuePair object into the proofAndValue array
      proofAndValue.push(proofValuePair);
    }
  }
  return proofAndValue as any;
}
