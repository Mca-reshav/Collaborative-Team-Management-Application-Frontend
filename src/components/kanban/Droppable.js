import React from "react";
import { useDroppable } from "@dnd-kit/core";

export const Droppable = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });

  const style = {
    padding: "10px",
    border: "1px solid gray",
    borderRadius: "4px",
    minHeight: "150px",
    backgroundColor: "#f9f9f9",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
