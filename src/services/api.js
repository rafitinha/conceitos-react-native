import axios from "axios";

const api = axios.create({
  baseURL: "https://api-rocketseat.herokuapp.com",
});

export default api;
