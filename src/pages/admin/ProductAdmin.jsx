import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

export default function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const initialForm = {
    name: "",
    price: "",
    stock: "",
    image: "",
  };

  const [form, setForm] = useState(initialForm);

  // SAFE PARSE
  const safeParse = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };

  // LOAD
  const loadProducts = () => {
    const data = safeParse("products", []);
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // SAVE
  const saveProducts = (data) => {
    localStorage.setItem("products", JSON.stringify(data));
    setProducts(data);
  };

  // IMAGE UPLOAD
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  // ADD
  const addProduct = () => {
    if (!form.name.trim() || !form.price) {
      alert("Name and price required");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock || 0),
      image: form.image || "https://via.placeholder.com/150",
    };

    saveProducts([...products, newProduct]);
    resetForm();
  };

  // UPDATE
  const updateProduct = () => {
    const updated = products.map((p) =>
      p.id === editingId
        ? {
            ...p,
            name: form.name,
            price: Number(form.price),
            stock: Number(form.stock || 0),
            image: form.image || p.image,
          }
        : p
    );

    saveProducts(updated);
    resetForm();
  };

  // DELETE
  const deleteProduct = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    saveProducts(filtered);
  };

  // EDIT
  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      price: product.price || "",
      stock: product.stock || "",
      image: product.image || "",
    });
    setShowForm(true);
  };

  // RESET
  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setForm(initialForm);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Product Management
          </h1>

          <button
            onClick={() => {
              setShowForm(true);
              setForm(initialForm);
              setEditingId(null);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {/* MODAL */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-3xl w-full max-w-lg">

              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingId ? "Edit Product" : "Add Product"}
                </h2>

                <button onClick={resetForm}>
                  <X />
                </button>
              </div>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  type="number"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) =>
                    setForm({ ...form, stock: e.target.value })
                  }
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border p-3 rounded-xl"
                />

                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    className="w-32 h-32 rounded-xl object-cover"
                  />
                )}

                <button
                  onClick={editingId ? updateProduct : addProduct}
                  className={`w-full py-3 rounded-xl text-white ${
                    editingId ? "bg-blue-600" : "bg-green-600"
                  }`}
                >
                  {editingId ? "Update Product" : "Add Product"}
                </button>

              </div>
            </div>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow overflow-hidden">

          {/* HEADER */}
          <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-50 font-semibold">
            <div>ID</div>
            <div>Image</div>
            <div>Name</div>
            <div>Price</div>
            <div>Stock</div>
            <div>Action</div>
          </div>

          {/* EMPTY STATE */}
          {products.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No products found
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-6 gap-4 px-6 py-4 border-t items-center hover:bg-gray-50"
              >
                <div>{product.id}</div>

                <div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                </div>

                <div className="font-medium">
                  {product.name}
                </div>

                <div className="text-blue-600 font-semibold">
                  ${product.price}
                </div>

                <div>{product.stock}</div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(product)}
                    className="bg-blue-600 text-white p-2 rounded-lg"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 text-white p-2 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}

        </div>
      </main>
    </div>
  );
}