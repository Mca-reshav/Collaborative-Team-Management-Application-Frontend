import React, { useState, useEffect } from "react";
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
import { getList } from "../../services/TeamMemberService";
import RefreshIcon from "@mui/icons-material/Refresh";
import RoleChip from "../../context/RoleContext";
import IsAssignedChip from "../../context/IsAssignedContext";
import DesignationChip from "../../context/DesignationContext";
import StatusChip from "../../context/StatusContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useCallback } from "react";
import NameChip from "../../context/UserNameContext";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { roles_access } from "../../constants/Common.const";
import { updateUserDetails } from "../../services/UserService";

const headers = [
  "ID",
  "Employee ID",
  "Name",
  "Designation",
  "Role",
  "Status",
  "Is Assigned",
  "Created At",
  "Actions",
];

const AllInOneTable = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("0");
  const [statusFilter, setStatusFilter] = useState("2");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const role = [
    { value: "3", label: "Team Member" },
    { value: "2", label: "Project Manager" },
    { value: "1", label: "Admin" },
    { value: "0", label: "All" },
  ]

  const status = [
    { value: "2", label: "All" },
    { value: "1", label: "Active" },
    { value: "0", label: "Inactive" },
  ]

  const [roles] = useState(role);
  const [statuses] = useState(status);
  const [isAssigned] = useState([
    { value: "1", label: "Yes" },
    { value: "0", label: "No" },
  ]);
  const [designations] = useState([
    { value: "1", label: "Chief" },
    { value: "2", label: "Managerial" },
    { value: "3", label: "Employee" },
  ]);
  const [genders] = useState([
    { value: "1", label: "Male" },
    { value: "2", label: "Female" },
    { value: "3", label: "Other" },
  ]);


  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getList();
      if (response && response.success) {
        setRows(response?.data);
      } else if (!response?.success) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      toast.error("Internal Error");
      localStorage.clear();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleRowClick = (empId) => {
    navigate(`/members/${empId}`);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleRoleChange = (e) => setRoleFilter(e.target.value);
  const handleStatusChange = (e) => setStatusFilter(e.target.value);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const matchesSearching = (row) => {
    const searchTerm = search.toLowerCase();
    return (
      row.name.toLowerCase().includes(searchTerm) ||
      row.empId.toString().toLowerCase().includes(searchTerm)
    );
  };
  let setRole = roles_access.TEAM_MEMBER;
  const filteredRows = rows.filter((row) => {
    if (row?.setRole) setRole = row.setRole;
    if (row?.empId) {
      const matchesSearch = matchesSearching(row)
      const matchesRole = roleFilter === "0" || row.role === roleFilter;
      const matchesStatus =
        statusFilter === "2" || row.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    }
    return false;
  });

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEditClick = (row) => {
    setEditData(row); 
    setEditDialogOpen(true);
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSave = async () => {
    try {
      if (editData?.createdAt) delete editData.createdAt;
      if (editData?.setRole) delete editData.setRole;
      if (editData?._id) delete editData._id;
      if (editData?.contactNo) {
        editData.contactNo = String(editData.contactNo);
      }
      const saveData = await updateUserDetails(editData);
      if (saveData?.success) {
        toast.success("Data updated successfully!");
        fetchData();
      } else toast.error(saveData?.message);
    } catch (error) {
      console.error(error);
      toast.error("Error updating data.");
    } finally {
      setEditDialogOpen(false);
    }
  };

  const handleEditCancel = () => {
    setEditDialogOpen(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginBottom: 2,
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
          justifyContent: "space-between",
        }}
      >
        <FormControl
          variant="outlined"
          size="small"
          sx={{ flex: 1, minWidth: 80 }}
        >
          <InputLabel>Role</InputLabel>
          <Select value={roleFilter} onChange={handleRoleChange} label="Role">
            {roles.map((role) => (
              <MenuItem key={role.label} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          size="small"
          sx={{ flex: 1, minWidth: 80 }}
        >
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={handleStatusChange}
            label="Status"
          >
            {statuses.map((status) => (
              <MenuItem key={status.label} value={status.value}>
                {status.label}
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
          sx={{ flex: 1, minWidth: 80 }}
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
                {headers.map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      backgroundColor: "#ff5e00",
                      color: "#333",
                      fontWeight: "bold",
                      fontFamily: "Poppins, sans-serif",
                      whiteSpace: [
                        "Designation",
                        "Is Assigned",
                        "Created At",
                      ].includes(header)
                        ? "nowrap"
                        : "normal",
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
                    sx={{
                      color: "#333",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => handleRowClick(row.empId)}
                  >
                    {row.empId}{" "}
                    <LaunchIcon
                      sx={{
                        marginBottom: "-2px",
                        color: "#ff5e00",
                        height: "15px",
                        marginLeft: "-5px",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#333", whiteSpace: "nowrap" }}>
                    <NameChip name={row.name} />
                  </TableCell>
                  <TableCell>
                    <DesignationChip designation={row.designation} />
                  </TableCell>
                  <TableCell>
                    <RoleChip role={row.role} />
                  </TableCell>
                  <TableCell>
                    <StatusChip status={row.status} />
                  </TableCell>
                  <TableCell>
                    <IsAssignedChip isAssigned={row.isAssigned} />
                  </TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>
                    {setRole !== roles_access.TEAM_MEMBER ? (
                      <Button
                        onClick={() => handleEditClick(row)}
                        sx={{ backgroundColor: "#ff5e00", color: "#fff" }}
                      >
                        <ModeEditIcon />
                      </Button>
                    ) : (
                      "NA"
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
          <Dialog open={editDialogOpen} onClose={handleEditCancel}>
            <DialogTitle sx={{ width: "25rem", fontFamily: "Poppins" }}>
              Edit Team Member Details
            </DialogTitle>
            <DialogContent>
              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  label="Name"
                  value={editData.name || ""}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  sx={{ marginTop: "1rem" }}
                />

                <TextField
                  label="Email ID"
                  type="email"
                  value={editData.emailId || ""}
                  onChange={(e) => handleEditChange("emailId", e.target.value)}
                />

                <TextField
                  label="Contact No"
                  value={editData.contactNo || ""}
                  onChange={(e) =>
                    handleEditChange("contactNo", e.target.value)
                  }
                />

                <FormControl>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={editData.gender || ""}
                    onChange={(e) => handleEditChange("gender", e.target.value)}
                  >
                    {genders.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  type="date"
                  value={editData.dateOfBirth || ""}
                  onChange={(e) =>
                    handleEditChange("dateOfBirth", e.target.value)
                  }
                />

                <FormControl error={!editData.designation}>
                  <InputLabel>Designation</InputLabel>
                  <Select
                    value={editData.designation || ""}
                    onChange={(e) =>
                      handleEditChange("designation", e.target.value)
                    }
                  >
                    {designations.map((designation) => (
                      <MenuItem
                        key={designation.value}
                        value={designation.value}
                      >
                        {designation.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl error={!editData.isAssigned}>
                  <InputLabel>Is Assigned</InputLabel>
                  <Select
                    value={editData.isAssigned || ""}
                    onChange={(e) =>
                      handleEditChange("isAssigned", e.target.value)
                    }
                  >
                    {isAssigned.map((isAssigned) => (
                      <MenuItem key={isAssigned.value} value={isAssigned.value}>
                        {isAssigned.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl error={!editData.status}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={editData.status || ""}
                    onChange={(e) => handleEditChange("status", e.target.value)}
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status.value} value={status.value}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {setRole === roles_access.ADMIN && (
                  <FormControl error={!editData.role}>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={editData.role || ""}
                      onChange={(e) => handleEditChange("role", e.target.value)}
                    >
                      {roles.map((role) => (
                        <MenuItem key={role.value} value={role.value}>
                          {role.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Box>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleEditCancel} sx={{ color: "#ff5f00" }}>
                Cancel
              </Button>
              <Button onClick={handleEditSave} sx={{ color: "#ff5e00" }}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
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

export default AllInOneTable;
