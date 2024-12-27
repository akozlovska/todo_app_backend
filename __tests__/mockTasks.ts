import { v4 as uuidv4 } from 'uuid';

export const mockTasks = [
  {
    id: uuidv4(),
    title: 'Task 1', 
    description: 'Description 1', 
    completed: false, 
    dueDate: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Task 2",
    description: 'Description 2', 
    completed: true, 
    dueDate: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Task 3",
    description: 'Description 3', 
    completed: false, 
    dueDate: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Task 4",
    description: 'Description 4', 
    completed: true, 
    dueDate: new Date().toISOString(),
  },
];