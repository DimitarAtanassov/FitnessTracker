import React from "react";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const WorkoutList = ({ workouts }) => {
    const navigate = useNavigate();

    const handleWorkoutClick = (workout) => {
        navigate("/workout-details", { state: { workout } });
    };

    return (
        <div>
            <h2>Your Workouts</h2>
            <ListGroup>
                {workouts && workouts.length > 0 ? (
                    workouts.map((workout) => (
                        <ListGroup.Item 
                            key={workout.id} 
                            action 
                            onClick={() => handleWorkoutClick(workout)}
                        >
                            {workout.workoutName} - {new Date(workout.date).toLocaleDateString()}
                        </ListGroup.Item>
                    ))
                ) : (
                    <p>No workouts available.</p>
                )}
            </ListGroup>
        </div>
    );
};

export default WorkoutList;
