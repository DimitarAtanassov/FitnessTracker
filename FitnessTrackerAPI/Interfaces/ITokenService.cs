using FitnessTrackerAPI.Model;

namespace FitnessTrackerAPI.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}
