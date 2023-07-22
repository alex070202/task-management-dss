import React from 'react';
import { Task } from '../interfaces';
import { useState } from 'react';

interface Props {
  tasks: Task[];
  onSelectedTask: (data: Task ) => void;
  onDeletedTask: (tasks: Task[]) => void;
}

const TaskList: React.FC<Props> = (props: Props) => {
  
  const [isTaskDeleted,setIsTaskDeleted] = useState(false);
  const [selectedTask,setTask] = useState<Task>();
  const handleClick = (id: number,ignoreItem: boolean) => {
    let foundTask = props.tasks.find((item) => item.id === id) as Task;
  

    props.onSelectedTask(foundTask);
  
  };

  const handleDelete = (id: number) => {
    let deletedTask = props.tasks.find((item) => item.id === id) as Task;
    deletedTask.active = false;
    setTask(selectedTask);
    const updatedTasks = props.tasks.filter((task) => task.id !== id);
    props.onDeletedTask(updatedTasks);
  };

  return (
    <>
      <h2>Task list</h2>

      {props.tasks.length === 0 ? <h3>No Tasks found</h3> : null}
      <ul>
        {props.tasks.map((item) => (
          <li key={item.id} onClick={(e) => { handleClick(item.id,isTaskDeleted) }}>
            <p className='id'>{item.id}</p>
            <p className='field1'>{item.description}</p>
            <p className='field2'>{item.assignee}</p>
            <p className='field3'>{item.status}</p>
            <p className='field4'>{item.priority}</p>
            <p className='field5'>{item.dueDate.toString()}</p>

            <button className="deleteButton" onClick={() => handleDelete(item.id)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;