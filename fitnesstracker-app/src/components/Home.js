import React, { useEffect, useState } from "react";
import { Button, ListGroup, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import MuscleGroupModal from './MuscleGroupModal';
import WorkoutList from './WorkoutList';
import WorkoutService from "../Services/workoutService";
function Home() {
    const [show, setShow] = useState(false);
    const [muscleGroup, setMuscleGroup] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkouts = async (pageIndex) => {
            try {
                const fetchedWorkouts = await WorkoutService.fetchUserWorkouts(pageIndex);
                setWorkouts(fetchedWorkouts); // Set workouts directly
            } catch (err) {
                console.error("Error fetching workouts:", err);
            }
        };
    
        fetchWorkouts(currentPage);
    }, [currentPage]);
    

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const startWorkoutClick = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleStartWorkout = async () => {
        try {
            const response = await WorkoutService.createWorkout(muscleGroup);
            navigate("/workout", { state: { muscleGroup, workoutId: response.data.id } });
            setShow(false);
        } catch (error) {
            console.error("Error starting workout:", error);
        }
    };

    return (
        <div className="container vh-100 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#f4f4f4' }}>
            <h2 style={{ fontWeight: 'bold', color: '#333', marginBottom: '30px' }}>
                <i className="fas fa-dumbbell" style={{ marginRight: '10px' }}></i>
                Workout Dashboard
            </h2>
            <Button onClick={startWorkoutClick} className="btn btn-primary btn-lg mb-4" style={{ width: '50%' }}>
                Start Workout
            </Button>
            <MuscleGroupModal 
                show={show} 
                handleClose={handleClose} 
                muscleGroup={muscleGroup} 
                setMuscleGroup={setMuscleGroup} 
                handleStartWorkout={handleStartWorkout} 
            />
            <WorkoutList workouts={workouts} />

            <Pagination className="mt-4">
                <Pagination.Prev 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1} 
                />
                {[...Array(totalPages).keys()].map(page => (
                    <Pagination.Item 
                        key={page + 1} 
                        active={page + 1 === currentPage} 
                        onClick={() => handlePageChange(page + 1)}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages} 
                />
            </Pagination>
        </div>
    )
}

export default Home;
