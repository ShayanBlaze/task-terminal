import ActiveDroppable from "./ActiveDroppable";
import CompleteDroppable from "./CompleteDroppable";

const TodoList: React.FC = () => {
  return (
    <div className="container">
      <div className="todos">
        <span className="todos__heading">Active Tasks</span>
        <ActiveDroppable />
      </div>

      <div className="todos remove">
        <span className="todos__heading">Completed Tasks</span>
        <CompleteDroppable />
      </div>
    </div>
  );
};

export default TodoList;
