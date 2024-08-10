import axios from "axios";

const API_BASE_URL = "http://localhost:5162/api/user/";
const token = localStorage.getItem("token");
const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: { Authorization: `Bearer ${token}` },
});

const WorkoutService = {
  fetchUserWorkouts: async (pageIndex) => {
    try {
      const workouts = await apiService.get("get-workouts", {
        params: {
          PageIndex: pageIndex,
          PageSize: 10,
        },
      });
      return workouts;
    } catch (error) {
      throw error;
    }
  },

  createWorkout: async (workoutName) => {
    try {
      const newWorkout = await apiService.post("add-workout", {
        WorkoutName: workoutName,
        Date: new Date().toISOString(),
      });
      localStorage.setItem("currentWorkoutId", newWorkout.data.id);
      return newWorkout; // Return the response to be used in handleStartWorkout
    } catch (error) {
      throw error;
    }
  },
};

export default WorkoutService;
