import React, { createContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "../types/product";
import axios from "axios"

interface CartContextType {
  products: Product[];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  addToCart: (product: Product) => void;
  filteredProducts: Product[];
  getLocal: Product[];
  removeFromCart: (id: number) => void;
  totalPrice: number
}

const BASE_URL = import.meta.env.VITE_API_URL


export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("")
  const [getLocal, setGetLocal] = useState<Product[]>(() =>
    JSON.parse(localStorage.getItem("cart") || "[]")
  );


  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`${BASE_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  const filteredProducts = products.filter((pro) => {
    return pro.name.toLowerCase().includes(search.toLowerCase())
  })


  const addToCart = (product: Product) => {
    const cartFromLocal: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cartFromLocal.some((c) => c.id === product.id);
    if (!exists) {
      cartFromLocal.push(product);
    }

    setGetLocal(cartFromLocal);
    localStorage.setItem("cart", JSON.stringify(cartFromLocal));
  };

  const removeFromCart = (id: number) => {
    const cartFromLocat: Product[] = JSON.parse(localStorage.getItem("cart") || "[]")
    const updatedCart = cartFromLocat.filter((i) => i.id !== id)
    setGetLocal(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))

  };

  const totalPrice = getLocal.reduce((acc, item) => acc + item.price, 0);


  return (
    <CartContext.Provider value={{ products, search, setSearch, addToCart, filteredProducts, getLocal, removeFromCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
