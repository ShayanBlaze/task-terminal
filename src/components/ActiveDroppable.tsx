import { useDroppable } from "@dnd-kit/core";
import TodoItem from "./TodoItem";
import { useContext, useCallback } from "react";
import { TodoContext } from "../state/TodoContext";

import GenericList from "./GenericList";
import { Todo } from "../state/schemas";

const ActiveDroppable = () => {
  const { AppState } = useContext(TodoContext);
  const { setNodeRef, isOver } = useDroppable({ id: "active" });

  const renderTodoItem = useCallback(
    (todo: Todo) => <TodoItem todo={todo} />,
    []
  );

  return (
    <div
      ref={setNodeRef}
      className={`droppable-container ${isOver ? "is-over" : ""}`}
    >
      <GenericList<Todo>
        items={AppState.active}
        renderItem={renderTodoItem}
        keyExtractor={(todo) => todo.id}
      />
    </div>
  );
};

export default ActiveDroppable;
