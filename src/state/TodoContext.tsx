import { createContext, useEffect, useReducer } from "react";

import { TodoContextProps, initialValue } from "./types";
import { AppState, appStateSchema } from "./schemas";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { TodoReducer } from "./reducer";
import { withLogger } from "../helpers/withLogger";

export const TodoContext = createContext<TodoContextProps>(initialValue);

const loggingReducer = withLogger(TodoReducer);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [persistedState, setPersistedState] = useLocalStorage<AppState>(
    "todos",
    initialValue.AppState,
    appStateSchema
  );
  const [state, dispatch] = useReducer(loggingReducer, persistedState);

  useEffect(() => {
    setPersistedState(state);
  }, [state, setPersistedState]);

  return (
    <TodoContext.Provider value={{ AppState: state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
