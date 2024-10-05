using radio_api.Context;
using Microsoft.EntityFrameworkCore;
using radio_api.Models;

namespace radio_api.Repositories
{
    public class RevokedTokenRepository : IRevokedTokenRepository
    {
        private readonly RadioApiDBContext _context;

        public RevokedTokenRepository(RadioApiDBContext context)
        {
            _context = context;
        }

        public async Task AddToken(string token)
        {
            var revokedToken = new RevokedToken(token);
            await _context.RevokedTokens.AddAsync(revokedToken);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> IsTokenRevoked(string token)
        {
            return await _context.RevokedTokens.AnyAsync(rt => rt.Token == token);
        }
    }
}
