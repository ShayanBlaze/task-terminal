import { useDroppable } from "@dnd-kit/core";
import TodoItem from "./TodoItem";
import { useCallback, useContext } from "react";
import { TodoContext } from "../state/TodoContext";

import GenericList from "./GenericList";
import { Todo } from "../state/schemas";

const CompleteDroppable = () => {
  const { AppState } = useContext(TodoContext);
  const { setNodeRef, isOver } = useDroppable({ id: "completed" });

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
        items={AppState.completed}
        renderItem={renderTodoItem}
        keyExtractor={(todo) => todo.id}
      />
    </div>
  );
};

export default CompleteDroppable;
