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
import { ActionTypes } from "../state/types";

// ========== Just showing content ==========
interface TodoItemContentProps {
  todo: Todo;
  isDragging: boolean;
  dragHandleProps: any;
}

const TodoItemContent: React.FC<TodoItemContentProps> = ({
  todo,
  isDragging,
  dragHandleProps,
}) => {
  const { dispatch } = useContext(TodoContext);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
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
    dispatch({
      type: ActionTypes.EDIT,
      payload: { id: todo.id, title: editedTitle },
    });
    setIsEditing(false);
  };

  return (
    <div
      className={`todos_item ${isDragging ? "dragging" : ""} ${
        isMenuOpen ? "menu-open" : ""
      }`}
    >
      <PriorityBubble
        todo={todo}
        priority={todo.priority}
        onMenuToggle={setIsMenuOpen}
      />
      {isEditing ? (
        <form onSubmit={handleSubmit} className="todo-content-form">
          <input
            ref={inputRef}
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={() => {
              dispatch({
                type: ActionTypes.EDIT,
                payload: { id: todo.id, title: editedTitle },
              });
              setIsEditing(false);
            }}
            className="todos_item--text"
          />
        </form>
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
          className="icon edit"
          onClick={() => {
            if (!isEditing && !todo.completed) {
              setIsEditing(true);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span
          className="icon delete"
          onClick={() =>
            dispatch({ type: ActionTypes.DELETE, payload: todo.id })
          }
        >
          <AiFillDelete />
        </span>
        <span
          className="icon check"
          onClick={() => {
            if (todo.completed) {
              dispatch({ type: ActionTypes.UNDONE, payload: todo.id });
            } else {
              dispatch({ type: ActionTypes.DONE, payload: todo.id });
            }
          }}
        >
          <AiOutlineCheck />
        </span>
        <span className="icon grab-handle" {...dragHandleProps}>
          <AiOutlineDrag />
        </span>
      </div>
    </div>
  );
};

// ========== Main component that handles dnd-kit ==========
interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: todo.id,
      data: {
        droppableId: todo.completed ? "completed" : "active",
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <TodoItemContent
        todo={todo}
        isDragging={isDragging}
        dragHandleProps={listeners}
      />
    </div>
  );
};

export default React.memo(TodoItem);
