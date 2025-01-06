import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import {addTask} from '../../services/TaskService';

const AddTaskModal = ({ open, handleClose, handleSave }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const onSave = async () => {
    try {
      const taskData = { taskTitle, taskDescription, dueDate };
      
      const result = await addTask(taskData);
      console.log("Task added successfully:", result);

      handleSave(taskData);
      setTaskTitle("");
      setTaskDescription("");
      setDueDate("");
      handleClose(); 
    } catch (error) {
      console.error("Failed to save the task:", error);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task Title"
          fullWidth
          variant="outlined"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Task Description"
          fullWidth
          variant="outlined"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Due Date"
          type="date"
          fullWidth
          variant="outlined"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={onSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
