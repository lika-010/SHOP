import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* =======================
   REQUEST INTERCEPTOR
======================= */
axiosApi.interceptors.request.use(
  (config) => {
    try {
      const user = localStorage.getItem("user");

      if (user) {
        const parsedUser = JSON.parse(user);

        if (parsedUser?.token) {
          config.headers.Authorization = `Bearer ${parsedUser.token}`;
        }
      }

      return config;
    } catch (err) {
      console.log("Token parse error:", err);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

/* =======================
   RESPONSE INTERCEPTOR (optional but useful)
======================= */
axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosApi;