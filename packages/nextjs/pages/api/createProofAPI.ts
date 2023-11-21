import createProof from "../../utils/loyalty-harvest/createProof";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createProofAPI(req: NextApiRequest, res: NextApiResponse) {
  const { eventId, holder } = req.body;
  console.log("eventId:", eventId);
  console.log("holder:", holder);

  try {
    const proof = await createProof(eventId, holder);
    console.log("proofData API proof:", proof);
    res.status(200).json({ success: true, proof });
  } catch (error: any) {
    console.error("Error:", error);
    if (error.message.includes("Provided address")) {
      console.log("Invalid address provided!");
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}
