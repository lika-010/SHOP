import {
Package,
User,
Settings,
ShoppingCart,
LayoutDashboard,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar() {
const navigate = useNavigate();
const location = useLocation();

const menuItems = [
{
name: "Dashboard",
icon: LayoutDashboard,
path: "/admin",
},
{
name: "User Info",
icon: User,
path: "/admin/users",
},
{
name: "Product",
icon: Package,
path: "/admin/product",
},
{
name: "Order",
icon: ShoppingCart,
path: "/admin/orders",
},
{
name: "Setting",
icon: Settings,
path: "/admin/settings",
},
];

return ( <aside className="w-64 bg-blue-600 text-white"> <div className="p-8 text-2xl font-bold">
Admin Panel </div>

```
  <div className="mt-10 space-y-2">
    {menuItems.map((item) => {
      const Icon = item.icon;

      return (
        <button
          key={item.name}
          onClick={() => navigate(item.path)}
          className={`w-full flex items-center gap-4 px-8 py-4 transition ${
            location.pathname === item.path
              ? "bg-blue-500"
              : "hover:bg-blue-500"
          }`}
        >
          <Icon size={20} />
          {item.name}
        </button>
      );
    })}
  </div>
</aside>

);
}
