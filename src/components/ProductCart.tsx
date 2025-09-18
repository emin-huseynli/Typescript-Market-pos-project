import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../contextApi/CartContext"
import { IoReturnUpBackSharp } from "react-icons/io5";

const ProductCart = () => {
  const navigate = useNavigate()
  const cartCtx = useContext(CartContext)
  if (!cartCtx) return null;
  const { getLocal, removeFromCart, totalPrice, handleincrease, handleDecrease, clearCart } = cartCtx

  const handleClick = () => {
    navigate("/")
  }
  const handleCheckout = () => {
    navigate("/checkout")
  }


  return (
    <div>
      <div className="cursor-pointer text-red-500 ml-7 mt-2" onClick={handleClick}>
        <IoReturnUpBackSharp /> Back
      </div>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Products in your cart</h2>
        <div className="flex flex-col gap-4">
          {getLocal?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded object-cover" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.price} ₼</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => handleDecrease(item.id)} className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white text-lg font-bold hover:bg-red-600 transition">
                      -
                    </button>
                    <span className="px-3 py-1 border rounded bg-gray-100 text-gray-700">{item?.quantity}</span>
                    <button onClick={() => handleincrease(item.id)} className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white text-lg font-bold hover:bg-green-600 transition">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        {getLocal.length > 0 ? (<div><div>
          <button onClick={clearCart} className="bg-red-500 text-white mt-6 px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer">Clear Cart</button>
        </div>
          <div className="text-right text-xl font-semibold">
            Total:${totalPrice}  ₼
            <div><button onClick={handleCheckout} className="bg-green-500 text-white mt-6 px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer">Order</button></div>
          </div>
        </div>) :
          <div className="text-right mt-4 text-xl font-semibold">
            Total:${totalPrice}  ₼
            <div><button onClick={handleCheckout} className="bg-green-500 text-white mt-6 px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer">Order</button></div>
          </div>
        }


      </div>
    </div>
  )
}

export default ProductCart