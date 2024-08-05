using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitnessTrackerAPI.Data;
using FitnessTrackerAPI.Model;
using Microsoft.AspNetCore.Authorization;

namespace FitnessTrackerAPI.Controllers
{
    [Authorize]
    public class UserController (DataContext context) : BaseApiController
    {

        // GET: api/User
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await context.Users.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var appUser = await context.Users.FindAsync(id);

            if (appUser == null)
            {
                return NotFound();
            }

            return appUser;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, AppUser appUser)
        {
            if (id != appUser.Id)
            {
                return BadRequest();
            }

            context.Entry(appUser).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/User

        [HttpPost]
        public async Task<ActionResult<AppUser>> CreateUser(AppUser appUser)
        {
            context.Users.Add(appUser);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = appUser.Id }, appUser);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var appUser = await context.Users.FindAsync(id);
            if (appUser == null)
            {
                return NotFound();
            }

            context.Users.Remove(appUser);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool AppUserExists(int id)
        {
            return context.Users.Any(e => e.Id == id);
        }
    }
}
