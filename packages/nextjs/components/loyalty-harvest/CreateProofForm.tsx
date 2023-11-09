"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";

// import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

//import createLeaves from "../../backend/js/createLeaves";
// Route handler api call, not sure how to use route handlers currently lol
//import { POST } from "../src/app/api/route";
// Used to ensure that the call suceeds past `exceeded rate limit` error

export default function CreateProofForm() {
  // State to manage input values
  const [formData, setFormData] = useState({
    eventId: "",
    holder: "",
  });
  const [proof, setProof] = useState<{ proof: any[] }>({ proof: [] });
  const [isLoading, setIsLoading] = useState(false);

  /* Eventually need to swap to scaffold-eth hooks from traditional API flow
    const { data: eventData } = useScaffoldContractRead({
      contractName: "Claim",
      functionName: "viewEvent",
      args: [0],
    }); */

  // Function to handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Split the input value into an array
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      //console.log("formData:", formData);
      // Fetch proofData using `createMerkleAPI`
      setIsLoading(true);
      setProof({ proof: [] });
      const proofData = await fetch("/api/createProofAPI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const json = await proofData.json();
      console.log("proofData:", json.proof);
      setIsLoading(false);
      //console.log("proofData:", proofData.proof);
      setProof(json);
      console.log("useState data:", proof);
      // Return the result
      return json;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // State to manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  // default 10 items per table page
  const itemsPerPage = 10;

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the range of items to display based on the current page
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

  // Filter the leaves to display only the items in the current page
  //const proofToDisplay = proof?.proof?.slice(startIndex, endIndex) || [];

  // Function to handle copying proof data to clipboard
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
      <h3 className="text-xl text-purple-400 justify-self-center mb-4">Create Merkle Proof</h3>
      <form className="text-center w-full flex flex-col gap-2 items-center justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          name="eventId"
          placeholder="Event Id"
          className="border border-purple-500 p-1.5 text-green-400 focus:ring-0 rounded w-2/3 bg-purple-200 hover:bg-purple-300"
          value={formData.eventId}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="holder"
          placeholder="Holder address"
          className="border border-purple-500 p-1.5 text-green-400 focus:ring-0 rounded w-2/3 bg-purple-200 hover:bg-purple-300"
          value={formData.holder}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-purple-700 border-purple-800 border hover:text-green-300 rounded my-2 px-4 py-2 bg-gradient-to-r  hover:from-green-400 hover:to-purple-700 to-purple-500 from-green-300 text-purple-600 hover:shadow-lg hover:-translate-y-1   hover:bg-green-300 w-1/2"
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
    </div>
  );
}
