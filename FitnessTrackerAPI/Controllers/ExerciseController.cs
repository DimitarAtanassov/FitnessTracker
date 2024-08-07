using FitnessTrackerAPI.Data;
using FitnessTrackerAPI.DTOs;
using FitnessTrackerAPI.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessTrackerAPI.Controllers
{
    [Authorize]
    public class ExerciseController(DataContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exercise>>> GetExercises()
        {
            return await context.Exercises.ToListAsync();
        }

        // GET: api/Exercise/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Exercise>> GetExercise(int id)
        {
            var exercise = await context.Exercises.FindAsync(id);

            if (exercise == null)
            {
                return NotFound();
            }

            return Ok(exercise);
        }


        // PUT: api/Exercise/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExercise(int id, ExerciseDto exerciseDto)
        {
            var exercise = await context.Exercises.FindAsync(exerciseDto.Id);
            if (exercise == null) return NotFound();

            exercise.ExerciseName = exerciseDto.ExerciseName;
            exercise.MuscleGroupName = exerciseDto.MuscleGroupName;
            exercise.Sets = exerciseDto.Sets;
            exercise.Reps = exerciseDto.Reps;
            exercise.Weight = exerciseDto.Weight;

            context.Entry(exercise).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExerciseExists(id))
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
        // POST: api/Exercise
        [HttpPost]
        public async Task<ActionResult<Exercise>> CreateExercise(Exercise exercise)
        {
            context.Exercises.Add(exercise);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetExercise", new { id = exercise.Id }, exercise);
        }
        [HttpPost("add-exercise/{workoutId}")]
        public async Task<ActionResult<ExerciseDto>> AddExercise(int workoutId, ExerciseDto exerciseDto)
        {
            var workout = await context.Workouts.SingleOrDefaultAsync(w => w.Id == workoutId);
            if (workout == null) return NotFound();

            var exerciseToAdd = new Exercise
            {
                ExerciseName = exerciseDto.ExerciseName,
                MuscleGroupName = exerciseDto.MuscleGroupName,
                Sets = exerciseDto.Sets,
                Reps = exerciseDto.Reps,
                Weight = exerciseDto.Weight,
                WorkoutId = workoutId,
            };
            workout.Exercises.Add(exerciseToAdd);
            
            if (await context.SaveChangesAsync() > 0)
            {
                return Ok(exerciseToAdd);
            }
            
            return BadRequest();
        }

        // DELETE: api/Exercise/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExercise(int id)
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
        private bool ExerciseExists(int id)
        {
            return context.Exercises.Any(e => e.Id == id);
        }
    }
}
