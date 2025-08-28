import "./App.css";
import TodoAppLayout from "./components/TodoAppLayout";
import { TodoProvider } from "./state/TodoContext";

const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoAppLayout />
    </TodoProvider>
  );
};

export default App;
