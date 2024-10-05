using AutoMapper;
using radio_api.DTO;
using radio_api.Models;
using radio_api.Results;

namespace radio_api.Mappers
{
    public class UserMapper : Profile
    {
        public UserMapper() {
            CreateMap<User, UserResult>();
            CreateMap<RegisterDTO, User>();
        }
    }
}
