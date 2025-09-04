import { TodoReducer } from "../state/reducer";

export const withLogger = (reducer: typeof TodoReducer): typeof TodoReducer => {
  return (state, action) => {
    if (process.env.NODE_ENV === "development") {
      console.group(`Action: ${action.type}`);
      console.log("Previous State:", state);
      console.log("Action :", action);
    }

    const newState = reducer(state, action);

    if (process.env.NODE_ENV === "development") {
      console.log("New State:", newState);
      console.groupEnd();
    }

    return newState;
  };
};
