import React, { useContext, useRef, useState } from "react";
import { TodoContext } from "../state/TodoContext";
import { ActionTypes } from "../state/types";

const InputField: React.FC = () => {
  const { dispatch } = useContext(TodoContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const [todo, setTodo] = useState<string>("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatch({ type: ActionTypes.ADD, payload: todo });
      setTodo("");
    }
  };

  return (
    <form
      className="input_todo"
      onSubmit={(e) => {
        handleAddTodo(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        spellCheck={false}
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new task"
        className="input_box"
      />
      <button className="input_button" type="submit">
        Add Todo
      </button>
    </form>
  );
};

export default InputField;
