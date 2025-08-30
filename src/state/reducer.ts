import { Actions, AppState } from "./types";

export const TodoReducer = (AppState: AppState, action: Actions): AppState => {
  switch (action.type) {
    case "ADD":
      return {
        ...AppState,
        active: [
          ...AppState.active,
          {
            id: Date.now(),
            title: action.payload,
            completed: false,
            priority: "medium",
          },
        ],
      };
    case "DELETE":
      return {
        ...AppState,
        active: AppState.active.filter((todo) => todo.id !== action.payload),
        completed: AppState.completed.filter(
          (todo) => todo.id !== action.payload
        ),
      };
    case "DONE": {
      const itemToMove = AppState.active.find(
        (todo) => todo.id === action.payload
      );
      if (!itemToMove) return AppState;

      return {
        active: AppState.active.filter((todo) => todo.id !== action.payload),
        completed: [...AppState.completed, { ...itemToMove, completed: true }],
      };
    }
    case "UNDONE": {
      const itemToMove = AppState.completed.find(
        (todo) => todo.id === action.payload
      );
      if (!itemToMove) return AppState;

      return {
        completed: AppState.completed.filter(
          (todo) => todo.id !== action.payload
        ),
        active: [...AppState.active, { ...itemToMove, completed: false }],
      };
    }
    case "EDIT":
      return {
        ...AppState,
        active: AppState.active.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo
        ),
        completed: AppState.completed.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo
        ),
      };
    case "UPDATE_LISTS":
      return {
        ...AppState,
        active: action.payload.AppState.active,
        completed: action.payload.AppState.completed,
      };
    case "DELETE_FROM_ACTIVE":
      return {
        ...AppState,
        active: AppState.active.filter((todo) => todo.id !== action.payload),
      };

    case "DELETE_FROM_COMPLETED":
      return {
        ...AppState,
        completed: AppState.completed.filter(
          (todo) => todo.id !== action.payload
        ),
      };

    case "ADD_TO_ACTIVE":
      return {
        ...AppState,
        active: [...AppState.active, { ...action.payload, completed: false }],
      };

    case "ADD_TO_COMPLETED":
      return {
        ...AppState,
        completed: [
          ...AppState.completed,
          { ...action.payload, completed: true },
        ],
      };
    case "CHANGE_PRIORITY": {
      const { id, priority } = action.payload;
      return {
        ...AppState,
        active: AppState.active.map((todo) =>
          todo.id === id ? { ...todo, priority } : todo
        ),
        completed: AppState.completed.map((todo) =>
          todo.id === id ? { ...todo, priority } : todo
        ),
      };
    }
    default:
      return AppState;
  }
};
