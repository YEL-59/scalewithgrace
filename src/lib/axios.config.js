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
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 5000,
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

axiosPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/sign-in";
    }

    return Promise.reject(error);
  }
);

// axiosPrivate.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         await axiosPublic.post("/refresh", {}, );
//         return axiosPrivate(originalRequest); // retry request
//       } catch () {
//         // Redirect to login if refresh fails
//         window.location.href = "/sign-in";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export { axiosPrivate, axiosPublic };
