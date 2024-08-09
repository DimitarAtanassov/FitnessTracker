using FitnessTrackerAPI.Data;
using FitnessTrackerAPI.DTOs;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace FitnessTrackerAPI.Controllers
{
    public class AccountController(UserManager<AppUser> userManager, ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")] // api/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            // Check if username is unique so there are no duplicate usernames in db.
            if (await UsernameExists(registerDto.Username)) return BadRequest("Username is taken");
            if (await UserEmailExists(registerDto.Email)) return BadRequest("Email is taken");
            
            // Create AppUser with hashed password
            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                Email = registerDto.Email,
            };

            var result = await userManager.CreateAsync(user, registerDto.Password);

            if(!result.Succeeded) return BadRequest(result.Errors);
            return new UserDto
            {
                Username = user.UserName,
                Token = await tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")] // api/account/login
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            // Check if username exists in db
            var user = await userManager.Users.FirstOrDefaultAsync(x =>  x.NormalizedUserName == loginDto.Username.ToUpper());

            if (user == null || user.UserName == null) return Unauthorized($"Username: {loginDto.Username} not found");

            // Return User to client on successful login
            return new UserDto
            {
                Username = user.UserName,
                Token = await tokenService.CreateToken(user)
            };

        }

        ///
        /// Helper Function To check if username already exists in DB
        ///
        private async Task<bool> UsernameExists(string username)
        {
            return await userManager.Users.AnyAsync(x=> x.NormalizedUserName == username.ToUpper());
        }

        private async Task<bool> UserEmailExists(string email)
        {
            return await userManager.Users.AnyAsync(x => x.NormalizedEmail == email.ToUpper());
        }

    }
}
