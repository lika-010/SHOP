import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // 🔄 load cart
  const loadCart = () => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(saved);
  };

  useEffect(() => {
    loadCart();

    // optional: sync when storage changes
    const handleStorage = () => loadCart();
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // 🛒 update quantity (IMMUTABLE)
  const updateQuantity = (id, change) => {
    const updated = cartItems
      .map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          quantity: item.quantity + change,
        };
      })
      .filter((item) => item.quantity > 0);

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = cartItems.length > 0 ? 5 : 0;
  const finalTotal = totalPrice + shipping;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-3">

        {/* LEFT */}
        <div className="lg:col-span-2 p-10">

          <div className="flex items-center gap-3 mb-10">
            <ShoppingBag size={36} />
            <h1 className="text-4xl font-bold">Shopping Cart</h1>

            <span className="ml-auto text-gray-500 font-semibold">
              {cartItems.length} items
            </span>
          </div>

          {/* ITEMS */}
          <div className="space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size || ""}`}
                  className="flex items-center justify-between border rounded-2xl p-5"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      className="w-24 h-24 object-cover rounded-xl"
                    />

                    <div>
                      <h3 className="text-xl font-semibold">
                        {item.name}
                      </h3>

                      {item.size && (
                        <p className="text-sm text-gray-500">
                          Size: {item.size}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-10 h-10 rounded-full border"
                    >
                      -
                    </button>

                    <span className="text-xl font-semibold w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-10 h-10 rounded-full border"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="border rounded-3xl p-10 text-center">
                <h2 className="text-2xl font-semibold">
                  Your cart is empty
                </h2>
                <p className="text-gray-500 mt-2">
                  Add some products to continue shopping
                </p>
              </div>
            )}
          </div>

          <div className="mt-16">
            <Link to="/" className="text-gray-600 hover:text-black">
              ← Back to shop
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-gray-100 p-10">

          <h2 className="text-3xl font-bold mb-8">Summary</h2>

          <div className="space-y-6 text-lg">

            <div className="flex justify-between">
              <span>ITEMS</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between">
              <span>SUBTOTAL</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>SHIPPING</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="border-t pt-6 flex justify-between text-2xl font-bold">
              <span>TOTAL</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>

          </div>

          <button
            onClick={() => navigate("/checkout")}
            disabled={cartItems.length === 0}
            className="w-full mt-10 bg-black text-white py-4 rounded-full disabled:opacity-50"
          >
            CHECKOUT
          </button>

        </div>

      </div>
    </div>
  );
}