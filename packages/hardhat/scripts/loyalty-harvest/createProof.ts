import Web3 from "web3";
// These two abi imports essentially do the same thing, one is .ts and one is .json
// .ts may be better option, originally swapped to it to debug a type error
// import { claimAbi } from "../../abi/ClaimV2.json";
import claimAbi from "../../abi/Claim";
import * as dotenv from "dotenv";
dotenv.config({ path: "/home/trauki/portfolio/ScaffoldLoyaltyHarvest/packages/hardhat/.env" });
import createLeaves from "./createLeaves";
import createTree from "./createTree";

//import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

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
  // Connect to the `Claim` contract
  // const web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY);
  const testing: boolean = true;
  let web3;
  let claimAddress;
  if (testing) {
    web3 = new Web3("http://127.0.0.1:8545/");
    claimAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
  } else {
    web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY);
    claimAddress = "0x2d21A9Fc8fb893f648aa9607A17FE595EAC12663";
  }
  const claimContract = new web3.eth.Contract(claimAbi, claimAddress);
  console.log("methods:", claimContract.methods);
  // Hardhat network cries like a baby if you try to call the function like this
  //const eventData = await claimContract.methods.viewEvent(eventId).call();

  // This function call should take `eventId` as an argument but yarn next type check errors when I try...
  //const txData = claimContract.methods.viewEvent();
  //const txData = claimContract.methods["viewEvent(uint256)"](eventId);
  // const txData = claimContract.methods["0x24923f5f"](eventId);
  // This "ugly" fix was found here: https://github.com/web3/web3.js/issues/6275#issuecomment-1650199729
  const txData = (claimContract.methods.viewEvent as any)(eventId);
  // Hardhat network little baby version
  const transactionObject = {
    to: claimContract.options.address!,
    data: txData.encodeABI(), // Encode the function call
  };

  // This code comment is on line 43
  const eventData = await web3.eth.call(transactionObject as any); // Assuming you have a 'web3' instance
  console.log("eventData:", eventData);
  // depreciated
  //console.log("blockStart:", eventData.startBlock);

  const decodedData = web3.eth.abi.decodeParameters(
    [
      "address", // nftContract
      "address", // rewardToken
      "address", // creator
      "bytes32", // merkleRoot
      "uint256", // startBlock
      "uint256", // endBlock
      "uint256", // rewardAmount
      "uint256", // nfts
      "uint256", // totalHeld
      "uint256", // eventId
    ],
    eventData,
  );

  console.log("Decoded Data:", decodedData);

  /* Next Call `createLeaves` script */
  const { leaves } = await createLeaves(
    decodedData[0] as string, // nft contract address
    parseInt(decodedData[4] as string), // block start
    parseInt(decodedData[5] as string), // block end
    parseInt(decodedData[7] as string), // nfts / totalSupply
  );

  //console.log("leaves:", leaves);

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

//const loadedMerkleTree = StandardMerkleTree.load(JSON.parse(fs.readFileSync("trees/tree_00.json", "utf8")));

// // Call the createProof function and log the resulting Merkle proof
// createProof(loadedMerkleTree, "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E")
//   .then(proof => {
//     console.log("Merkle Proof:");
//     console.log(proof);
//   })
//   .catch(error => {
//     console.error("Error:", error);
//   });
