import React from "react";
import { useDraggable } from "@dnd-kit/core";

export const Draggable = ({ id, parent, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { droppableId: parent },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    padding: "8px",
    margin: "4px 0",
    border: "1px solid lightgray",
    backgroundColor: "white",
    borderRadius: "4px",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};
