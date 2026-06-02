import {
  Package,
  User,
  Settings,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  // SAFE JSON PARSE
  const safeParse = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };

  useEffect(() => {
    const loadData = () => {
      setUser(safeParse("user", {}));
      setProducts(safeParse("products", []));
      setOrders(safeParse("orders", []));
      setUsers(safeParse("users", []));
    };

    loadData();

    const handleStorage = () => loadData();
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => {
      return sum + Number(order.total || 0);
    }, 0);
  }, [orders]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col">

        <div className="p-8 text-2xl font-bold border-b border-blue-500">
          Admin Panel
        </div>

        <div className="flex-1 mt-8 space-y-2">

          <button className="w-full flex items-center gap-4 px-8 py-4 bg-blue-500">
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="w-full flex items-center gap-4 px-8 py-4 hover:bg-blue-500"
          >
            <User size={20} />
            User Info
          </button>

          <button
            onClick={() => navigate("/admin/product")}
            className="w-full flex items-center gap-4 px-8 py-4 hover:bg-blue-500"
          >
            <Package size={20} />
            Product
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
            className="w-full flex items-center gap-4 px-8 py-4 hover:bg-blue-500"
          >
            <ShoppingCart size={20} />
            Order
          </button>

          <button
            onClick={() => navigate("/admin/settings")}
            className="w-full flex items-center gap-4 px-8 py-4 hover:bg-blue-500"
          >
            <Settings size={20} />
            Setting
          </button>

        </div>

        <div className="p-4 border-t border-blue-500">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-xl"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1">

        {/* HEADER */}
        <div className="h-20 bg-white flex items-center justify-between px-10 border-b">

          <h1 className="text-2xl font-bold text-gray-700">
            Dashboard
          </h1>

          <div className="flex items-center gap-3">

            <div className="text-right">
              <p className="font-semibold">
                {user?.name || "Admin"}
              </p>
              <p className="text-sm text-gray-500">
                {user?.role || "admin"}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <img
                src={
                  user?.image ||
                  `https://ui-avatars.com/api/?name=${user?.name || "Admin"}`
                }
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>

        {/* CONTENT */}
        <div className="p-10">

          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Welcome Back 👋
          </h2>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-3xl shadow">
              <h3 className="text-gray-500 mb-2">Total Products</h3>
              <p className="text-4xl font-bold text-blue-600">
                {products.length}
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow">
              <h3 className="text-gray-500 mb-2">Total Orders</h3>
              <p className="text-4xl font-bold text-green-600">
                {orders.length}
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow">
              <h3 className="text-gray-500 mb-2">Revenue</h3>
              <p className="text-4xl font-bold text-purple-600">
                ${totalRevenue.toFixed(2)}
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow">
              <h3 className="text-gray-500 mb-2">Users</h3>
              <p className="text-4xl font-bold text-orange-600">
                {users.length}
              </p>
            </div>

          </div>

          {/* QUICK ACTIONS */}
          <div className="mt-10 bg-white rounded-3xl p-8 shadow">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/admin/product")}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl"
              >
                Manage Products
              </button>

              <button
                onClick={() => navigate("/admin/orders")}
                className="bg-green-600 text-white px-6 py-3 rounded-xl"
              >
                View Orders
              </button>

              <button
                onClick={() => navigate("/admin/users")}
                className="bg-orange-600 text-white px-6 py-3 rounded-xl"
              >
                Manage Users
              </button>
            </div>
          </div>

          {/* RECENT PRODUCTS */}
          <div className="mt-10 bg-white rounded-3xl p-8 shadow">
            <h3 className="text-xl font-bold mb-4">Recent Products</h3>

            <div className="space-y-3">
              {products.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between border-b pb-2"
                >
                  <span>{product.name}</span>
                  <span className="font-semibold">${product.price}</span>
                </div>
              ))}

              {products.length === 0 && (
                <p className="text-gray-500">No products found</p>
              )}
            </div>
          </div>

          {/* RECENT ORDERS */}
          <div className="mt-10 bg-white rounded-3xl p-8 shadow">
            <h3 className="text-xl font-bold mb-4">Recent Orders</h3>

            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between border-b pb-2"
                >
                  <span>Order #{order.id}</span>
                  <span className="text-green-600 font-semibold">
                    ${order.total}
                  </span>
                </div>
              ))}

              {orders.length === 0 && (
                <p className="text-gray-500">No orders found</p>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}