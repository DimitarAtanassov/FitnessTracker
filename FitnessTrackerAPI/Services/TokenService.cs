using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Model;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FitnessTrackerAPI.Services
{
    public class TokenService(IConfiguration config) : ITokenService
    {
        public string CreateToken(AppUser user)
        {
            var tokenKey = config["TokenKey"] ?? throw new Exception("Cannot access tokenKey from appsettings");

            if (tokenKey.Length < 64) throw new Exception("Your tokenKey needs to be longer");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

            // Create Claims for User's Token
            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Name, user.UserName),
            };

            // Sign the token
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            // Create new Token
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // Write token to resposne and return the token
            return tokenHandler.WriteToken(token);
        }
    }
}
