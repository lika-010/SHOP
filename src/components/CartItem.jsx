import { useState, useEffect } from "react";

export default function CartItem({ item, onUpdate }) {
  const [qty, setQty] = useState(item.quantity || 1);

  useEffect(() => {
    setQty(item.quantity || 1);
  }, [item.quantity]);

  const updateCart = (newQty) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.map((c) =>
      c.id === item.id && c.size === item.size
        ? { ...c, quantity: newQty }
        : c
    );

    cart = cart.filter((c) => c.quantity > 0);

    localStorage.setItem("cart", JSON.stringify(cart));

    setQty(newQty);

    if (onUpdate) onUpdate(cart);

    // trigger sync for navbar/cart/checkout
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increase = () => updateCart(qty + 1);
  const decrease = () => updateCart(qty - 1);

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">

      {/* Product Info */}
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">
          ${item.price} {item.size && `• Size: ${item.size}`}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={decrease}
          className="w-8 h-8 rounded-full border hover:bg-gray-100"
        >
          -
        </button>

        <span className="w-6 text-center">{qty}</span>

        <button
          onClick={increase}
          className="w-8 h-8 rounded-full border hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  );
}