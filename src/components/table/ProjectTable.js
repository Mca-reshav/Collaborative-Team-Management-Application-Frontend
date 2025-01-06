import React, { useState, useEffect, useCallback, useRef } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
} from "@mui/material";
import {
  getList,
  updateProject,
  deleteProject,
} from "../../services/ProjectService";
import RefreshIcon from "@mui/icons-material/Refresh";
import NameChip from "../../context/UserNameContext";
import ActionMenu from "../../context/ProjectActionContext";
import ProjectStatusChip from "../../context/ProjectStatusContext";
import { useNavigate } from "react-router-dom";
import { launchIconStyles, redirectLaunchStyles, warningMsg } from "../../constants/Common.const";
import { toast } from "react-toastify";
import { commonCellStyles } from "../../constants/Common.const";
import LaunchIcon from "@mui/icons-material/Launch";

const statuses = [
  { key: "All", value: "0" },
  { key: "Active", value: "1" },
  { key: "Archived", value: "2" },
  { key: "Completed", value: "3" },
];

const AllInOneTable = ({ reload }) => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("0");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("update");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    projectStatus: false,
    remark: "",
  });

  const showToaster = useRef(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getList();
      if (response.success) {
        setRows(response.data || []);
      } else if (
        !response?.success &&
        response?.message === warningMsg.ROLE_NOT_FOUND.msg
      ) {
        if (showToaster.current) {
          toast.error(warningMsg.ROLE_NOT_FOUND.respMsg);
          showToaster.current = false;
        }
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [reload, fetchData]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleStatusChange = (e) => setStatusFilter(e.target.value);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleActionDialogOpen = (row, type) => {
    setSelectedRow(row);
    setActionType(type);
    setFormData({
      projectTitle: row.projectTitle || "",
      projectDescription: row.projectDescription || "",
      projectStatus: row.projectStatus === "Completed",
      remark: "",
      projectId: row.projectId || "", 
    });
    setActionDialogOpen(true);
  };

  const handleActionDialogClose = () => {
    setActionDialogOpen(false);
    setSelectedRow(null);
    setActionType("update");
    setFormData({
      projectTitle: "",
      projectDescription: "",
      projectStatus: false,
      remark: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "3" : "1") : value,
    }));
  };

  const handleActionSubmit = async () => {
    if (actionType === "update") {
      try {
        const response = await updateProject({
          ...formData,
          id: selectedRow.id,
          projectId: formData.projectId,
        });
        if (response.success) {
          fetchData();
          handleActionDialogClose();
        } else {
          console.error("Error updating project:", response.message);
        }
      } catch (error) {
        console.error("Error updating project:", error);
      }
    } else if (actionType === "delete") {
      try {
        const response = await deleteProject({
          id: selectedRow.id,
          projectId: formData.projectId, 
          remark: formData.remark,
        });
        if (response.success) {
          fetchData();
          handleActionDialogClose();
        } else {
          console.error("Error deleting project:", response.message);
        }
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleRowClick = (projectId) => {
    navigate(`/projectSpecific/${projectId}`);
  };

  const matchesSearching = (row) => {
    const searchTerm = search.toLowerCase();
    return (
      row.projectTitle.toLowerCase().includes(searchTerm) ||
      row.projectId.toString().toLowerCase().includes(searchTerm)
    );
  };
  const filteredRows = rows.filter((row) => {
    const matchesSearch = matchesSearching(row);
    const matchesStatus =
      statusFilter === "0" || row.projectStatus === statusFilter;
    return matchesSearch && matchesStatus;
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
        >
          <RefreshIcon onClick={fetchData}></RefreshIcon>
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
          sx={{ flex: 1, maxWidth: "200px" }}
        >
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={handleStatusChange}
            label="Status"
          >
            {statuses.map((status) => (
              <MenuItem key={status.key} value={status.value}>
                {status.key}
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
                  "ID",
                  "Project ID",
                  "Title",
                  "Description",
                  "Team Members",
                  "Status",
                  "Created By",
                  "Created At",
                  "Actions",
                ].map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      ...commonCellStyles,
                      whiteSpace: [
                        "Team Members",
                        "Created By",
                        "Created At",
                      ].includes(header)
                        ? "nowrap"
                        : undefined,
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
                  <TableCell sx={{ color: "#333" }}>
                    {row.id || key + 1}
                  </TableCell>
                  <TableCell
                    sx={redirectLaunchStyles}
                    onClick={() => handleRowClick(row.projectId)}
                  >
                    {row.projectId} <LaunchIcon sx={launchIconStyles} />
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    {row.projectTitle}
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    {row.projectDescription}
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    {Array.isArray(row.teamMembers) &&
                    row.teamMembers.length > 0 ? (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {row.teamMembers.map((member, index) => (
                          <NameChip key={index} name={member} />
                        ))}
                      </Box>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    <ProjectStatusChip status={row.projectStatus} />
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    <NameChip name={row.createdBy} />
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>{row.createdAt}</TableCell>
                  <TableCell>
                    {row.projectStatus !== "3" ? (
                      <ActionMenu
                        onEdit={() => handleActionDialogOpen(row, "update")}
                        onDelete={() => handleActionDialogOpen(row, "delete")}
                      />
                    ) : (
                      <div className="disabled-action-menu">N/A</div>
                    )}
                  </TableCell>
                </TableRow>
              ))}

              {paginatedRows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
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

      <Dialog open={actionDialogOpen} onClose={handleActionDialogClose}>
        <DialogTitle>
          {actionType === "update" ? "Update Project" : "Delete Project"}
        </DialogTitle>
        <DialogContent>
          {actionType === "update" ? (
            <>
              <TextField
                label="Project Title"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleFormChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Project Description"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleFormChange}
                fullWidth
                margin="dense"
                multiline
                rows={3}
              />
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Checkbox
                  name="projectStatus"
                  checked={formData.projectStatus}
                  onChange={handleFormChange}
                />
                <span>Mark as Completed</span>
              </Box>
            </>
          ) : (
            <TextField
              label="Remark"
              name="remark"
              value={formData.remark}
              onChange={handleFormChange}
              fullWidth
              margin="dense"
              multiline
              rows={3}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleActionDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleActionSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllInOneTable;
