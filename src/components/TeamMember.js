import React from "react";
import Navbar from "./Navbar";
import PaginatedTable from "./table/UserTable";
import GroupsIcon from '@mui/icons-material/Groups';

const TeamMember = () => {
  return (
    <div>
      <Navbar></Navbar>
      <h3><GroupsIcon sx={{marginBottom: '-5px'}}/> Team Member Management</h3>
      <PaginatedTable></PaginatedTable>
    </div>
  );
};

export default TeamMember;
