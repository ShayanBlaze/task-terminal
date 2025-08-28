import { createContext, useReducer } from "react";
import { TodoContextProps, initialValue } from "./types";
import { TodoReducer } from "./reducer";

export const TodoContext = createContext<TodoContextProps>(initialValue);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(TodoReducer, initialValue.AppState);

  return (
    <TodoContext.Provider value={{ AppState: state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
