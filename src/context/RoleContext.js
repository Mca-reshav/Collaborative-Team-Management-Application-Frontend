import React from "react";
import { Chip } from "@mui/material";

const RoleChip = ({ role }) => {
  const getChipStyles = (role) => {
    switch (role) {
      case "1":
        return {
          label: "Admin",
          style: {
            color: "rgb(244, 67, 54)", // Red text
            border: "3px solid rgb(244, 67, 54)", // Red border
            backgroundColor: "rgb(255, 235, 238)", // Light red background
          },
        };
      case "2":
        return {
          label: "Project Manager",
          style: {
            color: "rgb(33, 150, 243)", // Blue text
            border: "2px solid rgb(33, 150, 243)", // Blue border
            backgroundColor: "rgb(227, 242, 253)", // Light blue background
          },
        };
        case "3":
        return {
          label: "Team Member",
          style: {
            color: "rgb(33, 243, 82)", // Green text
            border: "1px solid rgb(33, 243, 33)", // Green border
            backgroundColor: "rgb(227, 253, 241)", // Light Green background
          },
        };
      default:
        return {
          label: "Unknown",
          style: {
            color: "rgb(96, 125, 139)", // Grey text
            border: "1px solid rgb(96, 125, 139)", // Grey border
            backgroundColor: "rgb(236, 239, 241)", // Light grey background
          },
        };
    }
  };

  const { label, style } = getChipStyles(role);

  return <Chip label={label} sx={style} />;
};

export default RoleChip;
