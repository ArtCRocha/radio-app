using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using radio_api.Context;
using radio_api.DTO;
using radio_api.Exceptions;
using radio_api.Models;
using radio_api.Repositories;
using radio_api.Results;
using radio_api.Services;

namespace radio_api.Controllers
{
    [ApiController, Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly RadioApiDBContext _radioApiDBContext;
        private readonly IRevokedTokenRepository _revokedTokenRepository;
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AuthController(RadioApiDBContext radioApiDBContext, IRevokedTokenRepository revokedTokenRepository,  IUserRepository userRepository, ITokenService tokenService, IMapper mapper)
        {
            _radioApiDBContext = radioApiDBContext;
            _revokedTokenRepository = revokedTokenRepository;
            _userRepository = userRepository;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<TokenResult> Login(LoginDTO loginDTO)
        {
            var user = await _userRepository.GetByEmail(loginDTO.Email);

            if (loginDTO == null || !BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.Password))
            {
                throw new NotFoundException("Erro ao efetuar login. Usuário ou senha inválidos");
            }

            var token = _tokenService.GenerateToken(user);

            return new TokenResult(token);
        }

        [HttpPost("register")]
        public async Task<TokenResult> Register(RegisterDTO registerDTO)
        {
            var existingUser = await _userRepository.GetByEmail(registerDTO.Email);

            if (existingUser != null)
            {
                throw new NotFoundException("Usuário já existe");
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDTO.Password);
            var user = _mapper.Map<User>(registerDTO);
            user.Password = passwordHash;

            await _userRepository.Create(user);

            var token = _tokenService.GenerateToken(user);

            return new TokenResult(token);
        }

        [HttpGet("loggedUser"), Authorize]
        public async Task<UserResult> GetMe()
        {
            var userId = User.Identity?.Name == null ? Guid.Empty : Guid.Parse(User.Identity?.Name);

            var user = await _userRepository.GetById(userId);

            if (user == null)
            {
                throw new NotFoundException("Usuário não encontrado");
            }

            return _mapper.Map<UserResult>(user);
        }

        [HttpPost("logout"), Authorize]
        public async Task<IActionResult> Logout()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            await _revokedTokenRepository.AddToken(token);

            return Ok(new { message = "Logou efetuado com sucesso" });
        }
    }
}
