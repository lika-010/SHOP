// src/pages/Profile.jsx

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

export default function Profile() {

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-6xl mx-auto">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* COVER */}
          <div className="relative h-72 bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500">

            {/* Edit Button */}
            <button className="absolute top-5 right-5 bg-white/20 backdrop-blur-md hover:bg-white/30 transition p-3 rounded-full text-white">
              <Pencil size={20} />
            </button>

          </div>

          {/* CONTENT */}
          <div className="px-8 pb-10">

            {/* TOP SECTION */}
            <div className="-mt-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8">

              {/* LEFT */}
              <div className="flex flex-col md:flex-row md:items-end gap-6">

                {/* IMAGE */}
                <div className="relative">

                  <div className="w-44 h-44 rounded-full overflow-hidden border-[6px] border-white shadow-2xl bg-white">

                    {user?.image ? (
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

                  {/* Camera Button */}
                  <button className="absolute bottom-3 right-3 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-full shadow-lg transition">
                    <Camera size={18} />
                  </button>
                </div>

                {/* USER INFO */}
                <div className="pb-4">

                  <h1 className="text-4xl font-bold text-gray-800">
                    {user?.name || "No Name"}
                  </h1>

                  <p className="text-violet-600 font-semibold text-lg mt-2">
                    {user?.role || "Customer"}
                  </p>

                  <p className="text-gray-500 mt-2 max-w-xl">
                    Welcome to your profile dashboard. Manage your
                    account information, personal details, and settings.
                  </p>

                </div>
              </div>

              {/* RIGHT STATS */}
              <div className="grid grid-cols-2 gap-4">

                <div className="bg-violet-50 rounded-2xl px-6 py-5 text-center">
                  <h2 className="text-2xl font-bold text-violet-700">
                    24
                  </h2>

                  <p className="text-gray-600 text-sm mt-1">
                    Orders
                  </p>
                </div>

                <div className="bg-pink-50 rounded-2xl px-6 py-5 text-center">
                  <h2 className="text-2xl font-bold text-pink-600">
                    12
                  </h2>

                  <p className="text-gray-600 text-sm mt-1">
                    Wishlist
                  </p>
                </div>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid lg:grid-cols-2 gap-6 mt-12">

              {/* EMAIL */}
              <InfoCard
                icon={<Mail className="text-violet-600" size={26} />}
                title="Email Address"
                value={user?.email || "No Email"}
              />

              {/* PHONE */}
              <InfoCard
                icon={<Phone className="text-violet-600" size={26} />}
                title="Phone Number"
                value={user?.phone || "No Phone"}
              />

              {/* ADDRESS */}
              <InfoCard
                icon={<MapPin className="text-violet-600" size={26} />}
                title="Address"
                value={user?.address || "No Address"}
              />

              {/* DATE */}
              <InfoCard
                icon={<Calendar className="text-violet-600" size={26} />}
                title="Join Date"
                value={user?.joinDate || "2026"}
              />
            </div>

            {/* VERIFIED */}
            <div className="mt-10 bg-gradient-to-r from-violet-50 to-pink-50 border border-violet-100 rounded-3xl p-6 flex items-center gap-5 shadow-sm">

              <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center">
                <ShieldCheck
                  className="text-violet-600"
                  size={34}
                />
              </div>

              <div>
                <h3 className="font-bold text-2xl text-violet-700">
                  Verified Account
                </h3>

                <p className="text-gray-600 mt-1">
                  Your account is verified and fully secured.
                  Enjoy shopping with confidence.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* INFO CARD */
function InfoCard({ icon, title, value }) {
  return (
    <div className="bg-gray-50 hover:bg-white border border-gray-100 rounded-3xl p-6 flex items-start gap-5 shadow-sm hover:shadow-lg transition-all duration-300">

      <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">
          {title}
        </p>

        <p className="font-semibold text-gray-800 text-lg mt-1">
          {value}
        </p>
      </div>
    </div>
  );
}