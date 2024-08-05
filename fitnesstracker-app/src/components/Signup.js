// Manages the signup form and authentication
import React, {useState} from "react";
import axios from 'axios';

const Signup = () => 
{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = (e) => 
    {
        e.preventDefault();
        console.log("Username:", username, "Email:", email, "Password:", password, "Confirm:", password);
        
        // Make Post Request
        axios.post('http://localhost:5162/api/User', 
        {
            "username": username,
            "passwordHash": "123",
            "passwordSalt": "123",
            "email": email,
            "age": 1,
            "weight": 1
        })
        .then(function (response) 
        {
            console.log(response);
        })
        .catch(function (error)
        {
            console.log(error);
        });
        
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