import { useState } from "react";
import { X } from "lucide-react";

export default function SearchBar({ search, setSearch }) {
  const [focus, setFocus] = useState(false);

  const handleClear = () => {
    setSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur(); // optional: close keyboard / trigger search
    }
  };

  return (
    <div className="relative w-full">

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="w-full border rounded-2xl px-5 py-4 pr-12 shadow-sm focus:ring-2 focus:ring-violet-500 outline-none"
      />

      {/* CLEAR BUTTON */}
      {search && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
        >
          <X size={18} />
        </button>
      )}

      {/* FOCUS GLOW (optional UX enhancement) */}
      {focus && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-violet-500 pointer-events-none opacity-30"></div>
      )}

    </div>
  );
}