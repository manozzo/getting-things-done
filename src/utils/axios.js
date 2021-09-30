import axios from "axios";

const defaultOptions = {
  baseURL: "http://127.0.0.1:8000/",
};
const axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default axiosInstance;
