// api/productApi.js

import axios from "axios";

const API_URL = "http://localhost:8000/api/products";

export const getProducts = () => axios.get(API_URL);

export const createProduct = (data) =>
  axios.post(API_URL, data);

export const updateProductApi = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteProductApi = (id) =>
  axios.delete(`${API_URL}/${id}`);