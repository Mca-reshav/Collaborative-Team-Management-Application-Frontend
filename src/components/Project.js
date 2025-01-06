import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import PaginatedTable from "./table/ProjectTable";
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
import { addProject } from "../services/ProjectService";
import { getActiveMembers } from "../services/ProjectService"; 
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    members: [], 
  });
  const [reloadTable, setReloadTable] = useState(false); 
  const [members, setMembers] = useState([]); 
  const [loadingMembers, setLoadingMembers] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getActiveMembers();
        if (response.success) {
          setMembers(response.data); 
        } else {
          console.error("Failed to fetch members.")
        }
      } catch (error) {
        console.error("Error fetching active members:", error);
        toast.error("An error occurred while fetching members.");
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchMembers();
  }, []);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMembersChange = (event) => {
    setFormData((prev) => ({ ...prev, members: event.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await addProject(formData);
      if (response.success) {
        toast.success("Project added successfully!");
        setFormData({
          projectTitle: "",
          projectDescription: "",
          members: [],
        });
        setReloadTable((prev) => !prev);
        handleCloseDialog();
      } else {
        localStorage.clear();
        toast.error(response?.message);
        throw new Error("Error on adding new project");
      }
    } catch (error) {
      localStorage.clear();
      navigate('/login');
      console.error("Error adding project:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h3>
        <AccountTreeIcon />
        Project Management
      </h3>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          marginRight: "6rem",
          marginBottom: "-3.2rem",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#ff5e00",
            color: "#fff",
            marginLeft: "1rem",
            height: "2.5rem",
            marginBottom: "-5px",
          }}
          onClick={handleOpenDialog}
        >
          <AddTwoToneIcon />
        </Button>
      </Box>
      <PaginatedTable reload={reloadTable} />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ color: "#555", fontFamily: "Poppins" }}>
          Add New Project
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Project Title"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Project Description"
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            fullWidth
            margin="dense"
            multiline
            rows={3}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Active Team Members</InputLabel>
            <Select
              label="Members"
              name="members"
              value={formData.members}
              onChange={handleMembersChange}
              multiple
              disabled={loadingMembers} 
            >
              {members.map((member) => (
                <MenuItem key={member.userId} value={member.userId}>
                  {member.name} 
                </MenuItem>
              ))}
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

export default Project;
