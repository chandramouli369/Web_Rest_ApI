using Microsoft.EntityFrameworkCore;
using Web_Rest_API.Model;
//Task 4: Configuring databases
namespace Web_Rest_API.Db
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Task_Entity> Tasks { get; set; }
    }
}
