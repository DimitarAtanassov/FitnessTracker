import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginSignup() {
    const navigate = useNavigate();

    const handleClickLogin = () => {
        navigate("/login");    
    }

    const handleClickSignup = () => {
        navigate("/signup");
    }

    return (
        <div className="container vh-100 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#f4f4f4' }}>
            <h2 style={{ fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
                <i className="fas fa-dumbbell" style={{ marginRight: '10px' }}></i>
                FitnessTracker
            </h2>
            <div className="d-flex flex-column align-items-center">
                <button className="btn btn-dark btn-lg mb-3" onClick={handleClickLogin} style={{ width: '200px' }}>
                    Login
                </button>
                <button className="btn btn-primary btn-lg" onClick={handleClickSignup} style={{ width: '200px' }}>
                    Signup
                </button>
            </div>
        </div>
    );
}

export default LoginSignup;
