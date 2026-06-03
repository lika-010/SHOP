import { useState, useEffect } from "react";

export default function CartItem({ item, onUpdate }) {
  const [qty, setQty] = useState(Number(item.quantity) || 1);

  useEffect(() => {
    setQty(Number(item.quantity) || 1);
  }, [item.quantity]);

  const updateCart = (newQty) => {
    if (newQty < 1) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart
      .map((c) => {
        const sameItem =
          c.id === item.id &&
          (item.size ? c.size === item.size : true);

        return sameItem
          ? { ...c, quantity: newQty }
          : c;
      })
      .filter((c) => Number(c.quantity) > 0);

    localStorage.setItem("cart", JSON.stringify(cart));

    setQty(newQty);

    if (onUpdate) onUpdate(cart);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increase = () => updateCart(qty + 1);
  const decrease = () => updateCart(qty - 1);

  const price = Number(item.price) || 0;
  const total = price * qty;

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>

        <p className="text-gray-600">
          ${price.toFixed(2)}
          {item.size && ` • Size: ${item.size}`}
        </p>

        <p className="text-sm font-bold mt-1">
          Total: ${total.toFixed(2)}
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