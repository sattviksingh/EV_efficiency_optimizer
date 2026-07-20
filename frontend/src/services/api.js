import axios from "axios";

const api = axios.create({
  baseURL: "https://ev-efficiency-optimizer.onrender.com",
});

export default api;