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
  TableRow,
  TableHead,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { getListSpecificData } from "../services/ProjectService";
import ProjectStatusChip from "../context/ProjectStatusContext";
import PriorityChip from "../context/PriorityContext";
import TaskIcon from "@mui/icons-material/Task";
import "../components/styles/projectSpecific.css";
import { commonCellStyles } from "../constants/Common.const";

const ProjectSpecific = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTaskDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getListSpecificData(projectId);
      if (response?.data) {
        setProject(response.data);
      } else {
        setProject(null);
        navigate("/task");
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
      setProject(null);
    } finally {
      setLoading(false);
    }
  }, [projectId, navigate]);

  useEffect(() => {
    fetchTaskDetails();
  }, [fetchTaskDetails]);
  const projectDetails = project?.projectDetails[0];
  const taskDetails = project?.taskDetails;

  const handleBackClick = () => {
    navigate("/project");
  };

  return (
    <>
      <Navbar />
      <Box sx={{ padding: "1rem" }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
          className="back-btn"
          sx={{ marginBottom: "1rem", backgroundColor: "#ff5e00" }}
        >
          Back
        </Button>
        {loading ? (
          <CircularProgress />
        ) : projectDetails ? (
          <>
            <Paper elevation={2} className="paper">
              <Typography variant="h5" className="title">
                <TaskIcon className="title-icon" />
                {projectDetails.projectTitle}
              </Typography>
              <Box className="details-box">
                <Box className="section-box">
                  <Typography variant="body1" className="detail-text">
                    <strong>Description:</strong>{" "}
                    {projectDetails.projectDescription}
                  </Typography>
                  <Typography variant="body1" className="detail-text">
                    <strong>Project Status:</strong>{" "}
                    <ProjectStatusChip status={projectDetails.projectStatus} />
                  </Typography>
                  <Typography variant="body1" className="detail-text">
                    <strong>Created By:</strong> {projectDetails.createdBy}
                  </Typography>
                  <Typography variant="body1" className="detail-text">
                    <strong>Created At:</strong> {projectDetails.createdAt}
                  </Typography>
                  <Typography variant="body1" className="detail-text">
                    <strong>Deleted At:</strong> {projectDetails.deletedAt}
                  </Typography>
                  <Typography variant="body1" className="detail-text">
                    <strong>Deleted By:</strong> {projectDetails.deletedBy}
                  </Typography>
                  {projectDetails.teamMembers &&
                    projectDetails.teamMembers.length > 0 && (
                      <Typography variant="body1" className="detail-text">
                        <strong>Team Members:</strong>
                        <ul>
                          {projectDetails.teamMembers.map((member, index) => (
                            <li key={index}>{member}</li>
                          ))}
                        </ul>
                      </Typography>
                    )}
                </Box>
              </Box>
              {taskDetails?.length > 0 ? (
                <>
                  <Typography
                    variant="h6"
                    className="table-title"
                    sx={{ marginTop: "2rem" }}
                  >
                    <AssignmentIcon sx={{ marginBottom: "-5px" }} /> Task
                    Details
                  </Typography>
                  <TableContainer className="table-container">
                    <Table>
                      <TableHead>
                        <TableRow>
                          {[
                            "ID",
                            "Task ID",
                            "Task Title",
                            "Due Date",
                            "Priority",
                            "Created By",
                          ].map((header, index) => (
                            <TableCell
                              key={index}
                              sx={{
                                ...commonCellStyles,
                                whiteSpace:
                                  header === "Task ID" ||
                                  header === "Created By"
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
                        {taskDetails.map((task, index) => (
                          <TableRow key={task._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{task.taskId}</TableCell>
                            <TableCell>{task.taskTitle}</TableCell>
                            <TableCell>{task.dueDate}</TableCell>
                            <TableCell>
                              <PriorityChip priority={task.priority} />
                            </TableCell>
                            <TableCell>{task.createdBy}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              ) : (
                <Typography
                  variant="h6"
                  sx={{ marginTop: "2rem", color: "gray" }}
                >
                  No task found
                </Typography>
              )}
            </Paper>
          </>
        ) : (
          <Typography>No Data Found</Typography>
        )}
      </Box>
    </>
  );
};

export default ProjectSpecific;
