// src/pages/Favorite.jsx

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Favorite() {
  // Demo favorite products
  const favorites = [
    {
      id: 1,
      name: "Modern Chair",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
    {
      id: 2,
      name: "Luxury Sofa",
      price: 250,
      image:
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
    },
    {
      id: 3,
      name: "Wood Table",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1517705008128-361805f42e86",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-5">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <div className="flex items-center gap-3 mb-10">
          <Heart className="text-red-500" size={35} />
          <h1 className="text-5xl font-bold">
            Favorite Products
          </h1>
        </div>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="text-3xl font-semibold mb-4">
              No Favorite Products
            </h2>

            <Link to="/products">
              <button className="bg-black text-white px-8 py-4 rounded-full hover:opacity-90 transition">
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-72 object-cover"
                />

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 text-lg mb-6">
                    ${item.price}
                  </p>

                  {/* Buttons */}
                  <div className="space-y-3">
                    <Link to="/cart">
                      <button className="w-full bg-black text-white py-4 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition">
                        <ShoppingCart size={20} />
                        Add To Cart
                      </button>
                    </Link>

                    <button className="w-full border border-red-300 text-red-500 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-red-50 transition">
                      <Trash2 size={20} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}