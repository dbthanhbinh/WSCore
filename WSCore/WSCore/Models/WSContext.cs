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
        DbSet<Tag> Tags { set; get; }
        DbSet<Category> Categories { set; get; }
        DbSet<Article> Articles { set; get; }
        DbSet<User> Users { get; set; }
        DbSet<UserSecret> UserSecrets { get; set; }
        DbSet<UserProfile> UserProfiles { get; set; }
        DbSet<ObjectTag> ObjectTags { set; get; }
    }
}
