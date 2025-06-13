using EmployeeManagement.DAL.Models;

namespace EmployeeManagement.DAL.Repository
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetFilteredEmployeesAsync(string search = null, string sortColumn = null, bool ascending = true, int page = 1, int pageSize = 5);
        Task<Employee> GetEmployeeByIdAsync(int id);
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task AddEmployeeAsync(Employee employee);
        Task UpdateEmployeeAsync(Employee employee);
        Task DeleteEmployeeAsync(int id);
        Task DeleteEmployeesAsync(IEnumerable<int> employeeIds);
        Task<bool> EmployeeExistsAsync(string name);
        Task<IEnumerable<States>> GetAllStates();
    }
}
