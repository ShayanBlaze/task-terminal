import { createContext, useEffect, useReducer } from "react";
import { TodoContextProps, initialValue } from "./types";
import { TodoReducer } from "./reducer";
import { AppState, appStateSchema } from "./schemas";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const TodoContext = createContext<TodoContextProps>(initialValue);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [persistedState, setPersistedState] = useLocalStorage<AppState>(
    "todos",
    initialValue.AppState,
    appStateSchema
  );
  const [state, dispatch] = useReducer(TodoReducer, persistedState);

  useEffect(() => {
    setPersistedState(state);
  }, [state, setPersistedState]);

  return (
    <TodoContext.Provider value={{ AppState: state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
