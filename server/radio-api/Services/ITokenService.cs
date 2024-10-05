using radio_api.Models;

namespace radio_api.Services
{
    public interface ITokenService
    {
        public string GenerateToken(User user);
    }
}
