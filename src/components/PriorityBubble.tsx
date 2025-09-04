import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Priority, Todo } from "../state/schemas";
import { TodoContext } from "../state/TodoContext";
import { ActionTypes } from "../state/types";

interface Props {
  priority: Priority;
  todo: Todo;
  onMenuToggle: (isOpen: boolean) => void;
}

const PriorityBubble: React.FC<Props> = ({ priority, todo, onMenuToggle }) => {
  const { dispatch } = useContext(TodoContext);
  const [bubbleMenuVisible, setBubbleMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const bubbleClassName = `priority-bubble--dot bubble-${priority}`;

  const toggleMenu = useCallback(
    (visible: boolean) => {
      setBubbleMenuVisible(visible);
      onMenuToggle(visible);
    },
    [onMenuToggle]
  );

  const handlePriorityChange = (newPriority: Priority) => {
    dispatch({
      type: ActionTypes.CHANGE_PRIORITY,
      payload: { id: todo.id, priority: newPriority },
    });
    toggleMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        toggleMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, toggleMenu]);

  return (
    <div className="priority-bubble" ref={menuRef}>
      <button
        className={bubbleClassName}
        onClick={() => toggleMenu(!bubbleMenuVisible)}
      ></button>

      {bubbleMenuVisible && (
        <div className="priority-bubble-menu">
          <div
            className="priority-menu-item item-low"
            onClick={() => handlePriorityChange("Low")}
          >
            Low
          </div>
          <div
            className="priority-menu-item item-medium"
            onClick={() => handlePriorityChange("Medium")}
          >
            Medium
          </div>
          <div
            className="priority-menu-item item-high"
            onClick={() => handlePriorityChange("High")}
          >
            High
          </div>
        </div>
      )}
    </div>
  );
};

export default PriorityBubble;
