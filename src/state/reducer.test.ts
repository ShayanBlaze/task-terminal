import { TodoReducer } from "./reducer";
import { ActionTypes } from "./types";
import { AppState } from "./schemas";

describe("TodoReducer", () => {
  it("should handle ADD action", () => {
    const initialState: AppState = {
      active: [],
      completed: [],
    };

    const action = { type: ActionTypes.ADD, payload: "New Task" } as const;
    const newState = TodoReducer(initialState, action);

    expect(newState.active.length).toBe(1);
    expect(newState.active[0].title).toBe("New Task");
    expect(newState.active[0].completed).toBe(false);
    expect(newState.completed.length).toBe(0);
  });

  it("should handle DELETE action for an active todo", () => {
    const initialState: AppState = {
      active: [
        { id: 1, title: "First Task", completed: false, priority: "Medium" },
        { id: 2, title: "Second Task", completed: false, priority: "Medium" },
      ],
      completed: [],
    };

    const action = { type: ActionTypes.DELETE, payload: 1 } as const;
    const newState = TodoReducer(initialState, action);

    expect(newState.active.length).toBe(1);
    expect(newState.active[0].id).toBe(2);
    expect(newState.completed.length).toBe(0);
  });

  it("should handle DONE action for an active todo", () => {
    const initialState: AppState = {
      active: [
        { id: 1, title: "First Task", completed: false, priority: "Medium" },
        { id: 2, title: "Second Task", completed: false, priority: "Medium" },
      ],
      completed: [],
    };

    const action = { type: ActionTypes.DONE, payload: 1 } as const;
    const newState = TodoReducer(initialState, action);

    expect(newState.active.length).toBe(1);
    expect(newState.active[0].id).toBe(2);
    expect(newState.completed.length).toBe(1);
    expect(newState.completed[0].id).toBe(1);
  });

  it("should handle UNDONE action for a completed todo", () => {
    const initialState: AppState = {
      active: [],
      completed: [
        { id: 1, title: "First Task", completed: true, priority: "Medium" },
        { id: 2, title: "Second Task", completed: true, priority: "Medium" },
      ],
    };

    const action = { type: ActionTypes.UNDONE, payload: 1 } as const;
    const newState = TodoReducer(initialState, action);

    expect(newState.completed.length).toBe(1);
    expect(newState.completed[0].id).toBe(2);
    expect(newState.active.length).toBe(1);
    expect(newState.active[0].id).toBe(1);
  });

  it("should handle EDIT action for an active todo", () => {
    const initialState: AppState = {
      active: [
        { id: 1, title: "First Task", completed: false, priority: "Medium" },
        { id: 2, title: "Second Task", completed: false, priority: "Medium" },
      ],
      completed: [],
    };

    const action = {
      type: ActionTypes.EDIT,
      payload: { id: 1, title: "Updated Task" },
    } as const;
    const newState = TodoReducer(initialState, action);

    expect(newState.active.length).toBe(2);
    expect(newState.active.find((todo) => todo.id === 1)?.title).toBe(
      "Updated Task"
    );
  });

  it("should CHANGE_PRIORITY action", () => {
    const initialState: AppState = {
      active: [
        { id: 1, title: "First Task", completed: false, priority: "Medium" },
      ],
      completed: [],
    };

    const action = {
      type: ActionTypes.CHANGE_PRIORITY,
      payload: { id: 1, priority: "High" },
    } as const;
    const newState = TodoReducer(initialState, action);

    expect(newState.active.length).toBe(1);
    expect(newState.active.find((todo) => todo.id === 1)?.priority).toBe(
      "High"
    );
  });

  it("should MOVE todo from active to completed", () => {
    const initialState: AppState = {
      active: [
        { id: 1, title: "First Task", completed: false, priority: "Medium" },
      ],
      completed: [],
    };

    const action = {
      type: ActionTypes.MOVE,
      payload: { movedTodo: initialState.active[0], destination: "completed" },
    } as const;
    const newState = TodoReducer(initialState, action);

    expect(newState.active.length).toBe(0);
    expect(newState.completed.length).toBe(1);
    expect(newState.completed[0].id).toBe(1);
  });

  it("should not change state if DONE action is for a non-existent todo", () => {
    const initialState: AppState = {
      active: [
        { id: 1, title: "Task 1", completed: false, priority: "Medium" },
      ],
      completed: [],
    };

    const action = { type: ActionTypes.DONE, payload: 99 } as const;
    const newState = TodoReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
