using System.ComponentModel.DataAnnotations;

namespace FitnessTrackerAPI.DTOs
{
    public class RegisterDto
    {
        [Required]
        public required string Username { get; set; }
        
        [Required]
        public required string Password { get; set; }

        [Required]
        public required string Email { get; set; }
    }
}
