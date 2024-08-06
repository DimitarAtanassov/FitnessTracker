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

namespace FitnessTrackerAPI.Controllers
{
    public class WorkoutController (DataContext context, IMapper mapper) : BaseApiController
    {
        // GET: api/Workout
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workout>>> GetWorkouts()
        {
            return await context.Workouts.Include(w => w.Exercises).ToListAsync();
        }

        // GET: api/Workout/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Workout>> GetWorkout(int id)
        {
            var workout = await context.Workouts.Include(w => w.Exercises).FirstOrDefaultAsync(w => w.Id == id);

            if (workout == null)
            {
                return NotFound();
            }

            return workout;
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
        [HttpPut("add-exercise")]
        public async Task<IActionResult> AddExerice(ExerciseDto exerciseDto)
        {
            var workout = await context.Workouts.Include(w => w.Exercises).FirstOrDefaultAsync(w => w.Id == exerciseDto.WorkoutId);

            if (workout == null)
            {
                return NotFound();
            }
            var exercise = mapper.Map<Exercise>(exerciseDto);
            workout.Exercises.Add(exercise);

            if (await context.SaveChangesAsync() > 0)
            {
                return NoContent();
            }

            return BadRequest("Problem adding exercise");


        }
        // POST: api/Workout
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Workout>> PostWorkout(Workout workout)
        {
            context.Workouts.Add(workout);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetWorkout", new { id = workout.Id }, workout);
        }

        // DELETE: api/Workout/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkout(int id)
        {
            var workout = await context.Workouts.FindAsync(id);
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
