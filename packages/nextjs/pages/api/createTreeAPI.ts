import createMerkle from "../../../hardhat/scripts/loyalty-harvest/createTree";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createLeavesAPI(req: NextApiRequest, res: NextApiResponse) {
  console.log("req:", req.body);
  console.log("API parameters:");

  //const { leaves } = req.body;
  // Clean up the 'leaves' string by removing extra spaces and line breaks
  try {
    const { leaves } = req.body;
    // Clean up the 'leaves' string by removing extra spaces and line breaks
    const cleanedLeavesString = leaves.replace(/\s+/g, "");
    // Remove the extra square brackets from the 'leaves' string
    const cleanedLeaves = cleanedLeavesString.slice(2, -2); // Remove the first two and last two characters (square brackets)

    // Split the cleaned 'leaves' string into individual leaf strings
    const leavesArray = cleanedLeaves.split("],[").map((leaf: string) => `[${leaf}]`);

    //console.log("leavesArray:", leavesArray);

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
    // if (!req.body || !Array.isArray(req.body)) {
    //   throw new Error("Invalid input: 'leaves' is missing or not an array.");
    // }

    // const bodyArray: string[][] = req.body;

    // // Clean and process the 'leaves' array
    // const cleanedLeavesArray = bodyArray.map(subArray => {
    //   return subArray
    //     .map(value => value.trim().replace(/^"(.*)"$/, "$1")) // Remove double quotes
    //     .filter(value => value !== ""); // Remove empty strings (caused by trailing commas)
    // });
    const { tree, root } = await createMerkle(parsedLeavesArray);
    //console.log("merkleData API tree:", tree);
    console.log("merkleData API root:", root);
    res.status(200).json({ success: true, tree, root });
  } catch (error: any) {
    console.error("Error:", error);
    if (error.message && error.message.includes("Provided address")) {
      console.log("Invalid address provided!");
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}
