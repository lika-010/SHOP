import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Truck, MapPin, Search, HelpCircle, CreditCard } from "lucide-react";

export default function Buy() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state;

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

  // ✅ FIX: prevent crash on refresh
  if (!product) {
    return (
      <div className="text-center py-20 text-2xl font-semibold">
        No product selected
      </div>
    );
  }

  const quantity = product.quantity ? Number(product.quantity) : 1;
  const price = Number(product.price) || 0;

  const subtotal = price * quantity;
  const shipping = 8;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.address || !form.phone) {
      alert("Please fill all required fields");
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

    const order = {
      id: Date.now(),
      items: [
        {
          ...product,
          quantity,
        },
      ],
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
              cardNumber: "**** **** **** " + cardInfo.cardNumber.slice(-4),
              cardHolder: cardInfo.cardHolder,
            }
          : null,
      date: new Date().toISOString(),
    };

    try {
      // ✅ API CALL (Laravel / Node backend)
      const res = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Failed to create order");

      await res.json();

      alert(
        paymentMethod === "card"
          ? "Payment successful!"
          : "Order placed successfully!"
      );

      navigate("/");
    } catch (err) {
      console.warn("API failed, saving to localStorage fallback");

      // 🔁 fallback (for development only)
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      alert("Saved locally (backend not connected)");

      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-10 px-5">
      <h1 className="text-4xl font-semibold text-center mb-12">
        Buy Now
      </h1>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm">

          <h2 className="text-3xl font-semibold mb-8">
            Delivery Information
          </h2>

          <div className="grid grid-cols-2 gap-5 mb-8">
            <button type="button" className="border-2 border-black rounded-xl py-6 flex items-center justify-center gap-3 text-xl font-medium">
              <Truck size={28} />
              Ship
            </button>

            <button type="button" className="border rounded-xl py-6 flex items-center justify-center gap-3 text-xl font-medium">
              <MapPin size={28} />
              Pick Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* ADDRESS */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
              <input
                type="text"
                placeholder="Address*"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                className="w-full border rounded-xl pl-14 pr-5 py-5 text-xl"
              />
            </div>

            {/* PHONE */}
            <input
              type="text"
              placeholder="Phone Number*"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="w-full md:w-1/2 border rounded-xl px-5 py-5 text-xl"
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
                  className={`px-5 py-3 rounded-xl border ${
                    paymentMethod === "cod" ? "bg-black text-white" : ""
                  }`}
                >
                  Cash On Delivery
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border ${
                    paymentMethod === "card" ? "bg-black text-white" : ""
                  }`}
                >
                  <CreditCard size={18} />
                  Credit Card
                </button>
              </div>

              {/* CARD FORM */}
              {paymentMethod === "card" && (
                <div className="bg-gray-50 border rounded-xl p-5 space-y-4">

                  <input
                    type="text"
                    placeholder="Card Number"
                    maxLength={16}
                    value={cardInfo.cardNumber}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, cardNumber: e.target.value })
                    }
                    className="w-full border rounded-lg p-3"
                  />

                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    value={cardInfo.cardHolder}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, cardHolder: e.target.value })
                    }
                    className="w-full border rounded-lg p-3"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardInfo.expiry}
                      onChange={(e) =>
                        setCardInfo({ ...cardInfo, expiry: e.target.value })
                      }
                      className="border rounded-lg p-3"
                    />

                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength={4}
                      value={cardInfo.cvv}
                      onChange={(e) =>
                        setCardInfo({ ...cardInfo, cvv: e.target.value })
                      }
                      className="border rounded-lg p-3"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-black text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-gray-800"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-8 rounded-2xl shadow-sm h-fit">

          <h2 className="text-3xl font-semibold mb-8">
            Order Summary
          </h2>

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

          <div className="border-t mt-10 pt-8 flex gap-5">
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg"
            />

            <div>
              <h4 className="text-2xl font-semibold">
                {product.name}
              </h4>
              <p className="text-gray-600">{product.category}</p>
              <p className="mt-2">Qty: {quantity}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}