import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AccountService from "../Services/accountServices";
const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // Make Post Request
    await AccountService.register(username, password, email)
      .then((_) => {
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="container vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{ backgroundColor: "#f4f4f4" }}
    >
      <h2 style={{ fontWeight: "bold", color: "#333", marginBottom: "30px" }}>
        <i className="fas fa-dumbbell" style={{ marginRight: "10px" }}></i>
        Signup
      </h2>
      <form
        onSubmit={handleSignup}
        className="d-flex flex-column align-items-center w-50"
      >
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="form-control mb-3"
          style={{ padding: "15px", fontSize: "1.2em" }}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control mb-3"
          style={{ padding: "15px", fontSize: "1.2em" }}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-control mb-3"
          style={{ padding: "15px", fontSize: "1.2em" }}
        />
        <input
          type="password"
          placeholder="Enter confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="form-control mb-4"
          style={{ padding: "15px", fontSize: "1.2em" }}
        />
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          style={{ width: "100%" }}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
