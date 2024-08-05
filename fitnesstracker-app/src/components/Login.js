// Manages the login form and authentication

import React, {useState} from "react";


const Login = () => 
    {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
    
        const handleLogin = (e) => 
        {
            e.preventDefault();
            
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