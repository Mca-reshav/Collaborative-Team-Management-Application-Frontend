import React, { createContext, useContext, useState, useEffect } from "react";
import { getKanbanData } from "../services/TaskService";

const DragDropContext = createContext();

export const DragDropProvider = ({ children }) => {
  const [data, setData] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  useEffect(() => {
    const fetchKanbanData = async () => {
      try {
        const response = await getKanbanData();
        const kanbanData = response.data;

        setData({
          todo: kanbanData.todo ? [kanbanData.todo] : [],
          inProgress: kanbanData.inProgress ? [kanbanData.inProgress] : [],
          done: kanbanData.done ? [kanbanData.done] : [],
        });
      } catch (error) {
        console.error("Failed to fetch Kanban data:", error);
      }
    };

    fetchKanbanData();
  }, []);

  const moveTask = (taskId, fromColumn, toColumn) => {
    const sourceTasks = [...data[fromColumn]];
    const targetTasks = [...data[toColumn]];

    const taskIndex = sourceTasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return;

    const [movedTask] = sourceTasks.splice(taskIndex, 1);
    targetTasks.push(movedTask);

    setData({
      ...data,
      [fromColumn]: sourceTasks,
      [toColumn]: targetTasks,
    });
  };

  return (
    <DragDropContext.Provider value={{ data, moveTask }}>
      {children}
    </DragDropContext.Provider>
  );
};

export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error("useDragDrop must be used within a DragDropProvider");
  }
  return context;
};
