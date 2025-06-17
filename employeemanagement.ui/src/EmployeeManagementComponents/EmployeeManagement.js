import React, { useEffect, useState } from "react";
import {
  fetchEmployees,
  fetchStates,
  deleteEmployee,
  deleteMultipleEmployees,
  addEmployee,
  updateEmployee,
  downloadPDFReport,
  downloadExcelReport,
} from "./EmployeeManagement.API";

import EmployeeList from "./EmployeeManagement.List";
import EmployeeForm from "./EmployeeManagement.CreateEmpForm";
import ReportDialog from "./EmployeeManagement.ReportDialog";
import EmployeeChart from "./EmployeeManagement.Charts";
import EmployeeChartDialog from "./EmployeeManagement.ChartDialog";
import EmployeeToolbar from "./EmployeeManagement.Toolbar";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [states, setStates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [chartType, setChartType] = useState("pie");
  const [showChartDialog, setShowChartDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteMode, setDeleteMode] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setEmployees(await fetchEmployees());
      setStates(await fetchStates());
    };
    loadData();
  }, []);

  const filteredEmployees = employees.filter((e) =>
    e.name?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleAdd = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setShowForm(true);
  };

  const confirmDelete = (mode, id = null) => {
    setDeleteMode(mode);
    setDeleteTargetId(id);
    setShowDeleteDialog(true);
  };

  const handleMultipleDelete = () => {
    confirmDelete("multi");
  };

  const handleConfirmDelete = async () => {
    if (deleteMode === "single" && deleteTargetId !== null) {
      await deleteEmployee(deleteTargetId);
    } else if (deleteMode === "multi") {
      await deleteMultipleEmployees(selectedIds);
      setSelectedIds([]);
    }
    setShowDeleteDialog(false);
    setDeleteTargetId(null);
    setEmployees(await fetchEmployees());
  };

  const handleFormSubmit = async (employee, editing) => {
    if (editing) {
      await updateEmployee(employee);
    } else {
      await addEmployee(employee);
    }
    setShowForm(false);
    setEmployees(await fetchEmployees());
  };

  const handleSelectAll = (ids) => {
    setSelectedIds(ids);
  };

  const handleViewReport = () => {
    setShowReportDialog(true);
  };

  return (
    <div className="container mt-4">
      <h2 style={{ textAlign: "center" }}>Employee Management</h2>

      <EmployeeToolbar
        onAdd={handleAdd}
        addDisabled={selectedIds.length > 0}
        onMultiDelete={handleMultipleDelete}
        multiDeleteDisabled={selectedIds.length === 0}
        onDownloadPdf={downloadPDFReport}
        onDownloadExcel={downloadExcelReport}
        onViewReport={handleViewReport}
        setShowChart={() => setShowChartDialog(true)}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      <EmployeeList
        employees={filteredEmployees}
        onEdit={handleEdit}
        onDelete={(id) => confirmDelete("single", id)}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        rowDeleteDisabled={selectedIds.length > 0}
      />

      {showChart && (
        <div style={{ marginTop: 40 }}>
          <h4>Salary Distribution by Designation</h4>
          <EmployeeChart employees={employees} type={chartType} />
          <div style={{ marginTop: 10 }}>
            <button onClick={() => setChartType("pie")}>Pie</button>
            <button onClick={() => setChartType("bar")}>Bar</button>
            <button onClick={() => setChartType("line")}>Line</button>
          </div>
        </div>
      )}

      {showForm && (
        <EmployeeForm
          show={showForm}
          onHide={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
          employee={editingEmployee}
          states={states}
        />
      )}

      <EmployeeChartDialog
        open={showChartDialog}
        onClose={() => setShowChartDialog(false)}
        employees={employees}
      />

      <ReportDialog
        open={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        employees={filteredEmployees}
      />

      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          {deleteMode === "multi"
            ? "Are you sure you want to delete the selected employees?"
            : "Are you sure you want to delete this employee?"}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EmployeeManagement;
