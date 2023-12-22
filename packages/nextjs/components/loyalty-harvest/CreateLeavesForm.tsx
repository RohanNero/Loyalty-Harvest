"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
// Used to ensure that the call suceeds past `exceeded rate limit` error
import retry from "async-retry";
import "viem/window";
import ErrorPopup from "~~/components/loyalty-harvest/ErrorPopup";
import createLeaves from "~~/utils/loyalty-harvest/createLeaves";

interface LeavesData {
  leaves: string[][];
  totalHeld: number;
}

export default function CreateLeavesForm() {
  // State to manage input values
  const [formData, setFormData] = useState({
    nftAddress: "",
    blockStart: "",
    blockEnd: "",
    totalSupply: "",
  });
  const [leafData, setLeafData] = useState<LeavesData>({ leaves: [], totalHeld: 0 });
  const [isLoading, setIsLoading] = useState(false);

  // State variable for storing error messages
  const [errorMessage, setErrorMessage] = useState("");

  // State variable for showing/hiding the error popup
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // Function to handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  // Ensure starting and ending block numbers are valid
  const checkBlocks = async (start: string, end: string) => {
    if (end <= start) {
      throw new Error(`Block end cannot be less than or equal to block start! Start: ${start} End: ${end}`);
    }
  };

  // Ensure nfts/total supply is greater than 1
  // (if only 1 nft is being used, it makes more sense to directly send rewards to that user)
  const checkTotalSupply = (supply: string) => {
    console.log("supply:", supply);
    if (parseInt(supply) <= 1) {
      throw new Error(`Total supply must be greater than 1! Input: ${supply}`);
    }
  };

  // Ensure input is valid
  const checkInput = async () => {
    await checkAddress(formData.nftAddress);
    await checkBlocks(formData.blockStart, formData.blockEnd);
    await checkTotalSupply(formData.totalSupply);
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Call createLeaves with the input values
    const { nftAddress, blockStart, blockEnd, totalSupply } = formData;
    try {
      console.log("formData:", formData);
      setLeafData({ leaves: [], totalHeld: 0 });
      await checkInput();

      const leavesData = await retry(
        async () => {
          setIsLoading(true);
          // const leaves = [];
          const { leaves, totalHeld } = await createLeaves(
            nftAddress,
            Number(blockStart),
            Number(blockEnd),
            Number(totalSupply),
          );
          if (!leaves || !totalHeld) {
            throw new Error("Leaves data is undefined!");
          }
          return { leaves, totalHeld } as LeavesData;
        },
        {
          retries: 5, // Number of retries before giving up
          factor: 2, // Exponential factor
          minTimeout: 1000, // Minimum wait time before retrying
          maxTimeout: 60000, // Maximum wait time before retrying
          randomize: true, // Randomize the wait time
        },
      );

      setIsLoading(false);
      setLeafData({
        leaves: leavesData.leaves as string[][], // Ensure leavesData.leaves is not undefined
        totalHeld: leavesData.totalHeld as number, // Provide a default value if totalHeld is undefined
      });
      // Return the result
      // console.log("leaves:", leavesData.leaves);
      // console.log("held:", leavesData.totalHeld);
      return leavesData;
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
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

  // Display output logic below //

  // State to manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  // default 10 items per table page
  const itemsPerPage = 10;

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the range of items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter the leaves to display only the items in the current page
  const leavesToDisplay = leafData?.leaves?.slice(startIndex, endIndex) || [];

  // Copies leaves data to clipboard
  const copyToClipboard = () => {
    const leavesText = JSON.stringify(leafData?.leaves, null, 2); // Convert leaves data to a nicely formatted JSON string
    navigator.clipboard
      .writeText(leavesText)
      .then(() => {
        console.log("Leaves data copied to clipboard!");
      })
      .catch(error => {
        console.error("Failed to copy leaves data to clipboard: ", error);
      });
  };

  return (
    <div className="bg-secondary font-mono py-3 mb-4 flex-col flex items-center justify-center w-full max-w-full">
      <h3 className="text-xl text-base-100 justify-self-center mb-4">Create Leaves</h3>
      <form className="text-center w-full flex flex-col gap-2 items-center justify-center" onSubmit={handleSubmit}>
        <input
          type="string"
          name="nftAddress"
          placeholder="NFT contract address"
          className="border p-1.5 text-purple-400 focus:ring-0 rounded w-2/5 bg-green-200 hover:bg-green-300"
          value={formData.nftAddress}
          onChange={handleInputChange}
        />

        <input
          type="number"
          name="blockStart"
          placeholder="Starting block number"
          className="border p-1.5 text-purple-400 focus:ring-0 rounded w-2/5 bg-green-200 hover:bg-green-300"
          value={formData.blockStart}
          onChange={handleInputChange}
        />

        <input
          type="number"
          name="blockEnd"
          placeholder="Ending block number"
          className="border p-1.5 text-purple-400 focus:ring-0 rounded w-2/5 bg-green-200 hover:bg-green-300"
          value={formData.blockEnd}
          onChange={handleInputChange}
        />

        <input
          type="number"
          name="totalSupply"
          placeholder="Total amount of NFTs"
          className="border p-1.5 text-purple-400 focus:ring-0 rounded w-2/5 bg-green-200 hover:bg-green-300"
          value={formData.totalSupply}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="bg-purple-700 border text-base-100 rounded my-2 px-4 py-2 bg-gradient-to-r from-green-200 via-secondary to-green-200 hover:via-green-200 hover:to-green-200 hover:shadow-lg hover:-translate-y-1 w-2/5"
        >
          Create
        </button>
      </form>
      {/* Conditionally render the result in a paginated table */}
      {leafData && leafData?.leaves?.length > 0 && (
        <div className="mt-4 max-w-full">
          <h4 className="text-lg font-semibold text-purple-400 mb-2">Leaves:</h4>
          <div className="overflow-x-auto">
            <table className="border  border-green-200 bg-green-200 max-w-full whitespace-nowrap">
              <thead className="bg-green-300">
                <tr>
                  <th className="border border-green-200 p-2 text-purple-500">Holder</th>
                  <th className="border border-green-200 p-2 text-purple-500">NFT Contract</th>
                  <th className="border border-green-200 p-2 text-purple-500">TokenId</th>
                  <th className="border border-green-200 p-2 text-purple-500 ">Held Until</th>
                </tr>
              </thead>
              <tbody>
                {leavesToDisplay.map((leaf, index) => (
                  <tr key={index}>
                    <td className="border border-green-200 p-2 text-purple-400">{leaf[0]}</td>
                    <td className="border border-green-200 p-2 text-purple-400">{leaf[1]}</td>
                    <td className="border border-green-200 p-2 text-purple-400">{leaf[2]}</td>
                    <td className="border border-green-200 p-2 text-purple-400">{leaf[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="mt-4">
            {leafData?.leaves?.length > itemsPerPage && (
              <ul className="flex space-x-2">
                {Array.from({
                  length: Math.ceil(leafData.leaves.length / itemsPerPage),
                }).map((_, index) => (
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
      {/* Button to copy leaves data to clipboard */}
      {leafData && leafData?.leaves?.length > 0 && (
        <div className="flex gap-7">
          <button
            onClick={copyToClipboard}
            className="bg-purple-700 border-purple-800 border text-green-300 rounded my-2 px-4 py-2 bg-gradient-to-r from-green-400 to-purple-700 hover:to-purple-500 hover:from-green-300 hover:text-purple-600 hover:shadow-lg hover:-translate-y-1 hover:bg-green-300 w-1/2"
          >
            Copy Leaves Data to Clipboard
          </button>
          <div className="text-center pt-3 bg-purple-700 border-purple-800 border text-green-300 rounded my-2 px-4 py-2 bg-gradient-to-r from-green-400 to-purple-700 hover:to-purple-500 hover:from-green-300 hover:text-purple-600 hover:shadow-lg hover:-translate-y-1 hover:bg-green-300 w-1/2">
            TotalHeld: {leafData.totalHeld.toString()}
          </div>
        </div>
      )}
      {/* Conditionally render the custom error popup */}
      {showErrorPopup && <ErrorPopup errorMessage={errorMessage} onClose={closeErrorPopup} />}
    </div>
  );
}
