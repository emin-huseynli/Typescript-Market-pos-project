import { createContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "../types/product";
import axios from "axios"

interface CartContextType {
  products: Product[];
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`http://localhost:5000/products`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  return (
    <CartContext.Provider value={{ products }}>
      {children}
    </CartContext.Provider>
  );
};
