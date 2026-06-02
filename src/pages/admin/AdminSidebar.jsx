import {
  Package,
  User,
  Settings,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "User Info", icon: User, path: "/admin/users" },
  { name: "Product", icon: Package, path: "/admin/product" },
  { name: "Order", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Setting", icon: Settings, path: "/admin/settings" },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Active route checker
  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return (
      location.pathname === path ||
      location.pathname.startsWith(path + "/")
    );
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();

    navigate("/login", { replace: true });
  };

  return (
    <aside
      className="w-64 min-h-screen bg-blue-600 text-white flex flex-col shadow-lg"
      aria-label="Admin Sidebar"
    >
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
              className={`w-full flex items-center gap-4 px-8 py-4 text-left rounded-lg transition-all duration-200
                ${
                  isActive(item.path)
                    ? "bg-blue-500 border-r-4 border-white font-semibold"
                    : "hover:bg-blue-500/70"
                }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="p-6 border-t border-blue-500">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}