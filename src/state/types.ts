export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type Actions =
  | { type: "ADD"; payload: string }
  | { type: "DELETE"; payload: number }
  | { type: "DONE"; payload: number }
  | { type: "EDIT"; payload: { id: number; title: string } };

export type TodoContextProps = {
  state: Todo[];
  dispatch: React.Dispatch<Actions>;
};

// Initial context value
// It's not type but value
export const initialValue: TodoContextProps = {
  state: [
    { id: 1, title: "Sample Todo", completed: false },
    { id: 2, title: "Another Todo", completed: true },
  ],
  dispatch: () => null,
};
