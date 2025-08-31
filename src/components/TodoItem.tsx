import React, { useState, useRef, useEffect, useContext } from "react";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineCheck,
  AiOutlineDrag,
} from "react-icons/ai";
import { useDraggable } from "@dnd-kit/core";

import { Todo } from "../state/schemas";
import { TodoContext } from "../state/TodoContext";
import PriorityBubble from "./PriorityBubble";

interface Props {
  index: number;
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo, index }) => {
  const { dispatch } = useContext(TodoContext);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: todo.id,
      data: {
        droppableId: todo.completed ? "completed" : "active",
      },
    });

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

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <form
      className={`todos_item ${isDragging ? "dragging" : ""} ${
        isMenuOpen ? "menu-open" : ""
      }`}
      style={style}
      onSubmit={handleSubmit}
      ref={setNodeRef}
      {...attributes}
    >
      <PriorityBubble
        todo={todo}
        priority={todo.priority}
        onMenuToggle={setIsMenuOpen}
      />
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
          onClick={() => {
            if (todo.completed) {
              dispatch({ type: "UNDONE", payload: todo.id });
            } else {
              dispatch({ type: "DONE", payload: todo.id });
            }
          }}
        >
          <AiOutlineCheck />
        </span>
        <span className="icon grab-handle" {...listeners}>
          <AiOutlineDrag />
        </span>
      </div>
    </form>
  );
};

export default TodoItem;
