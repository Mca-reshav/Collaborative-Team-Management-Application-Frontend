import React from "react";
import { Chip } from "@mui/material";

const CurrentStatusChip = ({ status }) => {
  const getChipStyles = (status) => {
    return {
        label: "Completed",
        style: {
          color: "rgb(56, 122, 58)", // Green text
          border: "1px solid rgb(76, 175, 80)", // Green border
          backgroundColor: "rgb(232, 245, 233)", // Light green background
        },
      };
  };

  const { label, style } = getChipStyles(status);

  return <Chip label={label} sx={style} />;
};

export default CurrentStatusChip;
