import React from "react";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";

const EmployeeToolbar = ({
  onAdd,
  onMultiDelete,
  multiDeleteDisabled,
  addDisabled,
  onDownloadPdf,
  onViewReport,
  setShowChart,
  searchValue,
  onSearchChange,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      sx={{ mb: 2 }}
    >
      {/* Left Buttons */}
      <Box display="flex" gap={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={onAdd}
          disabled={addDisabled}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onMultiDelete}
          disabled={multiDeleteDisabled}
        >
          Delete Selected
        </Button>
      </Box>

      {/* Spacer to push right section */}
      <Box display="flex" alignItems="center" gap={1} ml="auto">
        <Tooltip title="View Charts">
          <IconButton onClick={setShowChart} color="primary">
            <InsertChartIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download PDF">
          <IconButton onClick={onDownloadPdf} color="secondary">
            <PictureAsPdfIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View Report">
          <IconButton onClick={onViewReport} color="success">
            <DescriptionIcon />
          </IconButton>
        </Tooltip>
        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default EmployeeToolbar;
