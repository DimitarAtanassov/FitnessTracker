using Microsoft.AspNetCore.Identity;

namespace FitnessTrackerAPI.Model
{
    public class AppRole : IdentityRole<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; } = [];
    }
}
