import React, { useState, useRef, useEffect, useContext } from "react";
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai";

import { Todo } from "../state/types";
import { TodoContext } from "../state/TodoContext";

interface Props {
  index: number;
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo, index }) => {
  const { dispatch } = useContext(TodoContext);
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
    dispatch({ type: "EDIT", payload: { id: todo.id, title: editedTitle } });
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
        <span
          className="icon"
          onClick={() => dispatch({ type: "DELETE", payload: todo.id })}
        >
          <AiFillDelete />
        </span>
        <span
          className="icon"
          onClick={() => dispatch({ type: "DONE", payload: todo.id })}
        >
          <AiOutlineCheck />
        </span>
      </div>
    </form>
  );
};

export default TodoItem;
