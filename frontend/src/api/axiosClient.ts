import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3030/api/", // Replace with your API base URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
