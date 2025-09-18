import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import { CartProvider } from './contextApi/CartContext';
import ProductCard from './components/ProductCart';
import { ToastContainer } from 'react-toastify';
import Checkout from './components/Checkout';


function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/cart' element={<ProductCard />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </CartProvider>
  )
}

export default App
