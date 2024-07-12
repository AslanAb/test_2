import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}api/v1`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosInstance;
