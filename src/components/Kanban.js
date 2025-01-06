import React from "react";
import KanbanContent from "./content/kanbanContent";
import { DragDropProvider } from "../context/DragDropContext";

const Kanban = () => (
  <DragDropProvider>
    <KanbanContent />
  </DragDropProvider>
);

export default Kanban;
