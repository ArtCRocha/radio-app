using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using radio_api.Context;
using radio_api.DTO;
using radio_api.Exceptions;
using radio_api.Models;
using radio_api.Repositories;
using radio_api.Results;

namespace radio_api.Controllers
{
    [ApiController, Route("api/stations")]
    public class StationController : ControllerBase
    {
        private readonly RadioApiDBContext _radioApiDBContext;
        private readonly IStationRepository _stationRepository;
        private readonly IMapper _mapper;

        public StationController(RadioApiDBContext radioApiDBContext, IStationRepository stationRepository, IMapper mapper)
        {
            _radioApiDBContext = radioApiDBContext;
            _stationRepository = stationRepository;
            _mapper = mapper;
        }

        [HttpGet("user/{userId}")]
        public async Task<PaginationResult<StationResult>> GetByUserId(Guid userId, [FromQuery] int page = 1, [FromQuery] string search = null)
        {
            if (page < 1)
            {
                page = 1;
            }

            var stations = await _stationRepository.GetByUserId(page, userId, search);
            var result = stations.Results.Select(_mapper.Map<StationResult>).ToList();
            return new PaginationResult<StationResult>(result, stations.Page, stations.TotalItemsCount, stations.TotalPages);
        }

        [HttpPost]
        public async Task<Station> Create(StationDTO stationDTO)
        {
            if (stationDTO == null)
            {
                throw new Exception("Erro ao adicionar estação");
            }

            var station = _mapper.Map<Station>(stationDTO);

            await _stationRepository.Create(station);

            return station;
        }


        [HttpPatch("{stationId}"), Authorize]
        public async Task<StationResult> Update(Guid stationId, [FromBody] StationDTO userDTO)
        {
            var station = await _stationRepository.GetById(stationId);

            if (station == null)
            {
                throw new Exception("Estação não encontrada");
            }

            foreach (var prop in userDTO.GetType().GetProperties())
            {
                if (prop.Name.ToLower() == "id")
                {
                    continue;
                }

                var value = prop.GetValue(userDTO, null);
                if (value != null)
                {
                    var hotelProp = station.GetType().GetProperty(prop.Name);
                    if (hotelProp != null)
                    {
                        if (hotelProp.PropertyType == prop.PropertyType)
                        {
                            hotelProp.SetValue(station, value);
                        }
                        else
                        {
                            throw new InvalidOperationException($"Propriedade {prop.Name} incorreta ou vazia");
                        }
                    }
                }
            }

            await _stationRepository.Update(station);
            return _mapper.Map<StationResult>(station);
        }


        [HttpDelete("{stationId}")]
        public async Task<string> Delete(Guid stationId)
        {
            var station = await _stationRepository.GetById(stationId);

            if (station == null)
            {
                throw new Exception("Estação não encontrada");
            }

            await _stationRepository.Delete(station);
            return "Estação deletada com sucesso";

        }

        [HttpGet("stationIds/{userId}")]
        public async Task<List<string>> GetStationsIds(Guid userId)
        {
            if(userId == null)
            {
                throw new Exception("Id do usuário inválido");
            }

            return await _stationRepository.GetStationsIds(userId);
        }

    }
}
