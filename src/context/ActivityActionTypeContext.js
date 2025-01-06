import React from "react";
import { Chip } from "@mui/material";

const ActionTypeChip = ({ actionType }) => {
  const getChipStyles = (actionType) => {
    switch (actionType) {
      case "1":
        return {
          label: "Assign",
          style: {
            color: "rgb(25, 118, 210)", // Text color
            border: "1px solid rgb(25, 118, 210)", // Border color
            backgroundColor: "rgb(227, 242, 253)", // Light blue background
          },
        };
      case "2":
        return {
          label: "Create",
          style: {
            color: "rgb(56, 142, 60)", // Text color
            border: "1px solid rgb(56, 142, 60)", // Border color
            backgroundColor: "rgb(232, 245, 233)", // Light green background
          },
        };
      case "3":
        return {
          label: "Delete",
          style: {
            color: "rgb(211, 47, 47)", // Text color
            border: "1px solid rgb(211, 47, 47)", // Border color
            backgroundColor: "rgb(253, 236, 234)", // Light red background
          },
        };
      case "4":
        return {
          label: "Update",
          style: {
            color: "rgb(251, 140, 0)", // Text color
            border: "1px solid rgb(251, 140, 0)", // Border color
            backgroundColor: "rgb(255, 243, 224)", // Light orange background
          },
        };
      case "5":
        return {
          label: "Other",
          style: {
            color: "rgb(121, 85, 72)", // Text color
            border: "1px solid rgb(121, 85, 72)", // Border color
            backgroundColor: "rgb(239, 235, 233)", // Light brown background
          },
        };
      case "6":
        return {
          label: "Moved",
          style: {
            color: "rgb(103, 58, 183)", // Text color
            border: "1px solid rgb(103, 58, 183)", // Border color
            backgroundColor: "rgb(237, 231, 246)", // Light purple background
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

  const { label, style } = getChipStyles(actionType);

  return <Chip label={label} sx={style} />;
};

export default ActionTypeChip;
