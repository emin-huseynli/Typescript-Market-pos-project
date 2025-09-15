import { useContext } from "react";
import { CartContext } from "../contextApi/cartContext";
import type { Product } from "../types/product";


const ProductList = () => {
    const cartCtx = useContext(CartContext)
    console.log(cartCtx?.products);

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
                {cartCtx?.products.map((product: Product) => (
                    <div
                        key={product.id}
                        className="w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="w-full h-48 overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                src={product.imageUrl}
                                alt={product.name}
                            />
                        </div>
                        <div className="p-4 flex flex-col gap-2">
                            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                            <h4 className="text-md font-medium text-gray-600">{product.price} AZN</h4>
                            <h4 className="text-sm text-gray-500">{product.category}</h4>
                            <button className="mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                                Səbətə əlavə et
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}


export default ProductList