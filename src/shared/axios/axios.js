import axios from "axios";

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_BE_URL,
  timeout: 30000,
  timeoutErrorMessage:
    "Something went wrong, please check the internet connection!",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosConfig;
