import { AppState, Todo, Priority } from "./schemas";

export type Actions =
  | { type: "ADD"; payload: string }
  | { type: "DELETE"; payload: number }
  | { type: "DONE"; payload: number }
  | { type: "UNDONE"; payload: number }
  | { type: "EDIT"; payload: { id: number; title: string } }
  | { type: "CHANGE_PRIORITY"; payload: { id: number; priority: Priority } }
  | {
      type: "MOVE";
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
