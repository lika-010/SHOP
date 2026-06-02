import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  KeyRound,
  Settings,
  Pencil,
  RefreshCw,
  UserPlus,
  Users,
  LogOut,
} from "lucide-react";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // Load user + cart
  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) setUser(savedUser);
    } catch (error) {
      console.error("Invalid user data");
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []);

  // Sync storage
  useEffect(() => {
    const handleStorage = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Search function
  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LEFT */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="../src/assets/logo.png"
              alt="Logo"
              className="w-20 h-11 object-cover rounded-2xl"
            />
          </Link>

          <ul className="hidden md:flex gap-8 font-medium text-gray-700">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Type</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">

          {/* SEARCH */}
          <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full w-72">
            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="find"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-transparent ml-3 w-full outline-none text-sm"
            />
          </div>

          {/* CART */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {cartCount}
              </span>
            )}
          </Link>

          {/* LOGIN / PROFILE */}
          {!user ? (
            <div className="hidden md:flex gap-3">
              <Link to="/login">
                <button className="bg-gray-400 text-white px-5 py-2 rounded-full">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="border border-gray-400 text-gray-400 px-5 py-2 rounded-full">
                  Register
                </button>
              </Link>
            </div>
          ) : (
            <>
              <span className="hidden md:block font-medium">
                {user.name}
              </span>

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center"
              >
                {user.name?.charAt(0)}
              </button>
            </>
          )}

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
            <Menu />
          </button>
        </div>
      </div>

      {/* MOBILE */}
      {mobileOpen && (
        <div className="md:hidden border-t px-6 py-6 space-y-4">
          <Link to="/" onClick={closeMobile}>Home</Link>
          <Link to="/products" onClick={closeMobile}>Type</Link>
          <Link to="/about" onClick={closeMobile}>About</Link>
          <Link to="/cart" onClick={closeMobile}>Cart</Link>
        </div>
      )}
    </nav>
  );
}