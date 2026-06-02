import { useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import bannerImg from "../assets/slide.png";

export default function Products() {
  const { category } = useParams();
  const location = useLocation();

  // 🔍 GET SEARCH FROM URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  // 📂 CATEGORY STATE
  const [selectedCategory, setSelectedCategory] = useState(
    category
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : "All"
  );

  const categories = ["All", "Women", "Men"];

  // 🔥 SMART NORMALIZER (fix shirt, tshirt, shoes)
  const normalize = (text = "") =>
    text
      .toLowerCase()
      .replace(/tshirt/g, "shirt")
      .replace(/tee shirt/g, "shirt")
      .replace(/sneakers/g, "shoes");

  // 🔥 FILTER (CATEGORY + SEARCH)
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item.category === selectedCategory;

      const keyword = normalize(searchQuery);

      const matchesSearch =
        keyword === "" ||
        normalize(item.name).includes(keyword) ||
        normalize(item.category).includes(keyword) ||
        normalize(item.type).includes(keyword) ||
        (item.tag && item.tag.toLowerCase().includes(keyword));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* BANNER */}
      <section className="relative">
        <img
          src={bannerImg}
          alt="Banner"
          className="w-full object-contain"
        />

        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Star By KA Collection
          </h1>

          <p className="mt-4 text-lg md:text-xl">
            Discover Our Latest Fashion Collections
          </p>
        </div>

        {/* CATEGORY BUTTONS */}
        <div className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 flex gap-4 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-full font-semibold transition
                ${
                  selectedCategory === cat
                    ? "bg-white text-black shadow-lg"
                    : "bg-black/40 text-white backdrop-blur hover:bg-black/60"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto py-16 px-6">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            {selectedCategory === "All"
              ? "All Products"
              : `${selectedCategory} Collection`}
          </h2>

          <p className="text-gray-500 mt-3">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : "Browse our latest fashion products"}
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-600">
                No products found
              </h3>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}