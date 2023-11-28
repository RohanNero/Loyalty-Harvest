import createTree from "../../utils/loyalty-harvest/createTree";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createLeavesAPI(req: NextApiRequest, res: NextApiResponse) {
  try {
    const leaves = req.body;

    const { tree, root } = await createTree(leaves);
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
