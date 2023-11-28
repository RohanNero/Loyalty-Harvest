"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import ErrorPopup from "~~/components/loyalty-harvest/ErrorPopup";

export default function CreateMerkleForm() {
  // State to manage input values
  const [formData, setFormData] = useState({
    leaves: "",
    tree: [],
    root: "",
    loading: false,
  });

  // State variable for storing error messages
  const [errorMessage, setErrorMessage] = useState("");

  // State variable for showing/hiding the error popup
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // Function to handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Split the input value into an array
  };

  // Function to clean input
  const cleanInput = async () => {
    const cleanedLeavesString = formData.leaves.replace(/\s+/g, "");
    // Remove the extra square brackets from the 'leaves' string
    const cleanedLeaves = cleanedLeavesString.slice(2, -2);

    // Split the cleaned 'leaves' string into individual leaf strings
    const leavesArray = cleanedLeaves.split("],[").map((leaf: string) => `[${leaf}]`);
    // Manually split each leaf string into an array of values
    const parsedLeavesArray: string[][] = leavesArray.map((leaf: string) => {
      // Remove extra square brackets within each leaf string
      const cleanedLeaf = leaf.replace(/\[|\]/g, "");
      // Split the cleaned leaf string into individual values
      const values = cleanedLeaf.split(",");

      // Remove extra quotation marks around each value and trim whitespace
      const cleanedValues = values.map((value: string) => value.replace(/["']/g, "").trim());
      // Filter out empty strings (caused by trailing commas inside the leaves object)
      return cleanedValues.filter(Boolean);
    });
    return parsedLeavesArray;
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

  // Ensure there are no duplicate tokenIds
  const ensureNoDuplicateTokenIds = async (inputArray: string[]) => {
    let prevInput = "";
    for (const input of inputArray) {
      if (input == prevInput) {
        throw new Error(`Duplicates found for tokenId ${input}!`);
      }
      prevInput = input;
    }
  };

  // Checks the input and returns an error message if invalid
  const checkInput = async (leaves: string[][]) => {
    const tokenIdArray: string[] = [];
    console.log("lef:", leaves);
    for (const leaf of leaves) {
      if (leaf.length !== 4) {
        throw new Error(`Invalid Leaf: ${leaf}`);
      }
      await isAddressCorrectLength([leaf[0], leaf[1]]);
      await isValidHexString([leaf[0], leaf[1]]);
      await hasEvenLength([leaf[0], leaf[1]]);
      tokenIdArray.push(leaf[2]);
    }
    await ensureNoDuplicateTokenIds(tokenIdArray);
  };

  // Submits form and creates tree
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // fetch formData using `createMerkleAPI`
      setFormData({ ...formData, loading: true }); // Update loading state
      const leaves = await cleanInput();
      console.log("leaves:", leaves);
      await checkInput(leaves);

      const merkleData = await fetch("/api/createTreeAPI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaves),
      });
      const json = await merkleData.json();
      console.log("formData:", json);
      console.log(json.tree);
      console.log("json root:", json.root);
      setFormData({ ...formData, loading: false, tree: json.tree, root: json.root });
      // console.log("useState data:", formData);
      // Return the result
      return json;
    } catch (error: any) {
      console.error("Error:", error);
      // Notify user with an error pop up
      await notifyUser(error);
      setFormData(prevData => ({
        ...prevData,
        loading: false,
      }));
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

  // Copes merkle tree to clipboard
  const copyToClipboard = () => {
    const merkleText = JSON.stringify(formData.tree, null, 2); // Convert leaves data to a nicely formatted JSON string
    navigator.clipboard
      .writeText(merkleText)
      .then(() => {
        console.log("Merkle Tree copied to clipboard!");
      })
      .catch(error => {
        console.error("Failed to copy merkle data to clipboard: ", error);
      });
  };

  // Copies merkle root to clipboard
  const copyRootToClipboard = () => {
    const merkleText = JSON.stringify(formData.root, null, 2); // Convert leaves data to a nicely formatted JSON string
    navigator.clipboard
      .writeText(merkleText)
      .then(() => {
        console.log("Merkle Tree copied to clipboard!");
      })
      .catch(error => {
        console.error("Failed to copy merkle data to clipboard: ", error);
      });
  };

  return (
    <div className="bg-secondary font-mono py-3 mb-4 w-1/2 flex-col flex items-center justify-center w-2/3">
      <h3 className="text-xl text-base-100 justify-self-center mb-4">Create Merkle Tree</h3>
      <form className="text-center w-full flex flex-col gap-2 items-center justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          name="leaves"
          placeholder="Leaves"
          className="border p-1.5 text-purple-400 focus:ring-0 rounded w-2/3 bg-green-200 hover:bg-green-300"
          value={formData.leaves}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-purple-700 border text-base-100 rounded my-2 px-4 py-2 bg-gradient-to-r from-green-200 via-secondary to-green-200 hover:via-green-200 hover:to-green-200 hover:shadow-lg hover:-translate-y-1   hover:bg-green-300 w-1/2"
        >
          Create
        </button>
      </form>
      {/* Conditionally render the result */}
      {formData.root !== "" && (
        <div className="mt-4 p-3 border border-purple-700 rounded bg-green-200">
          <h4 className="text-lg font-semibold text-purple-700 mb-2">Merkle Root:</h4>
          <div className="text-lg font-semibold text-purple-400 mb-2">{formData.root} </div>
        </div>
      )}
      {formData.loading && <div className="text-lg text-purple-700 font-semibold">Loading... </div>}
      {/* Button to copy leaves data to clipboard */}
      {formData.root !== "" && (
        <div className="flex gap-7">
          <button
            onClick={copyToClipboard}
            className="bg-purple-700 border-purple-800 border text-green-300 rounded my-2 px-4 py-2 bg-gradient-to-r from-green-400 to-purple-700 hover:to-purple-500 hover:from-green-300 hover:text-purple-600 hover:shadow-lg hover:-translate-y-1 hover:bg-green-300 w-1/2"
          >
            Copy Merkle Tree to Clipboard
          </button>
          <button
            onClick={copyRootToClipboard}
            className="bg-purple-700 border-purple-800 border text-green-300 rounded my-2 px-4 py-2 bg-gradient-to-r from-green-400 to-purple-700 hover:to-purple-500 hover:from-green-300 hover:text-purple-600 hover:shadow-lg hover:-translate-y-1 hover:bg-green-300 w-1/2"
          >
            Copy Merkle Root to Clipboard
          </button>
        </div>
      )}
      {/* Conditionally render the custom error popup */}
      {showErrorPopup && <ErrorPopup errorMessage={errorMessage} onClose={closeErrorPopup} />}
    </div>
  );
}
