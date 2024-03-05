import Products from "@/pages/products";
import { NextApiRequest, NextApiResponse } from "next";
import products from "../../../../database.json";

export default function handler(req: NextApiRequest, resp: NextApiResponse) {
  const { id } = req.query;

  const product = products.find((prod) => prod.id === Number(id));
  resp.status(200).json(product);
}
