import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/UserService";
import GenderBadge from "../context/GenderContext";
import RoleChip from "../context/RoleContext";
import DesignationBadge from "../context/DesignationContext";
import StatusChip from "../context/StatusContext";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const UserProfile = () => {
  const { empId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const commonStyle = {
    fontFamily: "Poppins"
  }
  const acBoxIc = {
    height: '2rem',
    width: '2rem',
    marginBottom: '-5px',
    marginLeft: '-5px'
  }
  const fetchUserDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getUserDetails(empId);
      if (response?.data?.userData?.length > 0) {
        setUser(response.data.userData[0]);
        setTasks(response.data.TaskData || []);
        setFilteredTasks(response.data.TaskData || []);
      } else {
        setUser(null);
        navigate("/members");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [empId, navigate]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const handleBackClick = () => {
    navigate("/members");
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    setFilteredTasks(
      tasks.filter((task) => task.taskTitle.toLowerCase().includes(query))
    );
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ padding: "1rem" }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
          sx={{
            backgroundColor: "#ff5e00",
            color: "#fff",
            marginBottom: "1rem",
            "&:hover": { backgroundColor: "#e65400" },
          }}
        >
          Back
        </Button>
        {loading ? (
          <CircularProgress />
        ) : user ? (
          <>
            <Paper elevation={2} sx={{ padding: "2rem", marginBottom: "2rem",     border: '1px solid #ff5e00' }}>
              <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ width: "50%", paddingRight: "1rem" }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                  >
                    <AccountBoxIcon sx={acBoxIc}/> {user.name}
                  </Typography>
                  <br></br>
                  <Typography variant="body1" sx={ commonStyle }>
                    <strong>Email:</strong> {user.emailId}
                  </Typography>
                  <Typography variant="body1" sx={ commonStyle }>
                    <strong>Contact:</strong> {user.contactNo}
                  </Typography>
                  <Typography variant="body1" sx={ commonStyle }>
                    <strong>Date of Birth:</strong> {user.dateOfBirth}
                  </Typography>
                  <Typography variant="body1" sx={ commonStyle }>
                    <strong>Created At:</strong> {user.createdAt}
                  </Typography>
                </Box>
                
                <Box sx={{ width: "50%", display: "flex", justifyContent:"space-evenly" }}>
                  <Typography variant="body1" sx={ commonStyle }>
                    <strong>
                      Role <br/><RoleChip role={user.role} />
                    </strong>
                  </Typography>
                  <Typography variant="body1" sx={ commonStyle }>
                    <strong>
                      Status <br/><StatusChip status={user.status} />
                    </strong>
                  </Typography>
                  <Typography variant="body1" sx={ commonStyle }>
                    <strong>
                      Gender <br/><GenderBadge gender={user.gender} />
                    </strong>
                  </Typography>
                  <Typography variant="body1" sx={ commonStyle }>
                    <strong>
                      Designation
                      <br/><DesignationBadge designation={user.designation} />
                    </strong>
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "1rem",
              }}
            >
              <TextField
                label="Search Tasks"
                variant="outlined"
                size="small"
                value={search}
                onChange={handleSearch}
                sx={{ width: "20%" }}
              />
            </Box>
            <TableContainer component={Paper} sx={{ marginBottom: "2rem" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#ff5e00" }}>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      ID
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Task ID
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Title
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Assigned At
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Completed At
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTasks
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((task, key) => (
                      <TableRow key={task._id}>
                        <TableCell>{key + 1}</TableCell>
                        <TableCell>{task.taskId}</TableCell>
                        <TableCell>{task.taskTitle}</TableCell>
                        <TableCell>{task.taskStatus}</TableCell>
                        <TableCell>{task.assignedAt}</TableCell>
                        <TableCell>{task.completedAt || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={filteredTasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </>
        ) : (
          <Typography>No User Found</Typography>
        )}
      </Box>
    </>
  );
};

export default UserProfile;
