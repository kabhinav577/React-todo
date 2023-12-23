import { useState, useEffect } from 'react';
import Logo from '../../public/todo-96.svg';
import TodoItem from './TodoItem';
import Status from './Status';

const Todos = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const newTask = {
      id: new Date().getTime(),
      name: inputValue,
      isCompleted: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));

    setInputValue('');
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const completeAllTasks = () => {
    const updatedTasks = tasks.map((task) => ({ ...task, isCompleted: true }));
    setTasks(updatedTasks);
    // Update localStorage if needed
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const resetTodos = () => {
    setTasks([]); // Clear tasks in state
    localStorage.removeItem('tasks'); // Remove tasks from local storage
  };

  const updateTask = (taskId, isCompleted, newName) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, isCompleted: isCompleted, name: newName }
        : task
    );

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const countTasks = () => {
    const completedTasks = tasks.filter(
      (task) => task.isCompleted === true
    ).length;

    return {
      total: tasks.length,
      completed: completedTasks,
      remaining: tasks.length - completedTasks,
    };
  };

  return (
    <>
      <form onSubmit={addTask} className="todo-add" id="todo-form">
        <div className="icon">
          <img src={Logo} alt="Logo" />
        </div>
        <input
          type="text"
          className="text-input"
          name="task-name"
          placeholder="Enter task here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">
          <i className="fa-solid fa-circle-plus"></i>
        </button>
      </form>

      {/* Status of Todos  */}
      <Status countTasks={countTasks} />
      <ul className="todos">
        {tasks
          .sort((a, b) => {
            // Sort by completion status first (completed tasks will come last)
            if (a.isCompleted && !b.isCompleted) return 1;
            if (!a.isCompleted && b.isCompleted) return -1;

            // If completion status is the same, sort by creation timestamp (latest first)
            return b.id - a.id;
          })
          .map((task) => (
            <TodoItem
              task={task}
              updateTask={updateTask}
              removeTask={removeTask}
              key={task.id}
            />
          ))}
      </ul>
      <ul className="clear-task">
        <li>
          <button onClick={completeAllTasks}>Complete all tasks</button>
        </li>
        <li>
          <button onClick={resetTodos}>Reset</button>
        </li>
      </ul>
    </>
  );
};

export default Todos;
