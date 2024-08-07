using FitnessTrackerAPI.Model;

namespace FitnessTrackerAPI.DTOs
{
    public class WorkoutDto
    {
        public int Id { get; set; }
        public required string WorkoutName { get; set; }
        public int Duration { get; set; }
        public DateTime Date { get; set; }
        public ICollection<ExerciseDto> Exercises { get; set; } = new List<ExerciseDto>();

    }
}
