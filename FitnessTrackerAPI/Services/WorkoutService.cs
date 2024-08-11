using AutoMapper;
using FitnessTrackerAPI.Data;
using FitnessTrackerAPI.DTOs;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace FitnessTrackerAPI.Services
{
    public class WorkoutService(DataContext context) : IWorkoutService
    {

        public async Task<Workout?> GetWorkoutByIdAsync(int id)
        {
            return await context.Workouts.Include(w => w.Exercises).FirstOrDefaultAsync(w => w.Id == id);
        }

        public async Task<IEnumerable<Workout>> GetWorkoutsAsync()
        {
            return await context.Workouts.Include(w => w.Exercises).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public Workout CreateUserWorkout(WorkoutDto workoutDto, int userId)
        {
            var userWorkout = new Workout
            {
                WorkoutName = workoutDto.WorkoutName,
                Date = workoutDto.Date,
                UserId = userId
            };

            context.Workouts.Add(userWorkout);

            return userWorkout;

        }
    }
}
