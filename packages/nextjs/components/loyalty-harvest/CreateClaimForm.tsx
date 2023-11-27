"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  decodeFunctionData,
  decodeFunctionResult,
  encodeFunctionData,
} from "viem";
import { sepolia } from "viem/chains";
import "viem/window";
import claimAbi from "~~/abi/Claim";
import ErrorPopup from "~~/components/loyalty-harvest/ErrorPopup";

/** This function allows anyone to send a transaction to `claim()` or `claimWithSignature()` in the `Claim.sol` contract
 * 
 *
 * Input:
 * 1. Proof - the merkle proof array
 * ClaimInfo Object (2-6)
 * 2. holder - the address that held the reward
 * 3. to - the address the reward will be sent to
 * 4. eventId - the Reward Event's eventId
 * 5. tokenId - the NFT's tokenId
 * 6. heldUntil - the block number the user held their NFT until
 * 7. signature - OPTIONAL - holder signature containing the `to` address
 *
 * OUTPUT:
 * 
 * 1. reward - amount of rewards the user received 
 * 
 * 
  TEMP THOUGHTS:
  1. I should probably view the reward token address and return a label saying what the currency is in
    - Just need to view the `rewardAddress` and then make a `symbol()`/`name()` call to see what it is
  */
export default function CreateClaimForm() {
  // State to manage input values
  const [data, setData] = useState({
    proof: [],
    holder: "",
    to: "",
    eventId: "",
    tokenId: "",
    heldUntil: "",
    signature: "",
    hash: "",
    claimed: "",
    loading: false,
  });

  // State variable for storing error messages
  const [errorMessage, setErrorMessage] = useState("");

  // State variable for showing/hiding the error popup
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // Initialize Viem client objects
  if (!window.ethereum) {
    console.log("Window.ethereum is undefined!");
    throw new Error("Window.ethereum is undefined!");
  }
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: custom(window.ethereum),
  });

  // Function to handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value }); // Split the input value into an array
  };

  // Ensure all input inside the inputArray has an even length (all hex strings)
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

  // Ensure hex strings contains 0x prefix and only valid characters
  const isValidHexString = async (inputArray: string[]) => {
    const hexRegex = new RegExp(/^0x[0-9A-Fa-f]+$/);
    for (const input of inputArray) {
      if (!hexRegex.test(input)) {
        console.log(`Hexadecimal string with invalid characters: ${input}`);
        throw new Error(`Hexadecimal string with invalid characters: ${input}`);
      }
    }
  };

  // Ensure addresses contain exactly 20 bytes
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

  // Ensure tokenId is greater than or equal to zero
  const isValidTokenId = async () => {
    if (parseInt(data.tokenId) < 0) {
      console.log(`tokenId is less than or equal to zero! tokenId: ${data.tokenId}`);
      throw new Error(`tokenId is less than or equal to zero! tokenId: ${data.tokenId}`);
    }
  };

  // Ensure proofs are correct length
  const isValidProof = async (proofValue: string) => {
    if (proofValue.length != 66 && proofValue.length % 2 == 0) {
      console.log(
        `Proof value is the incorrect length! Expected bytes: 32, Actual bytes: ${(proofValue.length - 2) / 2}`,
      );
      throw new Error(
        `Proof value is the incorrect length! Expected bytes: 32, Actual bytes: ${(proofValue.length - 2) / 2}`,
      );
    }
  };

  // Ensure the eventId is valid
  const isValidEventId = async (eventId: string) => {
    const callData = encodeFunctionData({
      abi: claimAbi,
      functionName: "viewEventMapLength",
    });
    const length = await publicClient.call({
      data: callData,
      to: "0x01cA0957898BfB42d7620a355d98014a4731Ea8D",
    });
    if (!length || !length.data) {
      console.log("Error getting the eventMap length!");
      throw new Error("Error getting the eventMap length!");
    }
    if (parseInt(length.data.toString()) <= parseInt(eventId)) {
      console.log(
        `Invalid eventId! Input: ${eventId} Total Events: ${parseInt(length.data)} (eventIds use zero-based numbering)`,
      );
      throw new Error(
        `Invalid eventId! Input: ${eventId} Total Events: ${parseInt(length.data)} (eventIds use zero-based numbering)`,
      );
    }
  };

  // Ensure the heldUntil block is valid
  const isValidHeldUntil = async (eventId: string, heldUntil: string) => {
    if (!window.ethereum) {
      console.log("window.ethereum is undefined!");
      throw new Error("window.ethereum is undefined!");
    }
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: custom(window.ethereum),
    });
    const callData = encodeFunctionData({
      abi: claimAbi,
      functionName: "viewEvent",
      args: [BigInt(eventId)],
    });
    const eventData = await publicClient.call({
      data: callData,
      to: "0x01cA0957898BfB42d7620a355d98014a4731Ea8D",
    });
    console.log("eventData:", eventData);
    if (!eventData.data) {
      console.log("Event data error!");
      throw new Error("Event data error!");
    }

    const value = decodeFunctionResult({
      abi: claimAbi,
      functionName: "viewEvent",
      data: eventData.data,
    });
    console.log("value:", value);
    if (value.endBlock < Number(heldUntil)) {
      console.log(`Invalid heldUntil! Input: ${heldUntil} Event End: ${value.endBlock}`);
      throw new Error(`Invalid heldUntil! Input: ${heldUntil} Event End: ${value.endBlock}`);
    }
  };

  // Format and check the input
  const checkInput = async () => {
    // Format args to pass for input check helper functions since data.proof is an array itself
    const inputArgs: string[] = [];
    const proofs = (data.proof as string[])
      .toString()
      .split(",")
      .map(item => `${item}` as string);
    for (const proofValue of proofs) {
      await isValidProof(proofValue);
      inputArgs.push(proofValue);
    }
    inputArgs.push(data.holder);
    inputArgs.push(data.to);

    await hasEvenLength(inputArgs);
    await isValidHexString(inputArgs);
    await isAddressCorrectLength([data.holder, data.to]);
    await isValidTokenId();

    // "Advanced" Error handling (smart contract calls)
    await isValidEventId(data.eventId);
    await isValidHeldUntil(data.eventId, data.heldUntil);
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
    setData(prevData => ({
      ...prevData,
      loading: true,
      hash: "",
      claimed: "",
    }));

    console.log("claimAbi:", claimAbi);

    // Connect to ethereum wallet
    if (!window.ethereum) {
      console.error("window.ethereum is undefined");
      return;
    }
    const walletClient = createWalletClient({
      chain: sepolia,
      transport: custom(window.ethereum),
    });
    const [address] = await walletClient.requestAddresses();

    // Check formData input and throw error if anything is invalid
    try {
      await checkInput();
    } catch (error: any) {
      // Notify user with an error pop up
      await notifyUser(error);
      // Set loading to false since an error occurred
      setData(prevData => ({
        ...prevData,
        loading: false,
      }));
      return;
    }

    // Encode tx data depending on which function is being called
    let txData;
    if (data.signature == "") {
      console.log("Encoding for `claim()`...");
      txData = encodeFunctionData({
        abi: claimAbi,
        functionName: "claim",
        args: [
          data.proof.toString().split(",") as readonly `0x${string}`[],
          {
            holder: data.holder,
            to: data.to,
            tokenId: BigInt(data.tokenId),
            eventId: BigInt(data.eventId),
            heldUntil: BigInt(data.heldUntil),
          },
        ],
      });
    } else {
      console.log("Encoding for `claimWithSignature()`...");
      txData = encodeFunctionData({
        abi: claimAbi,
        functionName: "claimWithSignature",
        args: [
          data.proof
            .toString()
            .split(",")
            .map((item: string) => `0x${item}` as const),
          data.signature as `0x${string}`,
          {
            holder: data.holder,
            to: data.to,
            tokenId: BigInt(data.tokenId),
            eventId: BigInt(data.eventId),
            heldUntil: BigInt(data.heldUntil),
          },
        ],
      });
    }
    console.log("txData:", txData);
    const { functionName, args } = decodeFunctionData({
      abi: claimAbi,
      data: txData,
    });
    console.log("function name:", functionName);
    console.log("args:", args);
    // Send the `createRewardEvent()` transaction
    let hash: string | undefined;
    try {
      hash = await walletClient.sendTransaction({
        account: address,
        to: "0x01cA0957898BfB42d7620a355d98014a4731Ea8D", // hard-coded to sepolia `claim.sol`
        // to: "0x2427F2289D88121fAeEdBfb1401069DE7ebA31Da", // hard-coded to sepolia `claim.sol` - Broken
        data: txData,
      });
    } catch (error: any) {
      // Notify user with an error pop up
      await notifyUser(error);
      // Set loading to false since an error occurred
      setData(prevData => ({
        ...prevData,
        loading: false,
      }));
      return;
    }

    console.log("hash:", hash);
    const transaction = await publicClient.waitForTransactionReceipt({ hash: hash as `0x${string}` });
    const value = transaction.logs[0].data;
    console.log("parseValue:", parseInt(value));

    console.log("Tx successfully executed!");
    setData(prevData => ({
      ...prevData,
      hash: hash !== undefined ? hash : prevData.hash,
      loading: false,
      claimed: parseInt(value).toString(),
    }));
  };

  // Function to handle copying transaction hash to clipboard
  const copyHash = () => {
    navigator.clipboard
      .writeText(data.hash)
      .then(() => {
        console.log("Transaction Hash copied to clipboard!");
      })
      .catch(error => {
        console.error("Failed to copy merkle data to clipboard: ", error);
        alert("Failed to copy merkle data to clipboard");
      });
  };

  return (
    <div className="bg-green-300 font-mono py-3 mb-4 w-1/2 flex-col flex items-center justify-center w-2/3">
      <h3 className="text-xl text-[#10B981] justify-self-center mb-4">Create Claim</h3>
      <form className="text-center w-full grid grid-cols-2 gap-2 items-center justify-center" onSubmit={handleSubmit}>
        <div className="col-span-1">
          <input
            type="text"
            name="proof"
            placeholder="Proof"
            className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={data.proof}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="holder"
            placeholder="Holder address"
            className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={data.holder}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="to"
            placeholder="To address"
            className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={data.to}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="eventId"
            placeholder="Event Id"
            className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={data.eventId}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="tokenId"
            placeholder="Token Id"
            className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={data.tokenId}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="heldUntil"
            placeholder="Held until"
            className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={data.heldUntil}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="signature"
            placeholder="Signature"
            className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-full bg-green-200 hover:bg-green-300"
            value={data.signature}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <button
            type="submit"
            disabled={
              data.proof.length === 0 ||
              data.holder.trim() === "" ||
              data.to.trim() === "" ||
              data.eventId.trim() === "" ||
              data.tokenId.trim() === "" ||
              data.heldUntil.trim() === ""
            }
            className="bg-purple-700 border rounded my-2 px-4 py-2 bg-gradient-to-r from-secondary via-green-200 to-secondary hover:from-secondary hover:to-secondary text-secondary hover:text-base-100 hover:shadow-lg hover:-translate-y-1 hover:bg-green-300 w-full"
          >
            Create
          </button>
        </div>
      </form>
      {data.loading && <div className="text-lg text-purple-700 font-semibold">Loading... </div>}
      {/* Conditionally render the custom error popup */}
      {showErrorPopup && <ErrorPopup errorMessage={errorMessage} onClose={closeErrorPopup} />}
      {/* Conditionally render the button to copy tx hash and the amount the user claimed*/}
      {data.hash != "" && (
        <div className="w-full flex gap-3">
          <button
            onClick={copyHash}
            title="Click to copy"
            className="bg-purple-700 border-purple-800 border text-green-300 truncate rounded my-2 px-4 py-2 bg-gradient-to-r from-green-400 to-purple-700 hover:to-purple-500 hover:from-green-300 hover:text-purple-600 hover:shadow-lg hover:-translate-y-1 hover:bg-green-300 w-1/2"
          >
            Hash: {data.hash}
          </button>
          <div className="text-center bg-purple-700 border-purple-800 border text-green-300 rounded my-2 px-4 py-2 bg-gradient-to-r from-green-400 to-purple-700 hover:to-purple-500 hover:from-green-300 hover:text-purple-600 hover:shadow-lg hover:-translate-y-1 hover:bg-green-300 w-1/2">
            Claimed: {data.claimed}
          </div>
        </div>
      )}
    </div>
  );
}
