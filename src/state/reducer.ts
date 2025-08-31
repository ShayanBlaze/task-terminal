import { Actions } from "./types";
import { AppState } from "./schemas";

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
            priority: "Medium",
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

    case "MOVE": {
      const { movedTodo, destination } = action.payload;
      const sourceList = movedTodo.completed ? "completed" : "active";

      if (sourceList === destination) return AppState;

      const newActive = AppState.active.filter((t) => t.id !== movedTodo.id);
      const newCompleted = AppState.completed.filter(
        (t) => t.id !== movedTodo.id
      );

      if (destination === "completed") {
        return {
          active: newActive,
          completed: [...newCompleted, { ...movedTodo, completed: true }],
        };
      } else {
        return {
          active: [...newActive, { ...movedTodo, completed: false }],
          completed: newCompleted,
        };
      }
    }

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
