import axiosApi from "./axiosApi";

// GET ALL PRODUCTS
export const getProducts = () => {
  return axiosApi.get("/products");
};

// GET SINGLE PRODUCT
export const getProductById = (id) => {
  return axiosApi.get(`/products/${id}`);
};

// CREATE PRODUCT (ADMIN)
export const createProduct = (data) => {
  return axiosApi.post("/products", data);
};

// UPDATE PRODUCT
export const updateProduct = (id, data) => {
  return axiosApi.put(`/products/${id}`, data);
};

// DELETE PRODUCT
export const deleteProduct = (id) => {
  return axiosApi.delete(`/products/${id}`);
};