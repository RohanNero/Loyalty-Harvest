"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAccount } from "wagmi";
// import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

//import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

//import createLeaves from "../../backend/js/createLeaves";
// Route handler api call, not sure how to use route handlers currently lol
//import { POST } from "../src/app/api/route";
// Used to ensure that the call suceeds past `exceeded rate limit` error
//import retry from "async-retry";

/** This function creates a `RewardEvent` by calling `createRewardEvent` in the `Claim.sol` contract
 *
 * Input:
 * 1. nftContract- nft contract address
 * 2. rewardToken - token address of reward token
 * 3. rewardAmount - amount of reward tokens
 * 4. creator - address of the event organizer/creator
 * 5. root - root of the Merkle Tree
 * 6. blockStart - starting block number of the event
 * 7. blockEnd - ending block number of the event
 * 8. nfts - number of NFTs eligble for rewards
 * 9. totalHeld - total number of blocks any NFT was held for during the event
 *
 * OUTPUT:
 * 
 * What output would this return?
 * 1. `createRewardEvent()` tx hash
 * 2. `eventId` of the created event (used to track merkle trees in the database)
 * 
 * 
  TEMP THOUGHTS:
  1. We probably don't need to pass `root` since we can calculate it from the tree, more explicit but not needed.
  */
export default function CreateEventForm() {
  const { address } = useAccount();
  console.log("address:", address);
  // State to manage input values
  const [formData, setFormData] = useState({
    nftContract: "",
    rewardToken: "",
    rewardAmount: 0,
    creator: "",
    root: "",
    blockStart: 0,
    blockEnd: 0,
    nfts: 0,
    totalHeld: 0,
  });
  // Uncomment and update this to include return values
  const [eventData, setEventData] = useState({
    hash: "",
    eventId: "",
  });

  // Used to display loading icon while event is being created
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Split the input value into an array
  };

  // Function to handle form submission
  // const handleSubmit = async e => {
  //   console.log("prevent");
  //   e.preventDefault();
  //   console.log("default prevented");
  //   try {
  //     //console.log("formData:", formData);
  //     // `fetch` eventData using `createMerkleAPI`
  //     setIsLoaing(true);
  //     setEventData(undefined);
  //     const eventData = await fetch("/api/createEventAPI", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     const json = await eventData.json();
  //     console.log("EventData:", json);
  //     setIsLoaing(false);
  //     setEventData(json);
  //     console.log("useState data:", eventData);
  //     // Return the result
  //     return json;
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // Tx with Scaffold ETH hook
  const { writeAsync: createEvent } = useScaffoldContractWrite({
    contractName: "Claim",
    functionName: "createRewardEvent",
    args: [
      formData.nftContract,
      formData.rewardToken,
      formData.creator,
      `0x${formData.root}`, // Ensure 'root' is formatted as expected
      BigInt(formData.blockStart), // Convert numbers to bigint
      BigInt(formData.blockEnd),
      BigInt(formData.rewardAmount),
      BigInt(formData.nfts),
      BigInt(formData.totalHeld),
    ],
    value: BigInt(0),
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  // Scaffold-eth handle submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("handle submit reached");
    setIsLoading(true);
    await createEvent();
    console.log(isLoading);
    //console.log(writeAsync);
    console.log("wrote async?");
    setIsLoading(false);
    setEventData({ hash: "", eventId: "" });
  };

  // Function to handle copying transaction hash to clipboard
  const copyHash = () => {
    const hashText = JSON.stringify(eventData.hash, null, 2); // Convert leaves data to a nicely formatted JSON string
    navigator.clipboard
      .writeText(hashText)
      .then(() => {
        console.log("Transaction Hash copied to clipboard!");
      })
      .catch(error => {
        console.error("Failed to copy merkle data to clipboard: ", error);
        alert("Failed to copy merkle data to clipboard");
      });
  };

  // Function to handle copying eventId to clipboard
  const copyEventId = () => {
    const eventIdText = JSON.stringify(eventData.eventId, null, 2); // Convert leaves data to a nicely formatted JSON string
    navigator.clipboard
      .writeText(eventIdText)
      .then(() => {
        console.log("Event Id copied to clipboard!");
      })
      .catch(error => {
        console.error("Failed to copy merkle data to clipboard: ", error);
        alert("Failed to copy merkle data to clipboard");
      });
  };

  return (
    <div className="bg-purple-400 font-mono py-3 mb-4 w-1/2 flex-col flex items-center justify-center w-2/3">
      <h3 className="text-xl text-green-300 justify-self-center mb-4">Create Reward Event</h3>
      <form className="text-center w-full grid grid-cols-2 gap-2 items-center justify-center" onSubmit={handleSubmit}>
        <div className="col-span-1">
          <input
            type="text"
            name="nftContract"
            placeholder="NFT Contract Address"
            className="border border-purple-500 p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.nftContract}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="rewardToken"
            placeholder="Reward Token Address"
            className="border border-purple-500 p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.rewardToken}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="rewardAmount"
            placeholder="Reward Token Amount"
            className="border border-purple-500 p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.rewardAmount}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="creator"
            placeholder="Creator Address"
            className="border border-purple-500 p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.creator}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="root"
            placeholder="Merkle Root"
            className="border border-purple-500 p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover-bg-green-300"
            value={formData.root}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="blockStart"
            placeholder="Block starting number"
            className="border border-purple-500 p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.blockStart}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="blockEnd"
            placeholder="Block ending number"
            className="border border-purple-500 p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.blockEnd}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="nfts"
            placeholder="Amount of NFTs"
            className="border border-purple-500 p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.nfts}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="totalHeld"
            placeholder="Total blocks held"
            className="border border-purple-500 p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.totalHeld}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <button
            type="submit"
            className="bg-purple-700 border-purple-800 border text-green-300 rounded my-2 px-4 py-2 bg-gradient-to-r from-green-400 to-purple-700 hover:to-purple-500 hover:from-green-300 hover:text-purple-600 hover:shadow-lg hover:-translate-y-1   hover:bg-green-300 w-full"
          >
            Create
          </button>
        </div>
      </form>
      {/* Conditionally render the result */}
      {/* {eventData && eventData.success && (
        <div className="mt-4 p-3 border border-purple-700 rounded bg-green-200">
          <h4 className="text-lg font-semibold text-purple-700 mb-2">Merkle Root:</h4>
          <div className="text-lg font-semibold text-purple-400 mb-2">{eventData.root} </div>
        </div>
      )} */}
      {isLoading && <div className="text-lg text-purple-700 font-semibold">Loading... </div>}
      {/* Button to copy leaves data to clipboard */}
      {eventData.hash !== "" && eventData.eventId !== "" && (
        <div className="flex gap-7">
          <button
            onClick={copyEventId}
            className="bg-purple-700 border-purple-800 border text-green-300 rounded my-2 px-4 py-2 bg-gradient-to-r from-green-400 to-purple-700 hover:to-purple-500 hover:from-green-300 hover:text-purple-600 hover:shadow-lg hover:-translate-y-1 hover:bg-green-300 w-1/2"
          >
            Copy Event Id
          </button>
          <button
            onClick={copyHash}
            className="bg-purple-700 border-purple-800 border text-green-300 rounded my-2 px-4 py-2 bg-gradient-to-r from-green-400 to-purple-700 hover:to-purple-500 hover:from-green-300 hover:text-purple-600 hover:shadow-lg hover:-translate-y-1 hover:bg-green-300 w-1/2"
          >
            Copy Transaction hash to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}
