import React from "react";
import { useNavigate } from "react-router-dom";
function Home()
{
    const navigate = useNavigate();
    const startWorkoutClick = () =>
    {
        navigate("/workout");
    }
    return(
        <div>
            <button onClick={startWorkoutClick}>Start Workout</button>
        </div>
    )
}

export default Home;