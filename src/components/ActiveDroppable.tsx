import { useDroppable } from "@dnd-kit/core";
import TodoItem from "./TodoItem";
import { useContext } from "react";
import { TodoContext } from "../state/TodoContext";

import GenericList from "./GenericList";
import { Todo } from "../state/schemas";

const ActiveDroppable = () => {
  const { AppState } = useContext(TodoContext);
  const { setNodeRef, isOver } = useDroppable({ id: "active" });

  return (
    <div
      ref={setNodeRef}
      className={`droppable-container ${isOver ? "is-over" : ""}`}
    >
      <GenericList<Todo>
        items={AppState.active}
        renderItem={(todo) => <TodoItem todo={todo} />}
        keyExtractor={(todo) => todo.id}
      />
    </div>
  );
};

export default ActiveDroppable;
