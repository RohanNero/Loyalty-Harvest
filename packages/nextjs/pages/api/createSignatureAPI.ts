import createSignature from "../../../hardhat/scripts/loyalty-harvest/createSignature";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createLeavesAPI(req: NextApiRequest, res: NextApiResponse) {
  console.log("req:", req.body);
  console.log("API parameters:");

  const { address } = req.body;
  console.log("address:", address);
  try {
    const signature = await createSignature(address);
    const sig = signature?.signature;
    console.log("API signature:", sig);
    // console.log("siggy:", signature.signature);
    res.status(200).json({ success: true, sig });
  } catch (error: any) {
    console.error("Error:", error);
    if (error.message.includes("Provided address")) {
      console.log("Invalid address provided!");
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}
