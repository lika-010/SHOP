import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Ruler,
} from "lucide-react";
import products from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="text-center py-20 text-2xl font-semibold">
        Product not found
      </div>
    );
  }

  const gallery =
    product.images?.length > 0
      ? product.images
      : [product.image];

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [selectedImage, setSelectedImage] =
    useState(gallery[0]);

  const [selectedSize, setSelectedSize] =
    useState("");

  const sizes = [
    "XS (0-2)",
    "S (4-6)",
    "M (8-10)",
    "L (12-14)",
    "XL (16-18)",
    "XXL (20-22)",
  ];

  const handleThumbnailClick = (
    image,
    index
  ) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const newIndex =
      currentIndex === 0
        ? gallery.length - 1
        : currentIndex - 1;

    setCurrentIndex(newIndex);
    setSelectedImage(gallery[newIndex]);
  };

  const handleNext = () => {
    const newIndex =
      currentIndex === gallery.length - 1
        ? 0
        : currentIndex + 1;

    setCurrentIndex(newIndex);
    setSelectedImage(gallery[newIndex]);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const existingItem = cart.find(
      (item) =>
        item.id === product.id &&
        item.size === selectedSize
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        image: selectedImage,
        price: product.price,
        category: product.category,
        size: selectedSize,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert(`${product.name} added to cart!`);
    navigate("/cart");
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Thumbnail Images */}
        <div className="hidden md:flex flex-col gap-3 lg:col-span-1">
          {gallery.map((img, index) => (
            <button
              key={index}
              onClick={() =>
                handleThumbnailClick(
                  img,
                  index
                )
              }
              className={`border rounded-xl overflow-hidden ${
                currentIndex === index
                  ? "border-black"
                  : "border-gray-200"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${
                  index + 1
                }`}
                className="w-20 h-20 object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="lg:col-span-6 relative">
          <div className="bg-[#e9e9e9] rounded-3xl overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[700px] object-cover"
            />
          </div>

          {gallery.length > 1 && (
            <div className="absolute bottom-5 right-5 flex gap-3">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="lg:col-span-5 space-y-8">

          <div>
            <h1 className="text-3xl font-semibold">
              {product.name}
            </h1>

            <p className="text-gray-500 text-lg mt-2">
              {product.category}
            </p>

            <p className="text-2xl font-medium mt-5">
              ${product.price}
            </p>
          </div>

          {/* Small Preview Images */}
          <div className="flex gap-3">
            {gallery.map((img, index) => (
              <button
                key={index}
                onClick={() =>
                  handleThumbnailClick(
                    img,
                    index
                  )
                }
                className={`border rounded-xl overflow-hidden w-20 h-20 ${
                  currentIndex === index
                    ? "border-black"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`Preview ${
                    index + 1
                  }`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Sizes */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-medium">
                Select Size
              </h3>

              <button className="flex items-center gap-2 text-gray-700 hover:text-black">
                <Ruler size={18} />
                <span className="text-sm">
                  Size Guide
                </span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(size)
                  }
                  className={`border rounded-xl py-5 text-lg transition ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Product Details
            </h3>

            <p className="text-gray-600 leading-8">
              Premium quality fashion
              product with modern style and
              comfortable fabric. Perfect
              for everyday wear and casual
              outfits.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-5 rounded-full text-xl font-medium hover:opacity-90 transition"
            >
              Add To Cart
            </button>

            <button
              onClick={() => {
                if (!selectedSize) {
                  alert(
                    "Please select a size"
                  );
                  return;
                }

                navigate("/buy", {
                  state: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: selectedImage,
                    size: selectedSize,
                    quantity: 1,
                  },
                });
              }}
              className="w-full border border-gray-300 py-5 rounded-full text-xl font-medium flex items-center justify-center hover:border-black transition"
            >
              Buy Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}