using EmployeeManagement.DAL.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Reporting.NETCore;
using QuestPDF.Fluent;
using System.Buffers;

namespace EmployeeManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepo;
        public ReportsController(IEmployeeRepository employeeRepo )
        {
            _employeeRepo = employeeRepo;
        }

        [HttpGet("GeneratePDFReport")]
        public IActionResult GeneratePDFReport([FromQuery] string? SearchValue)
        {
            var formattedEmp = _employeeRepo.GetFilteredEmployeesAsync(SearchValue,"Name").Result.OrderByDescending(o=>o.DateOfJoin).ToList();

            LocalReport report = new LocalReport();
            report.ReportPath = Path.Combine(Directory.GetCurrentDirectory(), "Reports", "EmployeeReports.rdlc");

            report.DataSources.Add(new ReportDataSource("EmployeeDataSet", formattedEmp)); // Match RDLC dataset name

            byte[] pdfBytes = report.Render("PDF");

            return File(pdfBytes, "application/pdf", "EmployeeReports.pdf");
        }

        [HttpGet("GenerateExcelReport")]
        public IActionResult ExportToExcel([FromQuery] string? SearchValue)
        {
            var formattedEmp = _employeeRepo.GetFilteredEmployeesAsync(SearchValue, "Name").Result.OrderByDescending(o => o.DateOfJoin).ToList();

            LocalReport report = new LocalReport();
            report.ReportPath = Path.Combine(Directory.GetCurrentDirectory(), "Reports", "EmployeeReports.rdlc");

            report.DataSources.Add(new ReportDataSource("EmployeeDataSet", formattedEmp));

            string mimeType;
            string encoding;
            string fileNameExtension;
            Warning[] warnings;
            string[] streamids;

            // Export to Excel format (.xlsx)
            byte[] bytes = report.Render(
                "EXCELOPENXML",  // use "Excel" for older .xls
                null,
                out mimeType,
                out encoding,
                out fileNameExtension,
                out streamids,
                out warnings);

            return File(bytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "EmployeeReport.xlsx");
        }

    }

}
