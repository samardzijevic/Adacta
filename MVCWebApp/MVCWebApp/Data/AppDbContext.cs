using Microsoft.EntityFrameworkCore;
using MVCWebApp.Models;
using Task = MVCWebApp.Models.Task;

namespace MVCWebApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Task> Tasks { get; set; }
    }
}
