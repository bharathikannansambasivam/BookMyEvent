import axios from "axios";

const api = axios.create({
  baseURL: "https://54.86.236.14.sslip.io",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      try {
        await axios.post(
          "https://54.86.236.14.sslip.io/auth/refresh",
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
