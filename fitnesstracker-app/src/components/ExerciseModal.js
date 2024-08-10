import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
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
    setWeight,
    isEditing,
    workoutId,
    exerciseId
}) => {
    const handleSave = async () => {
        const newExercise = {
            exerciseName,
            muscleGroupName,
            sets,
            reps,
            weight,
            ...(isEditing && { id: exerciseId }) // Add the exercise ID if editing
        };

        try {
            if (isEditing && exerciseId) {
                await axios.put(
                    `http://localhost:5162/api/exercise/${exerciseId}`,
                    newExercise,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                console.log("Exercise updated successfully!");
                handleSaveExercise(newExercise, exerciseId);
            } else {
                const response = await axios.post(
                    `http://localhost:5162/api/exercise/add-exercise/${workoutId}`,
                    newExercise,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                console.log("Exercise added successfully!");
                const createdExercise = response.data;
                handleSaveExercise(createdExercise, createdExercise.id); // Pass the entire created exercise and its ID
            }
        } catch (error) {
            console.error("There was an error saving the exercise!", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? "Edit Exercise" : "Add Exercise"}</Modal.Title>
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
                    {isEditing ? "Update Exercise" : "Save Exercise"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExerciseModal;
