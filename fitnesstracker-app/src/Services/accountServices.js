import axios from "axios";

const API_BASE_URL = "http://localhost:5162/api/account/";

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

const AccountService = {
  login: async (username, password) => {
    try {
      const response = await apiService.post("login", {
        username: username,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      return response; // Return the response for further processing if needed
    } catch (err) {
      console.error("Error during login:", err);
      throw err; // Re-throw the error to handle it in the calling function
    }
  },

  register: async (username, password, email) => {
    try {
      const response = await apiService.post("register", {
        username: username,
        password: password,
        email: email,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      return response; // Return the response for further processing if needed
    } catch (err) {
      console.error("Error during registration:", err);
      throw err; // Re-throw the error to handle it in the calling function
    }
  },
};

export default AccountService;
