import Home from './pages/Home'
import ItemsPage from './pages/ItemsPage';
import CartPage from './components/cart/CartPage'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className='bg-[#f8f8f8]'>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/query" element={<ItemsPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
    </div>
  )
}

export default App
