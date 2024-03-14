import type { NextApiRequest, NextApiResponse } from 'next';
import Airtable from 'airtable';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Environment Variables:', process.env.AIRTABLE_API_KEY, process.env.AIRTABLE_BASE_ID);
  const { recordId } = req.query;

  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    console.error('Server configuration error: Missing API Key or Base ID');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

  try {
    console.log('Attempting to fetch record:', recordId);
    const record = await base('Lessons').find(recordId as string);
    console.log('Record fetched successfully');
    res.status(200).json({ data: record.fields });
  } catch (err) {
    console.error('Failed to fetch data from Airtable:', err);
    res.status(500).json({ error: 'Failed to fetch data from Airtable' });
  }
}