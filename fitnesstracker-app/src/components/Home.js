import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import MuscleGroupModal from './MuscleGroupModal';
import WorkoutList from './WorkoutList';

function Home() {
    const [show, setShow] = useState(false);
    const [muscleGroup, setMuscleGroup] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const token = localStorage.getItem('token');
            await axios.get('http://localhost:5162/api/user/get-workouts', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setWorkouts(response.data);
            }).catch(err => { console.log(err) });
        };

        fetchWorkouts();
    }, []);

    const startWorkoutClick = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleStartWorkout = async () => {
        const token = localStorage.getItem('token');
    
        // Get the current date in UTC format
        const currentDate = new Date().toISOString();
    
        const res = await axios.post('http://localhost:5162/api/user/add-workout',
            {
                "WorkoutName": muscleGroup,
                "Date": currentDate,  // Use the current date here
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                localStorage.setItem("currentWorkoutId", response.data.id);
                navigate("/workout", { state: { muscleGroup, workoutId: response.data.id } });
            });
    
       
        setShow(false);
    }

    return (
        <div>
            <Button onClick={startWorkoutClick}>Start Workout</Button>
            <MuscleGroupModal 
                show={show} 
                handleClose={handleClose} 
                muscleGroup={muscleGroup} 
                setMuscleGroup={setMuscleGroup} 
                handleStartWorkout={handleStartWorkout} 
            />
            <WorkoutList workouts={workouts} />
        </div>
    )
}

export default Home;
