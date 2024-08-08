import React, { useEffect, useState } from "react";
import { Button, ListGroup, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import MuscleGroupModal from './MuscleGroupModal';
import WorkoutList from './WorkoutList';

function Home() {
    const [show, setShow] = useState(false);
    const [muscleGroup, setMuscleGroup] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkouts = async (pageIndex) => {
            const token = localStorage.getItem('token');
            
            try {
                const response = await axios.get('http://localhost:5162/api/user/get-workouts', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        PageIndex: pageIndex,
                        PageSize: 10
                    }
                });
    
                // Assuming the response is an array
                setWorkouts(response.data);
                // No need to set currentPage or totalPages if the response is just an array
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
        const token = localStorage.getItem('token');
    
        const currentDate = new Date().toISOString();
    
        const res = await axios.post('http://localhost:5162/api/user/add-workout',
            {
                "WorkoutName": muscleGroup,
                "Date": currentDate,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                localStorage.setItem("currentWorkoutId", response.data.id);
                navigate("/workout", { state: { muscleGroup, workoutId: response.data.id } });
            });
    
        setShow(false);
    }

    return (
        <div>
            <Button onClick={startWorkoutClick}>Start Workout</Button>
            <MuscleGroupModal 
                show={show} 
                handleClose={handleClose} 
                muscleGroup={muscleGroup} 
                setMuscleGroup={setMuscleGroup} 
                handleStartWorkout={handleStartWorkout} 
            />
            <WorkoutList workouts={workouts} />

            <Pagination>
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
