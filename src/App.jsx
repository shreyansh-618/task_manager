import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), name: newTask, description, isCompleted: false },
      ]);
      setNewTask("");
      setDescription("");
    }
  };

  const toggleComplete = (id) =>
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );

  const deleteTask = (id) =>
    setTasks((tasks) => tasks.filter((task) => task.id !== id));

  const filteredTasks = tasks.filter((task) =>
    filter === "completed"
      ? task.isCompleted
      : filter === "incomplete"
      ? !task.isCompleted
      : true
  );

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Task Name"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <div>
              <strong>{task.name}</strong>: {task.description}
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleComplete(task.id)}
              />
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
