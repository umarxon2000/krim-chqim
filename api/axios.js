import axios from "axios";


const AUTH_TOKEN = localStorage.getItem("token")


const baseURL = "http://127.0.0.1:8000/api/v1";

const instance = axios.create({
  baseURL: `${baseURL}`
});
instance.defaults.headers.common['Authorization'] = `TOKEN ${AUTH_TOKEN}`;

export default instance;