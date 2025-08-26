import React, { useRef } from "react";

type Props = {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  onAdd: (e: React.FormEvent) => void;
};

const InputField: React.FC<Props> = ({ todo, setTodo, onAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input_todo"
      onSubmit={(e) => {
        onAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
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
