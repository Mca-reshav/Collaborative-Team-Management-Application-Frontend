import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Paper,
  Button,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { seeActivity } from "../../services/ActivityService"; 
import EntityTypeChip from "../../context/ActivityEntityTypeContext";
import ActionTypeChip from "../../context/ActivityActionTypeContext";
import NameChip from "../../context/UserNameContext";
import { useNavigate } from "react-router-dom";
import { commonCellStyles } from "../../constants/Common.const";

const entityTypes = [
  { value: "0", label: "All" },
  { value: "1", label: "Project" },
  { value: "2", label: "Task" },
  { value: "3", label: "Other" },
  { value: "4", label: "User" },
];
const actionTypes = [
  { value: "0", label: "All" },
  { value: "1", label: "Assign" },
  { value: "2", label: "Create" },
  { value: "3", label: "Delete" },
  { value: "4", label: "Update" },
  { value: "5", label: "Other" },
  { value: "6", label: "Moved" },
];

const SeeActivityTable = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [entityTypeFilter, setEntityTypeFilter] = useState("0");
  const [actionTypeFilter, setActionTypeFilter] = useState("0");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await seeActivity();
      if (response.success) {
        setRows(response.data);
      } else if (!response?.success) navigate("/login");
    } catch (error) {
      localStorage.clear();
      navigate("/login");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleEntityTypeChange = (e) => setEntityTypeFilter(e.target.value);
  const handleActionTypeChange = (e) => setActionTypeFilter(e.target.value);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const matchesSearching = (row) => {
    const searchTerm = search.toLowerCase();
    return (
      row.entityId.toLowerCase().includes(searchTerm) ||
      row.activityId.toString().toLowerCase().includes(searchTerm)
    );
  };

  const filteredRows = rows.filter((row) => {
    const matchesSearch = matchesSearching(row);
    const matchesEntityType =
      entityTypeFilter === "0" || row.entityType === entityTypeFilter;
    const matchesActionType =
      actionTypeFilter === "0" || row.actionType === actionTypeFilter;

    return matchesSearch && matchesEntityType && matchesActionType;
  });

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
          justifyContent: "end",
        }}
      >
        <Button
          sx={{ backgroundColor: "#ff5e00", color: "#fff", height: "2.5rem" }}
          onClick={fetchData}
        >
          <RefreshIcon />
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 2,
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <FormControl
          variant="outlined"
          size="small"
          sx={{ flex: 1, minWidth: 150 }}
        >
          <InputLabel>Entity Type</InputLabel>
          <Select
            value={entityTypeFilter}
            onChange={handleEntityTypeChange}
            label="Entity Type"
          >
            <MenuItem value="">All</MenuItem>
            {entityTypes.map((type) => (
              <MenuItem key={type.label} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          size="small"
          sx={{ flex: 1, minWidth: 150 }}
        >
          <InputLabel>Action Type</InputLabel>
          <Select
            value={actionTypeFilter}
            onChange={handleActionTypeChange}
            label="Action Type"
          >
            <MenuItem value="">All</MenuItem>
            {actionTypes.map((type) => (
              <MenuItem key={type.label} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
          sx={{ flex: 1, maxWidth: "200px" }}
        />
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", padding: 2 }}>Loading...</Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 325,
            overflow: "auto",
            border: "1px solid #ff5e00",
            boxShadow: "none",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {[
                  "Activity ID",
                  "Entity Type",
                  "Entity ID",
                  "Action Type",
                  "Performed By",
                  "Previous Status",
                  "Current Status",
                  "Created At",
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      ...commonCellStyles
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row, key) => (
                <TableRow key={key}>
                  <TableCell sx={{ color: "#333" }}>{row.activityId}</TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    <EntityTypeChip entityType={row.entityType} />
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>{row.entityId}</TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    <ActionTypeChip actionType={row.actionType} />
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    <NameChip name={row.performedBy} />
                  </TableCell>
                  <TableCell sx={{ color: "#333", whiteSpace: "nowrap" }}>
                    {row.previousStatus}
                  </TableCell>
                  <TableCell sx={{ color: "#333", whiteSpace: "nowrap" }}>
                    {row.currentStatus}
                  </TableCell>
                  <TableCell sx={{ color: "#333", whiteSpace: "nowrap" }}>
                    {new Date(row.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              {paginatedRows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    align="center"
                    sx={{ color: "#333", fontWeight: "bold" }}
                  >
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default SeeActivityTable;
