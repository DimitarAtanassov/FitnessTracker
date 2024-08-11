import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, ListGroup } from "react-bootstrap";
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
        <div className="container vh-100 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#f4f4f4' }}>
            <Card className="w-75 p-4" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body>
                    <Card.Title style={{ fontWeight: 'bold', fontSize: '2em', color: '#007bff', marginBottom: '20px' }}>
                        {existingWorkout?.workoutName || "Workout Details"}
                    </Card.Title>
                    <Card.Subtitle className="mb-4 text-muted">
                        {existingWorkout && new Date(existingWorkout.date).toLocaleDateString()}
                    </Card.Subtitle>
                    <ListGroup variant="flush">
                        {exercises.length > 0 ? (
                            exercises.map((exercise, index) => (
                                <ListGroup.Item key={index} style={{ fontSize: '1.2em', padding: '15px' }}>
                                    <strong>{exercise.exerciseName}</strong> - {exercise.sets} sets x {exercise.reps} reps @ {exercise.weight} lbs
                                </ListGroup.Item>
                            ))
                        ) : (
                            <p>No exercises found.</p>
                        )}
                    </ListGroup>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                    <Button variant="primary" onClick={handleBackClick}>
                        Back to Workouts
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default WorkoutDetails;
