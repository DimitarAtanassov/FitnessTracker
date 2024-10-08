﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitnessTrackerAPI.Data;
using FitnessTrackerAPI.Model;
using Microsoft.AspNetCore.Authorization;
using FitnessTrackerAPI.DTOs;
using System.Security.Claims;
using AutoMapper;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Helpers;
using AutoMapper.QueryableExtensions;
using FitnessTrackerAPI.Extensions;

namespace FitnessTrackerAPI.Controllers
{
    [Authorize]
    public class UserController(DataContext context, IMapper mapper, IUserService userSerivce, IWorkoutService workoutService) : BaseApiController
    {

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await userSerivce.GetUsersAsync();

            var usersToReturn = mapper.Map<IEnumerable<MemberDto>>(users);

            return Ok(usersToReturn);
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MemberDto>> GetUser(int id)
        {
            var appUser = await userSerivce.GetUserByIdAsync(id);

            if (appUser == null)
            {
                return NotFound();
            }

            return mapper.Map<MemberDto>(appUser);
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
            
            if(await userSerivce.SaveAllAsync()) return CreatedAtAction("GetUser", new { id = appUser.Id }, appUser);

            return BadRequest("Failed to add User");
        }

        [HttpPost("add-workout")]
        public async Task<ActionResult<WorkoutDto>> AddWorkout(WorkoutDto workoutDto)
        {
            var user = await userSerivce.GetUserByUsernameAsync(User.GetUsername());

            if (user == null) return BadRequest("Could not find user");

            var userWorkout = workoutService.CreateUserWorkout(workoutDto, user.Id);
            
            user.Workouts.Add(userWorkout);

            if (await userSerivce.SaveAllAsync())
            {
                var workoutToReturn = mapper.Map<WorkoutDto>(userWorkout);
                return CreatedAtAction("GetUser", new { id = user.Id }, workoutToReturn);
            }

            return BadRequest("Problem adding workout");
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var appUser = await userSerivce.GetUserByIdAsync(id);
           
            if (appUser == null)
            {
                return NotFound();
            }

            context.Users.Remove(appUser);
            
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("get-workouts")]
        public async Task<ActionResult<List<WorkoutDto>>> GetUserWorkouts([FromQuery] PaginationParams paginationParams)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (userIdStr == null) return BadRequest("No UserId found in token");
            
            int userId;
            if(int.TryParse(userIdStr, out userId))
            {
                var appUser = await userSerivce.GetUserByIdAsync(userId);
                
                if (appUser == null) return NotFound();

                //Pagination
                var query = context.Workouts.AsQueryable();

                // User's Workouts:
                query = query.Where(w => w.UserId == userId);

                // Pagination Response
                var paginatedWorkouts = await PaginatedList<WorkoutDto>.CreateAsync(query.ProjectTo<WorkoutDto>(mapper.ConfigurationProvider), paginationParams.PageIndex, paginationParams.PageSize);

                return Ok(paginatedWorkouts);
            }
            
            return BadRequest("Problem fetching user's workouts");


        }

        private bool AppUserExists(int id)
        {
            return context.Users.Any(e => e.Id == id);
        }
    }
}
