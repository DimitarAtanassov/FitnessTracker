using FitnessTrackerAPI.Model;

namespace FitnessTrackerAPI.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
