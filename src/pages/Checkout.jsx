import { useEffect, useState } from "react";
import {
  Truck,
  MapPin,
  Search,
  HelpCircle,
} from "lucide-react";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  // 🧠 form state (IMPORTANT)
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });

  // 🔄 load cart
  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = cartItems.length > 0 ? 5 : 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  // 🧾 submit order
  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!form.email || !form.firstName || !form.address) {
      alert("Please fill required fields");
      return;
    }

    const order = {
      id: Date.now(),
      customer: form,
      items: cartItems,
      total,
      date: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    // clear cart
    localStorage.removeItem("cart");
    setCartItems([]);

    alert("Order placed successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-10 px-5">
      <h1 className="text-4xl font-semibold text-center mb-12">
        Checkout
      </h1>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl">

          <h2 className="text-3xl font-semibold mb-8">
            Delivery Options
          </h2>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-8">

            <input
              type="email"
              placeholder="Email*"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full border rounded-xl px-5 py-5 text-xl"
            />

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="First Name*"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                className="border rounded-xl px-5 py-5 text-xl"
              />

              <input
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
                className="border rounded-xl px-5 py-5 text-xl"
              />
            </div>

            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={22}
              />

              <input
                type="text"
                placeholder="Address*"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                className="w-full border rounded-xl pl-14 py-5 text-xl"
              />
            </div>

            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="w-full md:w-1/2 border rounded-xl px-5 py-5 text-xl"
            />

            <button
              type="submit"
              className="bg-black text-white px-12 py-5 rounded-full text-xl font-semibold"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-8 rounded-2xl h-fit">

          <h2 className="text-3xl font-semibold mb-8">
            In Your Bag ({cartItems.length})
          </h2>

          {/* SUMMARY */}
          <div className="space-y-4 text-xl">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="border-t pt-5 flex justify-between text-2xl font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* ITEMS */}
          <div className="border-t mt-10 pt-8 space-y-6">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">
                Your cart is empty
              </p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-5">
                  <img
                    src={item.image}
                    className="w-28 h-28 object-cover rounded-lg"
                  />

                  <div>
                    <h4 className="text-xl font-semibold">
                      ${item.price * item.quantity}
                    </h4>

                    <p>{item.name}</p>
                    <p className="text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}