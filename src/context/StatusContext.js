import React from "react";
import { Chip } from "@mui/material";

const StatusChip = ({ status }) => {
  const getChipStyles = (status) => {
    switch (status) {
      case "1":
        return {
          label: "Active",
          style: {
            color: "rgb(76, 175, 80)", // Green text
            border: "1px solid rgb(76, 175, 80)", // Green border
            backgroundColor: "rgb(232, 245, 233)", // Light green background
          },
        };
      case "0":
        return {
          label: "Inactive",
          style: {
            color: "rgb(158, 158, 158)", // Grey text
            border: "1px solid rgb(158, 158, 158)", // Grey border
            backgroundColor: "rgb(238, 238, 238)", // Light grey background
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

  const { label, style } = getChipStyles(status);

  return <Chip label={label} sx={style} />;
};

export default StatusChip;
