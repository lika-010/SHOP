import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import defaultProducts from "../../data/products";

// API
import { createProduct } from "../../api/productApi";

/* =======================
   INITIAL FORM
======================= */
const INITIAL_FORM = {
  name: "",
  category: "",
  type: "",
  tag: "",
  price: "",
  salePrice: "",
  stock: "",
  image: "",
  featured: false,
};

/* =======================
   SAFE PARSE
======================= */
const safeParse = (key, fallback = []) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

/* =======================
   GET NEXT ID (CONTINUOUS)
======================= */
const getNextProductId = (products) => {
  if (!products.length) return 1;

  const maxId = Math.max(
    ...products.map((p) => Number(p.id) || 0)
  );

  return maxId + 1;
};

export default function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);

  /* =======================
     LOAD PRODUCTS
  ======================= */
  const loadProducts = () => {
    const localProducts = safeParse("products");
    setProducts([...defaultProducts, ...localProducts]);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* =======================
     SAVE PRODUCTS
  ======================= */
  const saveProducts = (data) => {
    localStorage.setItem("products", JSON.stringify(data));
    setProducts([...defaultProducts, ...data]);
  };

  /* =======================
     HANDLE CHANGE
  ======================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* =======================
     IMAGE UPLOAD
  ======================= */
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

  /* =======================
     BUILD PRODUCT
  ======================= */
  const buildProduct = (id) => ({
    id,
    name: form.name,
    category: form.category,
    type: form.type,
    tag: form.tag,
    price: Number(form.price),
    salePrice: form.salePrice ? Number(form.salePrice) : null,
    stock: Number(form.stock || 0),
    image: form.image || "https://via.placeholder.com/300",
    images: [form.image || "https://via.placeholder.com/300"],
    featured: form.featured,
  });

  /* =======================
     ADD PRODUCT
  ======================= */
  const addProduct = async () => {
    const localProducts = safeParse("products");
    const allProducts = [...defaultProducts, ...localProducts];

    if (!form.name || !form.price) {
      alert("Name and Price required");
      return;
    }

    const newId = getNextProductId(allProducts);
    const newProduct = buildProduct(newId);

    try {
      await createProduct({
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        salePrice: newProduct.salePrice
          ? Number(newProduct.salePrice)
          : null,
      });

      console.log("Saved to API");
    } catch (err) {
      console.log("API failed, saving locally:", err);
    }

    const updatedLocal = [...localProducts, newProduct];
    saveProducts(updatedLocal);

    resetForm();
  };

  /* =======================
     UPDATE PRODUCT
  ======================= */
  const updateProduct = () => {
    const localProducts = safeParse("products");

    const updated = localProducts.map((p) =>
      p.id === editingId ? buildProduct(editingId) : p
    );

    saveProducts(updated);
    resetForm();
  };

  /* =======================
     DELETE PRODUCT
  ======================= */
  const deleteProduct = (id) => {
    const localProducts = safeParse("products");

    const filtered = localProducts.filter((p) => p.id !== id);

    saveProducts(filtered);
  };

  /* =======================
     START EDIT
  ======================= */
  const startEdit = (product) => {
    setEditingId(product.id);
    setShowForm(true);

    setForm({
      name: product.name ?? "",
      category: product.category ?? "",
      type: product.type ?? "",
      tag: product.tag ?? "",
      price: product.price ?? "",
      salePrice: product.salePrice ?? "",
      stock: product.stock ?? "",
      image: product.image ?? "",
      featured: product.featured ?? false,
    });
  };

  /* =======================
     RESET
  ======================= */
  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setForm(INITIAL_FORM);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Product Management</h1>

          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setForm(INITIAL_FORM);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {/* FORM MODAL */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-full max-w-md">

              <div className="flex justify-between mb-4">
                <h2 className="font-bold">
                  {editingId ? "Edit Product" : "Add Product"}
                </h2>

                <button onClick={resetForm}>
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">

                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
                <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-2 rounded" />
                <input name="type" value={form.type} onChange={handleChange} placeholder="Type" className="border p-2 rounded" />
                <input name="tag" value={form.tag} onChange={handleChange} placeholder="Tag" className="border p-2 rounded" />

                <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" />
                <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="border p-2 rounded" />

                <input name="salePrice" type="number" value={form.salePrice} onChange={handleChange} placeholder="Sale Price" className="border p-2 rounded col-span-2" />

                <label className="flex items-center gap-2 col-span-2">
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                  Featured
                </label>

                <input type="file" onChange={handleImageChange} className="col-span-2" />

                {form.image && (
                  <img src={form.image} className="w-20 h-20 object-cover rounded mx-auto col-span-2" />
                )}
              </div>

              <button
                onClick={editingId ? updateProduct : addProduct}
                className={`w-full mt-4 py-2 text-white rounded ${
                  editingId ? "bg-blue-600" : "bg-green-600"
                }`}
              >
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="grid grid-cols-8 gap-4 p-4 bg-gray-50 font-bold">
            <div>ID</div>
            <div>Image</div>
            <div>Name</div>
            <div>Category</div>
            <div>Type</div>
            <div>Price</div>
            <div>Featured</div>
            <div>Action</div>
          </div>

          {products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-8 gap-4 p-4 border-t items-center"
            >
              <div>{product.id}</div>

              <img src={product.image} className="w-14 h-14 rounded object-cover" />

              <div>{product.name}</div>
              <div>{product.category}</div>
              <div>{product.type}</div>

              <div>${product.price}</div>
              <div>{product.featured ? "Yes" : "No"}</div>

              <div className="flex gap-2">
                <button onClick={() => startEdit(product)} className="bg-blue-600 text-white p-2 rounded">
                  <Edit size={16} />
                </button>

                <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white p-2 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}