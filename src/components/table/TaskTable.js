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
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import {
  getList,
  updateTaskData,
  deleteTaskData,
  moveTaskToNext,
} from "../../services/TaskService";
import RefreshIcon from "@mui/icons-material/Refresh";
import PriorityChip from "../../context/PriorityContext";
import TaskStatusChip from "../../context/TaskStatusContext";
import ActionMenu from "../../context/TaskActionContext";
import { listAvailableUsers } from "../../services/TaskService";
import { assignTask } from "../../services/TaskService";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import NameChip from "../../context/UserNameContext";
import { useNavigate } from "react-router-dom";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import {
  launchIconStyles,
  redirectLaunchStyles,
  warningMsg,
} from "../../constants/Common.const";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { commonCellStyles } from "../../constants/Common.const";
import LaunchIcon from "@mui/icons-material/Launch";

const statuses = [
  { key: "All", value: "0" },
  { key: "To Do", value: "1" },
  { key: "In Progress", value: "2" },
  { key: "Done", value: "3" },
  { key: "Removed", value: "4" },
  { key: "Created", value: "5" },
];
const priorities = [
  { key: "All", value: "0" },
  { key: "High", value: "3" },
  { key: "Medium", value: "2" },
  { key: "Low", value: "1" },
];

const AllInOneTable = ({ reload }) => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("0");
  const [priorityFilter, setPriorityFilter] = useState("0");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("1");
  const [remark, setRemark] = useState("");
  const navigate = useNavigate();
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const showToaster = useRef(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getList();
      if (response.success) setRows(response?.data);
      else if (
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
  const handlePriorityChange = (e) => setPriorityFilter(e.target.value);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate || null);
  };

  const handleAssignTaskClick = async (task) => {
    setSelectedTask(task);
    try {
      const response = await listAvailableUsers();
      if (response.success) {
        setUsers(response.data);
        setOpenAssignDialog(true);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleMoveTaskClick = async (data) => {
    try {
      const sendData = await moveTaskToNext({
        taskId: data?.taskId,
        taskStatus: data?.taskStatus,
      });

      if (sendData?.success) {
        toast.success(sendData?.message);
        fetchData();
      } else {
        toast.error(sendData?.message);
        console.error("Failed to move the task");
      }
    } catch (error) {
      console.error("Error moving the task:", error);
    }
  };

  const handleAssignSubmit = async () => {
    try {
      const taskId = selectedTask.taskId;
      const memberId = selectedUser;
      const response = await assignTask(taskId, memberId);
      if (response.success) {
        setOpenAssignDialog(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  const handleEditClick = (row) => {
    setSelectedTask(row);
    setTaskTitle(row.taskTitle);
    setTaskDescription(row.taskDescription);
    setDueDate(row.dueDate);
    setPriority(row.priority);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (row) => {
    setSelectedTask(row);
    setRemark("");
    setOpenDeleteDialog(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await updateTaskData(selectedTask.id, {
        taskTitle,
        taskDescription,
        dueDate,
        priority,
      });
      if (response.success) {
        setOpenEditDialog(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      const response = await deleteTaskData(selectedTask.id, { remark });
      if (response.success) {
        setOpenDeleteDialog(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleRowClick = (taskId) => {
    navigate(`/taskSpecific/${taskId}`);
  };

  const matchesSearching = (row) => {
    const searchTerm = search.toLowerCase();
    return (
      row.taskTitle.toLowerCase().includes(searchTerm) ||
      row.taskId.toString().toLowerCase().includes(searchTerm) ||
      row.projectId.toString().toLowerCase().includes(searchTerm)
    );
  };

  const filteredRows = rows.filter((row) => {
    const matchesSearch = matchesSearching(row);
    const matchesStatus =
      statusFilter === "0" || row.taskStatus === statusFilter;
    const matchesPriority =
      priorityFilter === "0" || row.priority === priorityFilter;
    const matchesDate =
      !selectedDate ||
      new Date(row.dueDate).toDateString() === selectedDate.toDateString();

    return matchesSearch && matchesStatus && matchesPriority && matchesDate;
  });

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          alignItems: "center",
          marginBottom: 2,
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          sx={{ backgroundColor: "#ff5e00", color: "#fff", height: "35px" }}
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl
          variant="outlined"
          size="small"
          sx={{ flex: 1, maxWidth: "200px" }}
        >
          <InputLabel id="task-status-label">Task Status</InputLabel>
          <Select
            labelId="task-status-label"
            value={statusFilter}
            onChange={handleStatusChange}
            label="Task Status"
          >
            {statuses.map((status) => (
              <MenuItem key={status.key} value={status.value}>
                {status.key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          size="small"
          sx={{ flex: 1, maxWidth: "200px" }}
        >
          <InputLabel>Priority</InputLabel>
          <Select
            value={priorityFilter}
            onChange={handlePriorityChange}
            label="Priority"
          >
            {priorities.map((priority) => (
              <MenuItem key={priority.key} value={priority.value}>
                {priority.key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          size="small"
          sx={{ flex: 1, minWidth: 120 }}
        ></FormControl>
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
                  "Task ID",
                  "Project ID",
                  "Title",
                  "Due Date",
                  "Priority",
                  "Status",
                  "Created By",
                  "Created At",
                  "Assigned By",
                  "Assigned To",
                  "Assigned At",
                  "Assign Task",
                  "Move Task",
                  "Action",
                ].map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      ...commonCellStyles,
                      whiteSpace:
                        header === "Project ID" || header === "Created By"
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
                    onClick={() => handleRowClick(row.taskId)}
                  >
                    {row.taskId} <LaunchIcon sx={launchIconStyles} />
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>{row.projectId}</TableCell>
                  <TableCell sx={{ color: "#333", whiteSpace: "nowrap" }}>
                    {row.taskTitle}
                  </TableCell>
                  <TableCell sx={{ color: "#333", whiteSpace: "nowrap" }}>
                    {row.dueDate}
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    <PriorityChip priority={row.priority} />
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    <TaskStatusChip status={row.taskStatus} />
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    <NameChip name={row.createdBy} />
                  </TableCell>
                  <TableCell sx={{ color: "#333", whiteSpace: "nowrap" }}>
                    {row.createdAt}
                  </TableCell>
                  <TableCell sx={{ color: "#333", whiteSpace: "nowrap" }}>
                    <NameChip name={row.assignedBy} />
                  </TableCell>
                  <TableCell sx={{ color: "#333", whiteSpace: "nowrap" }}>
                    <NameChip name={row.assignedTo} />
                  </TableCell>
                  <TableCell sx={{ color: "#333", whiteSpace: "nowrap" }}>
                    {row.assignedAt}
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    <Button
                      onClick={() => handleAssignTaskClick(row)}
                      variant="outlined"
                      color="primary"
                      disabled={row.taskStatus !== "1"}
                      startIcon={<AssignmentIndIcon />}
                    >
                      Assign
                    </Button>
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    <Button
                      onClick={() => {
                        if (row.taskStatus === "1" || row.taskStatus === "2") {
                          handleMoveTaskClick(row);
                        }
                      }}
                      variant="outlined"
                      color="primary"
                      sx={{ whiteSpace: "nowrap" }}
                      disabled={
                        row.taskStatus !== "1" && row.taskStatus !== "2"
                      }
                      startIcon={<NextPlanIcon />}
                    >
                      {row.taskStatus === "1" && "Move to In-Progress"}
                      {row.taskStatus === "2" && "Move to Done"}
                      {row.taskStatus !== "1" && row.taskStatus !== "2" && "NA"}
                    </Button>
                  </TableCell>

                  <TableCell>
                    {row.taskStatus !== "3" ? (
                      <ActionMenu
                        onEdit={() => handleEditClick(row, "update")}
                        onDelete={() => handleDeleteClick(row, "delete")}
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
      <Dialog
        open={openAssignDialog}
        onClose={() => setOpenAssignDialog(false)}
      >
        <DialogTitle>Assign Task</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>User</InputLabel>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              {users.map((user) => (
                <MenuItem key={user.userId} value={user.userId}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssignDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAssignSubmit} color="primary">
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteSubmit} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date().toISOString().split("T")[0],
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="1">Low</MenuItem>
              <MenuItem value="2">Medium</MenuItem>
              <MenuItem value="3">High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllInOneTable;
