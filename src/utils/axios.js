import axios from "axios";

// Apna API base URL yahan daal do
const instance = axios.create({
  baseURL: "http://82.112.234.104:8001/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add interceptor to include access token from localStorage, except for public endpoints
instance.interceptors.request.use(
  (config) => {
    // List of endpoints that should NOT have Authorization header
    const publicEndpoints = ["/auth/signup/", "/auth/login/", "/auth/verify-otp/", "/auth/resend-otp/"];
    const isPublic = publicEndpoints.some((endpoint) => config.url && config.url.includes(endpoint));
    if (!isPublic) {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;