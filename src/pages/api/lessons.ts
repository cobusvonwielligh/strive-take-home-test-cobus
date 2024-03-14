import Airtable from 'airtable';
import { NextApiRequest, NextApiResponse } from 'next';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID || 'ppofHk5rJkpaimm1');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { recordId } = req.query;

  if (typeof recordId !== 'string') {
    return res.status(400).json({ error: 'Record ID must be provided as a string.' });
  }

  try {
    const record = await base('Lessons').find(recordId);
    res.status(200).json({ data: record.fields });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Airtable.' });
  }
}
