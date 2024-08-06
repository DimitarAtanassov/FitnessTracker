namespace FitnessTrackerAPI.DTOs
{
    public class ExerciseDto
    {
        public required string ExerciseName { get; set; }
        public required string MuscleGroupName { get; set; }
        public int Sets { get; set; }
        public int Reps { get; set; }
        public int Weight { get; set; }
        public int WorkoutId { get; set; }
    }
}
