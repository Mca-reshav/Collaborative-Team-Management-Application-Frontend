import React from "react";
import Navbar from "./Navbar";
import PaginatedTable from "./table/ActivityTable";
import NotesIcon from '@mui/icons-material/Notes';

const Activity = () => {
  return (
    <div>
      <Navbar></Navbar>
      <h3><NotesIcon/>Activity Management</h3>
      <PaginatedTable></PaginatedTable>
    </div>
  );
};

export default Activity;
