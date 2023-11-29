"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { createPublicClient, custom, encodeFunctionData } from "viem";
import { sepolia } from "viem/chains";
import "viem/window";
import claimAbi from "~~/abi/Claim";
import ErrorPopup from "~~/components/loyalty-harvest/ErrorPopup";

export default function CreateProofForm() {
  // State to manage input values
  const [formData, setFormData] = useState({
    eventId: "",
    holder: "",
  });
  const [proof, setProof] = useState<{ proof: any[] }>({ proof: [] });
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

  // Ensure address input is valid
  const checkAddress = async (address: string) => {
    // Ensure even length
    if (address.length % 2 != 0) {
      console.log(`Hexadecimal string with odd length: ${address}`);
      throw new Error(`Hexadecimal string with odd length: ${address}`);
    }

    // Ensure correct length
    if (address.length != 42) {
      console.log(
        `Address with incorrect length: ${address}! Expected bytes: 20 Actual bytes: ${(address.length - 2) / 2}`,
      );
      throw new Error(
        `Address with incorrect length: ${address}! Expected bytes: 20 Actual bytes: ${(address.length - 2) / 2}`,
      );
    }

    // Ensure address contains only valid characters
    const hexRegex = new RegExp(/^0x[0-9A-Fa-f]+$/);
    if (!hexRegex.test(address)) {
      console.log(`Hexadecimal string with invalid characters: ${address}`);
      throw new Error(`Hexadecimal string with invalid characters: ${address}`);
    }
  };

  // Ensure the eventId is valid
  const checkEventId = async (eventId: string) => {
    if (!window.ethereum) {
      console.log("Window.ethereum is undefined!");
      throw new Error("Window.ethereum is undefined!");
    }
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: custom(window.ethereum),
    });
    if (publicClient == undefined) {
      throw new Error("publicClient is undefined!");
    }
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

  // Ensure input is valid
  const checkInput = async () => {
    await checkAddress(formData.holder);
    await checkEventId(formData.eventId);
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setProof({ proof: [] });
      await checkInput();
      // Fetch proofData using `createMerkleAPI`
      const proofData = await fetch("/api/createProofAPI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const json = await proofData.json();
      console.log("proof:", json);
      if (json.proof.length < 1) {
        throw new Error(`No proofs found for ${formData.holder} at eventId ${formData.eventId}`);
      }

      setIsLoading(false);
      setProof(json);
      return json;
    } catch (error: any) {
      console.error("Error:", error);
      // Notify user with an error pop up
      await notifyUser(error);
    }
  };

  // Closes the error popup
  const closeErrorPopup = () => {
    setShowErrorPopup(false);
    // Clear the error message
    setErrorMessage("");
  };

  // Displays the error popup
  const displayErrorPopup = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setShowErrorPopup(true);
  };

  // Notifies the user with the custom error popup
  const notifyUser = (errorMessage: string): void => {
    const duration = 10000;
    displayErrorPopup(errorMessage);

    // Close the popup after the specified duration
    setTimeout(closeErrorPopup, duration);
  };

  // State to manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  // default 10 items per table page
  const itemsPerPage = 10;

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Copies proof data to clipboard
  const copyProof = () => {
    const proofText = JSON.stringify(proof.proof, null, 2);
    navigator.clipboard
      .writeText(proofText)
      .then(() => {
        console.log("Merkle Proof copied to clipboard!");
      })
      .catch(error => {
        console.error("Failed to copy proof data to clipboard: ", error);
      });
  };

  return (
    <div className="bg-green-300 font-mono py-3 mb-4 w-1/2 flex-col flex items-center justify-center w-2/3">
      <h3 className="text-xl text-[#10B981] justify-self-center mb-4">Create Merkle Proof</h3>
      <form className="text-center w-full flex flex-col gap-2 items-center justify-center" onSubmit={handleSubmit}>
        <input
          type="number"
          name="eventId"
          placeholder="Event Id"
          className="border p-1.5 text-green-400 focus:ring-0 rounded w-2/3 bg-green-200 hover:bg-green-300"
          value={formData.eventId}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="holder"
          placeholder="Holder address"
          className="border  p-1.5 text-green-400 focus:ring-0 rounded w-2/3 bg-green-200 hover:bg-green-300"
          value={formData.holder}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={formData.holder === "" || formData.eventId === ""}
          className="bg-purple-700 border  rounded my-2 px-4 py-2 bg-gradient-to-r from-secondary via-green-200 to-secondary hover:from-secondary hover:to-secondary text-secondary hover:text-base-100 hover:shadow-lg hover:-translate-y-1  hover:bg-green-300 w-1/2"
        >
          Create
        </button>
      </form>
      {/* Button to copy proof data to clipboard */}
      {proof && proof.proof.length > 0 && (
        <div className="">
          <button
            onClick={copyProof}
            className="bg-purple-700 border-purple-800 border text-green-300 rounded my-2 px-4 py-2 bg-gradient-to-r from-green-400 to-purple-700 hover:to-purple-500 hover:from-green-300 hover:text-purple-600 hover:shadow-lg hover:-translate-y-1 hover:bg-green-300 w-full"
          >
            Copy Merkle Proof to Clipboard
          </button>
        </div>
      )}
      {/* Conditionally render the proof in a paginated table */}
      {proof && proof?.proof?.length > 0 && (
        <div className="mt-4">
          {/* <h4 className="text-lg font-semibold text-purple-400 mb-2">Proof:</h4> */}
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-purple-200 bg-purple-200 w-full">
              <thead className="bg-purple-300">
                <tr>
                  <th className="border border-purple-300 p-2 text-green-600">Value</th>
                  <th className="border border-purple-200 p-2 text-green-600">Proof</th>
                </tr>
              </thead>
              <tbody>
                {proof.proof?.map((entry, index) => (
                  <tr key={index}>
                    <td className="border border-purple-300 p-2 text-green-500">
                      {entry.Value?.map((value: any, i: number) => (
                        <div key={i}>{value}</div>
                      ))}
                    </td>
                    <td className="border border-purple-300 p-2 text-green-500">
                      {entry.Proof?.map((proofValue: any, i: number) => (
                        <div key={i}>{proofValue}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="mt-4">
            {proof && proof?.proof && proof?.proof?.length > itemsPerPage && (
              <ul className="flex space-x-2">
                {Array.from({ length: Math.ceil(proof.proof.length / itemsPerPage) }).map((_, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer ${currentPage === index + 1 ? "font-bold" : ""}`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {isLoading && <div className="text-lg text-purple-700 font-semibold">Loading... </div>}
      {/* Conditionally render the custom error popup */}
      {showErrorPopup && <ErrorPopup errorMessage={errorMessage} onClose={closeErrorPopup} />}
    </div>
  );
}
