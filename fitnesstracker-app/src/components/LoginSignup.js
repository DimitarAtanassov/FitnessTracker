import React from "react";
import { useNavigate } from "react-router-dom";
function LoginSignup()
{
    const navigate = useNavigate();
    
    const handleClickLogin = () => {
        navigate("/login");    
    }
    
    const handleClickSignup = () => {
        navigate("/signup");
    }
    return(
        <div>
            <h2>FitnessTracker</h2>
            <button onClick={handleClickLogin}>Login</button>
            <button onClick={handleClickSignup}>Signup</button>
        </div>
    )
}

export default LoginSignup;