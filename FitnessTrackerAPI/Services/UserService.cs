using AutoMapper;
using FitnessTrackerAPI.Data;
using FitnessTrackerAPI.DTOs;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace FitnessTrackerAPI.Services
{
    public class UserService(DataContext context, IMapper mapper) : IUserService
    {
        public async Task<AppUser?> GetUserByIdAsync(int id)
        {
            return await context.Users
                    .Include(u => u.Workouts)
                    .ThenInclude(w => w.Exercises)
                    .FirstOrDefaultAsync(u => u.Id == id);

        }

        public async Task<AppUser?> GetUserByUsernameAsync(string username)
        {
            return await context.Users.Include(u => u.Workouts).FirstOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await context.Users
                .Include(u => u.Workouts)
                .ThenInclude(w => w.Exercises)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}
