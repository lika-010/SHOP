import { useEffect, useState } from "react";
import { Search, Truck, CreditCard } from "lucide-react";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
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

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = cartItems.length > 0 ? 5 : 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

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
      customer: form,
      items: cartItems,
      total,
      status: "pending",
      paymentMethod,
      paymentStatus:
        paymentMethod === "card" ? "paid" : "pending",

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

    const orders = safeParse("orders", []);

    localStorage.setItem(
      "orders",
      JSON.stringify([...orders, order])
    );

    localStorage.removeItem("cart");

    setCartItems([]);

    setForm({
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
    });

    setCardInfo({
      cardNumber: "",
      cardHolder: "",
      expiry: "",
      cvv: "",
    });

    alert(
      paymentMethod === "card"
        ? "Payment successful! Order placed."
        : "Order placed successfully!"
    );
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

            <input
              type="email"
              placeholder="Email*"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full border rounded-xl px-5 py-4"
            />

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="First Name*"
                value={form.firstName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    firstName: e.target.value,
                  })
                }
                className="border rounded-xl px-5 py-4"
              />

              <input
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    lastName: e.target.value,
                  })
                }
                className="border rounded-xl px-5 py-4"
              />
            </div>

            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                placeholder="Address*"
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value,
                  })
                }
                className="w-full border rounded-xl pl-12 py-4"
              />
            </div>

            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="w-full border rounded-xl px-5 py-4"
            />

            {/* PAYMENT */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Payment Method
              </h3>

              <div className="flex flex-wrap gap-4 mb-6">

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border ${
                    paymentMethod === "cod"
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >
                  <Truck size={18} />
                  Cash On Delivery
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border ${
                    paymentMethod === "card"
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >
                  <CreditCard size={18} />
                  Credit / Debit Card
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
              className="bg-black text-white px-10 py-4 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              Place Order
            </button>

          </form>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-8 rounded-2xl h-fit">

          <h2 className="text-3xl font-semibold mb-8">
            Order Summary
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

          </div>

          <div className="border-t mt-8 pt-6 space-y-4">

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">
                Your cart is empty
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div>
                    <h4 className="font-semibold">
                      {item.name}
                    </h4>

                    <p className="text-gray-500">
                      Qty: {item.quantity}
                    </p>

                    <p className="font-bold">
                      $
                      {(
                        item.price * item.quantity
                      ).toFixed(2)}
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