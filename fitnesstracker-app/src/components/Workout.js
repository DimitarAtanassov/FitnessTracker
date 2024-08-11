import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ExerciseModal from "./ExerciseModal";
import 'bootstrap/dist/css/bootstrap.min.css';

const Workout = () => {
    const location = useLocation();
    const muscleGroup = location.state?.muscleGroup || "No Muscle Group Selected";
    const workoutId = location.state?.workoutId || localStorage.getItem('currentWorkoutId');
    const existingWorkout = location.state?.workout || null;
    const [show, setShow] = useState(false);
    const [exercises, setExercises] = useState(existingWorkout ? existingWorkout.exercises : []);
    const [exerciseName, setExerciseName] = useState("");
    const [muscleGroupName, setMuscleGroupName] = useState("");
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [editIndex, setEditIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [exerciseId, setExerciseId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (existingWorkout) {
            setExercises(existingWorkout.exercises);
        }
    }, [existingWorkout]);

    const handleClose = () => setShow(false);
    const handleOpen = () => {
        clearFields();
        setIsEditing(false);
        setShow(true);
    };

    const handleEditOpen = (index) => {
        const exercise = exercises[index];
        setExerciseName(exercise.exerciseName);
        setMuscleGroupName(exercise.muscleGroupName);
        setSets(exercise.sets);
        setReps(exercise.reps);
        setWeight(exercise.weight);
        setEditIndex(index);
        setExerciseId(exercise.id);
        setIsEditing(true);
        setShow(true);
    };

    const handleSaveExercise = (exercise, returnedId) => {
        if (isEditing) {
            const updatedExercises = [...exercises];
            updatedExercises[editIndex] = { ...exercise, id: returnedId };
            setExercises(updatedExercises);
            setEditIndex(null);
        } else {
            setExercises([...exercises, { ...exercise, id: returnedId }]);
        }
        clearFields();
        handleClose();
    };

    const clearFields = () => {
        setExerciseName("");
        setMuscleGroupName("");
        setSets(0);
        setReps(0);
        setWeight(0);
        setEditIndex(null);
        setIsEditing(false);
        setExerciseId(null);
    };

    const handleFinishWorkout = () => {
        console.log(exercises);
        localStorage.removeItem("currentWorkoutId");
        navigate("/home");
    }

    return (
        <div className="container vh-100 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#f4f4f4' }}>
            <h1 style={{ fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
                <i className="fas fa-dumbbell" style={{ marginRight: '10px' }}></i>
                {muscleGroup} Workout
            </h1>
            {existingWorkout && <h2 style={{ marginBottom: '20px', color: '#555' }}>{existingWorkout.date}</h2>}
            <Button onClick={handleOpen} className="btn btn-primary btn-lg mb-4" style={{ width: '50%' }}>
                Add Exercise
            </Button>
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
                isEditing={isEditing}
                workoutId={workoutId}
                exerciseId={exerciseId}
            />
            <ul className="list-group mb-4 w-75">
                {exercises.map((exercise, index) => (
                    <li 
                        key={index} 
                        className="list-group-item d-flex justify-content-between align-items-center" 
                        onClick={() => handleEditOpen(index)}
                        style={{ cursor: 'pointer' }}
                    >
                        <span>{exercise.exerciseName}</span>
                        <span>{exercise.sets} sets x {exercise.reps} reps @ {exercise.weight} lbs</span>
                    </li>
                ))}
            </ul>
            <Button variant="danger" onClick={handleFinishWorkout} className="btn-lg" style={{ width: '50%' }}>
                Finish Workout
            </Button>
        </div>
    );
};

export default Workout;
