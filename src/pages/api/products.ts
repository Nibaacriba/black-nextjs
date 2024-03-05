import { NextApiRequest, NextApiResponse } from "next";
import Products from "../../../database.json";

export default function handler(req: NextApiRequest, resp: NextApiResponse) {
  resp.status(200).json(Products);
}
