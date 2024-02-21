import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import axios from "axios"

const baseURL = "http://127.0.0.1:8000/api/v1";

axios.defaults.baseURL = baseURL;
const AUTH_TOKEN = localStorage.getItem("token")

if(AUTH_TOKEN){
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
