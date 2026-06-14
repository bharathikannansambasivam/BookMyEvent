import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      try {
        await axios.post(
          "http://localhost:5000/auth/refresh",
          {},
          { withCredentials: true }
        );

        return api(err.config);
      } catch (refreshError) {
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    }

    return Promise.reject(err);
  }
);

export default api;
