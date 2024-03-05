import Products from "@/pages/products";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, resp: NextApiResponse) {
  resp.status(200).json(Products);
}
