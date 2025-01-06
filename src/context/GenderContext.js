import React from "react";
import { Chip } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import Face4Icon from '@mui/icons-material/Face4';
import Face2Icon from '@mui/icons-material/Face2';

const GenderBadge = ({ gender }) => {
  const getChipStyles = (gender) => {
    switch (gender) {
      case "1":
        return {
          label: "Male",
          style: {
            color: "rgb(33, 150, 243)", // Text color
            border: "1px solid rgb(33, 150, 243)", // Border color
            backgroundColor: "rgb(227, 242, 253)", // Light blue background
          },
          icon: <FaceIcon sx={{ color: "rgb(33, 150, 243)" }} />
        };
      case "2":
        return {
          label: "Female",
          style: {
            color: "rgb(233, 30, 99)", // Text color
            border: "1px solid rgb(233, 30, 99)", // Border color
            backgroundColor: "rgb(247, 238, 241)", // Light pink background
          },
          icon: <Face4Icon sx={{ color: "rgb(233, 30, 99)" }} />
        };
      case "3":
        return {
          label: "Other",
          style: {
            color: "rgb(156, 39, 176)", // Text color
            border: "1px solid rgb(156, 39, 176)", // Border color
            backgroundColor: "rgb(243, 229, 245)", // Light purple background
          },
          icon: <Face2Icon sx={{ color: "rgb(156, 39, 176)" }} />
        };
      default:
        return {
          label: "Unknown",
          style: {
            color: "rgb(96, 125, 139)", // Text color
            border: "1px solid rgb(96, 125, 139)", // Border color
            backgroundColor: "rgb(236, 239, 241)", // Light grey background
          },
          icon: <FaceIcon sx={{ color: "rgb(96, 125, 139)" }} />
        };
    }
  };

  const { label, style, icon } = getChipStyles(gender);

  return <Chip label={label} sx={style} icon={icon} />;
};

export default GenderBadge;
