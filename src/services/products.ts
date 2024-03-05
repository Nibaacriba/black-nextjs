export type ProductType = {
  name: string;
  id: number;
  description: string;
  price: number;
  imageUrl: string;
  inStock: number;
};

export const fetchProducts = async () => {
  const products: ProductType[] = await fetch(
    `${process.env.NEXT_PUBLIC_APIURL}/api/products`
  ).then((resp) => resp.json());
  return products;
};

export const fetchProduct = async (id: string | number) => {
  const product: ProductType = await fetch(
    `${process.env.NEXT_PUBLIC_APIURL}/api/products/${id}`
  ).then((resp) => resp.json());
  return product;
};
