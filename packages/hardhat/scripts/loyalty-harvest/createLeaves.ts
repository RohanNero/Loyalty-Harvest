import * as dotenv from "dotenv";
import Web3 from "web3";
import { nftAbi } from "../../abi/NFT.json";

dotenv.config({ path: "/home/trauki/portfolio/ScaffoldLoyaltyHarvest/packages/hardhat/.env" });

// Public Sepolia RPC URL list
//const url = "https://eth-sepolia.public.blastapi.io"; //`eth_getLogs` doesn't work
//const url = "https://rpc2.sepolia.org"; // `missing trie node`
//const url = "https://ethereum-sepolia.blockpi.network/v1/rpc/public"; // `missing trie node`
//const url = "https://eth-sepolia-public.unifra.io"; // `missing trie node`
//const url = "https://eth-sepolia.g.alchemy.com/v2/demo"; // exceeded concurrent requests capacity <-- ALCHEMY
//const url = "https://eth-sepolia.g.alchemy.com/v2/" + process.env.SEPOLIA_RPC_URL;

const testing = true;
let url;
//let senderAddress;
if (testing) {
  url = "http://127.0.0.1:8545/";
  //senderAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
} else {
  url = "https://eth-sepolia.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY;
  // senderAddress = "0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E";
}
const web3 = new Web3(url);
// Used to view the NFT holders at `blockStart`
// This worked perfectly on Sepolia, but returned an error on Anvil and Hardhat network.
/*async function getOwnerAtBlock(nftContract: any, tokenId: number, blockNumber: number) {
  //console.log("nft methods:", nftContract.methods);
  const contractCall = await nftContract.methods.ownerOf(tokenId);
  const owner = await contractCall.call({ from: senderAddress }, blockNumber);
  //const owner = await contractCall.call([, blockNumber]);
  console.log("owner:", owner);
  //console.log("contractCall:", contractCall);
  return owner;
} */

// This works on Sepolia, Anvil, and Hardhat, however, the address needs to be formatted.
async function getOwnerAtBlock(nftContract: any, tokenId: number, blockStart: number) {
  const transactionObject = {
    to: nftContract.options.address,
    data: nftContract.methods.ownerOf(tokenId).encodeABI(), // Encode the function call
  };

  // View owner of `tokenId` at `blockStart`
  const owner = await web3.eth.call(transactionObject, blockStart);
  const formattedOwner = "0x" + owner.slice(-40);

  return formattedOwner;
}

/** This function returns an array of leaves that can be used to create a Merkle tree
 * INPUT:
 * 1. nftAddress is the address of the NFT collection to use
 * 2. blockStart is the starting block number of the reward period
 * 3. blockEnd is the ending block number of the reward period
 * 4. totalSupply is the total amount of NFTs, which will be the total number of leaves
 */
export default async function createLeaves(
  nftAddress: string,
  blockStart: number,
  blockEnd: number,
  totalSupply: number,
) {
  const leaves = [];

  const nftContract = new web3.eth.Contract(nftAbi, nftAddress); // Replace ABI with your NFT contract's ABI
  console.log("nftContract object created");
  // Loop through NFTs and set initial leaf data
  for (let tokenId = 0; tokenId < totalSupply; tokenId++) {
    const holderAddress = await getOwnerAtBlock(nftContract, tokenId, blockStart);
    //console.log("methods:", nftContract.methods);
    //const holderAddress = await nftContract.methods.ownerOf(tokenId).call([, blockStart]);
    console.log("holderAddress:", holderAddress);
    const initialLeafData = [holderAddress, nftAddress, tokenId.toString(), "0"]; // Default heldUntil as 0
    leaves.push(initialLeafData);
  }
  // Loop through blocks to update heldUntil for transferred NFTs
  console.log("Loop through blocks to update heldUntil...");
  console.log("leaves:", leaves);
  for (let blockNumber = blockStart; blockNumber <= blockEnd; blockNumber++) {
    const transferEventName = "Transfer";
    const filter = {
      event: transferEventName,
      fromBlock: blockNumber,
      toBlock: blockNumber,
    };

    const events = await nftContract.getPastEvents("allEvents", filter);
    // const events = await nftContract.getPastEvents("Transfer", {
    //   fromBlock: blockNumber,
    //   toBlock: blockNumber,
    // });
    //console.log("events:", events);
    for (const event of events) {
      const tokenId = typeof event === "string" ? "" : (event.returnValues?.tokenId as any) || "";

      /* Temp fix to events showing transfers for more NFTs than the ones being covered in the event
          For example if the rewardEvent's total NFTs are 4 but there are `Transfer` events being emitted 
          for NFTs other than the 4 included in the `RewardEvent`. */
      if (tokenId >= totalSupply) {
        break;
      }
      const leafIndex = tokenId; // Assuming tokenId corresponds to leaf index
      console.log("leafIndex:", leafIndex);
      console.log(leaves[leafIndex][3]);
      leaves[leafIndex][3] = blockNumber.toString(); // Update heldUntil
      console.log("reached");
    }
  }

  // Set default/0 value heldUntil to blockEnd for remaining NFTs
  console.log("Setting remaining `heldUntil` values to `blockEnd`...");
  for (let i = 0; i < leaves.length; i++) {
    if ((leaves as any)[i][3] === "0") {
      (leaves as any)[i][3] = blockEnd.toString();
    }
  }
  // Calculate the `totalHeld` value
  // Loop through finished leaves array and get sum of all heldUntil times
  let totalHeld = 0;
  for (let i = 0; i < leaves.length; i++) {
    const held = Number(leaves[i][3]) - blockStart;
    totalHeld += held;
  }

  console.log("script values:", totalHeld);
  // Finally return the `leaves` and `totalHeld` variables
  return { leaves: leaves, totalHeld: totalHeld };
}

// Call the createLeaves function and log the resulting leaves
// createLeaves("0x52469E13ac6DdbFbf803F48E7106f8294E2B888f", 4283020, 4283030, 7)
//   .then((leaves) => {
//     console.log("Merkle Tree Leaves:");
//     console.log(leaves);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
