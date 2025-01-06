import React from "react";
import { Chip } from "@mui/material";

const IsAssignedChip = ({ isAssigned }) => {
  const getChipStyles = (isAssigned) => {
    if (isAssigned === '1') {
      return {
        label: "Assigned",
        style: {
          color: "rgb(33, 150, 243)", // Blue text
          border: "1px solid rgb(33, 150, 243)", // Blue border
          backgroundColor: "rgb(227, 242, 253)", // Light blue background
        },
      };
    }
    return {
      label: "Unassigned",
      style: {
        color: "rgb(244, 67, 54)", // Red text
        border: "1px solid rgb(244, 67, 54)", // Red border
        backgroundColor: "rgb(255, 235, 238)", // Light red background
      },
    };
  };

  const { label, style } = getChipStyles(isAssigned);

  return <Chip label={label} sx={style} />;
};

export default IsAssignedChip;
