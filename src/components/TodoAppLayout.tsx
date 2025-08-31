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
import { Todo } from "../state/schemas";
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
    setActiveTodo(null);

    if (!over || active.id === over.id) {
      return;
    }

    const movedTodo =
      AppState.active.find((t) => t.id === active.id) ||
      AppState.completed.find((t) => t.id === active.id);

    if (!movedTodo) return;

    const destination = over.id as "active" | "completed";

    dispatch({
      type: "MOVE",
      payload: { movedTodo, destination },
    });
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
