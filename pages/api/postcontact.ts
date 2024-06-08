import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, 'phone': phoneNo, 'email': emailId ,desc} = req.body;

    const data = {
      name,
      phoneNo,
      emailId,
      desc
    };

    const dataDir = path.resolve('contactdata');

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    const files = fs.readdirSync(dataDir);
    const fileName = `${files.length + 1}.json`;
    const filePath = path.join(dataDir, fileName);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
