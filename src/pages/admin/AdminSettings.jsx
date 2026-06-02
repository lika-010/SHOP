import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminSettings() {
  const [shopName, setShopName] = useState("");
  const [saved, setSaved] = useState(false);

  // LOAD SETTINGS
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("settings")) || {};
    setShopName(data.shopName || "");
  }, []);

  // SAVE SETTINGS
  const handleSave = () => {
    const settings = {
      shopName,
    };

    localStorage.setItem("settings", JSON.stringify(settings));

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        {/* CARD */}
        <div className="bg-white p-6 rounded-xl shadow mt-6 max-w-xl">

          {/* SHOP NAME */}
          <label className="block mb-2 font-medium">
            Shop Name
          </label>

          <input
            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="My Shop"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          />

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Save Settings
          </button>

          {/* SUCCESS MESSAGE */}
          {saved && (
            <p className="text-green-600 mt-3 font-medium">
              Settings saved successfully ✔
            </p>
          )}

        </div>
      </div>
    </div>
  );
}