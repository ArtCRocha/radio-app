using radio_api.Context;
using radio_api.Models;
using radio_api.Results;
using Microsoft.EntityFrameworkCore;

namespace radio_api.Repositories
{
    public class StationRepository : IStationRepository
    {
        private readonly RadioApiDBContext _context;

        public StationRepository(RadioApiDBContext context)
        {
            _context = context;
        }

        public async Task<PaginationResult<Station>> GetByUserId(int page, Guid userId, string name = null, string country = null, string language = null)
        {
            IQueryable<Station> stationQuery = _context.Stations.Where(e => e.UserId == userId);
            if (!string.IsNullOrEmpty(name) || !string.IsNullOrEmpty(country) || !string.IsNullOrEmpty(language))
            {
                stationQuery = stationQuery.Where(u =>
                     u.Name.Contains(name) || u.Country.Contains(country) || u.Language.Contains(language)
                );
            }
            var stations = await PaginationResult<Station>.CreateAsync(stationQuery, page);
            return stations;
        }

        public async Task<List<string>> GetStationsIds(Guid userId)
        {
            return await _context.Stations.Where(e => e.UserId == userId).Select(e => e.Stationuuid).ToListAsync();
        }

        public async Task<Station> GetById(Guid id)
        {
            return await _context.Stations.FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task Create(Station station)
        {
            await _context.Stations.AddAsync(station);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Station station)
        {
            _context.Stations.Update(station);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Station station)
        {
            _context.Stations.Remove(station);
            await _context.SaveChangesAsync();
        }
    }
}
