using System.ComponentModel.DataAnnotations;

namespace FitnessTrackerAPI.Model
{
    public class AppUser
    {
        public int Id { get; set; }
        public required string UserName { get; set; }
        public required byte[] PasswordHash { get; set; }
        public required byte[] PasswordSalt { get; set; }
        public required string Email { get; set; }
    }
}
