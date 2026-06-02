import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";

export default function ProductCard({ product, addToCart }) {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (addToCart) {
      addToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">

      {/* Clickable Card */}
      <Link to={`/product/${product.id}`}>
        <div className="overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4">
          <p className="text-xs uppercase text-gray-400">Brand</p>

          <h3 className="text-lg font-semibold mt-1 line-clamp-1">
            {product.name}
          </h3>

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

            {/* ADD TO CART ICON */}
            {/* <button
              onClick={handleAddToCart}
              className="w-10 h-10 flex items-center justify-center border rounded-lg cursor-pointer hover:bg-black hover:text-white transition"
            >
              <FiShoppingBag size={18} />
            </button> */}
          </div>
        </div>
      </Link>

      {/* Buy Button */}
      <div className="p-4 pt-0">
        <Link
          to={`/product/${product.id}`}
          className="block w-full bg-black text-white text-center py-3 rounded-xl font-medium hover:bg-gray-800 transition"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}