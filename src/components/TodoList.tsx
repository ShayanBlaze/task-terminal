// src/components/TodoList.tsx

import React from "react";
import { Todo } from "../models/models";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  onDone: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

const TodoList: React.FC<Props> = ({ todos, onDone, onDelete, onEdit }) => {
  return (
    <div className="todos">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          index={index}
          todo={todo}
          onDone={onDone}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;
