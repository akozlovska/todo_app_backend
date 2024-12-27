import { v4 as uuidv4 } from 'uuid';
import { MutationResolvers } from "../types/generated";
import { CustomError } from '../exceptions';
import { TaskContext } from '../types/TaskContext';

export const mutationResolvers: MutationResolvers<TaskContext> = {
  createTask(_, { input }, { dataSources }) {
    const newTask = {
      ...input,
      completed: input.completed || false,
      id: uuidv4(),
    };

    dataSources.tasks.push(newTask);
    return newTask;
  },

  updateTask(_, { id, input }, { dataSources }) {
    const taskIndex = dataSources.tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      throw CustomError.NotFound('Task with such id not found');
    }

    dataSources.tasks[taskIndex] = {
      ...dataSources.tasks[taskIndex],
      completed: input.completed || dataSources.tasks[taskIndex].completed,
      title: input.title,
      description: input.description,
      dueDate: input.dueDate,
    };

    return dataSources.tasks[taskIndex];
  },

  deleteTask(_, { id }, { dataSources }) {
    const taskIndex = dataSources.tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      throw CustomError.NotFound('Task with such id not found');
    }

    dataSources.tasks.splice(taskIndex, 1);

    return 'Task deleted successfully';
  },

  completeAllTasks(_, __, { dataSources }) {
    dataSources.tasks.forEach(task => {
      task.completed = true;
    });

    return dataSources.tasks;
  }
}