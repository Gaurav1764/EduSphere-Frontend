import axios from "axios";

const API = axios.create({
  baseURL: "https://edusphere-backend-xw5j.onrender.com/api",
});

export default API;
