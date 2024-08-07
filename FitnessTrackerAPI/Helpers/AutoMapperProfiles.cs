
using AutoMapper;
using FitnessTrackerAPI.DTOs;
using FitnessTrackerAPI.Model;

namespace FitnessTrackerAPI.Helpers
{
    public class AutoMapperProfiles : Profile 
    {
        public AutoMapperProfiles() 
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.Workouts, opt => opt.MapFrom(src => src.Workouts));

            CreateMap<Workout, WorkoutDto>()
                .ForMember(dest => dest.Exercises, opt => opt.MapFrom(src => src.Exercises));

            CreateMap<Exercise, ExerciseDto>();

            CreateMap<WorkoutDto, Workout>();
            CreateMap<ExerciseDto, Exercise>();
        }
    }
}
