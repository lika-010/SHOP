// context/ProductContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import defaultProducts from "../data/products";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    const local = JSON.parse(localStorage.getItem("products")) || [];
    setProducts([...defaultProducts, ...local]);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = (product) => {
    const local = JSON.parse(localStorage.getItem("products")) || [];
    const updated = [...local, product];

    localStorage.setItem("products", JSON.stringify(updated));
    setProducts([...defaultProducts, ...updated]); // 🔥 instant update
  };

  const updateProduct = (updatedProduct) => {
    const local = JSON.parse(localStorage.getItem("products")) || [];

    const updated = local.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );

    localStorage.setItem("products", JSON.stringify(updated));
    setProducts([...defaultProducts, ...updated]);
  };

  const deleteProduct = (id) => {
    const local = JSON.parse(localStorage.getItem("products")) || [];

    const updated = local.filter((p) => p.id !== id);

    localStorage.setItem("products", JSON.stringify(updated));
    setProducts([...defaultProducts, ...updated]);
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);