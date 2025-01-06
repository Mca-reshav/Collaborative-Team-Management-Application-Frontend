import React from "react";
import { useDragDrop } from "../../context/DragDropContext";
import { Draggable } from "../kanban/Draggable";
import { Droppable } from "../kanban/Droppable";
import Navbar from "../Navbar";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import { DndContext } from "@dnd-kit/core";

const KanbanContent = () => {
  const { data, moveTask } = useDragDrop();

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const fromColumn = active.data.current.droppableId;
    const toColumn = over.id;

    if (fromColumn !== toColumn) {
      moveTask(active.id, fromColumn, toColumn);
    }
  };

  return (

    <DndContext onDragEnd={handleDragEnd}>
    <Navbar />
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h3 style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <ViewKanbanIcon style={{ fontSize: "28px" }} /> Kanban
      </h3>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {Object.entries(data).map(([column, tasks]) => (
          <Droppable
            key={column}
            id={column}
            style={{
              width: "300px",
              backgroundColor: "#f4f5f7",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                fontSize: "16px",
                marginBottom: "12px",
                color: "#333",
                borderBottom: "2px solid #e0e0e0",
                paddingBottom: "8px",
              }}
            >
              {column}
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              {tasks.map((task) => (
                <Draggable
                  key={task.id}
                  id={task.id}
                  parent={column}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "10px",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                    cursor: "grab",
                  }}
                >
                  {task.title || "Untitled"}
                </Draggable>
              ))}
            </div>
          </Droppable>
        ))}
      </div>
    </div>
  </DndContext>
  
  );
};

export default KanbanContent;

