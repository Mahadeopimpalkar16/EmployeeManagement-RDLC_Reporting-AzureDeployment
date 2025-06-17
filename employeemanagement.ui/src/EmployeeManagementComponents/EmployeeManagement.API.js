import axios from "axios";

const apiBase = "https://localhost:7264/api/Employee";
const reportApiBase = "https://localhost:7264/api/Reports";

export const fetchEmployees = async () => {
  const res = await axios.get(`${apiBase}/GetAllEmployees`);
  return res.data.employees || res.data;
};

export const fetchStates = async () => {
  const res = await axios.get(`${apiBase}/GetAllStates`);
  return (res.data.states || res.data).map((s) => s.stateName);
};

export const deleteEmployee = async (id) => {
  await axios.delete(`${apiBase}/DeleteEmployee/${id}`);
};

export const deleteMultipleEmployees = async (ids) => {
  await axios.delete(`${apiBase}/DeleteMultiple`, { data: ids });
};

export const addEmployee = async (employee) => {
  await axios.post(`${apiBase}/AddEmployee`, employee);
};

export const updateEmployee = async (employee) => {
  await axios.put(`${apiBase}/UpdateEmployee/${employee.id}`, employee);
};

// Download utility functions

export const downloadPDFReport = async (searchValue) => {
  const response = await axios.get(`${reportApiBase}/GeneratePDFReport`, {
    params: { searchValue: searchValue || "" },
    responseType: "blob",
  });
  const blob = new Blob([response.data], { type: "application/pdf" });
  downloadFile(blob, "Employee_Report.pdf");
};

export const downloadExcelReport = async (searchValue) => {
  const response = await axios.get(`${reportApiBase}/GenerateExcelReport`, {
    params: { searchValue: searchValue || "" },
    responseType: "blob",
  });
  const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  downloadFile(blob, "Employee_Report.xlsx");
};

export const downloadCSVReport = async (searchValue) => {
  const response = await axios.get(`${reportApiBase}/GenerateCSVReport`, {
    responseType: "blob",
  });
  const blob = new Blob([response.data], { type: "text/csv" });
  downloadFile(blob, "Employee_Report.csv");
};

const downloadFile = async (blob, fileName) =>{

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
}
