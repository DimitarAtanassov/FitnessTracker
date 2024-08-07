import React, { useEffect, useState } from "react";
import { Modal, Button, Form, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Home() {
    const [show, setShow] = useState(false);
    const [muscleGroup, setMuscleGroup] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkouts = async () =>
        {
            const token = localStorage.getItem('token');
            await axios.get('http://localhost:5162/api/user/get-workouts', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setWorkouts(response.data);
            }).catch(err => {console.log(err)});
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

        const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
        console.log(token);
        // Navigate to Workout component with muscleGroup as state
        const res = await axios.post('http://localhost:5162/api/user/add-workout',
            {
                "WorkoutName": muscleGroup,
                "Duration": 60,
                "Date":"2024-08-06T08:00:00Z",
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        .then(response => {
            localStorage.setItem("currentWorkoutId", response.data.id);
        })
        
        navigate("/workout", { state: { muscleGroup } });
        setShow(false);
    }

    return (
        <div>
            <Button onClick={startWorkoutClick}>Start Workout</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Muscle Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="muscleGroupSelect">
                            <Form.Label>Muscle Group</Form.Label>
                            <Form.Control 
                                as="select" 
                                value={muscleGroup} 
                                onChange={(e) => setMuscleGroup(e.target.value)}
                            >
                                <option value="">Select a muscle group</option>
                                <option value="Chest">Chest</option>
                                <option value="Back">Back</option>
                                <option value="Legs">Legs</option>
                                <option value="Arms">Arms</option>
                                <option value="Shoulders">Shoulders</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleStartWorkout}>
                        Start Workout
                    </Button>
                </Modal.Footer>
            </Modal>
            <h2>Your Workouts</h2>
            <ListGroup>
                {workouts.map((workout) => (
                    <ListGroup.Item key={workout.id}>
                        {workout.workoutName} - {workout.date}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default Home;
