using Microsoft.EntityFrameworkCore;
using WSCore.Model;

namespace WSCore.Models
{
    public class WSContext : DbContext
    {
        public WSContext(DbContextOptions<WSContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder) { }

        DbSet<Files> Files { set; get; }
        DbSet<Media> Medias { set; get; }
    }
}
