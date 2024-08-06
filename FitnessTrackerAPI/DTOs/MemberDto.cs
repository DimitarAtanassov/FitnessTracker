using FitnessTrackerAPI.Model;

namespace FitnessTrackerAPI.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public ICollection<WorkoutDto> Workouts { get; set; } = new List<WorkoutDto>();
    }
}
