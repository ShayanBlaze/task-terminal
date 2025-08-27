import { Todo } from "../models/models";
import { Actions } from "./types";

export const TodoReducer = (state: Todo[], action: Actions): Todo[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: Date.now(), title: action.payload, completed: false },
      ];
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);
    case "DONE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "EDIT":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo
      );
    default:
      return state;
  }
};