import React from "react";
import { Chip } from "@mui/material";

const EntityTypeChip = ({ entityType }) => {
  const getChipStyles = (entityType) => {
    switch (entityType) {
      case "1":
        return {
          label: "Project",
          style: {
            color: "rgb(25, 118, 210)", // Text color
            border: "1px solid rgb(25, 118, 210)", // Border color
            backgroundColor: "rgb(227, 242, 253)", // Light blue background
          },
        };
      case "2":
        return {
          label: "Task",
          style: {
            color: "rgb(56, 142, 60)", // Text color
            border: "1px solid rgb(56, 142, 60)", // Border color
            backgroundColor: "rgb(232, 245, 233)", // Light green background
          },
        };
      case "3":
        return {
          label: "Other",
          style: {
            color: "rgb(121, 85, 72)", // Text color
            border: "1px solid rgb(121, 85, 72)", // Border color
            backgroundColor: "rgb(239, 235, 233)", // Light brown background
          },
        };
      case "4":
        return {
          label: "User",
          style: {
            color: "rgb(233, 30, 99)", // Text color
            border: "1px solid rgb(233, 30, 99)", // Border color
            backgroundColor: "rgb(247, 238, 241)", // Light pink background
          },
        };
      default:
        return {
          label: "Unknown",
          style: {
            color: "rgb(96, 125, 139)", // Text color
            border: "1px solid rgb(96, 125, 139)", // Border color
            backgroundColor: "rgb(236, 239, 241)", // Light grey background
          },
        };
    }
  };

  const { label, style } = getChipStyles(entityType);

  return <Chip label={label} sx={style} />;
};

export default EntityTypeChip;
