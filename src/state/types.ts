export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface AppState {
  active: Todo[];
  completed: Todo[];
}

export type Actions =
  | { type: "ADD"; payload: string }
  | { type: "DELETE"; payload: number }
  | { type: "DONE"; payload: number }
  | { type: "EDIT"; payload: { id: number; title: string } }
  | { type: "UPDATE_LISTS"; payload: { AppState: AppState } }
  | { type: "UNDONE"; payload: number }
  | { type: "DELETE_FROM_ACTIVE"; payload: number }
  | { type: "DELETE_FROM_COMPLETED"; payload: number }
  | { type: "ADD_TO_ACTIVE"; payload: Todo }
  | { type: "ADD_TO_COMPLETED"; payload: Todo };

export type TodoContextProps = {
  AppState: AppState;
  dispatch: React.Dispatch<Actions>;
};

// Initial context value
// It's not type but value
export const initialValue: TodoContextProps = {
  AppState: {
    active: [{ id: 1, title: "Sample Todo", completed: false }],
    completed: [{ id: 2, title: "Another Todo", completed: true }],
  },
  dispatch: () => null,
};
