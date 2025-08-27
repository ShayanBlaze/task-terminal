import "./App.css";
import { useReducer, useState } from "react";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { TodoReducer } from "./state/recuder";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [state, dispatch] = useReducer(TodoReducer, [
    { id: 1, title: "Learn TypeScript", completed: false },
    { id: 2, title: "Learn Node.JS", completed: true },
  ]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatch({ type: "ADD", payload: todo });
      setTodo("");
    }
  };

  const handleDone = (id: number) => {
    dispatch({ type: "DONE", payload: id });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const handleEdit = (id: number, newTitle: string) => {
    dispatch({ type: "EDIT", payload: { id, title: newTitle } });
  };

  return (
    <div className="App">
      <span className="heading">TASK_TERMINAL</span>
      <InputField todo={todo} setTodo={setTodo} onAdd={handleAddTodo} />
      <TodoList
        todos={state}
        onDone={handleDone}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default App;
