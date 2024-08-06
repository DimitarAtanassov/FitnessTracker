
using AutoMapper;
using FitnessTrackerAPI.DTOs;
using FitnessTrackerAPI.Model;

namespace FitnessTrackerAPI.Helpers
{
    public class AutoMapperProfiles : Profile 
    {
        public AutoMapperProfiles() 
        {
            CreateMap<AppUser, MemberDto>();
            CreateMap<Workout, WorkoutDto>();
            CreateMap<ExerciseDto, Exercise>();
        }
    }
}
