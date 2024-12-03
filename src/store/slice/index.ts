import { CartItem, Product } from "@/utils/types";
import { createContext } from "react";

export type ProductContextType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

export type CartContextType = {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
};

const CartContext = createContext<CartItem[] | null>(null);

export const ProductContext = createContext<Product[] | null>(null);

export default CartContext;
