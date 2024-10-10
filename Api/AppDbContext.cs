using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.EntityFrameworkCore;



public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    public DbSet<Users> users { get; set; }

    public DbSet<Cvs> cv {get; set;}

    public DbSet<PlCv> pl_cv {get; set;}

    public DbSet<Translations> cv_translations {get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    modelBuilder.Entity<PlCv>()
        .HasKey(pc => new { pc.pl_id, pc.cv_id });
    
    modelBuilder.Entity<UserRoles>()
        .HasKey(ur => new {ur.user_id, ur.role_id});
    }

    public DbSet<Courses> courses {get; set;}

    public DbSet<ProjectDetails> project_details {get; set;}

    public DbSet<UserRoles> user_roles {get; set;}

    public DbSet<Roles> roles {get; set;}

    public DbSet<ProgrammingLanguage> programming_language {get; set;}


}
