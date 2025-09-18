import { useContext, useState } from "react";
import { CartContext } from "../contextApi/CartContext";
import type { Product } from "../types/product";
import CategoryBar from "./CategoryBar";

const ProductList = () => {
    const cartCtx = useContext(CartContext);

    const [currentPage, setCurrentPage] = useState<number>(1);
    if (!cartCtx) return null

    const { addToCart, filteredProducts } = cartCtx;

    const productsPerPage = 10;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div>
            <CategoryBar />
            <div className="p-6">
                <div className="flex flex-wrap justify-center gap-6 p-6">
                    {currentProducts && currentProducts.length > 0 ? (
                        currentProducts.map((product: Product) => (
                            <div
                                key={product.id}
                                className="w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="w-full h-48 overflow-hidden">
                                    <img
                                        className="w-full h-60 object-cover"
                                        src={product.imageUrl}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="p-4 flex flex-col gap-2">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {product.name}
                                    </h3>
                                    <h4 className="text-md font-medium text-gray-600">
                                        {product.price} AZN
                                    </h4>
                                    <h4 className="text-sm text-gray-500">{product.category}</h4>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center">
                            <p>The product you are looking for does not exist.</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-1 rounded-md ${currentPage === index + 1
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
