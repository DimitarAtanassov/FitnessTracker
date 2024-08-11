import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const WorkoutDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const existingWorkout = location.state?.workout || null;
    const [exercises, setExercises] = useState(existingWorkout ? existingWorkout.exercises : []);

    useEffect(() => {
        if (existingWorkout) {
            setExercises(existingWorkout.exercises);
        }
    }, [existingWorkout]);

    const handleBackClick = () => {
        navigate("/home");
    };

    return (
        <>
            <h1>{existingWorkout.workoutName}</h1>
            {existingWorkout && <h2>{existingWorkout.date}</h2>}
            <ul>
                {exercises.map((exercise, index) => (
                    <li key={index}>
                        {exercise.exerciseName} - {exercise.sets} sets x {exercise.reps} reps @ {exercise.weight} lbs
                    </li>
                ))}
            </ul>
            <Button variant="secondary" onClick={handleBackClick}>
                Back to Workouts
            </Button>
        </>
    );
};

export default WorkoutDetails;
