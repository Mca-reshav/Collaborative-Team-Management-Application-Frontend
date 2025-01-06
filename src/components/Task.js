import React, { useState, useEffect } from "react"; 
import Navbar from "./Navbar";
import PaginatedTable from "./table/TaskTable";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { toast } from "react-toastify";
import { addTask, getActiveProjects } from "../services/TaskService";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import TaskIcon from '@mui/icons-material/Task';
import { useNavigate } from "react-router-dom";

const Task = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    projectId: "",
    taskTitle: "",
    taskDesc: "",
    dueDate: "",
    priority: "",
  });
  const [projects, setProjects] = useState([]); 
  const [reloadTable, setReloadTable] = useState(false); 
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await addTask(formData);
      if (response.success) {
        toast.success("Task added successfully!");
        setFormData({
          projectId: "",
          taskTitle: "",
          taskDesc: "",
          dueDate: "",
          priority: "",
        });
        setReloadTable((prev) => !prev);
        handleCloseDialog();
      } else {
        toast.error(response?.message);
        throw new Error("Error on adding new task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getActiveProjects();
        if (response.success) {
          setProjects(response.data);
        } else {
          toast.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        localStorage.clear();
        navigate('/login')
        toast.error("Error fetching projects");
      }
    };
    fetchProjects();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <h3><TaskIcon /> Task Management</h3>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: 'end',
          marginRight: '6rem',
          marginBottom: '-3.2rem'
        }}
      >
        <Button
          sx={{ backgroundColor: "#ff5e00", color: "#fff", marginLeft: "1rem" }}
          onClick={handleOpenDialog}
        >
          <AddTwoToneIcon />
        </Button>
      </Box>
      <PaginatedTable reload={reloadTable} />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ color: "#555", fontFamily: "Poppins" }}>
          Add New Task
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Project</InputLabel>
            <Select
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              fullWidth
            >
              {projects.map((project) => (
                <MenuItem key={project.projectId} value={project.projectId}>
                  {project.projectTitle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Task Title"
            name="taskTitle"
            value={formData.taskTitle}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Task Description"
            name="taskDesc"
            value={formData.taskDesc}
            onChange={handleChange}
            fullWidth
            margin="dense"
            multiline
            rows={3}
          />
          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: today,
            }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Priority</InputLabel>
            <Select
              label="Priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <MenuItem value="1">Low</MenuItem>
              <MenuItem value="2">Medium</MenuItem>
              <MenuItem value="3">High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#ff5e00" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{ backgroundColor: "#ff5e00", color: "#fff" }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Task;
