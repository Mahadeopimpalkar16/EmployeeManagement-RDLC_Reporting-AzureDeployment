using EmployeeManagement.DAL.Models;
using EmployeeManagement.DAL.Repository;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _repo;
        public EmployeeController(IEmployeeRepository repo)
        {
            _repo = repo;
        }

        // Used in API level searching
        [HttpGet("[action]")]
        public async Task<IActionResult> SearchDataBySearchParameter([FromQuery] string? searchValue, [FromQuery] string searchColumn = "Name" )
        {
            var employees = await _repo.GetFilteredEmployeesAsync(searchValue, searchColumn);
            employees.OrderByDescending(o => o.DateOfJoin);
            return Ok(employees);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _repo.GetAllEmployeesAsync();
            var result = employees.OrderByDescending(o => o.DateOfJoin).ToList();
            return Ok(result);
        }
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employee = await _repo.GetEmployeeByIdAsync(id);
            if (employee == null) return NotFound();
            return Ok(employee);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employee)
        {
            if (await _repo.EmployeeExistsAsync(employee.Name))
                return BadRequest("Duplicate record found.");

            await _repo.AddEmployeeAsync(employee);
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] Employee employee)
        {
            if (id != employee.Id) return BadRequest();
            await _repo.UpdateEmployeeAsync(employee);
            return Ok("Updated Successfully");
        }

        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            await _repo.DeleteEmployeeAsync(id);
            return Ok("Deleted Successfully");
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteMultiple([FromBody] List<int> employeeIds)
        {
            await _repo.DeleteEmployeesAsync(employeeIds);
            return Ok("Deleted Successfully");
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllStates()
        {
            var result = await _repo.GetAllStates();
            return Ok(result);
        }
    }
}
