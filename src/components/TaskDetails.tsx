import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Task } from '../interfaces';

interface Props {
  onSave: (task: Task) => void;
  onUpdate: (task: Task) => void;
  selectedTask: Task;

}

const TaskDetails: React.FC<Props> = (props: Props) => {

  let emptyTask: Task = {
    id: -1,
    description: "",
    assignee: "",
    status: "",
    priority: 0,
    dueDate: new Date(),
    active: true,
  };


  const [selectedTask, setTask] = useState<Task>(emptyTask);

  useEffect(() => {
    if (props.selectedTask.active) {
      setTask(props.selectedTask);
    } else {
      handleClear();
    }

  }, [props.selectedTask])

 

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTask(prevTask => ({ ...prevTask, dueDate: new Date(value) }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedTask.id !== -1) {
      props.onUpdate(selectedTask);
    } else {
      props.onSave(selectedTask);
    }

  };

  const handleClear = () => {
    setTask(emptyTask);
  };

  return (
    <>
      <h2>Task Details:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="field1"
            name="description"
            value={selectedTask.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="assignee">Assignee:</label>
          <input
            type="text"
            id="field2"
            name="assignee"
            value={selectedTask.assignee}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="field3"
            name="status"
            value={selectedTask.status}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <input
            type="number"
            id="field4"
            name="priority"
            value={selectedTask.priority}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="field5"
            name="dueDate"
            value={selectedTask.dueDate.toISOString().substr(0, 10)}
            onChange={handleDateChange}
            required
          />
        </div>
        <button id="saveButton" type="submit" className="saveButton">Save</button>
      
      </form>

      <button id="clearButton" onClick={handleClear} className="clearButton">Clear</button>
    </>
  );
};

export default TaskDetails;