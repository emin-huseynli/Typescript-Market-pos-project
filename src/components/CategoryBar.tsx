import { useContext } from "react";
import { CartContext } from "../contextApi/CartContext";

const CategoryBar = () => {
  const cartCtx = useContext(CartContext);
  if (!cartCtx) return null;

  const { selectedCategory, setSelectedCategory } = cartCtx;

  const categories = ["All", "Samsung", "iPhone", "Redmi"];

  return (
    <div className="flex justify-center gap-4 my-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`px-4 py-2 rounded-lg shadow transition 
            ${selectedCategory === cat 
              ? "bg-blue-600 text-white" 
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
