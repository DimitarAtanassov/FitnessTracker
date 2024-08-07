import React from "react";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const WorkoutList = ({ workouts }) => {
    const navigate = useNavigate();

    const handleWorkoutClick = (workout) => {
        navigate("/workout-details", { state: { workout } });
    };

    return (
        <div>
            <h2>Your Workouts</h2>
            <ListGroup>
                {workouts.map((workout) => (
                    <ListGroup.Item key={workout.id} action onClick={() => handleWorkoutClick(workout)}>
                        {workout.workoutName} - {workout.date}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default WorkoutList;
