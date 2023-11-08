import createMerkle from "../../../hardhat/scripts/loyalty-harvest/createTree";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createLeavesAPI(req: NextApiRequest, res: NextApiResponse) {
  console.log("req:", req.body);
  console.log("API parameters:");

  //const { leaves } = req.body;
  // Clean up the 'leaves' string by removing extra spaces and line breaks
  try {
    if (!req.body || !Array.isArray(req.body)) {
      throw new Error("Invalid input: 'leaves' is missing or not an array.");
    }

    const bodyArray: string[][] = req.body;

    // Clean and process the 'leaves' array
    const cleanedLeavesArray = bodyArray.map(subArray => {
      return subArray
        .map(value => value.trim().replace(/^"(.*)"$/, "$1")) // Remove double quotes
        .filter(value => value !== ""); // Remove empty strings (caused by trailing commas)
    });
    const { tree, root } = await createMerkle(cleanedLeavesArray);
    //console.log("merkleData API tree:", tree);
    console.log("merkleData API root:", root);
    res.status(200).json({ success: true, tree, root });
  } catch (error: any) {
    console.error("Error:", error);
    if (error.message.includes("Provided address")) {
      console.log("Invalid address provided!");
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}
