import axios from "axios";

const api = axios.create({
    baseURL: "https://radio-app-ax1w.onrender.com/api"
})

export default api;