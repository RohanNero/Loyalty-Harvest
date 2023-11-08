import createLeaves from "../../../hardhat/scripts/loyalty-harvest/createLeaves";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createLeavesAPI(req: NextApiRequest, res: NextApiResponse) {
  console.log("req:", req.body);
  const { nftAddress, blockStart, blockEnd, totalSupply } = req.body;
  if (nftAddress == "" || blockStart == "" || blockEnd == "" || totalSupply == "") {
    console.log("Invalid API input!");
    res.status(500).json({ error: "Invalid API Input" });
    return;
  }
  // console.log("API parameters:");
  // console.log(nftAddress, blockStart, blockEnd, totalSupply);

  try {
    console.log("calling script...");
    const { leaves, totalHeld } = await createLeaves(nftAddress, blockStart, blockEnd, totalSupply);
    console.log("leaves:", leaves);
    console.log("totalHeld:", totalHeld);
    res.status(200).json({ success: true, leaves, totalHeld });
  } catch (error: any) {
    console.error("Error:", error);
    if (error.message.includes("Provided address")) {
      console.log("Invalid address provided!");
    }
    // if (
    //   error.message.includes(
    //     "Your app has exceeded its concurrent requests capacity."
    //   )
    // ) {
    //   console.log(
    //     "Alchemy: 'Your app has exceeded its concurrent requests capacity.'"
    //   );
    // }
    res.status(500).json({ error: "Internal Server Error" });
  }
}
