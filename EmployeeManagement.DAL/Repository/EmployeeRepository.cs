using EmployeeManagement.DAL.Data;
using EmployeeManagement.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.DAL.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly EmployeeDbContext _context;
        public EmployeeRepository(EmployeeDbContext context) { _context = context; }

        public async Task<IEnumerable<Employee>> GetFilteredEmployeesAsync(string search, string sortColumn, bool ascending, int page, int pageSize)
        {
            var query = _context.Employees.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(e => e.Name.Contains(search));
            }

            if (!string.IsNullOrEmpty(sortColumn))
            {
                query = ascending
                    ? query.OrderBy(e => EF.Property<object>(e, sortColumn))
                    : query.OrderByDescending(e => EF.Property<object>(e, sortColumn));
            }

            return await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
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
