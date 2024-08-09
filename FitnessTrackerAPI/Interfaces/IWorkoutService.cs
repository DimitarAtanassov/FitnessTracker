using FitnessTrackerAPI.DTOs;
using FitnessTrackerAPI.Model;

namespace FitnessTrackerAPI.Interfaces
{
    public interface IWorkoutService
    {
        Task<IEnumerable<Workout>> GetWorkoutsAsync();
        Task<Workout?> GetWorkoutByIdAsync(int id);
        Task<bool> SaveAllAsync();
    }
}
