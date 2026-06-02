import React from "react";
import { FaFacebookF, FaInstagram, FaArrowRight } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] text-white">

      <div className="h-[1px] bg-white/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">

          {/* LEFT */}
          <div className="lg:col-span-6">

            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-snug">
              Stay Updated
            </h2>

            <p className="mt-5 text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
              Subscribe for product updates, plant care tips, exclusive offers,
              and news directly in your inbox.
            </p>

            {/* INPUT */}
            <form
              className="mt-8 flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >

              <input
                type="email"
                placeholder="Email address"
                className="
                  w-full sm:w-[380px]
                  bg-white/5
                  border border-white/10
                  px-5 py-4
                  rounded-full
                  text-sm text-white
                  placeholder:text-gray-500
                  outline-none
                  focus:border-white/30
                  focus:bg-white/10
                  transition
                "
              />

              <button
                type="submit"
                className="
                  group flex items-center justify-center gap-2
                  border border-white/20
                  px-6 py-4
                  rounded-full
                  text-sm
                  hover:bg-white hover:text-black
                  transition
                "
              >
                Sign Up
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition" />
              </button>

            </form>

          </div>

          {/* RIGHT */}
          <div className="lg:col-span-6">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

              {/* INFO */}
              <div>
                <h3 className="text-base font-medium mb-5">Info</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  {["About", "Type", "Home", "Contact"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-white transition"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FOLLOW */}
              <div>
                <h3 className="text-base font-medium mb-5">Follow</h3>

                <div className="space-y-3 text-sm text-gray-400">

                  <a
                    href="https://www.facebook.com/share/18ZZxQpW3E/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition"
                  >
                    <FaFacebookF className="text-xs" />
                    Facebook
                  </a>

                  <a
                    href="https://www.instagram.com/_norevenge_?igsh=dDVqZ2l2NWpxZWZ3&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition"
                  >
                    <FaInstagram className="text-xs" />
                    Instagram
                  </a>

                </div>
              </div>

              {/* CONTACT */}
              <div>
                <h3 className="text-base font-medium mb-5">Contact</h3>

                <div className="space-y-3 text-sm text-gray-400 leading-relaxed">

                  <p className="text-sm">
                    46 Kim Yam Road <br />
                    #02-07/8, S239351
                  </p>

                  <a
                    href="mailto:sangtithphalika@gmail.com"
                    className="hover:text-white"
                  >
                    sangtithphalika@gmail.com
                  </a>

                  <br />

                  <a
                    href="tel:+966000224"
                    className="hover:text-white"
                  >
                    +966 000 224
                  </a>

                </div>

              </div>

            </div>

            {/* BOTTOM */}
            <div className="mt-16 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">

              <p className="text-gray-500 text-xs">
                © {year} Lika. All rights reserved.
              </p>

              <p className="text-gray-600 text-xs">
                Built with React + Tailwind
              </p>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}