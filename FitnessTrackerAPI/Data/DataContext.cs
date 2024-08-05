using FitnessTrackerAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace FitnessTrackerAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options)  { }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Workout> Workouts { get; set; }

    }
}
