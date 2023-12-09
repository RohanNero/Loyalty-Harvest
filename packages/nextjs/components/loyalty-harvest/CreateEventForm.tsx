"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { chainData } from "../../utils/scaffold-eth/networks";
import { createPublicClient, createWalletClient, custom, encodeFunctionData } from "viem";
import "viem/window";
import claimAbi from "~~/abi/Claim";
import ERC20Abi from "~~/abi/ERC20";
import ErrorPopup from "~~/components/loyalty-harvest/ErrorPopup";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

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
 */
export default function CreateEventForm() {
  const configuredNetwork = getTargetNetwork();
  // State to manage input values
  // const [account, setAccount] = useState<Address>();
  const [formData, setFormData] = useState({
    nftContract: "",
    rewardToken: "",
    rewardAmount: "",
    creator: "",
    root: "",
    blockStart: "",
    blockEnd: "",
    nfts: "",
    totalHeld: "",
  });
  // Uncomment and update this to include return values
  const [eventData, setEventData] = useState({
    hash: "",
    eventId: "",
  });

  // Used to display loading icon while event is being created
  const [isLoading, setIsLoading] = useState(false);

  // State variable for storing error messages
  const [errorMessage, setErrorMessage] = useState("");

  // State variable for showing/hiding the error popup
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // Function to handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Split the input value into an array
  };

  // Ensure all input inside the inputArray has an even length
  const hasEvenLength = async (inputArray: string[]) => {
    for (const input of inputArray) {
      console.log("input:", input);
      console.log("input length:", input.length);
      if (input.length % 2 != 0) {
        console.log(`Hexadecimal string with odd length: ${input}`);
        throw new Error(`Hexadecimal string with odd length: ${input}`);
      }
    }
  };

  // Ensure a string contains only valid hexadecimal characters
  const isValidHexString = async (inputArray: string[]) => {
    const hexRegex = new RegExp(/^0x[0-9A-Fa-f]+$/);
    for (const input of inputArray) {
      if (!hexRegex.test(input)) {
        console.log(`Hexadecimal string with invalid characters: ${input}`);
        throw new Error(`Hexadecimal string with invalid characters: ${input}`);
      }
    }
  };

  // Ensure a string contains only valid hexadecimal characters
  const isAddressCorrectLength = async (inputArray: string[]) => {
    for (const input of inputArray) {
      console.log("inputty:", input);
      console.log("input lengthy:", input.length);
      if (input.length != 42) {
        console.log(
          `Address with incorrect length: ${input}! Expected bytes: 20 Actual bytes: ${(input.length - 2) / 2}`,
        );
        throw new Error(
          `Address with incorrect length: ${input}! Expected bytes: 20 Actual bytes: ${(input.length - 2) / 2}`,
        );
      }
    }
  };

  // Format and check the input
  const checkInput = async () => {
    // Ensure all hexadecimal strings are even
    await hasEvenLength([formData.nftContract, formData.rewardToken, formData.creator, formData.root]);

    // Ensure all hexadecimal strings have 0x prefix and only valid characters
    await isValidHexString([formData.nftContract, formData.rewardToken, formData.creator, formData.root]);

    // Ensure all addresses are correct length (20 bytes)
    await isAddressCorrectLength([formData.nftContract, formData.rewardToken, formData.creator]);

    // Ensure merkle root is correct length (32 bytes) {
    if (formData.root.length != 66) {
      console.log(
        `Merkle root is the incorrect length! Expected bytes: 32, Actual bytes: ${(formData.root.length - 2) / 2}`,
      );
      throw new Error(
        `Merkle root is the incorrect length! Expected bytes: 32, Actual bytes: ${(formData.root.length - 2) / 2}`,
      );
    }

    // Ensure blockEnd is greater than blockStart
    if (formData.blockEnd <= formData.blockStart) {
      console.log(
        `blockEnd is less than blockStart! blockEnd: ${formData.blockEnd} blockStart: ${formData.blockStart}`,
      );
      throw new Error(
        `blockEnd is less than blockStart! blockEnd: ${formData.blockEnd} blockStart: ${formData.blockStart}`,
      );
    }

    // Ensure totalHeld is greater than zero
    if (parseInt(formData.totalHeld) <= 0) {
      console.log(`totalHeld is less than or equal to zero! totalHeld: ${formData.totalHeld}`);
      throw new Error(`totalHeld is less than or equal to zero! totalHeld: ${formData.totalHeld}`);
    }
  };

  // Function to handle closing the error popup
  const closeErrorPopup = () => {
    setShowErrorPopup(false);
    // Clear the error message
    setErrorMessage("");
  };

  // Function to handle displaying the error popup
  const displayErrorPopup = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setShowErrorPopup(true);
  };

  // Function to handle notifying the user with the custom popup
  const notifyUser = (errorMessage: string): void => {
    const duration = 10000;
    displayErrorPopup(errorMessage);

    // Close the popup after the specified duration
    setTimeout(closeErrorPopup, duration);
  };

  // Viem handle submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("handle submit reached");
    setIsLoading(true);

    // Connect to ethereum wallet
    if (!window.ethereum) {
      console.error("window.ethereum is undefined");
      return;
    }
    const walletClient = createWalletClient({
      transport: custom(window.ethereum),
      chain: configuredNetwork,
    });
    const [address] = await walletClient.requestAddresses();
    const claimAddress = chainData[configuredNetwork.id].claimAddress;

    // Check formData input and throw error if anything is invalid
    try {
      if (!claimAddress) {
        throw new Error("Claim address is undefined!");
      }
      await checkInput();
      const publicClient = createPublicClient({
        transport: custom(window.ethereum),
      });

      // Approve ERC20 to be `transferFrom`d to the `Claim.sol` contract
      console.log("reward token boolean:", formData.rewardToken !== "0x0000000000000000000000000000000000000000");
      if (formData.rewardToken !== "0x0000000000000000000000000000000000000000") {
        // First check if allowance is less than rewardAmount

        console.log("address:", address);
        const callData = encodeFunctionData({
          abi: ERC20Abi,
          functionName: "allowance",
          args: [address, claimAddress],
        });
        if (publicClient == undefined) {
          throw new Error("publicClient is undefined!");
        }
        console.log("allowanceCallData:", callData);
        const allowance = await publicClient.call({
          data: callData,
          to: formData.rewardToken, // hard-coded to sepolia `Silver.sol`
        });
        if (!allowance || !allowance.data) {
          throw new Error("Allowance is undefined!");
        }
        console.log("allowance:", allowance);
        console.log("allowanceInt:", parseInt(allowance.data));
        if (parseInt(allowance.data) < parseInt(formData.rewardAmount)) {
          console.log("Approving Claim.sol to transfer tokens...");
          const approveData = encodeFunctionData({
            abi: ERC20Abi,
            functionName: "approve",
            args: [claimAddress, BigInt(1e28)],
          });
          console.log("approveData:", approveData);
          const approveHash = await walletClient.sendTransaction({
            account: address,
            to: formData.rewardToken,
            data: approveData,
          });
          console.log("approveHash:", approveHash);
        }
      }

      // Encode tx data for createRewardEvent
      const data = encodeFunctionData({
        abi: claimAbi,
        functionName: "createRewardEvent",
        args: [
          formData.nftContract,
          formData.rewardToken,
          formData.creator,
          formData.root as `0x${string}`,
          BigInt(formData.blockStart),
          BigInt(formData.blockEnd),
          BigInt(formData.rewardAmount),
          BigInt(formData.nfts),
          BigInt(formData.totalHeld),
        ],
      });

      // Send the `createRewardEvent()` transaction
      const hash = await walletClient.sendTransaction({
        account: address,
        to: claimAddress,
        data,
      });
      console.log("hash:", hash);
      const transaction = await publicClient.waitForTransactionReceipt({ hash: hash as `0x${string}` });
      const logIndex = formData.rewardToken == "0x0000000000000000000000000000000000000000" ? 0 : 2;
      console.log("tx:", transaction);
      console.log("logs:", transaction.logs);
      const value = transaction.logs[logIndex].data;
      console.log("value:", value);
      const intValue = parseInt(value);
      console.log("parseValue:", intValue);

      setIsLoading(false);
      setEventData({ hash: hash, eventId: intValue.toString() });
    } catch (error: any) {
      if (error.toString().includes('InvalidAddressError: Address "undefined" is invalid.')) {
        console.log("error conditional reached");
        await notifyUser(
          error +
            " Ensure there is a claimAddress for your current chain inside utils/scaffold-eth/networks's chainData object",
        );
        setIsLoading(false);
        return;
      }
      // Notify user with an error pop up
      await notifyUser(error);
      // Set loading to false since an error occurred
      setIsLoading(false);
      return;
    }
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
    <div className="bg-secondary font-mono py-3 mb-4 flex-col flex items-center justify-center w-2/3">
      <h3 className="text-xl text-base-100 justify-self-center mb-4">Create Reward Event</h3>
      <form className="text-center w-full grid grid-cols-2 gap-2 items-center justify-center" onSubmit={handleSubmit}>
        <div className="col-span-1">
          <input
            type="text"
            name="nftContract"
            placeholder="NFT Contract Address"
            className="border  p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.nftContract}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="rewardToken"
            placeholder="Reward Token Address"
            className="border p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.rewardToken}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="number"
            name="rewardAmount"
            placeholder="Reward Token Amount"
            className="border p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.rewardAmount}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="creator"
            placeholder="Creator Address"
            className="border p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.creator}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="root"
            placeholder="Merkle Root"
            className="border p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.root}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="number"
            name="blockStart"
            placeholder="Block starting number"
            className="border p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.blockStart}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="number"
            name="blockEnd"
            placeholder="Block ending number"
            className="border p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.blockEnd}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="number"
            name="nfts"
            placeholder="Amount of NFTs"
            className="border p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.nfts}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="number"
            name="totalHeld"
            placeholder="Total blocks held"
            className="border p-1.5 text-purple-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={formData.totalHeld}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <button
            type="submit"
            className="bg-secondary border text-base-100 rounded my-2 px-4 py-2 bg-gradient-to-r from-green-200 via-secondary to-green-200 hover:via-green-200 hover:to-green-200 hover:shadow-lg hover:-translate-y-1 hover:bg-green-300 w-full"
          >
            Create
          </button>
        </div>
      </form>
      {/* Conditionally render the loading object */}
      {isLoading && <div className="text-lg text-purple-700 font-semibold">Loading... </div>}

      {/* Button to copy hash and eventId to clipboard */}
      {eventData.hash !== "" && eventData.eventId !== "" && (
        <div className="flex justify-center gap-7">
          <button
            onClick={copyEventId}
            title="Click to copy"
            className="bg-secondary border text-base-100 rounded my-2 px-4 py-2 hover:shadow-lg hover:-translate-y-1 hover:bg-green-200 w-1/3"
          >
            {`EventId: ${eventData.eventId}`}
          </button>
          <button
            onClick={copyHash}
            title="Click to copy"
            className="bg-secondary truncate border text-base-100 rounded my-2 px-4 py-2 hover:shadow-lg hover:-translate-y-1 hover:bg-green-200 w-1/3"
          >
            {`Hash: ${eventData.hash}`}
          </button>
        </div>
      )}

      {/* Conditionally render the custom error popup */}
      {showErrorPopup && <ErrorPopup errorMessage={errorMessage} onClose={closeErrorPopup} />}
    </div>
  );
}
