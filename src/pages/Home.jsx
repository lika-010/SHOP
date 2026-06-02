import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import { Link } from "react-router-dom";
import slide1 from "../assets/slide1.jpg";

export default function Home() {
  const slides = [
    {
      image: slide1,
      title: "Fashion Collection",
      subtitle: "Trending styles for everyone",
    },
    {
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
      title: "New Arrivals",
      subtitle: "Fresh looks just dropped",
    },
    {
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
      title: "Summer Sale",
      subtitle: "Up to 50% off selected items",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Filter products by tag
  const discountProducts = products.filter(
    (product) => product.tag === "discount"
  );

  const bestProducts = products.filter(
    (product) => product.tag === "best"
  );

  const newProducts = products.filter(
    (product) => product.tag === "new"
  );

  return (
    <div>
      {/* HERO SLIDER */}
      <section className="relative h-[500px] overflow-hidden">
        <img
          src={slides[index].image}
          alt="slide"
          className="w-full h-full object-cover transition-all duration-700"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-5xl md:text-6xl font-bold">
            {slides[index].title}
          </h1>

          <p className="mt-4 text-lg">
            {slides[index].subtitle}
          </p>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* SHOP NOW */}
      <section className="max-w-6xl mx-auto py-20 px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-snug">
            Start Shopping Now
          </h2>

          <p className="mt-4 text-gray-500 text-sm md:text-base max-w-md">
            Discover trending products, latest fashion styles, and exclusive
            deals curated just for you.
          </p>
        </div>

        <Link
          to="/products"
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-black/10 bg-black text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          Shop Now
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </Link>
      </section>

      {/* DISCOUNT COLLECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-center mb-10">
          Discount Collection
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {discountProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* BEST SELLER COLLECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-center mb-10">
          Best Seller Collection
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-center mb-10">
          New Arrivals Collection
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </div>
  );
}