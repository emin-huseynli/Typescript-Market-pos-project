import { useContext } from "react"
import { FaBasketShopping } from "react-icons/fa6";
import Logo from "../assets/logo.jpg"
import { CartContext } from "../contextApi/CartContext"
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate()

    const cartCtx = useContext(CartContext)
    if (!cartCtx) return null
    const { setSearch, totalItems } = cartCtx

    const handleNavigate = () => {
        navigate('/cart')
    }

    return (
        <div className="flex bg-blue-600 p-[20px] justify-between items-center h-[100px] " >
            <div><img src={Logo} alt="logo" className="rounded-[1000px] w-full h-[80px]" /></div>
            <div className="flex items-center gap-5.5"><input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search for phone..."
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 bg-amber-50 focus:ring-green-500"
                type="text" />
                <div className="relative cursor-pointer" onClick={handleNavigate}>
                    <FaBasketShopping className="text-2xl text-white" />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {totalItems}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar