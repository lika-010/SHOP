import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductAdmin from "./pages/admin/ProductAdmin";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminSettings from "./pages/admin/AdminSettings";

import Favorite from "./pages/Favorite";
import Buy from "./pages/buy";
import About from "./pages/About";

// 🔥 Layout wrapper (hide navbar/footer in admin)
function Layout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/about" element={<About />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/product" element={<ProductAdmin />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}