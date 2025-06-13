using EmployeeManagement.DAL.Models;
using Microsoft.EntityFrameworkCore;


namespace EmployeeManagement.DAL.Data
{

    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<States> States { get; set; }
    }

}
