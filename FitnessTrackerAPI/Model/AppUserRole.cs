using Microsoft.AspNetCore.Identity;

namespace FitnessTrackerAPI.Model
{
    public class AppUserRole : IdentityUserRole<int>
    {
        public AppUser User { get; set; } = null!;
        public AppRole Role { get; set; } = null!;
    }
}
