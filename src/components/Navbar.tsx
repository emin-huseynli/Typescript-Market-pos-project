import Logo from "../assets/logo.jpg"
const Navbar = () => {
    return (
        <div className="flex bg-blue-600 p-[20px] justify-between items-center h-[100px] " >
            <div><img src={Logo} alt="logo" className="rounded-[1000px] w-full h-[80px]" /></div>
            <div><input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 bg-amber-50 focus:ring-green-500" type="text" /></div>
        </div>
    )
}

export default Navbar