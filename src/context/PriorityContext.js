import React from "react";
import { Chip } from "@mui/material";

const PriorityChip = ({ priority }) => {
  const getChipStyles = (priority) => {
    switch (priority) {
      case "1":
        return {
          label: "Low",
          style: {
            color: "rgb(33, 150, 243)", // Text color
            border: "1px solid rgb(33, 150, 243)", // Border color
            backgroundColor: "rgb(227, 242, 253)", // Light blue background
          },
        };
      case "2":
        return {
          label: "Medium",
          style: {
            color: "rgb(233, 30, 99)", // Text color
            border: "1px solid rgb(233, 30, 99)", // Border color
            backgroundColor: "rgb(247, 238, 241)", // Light pink background
          },
        };
      case "3":
        return {
          label: "High",
          style: {
            color: "rgb(156, 39, 176)", // Text color
            border: "1px solid rgb(156, 39, 176)", // Border color
            backgroundColor: "rgb(243, 229, 245)", // Light purple background
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

  const { label, style } = getChipStyles(priority);

  return <Chip label={label} sx={style} />;
};

export default PriorityChip;
