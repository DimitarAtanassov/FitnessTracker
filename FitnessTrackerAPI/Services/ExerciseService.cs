using FitnessTrackerAPI.Data;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace FitnessTrackerAPI.Services
{
    public class ExerciseService(DataContext context) : IExerciseService
    {
        public async Task<Exercise?> GetExerciseByIdAsync(int id)
        {
            return await context.Exercises.FindAsync(id);
        }

        public async Task<IEnumerable<Exercise>> GetExercisesAsync()
        {
            return await context.Exercises.ToListAsync();
        }

        public async Task<bool> SaveAllChangesAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}
