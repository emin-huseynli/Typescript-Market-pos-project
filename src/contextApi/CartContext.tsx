import React, { createContext, useState, useEffect, type ReactNode } from "react";
import type { CartItem, Product } from "../types/product";
import axios from "axios"
import { toast } from "react-toastify";
import type { Transaction } from "../types/transaction";

interface CartContextType {
  products: Product[];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  addToCart: (product: Product) => void;
  filteredProducts: Product[];
  getLocal: CartItem[];
  removeFromCart: (id: string) => void;
  totalPrice: number;
  totalItems: number;
  handleincrease: (id: string) => void;
  handleDecrease: (id: string) => void;
  clearCart: () => void;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  checkout:()=>void
}

const BASE_URL = import.meta.env.VITE_API_URL


export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [getLocal, setGetLocal] = useState<CartItem[]>(() =>
    JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[]
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



  const addToCart = (product: Product) => {
    const cartFromLocal: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemIndex = cartFromLocal.findIndex((c) => c.id === product.id);

    if (itemIndex !== -1) {
      cartFromLocal[itemIndex].quantity += 1;
      toast.error("Already added to cart")
    } else {
      cartFromLocal.push({ ...product, quantity: 1 });
      toast.success("Added to cart")
    }

    setGetLocal(cartFromLocal);
    localStorage.setItem("cart", JSON.stringify(cartFromLocal));
  };

  const removeFromCart = (id: string) => {
    const cartFromLocat: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")
    const updatedCart = cartFromLocat.filter((i) => i.id !== id)
    setGetLocal(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    toast.info("Removed from cart")

  };

  const handleincrease = (id: string) => {
    const cartFromLocal: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")
    const updatedCart = cartFromLocal.map((item) => item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    )

    setGetLocal(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const handleDecrease = (id: string) => {
    const cartFromLocal: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")
    const updatedCart = cartFromLocal.map((item) => item.id === id && item.quantity > 1 ? { ...item, quantity: (item.quantity - 1) } : item)

    setGetLocal(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const totalPrice = getLocal.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  const totalItems = getLocal.reduce((sum, item) => sum + item.quantity, 0);

  const clearCart = () => {
    setGetLocal([])
    localStorage.clear()
    toast.info("Cart is empty.")
  }


  const filteredProducts = products.filter((pro) => {
    const matchesSearch = pro.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || pro.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const checkout = () => {
    if (getLocal.length === 0) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      items: getLocal,
      total: totalPrice,
      date: new Date().toISOString()
    };

    const transactions: Transaction[] = JSON.parse(localStorage.getItem("transactions") || "[]");
    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    clearCart();
   toast.success("Checkout completed successfully!")
  };



  return (
    <CartContext.Provider value={{
      products,
      search,
      setSearch,
      addToCart,
      filteredProducts,
      getLocal,
      removeFromCart,
      totalPrice,
      handleincrease,
      handleDecrease,
      totalItems,
      clearCart,
      selectedCategory,
      setSelectedCategory,
      checkout
    }}>
      {children}
    </CartContext.Provider>
  );
};
