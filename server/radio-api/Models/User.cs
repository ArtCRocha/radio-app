using System.ComponentModel.DataAnnotations.Schema;

namespace radio_api.Models
{
    [Table("users")]
    public class User
    {
        public Guid Id { get; init; }
        public string? CompletName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public virtual List<Station>? Stations { get; set; } = new List<Station>();

        public User(string completName, string email, string password) {
            CompletName = completName;
            Email = email;
            Password = password;
        }
    }
}
