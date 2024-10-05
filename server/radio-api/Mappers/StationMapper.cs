using AutoMapper;
using radio_api.DTO;
using radio_api.Models;
using radio_api.Results;

namespace radio_api.Mappers
{
    public class StationMapper : Profile
    {
        public StationMapper() {
            CreateMap<StationDTO, Station>();
            CreateMap<Station, StationResult>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
