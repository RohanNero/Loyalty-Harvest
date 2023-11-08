"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

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
    claimed: "",
    loading: false,
  });

  // Function to handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value }); // Split the input value into an array
  };

  // Function to handle form submission
  //   const handleSubmit = async e => {
  //     e.preventDefault();
  //     try {
  //       //console.log("formData:", formData);
  //       // `fetch` eventData using `createMerkleAPI`
  //       setData(prevData => ({
  //         ...prevData,
  //         claimed: "",
  //         loading: true,
  //       }));
  //       const claimData = await fetch("/api/createClaimAPI", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });
  //       const json = await claimData.json();
  //       console.log("data:", json);
  //       setData(prevData => ({
  //         ...prevData,
  //         claimed: json,
  //         loading: false,
  //       }));
  //       console.log("useState data:", eventData);
  //       // Return the result
  //       return json;
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  // Tx with Scaffold ETH hook
  const { writeAsync: createClaim } = useScaffoldContractWrite({
    contractName: "Claim",
    functionName: "claim",
    args: [
      data.proof
        .toString()
        .split(",")
        .map(item => `0x${item}` as `0x${string}`), // Convert strings to the required format
      {
        holder: data.holder,
        to: data.to,
        eventId: BigInt(data.eventId), // Convert to bigint
        tokenId: BigInt(data.tokenId), // Convert to bigint
        heldUntil: BigInt(data.heldUntil), // Convert to bigint
      },
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
    //setIsLoading(true);
    console.log("proof split:", data.proof.toString().split(","));

    await createClaim();
    //console.log(isLoading);
    //console.log(writeAsync);
    console.log("wrote async?");
    //setIsLoading(false);
    //setEventData({ hash: "", eventId: "" });
  };

  // Function to handle copying transaction hash to clipboard
  //   const copyClaim = () => {
  //     const hashText = JSON.stringify(eventData.hash, null, 2); // Convert leaves data to a nicely formatted JSON string
  //     navigator.clipboard
  //       .writeText(hashText)
  //       .then(() => {
  //         console.log("Transaction Hash copied to clipboard!");
  //       })
  //       .catch(error => {
  //         console.error("Failed to copy merkle data to clipboard: ", error);
  //         alert("Failed to copy merkle data to clipboard");
  //       });
  //   };

  return (
    <div className="bg-green-300 font-mono py-3 mb-4 w-1/2 flex-col flex items-center justify-center w-2/3">
      <h3 className="text-xl text-purple-400 justify-self-center mb-4">Create Reward Event</h3>
      <form className="text-center w-full grid grid-cols-2 gap-2 items-center justify-center" onSubmit={handleSubmit}>
        <div className="col-span-1">
          <input
            type="text"
            name="proof"
            placeholder="Proof"
            className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-full bg-purple-200 hover:bg-purple-300"
            value={data.proof}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="holder"
            placeholder="Holder address"
            className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-full bg-purple-200 hover:bg-purple-300"
            value={data.holder}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="to"
            placeholder="To address"
            className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-full bg-purple-200 hover:bg-purple-300"
            value={data.to}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="eventId"
            placeholder="Event Id"
            className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-full bg-purple-200 hover:bg-purple-300"
            value={data.eventId}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="tokenId"
            placeholder="Token Id"
            className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-full bg-purple-200 hover-bg-purple-300"
            value={data.tokenId}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="heldUntil"
            placeholder="Held until"
            className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-full bg-purple-200 hover-bg-purple-300"
            value={data.heldUntil}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <input
            type="text"
            name="signature"
            placeholder="Signature"
            className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-full bg-purple-200 hover-bg-purple-300"
            value={data.signature}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-span-1">
          <button
            type="submit"
            className="bg-purple-700 border-purple-800 border hover:text-green-300 rounded my-2 px-4 py-2 bg-gradient-to-r hover:from-green-400 hover:to-purple-700 to-purple-500 from-green-300 text-purple-600 hover:shadow-lg hover:-translate-y-1   hover:bg-green-300 w-full"
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
      {data.loading && <div className="text-lg text-purple-700 font-semibold">Loading... </div>}
      {/* Button to copy leaves data to clipboard */}
      {/* {data && (
        <div className="flex gap-7">
          <button
            onClick={copyClaim}
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
      )} */}
    </div>
  );
}
