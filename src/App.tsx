import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./state/TodoContext";

const App: React.FC = () => {
  return (
    <div className="App">
      <span className="heading">TASK_TERMINAL</span>
      <TodoProvider>
        <InputField />
        <TodoList />
      </TodoProvider>
    </div>
  );
};

export default App;
