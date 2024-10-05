using Microsoft.EntityFrameworkCore;
using radio_api.Models;

namespace radio_api.Context
{
    public class RadioApiDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Station> Stations { get; set; }
        public DbSet<RevokedToken> RevokedTokens { get; set; }

        public RadioApiDBContext (DbContextOptions<RadioApiDBContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.Stations)
                .WithOne(s => s.User)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
