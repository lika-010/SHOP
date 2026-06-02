import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Favorite from "./pages/Favorite";
import Buy from "./pages/buy";
import About from "./pages/About";
import ProductAdmin from "./pages/ProductAdmin";
export default function App() {
return (
<BrowserRouter>

<Navbar/>

<Routes>
<Route path="/admin" element={<AdminDashboard />} />
<Route path="/admin/product" element={<ProductAdmin />} />

<Route path="/" element={<Home/>}/>
<Route path="/products" element={<Products/>}/>
<Route path="/product/:id" element={<ProductDetail/>}/>
<Route path="/cart" element={<Cart/>}/>
<Route path="/checkout" element={<Checkout/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/admin" element={<AdminDashboard/>}/>
<Route path="/products" element={<Products/>}/>
<Route path="/products/:category" element={<Products/>}/>
<Route path="/favorite" element={<Favorite />} />
<Route path="/buy" element={<Buy />} />
<Route path="/About" element={<About />} />
<Route path="/admin/product" element={<ProductAdmin />} />


</Routes>

<Footer/>

</BrowserRouter>
)
}