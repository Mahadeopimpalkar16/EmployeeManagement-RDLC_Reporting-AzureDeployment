using EmployeeManagement.DAL.Data;
using EmployeeManagement.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Buffers;

namespace EmployeeManagement.DAL.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly EmployeeDbContext _context;
        public EmployeeRepository(EmployeeDbContext context) { _context = context; }

        public async Task<IEnumerable<Employee>> GetFilteredEmployeesAsync(string searchValue, string searchColumn)
        {
            if (!string.IsNullOrEmpty(searchColumn))
            {
                var isValidColumn = typeof(Employee).GetProperties()
                    .Any(p => p.Name.Equals(searchColumn)
                    && p.PropertyType == typeof(string));
                if (!isValidColumn)
                {
                    throw new ArgumentException($"Invalid Search column : {searchColumn}");
                }
            }
            var query = _context.Employees.AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchValue) && !string.IsNullOrWhiteSpace(searchColumn))
            {
                query = query.Where(e =>
                    EF.Property<string>(e, searchColumn).Contains(searchValue));
            }

            return await query.ToListAsync();
        }
        public async Task<IEnumerable<Employee>> GetAllEmployeesAsync()
        {
            return await _context.Employees.ToListAsync();
        }
        public async Task<IEnumerable<States>> GetAllStates()
        {
            return await _context.States.ToListAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id) =>
            await _context.Employees.FindAsync(id);

        public async Task AddEmployeeAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateEmployeeAsync(Employee employee)
        {
            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEmployeeAsync(int id)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp != null)
            {
                _context.Employees.Remove(emp);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteEmployeesAsync(IEnumerable<int> employeeIds)
        {
            var employees = _context.Employees.Where(e => employeeIds.Contains(e.Id));
            _context.Employees.RemoveRange(employees);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> EmployeeExistsAsync(string name) =>
            await _context.Employees.AnyAsync(e => e.Name == name);

    }
}
