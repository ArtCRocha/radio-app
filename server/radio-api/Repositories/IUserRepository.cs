using radio_api.Models;

namespace radio_api.Repositories
{
    public interface IUserRepository
    {
        public Task Create(User user);
        public Task<User> GetById(Guid id);
        public Task<User> GetByEmail(string email);
    }
}
