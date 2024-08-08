using FitnessTrackerAPI.DTOs;
using FitnessTrackerAPI.Model;

namespace FitnessTrackerAPI.Interfaces
{
    public interface IUserService
    {
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser?> GetUserByUsernameAsync(string username);
        Task<AppUser?> GetUserByIdAsync(int id);
    }
}
