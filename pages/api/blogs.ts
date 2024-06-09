// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";


import * as fs from 'fs';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.query.count)
  const count = req.query.count ? parseInt(req.query.count as string, 10) : 5;

  let datadir = await fs.promises.readdir("blogdata");
  datadir=datadir.slice(0, count)
  let myfiles;
  let allfiles = [];
  for (let index = 0; index < datadir.length; index++) {
    const element = datadir[index];
    myfiles = await fs.promises.readFile(('blogdata/'+element),'utf-8');
    console.log(myfiles);
    allfiles.push(JSON.parse(myfiles))
  }
  res.status(200).json(allfiles);
}
