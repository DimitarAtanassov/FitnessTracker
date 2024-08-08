using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitnessTrackerAPI.Data;
using FitnessTrackerAPI.Model;
using FitnessTrackerAPI.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using FitnessTrackerAPI.Interfaces;

namespace FitnessTrackerAPI.Controllers
{
    [Authorize]
    public class WorkoutController (IWorkoutService workoutService, DataContext context, IMapper mapper) : BaseApiController
    {
        // GET: api/Workout
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workout>>> GetWorkouts()
        {
            var workouts = await workoutService.GetWorkoutsAsync();

            return Ok(workouts);
            
        }

        // GET: api/Workout/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Workout>> GetWorkout(int id)
        {
            var workout = await workoutService.GetWorkoutByIdAsync(id);

            if (workout == null)
            {
                return NotFound();
            }

            return Ok(workout);
        }

        // PUT: api/Workout/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkout(int id, Workout workout)
        {
            if (id != workout.Id)
            {
                return BadRequest();
            }

            context.Entry(workout).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkoutExists(id))
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

        // POST: api/Workout
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Workout>> PostWorkout(Workout workout)
        {
            context.Workouts.Add(workout);
            if(await workoutService.SaveAllAsync())
            {
                return CreatedAtAction("GetWorkout", new { id = workout.Id }, workout);
            }

            return BadRequest("No workout changes were found to save");
        }

        // DELETE: api/Workout/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkout(int id)
        {
            var workout = await workoutService.GetWorkoutByIdAsync(id);
            if (workout == null)
            {
                return NotFound();
            }

            context.Workouts.Remove(workout);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool WorkoutExists(int id)
        {
            return context.Workouts.Any(e => e.Id == id);
        }
    }
}
