import React, { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../state/TodoContext";


const TodoList: React.FC = () => {
  const { state } = useContext(TodoContext);

  return (
    <div className="todos">
      {state.map((todo, index) => (
        <TodoItem key={todo.id} index={index} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
