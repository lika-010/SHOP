import { useEffect, useState } from "react";
import { Search, Truck, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [form, setForm] = useState({
    address: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });

  const safeParse = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };

  useEffect(() => {
    const cart = safeParse("cart", []);
    setCartItems(cart);
  }, []);

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return total + price * qty;
  }, 0);

  const shipping = cartItems.length ? 5 : 0;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cartItems.length) {
      alert("Cart is empty");
      return;
    }

    if (!form.address || !form.phone) {
      alert("Please fill required fields");
      return;
    }

    if (paymentMethod === "card") {
      if (
        !cardInfo.cardNumber ||
        !cardInfo.cardHolder ||
        !cardInfo.expiry ||
        !cardInfo.cvv
      ) {
        alert("Please complete card information");
        return;
      }
    }

    // ✅ SAME STRUCTURE AS BUY PAGE
    const order = {
      id: Date.now(),

      items: cartItems.map((item) => ({
        ...item,
        quantity: Number(item.quantity) || 1,
      })),

      subtotal,
      shipping,
      total,

      status: "pending",

      customer: {
        address: form.address,
        phone: form.phone,
      },

      paymentMethod,

      paymentStatus: paymentMethod === "card" ? "paid" : "pending",

      cardInfo:
        paymentMethod === "card"
          ? {
              cardNumber:
                "**** **** **** " +
                cardInfo.cardNumber.slice(-4),
              cardHolder: cardInfo.cardHolder,
            }
          : null,

      date: new Date().toISOString(),
    };

    try {
      // 🔥 API (same as Buy page style)
      const res = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("API failed");

      await res.json();

      localStorage.removeItem("cart");
      setCartItems([]);

      alert("Order placed successfully!");

      navigate("/");
    } catch (err) {
      console.warn("API failed → saving locally");

      const orders = safeParse("orders", []);
      localStorage.setItem(
        "orders",
        JSON.stringify([...orders, order])
      );

      localStorage.removeItem("cart");
      setCartItems([]);

      alert("Saved locally (backend not connected)");
      navigate("/");
    }
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
            Delivery Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Address*"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                className="w-full border rounded-xl pl-12 py-4"
              />
            </div>

            <input
              type="text"
              placeholder="Phone Number*"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="w-full border rounded-xl px-5 py-4"
            />

            {/* PAYMENT */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Payment Method
              </h3>

              <div className="flex gap-4 mb-6">

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center gap-2 px-5 py-3 border rounded-xl ${
                    paymentMethod === "cod"
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  <Truck size={18} />
                  Cash On Delivery
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center gap-2 px-5 py-3 border rounded-xl ${
                    paymentMethod === "card"
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  <CreditCard size={18} />
                  Card
                </button>

              </div>

              {/* CARD FORM */}
              {paymentMethod === "card" && (
                <div className="bg-gray-50 border rounded-2xl p-5 space-y-4">

                  <input
                    type="text"
                    placeholder="Card Number"
                    maxLength={16}
                    value={cardInfo.cardNumber}
                    onChange={(e) =>
                      setCardInfo({
                        ...cardInfo,
                        cardNumber: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl p-3"
                  />

                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    value={cardInfo.cardHolder}
                    onChange={(e) =>
                      setCardInfo({
                        ...cardInfo,
                        cardHolder: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl p-3"
                  />

                  <div className="grid grid-cols-2 gap-4">

                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardInfo.expiry}
                      onChange={(e) =>
                        setCardInfo({
                          ...cardInfo,
                          expiry: e.target.value,
                        })
                      }
                      className="border rounded-xl p-3"
                    />

                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength={4}
                      value={cardInfo.cvv}
                      onChange={(e) =>
                        setCardInfo({
                          ...cardInfo,
                          cvv: e.target.value,
                        })
                      }
                      className="border rounded-xl p-3"
                    />

                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-black text-white px-10 py-4 rounded-full font-semibold"
            >
              Place Order
            </button>

          </form>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-8 rounded-2xl h-fit">

          <h2 className="text-3xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t mt-8 pt-6">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center">
                Cart is empty
              </p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 mb-4">
                  <img
                    src={item.image}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold">
                      {item.name}
                    </h4>
                    <p className="text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
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