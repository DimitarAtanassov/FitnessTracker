namespace FitnessTrackerAPI.Model
{
    public class Workout
    {

        public int Id { get; set; }
        public required string WorkoutName { get; set; }
        public DateTime Date { get; set; }
        public ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
        public int UserId { get; set; }
        public AppUser AppUser { get; set; } = null!;
    }
}
