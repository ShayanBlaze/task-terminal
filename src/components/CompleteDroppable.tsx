import { useDroppable } from "@dnd-kit/core";
import TodoItem from "./TodoItem";
import { useContext } from "react";
import { TodoContext } from "../state/TodoContext";

const CompleteDroppable = () => {
  const { AppState } = useContext(TodoContext);
  const { setNodeRef, isOver } = useDroppable({ id: "completed" });

  return (
    <div
      ref={setNodeRef}
      className={`droppable-container ${isOver ? "is-over" : ""}`}
    >
      {AppState.completed.map((todo, index) => (
        <TodoItem key={todo.id} todo={todo} index={index} />
      ))}
    </div>
  );
};

export default CompleteDroppable;
