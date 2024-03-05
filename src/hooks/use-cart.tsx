import { ProductType } from "@/services/products";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CartContextType = {
  cart: ProductType[];
  addProduct: (product: ProductType) => void;
  removeProduct: (productId: number) => void;
};

const cartContext = createContext<CartContextType>({} as CartContextType);

export const CartContextProvider = (props: { children?: ReactNode }) => {
  const [cart, setCart] = useState<ProductType[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("shopping-cart");

    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  const addProduct = (product: ProductType) => {
    setCart((currentCart) => {
      const updatedCart = [product, ...currentCart];
      localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  const removeProduct = useCallback(
    (productId: number) => {
      const productIndex = cart.findIndex(
        (product) => product.id === productId
      );

      if (productIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart.splice(productIndex, 1);
        localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
      }
    },
    [cart]
  );

  const memorizedValue = useMemo<CartContextType>(
    () => ({
      cart,
      addProduct,
      removeProduct,
    }),
    [cart, removeProduct]
  );

  return (
    <cartContext.Provider value={memorizedValue}>
      {props.children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);
