import { AppState, Todo, Priority } from "./schemas";

export enum ActionTypes {
  ADD = "ADD",
  DELETE = "DELETE",
  DONE = "DONE",
  UNDONE = "UNDONE",
  EDIT = "EDIT",
  CHANGE_PRIORITY = "CHANGE_PRIORITY",
  MOVE = "MOVE",
}

export type Actions =
  | { type: ActionTypes.ADD; payload: string }
  | { type: ActionTypes.DELETE; payload: number }
  | { type: ActionTypes.DONE; payload: number }
  | { type: ActionTypes.UNDONE; payload: number }
  | { type: ActionTypes.EDIT; payload: { id: number; title: string } }
  | {
      type: ActionTypes.CHANGE_PRIORITY;
      payload: { id: number; priority: Priority };
    }
  | {
      type: ActionTypes.MOVE;
      payload: { movedTodo: Todo; destination: "active" | "completed" };
    };

export type TodoContextProps = {
  AppState: AppState;
  dispatch: React.Dispatch<Actions>;
};

export const initialValue: TodoContextProps = {
  AppState: {
    active: [
      { id: 1, title: "Sample Todo", completed: false, priority: "Medium" },
    ],
    completed: [
      { id: 2, title: "Another Todo", completed: true, priority: "High" },
    ],
  },
  dispatch: () => null,
};
