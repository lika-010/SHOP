import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);

  // GET LOGGED IN USER
  const user = JSON.parse(localStorage.getItem("user"));

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

      <AdminSidebar />

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Orders Management
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center text-gray-500">
            No orders found
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">

            {/* HEADER */}
            <div className="grid grid-cols-6 font-bold bg-gray-50 p-4 border-b">
              <span>Order ID</span>
              <span>User</span>
              <span>Total</span>
              <span>Status</span>
              <span>Action</span>
              <span>Details</span>
            </div>

            {/* LIST */}
            {orders.map((order) => (
              <div key={order.id} className="border-b">

                {/* MAIN ROW */}
                <div className="grid grid-cols-6 p-4 hover:bg-gray-50 items-center">

                  {/* ORDER ID */}
                  <span className="font-medium">
                    #{order.id}
                  </span>

                  {/* USER */}
                  <span className="font-medium text-gray-700">
                    {order.userName ||
                      order.user?.name ||
                      user?.name ||
                      "Guest"}
                  </span>

                  {/* TOTAL */}
                  <span className="font-semibold text-green-600">
                    ${order.total}
                  </span>

                  {/* STATUS */}
                  <span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(order.status)}`}>
                      {order.status || "unknown"}
                    </span>
                  </span>

                  {/* DELETE */}
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

                  {/* DETAILS BUTTON */}
                  <button
                    onClick={() =>
                      setOpenOrderId(
                        openOrderId === order.id ? null : order.id
                      )
                    }
                    className="text-blue-600 hover:underline"
                  >
                    {openOrderId === order.id ? "Hide" : "View"}
                  </button>
                </div>

                {/* PRODUCT DETAILS */}
                {openOrderId === order.id && (
                  <div className="bg-gray-50 p-4">
                    <h3 className="font-semibold mb-3">
                      Order Products
                    </h3>

                    {order.items?.length ? (
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm"
                          >
                            <img
                              src={item.image}
                              className="w-14 h-14 object-cover rounded"
                            />

                            <div className="flex-1">
                              <p className="font-medium">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                Qty: {item.qty}
                              </p>
                            </div>

                            <div className="font-semibold text-blue-600">
                              ${item.price}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        No product details found
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}