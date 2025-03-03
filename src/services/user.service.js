// src/services/user.service.js
import axios from "axios";
import authHeader from "./auth-header"; //Để gửi token

const API_URL = "http://localhost:5008/api/users/"; //Thay đổi URL này

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const userService = {
  getUserBoard,
  getAdminBoard,
};

export default userService;
