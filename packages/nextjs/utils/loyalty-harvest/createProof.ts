// These two abi imports essentially do the same thing, one is .ts and one is .json
// .ts may be better option, originally swapped to it to debug a type error
// import { claimAbi } from "../../abi/ClaimV2.json";
import claimAbi from "../../abi/Claim";
import createLeaves from "./createLeaves";
import createTree from "./createTree";
import * as dotenv from "dotenv";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

dotenv.config();

// Initialize viem public client
const client = createPublicClient({
  chain: sepolia,
  transport: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
});

/** This function should create a merkle proof based upon a merkle tree and the user's address
 * Merkle tree will be constructed based upon the `eventId` input
 *
 */
// STEPS TO BUILDING THIS:
// 1. read data from Claim contract (web3js)
// 2. use the data to call `createLeaves` and then `createTree`
// 3. use the created Merkle tree to create a merkle proof!
export default async function createProof(eventId: number, userAddress: string) {
  /* First get the event data from the blockchain */
  console.log("script input:", eventId, userAddress);

  // This function call should take `eventId` as an argument but yarn next type check errors when I try...
  //const txData = claimContract.methods.viewEvent();
  //const txData = claimContract.methods["viewEvent(uint256)"](eventId);
  // const txData = claimContract.methods["0x24923f5f"](eventId);
  // This "ugly" fix was found here: https://github.com/web3/web3.js/issues/6275#issuecomment-1650199729

  const eventData = await client.readContract({
    //address: "0x2d21A9Fc8fb893f648aa9607A17FE595EAC12663", // Temporarily hard-coded to deployed Sepolia contract - Broken
    //address: "0x2427F2289D88121fAeEdBfb1401069DE7ebA31Da", // Temporarily hard-coded to deployed Sepolia contract - Broken
    address: "0x01cA0957898BfB42d7620a355d98014a4731Ea8D", // Temporarily hard-coded to deployed Sepolia contract
    abi: claimAbi,
    functionName: "viewEvent",
    args: [BigInt(eventId)],
  });
  console.log("eventData:", eventData);

  /* Next Call `createLeaves` script */
  const { leaves } = await createLeaves(
    eventData.nftContract as string, // nft contract address
    Number(eventData.startBlock) as number, // block start
    Number(eventData.endBlock) as number, // block end
    Number(eventData.nfts) as number, // nfts / totalSupply
  );

  console.log("leaves:", leaves);

  /* Then call `createTree` script */

  const { tree, root } = await createTree(leaves);
  console.log("tree:", tree);
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
  console.log("ProofAndValue:", proofAndValue as any);
  return proofAndValue as any;
}
