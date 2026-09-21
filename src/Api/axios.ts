import axios from "axios";
import { store } from "../store/store";
import { logout } from "../store/authSlice";

const api = axios.create({
  baseURL: "https://medicare-backend-omega.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const { accessToken } = store.getState().auth;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const hadToken = Boolean(error.config?.headers?.Authorization);

    if (error.response?.status === 401 && hadToken) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  },
);

export default api;
