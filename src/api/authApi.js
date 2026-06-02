import axiosApi from "./axiosApi";

// REGISTER
export const registerUser = (data) => {
  return axiosApi.post("/auth/register", data);
};

// LOGIN
export const loginUser = (data) => {
  return axiosApi.post("/auth/login", data);
};

// GET PROFILE
export const getProfile = () => {
  return axiosApi.get("/auth/me");
};