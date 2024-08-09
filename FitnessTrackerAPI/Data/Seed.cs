using FitnessTrackerAPI.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
namespace FitnessTrackerAPI.Data
{
    public class Seed
    {
        // B/c this is static we do not need to create an Seed class object in order to use this method

        // Does not use constructor dependency injection so we need to add these services (UserManager and Role Manager services) to program.cs inorder for them to work here.
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)    // UserManager gives us access to our db like dbcontext but with additional features.
        {
            // If there are any Users this will be true, we do this to check if we have any users in our database before seeding additional data in our database, this will avoid duplicating users
            if (await userManager.Users.AnyAsync()) return;

            var roles = new List<AppRole>
            {
                new() {Name = "Member"},
                new() {Name = "Admin"},
                new() {Name = "Moderator"}
            };

            // RoleManager and UserManager are like DbContext and let us access our tables in the db, here we use our roleManager while looping over role and create them in our table.
            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            // Creating an Admin User. 
            var admin = new AppUser
            {
                UserName = "admin",
                Email = "admin@emailAdmin.comADim",
                
            };
            await userManager.CreateAsync(admin, "Pa$$w0rd");

            // Adding our newly created Admin User to roles
            await userManager.AddToRolesAsync(admin, ["Admin", "Moderator"]);

        }
    }
}
