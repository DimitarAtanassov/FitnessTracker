using FitnessTrackerAPI.DTOs;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace FitnessTrackerAPI.Model
{
    public class AppUser : IdentityUser<int>
    {
        public ICollection<Workout> Workouts { get; set; } = new List<Workout>();
        public ICollection<AppUserRole> UserRoles { get; set; } = [];
    }
}
