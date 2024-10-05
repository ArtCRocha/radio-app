using Microsoft.EntityFrameworkCore;
using radio_api.Context;
using radio_api.Models;

namespace radio_api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly RadioApiDBContext _context;

        public UserRepository(RadioApiDBContext context)
        {
            _context = context;
        }

        public async Task<User?> GetById(Guid id)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User?> GetByEmail(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }


        public async Task Create(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
    }
}
