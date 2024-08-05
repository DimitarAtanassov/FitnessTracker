namespace FitnessTrackerAPI.DTOs
{
    // Used to send back only needed user data to client not full AppUser data, bc it contains sensitive information
    public class UserDto
    {
        public required string Username { get; set; }
        public required string Token { get; set; }    
    }
}
