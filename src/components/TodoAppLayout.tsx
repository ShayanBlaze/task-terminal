import InputField from "./InputField";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import TodoList from "./TodoList";
import { useContext, useState } from "react";
import { TodoContext } from "../state/TodoContext";
import { Todo } from "../state/types";
import TodoItem from "./TodoItem";

const TodoAppLayout = () => {
  const { AppState, dispatch } = useContext(TodoContext);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task =
      AppState.active.find((t) => t.id === active.id) ||
      AppState.completed.find((t) => t.id === active.id);
    if (task) {
      setActiveTodo(task);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const sourceContainer = active.data.current?.droppableId as string;
    const destinationContainer = over.id as string;

    if (sourceContainer !== destinationContainer) {
      const movedTodo =
        sourceContainer === "active"
          ? AppState.active.find((t) => t.id === active.id)
          : AppState.completed.find((t) => t.id === active.id);

      if (!movedTodo) return;

      if (sourceContainer === "active") {
        dispatch({ type: "DELETE_FROM_ACTIVE", payload: Number(active.id) });
      } else {
        dispatch({ type: "DELETE_FROM_COMPLETED", payload: Number(active.id) });
      }

      if (destinationContainer === "completed") {
        dispatch({ type: "ADD_TO_COMPLETED", payload: movedTodo });
      } else {
        dispatch({ type: "ADD_TO_ACTIVE", payload: movedTodo });
      }
    }
    setActiveTodo(null);
  };

  return (
    <>
      <span className="heading">TASK_TERMINAL</span>
      <InputField />

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
      >
        <TodoList />

        <DragOverlay>
          {activeTodo ? <TodoItem todo={activeTodo} index={0} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default TodoAppLayout;
