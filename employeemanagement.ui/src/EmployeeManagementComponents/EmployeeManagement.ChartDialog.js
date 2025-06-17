import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PieChartIcon from "@mui/icons-material/PieChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import EmployeeChart from "./EmployeeManagement.Charts";

function EmployeeChartDialog({ open, onClose, employees }) {
  const [chartType, setChartType] = React.useState("pie");

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Salary Distribution by Designation
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
          <Tooltip title="Pie Chart">
            <IconButton
              color={chartType === "pie" ? "primary" : "default"}
              onClick={() => setChartType("pie")}
            >
              <PieChartIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bar Chart">
            <IconButton
              color={chartType === "bar" ? "primary" : "default"}
              onClick={() => setChartType("bar")}
            >
              <BarChartIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Line Chart">
            <IconButton
              color={chartType === "line" ? "primary" : "default"}
              onClick={() => setChartType("line")}
            >
              <ShowChartIcon />
            </IconButton>
          </Tooltip>
        </div>

        <EmployeeChart employees={employees} type={chartType} />
      </DialogContent>
    </Dialog>
  );
}

export default EmployeeChartDialog;
