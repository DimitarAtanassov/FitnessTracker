using System.Security.Claims;

namespace FitnessTrackerAPI.Extensions
{
    public static class ClaimPrincipleExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            var username = user.FindFirstValue(ClaimTypes.Name) ?? throw new Exception("Cannot get username from token");
            return username;
        }
    }
}
