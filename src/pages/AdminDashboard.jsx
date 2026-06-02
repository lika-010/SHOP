import {
Package,
User,
Settings,
ShoppingCart,
LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
const navigate = useNavigate();

const user =
JSON.parse(localStorage.getItem("user")) || {};

const products =
JSON.parse(localStorage.getItem("products")) || [];

return ( <div className="flex min-h-screen bg-gray-100">
{/* SIDEBAR */} <aside className="w-64 bg-blue-600 text-white"> <div className="p-8 text-2xl font-bold">
Admin Panel </div>

```
    <div className="mt-10 space-y-2">
      <button className="w-full flex items-center gap-4 px-8 py-4 bg-blue-500">
        <LayoutDashboard size={20} />
        Dashboard
      </button>

      <button className="w-full flex items-center gap-4 px-8 py-4 hover:bg-blue-500">
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

      <button className="w-full flex items-center gap-4 px-8 py-4 hover:bg-blue-500">
        <ShoppingCart size={20} />
        Order
      </button>

      <button className="w-full flex items-center gap-4 px-8 py-4 hover:bg-blue-500">
        <Settings size={20} />
        Setting
      </button>
    </div>
  </aside>

  {/* MAIN */}
  <main className="flex-1">
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
            Administrator
          </p>
        </div>

        <img
          src={`https://ui-avatars.com/api/?name=${
            user?.name || "Admin"
          }`}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>

    <div className="p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome Back 👋
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow">
          <h3 className="text-gray-500 mb-2">
            Total Products
          </h3>
          <p className="text-4xl font-bold text-blue-600">
            {products.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3 className="text-gray-500 mb-2">
            Total Orders
          </h3>
          <p className="text-4xl font-bold text-green-600">
            0
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <h3 className="text-gray-500 mb-2">
            Total Users
          </h3>
          <p className="text-4xl font-bold text-violet-600">
            1
          </p>
        </div>
      </div>

      <div className="mt-10 bg-white rounded-3xl p-8 shadow">
        <h3 className="text-xl font-bold mb-4">
          Quick Actions
        </h3>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/admin/product")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Manage Products
          </button>

          <button className="bg-green-600 text-white px-6 py-3 rounded-xl">
            View Orders
          </button>
        </div>
      </div>
    </div>
  </main>
</div>
);
}
