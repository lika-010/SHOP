import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // SAFE PARSE
  const safeParse = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };

  useEffect(() => {
    const data = safeParse("orders", []);
    setOrders(data);
  }, []);

  // STATUS STYLE
  const getStatusStyle = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6">
          Orders Management
        </h1>

        {/* EMPTY STATE */}
        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center text-gray-500">
            No orders found
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">

            {/* TABLE HEADER */}
            <div className="grid grid-cols-4 font-bold bg-gray-50 p-4 border-b">
              <span>Order ID</span>
              <span>Total</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            {/* ORDERS LIST */}
            {orders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-4 p-4 border-b hover:bg-gray-50 transition"
              >

                {/* ID */}
                <span className="font-medium">
                  #{order.id}
                </span>

                {/* TOTAL */}
                <span className="font-semibold text-green-600">
                  ${order.total}
                </span>

                {/* STATUS */}
                <span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status || "unknown"}
                  </span>
                </span>

                {/* ACTION */}
                <button
                  onClick={() => {
                    const updated = orders.filter(
                      (o) => o.id !== order.id
                    );
                    setOrders(updated);
                    localStorage.setItem(
                      "orders",
                      JSON.stringify(updated)
                    );
                  }}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}