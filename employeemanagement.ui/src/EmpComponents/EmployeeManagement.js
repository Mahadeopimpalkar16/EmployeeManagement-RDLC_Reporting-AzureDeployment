import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import EmployeeList from "./EmployeeList";
import EmployeeForm from "./EmployeeForm";
import EmployeeSearch from "./EmployeeSearch";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ReportDialog from "./ReportDialog";
import EmployeeChart from "./EmployeeChart";
import EmployeeChartDialog from "./EmployeeChartDialog";
import {
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";

const apiBase = "https://localhost:7264/api/Employee";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [states, setStates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [chartType, setChartType] = useState("pie");
  const [showChartDialog, setShowChartDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteMode, setDeleteMode] = useState(""); // 'single' or 'multi'
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Fetch employee data
  const fetchEmployees = useCallback(async () => {
    const res = await axios.get(`${apiBase}/GetAllEmployees`);
    setEmployees(res.data.employees || res.data);
  }, []);

  // Fetch states
  const fetchStates = useCallback(async () => {
    const res = await axios.get(`${apiBase}/GetAllStates`);
    const stateNames = (res.data.states || res.data).map((s) => s.stateName);
    setStates(stateNames);
  }, []);

  useEffect(() => {
    fetchEmployees();
    fetchStates();
  }, [fetchEmployees, fetchStates]);

  //filtered by name column
  const filteredEmployees = employees.filter((e) =>
    e.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Filtered by any column
  // const filteredEmployees = employees.filter((e) =>
  //   [e.name, e.designation, e.state, e.gender]
  //     .some((field) =>
  //       field?.toString().toLowerCase().includes(search.toLowerCase())
  //     )
  // );

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

  const handleSingleDelete = (id) => {
    confirmDelete("single", id);
  };

  const handleMultipleDelete = () => {
    confirmDelete("multi");
  };

  const handleConfirmDelete = async () => {
    if (deleteMode === "single" && deleteTargetId !== null) {
      await axios.delete(`${apiBase}/DeleteEmployee/${deleteTargetId}`);
    } else if (deleteMode === "multi") {
      await axios.delete(`${apiBase}/DeleteMultiple`, { data: selectedIds });
      setSelectedIds([]);
    }

    setShowDeleteDialog(false);
    setDeleteTargetId(null);
    fetchEmployees();
  };

  const handleFormSubmit = async (employee, editing) => {
    if (editing) {
      await axios.put(`${apiBase}/UpdateEmployee/${employee.id}`, employee);
    } else {
      await axios.post(`${apiBase}/AddEmployee`, employee);
    }
    setShowForm(false);
    fetchEmployees();
  };

  const handleSelectAll = (ids) => {
    setSelectedIds(ids);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Employee List", 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [
        [
          "Name",
          "Designation",
          "Date of Join",
          "Salary",
          "Gender",
          "State",
          "Date of Birth",
        ],
      ],
      body: filteredEmployees.map((e) => [
        e.name,
        e.designation,
        new Date(e.dateOfJoin).toLocaleDateString(),
        e.salary,
        e.gender,
        e.state,
        new Date(e.dateOfBirth).toLocaleDateString(),
      ]),
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    doc.save("Employee_List.pdf");
  };

  const handleViewReport = () => {
    setShowReportDialog(true);
  };

  return (
    <div className="container mt-4">
      <h2 style={{ textAlign: "center" }}>Employee Management</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: 16,
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            disabled={selectedIds.length > 0}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleMultipleDelete}
            disabled={selectedIds.length === 0}
          >
            Delete Selected
          </Button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Tooltip title="Show Charts">
            <IconButton color="primary" onClick={() => setShowChartDialog(true)}>
              <InsertChartIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Download PDF">
            <IconButton color="secondary" onClick={handleDownloadPdf}>
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="View Report">
            <IconButton color="success" onClick={handleViewReport}>
              <DescriptionIcon />
            </IconButton>
          </Tooltip>

          <EmployeeSearch value={search} onChange={setSearch} />
        </div>
      </div>

      {/* Employee Table */}
      <EmployeeList
        employees={filteredEmployees}
        onEdit={handleEdit}
        onDelete={handleSingleDelete} // ✅ Now uses parent-level confirm
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        rowDeleteDisabled={selectedIds.length > 0}
      />

      {/* Chart Section */}
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

      {/* Form Dialog */}
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

      {/* Shared Delete Dialog */}
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
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EmployeeManagement;
