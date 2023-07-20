import React, { useState } from 'react';

import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import './styles/main.css';
import { Task } from './interfaces';


const App: React.FC = () => {

  let task1: Task = {
    id: 1,
    description: "eat before go out",
    assignee: "Niki",
    status: "active",
    priority: 13,
    dueDate: new Date(),
    active: true,
  };

  let task2: Task = {
    id: 2,
    description: "study your lessons",
    assignee: "Ivan",
    status: "active",
    priority: 20,
    dueDate: new Date(),
    active: true,
  };

  let task3: Task = {
    id: 3,
    description: "play with your sister",
    assignee: "Kaloyan",
    status: "active",
    priority: 30,
    dueDate: new Date(),
    active: true,
  };
  let task4: Task = {
    id: 4,
    description: "go to the shop",
    assignee: "Hristo",
    status: "active",
    priority: 50,
    dueDate: new Date(),
    active: true,
  };

  let tasksInitial = [task1, task2, task3,task4];

  const [tasks, setTasks] = useState(tasksInitial);
  const [selectedTask, setTask] = useState<Task>(task1);

  const handleSaveTask = (task: Task) => {
    let tasksLength = tasks.length + 1;
    task.id = tasksLength;
    let taskArray = [...tasks, task] as Task[];
    setTasks(taskArray);

  };

  const handleTaskUpdate = (task: Task) => {

    let taskIndex = tasks.findIndex((item) => item.id === task.id);
    let tasksArr = [...tasks];
    let updatedTask = { ...tasks[taskIndex] };
    updatedTask = task;
    tasksArr[taskIndex] = updatedTask;
    setTasks(tasksArr);

  }
  const handleTaskSelection = (task: Task) => {
    setTask(task);
  }
  const handleTaskDelete = (taskArr: Task[]) => {
      let idIndex =1;
      for(let i =0; i < taskArr.length; i++){
        taskArr[i].id = idIndex++;
      }
      return taskArr;
  };

  return (
    <div className="container">

      <div className="navbar">Task Management system 
      </div>
      <div className="content-list">
        <TaskList tasks={tasks} onSelectedTask={handleTaskSelection} onDeletedTask={(newTasks) => setTasks(handleTaskDelete(newTasks))} />
      </div>
      <div className="content-details">
        <TaskDetails onSave={handleSaveTask} onUpdate={handleTaskUpdate} selectedTask={selectedTask} />
      </div>
      <div className="footer">© 2023 Task Management system. All rights reserved.</div>
    </div>
  );
};
export default App;