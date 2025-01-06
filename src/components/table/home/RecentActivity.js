import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "../../styles/home.css";
import ProjectStatus from "../../../context/ProjectStatusContext";
import TaskStatusChip from "../../../context/TaskStatusContext";
import StatusChip from "../../../context/StatusContext";
import ActivityEntityChip from "../../../context/ActivityEntityTypeContext";


const RecentActivityCard = ({ data }) => {
  return (
    <Card className="activity-card">
      <CardContent>
        <Typography variant="h6" component="div" className="card-title">
          {data.taskTitle || data.projectTitle || data.name || data.currentStatus}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className="card-subtitle"
        >
          {data.taskId || data.projectId || data.empId || data.entityId}
        </Typography>
        {(data.projectStatus ||
          data.taskStatus ||
          data.status ||
          data.currentStatus) && (
          <Typography
            variant="body2"
            color="textSecondary"
            className="card-status"
          >
            {data.projectStatus ? (
              <ProjectStatus status={data.projectStatus} />
            ) : data.taskStatus ? (
              <TaskStatusChip status={data.taskStatus} />
            ) : data.status ? (
              <StatusChip status={data.status} />
            ) : (
              <ActivityEntityChip entityType={data.entityType} />
            )}
          </Typography>
        )}

        <Typography variant="body2" color="textSecondary" className="card-date">
          Created At: {new Date(data.createdAt).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
