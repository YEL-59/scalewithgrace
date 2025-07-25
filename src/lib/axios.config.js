import axios from "axios";

const axiosPublic = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 5000,
});

const axiosPrivate = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  headers: {
    // "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000, //fuck it causes me 1 hours+ debug
});

// Combined request and response interceptor setup
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosPrivate, axiosPublic };
