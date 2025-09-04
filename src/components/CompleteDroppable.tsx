import { useDroppable } from "@dnd-kit/core";
import TodoItem from "./TodoItem";
import { useContext } from "react";
import { TodoContext } from "../state/TodoContext";

import GenericList from "./GenericList";
import { Todo } from "../state/schemas";

const CompleteDroppable = () => {
  const { AppState } = useContext(TodoContext);
  const { setNodeRef, isOver } = useDroppable({ id: "completed" });

  return (
    <div
      ref={setNodeRef}
      className={`droppable-container ${isOver ? "is-over" : ""}`}
    >
      <GenericList<Todo>
        items={AppState.completed}
        renderItem={(todo) => <TodoItem todo={todo} />}
        keyExtractor={(todo) => todo.id}
      />
    </div>
  );
};

export default CompleteDroppable;
