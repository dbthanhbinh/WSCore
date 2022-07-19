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
        DbSet<Module> Modules { set; get; }
        DbSet<Package> Packages { set; get; }
        DbSet<PackageModule> PackageModules { set; get; }
        DbSet<Role> Roles { set; get; }
        DbSet<UserModuleAct> UserModuleActs { get; set; }
        DbSet<Seo> Seos { set; get; }
        DbSet<Menu> Menus { set; get; }
        DbSet<AgentProfile> AgentProfiles { set; get; }
    }
}
