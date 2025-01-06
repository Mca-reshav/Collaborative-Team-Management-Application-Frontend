import React from "react";
import { Avatar, Tooltip } from "@mui/material";

const colors = [
  "#f44336",
  "#2196f3",
  "#4caf50",
  "#ff9800",
  "#9c27b0",
  "#3f51b5",
  "#00bcd4",
  "#673ab7",
  "#e91e63",
  "#cddc39",
];

const NameAvatar = ({ name }) => {
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    return parts.length > 1
      ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
      : parts[0][0].toUpperCase();
  };

  const getColor = (name) => {
    const charSum = name
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  const initials = getInitials(name);
  const backgroundColor = getColor(name);

  return (
    <Tooltip title={name} arrow sx={{backgroundColor: '#252525'}}>
    <Avatar
      sx={{
        backgroundColor,
        color: "#fff",
        fontWeight: "bold",
        fontSize: "24px",
        width: "40px",
        height: "40px",
        marginTop: "-10px",
        border: '1px solid #ff5e00',
        fontFamily: 'Poppins'
      }}
    >
      {initials}
    </Avatar>
    </Tooltip>
  );
};

export default NameAvatar;
