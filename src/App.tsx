import './App.css'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import { CartProvider } from './contextApi/cartContext';  


function App() {
  return (
    <CartProvider>
      <Navbar />
      <ProductList />
    </CartProvider>
  )
}

export default App
