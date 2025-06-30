import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://127.0.0.1:5001/clone-a3259/us-central1/api",
    baseURL: " https://amazon-api-1-2uwk.onrender.com"
 
});

export {axiosInstance}