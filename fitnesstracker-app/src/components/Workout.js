import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ExerciseModal from "./ExerciseModal";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Workout = () => {
    const location = useLocation();
    const muscleGroup = location.state?.muscleGroup || "No Muscle Group Selected";
    const [show, setShow] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [exerciseName, setExerciseName] = useState("");
    const [muscleGroupName, setMuscleGroupName] = useState("");
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const navigate = useNavigate();
    
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleSaveExercise = (exercise) => {
        setExercises([...exercises, exercise]);
        clearFields();
        handleClose();
    };

    const clearFields = () => {
        setExerciseName("");
        setMuscleGroupName("");
        setSets(0);
        setReps(0);
        setWeight(0);
    };

    const handleFinishWorkout = () => 
    {
        console.log(exercises);
        navigate("/home");
    }

    return (
        <>
            <h1>{muscleGroup} Workout</h1>
            <Button onClick={handleOpen}>Add Exercise</Button>
            <ExerciseModal 
                show={show} 
                handleClose={handleClose} 
                handleSaveExercise={handleSaveExercise}
                exerciseName={exerciseName}
                setExerciseName={setExerciseName}
                muscleGroupName={muscleGroupName}
                setMuscleGroupName={setMuscleGroupName}
                sets={sets}
                setSets={setSets}
                reps={reps}
                setReps={setReps}
                weight={weight}
                setWeight={setWeight}
            />
            <ul>
                {exercises.map((exercise, index) => (
                    <li key={index}>
                        {exercise.exerciseName} - {exercise.sets} sets x {exercise.reps} reps @ {exercise.weight} lbs
                    </li>
                ))}
            </ul>
            <Button variant="danger" onClick={handleFinishWorkout}>Finish Workout</Button>
        </>
    );
};

export default Workout;
