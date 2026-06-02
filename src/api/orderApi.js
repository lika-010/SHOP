import axiosApi from "./axiosApi";

// CREATE ORDER
export const createOrder = (data) => {
  return axiosApi.post("/orders", data);
};

// GET USER ORDERS
export const getMyOrders = () => {
  return axiosApi.get("/orders/my");
};

// GET ALL ORDERS (ADMIN)
export const getAllOrders = () => {
  return axiosApi.get("/orders");
};

// UPDATE ORDER STATUS (ADMIN)
export const updateOrderStatus = (id, status) => {
  return axiosApi.put(`/orders/${id}`, { status });
};