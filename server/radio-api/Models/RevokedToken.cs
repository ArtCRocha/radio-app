namespace radio_api.Models
{
    public class RevokedToken
    {
        public Guid Id { get; set; }
        public string? Token { get; set; }
        public DateTime? RevokedAt { get; set; }

        public RevokedToken(string token)
        {
            Id = Guid.NewGuid(); 
            Token = token ?? throw new ArgumentNullException(nameof(token));  
            RevokedAt = DateTime.UtcNow;  
        }
    }
}
