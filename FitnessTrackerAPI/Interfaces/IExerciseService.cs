using FitnessTrackerAPI.Model;

namespace FitnessTrackerAPI.Interfaces
{
    public interface IExerciseService
    {
        Task<IEnumerable<Exercise>> GetExercisesAsync();

        Task<Exercise?> GetExerciseByIdAsync(int id);

        Task<bool> SaveAllChangesAsync();
    }
}
