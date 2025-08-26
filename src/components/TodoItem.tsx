// src/components/TodoItem.tsx

import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../models/models";
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai";

interface Props {
  index: number;
  todo: Todo;
  onDone: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

const TodoItem: React.FC<Props> = ({
  todo,
  onDone,
  onDelete,
  onEdit,
  index,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(todo.id, editedTitle);
    setIsEditing(false);
  };

  return (
    <form
      className="todos_item"
      onSubmit={handleSubmit}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="todos_item--text"
        />
      ) : (
        <span
          className="todos_item--text"
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            opacity: todo.completed ? 0.5 : 1,
          }}
        >
          {todo.title}
        </span>
      )}

      <div className="icons">
        <span
          className="icon"
          onClick={() => {
            if (!isEditing && !todo.completed) {
              setIsEditing(true);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => onDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => onDone(todo.id)}>
          <AiOutlineCheck />
        </span>
      </div>
    </form>
  );
};

export default TodoItem;
