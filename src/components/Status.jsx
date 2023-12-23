/* eslint-disable react/prop-types */
const Status = ({ countTasks }) => {
  return (
    <ul className="stats">
      <li>
        <span>Remaining</span>
        <span>{countTasks().remaining}</span>
      </li>
      <li>
        <span>Completed</span>
        <span>{countTasks().completed}</span>
      </li>
      <li>
        <span>Total</span>
        <span>{countTasks().total}</span>
      </li>
    </ul>
  );
};

export default Status;
