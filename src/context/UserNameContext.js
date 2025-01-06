import React from "react";
import { Chip, Avatar } from "@mui/material";

const NameChip = ({ name }) => {
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "");

  const initial = getInitial(name);
  const colors = [
    "#f44336", "#2196f3", "#4caf50", "#ff9800", "#9c27b0", 
    "#3f51b5", "#00bcd4", "#673ab7", "#e91e63", "#cddc39"
  ];
  const colorIndex = initial.charCodeAt(0) % colors.length;

  const badgeStyle = {
    backgroundColor: colors[colorIndex],
    color: "#fff",
    width: "28px",
    height: "28px",
    fontSize: "14px",
    fontWeight: "bold",
  };

  return (
    <Chip
      avatar={<Avatar sx={badgeStyle}>{initial}</Avatar>}
      label={name}
      sx={{
        margin: 0.5,
        fontFamily: "Poppins",
        fontSize: "14px",
        backgroundColor: "#f5f5f5",
        border: '1px solid #d5d5d5'
      }}
    />
  );
};

export default NameChip;
