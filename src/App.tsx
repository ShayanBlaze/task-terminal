// src/App.tsx

import { useState } from "react";
import "./App.css";
import { Todo } from "./models/models";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Learn TypeScript Principles", completed: false },
    { id: 2, title: "Refactor the App", completed: true },
  ]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), title: todo, completed: false }]);
      setTodo("");
    }
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleEdit = (id: number, newTitle: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
  };

  return (
    <div className="App">
      <span className="heading">TASK_TERMINAL</span>
      <InputField todo={todo} setTodo={setTodo} onAdd={handleAddTodo} />
      <TodoList
        todos={todos}
        onDone={handleDone}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default App;
