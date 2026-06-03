import { X } from "lucide-react";

export default function SearchBar({ search, setSearch }) {

  const handleClear = () => {
    setSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
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
        className="w-full border rounded-2xl px-5 py-4 pr-12 shadow-sm outline-none focus:ring-2 focus:ring-violet-500 transition"
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

    </div>
  );
}