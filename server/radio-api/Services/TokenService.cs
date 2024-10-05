using Microsoft.IdentityModel.Tokens;
using radio_api.Models;
using radio_api.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace radio_api.Services
{
    public class TokenService : ITokenService
    {
        private readonly IRevokedTokenRepository _revokedTokenRepository;
        private byte[] SecretKey { get; }

        public TokenService(string secretKey)
        {
            SecretKey = Encoding.ASCII.GetBytes(secretKey);
        }

        public async Task<bool> IsValidToken(string token)
        {
            if (await _revokedTokenRepository.IsTokenRevoked(token))
            {
                return false;
            }
            return true;
        }

        public string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Name, user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddHours(4),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(SecretKey),
                SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
