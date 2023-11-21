"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { createWalletClient, custom } from "viem";

export default function CreateSignatureForm() {
  // State to manage input, output, and loading state values
  const [data, setData] = useState({
    address: "",
    signature: "",
    loading: false,
  });

  // Function to handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setData(prevData => ({
      ...prevData,
      address: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setData(prevData => ({
        ...prevData,
        signature: "",
        loading: true,
      }));

      if (!window.ethereum) {
        console.error("window.ethereum is undefined");
        return;
      }

      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const walletClient = createWalletClient({
        account,
        transport: custom(window.ethereum),
      });

      console.log("signing with:", data.address);
      const signature = await walletClient.signMessage({
        message: data.address,
      });
      console.log("signature:", signature);

      setData(prevData => ({
        ...prevData,
        signature: signature,
        loading: false,
      }));
      return signature;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function for copying signature to clipboard
  const copySignature = () => {
    navigator.clipboard
      .writeText(data.signature)
      .then(() => {
        console.log("Signature copied to clipboard!");
      })
      .catch(error => {
        console.error("Failed to copy signature to clipboard: ", error);
      });
  };

  return (
    <div className="bg-green-300 font-mono py-3 mb-4 w-1/2 flex-col flex items-center justify-center w-2/3">
      <h3 className="text-xl text-[#10B981] justify-self-center mb-4">Create Signature</h3>
      <form className="text-center w-full flex flex-col gap-2 items-center justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-2/3 bg-green-200 hover:bg-green-300"
          value={data.address}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-purple-700 border hover:text-green-300 rounded my-2 px-4 py-2 bg-gradient-to-r from-secondary via-green-200 to-secondary hover:from-secondary hover:to-secondary text-secondary hover:text-base-100 hover:shadow-lg hover:-translate-y-1   hover:bg-green-300 w-1/2"
        >
          Create
        </button>
      </form>
      {/* Conditionally render the signature */}
      {data && data.signature?.length > 0 && (
        <div className="w-1/2 mt-4 p-3 border  rounded bg-green-200">
          <h4 className="text-lg font-semibold text-purple-700 mb-2">Signature:</h4>
          <div className="text-lg truncate font-semibold text-purple-400 mb-2">{data.signature} </div>
        </div>
      )}
      {data.loading && <div className="text-lg text-purple-700 font-semibold">Loading... </div>}
      {/* Button to copy leaves data to clipboard */}
      {data.signature?.length > 0 && (
        <div className="flex gap-7">
          <button
            onClick={copySignature}
            className="bg-purple-700 border-purple-800 border text-green-300 rounded my-2 px-4 py-2 bg-gradient-to-r from-green-400 to-purple-700 hover:to-purple-500 hover:from-green-300 hover:text-purple-600 hover:shadow-lg hover:-translate-y-1 hover:bg-green-300 w-full"
          >
            Copy Signature to clipboard
          </button>
        </div>
      )}
    </div>
  );
}
