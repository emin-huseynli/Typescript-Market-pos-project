import { useContext } from "react";
import { CartContext } from "../contextApi/CartContext";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate()
    const cartCtx = useContext(CartContext);
    if (!cartCtx) return null;

    const { getLocal, totalPrice, checkout } = cartCtx;
    const handleClick = () => {
        navigate("/")
    }

    return (
        <div>
            <div className="cursor-pointer text-red-500 ml-7 mt-2" onClick={handleClick}>
                <IoReturnUpBackSharp /> Back
            </div>
            <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                {getLocal.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <div className="flex flex-col gap-4 mb-4">
                            {getLocal.map(item => (
                                <div key={item.id} className="flex justify-between bg-white shadow p-4 rounded">
                                    <p>{item.name} x {item.quantity}</p>
                                    <p>{item.price * item.quantity} ₼</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-right mb-4 font-semibold text-xl">
                            Total: {totalPrice} ₼
                        </div>

                        <button
                            onClick={checkout}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Complete Purchase
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Checkout;
