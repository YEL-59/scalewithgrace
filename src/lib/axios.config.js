import axios from "axios";
import toast from "react-hot-toast";

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
  timeout: 40000, //fuck it causes me 1 hours+ debug
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

// ✅ Response Interceptor
axiosPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 403) {
      toast({
        title: "Subscription Required",
        description: "You are not subscribed. Please subscribe first.",
        variant: "destructive",
      });

      setTimeout(() => {
        window.location.href = "/pricing";
      }, 1200);
    }

    return Promise.reject(error);
  }
);

export { axiosPrivate, axiosPublic };
