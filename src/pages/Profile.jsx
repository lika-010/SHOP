import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  Camera,
  Pencil,
} from "lucide-react";

import { useState, useEffect } from "react";

// DEFAULT USER
const defaultUser = {
  name: "No Name",
  email: "No Email",
  phone: "No Phone",
  address: "No Address",
  role: "Customer",
  joinDate: "2026",
  image: "",
};

export default function Profile() {
  const [user, setUser] = useState(defaultUser);

  // SAFE PARSE
  const safeParse = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };

  // LOAD USER
  const loadUser = () => {
    const savedUser = safeParse("user", null);

    if (savedUser) {
      setUser({ ...defaultUser, ...savedUser });
    } else {
      setUser(defaultUser);
    }
  };

  useEffect(() => {
    loadUser();

    // FIX: storage event only works between tabs
    const handleChange = () => loadUser();

    window.addEventListener("storage", handleChange);
    window.addEventListener("focus", handleChange);

    return () => {
      window.removeEventListener("storage", handleChange);
      window.removeEventListener("focus", handleChange);
    };
  }, []);

  // UPLOAD IMAGE
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedUser = {
        ...user,
        image: reader.result,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* COVER */}
        <div className="relative h-72 bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500">

          <button className="absolute top-5 right-5 bg-white/20 backdrop-blur-md hover:bg-white/30 transition p-3 rounded-full text-white">
            <Pencil size={20} />
          </button>

        </div>

        <div className="px-8 pb-10">

          {/* TOP SECTION */}
          <div className="-mt-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8">

            {/* PROFILE IMAGE */}
            <div className="flex flex-col md:flex-row md:items-end gap-6">

              <div className="relative">

                <div className="w-44 h-44 rounded-full overflow-hidden border-[6px] border-white shadow-2xl bg-white">

                  {user.image ? (
                    <img
                      src={user.image}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <User size={80} className="text-gray-500" />
                    </div>
                  )}

                </div>

                {/* UPLOAD */}
                <label className="absolute bottom-3 right-3 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-full shadow-lg cursor-pointer">
                  <Camera size={18} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>

              </div>

              {/* INFO */}
              <div className="pb-4">
                <h1 className="text-4xl font-bold text-gray-800">
                  {user.name}
                </h1>

                <p className="text-violet-600 font-semibold text-lg mt-2">
                  {user.role}
                </p>

                <p className="text-gray-500 mt-2 max-w-xl">
                  Welcome to your profile dashboard. Manage your account information.
                </p>
              </div>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4">

              <div className="bg-violet-50 rounded-2xl px-6 py-5 text-center">
                <h2 className="text-2xl font-bold text-violet-700">
                  24
                </h2>
                <p className="text-gray-600 text-sm mt-1">Orders</p>
              </div>

              <div className="bg-pink-50 rounded-2xl px-6 py-5 text-center">
                <h2 className="text-2xl font-bold text-pink-600">
                  12
                </h2>
                <p className="text-gray-600 text-sm mt-1">Wishlist</p>
              </div>

            </div>

          </div>

          {/* INFO GRID */}
          <div className="grid lg:grid-cols-2 gap-6 mt-12">

            <InfoCard icon={<Mail />} title="Email" value={user.email} />
            <InfoCard icon={<Phone />} title="Phone" value={user.phone} />
            <InfoCard icon={<MapPin />} title="Address" value={user.address} />
            <InfoCard icon={<Calendar />} title="Join Date" value={user.joinDate} />

          </div>

          {/* VERIFIED */}
          <div className="mt-10 bg-gradient-to-r from-violet-50 to-pink-50 border border-violet-100 rounded-3xl p-6 flex items-center gap-5 shadow-sm">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center">
              <ShieldCheck className="text-violet-600" size={34} />
            </div>

            <div>
              <h3 className="font-bold text-2xl text-violet-700">
                Verified Account
              </h3>
              <p className="text-gray-600 mt-1">
                Your account is verified and secure.
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

// INFO CARD
function InfoCard({ icon, title, value }) {
  return (
    <div className="bg-gray-50 hover:bg-white border border-gray-100 rounded-3xl p-6 flex items-start gap-5 shadow-sm hover:shadow-lg transition-all duration-300">

      <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600">
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-semibold text-gray-800 text-lg mt-1">
          {value}
        </p>
      </div>

    </div>
  );
}