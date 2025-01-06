import React from "react";
import { Chip } from "@mui/material";

const DesignationBadge = ({ designation }) => {
  const getChipStyles = (designation) => {
    switch (designation) {
      case "1":
        return {
          label: "Chief",
          style: {
            color: "rgb(76, 175, 80)", // Green text
            border: "1px solid rgb(76, 175, 80)", // Green border
            backgroundColor: "rgb(232, 245, 233)", // Light green background
          },
        };
      case "2":
        return {
          label: "Manager",
          style: {
            color: "rgb(255, 152, 0)", // Orange text
            border: "1px solid rgb(255, 152, 0)", // Orange border
            backgroundColor: "rgb(255, 243, 224)", // Light orange background
          },
        };
      case "3":
        return {
          label: "Employee",
          style: {
            color: "rgb(33, 150, 243)", // Blue text
            border: "1px solid rgb(33, 150, 243)", // Blue border
            backgroundColor: "rgb(227, 242, 253)", // Light blue background
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

  const { label, style } = getChipStyles(designation);

  return <Chip label={label} sx={style} />;
};

export default DesignationBadge;
