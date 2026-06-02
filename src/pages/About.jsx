import { Users, Award, Truck, ShieldCheck } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Award size={40} />,
      title: "Premium Quality",
      desc: "We carefully select high-quality products to ensure customer satisfaction.",
    },
    {
      icon: <Truck size={40} />,
      title: "Fast Delivery",
      desc: "Quick and reliable shipping service across the country.",
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "Secure Payment",
      desc: "Your payment information is protected with advanced security.",
    },
    {
      icon: <Users size={40} />,
      title: "Customer First",
      desc: "We prioritize customer experience and provide dedicated support.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
          alt="About Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              About Us
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Discover our story, passion, and commitment to delivering the
              best shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
              alt="Our Story"
              className="rounded-3xl shadow-xl"
            />
          </div>

          <div>
            <span className="text-pink-600 font-semibold uppercase">
              Our Story
            </span>

            <h2 className="text-4xl font-bold mt-3 mb-6">
              Fashion That Inspires Confidence
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Founded with a passion for style and innovation, we believe
              fashion should empower people to express themselves confidently.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our mission is to provide trendy, high-quality clothing and
              accessories that blend comfort, elegance, and affordability.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose Us
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              We strive to provide the best shopping experience through quality
              products and exceptional service.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition duration-300 text-center"
              >
                <div className="flex justify-center text-pink-600 mb-5">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div>
              <h3 className="text-5xl font-bold text-pink-500">10K+</h3>
              <p className="mt-2 text-gray-300">Happy Customers</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-pink-500">500+</h3>
              <p className="mt-2 text-gray-300">Products</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-pink-500">50+</h3>
              <p className="mt-2 text-gray-300">Brands</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-pink-500">5 Years</h3>
              <p className="mt-2 text-gray-300">Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">
              Meet Our Team
            </h2>

            <p className="text-gray-600">
              The people behind our success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Michael Smith",
                role: "Creative Director",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Emma Wilson",
                role: "Marketing Manager",
                img: "https://randomuser.me/api/portraits/women/68.jpg",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-80 object-cover"
                />

                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold">
                    {member.name}
                  </h3>

                  <p className="text-pink-600 mt-2">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pink-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-4">
            Join Our Fashion Journey
          </h2>

          <p className="mb-8 text-lg">
            Explore our latest collections and discover styles that define you.
          </p>

          <button className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition">
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
}