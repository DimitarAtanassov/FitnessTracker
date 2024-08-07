import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
const ExerciseModal = ({
    show,
    handleClose,
    handleSaveExercise,
    exerciseName,
    setExerciseName,
    muscleGroupName,
    setMuscleGroupName,
    sets,
    setSets,
    reps,
    setReps,
    weight,
    setWeight
}) => {

    const handleSave = async () => {
        const workoutId = localStorage.getItem("currentWorkoutId");
        const newExercise = {
            exerciseName,
            muscleGroupName,
            sets,
            reps,
            weight,
            workoutId
        };

        const res = await axios.put('http://localhost:5162/api/workout/add-exercise',newExercise)

        handleSaveExercise(newExercise);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="exerciseName">
                        <Form.Label>Exercise Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={exerciseName}
                            onChange={(e) => setExerciseName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="muscleGroupName">
                        <Form.Label>Muscle Group Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={muscleGroupName}
                            onChange={(e) => setMuscleGroupName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="sets">
                        <Form.Label>Sets</Form.Label>
                        <Form.Control
                            type="number"
                            value={sets}
                            onChange={(e) => setSets(parseInt(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group controlId="reps">
                        <Form.Label>Reps</Form.Label>
                        <Form.Control
                            type="number"
                            value={reps}
                            onChange={(e) => setReps(parseInt(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group controlId="weight">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(parseInt(e.target.value))}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Exercise
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExerciseModal;
