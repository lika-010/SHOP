import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Ruler } from "lucide-react";
import products from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="text-center py-20 text-2xl font-semibold">
        Product not found
      </div>
    );
  }

  // ✅ SAFE GALLERY
  const gallery =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image || "/placeholder.png"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const [selectedSize, setSelectedSize] = useState("");

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleThumbnailClick = (img, index) => {
    setSelectedImage(img);
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const newIndex =
      currentIndex === 0 ? gallery.length - 1 : currentIndex - 1;

    setCurrentIndex(newIndex);
    setSelectedImage(gallery[newIndex]);
  };

  const handleNext = () => {
    const newIndex =
      currentIndex === gallery.length - 1 ? 0 : currentIndex + 1;

    setCurrentIndex(newIndex);
    setSelectedImage(gallery[newIndex]);
  };

  // 🛒 FIXED CART LOGIC (IMMUTABLE)
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (index !== -1) {
      cart[index] = {
        ...cart[index],
        quantity: cart[index].quantity + 1,
      };
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

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.name} added to cart!`);
    navigate("/cart");
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Thumbnails */}
        <div className="hidden md:flex flex-col gap-3 lg:col-span-1">
          {gallery.map((img, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(img, index)}
              className={`border rounded-xl overflow-hidden ${
                currentIndex === index ? "border-black" : "border-gray-200"
              }`}
            >
              <img src={img} className="w-20 h-20 object-cover" />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="lg:col-span-6 relative">
          <div className="bg-[#e9e9e9] rounded-3xl overflow-hidden">
            <img
              src={selectedImage}
              className="w-full h-[700px] object-cover"
            />
          </div>

          {gallery.length > 1 && (
            <div className="absolute bottom-5 right-5 flex gap-3">
              <button onClick={handlePrev} className="btn-circle">
                <ChevronLeft />
              </button>
              <button onClick={handleNext} className="btn-circle">
                <ChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:col-span-5 space-y-8">

          <div>
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <p className="text-gray-500">{product.category}</p>
            <p className="text-2xl mt-5">${product.price}</p>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-xl font-medium mb-4">Select Size</h3>

            <div className="grid grid-cols-2 gap-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border rounded-xl py-4 ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-5 rounded-full"
            >
              Add To Cart
            </button>

            <button
              onClick={() => {
                if (!selectedSize) return alert("Select size");

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
              className="w-full border py-5 rounded-full"
            >
              Buy Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}