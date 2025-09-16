import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import { CartProvider } from './contextApi/CartContext';
import ProductCard from './components/ProductCart';


function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/cart' element={<ProductCard />} />
      </Routes>
    </CartProvider>
  )
}

export default App
