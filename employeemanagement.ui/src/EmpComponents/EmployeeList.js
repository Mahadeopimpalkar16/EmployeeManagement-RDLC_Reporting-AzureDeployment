import React, { useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function EmployeeList({
  employees,
  onEdit,
  onDelete,
  selectedIds,
  onSelectAll,
  rowDeleteDisabled
}) {
  const [showDialog, setShowDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const isLoading = !employees || employees.length === 0;
  // Define columns for the DataGrid
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={e => {
            e.stopPropagation();
            onEdit(params.row);
          }}
        >
          {params.value}
        </span>
      ),
      sortable: true
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1,
      sortable: true
    },
    {
      field: "dateOfJoin",
      headerName: "Date Of Join",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
      },
      sortable: true
    },
    {
      field: "salary",
      headerName: "Salary",
      type: "number",
      flex: 1,

      sortable: true
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      sortable: true
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
      sortable: true
    },
    {
      field: "dateOfBirth",
      headerName: "Date Of Birth",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
      },
      sortable: true
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => onDelete(params.row.id)}
          disabled={rowDeleteDisabled}
        >
          Delete
        </Button>
      ),
      sortable: false,
      filterable: false
    }
  ];

  // Transform employees data to rows
  const rows = isLoading ? [] : employees.map((e) => ({
    id: e.id || e._id, // Ensure id is always present
    name: e.name || '',
    designation: e.designation || '',
    dateOfJoin: e.dateOfJoin || null,
    salary: e.salary || 0,
    gender: e.gender || '',
    state: e.state || '',
    dateOfBirth: e.dateOfBirth || null
  }));

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDialog(true);
  };

  const handleSelectionModelChange = (selection) => {
    const selectedArray = Array.from(selection?.ids || []);
    console.log("Selected IDs:", selectedArray);
    onSelectAll(selectedArray); // Pass to parent
  };

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const start = paginationModel.page * paginationModel.pageSize;
  const end = start + paginationModel.pageSize;
  const currentPageRows = rows.slice(start, end);

  const totalSalaryCurrentPage = currentPageRows.reduce((sum, row) => {
    const val = parseFloat(row.salary);
    return sum + (isNaN(val) ? 0 : val);
  }, 0).toFixed(2);

  return (
    <>
      <div id="pdf-table" style={{ height: 420, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          checkboxSelectionVisibleOnly={false} // ✅ ensures selection applies to all rows
          disableRowSelectionOnClick
          selectionModel={selectedIds}
          onRowSelectionModelChange={handleSelectionModelChange}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 20]}
          autoHeight
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              color: 'black',
              fontWeight: 'bold',
              fontSize: '1.1rem',
            },
            '& .MuiDataGrid-row:nth-of-type(odd)': {
              backgroundColor: '#f9f9f9',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#e0f7fa', // Hover effect
            }

          }} 
          />

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
          <span>
            <strong>
              Total Salary : {totalSalaryCurrentPage}
            </strong>
          </span>
        </div>
      </div>
    </>
  );
}

export default EmployeeList;