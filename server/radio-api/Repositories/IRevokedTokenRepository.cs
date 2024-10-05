namespace radio_api.Repositories
{
    public interface IRevokedTokenRepository
    {
        public Task AddToken(string token);
        public Task<bool> IsTokenRevoked(string token);
    }
}
