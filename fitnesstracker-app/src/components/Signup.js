// Manages the signup form and authentication
import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = () => 
{
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    
    const handleSignup = async (e) => 
    {
        e.preventDefault();
        console.log("Input", "Username:", username, "Email:", email, "Password:", password, "Confirm:", password);
        
        // Make Post Request
        const res = await axios.post('http://localhost:5162/api/account/register', {
            "username": username,
            "password": password,
            "email": email,
        })
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            navigate("/home");

        })
        .catch(err => console.log(err));     
        /*
            TODO: Implement Additional Logic if needed 
        */       
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Signup</button>                 
            </form>
        </div>
    );
};


export default Signup;