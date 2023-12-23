/* eslint-disable react/prop-types */

const TodoItem = ({ task, updateTask, removeTask }) => {
  return (
    <li
      key={task.id}
      id={task.id}
      className={task.isCompleted ? 'complete' : ''}
    >
      <div>
        <input
          type="checkbox"
          id={task.id}
          name="tasks"
          checked={task.isCompleted}
          onChange={(e) => updateTask(task.id, e.target.checked, task.name)}
        />
        <span>{task.name}</span>
      </div>
      <button
        title={`Remove the "${task.name}" task`}
        className="remove-task"
        onClick={() => removeTask(task.id)}
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </li>
  );
};

export default TodoItem;
