import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TaskIcon from "@mui/icons-material/Task";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { getListSpecificData } from "../services/TaskService";
import TaskStatusChip from "../context/TaskStatusContext";
import PriorityChip from "../context/PriorityContext";
import "../components/styles/taskSpecific.css";

const TaskSpecific = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const leftSectionDetails = [
    { label: "Description", value: task?.taskDescription },
    { label: "Due Date", value: task?.dueDate },
    { label: "Assigned To", value: task?.assignedTo },
    { label: "Assigned By", value: task?.assignedBy },
    { label: "Created By", value: task?.createdBy },
  ];

  const rightSectionDetails = [
    {
      label: "Task Status",
      value: <TaskStatusChip status={task?.taskStatus} />,
    },
    { label: "Priority", value: <PriorityChip priority={task?.priority} /> },
    { label: "Created At", value: task?.createdAt },
    { label: "Updated At", value: new Date(task?.updatedAt).toLocaleString() },
    { label: "Deleted At", value: task?.deletedAt },
    { label: "Completed By", value: task?.completedBy },
  ];

  const fetchTaskDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getListSpecificData(taskId);
      if (response?.data.length > 0) {
        setTask(response.data[0]);
      } else {
        setTask(null);
        navigate("/task");
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
      setTask(null);
    } finally {
      setLoading(false);
    }
  }, [taskId, navigate]);

  useEffect(() => {
    fetchTaskDetails();
  }, [fetchTaskDetails]);

  const handleBackClick = () => {
    navigate("/task");
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
        ) : task ? (
          <>
            <Paper elevation={2} className="paper">
              <Typography variant="h5" className="title">
                <TaskIcon className="title-icon" />
                {task.taskTitle}
              </Typography>
              <Box className="main-box">
                <Box className="section-box">
                  {leftSectionDetails.map((item, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                      className="task-text"
                    >
                      <strong>{item.label}:</strong> {item.value}
                    </Typography>
                  ))}
                </Box>

                <Box className="section-box">
                  {rightSectionDetails.map((item, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                      className="typography"
                    >
                      <strong>{item.label}:</strong> {item.value}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Paper>
          </>
        ) : (
          <Typography>No Task Found</Typography>
        )}
      </Box>
    </>
  );
};

export default TaskSpecific;
