﻿namespace radio_api.DTO
{
    public class LoginDTO
    {
        public string Email { get; }
        public string Password { get; }

        public LoginDTO(string email, string password)
        {
            Email = email;
            Password = password;
        }
    }
}
