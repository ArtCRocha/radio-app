using radio_api.Models;
using radio_api.Results;

namespace radio_api.Repositories
{
    public interface IStationRepository
    {
        public Task<PaginationResult<Station>> GetByUserId(int page, Guid userId, string search = null);
        public Task<List<string>> GetStationsIds(Guid userId);
        public Task<Station> GetById(Guid id);
        public Task Create(Station station);
        public Task Update(Station station);
        public Task Delete(Station station);
    }
}
