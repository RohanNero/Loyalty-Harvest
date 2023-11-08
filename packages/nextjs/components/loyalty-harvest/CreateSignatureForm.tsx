"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";

//import createLeaves from "../../backend/js/createLeaves";
// Route handler api call, not sure how to use route handlers currently lol
//import { POST } from "../src/app/api/route";
// Used to ensure that the call suceeds past `exceeded rate limit` error

export default function CreateSignatureForm() {
  // State to manage input values
  // testing using one use State for all three
  const [data, setData] = useState({
    address: "",
    signature: "",
    loading: false,
  });
  //const [signature, setSignature] = useState("");
  //const [isLoading, setIsLoaing] = useState(false);

  // Function to handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log("preData:", data);
      //console.log("formData:", formData);
      // fetch merkleData using `createMerkleAPI`
      setData(prevData => ({
        ...prevData,
        signature: "",
        loading: true,
      }));
      console.log("data:", data);
      console.log("addy:", data.address);
      const fetchedData = await fetch("/api/createSignatureAPI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await fetchedData.json();
      console.log("signature JSON:", json);
      console.log("siggy:", json.sig);
      setData(prevData => ({
        ...prevData,
        signature: json.sig,
        loading: false,
      }));
      console.log("useData:", data);
      // Return the result
      return json;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to handle copying leaves data to clipboard
  const copySignature = () => {
    const signatureText = JSON.stringify(data.signature, null, 2); // Convert leaves data to a nicely formatted JSON string
    navigator.clipboard
      .writeText(signatureText)
      .then(() => {
        console.log("Signature copied to clipboard!");
      })
      .catch(error => {
        console.error("Failed to copy signature to clipboard: ", error);
      });
  };

  return (
    <div className="bg-green-300 font-mono py-3 mb-4 w-1/2 flex-col flex items-center justify-center w-2/3">
      <h3 className="text-xl text-purple-400 justify-self-center mb-4">Create Signature</h3>
      <form className="text-center w-full flex flex-col gap-2 items-center justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="border border-green-500 p-1.5 text-green-400 focus:ring-0 rounded w-2/3 bg-purple-200 hover:bg-purple-300"
          value={data.address}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-purple-700 border-purple-800 border hover:text-green-300 rounded my-2 px-4 py-2 bg-gradient-to-r hover:from-green-400 hover:to-purple-700 to-purple-500 from-green-300 text-purple-600 hover:shadow-lg hover:-translate-y-1   hover:bg-green-300 w-1/2"
        >
          Create
        </button>
      </form>
      {/* Conditionally render the result */}
      {data && data.signature?.length > 0 && (
        <div className="w-1/2 mt-4 p-3 border border-purple-700 rounded bg-green-200">
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
