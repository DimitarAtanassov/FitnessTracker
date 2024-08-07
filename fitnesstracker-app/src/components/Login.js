// Manages the login form and authentication

import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => 
    {
        const navigate = useNavigate();
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
    
        const handleLogin = async (e) => 
        {
            e.preventDefault();
            const res = await axios.post('http://localhost:5162/api/account/login', {
                "username": username,
                "password": password,
            })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                navigate("/home");
    
            })
            .catch(err => console.log(err));
            /*
                TODO: Implement Login Authentication Logic
            */
        };
    
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>                 
                </form>
            </div>
        );
    };
    
    
    export default Login;