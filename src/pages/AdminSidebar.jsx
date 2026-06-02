import {
  Package,
  User,
  Settings,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "User Info", icon: User, path: "/admin/users" },
    { name: "Product", icon: Package, path: "/admin/product" },
    { name: "Order", icon: ShoppingCart, path: "/admin/orders" },
    { name: "Setting", icon: Settings, path: "/admin/settings" },
  ];

  // 🔥 better active match (supports nested routes)
  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-blue-600 text-white flex flex-col">

      {/* HEADER */}
      <div className="p-8 text-2xl font-bold border-b border-blue-500">
        Admin Panel
      </div>

      {/* MENU */}
      <div className="flex-1 mt-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-8 py-4 transition text-left
                ${
                  isActive(item.path)
                    ? "bg-blue-500"
                    : "hover:bg-blue-500/60"
                }`}
            >
              <Icon size={20} />
              {item.name}
            </button>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="p-6 border-t border-blue-500">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 hover:bg-red-500 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}