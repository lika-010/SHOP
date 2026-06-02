import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";

export default function ProductCard({ product, addToCart }) {

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (addToCart) {
      addToCart(product);
    } else {
      // fallback localStorage cart
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart!");
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group">

      {/* IMAGE + CLICK AREA */}
      <Link to={`/product/${product.id}`}>
        <div className="overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4">

          {/* BRAND (dynamic fallback) */}
          <p className="text-xs uppercase text-gray-400">
            {product.brand || product.category || "Fashion"}
          </p>

          <h3 className="text-lg font-semibold mt-1 line-clamp-1">
            {product.name}
          </h3>

          {/* PRICE */}
          <div className="flex items-center justify-between mt-3">

            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">
                ${product.salePrice || product.price}
              </span>

              {product.salePrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.price}
                </span>
              )}
            </div>

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              className="w-10 h-10 flex items-center justify-center border rounded-lg hover:bg-black hover:text-white transition"
            >
              <FiShoppingBag size={18} />
            </button>

          </div>
        </div>
      </Link>

      {/* ACTION AREA (OUTSIDE LINK for flexibility) */}
      <div className="p-4 pt-0">

        <Link
          to={`/product/${product.id}`}
          className="block w-full bg-black text-white text-center py-3 rounded-xl font-medium hover:bg-gray-800 transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}