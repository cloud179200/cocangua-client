import axios from "axios";
// import env from "react-dotenv";
const axiosConfig = axios.create({
  baseURL: "https://cocangua-server.herokuapp.com",
  timeout: 4000,
  timeoutErrorMessage:
    "Something went wrong, please check the internet connection!",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosConfig;
