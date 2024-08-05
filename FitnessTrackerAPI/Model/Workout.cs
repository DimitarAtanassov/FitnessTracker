namespace FitnessTrackerAPI.Model
{
    public class Workout
    {

        public int Id { get; set; }
        public required string WorkoutName { get; set; }
        public int Duration {  get; set; }
        public int Date { get; set; }
    }
}
