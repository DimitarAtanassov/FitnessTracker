import axios from "axios";

const API_BASE_URL = "http://localhost:5162/api/accout/";

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

const AccountService = () => {

  const login = async (username, password) => {
    const response = await apiService
      .post("login", {
        "username": username,
        "password": password,
      })
      .then((res) => {
        localStorage.setItem("token", response.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const register = async (username, password,email) => {
    const response = await apiService
      .post("register", {
        "username": username,
        "password": password,
        "email": email
      })
      .then((res) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('username', response.data.username);
    })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default AccountService;
