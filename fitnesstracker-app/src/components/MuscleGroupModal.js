import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
const MuscleGroupModal = ({ show, handleClose, muscleGroup, setMuscleGroup, handleStartWorkout }) => {
    return (
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
    );
};

export default MuscleGroupModal;
