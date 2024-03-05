// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  timeStamp: Date;
  pokemon: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const timeStamp = new Date();
  const pokemon = "pikachu";
  res.status(200).json({ name: "John Doe", timeStamp, pokemon });
}
