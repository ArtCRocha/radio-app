namespace radio_api.DTO
{
    public class RegisterDTO
    {
        public string CompletName { get; }
        public string Email { get; }
        public string Password { get; }

        public RegisterDTO(string completName, string email, string password)
        {
            CompletName = completName;
            Email = email;
            Password = password;
        }
    }
}
