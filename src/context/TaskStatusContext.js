import React from "react";
import { Chip } from "@mui/material";

const TaskStatusChip = ({ status }) => {
  const getChipStyles = (status) => {
    switch (status) {
      case "4": 
        return {
          label: "Removed",
          style: {
            color: "rgb(5, 38, 104)", // Green text
            border: "1px solid rgb(52, 79, 135)", // Green border
            backgroundColor: "#e5e5e5", // Light green background
          },
        };
      case "3": // Done
        return {
          label: "Done",
          style: {
            color: "#4CAF50", // Green text
            border: "1px solid #4CAF50", // Green border
            backgroundColor: "#E8F5E9", // Light green background
          },
        };
      case "2": // In Progress
        return {
          label: "In Progress",
          style: {
            color: "#FF9800", // Orange text
            border: "1px solid #FF9800", // Orange border
            backgroundColor: "#FFF3E0", // Light orange background
          },
        };
      case "1": // To Do
        return {
          label: "To Do",
          style: {
            color: "#607D8B", // Grey-blue text
            border: "1px solid #607D8B", // Grey-blue border
            backgroundColor: "#ECEFF1", // Light grey-blue background
          },
        };
      default: // Unknown or other statuses
        return {
          label: "Unknown",
          style: {
            color: "#F44336", // Red text
            border: "1px solid #F44336", // Red border
            backgroundColor: "#FFEBEE", // Light red background
          },
        };
    }
  };

  const { label, style } = getChipStyles(status);

  return <Chip label={label} sx={{ ...style, fontWeight: "bold" }} />;
};

export default TaskStatusChip;
