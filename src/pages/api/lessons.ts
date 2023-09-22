import Airtable from "airtable";
import { NextApiRequest, NextApiResponse } from "next";

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { recordId } = req.query as { recordId: string };
  // your code here
  // see api reference: https://airtable.com/appofHk5rJkpaimm1/api/docs#javascript
  return res.status(200).send({ data: {} }); // populate this with your data
}
