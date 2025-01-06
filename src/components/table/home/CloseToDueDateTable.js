import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { commonCellStyles } from "../../../constants/Common.const";
import PriorityChip from "../../../context/PriorityContext";

const columns = ["Task ID", "Title", "Due Date", "Priority", "Assigned At"];

const CloseToDueDateTable = ({ tasks }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: "20px", marginBottom: '3rem', width: "99% !important", marginInline: "0.5rem !important" }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column} sx={commonCellStyles}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.taskId}>
              <TableCell>{task.taskId}</TableCell>
              <TableCell>{task.taskTitle}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell><PriorityChip priority={task.priority}/></TableCell>
              <TableCell>{task.assignedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CloseToDueDateTable;
