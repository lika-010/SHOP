import { useLocation } from "react-router-dom";
import {
  Truck,
  MapPin,
  Search,
  HelpCircle,
} from "lucide-react";

export default function Buy() {
  const location = useLocation();
  const product = location.state;

  // 🛑 If no product (page refresh protection)
  if (!product) {
    return (
      <div className="text-center py-20 text-2xl font-semibold">
        No product selected
      </div>
    );
  }

  // 💰 Calculations
  const subtotal = product.price * (product.quantity || 1);
  const shipping = 8;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-10 px-5">
      <h1 className="text-4xl font-semibold text-center mb-12">
        Buy
      </h1>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm">

          {/* Delivery */}
          <h2 className="text-3xl font-semibold mb-8">
            Delivery Options
          </h2>

          <div className="grid grid-cols-2 gap-5 mb-8">

            <button className="border-2 border-black rounded-xl py-6 flex items-center justify-center gap-3 text-xl font-medium hover:bg-gray-100 transition">
              <Truck size={28} />
              Ship
            </button>

            <button className="border rounded-xl py-6 flex items-center justify-center gap-3 text-xl font-medium hover:bg-gray-100 transition">
              <MapPin size={28} />
              Pick Up
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 mb-10">
            <button className="px-8 py-3 rounded-full border text-lg font-medium bg-white">
              Home/Office
            </button>

            <button className="px-8 py-3 rounded-full bg-gray-100 text-lg font-medium">
              APO/FPO
            </button>
          </div>

          {/* Form */}
          <form className="space-y-8">

            <input
              type="email"
              placeholder="Email*"
              className="w-full border rounded-xl px-5 py-5 text-xl outline-none focus:ring-2 focus:ring-black"
            />

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="First Name*"
                className="border rounded-xl px-5 py-5 text-xl outline-none focus:ring-2 focus:ring-black"
              />

              <input
                type="text"
                placeholder="Last Name*"
                className="border rounded-xl px-5 py-5 text-xl outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={22}
                />

                <input
                  type="text"
                  placeholder="Start typing address"
                  className="w-full border rounded-xl pl-14 pr-5 py-5 text-xl outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="button"
                className="mt-4 underline text-gray-700 text-lg"
              >
                Enter address manually
              </button>
            </div>

            <input
              type="text"
              placeholder="Phone Number*"
              className="w-full md:w-1/2 border rounded-xl px-5 py-5 text-xl outline-none focus:ring-2 focus:ring-black"
            />

            <div className="pt-10">
              <button className="bg-gray-200 text-gray-600 px-12 py-5 rounded-full text-xl font-semibold hover:bg-gray-300 transition">
                Save & Continue
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-8 rounded-2xl shadow-sm h-fit">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-semibold">
              In Your Bag
            </h2>

            <button className="underline text-xl">
              Edit
            </button>
          </div>

          {/* Summary */}
          <div className="space-y-4 text-xl">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span>Estimated Tax</span>
                <HelpCircle size={18} />
              </div>

              <span>$0.00</span>
            </div>

            <div className="border-t pt-5 flex justify-between text-2xl font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* PRODUCT (DYNAMIC) */}
          <div className="border-t mt-10 pt-8">
            <h3 className="text-2xl font-semibold mb-6">
              Arrives by Fri, May 29
            </h3>

            <div className="flex gap-5">

              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg"
              />

              <div>
                <h4 className="text-2xl font-semibold">
                  ${product.price}
                </h4>

                <p className="text-xl font-medium">
                  {product.name}
                </p>

                <p className="text-gray-600 text-lg">
                  {product.category}
                </p>

                {product.size && (
                  <p className="text-gray-600 text-lg">
                    Size: {product.size}
                  </p>
                )}

                <p className="mt-3 text-lg text-gray-700">
                  Qty: {product.quantity || 1}
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}