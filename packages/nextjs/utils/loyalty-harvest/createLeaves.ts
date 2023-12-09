import nftAbi from "../../abi/NFT";
import { createPublicClient, custom } from "viem";

// This function gets the owner of all nfts at starting block number
async function getOwnerAtBlock(nftAddress: string, tokenId: number, blockStart: number) {
  if (!window || !window.ethereum) {
    console.log("window is undefined!");
    return;
  }
  const publicClient = createPublicClient({
    transport: custom(window.ethereum),
    //transport: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
  });
  const owner = await publicClient.readContract({
    address: nftAddress,
    abi: nftAbi,
    functionName: "ownerOf",
    args: [BigInt(tokenId)],
    blockNumber: BigInt(blockStart),
  });
  return owner;
}

// This function gets all the `Transfer` events during the reward event timeframe
async function getTransferEvents(nftAddress: string, blockStart: number, blockEnd: number) {
  if (!window || !window.ethereum) {
    console.log("window is undefined!");
    return;
  }
  //Initialize viem public client
  const publicClient = createPublicClient({
    transport: custom(window.ethereum),
    // transport: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
  });
  console.log("blockStart:", +blockStart + 1);
  const adjustedStart = +blockStart + 1;

  const events = await publicClient.getContractEvents({
    address: nftAddress,
    abi: nftAbi,
    eventName: "Transfer",
    fromBlock: BigInt(adjustedStart),
    toBlock: BigInt(blockEnd),
  });
  return events;
}

// This function gets the total amount of blocks that all nfts were held for
async function getTotalHeldUntil(leaves: any[], blockStart: number) {
  let totalHeld = 0;
  for (let i = 0; i < leaves.length; i++) {
    const held = Number(leaves[i][3]) - blockStart;
    totalHeld += held;
  }
  return totalHeld;
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
  console.log("createLeaves input:", nftAddress, blockStart, blockEnd, totalSupply);
  const leaves = [];

  // Loop through NFTs and set initial leaf data
  for (let tokenId = 0; tokenId < totalSupply; tokenId++) {
    const holderAddress = await getOwnerAtBlock(nftAddress, tokenId, blockStart);
    const initialLeafData = [holderAddress, nftAddress, tokenId.toString(), blockEnd.toString()]; // Default heldUntil as blockEnd
    leaves.push(initialLeafData);
  }

  // Get all the Transfer events for reward event
  const events = await getTransferEvents(nftAddress, blockStart, blockEnd);

  if (events) {
    // Loop through the Transfer events to set `heldUntil` block for respective NFTs
    console.log("leaves:", leaves);
    console.log("events:", events);
    for (const event of events) {
      leaves[Number(event.args.tokenId)][3] = event.blockNumber.toString();
    }
  }

  // Calculate the `totalHeld` value by looping through the
  // finished leaves array and geting the sum of all heldUntil times
  const totalHeld = await getTotalHeldUntil(leaves, blockStart);

  // Finally return the `leaves` and `totalHeld` variables
  return { leaves, totalHeld };
}
